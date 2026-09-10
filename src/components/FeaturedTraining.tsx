import React, { useState } from 'react';
import { featuredTrainingData } from '../data/training';
import { TrainingProgram } from '../types';
import { useApp } from '../context/AppContext';
import { useDeviceType } from '../hooks/useWindowSize';
import {
  Users,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Shield,
  Laptop
} from 'lucide-react';

interface FeaturedTrainingProps {
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
  openTrainingDetailModal: (training: TrainingProgram) => void;
}

export const FeaturedTraining: React.FC<FeaturedTrainingProps> = ({
  openBookingModal,
  openTrainingDetailModal
}) => {
  const { theme, t } = useApp();
  const { isMobile } = useDeviceType();
  const [filter, setFilter] = useState<'ALL' | 'AI' | 'CYBER' | 'DIGITAL' | 'WEB' | 'DESIGN'>('ALL');
  const uniqueTrainingData = Array.from(
    new Map(featuredTrainingData.map((item) => [item.id, item])).values()
  );

  const filteredTrainings = uniqueTrainingData.filter((item) => {
    if (filter === 'AI') return item.category === 'ai';
    if (filter === 'CYBER') return item.category === 'cybersecurity';
    if (filter === 'DIGITAL') return item.category === 'digital-skills';
    if (filter === 'WEB') return item.category === 'web-coding';
    if (filter === 'DESIGN') return item.category === 'design-uiux';
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai':
        return <Laptop className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />;
      case 'cybersecurity':
        return <Shield className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />;
      case 'web-coding':
        return <Laptop className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />;
      case 'design-uiux':
        return <Laptop className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />;
      default:
        return <Laptop className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />;
    }
  };

  return (
    <section 
      id="featured-training-section" 
      className={`py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#FAFAFA] text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-300' : 'bg-white border-neutral-300 text-neutral-800 shadow-sm'
            }`}>
              <span>Featured Training Tracks</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              {(
                <>START WITH A PROGRAMME <span className="text-[var(--accent-red-strong)]">BUILT FOR YOU</span></>
              )}
            </h2>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
            }`}>
              Interactive, instructor-led training tracks tailored for distinct roles, from students to corporate executives.
            </p>
          </div>

          {/* Filter Tabs — 2-col grid on mobile, 3-col on small tablet, horizontal row on desktop */}
          <div className={`grid grid-cols-2 gap-1.5 p-1.5 border rounded-2xl self-start md:self-auto sm:grid-cols-3 lg:flex lg:flex-nowrap lg:gap-1.5 ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full text-center sm:w-auto ${
                filter === 'ALL'
                  ? 'bg-[var(--accent-red-hover)] text-white shadow-sm'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              All Programs ({uniqueTrainingData.length})
            </button>
            <button
              onClick={() => setFilter('AI')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full text-center sm:w-auto ${
                filter === 'AI'
                  ? 'bg-[var(--accent-red-hover)] text-white shadow-sm'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              AI Tracks ({uniqueTrainingData.filter(t => t.category === 'ai').length})
            </button>
            <button
              onClick={() => setFilter('CYBER')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full text-center sm:w-auto ${
                filter === 'CYBER'
                  ? 'bg-[var(--accent-red-hover)] text-white shadow-sm'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              Cybersecurity ({uniqueTrainingData.filter(t => t.category === 'cybersecurity').length})
            </button>
            <button
              onClick={() => setFilter('DIGITAL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full text-center sm:w-auto ${
                filter === 'DIGITAL'
                  ? 'bg-[var(--accent-red-hover)] text-white shadow-sm'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              Digital Skills ({uniqueTrainingData.filter(t => t.category === 'digital-skills').length})
            </button>
            <button
              onClick={() => setFilter('WEB')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full text-center sm:w-auto ${
                filter === 'WEB'
                  ? 'bg-[var(--accent-red-hover)] text-white shadow-sm'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              Web & Coding ({uniqueTrainingData.filter(t => t.category === 'web-coding').length})
            </button>
            <button
              onClick={() => setFilter('DESIGN')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full text-center sm:w-auto ${
                filter === 'DESIGN'
                  ? 'bg-[var(--accent-red-hover)] text-white shadow-sm'
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              Design & UI/UX ({featuredTrainingData.filter(t => t.category === 'design-uiux').length})
            </button>
          </div>
        </div>

        {/* Training Cards Grid — 1 column on mobile, 2 on small tablet, 3 on desktop */}
        <div key={filter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-[fadeIn_0.3s_ease-out]">
          {filteredTrainings.map((course) => {
            return (
            <div
              key={course.id}
              id={`featured-card-${course.id}`}
              className={`border rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg group relative overflow-hidden ${
                theme === 'dark'
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700'
                  : 'bg-white border-neutral-300 hover:border-red-400 hover:shadow-xl'
              }`}
            >
              {course.isPopular && (
                <div className="absolute top-0 right-0 bg-[var(--accent-red-hover)] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow">
                  Most Requested
                </div>
              )}

              <div className="space-y-4">
                
                {/* Meta Header */}
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                    theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-300' : 'bg-neutral-100 border-neutral-300 text-neutral-800'
                  }`}>
                    {getCategoryIcon(course.category)}
                    <span className="uppercase">{course.category}</span>
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    theme === 'dark' ? 'text-neutral-400 bg-neutral-900' : 'text-neutral-800 bg-neutral-100'
                  }`}>
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-extrabold tracking-tight group-hover:text-[var(--accent-red-strong)] transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {course.title}
                </h3>

                {/* Description */}
                 <p className={`text-sm leading-relaxed line-clamp-3 ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                }`}>
                  {course.description}
                </p>

                {/* Meta details list */}
                <div className={`space-y-2 py-3 border-y text-xs ${
                  theme === 'dark' ? 'border-[var(--border-color)]/80' : 'border-neutral-300'
                }`}>
                  <div className="flex min-w-0 items-start gap-2">
                    <Users className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>
                      Audience:
                    </span>
                    <span className={`min-w-0 flex-1 font-semibold leading-snug line-clamp-2 ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{course.audience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                    <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>
                      Format:
                    </span>
                    <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{course.format}</span>
                  </div>
                </div>

                {/* Curriculum Highlights preview */}
                <div className="space-y-1.5">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    Core Takeaways:
                  </span>
                   <div className="grid grid-cols-1 gap-1.5">
                     {course.highlights.slice(0, isMobile ? 2 : 4).map((highlight, idx) => (
                         <div key={idx} className={`flex items-start gap-2 text-sm ${
                        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className={`mt-6 pt-4 border-t flex flex-col gap-2 sm:flex-row ${
                theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'
              }`}>
                <button
                  id={`btn-learn-more-${course.id}`}
                  onClick={() => openTrainingDetailModal(course)}
                  className={`flex-1 py-2.5 px-3 text-xs font-bold rounded-xl border transition-colors text-center ${
                    theme === 'dark'
                      ? 'text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border-[var(--border-color)]'
                      : 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 border-neutral-300'
                  }`}
                >
                  Learn More
                </button>
                <button
                  id={`btn-book-${course.id}`}
                  onClick={() => openBookingModal({ program: course.title, format: course.format })}
                  className="flex-1 py-2.5 px-3 text-xs font-extrabold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>{t.common.bookTraining}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
