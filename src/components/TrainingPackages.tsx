import React, { useState } from 'react';
import { trainingPackagesData } from '../data/training';
import { useApp } from '../context/AppContext';
import { useDeviceType } from '../hooks/useWindowSize';
import { 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface TrainingPackagesProps {
  openBookingModal: (prefill?: { program?: string; duration?: string }) => void;
}

export const TrainingPackages: React.FC<TrainingPackagesProps> = ({
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const { isMobile } = useDeviceType();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'AI', 'Cybersecurity', 'Digital Skills', 'Executive', 'Institutional'];

  const filteredPackages = trainingPackagesData.filter((pkg) => {
    if (selectedCategory === 'ALL') return true;
    return pkg.category === selectedCategory;
  });

  return (
    <section 
      id="training-packages-section" 
      className={`py-24 border-y transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]' : 'bg-neutral-50 text-neutral-900 border-neutral-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)] text-xs font-mono font-bold uppercase tracking-wider">
              <span>{t.packages.badge}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              {t.packages.title}
            </h2>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              {t.packages.subtitle}
            </p>
          </div>

          {/* Category Tabs */}
          <div className={`flex items-center gap-1.5 p-1 border rounded-2xl self-start md:self-auto overflow-x-auto max-w-full ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[var(--accent-red-hover)] text-white shadow-sm' 
                    : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
                }`}
              >
                {cat === 'ALL' ? ('ALL') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid — 1 column on mobile, 2 on small tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              id={`package-card-${pkg.id}`}
              className={`border rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-md group ${
                theme === 'dark'
                  ? 'bg-[#0B0B0B] border-neutral-800 hover:border-neutral-700'
                  : 'bg-white border-neutral-300 hover:border-red-400 hover:shadow-xl'
              }`}
            >
              <div className="space-y-4">
                
                {/* Badge & Title */}
                <div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    theme === 'dark' ? 'text-[var(--accent-red-strong)] bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)]' : 'text-[var(--accent-red-strong)] bg-red-50 border-red-200'
                  }`}>
                    {pkg.category} Track
                  </span>
                  <h3 className={`text-xl font-extrabold tracking-tight mt-2 group-hover:text-[var(--accent-red-strong)] transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {pkg.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    {pkg.tagline}
                  </p>
                </div>

                {/* Duration & Format Tags */}
                <div className={`space-y-2 py-3 border-y text-xs ${
                  theme === 'dark' ? 'border-neutral-800/80 text-neutral-300' : 'border-neutral-100 text-neutral-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>Duration:</span>
                    <span className="font-semibold">{pkg.durations.join('  |  ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>Format:</span>
                    <span className="font-semibold">{pkg.formats.join(' / ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>Target:</span>
                    <span className="font-semibold truncate">{pkg.targetAudience}</span>
                  </div>
                </div>

                {/* Key Deliverables / Outcomes */}
                <div className="space-y-1.5 pt-1">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Key Outcomes:
                  </span>
                  {pkg.keyOutcomes.slice(0, isMobile ? 2 : 3).map((item, dIdx) => (
                    <div key={dIdx} className={`flex items-start gap-2 text-xs ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Button */}
              <div className={`pt-4 mt-4 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'}`}>
                <button
                  id={`btn-request-${pkg.id}`}
                  onClick={() => openBookingModal({ program: pkg.title, duration: pkg.durations[0] })}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-secondary)] hover:bg-[var(--accent-red-hover)] text-neutral-200 hover:text-white border-[var(--border-color)]'
                      : 'bg-neutral-50 hover:bg-[var(--accent-red-hover)] text-neutral-800 hover:text-white border-neutral-300 shadow-sm'
                  }`}
                >
                  <span>REQUEST PACKAGE DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
