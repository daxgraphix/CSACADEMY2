import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageRoute, ProgramPillar, TrainingProgram } from '../types';
import { programsData } from '../data/programs';
import { featuredTrainingData } from '../data/training';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Laptop,
  ArrowRight,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Users,
  BookOpen,
  Layers,
  Award,
  Zap
} from 'lucide-react';

const ProgramCardSkeleton = () => (
  <div className="animate-pulse border rounded-3xl p-8 bg-neutral-200 dark:bg-neutral-800 space-y-6">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-neutral-300 dark:bg-neutral-700" />
      <div className="space-y-2">
        <div className="h-4 w-32 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <div className="h-6 w-48 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-neutral-300 dark:bg-neutral-700 rounded" />
      <div className="h-4 w-5/6 bg-neutral-300 dark:bg-neutral-700 rounded" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[1,2,3,4].map(i => (
        <div key={i} className="h-16 bg-neutral-300 dark:bg-neutral-700 rounded-xl" />
      ))}
    </div>
  </div>
);

const BlogCardSkeleton = () => (
  <div className="animate-pulse border rounded-3xl p-6 bg-neutral-200 dark:bg-neutral-800 space-y-4">
    <div className="flex justify-between">
      <div className="h-5 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
      <div className="h-5 w-16 bg-neutral-300 dark:bg-neutral-700 rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-6 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded" />
      <div className="h-4 w-full bg-neutral-300 dark:bg-neutral-700 rounded" />
      <div className="h-4 w-5/6 bg-neutral-300 dark:bg-neutral-700 rounded" />
    </div>
    <div className="flex gap-2">
      <div className="h-5 w-12 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
      <div className="h-5 w-16 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
    </div>
    <div className="pt-4 border-t space-y-2">
      <div className="h-4 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded" />
    </div>
  </div>
);

