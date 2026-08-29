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
  Wifi
} from 'lucide-react';

interface LearningFormatsPageProps {
  openBookingModal: (prefill?: { format?: string; program?: string }) => void;
}

export const LearningFormatsPage: React.FC<LearningFormatsPageProps> = ({
  openBookingModal
}) => {
  const { theme, currency, setCurrency } = useApp();

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
        return <Video className="w-6 h-6 text-[#DC2626]" />;
      case 'MonitorPlay':
        return <MonitorPlay className="w-6 h-6 text-[#DC2626]" />;
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#DC2626]" />;
      case 'Mic':
        return <Mic className="w-6 h-6 text-[#DC2626]" />;
      case 'Calendar':
        return <Calendar className="w-6 h-6 text-[#DC2626]" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-[#DC2626]" />;
      default:
        return <Video className="w-6 h-6 text-[#DC2626]" />;
    }
  };

  return (
    <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0B0B0B] text-white' : 'bg-white text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[#DC2626] text-xs font-mono font-bold uppercase tracking-wider">
            <span>Flexible Multi-Channel Delivery</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            LEARN ANYWHERE. <span className="text-[#DC2626]">CONNECT YOUR WAY.</span>
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Choose the instructional delivery channel that best aligns with your team\'s geography, bandwidth, and learning style. Pricing is transparently structured per delivery channel.
          </p>

          {/* Currency Toggle */}
          <div className="pt-2 inline-flex items-center p-1 rounded-2xl border transition-colors shadow-sm">
            {(['TSH', 'KES', 'USD'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                  currency === curr 
                    ? 'bg-[#B91C1C] text-white shadow-md' 
                    : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
                }`}
              >
                {curr === 'TSH' ? 'TZS (Tsh)' : curr === 'KES' ? 'KES (KSh)' : 'USD ($)'}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Formats In-Depth Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningFormatsData.map((format) => (
            <div
              key={format.id}
              className={`border rounded-3xl p-8 flex flex-col justify-between shadow-lg space-y-6 group transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-[#171717] border-neutral-800 hover:border-neutral-700' 
                  : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-xl'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center group-hover:scale-105 transition-transform ${
                    theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800' : 'bg-white border-neutral-300 shadow-sm'
                  }`}>
                    {getFormatIcon(format.icon)}
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${
                    theme === 'dark' ? 'bg-[#0B0B0B] text-neutral-400 border-neutral-800' : 'bg-white text-neutral-700 border-neutral-300'
                  }`}>
                    {format.bestFor}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{format.title}</h3>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>{format.description}</p>
                </div>

                {/* Specs Box */}
                <div className={`p-4 rounded-2xl border space-y-2 text-xs font-mono ${
                  theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800 text-neutral-300' : 'bg-white border-neutral-300 text-neutral-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>Bandwidth:</span>
                    <span className="font-bold flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5 text-[#DC2626]" />
                      {format.bandwidthLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>Channel:</span>
                    <span className="font-bold">{format.channelName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>Pricing:</span>
                    <span className="font-bold text-emerald-500">{format.pricingLabel}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2 pt-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Key Capabilities:
                  </span>
                  {format.features.map((feat, fIdx) => (
                    <div key={fIdx} className={`flex items-start gap-2 text-xs ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className={`pt-6 border-t space-y-4 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'
              }`}>
                <div>
                  <div className={`text-[10px] font-mono uppercase ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    Starting Tuition / Fee:
                  </div>
                  <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {getFormatPrice(format)}
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal({
                    format: format.title,
                    program: `Delivery Track: ${format.title}`
                  })}
                  className="w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <span>SELECT THIS DELIVERY TRACK</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
