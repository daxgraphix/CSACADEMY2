import React, { useState, useMemo } from 'react';
import { resourcesData } from '../data/resources';
import { ResourceItem } from '../types';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Search
} from 'lucide-react';
import { downloadResource } from '../utils/download';

interface ResourcesSectionProps {
  openResourceModal: (resource: ResourceItem) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  openResourceModal
}) => {
  const { theme, t } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const gridRef = useReveal<HTMLDivElement>();

  // Derive categories from data so every toolkit is discoverable
  const categories = useMemo(() => {
    const set = new Set(resourcesData.map((r) => r.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return resourcesData.filter((r) => {
      const matchesCat = activeCategory === 'ALL' || r.category === activeCategory;
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.keyHighlights.some((h) => h.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section 
      id="resources-section" 
      className={`py-24 border-y transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0B0B0B] text-white border-neutral-800' : 'bg-white text-neutral-900 border-neutral-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[#DC2626] text-xs font-mono font-bold uppercase tracking-wider">
              <span>{t.resources.badge}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              {t.resources.title}
            </h2>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              {t.resources.subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="relative md:self-end">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={'Search toolkits...'}
              aria-label={'Search toolkits'}
              className={`w-56 pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#DC2626] ${
                theme === 'dark' ? 'bg-[#171717] border-neutral-800 text-white placeholder-neutral-500' : 'bg-neutral-100 border-neutral-300 text-neutral-900 placeholder-neutral-500'
              }`}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className={`flex items-center gap-1.5 p-1 border rounded-2xl overflow-x-auto max-w-full mb-8 ${
          theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-100 border-neutral-300'
        }`}>
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = cat === 'ALL' ? resourcesData.length : resourcesData.filter((r) => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-[#B91C1C] text-white shadow-sm' 
                    : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
                }`}
              >
                {cat === 'ALL' ? ('ALL') : cat}
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : theme === 'dark' ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-200 text-neutral-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
          {filteredResources.map((resource) => {
            const title = resource.title;
            const description = resource.description;
            const keyHighlights = resource.keyHighlights;
            const useCases = resource.useCases;
            return (
            <div
              key={resource.id}
              id={`resource-card-${resource.id}`}
              className={`border rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm group ${
                theme === 'dark'
                  ? 'bg-[#121212] border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    theme === 'dark' ? 'text-[#DC2626] bg-red-950/60 border-red-900/40' : 'text-[#DC2626] bg-red-50 border-red-200'
                  }`}>
                    {resource.format}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    <Clock className="w-3 h-3" />
                    {resource.readingTime}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    resource.level === 'Beginner'
                      ? theme === 'dark' ? 'text-emerald-400 bg-emerald-950/40 border-emerald-900/40' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                      : resource.level === 'Intermediate'
                      ? theme === 'dark' ? 'text-amber-400 bg-amber-950/40 border-amber-900/40' : 'text-amber-700 bg-amber-50 border-amber-200'
                      : theme === 'dark' ? 'text-red-400 bg-red-950/40 border-red-900/40' : 'text-red-700 bg-red-50 border-red-200'
                  }`}>
                    {resource.level}
                  </span>
                  <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                    {useCases.length} use cases
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className={`text-base font-bold tracking-tight group-hover:text-[#DC2626] transition-colors leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {title}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    {description}
                  </p>
                </div>

                {/* Key Takeaways Preview */}
                <div className="space-y-1 pt-2">
                  {keyHighlights.slice(0, 2).map((takeaway, tIdx) => (
                    <div key={tIdx} className={`flex items-start gap-1.5 text-[11px] ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                    }`}>
                      <CheckCircle2 className="w-3 h-3 text-[#DC2626] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className={`pt-4 mt-4 border-t flex items-center gap-2 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'
              }`}>
                <button
                  onClick={() => openResourceModal(resource)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    theme === 'dark'
                      ? 'bg-[#171717] hover:bg-[#B91C1C] text-neutral-200 hover:text-white border border-neutral-800'
                      : 'bg-white hover:bg-[#B91C1C] text-neutral-800 hover:text-white border border-neutral-300 shadow-sm'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => downloadResource(resource)}
                  title={'Download toolkit'}
                  aria-label={`Download ${title}`}
                  className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className={`text-center py-12 rounded-2xl border text-xs ${theme === 'dark' ? 'bg-[#171717] border-neutral-800 text-neutral-400' : 'bg-white border-neutral-300 text-neutral-800'}`}>
            No toolkits match your search.
          </div>
        )}

      </div>
    </section>
  );
};
