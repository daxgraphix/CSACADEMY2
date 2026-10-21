import { useEffect, useState } from 'react';
import { getCohortStartLabel, getEnrollmentDeadlineLabel, getCohortEnrollmentDeadlineTime, getSeatsLeft, formatTimeToDeadline } from '../utils/cohort';

/**
 * Live urgency state for the upcoming cohort.
 *
 * Ticks every 60 seconds so the countdown and the "seats left" number stay
 * fresh without hammering the DOM. A 1-minute cadence is enough for a
 * countdown that only matters when it is close to expiring.
 */
export interface CohortUrgency {
  startDate: string;
  deadlineLabel: string;
  seatsLeft: number;
  countdown: string;
  closed: boolean;
}

const TICK_MS = 60_000;

export const useCohortUrgency = (tickMs: number = TICK_MS): CohortUrgency => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let active = true;
    const tick = () => {
      if (active) setNow(Date.now());
    };
    const id = setInterval(tick, tickMs);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [tickMs]);

  const deadlineTime = getCohortEnrollmentDeadlineTime();
  const closed = deadlineTime <= now;

  return {
    startDate: getCohortStartLabel(),
    deadlineLabel: getEnrollmentDeadlineLabel(),
    seatsLeft: getSeatsLeft(),
    countdown: formatTimeToDeadline(now),
    closed
  };
};
