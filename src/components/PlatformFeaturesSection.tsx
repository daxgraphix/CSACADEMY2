import React, { useState } from 'react';
import { platformFeaturesData } from '../data/platformFeatures';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  Video,
  CheckSquare,
  Award,
  ShoppingBag,
  Radio,
  Gift,
  ArrowRight,
  CheckCircle2,
  QrCode,
  Users,
  Building2,
  Layers,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { PlatformFeature } from '../types';

interface PlatformFeaturesSectionProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const PlatformFeaturesSection: React.FC<PlatformFeaturesSectionProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();
  const [activeFeatureId, setActiveFeatureId] = useState<string>('quizzes-assessment');
  const contentRef = useReveal<HTMLDivElement>();

  const getFeatureIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Video':
        return <Video className={className} />;
      case 'CheckSquare':
        return <CheckSquare className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      case 'Radio':
        return <Radio className={className} />;
      case 'Gift':
        return <Gift className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const renderFeatureVisual = (feature: PlatformFeature) => {
    if (feature.id === 'quizzes-assessment') {
      return (
        <div className="space-y-3">
          <div className={`p-4 rounded-2xl border space-y-2 ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--accent-red-strong)]">Module 3: AI & Prompting</span>
              <span className={`font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>10/10 Score</span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>Question: Which core pillar best describes the S.M.A.R.T. framework used at CS Academy?</p>
            <div className="space-y-1 text-xs">
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>A. Structure - Solid context scaffolding (Correct)</span>
              </div>
            </div>
          </div>
          <div className={`text-[11px] text-center ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
            Instant auto-scoring with explanations
          </div>
        </div>
      );
    }

    if (feature.id === 'pdf-certificates') {
      return (
        <div className={`p-5 rounded-2xl border space-y-3 text-center ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] border-[var(--border-color)]'
            : 'bg-gradient-to-b from-neutral-50 to-white border-neutral-300 shadow-sm'
        }`}>
          <div className={`w-12 h-12 mx-auto rounded-2xl border flex items-center justify-center text-[var(--accent-red-strong)] ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-red-50 border-red-100'
          }`}>
            <QrCode className="w-7 h-7" />
          </div>
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Certificate of Completion</h4>
            <p className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>Awarded to Learner  |  CS Academy</p>
          </div>
          <div className={`p-2 rounded-xl text-[10px] font-mono border ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] text-emerald-400 border-emerald-900/40' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            VERIFIED ID: CSA-2026-8942
          </div>
        </div>
      );
    }

    if (feature.id === 'digital-shop') {
      return (
        <div className="space-y-2">
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>50+ Prompt Packs</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">FREE in Premium</span>
          </div>
          <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Web Starter UI Kit (React)</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">FREE in Premium</span>
          </div>
        </div>
      );
    }

    return (
      <div className={`p-6 rounded-2xl border text-center space-y-3 ${
        theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
      }`}>
        <div className={`w-12 h-12 mx-auto rounded-2xl border flex items-center justify-center text-[var(--accent-red-strong)] ${
          theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300'
        }`}>
          {getFeatureIcon(feature.icon)}
        </div>
        <h4 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{feature.title}</h4>
        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>{feature.shortDescription}</p>
      </div>
    );
  };

  const toggleFeature = (id: string) => {
    setActiveFeatureId((prev) => (prev === id ? '' : id));
  };

  return (
    <section 
      id="platform-features" 
      className={`py-24 border-b transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]' : 'bg-white text-neutral-900 border-neutral-300'
      }`}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 reveal">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[var(--accent-red-strong)] text-xs font-mono font-bold uppercase tracking-wider">
            <span>Platform Features</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {(
              <>EVERYTHING YOU NEED TO <span className="text-[var(--accent-red-strong)]">SUCCEED</span></>
            )}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Tap any capability below to expand and see exactly how it helps you learn, build, and grow.
          </p>
        </div>

        {/* Expandable Feature Accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {platformFeaturesData.map((feature) => {
            const isOpen = activeFeatureId === feature.id;
            return (
              <div
                key={feature.id}
                id={`feature-${feature.id}`}
                className={`border rounded-3xl overflow-hidden transition-all duration-300 shadow-sm ${
                  isOpen
                    ? theme === 'dark'
                      ? 'bg-[var(--bg-secondary)] border-[var(--accent-red-strong)] shadow-2xl ring-1 ring-[var(--accent-red)]/40'
                      : 'bg-white border-red-500 shadow-xl ring-2 ring-red-500/20'
                    : theme === 'dark'
                    ? 'bg-[#121212] border-[var(--border-color)] hover:border-neutral-700'
                    : 'bg-neutral-50 border-neutral-300 hover:border-red-400'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFeature(feature.id)}
                  aria-expanded={isOpen}
                  aria-controls={`feature-panel-${feature.id}`}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)]"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-colors ${
                      isOpen 
                        ? 'bg-[var(--accent-red)] text-white shadow-lg shadow-red-900/40' 
                        : theme === 'dark'
                        ? 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--accent-red-strong)]'
                        : 'bg-red-50 border border-red-100 text-[var(--accent-red-strong)]'
                    }`}>
                      {getFeatureIcon(feature.icon)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-base sm:text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                          {feature.title}
                        </h3>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          theme === 'dark' ? 'text-neutral-400 bg-[var(--bg-primary)] border-[var(--border-color)]' : 'text-neutral-700 bg-white border-neutral-300'
                        }`}>
                          {feature.badge}
                        </span>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                        {feature.shortDescription}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[var(--accent-red-strong)]' : theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'
                  }`} />
                </button>

                {isOpen && (
                  <div
                    id={`feature-panel-${feature.id}`}
                    role="region"
                    className={`px-5 sm:px-6 pb-6 pt-2 border-t animate-[fadeIn_0.2s_ease-out] ${
                      theme === 'dark' ? 'border-[var(--border-color)]/70' : 'border-neutral-300'
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {feature.fullDescription}
                    </p>

                    {feature.note && (
                      <p className={`mt-3 text-xs italic ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        {feature.note}
                      </p>
                    )}

                    <div className="grid sm:grid-cols-2 gap-3 pt-4">
                      {feature.points.map((point, idx) => (
                        <div key={idx} className={`flex items-start gap-2.5 p-3 rounded-2xl border ${
                          theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
                        }`}>
                          <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                          <span className={`text-xs leading-snug ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className={`mt-5 rounded-2xl border p-5 ${theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'}`}>
                      {renderFeatureVisual(feature)}
                    </div>

                    <div className="pt-5">
                      <button
                        onClick={() => openBookingModal({ program: `Enroll via ${feature.title}` })}
                        className="px-7 py-3.5 rounded-2xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <span>{`Get Started with ${feature.title}`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
