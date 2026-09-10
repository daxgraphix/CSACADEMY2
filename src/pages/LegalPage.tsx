import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import { PageRoute } from '../types';
import { useApp } from '../context/AppContext';

interface LegalPageProps {
  kind: 'privacy' | 'terms';
  setCurrentRoute: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ kind, setCurrentRoute }) => {
  const { theme } = useApp();
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const Icon = isPrivacy ? ShieldCheck : FileText;

  return (
    <main className={`min-h-screen pt-28 pb-20 transition-colors ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
    }`}>
      <Helmet>
        <title>{title} | CS Academy</title>
        <meta name="description" content={`${title} for CS Academy learners, customers, and training partners.`} />
      </Helmet>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentRoute('home')}
          className={`mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${
            theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-700 hover:text-neutral-950'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to CS Academy
        </button>

        <article className={`rounded-3xl border p-5 sm:p-8 lg:p-12 shadow-xl ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-200'
        }`}>
          <div className={`flex items-start gap-4 border-b pb-6 sm:gap-5 ${theme === 'dark' ? 'border-white/10' : 'border-neutral-200'}`}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-red-strong)]">CS Academy</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
              <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Last updated: September 10, 2026</p>
            </div>
          </div>

          {isPrivacy ? (
            <div className="prose-content mt-8 space-y-7 text-sm leading-relaxed">
              <section><h2>What this policy covers</h2><p>CS Academy collects only the information needed to respond to enquiries, arrange training, provide learning resources, process payments, and improve the learner experience.</p></section>
              <section><h2>Information you provide</h2><p>This may include your name, email address, phone number, organization, learning interests, preferred format, and messages submitted through our booking or contact forms.</p></section>
              <section><h2>How we use information</h2><p>We use submitted details to communicate with you, prepare training recommendations, deliver requested services, support payments, and send updates when you choose to subscribe. We do not sell personal information.</p></section>
              <section><h2>Sharing and security</h2><p>We share information only with service providers needed to deliver the requested service, such as communication, payment, hosting, or form-processing providers. We use reasonable safeguards, but no online service can guarantee absolute security.</p></section>
              <section><h2>Your choices</h2><p>You can request access, correction, or deletion of your information, or unsubscribe from optional updates. Contact us through the details in the footer to make a request.</p></section>
            </div>
          ) : (
            <div className="prose-content mt-8 space-y-7 text-sm leading-relaxed">
              <section><h2>Using CS Academy</h2><p>CS Academy provides practical technology education, training coordination, resources, and related digital services. You agree to provide accurate information and use the platform respectfully and lawfully.</p></section>
              <section><h2>Enrollment and payment</h2><p>Course availability, schedules, fees, and delivery formats may vary. Enrollment is confirmed after the requested details are reviewed and payment or another agreed arrangement is completed. Any payment terms will be communicated before confirmation.</p></section>
              <section><h2>Learning content</h2><p>Course materials are provided for personal or agreed organizational learning. Do not copy, resell, redistribute, or present CS Academy materials as your own without written permission.</p></section>
              <section><h2>Practical outcomes</h2><p>We provide instruction, practice, and guidance. Results depend on participation, practice, prior experience, and other factors, so no employment, income, or business outcome is guaranteed.</p></section>
              <section><h2>Questions</h2><p>For booking changes, access issues, or service questions, contact CS Academy before taking action based on a course or resource. We may update these terms when our services change.</p></section>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};