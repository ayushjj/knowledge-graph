import { describe, it, expect } from 'vitest';
import { getGraphIndex, getConnections, getDegree } from '../src/lib/graph';

describe('getGraphIndex', () => {
  it('returns an object with nodes, node_count, and last_updated', () => {
    const index = getGraphIndex();
    expect(index).toHaveProperty('nodes');
    expect(index).toHaveProperty('node_count');
    expect(index).toHaveProperty('last_updated');
    expect(typeof index.node_count).toBe('number');
    expect(index.node_count).toBeGreaterThan(0);
  });

  it('node count matches actual nodes object size', () => {
    const index = getGraphIndex();
    expect(Object.keys(index.nodes).length).toBe(index.node_count);
  });

  it('every node has required fields', () => {
    const index = getGraphIndex();
    for (const [slug, node] of Object.entries(index.nodes)) {
      expect(node.title, `${slug} missing title`).toBeTruthy();
      expect(node.description, `${slug} missing description`).toBeTruthy();
      expect(Array.isArray(node.topics), `${slug} topics not array`).toBe(true);
      expect(node.topics.length, `${slug} has no topics`).toBeGreaterThan(0);
      expect(node.source, `${slug} missing source`).toBeTruthy();
    }
  });
});

describe('getConnections', () => {
  it('returns outgoing and incoming arrays for a known node', () => {
    const conn = getConnections('features-are-prompts-not-code');
    expect(Array.isArray(conn.outgoing)).toBe(true);
    expect(Array.isArray(conn.incoming)).toBe(true);
    expect(conn.outgoing.length + conn.incoming.length).toBeGreaterThan(0);
  });

  it('connection entries have slug and title', () => {
    const conn = getConnections('features-are-prompts-not-code');
    for (const c of [...conn.outgoing, ...conn.incoming]) {
      expect(c).toHaveProperty('slug');
      expect(c).toHaveProperty('title');
      expect(typeof c.slug).toBe('string');
      expect(typeof c.title).toBe('string');
    }
  });

  it('returns empty arrays for unknown slug', () => {
    const conn = getConnections('this-slug-does-not-exist');
    expect(conn.outgoing).toEqual([]);
    expect(conn.incoming).toEqual([]);
  });
});

describe('getDegree', () => {
  it('returns a positive number for a well-connected node', () => {
    const degree = getDegree('features-are-prompts-not-code');
    expect(degree).toBeGreaterThan(0);
  });

  it('equals sum of outgoing + incoming lengths', () => {
    const conn = getConnections('features-are-prompts-not-code');
    const degree = getDegree('features-are-prompts-not-code');
    expect(degree).toBe(conn.outgoing.length + conn.incoming.length);
  });

  it('returns 0 for unknown slug', () => {
    expect(getDegree('nonexistent-slug')).toBe(0);
  });
});
