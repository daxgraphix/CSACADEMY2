import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AppProvider } from '../context/AppContext';

const renderNavbar = (currentRoute = 'home', path = '/') => {
  const openBookingModal = vi.fn();
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppProvider>
        <Navbar
          currentRoute={currentRoute as never}
          openBookingModal={openBookingModal}
        />
      </AppProvider>
    </MemoryRouter>
  );
  return { openBookingModal };
};

describe('Navbar', () => {
  it('renders the primary navigation as real links', () => {
    renderNavbar();
    const nav = screen.getByRole('navigation', { name: 'Primary' });

    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Academy' })).toHaveAttribute('href', '/academy');
    expect(within(nav).getByRole('link', { name: 'Teams' })).toHaveAttribute('href', '/for-organizations');
    expect(within(nav).getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '/pricing');
  });

  it('marks the active page for assistive technology', () => {
    renderNavbar('pricing');
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('exposes the programs dropdown as an accessible menu trigger', () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: /programs/i });
    expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveAttribute('aria-controls');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', 'nav-link-programs-dropdown-panel');
  });

  it('toggles the dropdown with a keyboard-activated click', () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: /programs/i });

    // Enter/Space on a button fires a click with detail === 0, so it toggles.
    fireEvent.click(trigger, { detail: 0 });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger, { detail: 0 });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the dropdown when the user clicks elsewhere', () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: /programs/i });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.mouseDown(document.body);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the programs dropdown on Escape and returns focus to the trigger', () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: /programs/i });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });

  it('keeps the programs dropdown open when a mouse click follows the hover', () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: /programs/i });

    fireEvent.mouseEnter(trigger.parentElement as HTMLElement);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // A real mouse click fires after mouseenter; the menu must not snap shut.
    fireEvent.click(trigger, { detail: 1 });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('links the programs dropdown entries to real routes', () => {
    renderNavbar();
    const trigger = screen.getByRole('button', { name: /programs/i });
    fireEvent.click(trigger);

    expect(screen.getByRole('link', { name: /All Programs & Courses/i })).toHaveAttribute('href', '/programs');
    expect(screen.getByRole('link', { name: /Vibe Coding/i })).toHaveAttribute('href', '/vibe-coding');
    expect(screen.getByRole('link', { name: /AI & Prompting/i })).toHaveAttribute('href', '/programs/ai');
    expect(screen.getByRole('link', { name: /Cybersecurity Academy/i })).toHaveAttribute('href', '/programs/cybersecurity');
    expect(screen.getByRole('link', { name: /Full-Stack & Digital Skills/i })).toHaveAttribute('href', '/programs/digital-skills');
    expect(screen.getByRole('link', { name: /DevPad/i })).toHaveAttribute('href', '/devpad');
  });

  it('collapses the desktop bar into a single More menu on large screens', () => {
    renderNavbar();
    // Formats, Resources and About live behind the "More" dropdown, keeping the
    // primary bar from overflowing at the lg breakpoint.
    expect(screen.getByRole('button', { name: /more/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'About' })).not.toBeInTheDocument();
  });

  it('opens the mobile drawer with real links and a trapped dialog', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /open navigation menu/i });

    fireEvent.click(toggle);

    const drawer = screen.getByRole('dialog', { name: 'Mobile navigation' });
    expect(within(drawer).getByRole('link', { name: /Full Academy/i })).toHaveAttribute('href', '/academy');
    expect(within(drawer).getByRole('link', { name: /Pricing & Plans/i })).toHaveAttribute('href', '/pricing');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the mobile drawer on Escape', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(toggle);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Mobile navigation' })).not.toBeInTheDocument();
  });

  it('links the brand back to the home page', () => {
    const { container } = render(
      <MemoryRouter>
        <AppProvider>
          <Navbar currentRoute="home" openBookingModal={vi.fn()} />
        </AppProvider>
      </MemoryRouter>
    );
    const brand = container.querySelector('#brand-logo-btn') as HTMLAnchorElement;
    expect(brand).not.toBeNull();
    expect(brand.tagName).toBe('A');
    expect(brand).toHaveAttribute('href', '/');
  });

  it('exposes a WhatsApp link in the header', () => {
    renderNavbar();
    const whatsapp = screen.getByRole('link', { name: /whatsapp/i });
    expect(whatsapp).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
