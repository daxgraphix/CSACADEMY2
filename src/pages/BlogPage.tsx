import React, { useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { blogPostsData } from '../data/blog';
import { BlogPost } from '../types';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { siteConfig } from '../config/site';
import { ShareButtons } from '../components/ShareButtons';
import { EmptyState } from '../components/EmptyState';
import {
  Clock,
  User,
  ArrowRight,
  Search,
  BookOpen,
  Tag
} from 'lucide-react';

const BlogCardSkeleton = ({ isDark }: { isDark: boolean }) => (
  <div className={`animate-pulse border rounded-3xl p-6 space-y-4 ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'}`}>
    <div className="flex justify-between">
      <div className={`h-5 w-20 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
      <div className={`h-5 w-16 rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
    </div>
    <div className="space-y-2">
      <div className={`h-6 w-3/4 rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
      <div className={`h-4 w-full rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
      <div className={`h-4 w-5/6 rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
    </div>
    <div className="flex gap-2">
      <div className={`h-5 w-12 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
      <div className={`h-5 w-16 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
    </div>
    <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
      <div className={`h-4 w-1/2 rounded ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
    </div>
  </div>
);

interface BlogPageProps {
  openBlogArticleModal: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  openBlogArticleModal
}) => {
  const { theme } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const categories = ['ALL', 'AI Literacy', 'Cybersecurity', 'Education', 'Business', 'Local Language AI'];

  const filtered = blogPostsData.filter(post => {
    const matchCat = selectedCategory === 'ALL' || post.category === selectedCategory;
    const matchSearch = search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>Blog | AI, Cybersecurity & Digital Skills Insights | CS Academy</title>
        <meta name="description" content="Read expert perspectives on AI literacy, cybersecurity, and digital transformation in East Africa. Practical guides, tutorials, and ethical analysis from CS Academy instructors." />
        <meta name="keywords" content="AI blog Tanzania, cybersecurity insights Africa, digital skills Africa, local language AI, tech education East Africa" />
        <meta property="og:title" content="CS Academy Blog | AI, Cybersecurity & Digital Skills" />
        <meta property="og:description" content="Expert essays and practical guides on AI, cybersecurity, and digital skills for East African learners, professionals, and organizations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider ${theme === 'dark' ? 'border-red-800/40 bg-red-950/40 text-red-300' : 'border-red-200 bg-red-50 text-red-800'}`}>
            <span>Essays, Insights & Practical Analysis</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            CS ACADEMY <span className="text-[var(--accent-red-strong)]">BLOG</span>
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Thought leadership, practical tutorials, and ethical considerations surrounding artificial intelligence and cybersecurity in Africa.
          </p>
        </div>

        {/* Search and Filter */}
        <div className={`flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl border ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300 shadow-sm'
        }`}>
          <div className="relative w-full md:w-80">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'
            }`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={'Search articles, topics...'}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] border ${
                theme === 'dark'
                  ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-white placeholder-neutral-500'
                  : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-sm'
              }`}
            />
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 gap-1.5 w-full sm:grid-cols-3 md:flex md:flex-nowrap md:gap-1.5 md:w-auto md:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 w-full text-center sm:w-auto ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent-red-hover)] text-white shadow-sm ring-2 ring-[var(--accent-red-hover)]/30'
                    : theme === 'dark'
                    ? 'text-neutral-400 hover:text-white bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-neutral-600'
                    : 'text-neutral-800 hover:text-neutral-950 bg-white border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {cat === 'ALL' ? ('ALL') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <Suspense fallback={
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <BlogCardSkeleton key={i} isDark={isDark} />)}
          </div>
        }>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length === 0 ? (
            <EmptyState
              hasActiveSearch={search.trim() !== ''}
              hasActiveFilter={selectedCategory !== 'ALL'}
              searchQuery={search}
              onClearSearch={() => setSearch('')}
              onClearFilter={() => setSelectedCategory('ALL')}
              onClearAll={() => { setSearch(''); setSelectedCategory('ALL'); }}
              onRequestTopic={() => {
                const text = encodeURIComponent(
                  `Hello CS Academy, I couldn't find an article on "${search || selectedCategory}". Could you write one?`
                );
                window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank');
              }}
              suggestions={['AI safety', 'Phishing', 'M-Pesa', 'Prompting', 'Local language AI']}
              onSuggestionClick={(term) => setSearch(term)}
              title="No articles match your filters"
              description="Try a different keyword, switch the category, or request a topic we publish new essays every two weeks."
            />
          ) : (
            filtered.map((post) => (
            <article
              key={post.id}
              className={`border rounded-3xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm group ${
                theme === 'dark'
                  ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700'
                  : 'bg-neutral-50 border-neutral-300 hover:border-red-400 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                    theme === 'dark' ? 'text-[var(--accent-red-strong)] bg-red-950/60 border-red-900/40' : 'text-[var(--accent-red-strong)] bg-red-50 border-red-200'
                  }`}>
                    {post.category}
                  </span>
                  <div className={`flex items-center gap-1.5 font-mono text-[11px] ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-bold tracking-tight group-hover:text-[var(--accent-red-strong)] transition-colors leading-snug ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                  }`}>
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      theme === 'dark' ? 'bg-[var(--bg-primary)] text-neutral-400 border-[var(--border-color)]' : 'bg-white text-neutral-800 border-neutral-300'
                    }`}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`pt-4 mt-4 border-t flex flex-col gap-3 ${
                theme === 'dark' ? 'border-[var(--border-color)] text-neutral-400' : 'border-neutral-300 text-neutral-800'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--accent-red-strong)]" />
                    <span className="font-semibold">{post.author}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 font-bold text-[var(--accent-red-strong)] group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <button type="button" onClick={() => openBlogArticleModal(post)} className="text-left text-xs font-semibold text-[var(--accent-red-strong)] underline underline-offset-4">Quick preview</button>

                {/* Social Share Buttons */}
                <div className={`pt-2 border-t border-dashed flex items-center justify-between ${isDark ? 'border-[var(--border-color)]' : 'border-neutral-200'}`}>
                  <ShareButtons
                    title={post.title}
                    description={post.excerpt}
                    variant="compact"
                  />
                </div>
              </div>
            </article>
          ))
          )}
        </div>
        </Suspense>

      </div>
      </div>
    </>
  );
};
