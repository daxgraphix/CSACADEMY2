import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageRoute } from '../types';
import { siteConfig } from '../config/site';
import { programsData } from '../data/programs';
import { useApp } from '../context/AppContext';
import { primaryNav, programsNav, moreNav, mobileNav } from '../data/navigation';
import { navHref, isRouteActive } from '../utils/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Sun,
  Moon,
  Home,
  Sparkles,
  Bot,
  ShieldCheck,
  Code2,
  Users,
  Layers,
  BookOpen,
  Info,
  Phone,
  CreditCard,
  Building2,
  Wallet,
  UserRound
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

type IconType = React.ComponentType<{ className?: string }>;

/* ------------------------------------------------------------------ */
/* Shared link styling with one active and inactive language for every link */
/* ------------------------------------------------------------------ */

const navLinkBase =
  'relative inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2';

const navLinkTone = (isDark: boolean, active: boolean) => {
  if (active) {
    return 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)] border border-[var(--accent-red-border)]';
  }
  return isDark
    ? 'text-neutral-300 hover:text-white hover:bg-white/5'
    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100';
};

/* ------------------------------------------------------------------ */
/* Reusable dropdown with hover + keyboard support                     */
/* ------------------------------------------------------------------ */

interface DropdownProps {
  id: string;
  label: string;
  isActive: boolean;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onClose: () => void;
  widthClass?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  isActive,
  open,
  onOpen,
  onToggle,
  onClose,
  widthClass = 'w-80',
  children
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when the pointer leaves the whole dropdown region, but never while
  // the keyboard focus is still inside it, or a keyboard user would lose the
  // menu the moment the mouse happened to drift past.
  const handleMouseLeave = () => {
    if (wrapperRef.current?.contains(document.activeElement)) return;
    onClose();
  };

  // Close when focus or pointer leaves the whole dropdown region.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, onClose]);

