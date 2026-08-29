import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { PlatformFeaturesSection } from '../components/PlatformFeaturesSection';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { ArrowRight } from 'lucide-react';

interface FeaturesPageProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();

  return (
    <>
      <Helmet>
        <title>Platform Features | AI & Cybersecurity Learning Platform - CS Academy</title>
        <meta name="description" content="Explore CS Academy's platform: English-first AI courses, QR-verified certificates, 6 delivery channels, and mobile money payment options. Built for East African learners." />
        <meta name="keywords" content="AI learning platform Tanzania, cybersecurity platform Africa, tech courses East Africa, mobile learning East Africa, CS Academy features" />
        <meta property="og:title" content="Platform Features | CS Academy" />
        <meta property="og:description" content="Discover what makes CS Academy East Africa's most accessible AI and cybersecurity learning platform - English-first, mobile-ready, and employer-verified." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className={`pt-20 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
      }`}>
        {/* Platform Features Main Interactive Section */}
        <PlatformFeaturesSection openBookingModal={openBookingModal} />

        {/* Quick Navigation Footer Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
          <div className={`p-8 sm:p-12 rounded-3xl border space-y-4 ${
            theme === 'dark'
              ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]'
              : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <h3 className={`text-2xl sm:text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              Ready to Explore Our Pricing & Plans?
            </h3>
            <p className={`text-sm max-w-xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              Get started for free or upgrade to Premium for full course access, quizzes, certificates, and live sessions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentRoute('pricing')}
                className="px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>View Pricing Plans</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentRoute('programs')}
                className={`px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'text-neutral-300 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
                    : 'text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300'
                }`}
              >
                <span>Browse All Courses</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
