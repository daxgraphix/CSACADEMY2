import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ProgramPillar } from '../types';
import { programsData } from '../data/programs';
import { featuredTrainingData } from '../data/training';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { getProgramAccent } from '../utils/programAccent';
import { PageBreadcrumbs, SectionHeading } from '../components/LayoutPrimitives';
import {
  ShieldCheck,
  Laptop,
  ArrowRight,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  BookOpen,
  Layers,
  Sparkles,
  Code2,
  Palette,
  X
} from 'lucide-react';

interface ProgramsPageProps {
  openProgramModal: (program: ProgramPillar) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  openProgramModal,
  openBookingModal
}) => {
  const { theme } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Programs', icon: Layers },
    { id: 'ai', label: 'AI Tracks', icon: Sparkles },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: ShieldCheck },
    { id: 'digital-skills', label: 'Digital Skills', icon: Laptop },
    { id: 'web-coding', label: 'Web & Coding', icon: Code2 },
    { id: 'design-uiux', label: 'Design & UI/UX', icon: Palette },
  ];

  // Filter Pillars
  const filteredPillars = useMemo(() => {
    return programsData.filter(pillar => {
      const matchesCategory = selectedCategory === 'ALL' || pillar.slug === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleMatch = pillar.title.toLowerCase().includes(query);
      const taglineMatch = pillar.tagline.toLowerCase().includes(query);
      const descMatch = pillar.extendedDescription.toLowerCase().includes(query) || pillar.description.toLowerCase().includes(query);
      const moduleMatch = pillar.modules.some(m => 
        m.title.toLowerCase().includes(query) || 
        m.description.toLowerCase().includes(query) ||
        m.practicalSkill.toLowerCase().includes(query)
      );
      const topicMatch = pillar.topics.some(t => t.toLowerCase().includes(query));
      const outcomeMatch = pillar.outcomes.some(o => o.toLowerCase().includes(query));
      const audienceMatch = pillar.audience.some(a => a.toLowerCase().includes(query));

      return matchesCategory && (titleMatch || taglineMatch || descMatch || moduleMatch || topicMatch || outcomeMatch || audienceMatch);
    });
  }, [selectedCategory, searchQuery]);

  // Filter Individual Courses / Modules
  const filteredCourses = useMemo(() => {
    return featuredTrainingData.filter(course => {
      const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleMatch = course.title.toLowerCase().includes(query);
      const descMatch = course.description.toLowerCase().includes(query);
      const highlightMatch = course.highlights.some(h => h.toLowerCase().includes(query));
      const curriculumMatch = course.curriculum.some(c => c.toLowerCase().includes(query));
      const audienceMatch = course.audience.toLowerCase().includes(query) || course.idealFor.toLowerCase().includes(query);

      return matchesCategory && (titleMatch || descMatch || highlightMatch || curriculumMatch || audienceMatch);
    });
  }, [selectedCategory, searchQuery]);

  const totalResultsCount = filteredPillars.length + filteredCourses.length;
  const activeCategoryLabel = categories.find((c) => c.id === selectedCategory)?.label ?? 'All Programs';

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>Programs & Courses | AI, Cybersecurity & Web Development | CS Academy Tanzania</title>
        <meta name="description" content="Browse CS Academy's full curriculum: AI & Vibe Coding, Cybersecurity & Defense, and Digital Skills & Web Development. Expert-led courses in Tanzania and East Africa." />
        <meta name="keywords" content="AI courses Tanzania, cybersecurity training Kenya, web development course East Africa, vibe coding Africa, CS Academy programs" />
        <meta property="og:title" content="CS Academy Programs | AI, Cybersecurity & Web Development" />
        <meta name="twitter:title" content="CS Academy Programs | AI, Cybersecurity & Web Development" />
        <meta property="og:description" content="Explore hands-on modules in AI, Cybersecurity, and Digital Skills. Instruction and course materials are in English; contact us for enrollment and payment details." />
        <meta name="twitter:description" content="Explore hands-on modules in AI, Cybersecurity, and Digital Skills. Instruction and course materials are in English; contact us for enrollment and payment details." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

    <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <PageBreadcrumbs
            theme={theme}
            items={[{ label: 'Home', route: '/' }, { label: 'Programs' }]}
          />
          <SectionHeading
            theme={theme}
            align="center"
            as="h1"
            eyebrow="Comprehensive Curriculum Directory"
            title={
              <>
                CS Academy <span className="text-[var(--accent-red-strong)]">Programs</span>
              </>
            }
            subtitle="Explore our comprehensive academies designed for practical skill mastery, ethical technology application, and career empowerment across Africa."
          />
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className={`p-4 sm:p-5 rounded-2xl border shadow-md space-y-4 ${
          theme === 'dark' ? 'bg-[#141414] border-[var(--border-color)]' : 'bg-white border-neutral-300'
        }`}>
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`} />
              <input
                id="programs-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course, skill, or topic…"
                className={`w-full min-h-12 pl-12 pr-10 py-3 text-sm rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-white placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-inner'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-xs font-bold text-neutral-400 hover:text-[var(--accent-red-strong)] hover:bg-black/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Clear All Filter Button */}
            {(searchQuery || selectedCategory !== 'ALL') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                className="px-4 py-3 text-xs font-bold text-[var(--accent-red-strong)] hover:bg-red-500/10 rounded-2xl border border-red-500/20 transition-colors shrink-0"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-[var(--border-color)]/40 pt-3 pb-1">
            <span className={`text-xs font-bold uppercase tracking-wider mr-2 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <Filter className="w-3.5 h-3.5 inline mr-1" />
              Category:
            </span>
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`program-filter-btn-${cat.id}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-[var(--accent-red)] text-white shadow-lg shadow-red-900/40 scale-[1.02]'
                      : theme === 'dark'
                      ? 'bg-[var(--bg-primary)] text-neutral-300 hover:text-white border border-[var(--border-color)] hover:border-neutral-700 hover:scale-[1.02]'
                      : 'bg-neutral-100 text-neutral-700 hover:text-neutral-900 border border-neutral-300 hover:bg-neutral-200 hover:scale-[1.02]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div
            className="flex items-center justify-between gap-3 text-xs pt-1"
            aria-live="polite"
          >
            <div className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
              {searchQuery ? (
                <span>
                  {`Showing results for "${searchQuery}": ${filteredPillars.length} ${
                    filteredPillars.length === 1 ? 'academy' : 'academies'
                  } & ${filteredCourses.length} ${filteredCourses.length === 1 ? 'course' : 'courses'}`}
                </span>
              ) : selectedCategory !== 'ALL' ? (
                <span>
                  {`${activeCategoryLabel}: ${filteredPillars.length} ${
                    filteredPillars.length === 1 ? 'academy' : 'academies'
                  } & ${filteredCourses.length} ${filteredCourses.length === 1 ? 'course' : 'courses'}`}
                </span>
              ) : (
                <span>
                  {`Displaying ${filteredPillars.length} comprehensive ${
                    filteredPillars.length === 1 ? 'academy' : 'academies'
                  } & ${filteredCourses.length} specialized ${
                    filteredCourses.length === 1 ? 'course' : 'courses'
                  }`}
                </span>
              )}
            </div>
            {totalResultsCount > 0 && (
              <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                {totalResultsCount} result{totalResultsCount === 1 ? '' : 's'}
              </span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {totalResultsCount === 0 && (
          <div className={`p-12 text-center rounded-3xl border space-y-4 ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-400' : 'bg-white border-neutral-300 text-neutral-800'
          }`}>
            <BookOpen className="w-12 h-12 text-[var(--accent-red-strong)] mx-auto opacity-80" />
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              No matching courses found
            </h3>
            <p className="text-sm max-w-md mx-auto">
              Try searching with different terms like "AI", "Cybersecurity", "Prompt", "Web", or "Digital".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
              className="px-6 py-2.5 rounded-xl bg-[var(--accent-red)] text-white text-xs font-bold hover:bg-red-700 transition-colors shadow"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Core learning paths */}
        {filteredPillars.length > 0 && (
          <section aria-labelledby="core-tracks-title" className="space-y-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">Choose a learning path</p>
                <h2 id="core-tracks-title" className={`mt-1 text-xl font-black tracking-tight sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>Core academy tracks</h2>
              </div>
              <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Explore the syllabus and practical outcomes</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPillars.map((pillar) => {
                const accent = getProgramAccent(pillar.slug);
                const Icon = pillar.icon === 'Sparkles' ? Sparkles : pillar.icon === 'ShieldCheck' ? ShieldCheck : Laptop;
                return (
                  <article key={pillar.id} id={`programs-page-${pillar.id}`} className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border transition duration-200 hover:-translate-y-1 hover:shadow-xl ${theme === 'dark' ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm'}`}>
                    <div className="h-1.5" style={{ backgroundColor: accent }} />
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start gap-3">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme === 'dark' ? 'bg-[var(--bg-primary)]' : 'bg-neutral-100'}`} style={{ color: accent }}>
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em]" style={{ color: accent }}>{pillar.badge}</span>
                          <h3 className={`mt-1 text-lg font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{pillar.title.replace(' ACADEMY', '')}</h3>
                        </div>
                      </div>
                      <p className={`mt-4 text-sm font-semibold leading-relaxed ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{pillar.tagline}</p>
                      <p className={`mt-2 line-clamp-3 text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{pillar.description}</p>
                      <div className="mt-4">
                        <p className={`mb-2 text-[9px] font-extrabold uppercase tracking-[0.14em] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>What you can practise</p>
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.topics.slice(0, 3).map((topic) => <span key={topic} className={`rounded-full border px-2.5 py-1 text-[10px] ${theme === 'dark' ? 'border-[var(--border-color)] bg-white/[0.03] text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'}`}>{topic}</span>)}
                          {pillar.topics.length > 3 && <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${theme === 'dark' ? 'bg-white/[0.06] text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>+{pillar.topics.length - 3} topics</span>}
                        </div>
                      </div>
                      <div className={`mt-5 rounded-xl p-3 text-xs leading-relaxed ${theme === 'dark' ? 'bg-[var(--bg-primary)] text-neutral-300' : 'bg-neutral-50 text-neutral-700'}`}>
                        <span className="font-bold">Practical outcome: </span>{pillar.outcomes[0]}
                      </div>
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                        <Link to={`/programs/${pillar.slug}`} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[var(--accent-red)] px-3 py-2.5 text-center text-[11px] font-extrabold text-white transition hover:bg-[var(--accent-red-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)]">
                          Explore track <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                        <button type="button" onClick={() => openProgramModal(pillar)} className={`min-h-11 rounded-xl border px-3 py-2.5 text-[11px] font-bold transition ${theme === 'dark' ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}>View syllabus</button>
                      </div>
                      <button type="button" onClick={() => openBookingModal({ program: pillar.title })} className="mt-2 min-h-10 text-xs font-bold text-[var(--accent-red-strong)] hover:underline">Ask about this track</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
        {/* 2. SPECIFIC FEATURED COURSES & MASTERCLASSES */}
        {filteredCourses.length > 0 && (
          <div className="space-y-8 pt-8">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">Focused, instructor-led options</p>
              <h2 className={`mt-1 text-xl font-black tracking-tight sm:text-2xl ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Bootcamps & masterclasses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  id={`course-card-${course.id}`}
                  className={`border rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                    theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700' : 'bg-white border-neutral-300 hover:border-red-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${theme === 'dark' ? 'text-red-300 bg-red-950/40 border-red-900/40' : 'text-red-800 bg-red-50 border-red-200'}`}>
                        {course.category.toUpperCase()} | {course.level}
                      </span>
                      <span className={`text-[11px] font-mono flex items-center gap-1 ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                      }`}>
                        <Clock className="w-3 h-3 text-[var(--accent-red-strong)]" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className={`text-lg font-black tracking-tight ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {course.title}
                    </h3>

                    <p className={`text-xs leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                    }`}>
                      {course.description}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Key Highlights:
                      </div>
                      <ul className="space-y-1 text-xs">
                        {course.highlights.slice(0, 3).map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-1.5 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                            <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`pt-4 border-t flex items-center justify-between gap-2 ${
                    theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-100'
                  }`}>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {course.format}
                    </span>
                    <button
                      onClick={() => openBookingModal({ program: course.title })}
                      className="group px-4 py-2 rounded-xl bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        </div>
      </div>
    </>
  );
};
