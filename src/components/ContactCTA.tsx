import React from 'react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useReveal } from '../hooks/useReveal';
import {
  Mail,
  MessageCircle,
  ArrowRight,
  Calendar
} from 'lucide-react';

interface ContactCTAProps {
  openBookingModal: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();
  const contentRef = useReveal<HTMLDivElement>();

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello CS Academy, I would like to inquire about training programs for myself / my organization.")}`;

  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Training Inquiry | CS Academy"
  )}&body=${encodeURIComponent(
    "Hello CS Academy Team,\n\nI am interested in exploring training programs. Please share more details on your curriculum, scheduling, and proposals.\n\nName:\nOrganization/Role:\nPreferred Program:\nLocation:\n\nThank you."
  )}`;

  return (
    <section 
      id="contact-section" 
      className={`py-24 border-t transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark' ? 'bg-[#0B0B0B] text-white border-neutral-800' : 'bg-neutral-50 text-neutral-900 border-neutral-200'
      }`}
    >
      {/* Glow */}
      <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 ${
        theme === 'dark' ? 'bg-red-950/20' : 'bg-red-200/40'
      }`}></div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal">
        
        {/* Main CTA Box */}
        <div className={`border rounded-[2rem] p-8 sm:p-14 shadow-2xl relative overflow-hidden site-panel ${
          theme === 'dark' ? 'bg-[#171717] border-neutral-800' : 'bg-white border-neutral-200 shadow-neutral-200'
        }`}>
          
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'bg-red-950/60 border-red-900/60 text-[#DC2626]' : 'bg-red-50 border-red-200 text-[#DC2626]'
              }`}>
                <span>Direct Lead & Training Inquiries</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                {(
                  <>START YOUR <span className="text-[#DC2626]">DIGITAL JOURNEY</span></>
                )}
              </h2>

              <p className={`text-base sm:text-lg leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}>
                Tell us what you want to learn or the training your organization needs. Whether you need a 2-hour executive seminar or a workforce AI bootcamp, our team is ready to assist.
              </p>

              {/* Quick direct contact links */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`p-4 rounded-2xl border transition-colors flex items-center gap-3 group ${
                    theme === 'dark'
                      ? 'bg-[#0B0B0B] border-neutral-800 hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-[#DC2626] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className={`text-[10px] font-mono uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      Direct Email
                    </div>
                    <div className={`text-xs font-bold truncate group-hover:text-[#DC2626] transition-colors ${
                      theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                    }`}>{siteConfig.email}</div>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border transition-colors flex items-center gap-3 group ${
                    theme === 'dark'
                      ? 'bg-[#0B0B0B] border-neutral-800 hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/40 border border-emerald-900/40 flex items-center justify-center text-emerald-500 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className={`text-[10px] font-mono uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      WhatsApp Inquiries
                    </div>
                    <div className={`text-xs font-bold truncate group-hover:text-emerald-500 transition-colors ${
                      theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                    }`}>{siteConfig.whatsappDisplay}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Action Trigger Box (5 cols) */}
            <div className={`lg:col-span-5 border rounded-[1.75rem] p-6 sm:p-8 space-y-4 shadow-xl ${
              theme === 'dark' ? 'bg-[#0B0B0B] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#DC2626] uppercase">
                  Instant Interactive Booking
                </span>
                <h3 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  How would you like to connect?
                </h3>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                  Configure your training request in 60 seconds.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  id="cta-book-training-primary"
                  onClick={openBookingModal}
                  className="w-full py-4 px-5 text-xs font-extrabold text-white bg-[#B91C1C] hover:bg-[#DC2626] active:scale-[0.99] rounded-2xl shadow-lg hover:shadow-red-900/30 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK TRAINING NOW</span>
                </button>

                <a
                  id="cta-whatsapp-academy"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-5 text-xs font-bold rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 uppercase tracking-wider flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'text-neutral-200 hover:text-white bg-[#171717] hover:bg-neutral-800 border-neutral-800'
                      : 'text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-100 transition-colors duration-200 border-neutral-200'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>WHATSAPP US DIRECTLY</span>
                </a>
              </div>

              <div className="pt-2 text-center">
                <p className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                  Tanzania  |  Kenya  |  Uganda  |  Rwanda  |  DRC
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
