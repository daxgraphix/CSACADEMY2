import React from 'react';
import { Link } from 'react-router-dom';
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
  Wallet,
  MessageCircle
} from 'lucide-react';

interface HeroProps {
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const contentRef = useReveal<HTMLDivElement>();
  const isDark = theme === 'dark';

  return (
    <section
      id="hero-section"
      className={`relative pt-24 pb-16 md:pt-28 md:pb-24 lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center lg:pt-24 lg:pb-8 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-900'
      }`}
    >
      <div className="absolute inset-0 opacity-90 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[400px] sm:h-[500px] lg:h-[640px] w-[400px] sm:w-[500px] lg:w-[640px] -translate-x-1/2 rounded-full bg-[var(--accent-red-subtle)] blur-[100px] sm:blur-[120px]" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-white/5 blur-[90px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_80%_60%_at_45%_40%,#000_55%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT: primary narrative (headline, CTAs, trust) */}
          <div ref={contentRef} className="lg:col-span-7 xl:col-span-7 reveal reveal-delay-200">
              <div className="space-y-5 lg:space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/10 text-[var(--accent-red-strong)] text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> Practical, instructor-led training
                </div>

                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-[2.25rem] xl:text-[2.75rem] 2xl:text-[3.25rem] font-extrabold tracking-[-0.045em] leading-[1.06] drop-shadow-sm ${isDark ? 'text-white' : 'text-neutral-950'}`}
                >
                  {t.hero.outcome}{' '}
                  <span className="text-[var(--accent-red-strong)] drop-shadow-[0_2px_8px_rgba(220,38,38,0.4)]">
                    {t.hero.outcomeHighlight}
                  </span>{' '}
                  {t.hero.outcomeTrailing}
                </h1>

                <p className={`max-w-2xl text-lg sm:text-xl leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'} font-medium`}>Build practical skills in AI, cybersecurity, and digital work through guided training designed for learners and teams across East Africa.</p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id="hero-primary-cta"
                  onClick={() => openBookingModal()}
                  className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:gap-2.5 sm:px-7 sm:py-4 lg:px-8 lg:py-4 rounded-full bg-[var(--accent-red)] text-xs sm:text-sm lg:text-[15px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(255,59,48,0.35)] transition-all duration-200 hover:-translate-y-1 hover:bg-[var(--accent-red-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
                  aria-label="Start your practical AI journey with CS Academy"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="relative">
                    {t.hero.primaryCta}
                    <span
                      aria-hidden="true"
                      className="absolute -inset-x-1 -inset-y-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4 transition-all duration-200 group-hover:translate-x-1 group-hover:scale-110"
                  />
                </button>
                <Link
                  id="hero-secondary-cta"
                  to="/programs"
                  className={`group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.12em] transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${isDark
                    ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100'
                  }`}
                  aria-label="Explore all available courses and programs"
                >
                  <span className="relative">
                    {t.hero.ctaExplore}
                    <span
                      aria-hidden="true"
                      className="absolute -inset-x-1 -inset-y-1 bg-[var(--accent-red)]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4 transition-all duration-200 group-hover:translate-x-1 group-hover:scale-110"
                  />
                </Link>
              </div>

              <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold ${
                isDark ? 'text-neutral-400' : 'text-neutral-800'
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
            </div>
          </div>

          {/* RIGHT: proof panel + price card */}
          <div className={`lg:col-span-5 xl:col-span-5 space-y-5 lg:rounded-3xl lg:border lg:p-5 lg:shadow-sm ${
            isDark ? 'lg:border-white/10 lg:bg-white/[0.02]' : 'lg:border-neutral-200/80 lg:bg-white/30'
          }`}>
            <div
              className={`rounded-3xl border p-5 lg:p-6 shadow-xl ${
                isDark
                  ? 'border-white/10 bg-white/[0.04] backdrop-blur-sm'
                  : 'border-neutral-200 bg-white/80 backdrop-blur-sm'
              }`}
            >
              <div className={`text-[10px] font-black uppercase tracking-[0.18em] mb-3 ${
                isDark ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                Practical ways to start
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { value: t.hero.proof1Value, label: t.hero.proof1Label, icon: GraduationCap, accent: 'text-emerald-500' },
                  { value: t.hero.proof2Value, label: t.hero.proof2Label, icon: Sparkles, accent: 'text-[var(--accent-red-strong)]' },
                  { value: t.hero.proof3Value, label: t.hero.proof3Label, icon: Smartphone, accent: 'text-amber-400' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="min-w-0 text-center sm:text-left">
                      <div className={`mx-auto sm:mx-0 mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg ${
                        isDark ? 'bg-white/5' : 'bg-neutral-100'
                      }`}>
                        <Icon className={`h-4 w-4 ${item.accent}`} />
                      </div>
                      <div className={`text-xl lg:text-2xl font-black tracking-tight leading-none ${
                        isDark ? 'text-white' : 'text-neutral-950'
                      }`}>
                        {item.value}
                      </div>
                      <div className={`mt-1 text-[9.5px] font-bold uppercase tracking-[0.1em] leading-snug break-words ${
                        isDark ? 'text-neutral-400' : 'text-neutral-700'
                      }`}>
                        {item.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:block">
              <PriceStrip openBookingModal={openBookingModal} />
            </div>
          </div>
        </div>

        {/* Supporting copy and full stat row, compressed into one band on desktop */}
        <div className="mt-8 sm:mt-14 lg:mt-6 space-y-4 sm:space-y-6">
          <div className={`pt-5 lg:pt-4 border-t space-y-2 ${
            isDark ? 'border-white/10' : 'border-neutral-200'
          }`}>
            <h2 className={`text-lg sm:text-xl lg:text-2xl font-black tracking-[-0.04em] ${
              isDark ? 'text-white' : 'text-neutral-950'
            }`}>
              {t.hero.headlineMain}
              <span className="text-[var(--accent-red-strong)]"> {t.hero.headlineHighlight}</span>{' '}
              from beginner concepts to practical projects.
            </h2>
            <p className={`max-w-3xl text-xs sm:text-sm lg:text-[13px] leading-relaxed reading-text ${
              isDark ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              {t.hero.subheadline}
            </p>
            <div className={`inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider ${
              isDark ? 'text-neutral-500' : 'text-neutral-600'
            }`}>
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              {t.hero.trustLine}
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-5 ${
            isDark ? 'border-t border-white/10' : 'border-t border-neutral-200'
          }`}>
            {[
              { value: t.hero.stat1Val, label: t.hero.stat1Label, icon: GraduationCap, accent: 'text-emerald-500' },
              { value: t.hero.stat2Val, label: t.hero.stat2Label, icon: Sparkles, accent: 'text-[var(--accent-red-strong)]' },
              { value: t.hero.stat3Val, label: t.hero.stat3Label, icon: ShieldCheck, accent: 'text-blue-500' },
              { value: t.hero.stat4Val, label: t.hero.stat4Label, icon: Wallet, accent: 'text-amber-400' }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5 lg:gap-3">
                  <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full ${
                    isDark ? 'bg-white/5' : 'bg-neutral-100'
                  }`}>
                    <Icon className={`h-4 w-4 ${item.accent}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-lg lg:text-xl font-black tracking-[-0.04em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-none break-words ${
                      isDark ? 'text-[var(--accent-red-strong)]' : 'text-[var(--accent-red)]'
                    }`}>{item.value}</div>
                    <div className={`mt-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] leading-tight ${
                      isDark ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`grid gap-3 md:grid-cols-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {[
              { icon: CheckCircle2, text: 'Learn through guided projects that turn new concepts into usable skills.' },
              { icon: Smartphone, text: 'Build apps, automations, and portfolio evidence you can show to employers or clients.' },
              { icon: Wallet, text: 'Start from your phone with flexible formats and familiar mobile-money payments.' }
            ].map(({ icon: Icon, text }) => (
              <div key={text} className={`flex items-start gap-2.5 rounded-2xl border px-3.5 py-3 ${
                isDark ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-white/80'
              }`}>
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  <Icon className="h-3.5 w-3.5 icon-visible" />
                </div>
                <p className={`text-xs leading-relaxed reading-text ${isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
