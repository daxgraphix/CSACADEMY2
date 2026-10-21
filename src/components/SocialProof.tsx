import React from 'react';
import { ArrowRight, BookOpenCheck, Languages, MapPin, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SocialProofProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const SocialProof: React.FC<SocialProofProps> = ({ openBookingModal }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const items = [
    { icon: MapPin, title: 'Rooted in East Africa', body: 'Based in Dar es Salaam, with online training available across the region.' },
    { icon: Languages, title: 'Clear instruction', body: 'Course instruction and materials are provided in English.' },
    { icon: Smartphone, title: 'Designed for local access', body: 'Mobile-friendly learning with payment details confirmed directly before enrollment.' },
    { icon: BookOpenCheck, title: 'Practical from day one', body: 'Work through guided prompts, research, writing, and safe-use exercises.' }
  ];

  return (
    <section id="social-proof-section" aria-labelledby="local-fit-title" className={`py-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#FAFAFA] text-neutral-900'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">Local delivery, practical learning</p>
          <h2 id="local-fit-title" className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Built for learners and teams across East Africa</h2>
          <p className={`mt-4 text-sm leading-relaxed sm:text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Instruction and course materials are in English. Ask our team to confirm the format, payment option, and course requirements before you enroll.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <article 
              key={title} 
              className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isDark ? 'border-white/10 bg-white/[0.03] hover:border-[var(--accent-red)]/30' : 'border-neutral-200 bg-white shadow-sm hover:border-[var(--accent-red)]/30'}`}
            >
              <Icon 
                aria-hidden="true" 
                className="h-5 w-5 text-[var(--accent-red-strong)] transition-transform group-hover:scale-110" 
              />
              <h3 className="mt-4 font-bold transition-colors group-hover:text-[var(--accent-red-strong)]">{title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'} transition-colors group-hover:${isDark ? 'text-white' : 'text-neutral-900'}`}>{body}</p>
              <div aria-hidden="true" className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-[var(--accent-red)]/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Want to review the curriculum and schedule before deciding?</p>
          <button
            type="button"
            onClick={() => openBookingModal({ program: 'AI for Everyone' })}
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--accent-red)] bg-[var(--accent-red-subtle)] px-6 py-3 text-sm font-bold text-[var(--accent-red-strong)] shadow-sm transition-all duration-300 hover:border-[var(--accent-red-hover)] hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
            aria-label="Request the course outline and schedule details"
          >
            Request the course outline
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
