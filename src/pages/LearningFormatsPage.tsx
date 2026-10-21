import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CalendarDays, Mic, MessageSquare, MonitorPlay, Video, Wifi } from 'lucide-react';
import { learningFormatsData } from '../data/learningFormats';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { PageBreadcrumbs } from '../components/LayoutPrimitives';

const titleCase = (value: string) => value.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

const iconByName = {
  Video,
  MonitorPlay,
  MessageSquare,
  Mic,
  Calendar: CalendarDays,
  Building2
} as const;

const formatAccent = (category: string) => {
  if (category === 'mobile') return { icon: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', line: 'bg-emerald-500' };
  if (category === 'self-paced') return { icon: 'bg-sky-500/10 text-sky-700 dark:text-sky-300', line: 'bg-sky-500' };
  if (category === 'virtual') return { icon: 'bg-violet-500/10 text-violet-700 dark:text-violet-300', line: 'bg-violet-500' };
  return { icon: 'bg-amber-500/10 text-amber-700 dark:text-amber-300', line: 'bg-amber-500' };
};

export const LearningFormatsPage: React.FC = () => {
  const { theme, currency, setCurrency } = useApp();
  const isDark = theme === 'dark';
  const canonical = useCanonicalUrl();

  const formatPrice = (format: (typeof learningFormatsData)[number]) => {
    const amount = currency === 'TSH' ? format.priceStartingTsh : currency === 'KES' ? format.priceStartingKes : format.priceStartingUsd;
    if (amount === 'Custom') return 'Request a quote';
    return currency === 'TSH' ? `TSh ${amount}` : currency === 'KES' ? `KES ${amount}` : `$${amount}`;
  };

  const requestLink = (formatId: string) => {
    if (formatId === 'workshops-seminars' || formatId === 'physical-training') return '/for-organizations#proposal';
    if (formatId === 'conferences-keynotes') return '/contact';
    const requestedFormat = formatId === 'whatsapp-learning'
      ? 'WhatsApp learning'
      : formatId === 'self-paced-learning'
        ? 'Self-paced online learning'
        : formatId === 'zoom-live' || formatId === 'google-meet'
          ? 'Live online cohort'
          : 'Help me choose';
    return `/request-training?format=${encodeURIComponent(requestedFormat)}`;
  };

  return (
    <>
      <Helmet>
        <title>Learning Formats | Online, WhatsApp &amp; Team Training | CS Academy</title>
        <meta name="description" content="Compare CS Academy delivery options, including WhatsApp learning, live online classes, workshops, and on-site training. Check connection needs and published starting prices." />
        <meta name="keywords" content="WhatsApp learning Tanzania, live online cohort, self-paced training, corporate workshops, on-site training East Africa, CS Academy" />
        <meta property="og:title" content="Learning Formats | CS Academy" />
        <meta property="og:description" content="Choose a delivery format that fits your learning goals, schedule, device, and connection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className={`min-h-screen px-4 pb-16 pt-28 transition-colors sm:pb-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'}`}>
        <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
          <PageBreadcrumbs theme={theme} items={[{ label: 'Home', route: '/' }, { label: 'Learning formats' }]} />

          <header className="mx-auto max-w-3xl space-y-4 text-center">
            <span className={`inline-flex rounded-full border px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${isDark ? 'border-red-900/50 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-800'}`}>
              Learn in a format that fits
            </span>
            <h1 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>
              Choose how you <span className="text-[var(--accent-red-strong)]">want to learn.</span>
            </h1>
            <p className={`mx-auto max-w-2xl text-sm leading-relaxed sm:text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Compare mobile, live online, workshop, and event options. Schedules, included support, and final scope depend on the selected course or proposal.
            </p>
            <div className="flex flex-col items-center justify-center gap-2 pt-1 sm:flex-row">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Display prices in</span>
              <div role="group" aria-label="Price currency" className={`inline-flex rounded-xl border p-1 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-300 bg-white'}`}>
                {(['TSH', 'KES', 'USD'] as const).map((code) => (
                  <button key={code} type="button" aria-pressed={currency === code} onClick={() => setCurrency(code)} className={`min-h-9 rounded-lg px-3 text-[11px] font-bold transition ${currency === code ? 'bg-[var(--accent-red)] text-white' : isDark ? 'text-neutral-300 hover:bg-white/[0.05]' : 'text-neutral-700 hover:bg-neutral-100'}`}>
                    {code === 'TSH' ? 'TZS' : code}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {learningFormatsData.map((format) => {
              const Icon = iconByName[format.icon as keyof typeof iconByName] ?? Video;
              const accent = formatAccent(format.category);
              const isTeamOption = format.category === 'in-person';
              const actionText = format.id === 'conferences-keynotes'
                ? 'Discuss an event'
                : isTeamOption
                  ? 'Request a team proposal'
                  : 'Request this format';

              return (
                <article key={format.id} className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-1 hover:shadow-xl ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm'}`}>
                  <div className={`h-1.5 ${accent.line}`} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                      <span className={`rounded-full border px-3 py-1.5 text-right text-[10px] font-semibold leading-snug ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)] text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'}`}>{format.bestFor}</span>
                    </div>

                    <div className="mt-4">
                      <p className={`text-[9px] font-extrabold uppercase tracking-[0.15em] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Option {format.number}</p>
                      <h2 className={`mt-1 text-lg font-black tracking-tight sm:text-xl ${isDark ? 'text-white' : 'text-neutral-900'}`}>{titleCase(format.title)}</h2>
                      <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{format.description}</p>
                    </div>

                    <div className={`mt-4 space-y-2 rounded-xl border p-3 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}>
                      <div className="flex items-start gap-2 text-xs">
                        <Wifi className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}><strong className={isDark ? 'text-neutral-100' : 'text-neutral-900'}>Connection:</strong> {format.bandwidthLevel}</span>
                      </div>
                      <div className={`pl-[1.375rem] text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}><strong className={isDark ? 'text-neutral-300' : 'text-neutral-800'}>Delivery:</strong> {format.channelName}</div>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {format.features.slice(0, 3).map((feature) => (
                        <li key={feature} className={`flex items-start gap-2 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-red-strong)]" aria-hidden="true" />{feature}
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-auto flex items-end justify-between gap-3 border-t pt-4 mt-5 ${isDark ? 'border-[var(--border-color)]' : 'border-neutral-200'}`}>
                      <div className="min-w-0">
                        <p className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Starting price</p>
                        <p className={`mt-0.5 text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-neutral-950'}`}>{formatPrice(format)}</p>
                        <p className={`mt-0.5 text-[10px] leading-snug ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{format.pricingLabel}</p>
                      </div>
                    </div>
                    <Link to={requestLink(format.id)} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[var(--accent-red-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2">
                      {actionText}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className={`mx-auto max-w-3xl rounded-xl border px-4 py-3 text-center text-xs leading-relaxed ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-neutral-300' : 'border-neutral-200 bg-white text-neutral-700'}`}>
            Starting prices show the published rate for the stated plan or package. Ask us to confirm availability, schedule, included support, and final payment details before committing.
          </p>
        </div>
      </main>
    </>
  );
};
