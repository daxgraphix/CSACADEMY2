import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { instructorsData } from '../data/instructors';
import { 
  ShieldCheck, 
  Globe2, 
  Quote, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Users, 
  Award,
  BookOpen,
  Smartphone,
  Video,
  Code,
  Palette,
  TrendingUp,
  CreditCard,
  MessageCircle,
  Phone,
  Star,
  Linkedin,
  Twitter,
  Github,
  GraduationCap
} from 'lucide-react';

interface AboutPageProps {
  openBookingModal: (prefill?: { program?: string }) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const canonical = useCanonicalUrl();

  return (
    <>
      <Helmet>
        <title>About CS Academy | Our Mission, Instructors & East Africa Story</title>
        <meta name="description" content="CS Academy is an East Africa-based applied cyber, AI, and digital skills school. Meet the instructors, mission, and outcomes behind the academy." />
        <meta name="keywords" content="about CS Academy, cybersecurity training East Africa, AI training Africa, applied learning, instructors, mission" />
        <meta property="og:title" content="About CS Academy" />
        <meta property="og:description" content="Our mission, instructors, and approach to applied cyber, AI, and digital skills training across East Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>
    <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero / Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[var(--accent-red-strong)] text-xs font-mono font-bold uppercase tracking-wider">
            <span>{t.about.badge}</span>
          </div>
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {(
              <>EMPOWERING EAST AFRICA WITH <span className="text-[var(--accent-red-strong)]">DIGITAL SKILLS</span></>
            )}
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            {siteConfig.academyName} is on a mission to democratize technology education for English-speaking learners with local language support, professionals, and future innovators.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className={`p-8 sm:p-10 rounded-3xl border space-y-4 shadow-xl relative overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700' : 'bg-neutral-50 border-neutral-300 hover:border-red-400'
          }`}>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-[var(--accent-red-strong)] ${
              theme === 'dark' ? 'bg-red-950/70 border-red-900/50' : 'bg-red-50 border-red-200'
            }`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)] uppercase tracking-wider">
              Our Purpose
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Our Mission
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              {siteConfig.tagline}
            </p>
            <div className={`pt-2 text-xs flex items-center gap-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>Language should never be a barrier to learning technology.</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className={`p-8 sm:p-10 rounded-3xl border space-y-4 shadow-xl relative overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700' : 'bg-neutral-50 border-neutral-300 hover:border-red-400'
          }`}>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-[var(--accent-red-strong)] ${
              theme === 'dark' ? 'bg-red-950/70 border-red-900/50' : 'bg-red-50 border-red-200'
            }`}>
              <Globe2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)] uppercase tracking-wider">
              The Future We Build
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              Our Vision
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              {siteConfig.vision}
            </p>
            <div className={`pt-2 text-xs flex items-center gap-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)]" />
              <span>Equipping millions to thrive in the global digital economy.</span>
            </div>
          </div>
        </div>

        {/* 3 Core Academies */}
        <div className={`p-8 sm:p-12 rounded-3xl border space-y-8 shadow-2xl ${
          theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
        }`}>
          <div className="max-w-3xl space-y-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-mono text-[var(--accent-red-strong)] font-bold uppercase ${
              theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300'
            }`}>
              Our Core Curriculum Pillars
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
              The 3 Pillars of CS Academy
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {siteConfig.pillars.map((pillar) => (
              <div key={pillar.id} className={`p-6 rounded-3xl border space-y-3 ${
                theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
              }`}>
                <span className="text-[10px] font-mono font-bold text-[var(--accent-red-strong)] uppercase px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-800/40">
                  {pillar.badge}
                </span>
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{pillar.name}</h3>
                <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OUR INSTRUCTORS & COURSE CREATORS SECTION */}
        <section id="our-instructors-section" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'bg-red-950/40 border-red-800/40 text-[var(--accent-red-strong)]' : 'bg-red-50 border-red-200 text-[var(--accent-red-strong)]'
            }`}>
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Our Expert Instructors</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              MEET OUR INSTRUCTORS
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              Seasoned industry practitioners, ethical security researchers, and software architects passionate about making high-value tech skills accessible across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructorsData.map((instructor) => (
              <div
                key={instructor.id}
                id={`instructor-card-${instructor.id}`}
                className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all hover:scale-[1.01] ${
                  theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700' : 'bg-white border-neutral-300 hover:border-red-400'
                }`}
              >
                <div className="space-y-4">
                  {/* Avatar & Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${instructor.avatarGradient || 'from-red-600 to-black'} p-0.5 shadow-md shrink-0`}>
                      <div className="w-full h-full rounded-[14px] bg-[var(--bg-primary)] flex items-center justify-center text-white font-extrabold text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                        {instructor.avatarInitials}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-[var(--accent-red-strong)] uppercase px-2 py-0.5 rounded bg-red-950/40 border border-red-900/40 inline-block">
                        {instructor.specialtyBadge}
                      </span>
                      <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                        {instructor.name}
                      </h3>
                      <p className={`text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        {instructor.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                    {instructor.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-2 pt-1">
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>
                      Core Areas of Expertise:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {instructor.expertise.map((exp, eIdx) => (
                        <span
                          key={eIdx}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium ${
                            theme === 'dark'
                              ? 'bg-[var(--bg-primary)] border-[var(--border-color)] text-neutral-300'
                              : 'bg-neutral-50 border-neutral-300 text-neutral-700'
                          }`}
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Courses Taught */}
                  <div className="space-y-1.5 pt-1">
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>
                      Featured Courses:
                    </div>
                    <ul className="space-y-1 text-xs">
                      {instructor.featuredCourses.map((fc, fcIdx) => (
                        <li key={fcIdx} className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-[var(--accent-red-strong)] shrink-0" />
                          <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}>{fc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                  theme === 'dark' ? 'border-[var(--border-color)]' : 'border-neutral-100'
                }`}>
                  <span className={`text-[11px] font-mono ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                    {instructor.experience}
                  </span>
                  <button
                    onClick={() => openBookingModal({ program: `Training with ${instructor.name}` })}
                    className="group relative px-4 py-2 rounded-xl bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                  >
                    <span>Book Session</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founder Keynote & Speaking Profile */}
        <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-white border-neutral-300'
        }`}>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 text-center md:text-left space-y-4">
              <div className="w-32 h-32 mx-auto md:mx-0 rounded-3xl bg-gradient-to-br from-[var(--accent-red-hover)] to-neutral-900 p-1 shadow-lg">
                <div className={`w-full h-full rounded-[22px] flex items-center justify-center text-4xl font-extrabold ${
                  theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-neutral-900 text-white'
                }`}>
                  AR
                </div>
              </div>
              <div>
                <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{siteConfig.founder.name}</h3>
                <p className="text-xs font-mono font-bold text-[var(--accent-red-strong)] mt-1">{siteConfig.founder.titles[0]}</p>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="space-y-2">
                <Quote className="w-8 h-8 text-[var(--accent-red-strong)] opacity-60" />
                <p className={`text-sm sm:text-base leading-relaxed italic ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  "{siteConfig.founder.quote}"
                </p>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                {siteConfig.founder.bio}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openBookingModal({ program: 'Speaking Engagement with Alex Rweyemamu' })}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Book Keynote / Training</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};
