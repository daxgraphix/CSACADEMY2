import { PlatformFeature } from '../types';

export const platformFeaturesData: PlatformFeature[] = [
  {
    id: 'quizzes-assessment',
    title: 'Quizzes & Assessment',
    shortDescription: 'Test your understanding with scored quizzes after each module.',
    fullDescription: 'Track your scores and revisit topics to master every concept. Interactive quizzes test key knowledge checkpoints, reinforce memory retention, and confirm practical comprehension before advancing to the next unit.',
    icon: 'CheckSquare',
    badge: 'Instant Auto-Grading',
    points: [
      'Interactive end-of-module quizzes with instant feedback',
      'Comprehensive explanations for correct and incorrect answers',
      'Personal learning progress dashboard and score tracking',
      'Unlimited retakes to ensure 100% conceptual mastery'
    ],
    swahiliNote: 'Mazoezi na mitihani ya kupima uelewa wako na kukuwezesha kukariri ujuzi.'
  },
  {
    id: 'pdf-certificates',
    title: 'PDF Certificates',
    shortDescription: 'Earn professional PDF certificates with QR code verification upon completing any course.',
    fullDescription: 'Share your achievements with employers, clients, and your professional network on LinkedIn. Each certificate contains a tamper-proof QR code that instantly validates your graduation status and coursework authenticity.',
    icon: 'Award',
    badge: 'QR Code Verifiable',
    points: [
      'Official downloadable high-resolution PDF certificate',
      'Tamper-proof QR code linking to your online verification page',
      'Instant 1-click sharing to LinkedIn, CVs, and client proposals',
      'Recognized credential across East African tech employers'
    ],
    swahiliNote: 'Vyeti rasmi vya kidijitali vyenye QR code inayoweza kuhakikiwa na waajiri popote.'
  },
  {
    id: 'digital-shop',
    title: 'Digital Shop',
    shortDescription: 'Download premium ebooks, templates, and ready to use skills from the shop.',
    fullDescription: 'Unlock products with Premium, or invite friends to unlock more. Access our curated library of prompt packs, web templates, design assets, and cheat sheets designed to give you an unfair advantage in your projects.',
    icon: 'ShoppingBag',
    badge: 'Templates & Ebooks',
    points: [
      'Curated library of tech ebooks, UI kits, and starter templates',
      'AI Prompt Starter Packs and business workflow blueprints',
      'Included FREE for Premium members',
      'Unlock individual products or the entire shop via friend invites'
    ],
    swahiliNote: 'Pakua vitabu, templates za tovuti, na mifumo iliyo tayari kutumika.'
  },
  {
    id: 'live-meetings',
    title: 'Live Meetings',
    shortDescription: 'Join live sessions like Vibe Coding. Learn in real time with the host, ask questions, and book your seat inside the app.',
    fullDescription: 'Experience collaborative real-time learning. Attend weekly "Vibe Coding" live streams, ask questions during interactive Q&As, review real projects with mentors, and easily reserve your seat directly inside the web app.',
    icon: 'Radio',
    badge: 'Live Interactive Sessions',
    points: [
      'Weekly live "Vibe Coding" sessions and live build challenges',
      'Real-time Q&A with experienced lead tech instructors',
      'Live code reviews and portfolio critique clinics',
      '1-click seat booking with calendar reminders inside the platform'
    ],
    swahiliNote: 'Mikutano ya moja kwa moja (Live Sessions) kujifunza pamoja na kuuliza maswali.'
  },
  {
    id: 'invite-and-earn',
    title: 'Invite and Earn',
    shortDescription: 'Share your referral code with friends. Unlock shop items, lifetime access, and earn 3,000 Tsh cash per friend.',
    fullDescription: 'Share your personal referral code with friends. Invite 1 friend to open 1 digital product, 5 friends to unlock the entire digital shop, 10 friends for full Lifetime Access, then earn 3,000 Tsh cash directly via mobile money for every friend after that once they join Premium.',
    icon: 'Gift',
    badge: 'Cash Rewards & Unlocks',
    points: [
      '1 Friend: Unlock 1 Premium Digital Product from the shop',
      '5 Friends: Unlock the ENTIRE Digital Shop library forever',
      '10 Friends: Get 100% FREE Lifetime Access to all courses',
      '11+ Friends: Earn 3,000 Tsh cash reward per friend paid via Mobile Money'
    ],
    swahiliNote: 'Alika marafiki: fungua bidhaa, pata uanachama wa maisha, na jipatie 3,000 Tsh taslimu!'
  },
  {
    id: 'mentor-support',
    title: 'Mentor Support',
    shortDescription: 'Get practical guidance from instructors and teaching assistants throughout your learning journey.',
    fullDescription: 'Ask focused questions, share your work, and receive guidance that helps you move past real blockers. Support is available through agreed WhatsApp groups, live sessions, and programme check-ins.',
    icon: 'Users',
    badge: 'Human Guidance',
    points: ['Instructor and teaching assistant guidance', 'Practical feedback on exercises and projects', 'Clear escalation for difficult blockers', 'Support designed for beginner confidence'],
    swahiliNote: 'Pata mwongozo wa vitendo kutoka kwa wakufunzi na wasaidizi wa masomo.'
  },
  {
    id: 'low-bandwidth-learning',
    title: 'Low-Bandwidth Learning',
    shortDescription: 'Practical materials and delivery options designed for real East African connectivity.',
    fullDescription: 'Choose learning formats that work with your connection, device, and schedule. We prioritize lightweight resources, clear downloads, and communication channels that keep learning accessible.',
    icon: 'Video',
    badge: 'Mobile Ready',
    points: ['Lightweight reading and audio resources', 'Mobile-friendly lesson materials', 'Flexible WhatsApp learning options', 'Downloadable references for later use'],
    swahiliNote: 'Jifunze kwa kutumia data kidogo na kifaa ulicho nacho.'
  },
  {
    id: 'project-briefs',
    title: 'Real-World Project Briefs',
    shortDescription: 'Turn every major concept into a useful deliverable for work, study, or business.',
    fullDescription: 'Project briefs connect lessons to real outcomes. Build a portfolio of useful work while learning how to define a problem, choose an approach, and explain your result.',
    icon: 'CheckSquare',
    badge: 'Portfolio Building',
    points: ['Projects grounded in African use cases', 'Clear briefs and completion criteria', 'Practical review checkpoints', 'Evidence you can discuss with employers or clients'],
    swahiliNote: 'Jenga miradi halisi inayoweza kuonekana kwenye portfolio yako.'
  },
  {
    id: 'cohort-community',
    title: 'Cohort Community',
    shortDescription: 'Learn with peers through focused group discussion and shared progress.',
    fullDescription: 'Cohort learning creates momentum and accountability. Meet people working on similar goals, exchange practical ideas, and learn in a community that understands the regional context.',
    icon: 'Users',
    badge: 'Peer Learning',
    points: ['Focused cohort discussion groups', 'Peer examples and accountability', 'Shared Q&A and learning prompts', 'East African professional context'],
    swahiliNote: 'Jifunze pamoja na jamii ya wanafunzi kutoka Afrika Mashariki.'
  },
  {
    id: 'corporate-customization',
    title: 'Custom Team Programmes',
    shortDescription: 'Adapt workshops and briefings to your organization’s people, tools, and priorities.',
    fullDescription: 'Organizations can request a focused programme shaped around their workflow, risk profile, team level, and desired outcomes. We help turn a broad need into a practical training plan.',
    icon: 'Building2',
    badge: 'For Organizations',
    points: ['Needs discovery and programme scoping', 'Role-specific examples and exercises', 'Flexible online or on-site delivery', 'Outcome-focused recommendations'],
    swahiliNote: 'Pata mafunzo yanayolingana na mahitaji ya timu na taasisi yako.'
  },
  {
    id: 'bilingual-teaching',
    title: 'Bilingual Teaching',
    shortDescription: 'Understand complex technology in clear Kiswahili with the English terms used at work.',
    fullDescription: 'Our language approach makes advanced ideas easier to grasp without isolating learners from global technology practice. Key terms are explained in context and connected to practical use.',
    icon: 'Sparkles',
    badge: 'Kiswahili First',
    points: ['Clear Kiswahili explanations', 'English industry vocabulary in context', 'Examples adapted for local audiences', 'Better confidence asking technical questions'],
    swahiliNote: 'Elewa teknolojia kwa Kiswahili huku ukijenga istilahi za kazi kwa Kiingereza.'
  },
  {
    id: 'career-pathways',
    title: 'Career Pathways',
    shortDescription: 'Move from curiosity to a focused next step with practical skills and evidence of work.',
    fullDescription: 'Each learning path helps you identify what to learn next, what to build, and how to communicate your new capability to an employer, client, school, or organization.',
    icon: 'Award',
    badge: 'Outcome Focused',
    points: ['Beginner-to-professional pathways', 'Portfolio and CV guidance', 'Skills mapped to real roles', 'Practical next-step recommendations'],
    swahiliNote: 'Jenga njia ya kazi kwa ujuzi na ushahidi wa kazi uliofanya.'
  },
  {
    id: 'safe-ai-practice',
    title: 'Safe AI Practice',
    shortDescription: 'Use AI productively while protecting privacy, accuracy, people, and organizational trust.',
    fullDescription: 'Every AI learning path includes verification, privacy, and responsible-use habits so learners can apply tools with judgment instead of blindly trusting generated output.',
    icon: 'ShieldCheck',
    badge: 'Responsible AI',
    points: ['Privacy-aware prompting habits', 'Verification before sharing or acting', 'Human review in important workflows', 'Practical AI safety guidance'],
    swahiliNote: 'Tumia AI kwa tija huku ukilinda faragha, usahihi na uaminifu.'
  },
  {
    id: 'learning-roadmaps',
    title: 'Learning Roadmaps',
    shortDescription: 'See the sequence of skills, practice, and projects needed for your chosen goal.',
    fullDescription: 'A clear roadmap reduces overwhelm. We help learners connect foundational ideas to the next practical skill and a project that proves progress.',
    icon: 'Layers',
    badge: 'Clear Direction',
    points: ['Structured skill progression', 'Recommended practice milestones', 'Project checkpoints', 'Guidance for choosing the next module'],
    swahiliNote: 'Fuata mpangilio wazi wa ujuzi, mazoezi na miradi.'
  },
  {
    id: 'workshop-outcomes',
    title: 'Workshop Outcomes',
    shortDescription: 'Leave every engagement with a clearer plan, stronger capability, and something useful to apply.',
    fullDescription: 'Our workshops are designed around decisions and deliverables. Before delivery, we clarify what participants should be able to do and how teams will apply the learning afterward.',
    icon: 'CheckSquare',
    badge: 'Actionable Results',
    points: ['Defined outcomes before delivery', 'Exercises tied to participant roles', 'Practical take-home resources', 'Post-session action planning'],
    swahiliNote: 'Maliza warsha ukiwa na mpango na matokeo ya kutumia mara moja.'
  }
];

export const inviteTiers = [
  {
    invites: '1 Friend',
    title: 'Unlock 1 Product',
    reward: 'Unlock 1 premium digital ebook or template from the Digital Shop.',
    statusBadge: 'Tier 1'
  },
  {
    invites: '5 Friends',
    title: 'Unlock Entire Shop',
    reward: 'Get complete, permanent access to every item in the Digital Shop.',
    statusBadge: 'Tier 2'
  },
  {
    invites: '10 Friends',
    title: 'Lifetime Premium Access',
    reward: '100% Free Lifetime Premium membership across all courses & future updates.',
    statusBadge: 'Tier 3 (VIP)'
  },
  {
    invites: '11+ Friends',
    title: '3,000 TSH Cash Payout',
    reward: 'Earn 3,000 Tsh cash per friend directly paid out to your M-Pesa / Tigo Pesa!',
    statusBadge: 'Cash Machine'
  }
];
