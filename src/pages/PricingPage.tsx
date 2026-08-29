import React from 'react';
import { PricingSection } from '../components/PricingSection';
import { PageRoute } from '../types';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';

interface PricingPageProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();

  return (
    <div className={`pt-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0B0B0B] text-white' : 'bg-white text-neutral-900'
    }`}>
      {/* Main Pricing Section */}
      <PricingSection openBookingModal={openBookingModal} />

      {/* Support & Inquiries Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className={`p-8 sm:p-12 rounded-3xl border space-y-4 shadow-sm ${
          theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-neutral-50 border-neutral-300'
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
            <button
              onClick={() => setCurrentRoute('contact')}
              className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs border uppercase tracking-wider transition-colors ${
                theme === 'dark'
                  ? 'text-neutral-300 hover:text-white bg-[#0B0B0B] hover:bg-neutral-800 border-neutral-800'
                  : 'text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-100 transition-colors duration-200 border-neutral-300 shadow-sm'
              }`}
            >
              <span>Contact Admissions Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
