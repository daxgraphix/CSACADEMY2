import React from 'react';
import { ArrowRight, BookOpen, Building2, Compass, FileText, GraduationCap, Layers3, Newspaper, Wallet } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';

const destinations = [
  { href: '/programs', title: 'Programs & courses', detail: 'Explore AI, cybersecurity, and digital skills training.', icon: GraduationCap },
  { href: '/pricing', title: 'Pricing & enrollment', detail: 'Compare plans and find the right way to learn.', icon: Wallet },
  { href: '/learning-formats', title: 'Learning formats', detail: 'Choose live, self-paced, team, or on-site delivery.', icon: Layers3 },
  { href: '/for-organizations', title: 'For organizations', detail: 'Plan practical training for your team or institution.', icon: Building2 },
  { href: '/resources', title: 'Free resources', detail: 'Read and download practical learning toolkits.', icon: FileText },
  { href: '/blog', title: 'Articles & insights', detail: 'Browse ideas and guidance from CS Academy.', icon: Newspaper },
  { href: '/about', title: 'About the academy', detail: 'Learn about our mission, instructors, and approach.', icon: BookOpen },
  { href: '/contact', title: 'Contact us', detail: 'Ask a question or discuss a training need.', icon: Compass }
];

export const HomePage: React.FC = () => {
  const { theme } = useApp();
  const canonical = useCanonicalUrl();
  return (
    <main className={`min-h-screen px-4 pb-20 pt-32 ${theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'}`}>
      <Helmet>
        <title>Academy Overview | CS Academy</title>
        <meta name="description" content="Find CS Academy programs, pricing, learning formats, free resources, and practical guidance for individuals and organizations." />
        <meta property="og:title" content="Academy Overview | CS Academy" />
        <meta property="og:description" content="Explore programs, learning formats, resources, and services from CS Academy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">CS Academy</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Find your next step</h1>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Practical technology learning for individuals, teams, and institutions across East Africa. Choose a section to explore the details.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map(({ href, title, detail, icon: Icon }) => (
            <Link key={href} to={href} className={`group rounded-3xl border p-6 transition hover:-translate-y-1 hover:border-[var(--accent-red)] ${theme === 'dark' ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm'}`}>
              <Icon aria-hidden="true" className="h-6 w-6 text-[var(--accent-red-strong)]" />
              <h2 className="mt-5 text-lg font-extrabold">{title}</h2>
              <p className={`mt-2 text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>{detail}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--accent-red-strong)]">Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
