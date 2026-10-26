import React from 'react';
import { SearchX, FilterX, ArrowRight, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EmptyStateProps {
  title: string;
  description: string;
  hasActiveSearch?: boolean;
  hasActiveFilter?: boolean;
  searchQuery?: string;
  onClearSearch?: () => void;
  onClearFilter?: () => void;
  onClearAll?: () => void;
  onRequestTopic?: () => void;
  suggestions?: string[];
  onSuggestionClick?: (term: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  hasActiveSearch = false,
  hasActiveFilter = false,
  searchQuery,
  onClearSearch,
  onClearFilter,
  onClearAll,
  onRequestTopic,
  suggestions,
  onSuggestionClick
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const hasAnyFilter = hasActiveSearch || hasActiveFilter;
  const Icon = hasActiveSearch ? SearchX : FilterX;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`col-span-full rounded-3xl border p-8 sm:p-10 text-center space-y-5 ${
        isDark
          ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]'
          : 'border-neutral-200 bg-neutral-50'
      }`}
    >
      <div
        className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center ${
          isDark ? 'bg-white/5 text-neutral-400' : 'bg-white text-neutral-500 border border-neutral-200'
        }`}
        aria-hidden="true"
      >
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className={`text-base sm:text-lg font-extrabold ${isDark ? 'text-white' : 'text-neutral-950'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
          {description}
        </p>
        {hasActiveSearch && searchQuery && (
          <p className={`text-xs font-mono mt-2 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
            No matches for &ldquo;<span className={isDark ? 'text-neutral-200' : 'text-neutral-900'}>{searchQuery}</span>&rdquo;
          </p>
        )}
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
            Try:
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSuggestionClick?.(s)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                isDark
                  ? 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                  : 'bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
        {hasActiveSearch && onClearSearch && (
          <button
            type="button"
            onClick={onClearSearch}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
              isDark
                ? 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10'
                : 'bg-white text-neutral-800 hover:text-neutral-950 border border-neutral-200 hover:border-neutral-300'
            }`}
          >
            Clear search
          </button>
        )}
        {hasActiveFilter && onClearFilter && (
          <button
            type="button"
            onClick={onClearFilter}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-colors ${
              isDark
                ? 'bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10'
                : 'bg-white text-neutral-800 hover:text-neutral-950 border border-neutral-200 hover:border-neutral-300'
            }`}
          >
            Reset filter
          </button>
        )}
        {hasAnyFilter && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] transition-colors"
          >
            Show everything
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {onRequestTopic && (
        <div className={`pt-4 mt-2 border-t ${isDark ? 'border-[var(--border-color)]' : 'border-neutral-200'}`}>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
            Can&rsquo;t find what you need?
          </p>
          <button
            type="button"
            onClick={onRequestTopic}
            className={`mt-2 inline-flex items-center gap-1.5 text-xs font-bold ${
              isDark
                ? 'text-[var(--accent-red-strong)] hover:text-white'
                : 'text-[var(--accent-red-hover)] hover:text-[var(--accent-red-strong)]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Request this topic on WhatsApp
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
