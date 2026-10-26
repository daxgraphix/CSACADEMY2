import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageRoute } from '../types';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import { submitForm } from '../utils/booking';
import { footerColumns, legalNav } from '../data/navigation';
import { navHref } from '../utils/navigation';
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
  Phone,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  currentRoute?: PageRoute;
  openBookingModal: () => void;
}

const socialLinks = [
  { href: siteConfig.socialLinks.youtube, label: 'YouTube', Icon: Youtube, hover: 'hover:text-[#FF0000]' },
  { href: siteConfig.socialLinks.linkedin, label: 'LinkedIn', Icon: Linkedin, hover: 'hover:text-[#0A66C2]' },
  { href: `https://wa.me/${siteConfig.whatsapp}`, label: 'WhatsApp', Icon: MessageCircle, hover: 'hover:text-emerald-500' },
  { href: `mailto:${siteConfig.email}`, label: 'Email', Icon: Mail, hover: 'hover:text-[var(--accent-red)]', internal: true }
];

const officeLocations = [
  { city: 'Dar es Salaam', country: 'Tanzania' },
  { city: 'Nairobi', country: 'Kenya' }
];

export const Footer: React.FC<FooterProps> = ({
  currentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<'all' | 'ai' | 'cybersecurity' | 'web'>('all');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const contentRef = useReveal<HTMLDivElement>();

  const emailValid = (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValid(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setSubmitError('');
    setIsLoading(true);

    const selectedTopic = topicOptions.find((topic) => topic.id === interest)?.label ?? 'All Updates';
    const result = await submitForm({
      _subject: `[CS Academy Dispatch] Newsletter request: ${email.trim()}`,
      _honey: '',
      name: email.trim(),
      email: email.trim(),
      source: 'newsletter',
      interest: selectedTopic,
      message: `Newsletter request for ${selectedTopic}. Please manage this contact by email.`
    });

    setIsLoading(false);

    if (result.ok) {
      setIsSubscribed(true);
      setEmail('');
      return;
    }

    setSubmitError(
      result.errorMessage ||
        'We could not complete your signup just now. Please try again, or email us directly.'
    );
  };

  const topicOptions = [
    { id: 'all', label: 'All Updates' },
    { id: 'ai', label: 'AI & Vibe Coding' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'web', label: 'Web & Digital' },
  ] as const;

  const badgeClasses = (tone: string | undefined, isDark: boolean) => {
    if (tone === 'emerald') {
      return isDark
        ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    return isDark
      ? 'bg-red-950 text-[var(--accent-red-strong)] border-red-800/60'
      : 'bg-red-50 text-[var(--accent-red-hover)] border-red-200';
  };

  return (
    <footer
      id="main-footer"
      className={`relative border-t pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] transition-colors duration-300 md:pb-8 ${
        theme === 'dark'
          ? 'bg-[var(--bg-primary)] text-white border-[var(--border-subtle)]'
          : 'bg-[var(--bg-primary)] text-neutral-900 border-[var(--border-subtle)]'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-red)]/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[var(--accent-red)]/[0.06] to-transparent pointer-events-none" />

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 reveal">
        {/* ==================== Newsletter Card ==================== */}
        <div className="relative">
          <div className={`relative overflow-hidden rounded-2xl sm:rounded-[2rem] border p-5 sm:p-10 lg:p-12 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]'
              : 'bg-gradient-to-br from-white via-[var(--bg-primary)] to-[var(--bg-primary)] border-[var(--border-subtle)] shadow-[0_25px_70px_rgba(17,17,17,0.07),inset_0_1px_0_rgba(255,255,255,0.8)]'
          }`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(255,59,48,0.18),transparent_45%)]" />
            <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[var(--accent-red-subtle)] blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-red)]/30 bg-[var(--accent-red-subtle)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-red-strong)]">
                  <Bell className="w-3.5 h-3.5" />
                  <span>CS Academy Dispatch</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.05em] leading-[1.1] ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  PRACTICAL UPDATES FOR{' '}
                  <span className="text-[var(--accent-red-strong)]">YOUR NEXT SKILL</span>
                </h3>
                <p className={`text-sm leading-relaxed max-w-md ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  Request occasional course updates, practical guides, and new cohort announcements by email.
                </p>
              </div>

              <div className="lg:col-span-6">
                {isSubscribed ? (
                  <div className={`rounded-2xl border p-6 flex items-start gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--accent-green)]' : 'bg-emerald-50 border-[var(--border-subtle)]'
                  }`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-800'}`}>
                        Request sent
                      </div>
                      <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-emerald-900'}`}>
                        Your request was sent to CS Academy support. To stop future updates at any time, email {siteConfig.email} with “Unsubscribe” in the subject.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsSubscribed(false)}
                        className="mt-3 text-[11px] font-bold text-[var(--accent-red-strong)] hover:underline"
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
                        <label htmlFor="footer-newsletter-email" className="sr-only">
                          Email address for the CS Academy Dispatch newsletter
                        </label>
                        <input
                          id="footer-newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); if (submitError) setSubmitError(''); }}
                          aria-invalid={!!(emailError || submitError)}
                          aria-describedby={emailError ? 'footer-newsletter-error' : submitError ? 'footer-newsletter-submit-error' : undefined}
                          placeholder="Enter your email address..."
                          className={`w-full rounded-full border pl-10 pr-4 py-3.5 text-xs focus:outline-none focus:border-[var(--accent-red)] focus:ring-4 focus:ring-[var(--accent-red-subtle)] transition-all ${
                            emailError || submitError
                              ? 'border-red-500'
                              : theme === 'dark'
                                ? 'bg-[var(--bg-primary)] border-white/10 text-white placeholder-neutral-500'
                                : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-500 shadow-sm'
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-red)] px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_rgba(255,59,48,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-red-hover)] hover:shadow-[0_18px_40px_rgba(255,59,48,0.45)] disabled:opacity-60 disabled:translate-y-0 active:scale-[0.98]"
                      >
                        {isLoading ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>Sending request</span>
                          </span>
                        ) : (
                          <>
                            <span>Request by email</span>
                            <Send className="w-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>

                    {emailError && (
                      <p id="footer-newsletter-error" role="alert" className="text-[10px] font-semibold text-red-500 pl-2">{emailError}</p>
                    )}

                    {submitError && (
                      <p id="footer-newsletter-submit-error" role="alert" className="text-[10px] font-semibold text-red-500 pl-2">
                        {submitError}
                      </p>
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
                            aria-pressed={active}
                            className={`rounded-full border px-2.5 py-1 font-bold uppercase tracking-wider transition-all duration-150 ${
                              active
                                ? 'border-[var(--accent-red)] bg-[var(--accent-red)] text-white shadow-sm'
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
                      <ShieldCheck className="h-3 w-3 text-[var(--accent-red-strong)]" />
                        <span>This sends an email request to support; it does not instantly subscribe you. Email {siteConfig.email} with “Unsubscribe” to stop future updates.</span>
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
            <Link
              to="/"
              className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] rounded-xl p-1 -ml-1"
            >
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[var(--accent-red)] to-[var(--bg-card)] p-[1.5px] shadow-[0_12px_26px_rgba(255,59,48,0.3)] group-hover:scale-105 transition-transform">
                <div className={`flex h-full w-full items-center justify-center rounded-[14px] text-base font-black tracking-[-0.08em] ${theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-neutral-900 text-white'}`}>
                  C<span className="mx-0.5 text-[var(--accent-red-strong)]">/</span>S
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
            </Link>

            <p className={`text-xs leading-relaxed max-w-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              Practical training in AI, cybersecurity, and digital skills for learners and teams across East Africa.
            </p>

            {/* Contact quick links */}
            <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 group hover:text-[var(--accent-red-strong)] transition-colors"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-red-50'}`}>
                  <Mail className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" />
                </span>
                <span className="truncate">{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 group hover:text-[var(--accent-red-strong)] transition-colors"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-red-50'}`}>
                  <Phone className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" />
                </span>
                <span>{siteConfig.phoneDisplay}</span>
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
                <span>WhatsApp {siteConfig.whatsappDisplay}</span>
              </a>
              <div className={`flex items-center gap-2.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-neutral-100'}`}>
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" />
                </span>
                <span>{officeLocations.map((o) => o.city).join(' · ')}</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ href, label, Icon, hover, internal }) => (
                <a
                  key={label}
                  href={href}
                  {...(internal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 ${theme === 'dark' ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:shadow-md'} ${hover}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns (8 cols) */}
          <nav aria-label="Footer" className="col-span-2 md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.id}>
                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs mt-3.5">
                  {col.items.map((item) => {
                    const isCurrent = !!currentRoute && currentRoute === item.route && !item.hash;
                    const accentColor = isCurrent
                      ? 'text-[var(--accent-red-strong)] font-bold'
                      : item.badgeTone === 'emerald'
                        ? 'text-emerald-500 hover:text-emerald-400'
                        : item.badgeTone === 'red'
                          ? 'text-[var(--accent-red-strong)] hover:text-[var(--accent-red-hover)] font-bold'
                          : theme === 'dark'
                            ? 'text-neutral-400 hover:text-white'
                            : 'text-neutral-700 hover:text-neutral-900';
                    return (
                      <li key={item.id}>
                        <Link
                          to={navHref(item)}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={`hover:underline group inline-flex items-center gap-1 text-left transition-all duration-150 hover:translate-x-0.5 ${accentColor}`}
                        >
                          <span>{item.label}</span>
                          {item.badgeTone === 'red' && !isCurrent && (
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ==================== Pillars Strip ==================== */}
        <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-6 border-y text-[10px] font-black uppercase tracking-[0.22em] ${theme === 'dark' ? 'border-white/10 text-neutral-400' : 'border-neutral-200 text-neutral-700'}`}>
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
            <span>© {new Date().getFullYear()} {siteConfig.academyName}.</span>
            <span className="hidden sm:inline">Cyber Academy Tech Ecosystem.</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {officeLocations.map((o) => (
              <React.Fragment key={o.city}>
                <span>{o.city}</span>
                <span className="opacity-30">|</span>
              </React.Fragment>
            ))}
            <span>East Africa</span>
          </div>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t pt-5 text-[10px] font-bold uppercase tracking-[0.14em] ${
          theme === 'dark' ? 'border-white/10 text-neutral-500' : 'border-neutral-200 text-neutral-600'
        }`}>
          {legalNav.map((link, index) => (
            <React.Fragment key={link.id}>
              {index > 0 && <span className="opacity-30">|</span>}
              <Link to={navHref(link)} className="transition-colors hover:text-[var(--accent-red-strong)]">
                {link.label}
              </Link>
            </React.Fragment>
          ))}
          <span className="opacity-30">|</span>
          <Link to="/contact" className="transition-colors hover:text-[var(--accent-red-strong)]">
            Contact Support
          </Link>
          <span className="opacity-30">|</span>
          <button
            type="button"
            onClick={openBookingModal}
            className="transition-colors hover:text-[var(--accent-red-strong)]"
          >
            Book a Session
          </button>
        </div>
      </div>
    </footer>
  );
};
