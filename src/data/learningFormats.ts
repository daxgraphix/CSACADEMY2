import { LearningFormat } from '../types';

export const learningFormatsData: LearningFormat[] = [
  {
    id: 'whatsapp-learning',
    number: '01',
    title: 'WHATSAPP LEARNING',
    channelName: 'WhatsApp Micro-Learning & Audio Notes',
    category: 'mobile',
    description: 'Micro-learning communities, daily prompt challenges, audio voice notes, downloadable cheat-sheets, and ongoing peer support on low data bundles.',
    bestFor: 'Mobile-first learners, university students, and busy professionals needing bite-sized daily knowledge.',
    priceStartingTsh: '5,000',
    priceStartingKes: '250',
    priceStartingUsd: '2',
    pricingLabel: 'per month  |  Data Saver',
    bandwidthLevel: 'Ultra-Low Data (Works on 2G/3G/4G)',
    features: [
      'Zero-barrier mobile access via WhatsApp',
      'Daily 5-minute practical challenges in English',
      'Voice note explanations & downloadable PDFs',
      'Active peer study group & instant instructor feedback'
    ],
    icon: 'MessageSquare'
  },
  {
    id: 'zoom-live',
    number: '02',
    title: 'ZOOM LIVE CLASSES',
    channelName: 'Interactive Zoom Live Virtual Cohorts',
    category: 'virtual',
    description: 'Interactive instructor-led virtual classrooms with live screensharing, real-time code critiques, Vibe Coding, and interactive Q&A.',
    bestFor: 'Individual learners, distributed tech teams, and evening cohort participants across African time zones.',
    priceStartingTsh: '35,000',
    priceStartingKes: '1,900',
    priceStartingUsd: '14',
    pricingLabel: 'per month  |  Live Interactive',
    bandwidthLevel: 'Standard Broadband / 4G (HD Live)',
    features: [
      'HD live video walkthroughs & coding demonstrations',
      'Breakout rooms for hands-on team exercises',
      'Lifetime session recordings provided for revision',
      'Real-time Q&A, chat polls & code reviews'
    ],
    icon: 'Video'
  },
  {
    id: 'google-meet',
    number: '03',
    title: 'GOOGLE MEET TRAINING',
    channelName: 'Google Meet Executive & Team Sessions',
    category: 'virtual',
    description: 'Frictionless, lightweight online training and 1-on-1 or small-team executive coaching with direct calendar integration and Google Workspace collaboration.',
    bestFor: 'Corporate departments, executive briefings, and institutional committee training.',
    priceStartingTsh: '45,000',
    priceStartingKes: '2,400',
    priceStartingUsd: '18',
    pricingLabel: 'per month / cohort access',
    bandwidthLevel: 'Lightweight Browser (Low-Bandwidth Adaptive)',
    features: [
      'No software installation required (Browser-ready)',
      'High accessibility on low-bandwidth networks',
      'Integrated Google Workspace live document editing',
      'Direct calendar scheduling & 1-on-1 coaching'
    ],
    icon: 'MonitorPlay'
  },
  {
    id: 'workshops-seminars',
    number: '04',
    title: 'WORKSHOPS & SEMINARS',
    channelName: 'Hands-On Intensive Workshops & Seminars',
    category: 'in-person',
    description: 'Action-oriented half-day, full-day, and multi-day deep dives focused on producing concrete deliverables and immediate practical skills.',
    bestFor: 'Departmental staff, teacher associations, youth incubators, and professional member associations.',
    priceStartingTsh: '450,000',
    priceStartingKes: '24,000',
    priceStartingUsd: '180',
    pricingLabel: 'per workshop session (Up to 30 Seats)',
    bandwidthLevel: 'In-Person / Hybrid Delivery',
    features: [
      'Intensive hands-on practice & group project drills',
      'Customized workbook and prompt library for participants',
      'Real-world problem solving on client data',
      'Printed & Digital Certificate of Attendance provided'
    ],
    icon: 'Calendar'
  },
  {
    id: 'physical-training',
    number: '05',
    title: 'PHYSICAL TRAINING',
    channelName: 'On-Site Corporate & Campus Immersion',
    category: 'in-person',
    description: 'On-site, immersive in-person training delivered directly at your company offices, university campuses, school halls, or hotel venues across East Africa.',
    bestFor: 'Organizations wanting maximum focus, deep collaboration, and high-retention face-to-face instruction.',
    priceStartingTsh: '1,200,000',
    priceStartingKes: '64,000',
    priceStartingUsd: '480',
    pricingLabel: 'per corporate cohort (Multi-Day Deep Dive)',
    bandwidthLevel: 'Zero Bandwidth Needed (Local / On-Site)',
    features: [
      'In-person lead trainer presence & desk-by-desk support',
      'Adapted to your local IT environment and hardware',
      'High-energy team building and collaborative drills',
      'Flexible scheduling (weekdays or intensive weekends)'
    ],
    icon: 'Building2'
  },
  {
    id: 'conferences-keynotes',
    number: '06',
    title: 'CONFERENCES & KEYNOTES',
    channelName: 'Keynotes, Tech Summits & Public Forums',
    category: 'in-person',
    description: 'Inspiring, authoritative keynote speeches on AI trends, cybersecurity resilience, digital trust, and technology leadership across Africa.',
    bestFor: 'Industry summits, technology conferences, annual general meetings, and public forums.',
    priceStartingTsh: 'Custom',
    priceStartingKes: 'Custom',
    priceStartingUsd: 'Custom',
    pricingLabel: 'Keynote Speaker Honorarium',
    bandwidthLevel: 'Stage Presentation / Live Demonstrations',
    features: [
      'Engaging, high-impact multimedia presentations',
      'Context-rich insights on African technology landscape',
      'Clear, accessible language without dry jargon',
      'Interactive audience live demonstrations'
    ],
    icon: 'Mic'
  }
];
