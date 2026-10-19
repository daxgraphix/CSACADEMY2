import React from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, Clock, Flame, MapPin, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCohortUrgency } from '../hooks/useCohortUrgency';
import { getNextCohortDate } from '../utils/cohort';
import { pricingPlansData } from '../data/pricing';

interface FeaturedOfferProps {
  openBookingModal: (prefill?: { program?: string; format?: string; duration?: string }) => void;
}

export const FeaturedOffer: React.FC<FeaturedOfferProps> = ({ openBookingModal }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const startDate = getNextCohortDate();
  const livePlan = pricingPlansData.find((plan) => plan.id === 'zoom-live-cohort');
  const urgency = useCohortUrgency();
  const panel = isDark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white';
  const muted = isDark ? 'text-neutral-300' : 'text-neutral-700';

  return (
    <section aria-labelledby="featured-offer-title" className="relative z-10 px-4 pb-14 sm:px-6 lg:px-8">
      <div className={`mx-auto grid max-w-7xl gap-8 rounded-3xl border p-6 shadow-xl sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10 ${panel}`}>
    <div className="group relative space-y-5 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">Featured live cohort · beginners welcome</p>
            <h2 id="featured-offer-title" className="text-2xl font-black tracking-tight sm:text-3xl transition-colors group-hover:text-[var(--accent-red-strong)]">AI for Everyday Work</h2>
            <p className={`mt-3 max-w-2xl text-sm leading-relaxed sm:text-base ${muted} transition-colors group-hover:${muted.replace('text-', 'text-')}`}>Learn a practical prompt framework and use AI assistants for research, writing, and everyday work, with safe-use guidance and live instructor feedback.</p>
          <ul className={`grid gap-3 text-sm sm:grid-cols-2 ${muted} transition-all duration-300 group-hover:scale-[1.02]`}>
            <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 transition-transform group-hover:scale-110" /> <span>No technical background required</span></li>
            <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 transition-transform group-hover:scale-110" /> <span>Live online or in-person delivery</span></li>
            <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red-strong)] transition-transform group-hover:scale-110" /> <span>East Africa-focused examples</span></li>
            <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform"><Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red-strong)] transition-transform group-hover:scale-110" /> <span>English with local-language support</span></li>
          </ul>
        </div>

        <div className={`relative flex flex-col justify-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg ${isDark ? 'border-white/10 bg-black/20' : 'border-neutral-200 bg-neutral-50'} group`}>
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-red-strong)]" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-red-strong)]">Next cohort</p>
              <p className="mt-1 font-bold">{startDate ? startDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi' }) : 'Get the confirmed start date'}</p>
              <p className={`mt-1 text-xs leading-relaxed ${muted}`}>We’ll confirm the schedule and the right format before you commit.</p>
            </div>
          </div>
          <div className={`border-t pt-4 ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
            <p className="text-sm font-bold">
              Live cohort plan from TSh {livePlan?.priceTsh ?? '50,000'} / month
            </p>
            <p className={`mt-1 text-xs ${muted}`}>
              KES {livePlan?.priceKes ?? '2,700'} or USD {livePlan?.priceUsd ?? '20'} per month. Confirm availability and payment details with our team.
            </p>
          </div>
          <div className={`flex flex-wrap items-center gap-2 border-t pt-4 text-[11px] font-bold uppercase tracking-wider ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-red-subtle)] px-3 py-1.5 text-[var(--accent-red-strong)]">
              <Flame aria-hidden="true" className="h-3.5 w-3.5" />
              {urgency.seatsLeft > 0 ? `${urgency.seatsLeft} seats left` : 'Nearly full'}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ${isDark ? 'bg-white/5 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              {urgency.closed ? 'Enrolment closed' : `Enrol by ${urgency.deadlineLabel} · ${urgency.countdown}`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal({ program: 'AI for Everyone', format: 'Live Online (Zoom/Google Meet)', duration: '1 to 2 Days' })}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[var(--accent-red-hover)]"
          >
            {startDate ? 'Ask about this cohort' : 'Get the next cohort date'} <ArrowRight className="h-4 w-4" />
          </button>
          <p className={`text-center text-[11px] ${muted}`}>No payment is taken on this page.</p>
        </div>
      </div>
    </section>
  );
};
