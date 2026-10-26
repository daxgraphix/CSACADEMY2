import React from 'react';
import { learningFormatsData } from '../data/learningFormats';
import { useApp } from '../context/AppContext';
import { 
  Video, 
  MonitorPlay, 
  MessageSquare, 
  Mic, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Wifi, 
  Smartphone
} from 'lucide-react';

interface LearningFormatsSectionProps {
  openBookingModal: (prefill?: { format?: string; program?: string }) => void;
}

export const LearningFormatsSection: React.FC<LearningFormatsSectionProps> = ({
  openBookingModal
}) => {
  const { theme, currency, setCurrency, t } = useApp();

  const getFormatPrice = (format: typeof learningFormatsData[0]) => {
    if (currency === 'TSH') {
      return format.priceStartingTsh === 'Custom' 
        ? ('Custom Quote') 
        : `${format.priceStartingTsh} Tsh`;
    }
    if (currency === 'KES') {
      return format.priceStartingKes === 'Custom' 
        ? ('Custom Quote') 
        : `${format.priceStartingKes} KSh`;
    }
    return format.priceStartingUsd === 'Custom' 
      ? ('Custom Quote') 
      : `$${format.priceStartingUsd}`;
  };

  const getFormatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'MonitorPlay':
        return <MonitorPlay className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      default:
        return <Video className="w-5 h-5 text-[var(--accent-red-strong)]" />;
    }
  };

  return (
    <section 
      id="learning-formats-section" 
      className={`py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-300' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
          }`}>
            <span>{t.formats.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.formats.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            {t.formats.subtitle}
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className={`inline-flex items-center p-1 border rounded-2xl ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-100 border-neutral-300'
            }`}>
              {(['TSH', 'KES', 'USD'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                    currency === curr 
                      ? 'bg-[var(--accent-red-hover)] text-white shadow-md' 
                      : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
                  }`}
                >
                  {curr === 'TSH' ? 'TZS (Tsh)' : curr === 'KES' ? 'KES (KSh)' : 'USD ($)'}
                </button>
              ))}
            </div>

            <div className={`inline-flex items-center gap-1.5 text-xs font-mono ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              <span>Payment options confirmed before enrollment</span>
            </div>
          </div>
        </div>

        {/* 6 Formats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningFormatsData.map((format) => (
            <div
              key={format.id}
              id={`format-card-${format.id}`}
              className={`border rounded-3xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg group relative ${
                theme === 'dark'
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700'
                  : 'bg-white border-neutral-300 hover:border-red-400 hover:shadow-xl'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header with Number, Icon and Bandwidth */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-105 transition-transform ${
                    theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
                  }`}>
                    {getFormatIcon(format.icon)}
                  </div>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                    theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-400' : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                  }`}>
                    Channel {format.number}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className={`text-xl font-extrabold tracking-tight group-hover:text-[var(--accent-red-strong)] transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {format.title}
                  </h3>
                  <div className={`text-[11px] font-mono flex items-center gap-1.5 mt-1 ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    <Wifi className="w-3 h-3 text-[var(--accent-red-strong)]" />
                    <span>{format.bandwidthLevel}</span>
                  </div>
                </div>

                {/* Price Box */}
                <div className={`p-4 rounded-2xl border flex items-baseline justify-between gap-2 ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]/90' : 'bg-neutral-50 border-neutral-300'
                }`}>
                  <div>
                    <span className={`text-[10px] font-mono uppercase block ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>
                      Delivery Investment
                    </span>
                    <div className={`text-xl font-black ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}>
                      {getFormatPrice(format)}
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono text-right max-w-[120px] leading-tight ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    {format.pricingLabel}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                }`}>
                  {format.description}
                </p>

                {/* Best For Pill */}
                <div className={`p-3 rounded-2xl border ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)]/60 border-[var(--border-color)]/80' : 'bg-neutral-50 border-neutral-300'
                }`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Ideal Audience:
                  </div>
                  <div className={`text-xs leading-snug ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    {format.bestFor}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-1">
                  <div className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Key Channel Features:
                  </div>
                  {format.features.map((feat, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card CTA */}
              <div className={`mt-6 pt-4 border-t ${
                theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'
              }`}>
                <button
                  id={`btn-request-format-${format.id}`}
                  onClick={() => openBookingModal({ 
                    format: format.title,
                    program: `Delivery Option: ${format.title} (${getFormatPrice(format)})`
                  })}
                  className="group w-full py-3 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200 bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white border border-transparent hover:border-transparent"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
