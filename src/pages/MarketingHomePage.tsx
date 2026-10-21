import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, BookOpenCheck, Building2, CalendarDays, Check, Code2, Languages, LockKeyhole, MapPin, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { useApp } from '../context/AppContext';
import { cohortStartIsAdminConfirmed, getNextCohortDate } from '../utils/cohort';
import { pricingPlansData } from '../data/pricing';
import { getProgramAccent } from '../utils/programAccent';

const alexPortrait = new URL('../../assets/images/ALEX.jpg', import.meta.url).href;

const learningPaths = [
  {
    slug: 'ai',
    title: 'Artificial intelligence',
    description: 'Use AI tools thoughtfully for research, writing, planning, and everyday work.',
    Icon: Sparkles
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Build safer habits, recognize common threats, and protect your digital work.',
    Icon: LockKeyhole
  },
  {
    slug: 'digital-skills',
    title: 'Digital skills',
    description: 'Strengthen practical technology skills for study, work, and business.',
    Icon: Code2
  }
];

interface MarketingHomePageProps {
  openBookingModal: (prefill?: { program?: string; format?: string; duration?: string }) => void;
}

export const MarketingHomePage: React.FC<MarketingHomePageProps> = ({ openBookingModal }) => {
  const { theme } = useApp();
  const canonical = useCanonicalUrl();
  const startDate = cohortStartIsAdminConfirmed() ? getNextCohortDate() : null;
  const livePlan = pricingPlansData.find((plan) => plan.id === 'zoom-live-cohort');
  const isDark = theme === 'dark';
  const secondaryText = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const card = isDark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white shadow-xl shadow-neutral-900/5';

  return (
    <main className="w-full overflow-hidden">
      <Helmet>
        <title>Practical AI Training in Tanzania &amp; East Africa | CS Academy</title>
        <meta name="description" content="Learn to use AI safely for research, writing, and everyday work. Join CS Academy’s beginner friendly live training in Tanzania and across East Africa." />
        <meta property="og:title" content="Put AI to work | CS Academy" />
        <meta property="og:description" content="Beginner friendly, practical AI training with local context, live instruction, and flexible delivery." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <section className={`relative isolate px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center lg:pt-28 lg:pb-10 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#fffaf8] text-neutral-950'}`}>
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-[var(--accent-red)]/10 blur-[100px]" />
          <div className="absolute -right-32 top-20 h-[26rem] w-[26rem] rounded-full bg-orange-300/20 blur-[100px]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--bg-primary)]/10 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] ${isDark ? 'border-white/10 bg-white/5 text-neutral-200' : 'border-red-200 bg-white/85 text-neutral-800'}`}>
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" /> Tanzania based · online across East Africa
            </div>
            <div className={`mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>
              <span className="inline-flex items-center rounded-full bg-[var(--accent-purple)]/10 px-3 py-1.5 text-[var(--accent-purple)]">
                Beginner friendly
              </span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white'}`}>
                <Users aria-hidden="true" className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" /> Individuals and teams
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-[3.75rem]">
              Put AI to work.<br />
              <span className="text-[var(--accent-red-strong)]">Keep judgment human.</span>
            </h1>
            <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg lg:text-base 2xl:text-lg ${secondaryText}`}>
              Learn to use AI for research, writing, and everyday tasks with guided practice, safer-use habits, and a human review of the results.
            </p>

    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openBookingModal({ program: 'AI for Everyone', format: 'Live Online (Zoom/Google Meet)', duration: '1 to 2 Days' })}
                className="group relative inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[var(--accent-red)] px-6 py-4 text-xs font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--accent-red-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
                aria-label="Ask about AI for Everyone training"
              >
                Ask about AI training
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <Link
                to="/programs/ai"
                className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-full border px-6 py-4 text-xs font-black uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${isDark ? 'border-white/15 bg-white/5 text-white hover:bg-white/10' : 'border-neutral-300 bg-white/80 text-neutral-900 hover:bg-white'}`}
                aria-label="See the AI training curriculum"
              >
                See AI curriculum
                <Building2
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
            <p className={`mt-3 text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
              {startDate ? `Next confirmed cohort starts ${startDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi' })}.` : 'Ask us to confirm dates, format, and enrollment options. No payment is taken here.'}
            </p>
            {livePlan && <p className={`mt-2 text-xs font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Live cohort plan: TSh {livePlan.priceTsh} / month · KES {livePlan.priceKes} / month · USD {livePlan.priceUsd} / month. <Link to="/pricing" className="underline underline-offset-2 hover:text-[var(--accent-red-strong)]">See all pricing</Link>
            </p>}

            <div className={`mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t pt-5 text-xs font-semibold ${isDark ? 'border-white/10 text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
              <span className="inline-flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-emerald-500" /> No technical background required</span>
              <span className="inline-flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-emerald-500" /> 1 to 2 day intensive</span>
            </div>
          </div>

          <div className={`relative mx-auto w-full max-w-xl rounded-[2rem] border p-4 sm:p-6 ${card}`}>
            <div aria-hidden="true" className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-[var(--accent-red)]/15 blur-2xl" />
            <div className={`relative overflow-hidden rounded-[1.4rem] border ${isDark ? 'border-white/10 bg-[#101114]' : 'border-neutral-200 bg-white'}`}>
              <div className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.17em] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>A practical exercise</p>
                  <p className="mt-1 text-sm font-bold">From task to useful workflow</p>
                </div>
              </div>
              <div className="space-y-3 p-5 sm:p-6">
                <div className={`rounded-2xl border p-4 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-neutral-50'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>01 · Your task</p>
                  <p className="mt-2 text-sm font-semibold">“Help me turn these meeting notes into clear action items.”</p>
                </div>
                <div className="flex justify-center"><ArrowDown aria-hidden="true" className="h-4 w-4 text-[var(--accent-red-strong)]" /></div>
                <div className={`rounded-2xl border p-4 ${isDark ? 'border-red-400/20 bg-red-500/[0.07]' : 'border-red-200 bg-red-50/70'}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-red-strong)]">02 · A better prompt</p>
                  <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>Set the context, request a structured summary, then verify names, dates, and decisions before sharing.</p>
                </div>
                <div className={`grid grid-cols-2 gap-3 pt-1 text-xs font-semibold ${secondaryText}`}>
                  <div className="flex items-center gap-2"><ShieldCheck aria-hidden="true" className="h-4 w-4 text-emerald-500" /> Safe-use habits</div>
                  <div className="flex items-center gap-2"><BookOpenCheck aria-hidden="true" className="h-4 w-4 text-[var(--accent-red-strong)]" /> Guided practice</div>
                </div>
              </div>
            </div>
            <div className={`relative mt-4 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}>
              <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]"><CalendarDays aria-hidden="true" className="h-5 w-5" /></span><div><p className="text-xs font-bold">{startDate ? 'Confirmed start date' : 'Next cohort date'}</p><p className={`mt-0.5 text-xs ${secondaryText}`}>{startDate ? startDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Nairobi' }) : 'Confirm with our team'}</p></div></div>
              <span className="rounded-full bg-[var(--accent-purple)]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--accent-purple)]">Live online</span>
            </div>
            <p className={`relative mt-3 flex items-center gap-2 text-[11px] font-semibold ${secondaryText}`}>
              <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              Dates and availability are confirmed with you before enrollment.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Training details" className={`border-y py-4 lg:py-3 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-white'}`}>
        <div className={`mx-auto grid max-w-7xl gap-3 px-4 text-sm sm:grid-cols-3 sm:px-6 lg:px-8 ${secondaryText}`}>
          <div className="flex items-center justify-center gap-3"><Languages aria-hidden="true" className="h-5 w-5 text-[var(--accent-red-strong)]" /><span>English-language instruction</span></div>
          <div className="flex items-center justify-center gap-3"><MapPin aria-hidden="true" className="h-5 w-5 text-[var(--accent-red-strong)]" /><span>Online or in-person options</span></div>
          <div className="flex items-center justify-center gap-3"><Users aria-hidden="true" className="h-5 w-5 text-[var(--accent-red-strong)]" /><span>Individuals and organization teams</span></div>
        </div>
      </section>

      <section className={`px-4 py-16 sm:px-6 lg:px-8 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#fffaf8] text-neutral-950'}`}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">Practical by design</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Learn a workflow you can use at work.</h2>
            <p className={`mt-4 text-sm leading-relaxed sm:text-base ${secondaryText}`}>
              The AI for Everyone intensive combines clear explanations with guided exercises. Bring a real task and practice improving it step by step.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { number: '01', title: 'Frame the task', text: 'Give the AI useful context, clear instructions, and a format that fits the work.' },
              { number: '02', title: 'Build a repeatable workflow', text: 'Practice research, summaries, writing, and planning with tools such as ChatGPT, Claude, or Gemini.' },
              { number: '03', title: 'Review before you rely on it', text: 'Check facts, protect private information, and keep human judgment in the loop.' }
            ].map((step) => (
              <article key={step.number} className={`rounded-3xl border p-6 ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white shadow-sm'}`}>
                <span className="text-xs font-black tracking-[0.16em] text-[var(--accent-red-strong)]">{step.number}</span>
                <h3 className="mt-4 text-lg font-extrabold">{step.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>{step.text}</p>
              </article>
            ))}
          </div>

          <div className={`mt-6 flex flex-col gap-4 rounded-3xl border p-4 sm:flex-row sm:items-center sm:p-5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}>
            <img
              src={alexPortrait}
              alt="Alex Rweyemamu, CS Academy founder and lead instructor"
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
              className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-extrabold">Led by Alex Rweyemamu</p>
              <p className={`mt-1 text-xs leading-relaxed ${secondaryText}`}>Founder and lead instructor. Live sessions include guided practice, screen sharing, and time for questions.</p>
            </div>
            <Link to="/about" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-bold transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red-strong)]">
              Meet the academy <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className={`px-4 py-16 sm:px-6 lg:px-8 ${isDark ? 'bg-[var(--bg-secondary)] text-white' : 'bg-white text-neutral-950'}`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">More ways to learn</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Choose your learning path.</h2>
            </div>
            <Link to="/programs" className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-red-strong)] hover:underline">
              Browse all programs <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {learningPaths.map(({ slug, title, description, Icon }) => {
              const accent = getProgramAccent(slug);
              return (
                <Link key={slug} to={`/programs/${slug}`} className={`group rounded-3xl border p-6 transition duration-200 hover:-translate-y-1 ${isDark ? 'border-white/10 bg-[var(--bg-primary)]' : 'border-neutral-200 bg-[var(--bg-primary)]'}`} style={{ borderTopColor: accent, borderTopWidth: 3 }}>
                  <Icon aria-hidden="true" className="h-6 w-6" style={{ color: accent }} />
                  <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>{description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>Explore path <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`px-4 py-10 sm:px-6 lg:px-8 lg:py-8 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-950'}`}>
        <div className="mx-auto grid max-w-7xl items-center gap-6 rounded-[2rem] bg-[var(--accent-red)] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:p-9">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.17em] text-white/75">For organizations</p>
            <h2 className="mt-2 max-w-2xl text-xl font-black tracking-tight sm:text-2xl">Give your team practical AI and digital safety skills.</h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-white/85 sm:text-sm">Share your team size, goals, location, and target timing. We’ll scope a training plan for your organization.</p>
          </div>
          <Link to="/for-organizations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-wider text-neutral-950 transition hover:bg-neutral-100">
            Explore team training <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto mt-5 max-w-7xl text-center">
          <Link to="/academy" className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold ${isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'}`}>
            Explore the full CS Academy <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
};