  // Escape closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={handleMouseLeave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onClose();
      }}
    >
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        {...(open ? { 'aria-controls': `${id}-panel` } : {})}
        onClick={(e) => {
          // A mouse click arrives after the hover handler already opened the
          // menu, so toggling here would immediately close it again. Only
          // keyboard-activated clicks (detail === 0) toggle.
          if (open && e.detail !== 0) return;
          onToggle();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`${navLinkBase} ${navLinkTone(isDark, isActive)}`}
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          id={`${id}-panel`}
          className={`absolute left-0 top-full pt-2 ${widthClass} animate-in fade-in duration-150 z-50`}
        >
          <div
            className={`border rounded-2xl p-2 shadow-2xl space-y-1 ${
              isDark ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-[var(--border-subtle)]'
            }`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

interface MenuEntry {
  id: string;
  title: string;
  description?: string;
  badge?: string;
  badgeTone?: 'red' | 'amber' | 'emerald' | 'blue' | 'purple' | 'pink';
  Icon?: IconType;
  href: string;
}

const menuEntryClasses = (isDark: boolean) =>
  `w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] ${
    isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
  }`;

const badgeClasses = (_tone: MenuEntry['badgeTone'], isDark: boolean) => {
  return `text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${
    isDark
      ? 'bg-red-950/60 text-[var(--accent-red-strong)] border-red-800/60'
      : 'bg-red-50 text-[var(--accent-red-hover)] border-red-200'
  }`;
};

/* ------------------------------------------------------------------ */

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  openBookingModal
}) => {
  const { theme, toggleTheme, t } = useApp();
  const isDark = theme === 'dark';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Any navigation closes every open menu, so the new page never renders
  // behind a stale dropdown or an open drawer.
  useEffect(() => {
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    setMoreDropdownOpen(false);
    setMobileProgramsOpen(false);
  }, [location.pathname, location.hash]);

  // Mobile drawer: trap Tab, close on Escape, and lock background scroll.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const isProgramRoute = currentRoute.startsWith('programs') || currentRoute === 'vibe-coding' || currentRoute === 'devpad';

  const totalModuleCount = useMemo(
    () => programsData.reduce((sum, pillar) => sum + (pillar.modules?.length ?? 0), 0),
    []
  );

  /* ---------------- Desktop menu definitions ---------------- */

  const programEntries: MenuEntry[] = useMemo(
    () =>
      programsNav.map((link, index) => ({
        id: link.id,
        title: link.label,
        description: link.description,
        badge: link.badge,
        badgeTone: link.badgeTone,
        href: navHref(link),
        Icon:
          index === 1
            ? Sparkles
            : index === 2
              ? Bot
              : index === 3
                ? ShieldCheck
                    : index === 7
                      ? UserRound
                      : index === 4
                  ? Code2
                  : index === 5
                    ? Users
                    : undefined
      })),
    []
  );

  const moreEntries: MenuEntry[] = useMemo(
    () =>
      moreNav.map((link) => ({
        id: link.id,
        title: link.label,
        href: navHref(link),
        Icon:
          link.route === 'features'
            ? Layers
            : link.route === 'about'
              ? Info
              : link.route === 'contact'
                ? Phone
                : link.route === 'individual-request'
                  ? UserRound
                  : BookOpen
      })),
    []
  );

  const renderMenuEntry = (entry: MenuEntry) => (
    <Link
      key={entry.id}
      id={entry.id}
      to={entry.href}
      className={menuEntryClasses(isDark)}
    >
      {entry.Icon && (
        <span
          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${
            isDark ? 'bg-white/5 text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'
          }`}
        >
          <entry.Icon className="w-4 h-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{entry.title}</span>
          {entry.badge && (
            <span className={badgeClasses(entry.badgeTone, isDark)}>{entry.badge}</span>
          )}
        </span>
        {entry.description && (
          <span className={`block text-[11px] leading-snug mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
            {entry.description}
          </span>
        )}
      </span>
    </Link>
  );

  const divider = <div className={`h-px my-1 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />;

  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    'Hello CS Academy, I would like to inquire about training programs.'
  )}`;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-b border-[var(--border-color)] shadow-[0_10px_40px_rgba(0,0,0,0.28),0_1px_0_rgba(255,255,255,0.04)_inset] py-2 sm:py-3'
            : 'bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-b border-[var(--border-subtle)] shadow-[0_10px_30px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.6)_inset] py-2 sm:py-3'
          : 'bg-[var(--bg-primary)]/92 backdrop-blur-2xl border-b border-[var(--border-subtle)] py-2.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link
            id="brand-logo-btn"
            to="/"
            aria-label={`${siteConfig.academyName} home`}
            className="flex min-w-0 items-center gap-2 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-red)] to-neutral-800 p-[1.5px] shadow-[0_8px_24px_rgba(255,59,48,0.4)] group-hover:scale-110 transition-transform shrink-0 relative">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-black tracking-wide text-sm bg-[var(--bg-card)] ${isDark ? 'text-white' : 'text-neutral-900'}`} aria-hidden="true">
                C<span className="mx-0.5 text-[var(--accent-red)]">/</span>S
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`max-w-[8.5rem] xs:max-w-[11rem] truncate text-base xs:text-lg sm:max-w-none sm:text-xl font-black tracking-[-0.06em] transition-colors duration-200 uppercase ${
                    isDark ? 'text-white group-hover:text-[var(--accent-red)]' : 'text-neutral-900 group-hover:text-[var(--accent-red-hover)]'
                  }`}
                >
                  {siteConfig.academyName}
                </span>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--accent-red)] ring-2 ring-[var(--accent-red-subtle)]" />
              </div>
              <p className={`hidden sm:block text-[9px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]`}>
                Tech Education
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-0.5">
            {primaryNav.map((link) => {
              const active = isRouteActive(currentRoute, link.route);
              return (
                <Link
                  key={link.id}
                  id={link.id}
                  to={navHref(link)}
                  aria-current={active ? 'page' : undefined}
                  className={`${navLinkBase} ${navLinkTone(isDark, active)}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Dropdown
              id="nav-link-programs-dropdown"
              label="Programs"
              isActive={isProgramRoute}
              open={programsDropdownOpen}
              onOpen={() => {
                setProgramsDropdownOpen(true);
                setMoreDropdownOpen(false);
              }}
              onToggle={() => {
                setProgramsDropdownOpen((v) => !v);
                setMoreDropdownOpen(false);
              }}
              onClose={() => setProgramsDropdownOpen(false)}
            >
              {renderMenuEntry(programEntries[0])}
              {divider}
              {programEntries.slice(1).map(renderMenuEntry)}
            </Dropdown>

            <Dropdown
              id="nav-link-more-dropdown"
              label="More"
              isActive={['features', 'learning-formats', 'resources', 'blog', 'about', 'contact', 'individual-request'].includes(currentRoute)}
              open={moreDropdownOpen}
              onOpen={() => {
                setMoreDropdownOpen(true);
                setProgramsDropdownOpen(false);
              }}
              onToggle={() => {
                setMoreDropdownOpen((v) => !v);
                setProgramsDropdownOpen(false);
              }}
              onClose={() => setMoreDropdownOpen(false)}
              widthClass="w-64"
            >
              {moreEntries.map(renderMenuEntry)}
            </Dropdown>
          </nav>

          {/* Desktop Right Controls */}
          <div className="hidden xl:flex items-center gap-2">
            <a
              id="header-whatsapp-link"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              title={`WhatsApp ${siteConfig.whatsappDisplay}`}
              aria-label={`Chat with CS Academy on WhatsApp at ${siteConfig.whatsappDisplay}`}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] font-bold text-emerald-500 transition-all duration-200 hover:border-emerald-500/60 hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              <span className="hidden xl:inline">{siteConfig.whatsappDisplay}</span>
            </a>

            <button
              id="header-theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              title={t.nav.switchTheme}
              aria-label={t.nav.switchTheme}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-[var(--bg-elevated)] text-amber-400 border-[var(--border-color)] hover:border-[var(--accent-red-border)] hover:text-[var(--accent-red)] hover:shadow-[var(--shadow-red)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--accent-amber)] border-[var(--border-color)] hover:border-[var(--accent-red-border)] hover:text-[var(--accent-red)] hover:shadow-[var(--shadow-red)]'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              id="header-book-training-btn"
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black text-white bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] active:scale-[0.97] rounded-full shadow-[var(--shadow-red)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(255,59,48,0.45)] transition-all duration-200 uppercase tracking-[0.18em] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
            >
              <span>{t.nav.bookTraining}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Quick Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              id="theme-toggle-mobile"
              type="button"
              onClick={toggleTheme}
              aria-label={t.nav.switchTheme}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border p-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-[var(--bg-elevated)] text-amber-400 border-[var(--border-color)] hover:border-[var(--accent-red-border)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--accent-amber)] border-[var(--border-color)] hover:border-[var(--accent-red-border)]'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              id="mobile-quick-book-btn"
              type="button"
              onClick={() => openBookingModal()}
              className="hidden sm:block px-3 py-1.5 text-xs font-bold text-white bg-[var(--accent-red-hover)] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
            >
              {t.nav.bookTraining}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                isDark ? 'bg-neutral-900 text-neutral-300 border-neutral-800' : 'bg-neutral-100 text-neutral-800 border-neutral-200'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`xl:hidden border-b pt-3 pb-6 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain backdrop-blur-lg animate-[fadeInUp_0.3s_ease-out] ${
            isDark ? 'bg-[var(--bg-primary)]/95 border-[var(--border-color)] text-white' : 'bg-white/95 border-[var(--border-subtle)] text-neutral-900'
          }`}
        >
          <div className="px-4 space-y-1.5">
            {mobileNav.map((link) => {
              const active = isRouteActive(currentRoute, link.route);
              const Icon =
                link.route === 'home'
                  ? Home
                  : link.route === 'academy'
                    ? BookOpen
                    : link.route === 'features'
                      ? Layers
                      : link.route === 'pricing'
                        ? Wallet
                        : link.route === 'learning-formats'
                          ? BookOpen
                          : link.route === 'for-organizations'
                            ? Building2
                            : link.route === 'resources'
                              ? BookOpen
                              : link.route === 'blog'
                                ? BookOpen
                                  : link.route === 'individual-request'
                                    ? UserRound
                                    : link.route === 'about'
                                  ? Info
                                  : Phone;
              return (
                <Link
                  key={link.id}
                  id={`${link.id}-link`}
                  to={navHref(link)}
                  aria-current={active ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-left transition-colors ${
                    active
                      ? isDark
                        ? 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)] border border-[var(--accent-red-border)]'
                        : 'bg-red-50 text-[var(--accent-red-hover)] border border-red-200'
                      : isDark
                        ? 'hover:bg-neutral-900 text-neutral-200'
                        : 'hover:bg-neutral-100 text-neutral-800'
                  }`}
                >
                  <span
                    className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${
                      isDark ? 'bg-white/5 text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="flex-1">{link.label}</span>
                  {link.badge && (
                    <span className={badgeClasses(link.badge === 'M-Pesa' ? 'emerald' : 'red', isDark)}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Programs collapsible group for quick access without a long scroll */}
            <div
              className={`mt-4 rounded-2xl border ${
                isDark ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-[var(--border-subtle)]'
              }`}
            >
              <button
                type="button"
                onClick={() => setMobileProgramsOpen((v) => !v)}
                aria-expanded={mobileProgramsOpen}
                aria-controls="mobile-programs-group"
                className="w-full flex items-center justify-between gap-2 px-3 pt-3 pb-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]"
              >
                <span>Programs &amp; Tracks</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-4 h-4 transition-transform duration-200 ${mobileProgramsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div id="mobile-programs-group" hidden={!mobileProgramsOpen} className="px-3 pb-3">
                <Link
                  to={navHref(programsNav[0])}
                  className={`w-full flex items-center justify-between px-2.5 py-2.5 rounded-xl text-left text-xs font-extrabold uppercase tracking-wider transition-colors ${
                    isDark ? 'text-neutral-300 hover:text-white hover:bg-neutral-800' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <span>
                    {programsNav[0].label}
                    <span className={`block text-[10px] font-semibold normal-case tracking-normal ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      {totalModuleCount} modules across {programsData.length} programs
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[var(--accent-red-strong)]" />
                </Link>

                <div className={`h-px my-1 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`} />

                {programEntries.slice(1).map((entry) => {
                  const Icon = entry.Icon;
                  return (
                    <Link
                      key={entry.id}
                      to={entry.href}
                      className={`w-full flex items-start gap-3 px-2.5 py-2.5 rounded-xl text-left transition-colors ${
                        isDark ? 'hover:bg-neutral-800' : 'hover:bg-white'
                      }`}
                    >
                      {Icon && (
                        <span
                          className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-lg ${
                            isDark ? 'bg-white/5 text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-neutral-950'}`}>
                            {entry.title}
                          </span>
                          {entry.badge && (
                            <span className={badgeClasses(entry.badgeTone, isDark)}>{entry.badge}</span>
                          )}
                        </span>
                        {entry.description && (
                          <span className={`block text-[11px] leading-snug mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
                            {entry.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={`mt-5 mx-4 pt-4 border-t space-y-2 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); openBookingModal(); }}
              className="w-full py-3.5 text-center text-xs font-bold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-xl tracking-wider uppercase shadow-lg inline-flex items-center justify-center gap-2"
            >
              <CreditCard className="w-3.5 h-3.5" />
              {t.nav.bookTraining}
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl border ${
                isDark ? 'bg-neutral-900 text-neutral-300 border-neutral-800' : 'bg-neutral-100 text-neutral-800 border-neutral-200'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>WhatsApp Us: {siteConfig.whatsappDisplay}</span>
            </a>

            <div className={`flex items-center justify-center gap-2 pt-1 text-[11px] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
              <Phone className="h-3.5 w-3.5" />
              <a href={`tel:${siteConfig.phone}`} className="hover:underline">
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
