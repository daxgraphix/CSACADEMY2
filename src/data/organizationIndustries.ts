import { IndustrySolution } from '../types';

export interface CorporateOffering {
  badge: string;
  title: string;
  description: string;
  points: string[];
}

export const corporateOfferingsData: CorporateOffering[] = [
  {
    badge: 'Enterprise Workforce',
    title: 'Corporate AI & Cybersecurity Training',
    description: 'Transform internal operations with hands-on prompt engineering, safe workflow automation, and human firewall defense.',
    points: ['Confidential data privacy guardrails', 'Departmental prompting cheat sheets', 'Simulated phishing and fraud audits']
  },
  {
    badge: 'Academic & Higher Ed',
    title: 'University & Youth Programmes',
    description: 'Empower faculty with AI pedagogy and equip students with job-ready digital capabilities and assessment integrity.',
    points: ['Ethical AI curriculum guidelines', 'Classroom assessment tools', 'Career-ready digital portfolios']
  },
  {
    badge: 'Executive & Boardroom',
    title: 'Executive AI Briefings',
    description: 'High-density, jargon-free briefings for directors and C-suite leaders evaluating AI opportunities, regulatory exposure, and cyber governance.',
    points: ['Strategic technology horizon scan', 'Institutional risk and liability', 'Executive data security best practices']
  },
  {
    badge: 'Custom Institutional',
    title: 'Customized Organizational Syllabi',
    description: 'Bespoke multi-module training programs co-designed with your L&D leads for NGOs, government ministries, and banks.',
    points: ['Tailored to your software stack', 'Bilingual English & Local Languages', 'Pre/post impact evaluation reports']
  }
];

export const industrySolutionsData: IndustrySolution[] = [
  {
    id: 'education',
    name: 'Education & Universities',
    description: 'Empower faculty, administrative staff, and student bodies with AI-powered curriculum design, ethical assessment standards, and digital research fluency.',
    criticalNeeds: ['Academic integrity frameworks', 'AI-assisted lesson planning', 'Campus digital hygiene', 'Student career readiness'],
    recommendedPrograms: ['AI for Educators', 'University AI & Youth Programme', 'Digital Skills Lab'],
    icon: 'GraduationCap'
  },
  {
    id: 'financial',
    name: 'Financial Services & Banking',
    description: 'Arm customer service, credit analysts, and operations personnel with deepfake detection, phishing resistance, and secure generative data synthesis.',
    criticalNeeds: ['Deepfake voice fraud defense', 'Confidential customer data protection', 'Regulatory compliance', 'Phishing awareness'],
    recommendedPrograms: ['Cybersecurity Awareness Workshop', 'Executive AI Briefing', 'AI Safety & Deepfakes'],
    icon: 'Landmark'
  },
  {
    id: 'ngos',
    name: 'NGOs & Development Agencies',
    description: 'Accelerate donor reporting, grant writing, field survey data analysis, and cross-cultural community communication with AI and cloud collaboration.',
    criticalNeeds: ['Rapid grant proposal drafting', 'Field survey data cleanup', 'Multilingual community messaging', 'Remote team coordination'],
    recommendedPrograms: ['AI Productivity Workshop', 'Digital Productivity Masterclass', 'Cyber Hygiene Training'],
    icon: 'HeartHandshake'
  },
  {
    id: 'government',
    name: 'Government & Public Sector',
    description: 'Build institutional capability for civil servants, policy analysts, and department heads to understand AI ethics, digital sovereignty, and cyber defense.',
    criticalNeeds: ['Public sector AI policy awareness', 'Data sovereignty & security', 'Citizen-facing communication', 'Legacy process modernization'],
    recommendedPrograms: ['Executive AI Briefing', 'Custom Institutional Programme', 'Cybersecurity Awareness'],
    icon: 'Building2'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical Institutes',
    description: 'Streamline administrative documentation, patient communication, and medical research synthesis while safeguarding patient privacy and HIPAA/data ethics.',
    criticalNeeds: ['Patient confidentiality & privacy', 'Medical literature summarization', 'Administrative efficiency', 'Device & portal security'],
    recommendedPrograms: ['AI Productivity Starter Guide', 'Cyber Hygiene Checklist Training', 'Digital Skills Lab'],
    icon: 'ShieldCheck'
  },
  {
    id: 'smes',
    name: 'SMEs & Growing Enterprises',
    description: 'Help small business owners, sales teams, and marketers leverage free/low-cost AI tools to scale customer acquisition, marketing, and operations.',
    criticalNeeds: ['Zero-budget marketing automation', '24/7 customer support templates', 'Financial spreadsheet tracking', 'Mobile money safety'],
    recommendedPrograms: ['AI for Business Workshop', 'AI for Everyone', 'Cybersecurity for Small Businesses'],
    icon: 'Store'
  }
];

export const trainingProcessSteps = [
  {
    step: '01',
    name: 'DISCOVER',
    title: 'Discover & Assess',
    description: 'We consult with your leadership to understand your team\'s current tech fluency, unique operational bottlenecks, compliance mandates, and key goals.'
  },
  {
    step: '02',
    name: 'DESIGN',
    title: 'Design & Customize',
    description: 'We tailor curriculum modules, real-world case studies, and proprietary prompt templates to your exact organizational workflow and industry context.'
  },
  {
    step: '03',
    name: 'DELIVER',
    title: 'Deliver & Engage',
    description: 'Our expert facilitators lead highly interactive live sessions, online via Zoom/Meet, on-site at your offices, or through blended hybrid formats.'
  },
  {
    step: '04',
    name: 'REINFORCE',
    title: 'Reinforce & Practice',
    description: 'Participants receive downloadable toolkits, prompt cheat sheets, WhatsApp cohort support, and practical post-training challenge exercises.'
  },
  {
    step: '05',
    name: 'MEASURE',
    title: 'Measure & Evaluate',
    description: 'We provide post-training evaluation reports, competency assessments, and institutional feedback to verify tangible productivity and safety impact.'
  }
];
