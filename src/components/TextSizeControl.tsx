import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Type } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { TextSize } from '../context/AppContext';

const options: Array<{ value: TextSize; label: string; accessibleLabel: string }> = [
  { value: 'normal', label: 'A', accessibleLabel: 'Use standard text size' },
  { value: 'large', label: 'A+', accessibleLabel: 'Enlarge text' },
  { value: 'larger', label: 'A++', accessibleLabel: 'Use extra large text' }
];

export const TextSizeControl: React.FC = () => {
  const { theme, textSize, setTextSize } = useApp();
  const isDark = theme === 'dark';
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem('cs-text-size-control-collapsed') === '1';
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setCollapsed((current) => {
      const next = !current;
      try {
        window.localStorage.setItem('cs-text-size-control-collapsed', next ? '1' : '0');
      } catch {
        // The control remains usable for the current session if storage is blocked.
      }
      return next;
    });
  };

  const surfaceClass = isDark
    ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]/95 text-white'
    : 'border-neutral-300 bg-white/95 text-neutral-900 shadow-neutral-900/15';
  const actionClass = isDark ? 'text-neutral-200 hover:bg-white/10' : 'text-neutral-800 hover:bg-neutral-100';

  return (
    <div
      role="group"
      aria-label="Text size controls"
      className={`fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-3 z-[60] inline-flex items-center gap-1 rounded-2xl border p-1.5 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5 ${surfaceClass}`}
    >
      <span className="sr-only">Choose a reading size</span>
      {collapsed ? (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Show text size controls"
          aria-expanded={false}
          title={`Show text size controls (${textSize === 'normal' ? 'standard' : textSize === 'large' ? 'large' : 'extra large'} selected)`}
          className={`flex h-11 min-w-11 items-center justify-center gap-1 rounded-xl px-2 text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${actionClass}`}
        >
          <Type aria-hidden="true" className="h-4 w-4" />
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        </button>
      ) : (
        <>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTextSize(option.value)}
              aria-label={option.accessibleLabel}
              aria-pressed={textSize === option.value}
              title={option.accessibleLabel}
              className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${textSize === option.value ? 'bg-[var(--accent-red)] text-white' : actionClass}`}
            >
              {option.label}
            </button>
          ))}
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label="Hide text size controls"
            aria-expanded={true}
            title="Hide text size controls"
            className={`flex h-11 min-w-9 items-center justify-center rounded-xl px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${actionClass}`}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {textSize === 'normal' ? 'Standard text size selected' : textSize === 'large' ? 'Large text selected' : 'Extra large text selected'}
      </span>
    </div>
  );
};
