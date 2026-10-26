import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  Code2,
  Compass,
  FileText,
  GraduationCap,
  Layers3,
  LockKeyhole,
  MessageCircle,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Wallet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { useReveal } from '../hooks/useReveal';

const academicPillars = [
  {
    id: 'ai-vibe',
    title: 'AI Literacy & Vibe Coding',
    badge: 'Foundation & Innovation',
    accent: '#ef4444',
    summary: 'From fundamental generative models to building functional prototypes with natural language and AI coding agents.',
    coreSkills: [
      'S.M.A.R.T. Prompt Engineering architecture',
      'Research synthesis & unstructured data extraction',
      'Multi-modal assistants (ChatGPT, Claude, Gemini)',
      'Vibe coding with Cursor, Bolt.new, and Copilot',
      'Human-in-the-loop ethical validation'
    ],
    link: '/programs/ai'
  },
  {
    id: 'cyber-defense',
    title: 'Cybersecurity & Defensive Hygiene',
    badge: 'Risk & Resilience',
    accent: '#10b981',
    summary: 'Practical digital security to safeguard personal identities, corporate assets, and customer databases against modern threat actors.',
    coreSkills: [
      'Phishing, spoofing & BEC detection forensics',
      'Password management & multi-factor authentication (MFA)',
      'Mobile money & digital banking transaction safety',
      'Endpoint device hardening & safe remote protocols',
      'Incident reporting & containment playbooks'
    ],
    link: '/programs/cybersecurity'
  },
  {
    id: 'fullstack-digital',
    title: 'Modern Full-Stack & Digital Skills',
    badge: 'Systems & Engineering',
    accent: '#3b82f6',
    summary: 'Hands-on training in contemporary software development, structured data analysis, and scalable web solutions.',
    coreSkills: [
      'Modern HTML5, semantic markup & Tailwind CSS',
      'TypeScript & React component architecture',
      'REST APIs & third-party service integration',
      'Version control workflows with Git and GitHub',
      'Accessible web standards & mobile-first responsiveness'
    ],
    link: '/programs/digital-skills'
  }
];

const targetAudiences = [
  {
    role: 'Students & Graduates',
    badge: 'Career Launch',
    objective: 'Bridge academic theory with tangible, production-grade technical skills.',
    deliverables: 'Job-ready portfolio, verified digital credential, GitHub showcase repos.'
  },
  {
    role: 'Working Professionals',
    badge: 'Productivity Lift',
    objective: 'Automate repetitive workflows and accelerate data-driven executive reporting.',
    deliverables: 'Prompt templates, spreadsheet automation scripts, workflow audit.'
  },
  {
    role: 'SMEs & Business Owners',
    badge: 'Asset Protection',
    objective: 'Secure payment channels, customer databases, and lower digital build costs.',
    deliverables: 'Cybersecurity baseline checklist, low-code landing pages, fraud prevention protocols.'
  },
  {
    role: 'Educators & Academic Staff',
    badge: 'Pedagogy & Integrity',
    objective: 'Integrate AI thoughtfully into curricula while establishing clear academic integrity standards.',
    deliverables: 'Assignment rubrics, student AI literacy toolkits, ethical detection guidelines.'
  }
];

const deliveryFormats = [
  {
    title: 'WhatsApp Micro-Learning',
    badge: 'Low-Bandwidth',
    description: 'Bite-sized daily audio lessons, prompt exercises, and quiz check-ins delivered right via WhatsApp. Minimal data usage.',
    detail: 'Ideal for learners on mobile data plans across East Africa.'
  },
  {
    title: 'Live Virtual Cohorts',
    badge: 'Interactive Online',
    description: 'Weekly scheduled live classes on Zoom and Google Meet with screen shares, live pair debugging, and direct instructor Q&A.',
    detail: 'Evenings & weekend schedules available.'
  },
  {
    title: 'Self-Paced Portal',
    badge: 'Flexible Hours',
    description: '24/7 access to recorded walk-throughs, curated reading guides, coding challenges, and downloadable project templates.',
    detail: 'Learn on your own schedule with community forum support.'
  },
  {
    title: 'On-Site Corporate Labs',
    badge: 'Enterprise & Teams',
    description: 'Intensive 1-to-3 day physical workshops delivered directly at your organization’s office or training venue across the region.',
    detail: 'Tailored to your industry, data policies, and tools.'
  }
];

