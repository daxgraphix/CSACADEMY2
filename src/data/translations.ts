export type Theme = 'dark' | 'light';
export type Currency = 'TSH' | 'KES' | 'USD';

export interface SectionBadgeTitle {
  badge: string;
  title: string;
  subtitle: string;
}

export interface Translations {
  nav: {
    home: string;
    features: string;
    programs: string;
    aiDeepDive: string;
    cyberDeepDive: string;
    digitalDeepDive: string;
    allPrograms: string;
    smartFramework: string;
    formats: string;
    organizations: string;
    resources: string;
    pricing: string;
    blog: string;
    about: string;
    contact: string;
    bookTraining: string;
    exploreAcademy: string;
    tagline: string;
    switchLang: string;
    switchTheme: string;
  };
  hero: {
    badge: string;
    badgeHighlight: string;
    headlineMain: string;
    headlineHighlight: string;
    subheadline: string;
    ctaExplore: string;
    ctaEnroll: string;
    ctaWatchTour: string;
    stat1Label: string;
    stat1Val: string;
    stat2Label: string;
    stat2Val: string;
    stat3Label: string;
    stat3Val: string;
    stat4Label: string;
    stat4Val: string;
    mobileMoneyNotice: string;
  };
  common: {
    learnMore: string;
    viewDetails: string;
    enrollNow: string;
    bookTraining: string;
    getStarted: string;
    applyNow: string;
    inquireNow: string;
    downloadResource: string;
    readArticle: string;
    share: string;
    filterAll: string;
    searchPlaceholder: string;
    mostPopular: string;
    perMonth: string;
    free: string;
    customQuote: string;
    verifiedLearner: string;
    qrVerification: string;
    localInstruction: string;
    englishInstruction: string;
    bilingual: string;
    close: string;
    backToHome: string;
    contactInstructor: string;
  };
  delivery: {
    badge: string;
    title: string;
    subtitle: string;
    bandwidth: string;
    channel: string;
    idealFor: string;
    keyFeatures: string;
    investment: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
  };
  formats: SectionBadgeTitle;
  programsSection: {
    badge: string;
    title: string;
    subtitle: string;
    viewAllCourses: string;
  };
  localAi: {
    badge: string;
    title: string;
    subtitle: string;
    vibeCodingTitle: string;
    vibeCodingDesc: string;
    ctaMasterclass: string;
  };
  organizations: SectionBadgeTitle;
  organizationsSection: {
    badge: string;
    title: string;
    subtitle: string;
    requestProposal: string;
  };
  packages: SectionBadgeTitle;
  process: SectionBadgeTitle;
  whyUs: SectionBadgeTitle;
  socialProof: SectionBadgeTitle;
  resources: SectionBadgeTitle;
  blog: SectionBadgeTitle;
  about: SectionBadgeTitle;
  faq: SectionBadgeTitle;
  pricing: SectionBadgeTitle;
  footer: {
    about: string;
    quickLinks: string;
    programs: string;
    delivery: string;
    contactUs: string;
    rights: string;
    locationNote: string;
  };
}

