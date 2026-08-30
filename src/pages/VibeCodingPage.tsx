import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageRoute } from '../types';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import {
  Sparkles,
  Code2,
  Zap,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Monitor,
  LayoutDashboard,
  ShoppingCart,
  Users,
  FileText,
  Smartphone,
  Star,
  Award
} from 'lucide-react';

interface VibeCodingPageProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

const tools = [
  {
    name: 'Cursor AI',
    tagline: 'The AI-first code editor',
    desc: 'Build full applications using AI pair programming. Cursor agent mode writes, edits, and refactors code across your entire project from natural language instructions.',
    bestFor: ['Full-stack apps', 'Rapid prototyping', 'Codebase refactoring'],
    color: '#7c3aed',
    icon: Code2
  },
  {
    name: 'Bolt.new',
    tagline: 'AI-powered full-stack in the browser',
    desc: 'Spin up production-ready React, Node.js, and database-backed applications instantly. Bolt.new runs entirely in your browser, so no local environment setup is required.',
    bestFor: ['Instant demos', 'Frontend and backend', 'Database and auth'],
    color: '#ea580c',
    icon: Zap
  },
  {
    name: 'v0.dev (Vercel)',
    tagline: 'From prompt to polished UI',
    desc: 'Generate pixel-perfect React components and pages from text descriptions. Integrates directly with your Vercel deployment pipeline for one-click production publishing.',
    bestFor: ['UI components', 'Landing pages', 'Design-to-code pipeline'],
    color: '#1a1a1a',
    icon: LayoutDashboard
  },
  {
    name: 'GitHub Copilot',
    tagline: 'Your AI coding partner',
    desc: 'Get context-aware code completions, whole-function suggestions, and conversational debugging across VS Code, JetBrains, and Neovim, supporting every major language and framework.',
    bestFor: ['All languages', 'IDE integration', 'Learning accelerator'],
    color: '#2181ff',
    icon: Users
  },
  {
    name: 'Windsurf (Cascade)',
    tagline: 'Agentic AI for professional devs',
    desc: 'Windsurf Cascade engine combines multi-file editing, autonomous agent workflows, and collaborative debugging for professional-grade AI-assisted development teams.',
    bestFor: ['Enterprise projects', 'Large codebases', 'Team workflows'],
    color: '#0ea5e9',
    icon: ShieldCheck
  },
  {
    name: 'Loom + AI Summaries',
    tagline: 'Ship faster with async video',
    desc: 'Record a Loom of your screen describing what you want to build. Loop AI transcribes, summarizes, and turns your walkthrough into a ticket, spec doc, or pull request description.',
    bestFor: ['Async teams', 'Client communication', 'Documentation'],
    color: '#22c55e',
    icon: FileText
  }
];

const useCases = [
  {
    icon: ShoppingCart,
    title: 'E-Commerce and Business Sites',
    desc: 'Describe your product catalog, checkout flow, and brand style in plain English. Vibe Coding tools scaffold the full storefront, integrate payment gateways, and generate responsive product pages ready for online payments.',
    tags: ['Business Sites', 'Payment Integration', 'Portfolios']
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboards and Admin Panels',
    desc: 'Turn raw data requirements into live charts, filterable tables, and role-based access control panels. Ideal for SMEs managing inventory, HR teams tracking attendance, or NGOs monitoring beneficiary data.',
    tags: ['Data Visualization', 'Role Management', 'Export and Reports']
  },
  {
    icon: Globe,
    title: 'Landing Pages and Portfolios',
    desc: 'Describe your personal brand, past projects, and call-to-action in a few sentences. Vibe Coding tools produce a polished, SEO-optimized portfolio or campaign landing page with blog integration and contact forms.',
    tags: ['SEO Optimized', 'Contact Forms', 'Blog Ready']
  },
  {
    icon: Code2,
    title: 'APIs and Backend Services',
    desc: 'Define your data models and endpoints in plain language. Vibe Coding tools scaffold Express/FastAPI routes, database schemas, authentication middleware, and API documentation so you can focus on business logic.',
    tags: ['REST and GraphQL', 'Auth and Permissions', 'Database Design']
  }
];

