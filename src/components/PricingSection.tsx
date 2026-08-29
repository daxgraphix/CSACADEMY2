import React, { useState } from 'react';
import { pricingPlansData, paymentMethods } from '../data/pricing';
import { learningFormatsData } from '../data/learningFormats';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  X, 
  ArrowRight,
  ShieldCheck, 
  Smartphone,
  Gift,
  HelpCircle,
  MessageSquare,
  Video,
  Layers,
  Calendar,
  Building2,
  Mic,
  Wifi
} from 'lucide-react';

interface PricingSectionProps {
  openBookingModal: (prefill?: { program?: string; duration?: string; format?: string }) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  openBookingModal
}) => {
  const { theme, currency, setCurrency, t } = useApp();
  const [activeChannelFilter, setActiveChannelFilter] = useState<'all' | 'mobile' | 'self-paced' | 'virtual-live' | 'in-person'>('all');

  const formatPrice = (plan: typeof pricingPlansData[0]) => {
    if (currency === 'TSH') {
      return plan.priceTsh === 'Custom' || plan.priceTsh === '0' 
        ? plan.priceTsh === '0' ? ('Free') : ('Custom Quote')
        : `${plan.priceTsh} Tsh`;
    }
    if (currency === 'KES') {
      return plan.priceKes === 'Custom' || plan.priceKes === '0' 
        ? plan.priceKes === '0' ? ('Free') : ('Custom Quote')
        : `${plan.priceKes} KSh`;
    }
    return plan.priceUsd === 'Custom' || plan.priceUsd === '0' 
      ? plan.priceUsd === '0' ? '$0' : ('Custom Quote')
      : `$${plan.priceUsd}`;
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'mobile-first':
        return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      case 'self-paced':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'virtual-live':
        return <Video className="w-4 h-4 text-[var(--accent-red-strong)]" />;
      case 'in-person-workshop':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'corporate-onsite':
        return <Building2 className="w-4 h-4 text-purple-500" />;
      case 'keynote':
        return <Mic className="w-4 h-4 text-rose-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-[var(--accent-red-strong)]" />;
    }
  };

  const filteredPlans = pricingPlansData.filter((plan) => {
    if (activeChannelFilter === 'all') return true;
    if (activeChannelFilter === 'mobile') return plan.deliveryType === 'mobile-first';
    if (activeChannelFilter === 'self-paced') return plan.deliveryType === 'self-paced';
    if (activeChannelFilter === 'virtual-live') return plan.deliveryType === 'virtual-live';
    if (activeChannelFilter === 'in-person') return plan.deliveryType === 'in-person-workshop' || plan.deliveryType === 'corporate-onsite' || plan.deliveryType === 'keynote';
    return true;
  });

  return (
    <section 
      id="pricing-section" 
      className={`py-24 border-b transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white border-white/10' : 'bg-[#f7f4ee] text-neutral-900 border-neutral-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/10 text-[var(--accent-red-strong)] text-[10px] font-bold uppercase tracking-[0.22em]">
            <span>{t.pricing.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.06em] ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.pricing.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            {t.pricing.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Delivery Channels'},
              { id: 'mobile', label: 'WhatsApp Mobile (Data Saver)'},
              { id: 'self-paced', label: 'On-Demand Video Platform'},
              { id: 'virtual-live', label: 'Zoom & Meet Live Cohorts'},
              { id: 'in-person', label: 'Workshops & On-Site (In-Person)'}
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChannelFilter(tab.id as any)}
                className={`px-3.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all border ${
                  activeChannelFilter === tab.id
                    ? 'bg-[var(--accent-red)] border-[var(--accent-red)] text-white shadow-[0_12px_30px_rgba(255,59,48,0.28)]'
                    : theme === 'dark'
                    ? 'bg-white/5 text-neutral-300 hover:text-white border-white/10'
                    : 'bg-white text-neutral-800 hover:text-neutral-900 border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`pt-2 inline-flex items-center p-1 rounded-full border shadow-sm ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-neutral-200 bg-white/80'
          }`}>
            {(['TSH', 'KES', 'USD'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all ${
                  currency === curr 
                    ? 'bg-[var(--accent-red)] text-white shadow-[0_10px_24px_rgba(255,59,48,0.3)]' 
                    : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
                }`}
              >
                {curr === 'TSH' ? 'TZS (Tsh)' : curr === 'KES' ? 'KES (KSh)' : 'USD ($)'}
              </button>
            ))}
          </div>

          <div className={`grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto pt-3 text-left ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            {[
              { title: 'Choose your access level', text: 'From mobile-first learning to live instructor access.'},
              { title: 'Plan with confidence', text: 'Prices are guidance; we confirm schedule and details before enrollment.'},
              { title: 'Get a human recommendation', text: 'Send an inquiry and we will recommend the best fit.'}
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border p-4 ${
                theme === 'dark' ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white/70'
              }`}>
                <div className="mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--accent-red-strong)]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{item.title}</span>
                </div>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid gap-6 items-stretch ${
          filteredPlans.length === 1 
            ? 'max-w-md mx-auto md:grid-cols-1' 
            : filteredPlans.length === 2 
            ? 'max-w-4xl mx-auto md:grid-cols-2' 
            : filteredPlans.length === 3 
            ? 'md:grid-cols-3' 
            : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredPlans.map((plan) => {
            const isPopular = plan.popular;
            const membershipLabel = plan.deliveryType === 'mobile-first'
              ? ('Mobile starter')
              : plan.deliveryType === 'self-paced'
              ? ('Self-paced access')
              : plan.deliveryType === 'virtual-live'
              ? ('Live cohort access')
              : plan.deliveryType === 'keynote'
              ? ('Events and leadership')
              : ('Teams and organizations');
            return (
              <div
                key={plan.id}
                className={`group relative min-w-0 overflow-hidden rounded-2xl sm:rounded-[2rem] border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isPopular 
                    ? theme === 'dark'
                      ? 'bg-[#111111] border-[var(--accent-red)]/60 shadow-[0_26px_80px_rgba(255,59,48,0.16)] lg:-translate-y-1'
                      : 'bg-white border-[var(--accent-red)]/40 shadow-[0_22px_60px_rgba(255,59,48,0.12)] lg:-translate-y-1'
                    : theme === 'dark'
                    ? 'bg-[#111111] border-white/10 hover:border-white/20'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.10),transparent_35%)]" />
                <div className="relative z-10 space-y-5">
                  {plan.badge && (
                    <div className="inline-flex items-center rounded-full bg-[var(--accent-red)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white shadow-[0_10px_25px_rgba(255,59,48,0.3)]">
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className={`inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                      theme === 'dark' ? 'border-white/10 bg-white/5 text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                    }`}>
                      {getChannelIcon(plan.deliveryType)}
                      <span className="min-w-0 break-words">{plan.deliveryChannel}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className={`text-[10px] font-bold uppercase tracking-[0.16em] ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      {membershipLabel}
                    </div>
                    <h3 className={`text-xl font-black tracking-[-0.05em] ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{plan.name}</h3>
                    <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>{plan.tagline}</p>
                  </div>

                  <div className={`pb-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-neutral-200'}`}>
                    <div className={`text-3xl font-black tracking-[-0.06em] ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
                      {formatPrice(plan)}
                    </div>
                    <div className={`mt-1 text-[10px] font-bold uppercase tracking-[0.18em] ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      {plan.billingPeriod}
                    </div>

                    {plan.bandwidthRequirement && (
                      <div className={`mt-2 flex min-w-0 items-start gap-1.5 text-[10px] font-semibold ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                      }`}>
                        <Wifi className="w-3 h-3 text-[var(--accent-red-strong)]" />
                        <span className="min-w-0 break-words">Bandwidth: {plan.bandwidthRequirement}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>
                      Included in this Delivery Option:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className={`flex items-start gap-2 text-sm ${
                        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2">
                        {plan.notIncluded.map((notFeat, nIdx) => (
                          <div key={nIdx} className="flex items-start gap-2 text-sm text-neutral-400 line-through">
                            <X className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{notFeat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`relative z-10 pt-6 mt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-neutral-200'}`}>
                  <button
                    onClick={() => openBookingModal({ 
                      program: `Plan: ${plan.name} (${formatPrice(plan)})`,
                      format: plan.deliveryChannel
                    })}
                    className={`w-full py-3.5 px-4 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white shadow-[0_14px_30px_rgba(255,59,48,0.35)]'
                        : theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 transition-colors duration-200 text-neutral-200 border border-white/10'
                        : 'bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 text-neutral-800 border border-neutral-200'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

