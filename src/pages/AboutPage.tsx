import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe2, GraduationCap, Laptop, Quote, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { PageBreadcrumbs } from '../components/LayoutPrimitives';

const valueIcons = [Globe2, Award, Users, ShieldCheck];
const pillarThemes = [
  { icon: Sparkles, color: 'violet' },
  { icon: ShieldCheck, color: 'emerald' },
  { icon: Laptop, color: 'amber' }
];
const colorClasses = {
  violet: { icon: 'bg-violet-500/10 text-violet-700 dark:text-violet-300', badge: 'text-violet-800 bg-violet-50 border-violet-200 dark:text-violet-200 dark:bg-violet-400/10 dark:border-violet-400/20' },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', badge: 'text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-200 dark:bg-emerald-400/10 dark:border-emerald-400/20' },
  amber: { icon: 'bg-amber-500/10 text-amber-700 dark:text-amber-300', badge: 'text-amber-800 bg-amber-50 border-amber-200 dark:text-amber-200 dark:bg-amber-400/10 dark:border-amber-400/20' }
} as const;

export const AboutPage: React.FC = () => {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const canonical = useCanonicalUrl();
  const surface = isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white';
  const bodyText = isDark ? 'text-neutral-300' : 'text-neutral-700';

  return (
    <main className={`min-h-screen px-4 pb-16 pt-28 sm:pb-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'}`}>
      <Helmet>
        <title>About CS Academy | Practical Technology Education in East Africa</title>
        <meta name="description" content="Learn about CS Academy’s mission, practical teaching approach, and learning paths in AI, cybersecurity, and digital skills for East African learners and organizations." />
        <meta name="keywords" content="about CS Academy, AI education East Africa, cybersecurity learning, digital skills Tanzania, practical technology training" />
        <meta property="og:title" content="About CS Academy" />
        <meta property="og:description" content="Our mission and practical approach to technology learning across East Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
        <PageBreadcrumbs theme={theme} items={[{ label: 'Home', route: '/' }, { label: 'About' }]} />

        <section className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 lg:p-14 ${surface}`}>
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[var(--accent-red)]/10 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <span className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${isDark ? 'border-red-900/50 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-800'}`}>{t.about.badge}</span>
            <h1 className={`mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Practical technology learning, <span className="text-[var(--accent-red-strong)]">built around real life.</span></h1>
            <p className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${bodyText}`}>{siteConfig.academyName} helps learners, professionals, and organizations build useful skills in AI, cybersecurity, and digital work through clear instruction and guided practice.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[var(--accent-red-hover)]">Explore our programs <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/instructors" className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold ${isDark ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}>Meet the instructor</Link>
            </div>
            <p className={`mt-5 text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}><Globe2 className="mr-1.5 inline h-3.5 w-3.5 text-[var(--accent-red-strong)]" aria-hidden="true" />{siteConfig.location}</p>
          </div>
        </section>

        <section aria-label="Our mission and vision" className="grid gap-4 md:grid-cols-2">
          <article className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]"><GraduationCap className="h-5 w-5" aria-hidden="true" /></span>
            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Our mission</p>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Make technology easier to use well.</h2>
            <p className={`mt-3 text-sm leading-relaxed ${bodyText}`}>{siteConfig.tagline}. We focus on concepts people can understand, skills they can practise, and safe ways to apply them.</p>
          </article>
          <article className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]"><Globe2 className="h-5 w-5" aria-hidden="true" /></span>
            <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Our vision</p>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>More people equipped to take part in a digital future.</h2>
            <p className={`mt-3 text-sm leading-relaxed ${bodyText}`}>{siteConfig.vision}</p>
          </article>
        </section>

        <section className="space-y-5" aria-labelledby="pillars-title">
          <div className="max-w-2xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">What we teach</p>
            <h2 id="pillars-title" className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Three paths into practical technology</h2>
            <p className={`mt-2 text-sm leading-relaxed ${bodyText}`}>Choose the subject that fits your goals, then explore the course details and available learning format.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {siteConfig.pillars.map((pillar, index) => {
              const theme = pillarThemes[index] ?? pillarThemes[0];
              const Icon = theme.icon;
              const colors = colorClasses[theme.color];
              return <Link key={pillar.id} to={`/programs/${pillar.id === 'ai-literacy' ? 'ai' : pillar.id}`} className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${surface}`}>
                <div className="flex items-center justify-between gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.icon}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold ${colors.badge}`}>{pillar.badge}</span></div>
                <h3 className={`mt-4 text-base font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{pillar.name}</h3>
                <p className={`mt-2 text-xs leading-relaxed ${bodyText}`}>{pillar.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-red-strong)]">Explore path <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>;
            })}
          </div>
        </section>

        <section className="space-y-5" aria-labelledby="approach-title">
          <div className="max-w-2xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">How we work</p>
            <h2 id="approach-title" className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Clear teaching. Useful practice. Responsible use.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {siteConfig.values.map((value, index) => {
              const Icon = valueIcons[index] ?? Award;
              return <article key={value.title} className={`rounded-2xl border p-4 sm:p-5 ${surface}`}>
                <Icon className="h-5 w-5 text-[var(--accent-red-strong)]" aria-hidden="true" />
                <h3 className={`mt-3 text-sm font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{value.title}</h3>
                <p className={`mt-2 text-xs leading-relaxed ${bodyText}`}>{value.description}</p>
              </article>;
            })}
          </div>
        </section>

        <section className={`grid gap-5 rounded-2xl border p-5 sm:p-7 md:grid-cols-[auto_1fr_auto] md:items-center ${surface}`}>
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-[var(--bg-primary)] text-[var(--accent-red-strong)]' : 'bg-neutral-100 text-[var(--accent-red-strong)]'}`}><Quote className="h-6 w-6" aria-hidden="true" /></span>
          <div>
            <p className={`text-sm font-semibold leading-relaxed sm:text-base ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>“{siteConfig.founder.quote}”</p>
            <p className={`mt-2 text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>By {siteConfig.founder.name}, {siteConfig.founder.titles[0]}</p>
          </div>
          <Link to="/instructors" className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[var(--accent-red-strong)] hover:underline">About the instructor <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
        </section>
      </div>
    </main>
  );
};
