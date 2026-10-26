import React from 'react';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search, BookOpen, Mail } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>Page Not Found | CS Academy</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="The page you requested could not be found. Browse CS Academy courses, free resources, and technology training." />
        <meta name="description" content="The page you're looking for doesn't exist at CS Academy. Return to our homepage to explore AI, cybersecurity, and digital skills training programs." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Page Not Found | CS Academy" />
        <meta property="og:description" content="The page you're looking for doesn't exist at CS Academy. Return to our homepage to explore AI, cybersecurity, and digital skills training programs." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className={`min-h-screen flex items-center justify-center py-28 px-4 transition-colors duration-300 ${
        isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-900'
      }`}>
        <div ref={contentRef} className="max-w-2xl mx-auto text-center reveal">
          <div className="mb-8">
            <div className={`text-[12rem] font-black tracking-tight leading-none ${
              isDark ? 'text-neutral-800' : 'text-neutral-200'
            }`}>
              404
            </div>
            <div className="text-4xl sm:text-5xl font-black text-[var(--accent-red-strong)] mb-4">
              Page Not Found
            </div>
          </div>

          <p className={`text-base leading-relaxed mb-10 max-w-md mx-auto ${
            isDark ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            The page you're looking for has been moved, removed, or never existed. Choose one of the links below to continue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent-red)] text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[var(--shadow-red)] hover:-translate-y-0.5 hover:bg-[var(--accent-red-hover)] transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/programs"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5 ${
                isDark ? 'border-[var(--border-strong)] bg-white/[0.04] text-white hover:bg-white/10' : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Programs</span>
            </Link>

            <Link
              to="/resources"
              className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5 ${
                isDark ? 'border-[var(--border-strong)] bg-white/[0.04] text-white hover:bg-white/10' : 'border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Resources</span>
            </Link>
          </div>

          <div className={`mt-10 pt-8 border-t text-xs flex flex-col sm:flex-row items-center justify-center gap-3 ${
            isDark ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-600'
          }`}>
            <span>Need help?</span>
            <a
              href="mailto:support@cyberswahili.co.tz"
              className="inline-flex items-center gap-1.5 font-bold text-[var(--accent-red-strong)] hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              support@cyberswahili.co.tz
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
