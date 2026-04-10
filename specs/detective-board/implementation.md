# Detective Board Visualization

**Status:** IMPLEMENTED — cards not rendering (CSS/runtime bug, investigation in progress)
**Created:** 2026-04-06
**Premise check:** PASSED — portfolio differentiation + transforms unused graph page into signature feature

## Problem

The `/graph` page uses `force-graph` (canvas-based force-directed simulation). At 161 nodes it's a visual hairball:
- No spatial meaning — position is arbitrary physics
- Labels invisible until zooming past 1.2x
- Can't scan or read content without heavy interaction
- Doesn't convey the graph's structure or topic relationships

## Solution: Detective Board

Replace with a React Flow-based "detective board" where:
- **Cards** (not circles) show insight title, description, topic color
- **String connections** (bezier edges) link related insights
- **Topic zones** cluster cards spatially — AI domain left, mental-models right
- **Scannable on first load** — color clustering visible at default zoom
- **Interactive** — click to highlight connections, double-click to navigate

## Tech Stack

- `@xyflow/react` v12 (React Flow)
- Custom topic-zone layout algorithm (no dagre/ELK dependency)
- Reuses existing `graph-data.json` pipeline, topic color system, filter UI pattern

## Node Distribution

| Topic | Domain | Count |
|-------|--------|-------|
| ai-agents | ai | 54 |
| ai-native-product-architecture | ai | 25 |
| future-of-ai-business | ai | 20 |
| ai-coding-tools | ai | 15 |
| knowledge-systems | ai | 12 |
| business-models | ai | 11 |
| decision-making | mental-models | 10 |
| psychology | mental-models | 9 |
| engineering | mental-models | 3 |
| economics | mental-models | 2 |

AI: 137 nodes. Mental-models: 24 nodes. Layout handles this asymmetry.

## Files

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/board-layout.ts` | Create | Pure layout algorithm — topic zones + node positions |
| `src/components/BoardCard.tsx` | Create | Custom React Flow node — mini insight card |
| `src/components/BoardEdge.tsx` | Create | Custom React Flow edge — colored string |
| `src/components/DetectiveBoardView.tsx` | Create | Main orchestrator component |
| `src/pages/graph.astro` | Modify | Swap GraphView -> DetectiveBoardView |
| `src/styles/global.css` | Modify | Add React Flow CSS import |
| `package.json` | Modify | Add @xyflow/react dependency |

## Implementation Steps

### Step 1: Install + Compatibility Check
- `npm install @xyflow/react`
- Add CSS import to `global.css`: `@import "@xyflow/react/dist/style.css";`
- **Gate:** Render minimal React Flow with 3 hardcoded nodes on `/graph`. Confirms React 19 + Astro + React Flow v12 compatibility.

### Step 2: Layout Algorithm (`board-layout.ts`)

Pure function, no React dependency.

**Input:** Array of graph nodes (id, topics, domain, degree)
**Output:** `Map<nodeId, {x, y}>` positions + `Map<topicSlug, zoneRect>` for background labels

**Algorithm:**
1. Group nodes by primary topic (`topics[0]`), sort by degree within group
2. Separate into 2 domain columns (AI left, mental-models right)
3. Sort topics by node count descending within each column
4. Compute zone dimensions: `CARD_W=240, CARD_H=130, COLS=4, ZONE_PAD=60, ZONE_GAP=160`
5. Stack zones vertically within each column
6. Place nodes within zone in grid: `col = i % COLS`, `row = floor(i / COLS)`

### Step 3: BoardCard (`BoardCard.tsx`)

- 220px x 100px, React.memo-wrapped
- 3px topic-color top bar, title (14px bold, line-clamp-2), description (11px, line-clamp-1), degree badge
- States: normal (opacity 1), dimmed (opacity 0.15), selected (glow with topic color)
- Invisible handles for edge routing

**Gate:** Check color bars and titles are distinguishable at fitView zoom (~0.25). If not, increase card size or reduce columns to 3.

### Step 4: BoardEdge (`BoardEdge.tsx`)

- Bezier curves via `getBezierPath` + `BaseEdge`
- Color: source topic color at 40% opacity
- Width: 1.5px normal, 2.5px highlighted, 0.5px dimmed
- No arrows (strings, not directed edges)

### Step 5: DetectiveBoardView (`DetectiveBoardView.tsx`)

- Wrapped in `ReactFlowProvider`
- Fetches `graph-data.json`, computes layout once, transforms to React Flow nodes/edges
- Selection: click node -> highlight neighbors, dim rest
- Navigation: double-click -> `/insight/{slug}`
- Filters: domain tabs + topic pills (ported from GraphView.tsx)
- Zone labels: non-interactive nodes with faint topic names (hide when zone empty after filtering)
- Config: `fitView`, `minZoom: 0.1`, `maxZoom: 1.5`, `nodesDraggable: false`
- MiniMap bottom-right with topic colors

### Step 6: Wire Up
- Update `graph.astro` to use DetectiveBoardView
- Update onboarding hint text
- Insight count badge

### Step 7: Cleanup
- `npm run check` passes
- Remove `force-graph` from package.json
- Delete old `GraphView.tsx`

## Key Design Decisions

1. **Positions computed once, filtering doesn't relayout.** Stable and predictable.
2. **No dagre/ELK dependency.** Custom grid-within-zones is simpler and gives exact layout we want.
3. **nodesDraggable: false.** Display board, not graph editor.
4. **No edge animation.** 536 animated edges = visual noise.
5. **Zone labels as React Flow nodes.** Pan/zoom with the board.

## Risks

1. **React Flow CSS vs Tailwind 4 @layer conflicts.** Mitigate: import order.
2. **Card readability at fitView zoom.** Mitigate: zoom gate at Step 3.
3. **React 19 compatibility.** Mitigate: compatibility gate at Step 1.

## Verification

1. `npm run check` passes (type check + build + validate + tests)
2. Board renders all 161 nodes on `/graph`
3. Topic clusters spatially grouped (AI left, mental-models right)
4. Click card -> neighbors highlight, rest dims
5. Double-click -> navigates to insight page
6. Domain/topic filters work
7. Minimap shows overview with topic colors
8. `npm run build` succeeds
