import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';
import { readmeScanner, COUNT_MENTION, TOPICS_MENTION } from '../lib/readme-counts.js';

const ROOT = join(__dirname, '..');
const scan = (text: string, regex: RegExp) => readmeScanner(text).mentionsOf(regex);
const values = (text: string, regex: RegExp) => scan(text, regex).map(m => m.value);

describe('COUNT_MENTION — what it must claim', () => {
  it.each([
    ['**251 insights · 12 topics**', [251]],
    ['251+ insights across 2 domains', [251]],
    ['reading 251 connected insights produces', [251]],
    ['# 251+ individual insight files', [251]],
    ['one YAML file with all 251+ nodes', [251]],
    ['1,000 insights', [1000]],
  ])('claims %j -> %j', (text, expected) => {
    expect(values(text as string, COUNT_MENTION)).toEqual(expected);
  });
});

describe('COUNT_MENTION — what it must NOT claim', () => {
  it.each([
    ['broken into 2-5 atomic insights', '2-5 range prose (the 5 must not be a count)'],
    ['**Major contributors (2+ insights):**', 'a real README heading'],
    ['[Thariq Shihipar](https://twitter.com/trq212)', 'a handle containing digits'],
    ['See PR #1234 nodes', 'an issue number'],
    ['I add insights every week', 'no number at all'],
  ])('ignores %j — %s', (text) => {
    expect(values(text as string, COUNT_MENTION)).toEqual([]);
  });

  it('never restarts inside a number (the "1,000" -> "000" bug)', () => {
    expect(values('**1,000 insights**', COUNT_MENTION)).toEqual([1000]);
  });

  it('requires a word boundary after the noun', () => {
    expect(values('242 insightful notes', COUNT_MENTION)).toEqual([]);
  });
});

describe('TOPICS_MENTION', () => {
  it('claims the aggregate on the header line', () => {
    expect(values('**251 insights · 12 topics · 25+ sources**', TOPICS_MENTION)).toEqual([12]);
  });

  it('claims the SINGULAR form — this is how "14 topic MOCs" hid', () => {
    expect(values('├── topics/   # 14 topic MOCs (Maps of Content)', TOPICS_MENTION)).toEqual([14]);
  });

  it('ignores parenthesised per-domain breakdowns', () => {
    expect(values('**Mental Models** (6 topics): Psychology, Economics', TOPICS_MENTION)).toEqual([]);
  });

  it('never restarts mid-number inside parens (the phantom "4" bug)', () => {
    expect(values('**AI** (14 topics, listed below): Agents', TOPICS_MENTION)).toEqual([]);
  });

  // Guards the trailing (?!\)) lookahead, which the parenthesised-breakdown test above
  // cannot reach — the lookbehind alone already kills that one.
  it('ignores a count that closes a parenthetical', () => {
    expect(values('a graph spanning 13 topics) somehow', TOPICS_MENTION)).toEqual([]);
  });
});

describe('line numbers are reported so a failure names the line to edit', () => {
  it('reports 1-indexed line numbers', () => {
    const text = 'intro\n\n**251 insights · 12 topics**\nmore prose\n251+ insights across 2 domains';
    expect(scan(text, COUNT_MENTION).map(m => m.line)).toEqual([3, 5]);
  });
});

// The checks must be able to FAIL, and must actually fire against the real repo — a guard
// that silently matches nothing is indistinguishable from a passing one.
describe('against the live repo', () => {
  const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');
  const nodeCount = (yaml.load(readFileSync(join(ROOT, 'graph-index.yaml'), 'utf8')) as { node_count: number }).node_count;
  const topicCount = readdirSync(join(ROOT, 'topics')).filter(f => f.endsWith('.md')).length;

  it('finds at least one mention of each kind (the check can fire)', () => {
    expect(scan(readme, COUNT_MENTION).length).toBeGreaterThan(0);
    expect(scan(readme, TOPICS_MENTION).length).toBeGreaterThan(0);
  });

  it('every README node-count mention matches graph-index.yaml', () => {
    expect(scan(readme, COUNT_MENTION).filter(m => m.value !== nodeCount)).toEqual([]);
  });

  it('every README topics-count mention matches topics/*.md', () => {
    expect(scan(readme, TOPICS_MENTION).filter(m => m.value !== topicCount)).toEqual([]);
  });

  it('a stale README is detected (positive control on real text)', () => {
    const stale = readme.replace(`${nodeCount} insights`, `${nodeCount - 9} insights`);
    expect(scan(stale, COUNT_MENTION).filter(m => m.value !== nodeCount).length).toBeGreaterThan(0);
  });
});
