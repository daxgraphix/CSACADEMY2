import React from 'react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Quote,
  GraduationCap,
  MapPin
} from 'lucide-react';

interface AboutSectionProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <section
      id="about-section"
      className={`py-24 border-y transition-colors duration-300 relative ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-300'
      }`}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)] text-xs font-mono font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.about.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.about.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            {t.about.subtitle}
          </p>
        </div>

        {/* 2-Column Story & Purpose */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-12">

          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              <p>
                CS Academy was founded to bridge the digital skills gap for learners across East and Central Africa. We believe that technical jargon and foreign languages should never be a barrier to mastering transformative technologies.
              </p>
              <p>
                We offer structured curricula in AI prompting, vibe coding, defensive cybersecurity, and workplace productivity, all delivered through flexible multi-channel formats.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {siteConfig.values.map((val, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border space-y-1 ${
theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[var(--accent-red-strong)] uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
                    <span>{val.title}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>{val.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                id="btn-work-with-academy"
                onClick={() => openBookingModal({ program: 'Web Development & Digital Skills Cohort' })}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs font-extrabold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-2xl shadow-lg uppercase tracking-wider transition-all"
              >
                <span>JOIN NEXT COHORT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Vision & Accessibility Card (5 cols) */}
          <div className={`lg:col-span-5 border rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-neutral-200'
          }`}>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-red-hover)] to-black p-0.5 shadow-md flex items-center justify-center">
                <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-black text-base ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-950'
                }`}>
                  <span className="text-[var(--accent-red-strong)]">C</span>S
                </div>
              </div>
              <div>
                <h3 className={`text-lg font-extrabold ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>CS ACADEMY</h3>
                <p className={`text-xs font-mono ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                }`}>Cyber Academy Tech Ecosystem</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2 ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
            }`}>
              <span className="text-[10px] font-mono uppercase font-bold text-[var(--accent-red-strong)]">
                Our Vision
              </span>
              <p className={`text-xs leading-relaxed font-medium ${
                theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
              }`}>
                {siteConfig.vision}
              </p>
            </div>

            <div className={`space-y-2.5 pt-1 text-xs ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                <span>Curricula taught through clear English-language instruction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                <span>Mobile-money options available on selected plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                <span>WhatsApp mentor support on selected learning plans</span>
              </div>
            </div>
          </div>

        </div>

        {/* Founder Profile */}
        <div className={`rounded-3xl border p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 ${
          theme === 'dark' ? 'bg-[var(--bg-primary)] border-neutral-800' : 'bg-white border-neutral-300 shadow-sm'
        }`}>
          <div className="shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[var(--accent-red)] to-[var(--accent-red-hover)] flex items-center justify-center text-white text-3xl font-black shadow-lg">
              AR
            </div>
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <h3 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                {siteConfig.founder.name}
              </h3>
              <span className={`inline-flex items-center gap-1.5 self-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)]' : 'bg-red-50 border border-red-200 text-[var(--accent-red-strong)]'
              }`}>
                <GraduationCap className="w-3 h-3" />
                Founder
              </span>
            </div>
            <div className={`flex flex-wrap items-center justify-center md:justify-start gap-2 text-[11px] font-semibold ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              {siteConfig.founder.titles.map((title, i) => (
                <span key={i} className={`px-2 py-0.5 rounded-md border ${
                  theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'
                }`}>{title}</span>
              ))}
            </div>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              {siteConfig.founder.bio}
            </p>
            <div className={`flex items-start gap-2 p-3 rounded-xl border ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
            }`}>
              <Quote className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
              <p className={`text-xs italic ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                "{siteConfig.founder.quote}"
              </p>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
              <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
              {siteConfig.location}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
