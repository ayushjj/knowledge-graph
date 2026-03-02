import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

  for (const target of outgoing) {
    graphLinks.push({ source: slug, target });
  }
}

// Write to public/ for Astro to serve as static asset
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(
  path.join(publicDir, 'graph-data.json'),
  JSON.stringify({ nodes: graphNodes, links: graphLinks }, null, 2)
);

console.log(`Built graph-data.json: ${graphNodes.length} nodes, ${graphLinks.length} links`);
