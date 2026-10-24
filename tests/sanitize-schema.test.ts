import { describe, it, expect } from 'vitest';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import config from '../astro.config.mjs';

// Renders through Astro's own markdown processor with the site's real markdown config, so
// the test fails if the sanitize step is removed from astro.config.mjs or Astro changes
// its plugin order (review 2026-10-24: a hand-built pipeline passed with the fix deleted).
async function render(md: string, withSiteRehype = true): Promise<string> {
  // the site sets only these two markdown options; pass them through unchanged
  const remarkPlugins = config.markdown?.remarkPlugins ?? [];
  const rehypePlugins = withSiteRehype ? config.markdown?.rehypePlugins ?? [] : [];
  const processor = await createMarkdownProcessor({ remarkPlugins, rehypePlugins });
  const out = await processor.render(md);
  return out.code;
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
const DANGER = /<script|<iframe|<svg|<img[^>]*onerror|\son\w+=|javascript:/i;

describe('site markdown rendering', () => {
  for (const [name, md] of Object.entries(PAYLOADS)) {
    it(`removes ${name}`, async () => {
      expect(await render(md)).not.toMatch(DANGER);
    });
  }

  it('the payloads are real: without the site sanitize step, most of them survive', async () => {
    const outs = await Promise.all(Object.values(PAYLOADS).map((md) => render(md, false)));
    expect(outs.filter((html) => DANGER.test(html)).length).toBeGreaterThanOrEqual(6);
  });

  it('keeps ordinary content', async () => {
    const html = await render('# Title\n\nSome **bold** and a [link](https://example.com).\n\n- item\n\n`code`\n\n| a | b |\n|---|---|\n| 1 | 2 |');
    expect(html).toContain('<h1 id="title">Title</h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('<li>item</li>');
    expect(html).toContain('<code>code</code>');
    expect(html).toContain('<td>1</td>');
  });

  it('keeps relative links (wikilinks become these)', async () => {
    expect(await render('[a](/knowledge-graph/insight/foo)')).toContain('href="/knowledge-graph/insight/foo"');
  });

  it('drops raw HTML entirely (Astro parses it after the sanitize step)', async () => {
    expect(await render('a <kbd>K</kbd> b')).not.toContain('<kbd>');
  });
});
