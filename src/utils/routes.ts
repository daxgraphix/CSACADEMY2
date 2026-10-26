import { PageRoute } from '../types';

/**
 * Canonical mapping from a PageRoute identifier to its real URL path.
 * Every route in the app is registered here. This is the single source of
 * truth for site navigation.
 *
 * Adding a new route? Add it to PageRoute (src/types), then here.
 */
export const routeToPath: Record<PageRoute, string> = {
  'home': '/',
  'academy': '/academy',
  'instructors': '/instructors',
  'blog-article': '/blog/:slug',
  'resource-detail': '/resources/:slug',
  'features': '/features',
  'pricing': '/pricing',
  'programs': '/programs',
  'programs/ai': '/programs/ai',
  'programs/cybersecurity': '/programs/cybersecurity',
  'programs/digital-skills': '/programs/digital-skills',
  'vibe-coding': '/vibe-coding',
  'devpad': '/devpad',
  'learning-formats': '/learning-formats',
  'for-organizations': '/for-organizations',
  'resources': '/resources',
  'blog': '/blog',
  'about': '/about',
  'contact': '/contact',
  'individual-request': '/request-training',
  'privacy': '/privacy',
  'terms': '/terms',
  'not-found': '/not-found',
};

/**
 * Reverse lookup: URL path → PageRoute. Used by App.tsx to derive the
 * current route from the browser URL (via useLocation). Unknown paths
 * fall back to 'not-found', which renders the 404 page.
 */
export const pathToRoute: Record<string, PageRoute> = Object.entries(
  routeToPath
).reduce<Record<string, PageRoute>>((acc, [route, path]) => {
  acc[path] = route as PageRoute;
  return acc;
}, {});

/**
 * Resolve a pathname to a PageRoute, with a safe fallback to 'not-found'.
 * Handles the root path and any unmatched URL.
 */
export const resolveRoute = (pathname: string): PageRoute => {
  if (pathToRoute[pathname]) return pathToRoute[pathname];
  if (/^\/blog\/[^/]+\/?$/.test(pathname)) return 'blog-article';
  if (/^\/resources\/[^/]+\/?$/.test(pathname)) return 'resource-detail';
  return 'not-found';
};
