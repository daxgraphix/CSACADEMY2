import React from 'react';
import { PageRoute } from '../types';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import { PriceStrip } from './PriceStrip';
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Star,
  MessageCircle
} from 'lucide-react';

interface HeroProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="hero-section"
      className={`relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-900'
      }`}
    >
      <div className="absolute inset-0 opacity-90">
        <div className="absolute left-1/2 top-0 h-[400px] sm:h-[500px] lg:h-[640px] w-[400px] sm:w-[500px] lg:w-[640px] -translate-x-1/2 rounded-full bg-[var(--accent-red-subtle)] blur-[100px] sm:blur-[120px]" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-white/5 blur-[90px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_80%_60%_at_45%_40%,#000_55%,transparent_100%)] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-4xl reveal reveal-delay-200">
          <div className="space-y-7">
            {/* (a) ONE sentence of concrete value */}
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[1.1] break-words ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}
            >
              {t.hero.outcome}{' '}
              <span className="text-[var(--accent-red-strong)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {t.hero.outcomeHighlight}
              </span>{' '}
              {t.hero.outcomeTrailing}
            </h1>

            {/* (b) ONE primary action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="hero-primary-cta"
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[var(--accent-red)] text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(255,59,48,0.35)] hover:-translate-y-0.5 hover:bg-[var(--accent-red-hover)] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => {
                  setCurrentRoute('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <span>{t.hero.ctaExplore}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* (c) one trust signal + (d) social proof numbers as icons+labels */}
            <div className={`grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
            }`}>
              <span className="inline-flex items-center gap-1.5 min-w-0">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span className="leading-snug">No prior experience required</span>
              </span>
              <span className="inline-flex items-center gap-1.5 min-w-0">
                <Smartphone className="h-3.5 w-3.5 text-[var(--accent-red-strong)] shrink-0" />
                <span className="leading-snug">Works on phone or computer</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-2xl">
              {[
                { value: t.hero.proof1Value, label: t.hero.proof1Label, icon: GraduationCap, accent: 'text-emerald-500' },
                { value: t.hero.proof2Value, label: t.hero.proof2Label, icon: Sparkles, accent: 'text-[var(--accent-red-strong)]' },
                { value: t.hero.proof3Value, label: t.hero.proof3Label, icon: Star, accent: 'text-amber-400' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 sm:gap-3 rounded-2xl border p-3.5 sm:p-4 min-w-0 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/5'
                        : 'border-neutral-200 bg-white/80'
                    }`}
                  >
                    <div className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-xl ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-neutral-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${item.accent}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-950'
                      }`}>
                        {item.value}
                      </div>
                      <div className={`mt-1 text-[10px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] leading-snug break-words ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing strip - answers "how much, in my money, on my phone?" */}
            <PriceStrip
              openBookingModal={openBookingModal}
              onSeeFullPricing={() => {
                setCurrentRoute('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Supporting copy: the original full headline, now demoted */}
            <div className={`pt-8 border-t space-y-3 ${
              theme === 'dark' ? 'border-white/10' : 'border-neutral-200'
            }`}>
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-[-0.04em] ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                {t.hero.headlineMain}
                <span className="text-[var(--accent-red-strong)]"> {t.hero.headlineHighlight}</span>{' '}
                from beginner to job-ready.
              </h2>
              <p className={`max-w-2xl text-sm sm:text-base leading-relaxed reading-text ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`}>
                {t.hero.subheadline}
              </p>
              <div className={`inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider ${
                theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'
              }`}>
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                {t.hero.trustLine}
              </div>
            </div>

            {/* Full stat row - kept for scroll-depth visitors */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 ${
              theme === 'dark' ? 'border-t border-white/10' : 'border-t border-neutral-200'
            }`}>
              {[
                { value: t.hero.stat1Val, label: t.hero.stat1Label, icon: GraduationCap, accent: 'text-emerald-500' },
                { value: t.hero.stat2Val, label: t.hero.stat2Label, icon: Sparkles, accent: 'text-[var(--accent-red-strong)]' },
                { value: t.hero.stat3Val, label: t.hero.stat3Label, icon: ShieldCheck, accent: 'text-blue-500' },
                { value: t.hero.stat4Val, label: t.hero.stat4Label, icon: Star, accent: 'text-amber-400' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center text-center pt-2">
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-neutral-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${item.accent}`} />
                    </div>
                    <div className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.05em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-none ${
                      theme === 'dark' ? 'text-[var(--accent-red-strong)]' : 'text-[var(--accent-red)]'
                    }`}>{item.value}</div>
                    <div className={`mt-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`mt-16 grid gap-4 md:grid-cols-3 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
             {[
               { icon: CheckCircle2, text: 'Master AI, cybersecurity, and web development with hands-on projects.' },
               { icon: Smartphone, text: 'Build real apps, automations, and digital portfolios on day one.' },
               { icon: Sparkles, text: 'Mobile-friendly learning with M-Pesa payments - start instantly.' }
             ].map(({ icon: Icon, text }) => (
              <div key={text} className={`flex items-start gap-3 rounded-3xl border p-4 ${
                theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-white/80'
              }`}>
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  <Icon className="h-5 w-5 icon-visible" />
                </div>
                <p className={`text-sm leading-relaxed reading-text ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
