import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Linkedin, ShieldCheck } from 'lucide-react';
import { instructorsData } from '../data/instructors';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { PageBreadcrumbs } from '../components/LayoutPrimitives';

export const InstructorsPage: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const canonical = useCanonicalUrl();
  const instructor = instructorsData[0];

  return (
    <main className={`min-h-screen px-4 pb-16 pt-28 sm:pb-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'}`}>
      <Helmet>
        <title>Meet Your Instructor | CS Academy</title>
        <meta name="description" content="Meet Alex Rweyemamu, CS Academy founder and lead instructor for practical AI, cybersecurity, and digital skills education." />
        <meta property="og:title" content="Meet Your Instructor | CS Academy" />
        <meta name="twitter:title" content="Meet Your Instructor | CS Academy" />
        <meta property="og:description" content="Learn about CS Academy founder and lead instructor Alex Rweyemamu and his teaching approach." />
        <meta name="twitter:description" content="Learn about CS Academy founder and lead instructor Alex Rweyemamu and his teaching approach." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: instructor.name, jobTitle: instructor.role, description: instructor.bio, knowsAbout: instructor.expertise, url: canonical, sameAs: instructor.socialLinks?.linkedin ? [instructor.socialLinks.linkedin] : [] })}</script>
      </Helmet>

      <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10">
        <PageBreadcrumbs theme={theme} items={[{ label: 'Home', route: '/' }, { label: 'Instructors' }]} />

        <section className={`grid overflow-hidden rounded-3xl border shadow-sm lg:grid-cols-[0.85fr_1.15fr] ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white'}`}>
          <div className={`relative flex min-h-64 flex-col justify-between overflow-hidden p-6 sm:p-9 lg:min-h-[430px] ${isDark ? 'bg-[var(--bg-primary)]' : 'bg-neutral-100'}`}>
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[var(--accent-red)]/10 blur-3xl" aria-hidden="true" />
            <div className="relative flex items-center justify-between gap-3">
              <span className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] ${isDark ? 'border-red-900/50 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-800'}`}>Your instructor</span>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>CS Academy · East Africa</span>
            </div>
            <div className="relative mt-10 flex flex-col items-center text-center lg:mt-0">
              <div className={`flex h-36 w-36 items-center justify-center rounded-[2rem] bg-gradient-to-br ${instructor.avatarGradient ?? 'from-red-600 to-red-900'} p-1 shadow-xl sm:h-44 sm:w-44`}>
                <div className={`flex h-full w-full items-center justify-center rounded-[1.8rem] text-5xl font-black text-white ${isDark ? 'bg-[var(--bg-secondary)]' : 'bg-neutral-900'}`} aria-label={`${instructor.name} initials`}>
                  {instructor.avatarInitials}
                </div>
              </div>
              <h1 className={`mt-5 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>{instructor.name}</h1>
              <p className="mt-1 text-sm font-semibold text-[var(--accent-red-strong)]">{instructor.role}</p>
            </div>
            <div className={`relative mt-8 flex flex-wrap justify-center gap-2 lg:mt-0 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {instructor.expertise.map((area) => <span key={area} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${isDark ? 'border-[var(--border-color)] bg-white/[0.03]' : 'border-neutral-300 bg-white'}`}>{area}</span>)}
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[var(--accent-red-strong)]">Learn by understanding, then practising</p>
            <h2 className={`mt-3 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Technology should feel useful and within reach.</h2>
            <p className={`mt-4 text-sm leading-7 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{instructor.bio}</p>

            <div className={`mt-6 rounded-2xl border p-4 sm:p-5 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-white'}`}>
              <div className="text-xs font-extrabold">Teaching focus</div>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Make complex ideas understandable, connect them to practical tasks, and help learners use technology with care.</p>
              <div className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t pt-3 text-[11px] ${isDark ? 'border-[var(--border-color)] text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
                {instructor.featuredCourses.map((course) => <span key={course} className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" aria-hidden="true" />{course}</span>)}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-3 text-xs font-extrabold text-white transition hover:bg-[var(--accent-red-hover)]">Explore programs <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              {instructor.socialLinks?.linkedin && <a href={instructor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold ${isDark ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}><Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn</a>}
            </div>
          </div>
        </section>

        <div className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white'}`}>
          <p className={`inline-flex items-center gap-2 text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}><BookOpen className="h-4 w-4 text-[var(--accent-red-strong)]" aria-hidden="true" />Want to ask about a course or learning path?</p>
          <Link to="/request-training" className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[var(--accent-red-strong)] hover:underline">Send an individual request <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
        </div>
      </div>
    </main>
  );
};
