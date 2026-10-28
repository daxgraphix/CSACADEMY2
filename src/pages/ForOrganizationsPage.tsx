import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  corporateOfferingsData,
  industrySolutionsData,
  trainingProcessSteps
} from '../data/organizationIndustries';
import { trainingPackagesData } from '../data/training';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { B2BLeadForm } from '../components/B2BLeadForm';
import {
  Building2,
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Store,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

interface ForOrganizationsPageProps {
  openBookingModal: (prefill?: { program?: string; organizationType?: string; duration?: string }) => void;
}

export const ForOrganizationsPage: React.FC<ForOrganizationsPageProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'Store':
        return <Store className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[var(--accent-red-strong)]" />;
      default:
        return <Building2 className="w-5 h-5 text-[var(--accent-red-strong)]" />;
    }
  };

  const isDark = theme === 'dark';
  const pageBg = isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900';
  const cardBg = isDark ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm';
  const cardInnerBg = isDark ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-200';
  const heading = isDark ? 'text-white' : 'text-neutral-950';
  const body = isDark ? 'text-neutral-300' : 'text-neutral-800';
  const subtle = isDark ? 'text-neutral-400' : 'text-neutral-700';
  const badge = isDark
    ? 'bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)]'
    : 'bg-red-50 border-red-200 text-[var(--accent-red-strong)]';
  const ghostBtn = isDark
    ? 'text-neutral-300 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border-[var(--border-color)]'
    : 'text-neutral-800 hover:text-neutral-900 bg-white hover:bg-neutral-50 border-neutral-300';
  const divider = isDark ? 'border-[var(--border-color)]' : 'border-neutral-200';

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>For Organizations | Corporate AI & Cybersecurity Training | CS Academy</title>
        <meta name="description" content="CS Academy delivers customized AI, cybersecurity, and digital skills training for banks, governments, universities, NGOs, and enterprises across East Africa. Request a corporate proposal today." />
        <meta name="keywords" content="corporate training Tanzania, AI training for banks Africa, institutional tech education, enterprise cybersecurity East Africa, CS Academy organizations" />
        <meta property="og:title" content="For Organizations | CS Academy Corporate Training" />
        <meta name="twitter:title" content="For Organizations | CS Academy Corporate Training" />
        <meta property="og:description" content="Tailored AI and cybersecurity upskilling for banks, government ministries, universities, and NGOs across East Africa." />
        <meta name="twitter:description" content="Tailored AI and cybersecurity upskilling for banks, government ministries, universities, and NGOs across East Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${pageBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${badge}`}>
            <span>Enterprise, Academic &amp; Public Sector Solutions</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${heading}`}>
            FOR <span className="text-[var(--accent-red-strong)]">ORGANIZATIONS</span>
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${body}`}>
            Equip your entire workforce, academic faculty, or institutional leadership with tailored AI capability and cyber resilience.
          </p>
          <div className="pt-2">
            <a
              href="#proposal"
              className="px-8 py-3.5 rounded-full font-extrabold text-xs text-white bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition-all duration-300"
            >
              <span>REQUEST INSTITUTIONAL PROPOSAL</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className={`mx-auto grid max-w-4xl gap-3 pt-4 text-left sm:grid-cols-3 ${body}`}>
            <p className="rounded-xl border border-[var(--border-color)] p-4 text-xs leading-relaxed"><strong className="block text-sm">1. Share the need</strong>Tell us your team size, location, skills gap, and target timing in the inquiry.</p>
            <p className="rounded-xl border border-[var(--border-color)] p-4 text-xs leading-relaxed"><strong className="block text-sm">2. Scope the training</strong>We’ll use your goals and preferred format to shape a relevant curriculum and delivery plan.</p>
            <p className="rounded-xl border border-[var(--border-color)] p-4 text-xs leading-relaxed"><strong className="block text-sm">3. Review a proposal</strong>Get a tailored outline to discuss with your team before making a commitment.</p>
          </div>
        </div>

        {/* Lead capture for scoped proposal requests */}
        <div id="proposal" className="grid gap-8 lg:grid-cols-2 lg:items-start scroll-mt-28">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${badge}`}>
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                Scope confirmed by email
              </span>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${heading}`}>
                Every proposal starts with <span className="text-[var(--accent-red-strong)]">your numbers</span>
              </h2>
              <p className={`text-sm leading-relaxed ${body}`}>
                Tell us your team size, training goals, and preferred timing. We’ll discuss a suitable curriculum,
                delivery format, schedule, and organizational price with you.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                { title: 'Needs assessment snapshot', desc: 'Skill-gap analysis against your actual job roles, not a generic catalogue.' },
                { title: 'Bespoke curriculum outline', desc: 'Modules mapped to your sector, with tools your team already uses.' },
                { title: 'Delivery plan & format', desc: 'On-site, hybrid, or cohort-based scheduled around your operating hours.' },
                { title: 'Budget and delivery outline', desc: 'A clear scope, schedule, delivery format, and pricing proposal for your team.' }
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />
                  <div>
                    <p className={`text-sm font-bold ${heading}`}>{item.title}</p>
                    <p className={`mt-0.5 text-xs leading-relaxed ${subtle}`}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={`rounded-2xl border p-5 ${cardInnerBg}`}>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[var(--accent-red-strong)]" aria-hidden="true" />
                <p className={`text-xs font-extrabold uppercase tracking-wider ${heading}`}>Where we deliver</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Dar es Salaam', 'Nairobi', 'Arusha', 'Mwanza', 'Dodoma', 'Remote across East Africa'].map((city) => (
                  <span key={city} className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${divider} ${subtle}`}>
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <B2BLeadForm />
        </div>

         {/* Corporate Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {corporateOfferingsData.map((item, idx) => (
            <div
              key={idx}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${cardBg} ${isDark ? 'hover:border-[var(--accent-red)]/50' : 'hover:border-[var(--accent-red)]/30'}`}
            >
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)] uppercase">
                  {item.badge}
                </span>
                <h3 className={`text-lg font-bold transition-colors group-hover:text-[var(--accent-red-strong)] ${heading}`}>{item.title}</h3>
                <p className={`text-xs leading-relaxed transition-colors group-hover:${isDark ? 'text-neutral-200' : 'text-neutral-900'}`}>{item.description}</p>

                <div className="space-y-1.5 pt-2">
                  {item.points.map((pt, pIdx) => (
                    <div key={pIdx} className={`flex items-center gap-2 text-xs transition-colors group-hover:${isDark ? 'text-neutral-200' : 'text-neutral-900'} ${body}`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 transition-transform group-hover:scale-110" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t transition-colors duration-300 group-hover:${isDark ? 'border-[var(--accent-red)]/30' : 'border-[var(--accent-red)]/50'} ${divider}`}>
                <button
                  onClick={() => openBookingModal({ program: item.title, organizationType: item.badge })}
                  className="group relative w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all duration-300 hover:bg-[var(--accent-red)] hover:text-white ${ghostBtn}"
                >
                  <span className="relative">
                    Inquire This Track
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-[var(--accent-red)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Industry-Specific Tailoring */}
        <div id="sector-solutions" className="space-y-8 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${heading}`}>
              Solutions by Sector &amp; Industry
            </h2>
            <p className={`text-xs sm:text-sm ${subtle}`}>
              Curricula fine-tuned for the regulatory, operational, and language realities of African institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrySolutionsData.map((sol) => (
              <div
                key={sol.id}
                className={`p-6 rounded-2xl border space-y-4 shadow-lg flex flex-col justify-between ${cardBg}`}
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cardInnerBg}`}>
                    {getIndustryIcon(sol.icon)}
                  </div>
                  <h3 className={`text-lg font-bold ${heading}`}>{sol.name}</h3>
                  <p className={`text-xs leading-relaxed ${body}`}>{sol.description}</p>

                  <div className={`p-3 rounded-xl border text-xs space-y-1 ${cardInnerBg} ${body}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${subtle}`}>Critical Needs:</span>
                    <ul className={`space-y-1 text-[11px] list-disc list-inside pl-1 marker:text-[var(--accent-red-strong)] ${subtle}`}>
                      {sol.criticalNeeds.slice(0, 3).map((need, nIdx) => (
                        <li key={nIdx}>{need}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal({ program: `${sol.name} Customized Program`, organizationType: sol.name })}
                  className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-colors uppercase tracking-wider text-center ${
                    isDark
                      ? 'text-[var(--accent-red-strong)] hover:text-white bg-[var(--bg-primary)] hover:bg-[var(--accent-red-hover)] border-[var(--border-color)]'
                      : 'text-[#B91C1C] hover:text-white bg-white hover:bg-[var(--accent-red-hover)] border-neutral-300'
                  }`}
                >
                  Request {sol.name} Syllabus
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Training Packages */}
        <div id="packages" className="space-y-8 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${heading}`}>
              Corporate &amp; Institutional Package Tiers
            </h2>
            <p className={`text-xs sm:text-sm ${subtle}`}>
              Select the engagement scope that fits your team's timeline and readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPackagesData.slice(0, 6).map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 rounded-2xl border space-y-4 flex flex-col justify-between shadow-xl ${cardBg}`}
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)] uppercase">
                    {pkg.category} Package
                  </span>
                  <h3 className={`text-lg font-extrabold ${heading}`}>{pkg.title}</h3>
                  <p className={`text-xs leading-relaxed ${body}`}>{pkg.tagline}</p>

                  <div className={`space-y-1 text-xs pt-1 ${subtle}`}>
                    <div><strong className={heading}>Duration:</strong> {pkg.durations.join(' or ')}</div>
                    <div><strong className={heading}>Formats:</strong> {pkg.formats.join(', ')}</div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    {pkg.keyOutcomes.map((inc, i) => (
                      <div key={i} className={`flex items-center gap-2 text-xs ${body}`}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-4 border-t ${divider}`}>
                  <button
                    onClick={() => openBookingModal({ program: pkg.title, duration: pkg.durations[0] })}
                    className="w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] active:scale-[0.98] rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md uppercase tracking-wider"
                  >
                    Select This Tier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step How We Work */}
        <div id="lifecycle" className="space-y-8 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${heading}`}>
              Our 5-Step Delivery Lifecycle
            </h2>
            <p className={`text-xs sm:text-sm ${subtle}`}>
              How we take your organization from initial assessment to sustained skill adoption.
            </p>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {trainingProcessSteps.map((step, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border space-y-2 ${cardBg}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)]">Step {step.step}</span>
                  <span className={`text-[10px] uppercase font-bold font-mono ${subtle}`}>{step.name}</span>
                </div>
                <h3 className={`text-sm font-bold ${heading}`}>{step.title}</h3>
                <p className={`text-xs leading-relaxed ${subtle}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box */}
          <div className={`p-5 sm:p-12 rounded-3xl border text-center space-y-5 ${cardBg}`}>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${heading}`}>
            Ready to Upskill Your Institution?
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${body}`}>
            Contact us for a formal training proposal, curriculum syllabus, and customized delivery schedule.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#proposal"
              className="px-8 py-3.5 rounded-full font-extrabold text-xs text-white bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg inline-flex items-center gap-2 transition-all duration-300"
            >
              <span>GET A SCOPED PROPOSAL</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => openBookingModal({ program: 'Custom Institutional Curriculum', organizationType: 'Company / Enterprise Team' })}
              className={`px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-md inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border ${ghostBtn}`}
            >
              <span>BOOK A CALL</span>
            </button>
          </div>
        </div>

      </div>
      </div>
    </>
  );
};
