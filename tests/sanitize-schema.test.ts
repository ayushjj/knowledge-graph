import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { sanitizeSchema } from '../src/lib/sanitize-schema';

// Same shape as Astro's markdown pipeline: raw HTML passed through, then our sanitize step.
function render(md: string, sanitize = true): string {
  const p = unified().use(remarkParse).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw);
  if (sanitize) p.use(rehypeSanitize, sanitizeSchema);
  return String(p.use(rehypeStringify).processSync(md));
}

// Payloads the 2026-10-24 reviews showed passing the old line-by-line source check.
const PAYLOADS: Record<string, string> = {
  'multi-line tag': '<details open\nontoggle=alert(1)>x</details>',
  'img onerror': '<img src=x onerror=alert(1)>',
  'script': '<script>alert(1)</script>',
  'reference link': '[x][r]\n\n[r]: javascript:alert(1)',
  'entity-encoded scheme': '[x](java&#115;cript:alert(1))',
  'inline link': '[x](javascript:alert(1))',
  'iframe': '<iframe src="https://evil.example"></iframe>',
  'svg onload': '<svg onload=alert(1)></svg>',
};
const DANGER = /<script|<iframe|<svg|\son\w+=|javascript:/i;

describe('sanitizeSchema', () => {
  for (const [name, md] of Object.entries(PAYLOADS)) {
    it(`removes ${name}`, () => {
      expect(render(md)).not.toMatch(DANGER);
    });
  }

  it('the payloads are real: without sanitizing, most of them survive', () => {
    const survived = Object.values(PAYLOADS).filter((md) => DANGER.test(render(md, false)));
    expect(survived.length).toBeGreaterThanOrEqual(6);
  });

  it('keeps ordinary content', () => {
    const html = render('# Title\n\nSome **bold** and a [link](https://example.com).\n\n- item\n\n`code`');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('<li>item</li>');
    expect(html).toContain('<code>code</code>');
  });

  it('keeps relative links (wikilinks become these)', () => {
    expect(render('[a](/knowledge-graph/insight/foo)')).toContain('href="/knowledge-graph/insight/foo"');
  });
});
