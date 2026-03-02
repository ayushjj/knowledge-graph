import { getTopicColor, getTopicLabel } from '../lib/topics';

interface InsightCardProps {
  slug: string;
  title: string;
  description: string;
  topics: string[];
  source: string;
  degree: number;
  basePath: string;
}

export default function InsightCard({ slug, title, description, topics, source, degree, basePath }: InsightCardProps) {
  const primaryColor = getTopicColor(topics[0]);

  return (
    <a
      href={`${basePath}insight/${slug}`}
      className="group relative block rounded-xl border border-border bg-bg-card p-5 transition-all duration-250 hover:border-border-hover hover:-translate-y-0.5"
      style={{
        boxShadow: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px -12px ${primaryColor}25, 0 4px 12px -4px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        {topics.map(topic => (
          <span
            key={topic}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{
              backgroundColor: `${getTopicColor(topic)}15`,
              color: getTopicColor(topic),
              border: `1px solid ${getTopicColor(topic)}25`,
            }}
          >
            {getTopicLabel(topic)}
          </span>
        ))}
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-text-primary group-hover:text-white transition-colors duration-200">
        {title}
      </h3>

      <p className="mt-2 text-[13px] leading-relaxed text-text-muted line-clamp-3">
        {description}
      </p>

      <div className="mt-4 flex items-center justify-between text-[11px] text-text-dim">
        <span className="truncate max-w-[70%]">{source}</span>
        {degree > 0 && (
          <span className="flex items-center gap-1 shrink-0 tabular-nums">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
              <circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" />
              <line x1="12" y1="8" x2="5" y2="16" /><line x1="12" y1="8" x2="19" y2="16" />
            </svg>
            {degree}
          </span>
        )}
      </div>
    </a>
  );
}
