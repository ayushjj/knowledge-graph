import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Single source of truth for topic colors + domains
const topicData = require('./src/lib/topics.json');
const TOPIC_COLORS = {};
const TOPIC_DOMAINS = {};
for (const [slug, info] of Object.entries(topicData.topics)) {
  TOPIC_COLORS[slug] = info.color;
  TOPIC_DOMAINS[slug] = info.domain;
}

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
  const domain = TOPIC_DOMAINS[node.topics[0]] || 'ai';

  graphNodes.push({
    id: slug,
    label: node.title,
    description: node.description,
    topics: node.topics,
    source: node.source,
    color,
    degree,
    domain,
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
