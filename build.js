const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

// Topic color map
const TOPIC_COLORS = {
  'ai-agents': '#6366f1',
  'ai-native-product-architecture': '#8b5cf6',
  'ai-coding-tools': '#06b6d4',
  'future-of-ai-business': '#f59e0b',
  'business-models': '#10b981',
  'knowledge-systems': '#f43f5e',
};

// Read graph-index.yaml
const yamlPath = path.join(__dirname, 'graph-index.yaml');
const graphIndex = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
const nodes = graphIndex.nodes;

// Build graph-data.json
const graphNodes = [];
const graphLinks = [];

for (const [slug, node] of Object.entries(nodes)) {
  const outgoing = node.outgoing || [];
  const incoming = node.incoming || [];
  const degree = outgoing.length + incoming.length;
  const color = TOPIC_COLORS[node.topics[0]] || '#888888';

  graphNodes.push({
    id: slug,
    label: node.title,
    description: node.description,
    topics: node.topics,
    source: node.source,
    color,
    degree,
  });

  // Build links from outgoing only (avoids duplicates)
  for (const target of outgoing) {
    graphLinks.push({ source: slug, target });
  }
}

// Build content-data.json from insight markdown files
const contentData = {};
const insightsDir = path.join(__dirname, 'insights');

for (const [slug] of Object.entries(nodes)) {
  const mdPath = path.join(insightsDir, `${slug}.md`);
  if (!fs.existsSync(mdPath)) {
    console.warn(`Warning: missing insight file: ${slug}.md`);
    continue;
  }

  let content = fs.readFileSync(mdPath, 'utf8');

  // Strip YAML frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  let date = '';
  if (fmMatch) {
    const fm = yaml.load(fmMatch[1]);
    date = fm.date || '';
    content = content.slice(fmMatch[0].length);
  }

  // Convert [[wikilinks]] to clickable <a> tags
  content = content.replace(/\[\[([^\]]+)\]\]/g, (_, linkSlug) => {
    const targetNode = nodes[linkSlug];
    const label = targetNode ? targetNode.title : linkSlug;
    return `<a href="#" class="wikilink" data-slug="${linkSlug}">${label}</a>`;
  });

  const html = marked.parse(content);
  contentData[slug] = { html, date: String(date) };
}

// Write output files
const webDir = path.join(__dirname, 'web');
if (!fs.existsSync(webDir)) fs.mkdirSync(webDir);

fs.writeFileSync(
  path.join(webDir, 'graph-data.json'),
  JSON.stringify({ nodes: graphNodes, links: graphLinks }, null, 2)
);

fs.writeFileSync(
  path.join(webDir, 'content-data.json'),
  JSON.stringify(contentData, null, 2)
);

console.log(`Built graph-data.json: ${graphNodes.length} nodes, ${graphLinks.length} links`);
console.log(`Built content-data.json: ${Object.keys(contentData).length} insights`);
