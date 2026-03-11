import type { Root, Text, Link } from 'mdast';
import { visit } from 'unist-util-visit';
import { getGraphIndex } from './graph';

/**
 * Remark plugin that converts [[slug]] wikilinks to markdown links.
 * Runs at build time during Astro's markdown processing.
 */
export function remarkWikilinks() {
  return (tree: Root) => {
    const index = getGraphIndex();

    visit(tree, 'text', (node: Text, idx, parent) => {
      if (!parent || idx == null) return;

      const regex = /\[\[([^\]]+)\]\]/g;
      const value = node.value;

      if (!regex.test(value)) return;
      regex.lastIndex = 0;

      const children: (Text | Link)[] = [];
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(value)) !== null) {
        // Text before the match
        if (match.index > lastIndex) {
          children.push({ type: 'text', value: value.slice(lastIndex, match.index) });
        }

        const slug = match[1];
        const title = index.nodes[slug]?.title || slug;

        children.push({
          type: 'link',
          url: `/knowledge-graph/insight/${slug}`,
          children: [{ type: 'text', value: title }],
        });

        lastIndex = match.index + match[0].length;
      }

      // Remaining text
      if (lastIndex < value.length) {
        children.push({ type: 'text', value: value.slice(lastIndex) });
      }

      // Replace the text node with the new children
      parent.children.splice(idx, 1, ...children);
    });
  };
}
