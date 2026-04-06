import { getTopicDomain } from './topics';

export interface LayoutNode {
  id: string;
  topics: string[];
  domain: string;
  degree: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ZoneRect {
  x: number;
  y: number;
  width: number;
  height: number;
  topic: string;
  domain: string;
}

export interface LayoutResult {
  positions: Map<string, Position>;
  zones: Map<string, ZoneRect>;
}

// Layout constants
const CARD_W = 240;
const CARD_H = 130;
const COLS = 4;
const ZONE_PAD = 60;
const ZONE_GAP = 160;

/**
 * Compute fixed positions for all nodes in a topic-zone grid layout.
 * AI topics on the left, mental-models on the right.
 * Within each zone, nodes are sorted by degree (highest first) and placed in a grid.
 */
export function computeBoardLayout(nodes: LayoutNode[]): LayoutResult {
  // 1. Group nodes by primary topic
  const byTopic = new Map<string, LayoutNode[]>();
  for (const node of nodes) {
    const topic = node.topics[0] ?? 'uncategorized';
    const group = byTopic.get(topic) ?? [];
    group.push(node);
    byTopic.set(topic, group);
  }

  // Sort each group by degree descending
  for (const group of byTopic.values()) {
    group.sort((a, b) => b.degree - a.degree);
  }

  // 2. Separate into domain columns
  const aiTopics: [string, LayoutNode[]][] = [];
  const mmTopics: [string, LayoutNode[]][] = [];

  for (const [topic, group] of byTopic) {
    const domain = getTopicDomain(topic);
    if (domain === 'mental-models') {
      mmTopics.push([topic, group]);
    } else {
      aiTopics.push([topic, group]);
    }
  }

  // 3. Sort topics by node count descending (largest zones on top)
  aiTopics.sort((a, b) => b[1].length - a[1].length);
  mmTopics.sort((a, b) => b[1].length - a[1].length);

  const positions = new Map<string, Position>();
  const zones = new Map<string, ZoneRect>();

  // 4. Layout a column of topics, return total height
  function layoutColumn(
    topics: [string, LayoutNode[]][],
    columnX: number,
    domain: string
  ): number {
    let yOffset = 0;

    for (const [topic, group] of topics) {
      const rows = Math.ceil(group.length / COLS);
      const zoneWidth = COLS * CARD_W + 2 * ZONE_PAD;
      const zoneHeight = rows * CARD_H + 2 * ZONE_PAD;

      zones.set(topic, {
        x: columnX,
        y: yOffset,
        width: zoneWidth,
        height: zoneHeight,
        topic,
        domain,
      });

      // Place nodes in grid within zone
      for (let i = 0; i < group.length; i++) {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        positions.set(group[i].id, {
          x: columnX + ZONE_PAD + col * CARD_W + CARD_W / 2,
          y: yOffset + ZONE_PAD + row * CARD_H + CARD_H / 2,
        });
      }

      yOffset += zoneHeight + ZONE_PAD;
    }

    return yOffset;
  }

  // 5. Layout both columns
  const aiColumnX = 0;
  layoutColumn(aiTopics, aiColumnX, 'ai');

  const leftColumnWidth = COLS * CARD_W + 2 * ZONE_PAD;
  const mmColumnX = leftColumnWidth + ZONE_GAP;
  layoutColumn(mmTopics, mmColumnX, 'mental-models');

  return { positions, zones };
}
