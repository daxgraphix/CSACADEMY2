import React from 'react';
import { Link } from 'react-router-dom';
import { ProgramPillar } from '../types';
import { programsData } from '../data/programs';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  ShieldCheck,
  Laptop,
  ArrowRight,
  CheckCircle,
  Layers,
  BookOpen
} from 'lucide-react';

interface ProgramsOverviewProps {
  openProgramModal: (program: ProgramPillar) => void;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const ProgramsOverview: React.FC<ProgramsOverviewProps> = ({
  openProgramModal,
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const gridRef = useReveal<HTMLDivElement>();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Laptop className="w-6 h-6 text-[var(--accent-red-strong)]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[var(--accent-red-strong)]" />;
      default:
        return <Laptop className="w-6 h-6 text-[var(--accent-red-strong)]" />;
    }
  };

  return (
    <section 
      id="programs-section" 
      className={`py-16 sm:py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/10 text-[var(--accent-red)] text-[10px] font-bold uppercase tracking-[0.22em]">
            <span>{t.programsSection.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.06em] ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.programsSection.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            {t.programsSection.subtitle}
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-5 sm:gap-8 reveal-stagger">
          {programsData.map((pillar) => {
            return (
            <div
              key={pillar.id}
              id={`card-${pillar.id}`}
              className={`motion-card group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-[#111111] border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.38)] hover:border-[var(--accent-red)]/40'
                  : 'bg-white border-neutral-200 shadow-[0_18px_50px_rgba(17,17,17,0.06)] hover:border-[var(--accent-red)]/30'
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.12),transparent_40%)] opacity-70" />
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <div className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[var(--accent-red)]/60 hover:bg-[var(--accent-red)]/20">
                    {getIcon(pillar.icon)}
                    <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-[var(--accent-red)]/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 rounded-full border transition-all duration-300 hover:border-[var(--accent-red)]/40 hover:bg-[var(--accent-red)]/10 ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                  }`}>
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`text-2xl font-black tracking-[-0.05em] mb-2 transition-all duration-300 group-hover:text-[var(--accent-red-strong)] group-hover:transform group-hover:translate-x-1 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className={`text-sm font-semibold transition-colors duration-300 group-hover:text-[var(--accent-red-strong)] ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    {pillar.tagline}
                  </p>
                  <p className={`mt-3 text-sm leading-relaxed transition-colors duration-300 group-hover:text-neutral-200/90 ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    {pillar.description}
                  </p>
                </div>

                <div>
                  <div className={`mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    <Layers className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
                    <span>Curriculum Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pillar.topics.slice(0, 6).map((topic, i) => (
                      <span
                        key={i}
                        className={`keyword-chip text-[11px] font-medium px-2.5 py-1.5 rounded-full border ${
                          theme === 'dark' ? 'border-white/10 bg-white/5 text-neutral-200' : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                    {pillar.topics.length > 6 && (
                      <span className={`text-[11px] font-medium px-2.5 py-1.5 rounded-full ${
                        theme === 'dark' ? 'bg-white/5 text-neutral-300' : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        +{pillar.topics.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                <div className={`space-y-3 pt-4 border-t transition-all duration-300 group-hover:border-[var(--accent-red)]/30 ${
                  theme === 'dark' ? 'border-white/10' : 'border-neutral-200'
                }`}>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-[var(--accent-red-strong)] ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    Key Practical Outcome:
                  </div>
                  <div className={`flex items-start gap-2 text-sm transition-all duration-300 group-hover:translate-x-1 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    <CheckCircle
                      aria-hidden="true"
                      className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span>{pillar.outcomes[0]}</span>
                  </div>
                </div>
              </div>

              <div className={`relative z-10 mt-6 sm:mt-8 pt-4 sm:pt-5 border-t flex flex-col gap-3 ${
                theme === 'dark' ? 'border-white/10' : 'border-neutral-200'
              }`}>
                <Link
                  id={`btn-explore-${pillar.slug}`}
                  to={`/programs/${pillar.slug}`}
                  className="group relative w-full py-3 sm:py-3.5 px-3 sm:px-4 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white bg-[var(--accent-red)] hover:-translate-y-1 hover:bg-[var(--accent-red-hover)] rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_18px_40px_rgba(255,59,48,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
                  aria-label={`Explore ${pillar.title} training programs and curriculum`}
                >
                  <span className="relative">
                    {pillar.ctaText}
                    <span
                      aria-hidden="true"
                      className="absolute -inset-x-1 -inset-y-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                  />
                </Link>

                <div className="flex gap-2">
                  <button
                    id={`btn-syllabus-${pillar.slug}`}
                    onClick={() => openProgramModal(pillar)}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] border transition-all duration-200 hover:-translate-y-0.5 text-center ${
                      theme === 'dark' 
                        ? 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors duration-200 border-white/10' 
                        : 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 border-neutral-200'
                    }`}
                  >
                    View Syllabus
                  </button>
                  <button
                    id={`btn-book-pillar-${pillar.slug}`}
                    onClick={() => openBookingModal({ program: pillar.title })}
                    className={`flex-1 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] border transition-all duration-200 hover:-translate-y-0.5 text-center ${
                      theme === 'dark' 
                        ? 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors duration-200 border-white/10' 
                        : 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 border-neutral-200'
                    }`}
                  >
                    {t.common.enrollNow}
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
