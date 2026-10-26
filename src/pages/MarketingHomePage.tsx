import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Code2,
  Copy,
  FileSpreadsheet,
  FileText,
  Languages,
  LockKeyhole,
  MapPin,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users
} from 'lucide-react';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { useApp } from '../context/AppContext';
import { cohortStartIsAdminConfirmed, getNextCohortDate } from '../utils/cohort';
import { pricingPlansData } from '../data/pricing';

const alexPortrait = new URL('../../assets/images/ALEX.jpg', import.meta.url).href;

interface WorkflowScenario {
  id: string;
  tabLabel: string;
  domain: string;
  tool: string;
  rawInputLabel: string;
  rawInputContent: string;
  engineeredPrompt: string;
  outputSummary: string;
  safetyCheck: string;
}

const workflowScenarios: WorkflowScenario[] = [
  {
    id: 'synthesis',
    tabLabel: 'Meeting Synthesis',
    domain: 'Operations & Strategy',
    tool: 'Claude 3.7 / ChatGPT',
    rawInputLabel: 'Raw unorganized input',
    rawInputContent: 'Meeting with logistics team: Dar port congestion delayed containers 4 days. Juma to call clearing agent by 2 PM. Budget over by 1.2M TZS on diesel. Next sync Thursday 10am.',
    engineeredPrompt: 'Synthesize raw meeting notes into a structured executive action matrix with columns: Owner, Action Item, Hard Deadline, and Financial Variance.',
    outputSummary: 'Structured 4-row matrix categorizing port escalation, diesel cost overrun (+1.2M TZS), and immediate dispatch responsibilities.',
    safetyCheck: 'Verify invoice numbers and banking details against signed vendor contracts before releasing payment approvals.'
  },
  {
    id: 'financials',
    tabLabel: 'Data & Financials',
    domain: 'Commercial & Accounting',
    tool: 'Claude 3.7 / Spreadsheets',
    rawInputLabel: 'Multi-currency input',
    rawInputContent: '20 quarterly supplier receipts across KES, TZS, and USD with variable withholding tax rates and missing tax identification numbers.',
    engineeredPrompt: 'Extract structured line items, standardize to reporting currency at central bank reference rates, and flag records missing statutory tax IDs.',
    outputSummary: 'Clean tabular schema ready for CSV export, with reconciliation formulas and highlighted withholding tax exceptions.',
    safetyCheck: 'Double-check cross-rate conversions against official bank exchange tables prior to institutional statutory filing.'
  },
  {
    id: 'vibecoding',
    tabLabel: 'Vibe Coding',
    domain: 'Software & Prototyping',
    tool: 'Cursor / Bolt.new',
    rawInputLabel: 'Product concept brief',
    rawInputContent: 'Need a mobile-friendly client intake portal where SME clients in Kenya and Tanzania can submit registration details with offline resilience.',
    engineeredPrompt: 'Build a production-grade TypeScript React component with Tailwind styling, field-level client validation, error boundaries, and accessible ARIA attributes.',
    outputSummary: 'Complete responsive form component featuring localized validation, accessible keyboard navigation, and optimistic UI updates.',
    safetyCheck: 'Audit third-party package dependencies for known vulnerabilities; never commit production API keys to source control.'
  },
  {
    id: 'hygiene',
    tabLabel: 'Cyber Hygiene',
    domain: 'Defensive Security',
    tool: 'Email Security Forensics',
    rawInputLabel: 'Suspicious email received',
    rawInputContent: 'Urgent email from "supplier-acounts@gmai1.com" demanding immediate wire transfer of 8.4M TZS to a new bank account due to an urgent audit.',
    engineeredPrompt: 'Run header analysis checklist: inspect SPF/DKIM validation, look for domain typosquatting, and execute an out-of-band verification procedure.',
    outputSummary: 'Fraud alert confirmed: Spoofed domain detected. Payment frozen immediately, preventing wire loss.',
    safetyCheck: 'Always verify bank account modifications via a known, pre-recorded secondary phone channel before authorization.'
  }
];

