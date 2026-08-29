export type PageRoute =
  | 'home'
  | 'features'
  | 'pricing'
  | 'programs'
  | 'programs/ai'
  | 'programs/cybersecurity'
  | 'programs/digital-skills'
  | 'vibe-coding'
  | 'devpad'
  | 'learning-formats'
  | 'for-organizations'
  | 'resources'
  | 'blog'
  | 'about'
  | 'contact'
  | 'not-found';

export interface PlatformFeature {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  badge: string;
  points: string[];
  note?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  deliveryChannel: string;
  deliveryType: 'mobile-first' | 'self-paced' | 'virtual-live' | 'in-person-workshop' | 'corporate-onsite' | 'keynote';
  badge?: string;
  tagline: string;
  priceTsh: string;
  priceKes: string;
  priceUsd: string;
  billingPeriod: string;
  bandwidthRequirement?: string;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  highlightNote?: string;
}

export interface ProgramPillar {
  id: string;
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  audience: string[];
  topics: string[];
  modules: {
    title: string;
    description: string;
    practicalSkill: string;
  }[];
  outcomes: string[];
  deliveryFormats: string[];
  durationOptions: string[];
  icon: string;
  ctaText: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  category: 'ai' | 'cybersecurity' | 'digital-skills';
  audience: string;
  level: 'Beginner' | 'Professional' | 'Educator' | 'Awareness' | 'Executive' | 'All Levels';
  format: string;
  duration: string;
  description: string;
  highlights: string[];
  curriculum: string[];
  idealFor: string;
  isPopular?: boolean;
}

export interface LearningFormat {
  id: string;
  number: string;
  title: string;
  channelName: string;
  category: 'mobile' | 'virtual' | 'in-person';
  description: string;
  bestFor: string;
  priceStartingTsh: string;
  priceStartingKes: string;
  priceStartingUsd: string;
  pricingLabel: string;
  bandwidthLevel: string;
  features: string[];
  icon: string;
}

export interface SmartFrameworkStep {
  letter: string;
  word: string;
  meaning: string;
  description: string;
  practicalExample: string;
}

export interface TrainingPackage {
  id: string;
  title: string;
  tagline: string;
  durations: string[];
  formats: string[];
  targetAudience: string;
  keyOutcomes: string[];
  category: 'AI' | 'Cybersecurity' | 'Digital Skills' | 'Executive' | 'Institutional';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  format: 'PDF Guide' | 'Checklist' | 'Toolkit' | 'Cheat Sheet';
  description: string;
  readingTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetAudience: string;
  keyHighlights: string[];
  useCases: string[];
  previewContent?: string[];
  downloadName: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'AI Literacy' | 'Cybersecurity' | 'Education' | 'Business' | 'Productivity';
  readingTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      keyTip?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Enrollment' | 'Organizations' | 'Delivery' | 'Course Access' | 'Payment & Mobile Money' | 'Technical Support';
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  specialtyBadge: string;
  experience: string;
  bio: string;
  avatarInitials: string;
  avatarGradient?: string;
  avatarImage?: string;
  expertise: string[];
  coursesCount: number;
  featuredCourses: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface IndustrySolution {
  id: string;
  name: string;
  description: string;
  criticalNeeds: string[];
  recommendedPrograms: string[];
  icon: string;
}
