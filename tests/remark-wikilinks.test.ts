import { describe, it, expect } from 'vitest';
import { remarkWikilinks } from '../src/lib/remark-wikilinks';
import type { Root, Paragraph, Text, Link } from 'mdast';

/** Helper: build a minimal mdast tree with a single paragraph containing text */
function makeTree(text: string): Root {
  return {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', value: text }],
      },
    ],
  };
}

function getParaChildren(tree: Root) {
  return (tree.children[0] as Paragraph).children;
}

describe('remarkWikilinks', () => {
  const transform = remarkWikilinks();

  it('converts [[slug]] to a link node', () => {
    // Use a slug we know exists in graph-index.yaml
    const tree = makeTree('See [[features-are-prompts-not-code]] for details');
    transform(tree);

    const children = getParaChildren(tree);
    expect(children.length).toBe(3); // text, link, text

    const link = children[1] as Link;
    expect(link.type).toBe('link');
    expect(link.url).toBe('/knowledge-graph/insight/features-are-prompts-not-code');
    expect((link.children[0] as Text).value).toContain('prompts');
  });

  it('leaves text without wikilinks untouched', () => {
    const tree = makeTree('No links here, just plain text.');
    transform(tree);

    const children = getParaChildren(tree);
    expect(children.length).toBe(1);
    expect(children[0].type).toBe('text');
  });

  it('handles multiple wikilinks in one text node', () => {
    const tree = makeTree('Compare [[features-are-prompts-not-code]] and [[files-are-the-universal-agent-interface]].');
    transform(tree);

    const children = getParaChildren(tree);
    const links = children.filter((c) => c.type === 'link');
    expect(links.length).toBe(2);
  });

  it('uses slug as fallback title for unknown slugs', () => {
    const tree = makeTree('See [[nonexistent-slug-xyz]]');
    transform(tree);

    const children = getParaChildren(tree);
    const link = children.find((c) => c.type === 'link') as Link;
    expect(link).toBeDefined();
    expect((link.children[0] as Text).value).toBe('nonexistent-slug-xyz');
  });
});
