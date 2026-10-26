import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Laptop, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { programsData } from '../data/programs';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { ShareButtons } from '../components/ShareButtons';
import { PageBreadcrumbs } from '../components/LayoutPrimitives';

interface ProgramDeepDivePageProps {
  slug: string;
}

const trackForSlug: Record<string, string> = {
  ai: 'Artificial intelligence and productivity',
  cybersecurity: 'Cybersecurity and digital safety',
  'digital-skills': 'Digital skills and web development'
};

const displayTitle = (slug: string, title: string) => {
  if (slug === 'ai') return 'AI & Prompting';
  if (slug === 'cybersecurity') return 'Cybersecurity Academy';
  if (slug === 'digital-skills') return 'Full-Stack & Digital Skills';
  return title.replace(/ ACADEMY$/i, '').replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const ProgramIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'h-6 w-6' }) => {
  const Icon = name === 'Sparkles' ? Sparkles : name === 'ShieldCheck' ? ShieldCheck : Laptop;
  return <Icon className={className} aria-hidden="true" />;
};

export const ProgramDeepDivePage: React.FC<ProgramDeepDivePageProps> = ({ slug }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const program = programsData.find((item) => item.slug === slug);
  const canonical = useCanonicalUrl();
  // Use deeper foreground colors in light mode; the shared accent tokens are
  // intentionally brighter for dark surfaces and can lose contrast as text.
  const accent = isDark
    ? ({ ai: '#c4b5fd', cybersecurity: '#6ee7b7', 'digital-skills': '#fcd34d' }[slug] ?? '#fecaca')
    : ({ ai: '#6d28d9', cybersecurity: '#047857', 'digital-skills': '#92400e' }[slug] ?? '#b91c1c');
  const surface = isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white';
  const body = isDark ? 'text-neutral-300' : 'text-neutral-700';

  if (!program) {
    return <main className={`grid min-h-screen place-items-center px-4 pt-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'}`}><div className="max-w-lg text-center"><h1 className="text-3xl font-black">Program not found</h1><p className={`mt-3 text-sm ${body}`}>Browse the catalog to find a current CS Academy learning path.</p><Link to="/programs" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-3 text-xs font-bold text-white">Browse programs <ArrowRight className="h-4 w-4" /></Link></div></main>;
  }

  const title = displayTitle(slug, program.title);
  const requestUrl = `/request-training?track=${encodeURIComponent(trackForSlug[slug] ?? 'I am not sure yet')}&format=Help%20me%20choose`;

  return (
    <main className={`min-h-screen px-4 pb-16 pt-28 sm:pb-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'}`}>
      <Helmet>
        <title>{title} | Programs &amp; Curriculum | CS Academy</title>
        <meta name="description" content={`${program.extendedDescription} Explore course topics, practical outcomes, and delivery options. Contact CS Academy to confirm current availability, schedule, and pricing.`} />
        <meta name="keywords" content={`${title} Tanzania, ${program.tagline}, CS Academy, practical training East Africa`} />
        <meta property="og:title" content={`${title} | CS Academy`} />
        <meta property="og:description" content={program.tagline} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <PageBreadcrumbs theme={theme} items={[{ label: 'Home', route: '/' }, { label: 'Programs', route: '/programs' }, { label: title }]} />
          <ShareButtons title={`CS Academy: ${title}`} description={program.tagline} variant="compact" />
        </div>

        <section className={`relative overflow-hidden rounded-3xl border p-6 sm:p-9 lg:p-12 ${surface}`}>
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: accent }} aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] ${isDark ? 'bg-white/[0.04]' : 'bg-white'}`} style={{ borderColor: accent, color: accent }}>{program.badge}</span>
              <h1 className={`mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>{title}</h1>
              <p className={`mt-3 text-base font-semibold leading-relaxed sm:text-lg ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>{program.tagline}</p>
              <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${body}`}>{program.extendedDescription}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to={requestUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[var(--accent-red-hover)]">Ask about this program <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                <Link to="/for-organizations#proposal" className={`inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-xs font-bold ${isDark ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}>Team proposal</Link>
              </div>
            </div>
            <div className={`flex items-center gap-4 rounded-2xl border p-4 sm:p-5 lg:min-w-64 lg:flex-col lg:items-start ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${accent}18`, color: accent }}><ProgramIcon name={program.icon} /></span>
              <div><p className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{program.modules.length} curriculum modules</p><p className={`mt-1 text-xs ${body}`}>{program.topics.length} focus areas · guided practice</p></div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-red-strong)]">Learning outcomes</p></div>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>What you can practise</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">{program.outcomes.map((outcome) => <li key={outcome} className={`flex items-start gap-2 rounded-xl p-3 text-xs leading-relaxed ${isDark ? 'bg-[var(--bg-primary)] text-neutral-300' : 'bg-neutral-50 text-neutral-700'}`}><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />{outcome}</li>)}</ul>
          </div>
          <div className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-[var(--accent-red-strong)]" aria-hidden="true" /><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-red-strong)]">Who it may suit</p></div>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Learners with different goals</h2>
            <div className="mt-4 flex flex-wrap gap-2">{program.audience.map((audience) => <span key={audience} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)] text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'}`}>{audience}</span>)}</div>
            <p className={`mt-4 text-[11px] leading-relaxed ${body}`}>Course level, prerequisites, and support options can vary. Ask us about the current cohort before choosing.</p>
          </div>
        </section>

        <section className="space-y-5" aria-labelledby="curriculum-title">
          <header className="max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-red-strong)]">Course outline</p><h2 id="curriculum-title" className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Explore the curriculum</h2><p className={`mt-2 text-sm leading-relaxed ${body}`}>Open a module to see its focus and practical exercise. Module sequence and coverage may depend on the selected course.</p></header>
          <div className="grid gap-2 lg:grid-cols-2">
            {program.modules.map((module, index) => {
              const match = module.title.match(/^Module\s+(\d+)\s*:\s*(.*)$/i);
              const number = match?.[1] ?? String(index + 1).padStart(2, '0');
              const moduleTitle = match?.[2] ?? module.title;
              return <details key={module.title} className={`group rounded-xl border px-4 py-3 ${surface}`}>
                <summary className="flex cursor-pointer list-none items-start gap-3">
                  <span className={`mt-0.5 rounded-md px-2 py-1 text-[10px] font-extrabold ${isDark ? 'bg-white/[0.06]' : 'bg-neutral-100'}`} style={{ color: accent }}>{number.padStart(2, '0')}</span>
                  <span className={`flex-1 text-sm font-bold leading-snug ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{moduleTitle}</span>
                  <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red-strong)] transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className={`ml-11 space-y-3 pt-3 text-xs leading-relaxed ${body}`}>
                  <p>{module.description}</p>
                  <p className={`rounded-lg border p-3 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}><strong className={isDark ? 'text-neutral-100' : 'text-neutral-900'}>Practice: </strong>{module.practicalSkill}</p>
                </div>
              </details>;
            })}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className={`rounded-2xl border p-5 sm:p-6 ${surface}`}><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-red-strong)]">Available formats</p><h2 className={`mt-2 text-lg font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Delivery and schedule</h2><div className="mt-4 flex flex-wrap gap-2">{program.deliveryFormats.map((format) => <span key={format} className={`rounded-full border px-3 py-1.5 text-[10px] ${isDark ? 'border-[var(--border-color)] text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'}`}>{format}</span>)}</div><div className="mt-4 border-t border-[var(--border-color)]/60 pt-4"><p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Example durations</p><div className="mt-2 flex flex-wrap gap-2">{program.durationOptions.map((duration) => <span key={duration} className={`rounded-lg px-2.5 py-1.5 text-[10px] ${isDark ? 'bg-[var(--bg-primary)] text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>{duration}</span>)}</div></div></div>
          <div className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 ${surface}`}><div><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-red-strong)]">Before enrolling</p><h2 className={`mt-2 text-lg font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Confirm the current details</h2><p className={`mt-2 text-xs leading-relaxed ${body}`}>Instruction and course materials are in English. Contact CS Academy to confirm availability, schedule, support included, and current price for this program.</p></div><div className="mt-5 flex flex-wrap gap-2"><Link to={requestUrl} className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-2.5 text-xs font-extrabold text-white">Ask about this program <ArrowRight className="h-3.5 w-3.5" /></Link><Link to="/pricing" className={`inline-flex min-h-10 items-center rounded-xl border px-4 py-2.5 text-xs font-bold ${isDark ? 'border-[var(--border-color)] text-neutral-200' : 'border-neutral-300 text-neutral-800'}`}>Compare pricing</Link></div></div>
        </section>

      </div>
    </main>
  );
};
