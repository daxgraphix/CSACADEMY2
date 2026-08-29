import React, { useState, useMemo } from 'react';
import { blogPostsData } from '../data/blog';
import { BlogPost } from '../types';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  Clock,
  ArrowRight,
  BookOpen,
  User,
  Search,
  ArrowUpDown,
  Star
} from 'lucide-react';

interface BlogSectionProps {
  openBlogArticleModal: (post: BlogPost) => void;
}

type SortKey = 'newest' | 'quickest' | 'az';

const readingMinutes = (r: string) => parseInt(r, 10) || 0;

export const BlogSection: React.FC<BlogSectionProps> = ({
  openBlogArticleModal
}) => {
  const { theme, t } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const gridRef = useReveal<HTMLDivElement>();

  const tags = ['ALL', 'AI Literacy', 'Cybersecurity', 'Education', 'Business', 'Swahili AI'];

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = blogPostsData.filter((post) => {
      const matchesTag = selectedTag === 'ALL' || post.category === selectedTag;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesTag && matchesSearch;
    });

    return [...list].sort((a, b) => {
      if (sortKey === 'quickest') return readingMinutes(a.readingTime) - readingMinutes(b.readingTime);
      if (sortKey === 'az') return a.title.localeCompare(b.title);
      return b.publishedDate.localeCompare(a.publishedDate);
    });
  }, [selectedTag, searchQuery, sortKey]);

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  return (
    <section 
      id="blog-section" 
      className={`py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0B0B0B] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[#DC2626] text-xs font-mono font-bold uppercase tracking-wider">
              <span>{t.blog.badge}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              {t.blog.title}
            </h2>
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              {t.blog.subtitle}
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-2 md:self-end">
            <div className="relative">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={'Search essays...'}
                aria-label={'Search essays'}
                className={`w-44 pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#DC2626] ${
                  theme === 'dark' ? 'bg-[#171717] border-neutral-800 text-white placeholder-neutral-500' : 'bg-neutral-100 border-neutral-300 text-neutral-900 placeholder-neutral-500'
                }`}
              />
            </div>
            <div className={`flex items-center gap-1.5 px-2 border rounded-xl ${theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-100 border-neutral-300'}`}>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                aria-label={'Sort essays'}
                className={`bg-transparent py-2 text-xs font-bold focus:outline-none ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'}`}
              >
                <option value="newest">Newest</option>
                <option value="quickest">Quickest Read</option>
                <option value="az">A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tag Filter */}
        <div className={`flex items-center gap-1.5 p-1 border rounded-2xl self-start md:self-auto overflow-x-auto max-w-full mb-8 ${
          theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-100 border-neutral-300'
        }`}>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedTag === tag 
                  ? 'bg-[#B91C1C] text-white shadow-sm' 
                  : theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-900'
              }`}
            >
              {tag === 'ALL' ? ('ALL') : tag}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featured && (
          <article
            onClick={() => openBlogArticleModal(featured)}
            className={`group mb-8 border rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-sm ${
              theme === 'dark'
                ? 'bg-[#121212] border-neutral-800 hover:border-neutral-700'
                : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-lg'
            }`}
          >
            <div className="sm:w-2/3 space-y-4">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border border-[#DC2626]/40 bg-red-50 text-[#DC2626]">
                  <Star className="w-3 h-3" />
                  FEATURED ESSAY
                </span>
                <div className={`flex items-center gap-1.5 font-mono text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                  <Clock className="w-3 h-3" />
                  <span>{featured.readingTime}</span>
                </div>
              </div>
              <div>
                <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border ${theme === 'dark' ? 'text-[#DC2626] bg-red-950/60 border-red-900/40' : 'text-[#DC2626] bg-red-50 border-red-200'}`}>
                  {featured.category}
                </span>
                <h3 className={`mt-3 text-xl sm:text-2xl font-extrabold tracking-tight group-hover:text-[#DC2626] transition-colors ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {featured.title}
                </h3>
                <p className={`text-sm mt-2 leading-relaxed line-clamp-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                  {featured.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <User className="w-3.5 h-3.5 text-[#DC2626]" />
                <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>{featured.author}</span>
                <span className={theme === 'dark' ? 'text-neutral-600' : 'text-neutral-700'}> | </span>
                <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}>{featured.publishedDate}</span>
              </div>
            </div>
            <div className={`sm:w-1/3 rounded-2xl border flex items-center justify-center p-6 ${
              theme === 'dark' ? 'bg-gradient-to-br from-[#1a0d0d] to-[#0B0B0B] border-neutral-800' : 'bg-gradient-to-br from-red-50 to-white border-red-100'
            }`}>
              <div className="text-center space-y-2">
                <BookOpen className="w-8 h-8 mx-auto text-[#DC2626]" />
                <div className="flex items-center gap-1 font-bold text-[#DC2626] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Blog Posts Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {rest.map((post) => (
            <article
              key={post.id}
              onClick={() => openBlogArticleModal(post)}
              className={`border rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-sm group ${
                theme === 'dark'
                  ? 'bg-[#121212] border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                    theme === 'dark' ? 'text-[#DC2626] bg-red-950/60 border-red-900/40' : 'text-[#DC2626] bg-red-50 border-red-200'
                  }`}>
                    {post.category}
                  </span>
                  <div className={`flex items-center gap-1.5 font-mono text-[11px] ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Title & Excerpt */}
                <div>
                  <h3 className={`text-lg font-bold tracking-tight group-hover:text-[#DC2626] transition-colors leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>
                    {post.excerpt}
                  </p>
                </div>

              </div>

              {/* Author & Read More */}
              <div className={`pt-4 mt-6 border-t flex items-center justify-between text-xs ${
                theme === 'dark' ? 'border-neutral-800/80 text-neutral-400' : 'border-neutral-300 text-neutral-800'
              }`}>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-[#DC2626] group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className={`text-center py-12 rounded-2xl border text-xs ${theme === 'dark' ? 'bg-[#171717] border-neutral-800 text-neutral-400' : 'bg-white border-neutral-300 text-neutral-800'}`}>
            No essays match your search.
          </div>
        )}

      </div>
    </section>
  );
};
