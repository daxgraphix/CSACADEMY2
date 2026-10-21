import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the hash target in the URL (or back to the top when there is
 * none) after a route change.
 *
 * React Router does not do this on its own, so links such as
 * "/for-organizations#packages" would land at the top of the page instead of
 * on the requested section.
 *
 * Pages are lazy-loaded, so the target element may not exist on the first
 * commit. We poll for it for a short window rather than trusting a single
 * requestAnimationFrame.
 */
export const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let cancelled = false;

    const attempt = (tries: number) => {
      if (cancelled) return;

      if (hash) {
        const id = hash.replace(/^#/, '');
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        return;
      }

      // The lazy page has not painted its content yet. Try again briefly.
      if (tries < 20) {
        setTimeout(() => attempt(tries + 1), 50);
      }
    };

    attempt(0);

    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
};
