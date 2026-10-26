import { ProgramPillar } from '../types';

export const programsData: ProgramPillar[] = [
  {
    id: 'ai-academy',
    slug: 'ai',
    title: 'AI ACADEMY',
    badge: 'Flagship Pillar',
    tagline: 'Build practical AI skills, from core concepts to workplace applications.',
    description: 'Master practical artificial intelligence concepts, modern LLM workflows, prompt engineering, AI safety, and automated productivity tools tailored for African professionals and institutions.',
    extendedDescription: 'The AI Academy introduces core AI concepts and guided workflows for work, study, teaching, and business. Learners practise evaluating AI output, protecting sensitive information, and deciding where human review is needed.',
    audience: [
      'Students & University Graduates',
      'Teachers, Lecturers & Educators',
      'Business Leaders & Entrepreneurs',
      'NGO & Development Professionals',
      'Creative & Marketing Teams'
    ],
    topics: [
      'AI Fundamentals & How LLMs Work',
      'ChatGPT, Claude & Gemini Productivity',
      'Advanced Prompt Engineering',
      'AI for Business Operations & Strategy',
      'AI for Education & Curriculum Design',
      'AI Safety & Deepfake Detection',
      'Responsible AI & Ethical Governance',
      'AI Automation & Daily Workflow Optimization',
      'Multilingual AI tools and output review (tool support varies)',
      'AI Research & Data Synthesis'
    ],
    modules: [
      {
        title: 'Module 1: AI Demystified & LLM Core Concepts',
        description: 'Understand generative artificial intelligence, how neural models think, tokenization, hallucinations, and capabilities without complex mathematics.',
        practicalSkill: 'Evaluate model strengths, bypass limitations, and formulate structured instructions.'
      },
      {
        title: 'Module 2: The S.M.A.R.T. Prompt Engineering Matrix',
        description: 'Move beyond one-line queries into structured prompting, role assignments, multi-shot prompting, and context chaining.',
        practicalSkill: 'Build reusable prompt templates for reports, client proposals, research, and analysis.'
      },
      {
        title: 'Module 3: Enterprise AI Productivity & Workplace Workflows',
        description: 'Integrate generative tools into spreadsheets, document summarization, customer communication, and executive decision memos.',
        practicalSkill: 'Map a repetitive task and practise improving it with an AI assistant.'
      },
      {
        title: 'Module 4: AI Safety, Verification & Deepfake Awareness',
        description: 'Learn critical evaluation methods to verify AI factual reliability, spot synthetic media (voice/video deepfakes), and prevent data leakage.',
        practicalSkill: 'Implement data protection protocols to prevent confidential info leaks into public AI tools.'
      },
      {
        title: 'Module 5: Localized AI & Multi-lingual Applications',
         description: 'Explore multilingual AI tools for outreach, education, and translation, while reviewing output for accuracy and local context.',
        practicalSkill: 'Adapt prompts to local examples and review translations for accuracy.'
      },
      {
        title: 'Module 6: AI Research & Reliable Information',
        description: 'Use AI to frame research questions, compare sources, summarize evidence, and identify unsupported claims.',
        practicalSkill: 'Produce a source-aware research brief with clear evidence checks.'
      },
      {
        title: 'Module 7: AI for Content & Communications',
        description: 'Plan, draft, edit, and adapt content for websites, social media, reports, and community audiences.',
        practicalSkill: 'Create a reusable content workflow with consistent brand voice.'
      },
      {
        title: 'Module 8: AI for Data & Spreadsheet Workflows',
        description: 'Clean, interpret, and explain structured data using safe AI-assisted spreadsheet workflows.',
        practicalSkill: 'Turn a raw dataset into an actionable summary for decision-makers.'
      },
      {
        title: 'Module 9: AI Automation Without Complex Code',
        description: 'Map repetitive tasks and connect practical AI tools while keeping human review in the loop.',
        practicalSkill: 'Design a documented automation for one recurring weekly task.'
      },
      {
        title: 'Module 10: Building with Vibe Coding',
        description: 'Translate a product idea into screens, prompts, components, and an iterative build plan.',
        practicalSkill: 'Prototype a useful web app from a plain-language product brief.'
      },
      {
        title: 'Module 11: Product Thinking & User Discovery',
        description: 'Define the user, problem, success measure, and smallest useful version before building.',
        practicalSkill: 'Write a focused product brief and prioritize a first release.'
      },
      {
        title: 'Module 12: AI Governance & Team Guidelines',
        description: 'Create practical rules for privacy, approved tools, human review, ownership, and responsible use.',
        practicalSkill: 'Draft a lightweight AI usage policy for a team or organization.'
      },
      {
        title: 'Module 13: Presenting AI-Enhanced Work',
        description: 'Explain AI-assisted decisions, show evidence, and communicate limitations to clients and colleagues.',
        practicalSkill: 'Deliver a clear five-minute demonstration of an AI workflow.'
      },
      {
        title: 'Module 14: Building an AI Portfolio',
        description: 'Package prompts, workflows, prototypes, and measured outcomes into a credible professional portfolio.',
        practicalSkill: 'Publish three case studies that demonstrate practical AI capability.'
      },
      {
        title: 'Module 15: AI Capstone Project',
        description: 'Combine prompting, verification, automation, and communication in a guided real-world project.',
        practicalSkill: 'Complete and present a useful AI solution for a real user or organization.'
      }
    ],
    outcomes: [
      'Master prompt engineering to produce precise, high-grade professional outputs',
      'Safely integrate AI into business, academic, or institutional workflows',
      'Critically verify AI outputs and detect misinformation or synthetic deepfakes',
      'Explore how AI tools respond to English and selected regional-language prompts'
    ],
    deliveryFormats: [
      'Zoom / Google Meet Live Online',
      'WhatsApp Cohort Learning Groups',
      'On-site Physical Bootcamps & Workshops',
      'Custom Corporate In-House Sessions'
    ],
    durationOptions: ['2-Hour Intensive', 'Half-Day Workshop', '2-Day Bootcamp', '4-Week Executive Cohort'],
    icon: 'Sparkles',
    ctaText: 'EXPLORE AI PROGRAMS'
  },
  {
    id: 'cybersecurity-academy',
    slug: 'cybersecurity',
    title: 'CYBERSECURITY ACADEMY',
    badge: 'Essential Resilience',
    tagline: 'Practical cybersecurity skills for everyday people and professionals.',
    description: 'Demystify cyber risks, build defensive digital hygiene, secure organizational assets, and defend against phishing, social engineering, and identity compromise in an increasingly connected world.',
    extendedDescription: 'Human vulnerability remains the primary entry point for 90%+ of cyber incidents. The Cybersecurity Academy focuses on behavioral defense, actionable cyber hygiene, and risk awareness for non-technical employees, executives, students, and community leaders who need to protect sensitive personal and financial data.',
    audience: [
      'Corporate Staff & Remote Workers',
      'Financial & Banking Personnel',
      'School Administrators & Teachers',
      'SME Owners & Entrepreneurs',
      'Everyday Digital Citizens'
    ],
    topics: [
      'Cyber Hygiene & Password Management',
      'Personal & Corporate Online Safety',
      'Phishing, Smishing & Spear-Phishing Defense',
      'Digital Privacy & Footprint Auditing',
      'Social Engineering Attack Vectors',
      'Multi-Factor Authentication (MFA) Implementation',
      'Public Wi-Fi & Device Security Protocols',
      'Cyber Risk Assessment for Small Businesses',
      'Incident Awareness & Rapid Response Protocol',
      'Child Online Protection & Family Digital Safety'
    ],
    modules: [
      {
        title: 'Module 1: The Human Firewall & Threat Landscape',
        description: 'Understand the most prevalent attack vectors targeting African users, mobile money scams, fake banking alerts, SIM swap alerts, and urgent fraud emails.',
        practicalSkill: 'Spot psychological manipulation and deceptive cues in under 10 seconds.'
      },
      {
        title: 'Module 2: Ironclad Credentials & Digital Footprint',
        description: 'Audit personal data exposure, configure passkeys and password managers, and enforce hardware/software MFA.',
        practicalSkill: 'Eliminate credential reuse and secure 100% of primary email and banking accounts.'
      },
      {
        title: 'Module 3: Endpoint & Network Defense for Remote Work',
        description: 'Protect laptops, smartphones, and tablets from malware, unsecured networks, and unauthorized access.',
        practicalSkill: 'Configure zero-trust device settings, encrypted backups, and secure browsing.'
      },
      {
        title: 'Module 4: Incident Response & Digital First-Aid',
        description: 'Step-by-step containment protocols if an account is compromised, suspicious link is clicked, or data is breached.',
        practicalSkill: 'Execute rapid incident isolation, forensic preservation, and credential recovery.'
      },
      {
        title: 'Module 5: Mobile Money & Banking Fraud Defense',
        description: 'Recognize fake payment prompts, SIM-swap signals, urgent calls, and social engineering around mobile money.',
        practicalSkill: 'Create a verification checklist for high-risk financial requests.'
      },
      {
        title: 'Module 6: Secure Email & Messaging',
        description: 'Inspect links, attachments, sender identity, spoofing clues, and safe escalation procedures.',
        practicalSkill: 'Triage suspicious email and WhatsApp messages before responding.'
      },
      {
        title: 'Module 7: Privacy & Data Protection Basics',
        description: 'Map personal and organizational data, reduce unnecessary exposure, and apply privacy-by-default habits.',
        practicalSkill: 'Build a simple data inventory and protection checklist.'
      },
      {
        title: 'Module 8: Web, Browser & Cloud Safety',
        description: 'Harden browser settings, cloud sharing, downloads, extensions, and account recovery options.',
        practicalSkill: 'Audit and improve the security settings of a daily-use account.'
      },
      {
        title: 'Module 9: Social Engineering & Human Risk',
        description: 'Understand manipulation tactics used through trust, urgency, authority, and fear.',
        practicalSkill: 'Run a safe awareness exercise without exposing real credentials.'
      },
      {
        title: 'Module 10: Device Security for Remote Work',
        description: 'Protect phones and laptops with updates, encryption, backups, screen locks, and safe networks.',
        practicalSkill: 'Apply a practical baseline to a personal or team device.'
      },
      {
        title: 'Module 11: Security for Small Businesses',
        description: 'Prioritize risks, roles, assets, suppliers, and controls for resource-constrained organizations.',
        practicalSkill: 'Create a prioritized security improvement roadmap.'
      },
      {
        title: 'Module 12: Safe AI & Deepfake Verification',
        description: 'Check AI-generated text, images, voice, and video before sharing or acting on them.',
        practicalSkill: 'Apply a verification workflow to a suspicious digital claim.'
      },
      {
        title: 'Module 13: Security Awareness Communication',
        description: 'Turn technical risks into short, useful guidance that staff and communities can act on.',
        practicalSkill: 'Design a one-page awareness campaign for a target audience.'
      },
      {
        title: 'Module 14: Incident Reporting & Recovery',
        description: 'Document what happened, preserve useful evidence, communicate safely, and restore trusted access.',
        practicalSkill: 'Complete an incident report and recovery playbook.'
      },
      {
        title: 'Module 15: Cyber Safety Capstone',
        description: 'Combine risk assessment, prevention, response, and communication in a realistic security scenario.',
        practicalSkill: 'Present a practical security plan for a person, team, or small organization.'
      }
    ],
    outcomes: [
      'Recognize and neutralize 99% of phishing and social engineering attempts',
      'Establish robust personal and institutional security baselines',
      'Protect organizational confidential records and intellectual property',
      'Comply with digital data protection principles without technical complexity'
    ],
    deliveryFormats: [
      'Interactive Live Webinars',
      'On-site Corporate Security Audits & Workshops',
      'Institutional Staff Awareness Drills',
      'Community Digital Safety Seminars'
    ],
    durationOptions: ['90-Minute Awareness Briefing', 'Half-Day Intensive', 'Full-Day Simulation Workshop', 'Institutional Retainer'],
    icon: 'ShieldCheck',
    ctaText: 'EXPLORE CYBERSECURITY'
  },
  {
    id: 'digital-skills-academy',
    slug: 'digital-skills',
    title: 'DIGITAL SKILLS ACADEMY',
    badge: 'Workforce Ready',
    tagline: 'Practical technology skills for work, education and entrepreneurship.',
    description: 'Empower students, educators, and enterprise staff with core workplace digital capabilities, cloud collaboration, office suites, data organization, digital communication, and remote productivity.',
    extendedDescription: 'Bridging the digital divide requires more than hardware; it requires the fluency to use standard cloud tools, modern collaborative ecosystems, and structured digital workflows. Our Digital Skills Academy transforms basic users into agile digital contributors ready for high-performing modern workplaces.',
    audience: [
      'University Students & Job Seekers',
      'Administrative & Operational Staff',
      'Teachers Modernizing Classrooms',
      'Solo Entrepreneurs & Freelancers',
      'NGO Field Officers'
    ],
    topics: [
      'Modern Digital Literacy & Operating Systems',
      'Google Workspace Mastery (Docs, Sheets, Drive, Slides)',
      'Microsoft 365 for High-Performance Teams',
      'Digital Productivity Systems & Task Management',
      'Digital Communication & Professional Email Etiquette',
      'Cloud File Management & Collaboration Protocols',
      'Digital Content Creation for Businesses',
      'Virtual Meeting Mastery & Hybrid Teamwork',
      'Data Entry, Spreadsheet Formulas & Simple Reporting',
      'Career Readiness & Digital Portfolio Creation'
    ],
    modules: [
      {
        title: 'Module 1: Cloud Collaboration & Workplace Ecosystems',
        description: 'Master real-time co-authoring, version control, access permissions, and shared team drives.',
        practicalSkill: 'Run seamless paperless collaboration pipelines across teams.'
      },
      {
        title: 'Module 2: Applied Spreadsheets & Data Organization',
        description: 'Essential functions (XLOOKUP, IF, SUMIFS), pivot tables, clean data hygiene, and automated formatting.',
        practicalSkill: 'Build functional budget trackers, client rosters, and operational summary sheets.'
      },
      {
        title: 'Module 3: High-Impact Visual & Written Communication',
        description: 'Modern executive presentation slide design, clear business memos, and digital formatting standards.',
        practicalSkill: 'Create crisp, polished presentations and memos that communicate ideas persuasively.'
      },
      {
        title: 'Module 4: Remote Work Agility & Time Mastery',
        description: 'Calendar management, asynchronous communication rules, and digital distraction countermeasures.',
        practicalSkill: 'Operate smoothly across distributed remote and hybrid teams with zero friction.'
      },
      {
        title: 'Module 5: Digital File & Folder Systems',
        description: 'Create naming rules, folder structures, permissions, and archive habits that keep work findable.',
        practicalSkill: 'Set up a shared file system that a team can maintain.'
      },
      {
        title: 'Module 6: Professional Email & Calendar Workflows',
        description: 'Write clear emails, manage threads, schedule meetings, and protect attention across busy teams.',
        practicalSkill: 'Build a reliable weekly communication and calendar routine.'
      },
      {
        title: 'Module 7: Spreadsheets for Everyday Decisions',
        description: 'Use formulas, sorting, filters, validation, and simple charts to make everyday work clearer.',
        practicalSkill: 'Build a clean tracker with summaries and decision-ready views.'
      },
      {
        title: 'Module 8: Presentations & Visual Storytelling',
        description: 'Structure information, choose useful visuals, and deliver clear presentations for African audiences.',
        practicalSkill: 'Create and present a concise decision-focused slide deck.'
      },
      {
        title: 'Module 9: Digital Content & Brand Basics',
        description: 'Plan useful digital content, apply basic design principles, and keep messaging consistent.',
        practicalSkill: 'Create a small content kit for a business or community project.'
      },
      {
        title: 'Module 10: Online Meetings & Hybrid Teamwork',
        description: 'Prepare agendas, facilitate inclusive calls, document decisions, and follow up clearly.',
        practicalSkill: 'Run a productive online meeting with an actionable record.'
      },
      {
        title: 'Module 11: Forms, Surveys & Data Collection',
        description: 'Design useful forms, reduce errors, protect responses, and turn collected data into summaries.',
        practicalSkill: 'Create a simple digital data-collection workflow.'
      },
      {
        title: 'Module 12: No-Code Workflows & Automation',
        description: 'Connect everyday tools to reduce repetitive copying, reminders, and manual reporting.',
        practicalSkill: 'Map and improve one repeatable administrative workflow.'
      },
      {
        title: 'Module 13: Digital Portfolio & Career Readiness',
        description: 'Showcase work, document skills, improve a CV, and build a credible online professional presence.',
        practicalSkill: 'Publish a focused portfolio with evidence of completed projects.'
      },
      {
        title: 'Module 14: Digital Safety & Responsible Use',
        description: 'Apply privacy, password, sharing, and verification habits across workplace tools.',
        practicalSkill: 'Complete a personal and team digital-safety audit.'
      },
      {
        title: 'Module 15: Digital Skills Capstone',
        description: 'Combine collaboration, data, communication, and workflow skills in a practical workplace project.',
        practicalSkill: 'Deliver a complete digital workflow that solves a real operational need.'
      }
    ],
    outcomes: [
      'Fluent proficiency in Google Workspace and Microsoft 365 environments',
      'Accelerated speed and precision in everyday administrative and operational tasks',
      'Professional-grade digital communication and presentation skills',
      'Confidence to thrive in modern tech-enabled workplaces'
    ],
    deliveryFormats: [
      'Interactive Online Cohorts',
      'Hands-on Lab Computer Workshops',
      'School & University Bootcamps',
      'Weekend Professional Intensives'
    ],
    durationOptions: ['Half-Day Sprint', '2-Day Practical Lab', '3-Week Evening Cohort', 'Institutional Curriculum'],
    icon: 'Laptop',
    ctaText: 'EXPLORE DIGITAL SKILLS'
  }
];
