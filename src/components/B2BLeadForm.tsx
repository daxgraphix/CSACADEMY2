import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Calculator, Mail, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitForm } from '../utils/booking';
import { b2bTeamSizeOptions, b2bTimelineOptions, b2bSectorOptions, b2bTrainingFocusOptions } from '../data/b2b';
import { pricingPlansData } from '../data/pricing';
import { siteConfig } from '../config/site';

const referencePlans = pricingPlansData.filter((plan) =>
  ['whatsapp-tier', 'self-paced-platform', 'zoom-live-cohort'].includes(plan.id) &&
  plan.billingPeriod === 'per month'
);

const priceForCurrency = (plan: (typeof referencePlans)[number], currency: 'TSH' | 'KES' | 'USD') =>
  ({ TSH: plan.priceTsh, KES: plan.priceKes, USD: plan.priceUsd })[currency];

const currencyName = { TSH: 'TSh', KES: 'KES', USD: 'USD' } as const;

export const B2BLeadForm: React.FC = () => {
  const { theme, currency } = useApp();
  const isDark = theme === 'dark';
  const [teamSize, setTeamSize] = useState(50);
  const [teamSizeDraft, setTeamSizeDraft] = useState('50');
  const [planId, setPlanId] = useState('zoom-live-cohort');
  const [sector, setSector] = useState<string>(b2bSectorOptions[0]);
  const [trainingFocus, setTrainingFocus] = useState<string>(b2bTrainingFocusOptions[0]);
  const [timeline, setTimeline] = useState<string>(b2bTimelineOptions[1]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const referencePlan = referencePlans.find((plan) => plan.id === planId) ?? referencePlans[0];
  const currencyLabel = currencyName[currency];
  const perLearnerMonthly = Number(priceForCurrency(referencePlan, currency).replaceAll(',', ''));
  const planningEstimate = perLearnerMonthly * teamSize;
  const numberFormatter = new Intl.NumberFormat('en');
  const formattedEstimate = numberFormatter.format(planningEstimate);
  const formattedPerLearner = numberFormatter.format(perLearnerMonthly);

  const updateTeamSize = (value: number) => {
    const next = Math.min(1000, Math.max(1, Math.trunc(value)));
    setTeamSize(next);
    setTeamSizeDraft(String(next));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus('error');
      setError('Enter your name and email address to continue.');
      return;
    }
    const organizationName = organization.trim() || 'Organization not provided';
    setStatus('sending');
    setError(null);
    const result = await submitForm({
      _subject: `Team training proposal request | ${organizationName}`,
      name: name.trim(),
      email: email.trim(),
      organization: organizationName,
      organizationType: sector,
      trainingFocus,
      teamSize: String(teamSize),
      timeline,
      plan: referencePlan.name,
      planBillingPeriod: referencePlan.billingPeriod,
      currency,
      referencePricePerLearner: `${currencyLabel} ${formattedPerLearner} per month`,
      planningEstimate: `${currencyLabel} ${formattedEstimate} per month for ${teamSize} people`,
      program: 'Team training proposal',
      source: 'b2b-lead-form',
      submittedAt: new Date().toISOString(),
      message: `Team training proposal request for ${organizationName}\nSector: ${sector}\nTraining focus: ${trainingFocus}\nTeam size: ${teamSize}\nReference plan: ${referencePlan.name} (${referencePlan.billingPeriod})\nPublished individual rate: ${currencyLabel} ${formattedPerLearner} per learner / month\nIllustrative individual-rate total: ${currencyLabel} ${formattedEstimate} per month for ${teamSize} people\nPreferred timeline: ${timeline}\nNote: this comparison is not a team quote.`
    });
    if (result.ok) {
      setStatus('done');
    } else {
      setStatus('error');
      setError(result.errorMessage ?? 'Something went wrong. Please try again.');
    }
  };

  if (status === 'done') {
    return (
      <div className={`rounded-3xl border p-8 sm:p-10 text-center ${isDark ? 'border-[var(--accent-red-border)] bg-red-950/20' : 'border-red-200 bg-red-50/50'}`}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--accent-red-strong)]" aria-hidden="true" />
        <h3 className={`mt-4 text-xl font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Proposal request received</h3>
        <p className={`mt-2 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
          Your details were sent to our support email. We’ll review your team’s needs and follow up at {email} with next steps. The estimate is a planning reference, not a team quote.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs font-bold">
          <a className="inline-flex items-center gap-2 text-[var(--accent-red-strong)] hover:underline" href={`mailto:${siteConfig.email}`}><Mail className="h-4 w-4" /> Email support</a>
          <a className="inline-flex items-center gap-2 text-[var(--accent-red-strong)] hover:underline" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-lg'}`}>
      <div>
        <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Get your scoped proposal</h3>
        <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Share the essentials. We’ll follow up by email to scope the final proposal.</p>
      </div>

      <div>
        <label htmlFor="b2b-organization" className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Organization</label>
        <input id="b2b-organization" type="text" value={organization} onChange={(e) => setOrganization(e.target.value)}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}
          placeholder="Organization name" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="b2b-name" className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Your name</label>
          <input id="b2b-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}
            placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="b2b-email" className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Work email</label>
          <input id="b2b-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}
            placeholder="you@company.co.tz" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="b2b-sector" className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Sector</label>
          <select id="b2b-sector" value={sector} onChange={(e) => setSector(e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}>
            {b2bSectorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="b2b-training-focus" className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Training focus</label>
          <select id="b2b-training-focus" value={trainingFocus} onChange={(e) => setTrainingFocus(e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}>
            {b2bTrainingFocusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
      <div>
        <label htmlFor="b2b-timeline" className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>When do you need this?</label>
        <select id="b2b-timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)}
          className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}>
          {b2bTimelineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-1">
          <label htmlFor="b2b-team" className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Team size</label>
          <output htmlFor="b2b-team" className="text-sm font-extrabold text-[var(--accent-red-strong)]">{teamSize} staff</output>
        </div>
        <input id="b2b-team" type="range" min={1} max={1000} step={1} value={teamSize} aria-valuetext={`${teamSize} people`}
          onChange={(e) => updateTeamSize(Number(e.target.value))}
          className="w-full accent-[var(--accent-red)]" />
        <div className="mt-1.5 flex justify-between text-[10px] text-neutral-500">
          {b2bTeamSizeOptions.map((n) => <span key={n}>{n}</span>)}
        </div>
        <label htmlFor="b2b-team-exact" className={`mt-2 block text-[10px] font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Exact headcount</label>
        <input id="b2b-team-exact" type="number" min={1} max={1000} step={1} value={teamSizeDraft}
          onChange={(e) => {
            const value = e.target.value;
            setTeamSizeDraft(value);
            if (!value) return;
            const next = Number(value);
            if (Number.isFinite(next) && next >= 1) updateTeamSize(next);
          }}
          onBlur={() => setTeamSizeDraft(String(teamSize))}
          className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`} />
      </div>
      </div>

      <div className={`rounded-xl border p-3 ${isDark ? 'border-white/10 bg-black/20' : 'border-neutral-200 bg-neutral-50'}`}>
        <div className="mb-2 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-[var(--accent-red-strong)]" aria-hidden="true" />
          <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>Published plan comparison</span>
        </div>
        <label htmlFor="b2b-reference-plan" className={`mb-1 block text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Monthly individual plan</label>
        <select id="b2b-reference-plan" value={planId} onChange={(e) => setPlanId(e.target.value)}
          className={`w-full rounded-xl border px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}>
          {referencePlans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}: {currencyLabel} {priceForCurrency(plan, currency)}/month</option>)}
        </select>
        <div className="mt-2 grid gap-2 sm:grid-cols-2" aria-live="polite">
          <div className={`rounded-lg border p-2.5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Published per learner / month</div>
            <div className={`mt-1 text-base font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{currencyLabel} {formattedPerLearner}</div>
          </div>
          <div className={`rounded-lg border p-2.5 ${isDark ? 'border-[var(--accent-red-border)] bg-[var(--accent-red-subtle)]' : 'border-red-200 bg-red-50'}`}>
            <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Illustrative team total / month</div>
            <div className={`mt-1 text-base font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{currencyLabel} {formattedEstimate}</div>
          </div>
        </div>
        <p className={`mt-2 text-[10px] leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
          Uses the selected individual monthly rate × {teamSize} learners. It does not include team discounts or other delivery costs and is not a quote. Request a scoped proposal for confirmed pricing.
        </p>
      </div>

      {status === 'error' && (
        <div role="alert" className={`space-y-2 text-xs font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <p>{error}</p>
          <p className="font-normal">You can also contact us directly:</p>
          <div className="flex flex-wrap gap-4 font-bold">
            <a className="inline-flex items-center gap-1.5 hover:underline" href={`mailto:${siteConfig.email}`}><Mail className="h-3.5 w-3.5" /> Email</a>
            <a className="inline-flex items-center gap-1.5 text-[var(--accent-red-strong)] hover:underline" href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>
          </div>
        </div>
      )}

      <button type="submit" disabled={status === 'sending'}
        className="group w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-red-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:translate-y-0">
        {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Get my proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
      </button>

      <p className={`flex items-center justify-center gap-1.5 text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
        <ShieldCheck className="h-3 w-3" aria-hidden="true" /> Sent to {siteConfig.email}; we use your details to respond to this request.
      </p>
    </form>
  );
};
