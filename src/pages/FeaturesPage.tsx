import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PlatformFeaturesSection } from '../components/PlatformFeaturesSection';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';

interface FeaturesPageProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>Platform Features | AI & Cybersecurity Learning Platform | CS Academy</title>
        <meta name="description" content="Explore CS Academy's learning formats, course materials, and learner support. Built for learners across East Africa." />
        <meta name="keywords" content="AI learning platform Tanzania, cybersecurity platform Africa, tech courses East Africa, mobile learning East Africa, CS Academy features" />
        <meta property="og:title" content="Platform Features | CS Academy" />
        <meta property="og:description" content="Discover CS Academy's practical AI and cybersecurity learning formats, course materials, and learner support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className={`min-h-screen pt-20 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'
      }`}>
        <PlatformFeaturesSection openBookingModal={openBookingModal} />
      </main>
    </>
  );
};