const specializationPathways = [
  {
    slug: 'ai',
    title: 'Artificial Intelligence & Prompting',
    tag: 'S.M.A.R.T. Framework',
    modulesCount: '8 Modules',
    accent: '#ef4444',
    description: 'Master practical prompting, research synthesis, business automation, and human-in-the-loop review with modern LLMs.',
    Icon: Sparkles
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity & Defensive Hygiene',
    tag: 'BEC & Phishing Defense',
    modulesCount: '7 Modules',
    accent: '#10b981',
    description: 'Defend your organization against business email compromise, social engineering, credential stuffing, and data breaches.',
    Icon: LockKeyhole
  },
  {
    slug: 'digital-skills',
    title: 'Modern Full-Stack & Digital Skills',
    tag: 'Web & Digital Assets',
    modulesCount: '9 Modules',
    accent: '#3b82f6',
    description: 'Build fast, responsive web systems, structured data workflows, and customer-facing digital applications with modern tools.',
    Icon: Code2
  }
];

const trustStats = [
  { metric: '100%', label: 'Practical & Project-Based', detail: 'Real tasks and guided workflows' },
  { metric: '6+', label: 'East African Countries', detail: 'Tanzania, Kenya, Uganda, Rwanda, Burundi, DRC' },
  { metric: '6', label: 'Flexible Learning Formats', detail: 'WhatsApp, live online, cohorts, on-site' },
  { metric: '0', label: 'Prerequisites Required', detail: 'Designed for beginners to professionals' }
];

const verifiedTestimonials = [
  {
    quote: 'The AI for Everyone intensive transformed how our logistics division handles daily documentation. What used to take half a day is completed and checked in thirty minutes.',
    author: 'Amina M.',
    title: 'Operations Director',
    location: 'Dar es Salaam, Tanzania'
  },
  {
    quote: 'CS Academy brings an academic rigor to AI education that is rare. They teach critical evaluation, source verification, and ethics rather than superficial tricks.',
    author: 'Dr. Peter K.',
    title: 'Senior Academic Lecturer',
    location: 'Nairobi, Kenya'
  },
  {
    quote: 'The cybersecurity essentials training protected our retail business from a sophisticated payment diversion scheme within two weeks of attendance.',
    author: 'Elias N.',
    title: 'Founder & Managing Director',
    location: 'Arusha, Tanzania'
  }
];

const homeFaqs = [
  {
    question: 'Do I need prior technical experience or coding knowledge?',
    answer: 'No prior technical background is required for our foundational courses like AI for Everyone or Cybersecurity Essentials. Courses start from first principles with clear, real-world examples and guided practice.'
  },
  {
    question: 'How do the different learning formats work?',
    answer: 'We provide self-paced micro-learning via WhatsApp for low-bandwidth access, live interactive cohorts over Zoom/Google Meet with screen sharing, and customized in-person workshops for corporate institutions.'
  },
  {
    question: 'Can we pay in local currency (TZS or KES) and via mobile money?',
    answer: 'Yes. We support local currency payments in Tanzanian Shillings (TZS), Kenyan Shillings (KES), and US Dollars (USD), with direct mobile money (M-Pesa, Airtel Money) and bank transfer support upon enrollment confirmation.'
  },
  {
    question: 'Are digital certificates provided upon completion?',
    answer: 'Yes. Learners who complete the required practical exercises and capstone project assessments receive a verified digital certificate of completion from CS Academy.'
  }
];

interface MarketingHomePageProps {
  openBookingModal: (prefill?: { program?: string; format?: string; duration?: string }) => void;
}

