import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AppProvider } from './context/AppContext';
import { routeToPath } from './utils/routes';

const PUBLIC_ROUTES = Object.entries(routeToPath).filter(([route]) => route !== 'not-found');

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppProvider>
          <App />
        </AppProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

describe('App route rendering', () => {
  it.each(PUBLIC_ROUTES)('renders %s without crashing', async (_route, path) => {
    const { container, unmount } = renderAt(path);

    // The chrome (header + footer) renders on every route.
    await waitFor(() => {
      expect(container.querySelector('#main-header')).not.toBeNull();
      expect(container.querySelector('#main-footer')).not.toBeNull();
    });

    // The page body must not be empty (the route component is lazy-loaded).
    const main = container.querySelector('#main-content');
    expect(main).not.toBeNull();
    await waitFor(
      () => {
        expect((main as HTMLElement).textContent?.trim().length).toBeGreaterThan(0);
      },
      { timeout: 5000 }
    );

    unmount();
  });

  it('renders the 404 page for an unknown path', async () => {
    renderAt('/this-page-does-not-exist');

    await waitFor(() => {
      expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
  });

  it('exposes a skip link and a main landmark', async () => {
    const { container } = renderAt('/');

    await waitFor(() => {
      expect(container.querySelector('#main-header')).not.toBeNull();
    });

    const skip = container.querySelector('.skip-link') as HTMLAnchorElement;
    expect(skip).not.toBeNull();
    expect(skip.getAttribute('href')).toBe('#main-content');
    expect(container.querySelector('#main-content')).not.toBeNull();
  });
});
