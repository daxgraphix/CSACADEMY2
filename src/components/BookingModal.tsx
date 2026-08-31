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
  via: 'whatsapp' | 'email' | 'server' | 'draft';
  delivered: boolean;
  needsActivation?: boolean;
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

/**
 * Copy text to the clipboard with a fallback for browsers that block the
 * async Clipboard API (insecure contexts, permission denied, etc.).
 * Returns true on success.
 */
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
};

// Endpoint that accepts a JSON POST and forwards the inquiry to CS Academy
// and a copy to the user. Set via VITE_BOOKING_ENDPOINT. When unset, the modal
// falls back to wa.me / mailto deep links (the original behaviour).
const BOOKING_ENDPOINT: string =
  (typeof import.meta !== 'undefined' &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env
      ?.VITE_BOOKING_ENDPOINT) ||
  '';

const buildSubject = (program: string) => `Training Inquiry: ${program} | CS Academy`;

const buildMessageWithRef = (
  fields: {
    name: string;
    email: string;
    organization: string;
    program: string;
    format: string;
    audienceType: string;
    location: string;
    notes: string;
  },
  reference: string
) => {
  const base = `Hello CS Academy Team,

I would like to inquire about a training program:
Name: ${fields.name || '[Your Name]'}
Email: ${fields.email || '[Your Email]'}
Organization / Role: ${fields.organization || '[Individual/Company]'}
Program: ${fields.program}
Preferred Format: ${fields.format}
Audience Segment: ${fields.audienceType}
Location: ${fields.location}
${fields.notes ? `Specific Goals/Notes: ${fields.notes}\n` : ''}
Please provide curriculum details and scheduling availability.

---
Reference: ${reference}
Submitted via CS Academy website.`;
  return base;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      setIsSubmitting(false);
      setSubmitError(null);
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
    return buildMessageWithRef(
      { name, email, organization, program, format, audienceType, location, notes },
      receipt?.reference ?? '[assigned on submit]'
    );
  };

  const submitToServer = async (): Promise<{ ok: boolean; ref: string; needsActivation?: boolean }> => {
    if (!BOOKING_ENDPOINT) return { ok: false, ref: '', needsActivation: false };
    const ref = generateReference();
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const fullMessage = buildMessageWithRef(
        { name, email, organization, program, format, audienceType, location, notes },
        ref
      );

      // formsubmit.co accepts a standard form-encoded POST and emails the
      // recipient encoded in the URL. Notable fields:
      //   _subject -> custom email subject (overrides the default)
      //   email    -> reply-to / auto-response To-address
      //   name     -> sender display name
      //   _honey   -> honeypot; must be empty (real users won't fill it)
      //   *_other  -> arbitrary fields become rows in the email
      const form = new URLSearchParams();
      form.set('_subject', `[CS Academy] New inquiry — ${program} (ref ${ref})`);
      if (name) form.set('name', name);
      if (email) form.set('email', email);
      form.set('organization', organization || '');
      form.set('program', program);
      form.set('format', format);
      form.set('audienceType', audienceType);
      form.set('location', location);
      form.set('notes', notes || '');
      form.set('reference', ref);
      form.set('submittedAt', new Date().toISOString());
      if (typeof window !== 'undefined') form.set('page', window.location.href);
      form.set('message', fullMessage);
      form.set('_honey', '');

      const res = await fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        body: form.toString()
      });

      // formsubmit.co returns 200 with a JSON body of the form
      //   { success: "true" | "false", message: "..." }
      // Parse defensively — content-type can be text/html with JSON body.
      let data: { success?: string | boolean; message?: string } = {};
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      const okFlag = data.success === true || data.success === 'true';
      if (!res.ok || !okFlag) {
        // Special-case formsubmit.co's one-time activation step so the
        // first user doesn't see a hard error.
        const msg = (data.message || '').toLowerCase();
        if (msg.includes('activation')) {
          setSubmitError(
            'Form activation required for this site. formsubmit.co has emailed support@cyberswahili.co.tz a one-time activation link. CS Academy must click it once to enable this origin, and your message will deliver automatically after that.'
          );
          setReceipt({ reference: ref, submittedAt: new Date(), via: 'server', delivered: false, needsActivation: true });
          return { ok: false, ref, needsActivation: true };
        }
        throw new Error(data.message || `Server returned ${res.status}`);
      }

      setReceipt({ reference: ref, submittedAt: new Date(), via: 'server', delivered: true });
      return { ok: true, ref };
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Could not reach the server. Use WhatsApp or Email below.'
      );
      return { ok: false, ref };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = async () => {
    if (!validate()) return;
    if (BOOKING_ENDPOINT) {
      const { ok, ref, needsActivation } = await submitToServer();
      if (needsActivation) {
        // Don't fall back to a WhatsApp draft — the formsubmit
        // activation-needed state is the real story and the success
        // screen already explains it. Opening WhatsApp here would
        // mask the real problem and produce noise.
        return;
      }
      if (ok) {
        // Also open WhatsApp as a parallel channel.
        const text = encodeURIComponent(
          buildMessageWithRef(
            { name, email, organization, program, format, audienceType, location, notes },
            ref
          )
        );
        window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
        return;
      }
    }
    const ref = generateReference();
    const text = encodeURIComponent(
      buildMessageWithRef(
        { name, email, organization, program, format, audienceType, location, notes },
        ref
      )
    );
    setReceipt({ reference: ref, submittedAt: new Date(), via: 'whatsapp', delivered: true });
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSend = async () => {
    if (!validate()) return;
    if (BOOKING_ENDPOINT) {
      const { ok, ref, needsActivation } = await submitToServer();
      if (needsActivation) {
        // Don't fall back to a mailto draft — the formsubmit
        // activation-needed state is the real story and the success
        // screen already explains it. Opening a mailto here would
        // mask the real problem and produce noise (this was the
        // source of the misleading "Draft Opened In Your Mail App"
        // screen on unactivated origins).
        return;
      }
      if (ok) {
        // formsubmit has just delivered the inquiry to
        // support@cyberswahili.co.tz automatically. We intentionally do
        // NOT auto-open a mailto: here — programmatic anchor clicks for
        // mailto after an async await are silently dropped by most
        // browsers (the user-gesture token is consumed). The success
        // screen renders a real mailto anchor ("Email CS Academy") that
        // the user can click as a manual second channel with a fresh
        // gesture.
        return;
      }
    }
    const ref = generateReference();
    setReceipt({ reference: ref, submittedAt: new Date(), via: 'email', delivered: false });
    openMailDeepLink(false, ref);
  };

  const handleCopyInquiry = async () => {
    const ok = await copyToClipboard(constructMessageText());
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyReference = async () => {
    if (!receipt) return;
    const ok = await copyToClipboard(receipt.reference);
    if (ok) {
      setRefCopied(true);
      setTimeout(() => setRefCopied(false), 2500);
    }
  };

  const handleCopyMessageFromReceipt = async () => {
    const ok = await copyToClipboard(constructMessageText());
    if (ok) {
      setMessageCopied(true);
      setTimeout(() => setMessageCopied(false), 2500);
    }
  };

  const buildMailto = (to: string, overrideRef?: string) => {
    const subject = encodeURIComponent(buildSubject(program));
    const body = encodeURIComponent(
      buildMessageWithRef(
        { name, email, organization, program, format, audienceType, location, notes },
        overrideRef ?? receipt?.reference ?? ''
      )
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const openWaDeepLink = () => {
    const text = encodeURIComponent(
      buildMessageWithRef(
        { name, email, organization, program, format, audienceType, location, notes },
        receipt?.reference ?? ''
      )
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const openMailDeepLink = (asUserCopy = false, overrideRef?: string) => {
    const to = asUserCopy && email ? email : siteConfig.email;
    const href = buildMailto(to, overrideRef);
    // Use an anchor click for maximum browser compatibility — anchors
    // are honoured by every major browser as a true user gesture, even
    // when window.location.href = "mailto:…" gets suppressed.
    // Do NOT set target="_blank" on a mailto anchor: browsers open a blank
    // tab instead of launching the OS mail client.
    const a = document.createElement('a');
    a.href = href;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const sendCopyToUser = () => {
    openMailDeepLink(true);
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
              emailHref={buildMailto(siteConfig.email)}
              sendCopyHref={email ? buildMailto(email, receipt?.reference) : undefined}
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
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs text-white bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </>
              )}
            </button>

            <button
              id="modal-send-email"
              onClick={handleEmailSend}
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 ${
                theme === 'dark'
                  ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
                  : 'text-neutral-800 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-sm'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </>
              )}
            </button>
          </div>

          {submitError && (
            <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 text-center">
              {submitError} Falling back to direct app below.
            </div>
          )}
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
  emailHref: string;
  sendCopyHref?: string;
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
  emailHref,
  sendCopyHref,
  onSubmitAnother
}) => {
  const isDark = theme === 'dark';

  const headline = receipt.needsActivation
    ? 'Activation Required'
    : receipt.delivered
      ? 'Inquiry Dispatched'
      : receipt.via === 'email'
        ? 'Draft Opened In Your Mail App'
        : 'Inquiry Ready To Send';

  const subtitle = receipt.needsActivation
    ? 'formsubmit.co requires a one-time activation for this site. CS Academy has been emailed an activation link — once it is clicked, your inquiry (and every future one from this site) will deliver automatically to support@cyberswahili.co.tz. Until then, please use the WhatsApp or Email buttons below to reach us directly.'
    : receipt.delivered
      ? `Your request has been delivered to support@cyberswahili.co.tz${
          receipt.via === 'server' ? ' via our secure server' : ' via WhatsApp'
        }. Keep this reference handy.`
      : receipt.via === 'email'
        ? 'Press Send in your mail app to deliver the inquiry to support@cyberswahili.co.tz. The reference below is already in the email body.'
        : 'WhatsApp opened with your pre-filled inquiry. Press send there to deliver it.';

  return (
    <div className="space-y-5" role="status" aria-live="polite">
      <div className="text-center space-y-4 pt-2">
        <div className="relative mx-auto w-16 h-16">
          <span className={`absolute inset-0 rounded-full ${receipt.delivered ? 'bg-emerald-500/20 animate-ping' : 'bg-amber-500/20'} `} aria-hidden="true" />
          <span className={`absolute inset-0 rounded-full ${receipt.delivered ? 'bg-emerald-500/30' : 'bg-amber-500/30'}`} aria-hidden="true" />
          <div className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
            receipt.delivered ? 'bg-emerald-500' : 'bg-amber-500'
          }`}>
            <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <div className="space-y-1.5">
          <h4 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {headline}
          </h4>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            {subtitle}
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
            <span>{receipt.delivered && receipt.via === 'whatsapp' ? 'Reopen WhatsApp' : 'Open WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {/* Email CS Academy — mailto anchors must NOT use target="_blank" or the browser opens a blank tab instead of the mail client */}
          <a
            href={emailHref}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 ${
              isDark
                ? 'text-neutral-200 hover:text-white bg-[var(--bg-primary)] hover:bg-neutral-800 border border-[var(--border-color)]'
                : 'text-neutral-800 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 shadow-sm'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email CS Academy</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
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
          {sendCopyHref && (
            <a
              href={sendCopyHref}
              className={`w-full py-2.5 px-4 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-colors ${
                isDark
                  ? 'text-emerald-300 hover:text-white bg-emerald-950/30 hover:bg-emerald-900/50 border border-emerald-800/40'
                  : 'text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Send a copy to my email
            </a>
          )}
        </div>
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