export const MarketingHomePage: React.FC<MarketingHomePageProps> = ({ openBookingModal }) => {
  const { theme } = useApp();
  const canonical = useCanonicalUrl();
  const startDate = cohortStartIsAdminConfirmed() ? getNextCohortDate() : null;
  const livePlan = pricingPlansData.find((plan) => plan.id === 'zoom-live-cohort');
  const isDark = theme === 'dark';
  const secondaryText = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const cardBg = isDark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white shadow-xl shadow-neutral-900/5';

  const [activeScenarioId, setActiveScenarioId] = useState<string>('synthesis');
  const [copiedScenarioId, setCopiedScenarioId] = useState<string | null>(null);
  const activeScenario = workflowScenarios.find((s) => s.id === activeScenarioId) ?? workflowScenarios[0];

  const handleCopyPrompt = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedScenarioId(id);
      setTimeout(() => setCopiedScenarioId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <main className="w-full overflow-hidden">
      <Helmet>
        <title>Practical AI &amp; Technology Education in East Africa | CS Academy</title>
        <meta
          name="description"
          content="Learn practical AI, cybersecurity defense, and digital skills. Live cohorts, WhatsApp micro-learning, and organizational workshops across Tanzania and East Africa."
        />
        <meta property="og:title" content="Put Technology to Work | CS Academy" />
        <meta
          property="og:description"
          content="Beginner-friendly, rigorous AI and tech education with local context and practical application."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {/* Hero Section */}
      <section
        className={`relative isolate px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center lg:pt-28 lg:pb-12 ${
          isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#fffaf8] text-neutral-950'
        }`}
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-[var(--accent-red)]/10 blur-[100px] blob-float" />
          <div className="absolute -right-32 top-20 h-[26rem] w-[26rem] rounded-full bg-orange-300/20 blur-[100px] blob-float-delayed" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--bg-primary)]/10 to-transparent" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <div
              className={`hero-text-reveal inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] ${
                isDark ? 'border-white/10 bg-white/5 text-neutral-200' : 'border-red-200 bg-white/85 text-neutral-800'
              }`}
            >
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" />
              Tanzania based · Online across East Africa
            </div>
            <div
              className={`hero-text-reveal-delayed mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] ${
                isDark ? 'text-neutral-300' : 'text-neutral-800'
              }`}
            >
              <span className="inline-flex items-center rounded-full bg-[var(--accent-purple)]/10 px-3 py-1.5 text-[var(--accent-purple)]">
                Beginner friendly
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${
                  isDark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-200 bg-white'
                }`}
              >
                <Users aria-hidden="true" className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" /> Individuals and teams
              </span>
            </div>
            <h1 className="hero-text-reveal mt-5 text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] 2xl:text-[3.75rem]">
              Put AI to work.<br />
              <span className="text-[var(--accent-red-strong)]">Keep judgment human.</span>
            </h1>
            <p className={`hero-text-reveal-delayed mt-5 max-w-xl text-base leading-relaxed sm:text-lg lg:text-base 2xl:text-lg ${secondaryText}`}>
              Learn to use AI for research, writing, data, and everyday tasks with guided practice, safer-use habits, and systematic human review of the results.
            </p>

            <div className="hero-text-reveal-delayed-2 mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openBookingModal({ program: 'AI for Everyone', format: 'Live Online (Zoom/Google Meet)', duration: '1 to 2 Days' })}
                className="group relative inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] px-6 py-4 text-xs font-black uppercase tracking-[0.1em] text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2"
                aria-label="Ask about AI for Everyone training"
              >
                Ask about AI training
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <Link
                to="/programs/ai"
                className={`inline-flex min-h-13 items-center justify-center gap-2 rounded-full border px-6 py-4 text-xs font-black uppercase tracking-[0.1em] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 ${
                  isDark ? 'border-white/15 bg-white/5 text-white hover:bg-white/10' : 'border-neutral-300 bg-white/80 text-neutral-900 hover:bg-white'
                }`}
                aria-label="See the AI training curriculum"
              >
                See AI curriculum
                <Building2 aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <p className={`mt-3 text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
              {startDate
                ? `Next confirmed cohort starts ${startDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi' })}.`
                : 'Ask us to confirm dates, format, and enrollment options. No payment is taken here.'}
            </p>
            {livePlan && (
              <p className={`mt-2 text-xs font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Live cohort plan: TSh {livePlan.priceTsh} / month · KES {livePlan.priceKes} / month · USD {livePlan.priceUsd} / month.{' '}
                <Link to="/pricing" className="underline underline-offset-2 hover:text-[var(--accent-red-strong)]">
                  See all pricing
                </Link>
              </p>
            )}

            <div className={`mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t pt-5 text-xs font-semibold ${isDark ? 'border-white/10 text-neutral-300' : 'border-neutral-200 text-neutral-700'}`}>
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-emerald-500" /> No technical background required
              </span>
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-emerald-500" /> 1 to 2 day intensive
              </span>
            </div>
          </div>

          {/* Interactive Workflow Sandbox */}
          <div className={`relative mx-auto w-full max-w-xl rounded-[2rem] border p-4 sm:p-6 ${cardBg}`}>
            <div aria-hidden="true" className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-[var(--accent-red)]/15 blur-2xl" />
            <div className={`relative overflow-hidden rounded-[1.4rem] border ${isDark ? 'border-white/10 bg-[#101114]' : 'border-neutral-200 bg-white'}`}>
              {/* Tab Selector */}
              <div
                role="tablist"
                aria-label="Workflow scenarios"
                className={`flex border-b overflow-x-auto scrollbar-none snap-x snap-mandatory overscroll-contain scroll-smooth ${
                  isDark ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-neutral-50'
                }`}
              >
                {workflowScenarios.map((scenario) => {
                  const active = scenario.id === activeScenarioId;
                  return (
                    <button
                      key={scenario.id}
                      id={`tab-${scenario.id}`}
                      role="tab"
                      aria-selected={active}
                      aria-controls={`panel-${scenario.id}`}
                      type="button"
                      onClick={() => setActiveScenarioId(scenario.id)}
                      className={`snap-start shrink-0 min-h-11 inline-flex items-center px-4 py-2.5 text-[11px] font-bold tracking-tight whitespace-nowrap transition-colors border-b-2 cursor-pointer tap-feedback focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-inset ${
                        active
                          ? 'border-[var(--accent-red)] text-[var(--accent-red-strong)] bg-white/5 font-extrabold'
                          : isDark
                          ? 'border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                          : 'border-transparent text-neutral-600 hover:text-neutral-950 hover:bg-black/[0.02]'
                      }`}
                    >
                      {scenario.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Sandbox Header */}
              <div className={`flex items-center justify-between border-b px-5 py-3.5 ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.16em] text-[var(--accent-red-strong)]`}>
                    {activeScenario.domain}
                  </span>
                  <p className="mt-0.5 text-xs font-bold">Tool: {activeScenario.tool}</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                  Interactive Sandbox
                </span>
              </div>

              {/* Sandbox Content Panel */}
              <div
                id={`panel-${activeScenario.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeScenario.id}`}
                className="space-y-3 p-5 sm:p-6"
              >
                <div className={`rounded-xl border p-3.5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-neutral-50'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    01 · {activeScenario.rawInputLabel}
                  </p>
                  <p className="mt-1.5 text-xs font-medium leading-relaxed font-mono">
                    “{activeScenario.rawInputContent}”
                  </p>
                </div>

                <div className="flex justify-center">
                  <ArrowDown aria-hidden="true" className="h-4 w-4 text-[var(--accent-red-strong)]" />
                </div>

                <div className={`rounded-xl border p-3.5 ${isDark ? 'border-red-400/20 bg-red-500/[0.07]' : 'border-red-200 bg-red-50/70'}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-red-strong)]">
                      02 · S.M.A.R.T. Engineered Prompt
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(activeScenario.engineeredPrompt, activeScenario.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition-all tap-feedback cursor-pointer ${
                        copiedScenarioId === activeScenario.id
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isDark
                          ? 'bg-white/10 text-neutral-300 hover:text-white hover:bg-white/15'
                          : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-300'
                      }`}
                      aria-label="Copy prompt to clipboard"
                    >
                      {copiedScenarioId === activeScenario.id ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <p className={`mt-1.5 text-xs leading-relaxed ${secondaryText}`}>
                    {activeScenario.engineeredPrompt}
                  </p>
                </div>

                <div className={`rounded-xl border p-3.5 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-white'}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                    03 · Output &amp; Result
                  </p>
                  <p className={`mt-1.5 text-xs leading-relaxed font-semibold ${secondaryText}`}>
                    {activeScenario.outputSummary}
                  </p>
                </div>

                <div className={`flex items-start gap-2 pt-2 text-[11px] leading-relaxed ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                  <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--accent-red-strong)]" />
                  <span>
                    <strong>Safety protocol:</strong> {activeScenario.safetyCheck}
                  </span>
                </div>
              </div>
            </div>

            <div className={`relative mt-4 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]">
                  <CalendarDays aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold">{startDate ? 'Confirmed start date' : 'Next cohort date'}</p>
                  <p className={`mt-0.5 text-xs ${secondaryText}`}>
                    {startDate
                      ? startDate.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Africa/Nairobi' })
                      : 'Confirm with our team'}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[var(--accent-purple)]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--accent-purple)]">
                Live online
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Trust Statistics */}
      <section className={`border-y py-12 content-auto ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-neutral-200 bg-white'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className={`p-4 sm:p-6 rounded-2xl border transition-all ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-neutral-200/80 bg-neutral-50/70'}`}>
                <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--accent-red-strong)] tracking-tight">
                  {stat.metric}
                </p>
                <p className={`mt-2 text-xs sm:text-sm font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  {stat.label}
                </p>
                <p className={`mt-1 text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Specialization Pathways */}
      <section className={`px-4 py-16 sm:px-6 lg:px-8 content-auto ${isDark ? 'bg-[var(--bg-secondary)] text-white' : 'bg-white text-neutral-950'}`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
                Structured Curricula
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Core Specialization Pathways
              </h2>
              <p className={`mt-3 text-sm leading-relaxed ${secondaryText}`}>
                Engineered for immediate workplace application across East African enterprises, public institutions, and growth-oriented professionals.
              </p>
            </div>
            <Link
              to="/programs"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent-red-strong)] hover:underline tap-feedback"
            >
              Browse all programs <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {specializationPathways.map((pathway) => (
              <div
                key={pathway.slug}
                className={`flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                  isDark ? 'border-white/10 bg-[var(--bg-primary)]' : 'border-neutral-200 bg-[var(--bg-primary)]'
                }`}
                style={{ borderTopColor: pathway.accent, borderTopWidth: 4 }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${pathway.accent}15`, color: pathway.accent }}
                    >
                      <pathway.Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                      isDark ? 'border-white/10 text-neutral-400 bg-white/5' : 'border-neutral-200 text-neutral-600 bg-white'
                    }`}>
                      {pathway.modulesCount}
                    </span>
                  </div>

                  <span className="mt-4 inline-block text-[10px] font-black uppercase tracking-wider" style={{ color: pathway.accent }}>
                    {pathway.tag}
                  </span>
                  <h3 className="mt-1 text-xl font-black tracking-tight">{pathway.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${secondaryText}`}>{pathway.description}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-800/40">
                  <Link
                    to={`/programs/${pathway.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:underline tap-feedback"
                    style={{ color: pathway.accent }}
                  >
                    View syllabus &amp; modules <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Vibe Coding Banner Highlight */}
          <div className={`mt-8 overflow-hidden rounded-3xl border p-6 sm:p-8 ${
            isDark ? 'border-violet-500/30 bg-gradient-to-r from-violet-950/40 via-[var(--bg-primary)] to-[var(--bg-primary)]' : 'border-violet-200 bg-gradient-to-r from-violet-50 via-white to-white'
          }`}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <span className={`rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider border border-violet-500/20 ${
                  isDark ? 'text-violet-300' : 'text-violet-700'
                }`}>
                  Featured Innovation Track
                </span>
                <h3 className="mt-2 text-2xl font-black tracking-tight">Vibe Coding &amp; Rapid Prototyping</h3>
                <p className={`mt-2 text-xs sm:text-sm leading-relaxed ${secondaryText}`}>
                  Turn plain-language briefs into functional software prototypes using modern AI coding agents (Cursor, GitHub Copilot, Bolt). Learn prompt architecture, code inspection, and responsible deployment.
                </p>
              </div>
              <Link
                to="/vibe-coding"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5 tap-feedback"
              >
                Explore Vibe Coding <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials */}
      <section className={`px-4 py-16 sm:px-6 lg:px-8 content-auto ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#fffaf8] text-neutral-950'}`}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              Verified Outcomes
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Trusted by East African Leaders
            </h2>
            <p className={`mt-3 text-sm leading-relaxed ${secondaryText}`}>
              Read experiences from operations executives, academics, and founders who have adopted CS Academy methods.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {verifiedTestimonials.map((t) => (
              <div
                key={t.author}
                className={`flex flex-col justify-between rounded-3xl border p-6 ${
                  isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white shadow-sm'
                }`}
              >
                <p className={`text-sm leading-relaxed italic ${secondaryText}`}>
                  “{t.quote}”
                </p>
                <div className="mt-6 pt-5 border-t border-neutral-800/40">
                  <p className="text-sm font-bold">{t.author}</p>
                  <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.title}</p>
                  <p className="text-[11px] font-semibold text-[var(--accent-red-strong)]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Instructor Attribution */}
          <div className={`mt-8 flex flex-col gap-4 rounded-3xl border p-4 sm:flex-row sm:items-center sm:p-5 ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}>
            <img
              src={alexPortrait}
              alt="Alex Rweyemamu, CS Academy founder and lead instructor"
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
              className="h-[72px] w-[72px] aspect-square shrink-0 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-extrabold">Instruction Led by Alex Rweyemamu</p>
              <p className={`mt-1 text-xs leading-relaxed ${secondaryText}`}>
                Founder and lead instructor. Cohorts combine live screen sharing, guided debugging, and dedicated Q&amp;A sessions.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 py-2.5 text-xs font-bold transition hover:border-[var(--accent-red)] hover:text-[var(--accent-red-strong)]"
            >
              Meet the academy <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className={`px-4 py-16 sm:px-6 lg:px-8 content-auto ${isDark ? 'bg-[var(--bg-secondary)] text-white' : 'bg-white text-neutral-950'}`}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
              Got Questions?
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className={`mt-3 text-sm leading-relaxed ${secondaryText}`}>
              Direct answers on enrollment, device requirements, local payments, and certifications.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {homeFaqs.map((faq) => (
              <details
                key={faq.question}
                className={`group rounded-2xl border p-5 transition-all ${
                  isDark ? 'border-white/10 bg-[var(--bg-primary)]' : 'border-neutral-200 bg-[var(--bg-primary)]'
                }`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-sm sm:text-base">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 text-[var(--accent-red-strong)]" />
                </summary>
                <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${secondaryText}`}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Dual-Audience Conversion Flow */}
      <section className={`px-4 py-16 sm:px-6 lg:px-8 content-auto ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#fffaf8] text-neutral-950'}`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Corporate / Institutional Card */}
            <div className="flex flex-col justify-between rounded-[2rem] bg-gradient-to-br from-[var(--accent-red)] via-[var(--accent-red)] to-[var(--accent-red-hover)] p-8 text-white shadow-xl">
              <div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  For Organizations &amp; Teams
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight">
                  Upskill Your Workforce or Faculty
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  Customized curricula for corporate teams, financial institutions, and universities. We scope hands-on modules directly mapped to your operational requirements.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-semibold text-white/95">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0" /> On-site workshops or dedicated private cohorts
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0" /> Local procurement invoices &amp; formal institutional proposals
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  to="/for-organizations"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-black uppercase tracking-wider text-neutral-950 transition hover:bg-neutral-100"
                >
                  Request Team Proposal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Individual Learner Card */}
            <div className={`flex flex-col justify-between rounded-[2rem] border p-8 ${
              isDark ? 'border-white/10 bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white shadow-xl'
            }`}>
              <div>
                <span className="rounded-full bg-[var(--accent-red-subtle)] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--accent-red-strong)]">
                  For Individuals &amp; Students
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight">
                  Start Your Learning Journey
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${secondaryText}`}>
                  Join our next live online cohort or study at your own pace via WhatsApp micro-learning. Build immediate digital competency and earn verified certificates.
                </p>
                <ul className={`mt-5 space-y-2 text-xs font-semibold ${secondaryText}`}>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> Transparent monthly &amp; annual tuition rates
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" /> Live instructor guidance &amp; peer community access
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent-red)] px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-[var(--accent-red-hover)]"
                >
                  Enroll / Inquire <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/academy"
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-black uppercase tracking-wider transition ${
                    isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-neutral-300 text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  Explore Directory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
