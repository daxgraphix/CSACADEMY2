import React from 'react';
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

  return (
    <div
      role="group"
      aria-label="Text size controls"
      className={`fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-3 z-[60] inline-flex items-center gap-1 rounded-2xl border p-1.5 shadow-lg backdrop-blur-md sm:bottom-5 sm:left-5 ${
        isDark
          ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]/95 text-white'
          : 'border-neutral-300 bg-white/95 text-neutral-900 shadow-neutral-900/15'
      }`}
    >
      <span className="sr-only">Choose a reading size</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setTextSize(option.value)}
          aria-label={option.accessibleLabel}
          aria-pressed={textSize === option.value}
          title={option.accessibleLabel}
          className={`flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
            textSize === option.value
              ? 'bg-[var(--accent-red)] text-white'
              : isDark
                ? 'text-neutral-200 hover:bg-white/10'
                : 'text-neutral-800 hover:bg-neutral-100'
          }`}
        >
          {option.label}
        </button>
      ))}
      <span className="sr-only" aria-live="polite">
        {textSize === 'normal' ? 'Standard text size selected' : textSize === 'large' ? 'Large text selected' : 'Extra large text selected'}
      </span>
    </div>
  );
};
