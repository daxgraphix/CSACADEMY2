import React from 'react';
import { ProgramPillar } from '../types';
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
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#171717] border border-neutral-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#171717]/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-neutral-800 flex items-center justify-between z-10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-red-950/80 border border-red-800/80 text-[#DC2626] uppercase">
              {program.badge}
            </span>
            <h3 className="min-w-0 break-words text-xl font-extrabold text-white">{program.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Tagline & Overview */}
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">{program.tagline}</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {program.extendedDescription}
            </p>
          </div>

          {/* Target Audience */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#DC2626]" />
              <span>Who This Program Is For</span>
            </h5>
            <div className="flex flex-wrap gap-2">
              {program.audience.map((aud, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-lg bg-[#0B0B0B] border border-neutral-800 text-neutral-200">
                  {aud}
                </span>
              ))}
            </div>
          </div>

          {/* Syllabus Modules */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#DC2626]" />
              <span>Structured Curriculum & Practical Skills</span>
            </h5>
            <div className="space-y-3">
              {program.modules.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0B0B0B] border border-neutral-800 space-y-2">
                  <div className="text-sm font-bold text-white">{mod.title}</div>
                  <p className="text-xs text-neutral-300 leading-relaxed">{mod.description}</p>
                  <div className="flex items-start gap-1.5 text-xs text-[#DC2626] font-medium pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Applied Skill: {mod.practicalSkill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Duration */}
          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0B0B0B] border border-neutral-800 text-xs">
            <div className="space-y-1.5">
              <div className="font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Delivery Formats</span>
              </div>
              <ul className="space-y-1 text-neutral-300 list-disc list-inside pl-1 marker:text-[#DC2626]">
                {program.deliveryFormats.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Duration Options</span>
              </div>
              <ul className="space-y-1 text-neutral-300 list-disc list-inside pl-1 marker:text-[#DC2626]">
                {program.durationOptions.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Verified Learning Outcomes
            </h5>
            <div className="space-y-2">
              {program.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-400 italic">
              Taught in English & Kiswahili
            </span>
            <button
              onClick={() => {
                onClose();
                openBookingModal({ program: program.title });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-xs text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
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
