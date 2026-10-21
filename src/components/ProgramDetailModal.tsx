import React from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import { ProgramPillar } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  BookOpen,
  Layers
} from 'lucide-react';

interface ProgramDetailModalProps {
  program: ProgramPillar | null;
  onClose: () => void;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  openBookingModal
}) => {
  const { theme } = useApp();
  useModalAccessibility(!!program, onClose);
  
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-surface animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-label={program?.title} tabIndex={-1}>
      <div 
        className={`responsive-modal-viewport border rounded-3xl w-full max-w-3xl overflow-y-auto shadow-2xl relative ${
          theme === 'dark' 
            ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-white' 
            : 'bg-white border-neutral-300 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 backdrop-blur-md px-6 sm:px-8 py-5 flex items-center justify-between z-10 border-b ${
          theme === 'dark' 
            ? 'bg-[var(--bg-secondary)]/95 border-[var(--border-color)]' 
            : 'bg-white/95 border-neutral-300'
        }`}>
          <div className="flex min-w-0 items-center gap-3">
            <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded uppercase ${
              theme === 'dark' 
                ? 'bg-red-950/80 border border-red-800/80 text-[var(--accent-red-strong)]' 
                : 'bg-red-100 border border-red-300 text-red-700'
            }`}>
              {program.badge}
            </span>
            <h3 className={`min-w-0 break-words text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>{program.title}</h3>
          </div>
          <button
            onClick={onClose}
            className={`shrink-0 p-2 rounded-xl transition-colors ${
              theme === 'dark' 
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          
          {/* Tagline & Overview */}
          <div className="space-y-2">
            <h4 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{program.tagline}</h4>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {program.extendedDescription}
            </p>
          </div>

          {/* Target Audience */}
          <div className="space-y-3">
            <h5 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <Users className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>Who This Program Is For</span>
            </h5>
            <div className="flex flex-wrap gap-2">
              {program.audience.map((aud, i) => (
                <span key={i} className={`text-xs px-3 py-1 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-200' 
                    : 'bg-neutral-50 border-neutral-300 text-neutral-700'
                }`}>
                  {aud}
                </span>
              ))}
            </div>
          </div>

          {/* Syllabus Modules */}
          <div className="space-y-4">
            <h5 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <BookOpen className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>Structured Curriculum & Practical Skills</span>
            </h5>
            <div className="space-y-3">
              {program.modules.map((mod, idx) => (
                <div key={idx} className={`p-4 rounded-xl border space-y-2 ${
                  theme === 'dark' 
                    ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{mod.title}</div>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>{mod.description}</p>
                  <div className={`flex items-start gap-1.5 text-xs font-medium pt-1 ${
                    theme === 'dark' ? 'text-[var(--accent-red-strong)]' : 'text-red-600'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Applied Skill: {mod.practicalSkill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Duration */}
          <div className={`grid sm:grid-cols-2 gap-4 p-4 rounded-2xl border text-xs ${
            theme === 'dark' 
              ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' 
              : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="space-y-1.5">
              <div className={`font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
                <span>Delivery Formats</span>
              </div>
              <ul className={`space-y-1 list-disc list-inside pl-1 ${
                theme === 'dark' ? 'text-neutral-300 marker:text-[var(--accent-red-strong)]' : 'text-neutral-700 marker:text-red-600'
              }`}>
                {program.deliveryFormats.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className={`font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`}>
                <Clock className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
                <span>Duration Options</span>
              </div>
              <ul className={`space-y-1 list-disc list-inside pl-1 ${
                theme === 'dark' ? 'text-neutral-300 marker:text-[var(--accent-red-strong)]' : 'text-neutral-700 marker:text-red-600'
              }`}>
                {program.durationOptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2.5">
            <h5 className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              Verified Learning Outcomes
            </h5>
            <div className="space-y-2">
              {program.outcomes.map((outcome, i) => (
                <div key={i} className={`flex items-start gap-2 text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'
          }`}>
            <span className={`text-xs italic ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Instruction and materials in English
            </span>
            <button
              onClick={() => {
                onClose();
                openBookingModal({ program: program.title });
              }}
              className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>BOOK THIS PROGRAM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
