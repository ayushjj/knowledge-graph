import { useEffect, useRef, useState, useMemo } from 'react';
import { getTopicColor, getTopicLabel, TOPIC_COLORS, DOMAINS, getTopicDomain } from '../lib/topics';

interface GraphNode {
  id: string;
  label: string;
  description: string;
  topics: string[];
  source: string;
  color: string;
  degree: number;
  domain: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface GraphViewProps {
  basePath: string;
}

const domainEntries = Object.entries(DOMAINS);

export default function GraphView({ basePath }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [domainsInData, setDomainsInData] = useState(false);
  const neighborsRef = useRef<Record<string, Set<string>>>({});
  const nodeByIdRef = useRef<Record<string, GraphNode>>({});

  // Filter topic pills by active domain
  const visibleTopics = useMemo(() => {
    const allTopics = Object.entries(TOPIC_COLORS);
    if (!activeDomain) return allTopics;
    return allTopics.filter(([topic]) => getTopicDomain(topic) === activeDomain);
  }, [activeDomain]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const ForceGraph = (await import('force-graph')).default;
      const res = await fetch(`${basePath}graph-data.json`);
      const data: GraphData = await res.json();

      if (cancelled || !containerRef.current) return;

      // Check if multiple domains exist in data
      const domains = new Set(data.nodes.map(n => n.domain));
      setDomainsInData(domains.size > 1);

      // Build neighbor lookup
      const neighbors: Record<string, Set<string>> = {};
      const nodeById: Record<string, GraphNode> = {};
      for (const node of data.nodes) {
        nodeById[node.id] = node;
        neighbors[node.id] = new Set();
      }
      for (const link of data.links) {
        const s = typeof link.source === 'object' ? link.source.id : link.source;
        const t = typeof link.target === 'object' ? link.target.id : link.target;
        neighbors[s]?.add(t);
        neighbors[t]?.add(s);
      }
      neighborsRef.current = neighbors;
      nodeByIdRef.current = nodeById;

      const maxDegree = Math.max(...data.nodes.map(n => n.degree));

      const graph = (ForceGraph as any)()(containerRef.current)
        .graphData(data)
        .backgroundColor('#0f1117')
        .nodeId('id')
        .nodeVal((n: any) => 3 + (n.degree / maxDegree) * 25)
        .nodeColor((n: any) => {
          if (activeDomain && n.domain !== activeDomain) return 'rgba(100,100,100,0.15)';
          if (activeTopic && !n.topics.includes(activeTopic)) return 'rgba(100,100,100,0.15)';
          if (selectedNode && selectedNode !== n.id && !neighbors[selectedNode]?.has(n.id)) return 'rgba(100,100,100,0.15)';
          return n.color;
        })
        .nodeCanvasObjectMode(() => 'after')
        .nodeCanvasObject((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          if (globalScale < 1.2) return;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter, Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (activeDomain && node.domain !== activeDomain) {
            ctx.fillStyle = 'rgba(100,100,100,0.2)';
          } else if (activeTopic && !node.topics.includes(activeTopic)) {
            ctx.fillStyle = 'rgba(100,100,100,0.2)';
          } else if (selectedNode && selectedNode !== node.id && !neighbors[selectedNode]?.has(node.id)) {
            ctx.fillStyle = 'rgba(100,100,100,0.2)';
          } else {
            ctx.fillStyle = '#e2e8f0';
          }

          const r = Math.sqrt(3 + (node.degree / maxDegree) * 25) * 2;
          ctx.fillText(node.label, node.x, node.y + r + fontSize);
        })
        .linkColor(() => 'rgba(100, 116, 139, 0.2)')
        .linkWidth(0.4)
        .linkDirectionalArrowLength(3.5)
        .linkDirectionalArrowRelPos(1)
        .linkDirectionalArrowColor(() => 'rgba(100, 116, 139, 0.35)')
        .cooldownTicks(400)
        .onNodeClick((node: any) => {
          if (!node) return;
          window.location.href = `${basePath}insight/${node.id}`;
        })
        .onEngineStop(() => {
          graph.zoomToFit(1000, 80);
        });

      graph.d3Force('charge').strength(-1500);
      graph.d3Force('link').distance(200);

      graphRef.current = graph;
      setLoading(false);
    }

    init();
    return () => { cancelled = true; };
  }, [basePath]);

  // Re-render colors when filters change
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.nodeColor(graphRef.current.nodeColor());
    }
  }, [activeDomain, activeTopic, selectedNode]);

  // Clear topic when switching domains
  useEffect(() => {
    if (activeDomain && activeTopic && getTopicDomain(activeTopic) !== activeDomain) {
      setActiveTopic(null);
    }
  }, [activeDomain, activeTopic]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Filters */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {/* Domain tabs — only show if multiple domains exist */}
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

        {/* Topic filter pills */}
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

      {/* Graph container */}
      <div ref={containerRef} className="h-full w-full" />

      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary">
          <div className="text-sm text-text-dim animate-pulse">Loading graph...</div>
        </div>
      )}

      {/* Onboarding hint */}
      {!loading && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 rounded-xl border border-border-hover bg-bg-secondary/90 backdrop-blur px-6 py-4 text-center max-w-md animate-fade-in">
          <p className="text-[13px] text-text-muted">
            <span className="text-text-primary font-medium">Scroll</span> to zoom &middot;{' '}
            <span className="text-text-primary font-medium">Drag</span> to pan &middot;{' '}
            <span className="text-text-primary font-medium">Click a node</span> to read
          </p>
        </div>
      )}

      {/* Badge */}
      <div className="absolute bottom-3 left-3 z-10 text-[11px] text-text-dim">
        Ayush's Knowledge Graph &mdash; {Object.keys(nodeByIdRef.current).length || '...'} insights
      </div>
    </div>
  );
}
