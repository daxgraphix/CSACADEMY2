import React, { useState, useEffect } from 'react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import { siteConfig } from '../config/site';
import { BOOKING_ENDPOINT, submitForm } from '../utils/booking';
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
  ShieldCheck,
  Loader2,
  Wifi,
  Globe,
  AlertCircle
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
  failed?: boolean;
  errorMessage?: string;
}

type DispatchStep = 'idle' | 'validating' | 'contacting' | 'dispatched' | 'failed';
type DispatchChannel = 'whatsapp' | 'email' | null;
type HeroTone = 'success' | 'pending' | 'failed';

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

/* ------------------------------------------------------------------ */
/* Theme-aware class helpers — single source of truth for the modal    */
/* ------------------------------------------------------------------ */

const surfaceClass = (theme: string) =>
  theme === 'dark'
    ? 'border-[var(--border-color)] text-[var(--text-primary)]'
    : 'border-[var(--border-color)] text-[var(--text-primary)]';

const inputBaseClass = (state: 'idle' | 'success' | 'error', theme: string) => {
  if (state === 'error') {
    return 'border-[var(--bk-input-error-border)] focus:ring-[var(--bk-input-error-ring)]';
  }
  if (state === 'success') {
    return 'border-[var(--bk-input-success-border)] focus:ring-[var(--bk-input-success-ring)]';
  }
  return theme === 'dark'
    ? 'border-[var(--bk-input-border)] hover:border-[var(--bk-input-border-hover)] focus:border-[var(--accent-red)] focus:ring-[var(--bk-input-focus-ring)]'
    : 'border-[var(--bk-input-border)] hover:border-[var(--bk-input-border-hover)] focus:border-[var(--accent-red)] focus:ring-[var(--bk-input-focus-ring)]';
};

