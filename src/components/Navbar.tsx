import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircle,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme, toggleTheme, t } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (programsDropdownOpen && !target.closest('#programs-dropdown-wrapper')) {
        setProgramsDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [programsDropdownOpen]);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    setMobileProgramsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all transition-shadow duration-300 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-color)] shadow-[0_10px_40px_rgba(0,0,0,0.28)] py-3' 
            : 'bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-3'
          : theme === 'dark'
            ? 'bg-[var(--bg-primary)]/70 backdrop-blur-md border-b border-[var(--border-subtle)] py-4'
            : 'bg-[var(--bg-primary)]/70 backdrop-blur-md border-b border-[var(--border-subtle)] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => navigateTo('home')}
            className="flex min-w-0 items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-red)] to-neutral-800 p-[1.5px] shadow-[var(--shadow-red)] group-hover:scale-105 transition-transform shrink-0 relative">
              <div className="w-full h-full rounded-[10px] flex items-center justify-center font-black tracking-[-0.08em] text-base bg-[var(--bg-card)] text-white">
                <span className="text-[var(--accent-red)] drop-shadow-[0_0_8px_var(--accent-red-glow)]">C</span>S
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`max-w-[10rem] truncate text-lg sm:max-w-none sm:text-xl font-black tracking-[-0.06em] transition-colors duration-200 uppercase ${
                  theme === 'dark' ? 'text-white group-hover:text-[var(--accent-red)]' : 'text-neutral-900 group-hover:text-[var(--accent-red-hover)]'
                }`}>
                  {siteConfig.academyName}
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] shadow-[0_0_8px_var(--accent-red-glow)] animate-[pulse-glow_2.5s_ease-in-out_infinite]" />
              </div>
              <p className={`hidden sm:block text-[9px] font-bold tracking-[0.14em] uppercase ${
                theme === 'dark' ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'
              }`}>
                Tech Education
              </p>
            </div>
          </button>

