import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import {
  X,
  MessageCircle,
  Mail,
  CheckCircle2,
  Calendar,
  Building2,
  User,
  MapPin,
  Clock,
  ArrowRight,
  Copy,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    program?: string;
    format?: string;
    duration?: string;
    organizationType?: string;
  };
}

interface SubmissionReceipt {
  reference: string;
  submittedAt: Date;
  via: 'whatsapp' | 'email';
}

const generateReference = (): string => {
  const ts = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4);
  return `CSA-${ts}-${rand}`;
};

const formatDate = (d: Date): string => {
  return d.toLocaleString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefill
}) => {
  const { theme } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [program, setProgram] = useState('AI Academy Flagship');
  const [format, setFormat] = useState('Live Online (Zoom/Google Meet)');
  const [audienceType, setAudienceType] = useState('Individual Professional');
  const [location, setLocation] = useState('Tanzania');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [refCopied, setRefCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  const emailValid = (value: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());

  useEffect(() => {
    if (prefill) {
      if (prefill.program) setProgram(prefill.program);
      if (prefill.format) setFormat(prefill.format);
      if (prefill.organizationType) setAudienceType(prefill.organizationType);
    }
  }, [prefill, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setOrganization('');
      setProgram('AI Academy Flagship');
      setFormat('Live Online (Zoom/Google Meet)');
      setAudienceType('Individual Professional');
      setLocation('Tanzania');
      setNotes('');
      setErrors({});
      setCopied(false);
      setReceipt(null);
      setRefCopied(false);
      setMessageCopied(false);
    }
  }, [isOpen]);

  // Close on Escape for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!emailValid(email)) {
      next.email = 'Please enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  if (!isOpen) return null;

  const constructMessageText = () => {
    return `Hello CS Academy Team,\n\nI would like to inquire about a training program:\nName: ${name || '[Your Name]'}\nEmail: ${email || '[Your Email]'}\nOrganization / Role: ${organization || '[Individual/Company]'}\nProgram: ${program}\nPreferred Format: ${format}\nAudience Segment: ${audienceType}\nLocation: ${location}\n${notes ? `Specific Goals/Notes: ${notes}\n` : ''}\nPlease provide curriculum details and scheduling availability.`;
  };

  const handleWhatsAppSend = () => {
    if (!validate()) return;
    const text = encodeURIComponent(constructMessageText());
    const ref = generateReference();
    setReceipt({ reference: ref, submittedAt: new Date(), via: 'whatsapp' });
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    if (!validate()) return;
    const subject = encodeURIComponent(`Training Inquiry: ${program} | CS Academy`);
    const body = encodeURIComponent(constructMessageText());
    const ref = generateReference();
    setReceipt({ reference: ref, submittedAt: new Date(), via: 'email' });
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(constructMessageText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyReference = () => {
    if (!receipt) return;
    navigator.clipboard.writeText(receipt.reference);
    setRefCopied(true);
    setTimeout(() => setRefCopied(false), 2500);
  };

  const handleCopyMessageFromReceipt = () => {
    navigator.clipboard.writeText(constructMessageText());
    setMessageCopied(true);
    setTimeout(() => setMessageCopied(false), 2500);
  };

  const openWaDeepLink = () => {
    const text = encodeURIComponent(constructMessageText());
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank');
  };

  const openMailDeepLink = () => {
    const subject = encodeURIComponent(`Training Inquiry: ${program} | CS Academy`);
    const body = encodeURIComponent(constructMessageText());
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-surface animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`transition-colors duration-300 border rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative ${
          theme === 'dark' ? 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={'Book Training'}
      >
        {/* Modal Header */}
        <div className={`sticky top-0 backdrop-blur-md px-6 sm:px-8 py-5 border-b flex items-center justify-between z-10 ${theme === 'dark' ? 'bg-[var(--bg-secondary)]/95 border-[var(--border-color)]' : 'bg-white/95 border-neutral-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] flex items-center justify-center text-[var(--accent-red-strong)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-extrabold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>BOOK TRAINING / INQUIRY</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'}`}>Connect with CS Academy instructors & advisors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form Inputs */}
        <div className="p-6 sm:p-8 space-y-5">

          {receipt ? (
            <BookingSuccess
              receipt={receipt}
              program={program}
              format={format}
              constructMessageText={constructMessageText}
              theme={theme}
              refCopied={refCopied}
              messageCopied={messageCopied}
              onCopyReference={handleCopyReference}
              onCopyMessage={handleCopyMessageFromReceipt}
              onWhatsApp={openWaDeepLink}
              onEmail={openMailDeepLink}
              onSubmitAnother={() => setReceipt(null)}
            />
          ) : (
            <>
          <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                  placeholder="e.g. Neema K"
                  aria-invalid={!!errors.name}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500'
                      : 'bg-white text-neutral-900 placeholder-neutral-500'
                  } ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500/30'
                      : theme === 'dark'
                        ? 'border-[var(--border-color)]'
                        : 'border-neutral-300'
                  }`}
                />
                {errors.name && <p className="text-[10px] font-semibold text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="e.g. neema@company.com"
                  aria-invalid={!!errors.email}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                    theme === 'dark'
                      ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500'
                      : 'bg-white text-neutral-900 placeholder-neutral-500'
                  } ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500/30'
                      : theme === 'dark'
                        ? 'border-[var(--border-color)]'
                        : 'border-neutral-300'
                  }`}
                />
                {errors.email && <p className="text-[10px] font-semibold text-red-500">{errors.email}</p>}
              </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                Organization / Institution (or Individual)
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. University / Company / Self"
                className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                  theme === 'dark'
                    ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500 border-[var(--border-color)]'
                    : 'bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                Location / Country
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                theme === 'dark'
                  ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]'
                  : 'bg-white text-neutral-900 border-neutral-300'
              }`}
            >
              <option value="Tanzania">Tanzania</option>
                <option value="Kenya">Kenya</option>
                <option value="Uganda">Uganda</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Burundi">Burundi</option>
                <option value="DRC">DRC</option>
                <option value="Zanzibar">Zanzibar</option>
                <option value="Other African Country">Other African Country</option>
                <option value="International / Diaspora">International / Diaspora</option>
              </select>
            </div>
          </div>

          {/* Program Select */}
          <div className="space-y-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              Selected Training Program
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                theme === 'dark'
                  ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]'
                  : 'bg-white text-neutral-900 border-neutral-300'
              }`}
            >
              <optgroup label="Core Academies">
                <option value="AI Academy Flagship Program">AI Academy Flagship Program</option>
                <option value="Cybersecurity Academy Program">Cybersecurity Academy Program</option>
                <option value="Digital Skills Academy Program">Digital Skills Academy Program</option>
              </optgroup>
              <optgroup label="Featured Courses">
                <option value="AI for Everyone">AI for Everyone (Beginner)</option>
                <option value="AI for Business & Teams">AI for Business & Teams</option>
                <option value="AI for Educators & Lecturers">AI for Educators & Lecturers</option>
                <option value="AI Safety & Deepfake Defense">AI Safety & Deepfake Defense</option>
                <option value="Cybersecurity Awareness Workshop">Cybersecurity Awareness Workshop</option>
                <option value="Digital Productivity Masterclass">Digital Productivity Masterclass</option>
              </optgroup>
              <optgroup label="Institutional & Speaking">
                <option value="Corporate AI & Cybersecurity Workforce Proposal">Corporate AI & Cybersecurity Workforce Proposal</option>
                <option value="Executive AI Briefing (C-Suite/Boards)">Executive AI Briefing (C-Suite/Boards)</option>
                <option value="Keynote Speaking by Alex Rweyemamu">Keynote Speaking by Alex Rweyemamu</option>
                <option value="Custom Institutional Curriculum">Custom Institutional Curriculum</option>
              </optgroup>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Preferred Delivery Format */}
            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                Preferred Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                theme === 'dark'
                  ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]'
                  : 'bg-white text-neutral-900 border-neutral-300'
              }`}
            >
              <option value="Live Online (Zoom/Google Meet)">Live Online (Zoom/Google Meet)</option>
                <option value="On-Site Physical Workshop">On-Site Physical Workshop</option>
                <option value="WhatsApp Micro-Learning Cohort">WhatsApp Micro-Learning Cohort</option>
                <option value="Hybrid (Online + Physical)">Hybrid (Online + Physical)</option>
                <option value="Conference Keynote / Seminar">Conference Keynote / Seminar</option>
              </select>
            </div>

            {/* Audience Segment */}
            <div className="space-y-1.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
                Audience Segment
              </label>
              <select
                value={audienceType}
                onChange={(e) => setAudienceType(e.target.value)}
              className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                theme === 'dark'
                  ? 'bg-[var(--bg-primary)] text-white border-[var(--border-color)]'
                  : 'bg-white text-neutral-900 border-neutral-300'
              }`}
            >
              <option value="Individual Professional / Student">Individual Professional / Student</option>
                <option value="Company / Enterprise Team">Company / Enterprise Team</option>
                <option value="University / School Faculty">University / School Faculty</option>
                <option value="NGO / Development Organization">NGO / Development Organization</option>
                <option value="Government / Public Institution">Government / Public Institution</option>
                <option value="Small Business Owner">Small Business Owner</option>
              </select>
            </div>
          </div>

          {/* Notes / Special requirements */}
          <div className="space-y-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'}`}>
              Specific Objectives or Team Size (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Training 25 team members on prompt engineering..."
              className={`w-full px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-[var(--accent-red)]/30 focus:border-[var(--accent-red)] ${
                theme === 'dark'
                  ? 'bg-[var(--bg-primary)] text-white placeholder-neutral-500 border-[var(--border-color)]'
                  : 'bg-white text-neutral-900 placeholder-neutral-500 border-neutral-300'
              }`}
            />
          </div>

          {/* Message Preview Box */}
          <div className={`p-3.5 rounded-xl border space-y-1 text-xs ${
            theme === 'dark' ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
          }`}>
            <div className={`flex items-center justify-between text-[10px] font-mono uppercase ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700'
            }`}>
              <span>Automated Message Preview:</span>
              <button
                type="button"
                onClick={handleCopyInquiry}
                className={`font-bold transition-colors ${
                  theme === 'dark'
                    ? 'text-[var(--accent-red-strong)] hover:text-white'
                    : 'text-[var(--accent-red-hover)] hover:text-[var(--accent-red-strong)]'
                }`}
              >
                {copied ? 'Copied to Clipboard!' : 'Copy Text'}
              </button>
            </div>
            <p className={`line-clamp-3 text-[11px] font-mono ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-800'
            }`}>
              {constructMessageText()}
            </p>
          </div>

          {/* Dispatch CTA Buttons */}
          <div className="pt-2 grid sm:grid-cols-2 gap-3">
            <button
              id="modal-send-whatsapp"
              onClick={handleWhatsAppSend}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs text-white bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </button>

            <button
              id="modal-send-email"
              onClick={handleEmailSend}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${
                theme === 'dark'
                  ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
                  : 'text-neutral-800 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-sm'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Send via Email</span>
            </button>
          </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

interface BookingSuccessProps {
  receipt: SubmissionReceipt;
  program: string;
  format: string;
  constructMessageText: () => string;
  theme: string;
  refCopied: boolean;
  messageCopied: boolean;
  onCopyReference: () => void;
  onCopyMessage: () => void;
  onWhatsApp: () => void;
  onEmail: () => void;
  onSubmitAnother: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  receipt,
  program,
  format,
  constructMessageText,
  theme,
  refCopied,
  messageCopied,
  onCopyReference,
  onCopyMessage,
  onWhatsApp,
  onEmail,
  onSubmitAnother
}) => {
  const isDark = theme === 'dark';
  return (
    <div className="space-y-5" role="status" aria-live="polite">
      <div className="text-center space-y-4 pt-2">
        <div className="relative mx-auto w-16 h-16">
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" aria-hidden="true" />
          <span className="absolute inset-0 rounded-full bg-emerald-500/30" aria-hidden="true" />
          <div className="relative w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <div className="space-y-1.5">
          <h4 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Inquiry Dispatched
          </h4>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Your request has been handed off to the CS Academy advisors via {receipt.via === 'whatsapp' ? 'WhatsApp' : 'your email app'}. Keep this reference handy.
          </p>
        </div>
      </div>

      <div className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${
        isDark ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'
      }`}>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5" />
          Reference Number
        </div>
        <div className="flex items-center gap-2">
          <code className={`flex-1 font-mono text-sm sm:text-base font-bold tracking-wider break-all ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>
            {receipt.reference}
          </code>
          <button
            type="button"
            onClick={onCopyReference}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
              isDark
                ? 'bg-emerald-900/50 hover:bg-emerald-900 text-emerald-200'
                : 'bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            {refCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {refCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className={`text-[10px] font-mono ${isDark ? 'text-emerald-300/80' : 'text-emerald-700/80'}`}>
          Submitted {formatDate(receipt.submittedAt)} &middot; {program} &middot; {format}
        </div>
      </div>

      <div className={`rounded-2xl border p-4 flex items-start gap-3 ${
        isDark ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
      }`}>
        <div className="w-9 h-9 rounded-xl bg-[var(--accent-red-subtle)] border-[var(--accent-red-border)] flex items-center justify-center text-[var(--accent-red-strong)] shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <div className={`text-xs font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            We reply within 24 hours
          </div>
          <p className={`text-[11px] leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
            An advisor will confirm curriculum, schedule, and payment options. Reference the ID above if you message us again.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
          Re-send or copy your inquiry
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onWhatsApp}
            className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-white bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onEmail}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${
              isDark
                ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
                : 'text-neutral-800 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-sm'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Open Email</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          type="button"
          onClick={onCopyMessage}
          className={`w-full py-2.5 px-4 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-colors ${
            isDark
              ? 'text-[var(--accent-red-strong)] hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
              : 'text-[var(--accent-red-hover)] hover:text-[var(--accent-red-strong)] bg-white hover:bg-red-50 border border-neutral-300'
          }`}
        >
          {messageCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {messageCopied ? 'Message Copied' : 'Copy Inquiry Text'}
        </button>
      </div>

      <div className={`pt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isDark ? 'border-[var(--border-color)]' : 'border-neutral-200'
      }`}>
        <div className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider ${
          isDark ? 'text-neutral-500' : 'text-neutral-600'
        }`}>
          <Sparkles className="w-3 h-3" />
          Save your reference: {receipt.reference}
        </div>
        <button
          type="button"
          onClick={onSubmitAnother}
          className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${
            isDark
              ? 'text-neutral-400 hover:text-white'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Submit another inquiry
        </button>
      </div>

      <details
        className={`rounded-xl border text-xs ${
          isDark ? 'bg-[var(--bg-primary)] border-[var(--border-color)]' : 'bg-neutral-50 border-neutral-300'
        }`}
      >
        <summary className={`cursor-pointer select-none px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] ${
          isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'
        }`}>
          View submitted message
        </summary>
        <pre className={`px-4 pb-3 pt-1 whitespace-pre-wrap font-mono text-[11px] leading-relaxed ${
          isDark ? 'text-neutral-300' : 'text-neutral-800'
        }`}>
          {constructMessageText()}
        </pre>
      </details>
    </div>
  );
};
