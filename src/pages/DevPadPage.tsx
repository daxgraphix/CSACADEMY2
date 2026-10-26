import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Bug, Check, Code2, ExternalLink, GitPullRequest, MessageCircle, Rocket, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { siteConfig } from '../config/site';

const workflow = [
  { icon: Code2, title: 'Share what you are building', description: 'Bring an idea, prototype, beta, or working product and explain what kind of feedback would help.' },
  { icon: Bug, title: 'Test with a clear purpose', description: 'Agree on a small set of tasks so peers can focus on usability, confusing steps, or bugs they can reproduce.' },
  { icon: GitPullRequest, title: 'Give useful feedback', description: 'Describe what happened, what you expected, and the steps someone can take to see the issue.' },
  { icon: Rocket, title: 'Choose what to improve', description: 'Use the feedback to plan the next change. Testing and launch outcomes depend on each builder and product.' }
];

const principles = [
  'Share a product you are actively building or contributing to.',
  'Test when you can and agree on expectations before taking part.',
  'Give specific, respectful feedback that helps someone make a decision.',
  'Respect privacy: do not share another member’s code, data, or product details outside the group.',
  'Keep the group focused on building; avoid spam and unsolicited promotion.',
  'Do not promise app installs, reviews, downloads, or launch results in exchange for participation.'
];

const faqs = [
  { question: 'Who is DevPad for?', answer: 'Independent developers, students, designers, product builders, and founders who have an idea or product they want to improve with peer input.' },
  { question: 'Does my product need to be finished?', answer: 'No. You can ask for feedback on an early concept, prototype, beta, or existing product. Be clear about what is ready to test and what kind of feedback you need.' },
  { question: 'Is DevPad a guaranteed testing or launch service?', answer: 'No. It is a peer community. Participation, feedback, testing activity, and launch outcomes depend on member availability and the current community arrangements.' },
  { question: 'How do I ask about joining?', answer: 'Message CS Academy on WhatsApp. The team can share current access details, participation expectations, and any applicable terms before you decide.' }
];

