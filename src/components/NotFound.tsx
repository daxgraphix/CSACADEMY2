import React from 'react';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { theme } = useApp();
  const contentRef = useReveal<HTMLDivElement>();

  return (
    <>
      <Helmet>
        <title>Page Not Found | CS Academy</title>
        <meta name="description" content="The page you're looking for doesn't exist at CS Academy. Return to our homepage to explore AI, cybersecurity, and digital skills training programs." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Page Not Found | CS Academy" />
        <meta property="og:description" content="The page you're looking for doesn't exist at CS Academy. Return to our homepage to explore AI, cybersecurity, and digital skills training programs." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className={`min-h-screen flex items-center justify-center py-28 px-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-900'
      }`}>
        <div ref={contentRef} className="max-w-2xl mx-auto text-center reveal">
          <div className="mb-8">
            <div className={`text-[12rem] font-black tracking-tight ${
              theme === 'dark' ? 'text-neutral-800' : 'text-neutral-200'
            }`}>
              404
            </div>
            <div className="text-6xl font-black text-[var(--accent-red-strong)] mb-4">
              Page Not Found
            </div>
          </div>

          <p className={`text-lg leading-relaxed mb-10 max-w-md mx-auto ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            The page you're looking for has been moved, removed, or never existed. Don't worry, you can find everything you need from our homepage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--accent-red)] text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_rgba(255,59,48,0.35)] hover:-translate-y-0.5 hover:bg-[var(--accent-red-hover)] transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>BACK TO HOME</span>
            </Link>

            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4" />
              <span>BROWSE RESOURCES</span>
            </Link>
          </div>

          <div className={`mt-10 pt-8 border-t text-xs ${
            theme === 'dark' ? 'border-neutral-800 text-neutral-500' : 'border-neutral-200 text-neutral-600'
          }`}>
            <p>Need help? Contact us at support@cyberswahili.co.tz</p>
          </div>
        </div>
      </div>
    </>
  );
};
