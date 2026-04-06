import { memo } from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';

export interface BoardCardData {
  label: string;
  description: string;
  topicColor: string;
  degree: number;
  dimmed: boolean;
  selected: boolean;
  [key: string]: unknown;
}

export type BoardCardNode = Node<BoardCardData, 'boardCard'>;

function BoardCardInner({ data }: NodeProps<BoardCardNode>) {
  const { label, description, topicColor, degree, dimmed, selected } = data;

  return (
    <div
      style={{
        width: 220,
        height: 100,
        opacity: dimmed ? 0.15 : 1,
        boxShadow: selected ? `0 0 12px 2px ${topicColor}` : 'none',
        transition: 'opacity 0.2s, box-shadow 0.2s',
      }}
      className="relative rounded-lg border border-border bg-bg-card overflow-hidden"
    >
      {/* Topic color bar */}
      <div
        style={{ backgroundColor: topicColor, height: 3 }}
        className="w-full"
      />

      {/* Content */}
      <div className="px-2.5 pt-1.5 pb-2">
        <div
          className="text-text-primary font-semibold leading-tight"
          style={{ fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {label}
        </div>
        <div
          className="text-text-muted mt-0.5"
          style={{ fontSize: 11, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {description}
        </div>
      </div>

      {/* Degree badge */}
      <div
        className="absolute bottom-1.5 right-2 text-text-dim font-mono"
        style={{ fontSize: 10 }}
      >
        {degree}
      </div>

      {/* Invisible handles for edge routing */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, width: 1, height: 1 }} />
    </div>
  );
}

export const BoardCard = memo(BoardCardInner);
