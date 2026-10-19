import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, Loader2, ShieldCheck, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { submitForm } from '../utils/booking';
import { b2bTeamSizeOptions, b2bTimelineOptions, b2bSectorOptions } from '../data/b2b';

const TEAM_RATE = 25000;
const HOURS_SAVED_PER_STAFF_WEEK = 4;

export const B2BLeadForm: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [teamSize, setTeamSize] = useState(50);
  const [sector, setSector] = useState<string>(b2bSectorOptions[0]);
  const [timeline, setTimeline] = useState<string>(b2bTimelineOptions[1]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const annualSaving = teamSize * HOURS_SAVED_PER_STAFF_WEEK * 46 * 2500;
  const programmeCost = TEAM_RATE * teamSize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    const result = await submitForm({
      _subject: 'B2B Training Proposal Request | CS Academy',
      name,
      email,
      organizationType: sector,
      teamSize: String(teamSize),
      timeline,
      program: 'Corporate AI & Cybersecurity Workforce Proposal',
      source: 'b2b-lead-form',
      submittedAt: new Date().toISOString()
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
      <div className={`rounded-3xl border p-8 sm:p-10 text-center ${isDark ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50'}`}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h3 className={`mt-4 text-xl font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Proposal request received</h3>
        <p className={`mt-2 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
          A training advisor will email you within 1 business day with a scoped outline for {teamSize} people in {sector}.
        </p>
        <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold ${isDark ? 'bg-white/5 text-emerald-300' : 'bg-white text-emerald-700'}`}>
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Response within 1 business day
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-3xl border p-6 sm:p-8 space-y-5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-xl'}`}>
      <div>
        <h3 className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Get your scoped proposal</h3>
        <p className={`mt-1 text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Takes 30 seconds. We reply within 1 business day.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
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

      <div>
        <label htmlFor="b2b-sector" className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Sector</label>
        <select id="b2b-sector" value={sector} onChange={(e) => setSector(e.target.value)}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}>
          {b2bSectorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="b2b-timeline" className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>When do you need this?</label>
        <select id="b2b-timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)}
          className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-red)] ${isDark ? 'border-white/10 bg-black/30 text-white' : 'border-neutral-300 bg-white text-neutral-900'}`}>
          {b2bTimelineOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label htmlFor="b2b-team" className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>Team size</label>
          <span className="text-sm font-extrabold text-[var(--accent-red-strong)]">{teamSize} staff</span>
        </div>
        <input id="b2b-team" type="range" min={10} max={1000} step={10} value={teamSize}
          onChange={(e) => setTeamSize(Number(e.target.value))}
          className="w-full accent-[var(--accent-red)]" />
        <div className="mt-1.5 flex justify-between text-[10px] text-neutral-500">
          {b2bTeamSizeOptions.map((n) => <span key={n}>{n}</span>)}
        </div>
      </div>

      <div className={`rounded-2xl border p-4 ${isDark ? 'border-white/10 bg-black/20' : 'border-neutral-200 bg-neutral-50'}`}>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          <span className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`}>Estimated impact</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className={`font-extrabold text-emerald-500`}>TSh {annualSaving.toLocaleString()}</div>
            <div className={`mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>annual hours-value recovered</div>
          </div>
          <div>
            <div className={`font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>TSh {programmeCost.toLocaleString()}</div>
            <div className={`mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>indicative programme cost</div>
          </div>
        </div>
        <p className={`mt-2 text-[10px] leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
          Indicative only, based on {HOURS_SAVED_PER_STAFF_WEEK} hours saved per person per week. Your proposal shows real figures.
        </p>
      </div>

      {status === 'error' && (
        <p role="alert" className={`text-xs font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
      )}

      <button type="submit" disabled={status === 'sending'}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-red-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 disabled:opacity-60 disabled:translate-y-0">
        {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Get my proposal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
      </button>

      <p className={`flex items-center justify-center gap-1.5 text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
        <ShieldCheck className="h-3 w-3" aria-hidden="true" /> No spam. One advisor, one conversation.
      </p>
    </form>
  );
};