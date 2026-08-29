import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { resourcesData } from '../data/resources';
import { ResourceItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface ResourcesPageProps {
  openResourceModal: (resource: ResourceItem) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  openResourceModal
}) => {
  const { theme } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const categories = ['ALL', 'AI Productivity', 'Cybersecurity', 'Cyber Safety', 'Education', 'AI Governance', 'Privacy', 'Business'];

  const filtered = resourcesData.filter(r => {
    const matchCat = selectedCat === 'ALL' || r.category.toLowerCase().includes(selectedCat.toLowerCase());
    const matchSearch = search === '' || 
      r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.targetAudience.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Free Resources | AI, Cybersecurity &amp; Education Toolkits — CS Academy</title>
        <meta name="description" content="Download free AI prompt templates, cybersecurity checklists, and education guides from CS Academy. Practical, Swahili-context toolkits for African digital workers, students, and organizations." />
        <meta name="keywords" content="free AI guides Tanzania, cybersecurity checklist Africa, education toolkit download, prompt templates Swahili, CS Academy free resources" />
        <meta property="og:title" content="Free Resources | CS Academy" />
        <meta property="og:description" content="Download free AI, cybersecurity, and education toolkits. No signup required. Practical guides for African digital learners." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0B0B0B] text-white' : 'bg-white text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[#DC2626] text-xs font-mono font-bold uppercase tracking-wider">
            <span>Open Educational Toolkits</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            FREE <span className="text-[#DC2626]">RESOURCES</span>
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Download practical prompt templates, cybersecurity checklists, and classroom guides designed to protect and accelerate African digital workers.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className={`flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-50 border-neutral-300 shadow-sm'
        }`}>
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'
            }`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={'Search guides, templates, topics...'}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#DC2626] border ${
                theme === 'dark'
                  ? 'bg-[#0B0B0B] border-neutral-800 text-white placeholder-neutral-500'
                  : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-sm'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCat === cat 
                    ? 'bg-[#B91C1C] text-white shadow-sm' 
                    : theme === 'dark'
                    ? 'text-neutral-400 hover:text-white bg-[#0B0B0B] border border-neutral-800'
                    : 'text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300'
                }`}
              >
                {cat === 'ALL' ? ('ALL') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((resource) => (
            <div
              key={resource.id}
              className={`border rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm group ${
                theme === 'dark'
                  ? 'bg-[#171717] border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${
                    theme === 'dark' ? 'text-[#DC2626] bg-red-950/60 border-red-900/40' : 'text-[#DC2626] bg-red-50 border-red-200'
                  }`}>
                    {resource.format}
                  </span>
                  <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    {resource.readingTime}
                  </span>
                </div>

                <div>
                  <h3 className={`text-xl font-bold tracking-tight group-hover:text-[#DC2626] transition-colors leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {resource.title}
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                  }`}>
                    {resource.description}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-1.5 ${
                  theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800' : 'bg-white border-neutral-300'
                }`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Key Highlights:
                  </div>
                  {resource.keyHighlights.map((takeaway, idx) => (
                    <div key={idx} className={`flex items-start gap-2 text-xs ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-6 mt-6 border-t flex items-center gap-3 ${
                theme === 'dark' ? 'border-neutral-800' : 'border-neutral-300'
              }`}>
                <button
                  onClick={() => openResourceModal(resource)}
                  className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-[#0B0B0B] hover:bg-[#B91C1C] text-neutral-200 hover:text-white border border-neutral-800'
                      : 'bg-white hover:bg-[#B91C1C] text-neutral-800 hover:text-white border border-neutral-300 shadow-sm'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Guide</span>
                </button>
                <button
                  onClick={() => openResourceModal(resource)}
                  className="py-3 px-4 rounded-2xl text-xs font-bold text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] flex items-center justify-center transition-colors shadow-sm"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      </div>
    </>
  );
};
