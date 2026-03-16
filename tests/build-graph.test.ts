import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

describe('build-graph.js', () => {
  beforeAll(() => {
    // Run the build script to ensure graph-data.json is fresh
    execSync('node build-graph.js', { cwd: path.resolve('.') });
  });

  it('produces graph-data.json in public/', () => {
    const filePath = path.resolve('public/graph-data.json');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('outputs valid JSON with nodes and links arrays', () => {
    const raw = fs.readFileSync(path.resolve('public/graph-data.json'), 'utf8');
    const data = JSON.parse(raw);
    expect(Array.isArray(data.nodes)).toBe(true);
    expect(Array.isArray(data.links)).toBe(true);
  });

  it('nodes have required fields', () => {
    const data = JSON.parse(fs.readFileSync(path.resolve('public/graph-data.json'), 'utf8'));
    for (const node of data.nodes) {
      expect(node).toHaveProperty('id');
      expect(node).toHaveProperty('label');
      expect(node).toHaveProperty('topics');
      expect(node).toHaveProperty('color');
      expect(node).toHaveProperty('degree');
      expect(node).toHaveProperty('domain');
      expect(typeof node.id).toBe('string');
      expect(typeof node.label).toBe('string');
      expect(Array.isArray(node.topics)).toBe(true);
      expect(typeof node.degree).toBe('number');
    }
  });

  it('links reference existing node IDs', () => {
    const data = JSON.parse(fs.readFileSync(path.resolve('public/graph-data.json'), 'utf8'));
    const nodeIds = new Set(data.nodes.map((n: { id: string }) => n.id));
    for (const link of data.links) {
      expect(nodeIds.has(link.source)).toBe(true);
      expect(nodeIds.has(link.target)).toBe(true);
    }
  });

  it('node count matches graph-index.yaml node_count', () => {
    const data = JSON.parse(fs.readFileSync(path.resolve('public/graph-data.json'), 'utf8'));
    const yamlContent = fs.readFileSync(path.resolve('graph-index.yaml'), 'utf8');
    const match = yamlContent.match(/^node_count:\s*(\d+)/m);
    expect(match).not.toBeNull();
    const declaredCount = parseInt(match![1], 10);
    expect(data.nodes.length).toBe(declaredCount);
  });
});
