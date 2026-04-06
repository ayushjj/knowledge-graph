import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  type Node,
} from '@xyflow/react';
import { computeBoardLayout, type LayoutNode } from '../lib/board-layout';
import { BoardCard, type BoardCardData, type BoardCardNode } from './BoardCard';
import { BoardEdge, type BoardEdgeData, type BoardEdgeType } from './BoardEdge';
import { getTopicColor, getTopicLabel, getTopicDomain, TOPIC_COLORS, DOMAINS } from '../lib/topics';

// ── Types ──────────────────────────────────────────────

interface GraphNode {
  id: string;
  label: string;
  description: string;
  topics: string[];
  source: string;
  color: string;
  degree: number;
  domain: string;
}

interface GraphLink {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// ── Node types registry ────────────────────────────────

const nodeTypes = {
  boardCard: BoardCard,
  zoneLabel: ZoneLabelNode,
};

const edgeTypes = {
  boardEdge: BoardEdge,
};

interface ZoneLabelData {
  label: string;
  [key: string]: unknown;
}

const zoneLabelStyle: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: 'rgba(255, 255, 255, 0.12)',
  pointerEvents: 'none',
  userSelect: 'none',
  whiteSpace: 'nowrap',
};

function ZoneLabelNode({ data }: { data: ZoneLabelData }) {
  return <div style={zoneLabelStyle}>{data.label}</div>;
}

// ── Domain entries ─────────────────────────────────────

const domainEntries = Object.entries(DOMAINS);

// ── Main component ─────────────────────────────────────

interface DetectiveBoardViewProps {
  basePath: string;
}

