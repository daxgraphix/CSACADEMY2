import React, { useEffect, useMemo } from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import { BlogPost } from '../types';
import { useApp } from '../context/AppContext';
import { ShareButtons } from './ShareButtons';
import { getAuthor } from '../data/authors';
import { blogPostsData } from '../data/blog';
import { getCanonicalUrl } from '../utils/seo';
import { siteConfig } from '../config/site';
import { formatPublishedDate, toIsoDate } from '../utils/dates';
import {
  X,
  Clock,
  User,
  Calendar,
  Tag,
  ArrowLeft,
  Share2,
  Lightbulb,
  CheckCircle2,
  Linkedin,
  Twitter,
  ArrowRight,
  Mail
} from 'lucide-react';

interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  openBookingModal: (prefill?: { program?: string }) => void;
}

const pickRelated = (post: BlogPost, count: number): BlogPost[] => {
  const others = blogPostsData.filter((p) => p.id !== post.id);
  const sameCategory = others.filter((p) => p.category === post.category);
  const sharedTags = (a: BlogPost, b: BlogPost) =>
    a.tags.some((t) => b.tags.includes(t)) ? 1 : 0;
  const ranked = others
    .map((p) => ({
      post: p,
      score: (sameCategory.includes(p) ? 2 : 0) + sharedTags(p, post)
    }))
    .sort((a, b) => b.score - a.score);
  return ranked.slice(0, count).map((r) => r.post);
};

