import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Send, ShieldCheck, UserRound } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useApp } from '../context/AppContext';
import { useCanonicalUrl } from '../hooks/useCanonicalUrl';
import { submitForm } from '../utils/booking';

type RequestChannel = 'support' | 'whatsapp' | 'email';
type RequestStatus = 'idle' | 'sending' | 'received' | 'whatsapp-opened' | 'email-opened' | 'error';

const tracks = [
  'Artificial intelligence and productivity',
  'Cybersecurity and digital safety',
  'Digital skills and web development',
  'Vibe coding',
  'I am not sure yet'
];

const formats = [
  'WhatsApp learning',
  'Self-paced online learning',
  'Live online cohort',
  'In-person workshop',
  'Help me choose'
];

const contactMessage = (details: { name: string; email: string; phone: string; country: string; track: string; format: string; timing: string; goals: string }) =>
  `Hello CS Academy, I am making an individual learning request.\n\nName: ${details.name}\nEmail: ${details.email}\nPhone / WhatsApp: ${details.phone || 'Not provided'}\nCountry: ${details.country}\nLearning interest: ${details.track}\nPreferred format: ${details.format}\nPreferred start: ${details.timing}\nGoals or questions: ${details.goals || 'I would like help choosing a suitable option.'}\n\nPlease share relevant course details, availability, and confirmed pricing. I understand this request does not confirm enrollment or payment.`;

