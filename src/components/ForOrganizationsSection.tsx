import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  GraduationCap,
  HeartHandshake, 
  Landmark, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Award
} from 'lucide-react';

interface ForOrganizationsSectionProps {
  openBookingModal: (prefill?: { program?: string; format?: string; organizationType?: string }) => void;
}

export const ForOrganizationsSection: React.FC<ForOrganizationsSectionProps> = ({
  openBookingModal
}) => {
  const { theme, t } = useApp();

  const corporateServices = [
    { 
      title: 'Corporate AI Training',
      icon: Award,
      desc: 'Upskill departments on daily generative productivity, data synthesis, and prompting.'},
    { 
      title: 'Cybersecurity Awareness', 
      icon: ShieldCheck, 
      desc: 'Train staff to neutralize phishing, credential compromise, and mobile fraud.'},
    { 
      title: 'Executive AI Briefings', 
      icon: Award, 
      desc: 'Briefings for senior leaders, with duration and topics agreed for each engagement.'},
    { 
      title: 'University Capacity Building', 
      icon: GraduationCap, 
      desc: 'Integrate practical AI tools and ethical research standards for academic faculty.'},
    { 
      title: 'NGO Digital Skills', 
      icon: HeartHandshake, 
      desc: 'Accelerate donor reporting, proposal drafting, and field coordination.'},
    { 
      title: 'Government Workshops', 
      icon: Landmark, 
      desc: 'Equip civil servants with digital public administration and data governance skills.'},
    { 
      title: 'AI Policy & Governance', 
      icon: FileText, 
      desc: 'Help your leadership formulate clear, legally compliant internal AI usage policies.'},
    { 
      title: 'Digital Safety Retainers', 
      icon: Lock, 
      desc: 'Continuous quarterly cyber hygiene drills and deepfake readiness briefings.'}
  ];

  return (
    <section 
      id="for-organizations-section" 
      className={`py-24 border-y transition-colors duration-300 relative ${
        theme === 'dark' ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]' : 'bg-white text-neutral-900 border-neutral-300'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-[var(--accent-red-strong)] text-xs font-mono font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.organizations.badge}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-neutral-950'
          }`}>
            {t.organizations.title}
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'
          }`}>
            {t.organizations.subtitle}
          </p>
        </div>

        {/* Corporate Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {corporateServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all duration-200 hover:-translate-y-1 space-y-3 flex flex-col justify-between shadow-sm ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] hover:border-neutral-700'
                    : 'bg-white border-neutral-300 hover:border-red-400 hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-[var(--accent-red-strong)] ${
                    theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-red-50 border-red-100'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{service.title}</h3>
                  <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-800'}`}>{service.desc}</p>
                </div>
                <button
                  onClick={() => openBookingModal({ program: service.title, organizationType: 'Corporate/Enterprise' })}
                  className="text-left text-xs font-bold text-[var(--accent-red-strong)] hover:text-red-700 flex items-center gap-1 pt-2 transition-colors"
                >
                  <span>Request Outline</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner / Value Card */}
        <div className={`border rounded-3xl p-8 sm:p-12 shadow-2xl ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--accent-red-subtle)] to-[var(--bg-secondary)] border-[var(--accent-red-border)]' 
            : 'bg-gradient-to-r from-red-50/80 via-white to-red-50/80 border-red-200'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold text-[var(--accent-red-strong)] uppercase">
                Institutional Partnership
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                Equip your organization with practical, safe AI & cybersecurity competencies.
              </h3>
              <div className={`grid sm:grid-cols-2 gap-3 pt-2 text-xs ${
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                  <span>Customized to your internal tech stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                  <span>Pre & Post training impact assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                  <span>Confidentiality & NDA compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-red-strong)] shrink-0" />
                  <span>Official Certificates of Completion</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <button
                id="btn-request-corporate-proposal"
                onClick={() => openBookingModal({ program: 'Corporate AI & Security Workforce Training' })}
                className="w-full py-4 px-6 text-xs font-extrabold text-white bg-[var(--accent-red-hover)] hover:bg-[var(--accent-red)] active:scale-[0.98] rounded-2xl shadow-lg hover:shadow-red-900/40 uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>REQUEST CORPORATE PROPOSAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-book-consultation"
                onClick={() => openBookingModal({ program: 'Executive Consultation' })}
                className={`w-full py-3 px-6 text-xs font-bold rounded-2xl border transition-colors uppercase tracking-wider text-center ${
                  theme === 'dark'
                    ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border-[var(--border-color)]'
                    : 'text-neutral-800 hover:text-neutral-950 bg-white hover:bg-neutral-100 transition-colors duration-200 border-neutral-300'
                }`}
              >
                BOOK A CONSULTATION
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
