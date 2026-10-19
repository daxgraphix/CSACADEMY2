import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  getCohortStart,
  cohortStartIsAdminConfirmed,
  getCohortEnrollmentDeadline,
  setNextCohortStart
} from './cohort';

afterEach(() => {
  setNextCohortStart(undefined);
});

/**
 * The admin adds exactly one value — VITE_NEXT_COHORT_START_DATE — and the
 * schedule adjusts itself. These tests prove that the derived values follow
 * automatically and that a passed deadline rolls forward.
 */

describe('admin-confirmed cohort', () => {
  it('uses the confirmed date while enrolment is still open', () => {
    vi.useFakeTimers({ now: new Date('2026-10-15T12:00:00Z').getTime() });
    setNextCohortStart('2026-10-20');

    const start = getCohortStart();
    expect(cohortStartIsAdminConfirmed()).toBe(true);
    expect(start.toISOString()).toContain('2026-10-20');
    // Enrollment closes 3 days before the cohort starts.
    expect(getCohortEnrollmentDeadline().toISOString()).toContain('2026-10-17');

    vi.useRealTimers();
  });

  it('rolls forward to the next cohort once the deadline has passed', () => {
    vi.useFakeTimers({ now: new Date('2026-10-18T12:00:00Z').getTime() });
    setNextCohortStart('2026-10-20');

    const start = getCohortStart();
    // The confirmed date's deadline (17 Oct) has passed, so the schedule
    // rolls forward — the admin date is no longer the active cohort.
    expect(cohortStartIsAdminConfirmed()).toBe(false);
    expect(start.toISOString()).not.toContain('2026-10-20');
    // A rolling cohort always lands on a Monday.
    expect(start.getDay()).toBe(1);

    vi.useRealTimers();
  });

  it('rolls forward when the confirmed date is itself in the past', () => {
    vi.useFakeTimers({ now: new Date('2026-10-19T12:00:00Z').getTime() });
    setNextCohortStart('2026-10-05');

    expect(cohortStartIsAdminConfirmed()).toBe(false);
    expect(getCohortStart().getDay()).toBe(1);

    vi.useRealTimers();
  });
});