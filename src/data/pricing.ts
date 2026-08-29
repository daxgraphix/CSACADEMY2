import { PricingPlan } from '../types';

export const pricingPlansData: PricingPlan[] = [
  {
    id: 'whatsapp-tier',
    name: 'WhatsApp Micro-Learning',
    deliveryChannel: 'WhatsApp Micro-Learning',
    deliveryType: 'mobile-first',
    badge: 'DATA SAVER (2G/3G)',
    tagline: 'Learn daily technology lessons directly in your WhatsApp inbox.',
    priceTsh: '20,000',
    priceKes: '1,050',
    priceUsd: '8',
    billingPeriod: 'per month',
    bandwidthRequirement: 'Ultra-Low Data (~5MB / day)',
    popular: false,
    features: [
      'Daily 5-minute English audio lessons & summaries',
      'Downloadable PDF prompt cards & code cheat-sheets',
      'Private WhatsApp study cohort group discussions',
      'Weekly voice note Q&A with instructors',
      'Eligible for Invite & Earn cash referrals'
    ],
    notIncluded: [
      'Full HD video streaming course library',
      'Interactive graded module quizzes',
      'Verifiable QR PDF Certificate',
      'Live Zoom/Google Meet video screen-sharing'
    ],
    ctaText: 'Join WhatsApp Cohort',
    highlightNote: 'Zero internet friction  |  Pay with M-Pesa / Tigo Pesa'
  },
  {
    id: 'self-paced-platform',
    name: 'Self-Paced Video Platform',
    deliveryChannel: 'On-Demand Web & Mobile App',
    deliveryType: 'self-paced',
    badge: 'FLEXIBLE SCHEDULE',
    tagline: 'Learn at your own pace with full access to all English video tracks.',
    priceTsh: '30,000',
    priceKes: '1,600',
    priceUsd: '12',
    billingPeriod: 'per month',
    bandwidthRequirement: 'Standard 3G/4G/WiFi',
    popular: false,
    features: [
      'Unlimited access to ALL video tracks (Web, AI, Design, Cyber)',
      'Scored quizzes & interactive module knowledge tests',
      'Official PDF Certificate with tamper-proof QR verification',
      'Full Digital Shop access (Ebooks, UI Kits & Prompt Packs)',
      'Course project files, assets & source code downloads',
      'Instant Mobile Money activation (M-Pesa, Tigo, Airtel)'
    ],
    notIncluded: [
      'Weekly live interactive Zoom/Meet coaching',
      '1-on-1 personalized portfolio review'
    ],
    ctaText: 'Start On-Demand Video',
    highlightNote: 'Study anytime, anywhere on any device'
  },
  {
    id: 'zoom-live-cohort',
    name: 'Zoom & Meet Live Cohorts',
    deliveryChannel: 'Zoom & Google Meet Live Virtual',
    deliveryType: 'virtual-live',
    badge: 'MOST POPULAR  |  LIVE INTERACTION',
    tagline: 'Live interactive classes with real-time screen sharing and Vibe Coding.',
    priceTsh: '50,000',
    priceKes: '2,700',
    priceUsd: '20',
    billingPeriod: 'per month',
    bandwidthRequirement: 'Broadband / 4G Live Stream',
    popular: true,
    features: [
      'Everything in Self-Paced Video Platform included',
      '2x Weekly live interactive sessions on Zoom & Google Meet',
      'Live screen sharing, live prompt critiques & Vibe Coding',
      'Breakout rooms for hands-on collaborative exercises',
      'Lifetime access to all HD session recordings',
      'Direct WhatsApp Mentor line with instructor Alex Rweyemamu',
      'Verifiable QR PDF Certificate upon cohort completion'
    ],
    ctaText: 'Enroll in Live Cohort',
    highlightNote: 'Live Q&A and instant instructor feedback'
  },
  {
    id: 'annual-all-access',
    name: 'VIP Annual Pass (All Channels)',
    deliveryChannel: 'All Delivery Channels Included',
    deliveryType: 'self-paced',
    badge: 'BEST VALUE (2 MONTHS FREE)',
    tagline: 'The complete 360° technology immersion across all delivery formats.',
    priceTsh: '135,000',
    priceKes: '7,200',
    priceUsd: '54',
    billingPeriod: 'per year',
    bandwidthRequirement: 'Adaptive to any connection',
    popular: false,
    features: [
      'Full 12-month access to Video Platform & WhatsApp Micro-learning',
      'Free seat in all upcoming Zoom & Google Meet live cohorts',
      'Priority 1-on-1 portfolio and CV review by lead instructors',
      'VIP Digital Shop pass (all current and future templates free)',
      'Early access to new courses before public release',
      'Direct WhatsApp instructor mentor channel'
    ],
    ctaText: 'Get VIP 1-Year Pass',
    highlightNote: 'Save 60,000 Tsh  |  Complete Career Transformation'
  },
  {
    id: 'workshops-delivery',
    name: 'Workshops & Seminars',
    deliveryChannel: 'Workshops & Seminars (Half/Full Day)',
    deliveryType: 'in-person-workshop',
    badge: 'INSTITUTIONAL / HYBRID',
    tagline: 'Action-oriented deep dives producing concrete deliverables for teams.',
    priceTsh: '465,000',
    priceKes: '24,800',
    priceUsd: '186',
    billingPeriod: 'per workshop session (up to 30 participants)',
    bandwidthRequirement: 'In-Person Venue or Hybrid Zoom/Meet',
    popular: false,
    features: [
      'Half-day or full-day intensive hands-on practical workshop',
      'Customized workbook and curated prompt library for participants',
      'Tailored case studies solving client/institutional challenges',
      'Printed and QR-verifiable Digital Certificate of Attendance',
      'Post-workshop recorded recap and implementation roadmap',
      'Invoice payment, LPO, or Mobile Money billing available'
    ],
    ctaText: 'Book Team Workshop',
    highlightNote: 'Ideal for departments, teacher associations & incubators'
  },
  {
    id: 'corporate-physical',
    name: 'Physical Training (On-Site)',
    deliveryChannel: 'Physical On-Site Training',
    deliveryType: 'corporate-onsite',
    badge: 'ENTERPRISE IMMERSIVE',
    tagline: 'On-site in-person training delivered directly at your venue or campus.',
    priceTsh: '1,215,000',
    priceKes: '64,800',
    priceUsd: '486',
    billingPeriod: 'per corporate cohort (multi-day package)',
    bandwidthRequirement: 'Zero Internet Required (On-Site Face-to-Face)',
    popular: false,
    features: [
      'Lead instructor on-site at your office, campus, or venue',
      'Desk-by-desk coaching and practical hardware setup',
      'Adapted to your corporate security policies and tool stack',
      'Custom employee assessment and compliance progress reports',
      'Multi-day scheduling (weekdays or intensive weekend bootcamps)',
      'Dedicated account coordinator and formal corporate invoicing'
    ],
    ctaText: 'Request On-Site Quote',
    highlightNote: 'Maximum retention, deep team collaboration & focus'
  },
  {
    id: 'conferences-keynotes-channel',
    name: 'Conferences & Keynotes',
    deliveryChannel: 'Conferences & Keynotes',
    deliveryType: 'keynote',
    badge: 'EXECUTIVE SPEAKING',
    tagline: 'Inspiring, authoritative keynote speeches on AI and digital safety.',
    priceTsh: 'Custom',
    priceKes: 'Custom',
    priceUsd: 'Custom',
    billingPeriod: 'per keynote address',
    bandwidthRequirement: 'Main Stage / Live Auditorium',
    popular: false,
    features: [
      'High-impact multimedia keynote by Alex Rweyemamu',
      'Context-rich insights on African technology landscape',
      'Engaging live on-stage technology and AI demonstrations',
      'Available in fluent English, local languages, or bilingual delivery',
      'Panel moderation and executive Q&A facilitation'
    ],
    ctaText: 'Inquire Keynote Availability',
    highlightNote: 'For Summits, AGMs, Tech Expos & Public Forums'
  }
];

export const paymentMethods = [
  {
    name: 'M-Pesa',
    country: 'Tanzania & Kenya',
    provider: 'Vodacom / Safaricom',
    badge: 'Instant Activation'
  },
  {
    name: 'Tigo Pesa',
    country: 'Tanzania',
    provider: 'Yas / Tigo',
    badge: 'Instant Activation'
  },
  {
    name: 'Airtel Money',
    country: 'East Africa',
    provider: 'Airtel',
    badge: 'Instant Activation'
  },
  {
    name: 'HaloPesa',
    country: 'Tanzania',
    provider: 'Halotel',
    badge: 'Instant Activation'
  },
  {
    name: 'Debit / Credit Card',
    country: 'International',
    provider: 'Visa / MasterCard',
    badge: 'Global Secure'
  }
];
