import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { pricingFaqData } from '../data/pricingFaq';
import { siteConfig } from '../config/site';
import { FaqJsonLd } from './FaqJsonLd';

interface PricingFaqSectionProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const PricingFaqSection: React.FC<PricingFaqSectionProps> = ({ openBookingModal }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [openId, setOpenId] = useState<string | null>(pricingFaqData[0].id);

  return (
    <section
      id="pricing-faq"
      aria-labelledby="pricing-faq-title"
      className={`py-20 transition-colors duration-300 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#FAFAFA] text-neutral-900'}`}
    >
      <FaqJsonLd items={pricingFaqData} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest ${
            isDark ? 'border-white/10 bg-white/5 text-neutral-300' : 'border-red-200 bg-red-50 text-[var(--accent-red-strong)]'
          }`}>
            <HelpCircle aria-hidden="true" className="h-3.5 w-3.5" />
            Pricing questions
          </span>
          <h2 id="pricing-faq-title" className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Before you enroll
          </h2>
          <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
            Straight answers on plans, payments, and what happens after you join.
          </p>
        </div>

        <div className="space-y-3">
          {pricingFaqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-sm'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`pricing-faq-panel-${item.id}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent-red)]"
                  >
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      {item.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[var(--accent-red-strong)]' : isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`pricing-faq-panel-${item.id}`}
                    className={`border-t px-5 py-4 text-xs leading-relaxed sm:text-sm ${
                      isDark ? 'border-white/10 text-neutral-300' : 'border-neutral-100 text-neutral-700'
                    }`}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Still unsure which plan fits? Ask us directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello CS Academy, I need help choosing the right plan.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-lg transition-colors hover:bg-emerald-500"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              Ask on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => openBookingModal({ program: 'Pricing Guidance' })}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent-red)] bg-[var(--accent-red-subtle)] px-5 py-3 text-xs font-bold text-[var(--accent-red-strong)] transition-colors hover:bg-[var(--accent-red)] hover:text-white"
            >
              Request guidance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
