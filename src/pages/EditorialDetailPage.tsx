import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Clock } from 'lucide-react';
import { blogPostsData } from '../data/blog';
import { resourcesData } from '../data/resources';
import { getAuthor } from '../data/authors';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { formatPublishedDate, toIsoDate } from '../utils/dates';
import { downloadResource } from '../utils/download';
import { NotFound } from '../components/NotFound';

interface EditorialDetailPageProps {
  kind: 'blog' | 'resource';
  slug: string;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const EditorialDetailPage: React.FC<EditorialDetailPageProps> = ({ kind, slug, openBookingModal }) => {
  const { theme } = useApp();
  const post = kind === 'blog' ? blogPostsData.find((item) => item.slug === slug) : undefined;
  const resource = kind === 'resource' ? resourcesData.find((item) => item.id === slug) : undefined;
  const canonical = useCanonicalUrl();
  const author = post ? getAuthor(post.author) : null;
  const isDark = theme === 'dark';
  const surface = isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white';
  const bodyText = isDark ? 'text-neutral-300' : 'text-neutral-700';

  if (!post && !resource) return <NotFound />;

  const title = post?.title ?? resource!.title;
  const description = post?.excerpt ?? resource!.description;
  const schema = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
    keywords: post.tags.join(', '),
    datePublished: toIsoDate(post.publishedDate),
    dateModified: toIsoDate(post.publishedDate),
    author: { '@type': 'Person', name: author?.name ?? post.author, ...(author?.role ? { jobTitle: author.role } : {}) },
    publisher: { '@type': 'Organization', name: 'CS Academy', url: 'https://academy.cyberswahili.co.tz' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
  } : {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: resource!.title,
    description: resource!.description,
    inLanguage: 'en',
    step: resource!.keyHighlights.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, text }))
  };

  return (
    <main className={`min-h-screen px-4 pb-20 pt-28 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'}`}>
      <Helmet>
        <title>{title} | CS Academy</title>
        <meta name="description" content={description.slice(0, 160)} />
        <meta property="og:title" content={`${title} | CS Academy`} />
        <meta property="og:description" content={description.slice(0, 200)} />
        <meta property="og:type" content={post ? 'article' : 'website'} />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <article className="mx-auto max-w-3xl">
        <Link to={post ? '/blog' : '/resources'} className={`inline-flex items-center gap-2 text-sm font-semibold ${bodyText}`}><ArrowLeft className="h-4 w-4" /> Back to {post ? 'articles' : 'resources'}</Link>
        <header className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-red-strong)]">{post?.category ?? resource!.category}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1>
          <p className={`mt-5 text-lg leading-relaxed ${bodyText}`}>{description}</p>
          <div className={`mt-5 flex flex-wrap items-center gap-4 text-sm ${bodyText}`}>
            {post && <><span>By {post.author}</span><time dateTime={toIsoDate(post.publishedDate)}>{formatPublishedDate(post.publishedDate)}</time></>}
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{post?.readingTime ?? resource!.readingTime}</span>
          </div>
        </header>

        {post ? (
          <div className={`mt-9 space-y-8 rounded-3xl border p-6 sm:p-10 ${surface}`}>
            <p className={`text-base leading-8 ${bodyText}`}>{post.content.intro}</p>
            {post.content.sections.map((section, index) => <section key={`${section.heading}-${index}`} className="space-y-3">
              <h2 className="text-xl font-extrabold">{section.heading}</h2>
              <div className={`space-y-3 leading-7 ${bodyText}`}>{section.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
              {section.keyTip && <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-950"><strong>Practical tip:</strong> {section.keyTip}</p>}
            </section>)}
            <section className={`rounded-2xl border p-5 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}>
              <h2 className="font-extrabold">Summary</h2><p className={`mt-2 leading-7 ${bodyText}`}>{post.content.conclusion}</p>
            </section>
          </div>
        ) : (
          <div className={`mt-9 space-y-8 rounded-3xl border p-6 sm:p-10 ${surface}`}>
            <div><h2 className="text-xl font-extrabold">Who this is for</h2><p className={`mt-2 leading-7 ${bodyText}`}>{resource!.targetAudience}</p></div>
            <section><h2 className="text-xl font-extrabold">What you’ll find</h2><ul className={`mt-3 list-disc space-y-2 pl-6 leading-7 ${bodyText}`}>{resource!.keyHighlights.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h2 className="text-xl font-extrabold">Ways to use this resource</h2><ul className={`mt-3 list-disc space-y-2 pl-6 leading-7 ${bodyText}`}>{resource!.useCases.map((item) => <li key={item}>{item}</li>)}</ul></section>
            {resource!.previewContent?.length ? <section><h2 className="text-xl font-extrabold">Preview</h2><div className={`mt-3 space-y-3 leading-7 ${bodyText}`}>{resource!.previewContent.map((item) => <p key={item}>{item}</p>)}</div></section> : null}
            <button type="button" onClick={() => downloadResource(resource!)} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-3 text-sm font-bold text-white"><Download className="h-4 w-4" /> Download / print guide</button>
          </div>
        )}
        <div className={`mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl border p-6 sm:flex-row sm:items-center ${surface}`}>
          <p className={`text-sm ${bodyText}`}>Want to put these ideas into practice with guided training?</p>
          <button type="button" onClick={() => openBookingModal({ program: post?.category ?? resource!.category })} className="rounded-xl bg-[var(--accent-red)] px-5 py-3 text-sm font-bold text-white">Ask about training</button>
        </div>
      </article>
    </main>
  );
};