export const translations: Translations = {
  nav: {
    home: "Home",
    features: "Platform Features",
    programs: "Programs & Courses",
    aiDeepDive: "Artificial Intelligence & Prompt Engineering",
    cyberDeepDive: "Cybersecurity & Digital Trust",
    digitalDeepDive: "Digital Skills & Web Development",
    allPrograms: "View All 30+ Modules",
    smartFramework: "SMART Framework",
    formats: "Delivery Formats",
    organizations: "For Organizations",
    resources: "Resources & Digital Shop",
    pricing: "Pricing Plans",
    blog: "Blog & Insights",
    about: "About Us",
    contact: "Contact",
    bookTraining: "Enroll Now",
    exploreAcademy: "Explore Courses",
    tagline: "Empowering East Africa with Digital Skills",
    switchLang: "Switch Language",
    switchTheme: "Toggle Theme"
  },
  hero: {
    badge: "EAST AFRICA'S PREMIER TECH LEARNING PLATFORM",
    badgeHighlight: "NEW: Vibe Coding & AI",
    headlineMain: "MASTER AI, CYBERSECURITY",
    headlineHighlight: "& DIGITAL SKILLS",
    subheadline: "Learn AI, web development, and cybersecurity through hands-on projects that help you move forward at work, in business, and in everyday life.",
    ctaExplore: "Start Free Learning",
    ctaEnroll: "Join Live Cohort",
    ctaWatchTour: "Explore Platform Tour",
    stat1Val: "1,200+",
    stat1Label: "Graduates Trained",
    stat2Val: "30+",
    stat2Label: "AI & Cybersecurity Modules",
    stat3Val: "100%",
    stat3Label: "English-First Content",
    stat4Val: "4.9/5",
    stat4Label: "Learner Rating",
    mobileMoneyNotice: "Instant Mobile Money Activation (M-Pesa, Tigo Pesa, Airtel Money & Card)"
  },
  common: {
    learnMore: "Learn More",
    viewDetails: "View Details",
    enrollNow: "Enroll in Course",
    bookTraining: "Book Training",
    getStarted: "Get Started",
    applyNow: "Apply Now",
    inquireNow: "Inquire About Training",
    downloadResource: "Download Guide (PDF)",
    readArticle: "Read Full Article",
    share: "Share",
    filterAll: "All",
    searchPlaceholder: "Search courses, guides, articles...",
    mostPopular: "MOST POPULAR",
    perMonth: "per month",
    free: "Free",
    customQuote: "Custom Quote",
    verifiedLearner: "Verified Learner",
    qrVerification: "Tamper-Proof QR PDF Certificate",
    localInstruction: "Local Language Instruction",
    englishInstruction: "English Tech Terms & Glossary",
    bilingual: "English & Local Languages",
    close: "Close",
    backToHome: "Back to Home",
    contactInstructor: "Contact Instructor"
  },
  delivery: {
    badge: "FLEXIBLE DELIVERY CHANNELS",
    title: "LEARN ANYWHERE. CONNECT YOUR WAY.",
    subtitle: "Choose the format that fits your team's geography, bandwidth, and learning style. Transparent pricing tailored to each delivery channel.",
    bandwidth: "Bandwidth / Setup",
    channel: "Delivery Channel",
    idealFor: "Ideal For",
    keyFeatures: "Key Features",
    investment: "Delivery Investment",
    comparisonTitle: "Compare All 6 Delivery Channels Side-by-Side",
    comparisonSubtitle: "Find the optimal balance between internet bandwidth and live interaction level."
  },
  formats: {
    badge: "6 DELIVERY CHANNELS",
    title: "LEARN ANYWHERE. ON YOUR SCHEDULE.",
    subtitle: "From low-bandwidth WhatsApp audio lessons to self-paced video streaming, live Zoom cohort bootcamps, and corporate retreats."
  },
  programsSection: {
    badge: "CORE PILLARS",
    title: "HIGH-DEMAND DIGITAL SKILLS FOR MODERN CAREERS",
    subtitle: "Curricula tailored to help you land tech jobs, start freelance businesses, or accelerate corporate productivity.",
    viewAllCourses: "Explore All Comprehensive Curricula"
  },
  localAi: {
    badge: "AI IN PRACTICE",
    title: "BUILD WITH AI IN YOUR LANGUAGE",
    subtitle: "Learn AI in a clear English-first context with local language support, use it safely, and turn everyday ideas into useful work, reports, and digital products.",
    vibeCodingTitle: "What is Vibe Coding?",
    vibeCodingDesc: "The modern paradigm of building full-stack web applications and software using natural language prompts and AI agents rather than manual boilerplate coding.",
    ctaMasterclass: "Reserve Vibe Coding Masterclass Seat"
  },
  organizations: {
    badge: "FOR CORPORATES & INSTITUTIONS",
    title: "ELEVATE YOUR WORKFORCE'S DIGITAL CAPABILITIES",
    subtitle: "Tailored AI, Cyber Safety, and Technology upskilling for Banks, Government bodies, Universities, NGOs, and Enterprises."
  },
  organizationsSection: {
    badge: "FOR CORPORATES & INSTITUTIONS",
    title: "ELEVATE YOUR WORKFORCE'S DIGITAL CAPABILITIES",
    subtitle: "Tailored AI, Cyber Safety, and Technology upskilling for Banks, Government bodies, Universities, NGOs, and Enterprises.",
    requestProposal: "Request Corporate Proposal"
  },
  packages: {
    badge: "PROFESSIONAL TRAINING PACKAGES",
    title: "CURATED TRACKS DESIGNED FOR RAPID IMPACT",
    subtitle: "Select a standardized skill package engineered for your team's exact career and technology milestones."
  },
  process: {
    badge: "LEARNING ROADMAP",
    title: "YOUR STEP-BY-STEP PATH TO MASTERY",
    subtitle: "4 structured phases from enrollment and hands-on practice to QR verification and career readiness."
  },
  whyUs: {
    badge: "WHY CS ACADEMY?",
    title: "BUILT SPECIFICALLY FOR EAST AFRICAN MINDS",
    subtitle: "Bridging the gap between world-class technology and local context with zero friction."
  },
  socialProof: {
    badge: "PROOF OF PRACTICAL PROGRESS",
    title: "SKILLS THAT CREATE REAL OUTCOMES",
    subtitle: "See how students, educators, professionals, and teams across East Africa turn practical learning into stronger work and new opportunities."
  },
  resources: {
    badge: "FREE OPEN TOOLKITS",
    title: "PRACTICAL GUIDES & PROMPT TEMPLATES",
    subtitle: "Download high-impact prompt guides, cybersecurity checklists, and curriculum starter templates at no cost."
  },
  blog: {
    badge: "ESSAYS & PRACTICAL INSIGHTS",
    title: "DEEP DIVES INTO TECH, AI & SECURITY",
    subtitle: "Read expert perspectives on East African digital transformation, ethical AI, and cyber defense."
  },
  about: {
    badge: "ABOUT CS ACADEMY",
    title: "EMPOWERING EAST AFRICA WITH DIGITAL MASTERY",
    subtitle: "Our mission is to eliminate language and cost barriers so everyone can participate in the digital economy."
  },
  faq: {
    badge: "FREQUENTLY ASKED QUESTIONS",
    title: "HAVE QUESTIONS? WE HAVE ANSWERS",
    subtitle: "Clear explanations regarding course formats, mobile money payment, certification, and team onboarding."
  },
  pricing: {
    badge: "PRICING & MEMBERSHIP PLANS",
    title: "TRANSPARENT TUITION FOR EVERY LEARNER",
    subtitle: "Simple, flexible plans with zero hidden fees. Pay seamlessly with M-Pesa, Tigo Pesa, Airtel Money, or credit card."
  },
  footer: {
    about: "CS Academy is East Africa's leading platform delivering practical technology education and cybersecurity resilience.",
    quickLinks: "Quick Links",
    programs: "Our Programs",
    delivery: "Delivery Channels",
    contactUs: "Contact Us",
    rights: "All Rights Reserved.",
    locationNote: "Tanzania  |  Kenya  |  Uganda  |  Rwanda  |  Burundi  |  DRC  |  East Africa"
  }
};
