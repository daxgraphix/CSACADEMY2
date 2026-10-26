import { describe, expect, it } from 'vitest';
import { pathToRoute, resolveRoute, routeToPath } from './routes';

describe('route mapping', () => {
  it('round trips every registered route', () => {
    for (const [route, path] of Object.entries(routeToPath)) {
      expect(resolveRoute(path)).toBe(route);
      expect(pathToRoute[path]).toBe(route);
    }
  });
  it('uses the not found route for unknown paths', () => {
    expect(resolveRoute('/not-a-real-page')).toBe('not-found');
  });
});