{/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <button
              id="nav-link-home"
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                currentRoute === 'home' 
                  ? theme === 'dark' ? 'text-white bg-white/5 border border-white/10' : 'text-neutral-900 bg-white border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-white/5' : 'text-neutral-800 hover:text-neutral-900 hover:bg-white'
              }`}
            >
              Home
            </button>

            <button
              id="nav-link-features"
              onClick={() => navigateTo('features')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                currentRoute === 'features' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              <span>Features</span>
            </button>

            {/* Programs Dropdown */}
            <div
              id="programs-dropdown-wrapper"
              className="relative"
              onMouseEnter={() => setProgramsDropdownOpen(true)}
              onMouseLeave={() => setProgramsDropdownOpen(false)}
            >
              <button
                id="nav-link-programs-dropdown"
                onClick={() => {
                  setProgramsDropdownOpen(false);
                  navigateTo('programs');
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                  currentRoute.startsWith('programs')
                    ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                    : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
                }`}
              >
                <span>Programs</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                  programsDropdownOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-full pt-2 w-80 transition-all duration-200 z-50 ${
                  programsDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                }`}
              >
                <div className={`border rounded-2xl p-2 shadow-2xl space-y-1 ${
                  theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-[var(--border-subtle)]'
                }`}>
                  <button
                    id="dropdown-all-programs"
                    onClick={() => navigateTo('programs')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-extrabold uppercase tracking-wider transition-colors ${
                      theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-800' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <span>{t.nav.allPrograms}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
                  </button>
                  <div className={`h-px my-1 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>
                  
                  <button
                    id="dropdown-vibe-coding"
                    onClick={() => navigateTo('vibe-coding')}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group/item ${
                      theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <div>
                      <div className={`flex items-center gap-2 text-xs font-bold transition-colors group-hover/item:text-[var(--accent-red-strong)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>
                        Vibe Coding
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-red)] text-white">New</span>
                      </div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        AI-Powered Web Development with Cursor & Bolt
                      </div>
                    </div>
                  </button>

                  <button
                    id="dropdown-ai-academy"
                    onClick={() => navigateTo('programs/ai')}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group/item ${
                      theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold transition-colors group-hover/item:text-[var(--accent-red-strong)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>AI & Vibe Coding</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                         Prompting, LLMs, AI Safety & Local Language Prompts
                      </div>
                    </div>
                  </button>

                  <button
                    id="dropdown-cyber-academy"
                    onClick={() => navigateTo('programs/cybersecurity')}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group/item ${
                      theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold transition-colors group-hover/item:text-[var(--accent-red-strong)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>Cybersecurity Academy</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        Digital Defense, Phishing Prevention & Data Safety
                      </div>
                    </div>
                  </button>

                  <button
                    id="dropdown-digital-academy"
                    onClick={() => navigateTo('programs/digital-skills')}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group/item ${
                      theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <div>
                      <div className={`text-xs font-bold transition-colors group-hover/item:text-[var(--accent-red-strong)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>Full-Stack & Digital Skills</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        Web Dev, Figma UI/UX & Digital Marketing
                      </div>
                    </div>
                  </button>

                  <div className={`h-px my-1 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>

                  <button
                    id="dropdown-devpad"
                    onClick={() => navigateTo('devpad')}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group/item ${
                      theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <div>
                      <div className={`flex items-center gap-2 text-xs font-bold transition-colors group-hover/item:text-[var(--accent-red-strong)] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>
                        DevPad
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-red)] text-white">Community</span>
                      </div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        Build, Test &amp; Launch With Developer Peers
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <button
              id="nav-link-formats"
              onClick={() => navigateTo('learning-formats')}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                currentRoute === 'learning-formats' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              Formats
            </button>

            <button
              id="nav-link-organizations"
              onClick={() => navigateTo('for-organizations')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                currentRoute === 'for-organizations' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              <span>Teams</span>
            </button>

            <button
              id="nav-link-pricing"
              onClick={() => navigateTo('pricing')}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                currentRoute === 'pricing' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              Pricing
            </button>

            <button
              id="nav-link-resources"
              onClick={() => navigateTo('resources')}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                currentRoute === 'resources' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              <span>Resources</span>
            </button>

            <button
              id="nav-link-about"
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                currentRoute === 'about' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              About
            </button>
          </nav>

          {/* Desktop Right Controls: Theme Switcher & Book CTA */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Theme Toggle (Light / Dark) */}
            <button
              id="header-theme-toggle-btn"
              onClick={toggleTheme}
              title={t.nav.switchTheme}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                theme === 'dark'
                  ? 'bg-[var(--bg-elevated)] text-amber-400 border-[var(--border-color)] hover:border-[var(--accent-red-border)] hover:text-[var(--accent-red)] hover:shadow-[var(--shadow-red)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--accent-amber)] border-[var(--border-color)] hover:border-[var(--accent-red-border)] hover:text-[var(--accent-red)] hover:shadow-[var(--shadow-red)]'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" />}
            </button>

            {/* Book Training CTA */}
            <button
              id="header-book-training-btn"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black text-white bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] active:scale-[0.97] rounded-full shadow-[var(--shadow-red)] transition-all duration-200 uppercase tracking-[0.18em] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
            >
              <span>{t.nav.bookTraining}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Quick Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Theme Toggle */}
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                theme === 'dark'
                  ? 'bg-[var(--bg-elevated)] text-amber-400 border-[var(--border-color)] hover:border-[var(--accent-red-border)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--accent-amber)] border-[var(--border-color)] hover:border-[var(--accent-red-border)]'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" />}
            </button>

            <button
              id="mobile-quick-book-btn"
              onClick={() => openBookingModal()}
              className="hidden sm:block px-3 py-1.5 text-xs font-bold text-white bg-[var(--accent-red-hover)] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
            >
              {t.nav.bookTraining}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                theme === 'dark' ? 'bg-neutral-900 text-neutral-300 border-neutral-800' : 'bg-neutral-100 text-neutral-800 border-neutral-200'
              }`}
              aria-label={'Toggle navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 max-h-[90vh] overflow-y-auto ${
          theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-white' : 'bg-white border-[var(--border-subtle)] text-neutral-900'
        }`}>
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              {t.nav.home}
            </button>

            <button
              onClick={() => navigateTo('features')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              <span>{t.nav.features}</span>
              <span className="text-[10px] bg-red-950 text-[var(--accent-red-strong)] font-bold px-2 py-0.5 rounded border border-red-800/60">New</span>
            </button>

            <button
              onClick={() => navigateTo('pricing')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              <span>{t.nav.pricing}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800/60">M-Pesa</span>
            </button>

            {/* Mobile Programs Section */}
            <div className={`rounded-2xl p-3 my-2 border ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-[var(--border-subtle)]'
            }`}>
              <button
                onClick={() => navigateTo('programs')}
                className="w-full text-left text-xs font-extrabold uppercase tracking-wider text-[var(--accent-red-strong)] mb-2 flex items-center justify-between"
              >
                <span>{t.nav.programs}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <div className="grid gap-1 pl-1">
                <button
                  onClick={() => navigateTo('vibe-coding')}
                  className="w-full text-left py-2 px-2 text-xs font-medium flex items-center gap-2"
                >
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-red)] text-white">New</span>
                  <span>Vibe Coding (New)</span>
                </button>
                <button
                  onClick={() => navigateTo('programs/ai')}
                  className="w-full text-left py-2 px-2 text-xs font-medium flex items-center gap-2"
                >
                  <span>AI & Vibe Coding Academy</span>
                </button>
                <button
                  onClick={() => navigateTo('programs/cybersecurity')}
                  className="w-full text-left py-2 px-2 text-xs font-medium flex items-center gap-2"
                >
                  <span>Cybersecurity Academy</span>
                </button>
                <button
                  onClick={() => navigateTo('programs/digital-skills')}
                  className="w-full text-left py-2 px-2 text-xs font-medium flex items-center gap-2"
                >
                  <span>Digital Skills & Web Development</span>
                </button>
                <button
                  onClick={() => navigateTo('devpad')}
                  className="w-full text-left py-2 px-2 text-xs font-medium flex items-center gap-2"
                >
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent-red)] text-white">Community</span>
                  <span>DevPad</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => navigateTo('learning-formats')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              {t.nav.formats}
            </button>

            <button
              onClick={() => navigateTo('for-organizations')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              <span>{t.nav.organizations}</span>
              <span className="text-[10px] bg-red-950 text-red-300 font-bold px-2 py-0.5 rounded border border-red-800/60">Corporate</span>
            </button>

            <button
              onClick={() => navigateTo('resources')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              {t.nav.resources}
            </button>

            <button
              onClick={() => navigateTo('blog')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              {t.nav.blog}
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              {t.nav.about}
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold ${
                theme === 'dark' ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
              {t.nav.contact}
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-neutral-800 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openBookingModal(); }}
              className="w-full py-3.5 text-center text-xs font-bold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-xl tracking-wider uppercase shadow-lg"
            >
              {t.nav.bookTraining}
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hello CS Academy, I would like to inquire about training programs.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-xl border ${
                theme === 'dark' ? 'bg-neutral-900 text-neutral-300 border-neutral-800' : 'bg-neutral-100 text-neutral-800 border-neutral-200'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp Us: {siteConfig.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
