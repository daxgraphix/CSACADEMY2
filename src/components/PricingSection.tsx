import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MessageSquare, Video, Layers, CalendarDays, Building2, Mic, Wifi, Info } from 'lucide-react';
import { pricingPlansData } from '../data/pricing';
import { useApp } from '../context/AppContext';

type Audience = 'individual' | 'teams';

const individualPlanIds = new Set(['whatsapp-tier', 'self-paced-platform', 'zoom-live-cohort', 'annual-all-access']);
const iconByType = {
  'mobile-first': MessageSquare,
  'self-paced': Layers,
  'virtual-live': Video,
  'in-person-workshop': CalendarDays,
  'corporate-onsite': Building2,
  keynote: Mic
} as const;

const formatForPlan = (planId: string) => {
  if (planId === 'whatsapp-tier') return 'WhatsApp learning';
  if (planId === 'self-paced-platform') return 'Self-paced online learning';
  if (planId === 'zoom-live-cohort') return 'Live online cohort';
  return 'Help me choose';
};

export const PricingSection: React.FC = () => {
  const { theme, currency, setCurrency } = useApp();
  const isDark = theme === 'dark';
  const [audience, setAudience] = useState<Audience>('individual');

  const formatPrice = (plan: (typeof pricingPlansData)[number]) => {
    const amount = currency === 'TSH' ? plan.priceTsh : currency === 'KES' ? plan.priceKes : plan.priceUsd;
    if (amount === 'Custom') return 'Request a quote';
    if (amount === '0') return 'Free';
    if (currency === 'USD') return `$${amount}`;
    return `${currency === 'TSH' ? 'TSh' : 'KES'} ${amount}`;
  };

  const plans = pricingPlansData.filter((plan) => individualPlanIds.has(plan.id) === (audience === 'individual'));

  return (
    <section
      id="pricing-section"
      aria-labelledby="pricing-title"
      className={`border-b py-14 sm:py-20 lg:py-24 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-white'}`}
    >
      <div className="mx-auto max-w-7xl space-y-9 px-4 sm:px-6 lg:px-8 sm:space-y-12">
        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-flex items-center rounded-full border border-[var(--accent-red-border)] bg-[var(--accent-red-subtle)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
            Published prices · choose your path
          </span>
          <h1 id="pricing-title" className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>
            Clear options for learning and training
          </h1>
          <p className={`mx-auto max-w-2xl text-sm leading-relaxed sm:text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Compare individual learning plans or team services. Prices are shown in the selected currency; each option states its billing period and what is included.
          </p>
        </header>

        <div className="mx-auto max-w-4xl">
          <div role="tablist" aria-label="Choose pricing for" className={`grid grid-cols-2 gap-1 rounded-2xl border p-1.5 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-300 bg-white'}`}>
            {([
              { id: 'individual' as const, title: 'Individual learning', description: 'Personal monthly or annual plans' },
              { id: 'teams' as const, title: 'Teams & events', description: 'Workshops, on-site training, keynotes' }
            ]).map((item) => {
              const selected = audience === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="pricing-plans-panel"
                  id={`pricing-tab-${item.id}`}
                  onClick={() => setAudience(item.id)}
                  className={`min-h-16 rounded-xl px-3 py-2.5 text-left transition-colors sm:px-5 ${selected ? 'bg-[var(--accent-red)] text-white shadow-md' : isDark ? 'text-neutral-300 hover:bg-white/5' : 'text-neutral-700 hover:bg-neutral-100'}`}
                >
                  <span className="block text-xs font-extrabold sm:text-sm">{item.title}</span>
                  <span className={`mt-0.5 block text-[10px] sm:text-xs ${selected ? 'text-white/85' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className={`text-center sm:text-left ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            <h2 id="pricing-plans-title" className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              {audience === 'individual' ? 'Plans for individual learners' : 'Services for teams and events'}
            </h2>
            <p className="mt-1 text-xs">{audience === 'individual' ? 'Choose how you want to learn, then ask us about availability.' : 'Share your audience, goals, and preferred dates to get a scoped response.'}</p>
          </div>
          <div role="radiogroup" aria-label="Display prices in" className={`inline-flex items-center gap-1 rounded-xl border p-1 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-300 bg-white'}`}>
            {(['TSH', 'KES', 'USD'] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={currency === value}
                onClick={() => setCurrency(value)}
                className={`min-h-9 rounded-lg px-3 text-[11px] font-extrabold transition-colors ${currency === value ? 'bg-[var(--accent-red)] text-white' : isDark ? 'text-neutral-300 hover:bg-white/5' : 'text-neutral-700 hover:bg-neutral-100'}`}
              >
                {value === 'TSH' ? 'TZS' : value}
              </button>
            ))}
          </div>
        </div>

        <div id="pricing-plans-panel" role="tabpanel" aria-labelledby={`pricing-tab-${audience}`} className={`grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 ${audience === 'individual' ? 'xl:grid-cols-4' : 'xl:grid-cols-3'}`}>
          {plans.map((plan) => {
            const Icon = iconByType[plan.deliveryType];
            const highlighted = audience === 'individual' && !!plan.popular;
            const destination = audience === 'individual'
              ? `/request-training?format=${encodeURIComponent(formatForPlan(plan.id))}`
              : plan.deliveryType === 'keynote'
                ? '/contact'
                : '/for-organizations#proposal';
            const actionLabel = audience === 'individual'
              ? 'Ask about this plan'
              : plan.deliveryType === 'keynote'
                ? 'Ask about availability'
                : 'Request a team proposal';

            return (
              <article key={plan.id} className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-6 ${highlighted ? isDark ? 'border-[var(--accent-red)] bg-[var(--bg-secondary)] shadow-[0_18px_50px_rgba(255,59,48,0.12)]' : 'border-[var(--accent-red)] bg-white shadow-[0_18px_50px_rgba(220,38,38,0.12)]' : isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm'}`}>
                {highlighted && <div className="absolute right-4 top-4 rounded-full bg-[var(--accent-red-subtle)] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[var(--accent-red-strong)]">Popular</div>}
                <div className="flex items-center gap-2 pr-16">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${highlighted ? 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]' : isDark ? 'bg-white/5 text-neutral-200' : 'bg-neutral-100 text-neutral-700'}`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{plan.badge}</span>
                </div>

                <div className="mt-5">
                  <h3 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>{plan.name}</h3>
                  <p className={`mt-2 min-h-10 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{plan.tagline}</p>
                </div>

                <div className={`mt-5 border-y py-4 ${isDark ? 'border-[var(--border-color)]' : 'border-neutral-200'}`}>
                  <div className={`text-3xl font-black tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>{formatPrice(plan)}</div>
                  <div className={`mt-1 text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{plan.billingPeriod}</div>
                  {plan.bandwidthRequirement && (
                    <div className={`mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      <Wifi className="mt-0.5 h-3 w-3 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />
                      <span>{plan.bandwidthRequirement}</span>
                    </div>
                  )}
                </div>

                {plan.highlightNote && <p className={`mt-4 rounded-xl px-3 py-2 text-[11px] leading-relaxed ${isDark ? 'bg-white/[0.04] text-neutral-300' : 'bg-neutral-50 text-neutral-700'}`}>{plan.highlightNote}</p>}

                <div className="mt-5 flex-1 space-y-3">
                  <h4 className={`text-[10px] font-extrabold uppercase tracking-[0.15em] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Included</h4>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className={`flex items-start gap-2 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.notIncluded?.length ? (
                    <details className={`rounded-xl border px-3 py-2 text-xs ${isDark ? 'border-[var(--border-color)] text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
                      <summary className="cursor-pointer font-bold">What this plan does not include</summary>
                      <ul className={`mt-2 list-disc space-y-1 pl-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {plan.notIncluded.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </details>
                  ) : null}
                </div>

                <Link to={destination} className={`mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${highlighted ? 'bg-[var(--accent-red)] text-white shadow-md hover:bg-[var(--accent-red-hover)]' : isDark ? 'border border-[var(--border-strong)] bg-white/[0.04] text-white hover:bg-white/10' : 'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100'}`}>
                  {actionLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className={`mx-auto flex max-w-4xl items-start gap-3 rounded-2xl border p-4 sm:p-5 ${isDark ? 'border-[var(--accent-red-border)] bg-red-950/20 text-neutral-200' : 'border-red-200 bg-red-50 text-neutral-800'}`}>
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />
          <p className="text-xs leading-relaxed">
            {audience === 'individual'
              ? 'Individual plan rates are shown for the stated billing period. Ask us to confirm course availability, access dates, and payment instructions before you enroll.'
              : 'Team and event prices describe the listed package scope. Dates, participant limits, delivery details, and final pricing are confirmed with you before you commit.'}
          </p>
        </div>

        <div className={`flex flex-col items-center justify-center gap-2 text-center text-xs sm:flex-row ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <MessageSquare className="h-4 w-4 text-[var(--accent-red-strong)]" aria-hidden="true" />
          Need help comparing options? <Link to="/contact" className="font-bold text-[var(--accent-red-strong)] underline underline-offset-2">Talk to the team</Link>
        </div>
      </div>
    </section>
  );
};