export const DevPadPage: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const canonical = useCanonicalUrl();
  const surface = isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white';
  const body = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('Hello CS Academy, I would like to learn about DevPad. Please share the current joining details and participation expectations.')}`;

  return (
    <main className={`min-h-screen px-4 pb-16 pt-28 sm:pb-20 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-white text-neutral-900'}`}>
      <Helmet>
        <title>DevPad | A Peer Community for Product Builders | CS Academy</title>
        <meta name="description" content="Learn about DevPad, a WhatsApp-based peer community where developers and product builders can share work, request focused feedback, and support one another." />
        <meta name="keywords" content="developer peer community East Africa, product feedback, app testing, DevPad, CS Academy" />
        <meta property="og:title" content="DevPad | A Peer Community for Product Builders" />
        <meta name="twitter:title" content="DevPad | A Peer Community for Product Builders" />
        <meta property="og:description" content="Share what you are building, request focused peer feedback, and learn with other product builders." />
        <meta name="twitter:description" content="Share what you are building, request focused peer feedback, and learn with other product builders." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-14">
        <section className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 lg:p-14 ${surface}`}>
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[var(--accent-red)]/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] ${isDark ? 'border-[var(--accent-red-border)] bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]' : 'border-red-200 bg-red-50 text-[var(--accent-red-hover)]'}`}><Users className="h-3.5 w-3.5 text-[var(--accent-red-strong)]" aria-hidden="true" />A peer community for builders</span>
              <h1 className={`mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Build in company.<br /><span className="text-[var(--accent-red-strong)]">Improve with feedback.</span></h1>
              <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${body}`}>DevPad is a WhatsApp-based community for developers and product builders to share work, ask focused questions, and exchange constructive peer feedback.</p>
              <p className={`mt-3 max-w-2xl text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Community access and activities depend on current arrangements. Ask us about joining and the participation terms before sharing your product.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[var(--accent-red-hover)]"><MessageCircle className="h-4 w-4" aria-hidden="true" />Ask about joining <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
                <a href="#how-it-works" className={`inline-flex min-h-12 items-center justify-center rounded-xl border px-5 py-3 text-sm font-bold ${isDark ? 'border-[var(--border-color)] text-neutral-200 hover:bg-white/[0.05]' : 'border-neutral-300 text-neutral-800 hover:bg-neutral-50'}`}>How it works</a>
              </div>
            </div>
            <div className={`relative rounded-2xl border p-4 sm:p-5 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-neutral-50'}`}>
              <div className="flex items-center gap-3 border-b border-[var(--border-color)]/60 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-red)] text-white"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span>
                <div><p className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>A useful feedback request</p><p className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>A simple template to get started</p></div>
              </div>
              <div className="space-y-3 py-4">
                {[
                  ['What I am building', 'A short description and who it is for'],
                  ['What to test', 'The exact flow or question to review'],
                  ['What feedback helps', 'Usability notes, bugs, or ideas']
                ].map(([label, detail]) => <div key={label} className={`rounded-xl border p-3 ${isDark ? 'border-[var(--border-color)] bg-white/[0.03]' : 'border-neutral-200 bg-white'}`}><p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-[var(--accent-red-strong)]' : 'text-[var(--accent-red-hover)]'}`}>{label}</p><p className={`mt-1 text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>{detail}</p></div>)}
              </div>
              <p className={`flex items-start gap-2 rounded-xl p-3 text-[10px] leading-relaxed border ${isDark ? 'border-red-900/40 bg-red-950/20 text-neutral-300' : 'border-red-200 bg-red-50 text-neutral-800'}`}><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />Share only information you have permission to disclose. Avoid credentials, private user data, and confidential code.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="space-y-5 scroll-mt-28">
          <header className="max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">A practical feedback loop</p><h2 className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>How DevPad works</h2><p className={`mt-2 text-sm leading-relaxed ${body}`}>Members can use the group to request and give peer input. The steps below are a useful way to make that exchange specific.</p></header>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {workflow.map(({ icon: Icon, title, description }, index) => <article key={title} className={`rounded-2xl border p-4 sm:p-5 ${surface}`}><div className="flex items-center justify-between"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? 'bg-[var(--accent-red-subtle)] text-[var(--accent-red-strong)]' : 'bg-red-50 text-[var(--accent-red-hover)]'}`}><Icon className="h-5 w-5" aria-hidden="true" /></span><span className={`text-xs font-black ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>0{index + 1}</span></div><h3 className={`mt-4 text-base font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{title}</h3><p className={`mt-2 text-xs leading-relaxed ${body}`}>{description}</p></article>)}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Who it may suit</p>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Bring a question, a build, or a next step.</h2>
            <p className={`mt-3 text-sm leading-relaxed ${body}`}>You do not need a finished product. Share the stage you are at and ask for feedback that fits what is ready to review.</p>
            <div className="mt-5 flex flex-wrap gap-2">{['Students', 'Independent developers', 'Designers', 'Founders', 'Product teams'].map((item) => <span key={item} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${isDark ? 'border-[var(--border-color)] text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'}`}>{item}</span>)}</div>
          </div>
          <div className={`rounded-2xl border p-5 sm:p-7 ${surface}`}>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--accent-red-strong)]" aria-hidden="true" /><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Community expectations</p></div>
            <h2 className={`mt-2 text-xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>Keep feedback useful and respectful.</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">{principles.map((principle) => <li key={principle} className={`flex items-start gap-2 rounded-xl p-3 text-xs leading-relaxed ${isDark ? 'bg-[var(--bg-primary)] text-neutral-300' : 'bg-neutral-50 text-neutral-700'}`}><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" />{principle}</li>)}</ul>
          </div>
        </section>

        <section className="mx-auto max-w-3xl space-y-5" aria-labelledby="devpad-faq-title">
          <header className="text-center"><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent-red-strong)]">Before you join</p><h2 id="devpad-faq-title" className={`mt-2 text-2xl font-black sm:text-3xl ${isDark ? 'text-white' : 'text-neutral-950'}`}>Common questions</h2></header>
          <div className="space-y-2">{faqs.map((faq) => <details key={faq.question} className={`group rounded-xl border px-4 py-3 ${surface}`}><summary className={`cursor-pointer list-none text-sm font-bold ${isDark ? 'text-neutral-100' : 'text-neutral-900'}`}>{faq.question}<span className="float-right text-[var(--accent-red-strong)] transition group-open:rotate-45">+</span></summary><p className={`pt-3 text-xs leading-relaxed ${body}`}>{faq.answer}</p></details>)}</div>
        </section>

        <section className={`flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7 ${isDark ? 'border-[var(--accent-red-border)] bg-red-950/20' : 'border-red-200 bg-red-50/50'}`}>
          <div><h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-neutral-950'}`}>Want to ask about joining DevPad?</h2><p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>Message us for current access details, availability, and participation terms.</p></div>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-2.5 text-xs font-extrabold text-white hover:bg-[var(--accent-red-hover)]"><MessageCircle className="h-4 w-4" aria-hidden="true" />Ask on WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </section>

        <div className="text-center"><Link to="/programs" className={`inline-flex items-center gap-2 text-xs font-bold ${isDark ? 'text-neutral-300' : 'text-neutral-700'} hover:text-[var(--accent-red-strong)]`}>Explore CS Academy programs <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div>
      </div>
    </main>
  );
};
