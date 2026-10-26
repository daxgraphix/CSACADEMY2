import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Building2,
  CheckSquare,
  Gift,
  Layers,
  Radio,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Video,
  type LucideIcon
} from 'lucide-react';
import { platformFeaturesData } from '../data/platformFeatures';
import { useApp } from '../context/AppContext';
import { PlatformFeature } from '../types';

interface PlatformFeaturesSectionProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

const icons: Record<string, LucideIcon> = {
  Video,
  CheckSquare,
  Award,
  ShoppingBag,
  Radio,
  Gift,
  Users,
  Building2,
  Layers,
  ShieldCheck,
  Sparkles
};

const toneFor = (feature: PlatformFeature) => {
  if (['safe-ai-practice', 'quizzes-assessment', 'learning-roadmaps'].includes(feature.id)) return 'violet';
  if (['low-bandwidth-learning', 'live-meetings', 'cohort-community'].includes(feature.id)) return 'emerald';
  if (['corporate-customization', 'mentor-support', 'career-pathways'].includes(feature.id)) return 'blue';
  return 'amber';
};

const getToneClasses = (isDark: boolean) => ({
  violet: {
    icon: isDark ? 'bg-violet-500/10 text-violet-300' : 'bg-violet-500/10 text-violet-700',
    badge: isDark ? 'text-violet-300' : 'text-violet-700',
    border: 'group-hover:border-violet-400/50'
  },
  emerald: {
    icon: isDark ? 'bg-emerald-500/10 text-emerald-300' : 'bg-emerald-500/10 text-emerald-700',
    badge: isDark ? 'text-emerald-300' : 'text-emerald-700',
    border: 'group-hover:border-emerald-400/50'
  },
  blue: {
    icon: isDark ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-500/10 text-blue-700',
    badge: isDark ? 'text-blue-300' : 'text-blue-700',
    border: 'group-hover:border-blue-400/50'
  },
  amber: {
    icon: isDark ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-500/10 text-amber-700',
    badge: isDark ? 'text-amber-300' : 'text-amber-700',
    border: 'group-hover:border-amber-400/50'
  }
});

export const PlatformFeaturesSection: React.FC<PlatformFeaturesSectionProps> = ({ openBookingModal }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const toneMap = getToneClasses(isDark);

  return (
    <section id="platform-features" className={`border-b py-14 transition-colors sm:py-20 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-[#f7f4ee]'}`}>
      <div className="mx-auto max-w-7xl space-y-9 px-4 sm:px-6 lg:px-8 sm:space-y-12">
        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <span className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${isDark ? 'border-red-900/50 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-800'}`}>
            Learning experience
          </span>
          <h1 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>
            Practical support for <span className="text-[var(--accent-red-strong)]">every step of learning</span>
          </h1>
          <p className={`mx-auto max-w-2xl text-sm leading-relaxed sm:text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Explore the learning tools, delivery options, and support available across CS Academy. Exact features vary by course and plan; confirm what is included before enrolling.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {platformFeaturesData.map((feature) => {
            const Icon = icons[feature.icon] ?? Award;
            const tone = toneMap[toneFor(feature)];
            return (
              <article key={feature.id} className={`group flex min-w-0 flex-col rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-5 ${tone.border} ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm'}`}>
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className={`text-[9px] font-extrabold uppercase tracking-[0.14em] ${tone.badge}`}>{feature.badge}</span>
                    <h2 className={`mt-1 text-base font-extrabold leading-snug ${isDark ? 'text-white' : 'text-neutral-900'}`}>{feature.title}</h2>
                  </div>
                </div>
                <p className={`mt-3 flex-1 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{feature.shortDescription}</p>

                <details className={`mt-4 border-t pt-3 ${isDark ? 'border-[var(--border-color)]' : 'border-neutral-200'}`}>
                  <summary className={`cursor-pointer text-xs font-bold marker:text-[var(--accent-red-strong)] ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>More about this feature</summary>
                  <div className="space-y-3 pt-3">
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{feature.fullDescription}</p>
                    {feature.points.length > 0 && (
                      <ul className="space-y-2">
                        {feature.points.map((point) => (
                          <li key={point} className={`flex items-start gap-2 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            <CheckSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />{point}
                          </li>
                        ))}
                      </ul>
                    )}
                    {feature.note && <p className={`rounded-xl p-3 text-[11px] leading-relaxed ${isDark ? 'bg-[var(--bg-primary)] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>{feature.note}</p>}
                    <button type="button" onClick={() => openBookingModal({ program: `Ask about ${feature.title}` })} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-[var(--accent-red-strong)] hover:underline">
                      Ask what’s included <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </details>
              </article>
            );
          })}
        </div>

        <div className={`flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white'}`}>
          <div>
            <h2 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Find the right learning option</h2>
            <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Compare course paths and published plans. We’ll confirm the included features for your choice.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/programs" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[var(--accent-red-hover)]">Browse programs <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/pricing" className={`inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2.5 text-xs font-bold ${isDark ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}>Compare pricing</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
