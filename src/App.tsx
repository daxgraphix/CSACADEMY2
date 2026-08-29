import React, { useState } from 'react';
import { PageRoute, ProgramPillar, TrainingProgram, ResourceItem, BlogPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';

// Pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { PricingPage } from './pages/PricingPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDeepDivePage } from './pages/ProgramDeepDivePage';
import { LearningFormatsPage } from './pages/LearningFormatsPage';
import { ForOrganizationsPage } from './pages/ForOrganizationsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { VibeCodingPage } from './pages/VibeCodingPage';

// Modals
import { BookingModal } from './components/BookingModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { TrainingDetailModal } from './components/TrainingDetailModal';
import { ResourceViewModal } from './components/ResourceViewModal';
import { BlogArticleModal } from './components/BlogArticleModal';
import { useApp } from './context/AppContext';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const { theme } = useApp();
  
  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    program?: string;
    format?: string;
    duration?: string;
    organizationType?: string;
  } | undefined>(undefined);

  const [selectedProgram, setSelectedProgram] = useState<ProgramPillar | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<TrainingProgram | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<BlogPost | null>(null);

  // Modal Triggers
  const handleOpenBooking = (prefill?: {
    program?: string;
    format?: string;
    duration?: string;
    organizationType?: string;
  }) => {
    setBookingPrefill(prefill);
    setIsBookingModalOpen(true);
  };

  const handleOpenProgramModal = (program: ProgramPillar) => {
    setSelectedProgram(program);
  };

  const handleOpenTrainingModal = (training: TrainingProgram) => {
    setSelectedTraining(training);
  };

  const handleOpenResourceModal = (resource: ResourceItem) => {
    setSelectedResource(resource);
  };

  const handleOpenBlogArticleModal = (post: BlogPost) => {
    setSelectedBlogArticle(post);
  };

  // Render active page based on route
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return (
          <HomePage
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
            openProgramModal={handleOpenProgramModal}
            openTrainingDetailModal={handleOpenTrainingModal}
            openResourceModal={handleOpenResourceModal}
            openBlogArticleModal={handleOpenBlogArticleModal}
          />
        );
      case 'features':
        return (
          <FeaturesPage
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'pricing':
        return (
          <PricingPage
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'programs':
        return (
          <ProgramsPage
            setCurrentRoute={setCurrentRoute}
            openProgramModal={handleOpenProgramModal}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'programs/ai':
        return (
          <ProgramDeepDivePage
            slug="ai"
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'programs/cybersecurity':
        return (
          <ProgramDeepDivePage
            slug="cybersecurity"
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'programs/digital-skills':
        return (
          <ProgramDeepDivePage
            slug="digital-skills"
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'vibe-coding':
        return (
          <VibeCodingPage
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'learning-formats':
        return (
          <LearningFormatsPage
            openBookingModal={handleOpenBooking}
          />
        );
      case 'for-organizations':
        return (
          <ForOrganizationsPage
            openBookingModal={handleOpenBooking}
          />
        );
      case 'resources':
        return (
          <ResourcesPage
            openResourceModal={handleOpenResourceModal}
          />
        );
      case 'blog':
        return (
          <BlogPage
            openBlogArticleModal={handleOpenBlogArticleModal}
          />
        );
      case 'about':
        return (
          <AboutPage
            openBookingModal={handleOpenBooking}
          />
        );
      case 'contact':
        return (
          <ContactPage
            openBookingModal={() => handleOpenBooking()}
          />
        );
      default:
        return (
          <HomePage
            setCurrentRoute={setCurrentRoute}
            openBookingModal={handleOpenBooking}
            openProgramModal={handleOpenProgramModal}
            openTrainingDetailModal={handleOpenTrainingModal}
            openResourceModal={handleOpenResourceModal}
            openBlogArticleModal={handleOpenBlogArticleModal}
          />
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 scroll-smooth ${
        theme === 'dark'
          ? 'bg-[#090909] text-white selection:bg-[#DC2626] selection:text-white'
          : 'bg-[#f7f4ee] text-neutral-900 selection:bg-[#ff3b30] selection:text-white'
      }`}
    >
      {/* Fixed Navigation Header */}
      <Navbar
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
        openBookingModal={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <div className="flex-grow">
        {renderCurrentPage()}
      </div>

      {/* Site Footer */}
      <Footer
        setCurrentRoute={setCurrentRoute}
        openBookingModal={() => handleOpenBooking()}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefill={bookingPrefill}
      />

      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        openBookingModal={handleOpenBooking}
      />

      <TrainingDetailModal
        training={selectedTraining}
        onClose={() => setSelectedTraining(null)}
        openBookingModal={handleOpenBooking}
      />

      <ResourceViewModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      <BlogArticleModal
        post={selectedBlogArticle}
        onClose={() => setSelectedBlogArticle(null)}
        openBookingModal={handleOpenBooking}
      />

      <BackToTop />
      <ScrollProgress />
    </div>
  );
}
