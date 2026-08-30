import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import {
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Send
} from 'lucide-react';

interface ContactPageProps {
  openBookingModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [interest, setInterest] = useState('AI Academy Flagship');
  const [delivery, setDelivery] = useState('Live Online (Zoom/Google Meet)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoBody = `Hello CS Academy Team,\n\nI would like to inquire about training:\nName: ${name}\nEmail: ${email}\nOrganization: ${org || 'N/A'}\nProgram Interest: ${interest}\nPreferred Format: ${delivery}\nMessage / Objectives: ${message}\n\nPlease share availability and enrollment details.`;

    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Training Request: ${interest} | ${name}`
    )}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const whatsappDirect = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hello CS Academy, I would like to inquire about training programs for myself / my organization."
  )}`;

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>Contact Us | CS Academy - AI & Cybersecurity Training</title>
        <meta name="description" content="Contact CS Academy for AI training, cybersecurity courses, and digital skills programs in East Africa. Get in touch for enrollment, corporate training, or partnership inquiries." />
        <meta name="keywords" content="contact CS Academy, AI training inquiry, cybersecurity course enrollment, digital skills training East Africa, booking a training session" />
        <meta property="og:title" content="Contact Us | CS Academy" />
        <meta property="og:description" content="Contact CS Academy for AI training, cybersecurity courses, and digital skills programs in East Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
            theme === 'dark'
              ? 'bg-red-950/60 border border-red-900/60 text-[var(--accent-red-strong)]'
              : 'bg-red-50 border border-red-200 text-[var(--accent-red-strong)]'
          }`}>
            <span>Get in Touch</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            CONTACT <span className="text-[var(--accent-red-strong)]">CS ACADEMY</span>
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            Reach out for individual enrollment, customized organizational workshops, or executive speaking engagements.
          </p>
        </div>

        {/* 2-Column Contact & Interactive Form */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* Left Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`border rounded-3xl p-8 space-y-6 shadow-2xl ${
              theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-300'
            }`}>
              <h2 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Direct Communication Channels
              </h2>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={`p-4 rounded-2xl border transition-colors flex items-center gap-4 group ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[var(--accent-red-strong)] shrink-0 ${
                    theme === 'dark' ? 'bg-neutral-900' : 'bg-red-50 border border-red-100'
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className={`text-[10px] uppercase font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      Email Address
                    </div>
                    <div className={`text-xs font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                      {siteConfig.email}
                    </div>
                  </div>
                </a>

                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border transition-colors flex items-center gap-4 group ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-neutral-700'
                      : 'bg-neutral-50 border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0 ${
                    theme === 'dark' ? 'bg-neutral-900' : 'bg-emerald-50 border border-emerald-100'
                  }`}>
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className={`text-[10px] uppercase font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      WhatsApp Support
                    </div>
                    <div className={`text-xs font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                      {siteConfig.whatsappDisplay}
                    </div>
                  </div>
                </a>

                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    theme === 'dark' ? 'bg-neutral-900 text-neutral-400' : 'bg-white border border-neutral-200 text-neutral-700'
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      Phone Inquiries
                    </div>
                    <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                      {siteConfig.phone}
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[var(--accent-red-strong)] shrink-0 ${
                    theme === 'dark' ? 'bg-neutral-900' : 'bg-red-50 border border-red-100'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-[10px] uppercase font-mono ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      Headquarters & Hub
                    </div>
                    <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                      {siteConfig.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`pt-2 ${theme === 'dark' ? 'border-t border-[var(--border-color)]' : 'border-t border-neutral-200'}`}>
                <button
                  onClick={openBookingModal}
                  className="w-full py-3.5 px-4 text-xs font-extrabold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-xl transition-all uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Launch Quick Booking Wizard</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Detailed Form (7 cols) */}
          <div className={`lg:col-span-7 border rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-300'
          }`}>
            <div>
              <h2 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Send a Training Inquiry
              </h2>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                Our training coordinators respond within 24 business hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Neema K"
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-[var(--accent-red)] ${
                      theme === 'dark'
                        ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500 border-[var(--border-color)]'
                        : 'bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. neema@organization.org"
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-[var(--accent-red)] ${
                      theme === 'dark'
                        ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500 border-[var(--border-color)]'
                        : 'bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                    Company / University / Self
                  </label>
                  <input
                    type="text"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="e.g. East Africa Bank"
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-[var(--accent-red)] ${
                      theme === 'dark'
                        ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500 border-[var(--border-color)]'
                        : 'bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                    Preferred Delivery Format
                  </label>
                  <select
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-[var(--accent-red)] ${
                      theme === 'dark'
                        ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]'
                        : 'bg-white text-neutral-900 border-neutral-300'
                    }`}
                  >
                    <option value="Live Online (Zoom/Google Meet)">Live Online (Zoom/Google Meet)</option>
                    <option value="Physical On-Site Training">Physical On-Site Training</option>
                    <option value="WhatsApp Micro-Learning">WhatsApp Micro-Learning</option>
                    <option value="Hybrid (Online + In-Person)">Hybrid (Online + In-Person)</option>
                    <option value="Executive Briefing / Keynote">Executive Briefing / Keynote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  Program Track of Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-[var(--accent-red)] ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]'
                      : 'bg-white text-neutral-900 border-neutral-300'
                  }`}
                >
                  <option value="AI Academy Flagship">AI Academy Flagship</option>
                  <option value="Cybersecurity Academy">Cybersecurity Academy</option>
                  <option value="Digital Skills Academy">Digital Skills Academy</option>
                  <option value="AI for Business & Corporate Teams">AI for Business & Corporate Teams</option>
                  <option value="AI for Educators & University Faculty">AI for Educators & University Faculty</option>
                  <option value="AI Safety & Deepfake Defense">AI Safety & Deepfake Defense</option>
                  <option value="Executive Briefing with Alex Rweyemamu">Executive Briefing with Alex Rweyemamu</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  Objectives & Notes
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your cohort size, target dates, or specific departmental requirements..."
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs focus:outline-none focus:border-[var(--accent-red)] ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500 border-[var(--border-color)]'
                      : 'bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Training Inquiry</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  </>
  );
};
