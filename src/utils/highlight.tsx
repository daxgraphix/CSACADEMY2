import React from 'react';

interface HighlightProps {
  text: string;
  query: string;
  className?: string;
}

/**
 * Renders `text` with every case-insensitive occurrence of `query`
 * wrapped in a <mark> element so users can visually locate matches.
 */
export const Highlight: React.FC<HighlightProps> = ({ text, query, className }) => {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={i} className={className ?? 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)] rounded-[2px] px-0.5'}>
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export const countMatches = (items: { category: string }[], category: string): number => {
  if (category === 'ALL') return items.length;
  return items.filter((i) => i.category === category).length;
};