export const BlogArticleModal: React.FC<BlogArticleModalProps> = ({
  post, onClose, openBookingModal
}) => {
  useModalAccessibility(!!post, onClose);
  const { theme } = useApp();
  const related = useMemo(() => (post ? pickRelated(post, 3) : []), [post]);
  const author = useMemo(() => (post ? getAuthor(post.author) : null), [post]);

  useEffect(() => {
    if (!post || !author) return;
    const canonical = getCanonicalUrl(`/blog`);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      articleSection: post.category,
      keywords: post.tags.join(', '),
      inLanguage: 'en',
      datePublished: toIsoDate(post.publishedDate),
      dateModified: toIsoDate(post.publishedDate),
      author: {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        url: canonical
      },
      publisher: {
        '@type': 'Organization',
        name: 'CS Academy',
        url: 'https://academy.cyberswahili.co.tz',
        logo: {
          '@type': 'ImageObject',
          url: 'https://academy.cyberswahili.co.tz/og-image.jpg'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical
      }
    };

    let script = document.getElementById('blog-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'blog-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(jsonLd);

    return () => {
      const existing = document.getElementById('blog-jsonld');
      if (existing) existing.remove();
    };
  }, [post, author]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-surface animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-label={post?.title} tabIndex={-1}>
      <div
        className={`responsive-modal-viewport border rounded-3xl w-full max-w-3xl overflow-y-auto shadow-2xl relative transition-colors ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 backdrop-blur-md px-6 sm:px-8 py-5 border-b flex items-center justify-between z-10 ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)]/95 border-[var(--border-color)]' : 'bg-white/95 border-neutral-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)] uppercase">
              {post.category}
            </span>
            <div className={`flex items-center gap-1.5 text-xs font-mono ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 text-neutral-800 hover:text-neutral-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-8">

          {/* Article Header */}
          <div className="space-y-4">
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              {post.title}
            </h1>

            {/* Author + published + read time (in human format) */}
            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs pt-2 border-b pb-4 ${
              theme === 'dark' ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-800'
            }`}>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                  style={{ background: author?.avatarGradient, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                  aria-hidden="true"
                >
                  {author?.initials}
                </div>
                <span className={`font-semibold ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>{post.author}</span>
              </div>
              <div className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <time dateTime={toIsoDate(post.publishedDate)}>
                  {formatPublishedDate(post.publishedDate)}
                </time>
              </div>
              <div className={`flex items-center gap-1.5 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Share in Article Header */}
            <div className="pt-1">
              <ShareButtons
                title={post.title}
                description={post.excerpt}
                variant="compact"
              />
            </div>
          </div>

          {/* Intro Excerpt */}
          <div className={`p-5 rounded-2xl border-l-4 border-[var(--accent-red-strong)] border-y border-r text-sm sm:text-base leading-relaxed italic font-medium ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-200' : 'bg-red-50/50 border-neutral-200 text-neutral-800'
          }`}>
            "{post.content.intro}"
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {sec.heading}
                </h2>
                <div className={`space-y-2 text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
                }`}>
                  {sec.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
                {sec.keyTip && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 mt-3 ${
                    theme === 'dark'
                      ? 'bg-red-950/20 border-red-900/40 text-red-200'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}>
                    <Lightbulb className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                    <span><strong>Actionable Rule:</strong> {sec.keyTip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className={`p-6 rounded-2xl border space-y-2 ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--accent-red-strong)]">
              Summary & Next Steps
            </h3>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              {post.content.conclusion}
            </p>
          </div>

          {/* Author bio block */}
          {author && (
            <div
              itemScope
              itemType="https://schema.org/Person"
              className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start gap-4 ${
                theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white text-base sm:text-lg font-black shrink-0"
                style={{ background: author.avatarGradient, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                aria-hidden="true"
              >
                {author.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[10px] font-black uppercase tracking-[0.18em] ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'
                }`}>
                  Written by
                </div>
                <div className={`text-base sm:text-lg font-extrabold mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
                  <span itemProp="name">{author.name}</span>
                </div>
                <div className="text-xs text-[var(--accent-red-strong)] font-bold uppercase tracking-wider mt-0.5">
                  <span itemProp="jobTitle">{author.role}</span>
                </div>
                <p
                  itemProp="description"
                  className={`text-sm leading-relaxed mt-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}
                >
                  {author.bio}
                </p>
                {author.socialLinks && (
                  <div className="flex items-center gap-2 mt-3">
                    {author.socialLinks.linkedin && (
                      <a
                        href={author.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${author.name} on LinkedIn`}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'border-[var(--border-color)] text-neutral-400 hover:text-white hover:border-white/30'
                            : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                        }`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {author.socialLinks.twitter && (
                      <a
                        href={author.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${author.name} on X / Twitter`}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          theme === 'dark'
                            ? 'border-[var(--border-color)] text-neutral-400 hover:text-white hover:border-white/30'
                            : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                        }`}
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Newsletter CTA inside the article */}
          <div className={`rounded-2xl p-5 sm:p-6 border-2 ${
            theme === 'dark'
              ? 'border-[var(--accent-red-border)] bg-gradient-to-br from-red-950/40 via-[var(--bg-primary)] to-[var(--bg-primary)]'
              : 'border-red-200 bg-gradient-to-br from-red-50 via-white to-white'
          }`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-red)] flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm sm:text-base font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
                    Request practical learning updates
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Ask to receive practical lessons on AI, cybersecurity, and digital skills. We manage requests by email; contact support whenever you want updates to stop.
                </p>
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello CS Academy, I would like to request learning updates by WhatsApp. Please let me know how often you send them and how I can stop them.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent-red)] text-white text-xs font-extrabold uppercase tracking-wider shadow hover:bg-[var(--accent-red-hover)] transition-colors"
                  >
                    Request via WhatsApp
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('CS Academy learning updates')}&body=${encodeURIComponent('Hello CS Academy, I would like to request learning updates by email. Please let me know how often you send them and how I can stop them.')}`}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/5 text-neutral-200 hover:bg-white/10 border border-white/10'
                        : 'bg-white text-neutral-800 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    Request by email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tags & Full Share Bar */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-neutral-500" />
              {post.tags.map((t, i) => (
                <span key={i} className={`text-xs px-2.5 py-1 rounded-md border ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                }`}>
                  #{t}
                </span>
              ))}
            </div>

            <div className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <ShareButtons
                title={post.title}
                description={post.excerpt}
                variant="inline"
              />
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-4 border-t" style={{ borderColor: theme === 'dark' ? 'var(--border-color)' : 'rgb(229 229 229)' }}>
              <div className={`text-[10px] font-black uppercase tracking-[0.18em] mb-3 ${
                theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'
              }`}>
                Related Reading
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {related.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        const event = new CustomEvent('cs:open-blog', { detail: { id: r.id } });
                        window.dispatchEvent(event);
                      }, 50);
                    }}
                    className={`text-left p-4 rounded-2xl border transition-colors group ${
                      theme === 'dark'
                        ? 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--accent-red-border)]'
                        : 'border-neutral-200 bg-white hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                      <span className="text-[var(--accent-red-strong)]">{r.category}</span>
                      <span className={theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}>
                        {r.readingTime}
                      </span>
                    </div>
                    <h4 className={`text-sm font-extrabold leading-snug mb-2 group-hover:text-[var(--accent-red-strong)] transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {r.title}
                    </h4>
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Call to Action */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
          }`}>
            <div>
              <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Want your team trained on this topic?
              </div>
              <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                Request a live workshop or executive briefing.
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                openBookingModal({ program: `Training on ${post.category}: ${post.title}` });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg transition-all"
            >
              Book Related Training
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