const Section: React.FC<{ children: React.ReactNode; className?: string; isDark: boolean }> = ({
  children,
  className = '',
  isDark
}) => (
  <div
    className={`rounded-2xl border p-3.5 sm:p-5 space-y-2.5 ${
      isDark
        ? 'bg-[var(--bk-section-bg)] border-[var(--bk-section-border)]'
        : 'bg-[var(--bk-section-bg)] border-[var(--bk-section-border)]'
    } ${className}`}
  >
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; isDark: boolean; tone?: 'default' | 'brand' | 'success' | 'pending' }> = ({
  children,
  isDark,
  tone = 'default'
}) => {
  const color =
    tone === 'success'
      ? isDark ? 'text-emerald-300' : 'text-[var(--bk-ref-label)]'
      : tone === 'pending'
        ? isDark ? 'text-amber-300' : 'text-amber-700'
        : tone === 'brand'
          ? 'text-[var(--bk-icon-color)]'
          : isDark ? 'text-[var(--bk-section-muted)]' : 'text-[var(--bk-section-muted)]';
  return (
    <div className={`text-[10px] font-black uppercase tracking-wider ${color}`}>
      {children}
    </div>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefill
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [program, setProgram] = useState('AI Academy Flagship');
  const [format, setFormat] = useState('Live Online (Zoom/Google Meet)');
  const [audienceType, setAudienceType] = useState('Individual Professional / Student');
  const [location, setLocation] = useState('Tanzania');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [refCopied, setRefCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);
  const [bodyCopied, setBodyCopied] = useState(false);
  const [subjectCopied, setSubjectCopied] = useState(false);
  const [dispatchStep, setDispatchStep] = useState<DispatchStep>('idle');
  const [dispatchChannel, setDispatchChannel] = useState<DispatchChannel>(null);
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
      setAudienceType('Individual Professional / Student');
      setLocation('Tanzania');
      setNotes('');
      setErrors({});
      setTouched({});
      setCopied(false);
      setReceipt(null);
      setRefCopied(false);
      setMessageCopied(false);
      setBodyCopied(false);
      setSubjectCopied(false);
      setDispatchStep('idle');
      setDispatchChannel(null);
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [isOpen]);



  const validate = (): boolean => {
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!emailValid(email)) {
      next.email = 'Please enter a valid email address.';
    }
    setErrors(next);
    setTouched({ name: true, email: true });
    return Object.keys(next).length === 0;
  };

  useModalAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  const constructMessageText = () => {
    return buildMessageWithRef(
      { name, email, organization, program, format, audienceType, location, notes },
      receipt?.reference ?? '[assigned on submit]'
    );
  };

  const submitToServer = async (): Promise<{ ok: boolean; ref: string; needsActivation?: boolean; failed?: boolean; errorMessage?: string }> => {
    if (!BOOKING_ENDPOINT) return { ok: false, ref: '', failed: true, errorMessage: 'Booking endpoint is not configured.' };
    const ref = generateReference();
    setDispatchStep('contacting');
    setIsSubmitting(true);
    setSubmitError(null);

    const fullMessage = buildMessageWithRef(
      { name, email, organization, program, format, audienceType, location, notes },
      ref
    );

    const result = await submitForm({
      _subject: `[CS Academy] New inquiry — ${program} (ref ${ref})`,
      name,
      email,
      organization,
      program,
      format,
      audienceType,
      location,
      notes,
      reference: ref,
      submittedAt: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.href : '',
      message: fullMessage,
      _honey: ''
    });

    if (result.ok) {
      setReceipt({ reference: ref, submittedAt: new Date(), via: 'server', delivered: true });
      setDispatchStep('dispatched');
      setIsSubmitting(false);
      return { ok: true, ref };
    }

    if (result.needsActivation) {
      setSubmitError(
        'Form activation required for this site. formsubmit.co has emailed support@cyberswahili.co.tz a one-time activation link. CS Academy must click it once to enable this origin, and your message will deliver automatically after that.'
      );
      setReceipt({ reference: ref, submittedAt: new Date(), via: 'server', delivered: false, needsActivation: true });
      setDispatchStep('idle');
      setIsSubmitting(false);
      return { ok: false, ref, needsActivation: true };
    }

    const message = result.errorMessage || 'Could not reach the server. Use WhatsApp or Email below.';
    setSubmitError(message);
    setDispatchStep('failed');
    setReceipt({ reference: ref, submittedAt: new Date(), via: 'server', delivered: false, failed: true, errorMessage: message });
    setIsSubmitting(false);
    return { ok: false, ref, failed: true, errorMessage: message };
  };

  const handleWhatsAppSend = async () => {
    setDispatchChannel('whatsapp');
    if (!validate()) {
      setDispatchStep('idle');
      setDispatchChannel(null);
      return;
    }
    setDispatchStep('contacting');
    if (BOOKING_ENDPOINT) {
      const { ok, ref, needsActivation, failed } = await submitToServer();
      if (needsActivation || failed) return;
      if (ok) {
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
    setDispatchStep('dispatched');
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSend = async () => {
    setDispatchChannel('email');
    if (!validate()) {
      setDispatchStep('idle');
      setDispatchChannel(null);
      return;
    }
    setDispatchStep('contacting');
    if (BOOKING_ENDPOINT) {
      const { ok, ref, needsActivation, failed } = await submitToServer();
      if (needsActivation || failed) return;
      if (ok) return;
    }
    const ref = generateReference();
    setReceipt({ reference: ref, submittedAt: new Date(), via: 'email', delivered: false });
    setDispatchStep('dispatched');
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

  const handleCopyBody = async () => {
    const ok = await copyToClipboard(
      buildMessageWithRef(
        { name, email, organization, program, format, audienceType, location, notes },
        receipt?.reference ?? ''
      )
    );
    if (ok) {
      setBodyCopied(true);
      setTimeout(() => setBodyCopied(false), 2500);
    }
  };

  const handleCopySubject = async () => {
    const ok = await copyToClipboard(buildSubject(program));
    if (ok) {
      setSubjectCopied(true);
      setTimeout(() => setSubjectCopied(false), 2500);
    }
  };

  const handleRetry = () => {
    setReceipt(null);
    setSubmitError(null);
    setDispatchStep('idle');
    setDispatchChannel(null);
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
    const a = document.createElement('a');
    a.href = href;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /* ---------------- shared classes ---------------- */

  const labelCls = `text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-[var(--bk-label-color)]`;
  const hintCls = `text-[10px] text-[var(--bk-hint-color)]`;
  const errorCls = `text-[10px] font-semibold text-[var(--bk-input-error-border)]`;
  const selectBase = `w-full px-4 py-2.5 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 bg-[var(--bk-input-bg)] text-[var(--bk-input-text)]`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center glass-surface animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`transition-colors duration-300 border rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl relative overscroll-contain ${surfaceClass(theme)}`}
        style={{ background: 'var(--bk-surface-solid)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={'Book Training'}
        tabIndex={-1}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1" aria-hidden="true">
          <span className="block h-1 w-10 rounded-full" style={{ background: isDark ? '#3a3a3a' : '#d4ccbe' }} />
        </div>

        {/* Accent top bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl hidden sm:block"
          style={{ background: 'linear-gradient(90deg, var(--accent-red), var(--accent-amber), var(--accent-red))' }}
        />

        {/* Modal Header */}
        <div
          className="sticky top-0 backdrop-blur-md px-4 sm:px-8 py-3.5 sm:py-5 border-b z-10"
          style={{
            background: 'var(--bk-surface-solid)',
            borderColor: 'var(--bk-header-border)',
            backgroundImage: 'var(--bk-header-bg)'
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                style={{ background: 'var(--bk-icon-bg)', color: 'var(--bk-icon-color)' }}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`text-base sm:text-lg font-extrabold leading-tight`} style={{ color: 'var(--bk-title-color)' }}>
                  {receipt ? 'Your Inquiry' : 'Book Training / Inquiry'}
                </h3>
                <p className="text-[11px] sm:text-xs truncate" style={{ color: 'var(--bk-subtitle-color)' }}>
                  {receipt
                    ? 'Saved and dispatched — here is everything you need next.'
                    : 'Connect with CS Academy instructors. We reply within 24 hours.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: 'var(--bk-trust-bg)',
                  color: 'var(--bk-trust-text)',
                  border: '1px solid var(--bk-trust-border)'
                }}
              >
                <ShieldCheck className="w-3 h-3" /> Secure · 24h Reply
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-xl transition-colors"
                style={{
                  background: 'var(--bk-close-bg)',
                  color: 'var(--bk-close-text)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bk-close-hover-bg)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--bk-close-hover-text)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bk-close-bg)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--bk-close-text)';
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body / Form Inputs */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-5">

          {receipt ? (
            <BookingSuccess
              receipt={receipt}
              program={program}
              format={format}
              audienceType={audienceType}
              name={name}
              email={email}
              organization={organization}
              notes={notes}
              location={location}
              constructMessageText={constructMessageText}
              theme={theme}
              refCopied={refCopied}
              messageCopied={messageCopied}
              bodyCopied={bodyCopied}
              subjectCopied={subjectCopied}
              onCopyReference={handleCopyReference}
              onCopyMessage={handleCopyMessageFromReceipt}
              onCopyBody={handleCopyBody}
              onCopySubject={handleCopySubject}
              onWhatsApp={openWaDeepLink}
              onRetry={handleRetry}
              emailHref={buildMailto(siteConfig.email)}
              sendCopyHref={email ? buildMailto(email, receipt?.reference) : undefined}
              webmail={{
                to: siteConfig.email,
                subject: buildSubject(program),
                body: buildMessageWithRef(
                  { name, email, organization, program, format, audienceType, location, notes },
                  receipt?.reference ?? ''
                )
              }}
              onSubmitAnother={handleRetry}
              onClose={onClose}
            />
          ) : (
            <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label htmlFor="bk-name" className={labelCls}>
                  <User className="w-3 h-3" /> Your Name
                  <span className="text-[var(--accent-red)] normal-case font-normal">*</span>
                </label>
                <div className="relative">
                  <input
                    id="bk-name"
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                    onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                    placeholder="e.g. Neema K"
                    aria-invalid={!!errors.name}
                    aria-describedby="bk-name-hint"
                    className={`w-full px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 bg-[var(--bk-input-bg)] text-[var(--bk-input-text)] placeholder:text-[var(--bk-input-placeholder)] ${
                      errors.name
                        ? inputBaseClass('error', theme)
                        : touched.name && name.trim()
                          ? inputBaseClass('success', theme)
                          : inputBaseClass('idle', theme)
                    }`}
                  />
                  {touched.name && name.trim() && !errors.name && (
                    <CheckCircle2
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                      style={{ color: 'var(--bk-input-success-border)' }}
                    />
                  )}
                </div>
                {errors.name ? (
                  <p className={errorCls}>{errors.name}</p>
                ) : (
                  <p id="bk-name-hint" className={hintCls}>First and last name.</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="bk-email" className={labelCls}>
                  <Mail className="w-3 h-3" /> Email Address
                  <span className="text-[var(--accent-red)] normal-case font-normal">*</span>
                </label>
                <div className="relative">
                  <input
                    id="bk-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                    onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                    placeholder="e.g. neema@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby="bk-email-hint"
                    className={`w-full px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 bg-[var(--bk-input-bg)] text-[var(--bk-input-text)] placeholder:text-[var(--bk-input-placeholder)] ${
                      errors.email
                        ? inputBaseClass('error', theme)
                        : touched.email && emailValid(email)
                          ? inputBaseClass('success', theme)
                          : inputBaseClass('idle', theme)
                    }`}
                  />
                  {touched.email && emailValid(email) && !errors.email && (
                    <CheckCircle2
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                      style={{ color: 'var(--bk-input-success-border)' }}
                    />
                  )}
                </div>
                {errors.email ? (
                  <p className={errorCls}>{errors.email}</p>
                ) : (
                  <p id="bk-email-hint" className={hintCls}>We send your reply here.</p>
                )}
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label htmlFor="bk-org" className={labelCls}>
                <Building2 className="w-3 h-3" /> Organization / Institution
              </label>
              <input
                id="bk-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. UDSM · Acme Co. · Self"
                aria-describedby="bk-org-hint"
                className={`w-full px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 bg-[var(--bk-input-bg)] text-[var(--bk-input-text)] placeholder:text-[var(--bk-input-placeholder)] ${inputBaseClass('idle', theme)}`}
              />
              <p id="bk-org-hint" className={hintCls}>Company, university, NGO, or "Self".</p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="bk-loc" className={labelCls}>
                <MapPin className="w-3 h-3" /> Location / Country
              </label>
              <select
                id="bk-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`${selectBase} border ${inputBaseClass('idle', theme)} px-3.5 sm:px-4`}
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
            <label htmlFor="bk-program" className={labelCls}>
              <Sparkles className="w-3 h-3" style={{ color: 'var(--bk-icon-color)' }} /> Selected Training Program
            </label>
            <select
              id="bk-program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className={`${selectBase} border ${inputBaseClass('idle', theme)} px-3.5 sm:px-4`}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <label htmlFor="bk-format" className={labelCls}>
                <Clock className="w-3 h-3" /> Preferred Format
              </label>
              <select
                id="bk-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className={`${selectBase} border ${inputBaseClass('idle', theme)} px-3.5 sm:px-4`}
              >
                <option value="Live Online (Zoom/Google Meet)">Live Online (Zoom/Google Meet)</option>
                <option value="On-Site Physical Workshop">On-Site Physical Workshop</option>
                <option value="WhatsApp Micro-Learning Cohort">WhatsApp Micro-Learning Cohort</option>
                <option value="Hybrid (Online + Physical)">Hybrid (Online + Physical)</option>
                <option value="Conference Keynote / Seminar">Conference Keynote / Seminar</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="bk-audience" className={labelCls}>
                <User className="w-3 h-3" /> Audience Segment
              </label>
              <select
                id="bk-audience"
                value={audienceType}
                onChange={(e) => setAudienceType(e.target.value)}
                className={`${selectBase} border ${inputBaseClass('idle', theme)} px-3.5 sm:px-4`}
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
            <label htmlFor="bk-notes" className={labelCls}>
              <Sparkles className="w-3 h-3" style={{ color: 'var(--bk-icon-color)' }} /> Specific Objectives or Team Size
              <span className={`text-[10px] font-normal normal-case ${hintCls}`}>(optional)</span>
            </label>
            <textarea
              id="bk-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="For teams: team size, skills gap, location, and target timing. For individuals: what you want to learn."
              className={`w-full px-3.5 sm:px-4 py-2.5 border rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 bg-[var(--bk-input-bg)] text-[var(--bk-input-text)] placeholder:text-[var(--bk-input-placeholder)] resize-none ${inputBaseClass('idle', theme)}`}
            />
          </div>

          {/* Message Preview Box */}
          <div className="rounded-xl border p-3 sm:p-3.5 space-y-1.5 text-xs bg-[var(--bk-section-bg)] border-[var(--bk-section-border)]">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[var(--bk-section-muted)] gap-2">
              <span className="inline-flex items-center gap-1.5 min-w-0">
                <Mail className="w-3 h-3 shrink-0" /> <span className="truncate">Message that will be sent</span>
              </span>
              <button
                type="button"
                onClick={handleCopyInquiry}
                aria-label="Copy inquiry message to clipboard"
                className="inline-flex items-center gap-1 font-bold transition-colors shrink-0"
                style={{
                  color: copied
                    ? 'var(--bk-copy-success-text)'
                    : isDark ? 'var(--bk-icon-color)' : 'var(--accent-red-hover)'
                }}
              >
                {copied ? <><CheckCircle2 className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
              </button>
            </div>
            <p className="line-clamp-3 text-[10.5px] sm:text-[11px] font-mono text-[var(--bk-mono-text)] break-words">
              {constructMessageText()}
            </p>
          </div>

          {/* What happens next — 3-step timeline */}
          <Section isDark={isDark}>
            <SectionTitle isDark={isDark} tone="brand">What happens after you submit</SectionTitle>
            <ol className="space-y-1.5">
              {[
                { n: 1, title: 'We receive your inquiry instantly', desc: 'Auto-routed to the CS Academy advisory team with your reference number.' },
                { n: 2, title: 'An advisor reviews within 1 hour (business hours)', desc: 'We read every inquiry personally and match you to the right program.' },
                { n: 3, title: 'You get curriculum, schedule, and payment options within 24h', desc: 'Reply to support@cyberswahili.co.tz quoting your reference number.' }
              ].map((s) => (
                <li key={s.n} className="flex items-start gap-2.5">
                  <span
                    className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
                    style={{
                      background: 'var(--bk-timeline-num-bg)',
                      color: 'var(--bk-timeline-num-text)'
                    }}
                  >
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-extrabold text-[var(--bk-section-text)]">{s.title}</div>
                    <div className="text-[10.5px] leading-snug text-[var(--bk-section-muted)]">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* Dispatch Status Pill (live during submission) */}
          {(isSubmitting || dispatchStep === 'contacting' || dispatchStep === 'failed') && (
            <div
              className="flex items-center justify-center gap-2 text-[11px] font-semibold"
              style={{
                color: dispatchStep === 'failed'
                  ? 'var(--bk-status-warning)'
                  : 'var(--bk-section-muted)'
              }}
            >
              {dispatchStep === 'failed' ? (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  Couldn't reach server — use a button below to continue.
                </>
              ) : (
                <>
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'var(--bk-status-online)' }}
                  />
                  {dispatchStep === 'contacting' ? 'Contacting the booking server…' : 'Dispatching your inquiry…'}
                </>
              )}
            </div>
          )}

          {/* Dispatch CTA Buttons */}
          <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <button
              id="modal-send-whatsapp"
              onClick={handleWhatsAppSend}
              disabled={isSubmitting}
              className="group relative w-full py-3.5 px-4 rounded-xl font-extrabold text-xs text-white flex flex-col items-center justify-center gap-0.5 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                background: 'var(--bk-whatsapp-bg)',
                boxShadow: 'var(--bk-whatsapp-shadow)'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bk-whatsapp-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bk-whatsapp-bg)';
              }}
            >
              {isSubmitting && dispatchChannel === 'whatsapp' ? (
                <>
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Sending…
                  </span>
                  <span className="text-[9px] font-medium opacity-80 normal-case tracking-normal">Validating · dispatching</span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Send via WhatsApp
                  </span>
                  <span className="text-[9px] font-medium opacity-80 normal-case tracking-normal">Instant · opens WhatsApp with your inquiry</span>
                </>
              )}
            </button>

            <button
              id="modal-send-email"
              onClick={handleEmailSend}
              disabled={isSubmitting}
              className="group relative w-full py-3.5 px-4 rounded-xl font-bold text-xs flex flex-col items-center justify-center gap-0.5 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                background: 'var(--bk-email-bg)',
                color: 'var(--bk-email-text)',
                border: '1px solid var(--bk-email-border)'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bk-email-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bk-email-bg)';
              }}
            >
              {isSubmitting && dispatchChannel === 'email' ? (
                <>
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Sending…
                  </span>
                  <span className="text-[9px] font-medium opacity-80 normal-case tracking-normal">Validating · dispatching</span>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send via Email
                  </span>
                  <span className="text-[9px] font-medium opacity-80 normal-case tracking-normal">Auto-delivered to support@cyberswahili.co.tz</span>
                </>
              )}
            </button>
          </div>

          {submitError && (
            <div
              className="text-[11px] font-semibold text-center px-3 py-2 rounded-lg"
              style={{
                color: 'var(--bk-status-warning)',
                background: isDark ? 'rgba(245, 158, 11, 0.08)' : '#fffbeb',
                border: '1px solid var(--bk-pill-pending-border)'
              }}
            >
              {submitError}
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
  audienceType: string;
  name: string;
  email: string;
  organization: string;
  notes: string;
  location: string;
  constructMessageText: () => string;
  theme: string;
  refCopied: boolean;
  messageCopied: boolean;
  bodyCopied: boolean;
  subjectCopied: boolean;
  onCopyReference: () => void;
  onCopyMessage: () => void;
  onCopyBody: () => void;
  onCopySubject: () => void;
  onWhatsApp: () => void;
  onRetry: () => void;
  emailHref: string;
  sendCopyHref?: string;
  webmail: { to: string; subject: string; body: string };
  onSubmitAnother: () => void;
  onClose: () => void;
}

const webmailComposeUrl = (
  provider: 'gmail' | 'outlook' | 'yahoo' | 'proton',
  to: string,
  subject: string,
  body: string
) => {
  const params = new URLSearchParams();
  switch (provider) {
    case 'gmail':
      params.set('view', 'cm');
      params.set('fs', '1');
      params.set('to', to);
      params.set('su', subject);
      params.set('body', body);
      return `https://mail.google.com/mail/?${params.toString()}`;
    case 'outlook':
      params.set('to', to);
      params.set('subject', subject);
      params.set('body', body);
      return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
    case 'yahoo':
      params.set('to', to);
      params.set('subject', subject);
      params.set('body', body);
      return `https://compose.mail.yahoo.com/?${params.toString()}`;
    case 'proton':
      return `https://mail.protonmail.com/u/0/inbox?compose=true&to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};

const providerAccent: Record<'gmail' | 'outlook' | 'yahoo' | 'proton', { fg: string; bg: string }> = {
  gmail: { fg: '#ea4335', bg: 'rgba(234, 67, 53, 0.1)' },
  outlook: { fg: '#0078d4', bg: 'rgba(0, 120, 212, 0.1)' },
  yahoo: { fg: '#6001d2', bg: 'rgba(96, 1, 210, 0.1)' },
  proton: { fg: '#6d4aff', bg: 'rgba(109, 74, 255, 0.1)' }
};

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  receipt,
  program,
  format,
  audienceType,
  name,
  email,
  organization,
  notes,
  location,
  constructMessageText,
  theme,
  refCopied,
  messageCopied,
  bodyCopied,
  subjectCopied,
  onCopyReference,
  onCopyMessage,
  onCopyBody,
  onCopySubject,
  onWhatsApp,
  onRetry,
  emailHref,
  sendCopyHref,
  webmail,
  onSubmitAnother,
  onClose
}) => {
  const isDark = theme === 'dark';

  const isFailed = !!receipt.failed;
  const isActivation = !!receipt.needsActivation;

  const heroTone: HeroTone = isFailed ? 'failed' : isActivation || !receipt.delivered ? 'pending' : 'success';

  const headline = isFailed
    ? 'Could not dispatch automatically'
    : isActivation
      ? 'Activation Required'
      : receipt.delivered
        ? 'Inquiry Dispatched'
        : receipt.via === 'email'
          ? 'Mail Draft Opened'
          : 'Inquiry Ready To Send';

  const subtitle = isFailed
    ? `${receipt.errorMessage || 'The booking server could not be reached.'} Your reference is saved below — use one of the buttons to deliver your inquiry manually.`
    : isActivation
      ? 'formsubmit.co requires a one-time activation for this site. CS Academy has been emailed an activation link — once it is clicked, your inquiry (and every future one from this site) will deliver automatically to support@cyberswahili.co.tz. Until then, use the WhatsApp or Email buttons below to reach us directly.'
      : receipt.delivered
        ? `Your request has been delivered to support@cyberswahili.co.tz${
            receipt.via === 'server' ? ' via our secure server' : ' via WhatsApp'
          }. Keep this reference handy.`
        : receipt.via === 'email'
          ? 'Press Send in your mail app to deliver the inquiry to support@cyberswahili.co.tz. The reference is already in the email body.'
          : 'WhatsApp opened with your pre-filled inquiry. Press send there to deliver it.';

  const heroGradient =
    heroTone === 'success' ? 'var(--bk-hero-success)' : heroTone === 'failed' ? 'var(--bk-hero-failed)' : 'var(--bk-hero-pending)';
  const heroGlow =
    heroTone === 'success' ? 'var(--bk-hero-success-glow)' : heroTone === 'failed' ? 'var(--bk-hero-failed-glow)' : 'var(--bk-hero-pending-glow)';

  const channelLabel = isFailed
    ? 'Auto-dispatch failed'
    : isActivation
      ? 'Awaiting form activation'
      : receipt.delivered
        ? receipt.via === 'server'
          ? 'Delivered via secure server'
          : receipt.via === 'whatsapp'
            ? 'Delivered via WhatsApp'
            : 'Delivered'
        : receipt.via === 'email'
          ? 'Draft opened in mail app'
          : receipt.via === 'whatsapp'
            ? 'WhatsApp opened'
            : 'Draft opened';

  const pillTone = heroTone === 'success' ? 'success' : 'pending';
  const pillStyle = {
    background: pillTone === 'success' ? 'var(--bk-pill-success-bg)' : 'var(--bk-pill-pending-bg)',
    color: pillTone === 'success' ? 'var(--bk-pill-success-text)' : 'var(--bk-pill-pending-text)',
    border: `1px solid ${pillTone === 'success' ? 'var(--bk-pill-success-border)' : 'var(--bk-pill-pending-border)'}`
  };

  return (
    <div className="space-y-5" role="status" aria-live="polite">
      <div className="text-center space-y-3.5 pt-2">
        <div className="relative mx-auto w-16 h-16">
          <span
            className={`absolute inset-0 rounded-full ${heroTone === 'success' ? 'animate-ping' : ''}`}
            aria-hidden="true"
            style={{ background: heroGlow, opacity: 0.35 }}
          />
          <span
            className="absolute inset-0 rounded-full"
            aria-hidden="true"
            style={{ background: heroGlow, opacity: 0.55 }}
          />
          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: heroGradient }}
          >
            {heroTone === 'failed' ? (
              <AlertCircle className="w-9 h-9 text-white" strokeWidth={2.5} />
            ) : (
              <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <h4 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--bk-title-color)' }}>
            {headline}
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto text-[var(--bk-section-muted)]">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={pillStyle}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: pillTone === 'success' ? 'var(--bk-status-online)' : 'var(--bk-status-warning)' }}
            />
            {channelLabel}
          </span>
        </div>
      </div>

      {/* Reference card */}
      <div
        className="rounded-2xl border p-4 sm:p-5 space-y-3"
        style={{
          background: 'var(--bk-ref-bg)',
          borderColor: 'var(--bk-ref-border)'
        }}
      >
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider" style={{ color: 'var(--bk-ref-label)' }}>
          <ShieldCheck className="w-3.5 h-3.5" />
          Reference Number
        </div>
        <div className="flex items-center gap-2">
          <code
            className="flex-1 font-mono text-sm sm:text-base font-bold tracking-wider break-all"
            style={{ color: 'var(--bk-ref-text)' }}
          >
            {receipt.reference}
          </code>
          <button
            type="button"
            onClick={onCopyReference}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
            style={{
              background: 'var(--bk-ref-copy-bg)',
              color: 'var(--bk-ref-copy-text)',
              border: '1px solid var(--bk-ref-border)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-ref-copy-bg-hover)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-ref-copy-bg)';
            }}
          >
            {refCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {refCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="text-[10px] font-mono" style={{ color: 'var(--bk-ref-meta)' }}>
          Submitted {formatDate(receipt.submittedAt)} &middot; {program} &middot; {format}
        </div>
      </div>

      {/* Quick follow-up: start a WhatsApp conversation right now */}
      {!isFailed && !isActivation && (
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
            `Hi CS Academy, I just submitted an inquiry (ref ${receipt.reference}) for ${program}. I'd love to chat about it.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full py-2.5 px-4 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
          style={{
            background: 'var(--bk-wa-strip-bg)',
            color: 'var(--bk-wa-strip-text)',
            border: '1px solid var(--bk-wa-strip-border)'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--bk-wa-strip-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--bk-wa-strip-bg)';
          }}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Talk to us now on WhatsApp
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>
      )}

      <div className="space-y-2.5">
        <Section isDark={isDark}>
          <div className="flex items-center justify-between">
            <SectionTitle isDark={isDark}>What we received</SectionTitle>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors text-[var(--bk-section-muted)] hover:text-[var(--bk-title-color)]"
              aria-label="Print or save this confirmation"
            >
              Print / Save
            </button>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Name</dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">
              {name || <span className="italic font-normal text-[var(--bk-hint-color)]">Not provided</span>}
            </dd>
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">
              Email
              <span className="ml-1 normal-case font-normal" style={{ color: 'var(--bk-ref-label)' }}>(reply channel)</span>
            </dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="underline decoration-dotted underline-offset-2 hover:no-underline"
                  style={{ color: 'var(--bk-title-color)' }}
                >
                  {email}
                </a>
              ) : (
                <span className="italic font-normal text-[var(--bk-hint-color)]">Not provided</span>
              )}
            </dd>
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Organization</dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">
              {organization || <span className="italic font-normal text-[var(--bk-hint-color)]">Not provided</span>}
            </dd>
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Location</dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">{location}</dd>
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Program</dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">{program}</dd>
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Format</dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">{format}</dd>
            <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Audience</dt>
            <dd className="font-semibold truncate text-[var(--bk-title-color)]">{audienceType}</dd>
            {notes && (
              <>
                <dt className="font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)]">Notes</dt>
                <dd className="font-semibold whitespace-pre-wrap text-[var(--bk-title-color)]">{notes}</dd>
              </>
            )}
          </dl>
        </Section>

        <Section isDark={isDark}>
          <SectionTitle isDark={isDark}>What happens next</SectionTitle>
          <ol className="space-y-1.5">
            {[
              { n: 1, title: 'We read your inquiry', desc: 'An advisor at CS Academy reads it personally within 1 hour during business hours.' },
              { n: 2, title: 'You receive a reply within 24 hours', desc: 'With curriculum outline, schedule options, and payment methods (M-Pesa, bank, card).' },
              { n: 3, title: 'You confirm and we schedule', desc: 'Reply to support@cyberswahili.co.tz quoting your reference number.' }
            ].map((s) => (
              <li key={s.n} className="flex items-start gap-2.5">
                <span
                  className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
                  style={{ background: 'var(--bk-timeline-num-bg)', color: 'var(--bk-timeline-num-text)' }}
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-extrabold text-[var(--bk-section-text)]">{s.title}</div>
                  <div className="text-[10.5px] leading-snug text-[var(--bk-section-muted)]">{s.desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-black uppercase tracking-wider text-[var(--bk-section-muted)]">
            {isFailed ? 'Continue manually — pick a channel' : 'Re-send or forward to another channel'}
          </div>
        </div>
        {/* Trust strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--bk-section-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--bk-status-online)' }} />
            M-Pesa accepted
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Reply within 24h
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3" />
            Practical training for East African learners and teams
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onWhatsApp}
            className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-white flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'var(--bk-whatsapp-bg)',
              boxShadow: 'var(--bk-whatsapp-shadow)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-whatsapp-hover)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-whatsapp-bg)';
            }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{receipt.delivered && receipt.via === 'whatsapp' ? 'Reopen WhatsApp' : 'Open WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={emailHref}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'var(--bk-email-bg)',
              color: 'var(--bk-email-text)',
              border: '1px solid var(--bk-email-border)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-email-hover)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-email-bg)';
            }}
          >
            <Mail className="w-4 h-4" />
            <span>Email CS Academy</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onCopyMessage}
            className="w-full py-2.5 px-4 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
            style={{
              background: messageCopied ? 'var(--bk-copy-success-bg)' : 'var(--bk-cta-secondary-bg)',
              color: messageCopied ? 'var(--bk-copy-success-text)' : 'var(--bk-cta-secondary-text)',
              border: `1px solid ${messageCopied ? 'var(--bk-copy-success-border)' : 'var(--bk-cta-secondary-border)'}`
            }}
          >
            {messageCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {messageCopied ? 'Message Copied' : 'Copy Inquiry Text'}
          </button>
          {sendCopyHref && (
            <a
              href={sendCopyHref}
              className="w-full py-2.5 px-4 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
              style={{
                background: 'var(--bk-wa-strip-bg)',
                color: 'var(--bk-wa-strip-text)',
                border: '1px solid var(--bk-wa-strip-border)'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bk-wa-strip-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--bk-wa-strip-bg)';
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              Send a copy to my email
            </a>
          )}
        </div>

        {/* Webmail compose — cross-desktop fallback */}
        <div
          className="mt-2 rounded-xl border"
          style={{
            background: 'var(--bk-section-bg)',
            borderColor: 'var(--bk-section-border)'
          }}
        >
          <div
            className="px-3 pt-2.5 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 border-b"
            style={{ borderColor: 'var(--bk-section-border)' }}
          >
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[var(--bk-section-muted)]">
              <Globe className="w-3 h-3" />
              <span>No email app? Open in webmail</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider font-bold text-[var(--bk-hint-color)]">
              Works on every browser
            </span>
          </div>
          <div className="p-2.5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'gmail' as const, label: 'Gmail', badge: 'Most used' },
                { id: 'outlook' as const, label: 'Outlook' },
                { id: 'yahoo' as const, label: 'Yahoo' },
                { id: 'proton' as const, label: 'Proton' }
              ].map((p) => {
                const accent = providerAccent[p.id];
                return (
                  <a
                    key={p.id}
                    href={webmailComposeUrl(p.id, webmail.to, webmail.subject, webmail.body)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex flex-col items-center justify-center gap-1 px-2 py-2 sm:py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all"
                    style={{
                      background: 'var(--bk-cta-secondary-bg)',
                      color: 'var(--bk-cta-secondary-text)',
                      borderColor: 'var(--bk-cta-secondary-border)'
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = accent.bg;
                      (e.currentTarget as HTMLElement).style.color = accent.fg;
                      (e.currentTarget as HTMLElement).style.borderColor = accent.fg;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bk-cta-secondary-bg)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--bk-cta-secondary-text)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--bk-cta-secondary-border)';
                    }}
                  >
                    {p.badge && (
                      <span
                        className="absolute -top-1.5 right-1 px-1.5 py-0.5 rounded-full text-[8px] font-black"
                        style={{
                          background: 'var(--bk-pill-success-bg)',
                          color: 'var(--bk-pill-success-text)',
                          border: '1px solid var(--bk-pill-success-border)'
                        }}
                      >
                        {p.badge}
                      </span>
                    )}
                    <span>{p.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={onCopySubject}
                className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors"
                style={
                  subjectCopied
                    ? {
                        background: 'var(--bk-copy-success-bg)',
                        color: 'var(--bk-copy-success-text)',
                        borderColor: 'var(--bk-copy-success-border)'
                      }
                    : {
                        background: 'var(--bk-cta-secondary-bg)',
                        color: 'var(--bk-cta-secondary-text)',
                        borderColor: 'var(--bk-cta-secondary-border)'
                      }
                }
              >
                {subjectCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {subjectCopied ? 'Subject copied' : 'Copy subject'}
              </button>
              <button
                type="button"
                onClick={onCopyBody}
                className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors"
                style={
                  bodyCopied
                    ? {
                        background: 'var(--bk-copy-success-bg)',
                        color: 'var(--bk-copy-success-text)',
                        borderColor: 'var(--bk-copy-success-border)'
                      }
                    : {
                        background: 'var(--bk-cta-secondary-bg)',
                        color: 'var(--bk-cta-secondary-text)',
                        borderColor: 'var(--bk-cta-secondary-border)'
                      }
                }
              >
                {bodyCopied ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {bodyCopied ? 'Body copied' : 'Copy body'}
              </button>
              <button
                type="button"
                onClick={() => copyToClipboard(webmail.to)}
                className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-colors"
                style={{
                  background: 'var(--bk-cta-secondary-bg)',
                  color: 'var(--bk-cta-secondary-text)',
                  borderColor: 'var(--bk-cta-secondary-border)'
                }}
              >
                <Copy className="w-3 h-3" />
                Copy address
              </button>
              <span className="sm:ml-auto text-[10px] text-[var(--bk-hint-color)]">
                To: <span className="font-mono font-bold text-[var(--bk-section-muted)]">{webmail.to}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Failed-state help */}
      {isFailed && (
        <details
          className="rounded-xl border text-xs"
          style={{
            background: 'var(--bk-section-bg)',
            borderColor: 'var(--bk-section-border)'
          }}
        >
          <summary
            className="cursor-pointer select-none px-3 py-2 sm:px-4 sm:py-2.5 font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)] hover:text-[var(--bk-title-color)]"
          >
            Why didn't it work? Common causes
          </summary>
          <div className="px-3 pb-3 pt-1.5 sm:px-4 sm:pb-3 space-y-1.5 text-[11px] leading-relaxed text-[var(--bk-section-muted)]">
            <div><strong className="text-[var(--bk-title-color)]">Offline or weak connection.</strong> Wi-Fi dropped or you're on a slow network.</div>
            <div><strong className="text-[var(--bk-title-color)]">Browser security or extension.</strong> An ad-blocker, privacy extension, or corporate firewall blocked the request.</div>
            <div><strong className="text-[var(--bk-title-color)]">Form needs one-time activation.</strong> The recipient must click a one-time activation link formsubmit emailed to them.</div>
            <div className="pt-1 italic text-[var(--bk-hint-color)]">
              No problem — use the WhatsApp or Email buttons below. Your reference is saved.
            </div>
          </div>
        </details>
      )}

      {/* Retry */}
      {(isFailed || isActivation) && (
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors"
            style={{
              background: 'var(--bk-cta-secondary-bg)',
              color: 'var(--bk-cta-secondary-text)',
              border: '1px solid var(--bk-cta-secondary-border)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-cta-secondary-hover)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--bk-cta-secondary-bg)';
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Try sending again
          </button>
        </div>
      )}

      <div
        className="pt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3"
        style={{ borderColor: 'var(--bk-divider)' }}
      >
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--bk-section-muted)]">
          <Sparkles className="w-3 h-3" />
          <span className="truncate">Save reference: {receipt.reference}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSubmitAnother}
            className="text-[10px] font-bold uppercase tracking-wider transition-colors text-[var(--bk-section-muted)] hover:text-[var(--bk-title-color)]"
          >
            Submit another
          </button>
          <span className="text-[var(--bk-hint-color)]">·</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors"
            style={{ color: 'var(--accent-red)' }}
          >
            Done & close
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <details
        className="rounded-xl border text-xs"
        style={{
          background: 'var(--bk-section-bg)',
          borderColor: 'var(--bk-section-border)'
        }}
      >
        <summary
          className="cursor-pointer select-none px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] text-[var(--bk-section-muted)] hover:text-[var(--bk-title-color)]"
        >
          View submitted message
        </summary>
        <pre className="px-4 pb-3 pt-1 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-[var(--bk-section-text)]">
          {constructMessageText()}
        </pre>
      </details>
    </div>
  );
};
