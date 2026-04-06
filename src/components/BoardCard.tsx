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
        width: 200,
        height: 90,
        opacity: dimmed ? 0.15 : 1,
        boxShadow: selected
          ? `0 0 16px 3px ${topicColor}, 0 0 0 1px ${topicColor}`
          : `0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        borderTop: `3px solid ${topicColor}`,
        background: `linear-gradient(135deg, ${topicColor}18 0%, ${topicColor}08 100%)`,
        transition: 'opacity 0.2s, box-shadow 0.2s',
      }}
      className="relative rounded-md border border-border-hover overflow-hidden"
    >
      {/* Content */}
      <div className="px-2.5 pt-2 pb-2">
        <div
          className="text-text-primary font-semibold leading-tight"
          style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {label}
        </div>
        <div
          className="mt-1"
          style={{ fontSize: 10, color: `${topicColor}aa`, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {description}
        </div>
      </div>

      {/* Degree badge */}
      <div
        className="absolute bottom-1 right-2 font-mono"
        style={{ fontSize: 9, color: `${topicColor}66` }}
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
