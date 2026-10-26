/**
 * Format a publication date in a friendly, locale-aware way.
 * Accepts either a full ISO string (e.g. "2026-03-14") or a year-only
 * value (e.g. "2026"). Year-only inputs are displayed as the year alone
 * so we never fabricate a day/month.
 */
export const formatPublishedDate = (value: string): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (/^\d{4}$/.test(trimmed)) return trimmed;

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return trimmed;

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Convert a publication date to a stable ISO 8601 string suitable for
 * JSON-LD / schema.org markup. Falls back to the raw value if parsing
 * fails so we never emit an invalid date to search engines.
 */
export const toIsoDate = (value: string): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) return trimmed;
  return date.toISOString();
};
