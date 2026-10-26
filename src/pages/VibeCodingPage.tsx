import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Lightbulb, MessageSquare, Monitor, ShieldCheck, Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';

const learningSteps = [
  { icon: Lightbulb, title: 'Define the problem', description: 'Choose a real user need, set a small first goal, and describe what the first version should do.' },
  { icon: MessageSquare, title: 'Prompt with context', description: 'Give the coding assistant requirements, constraints, examples, and a way to tell whether the result works.' },
  { icon: Code2, title: 'Review the output', description: 'Read the changes, ask questions, and keep track of files, dependencies, and assumptions the tool adds.' },
  { icon: Wrench, title: 'Test and improve', description: 'Try realistic cases, fix issues, and check security and accessibility before sharing or deploying.' }
];

const exampleProjects = [
  { title: 'A small business landing page', detail: 'Organize services, hours, location, and a clear contact path.' },
  { title: 'A personal project portfolio', detail: 'Present selected work, explain your role, and make contact details easy to find.' },
  { title: 'A simple tracking dashboard', detail: 'Display sample records with filters and clear empty or error states.' }
];

const toolExamples = ['Cursor', 'GitHub Copilot', 'Bolt.new', 'v0'];

const faqs = [
  { question: 'Do I need coding experience?', answer: 'You can begin without prior coding experience, but learning basic concepts makes AI-generated code easier to review. The aim is to build understanding alongside using the tools.' },
  { question: 'Does AI build a complete working app for me?', answer: 'AI tools can draft code and prototypes, but results can be incomplete or incorrect. You need to review, test, and refine the code. A working deployment is not guaranteed.' },
  { question: 'Which tools will the course use?', answer: 'Tool examples may include Cursor, GitHub Copilot, Bolt, or v0. Access requirements, features, and pricing can change, so confirm the tools used for the current course before enrolling.' },
  { question: 'Can I study in a local language?', answer: 'CS Academy instruction and course materials are in English. Some AI tools accept prompts in other languages, but support and output quality vary by tool and task.' },
  { question: 'What device and connection do I need?', answer: 'AI coding tools often need a compatible browser or editor and a stable internet connection. Exact device, account, and data requirements depend on the tools used in the selected course.' }
];

