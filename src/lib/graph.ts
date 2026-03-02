import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

interface GraphNode {
  title: string;
  description: string;
  topics: string[];
  source: string;
  outgoing?: string[];
  incoming?: string[];
}

interface GraphIndex {
  last_updated: string;
  node_count: number;
  nodes: Record<string, GraphNode>;
}

let _graphIndex: GraphIndex | null = null;

export function getGraphIndex(): GraphIndex {
  if (!_graphIndex) {
    const yamlPath = path.join(process.cwd(), 'graph-index.yaml');
    _graphIndex = yaml.load(fs.readFileSync(yamlPath, 'utf8')) as GraphIndex;
  }
  return _graphIndex;
}

export function getConnections(slug: string): { outgoing: { slug: string; title: string }[]; incoming: { slug: string; title: string }[] } {
  const index = getGraphIndex();
  const node = index.nodes[slug];
  if (!node) return { outgoing: [], incoming: [] };

  const outgoing = (node.outgoing || []).map(s => ({
    slug: s,
    title: index.nodes[s]?.title || s,
  }));

  const incoming = (node.incoming || []).map(s => ({
    slug: s,
    title: index.nodes[s]?.title || s,
  }));

  return { outgoing, incoming };
}

export function getDegree(slug: string): number {
  const index = getGraphIndex();
  const node = index.nodes[slug];
  if (!node) return 0;
  return (node.outgoing?.length || 0) + (node.incoming?.length || 0);
}
