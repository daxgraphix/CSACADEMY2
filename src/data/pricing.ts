import { PricingPlan } from '../types';

export const pricingPlansData: PricingPlan[] = [
  {
    id: 'whatsapp-tier',
    name: 'WhatsApp Micro-Learning',
    deliveryChannel: 'WhatsApp Micro-Learning',
    deliveryType: 'mobile-first',
    badge: 'WHATSAPP LEARNING',
    tagline: 'A mobile-first option for short lessons and learning materials through WhatsApp.',
    priceTsh: '20,000',
    priceKes: '1,050',
    priceUsd: '8',
    billingPeriod: 'per month',
    bandwidthRequirement: 'Data use depends on the materials shared and your connection.',
    popular: false,
    features: [
      'Short learning materials shared through WhatsApp',
      'Practical prompts and reference materials where available',
      'Enrollment and delivery details confirmed before payment'
    ],
    notIncluded: [
      'Full HD video streaming course library',
      'Interactive graded module quizzes',
      'Live Zoom/Google Meet video screen-sharing'
    ],
    ctaText: 'Join WhatsApp Cohort',
    highlightNote: 'Low data lessons delivered through WhatsApp'
  },
  {
    id: 'self-paced-platform',
    name: 'Self-Paced Video Platform',
    deliveryChannel: 'On-Demand Web & Mobile App',
    deliveryType: 'self-paced',
    badge: 'SELF-PACED',
    tagline: 'Study independently using the course materials included with your enrollment.',
    priceTsh: '30,000',
    priceKes: '1,600',
    priceUsd: '12',
    billingPeriod: 'per month',
    bandwidthRequirement: 'Standard 3G/4G/WiFi',
    popular: false,
    features: [
      'Access to the course materials included with your selected enrollment',
      'Self-paced study through the available video and written materials',
      'Project files or downloadable resources where provided',
      'Access instructions sent after enrollment details are confirmed'
    ],
    notIncluded: ['Live instruction or individual coaching unless listed in your enrollment details'],
    ctaText: 'Start On-Demand Video',
    highlightNote: 'Study on your schedule during the confirmed access period'
  },
  {
    id: 'zoom-live-cohort',
    name: 'Zoom & Meet Live Cohorts',
    deliveryChannel: 'Zoom & Google Meet Live Virtual',
    deliveryType: 'virtual-live',
    badge: 'LIVE INTERACTION',
    tagline: 'Live online instruction with opportunities to ask questions and practise together.',
    priceTsh: '50,000',
    priceKes: '2,700',
    priceUsd: '20',
    billingPeriod: 'per month',
    bandwidthRequirement: 'Broadband / 4G Live Stream',
    popular: true,
    features: [
      'Self-paced materials only where they are listed for the selected cohort',
      'Live sessions on Zoom or Google Meet on the confirmed schedule',
      'Instructor explanations and guided practice',
      'Question time during scheduled sessions',
      'Session recordings and messaging support only where confirmed for the cohort',
      'Certificate availability and completion criteria confirmed for each course'
    ],
    ctaText: 'Enroll in Live Cohort',
    highlightNote: 'Live interaction on the published cohort schedule'
  },
  {
    id: 'annual-all-access',
    name: 'Annual Learning Plan',
    deliveryChannel: 'Annual access; included formats confirmed before enrollment',
    deliveryType: 'self-paced',
    badge: 'ANNUAL ACCESS',
    tagline: 'An annual option for the learning formats listed in this plan.',
    priceTsh: '135,000',
    priceKes: '7,200',
    priceUsd: '54',
    billingPeriod: 'per year',
    bandwidthRequirement: 'Depends on the selected materials and delivery format',
    popular: false,
    features: [
      'Access for 12 months to the listed self-paced and WhatsApp materials',
      'Ask which live sessions are included before enrolling',
      'Any mentoring, portfolio review, or new course access must be confirmed separately'
    ],
    ctaText: 'Ask about annual access',
    highlightNote: 'One annual plan for the included learning formats'
  },
  {
    id: 'workshops-delivery',
    name: 'Workshops & Seminars',
    deliveryChannel: 'Workshops & Seminars (Half/Full Day)',
    deliveryType: 'in-person-workshop',
    badge: 'INSTITUTIONAL / HYBRID',
    tagline: 'Practical workshops for teams, with scope and deliverables agreed in advance.',
    priceTsh: '465,000',
    priceKes: '24,800',
    priceUsd: '186',
    billingPeriod: 'per workshop session (up to 30 participants)',
    bandwidthRequirement: 'In-Person Venue or Hybrid Zoom/Meet',
    popular: false,
    features: [
      'Workshop duration and format confirmed in the proposal',
      'Practice materials and examples agreed for the session',
      'Topics scoped to the organization’s stated needs',
      'Certificate of attendance only if confirmed in the proposal',
      'Any follow-up materials or recordings confirmed in the proposal',
      'Request invoice or LPO details; payment instructions are confirmed in your proposal'
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
    tagline: 'Discuss in-person training at your organization’s venue or campus.',
    priceTsh: '1,215,000',
    priceKes: '64,800',
    priceUsd: '486',
    billingPeriod: 'per corporate cohort (multi-day package)',
    bandwidthRequirement: 'Venue, equipment, and connectivity needs agreed before delivery',
    popular: false,
    features: [
      'On-site delivery where agreed in the proposal',
      'Training scope and any equipment needs agreed in advance',
      'Examples and delivery adapted to the agreed scope',
      'Any assessment or progress reporting agreed in the proposal',
      'Multi-day scheduling (weekdays or intensive weekend bootcamps)',
      'Invoicing documents confirmed for your location and engagement'
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
      'English-language keynote; confirm other format requirements with our team',
      'Panel moderation and executive Q&A facilitation'
    ],
    ctaText: 'Inquire Keynote Availability',
    highlightNote: 'For Summits, AGMs, Tech Expos & Public Forums'
  }
];