const faqs = [
  {
    q: 'Can I learn Vibe Coding if I have never coded before?',
    a: 'Yes. Vibe Coding is specifically designed for beginners and non-coders, with no prior programming experience required. We start from zero: how to describe what you want clearly, how to review AI-generated code, and how to iterate until the result works. If you can write an email, you can Vibe Code.'
  },
  {
    q: 'Is Vibe Coding relevant for the East African job market?',
    a: 'Absolutely. Demand for digital products in Tanzania, Kenya, Uganda, and Rwanda is growing rapidly, from fintech apps to agricultural marketplaces. Companies are actively hiring developers who can ship quickly. Vibe Coding gives you the productivity edge to compete with 2-3x the output of a traditional developer.'
  },
  {
    q: 'Will companies take Vibe Coding seriously?',
    a: 'Yes. Top tech companies globally, from startups to enterprises, have adopted AI-assisted development as a standard practice. At CS Academy, we teach Vibe Coding alongside software engineering fundamentals so you understand the code AI produces. That combination of speed and understanding is exactly what forward-thinking employers want.'
  },
  {
    q: 'How is Vibe Coding taught, and can I learn in local languages?',
    a: 'All CS Academy Vibe Coding instruction is delivered in clear English with local language explanations and context guides. Our locally contextualized curriculum uses familiar examples from East African markets, local e-commerce, and regional UI copy, so learning feels relevant and immediately applicable.'
  },
  {
    q: 'What payment methods can I use to enroll?',
    a: 'We accept major credit and debit cards for international payments. Local payment options are available depending on your region. All transactions are processed securely with instant enrollment confirmation.'
  },
  {
    q: 'Do I need a powerful computer or fast internet?',
    a: 'No. Most AI coding tools run in a web browser and work on mid-range laptops and even tablets. For low-bandwidth users, we offer WhatsApp micro-learning with downloadable offline materials. You can start learning on 3G and scale up as your connection allows.'
  },
  {
    q: 'What can I build after completing the Vibe Coding track?',
    a: 'By the end of the program you will have shipped 4 real projects: a portfolio site, a business landing page, a data dashboard, and a full-stack application with database and authentication. These become your professional portfolio for job applications or freelance contracts.'
  }
];

const testimonials = [
  {
    quote: 'I went from never writing a line of code to deploying a complete e-commerce product page in one afternoon. The local language prompt guide made everything click.',
    name: 'Zawadi M',
    role: 'Fashion Boutique Owner, Dar es Salaam',
    initials: 'ZM'
  },
  {
    quote: 'The Vibe Coding workflow our team uses now is completely different from a year ago. We ship features in days, not weeks. The CS Academy framework gave us the language to direct AI precisely.',
    name: 'Chidi O',
    role: 'CTO, Fintech Startup, Nairobi',
    initials: 'CO'
  },
  {
    quote: 'I used to be embarrassed about my coding speed. Now I am the fastest developer in my cohort because I understand how to prompt, review, and iterate. The AI handles the boilerplate.',
    name: 'Lars N',
    role: 'Junior Developer, Kampala',
    initials: 'LN'
  }
];

