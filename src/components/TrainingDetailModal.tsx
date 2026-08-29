import React from 'react';
import { TrainingProgram } from '../types';
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
  if (!training) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#171717] border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#171717]/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-neutral-800 flex items-center justify-between z-10">
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/80 border border-red-800/80 text-[#DC2626] uppercase">
              {training.level} Level
            </span>
            <h3 className="break-words text-xl font-extrabold text-white mt-1">{training.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <p className="text-sm text-neutral-300 leading-relaxed">
            {training.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#0B0B0B] border border-neutral-800 text-xs">
            <div className="flex min-w-0 flex-wrap items-start gap-2">
              <Users className="w-4 h-4 text-[#DC2626]" />
              <span className="text-neutral-400">Audience:</span>
              <span className="min-w-0 break-words font-semibold text-neutral-200">{training.audience}</span>
            </div>
            <div className="flex min-w-0 flex-wrap items-start gap-2">
              <MapPin className="w-4 h-4 text-[#DC2626]" />
              <span className="text-neutral-400">Format:</span>
              <span className="min-w-0 break-words font-semibold text-neutral-200">{training.format}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#DC2626]" />
              <span className="text-neutral-400">Duration:</span>
              <span className="font-semibold text-neutral-200">{training.duration}</span>
            </div>
          </div>

          {/* Curriculum breakdown */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#DC2626]" />
              <span>Curriculum Highlights</span>
            </h5>
            <div className="space-y-2">
              {training.curriculum.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200 p-2.5 rounded-lg bg-[#0B0B0B] border border-neutral-800">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Advantages */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Why Teams Choose This Track
            </h5>
            <div className="grid sm:grid-cols-2 gap-2">
              {training.highlights.map((h, i) => (
                <div key={i} className="text-xs text-neutral-300 p-2 rounded bg-neutral-900 border border-neutral-800">
                  “ {h}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-400 italic">Available in English & Kiswahili</span>
            <button
              onClick={() => {
                onClose();
                openBookingModal({ program: training.title, format: training.format });
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-extrabold text-xs text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
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
