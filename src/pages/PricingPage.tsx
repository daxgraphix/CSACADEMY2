import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PricingSection } from '../components/PricingSection';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { PageBreadcrumbs } from '../components/LayoutPrimitives';
import { PricingFaqSection } from '../components/PricingFaqSection';

interface PricingPageProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();
  const canonical = useCanonicalUrl();

  return (
    <>
      <Helmet>
        <title>Pricing & Plans | CS Academy | Transparent Fees in TZS, KES, USD</title>
        <meta name="description" content="Compare CS Academy monthly and annual learning plans, workshops, and team training in TZS, KES, and USD. Confirm availability, scope, and payment details with our team." />
        <meta name="keywords" content="CS Academy pricing, TZS pricing, AI course cost Tanzania, cybersecurity training fees, digital skills subscription, affordable tech training East Africa" />
        <meta property="og:title" content="Pricing & Plans | CS Academy" />
        <meta name="twitter:title" content="Pricing & Plans | CS Academy" />
        <meta property="og:description" content="Compare monthly and annual learning plans, workshops, and team training in TZS, KES, and USD." />
        <meta name="twitter:description" content="Compare monthly and annual learning plans, workshops, and team training in TZS, KES, and USD." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <main className={`min-h-screen pt-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <PageBreadcrumbs
            theme={theme}
            items={[{ label: 'Home', route: '/' }, { label: 'Pricing' }]}
          />
        </div>

        {/* Main Pricing Section */}
        <PricingSection />

        {/* Pricing FAQ (also emits FAQPage structured data) */}
        <PricingFaqSection openBookingModal={openBookingModal} />
      </main>
    </>
  );
};
