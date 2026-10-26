import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/site';
import {
  ArrowRight,
  MessageCircle,
  Users,
  Trophy,
  Hammer,
  Rocket
} from 'lucide-react';

interface DevPadTileProps {
  openBookingModal: () => void;
}

const highlights = [
  { icon: Users, label: '120+ active builders' },
  { icon: Trophy, label: 'Monthly Testathons' },
  { icon: Hammer, label: 'Real peer feedback' }
];

export const DevPadTile: React.FC<DevPadTileProps> = ({
  openBookingModal
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello CS Academy, I'd like to join the DevPad developer community on WhatsApp."
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section
      id="devpad-tile"
      className={`relative overflow-hidden border-y ${
        isDark
          ? 'border-[var(--border-color)] bg-gradient-to-br from-pink-950/30 via-[var(--bg-secondary)] to-[var(--bg-primary)]'
          : 'border-neutral-200 bg-gradient-to-br from-pink-50 via-white to-white'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-500 text-[10px] font-black uppercase tracking-[0.18em]">
              Free WhatsApp Community
            </div>

            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-[1.05] ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              DevPad.{' '}
              <span className="text-[var(--accent-red-strong)]">
                Build, test, and launch
              </span>{' '}
              with a community of developers.
            </h2>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              A WhatsApp-first developer community for builders who want real feedback, accountability, and a launch squad. No downloads for downloads just developers supporting developers.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className={`flex items-center gap-2.5 rounded-2xl border p-3 ${
                      isDark
                        ? 'border-white/10 bg-white/5'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <div
                      className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-xl ${
                        isDark ? 'bg-pink-500/15 text-pink-400' : 'bg-pink-50 text-pink-600'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-bold leading-tight ${
                        isDark ? 'text-white' : 'text-neutral-900'
                      }`}
                    >
                      {h.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/devpad"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent-red)] text-white text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-red-500/20 hover:bg-[var(--accent-red-hover)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Rocket className="w-4 h-4" />
                Launch DevPad
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={openWhatsApp}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border text-sm font-bold uppercase tracking-wider transition-colors ${
                  isDark
                    ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                Join on WhatsApp
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className={`relative rounded-3xl border overflow-hidden shadow-2xl ${
                isDark ? 'border-white/10 bg-[#000000]' : 'border-neutral-200 bg-white'
              }`}
            >
              <div
                className={`flex items-center justify-between px-5 py-3 border-b ${
                  isDark ? 'border-neutral-800' : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                      DevPad Community
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold">120+ active builders</div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Live
                </div>
              </div>

              <div className={`p-4 space-y-3 ${isDark ? 'bg-[#000000]' : 'bg-neutral-50'}`}>
                {[
                  { author: 'Kenji W', initials: 'KW', time: '9:12 AM', color: '#dc2626', msg: 'Pushed build 0.7 today. Looking for testers to stress the new onboarding flow.' },
                  { author: 'Priya R', initials: 'PR', time: '9:14 AM', color: '#dc2626', msg: 'Installing now. Will run it through three scenarios and drop feedback tonight.' },
                  { author: 'Sven L', initials: 'SL', time: '9:21 AM', color: '#dc2626', msg: 'Testathon kicks off Friday. Bring a product to be tested, leave with three peer reviews.' }
                ].map((m) => (
                  <div key={m.author} className="flex items-start gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                      style={{ background: m.color, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                      aria-hidden="true"
                    >
                      {m.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`rounded-2xl rounded-tl-sm px-3.5 py-2 ${
                          isDark ? 'bg-neutral-800' : 'bg-white border border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                            {m.author}
                          </span>
                          <span className="text-[9px] text-neutral-500">{m.time}</span>
                        </div>
                        <div className={`text-[11px] leading-snug ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                          {m.msg}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-3 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider ${
              isDark ? 'text-neutral-500' : 'text-neutral-600'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              No spam. No engagement bait. Just builders.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
