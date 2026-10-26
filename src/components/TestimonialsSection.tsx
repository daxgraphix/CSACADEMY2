import React from 'react';
import { Quote, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { testimonials, graduateCities, totalGraduates } from '../data/testimonials';

const TestimonialCard: React.FC<{ t: any; isDark: boolean }> = ({ t, isDark }) => (
  <figure className={`group relative h-full rounded-3xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
    isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-sm'
  }`}>
    <Quote className="absolute right-5 top-5 h-8 w-8 text-[var(--accent-red-strong)]/20" aria-hidden="true" />
    <blockquote className={`text-sm sm:text-base leading-relaxed font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
      “{t.quote}”
    </blockquote>
    <div className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 border ${isDark ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-neutral-50'}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-full text-white text-xs font-extrabold" style={{ background: t.avatarGradient }}>
        {t.avatarInitials}
      </div>
      <div className="text-left">
        <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t.name}</div>
        <div className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.role}</div>
      </div>
    </div>
    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /> {t.result}
    </div>
    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-red-strong)]">
      <MapPin className="h-3 w-3" aria-hidden="true" /> {t.city}, {t.country}
    </div>
  </figure>
);

export const TestimonialsSection: React.FC = () => {
  const { theme } = useApp();
  if (testimonials.length === 0) return null;
  const isDark = theme === 'dark';

  return (
    <section id="testimonials-section" aria-labelledby="testimonials-title" className={`py-24 border-y transition-colors duration-300 ${
      isDark ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]' : 'bg-[#FAFAFA] text-neutral-900 border-neutral-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'border-emerald-800/40 bg-emerald-950/40 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
            Real Graduate Outcomes
          </div>
          <h2 id="testimonials-title" className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-neutral-950'}`}>
            Learners who shipped real work
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
            Every graduate below shipped a concrete outcome, not just a certificate. That is the standard we hold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} isDark={isDark} />
          ))}
        </div>

        <div className="mt-14">
          <div className={`rounded-3xl border p-8 sm:p-10 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-white shadow-sm'}`}>
            <div className="text-center mb-8">
              <div className={`text-5xl sm:text-6xl font-extrabold tracking-[-0.04em] text-[var(--accent-red-strong)]`}>{totalGraduates.toLocaleString()}+</div>
              <div className={`mt-2 text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>graduates across East Africa</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {graduateCities.map((c) => (
                <div key={c.city} className="text-center">
                  <div className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{c.count}</div>
                  <div className={`mt-0.5 text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{c.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
