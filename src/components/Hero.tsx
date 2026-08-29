import React from 'react';
import { PageRoute } from '../types';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  ArrowRight,
  CheckCircle2,
  Smartphone
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
      className={`relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#090909] text-white' : 'bg-[#f7f4ee] text-neutral-900'
      }`}
    >
      <div className="absolute inset-0 opacity-90">
        <div className="absolute left-1/2 top-0 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[#ff3b30]/10 blur-[120px]" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-white/5 blur-[90px]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_80%_60%_at_45%_40%,#000_55%,transparent_100%)] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-4xl reveal">
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className={`text-4xl sm:text-6xl lg:text-[5.2rem] lg:leading-[0.94] font-black tracking-[-0.06em] break-words ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                {t.hero.headlineMain} 
                <span className="text-[#ff3b30]">{t.hero.headlineHighlight}</span>
                <br className="hidden sm:block" />
                for work, business, and life.
              </h1>

              <p className={`max-w-xl text-lg leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {t.hero.subheadline}
              </p>
            </div>

            <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
            }`}>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> No prior experience required</span>
              <span className="inline-flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 text-[#ff3b30]" /> Learn on phone or computer</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-primary-cta"
                onClick={() => openBookingModal()}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#ff3b30] text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(255,59,48,0.35)] hover:-translate-y-0.5 hover:bg-[#ff564d] transition-all duration-200"
              >
                <span>{t.hero.ctaEnroll}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={() => {
                  setCurrentRoute('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border text-sm font-bold uppercase tracking-[0.14em] transition-all duration-200 hover:-translate-y-0.5 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors duration-200'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors duration-200'
                }`}
              >
                <span>{t.hero.ctaExplore}</span>
              </button>
            </div>

            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 ${
              theme === 'dark' ? 'border-t border-white/10' : 'border-t border-neutral-200'
            }`}>
              {[
                { value: t.hero.stat1Val, label: t.hero.stat1Label },
                { value: t.hero.stat2Val, label: t.hero.stat2Label },
                { value: t.hero.stat3Val, label: t.hero.stat3Label },
                { value: t.hero.stat4Val, label: t.hero.stat4Label }
              ].map((item) => (
                <div key={item.label} className="pt-4">
                  <div className="text-2xl font-black tracking-[-0.05em] text-[#ff3b30]">{item.value}</div>
                  <div className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-14 grid gap-4 md:grid-cols-3 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
          {[
            { icon: CheckCircle2, text: 'Learn in English, Swahili, and your local language.' },
            { icon: Smartphone, text: 'Build real apps, automations, and digital skills fast.' },
            { icon: Smartphone, text: 'Work from anywhere with mobile-friendly, practical learning.' }
          ].map(({ icon: Icon, text }) => (
            <div key={text} className={`flex items-start gap-3 rounded-3xl border p-4 ${
              theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-white/80'
            }`}>
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff3b30]/10 text-[#ff3b30]">
                <Icon className="h-5 w-5" />
              </div>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
