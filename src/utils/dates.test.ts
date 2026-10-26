import { describe, expect, it } from 'vitest';
import { formatPublishedDate, toIsoDate } from './dates';

describe('publication dates', () => {
  it('keeps year-only values precise', () => {
    expect(formatPublishedDate('2024')).toBe('2024');
    expect(toIsoDate('2024')).toBe('2024-01-01');
  });
  it('formats valid dates and preserves invalid source values', () => {
    expect(formatPublishedDate('2024-03-14')).toBe('March 14, 2024');
    expect(toIsoDate('not-a-date')).toBe('not-a-date');
    expect(formatPublishedDate('not-a-date')).toBe('not-a-date');
  });
});
