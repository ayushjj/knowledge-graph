import { memo } from 'react';
import { getBezierPath, BaseEdge, type Edge, type EdgeProps } from '@xyflow/react';

export interface BoardEdgeData {
  topicColor: string;
  dimmed: boolean;
  highlighted: boolean;
  [key: string]: unknown;
}

export type BoardEdgeType = Edge<BoardEdgeData, 'boardEdge'>;

function BoardEdgeInner({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<BoardEdgeType>) {
  const topicColor = data?.topicColor ?? '#64748b';
  const dimmed = data?.dimmed ?? false;
  const highlighted = data?.highlighted ?? false;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  let strokeOpacity = 0.4;
  let strokeWidth = 1.5;

  if (dimmed) {
    strokeOpacity = 0.08;
    strokeWidth = 0.5;
  } else if (highlighted) {
    strokeOpacity = 0.6;
    strokeWidth = 2.5;
  }

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: topicColor,
        strokeOpacity,
        strokeWidth,
        transition: 'stroke-opacity 0.2s, stroke-width 0.2s',
      }}
    />
  );
}

export const BoardEdge = memo(BoardEdgeInner);