function DetectiveBoard({ basePath }: DetectiveBoardViewProps) {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const [error, setError] = useState(false);

  // Fetch graph data
  useEffect(() => {
    fetch(`${basePath}graph-data.json`)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      })
      .then((data: GraphData) => {
        setGraphData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [basePath]);

  // Build neighbor + node-by-id lookups
  const neighbors = useMemo(() => {
    if (!graphData) return new Map<string, Set<string>>();
    const map = new Map<string, Set<string>>();
    for (const node of graphData.nodes) {
      map.set(node.id, new Set());
    }
    for (const link of graphData.links) {
      map.get(link.source)?.add(link.target);
      map.get(link.target)?.add(link.source);
    }
    return map;
  }, [graphData]);

  const nodeById = useMemo(() => {
    if (!graphData) return new Map<string, GraphNode>();
    return new Map(graphData.nodes.map(n => [n.id, n]));
  }, [graphData]);

  // Compute layout once
  const layout = useMemo(() => {
    if (!graphData) return null;
    const layoutNodes: LayoutNode[] = graphData.nodes.map(n => ({
      id: n.id,
      topics: n.topics,
      domain: n.domain,
      degree: n.degree,
    }));
    return computeBoardLayout(layoutNodes);
  }, [graphData]);

  // Multiple domains?
  const domainsInData = useMemo(() => {
    if (!graphData) return false;
    const domains = new Set(graphData.nodes.map(n => n.domain));
    return domains.size > 1;
  }, [graphData]);

  // Filter visible topics by active domain
  const visibleTopics = useMemo(() => {
    const allTopics = Object.entries(TOPIC_COLORS);
    if (!activeDomain) return allTopics;
    return allTopics.filter(([topic]) => getTopicDomain(topic) === activeDomain);
  }, [activeDomain]);

  // Clear topic when switching domains
  useEffect(() => {
    if (activeDomain && activeTopic && getTopicDomain(activeTopic) !== activeDomain) {
      setActiveTopic(null);
    }
  }, [activeDomain, activeTopic]);

  // Visible node IDs (decoupled from highlight state so edges don't cascade)
  const visibleNodeIds = useMemo(() => {
    if (!graphData) return new Set<string>();
    return new Set(
      graphData.nodes
        .filter(n => {
          if (activeDomain && n.domain !== activeDomain) return false;
          if (activeTopic && !n.topics.includes(activeTopic)) return false;
          return true;
        })
        .map(n => n.id)
    );
  }, [graphData, activeDomain, activeTopic]);

  // Build React Flow nodes
  const rfNodes = useMemo((): (BoardCardNode | Node)[] => {
    if (!graphData || !layout) return [];

    const nodes: (BoardCardNode | Node)[] = [];

    // Card nodes
    for (const gNode of graphData.nodes) {
      if (!visibleNodeIds.has(gNode.id)) continue;
      const pos = layout.positions.get(gNode.id);
      if (!pos) continue;

      const isSelected = selectedNodeId === gNode.id;
      const isNeighbor = selectedNodeId ? neighbors.get(selectedNodeId)?.has(gNode.id) ?? false : false;
      const dimmed = selectedNodeId !== null && !isSelected && !isNeighbor;

      const data: BoardCardData = {
        label: gNode.label,
        description: gNode.description,
        topicColor: getTopicColor(gNode.topics[0]),
        degree: gNode.degree,
        dimmed,
        selected: isSelected,
      };

      nodes.push({
        id: gNode.id,
        type: 'boardCard',
        position: { x: pos.x - 110, y: pos.y - 50 }, // center the 220x100 card
        data,
      });
    }

    // Zone label nodes
    for (const [topic, zone] of layout.zones) {
      const zoneHasVisibleNodes = graphData.nodes.some(
        n => n.topics[0] === topic && visibleNodeIds.has(n.id)
      );
      if (!zoneHasVisibleNodes) continue;

      nodes.push({
        id: `zone-${topic}`,
        type: 'zoneLabel',
        position: { x: zone.x + 10, y: zone.y - 30 },
        data: { label: getTopicLabel(topic) },
        selectable: false,
        draggable: false,
      });
    }

    return nodes;
  }, [graphData, layout, selectedNodeId, visibleNodeIds, neighbors]);

  // Build React Flow edges
  const rfEdges = useMemo((): BoardEdgeType[] => {
    if (!graphData) return [];

    return graphData.links
      .filter(link => visibleNodeIds.has(link.source) && visibleNodeIds.has(link.target))
      .map(link => {
        const sourceNode = nodeById.get(link.source);
        const topicColor = sourceNode ? getTopicColor(sourceNode.topics[0]) : '#64748b';

        const isHighlighted = selectedNodeId !== null && (
          link.source === selectedNodeId || link.target === selectedNodeId
        );
        const dimmed = selectedNodeId !== null && !isHighlighted;

        const data: BoardEdgeData = {
          topicColor,
          dimmed,
          highlighted: isHighlighted,
        };

        return {
          id: `${link.source}-${link.target}`,
          source: link.source,
          target: link.target,
          type: 'boardEdge' as const,
          data,
        };
      });
  }, [graphData, visibleNodeIds, selectedNodeId, nodeById]);

  // Handlers
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'zoneLabel') return;
    setSelectedNodeId(prev => prev === node.id ? null : node.id);
  }, []);

  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'zoneLabel') return;
    window.location.href = `${basePath}insight/${node.id}`;
  }, [basePath]);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // MiniMap node color
  const miniMapNodeColor = useCallback((node: Node) => {
    const topicColor = node.data?.topicColor;
    return typeof topicColor === 'string' ? topicColor : '#333';
  }, []);

  const nodeCount = graphData?.nodes.length ?? 0;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Filters */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {domainsInData && (
          <div className="inline-flex rounded-lg border border-border bg-[rgba(15,17,23,0.9)] backdrop-blur p-0.5">
            <button
              onClick={() => setActiveDomain(null)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                activeDomain === null
                  ? 'bg-white/10 text-text-primary'
                  : 'text-text-dim hover:text-text-muted'
              }`}
            >
              All
            </button>
            {domainEntries.map(([key, domain]) => (
              <button
                key={key}
                onClick={() => setActiveDomain(activeDomain === key ? null : key)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer ${
                  activeDomain === key
                    ? 'bg-white/10 text-text-primary'
                    : 'text-text-dim hover:text-text-muted'
                }`}
              >
                {domain.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {visibleTopics.map(([topic, color]) => (
            <button
              key={topic}
              onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer"
              style={activeTopic === topic ? {
                backgroundColor: color,
                color: '#0f1117',
                border: `1.5px solid ${color}`,
              } : {
                backgroundColor: 'rgba(15, 17, 23, 0.8)',
                color: '#e2e8f0',
                border: `1.5px solid ${color}`,
              }}
            >
              {getTopicLabel(topic)}
            </button>
          ))}
        </div>
      </div>

      {/* React Flow Board */}
      {!loading && (
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.08 }}
          minZoom={0.1}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <MiniMap
            nodeColor={miniMapNodeColor}
            maskColor="rgba(15, 17, 23, 0.85)"
            style={{ backgroundColor: '#1a1d27' }}
          />
        </ReactFlow>
      )}

      {/* Loading / error state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary">
          <div className="text-sm text-text-dim animate-pulse">Loading board...</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary">
          <div className="text-sm text-text-dim">Failed to load graph data.</div>
        </div>
      )}

      {/* Onboarding hint */}
      {!loading && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 rounded-xl border border-border-hover bg-bg-secondary/90 backdrop-blur px-6 py-4 text-center max-w-md animate-fade-in">
          <p className="text-[13px] text-text-muted">
            <span className="text-text-primary font-medium">Scroll</span> to zoom &middot;{' '}
            <span className="text-text-primary font-medium">Drag</span> to pan &middot;{' '}
            <span className="text-text-primary font-medium">Click a card</span> to highlight connections &middot;{' '}
            <span className="text-text-primary font-medium">Double-click</span> to read
          </p>
        </div>
      )}

      {/* Badge */}
      <div className="absolute bottom-3 left-3 z-10 text-[11px] text-text-dim">
        Ayush's Knowledge Graph &mdash; {nodeCount || '...'} insights
      </div>
    </div>
  );
}

// Wrapped export with provider
export default function DetectiveBoardView({ basePath }: DetectiveBoardViewProps): React.JSX.Element {
  return (
    <ReactFlowProvider>
      <DetectiveBoard basePath={basePath} />
    </ReactFlowProvider>
  );
}
