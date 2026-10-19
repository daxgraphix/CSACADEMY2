import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCohortUrgency } from './useCohortUrgency';

describe('useCohortUrgency', () => {
  it('returns a live countdown, deadline label and seat count', () => {
    const { result } = renderHook(() => useCohortUrgency(1_000));

    expect(result.current.deadlineLabel).toMatch(/^[A-Z][a-z]{2},\s+\d{1,2}\s+[A-Z][a-z]{2}$/);
    expect(result.current.seatsLeft).toBeGreaterThanOrEqual(0);
    expect(result.current.seatsLeft).toBeLessThanOrEqual(24);
    expect(result.current.countdown).toMatch(/left|closed|Closing soon/);
    expect(result.current.startDate).toMatch(/^[A-Z][a-z]+/);
  });

  it('exposes a closed flag once the deadline has passed', () => {
    const { result } = renderHook(() => useCohortUrgency(1_000));

    expect(typeof result.current.closed).toBe('boolean');
  });
});