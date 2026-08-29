import React, { useState } from 'react';
import { Quote, Award, Users, Star, CheckCircle2, ShieldCheck, TrendingUp, Filter } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';

export const SocialProof: React.FC = () => {
  const { theme, t } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const gridRef = useReveal<HTMLDivElement>();

  const filterOptions = [
    { id: 'all', label: 'All Reviews'},
    { id: 'web', label: 'Web & Coding'},
    { id: 'ai', label: 'AI & Vibe Coding'},
    { id: 'security', label: 'Cybersecurity'},
    { id: 'design', label: 'Design & UI/UX'},
  ];

  const filteredTestimonials = siteConfig.testimonials.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'web') return item.courseTag?.toLowerCase().includes('web') || item.courseTag?.toLowerCase().includes('coding');
    if (selectedFilter === 'ai') return item.courseTag?.toLowerCase().includes('ai') || item.courseTag?.toLowerCase().includes('vibe');
    if (selectedFilter === 'security') return item.courseTag?.toLowerCase().includes('cyber') || item.courseTag?.toLowerCase().includes('security');
    if (selectedFilter === 'design') return item.courseTag?.toLowerCase().includes('design') || item.courseTag?.toLowerCase().includes('figma');
    return true;
  });

  return (
    <section 
      id="social-proof-section" 
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0B0B0B] text-white' : 'bg-[#FAFAFA] text-neutral-900'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.1),transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'bg-[#171717] border-neutral-800 text-neutral-300' : 'bg-white border-neutral-300 text-neutral-800 shadow-sm'
          }`}>
            <span>{t.socialProof.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.socialProof.title}
          </h2>
          <p className={`text-base leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            {t.socialProof.subtitle}
          </p>
        </div>

        {/* Quick Social Proof Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className={`p-5 rounded-3xl border text-center space-y-1 ${
            theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            <div className="flex items-center justify-center gap-1 text-amber-500 font-extrabold text-lg">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>4.9 / 5.0</span>
            </div>
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              Average Student Rating
            </p>
          </div>

          <div className={`p-5 rounded-3xl border text-center space-y-1 ${
            theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            <div className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>1,200+</div>
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              East African Learners
            </p>
          </div>

          <div className={`p-5 rounded-3xl border text-center space-y-1 ${
            theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            <div className="text-lg font-black text-[#DC2626]">Kiswahili + EN</div>
            <p className={`text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              Accessible Tech Learning
            </p>
          </div>
        </div>

        <div className={`mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
        }`}>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Project-based learning</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-[#ff3b30]" /> Verified certificates</span>
          <span className="inline-flex items-center gap-2"><Users className="h-3.5 w-3.5 text-[#ff3b30]" /> East African community</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <div className={`inline-flex items-center gap-1.5 p-1 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
                  selectedFilter === opt.id
                    ? 'bg-[#B91C1C] text-white shadow-md'
                    : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 reveal-stagger">
          {filteredTestimonials.map((item, idx) => (
            <div
              key={idx}
              className={`border rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group ${
                theme === 'dark' 
                  ? 'bg-[#171717] border-neutral-800 hover:border-neutral-700' 
                  : 'bg-white border-neutral-300 hover:border-red-400'
              }`}
            >
              <div className="space-y-4">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  {item.courseTag && (
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      theme === 'dark' ? 'bg-[#0B0B0B] text-neutral-300 border-neutral-800' : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                    }`}>
                      {item.courseTag}
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <p className={`text-xs sm:text-sm italic leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'
                }`}>
                  "{item.quote}"
                </p>

                {/* Outcome Ribbon */}
                {item.outcome && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    theme === 'dark'
                      ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                  }`}>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{item.outcome}</span>
                  </div>
                )}
              </div>

              {/* Author Footer */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between gap-3 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#B91C1C] to-neutral-800 p-0.5 shadow-md shrink-0">
                    <div className={`w-full h-full rounded-[14px] flex items-center justify-center font-bold text-xs ${
                      theme === 'dark' ? 'bg-[#0B0B0B] text-white' : 'bg-white text-neutral-900'
                    }`}>
                      {item.initials}
                    </div>
                  </div>
                  <div>
                    <div className={`text-sm font-bold flex items-center gap-1.5 ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>
                      <span>{item.name}</span>
                      {item.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" title="Verified Graduate" />
                      )}
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                      {item.role}
                    </div>
                    <div className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      {item.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
