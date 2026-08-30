import React, { useState, useEffect } from 'react';
import { MessageCircle, Wallet, ShieldCheck, ArrowRight, Smartphone, Minimize2, Maximize2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Currency } from '../data/translations';

type Variant = 'inline' | 'sticky-mobile';

interface PriceStripProps {
  openBookingModal: () => void;
  variant?: Variant;
  onSeeFullPricing?: () => void;
}

const PRICE_PER_MONTH: Record<Currency, { value: string; suffix: string; symbol: string }> = {
  TSH: { value: '20,000', suffix: 'Tsh', symbol: 'TZS' },
  KES: { value: '1,500', suffix: 'KSh', symbol: 'KES' },
  USD: { value: '7', suffix: 'USD', symbol: 'USD' }
};

export const PriceStrip: React.FC<PriceStripProps> = ({
  openBookingModal,
  variant = 'inline',
  onSeeFullPricing
}) => {
  const { theme, currency, setCurrency } = useApp();
  const price = PRICE_PER_MONTH[currency];
  const isSticky = variant === 'sticky-mobile';

  if (isSticky) {
    return <StickyPriceBar openBookingModal={openBookingModal} />;
  }

  return (
    <div
      role="region"
      aria-label="Pricing summary"
      className={`relative overflow-hidden rounded-3xl border ${
        theme === 'dark'
          ? 'border-emerald-800/40 bg-gradient-to-br from-emerald-950/40 via-[var(--bg-secondary)] to-[var(--bg-secondary)]'
          : 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white'
      } shadow-lg`}
    >
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"
      />

      <div className="relative p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`shrink-0 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl ${
              theme === 'dark' ? 'bg-emerald-500/15' : 'bg-emerald-500/10'
            }`}
            aria-hidden="true"
          >
            <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500" />
          </div>

          <div className="min-w-0 flex-1">
            <div
              className={`text-[10px] font-black uppercase tracking-[0.14em] ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
              }`}
            >
              Affordable East Africa Pricing
            </div>
            <div className="mt-0.5 flex items-baseline gap-1.5 flex-wrap">
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                Plans from
              </span>
              <span
                className={`text-2xl sm:text-3xl font-black tracking-tight leading-none ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-950'
                }`}
              >
                {price.symbol} {price.value}
              </span>
              <span
                className={`text-xs sm:text-sm font-bold ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}
              >
                / month
              </span>
            </div>
            <div
              className={`mt-1 flex items-center gap-1.5 text-[11px] font-semibold ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`}
            >
              <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>Pay with M-Pesa, Tigo Pesa, Airtel Money or card</span>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 ${
            theme === 'dark' ? '' : ''
          }`}
        >
          <div
            className={`inline-flex items-center p-1 rounded-full border self-start sm:self-auto ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-neutral-200 bg-white'
            }`}
            role="radiogroup"
            aria-label="Currency"
          >
            {(['TSH', 'KES', 'USD'] as const).map((curr) => {
              const active = currency === curr;
              const label = PRICE_PER_MONTH[curr].symbol;
              return (
                <button
                  key={curr}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider transition-colors ${
                    active
                      ? 'bg-[var(--accent-red)] text-white shadow'
                      : theme === 'dark'
                        ? 'text-neutral-400 hover:text-white'
                        : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={openBookingModal}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[var(--accent-red)] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-red-500/20 hover:bg-[var(--accent-red-hover)] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Book a lesson</span>
          </button>

          {onSeeFullPricing && (
            <button
              type="button"
              onClick={onSeeFullPricing}
              className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                theme === 'dark'
                  ? 'text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10'
                  : 'text-neutral-700 hover:text-neutral-950 bg-white hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              See all plans
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const STORAGE_KEY = 'cs_pricestrip_minimized_v1';

interface StickyPriceBarProps {
  openBookingModal: () => void;
}

const StickyPriceBar: React.FC<StickyPriceBarProps> = ({ openBookingModal }) => {
  const { theme, currency, setCurrency } = useApp();
  const isDark = theme === 'dark';
  const price = PRICE_PER_MONTH[currency];

  const [minimized, setMinimized] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (minimized) window.sessionStorage.setItem(STORAGE_KEY, '1');
      else window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore storage errors */
    }
  }, [minimized]);

  if (minimized) {
    return (
      <div
        className={`md:hidden fixed bottom-3 right-3 z-40 inline-flex items-center gap-1 rounded-full pl-2 pr-1 py-1 shadow-lg border ${
          isDark
            ? 'bg-[var(--accent-red)]/95 border-[var(--accent-red-border)] text-white backdrop-blur-md'
            : 'bg-[var(--accent-red)] border-red-700 text-white backdrop-blur-md'
        }`}
        role="region"
        aria-label="Pricing summary (minimized)"
      >
        <span className="text-[11px] font-extrabold uppercase tracking-wider">
          TZS {price.value}
        </span>
        <button
          type="button"
          onClick={openBookingModal}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[var(--accent-red-hover)] text-[10px] font-extrabold uppercase tracking-wider hover:bg-neutral-100"
        >
          Book
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => setMinimized(false)}
          aria-label="Expand price bar"
          className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/15"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-md px-3 py-2.5 flex items-center justify-between gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.18)] ${
        isDark
          ? 'bg-[var(--bg-secondary)]/95 border-[var(--border-color)] text-white'
          : 'bg-white/95 border-neutral-200 text-neutral-900'
      }`}
      role="region"
      aria-label="Pricing summary"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div
          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${
            isDark ? 'bg-white/5' : 'bg-emerald-50'
          }`}
          aria-hidden="true"
        >
          <Wallet className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${
                isDark ? 'text-neutral-500' : 'text-neutral-600'
              }`}
            >
              From
            </span>
            <span
              className={`text-sm font-black tracking-tight ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              {price.symbol} {price.value}
            </span>
            <span
              className={`text-[9px] font-semibold ${
                isDark ? 'text-neutral-400' : 'text-neutral-700'
              }`}
            >
              / mo
            </span>
          </div>
          <div
            className={`hidden xs:flex items-center gap-1 text-[9px] font-semibold ${
              isDark ? 'text-neutral-400' : 'text-neutral-700'
            }`}
          >
            <ShieldCheck className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
            <span>M-Pesa, Tigo Pesa, Airtel, card</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div
          className={`inline-flex items-center p-0.5 rounded-full border ${
            isDark ? 'border-white/10 bg-white/5' : 'border-neutral-300 bg-neutral-100'
          }`}
          role="radiogroup"
          aria-label="Currency"
        >
          {(['TSH', 'KES', 'USD'] as const).map((curr) => {
            const active = currency === curr;
            const label = PRICE_PER_MONTH[curr].symbol;
            return (
              <button
                key={curr}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setCurrency(curr)}
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider transition-colors ${
                  active
                    ? 'bg-[var(--accent-red)] text-white shadow'
                    : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={openBookingModal}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[var(--accent-red)] text-white text-[10px] font-extrabold uppercase tracking-wider shadow hover:bg-[var(--accent-red-hover)] transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          <span>Book</span>
        </button>
        <button
          type="button"
          onClick={() => setMinimized(true)}
          aria-label="Minimize price bar"
          title="Minimize"
          className={`p-1.5 rounded-full transition-colors ${
            isDark
              ? 'text-neutral-400 hover:text-white hover:bg-white/5'
              : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
          }`}
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
