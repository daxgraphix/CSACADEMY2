import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Wallet, ShieldCheck, ArrowRight, Smartphone, Minimize2, Maximize2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Currency } from '../data/translations';
import { pricingPlansData } from '../data/pricing';

type Variant = 'inline' | 'sticky-mobile';

interface PriceStripProps {
  openBookingModal: () => void;
  variant?: Variant;
}

/**
 * The headline price shown in the strip is the live cohort plan (the plan the
 * academy actively promotes). It is read from `pricingPlansData` so the strip
 * can never drift away from the published pricing page.
 */
const FEATURED_PLAN_ID = 'zoom-live-cohort';

const FEATURED_PLAN =
  pricingPlansData.find((plan) => plan.id === FEATURED_PLAN_ID) ?? pricingPlansData[0];

const PRICE_PER_MONTH: Record<Currency, { value: string; suffix: string; symbol: string }> = {
  TSH: { value: FEATURED_PLAN.priceTsh, suffix: 'Tsh', symbol: 'TZS' },
  KES: { value: FEATURED_PLAN.priceKes, suffix: 'KSh', symbol: 'KES' },
  USD: { value: FEATURED_PLAN.priceUsd, suffix: 'USD', symbol: 'USD' }
};

export const PriceStrip: React.FC<PriceStripProps> = React.memo(({
  openBookingModal,
  variant = 'inline'
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
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-2 text-sm ${
        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
      }`}
    >
      <span className="inline-flex items-baseline gap-1.5 font-medium">
        <span
          className={`hidden sm:inline text-[10px] font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          Live cohort
        </span>
        <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--bk-title-color)' }}>
          {price.symbol} {price.value}
        </span>
        <span className="text-sm font-medium opacity-80">/ month</span>
      </span>

      <span className="opacity-40">·</span>

      <span role="radiogroup" aria-label="Currency" className="inline-flex items-center p-1 rounded-full border" style={{
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#d4ccbe',
        background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#faf7f1'
      }}>
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
              className={`px-3 py-1 rounded-full text-[11.5px] font-bold tracking-wider transition-colors ${
                active
                  ? 'bg-[var(--accent-red)] text-white'
                  : theme === 'dark'
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {label}
            </button>
          );
        })}
      </span>

      <span className="opacity-40">·</span>

      <span className="font-medium">Payment details on request</span>

      <span className="opacity-40">·</span>

      <button
        type="button"
        onClick={openBookingModal}
        className="inline-flex items-center gap-1.5 font-extrabold tracking-wider uppercase text-xs"
        style={{ color: 'var(--accent-red)' }}
      >
        Book a lesson
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      <span className="opacity-40">·</span>
      <Link
        to="/pricing"
        className="inline-flex items-center gap-1.5 font-extrabold tracking-wider uppercase text-xs hover:underline"
        style={{ color: 'var(--bk-title-color)' }}
      >
        See all plans
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
});

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
        className={`md:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-40 inline-flex items-center gap-1 rounded-full pl-2 pr-1 py-1 shadow-lg border ${
          isDark
            ? 'bg-[var(--accent-red)]/95 border-[var(--accent-red-border)] text-white backdrop-blur-md'
            : 'bg-[var(--accent-red)] border-red-700 text-white backdrop-blur-md'
        }`}
        role="region"
        aria-label="Pricing summary (minimized)"
      >
        <span className="text-[11px] font-extrabold uppercase tracking-wider">
          {price.symbol} {price.value}
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
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 border-t backdrop-blur-md px-2.5 sm:px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-1.5 sm:gap-2 shadow-[0_-8px_24px_rgba(0,0,0,0.18)] ${
        isDark
          ? 'bg-[var(--bg-secondary)]/95 border-[var(--border-color)] text-white'
          : 'bg-white/95 border-neutral-200 text-neutral-900'
      }`}
      role="region"
      aria-label="Pricing summary"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div
          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${
            isDark ? 'bg-white/5' : 'bg-emerald-50'
          } max-[399px]:hidden`}
          aria-hidden="true"
        >
          <Wallet className="h-4 w-4 text-emerald-500" />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider max-[399px]:hidden ${
                isDark ? 'text-neutral-500' : 'text-neutral-600'
              }`}
            >
              Live cohort
            </span>
            <span
              className={`text-sm font-black tracking-tight ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              {price.symbol} {price.value}
            </span>
            <span
              className={`text-[9px] font-semibold max-[399px]:hidden ${
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
            <span>Ask us about local payment options</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div
          className={`price-bar-currency hidden xs:inline-flex items-center p-0.5 rounded-full border ${
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
                aria-label={`Use ${curr}`}
                aria-checked={active}
                onClick={() => setCurrency(curr)}
                className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-full px-1 text-[9px] font-bold tracking-wider transition-colors ${
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
        <select
          value={currency}
          onChange={(event) => setCurrency(event.target.value as typeof currency)}
          aria-label="Select currency"
          className={`price-bar-currency-select xs:hidden min-h-9 max-w-16 rounded-full border px-2 text-[10px] font-bold ${
            isDark ? 'border-white/10 bg-white/5 text-white' : 'border-neutral-300 bg-neutral-100 text-neutral-900'
          }`}
        >
          <option value="TSH">TSH</option>
          <option value="KES">KES</option>
          <option value="USD">USD</option>
        </select>
        <button
          type="button"
          onClick={openBookingModal}
          className="inline-flex min-h-9 items-center justify-center gap-1 rounded-full bg-[var(--accent-red)] px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow hover:bg-[var(--accent-red-hover)] transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          <span className="max-[359px]:hidden">Book</span>
        </button>
        <button
          type="button"
          onClick={() => setMinimized(true)}
          aria-label="Minimize price bar"
          title="Minimize"
          className={`inline-flex min-h-8 min-w-8 items-center justify-center rounded-full transition-colors ${
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
