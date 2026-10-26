import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * jsdom does not implement scrolling, so every scroll call logs a noisy
 * "Not implemented" error. Stub it. The tests assert on structure, not on
 * scroll offsets.
 */
window.scrollTo = (() => {}) as typeof window.scrollTo;
window.scroll = (() => {}) as typeof window.scroll;

/**
 * Unmount any rendered tree after every test.
 *
 * React Testing Library only auto-registers this when Vitest globals are
 * enabled. Without it, rendered components stay in `document.body` and later
 * queries match stale duplicates (e.g. two "Programs" buttons), which makes
 * failures look like real UI bugs.
 */
afterEach(() => {
  cleanup();
});
