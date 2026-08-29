import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageRoute } from '../types';
import { useApp } from '../context/AppContext';
import {
  Code2,
  Users,
  Hammer,
  MessageCircle,
  Rocket,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Globe,
  Star,
  Sparkles,
  Play,
  ChevronDown,
  ChevronUp,
  Target,
  Trophy,
  Heart,
  Calendar,
  CheckSquare,
  X,
  Smartphone,
  Wrench,
  Bell
} from 'lucide-react';

interface DevPadPageProps {
  setCurrentRoute: (route: PageRoute) => void;
  openBookingModal: (prefill?: { program?: string; format?: string }) => void;
}

const trustBar = [
  { label: 'Active Builders', value: '120+' },
  { label: 'Apps Tested', value: '85+' },
  { label: 'Monthly Testathons', value: '4 / Month' },
  { label: 'Avg. Response Time', value: '< 6h' }
];

const problems = [
  'You ship something and get no real feedback',
  'Testers install your app once and never open it again',
  'You work alone and lose motivation at 70%',
  'Bugs reach launch because no one stress-tested the build',
  'You launch quietly with zero traction',
  'You have no one to ask "is this even a good idea?"'
];

const solutions = [
  'Real, structured feedback from active builders',
  'Accountability partners who actually use your product',
  'Monthly Testathons focused on shipping and quality',
  'Cross-app stress testing before you publish',
  'A launch squad that helps you get seen',
  'Peer developers who understand the journey'
];

const benefits = [
  {
    icon: Lightbulb,
    title: 'Deep UI/UX Feedback',
    desc: 'Get practical feedback from peer developers and creators to improve your interface, navigation, usability, onboarding, and overall user experience.',
    color: '#fbbf24'
  },
  {
    icon: Heart,
    title: 'Accountability Partners',
    desc: 'Connect with developers who can help keep each other accountable throughout testing periods, including maintaining required installations and meaningful testing activity.',
    color: '#ec4899'
  },
  {
    icon: Trophy,
    title: 'Monthly Testathons',
    desc: 'Participate in focused community testing sessions to discover bugs, identify issues, improve performance, and strengthen your product before launch.',
    color: '#10b981'
  },
  {
    icon: Target,
    title: 'Launch Squad',
    desc: 'When you are ready to ship, a small group rallies around your release with installs, reviews, and visibility to help you break out of the zero traction trap.',
    color: '#3b82f6'
  },
  {
    icon: Wrench,
    title: 'Pair Debugging',
    desc: 'Stuck on a tricky bug or architectural decision? Drop a message and get unstuck fast with help from developers who have shipped similar features.',
    color: '#8b5cf6'
  },
  {
    icon: Globe,
    title: 'Cross-Region Network',
    desc: 'Connect with builders across East Africa and beyond. Different markets, different feedback, different distribution channels to test your product in.',
    color: '#0ea5e9'
  }
];

const steps = [
  { icon: Hammer, label: 'Build', desc: 'Work on your mobile or web application.' },
  { icon: Globe, label: 'Share', desc: 'Bring your product to the community.' },
  { icon: Play, label: 'Test', desc: 'Get feedback and real-world testing.' },
  { icon: Sparkles, label: 'Improve', desc: 'Fix bugs and optimize your product.' },
  { icon: MessageCircle, label: 'Support', desc: 'Help fellow developers test and improve.' },
  { icon: Rocket, label: 'Launch', desc: 'Move toward a stronger and more confident release.' }
];

const monthly = [
  { week: 'Week 1', title: 'Build Threads', desc: 'Share what you shipped this week, get quick reactions.' },
  { week: 'Week 2', title: 'Testathon', desc: 'Focused 48-hour testing sprint. Test three apps, get tested on three.' },
  { week: 'Week 3', title: 'Pair Sessions', desc: 'Live pair-debugging and code review with another builder.' },
  { week: 'Week 4', title: 'Launch Clinic', desc: 'Members preparing a launch get visibility, feedback, and a launch plan.' }
];

const audience = [
  'Mobile app developers',
  'Web developers',
  'Software developers',
  'Startup founders',
  'Indie developers',
  'Student developers',
  'UI/UX designers',
  'Product creators',
  'Developers preparing for Google Play or App Store launch'
];

const rules = [
  'Build or actively contribute to a real product',
  'Test at least one peer app per Testathon cycle',
  'Give thoughtful, specific feedback, not just "looks good"',
  'Keep conversations constructive and kind',
  'No spam, no pitch decks, no self-promo in the main feed',
  'Respect every member\'s stage, from student to founder'
];

