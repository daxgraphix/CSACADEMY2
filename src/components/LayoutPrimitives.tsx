import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared layout primitives.
 *
 * These are the single source of truth for page rhythm: section spacing,
 * section headings, breadcrumbs, and the page container. Every page should
 * build out of these so spacing, headings, and depth cues stay consistent
 * across routes instead of each page re-implementing its own.
 */

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  /** Heading level. Use 'h1' for a page title, 'h2' for a section heading. */
  as?: 'h1' | 'h2' | 'h3';
  theme?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Heading = 'h2',
  theme = 'dark',
  className = ''
}) => {
  const isDark = theme === 'dark';
  const center = align === 'center';
  return (
    <div className={`space-y-3 sm:space-y-4 ${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
          isDark
            ? 'bg-red-950/60 border-red-900/60 text-[var(--accent-red-strong)]'
            : 'bg-red-50 border-red-200 text-[var(--accent-red-strong)]'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <Heading
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.04em] leading-[1.05] ${
          isDark ? 'text-white' : 'text-neutral-950'
        } ${center ? 'mx-auto max-w-3xl' : ''}`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed reading-text ${
            isDark ? 'text-neutral-400' : 'text-neutral-700'
          } ${center ? 'mx-auto max-w-2xl' : 'max-w-3xl'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * A page-level "you are here" trail. Uses router links so the browser's
 * default link behaviour (middle-click, open in new tab) keeps working while
 * still staying inside the single-page app.
 */
export const PageBreadcrumbs: React.FC<{
  items: BreadcrumbItem[];
  theme?: string;
}> = ({ items, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <nav aria-label="Breadcrumb" className="mb-5 sm:mb-7">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-medium">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.label} className="inline-flex items-center gap-2">
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className={`select-none ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}
                >
                  /
                </span>
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className={`max-w-[22rem] truncate font-semibold ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.route ?? '/'}
                  className={`hover:underline transition-colors ${
                    isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-700 hover:text-[var(--accent-red)]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};