interface ProgramsPageProps {
  setCurrentRoute: (route: PageRoute) => void;
  openProgramModal: (program: ProgramPillar) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  setCurrentRoute,
  openProgramModal,
  openBookingModal
}) => {
  const { theme } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Programs', icon: Layers },
    { id: 'vibe-coding', label: 'Vibe Coding', icon: Zap },
    { id: 'ai', label: 'AI & Vibe Coding', icon: Laptop },
    { id: 'cybersecurity', label: 'Cybersecurity & Defense', icon: ShieldCheck },
    { id: 'digital-skills', label: 'Digital Skills & Web', icon: Laptop },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Laptop className="w-6 h-6 text-[var(--accent-red-strong)]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[var(--accent-red-strong)]" />;
      default:
        return <Laptop className="w-6 h-6 text-[var(--accent-red-strong)]" />;
    }
  };

  const navigateToPillar = (slug: string) => {
    setCurrentRoute(`programs/${slug}` as PageRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <>
      <Helmet>
        <title>Programs & Courses | AI, Cybersecurity & Web Development - CS Academy Tanzania</title>
        <meta name="description" content="Browse CS Academy's full curriculum: AI & Vibe Coding, Cybersecurity & Defense, and Digital Skills & Web Development. Expert-led courses in Tanzania and East Africa." />
        <meta name="keywords" content="AI courses Tanzania, cybersecurity training Kenya, web development course East Africa, vibe coding Africa, CS Academy programs" />
        <meta property="og:title" content="CS Academy Programs | AI, Cybersecurity & Web Development" />
        <meta property="og:description" content="Explore 30+ hands-on modules in AI, Cybersecurity, and Digital Skills. Taught in English & local languages. Mobile money enrollment." />
        <meta property="og:type" content="website" />
      </Helmet>

    <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'bg-red-950/60 border-red-900/60 text-[var(--accent-red-strong)]' : 'bg-red-50 border-red-200 text-[var(--accent-red-strong)]'
          }`}>
            <span>Comprehensive Curriculum Directory</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            CS ACADEMY <span className="text-[var(--accent-red-strong)]">PROGRAMS</span>
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Explore our comprehensive academies designed for practical skill mastery, ethical technology application, and career empowerment across Africa.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-6 ${
          theme === 'dark' ? 'bg-[#141414] border-[var(--border-color)]' : 'bg-white border-neutral-300'
        }`}>
          <div className="flex flex-col md:flex-row items-center gap-4">
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
                placeholder={'Search courses by title or skill category (e.g. Prompt Engineering, React, Cybersecurity, Phishing)...'}
                className={`w-full pl-12 pr-10 py-3.5 text-sm rounded-2xl border transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-white placeholder-neutral-500'
                    : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-inner'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-[var(--accent-red-strong)] p-1"
                >
                  -
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
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--border-color)]/40">
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
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
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
          <div className="flex items-center justify-between text-xs pt-1 text-neutral-400">
            <div>
              {searchQuery ? (
                <span>
                  {`Showing results for "${searchQuery}": ${filteredPillars.length} academies & ${filteredCourses.length} modular courses`}
                </span>
              ) : (
                <span>
                  {`Displaying 3 comprehensive academies & specialized training courses`}
                </span>
              )}
            </div>
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

        {/* 1. MAJOR ACADEMY DEEP DIVE CARDS */}
        {filteredPillars.length > 0 && (
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-red)]" />
              <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                Core Academy Tracks
              </h2>
            </div>

            <Suspense fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => <ProgramCardSkeleton key={i} />)}
              </div>
            }>
            {filteredPillars.map((pillar) => (
              <div
                key={pillar.id}
                id={`programs-page-${pillar.id}`}
                className={`border rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 transition-all ${
                  theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-300'
                }`}
              >
                <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b ${
                  theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${
                      theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-100 border-neutral-300'
                    }`}>
                      {getIcon(pillar.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)] uppercase">
                        {pillar.badge}
                      </span>
                      <h2 className={`text-2xl sm:text-3xl font-extrabold ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {pillar.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigateToPillar(pillar.slug)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors uppercase tracking-wider ${
                        theme === 'dark'
                          ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
                          : 'text-neutral-800 hover:text-black bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 border border-neutral-300'
                      }`}
                    >
                      View Academy Page
                    </button>
                    <button
                      onClick={() => openBookingModal({ program: pillar.title })}
                      className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg transition-all"
                    >
                      Book Training
                    </button>
                  </div>
                </div>

                {/* Descriptions & Topics */}
                <div className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className={`text-lg font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>{pillar.tagline}</h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                    }`}>
                      {pillar.extendedDescription}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                        Target Audiences:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pillar.audience.map((aud, aIdx) => (
                          <span 
                            key={aIdx} 
                            className={`text-xs px-2.5 py-1 rounded border ${
                              theme === 'dark'
                                ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-300'
                                : 'bg-neutral-100 border-neutral-300 text-neutral-700'
                            }`}
                          >
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Core Curriculum Modules & Hands-on Skills:
                    </h4>
                    <div className="space-y-3">
                      {pillar.modules.map((mod, mIdx) => (
                        <div 
                          key={mIdx} 
                          className={`p-3.5 rounded-xl border space-y-1 ${
                            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
                          }`}
                        >
                          <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                            {mod.title}
                          </div>
                          <div className="text-[11px] text-neutral-400">{mod.description}</div>
                          <div className="text-[10px] text-[var(--accent-red-strong)] font-mono font-bold mt-1">
                            ✓ {mod.practicalSkill}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Outcomes & Formats */}
                <div className={`grid sm:grid-cols-2 gap-4 p-5 rounded-2xl border text-xs ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-100 border-neutral-300'
                }`}>
                  <div>
                    <div className={`font-bold uppercase tracking-wider mb-2 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                    }`}>
                      Verified Outcomes:
                    </div>
                    <ul className="space-y-1.5 text-neutral-400">
                      {pillar.outcomes.map((out, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                          <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className={`font-bold uppercase tracking-wider mb-2 ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                    }`}>
                      Delivery & Duration:
                    </div>
                    <div className={`space-y-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                      <p>Formats: {pillar.deliveryFormats.join(', ')}</p>
                      <p>Duration: {pillar.durationOptions.join(', ')}</p>
                      <p className="text-[var(--accent-red-strong)] pt-1 font-semibold">
                        ✓ Instructed in English & local languages
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
            </Suspense>
          </div>
        )}

        {/* 2. SPECIFIC FEATURED COURSES & MASTERCLASSES */}
        {filteredCourses.length > 0 && (
          <div className="space-y-8 pt-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-red)]" />
              <h2 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                Specialized Cohort Bootcamps & Masterclasses
              </h2>
            </div>

            <Suspense fallback={
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <BlogCardSkeleton key={i} />)}
              </div>
            }>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  id={`course-card-${course.id}`}
                  className={`border rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-lg transition-all hover:scale-[1.01] ${
                    theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700' : 'bg-white border-neutral-300 hover:border-red-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-red-strong)] px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-900/40">
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
            </Suspense>
          </div>
        )}

        </div>
      </div>
    </>
  );
};