export const IndividualRequestPage: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const canonical = useCanonicalUrl();
  const [searchParams] = useSearchParams();
  const requestedFormat = searchParams.get('format');
  const requestedTrack = searchParams.get('track');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Tanzania');
  const [track, setTrack] = useState(() => requestedTrack && tracks.includes(requestedTrack) ? requestedTrack : tracks[0]);
  const [format, setFormat] = useState(() => requestedFormat && formats.includes(requestedFormat) ? requestedFormat : formats[0]);
  const [timing, setTiming] = useState('As soon as possible');
  const [goals, setGoals] = useState('');
  const [channel, setChannel] = useState<RequestChannel>('support');
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState('');

  const details = { name: name.trim(), email: email.trim(), phone: phone.trim(), country, track, format, timing, goals: goals.trim() };
  const message = contactMessage(details);
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Individual training request | ${details.name || 'CS Academy learner'}`)}&body=${encodeURIComponent(message)}`;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (channel === 'whatsapp') {
      setStatus('whatsapp-opened');
      window.open(whatsappHref, '_blank', 'noopener,noreferrer');
      return;
    }

    if (channel === 'email') {
      setStatus('email-opened');
      window.location.href = mailtoHref;
      return;
    }

    setStatus('sending');
    const result = await submitForm({
      _subject: `Individual training request | ${details.track} | ${details.name}`,
      _honey: '',
      name: details.name,
      email: details.email,
      phone: details.phone,
      country: details.country,
      program: details.track,
      preferredFormat: details.format,
      preferredStart: details.timing,
      goals: details.goals || 'Would like help choosing a suitable option.',
      requestType: 'Individual learner inquiry; not an enrollment or payment',
      source: 'individual-training-request',
      submittedAt: new Date().toISOString(),
      message
    });

    if (result.ok) {
      setStatus('received');
    } else {
      setStatus('error');
      setError(result.errorMessage || 'We could not deliver your request by email just now. Your details are still in this form.');
    }
  };

  const fieldClass = `w-full min-h-10 rounded-xl border px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red-subtle)] ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)] text-white' : 'border-neutral-300 bg-white text-neutral-900'}`;
  const labelClass = `mb-1 block text-[11px] font-bold ${isDark ? 'text-neutral-300' : 'text-neutral-800'}`;
  const cardClass = `rounded-2xl border p-4 transition-colors ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-primary)]' : 'border-neutral-200 bg-white'}`;

  const startAnother = () => {
    setStatus('idle');
    setName('');
    setEmail('');
    setPhone('');
    setGoals('');
    setError('');
  };

  return (
    <main className={`min-h-screen px-4 pb-20 pt-28 ${isDark ? 'bg-[var(--bg-primary)] text-white' : 'bg-[var(--bg-primary)] text-neutral-900'}`}>
      <Helmet>
        <title>Individual Training Request | CS Academy</title>
        <meta name="description" content="Make an individual learning request to CS Academy. Tell us what you want to learn and choose whether to contact us through FormSubmit, WhatsApp, or email." />
        <meta property="og:title" content="Individual Training Request | CS Academy" />
        <meta name="twitter:title" content="Individual Training Request | CS Academy" />
        <meta property="og:description" content="Tell CS Academy what you want to learn and choose how to send your individual training request." />
        <meta name="twitter:description" content="Tell CS Academy what you want to learn and choose how to send your individual training request." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-red-border)] bg-[var(--accent-red-subtle)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-red-strong)]">
            <UserRound className="h-3.5 w-3.5" aria-hidden="true" /> Individual learner request
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Tell us what you want to <span className="text-[var(--accent-red-strong)]">learn next.</span></h1>
            <p className={`max-w-xl text-base leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Share a few details and choose how you want to contact us. Our team will review your request and reply with suitable course information, availability, and confirmed pricing.
            </p>
          </div>

          <div className={`${cardClass} space-y-3`}>
            <h2 className="text-sm font-extrabold">What happens next</h2>
            <ol className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-red-subtle)] font-black text-[var(--accent-red-strong)]">1</span><span>Choose one delivery method for your request.</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-red-subtle)] font-black text-[var(--accent-red-strong)]">2</span><span>We review the details and respond to your question by email.</span></li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-red-subtle)] font-black text-[var(--accent-red-strong)]">3</span><span>You decide whether to continue. This request does not enroll you or collect payment.</span></li>
            </ol>
          </div>

          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-700'}`}>
            Requesting training for a team or organization? <Link to="/for-organizations" className="font-bold text-[var(--accent-red-strong)] underline underline-offset-2">Use the team proposal form <ArrowRight className="inline h-3 w-3" aria-hidden="true" /></Link>
          </p>
        </div>

        <section className={`rounded-2xl border p-4 shadow-lg sm:p-6 ${isDark ? 'border-[var(--border-color)] bg-[var(--bg-secondary)]' : 'border-neutral-200 bg-white'}`} aria-labelledby="individual-request-form-title">
          {status === 'received' ? (
            <div className="py-8 text-center" role="status" aria-live="polite">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
              <h2 id="individual-request-form-title" className="mt-4 text-2xl font-black">Request received</h2>
              <p className={`mx-auto mt-3 max-w-md text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                FormSubmit sent your request to CS Academy support. We’ll reply to <strong>{details.email}</strong> with information about {details.track.toLowerCase()}. No enrollment or payment has been made.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-600/30 px-4 py-2.5 text-xs font-bold ${isDark ? 'text-emerald-300 hover:bg-emerald-950/30' : 'text-emerald-700 hover:bg-emerald-50'}`}><MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask a follow-up on WhatsApp</a>
                <button type="button" onClick={startAnother} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] px-4 py-2.5 text-xs font-bold">Make another request</button>
              </div>
            </div>
          ) : status === 'whatsapp-opened' || status === 'email-opened' ? (
            <div className="py-8 text-center" role="status" aria-live="polite">
              {status === 'whatsapp-opened' ? <MessageCircle className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" /> : <Mail className="mx-auto h-12 w-12 text-[var(--accent-red-strong)]" aria-hidden="true" />}
              <h2 id="individual-request-form-title" className="mt-4 text-2xl font-black">Finish sending your request</h2>
              <p className={`mx-auto mt-3 max-w-md text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {status === 'whatsapp-opened' ? 'WhatsApp should open with your request ready. Press Send there to deliver it; CS Academy has not received it yet.' : 'Your email app should open with your request ready. Press Send there to deliver it; CS Academy has not received it yet.'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {status === 'whatsapp-opened' ? <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Open WhatsApp again</a> : <a href={mailtoHref} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--accent-red)] px-4 py-2.5 text-xs font-bold text-white"><Mail className="h-4 w-4" aria-hidden="true" /> Open email again</a>}
                <button type="button" onClick={() => setStatus('idle')} className="inline-flex min-h-11 items-center rounded-xl border border-[var(--border-color)] px-4 py-2.5 text-xs font-bold">Edit request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <h2 id="individual-request-form-title" className="text-xl font-black">Your learning request</h2>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Required fields are marked. We use these details only to respond to this request.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className={labelClass} htmlFor="individual-name">Your name *</label><input className={fieldClass} autoComplete="name" id="individual-name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" /></div>
                <div><label className={labelClass} htmlFor="individual-email">Email address *</label><input className={fieldClass} autoComplete="email" id="individual-email" type="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className={labelClass} htmlFor="individual-phone">Phone / WhatsApp <span className="font-normal">(optional)</span></label><input className={fieldClass} autoComplete="tel" id="individual-phone" type="tel" maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Include your country code" /></div>
                <div><label className={labelClass} htmlFor="individual-country">Country *</label><select className={fieldClass} id="individual-country" value={country} onChange={(event) => setCountry(event.target.value)}><option>Tanzania</option><option>Kenya</option><option>Uganda</option><option>Rwanda</option><option>Other</option></select></div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div><label className={labelClass} htmlFor="individual-track">What do you want to learn? *</label><select className={fieldClass} id="individual-track" value={track} onChange={(event) => setTrack(event.target.value)}>{tracks.map((item) => <option key={item}>{item}</option>)}</select></div>
                <div><label className={labelClass} htmlFor="individual-format">Preferred learning format *</label><select className={fieldClass} id="individual-format" value={format} onChange={(event) => setFormat(event.target.value)}>{formats.map((item) => <option key={item}>{item}</option>)}</select></div>
              </div>

              <div><label className={labelClass} htmlFor="individual-timing">When would you like to start? *</label><select className={fieldClass} id="individual-timing" value={timing} onChange={(event) => setTiming(event.target.value)}><option>As soon as possible</option><option>This month</option><option>Next month</option><option>Later this year</option><option>Just exploring</option></select></div>

              <div><label className={labelClass} htmlFor="individual-goals">What would you like help with? <span className="font-normal">(optional)</span></label><textarea className={`${fieldClass} resize-y`} id="individual-goals" rows={3} maxLength={1200} value={goals} onChange={(event) => setGoals(event.target.value)} placeholder="Your goals, experience level, or questions about the course" /><div className={`mt-1 text-right text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{goals.length}/1200</div></div>

              <fieldset>
                <legend className={labelClass}>Choose how to send your request *</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {([
                    { id: 'support', title: 'Send to support', note: 'FormSubmit email', Icon: Send },
                    { id: 'whatsapp', title: 'WhatsApp', note: 'You press Send', Icon: MessageCircle },
                    { id: 'email', title: 'Email app', note: 'You press Send', Icon: Mail }
                  ] as const).map(({ id, title, note, Icon }) => (
                    <label key={id} className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-colors ${channel === id ? 'border-[var(--accent-red)] bg-[var(--accent-red-subtle)]' : isDark ? 'border-[var(--border-color)] hover:bg-white/[0.03]' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                      <input className="mt-0.5 h-4 w-4 accent-[var(--accent-red)]" type="radio" name="individual-request-channel" value={id} checked={channel === id} onChange={() => setChannel(id)} />
                      <span><span className="flex items-center gap-1.5 text-xs font-bold"><Icon className="h-3.5 w-3.5" aria-hidden="true" />{title}</span><span className={`mt-1 block text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{note}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {status === 'error' && <div role="alert" className={`space-y-3 rounded-xl border p-3 text-xs ${isDark ? 'border-red-400/30 bg-red-950/20 text-red-200' : 'border-red-200 bg-red-50 text-red-800'}`}><p>{error}</p><div className="flex flex-wrap gap-2"><a href={mailtoHref} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-current px-3 py-2 font-bold"><Mail className="h-3.5 w-3.5" aria-hidden="true" />Continue by email</a><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-current px-3 py-2 font-bold"><MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />Continue on WhatsApp</a></div></div>}

              <div className="flex items-start gap-2 text-[10px] leading-relaxed"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent-red-strong)]" aria-hidden="true" /><p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>No payment details are requested here. Review course availability and final pricing with our team before deciding.</p></div>

              <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-3 text-sm font-extrabold text-white shadow-lg transition hover:bg-[var(--accent-red-hover)] disabled:cursor-wait disabled:opacity-60">
                {status === 'sending' ? 'Sending request…' : channel === 'support' ? <><Send className="h-4 w-4" aria-hidden="true" /> Send request to support</> : channel === 'whatsapp' ? <><MessageCircle className="h-4 w-4" aria-hidden="true" /> Continue to WhatsApp</> : <><Mail className="h-4 w-4" aria-hidden="true" /> Continue to email</>}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};
