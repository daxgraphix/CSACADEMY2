import React, { useState } from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
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
  const { theme } = useApp();
  const [downloaded, setDownloaded] = useState(false);
  useModalAccessibility(!!resource, onClose);

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
        cta: 'Downloaded!',
        ctaIdle: 'Download Guide (PDF)',
        levelMap: { Beginner: 'Beginner', Intermediate: 'Intermediate', Advanced: 'Advanced' } as Record<string, string>
      };

  const handleDownload = () => {
    downloadResource(resource);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
        theme === 'dark' ? 'glass-surface' : 'bg-black/40'
      } animate-in fade-in duration-200`}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      aria-labelledby="resource-modal-title"
      onClick={onClose}
    >
      <div
        className={`responsive-modal-viewport border rounded-3xl w-full max-w-2xl overflow-y-auto shadow-2xl relative ${
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
          <div className="flex items-center gap-3">
            <div className={`border flex items-center justify-center w-10 h-10 rounded-xl ${
              theme === 'dark' ? 'bg-neutral-900 border-[var(--border-color)] text-[var(--accent-red-strong)]' : 'bg-neutral-100 border-neutral-300 text-[var(--accent-red-strong)]'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                theme === 'dark' ? 'bg-neutral-900 border border-[var(--border-color)] text-neutral-400' : 'bg-neutral-100 border border-neutral-300 text-neutral-600'
              }`}>
                {resource.format}
              </span>
              <h3 id="resource-modal-title" className={`text-lg font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={'Close'}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' 
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">

          <p className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            {description}
          </p>

          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className={`flex items-center justify-between gap-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <span>{labels.category}: <strong className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>{resource.category}</strong></span>
              <span className="shrink-0">{labels.level}: <strong className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>{labels.levelMap[resource.level] || resource.level}</strong></span>
            </div>
            <div className={`flex items-center justify-between gap-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <span>{labels.readingTime}: <strong className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>{resource.readingTime}</strong></span>
              <span className="shrink-0">{useCases.length} {labels.useCases}</span>
            </div>
            <div className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
              {labels.target}: <strong className={theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}>{audience}</strong>
            </div>
          </div>

          {/* Ways to Use This Toolkit */}
          {useCases.length > 0 && (
            <div className="space-y-3">
              <h5 className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {labels.waysTitle}
              </h5>
              <div className="space-y-2">
                {useCases.map((useCase, idx) => (
                  <div key={idx} className={`flex items-start gap-2 text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {keyHighlights.length > 0 && (
            <div className="space-y-3">
              <h5 className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {labels.highlightsTitle}
              </h5>
              <div className="space-y-2">
                {keyHighlights.map((highlight, idx) => (
                  <div key={idx} className={`flex items-start gap-2 text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview Snippet */}
          {resource.previewContent && resource.previewContent.length > 0 && (
            <div className="space-y-3">
              <h5 className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {labels.previewTitle}
              </h5>
              <div className={`space-y-2 p-4 rounded-xl border font-mono text-xs ${
                theme === 'dark' 
                  ? 'bg-[var(--bg-primary)] border-[var(--border-color)]/90 text-neutral-300' 
                  : 'bg-neutral-50 border-neutral-300 text-neutral-700'
              }`}>
                {resource.previewContent.map((snippet, i) => (
                  <p key={i} className={`leading-relaxed text-[11px] border-l-2 pl-3 py-1 rounded-r ${
                    theme === 'dark' 
                      ? 'text-neutral-300 border-[var(--accent-red)] bg-neutral-900/40' 
                      : 'text-neutral-700 border-[var(--accent-red)] bg-white'
                  }`}>
                    {snippet}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Footer Download Action */}
          <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'
          }`}>
            <span className={`text-xs ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {labels.footerNote}
            </span>
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{labels.cta}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{labels.ctaIdle}</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
