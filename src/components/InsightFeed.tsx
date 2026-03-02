import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import InsightCard from './InsightCard';
import { getTopicColor, getTopicLabel } from '../lib/topics';

interface Insight {
  slug: string;
  title: string;
  description: string;
  topics: string[];
  source: string;
  degree: number;
}

interface InsightFeedProps {
  insights: Insight[];
  topics: string[];
  basePath: string;
}

export default function InsightFeed({ insights, topics, basePath }: InsightFeedProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [pagefindResults, setPagefindResults] = useState<string[] | null>(null);
  const pagefindRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load Pagefind on mount (only available after build)
  useEffect(() => {
    async function loadPagefind() {
      try {
        const pf = await import(/* @vite-ignore */ `${basePath}pagefind/pagefind.js`);
        await pf.init();
        pagefindRef.current = pf;
      } catch {
        // Pagefind not available (dev mode) — fall back to string search
      }
    }
    loadPagefind();
  }, [basePath]);

  // Debounced Pagefind search
  const runSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setPagefindResults(null);
      return;
    }
    if (!pagefindRef.current) {
      // No Pagefind — clear results so fallback filter runs
      setPagefindResults(null);
      return;
    }
    const search = await pagefindRef.current.search(query);
    const slugs = await Promise.all(
      search.results.map(async (r: any) => {
        const data = await r.data();
        // Extract slug from URL: .../insight/some-slug/ → some-slug
        const match = data.url?.match(/insight\/([^/]+)/);
        return match ? match[1] : null;
      })
    );
    setPagefindResults(slugs.filter(Boolean));
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(search), 150);
    return () => clearTimeout(debounceRef.current);
  }, [search, runSearch]);

  const filtered = useMemo(() => {
    let result = insights;

    if (activeTopic) {
      result = result.filter(i => i.topics.includes(activeTopic));
    }

    if (search.trim()) {
      if (pagefindResults) {
        // Pagefind available — filter by matched slugs
        const slugSet = new Set(pagefindResults);
        result = result.filter(i => slugSet.has(i.slug));
      } else {
        // Fallback: simple string matching (dev mode)
        const q = search.toLowerCase();
        result = result.filter(i =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.source.toLowerCase().includes(q)
        );
      }
    }

    return result;
  }, [insights, activeTopic, search, pagefindResults]);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search insights..."
          className="w-full rounded-lg border border-border bg-bg-secondary py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-dim focus:border-border-hover focus:outline-none focus:ring-1 focus:ring-border-hover transition-colors"
        />
      </div>

      {/* Topic pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {topics.map(topic => {
          const isActive = activeTopic === topic;
          const color = getTopicColor(topic);
          return (
            <button
              key={topic}
              onClick={() => setActiveTopic(isActive ? null : topic)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer"
              style={isActive ? {
                backgroundColor: color,
                color: '#0f1117',
                border: `1.5px solid ${color}`,
              } : {
                backgroundColor: 'transparent',
                color: '#e2e8f0',
                border: `1.5px solid ${color}60`,
              }}
            >
              {getTopicLabel(topic)}
            </button>
          );
        })}
        {activeTopic && (
          <button
            onClick={() => setActiveTopic(null)}
            className="rounded-full px-3 py-1 text-xs text-text-dim hover:text-text-muted transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-text-dim">
        {filtered.length === insights.length
          ? `${insights.length} insights`
          : `${filtered.length} of ${insights.length} insights`
        }
      </p>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(insight => (
          <InsightCard
            key={insight.slug}
            basePath={basePath}
            {...insight}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-text-dim">
          <p className="text-sm">No insights match your search.</p>
        </div>
      )}
    </div>
  );
}
