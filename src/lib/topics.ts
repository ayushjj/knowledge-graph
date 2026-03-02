import topicData from './topics.json';

// Build lookup maps from the single source of truth
export const TOPIC_COLORS: Record<string, string> = {};
export const TOPIC_LABELS: Record<string, string> = {};
const TOPIC_DOMAINS: Record<string, string> = {};

for (const [slug, info] of Object.entries(topicData.topics)) {
  TOPIC_COLORS[slug] = info.color;
  TOPIC_LABELS[slug] = info.label;
  TOPIC_DOMAINS[slug] = info.domain;
}

// Domain registry
export const DOMAINS: Record<string, { label: string; description: string }> = topicData.domains;

export function getTopicColor(topic: string): string {
  return TOPIC_COLORS[topic] || '#888888';
}

export function getTopicLabel(topic: string): string {
  return TOPIC_LABELS[topic] || topic;
}

export function getTopicDomain(topic: string): string {
  return TOPIC_DOMAINS[topic] || 'ai';
}

/** Get all topic slugs that belong to a given domain */
export function getTopicsForDomain(domain: string): string[] {
  return Object.entries(topicData.topics)
    .filter(([, info]) => info.domain === domain)
    .map(([slug]) => slug);
}

/** Get the domain for an insight based on its first topic */
export function getInsightDomain(topics: string[]): string {
  if (!topics.length) return 'ai';
  return getTopicDomain(topics[0]);
}