export const VibeCodingPage: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const canonical = useCanonicalUrl();
  const surface = isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white';
  const body = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const requestUrl = '/request-training?track=Vibe%20coding&format=Help%20me%20choose';

  return (
    <main className={`min-h-screen px-4 pb-16 pt-28 sm:pb-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'}`}>
      <Helmet>
        <title>Vibe Coding | Learn AI-Assisted Development Responsibly | CS Academy</title>
        <meta name="description" content="Explore CS Academy’s Vibe Coding learning path: define a useful problem, prompt AI coding tools, review generated code, and test prototypes responsibly." />
        <meta name="keywords" content="Vibe Coding course Tanzania, AI-assisted development, prompt-to-code, practical web development East Africa" />
        <meta property="og:title" content="Vibe Coding | CS Academy" />
        <meta name="twitter:title" content="Vibe Coding | CS Academy" />
        <meta property="og:description" content="Learn to plan, prompt, inspect, and test AI-assisted software prototypes." />
        <meta name="twitter:description" content="Learn to plan, prompt, inspect, and test AI-assisted software prototypes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
        <section className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 lg:p-14 ${surface}`}>
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[var(--accent-red)]/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${isDark ? 'border-[var(--accent-red-border)] bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]' : 'border-red-200 bg-red-50 text-[var(--accent-red-hover)]'}`}>AI-assisted development</span>
              <h1 className={`mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Turn an idea into a plan, <span className="text-[var(--accent-red-strong)]">then a prototype.</span></h1>
              <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${body}`}>Vibe Coding uses plain-language instructions to work with AI coding tools. Learn to direct the tool, understand the code it suggests, and test changes before depending on them.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to={requestUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] px-6 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-red)]">Ask about this learning path <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                <Link to="/programs/ai" className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${isDark ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}>Explore the AI Academy</Link>
              </div>
              <p className={`mt-4 text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Instruction and learning materials are in English. Tool access, accounts, and requirements vary.</p>
            </div>

            <div className={`rounded-2xl border p-4 sm:p-5 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}>
              <div className="flex items-center gap-3 border-b border-[var(--border-color)]/60 pb-4"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'}`}><Monitor className="h-5 w-5" aria-hidden="true" /></span><div><h2 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Plan a small first version</h2><p className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Example prompt outline</p></div></div>
              <div className="space-y-3 py-4">
                {[['User', 'Who is this for?'], ['Need', 'What problem should it solve?'], ['First version', 'What are the essential screens or actions?'], ['Checks', 'How will you test it?']].map(([label, question]) => <div key={label} className={`flex gap-3 rounded-xl border p-3 ${isDark ? 'border-[var(--border-color)] bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}><span className={`w-20 shrink-0 text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[var(--accent-red-strong)]' : 'text-[var(--accent-red-hover)]'}`}>{label}</span><span className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{question}</span></div>)}
              </div>
              <p className={`flex items-start gap-2 rounded-xl p-3 text-[10px] leading-relaxed border ${isDark ? 'border-red-900/40 bg-red-950/20 text-neutral-300' : 'border-red-200 bg-red-50 text-neutral-800'}`}><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />Never paste passwords, private user data, or confidential code into an AI tool unless you have verified its data handling rules and have permission.</p>
            </div>
          </div>
        </section>

        <section className="space-y-5" aria-labelledby="vibe-workflow-title">
          <header className="max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">A responsible workflow</p><h2 id="vibe-workflow-title" className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Keep the human in the loop</h2><p className={`mt-2 text-sm leading-relaxed ${body}`}>Use the assistant to explore and draft. You stay responsible for requirements, review, testing, and decisions.</p></header>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{learningSteps.map(({ icon: Icon, title, description }, index) => <article key={title} className={`rounded-2xl border p-4 sm:p-5 ${surface}`}><div className="flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className={`text-xs font-black ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>0{index + 1}</span></div><h3 className={`mt-4 text-base font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{title}</h3><p className={`mt-2 text-xs leading-relaxed ${body}`}>{description}</p></article>)}</div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Tools change often</p>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Learn the method, not just a menu.</h2>
            <p className={`mt-3 text-sm leading-relaxed ${body}`}>Tools are examples, not a promise that every product or paid feature is included. Confirm the current tool list, account needs, and any third-party costs for a specific course.</p>
            <div className="mt-4 flex flex-wrap gap-2">{toolExamples.map((tool) => <span key={tool} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)] text-neutral-200' : 'border-neutral-200 bg-neutral-50 text-neutral-700'}`}>{tool}</span>)}</div>
          </div>
          <div className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Practice examples</p>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Small projects to learn the basics</h2>
            <p className={`mt-2 text-xs leading-relaxed ${body}`}>Examples to practise requirements, interface decisions, and testing. The exact curriculum depends on the selected course.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">{exampleProjects.map((project) => <article key={project.title} className={`rounded-xl border p-3 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}><h3 className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{project.title}</h3><p className={`mt-2 text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{project.detail}</p></article>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl space-y-5" aria-labelledby="vibe-faq-title">
          <header className="text-center"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Course details</p><h2 id="vibe-faq-title" className={`mt-2 text-2xl font-black sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Common questions</h2></header>
          <div className="space-y-2">{faqs.map((faq) => <details key={faq.question} className={`group rounded-xl border px-4 py-3 ${surface}`}><summary className={`cursor-pointer list-none text-sm font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{faq.question}<span className="float-right text-[var(--accent-red-strong)] transition group-open:rotate-45">+</span></summary><p className={`pt-3 text-xs leading-relaxed ${body}`}>{faq.answer}</p></details>)}</div>
        </section>

        <section className={`flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${isDark ? 'border-[var(--accent-red-border)] bg-red-950/20' : 'border-red-200 bg-red-50/50'}`}>
          <div><h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-neutral-950'}`}>Interested in learning Vibe Coding?</h2><p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Send a request. We’ll share the current course scope, schedule, requirements, and confirmed price.</p></div>
          <Link to={requestUrl} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-red-hover)] px-5 py-2.5 text-xs font-extrabold text-white transition-all duration-300 hover:from-[var(--accent-red-hover)] hover:to-[var(--accent-red)] hover:-translate-y-0.5 shadow-md">Make a learning request <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </section>
      </div>
    </main>
  );
};