export const VibeCodingPage: React.FC<VibeCodingPageProps> = ({
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const canonical = useCanonicalUrl();
  return (
    <>
      <Helmet>
        <title>Vibe Coding Tanzania | AI-Powered Web Development & AI Safety | CS Academy</title>
        <meta name="description" content="Learn Vibe Coding in Tanzania and East Africa. Build real websites, dashboards, and apps using Cursor AI, Bolt.new and v0.dev. Includes AI safety, cybersecurity fundamentals, and digital skills. No prior coding required." />
        <meta name="keywords" content="vibe coding Tanzania, AI web development East Africa, Cursor AI Tanzania, Bolt.new Africa, AI safety training, cybersecurity fundamentals, digital skills training, coding bootcamp" />
        <meta property="og:title" content="Vibe Coding Tanzania | CS Academy - AI-Powered Web Development and Digital Skills" />
        <meta property="og:description" content="Build real websites, dashboards, and apps using AI tools. Covers AI safety, cybersecurity fundamentals, and digital skills. No prior coding required. Mobile money enrollment." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
      }`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

          {/* HERO */}
          <section className="text-center pt-12 pb-8 space-y-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              Vibe Coding
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openBookingModal({ program: 'Vibe Coding and AI-Powered Web Development' })}
                className="group px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Start Vibe Coding
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => {
                  setCurrentRoute('programs/ai');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-8 py-4 rounded-2xl font-bold text-sm border transition-all hover:-translate-y-0.5 ${
                  theme === 'dark'
                    ? 'text-white border-white/20 bg-white/5 hover:bg-white/10'
                    : 'text-neutral-900 border-neutral-300 bg-white hover:bg-neutral-100'
                }`}
              >
                View Full AI Academy
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              {[
                { icon: Code2, text: 'No prior coding required' },
                { icon: Globe, text: 'English and local language instruction' },
                { icon: Smartphone, text: 'Learn on phone or laptop' },
                { icon: Award, text: 'QR-verified certificate' },
              ].map(item => (
                <div key={item.text} className={`flex items-center gap-2 text-xs font-semibold ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                }`}>
                  <item.icon className="w-4 h-4 text-[var(--accent-red-strong)]" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* WHAT IS VIBE CODING */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                The New Paradigm
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                What is Vibe Coding?
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}>
                Vibe Coding is a modern approach to building software where you use natural language, plain English or local languages, to direct AI coding tools to write, edit, and ship your application. Instead of memorizing syntax, you focus on <strong>what</strong> you want to build and <strong>why</strong>. The AI handles the <strong>how</strong>.
              </p>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}>
                Think of it as having a senior developer sitting beside you at all times, one who never gets tired, never forgets context, and can produce production-ready code in seconds. You review, refine, and direct. The AI executes at machine speed.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: 'Traditional Coding', items: ['Months to first prototype', 'Syntax memorization required', 'One language at a time', 'Debugging from scratch'] },
                  { label: 'Vibe Coding', items: ['Hours to first deployment', 'Natural language only', 'Full-stack from day one', 'AI handles repetitive code'] },
                ].map(col => (
                  <div key={col.label} className={`p-5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}>
                    <div className={`text-xs font-black uppercase tracking-wider mb-3 ${
                      col.label === 'Vibe Coding' ? 'text-[var(--accent-red-strong)]' : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>{col.label}</div>
                    {col.items.map(item => (
                      <div key={item} className="flex items-start gap-2 text-xs mb-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${col.label === 'Vibe Coding' ? 'text-emerald-500' : 'text-neutral-500'}`} />
                        <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-3xl border p-8 ${
              theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="flex items-center gap-2 mb-5">
                <Monitor className="w-5 h-5 text-[var(--accent-red-strong)]" />
                <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Your First Vibe Coded App
                </span>
              </div>
              <div className={`rounded-2xl p-5 font-mono text-xs leading-relaxed space-y-3 ${
                theme === 'dark' 
                  ? 'bg-[#1a1a1a] text-green-400' 
                  : 'bg-neutral-100 text-neutral-700'
              }`}>
                <div><span className={theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}>#</span> <span className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>PROMPT</span> - describe your app in plain English</div>
                <div className={`border-l-2 pl-4 ${
                  theme === 'dark' ? 'text-neutral-500 border-neutral-700' : 'text-neutral-600 border-neutral-400'
                }`}>
                  "Build a landing page for a tailoring business in Arusha. It should have a hero with the business name 'Stitch and Style', a services grid, a gallery of 6 past projects, a WhatsApp order button, and a contact form. Use warm red and cream colors."
                </div>
                <div><span className={theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}>#</span> <span className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>AI GENERATES</span></div>
                <div className={`border-l-2 pl-4 ${
                  theme === 'dark' ? 'text-neutral-500 border-green-700' : 'text-neutral-600 border-green-600'
                }`}>
                  Complete React and Tailwind landing page<br />
                  Responsive across mobile and desktop<br />
                  WhatsApp DM link auto-configured<br />
                  Contact form with validation<br />
                  Ready to deploy to Vercel in 1 click
                </div>
                <div><span className={theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}>#</span> <span className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>YOUR ROLE</span> <span className={theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}>- review, request changes, ship</span></div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40">
                <p className={`text-xs font-semibold ${
                  theme === 'dark' ? 'text-emerald-300' : 'text-emerald-800'
                }`}>
                  Result: A complete, publishable landing page in under 2 hours, without writing a single HTML tag.
                </p>
              </div>
            </div>
          </section>

          {/* TOOLS MASTERY */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                Tools Mastery
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Modern AI Coding Tools You Will Master
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                We do not teach abstract concepts. Every module is tied to a production tool you will actually use. By the end of the track you will have hands-on experience with the full AI development stack.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map(tool => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className={`rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-xl group ${
                      theme === 'dark'
                        ? 'bg-[#111] border-neutral-800 hover:border-neutral-600'
                        : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${tool.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: tool.color }} />
                      </div>
                    </div>
                    <h3 className={`text-lg font-black mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}>{tool.name}</h3>
                    <p className="text-xs font-semibold mb-3" style={{ color: tool.color }}>{tool.tagline}</p>
                    <p className={`text-xs leading-relaxed mb-4 ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>{tool.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.bestFor.map(tag => (
                        <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          theme === 'dark'
                            ? 'border-neutral-700 text-neutral-400'
                            : 'border-neutral-300 text-neutral-600'
                        }`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* USE CASES */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                Real-World Outcomes
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                What Can You Actually Build?
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                Vibe Coding is not a toy. It ships production-ready products. Here are four real project categories our students build, ship, and get paid for.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {useCases.map(uc => {
                const Icon = uc.icon;
                return (
                  <div key={uc.title} className={`rounded-2xl p-7 border space-y-4 ${
                    theme === 'dark'
                      ? 'bg-[#111] border-neutral-800'
                      : 'bg-white border-neutral-200'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-red)]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[var(--accent-red-strong)]" />
                      </div>
                      <h3 className={`text-lg font-black ${
                        theme === 'dark' ? 'text-white' : 'text-neutral-950'
                      }`}>{uc.title}</h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>{uc.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {uc.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--accent-red)]/10 text-[var(--accent-red-strong)] border border-[var(--accent-red)]/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5" />
                Student Stories
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                From Zero to Shipped
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {testimonials.map(t => (
                <div key={t.name} className={`rounded-2xl p-6 border ${
                  theme === 'dark'
                    ? 'bg-[#111] border-neutral-800'
                    : 'bg-white border-neutral-200'
                }`}>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--accent-red)] flex items-center justify-center text-white text-xs font-black" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{t.name}</div>
                      <div className={`text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                Regional FAQ
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Questions from East African Learners
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-[#111] border-neutral-800'
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className={`text-sm font-bold pr-4 leading-snug ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}>{faq.q}</span>
                    {openFaq === idx
                      ? <ChevronUp className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                    }
                  </button>
                  {openFaq === idx && (
                    <div className={`px-5 pb-5 text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA BANNER */}
          <section className={`rounded-3xl p-6 sm:p-10 lg:p-14 border text-center space-y-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[var(--accent-red-subtle)] via-[var(--accent-red-hover)] to-[var(--accent-red-subtle)] border-[var(--accent-red-border)]'
              : 'bg-gradient-to-br from-[var(--accent-red-subtle)] via-[var(--accent-red-hover)] to-[var(--accent-red-subtle)] border-red-800/40'
          }`}>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Start Vibe Coding?
            </h2>
            <p className="text-white/80 text-base max-w-lg mx-auto">
               Join the next cohort and build your first real application in the first week. Enrollment is open to learners across East Africa with flexible payment options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openBookingModal({ program: 'Vibe Coding and AI-Powered Web Development' })}
                className="group px-8 py-4 rounded-2xl font-extrabold text-sm text-[var(--accent-red-hover)] bg-white hover:bg-neutral-100 uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Enroll in Next Cohort
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => openBookingModal({ program: 'Vibe Coding - Custom Proposal' })}
                className="px-8 py-4 rounded-2xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 uppercase tracking-wider transition-all"
              >
                Request Team Quote
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};