const directoryDestinations = [
  { href: '/programs', title: 'Programs & Courses', tag: 'Curriculum', detail: 'Explore AI, cybersecurity, and digital skills tracks.', icon: GraduationCap },
  { href: '/pricing', title: 'Pricing & Tuition', tag: 'Enrollment', detail: 'Transparent monthly and annual plans in TZS, KES, and USD.', icon: Wallet },
  { href: '/learning-formats', title: 'Learning Formats', tag: 'Delivery', detail: 'Compare WhatsApp, live virtual, self-paced, and on-site modes.', icon: Layers3 },
  { href: '/for-organizations', title: 'For Organizations', tag: 'Enterprise', detail: 'Plan tailored institutional upskilling for corporate or academic teams.', icon: Building2 },
  { href: '/resources', title: 'Free Toolkits', tag: 'Resources', detail: 'Download checklists, prompt frameworks, and security guides.', icon: FileText },
  { href: '/blog', title: 'Articles & Field Notes', tag: 'Editorial', detail: 'Read analysis, technology trends, and practical guidance.', icon: Newspaper },
  { href: '/about', title: 'About the Academy', tag: 'Institutional', detail: 'Meet our lead instructors, pedagogical mission, and values.', icon: BookOpen },
  { href: '/contact', title: 'Contact & Support', tag: 'Inquiry', detail: 'Speak with our admissions team or request training information.', icon: Compass }
];

const enrollmentSteps = [
  { step: '01', title: 'Select Track', description: 'Choose your desired specialization: AI Literacy, Cybersecurity Defense, or Modern Digital Skills.' },
  { step: '02', title: 'Pick Format', description: 'Choose between WhatsApp micro-learning, live virtual cohort, self-paced, or on-site delivery.' },
  { step: '03', title: 'Confirm Dates', description: 'Coordinate with our admissions team to verify scheduling, local payment options, and requirements.' },
  { step: '04', title: 'Start Learning', description: 'Receive access credentials, join your cohort community, and start your hands-on coursework.' }
];

