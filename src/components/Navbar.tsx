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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all transition-shadow duration-300 ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-[#0b0b0b]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.28)] py-3' 
            : 'bg-[#f7f4ee]/90 backdrop-blur-xl border-b border-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-3'
          : theme === 'dark'
            ? 'bg-[#090909]/70 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-[#f7f4ee]/70 backdrop-blur-md border-b border-neutral-200 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => navigateTo('home')}
            className="flex min-w-0 items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b30] rounded-xl p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3b30] to-[#1a1a1a] p-[1.5px] shadow-[0_10px_25px_rgba(255,59,48,0.28)] group-hover:scale-105 transition-transform shrink-0">
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-black tracking-[-0.08em] text-base ${
                theme === 'dark' ? 'bg-[#0d0d0d] text-white' : 'bg-[#1a1a1a] text-white'
              }`}>
                <span className="text-[#ff3b30]">C</span>S
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`max-w-[10rem] truncate text-lg sm:max-w-none sm:text-xl font-black tracking-[-0.06em] transition-colors uppercase ${
                  theme === 'dark' ? 'text-white group-hover:text-neutral-200' : 'text-neutral-900 group-hover:text-[#ff3b30]'
                }`}>
                  {siteConfig.academyName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
              </div>
              <p className={`hidden sm:block text-[9px] font-semibold tracking-[0.14em] uppercase ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`}>
                Tech Education
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5">
            <button
              id="nav-link-home"
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                currentRoute === 'features' 
                  ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                  : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
              }`}
            >
                <span>Features</span>
            </button>

            {/* Programs Dropdown */}
            <div className="relative group">
              <button
                id="nav-link-programs-dropdown"
                onClick={() => navigateTo('programs')}
                onMouseEnter={() => setProgramsDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  currentRoute.startsWith('programs')
                    ? theme === 'dark' ? 'text-white bg-neutral-900 border border-neutral-800' : 'text-neutral-900 bg-neutral-100 border border-neutral-200'
                    : theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-900/50' : 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
                }`}
              >
                <span>Programs</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Dropdown Menu */}
              <div 
                onMouseLeave={() => setProgramsDropdownOpen(false)}
                className={`absolute left-0 top-full pt-2 w-80 transition-all duration-200 ${
                  programsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}
              >
                <div className={`border rounded-2xl p-2 shadow-2xl space-y-1 ${
                  theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                  <button
                    id="dropdown-all-programs"
                    onClick={() => navigateTo('programs')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-extrabold uppercase tracking-wider transition-colors ${
                      theme === 'dark' ? 'text-neutral-300 hover:text-white hover:bg-neutral-800' : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
                    }`}
                  >
                    <span>{t.nav.allPrograms}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DC2626]" />
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
                      <div className={`flex items-center gap-2 text-xs font-bold transition-colors group-hover/item:text-[#DC2626] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>
                        Vibe Coding
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]"></span>
                        </span>
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
                      <div className={`text-xs font-bold transition-colors group-hover/item:text-[#DC2626] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>AI & Vibe Coding</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        Prompting, LLMs, AI Safety & Swahili Prompts
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
                      <div className={`text-xs font-bold transition-colors group-hover/item:text-[#DC2626] ${
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
                      <div className={`text-xs font-bold transition-colors group-hover/item:text-[#DC2626] ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>Full-Stack & Digital Skills</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        Web Dev, Figma UI/UX & Digital Marketing
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
          <div className="hidden xl:flex items-center gap-2">

            {/* Theme Toggle (Light / Dark) */}
            <button
              id="header-theme-toggle-btn"
              onClick={toggleTheme}
              title={t.nav.switchTheme}
              className={`p-2 rounded-xl transition-all border ${
                theme === 'dark'
                  ? 'bg-[#171717] hover:bg-neutral-800 text-amber-400 border-neutral-800'
                  : 'bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 text-neutral-700 border-neutral-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Book Training CTA */}
            <button
              id="header-book-training-btn"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-black text-white bg-[#ff3b30] hover:bg-[#ff564d] active:scale-[0.98] rounded-full shadow-[0_14px_30px_rgba(255,59,48,0.35)] transition-all uppercase tracking-[0.18em]"
            >
              <span>{t.nav.bookTraining}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Quick Controls */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Quick Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg border ${
                theme === 'dark' ? 'bg-[#171717] text-amber-400 border-neutral-800' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              id="mobile-quick-book-btn"
              onClick={() => openBookingModal()}
              className="hidden sm:block px-3 py-1.5 text-xs font-bold text-white bg-[#B91C1C] rounded-lg"
            >
              {t.nav.bookTraining}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border focus:outline-none ${
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
        <div className={`xl:hidden border-b px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto ${
          theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
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
              <span className="text-[10px] bg-red-950 text-[#DC2626] font-bold px-2 py-0.5 rounded border border-red-800/60">New</span>
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
              theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <button
                onClick={() => navigateTo('programs')}
                className="w-full text-left text-xs font-extrabold uppercase tracking-wider text-[#DC2626] mb-2 flex items-center justify-between"
              >
                <span>{t.nav.programs}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <div className="grid gap-1 pl-1">
                <button
                  onClick={() => navigateTo('vibe-coding')}
                  className="w-full text-left py-2 px-2 text-xs font-medium flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DC2626]"></span>
                  </span>
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
              className="w-full py-3.5 text-center text-xs font-bold text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] rounded-xl tracking-wider uppercase shadow-lg"
            >
              {t.nav.bookTraining}
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Habari CS Academy, I would like to inquire about training programs.")}`}
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
