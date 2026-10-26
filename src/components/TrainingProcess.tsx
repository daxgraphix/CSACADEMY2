import React from 'react';
import { trainingProcessSteps } from '../data/organizationIndustries';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  PenTool, 
  Send, 
  RefreshCw, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';

export const TrainingProcess: React.FC = () => {
  const { theme, t } = useApp();

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Search className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 1:
        return <PenTool className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 2:
        return <Send className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 3:
        return <RefreshCw className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 4:
        return <BarChart3 className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      default:
        return <Search className="w-5 h-5 text-[var(--accent-red-strong)]" />;
    }
  };

  return (
    <section 
      id="training-process-section" 
      className={`py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-300' : 'bg-white border-neutral-300 text-neutral-800 shadow-sm'
          }`}>
            <span>{t.process.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.process.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            {t.process.subtitle}
          </p>
        </div>

        {/* 5-Step Process Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {trainingProcessSteps.map((step, idx) => (
            <div
              key={idx}
              className={`border rounded-3xl p-6 flex flex-col justify-between relative group transition-all duration-200 shadow-lg ${
                theme === 'dark' 
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700' 
                  : 'bg-white border-neutral-300 hover:border-red-400 hover:shadow-xl'
              }`}
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-red-50 border-red-100'
                }`}>
                  {getStepIcon(idx)}
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  theme === 'dark' ? 'text-[var(--accent-red-strong)] bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)]' : 'text-[var(--accent-red-strong)] bg-red-50 border-red-200'
                }`}>
                  Step {step.step}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <div className={`text-xs font-mono font-bold uppercase ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                }`}>
                  {step.name}
                </div>
                <h3 className={`text-base font-extrabold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                }`}>
                  {step.description}
                </p>
              </div>

              {/* Connector line for large screens */}
              {idx < trainingProcessSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    theme === 'dark' ? 'bg-[var(--bg-primary)] border-neutral-700' : 'bg-white border-neutral-300 shadow-sm'
                  }`}>
                    <ArrowRight className="w-3 h-3 text-[var(--accent-red-strong)]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