const testimonials = [
  {
    initials: 'JM',
    name: 'Jina M',
    role: 'Indie Developer, Nairobi',
    quote: 'DevPad gave me the testing structure I never had as a solo builder. Within two months I shipped my first Android app to the Play Store with confidence.',
    color: '#dc2626',
    outcome: 'Shipped to Play Store'
  },
  {
    initials: 'AO',
    name: 'Amara O',
    role: 'Frontend Developer, Dar es Salaam',
    quote: 'The accountability alone changed everything. I finally stopped abandoning side projects at the 70% mark. The community keeps me shipping.',
    color: '#7c3aed',
    outcome: '3 Side Projects Completed'
  },
  {
    initials: 'TE',
    name: 'Tunde E',
    role: 'Startup Founder, Kampala',
    quote: 'I came in with a half-built product and walked out with real user feedback from 12 actual testers. The Testathon format is genuinely useful.',
    color: '#0ea5e9',
    outcome: '12 Real Testers in One Sprint'
  }
];

const faqs = [
  {
    q: 'Is DevPad only for experienced developers?',
    a: 'No. DevPad welcomes developers and creators at every stage, from students shipping their first app to seasoned founders preparing a launch. What matters is that you are actively building something and willing to support others.'
  },
  {
    q: 'How is DevPad different from other app-testing groups?',
    a: 'Most testing networks feel transactional. DevPad is built around developers supporting developers, exchanging meaningful feedback, and staying accountable. The focus is long-term improvement, not just quick installs.'
  },
  {
    q: 'Do I need to have a finished product to join?',
    a: 'Not at all. You can join with an idea, a prototype, a beta, or a near-launch product. The community meets you where you are and helps you take the next step forward.'
  },
  {
    q: 'What is the time commitment?',
    a: 'DevPad is designed to fit alongside your build schedule. You set your own pace, participate in Testathons when you can, and contribute feedback to others as your time allows. Quality of participation matters more than volume.'
  },
  {
    q: 'Is there a fee to join?',
    a: 'DevPad is free to join. The only requirement is that you are actively building something and willing to test and support peer builders. Paid premium tiers will unlock deeper mentorship and dedicated office hours in the future.'
  },
  {
    q: 'How do I join DevPad?',
    a: 'Click the Join DevPad button at the top or bottom of this page. You will be added to the community WhatsApp group where Testathons, feedback threads, and weekly prompts are coordinated.'
  }
];

const whatsappPreview = [
  { author: 'Kenji W', initials: 'KW', time: '9:12 AM', msg: 'Pushed build 0.7 today. Looking for testers to stress the new onboarding flow.', color: '#10b981' },
  { author: 'Priya R', initials: 'PR', time: '9:14 AM', msg: 'Installing now. Will run it through three scenarios and drop feedback tonight.', color: '#3b82f6' },
  { author: 'Sven L', initials: 'SL', time: '9:21 AM', msg: 'Testathon kicks off Friday. Bring a product to be tested, leave with three peer reviews.', color: '#ec4899' },
  { author: 'Yuki J', initials: 'YJ', time: '9:24 AM', msg: 'Reminder: launch clinic next Wednesday. Reply with your launch date if you want a slot.', color: '#8b5cf6' }
];

