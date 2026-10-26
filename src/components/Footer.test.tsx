import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';
import { AppProvider } from '../context/AppContext';
import { routeToPath } from '../utils/routes';

const renderFooter = (currentRoute = 'home') =>
  render(
    <MemoryRouter>
      <AppProvider>
        <Footer currentRoute={currentRoute as never} openBookingModal={vi.fn()} />
      </AppProvider>
    </MemoryRouter>
  );

describe('Footer', () => {
  it('renders every internal link as a real anchor', () => {
    const { container } = renderFooter();

    const anchors = Array.from(container.querySelectorAll('nav[aria-label="Footer"] a'));
    expect(anchors.length).toBeGreaterThan(10);

    for (const anchor of anchors) {
      const href = anchor.getAttribute('href') ?? '';
      expect(href).not.toBe('');
      expect(href.startsWith('/')).toBe(true);
    }
  });

  it('never points an internal link at a route that does not exist', () => {
    const { container } = renderFooter();
    const knownPaths = new Set(Object.values(routeToPath));

    for (const anchor of Array.from(container.querySelectorAll('nav[aria-label="Footer"] a'))) {
      const href = anchor.getAttribute('href') ?? '';
      const [path] = href.split('#');
      expect(knownPaths).toContain(path);
    }
  });

  it('marks the current page for assistive technology', () => {
    renderFooter('pricing');
    const nav = screen.getByRole('navigation', { name: 'Footer' });
    expect(within(nav).getByRole('link', { name: 'Pricing & Plans' })).toHaveAttribute('aria-current', 'page');
  });

  it('does not open the email address in a new tab', () => {
    const { container } = renderFooter();
    const mailLink = container.querySelector('a[href^="mailto:"]');
    expect(mailLink).not.toBeNull();
    expect(mailLink).not.toHaveAttribute('target');
  });

  it('opens external social links in a new tab safely', () => {
    const { container } = renderFooter();
    const external = Array.from(container.querySelectorAll('a[href^="http"]'));

    expect(external.length).toBeGreaterThan(0);
    for (const anchor of external) {
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor.getAttribute('rel')).toContain('noopener');
    }
  });

  it('offers a tel: link for the phone number', () => {
    const { container } = renderFooter();
    expect(container.querySelector('a[href^="tel:"]')).not.toBeNull();
  });

  it('exposes the newsletter form with a labelled email field', () => {
    renderFooter();
    const input = screen.getByLabelText(/email address for the cs academy dispatch/i);
    expect(input).toHaveAttribute('id', 'footer-newsletter-email');
  });
});
