import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PricingSection } from '../components/PricingSection';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
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
        <title>Pricing & Plans | CS Academy - Transparent Fees in TZS, KES, USD</title>
        <meta name="description" content="CS Academy pricing in Tanzanian Shillings, Kenyan Shillings, and US Dollars. Plans start at TZS 20,000/month. Pay with M-Pesa, Tigo Pesa, Airtel Money, or card. WhatsApp-based, self-paced, and live cohort options." />
        <meta name="keywords" content="CS Academy pricing, TZS pricing, M-Pesa payment, AI course cost Tanzania, cybersecurity training fees, digital skills subscription, affordable tech training East Africa" />
        <meta property="og:title" content="Pricing & Plans | CS Academy" />
        <meta property="og:description" content="Transparent membership plans from TZS 20,000/month. Pay with M-Pesa, Tigo Pesa, or card. WhatsApp, self-paced, and live cohort options." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className={`pt-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'
    }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <PageBreadcrumbs
            theme={theme}
            items={[{ label: 'Home', route: '/' }, { label: 'Pricing' }]}
          />
        </div>

        {/* Main Pricing Section */}
        <PricingSection openBookingModal={openBookingModal} />

      {/* Support & Inquiries Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className={`p-8 sm:p-12 rounded-3xl border space-y-4 shadow-sm ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
        }`}>
          <h3 className={`text-2xl sm:text-3xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            Need Help Choosing a Plan or Group Discount?
          </h3>
          <p className={`text-sm max-w-xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Our admissions advisors in Dar es Salaam and Nairobi are available on WhatsApp and email to assist you with payment, invoice requests, or customized team packages.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hello, I need assistance regarding payments and enrolling in CS Academy.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl font-extrabold text-xs text-white bg-emerald-600 hover:bg-emerald-500 uppercase tracking-wider shadow-lg inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({siteConfig.phoneDisplay})</span>
            </a>
            <Link
              to="/contact"
              className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs border uppercase tracking-wider transition-colors ${
                theme === 'dark'
                  ? 'text-neutral-300 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border-[var(--border-color)]'
                  : 'text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-100 transition-colors duration-200 border-neutral-300 shadow-sm'
              }`}
            >
              <span>Contact Admissions Team</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing FAQ (also emits FAQPage structured data) */}
      <PricingFaqSection openBookingModal={openBookingModal} />
    </div>
    </>
  );
};