export const HomePage: React.FC = () => {
  const { theme } = useApp();
  const canonical = useCanonicalUrl();
  const isDark = theme === 'dark';
  const secondaryText = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const cardBorder = isDark ? 'border-white/10 bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm';
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <main className={`min-h-screen px-4 pb-20 pt-28 sm:pt-32 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'}`}>
      <Helmet>
        <title>Academy Overview | Campus Hub &amp; Curricula | CS Academy</title>
        <meta
          name="description"
          content="Explore CS Academy's central campus hub: comprehensive academic pillars in AI, cybersecurity, and digital skills, role-based learning tracks, and delivery formats across East Africa."
        />
        <meta property="og:title" content="Campus Hub &amp; Academic Directory | CS Academy" />
        <meta
          property="og:description"
          content="Central campus hub for technology education across East Africa: explore tracks, delivery formats, and enrollment pathways."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-16 sm:space-y-24">
        {/* Campus Hub Hero */}
        <section className="relative pt-4 sm:pt-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-red-border)] bg-[var(--accent-red-subtle)] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              CS Academy Central Campus
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              East Africa’s Hub for Practical Technology Education
            </h1>
            <p className={`mt-5 text-base leading-relaxed sm:text-lg ${secondaryText}`}>
              Explore our three core academic pillars, tailored pathways for students, professionals, and organizations, and multiple delivery formats designed for regional realities.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/programs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-red)]"
              >
                Browse All Curricula <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 text-xs font-black uppercase tracking-wider transition ${
                  isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-neutral-300 text-neutral-900 hover:bg-white'
                }`}
              >
                View Tuition &amp; Plans
              </Link>
            </div>
          </div>
        </section>

        {/* The Three Academic Pillars */}
        <section aria-labelledby="pillars-heading" className="space-y-8 content-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              Core Disciplines
            </p>
            <h2 id="pillars-heading" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              The Three Academic Pillars
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>
              Every course at CS Academy belongs to one of three foundational pillars designed for direct professional application.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {academicPillars.map((pillar) => (
              <div
                key={pillar.id}
                className={`flex flex-col justify-between rounded-3xl border p-6 sm:p-7 ${cardBorder}`}
                style={{ borderTopColor: pillar.accent, borderTopWidth: 4 }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border" style={{ color: pillar.accent, borderColor: `${pillar.accent}40`, backgroundColor: `${pillar.accent}10` }}>
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-black tracking-tight">{pillar.title}</h3>
                  <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${secondaryText}`}>
                    {pillar.summary}
                  </p>

                  <div className="mt-6 space-y-2">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Core Covered Skills:
                    </p>
                    <ul className="space-y-2 text-xs">
                      {pillar.coreSkills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: pillar.accent }} />
                          <span className={secondaryText}>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-neutral-800/40">
                  <Link
                    to={pillar.link}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition hover:underline"
                    style={{ color: pillar.accent }}
                  >
                    View Pillar Programs <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Role-Based Pathways ("Who We Serve") */}
        <section aria-labelledby="audience-heading" className="space-y-8 content-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              Tailored Guidance
            </p>
            <h2 id="audience-heading" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              Role-Based Pathways
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>
              Whether you are preparing for your first tech role or upskilling an entire university faculty, our courses adapt to your context.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {targetAudiences.map((aud) => (
              <div key={aud.role} className={`rounded-2xl border p-5 sm:p-6 ${cardBorder}`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isDark ? 'border-white/10 text-neutral-400 bg-white/5' : 'border-neutral-200 text-neutral-600 bg-neutral-50'
                }`}>
                  {aud.badge}
                </span>
                <h3 className="mt-3 text-lg font-bold">{aud.role}</h3>
                <p className={`mt-2 text-xs leading-relaxed ${secondaryText}`}>{aud.objective}</p>
                <div className="mt-4 pt-3 border-t border-neutral-800/30">
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Tangible Outcome:
                  </p>
                  <p className={`mt-1 text-xs font-semibold text-[var(--accent-red-strong)]`}>
                    {aud.deliverables}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Delivery Formats Matrix */}
        <section aria-labelledby="formats-heading" className="space-y-8 content-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
                Flexible Learning
              </p>
              <h2 id="formats-heading" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                Delivery Formats Matrix
              </h2>
              <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>
                Pick the format matching your device accessibility, data bandwidth, and daily schedule.
              </p>
            </div>
            <Link
              to="/learning-formats"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-red-strong)] hover:underline tap-feedback"
            >
              Compare All Formats <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryFormats.map((fmt) => (
              <div key={fmt.title} className={`flex flex-col justify-between rounded-2xl border p-5 sm:p-6 ${cardBorder}`}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                    {fmt.badge}
                  </span>
                  <h3 className="mt-3 text-base font-bold">{fmt.title}</h3>
                  <p className={`mt-2 text-xs leading-relaxed ${secondaryText}`}>{fmt.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800/30">
                  <p className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {fmt.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Directory Matrix */}
        <section aria-labelledby="directory-heading" className="space-y-8 content-auto">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              Navigation Index
            </p>
            <h2 id="directory-heading" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              Campus Directory Matrix
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>
              Explore our eight primary destinations across programs, institutional services, research guides, and student support.
            </p>
          </div>

          <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
            {directoryDestinations.map(({ href, title, tag, detail, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`group flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-red)] hover:shadow-xl tap-feedback focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] ${
                  isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      isDark ? 'bg-white/5 text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'
                    }`}>
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isDark ? 'border-white/10 text-neutral-400 bg-white/5' : 'border-neutral-200 text-neutral-600 bg-neutral-50'
                    }`}>
                      {tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-tight">{title}</h3>
                  <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${secondaryText}`}>{detail}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--accent-red-strong)]">
                  Explore <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Admissions & Enrollment Roadmap */}
        <section aria-labelledby="roadmap-heading" className={`rounded-3xl border p-8 sm:p-12 content-auto ${
          isDark ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-white shadow-md'
        }`}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              Clear &amp; Transparent
            </p>
            <h2 id="roadmap-heading" className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              Admissions &amp; Enrollment Roadmap
            </h2>
            <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>
              Four clear steps from course selection to hands-on skill mastery.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {enrollmentSteps.map((s, idx) => (
              <div
                key={s.step}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isDark ? 'border-white/5 bg-white/[0.02]' : 'border-neutral-200/80 bg-neutral-50/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl font-black text-[var(--accent-red-strong)]">{s.step}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isDark ? 'border-white/10 text-neutral-400 bg-white/5' : 'border-neutral-200 text-neutral-600 bg-white'
                  }`}>
                    Stage {idx + 1}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-bold">{s.title}</h3>
                <p className={`mt-1.5 text-xs leading-relaxed ${secondaryText}`}>{s.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800/30 text-center">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-red)] tap-feedback"
            >
              Start Your Application / Inquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
