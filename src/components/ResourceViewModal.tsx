import React, { useState, useEffect } from 'react';
import { ResourceItem } from '../types';
import {
  X,
  Download,
  CheckCircle2,
  Clock,
  FileText,
} from 'lucide-react';
import { downloadResource } from '../utils/download';
import { useApp } from '../context/AppContext';

interface ResourceViewModalProps {
  resource: ResourceItem | null;
  onClose: () => void;
}

export const ResourceViewModal: React.FC<ResourceViewModalProps> = ({
  resource,
  onClose
}) => {
  const { t } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!resource) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [resource, onClose]);

  if (!resource) return null;

  const title = resource.title;
  const description = resource.description;
  const audience = resource.targetAudience;
  const keyHighlights = resource.keyHighlights;
  const useCases = resource.useCases;

  const labels = {
        category: 'Category',
        level: 'Level',
        readingTime: 'Reading Time',
        useCases: 'use cases',
        target: 'Target',
        waysTitle: 'Ways to Use This Toolkit',
        highlightsTitle: 'Core Framework Highlights',
        previewTitle: 'Interactive Preview & Template Extracts',
        footerNote: 'Free Open Educational Resource by CS Academy',
        cta: 'Downloaded Resource!',
        ctaIdle: 'Download Guide / Checklist',
        levelMap: { Beginner: 'Beginner', Intermediate: 'Intermediate', Advanced: 'Advanced' } as Record<string, string>
      };

  const handleDownload = () => {
    downloadResource(resource);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-[#171717] border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#171717]/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-neutral-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#DC2626]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                {resource.format}
              </span>
              <h3 id="resource-modal-title" className="text-lg font-extrabold text-white">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={'Close'}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">

          <p className="text-sm text-neutral-300 leading-relaxed">
            {description}
          </p>

          <div className="p-4 rounded-xl bg-[#0B0B0B] border border-neutral-800 text-xs space-y-2">
            <div className="flex items-center justify-between gap-2 text-neutral-400">
              <span>{labels.category}: <strong className="text-white">{resource.category}</strong></span>
              <span className="shrink-0">{labels.level}: <strong className="text-white">{labels.levelMap[resource.level] || resource.level}</strong></span>
            </div>
            <div className="flex items-center justify-between gap-2 text-neutral-400">
              <span>{labels.readingTime}: <strong className="text-white">{resource.readingTime}</strong></span>
              <span className="shrink-0">{useCases.length} {labels.useCases}</span>
            </div>
            <div className="text-neutral-400">
              {labels.target}: <strong className="text-neutral-200">{audience}</strong>
            </div>
          </div>

          {/* Ways to Use This Toolkit */}
          {useCases.length > 0 && (
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {labels.waysTitle}
              </h5>
              <div className="space-y-2">
                {useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {keyHighlights.length > 0 && (
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {labels.highlightsTitle}
              </h5>
              <div className="space-y-2">
                {keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview Snippet */}
          {resource.previewContent && resource.previewContent.length > 0 && (
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {labels.previewTitle}
              </h5>
              <div className="space-y-2 p-4 rounded-xl bg-[#0B0B0B] border border-neutral-800/90 font-mono text-xs text-neutral-300">
                {resource.previewContent.map((snippet, i) => (
                  <p key={i} className="leading-relaxed text-[11px] text-neutral-300 border-l-2 border-[#DC2626] pl-3 py-1 bg-neutral-900/40 rounded-r">
                    {snippet}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Footer Download Action */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-400">
              {labels.footerNote}
            </span>
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-xs text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? labels.cta : labels.ctaIdle}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
