import React, { useState } from 'react';
import { PageRoute } from '../types';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Bell,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: () => void;
}

const footerNav: Array<{ title: string; items: Array<{ label: string; route?: PageRoute; action?: 'book'; highlight?: boolean; accent?: 'red' | 'green' }> }> = [
  {
    title: 'Programs',
    items: [
      { label: 'AI & Vibe Coding', route: 'programs/ai' },
      { label: 'Cybersecurity', route: 'programs/cybersecurity' },
      { label: 'Digital Skills', route: 'programs/digital-skills' },
      { label: 'All Curricula', route: 'programs', highlight: true },
    ],
  },
  {
    title: 'Delivery',
    items: [
      { label: '6 Delivery Formats', route: 'learning-formats' },
      { label: 'Pricing & Plans', route: 'pricing', accent: 'green' },
      { label: 'WhatsApp Micro-Course', route: 'learning-formats' },
      { label: 'Platform Features', route: 'features' },
    ],
  },
  {
    title: 'Organizations',
    items: [
      { label: 'Corporate Training', route: 'for-organizations' },
      { label: 'University Programs', route: 'for-organizations' },
      { label: 'NGOs & Government', route: 'for-organizations' },
      { label: 'Request Proposal', action: 'book' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About CS Academy', route: 'about' },
      { label: 'Free Resources', route: 'resources' },
      { label: 'Blog & Articles', route: 'blog' },
      { label: 'Contact & Book', route: 'contact' },
    ],
  },
];

const socialLinks = [
  { href: siteConfig.socialLinks.linkedin, label: 'LinkedIn', Icon: Linkedin, hover: 'hover:text-[#0A66C2]' },
  { href: siteConfig.socialLinks.youtube, label: 'YouTube', Icon: Youtube, hover: 'hover:text-[#FF0000]' },
  { href: `https://wa.me/${siteConfig.whatsapp}`, label: 'WhatsApp', Icon: MessageCircle, hover: 'hover:text-emerald-500' },
];

export const Footer: React.FC<FooterProps> = ({
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'all' | 'ai' | 'cybersecurity' | 'web'>('all');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const contentRef = useReveal<HTMLDivElement>();

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (item: { route?: PageRoute; action?: 'book' }) => {
    if (item.action === 'book') {
      openBookingModal();
    } else if (item.route) {
      navigate(item.route);
    }
  };

  const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 600);
  };

  const topicOptions = [
    { id: 'all', label: 'All Updates' },
    { id: 'ai', label: 'AI & Vibe Coding' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'web', label: 'Web & Digital' },
  ] as const;

  return (
    <footer
      id="main-footer"
      className={`relative border-t pt-20 pb-8 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#080808] text-white border-white/10'
          : 'bg-[#f7f4ee] text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff3b30]/40 to-transparent" />

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 reveal">
        {/* ==================== Newsletter Card ==================== */}
        <div className="relative">
          <div className={`relative overflow-hidden rounded-[2rem] border p-8 sm:p-10 lg:p-12 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[#141414] via-[#101010] to-[#0a0a0a] border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.4)]'
              : 'bg-gradient-to-br from-white via-[#fdfcfa] to-[#f7f4ee] border-neutral-200 shadow-[0_25px_70px_rgba(17,17,17,0.07)]'
          }`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(255,59,48,0.18),transparent_45%)]" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#ff3b30]/8 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ff3b30]/30 bg-[#ff3b30]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff3b30]">
                  <Bell className="w-3.5 h-3.5" />
                  <span>CS Academy Dispatch</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[1.1] ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  STAY AHEAD IN{' '}
                  <span className="text-[#ff3b30]">TECH, AI &amp; SECURITY</span>
                </h3>
                <p className={`text-sm leading-relaxed max-w-md ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  Weekly practical guides, free prompt cheat sheets, live cohort announcements, and East African cybersecurity insights delivered straight to your inbox.
                </p>
              </div>

              <div className="lg:col-span-6">
                {isSubscribed ? (
                  <div className={`rounded-2xl border p-6 flex items-start gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    theme === 'dark' ? 'bg-[#0d0d0d] border-emerald-800/60' : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-800'}`}>
                        Successfully Subscribed!
                      </div>
                      <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-emerald-900'}`}>
                        Welcome aboard. Watch your inbox for the next tech dispatch and free masterclass alert.
                      </p>
                      <button
                        onClick={() => setIsSubscribed(false)}
                        className="mt-3 text-[11px] font-bold text-[#ff3b30] hover:underline"
                      >
                        Register another email
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3.5">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative min-w-0 flex-1">
                        <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`} />
                        <input
                          id="footer-newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                          aria-invalid={!!emailError}
                          placeholder="Enter your email address..."
                          className={`w-full rounded-full border pl-10 pr-4 py-3.5 text-xs focus:outline-none focus:border-[#ff3b30] focus:ring-4 focus:ring-[#ff3b30]/10 transition-all ${
                            emailError
                              ? 'border-red-500'
                              : theme === 'dark'
                                ? 'bg-[#0d0d0d] border-white/10 text-white placeholder-neutral-500'
                                : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-500 shadow-sm'
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff3b30] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_rgba(255,59,48,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff564d] hover:shadow-[0_18px_40px_rgba(255,59,48,0.45)] disabled:opacity-60 disabled:translate-y-0 active:scale-[0.98]"
                      >
                        {isLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>Subscribing</span>
                          </span>
                        ) : (
                          <>
                            <span>Subscribe Free</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {emailError && (
                      <p className="text-[10px] font-semibold text-red-500 pl-2">{emailError}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className={`font-semibold uppercase tracking-wider mr-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        Topics:
                      </span>
                      {topicOptions.map((opt) => {
                        const active = interest === opt.id;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setInterest(opt.id)}
                            className={`rounded-full border px-2.5 py-1 font-bold uppercase tracking-wider transition-all duration-150 ${
                              active
                                ? 'border-[#ff3b30] bg-[#ff3b30] text-white shadow-sm'
                                : theme === 'dark'
                                  ? 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/30 hover:text-white'
                                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-900'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className={`flex items-center gap-1.5 text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                      <ShieldCheck className="h-3 w-3 text-[#ff3b30]" />
                      <span>Zero spam. Unsubscribe with 1-click at any time.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Main Footer Grid ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
          {/* Brand Column (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-5">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b30] rounded-xl p-1 -ml-1"
            >
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#ff3b30] to-[#1a1a1a] p-[1.5px] shadow-[0_12px_26px_rgba(255,59,48,0.3)] group-hover:scale-105 transition-transform">
                <div className={`flex h-full w-full items-center justify-center rounded-[14px] text-base font-black tracking-[-0.08em] ${theme === 'dark' ? 'bg-[#0d0d0d] text-white' : 'bg-neutral-900 text-white'}`}>
                  <span className="text-[#ff3b30]">C</span>S
                </div>
              </div>
              <div>
                <span className={`block text-xl font-black tracking-[-0.06em] uppercase ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {siteConfig.academyName}
                </span>
                <p className={`text-[10px] font-semibold tracking-[0.18em] uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                  Tech Education
                </p>
              </div>
            </button>

            <p className={`text-xs leading-relaxed max-w-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              Practical training in Artificial Intelligence, Cybersecurity, and Digital Skills across East and Central Africa.
            </p>

            {/* Contact quick links */}
            <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 group hover:text-[#ff3b30] transition-colors"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-red-50'}`}>
                  <Mail className="h-3.5 w-3.5 text-[#ff3b30]" />
                </span>
                <span className="truncate">{siteConfig.email}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group hover:text-emerald-500 transition-colors"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-emerald-50'}`}>
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                </span>
                <span>{siteConfig.whatsappDisplay}</span>
              </a>
              <div className={`flex items-center gap-2.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-neutral-100'}`}>
                  <MapPin className="h-3.5 w-3.5 text-[#ff3b30]" />
                </span>
                <span>East Africa Hub</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ href, label, Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:shadow-md'} ${hover}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns (8 cols) */}
          <div className="col-span-2 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerNav.map((col) => (
              <div key={col.title} className="space-y-3.5">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {col.items.map((item) => {
                    const accentColor =
                      item.accent === 'green'
                        ? 'text-emerald-500 hover:text-emerald-400'
                        : item.highlight
                          ? 'text-[#ff3b30] hover:text-[#ff564d] font-bold'
                          : theme === 'dark'
                            ? 'text-neutral-400 hover:text-white'
                            : 'text-neutral-700 hover:text-neutral-900';
                    return (
                      <li key={item.label}>
                        <button
                          onClick={() => handleItemClick(item)}
                          className={`group inline-flex items-center gap-1 text-left transition-colors duration-150 ${accentColor}`}
                        >
                          <span>{item.label}</span>
                          {item.highlight && (
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== Pillars Strip ==================== */}
        <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-5 border-y text-[10px] font-black uppercase tracking-[0.18em] ${theme === 'dark' ? 'border-white/10 text-neutral-400' : 'border-neutral-200 text-neutral-700'}`}>
          <span>AI Literacy</span>
          <span className="opacity-30">|</span>
          <span>Cybersecurity</span>
          <span className="opacity-30">|</span>
          <span>Digital Skills</span>
          <span className="opacity-30">|</span>
          <span>Vibe Coding</span>
          <span className="opacity-30">|</span>
          <span>Career Pathways</span>
        </div>

        {/* ==================== Bottom Bar ==================== */}
        <div className={`flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
          <div className="flex items-center gap-2">
            <span>© 2026 {siteConfig.academyName}.</span>
            <span className="hidden sm:inline">CyberSwahili Tech Ecosystem.</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>Tanzania</span>
            <span className="opacity-30">|</span>
            <span>Kenya</span>
            <span className="opacity-30">|</span>
            <span>Uganda</span>
            <span className="opacity-30">|</span>
            <span>Rwanda</span>
            <span className="opacity-30">|</span>
            <span>East Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
