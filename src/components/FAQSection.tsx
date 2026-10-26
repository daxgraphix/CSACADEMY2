import React, { useState, useMemo, useRef, KeyboardEvent } from 'react';
import { faqData } from '../data/faq';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  ChevronDown,
  HelpCircle,
  Search,
  BookOpen,
  CreditCard,
  Headphones,
  Award,
  MessageCircle,
  Filter,
  Users
} from 'lucide-react';
import { siteConfig } from '../config/site';
import { Highlight } from '../utils/highlight';
import { FaqJsonLd } from './FaqJsonLd';

export const FAQSection: React.FC = () => {
  const { theme, t } = useApp();
  const [openIds, setOpenIds] = useState<string[]>(['how-to-access-courses', 'mobile-money-payments', 'learner-support-helpdesk']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const listRef = useRef<HTMLDivElement>(null);
  const contentRef = useReveal<HTMLDivElement>();

  const categories = [
    { id: 'ALL', label: 'All FAQs', icon: Filter },
    { id: 'Course Access', label: 'Course Access', icon: BookOpen },
    { id: 'Payment & Mobile Money', label: 'Payment & Mobile Money', icon: CreditCard },
    { id: 'Technical Support', label: 'Technical Support', icon: Headphones },
    { id: 'Languages', label: 'Languages', icon: MessageCircle },
    { id: 'Organizations', label: 'Organizations', icon: Users },
    { id: 'General', label: 'Certificates & General', icon: Award },
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenIds(filteredFaq.map(item => item.id));
  const collapseAll = () => setOpenIds([]);

  const filteredFaq = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqData.filter(item => {
      const question = item.question.toLowerCase();
      const answer = item.answer.toLowerCase();
      const category = item.category.toLowerCase();
      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const matchesSearch = !q || question.includes(q) || answer.includes(q) || category.includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Keyboard navigation across accordion buttons (Up/Down to move, Home/End to jump)
  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(
      listRef.current?.querySelectorAll('button[data-faq-trigger]') ?? []
    ) as HTMLButtonElement[];
    if (buttons.length === 0) return;
    const currentIndex = buttons.findIndex(b => b === document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = buttons[(currentIndex + 1) % buttons.length];
      next?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = buttons[(currentIndex - 1 + buttons.length) % buttons.length];
      prev?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttons[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttons[buttons.length - 1].focus();
    } else if (e.key === 'Escape' && openIds.length) {
      e.preventDefault();
      collapseAll();
    }
  };

  return (
    <section 
      id="faq-section" 
      className={`relative py-24 overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#FAFAFA] text-neutral-900'
      }`}
    >
      <FaqJsonLd items={faqData} />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(255,59,48,0.14),transparent_45%)]" />
      <div ref={contentRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-300' : 'bg-white border-neutral-200 text-neutral-800 shadow-sm'
          }`}>
            <span>{t.faq.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.05em] ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.faq.title}
          </h2>
          <p className={`max-w-2xl mx-auto text-base leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            Direct answers about course access, enrollment, payment instructions, technical support, and certification.
          </p>

          {/* FAQ Search Bar */}
          <div className="max-w-xl mx-auto pt-2 relative" role="search">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'
            }`} />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={'Search questions (e.g. M-Pesa, smartphone, WhatsApp, support)...'}
              aria-label={'Search questions'}
              className={`w-full pl-10 pr-10 py-3 border rounded-2xl text-xs focus:outline-none focus:border-[var(--accent-red)] transition-colors ${
                theme === 'dark'
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-white placeholder-neutral-500'
                  : 'bg-white border-neutral-200 text-neutral-900 placeholder-neutral-500 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                aria-label={'Clear search'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-[var(--accent-red-strong)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Filters with result counts */}
          <div className="grid grid-cols-2 gap-2 pt-3 pb-1 sm:flex sm:flex-wrap sm:justify-center sm:overflow-visible">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = filteredFaq.filter(item =>
                cat.id === 'ALL' ? true : item.category === cat.id
              ).length;
              return (
                <button
                  key={cat.id}
                  id={`faq-category-btn-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 w-full justify-center sm:w-auto ${
                    isSelected
                      ? 'bg-[var(--accent-red-hover)] text-white shadow-md'
                      : theme === 'dark'
                      ? 'bg-[var(--bg-secondary)] text-neutral-400 hover:text-white border border-[var(--border-color)] hover:border-neutral-700'
                      : 'bg-white text-neutral-800 hover:text-neutral-900 border border-neutral-200 shadow-sm hover:border-neutral-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`ml-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20' : theme === 'dark' ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expand/Collapse and Results Counter */}
          <div className="flex items-center justify-between gap-3 text-xs pt-2 px-1 text-neutral-400">
            <span>
              {`Showing ${filteredFaq.length} FAQs`}
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="hover:text-[var(--accent-red-strong)] transition-colors font-medium"
              >
                Clear filters
              </button>
            )}
            <div className="flex items-center gap-3">
              <button 
                onClick={expandAll}
                className="hover:text-[var(--accent-red-strong)] transition-colors font-medium"
              >
                Expand All
              </button>
              <span> | </span>
              <button 
                onClick={collapseAll}
                className="hover:text-[var(--accent-red-strong)] transition-colors font-medium"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3" ref={listRef} onKeyDown={handleListKeyDown}>
          {filteredFaq.map((item) => {
            const isOpen = openIds.includes(item.id);
            const question = item.question;
            const answer = item.answer;
            const category = item.category;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 shadow-sm ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <button
                  data-faq-trigger
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-red-950/30 border border-red-900/40 flex items-center justify-center text-[var(--accent-red-strong)] shrink-0 mt-0.5 sm:mt-0 glow-accent">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-sm sm:text-base font-bold tracking-tight block ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-900'
                      }`}>
                        <Highlight text={question} query={searchQuery} />
                      </span>
                      <span className="inline-block mt-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent-red-strong)] px-2 py-0.5 rounded bg-red-950/20 border border-red-900/20">
                        {category}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 mt-1 sm:mt-0 ${
                    isOpen ? 'rotate-180 text-[var(--accent-red-strong)]' : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`} />
                </button>

                {isOpen && (
                  <div 
                    id={`faq-panel-${item.id}`}
                    role="region"
                    className={`px-5 sm:px-6 pb-6 pt-3 text-xs sm:text-sm leading-relaxed border-t animate-[fadeIn_0.2s_ease-out] ${
                      theme === 'dark' ? 'text-neutral-300 border-[var(--border-color)]/60' : 'text-neutral-800 border-neutral-100'
                    }`}
                  >
                    <p className="mt-1 pl-11 leading-7 max-w-3xl">
                      <Highlight text={answer} query={searchQuery} />
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaq.length === 0 && (
            <div className={`text-center py-12 rounded-2xl border text-xs space-y-3 ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-neutral-400' : 'bg-white border-neutral-200 text-neutral-800'
            }`}>
              <p>No matching questions found for your query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                className="px-4 py-2 rounded-xl bg-[var(--accent-red)] text-white text-xs font-bold shadow hover:bg-red-700 transition-colors"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Live Support Banner */}
        <div className={`mt-10 p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Have more questions or need direct guidance?
              </div>
              <div className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                Chat directly with our learner support team on WhatsApp.
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello CS Academy! I have a question about joining the training program:')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shrink-0 shadow-lg shadow-emerald-700/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>
        </div>

      </div>
    </section>
  );
};
