import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageRoute, ProgramPillar, TrainingProgram, ResourceItem, BlogPost } from '../types';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { Hero } from '../components/Hero';
import { AudienceStrip } from '../components/AudienceStrip';
import { ProgramsOverview } from '../components/ProgramsOverview';
import { SmartFramework } from '../components/SmartFramework';
import { FeaturedTraining } from '../components/FeaturedTraining';
import { DevPadTile } from '../components/DevPadTile';
import { PlatformFeaturesSection } from '../components/PlatformFeaturesSection';
import { LearningFormatsSection } from '../components/LearningFormatsSection';
import { ForOrganizationsSection } from '../components/ForOrganizationsSection';
import { TrainingPackages } from '../components/TrainingPackages';
import { TrainingProcess } from '../components/TrainingProcess';
import { WhyCSAcademy } from '../components/WhyCSAcademy';
import { SocialProof } from '../components/SocialProof';
import { ResourcesSection } from '../components/ResourcesSection';
import { BlogSection } from '../components/BlogSection';
import { AboutSection } from '../components/AboutSection';
import { FAQSection } from '../components/FAQSection';
import { ContactCTA } from '../components/ContactCTA';

interface HomePageProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string; format?: string; duration?: string; organizationType?: string }) => void;
  openProgramModal: (program: ProgramPillar) => void;
  openTrainingDetailModal: (training: TrainingProgram) => void;
  openResourceModal: (resource: ResourceItem) => void;
  openBlogArticleModal: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentRoute,
  openBookingModal,
  openProgramModal,
  openTrainingDetailModal,
  openResourceModal,
  openBlogArticleModal
}) => {
  const canonical = useCanonicalUrl();
  return (
    <main className="w-full">
      <Helmet>
        <title>CS Academy</title>
        <meta name="description" content="Learn AI, cybersecurity, web development, and digital skills through hands-on projects. English-first AI education with local language support. M-Pesa payments. 1,200+ graduates." />
        <meta name="keywords" content="AI training Tanzania, cybersecurity courses Kenya, web development East Africa, digital skills training, vibe coding Africa, AI education, M-Pesa payment, practical tech skills" />
        <meta property="og:title" content="CS Academy" />
        <meta property="og:description" content="Learn AI, cybersecurity, web development, and digital skills through hands-on projects. English-first education with local language support. M-Pesa payments. 1,200+ graduates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://academy.cyberswahili.co.tz/og-image.jpg" />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* 1. Hero Section */}
      <Hero 
        setCurrentRoute={setCurrentRoute} 
        openBookingModal={() => openBookingModal()} 
      />

      {/* 2. Trust / Audience Strip */}
      <AudienceStrip />

      {/* 3. Core Programs Section (3 Major Pillars) */}
      <ProgramsOverview 
        setCurrentRoute={setCurrentRoute}
        openProgramModal={openProgramModal}
        openBookingModal={openBookingModal}
      />

      {/* 4. CS Academy Method: THE AI SMART FRAMEWORK */}
      <SmartFramework />

      {/* 5. Featured Training (6 Courses) */}
      <FeaturedTraining 
        openBookingModal={openBookingModal}
        openTrainingDetailModal={openTrainingDetailModal}
      />

      {/* 5b. DevPad Community Tile */}
      <DevPadTile
        setCurrentRoute={setCurrentRoute}
        openBookingModal={() => openBookingModal({ program: 'DevPad Developer Community' })}
      />

      {/* 6. Social Proof / Decision Confidence */}
      <SocialProof />

      {/* 7. Platform Features (Everything You Need to Succeed) */}
      <PlatformFeaturesSection 
        openBookingModal={openBookingModal}
      />

      {/* 7. Learning Formats (6 Formats) */}
      <LearningFormatsSection
        openBookingModal={openBookingModal}
      />

      {/* 8. For Organizations (Corporate AI, Governance, Briefings) */}
      <ForOrganizationsSection 
        openBookingModal={openBookingModal}
      />

      {/* 8. Training Packages (Modular engagement tiers) */}
      <TrainingPackages 
        openBookingModal={openBookingModal}
      />

      {/* 9. Training Process (How We Work - 5 Steps) */}
      <TrainingProcess />

      {/* 10. Why CS Academy (10 Differentiators) */}
      <WhyCSAcademy 
        openBookingModal={openBookingModal}
      />

      {/* 11. Free Resources (8 Downloadable Guides & Checklists) */}
      <ResourcesSection 
        openResourceModal={openResourceModal}
      />

      {/* 12. Blog & Articles (7 Educational Pieces) */}
      <BlogSection 
        openBlogArticleModal={openBlogArticleModal}
      />

      {/* 13. About CS Academy & Founder Profile */}
      <AboutSection 
        openBookingModal={openBookingModal}
      />

      {/* 14. FAQ Section */}
      <FAQSection />

      {/* 15. Final Conversion Contact CTA */}
      <ContactCTA 
        openBookingModal={() => openBookingModal()}
      />
    </main>
  );
};
