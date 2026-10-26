import { PageRoute } from '../types';
import { routeToPath } from './routes';

/**
 * Navigation helpers shared by the header, drawer and footer.
 *
 * Internal destinations are always built here so a link can never point at a
 * route that does not exist, and so hash targets are appended consistently.
 */

export interface NavTarget {
  route: PageRoute;
  hash?: string;
}

/** Build the href for an internal destination, e.g. "/pricing#pricing-faq". */
export const navHref = ({ route, hash }: NavTarget): string => {
  const path = routeToPath[route];
  return hash ? `${path}#${hash}` : path;
};

/**
 * True when the given route is the active one. Sub-routes (such as
 * "programs/ai" while on "programs") are treated as active too, so the
 * Programs menu keeps its highlight on its child pages.
 */
export const isRouteActive = (current: PageRoute, target: PageRoute): boolean => {
  if (current === target) return true;
  if (target === 'programs') return current.startsWith('programs');
  if (target === 'academy') return current === 'academy';
  return false;
};
