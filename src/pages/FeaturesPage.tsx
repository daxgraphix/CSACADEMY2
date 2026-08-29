import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { PlatformFeaturesSection } from '../components/PlatformFeaturesSection';
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
  return (
    <>
      <Helmet>
        <title>Platform Features | AI & Cybersecurity Learning Platform — CS Academy</title>
        <meta name="description" content="Explore CS Academy's platform: Swahili-first AI courses, QR-verified certificates, 6 delivery channels, and mobile money payment options. Built for East African learners." />
        <meta name="keywords" content="AI learning platform Tanzania, cybersecurity platform Africa, Swahili tech courses, mobile learning East Africa, CS Academy features" />
        <meta property="og:title" content="Platform Features | CS Academy" />
        <meta property="og:description" content="Discover what makes CS Academy East Africa's most accessible AI and cybersecurity learning platform — Swahili-first, mobile-ready, and employer-verified." />
        <meta property="og:type" content="website" />
      </Helmet>

    <div className="pt-20 bg-[#0B0B0B] text-white min-h-screen">
      {/* Platform Features Main Interactive Section */}
      <PlatformFeaturesSection openBookingModal={openBookingModal} />

      {/* Quick Navigation Footer Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#171717] border border-neutral-800 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Explore Our Pricing & Plans?
          </h3>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto">
            Get started for free or upgrade to Premium for full course access, quizzes, certificates, and live sessions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentRoute('pricing')}
              className="px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.98] uppercase tracking-wider shadow-lg inline-flex items-center gap-2"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentRoute('programs')}
              className="px-6 py-3 rounded-xl font-extrabold text-xs text-neutral-300 hover:text-white bg-[#0B0B0B] hover:bg-neutral-800 border border-neutral-800 uppercase tracking-wider transition-colors"
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
