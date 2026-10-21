import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { resourcesData } from '../data/resources';
import { ResourceItem } from '../types';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { siteConfig } from '../config/site';
import { EmptyState } from '../components/EmptyState';
import {
  FileText,
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

const categoryTone = (category: string, isDark: boolean) => {
  const normalized = category.toLowerCase();
  if (normalized.includes('ai')) return isDark ? 'border-violet-400/20 bg-violet-400/10 text-violet-200' : 'border-violet-200 bg-violet-50 text-violet-900';
  if (normalized.includes('cyber')) return isDark ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-900';
  if (normalized.includes('education')) return isDark ? 'border-amber-400/20 bg-amber-400/10 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-900';
  if (normalized.includes('privacy')) return isDark ? 'border-sky-400/20 bg-sky-400/10 text-sky-200' : 'border-sky-200 bg-sky-50 text-sky-900';
  return isDark ? 'border-rose-400/20 bg-rose-400/10 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-900';
};

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  openResourceModal
}) => {
  const { theme } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const categories = ['ALL', ...new Set(resourcesData.map((resource) => resource.category))];

  const filtered = resourcesData.filter(r => {
    const matchCat = selectedCat === 'ALL' || r.category.toLowerCase().includes(selectedCat.toLowerCase());
    const matchSearch = search === '' || 
      r.title.toLowerCase().includes(search.toLowerCase()) || 
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.targetAudience.toLowerCase().includes(search.toLowerCase()) ||
      r.keyHighlights.some((highlight) => highlight.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>Free Resources | AI, Cybersecurity &amp; Education Toolkits | CS Academy</title>
        <meta name="description" content="Download free AI prompt templates, cybersecurity checklists, and education guides from CS Academy. Practical, locally contextualized toolkits for African digital workers, students, and organizations." />
        <meta name="keywords" content="free AI guides Tanzania, cybersecurity checklist Africa, education toolkit download, prompt templates, CS Academy free resources" />
        <meta property="og:title" content="Free Resources | CS Academy" />
        <meta property="og:description" content="Download free AI, cybersecurity, and education toolkits. No signup required. Practical guides for African digital learners." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <main className={`min-h-screen bg-[var(--bg-primary)] px-4 pb-16 pt-28 transition-colors duration-300 sm:pb-20 ${
      theme === 'dark' ? 'text-white' : 'text-neutral-900'
    }`}>
      <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 pt-2 text-center">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${theme === 'dark' ? 'border-red-900/50 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-800'}`}>
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /><span>CS Academy resource library · {resourcesData.length} guides</span>
          </div>
          <h1 className={`text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            Learn something useful. <span className="text-[var(--accent-red-strong)]">Put it to work.</span>
          </h1>
          <p className={`mx-auto max-w-2xl text-sm leading-relaxed sm:text-base ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Practical guides, checklists, and templates for AI, cybersecurity, privacy, education, and everyday digital work.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className={`space-y-3 rounded-2xl border p-3 sm:p-4 ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300 shadow-sm'
        }`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:flex-1">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'
            }`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={'Search guides, templates, topics...'}
                  className={`w-full min-h-11 pl-10 pr-4 py-2.5 rounded-xl text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] border ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-white placeholder-neutral-500'
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-sm'
                  }`}
            />
          </div>

          <div className="flex w-full gap-2 overflow-x-auto pb-1 sm:w-auto sm:max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCat === cat}
                onClick={() => setSelectedCat(cat)}
                className={`min-h-10 shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold whitespace-nowrap transition-all ${
                  selectedCat === cat 
                    ? 'bg-[var(--accent-red-hover)] text-white shadow-sm' 
                    : theme === 'dark'
                    ? 'text-neutral-400 hover:text-white bg-[var(--bg-primary)] border border-[var(--border-color)]'
                    : 'text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300'
                }`}
              >
                {cat === 'ALL' ? 'All topics' : cat}
              </button>
            ))}
          </div>
          </div>
          <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`} aria-live="polite">Showing {filtered.length} of {resourcesData.length} guides</p>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.length === 0 ? (
            <EmptyState
              hasActiveSearch={search.trim() !== ''}
              hasActiveFilter={selectedCat !== 'ALL'}
              searchQuery={search}
              onClearSearch={() => setSearch('')}
              onClearFilter={() => setSelectedCat('ALL')}
              onClearAll={() => { setSearch(''); setSelectedCat('ALL'); }}
              onRequestTopic={() => {
                const text = encodeURIComponent(
                  `Hello CS Academy, I couldn't find a resource on "${search || selectedCat}". Could you add one?`
                );
                window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank');
              }}
              suggestions={['AI prompts', 'Phishing', 'M-Pesa safety', 'Student guides']}
              onSuggestionClick={(term) => setSearch(term)}
              title="No resources match your filters"
              description="Try another keyword or category, or tell us what guide would help you."
            />
          ) : (
            filtered.map((resource) => (
            <article
              key={resource.id}
              className={`group flex min-w-0 flex-col justify-between rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${categoryTone(resource.category, theme === 'dark')}`}>
                    {resource.category}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    <Clock className="h-3 w-3" aria-hidden="true" />{resource.readingTime}
                  </span>
                </div>

                <div>
                    <h3 className={`text-lg font-extrabold tracking-tight group-hover:text-[var(--accent-red-strong)] transition-colors leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    <Link to={`/resources/${resource.id}`}>{resource.title}</Link>
                  </h3>
                  <p className={`mt-2 line-clamp-3 text-xs leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                  }`}>
                    {resource.description}
                  </p>
                  <span className={`mt-2 inline-block text-[10px] font-semibold ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{resource.format} · {resource.level}</span>
                </div>

                <div className={`rounded-xl border p-3 space-y-1.5 ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-200'
                }`}>
                  <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    Key Highlights:
                  </div>
                  {resource.keyHighlights.slice(0, 2).map((takeaway, idx) => (
                    <div key={idx} className={`flex items-start gap-2 text-xs ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-4 mt-4 border-t grid grid-cols-[1fr_auto] items-center gap-2 ${
                theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-200'
              }`}>
                <button
                  onClick={() => openResourceModal(resource)}
                  className={`min-h-11 rounded-xl px-3 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] hover:bg-[var(--accent-red-hover)] text-neutral-200 hover:text-white border border-[var(--border-color)]'
                      : 'bg-white hover:bg-[var(--accent-red-hover)] text-neutral-800 hover:text-white border border-neutral-300 shadow-sm'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <Link to={`/resources/${resource.id}`} aria-label={`Read ${resource.title}`} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[var(--accent-red)] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--accent-red-hover)]">
                  Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))
          )}
        </div>

      </div>
      </main>
    </>
  );
};
