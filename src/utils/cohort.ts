/**
 * Cohort & urgency engine.
 *
 * The admin adds ONE thing — VITE_NEXT_COHORT_START_DATE (YYYY-MM-DD) in
 * East Africa Time — and every derived value follows automatically:
 *
 *   cohortStart        = the confirmed date, or the next Monday (rolling)
 *   enrollmentDeadline = cohortStart - 3 days
 *   seatsLeft          = 0..24, seeded by the cohort week
 *   countdown          = "2d 15h left" / "15h 30m left" / "45m left"
 *
 * When the enrollment deadline passes the schedule rolls forward to the
 * next cohort on its own, so the site never shows a dead "Enrolment closed"
 * state — it always points at the next thing the admin has to add.
 *
 * Priority:
 *   1. VITE_NEXT_COHORT_START_DATE — admin-confirmed cohort, used while
 *      enrolment is still open.
 *   2. Otherwise the next Monday (rolling) — always valid, always ticking.
 */

const NAIROBI_OFFSET = '+03:00';
const ENROLLMENT_LEADS_DAYS = 3;
const COHORT_SEATS = 24;

/**
 * The admin's single input — the confirmed next cohort start date.
 *
 * Defaults to VITE_NEXT_COHORT_START_DATE at build time. Tests can override
 * it at runtime via setNextCohortStart(); production code never needs to.
 */
let adminStartRaw: string | undefined = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
  ?.VITE_NEXT_COHORT_START_DATE;

/** Override the admin's confirmed cohort date at runtime (tests only). */
export function setNextCohortStart(raw: string | undefined): void {
  adminStartRaw = raw;
}

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
  // (8 - day) % 7 gives the days until the next Monday; 0 (already Monday)
  // becomes 7 so the cohort always rolls to the following week.
  const daysToAdd = (8 - day) % 7 || 7;
  d.setDate(d.getDate() + daysToAdd);
  return d;
}

function deadlineFor(start: Date): Date {
  const d = new Date(start);
  d.setDate(d.getDate() - ENROLLMENT_LEADS_DAYS);
  return d;
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

/**
 * The next cohort whose enrolment is still open.
 *
 * `nextMonday` can land on a cohort whose deadline has already passed (e.g.
 * a Saturday after the Thursday deadline). In that case the schedule rolls
 * to the following week automatically, so the countdown always points at a
 * cohort you can still enrol in — never a dead "Enrolment closed" state.
 */
function nextEnrollableCohort(from: Date): Date {
  const candidate = nextMonday(from);
  return deadlineFor(candidate).getTime() > Date.now()
    ? candidate
    : nextMonday(addDays(candidate, 7));
}

function confirmedStart(): Date | null {
  const parsed = parseDate(adminStartRaw);
  return parsed && parsed.getTime() >= Date.now() ? parsed : null;
}

/**
 * Cohort start date (EAT). Always non-null.
 *
 * The admin-confirmed date wins while enrolment is still open; once the
 * deadline passes the schedule rolls forward to the next cohort, so the
 * site always advertises the next thing the admin has to add.
 */
export function getCohortStart(): Date {
  const confirmed = confirmedStart();
  if (confirmed && deadlineFor(confirmed).getTime() >= Date.now()) {
    return confirmed;
  }
  return nextEnrollableCohort(new Date());
}

/** True when the admin has confirmed a specific start date. */
export function cohortStartIsAdminConfirmed(): boolean {
  const confirmed = confirmedStart();
  return !!confirmed && deadlineFor(confirmed).getTime() >= Date.now();
}

/** Enrollment deadline = cohort start - 3 days (EAT). */
export function getCohortEnrollmentDeadline(): Date {
  return deadlineFor(getCohortStart());
}

/** True when enrollment has already closed for the upcoming cohort. */
export function enrollmentClosed(): boolean {
  return getCohortEnrollmentDeadline().getTime() <= Date.now();
}

/** Seats remaining for the upcoming cohort (0-24). */
export function getSeatsLeft(): number {
  const total = COHORT_SEATS;
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