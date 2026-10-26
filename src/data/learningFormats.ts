import { LearningFormat } from '../types';
import { pricingPlansData } from './pricing';

const planForFormat = (id: string) =>
  pricingPlansData.find((plan) => plan.id === id) ?? pricingPlansData[0];

export const learningFormatsData: LearningFormat[] = [
  {
    id: 'whatsapp-learning',
    number: '01',
    title: 'WHATSAPP LEARNING',
    channelName: 'WhatsApp Micro-Learning & Audio Notes',
    category: 'mobile',
    description: 'A mobile-first format for short learning materials and practical prompts shared through WhatsApp. Materials and group support vary by course.',
    bestFor: 'Learners who prefer short materials and enquiries through WhatsApp.',
    priceStartingTsh: planForFormat('whatsapp-tier').priceTsh,
    priceStartingKes: planForFormat('whatsapp-tier').priceKes,
    priceStartingUsd: planForFormat('whatsapp-tier').priceUsd,
    pricingLabel: 'per month',
    bandwidthLevel: 'Data use varies by material and connection',
    features: [
      'Short learning materials designed for mobile use through WhatsApp',
      'Short practical learning materials',
      'Prompt examples and downloadable files where provided',
      'Group discussion or instructor support where included in the course'
    ],
    icon: 'MessageSquare'
  },
  {
    id: 'self-paced-learning',
    number: '02',
    title: 'SELF-PACED ONLINE LEARNING',
    channelName: 'On-demand course materials',
    category: 'self-paced',
    description: 'Study independently using the video and written materials included with your selected course. Access period and downloads are confirmed before enrollment.',
    bestFor: 'Learners who want to study around their own schedule.',
    priceStartingTsh: planForFormat('self-paced-platform').priceTsh,
    priceStartingKes: planForFormat('self-paced-platform').priceKes,
    priceStartingUsd: planForFormat('self-paced-platform').priceUsd,
    pricingLabel: 'per month',
    bandwidthLevel: 'Standard 3G / 4G / Wi-Fi; usage varies by materials',
    features: [
      'Study at your own pace during the confirmed access period',
      'Video and written materials included with the selected course',
      'Project files or downloads where provided'
    ],
    icon: 'MonitorPlay'
  },
  {
    id: 'zoom-live',
    number: '03',
    title: 'ZOOM LIVE CLASSES',
    channelName: 'Interactive Zoom Live Virtual Cohorts',
    category: 'virtual',
    description: 'Instructor-led online classes on the schedule confirmed for each cohort, with time for questions and guided practice.',
    bestFor: 'Learners who prefer instructor-led online sessions.',
    priceStartingTsh: planForFormat('zoom-live-cohort').priceTsh,
    priceStartingKes: planForFormat('zoom-live-cohort').priceKes,
    priceStartingUsd: planForFormat('zoom-live-cohort').priceUsd,
    pricingLabel: 'per month  |  Live Interactive',
    bandwidthLevel: 'Reliable internet connection for live video',
    features: [
      'Live online instruction and guided practice',
      'Questions during scheduled sessions',
      'Recordings only where confirmed for the cohort',
      'Class schedule and access details shared after enrollment is confirmed'
    ],
    icon: 'Video'
  },
  {
    id: 'google-meet',
    number: '04',
    title: 'GOOGLE MEET TRAINING',
    channelName: 'Google Meet Executive & Team Sessions',
    category: 'virtual',
    description: 'Google Meet may be used for online training when agreed. Availability, session scope, and delivery details are confirmed with the cohort or organization.',
    bestFor: 'Teams using Google Meet for agreed online sessions.',
    priceStartingTsh: planForFormat('zoom-live-cohort').priceTsh,
    priceStartingKes: planForFormat('zoom-live-cohort').priceKes,
    priceStartingUsd: planForFormat('zoom-live-cohort').priceUsd,
    pricingLabel: 'per month / cohort access',
    bandwidthLevel: 'Reliable internet connection for live video',
    features: [
      'Session schedule and access details confirmed in advance',
      'Question time during scheduled sessions where included',
      'Course scope and practice activities agreed with the cohort'
    ],
    icon: 'MonitorPlay'
  },
  {
    id: 'workshops-seminars',
    number: '05',
    title: 'WORKSHOPS & SEMINARS',
    channelName: 'Hands-On Intensive Workshops & Seminars',
    category: 'in-person',
    description: 'Practical sessions for teams, with duration, materials, and deliverables agreed in the proposal.',
    bestFor: 'Departmental staff, teacher associations, youth incubators, and professional member associations.',
    priceStartingTsh: planForFormat('workshops-delivery').priceTsh,
    priceStartingKes: planForFormat('workshops-delivery').priceKes,
    priceStartingUsd: planForFormat('workshops-delivery').priceUsd,
    pricingLabel: 'per workshop session (up to 30 participants)',
    bandwidthLevel: 'In-Person / Hybrid Delivery',
    features: [
      'Intensive hands-on practice & group project drills',
      'Practice materials agreed for the session',
      'Examples scoped with the organization',
      'Attendance certificate only if confirmed in the proposal'
    ],
    icon: 'Calendar'
  },
  {
    id: 'physical-training',
    number: '06',
    title: 'PHYSICAL TRAINING',
    channelName: 'On-Site Corporate & Campus Immersion',
    category: 'in-person',
    description: 'Discuss on-site training at your organization’s venue; scope and delivery details are agreed before booking.',
    bestFor: 'Organizations that prefer an in-person session.',
    priceStartingTsh: planForFormat('corporate-physical').priceTsh,
    priceStartingKes: planForFormat('corporate-physical').priceKes,
    priceStartingUsd: planForFormat('corporate-physical').priceUsd,
    pricingLabel: 'per corporate cohort (Multi-Day Deep Dive)',
    bandwidthLevel: 'Venue and connectivity requirements confirmed before delivery',
    features: [
      'On-site instructor-led delivery where agreed in the proposal',
      'Training scope and equipment needs agreed in advance',
      'Practice activities based on the agreed scope',
      'Schedule confirmed before booking'
    ],
    icon: 'Building2'
  },
  {
    id: 'conferences-keynotes',
    number: '07',
    title: 'CONFERENCES & KEYNOTES',
    channelName: 'Keynotes, Tech Summits & Public Forums',
    category: 'in-person',
    description: 'Discuss a keynote or speaking engagement on AI, cybersecurity, or digital skills.',
    bestFor: 'Events seeking a speaker on practical AI, cybersecurity, or digital skills.',
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
