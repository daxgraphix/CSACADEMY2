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

  it('always points at a cohort whose enrolment is still open', () => {
    // The deadline for the current cohort has already passed — the site must
    // roll forward instead of showing a dead "Enrolment closed" state.
    vi.useFakeTimers({ now: new Date('2026-10-19T12:00:00Z').getTime() });
    setNextCohortStart(undefined);

    const start = getCohortStart();
    expect(start.getDay()).toBe(1);
    expect(getCohortEnrollmentDeadline().getTime()).toBeGreaterThan(Date.now());

    vi.useRealTimers();
  });

  it('rolls forward week by week as the calendar advances', () => {
    setNextCohortStart(undefined);

    const week1 = getCohortStart().getTime();
    // Advance a full week: the site must point at a later cohort, never backwards.
    vi.useFakeTimers({ now: new Date(week1 + 7 * 24 * 60 * 60 * 1000).getTime() });
    const week2 = getCohortStart();
    expect(week2.getTime()).toBeGreaterThan(week1);
    expect(week2.getDay()).toBe(1);
    expect(getCohortEnrollmentDeadline().getTime()).toBeGreaterThan(Date.now());

    vi.useRealTimers();
  });
});