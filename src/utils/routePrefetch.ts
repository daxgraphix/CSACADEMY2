type RoutePrefetcher = () => Promise<unknown>;

// Keep route chunks lazy on first load, but prepare them as soon as a user
// shows intent to navigate. The browser/module cache then makes the click
// resolve without showing an intermediate loading state.
const routePrefetchers: Record<string, RoutePrefetcher> = {
  '/': () => import('../pages/MarketingHomePage'),
  '/academy': () => import('../pages/HomePage'),
  '/programs': () => import('../pages/ProgramsPage'),
  '/programs/ai': () => import('../pages/ProgramDeepDivePage'),
  '/programs/cybersecurity': () => import('../pages/ProgramDeepDivePage'),
  '/programs/digital-skills': () => import('../pages/ProgramDeepDivePage'),
  '/vibe-coding': () => import('../pages/VibeCodingPage'),
  '/devpad': () => import('../pages/DevPadPage'),
  '/learning-formats': () => import('../pages/LearningFormatsPage'),
  '/for-organizations': () => import('../pages/ForOrganizationsPage'),
  '/resources': () => import('../pages/ResourcesPage'),
  '/blog': () => import('../pages/BlogPage'),
  '/about': () => import('../pages/AboutPage'),
  '/contact': () => import('../pages/ContactPage'),
  '/request-training': () => import('../pages/IndividualRequestPage'),
  '/pricing': () => import('../pages/PricingPage'),
  '/features': () => import('../pages/FeaturesPage'),
  '/instructors': () => import('../pages/InstructorsPage'),
  '/privacy': () => import('../pages/LegalPage'),
  '/terms': () => import('../pages/LegalPage')
};

const prefetchedRoutes = new Set<string>();

export const prefetchRoute = (href: string) => {
  const path = href.split(/[?#]/, 1)[0] || '/';
  const load = routePrefetchers[path];

  if (!load || prefetchedRoutes.has(path)) return;

  prefetchedRoutes.add(path);
  void load().catch(() => {
    // Allow a later interaction to retry after a transient network failure.
    prefetchedRoutes.delete(path);
  });
};
