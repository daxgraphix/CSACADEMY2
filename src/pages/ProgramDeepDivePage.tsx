import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageRoute, ProgramPillar } from '../types';
import { programsData } from '../data/programs';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { ShareButtons } from '../components/ShareButtons';
import { 
  ShieldCheck, 
  Laptop, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users,
  BookOpen,
  ArrowLeft,
  Calendar
} from 'lucide-react';

interface ProgramDeepDivePageProps {
  slug: string;
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

export const ProgramDeepDivePage: React.FC<ProgramDeepDivePageProps> = ({
  slug,
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();
  const program = programsData.find(p => p.slug === slug) || programsData[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Laptop className="w-8 h-8 text-[var(--accent-red-strong)]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-[var(--accent-red-strong)]" />;
      default:
        return <Laptop className="w-8 h-8 text-[var(--accent-red-strong)]" />;
    }
  };

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>{program.title} | {program.tagline} - CS Academy Tanzania</title>
        <meta name="description" content={`${program.extendedDescription} Enroll today in ${program.title} at CS Academy. Taught in English & local languages. M-Pesa enrollment available.`} />
        <meta name="keywords" content={`${program.title} Tanzania, ${program.tagline}, CS Academy, AI training East Africa, cybersecurity course Tanzania`} />
        <meta property="og:title" content={`${program.title} | CS Academy Tanzania`} />
        <meta property="og:description" content={program.tagline} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
    <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Back Link & Share */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => {
              setCurrentRoute('programs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors ${
              theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-800 hover:text-neutral-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programmes</span>
          </button>

          <ShareButtons
            title={`CS Academy: ${program.title} (${program.tagline})`}
            description={program.extendedDescription}
            variant="compact"
          />
        </div>

        {/* Hero Banner */}
        <div className={`border rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden transition-colors ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                theme === 'dark' ? 'bg-red-950/80 border border-red-800/80 text-[var(--accent-red-strong)]' : 'bg-red-100 border border-red-300 text-red-700'
              }`}>
                <span>{program.badge}</span>
              </div>
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                {program.title}
              </h1>
              <p className={`text-lg sm:text-xl font-semibold ${
                theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'
              }`}>
                {program.tagline}
              </p>
              <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}>
                {program.extendedDescription}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id={`btn-deepdive-book-${program.slug}`}
                  onClick={() => openBookingModal({ program: program.title })}
                  className="px-8 py-4 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{`BOOK ${program.title}`}</span>
                </button>
                <button
                  onClick={() => openBookingModal({ program: `${program.title} - Custom Corporate In-House` })}
                  className={`px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border ${
                    theme === 'dark'
                      ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border-[var(--border-color)]'
                      : 'text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-100 transition-colors duration-200 border-neutral-300 shadow-sm'
                  }`}
                >
                  Request Corporate Proposal
                </button>
              </div>

              {/* Social Share Bar inside Hero */}
              <div className={`pt-4 border-t ${theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-300'}`}>
                <ShareButtons
                  title={`Jifunze ${program.title} na CS Academy: ${program.tagline}`}
                  description={program.extendedDescription}
                  variant="inline"
                />
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className={`w-52 h-52 rounded-3xl border flex flex-col items-center justify-center p-6 text-center shadow-xl ${
                theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-md'
              }`}>
                {getIcon(program.icon)}
                <span className={`text-xs font-bold mt-4 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{program.title}</span>
                <span className={`text-[10px] font-mono mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>CS Academy Pillar</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Curriculum Syllabus Breakdown */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
              Syllabus & Practical Competency Modules
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              Each module combines direct instruction, live demonstrations, guided practice, and real-world exercises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {program.modules.map((mod, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-3 shadow-lg flex flex-col justify-between transition-colors ${
                  theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
                }`}
              >
                <div className="space-y-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    theme === 'dark' ? 'text-[var(--accent-red-strong)] bg-red-950/60 border-red-900/40' : 'text-red-700 bg-red-100 border-red-200'
                  }`}>
                    Module 0{idx + 1}
                  </span>
                  <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{mod.title}</h3>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>{mod.description}</p>
                </div>
                <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]/80 text-neutral-200' : 'bg-white border-neutral-300 text-neutral-800'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)] shrink-0 mt-0.5" />
                  <span><strong>Hands-on Output:</strong> {mod.practicalSkill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience & Delivery Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Who is it for */}
          <div className={`p-8 rounded-3xl border space-y-4 ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-red-strong)] uppercase font-mono">
              <Users className="w-4 h-4" />
              <span>Target Audience</span>
            </div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Who Should Take This Program
            </h3>
            <div className="space-y-2">
              {program.audience.map((aud, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs sm:text-sm p-2.5 rounded-lg border ${
                  theme === 'dark' ? 'text-neutral-300 bg-[var(--bg-primary)] border-[var(--border-color)]' : 'text-neutral-700 bg-white border-neutral-300'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-red-strong)]" />
                  <span>{aud}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Formats */}
          <div className={`p-8 rounded-3xl border space-y-4 ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-red-strong)] uppercase font-mono">
              <Clock className="w-4 h-4" />
              <span>Format & Duration Options</span>
            </div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Flexible Scheduling
            </h3>
            <div className="space-y-2">
              {program.durationOptions.map((dur, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs sm:text-sm p-2.5 rounded-lg border ${
                  theme === 'dark' ? 'text-neutral-300 bg-[var(--bg-primary)] border-[var(--border-color)]' : 'text-neutral-700 bg-white border-neutral-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-red)]"></span>
                  <span>{dur}</span>
                </div>
              ))}
            </div>
            <p className={`text-xs pt-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
              Available in live online video classes, WhatsApp cohort micro-learning, or physical on-site delivery at your facility.
            </p>
          </div>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-5 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-[var(--accent-red-subtle)] via-[var(--bg-secondary)] to-[var(--accent-red-subtle)] border-[var(--accent-red-border)]'
            : 'bg-gradient-to-r from-red-50 via-neutral-50 to-red-50 border-red-200'
        }`}>
          <h3 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            {`Ready to enroll or schedule ${program.title}?`}
          </h3>
          <p className={`text-sm max-w-xl mx-auto ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
            Contact us for upcoming cohort dates or request a customized proposal for your organization.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={() => openBookingModal({ program: program.title })}
              className="group px-8 py-4 rounded-xl font-extrabold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};
