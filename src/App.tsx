import React, { Suspense, lazy, useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { PageRoute, ProgramPillar, TrainingProgram, ResourceItem, BlogPost } from './types';
import { resolveRoute } from './utils/routes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToHash } from './components/ScrollToHash';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const MarketingHomePage = lazy(() => import('./pages/MarketingHomePage').then(m => ({ default: m.MarketingHomePage })));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then(m => ({ default: m.FeaturesPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })));
const ProgramDeepDivePage = lazy(() => import('./pages/ProgramDeepDivePage').then(m => ({ default: m.ProgramDeepDivePage })));
const LearningFormatsPage = lazy(() => import('./pages/LearningFormatsPage').then(m => ({ default: m.LearningFormatsPage })));
const ForOrganizationsPage = lazy(() => import('./pages/ForOrganizationsPage').then(m => ({ default: m.ForOrganizationsPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const VibeCodingPage = lazy(() => import('./pages/VibeCodingPage').then(m => ({ default: m.VibeCodingPage })));
const DevPadPage = lazy(() => import('./pages/DevPadPage').then(m => ({ default: m.DevPadPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));

import { PriceStrip } from './components/PriceStrip';
import { useApp } from './context/AppContext';
import { blogPostsData } from './data/blog';
import { siteConfig } from './config/site';
import { buildOrganizationSchema } from './utils/schema';

const organizationSchema = buildOrganizationSchema({
  name: siteConfig.academyName,
  url: 'https://academy.cyberswahili.co.tz',
  email: siteConfig.email,
  telephone: siteConfig.phone,
  foundingDate: String(siteConfig.establishedYear),
  alternateName: siteConfig.parentOrg,
  logo: 'https://academy.cyberswahili.co.tz/favicon.svg',
  areaServed: ['Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'DRC'],
  address: {
    addressLocality: 'Dar es Salaam',
    addressCountry: 'TZ'
  },
  sameAs: [
    siteConfig.socialLinks.linkedin,
    siteConfig.socialLinks.youtube,
    siteConfig.socialLinks.whatsapp
  ]
});

const BookingModal = React.memo(lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal }))));
const ProgramDetailModal = React.memo(lazy(() => import('./components/ProgramDetailModal').then(m => ({ default: m.ProgramDetailModal }))));
const TrainingDetailModal = React.memo(lazy(() => import('./components/TrainingDetailModal').then(m => ({ default: m.TrainingDetailModal }))));
const ResourceViewModal = React.memo(lazy(() => import('./components/ResourceViewModal').then(m => ({ default: m.ResourceViewModal }))));
const BlogArticleModal = React.memo(lazy(() => import('./components/BlogArticleModal').then(m => ({ default: m.BlogArticleModal }))));

interface AppChromeProps {
  theme: 'dark' | 'light';
  currentRoute: PageRoute;
  openBookingModal: () => void;
  page: React.ReactNode;
}

const AppChrome = React.memo(function AppChrome({ theme, currentRoute, openBookingModal, page }: AppChromeProps) {
  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased scroll-smooth overflow-x-hidden ${theme === 'dark' ? 'bg-[var(--bg-primary)] text-white selection:bg-[var(--accent-red)] selection:text-white' : 'bg-[var(--bg-primary)] text-neutral-900 selection:bg-[var(--accent-red)] selection:text-white'}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar currentRoute={currentRoute} openBookingModal={openBookingModal} />
      <div id="main-content" tabIndex={-1} className="flex-grow overflow-x-hidden pb-20 outline-none md:pb-0">
        <div key={currentRoute} className="page-enter">
          <ErrorBoundary key={currentRoute}><Suspense fallback={<div className="min-h-[40vh]" aria-busy="true" aria-label="Loading page" />}>{page}</Suspense></ErrorBoundary>
        </div>
      </div>
      <Footer currentRoute={currentRoute} openBookingModal={openBookingModal} />
      <BackToTop />
      <ScrollProgress />
      <ScrollToHash />
    </div>
  );
});

export default function App() {
  const location = useLocation();
  const { theme } = useApp();

  // Derive the current route from the browser URL so refresh, sharing, and
  // back/forward all work. The whole tree reads this the same way it read
  // the old useState<PageRoute> value.
  const currentRoute: PageRoute = resolveRoute(location.pathname);

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

  const anyModalOpen =
    isBookingModalOpen || !!selectedProgram || !!selectedTraining || !!selectedResource || !!selectedBlogArticle;

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
    document.body.style.overflow = anyModalOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [anyModalOpen]);

  const handleOpenBooking = useCallback((prefill?: {
    program?: string;
    format?: string;
    duration?: string;
    organizationType?: string;
  }) => {
    setBookingPrefill(prefill);
    setIsBookingModalOpen(true);
  }, []);

  const handleOpenProgramModal = useCallback((program: ProgramPillar) => setSelectedProgram(program), []);
  const handleOpenTrainingModal = useCallback((training: TrainingProgram) => setSelectedTraining(training), []);
  const handleOpenResourceModal = useCallback((resource: ResourceItem) => setSelectedResource(resource), []);
  const handleOpenBlogArticleModal = useCallback((post: BlogPost) => setSelectedBlogArticle(post), []);
  const openBookingFromChrome = useCallback(() => handleOpenBooking(), [handleOpenBooking]);
  const closeBookingModal = useCallback(() => setIsBookingModalOpen(false), []);
  const closeProgramModal = useCallback(() => setSelectedProgram(null), []);
  const closeTrainingModal = useCallback(() => setSelectedTraining(null), []);
  const closeResourceModal = useCallback(() => setSelectedResource(null), []);
  const closeBlogModal = useCallback(() => setSelectedBlogArticle(null), []);

  const page = useMemo(() => {
    switch (currentRoute) {
      case 'home':
        return <MarketingHomePage openBookingModal={handleOpenBooking} />;
      case 'academy':
        return (
          <HomePage
            openBookingModal={handleOpenBooking}
            openProgramModal={handleOpenProgramModal}
            openTrainingDetailModal={handleOpenTrainingModal}
            openResourceModal={handleOpenResourceModal}
            openBlogArticleModal={handleOpenBlogArticleModal}
          />
        );
      case 'features':
        return <FeaturesPage openBookingModal={handleOpenBooking} />;
      case 'pricing':
        return <PricingPage openBookingModal={handleOpenBooking} />;
      case 'programs':
        return (
          <ProgramsPage
            openProgramModal={handleOpenProgramModal}
            openBookingModal={handleOpenBooking}
          />
        );
      case 'programs/ai':
        return <ProgramDeepDivePage slug="ai" openBookingModal={handleOpenBooking} />;
      case 'programs/cybersecurity':
        return <ProgramDeepDivePage slug="cybersecurity" openBookingModal={handleOpenBooking} />;
      case 'programs/digital-skills':
        return <ProgramDeepDivePage slug="digital-skills" openBookingModal={handleOpenBooking} />;
      case 'vibe-coding':
        return <VibeCodingPage openBookingModal={handleOpenBooking} />;
      case 'devpad':
        return <DevPadPage openBookingModal={handleOpenBooking} />;
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
        return <ContactPage openBookingModal={handleOpenBooking} />;
      case 'privacy':
        return <LegalPage kind="privacy" />;
      case 'terms':
        return <LegalPage kind="terms" />;
      case 'not-found':
        return <NotFound />;
      default:
        return (
          <HomePage
            openBookingModal={handleOpenBooking}
            openProgramModal={handleOpenProgramModal}
            openTrainingDetailModal={handleOpenTrainingModal}
            openResourceModal={handleOpenResourceModal}
            openBlogArticleModal={handleOpenBlogArticleModal}
          />
        );
    }
  }, [currentRoute, handleOpenBooking, handleOpenProgramModal, handleOpenTrainingModal, handleOpenResourceModal, handleOpenBlogArticleModal]);

  return (
    <ErrorBoundary>
      <AppChrome theme={theme} currentRoute={currentRoute} openBookingModal={openBookingFromChrome} page={page} />
      <Suspense fallback={null}>
        {isBookingModalOpen && <BookingModal
          isOpen={isBookingModalOpen}
          onClose={closeBookingModal}
          prefill={bookingPrefill}
        />}

        {selectedProgram && <ProgramDetailModal
          program={selectedProgram}
          onClose={closeProgramModal}
          openBookingModal={handleOpenBooking}
        />}

        {selectedTraining && <TrainingDetailModal
          training={selectedTraining}
          onClose={closeTrainingModal}
          openBookingModal={handleOpenBooking}
        />}

        {selectedResource && <ResourceViewModal
          resource={selectedResource}
          onClose={closeResourceModal}
        />}

        {selectedBlogArticle && <BlogArticleModal
          post={selectedBlogArticle}
          onClose={closeBlogModal}
          openBookingModal={handleOpenBooking}
        />}
      </Suspense>

        <PriceStrip variant="sticky-mobile" openBookingModal={openBookingFromChrome} />
    </ErrorBoundary>
  );
}
