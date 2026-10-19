import { describe, expect, it } from 'vitest';
import {
  getCohortStart,
  getCohortEnrollmentDeadline,
  getCohortEnrollmentDeadlineTime,
  getSeatsLeft,
  getTimeToDeadline,
  formatTimeToDeadline,
  enrollmentClosed,
  getNextCohortDate
} from './cohort';

const DAY = 24 * 60 * 60 * 1000;

describe('cohort engine', () => {
  it('always returns a future cohort start', () => {
    expect(getCohortStart().getTime()).toBeGreaterThan(Date.now());
    expect(getNextCohortDate()).not.toBeNull();
  });

  it('closes enrolment three days before the cohort starts', () => {
    const start = getCohortStart().getTime();
    const deadline = getCohortEnrollmentDeadline().getTime();

    expect(start - deadline).toBeCloseTo(3 * DAY, -5);
  });

  it('keeps the enrolment deadline in the future for a rolling cohort', () => {
    expect(enrollmentClosed()).toBe(false);
    expect(getTimeToDeadline().expired).toBe(false);
    expect(getTimeToDeadline().days).toBeGreaterThanOrEqual(0);
  });

  it('reports a stable seat count within a sane range', () => {
    const seats = getSeatsLeft();

    expect(seats).toBeGreaterThanOrEqual(0);
    expect(seats).toBeLessThanOrEqual(24);
    expect(getSeatsLeft()).toBe(seats);
  });

  it('exposes the deadline as a millisecond timestamp', () => {
    expect(getCohortEnrollmentDeadlineTime()).toBeCloseTo(
      getCohortEnrollmentDeadline().getTime(),
      -5
    );
  });
});

describe('formatTimeToDeadline', () => {
  it('renders a multi-day countdown as "Nd Nh left"', () => {
    const deadline = getCohortEnrollmentDeadlineTime();
    // 2 days and 15 hours before the deadline.
    const twoDaysFifteenHoursAgo = deadline - (2 * DAY + 15 * 60 * 60 * 1000);
    expect(formatTimeToDeadline(twoDaysFifteenHoursAgo)).toBe('2d 15h left');
  });

  it('renders a sub-day countdown as "Nh Mm left"', () => {
    const deadline = getCohortEnrollmentDeadlineTime();
    // 15 hours and 30 minutes before the deadline.
    const fifteenHoursThirtyMinutesAgo = deadline - (15 * 60 * 60 * 1000 + 30 * 60 * 1000);
    expect(formatTimeToDeadline(fifteenHoursThirtyMinutesAgo)).toBe('15h 30m left');
  });

  it('renders a sub-hour countdown as "Mm left"', () => {
    const deadline = getCohortEnrollmentDeadlineTime();
    const fortyFiveMinutesAgo = deadline - 45 * 60 * 1000;
    expect(formatTimeToDeadline(fortyFiveMinutesAgo)).toBe('45m left');
  });

  it('reports "Enrolment closed" once the deadline has passed', () => {
    const deadline = getCohortEnrollmentDeadlineTime();
    expect(formatTimeToDeadline(deadline + 60_000)).toBe('Enrolment closed');
  });
});