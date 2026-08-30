import React from 'react';
import { useApp } from '../context/AppContext';
import { siteConfig } from '../config/site';
import { useReveal } from '../hooks/useReveal';
import {
  Zap,
  Globe2,
  Languages,
  Award,
  MonitorSmartphone,
  ShieldCheck,
  Sliders,
  Building2,
  Users,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';

interface WhyCSAcademyProps {
  openBookingModal?: (prefill?: { program?: string }) => void;
}

export const WhyCSAcademy: React.FC<WhyCSAcademyProps> = ({
  openBookingModal
}) => {
  const { theme, t } = useApp();
  const benefitsRef = useReveal<HTMLDivElement>();

  const stats = [
    { value: siteConfig.stats.learnersTrained, label: 'Learners Trained'},
    { value: siteConfig.stats.institutionsServed, label: 'Institutions Served'},
    { value: siteConfig.stats.hoursDelivered, label: 'Hours Delivered'},
    { value: siteConfig.stats.satisfactionRate, label: 'Satisfaction Rate'},
  ];

  const benefits = [
    { 
      title: 'Practical Learning', 
      desc: 'No abstract theory. You build functional prompts, audit security settings, and create deliverables on day one.', 
      icon: Zap 
    },
    { 
      title: 'Africa-Focused Context', 
      desc: 'Case studies, workflows, and economic realities rooted in the East & Central African business ecosystem.', 
      icon: Globe2 
    },
    { 
      title: 'English & Local Languages',
      desc: 'Bilingual accessibility ensuring language is never an obstacle to mastering high-impact technologies.', 
      icon: Languages 
    },
    { 
      title: 'Expert-Led Sessions', 
      desc: 'Instruction delivered by seasoned cybersecurity professionals, tech educators, and AI practitioners.', 
      icon: Award 
    },
    { 
      title: 'Online & Physical Delivery', 
      desc: 'Seamless choice between live Zoom/Meet classes, WhatsApp micro-learning, and on-site physical workshops.', 
      icon: MonitorSmartphone 
    },
    { 
      title: 'Real-World Deliverables', 
      desc: 'Work directly on your team\'s actual documents, reports, proposals, and security policies.', 
      icon: BadgeCheck 
    },
    { 
      title: 'AI Safety Built In', 
      desc: 'Data privacy, hallucination verification, and deepfake defense are baked into every module.', 
      icon: ShieldCheck 
    },
    { 
      title: 'Flexible Formats', 
      desc: 'From 90-minute executive briefings to multi-week cohort intensives that fit your demanding schedule.', 
      icon: Sliders 
    },
    { 
      title: 'Custom Corporate Training', 
      desc: 'Tailored curricula co-designed for universities, banks, NGOs, and government ministries.', 
      icon: Building2 
    },
    { 
      title: 'Community-Driven Learning', 
      desc: 'Continuous alumni support, daily resource drops, and ongoing mentorship via Cyber Academy communities.',
      icon: Users 
    },
    { 
      title: 'Recognized Certificates', 
      desc: 'QR-verifiable digital certificates trusted by East African employers and institutions.', 
      icon: BadgeCheck 
    }
  ];

  return (
    <section 
      id="why-cs-academy-section" 
      className={`py-24 border-y transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]' : 'bg-neutral-50 text-neutral-900 border-neutral-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] text-[var(--accent-red-strong)] text-xs font-mono font-bold uppercase tracking-wider">
            <span>{t.whyUs.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.whyUs.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
          }`}>
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Impact Stats Strip */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 ${
          theme === 'dark' ? 'text-white' : 'text-neutral-900'
        }`}>
          {stats.map((stat, i) => (
            <div 
              key={i}
              className={`p-5 rounded-2xl border text-center ${
                theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
              }`}
            >
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--accent-red-strong)]">{stat.value}</div>
              <div className={`mt-1 text-[11px] font-semibold uppercase tracking-wider ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
              }`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 11 Benefits Bento Grid */}
        <div ref={benefitsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal-stagger">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl border transition-all duration-200 hover:-translate-y-1 space-y-2.5 flex flex-col justify-between shadow-sm ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-primary)] border-[var(--border-color)] hover:border-neutral-700'
                    : 'bg-white border-neutral-300 hover:border-red-400 hover:shadow-md'
                }`}
              >
                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-[var(--accent-red-strong)] ${
                    theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)]' : 'bg-red-50 border-red-100'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className={`text-sm font-extrabold tracking-tight ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-900'
                  }`}>{item.title}</h3>
                   <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
                  }`}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        {openBookingModal && (
          <div className={`mt-12 rounded-3xl border p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className={`text-xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Ready to start your journey?
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                Join the next hands-on, practical training cohort.
              </p>
            </div>
            <button
              onClick={() => openBookingModal({ program: 'Next Practical Cohort' })}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-extrabold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-2xl shadow-lg uppercase tracking-wider transition-all whitespace-nowrap"
            >
              <span>JOIN NEXT COHORT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
