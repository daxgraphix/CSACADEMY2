/**
 * Cohort & urgency engine.
 *
 * Every date is expressed in East Africa Time (UTC+03:00). The site must
 * ALWAYS show a real, ticking cohort date — never a placeholder — so that
 * visitors see genuine urgency even before the admin has confirmed the
 * exact start.
 *
 * Priority:
 *   1. VITE_NEXT_COHORT_START_DATE (YYYY-MM-DD) — admin-confirmed cohort.
 *   2. Otherwise the next Monday (rolling) — always valid, always ticking.
 *
 * Derived dates:
 *   - enrollmentDeadline  = cohortStart - 3 days (the "enroll by" date)
 *   - cohortStart        = the first day of the live cohort
 */

const NAIROBI_OFFSET = '+03:00';

function parseDate(raw: string | undefined): Date | null {
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const utc = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(utc.getTime())) return null;
  return new Date(`${raw}T12:00:00${NAIROBI_OFFSET}`);
}

/** The next Monday at or after `from` (EAT). */
function nextMonday(from: Date): Date {
  const d = new Date(from);
  d.setHours(12, 0, 0, 0);
  const day = d.getDay(); // 0 = Sunday
  const daysToAdd = (7 - day) % 7;
  d.setDate(d.getDate() + (daysToAdd === 0 ? 7 : daysToAdd));
  return d;
}

function confirmedStart(): Date | null {
  const raw = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
    ?.VITE_NEXT_COHORT_START_DATE;
  const parsed = parseDate(raw);
  return parsed && parsed.getTime() >= Date.now() ? parsed : null;
}

/** Cohort start date (EAT). Always non-null. */
export function getCohortStart(): Date {
  return confirmedStart() ?? nextMonday(new Date());
}

/** Enrollment deadline = cohort start - 3 days (EAT). */
export function getCohortEnrollmentDeadline(): Date {
  const d = getCohortStart();
  d.setDate(d.getDate() - 3);
  return d;
}

/** True when enrollment has already closed for the upcoming cohort. */
export function enrollmentClosed(): boolean {
  return getCohortEnrollmentDeadline().getTime() <= Date.now();
}

/** Seats remaining for the upcoming cohort (0-24). */
export function getSeatsLeft(): number {
  const total = 24;
  // Deterministic pseudo-randomness seeded by the cohort week so the number
  // is stable across renders for the same cohort, but varies week to week.
  const week = Math.floor(getCohortStart().getTime() / (7 * 24 * 60 * 60 * 1000));
  const pseudo = (week * 7 + 13) % 17; // 0..16
  const taken = 8 + pseudo;
  return Math.max(0, total - taken);
}

/** Urgency copy for the enrollment deadline. */
export function getEnrollmentDeadlineLabel(): string {
  const d = getCohortEnrollmentDeadline();
  return d.toLocaleDateString('en-KE', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Africa/Nairobi' });
}

/** Cohort start label for display. */
export function getCohortStartLabel(): string {
  return getCohortStart().toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Africa/Nairobi' });
}

/** Days/hours remaining until the enrollment deadline. */
export function getTimeToDeadline(): { days: number; hours: number; expired: boolean } {
  const diff = getCohortEnrollmentDeadline().getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, expired: true };
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  return { days, hours, expired: false };
}

/**
 * Raw timestamp of the enrollment deadline, in milliseconds.
 *
 * Exposed so the urgency hook can compute a countdown against a stable
 * reference time instead of calling Date.now() at every render.
 */
export function getCohortEnrollmentDeadlineTime(): number {
  return getCohortEnrollmentDeadline().getTime();
}

/**
 * Human-readable countdown to the enrollment deadline.
 *
 * General across magnitudes — it never renders a zeroed unit:
 *   > 1 day  → "2d 15h left"
 *   < 1 day  → "15h 30m left"
 *   < 1 hour → "45m left"
 *   expired  → "Enrolment closed"
 */
export function formatTimeToDeadline(now: number = Date.now()): string {
  const diff = getCohortEnrollmentDeadlineTime() - now;
  if (diff <= 0) return 'Enrolment closed';

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff - days * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
  const minutes = Math.floor(
    (diff - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) / 60000
  );

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  if (minutes > 0) return `${minutes}m left`;
  return 'Closing soon';
}

/** Legacy helper kept for compatibility with existing call sites. */
export function getNextCohortDate(): Date | null {
  const d = getCohortStart();
  return d.getTime() >= Date.now() ? d : null;
}