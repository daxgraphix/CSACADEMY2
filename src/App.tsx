import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageRoute, ProgramPillar, TrainingProgram, ResourceItem, BlogPost } from './types';
import { routeToPath, resolveRoute } from './utils/routes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';

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
import { DevPadPage } from './pages/DevPadPage';

import { BookingModal } from './components/BookingModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { TrainingDetailModal } from './components/TrainingDetailModal';
import { ResourceViewModal } from './components/ResourceViewModal';
import { BlogArticleModal } from './components/BlogArticleModal';
import { PriceStrip } from './components/PriceStrip';
import { useApp } from './context/AppContext';
import { blogPostsData } from './data/blog';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useApp();

  // Derive the current route from the browser URL so refresh, sharing, and
  // back/forward all work. The whole tree reads this the same way it read
  // the old useState<PageRoute> value.
  const currentRoute: PageRoute = resolveRoute(location.pathname);

  // navigateTo preserves the original (route: PageRoute) => void signature,
  // so every child that still receives setCurrentRoute works unchanged.
  const setCurrentRoute = useCallback(
    (route: PageRoute) => {
      navigate(routeToPath[route]);
    },
    [navigate]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

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

  const anyModalOpen = useMemo(() =>
    isBookingModalOpen || !!selectedProgram || !!selectedTraining || !!selectedResource || !!selectedBlogArticle,
    [isBookingModalOpen, selectedProgram, selectedTraining, selectedResource, selectedBlogArticle]
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      const target = blogPostsData.find((p) => p.id === detail.id);
      if (target) {
        setSelectedBlogArticle(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('cs:open-blog', handler as EventListener);
    return () => window.removeEventListener('cs:open-blog', handler as EventListener);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (isBookingModalOpen) setIsBookingModalOpen(false);
      if (selectedProgram) setSelectedProgram(null);
      if (selectedTraining) setSelectedTraining(null);
      if (selectedResource) setSelectedResource(null);
      if (selectedBlogArticle) setSelectedBlogArticle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isBookingModalOpen, selectedProgram, selectedTraining, selectedResource, selectedBlogArticle]);

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [anyModalOpen]);

  const handleOpenBooking = (prefill?: {
    program?: string;
    format?: string;
    duration?: string;
    organizationType?: string;
  }) => {
    setBookingPrefill(prefill);
    setIsBookingModalOpen(true);
  };

  const handleOpenProgramModal = (program: ProgramPillar) => setSelectedProgram(program);
  const handleOpenTrainingModal = (training: TrainingProgram) => setSelectedTraining(training);
  const handleOpenResourceModal = (resource: ResourceItem) => setSelectedResource(resource);
  const handleOpenBlogArticleModal = (post: BlogPost) => setSelectedBlogArticle(post);

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
        return <FeaturesPage setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'pricing':
        return <PricingPage setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'programs':
        return (
          <ProgramsPage
            setCurrentRoute={setCurrentRoute}
            openProgramModal={handleOpenProgramModal}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'programs/ai':
        return <ProgramDeepDivePage slug="ai" setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'programs/cybersecurity':
        return <ProgramDeepDivePage slug="cybersecurity" setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'programs/digital-skills':
        return <ProgramDeepDivePage slug="digital-skills" setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'vibe-coding':
        return <VibeCodingPage setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'devpad':
        return <DevPadPage setCurrentRoute={setCurrentRoute} openBookingModal={handleOpenBooking} />;
      case 'learning-formats':
        return <LearningFormatsPage openBookingModal={handleOpenBooking} />;
      case 'for-organizations':
        return <ForOrganizationsPage openBookingModal={handleOpenBooking} />;
      case 'resources':
        return <ResourcesPage openResourceModal={handleOpenResourceModal} />;
      case 'blog':
        return <BlogPage openBlogArticleModal={handleOpenBlogArticleModal} />;
      case 'about':
        return <AboutPage openBookingModal={handleOpenBooking} />;
      case 'contact':
        return <ContactPage openBookingModal={() => handleOpenBooking()} />;
      case 'not-found':
        return <NotFound setCurrentRoute={setCurrentRoute} />;
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
    <ErrorBoundary>
      <div
        className={`min-h-screen flex flex-col font-sans antialiased scroll-smooth overflow-x-hidden ${
          theme === 'dark'
            ? 'bg-[var(--bg-primary)] text-white selection:bg-[var(--accent-red)] selection:text-white'
            : 'bg-[var(--bg-primary)] text-neutral-900 selection:bg-[var(--accent-red)] selection:text-white'
        }`}
      >
        <Navbar
          currentRoute={currentRoute}
          setCurrentRoute={setCurrentRoute}
          openBookingModal={() => handleOpenBooking()}
        />

        <div className="flex-grow overflow-x-hidden pb-20 md:pb-0">
          <div key={currentRoute} className="page-enter">
            {renderCurrentPage()}
          </div>
        </div>

        <Footer
          setCurrentRoute={setCurrentRoute}
          openBookingModal={() => handleOpenBooking()}
        />

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
        <PriceStrip variant="sticky-mobile" openBookingModal={() => handleOpenBooking()} />
      </div>
    </ErrorBoundary>
  );
}
