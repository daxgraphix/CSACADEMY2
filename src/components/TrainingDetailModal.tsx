import React from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import { TrainingProgram } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface TrainingDetailModalProps {
  training: TrainingProgram | null;
  onClose: () => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const TrainingDetailModal: React.FC<TrainingDetailModalProps> = ({
  training,
  onClose,
  openBookingModal
}) => {
  const { theme } = useApp();
  useModalAccessibility(!!training, onClose);
  if (!training) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'glass-surface' : 'bg-black/40'
    } animate-in fade-in duration-200`}
      role="dialog" aria-modal="true" aria-label={training.title} tabIndex={-1}
    >
      <div className={`border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] text-white' : 'bg-white text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 px-6 sm:px-8 py-5 border-b flex items-center justify-between z-10 ${
          theme === 'dark' 
            ? 'bg-[var(--bg-secondary)]/95 backdrop-blur-md border-[var(--border-color)]' 
            : 'bg-white/95 backdrop-blur-md border-neutral-200'
        }`}>
          <div className="min-w-0">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)] uppercase`}>
              {training.level} Level
            </span>
            <h3 className={`break-words text-xl font-extrabold mt-1 ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>{training.title}</h3>
          </div>
          <button
            onClick={onClose}
            className={`shrink-0 p-2 rounded-xl transition-colors ${
              theme === 'dark' 
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
          
          <p className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            {training.description}
          </p>

          <div className={`grid sm:grid-cols-2 gap-3 p-4 rounded-xl border text-xs ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className="flex min-w-0 flex-wrap items-start gap-2">
              <Users className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>Audience:</span>
              <span className={`min-w-0 break-words font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{training.audience}</span>
            </div>
            <div className="flex min-w-0 flex-wrap items-start gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>Format:</span>
              <span className={`min-w-0 break-words font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{training.format}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>Duration:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{training.duration}</span>
            </div>
          </div>

          {/* Curriculum breakdown */}
          <div className="space-y-3">
            <h5 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <BookOpen className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>Curriculum Highlights</span>
            </h5>
            <div className="space-y-2">
              {training.curriculum.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-2 text-xs sm:text-sm p-2.5 rounded-lg border ${
                  theme === 'dark' 
                    ? 'text-neutral-200 bg-[var(--bg-primary)] border-[var(--border-color)]' 
                    : 'text-neutral-800 bg-white border-neutral-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-2">
            <h5 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>Why Teams Choose This Track</span>
            </h5>
            <div className="grid sm:grid-cols-2 gap-2">
              {training.highlights.map((h, i) => (
                <div key={i} className={`text-xs p-2.5 rounded-lg border flex items-start gap-2 ${
                  theme === 'dark' 
                    ? 'text-neutral-300 bg-[var(--bg-primary)] border-[var(--border-color)]' 
                    : 'text-neutral-700 bg-neutral-50 border-neutral-300'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                  <span className="break-words">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'
          }`}>
            <span className={`text-xs italic ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>Available in English & local languages</span>
            <button
              onClick={() => {
                onClose();
                openBookingModal({ program: training.title, format: training.format });
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>BOOK THIS COURSE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