export const DevPadPage: React.FC<DevPadPageProps> = ({
  setCurrentRoute,
  openBookingModal
}) => {
  const { theme } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>DevPad | Build, Test &amp; Launch With a Developer Community - CS Academy</title>
        <meta name="description" content="DevPad is a WhatsApp developer community for building, testing, and launching digital products together. Get UI/UX feedback, accountability partners, and monthly testathons." />
        <meta name="keywords" content="developer community, app testing community, indie developer support, build in public, launch your app, developer accountability, UI/UX feedback, mobile app testing, web app testing, Testathon, East Africa developers" />
        <meta property="og:title" content="DevPad | Developer Community for Builders and Launchers" />
        <meta property="og:description" content="Build, test, support, and launch with a community of developers and creators. Monthly testathons, accountability, and meaningful peer feedback." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://academy.cyberswahili.co.tz/devpad" />
      </Helmet>

      <div className={`pt-28 pb-20 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white' : 'bg-[#f7f4ee] text-neutral-900'
      }`}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

          {/* HERO */}
          <section className="text-center pt-8 pb-4 space-y-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              DevPad
            </h1>

            <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              Build, test, support, and launch with a community of developers and creators.
            </p>

            <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              A WhatsApp-first developer community for builders who want real feedback, real accountability, and real launches. No downloads-for-downloads. No spam. Just builders supporting builders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/255753969379"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-2xl font-extrabold text-sm text-white bg-[var(--accent-red)] hover:bg-[var(--accent-red-hover)] uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Join DevPad
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('why-devpad');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-8 py-4 rounded-2xl font-bold text-sm border transition-all hover:-translate-y-0.5 ${
                  theme === 'dark'
                    ? 'text-white border-white/20 bg-white/5 hover:bg-white/10'
                    : 'text-neutral-900 border-neutral-300 bg-white hover:bg-neutral-100'
                }`}
              >
                See How It Works
              </button>
            </div>
          </section>

          {/* TRUST STATS */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {trustBar.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl p-5 sm:p-6 border text-center transition-colors ${
                  theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className={`text-2xl sm:text-3xl font-black tracking-tight text-[var(--accent-red-strong)]`}>
                  {s.value}
                </div>
                <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {s.label}
                </div>
              </div>
            ))}
          </section>

          {/* PROBLEM VS SOLUTION */}
          <section id="why-devpad" className="grid lg:grid-cols-2 gap-6">
            <div className={`rounded-3xl border p-7 sm:p-8 ${
              theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider mb-5">
                <X className="w-3 h-3" />
                The Old Way
              </div>
              <h3 className={`text-2xl font-black mb-5 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Building alone is brutal
              </h3>
              <ul className="space-y-3">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`rounded-3xl border p-7 sm:p-8 ${
              theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider mb-5">
                <CheckCircle2 className="w-3 h-3" />
                The DevPad Way
              </div>
              <h3 className={`text-2xl font-black mb-5 ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Building with peers changes everything
              </h3>
              <ul className="space-y-3">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* WHAT IS DEVPAD - NARRATIVE */}
          <section className="grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                What Is DevPad
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                A developer community that builds together
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}>
                DevPad is a developer community on WhatsApp focused on building, testing, supporting, improving, and launching digital products together. Whether you are building your first app, launching a startup, experimenting with a new idea, or preparing an existing product for release, DevPad gives you access to a network of creators who understand the journey.
              </p>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
              }`}>
                Most testing networks feel transactional. You download an app, they download yours, and nobody ever opens them again. We believe there is a better way. DevPad is a community built around developers supporting developers, not simply exchanging app installations.
              </p>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className={`rounded-3xl border p-5 ${
                theme === 'dark' ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Live This Week</span>
                </div>
                <div className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Testathon #47
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  18 builders testing 9 apps over the next 48 hours.
                </div>
              </div>

              <div className={`rounded-3xl border p-5 ${
                theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[var(--accent-red-strong)]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[var(--accent-red-strong)]">Coming Up</span>
                </div>
                <div className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Launch Clinic
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  4 members preparing launches in the next 30 days. Slots open.
                </div>
              </div>

              <div className={`rounded-3xl border p-5 ${
                theme === 'dark' ? 'bg-amber-950/30 border-amber-800/40' : 'bg-amber-50 border-amber-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700">Recently Shipped</span>
                </div>
                <div className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  3 apps went live
                </div>
                <div className={`text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Thanks to a Testathon, peer reviews, and a launch squad.
                </div>
              </div>
            </div>
          </section>

          {/* WHATSAPP MOCK */}
          <section className={`rounded-3xl border overflow-hidden ${
            theme === 'dark' ? 'bg-[#0a0a0a] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${
              theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    DevPad Community
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">120+ members active today</div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live
              </div>
            </div>
            <div className={`p-4 sm:p-5 space-y-3 ${theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-neutral-50'}`}>
              {whatsappPreview.map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                      style={{ background: m.color, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                    >
                      {m.initials}
                    </div>
                  <div className="flex-1 min-w-0">
                    <div className={`rounded-2xl rounded-tl-sm px-4 py-2.5 ${
                      theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                          {m.author}
                        </span>
                        <span className="text-[9px] text-neutral-500">{m.time}</span>
                      </div>
                      <div className={`text-xs leading-relaxed ${
                        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                      }`}>
                        {m.msg}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BENEFITS */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                What You Get
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Six things every member gets
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                Concrete, ongoing support, not a one-time intro. The value compounds as the community grows with you.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className={`rounded-2xl p-6 border transition-all hover:-translate-y-1 hover:shadow-xl group ${
                      theme === 'dark'
                        ? 'bg-[#111] border-neutral-800 hover:border-neutral-600'
                        : 'bg-white border-neutral-200 hover:border-neutral-400 hover:shadow-lg'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${b.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: b.color }} />
                    </div>
                    <h3 className={`text-lg font-black mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}>{b.title}</h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* HOW IT WORKS - 6 STEP FLOW */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                The Flow
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                How DevPad Works
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                A simple six-step loop you run as many times as you ship.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`relative rounded-2xl p-6 border ${
                      theme === 'dark'
                        ? 'bg-[#111] border-neutral-800'
                        : 'bg-white border-neutral-200'
                    }`}
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--accent-red)] flex items-center justify-center text-white text-xs font-black shadow-md">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2 mb-3 ml-6">
                      <Icon className="w-5 h-5 text-[var(--accent-red-strong)]" />
                    </div>
                    <h3 className={`text-lg font-black mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}>{s.label}</h3>
                    <p className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                    }`}>{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* A MONTH INSIDE DEVPAD */}
          <section className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                Inside The Community
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                A Month Inside DevPad
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {monthly.map((m, idx) => (
                <div
                  key={m.week}
                  className={`rounded-2xl p-5 border ${
                    theme === 'dark'
                      ? 'bg-[#111] border-neutral-800'
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-red)] flex items-center justify-center text-white text-[10px] font-black">
                      W{idx + 1}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'
                    }`}>
                      {m.week}
                    </span>
                  </div>
                  <h3 className={`text-base font-black mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-950'
                  }`}>{m.title}</h3>
                  <p className={`text-xs leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
                  }`}>{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* COMMUNITY RULES */}
          <section className={`rounded-3xl border p-8 sm:p-10 ${
            theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className="grid md:grid-cols-3 gap-10 items-start">
              <div className="md:col-span-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                  <CheckSquare className="w-3 h-3" />
                  House Rules
                </div>
                <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-950'
                }`}>
                  The DevPad Code
                </h2>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  Six simple rules that keep DevPad useful for every member. Read them once. Live by them.
                </p>
              </div>

              <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
                {rules.map((r, i) => (
                  <div
                    key={r}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${
                      theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[var(--accent-red)]/10 text-[var(--accent-red-strong)] text-xs font-black flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <span className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                    }`}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHO SHOULD JOIN */}
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider">
                Audience
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Who Should Join
              </h2>
              <p className={`text-base leading-relaxed ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                DevPad is designed for developers and creators who are actively building digital products.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {audience.map((item) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 p-4 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#111] border-neutral-800' : 'bg-white border-neutral-200'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-red-strong)] shrink-0" />
                  <span className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                  }`}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-red-subtle)]/10 border border-[var(--accent-red-subtle)]/20 text-[var(--accent-red-strong)] text-xs font-black uppercase tracking-wider mb-4">
                <Star className="w-3.5 h-3.5" />
                Member Stories
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Built Together
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {testimonials.map((t) => (
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
                  <p className={`text-sm leading-relaxed mb-5 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>"{t.quote}"</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    theme === 'dark' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    <Trophy className="w-3 h-3" />
                    {t.outcome}
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black"
                      style={{ background: t.color, textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{t.name}</div>
                      <div className={`text-[11px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{t.role}</div>
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
                FAQ
              </div>
              <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}>
                Common Questions
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
          <section className={`rounded-3xl p-10 sm:p-14 border text-center space-y-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-[var(--accent-red-subtle)] via-[var(--accent-red-hover)] to-[var(--accent-red-subtle)] border-[var(--accent-red-border)]'
              : 'bg-gradient-to-br from-[var(--accent-red-subtle)] via-[var(--accent-red-hover)] to-[var(--accent-red-subtle)] border-red-800/40'
          }`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              The Next Testathon Starts Soon
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Build Together. Launch Together.
            </h2>
            <p className="text-white/85 text-base max-w-2xl mx-auto">
              DevPad is more than an app-testing group. We are building a supportive ecosystem where developers can learn from each other, exchange meaningful feedback, stay accountable, and help one another ship better products.
            </p>
            <p className="text-white/80 text-sm max-w-2xl mx-auto">
              Your product journey does not have to happen alone. Build with the community. Test with the community. Improve with the community. Launch with the community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/255753969379"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-2xl font-extrabold text-sm text-[var(--accent-red-hover)] bg-white hover:bg-neutral-100 uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Join DevPad
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <button
                onClick={() => setCurrentRoute('programs/ai')}
                className="px-8 py-4 rounded-2xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 uppercase tracking-wider transition-all"
              >
                View Build Tracks
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};
