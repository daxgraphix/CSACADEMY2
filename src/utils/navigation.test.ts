import { describe, expect, it } from 'vitest';
import {
  primaryNav,
  programsNav,
  moreNav,
  mobileNav,
  footerColumns,
  legalNav,
  allNavLinks
} from '../data/navigation';
import { routeToPath } from '../utils/routes';
import { navHref, isRouteActive } from './navigation';

/**
 * The navigation model is the single source of truth for every internal link
 * on the site. These tests make sure a link can never point at a route that
 * does not exist, and that the header, drawer and footer stay in sync.
 */

const ALL_ROUTES = Object.keys(routeToPath);

describe('navigation model', () => {
  it('only links to registered routes', () => {
    for (const link of allNavLinks) {
      expect(ALL_ROUTES).toContain(link.route);
    }
  });

  it('builds a path for every link, with the hash appended when present', () => {
    for (const link of allNavLinks) {
      const href = navHref(link);
      expect(href.startsWith('/')).toBe(true);
      if (link.hash) {
        expect(href).toBe(`${routeToPath[link.route]}#${link.hash}`);
      } else {
        expect(href).toBe(routeToPath[link.route]);
      }
    }
  });

  it('uses unique ids so React keys and DOM ids never collide', () => {
    const ids = allNavLinks.map((link) => link.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('always has a non-empty label for assistive technology', () => {
    for (const link of allNavLinks) {
      expect(link.label.trim().length).toBeGreaterThan(0);
    }
  });

  it('covers every public route from the header or the footer', () => {
    const reachable = new Set(
      [
        ...primaryNav,
        ...programsNav,
        ...moreNav,
        ...mobileNav,
        ...legalNav,
        ...footerColumns.flatMap((c) => c.items)
      ].map((link) => link.route)
    );

    // 'not-found' is a fallback, not a destination, so it is excluded.
    for (const route of ALL_ROUTES.filter((r) => r !== 'not-found')) {
      expect(reachable).toContain(route);
    }
  });

  it('gives every footer organization link a distinct destination', () => {
    const destinations = footerColumns
      .find((column) => column.id === 'footer-organizations')!
      .items.map((item) => navHref(item));

    expect(new Set(destinations).size).toBe(destinations.length);
  });

  it('links the legal pages', () => {
    expect(legalNav.map((link) => navHref(link))).toEqual(['/privacy', '/terms']);
  });
});

describe('isRouteActive', () => {
  it('matches the exact route', () => {
    expect(isRouteActive('pricing', 'pricing')).toBe(true);
    expect(isRouteActive('pricing', 'home')).toBe(false);
  });

  it('keeps the Programs menu active on its child pages', () => {
    expect(isRouteActive('programs/ai', 'programs')).toBe(true);
    expect(isRouteActive('programs', 'programs')).toBe(true);
    expect(isRouteActive('pricing', 'programs')).toBe(false);
  });
});
