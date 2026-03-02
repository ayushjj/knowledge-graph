export const TOPIC_COLORS: Record<string, string> = {
  'ai-agents': '#6366f1',
  'ai-native-product-architecture': '#8b5cf6',
  'ai-coding-tools': '#06b6d4',
  'future-of-ai-business': '#f59e0b',
  'business-models': '#10b981',
  'knowledge-systems': '#f43f5e',
};

export const TOPIC_LABELS: Record<string, string> = {
  'ai-agents': 'AI Agents',
  'ai-native-product-architecture': 'Architecture',
  'ai-coding-tools': 'Coding Tools',
  'future-of-ai-business': 'Future of AI',
  'business-models': 'Business Models',
  'knowledge-systems': 'Knowledge Systems',
};

export function getTopicColor(topic: string): string {
  return TOPIC_COLORS[topic] || '#888888';
}

export function getTopicLabel(topic: string): string {
  return TOPIC_LABELS[topic] || topic;
}
