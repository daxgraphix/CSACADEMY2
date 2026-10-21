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
    note: 'Practice exercises and assessments to test your understanding and reinforce your skills.'
  },
  {
    id: 'pdf-certificates',
    title: 'PDF Certificates',
    shortDescription: 'Certificate availability and requirements depend on the course.',
    fullDescription: 'Some courses may offer a certificate of completion. Confirm its availability, completion requirements, and format with CS Academy before enrolling.',
    icon: 'Award',
    badge: 'Course dependent',
    points: [
      'Certificate type depends on the course',
      'Completion requirements are shared with course details',
      'Ask us what documentation is available before enrolling'
    ],
    note: 'Availability and format should be confirmed for your selected course.'
  },
  {
    id: 'digital-shop',
    title: 'Digital Shop',
    shortDescription: 'Explore downloadable learning resources where available.',
    fullDescription: 'Some courses include downloadable learning materials. Ask which files are available with your selected enrollment.',
    icon: 'ShoppingBag',
    badge: 'Course materials',
    points: [
      'Course related reference materials where provided',
      'Availability depends on the course and enrollment plan'
    ],
    note: 'Ask which downloadable materials are included before enrolling.'
  },
  {
    id: 'live-meetings',
    title: 'Live Meetings',
    shortDescription: 'Some plans include scheduled live online instruction and time for questions.',
    fullDescription: 'Live session schedules and activities are confirmed for each cohort. Contact us to check what is included with your selected plan.',
    icon: 'Radio',
    badge: 'Live Interactive Sessions',
    points: [
      'Scheduled sessions where included in the selected plan',
      'Question time during confirmed sessions',
      'Guided practice based on the course',
      'Session access details shared after enrollment is confirmed'
    ],
    note: 'Real-time live sessions to learn together and ask questions.'
  },
  {
    id: 'invite-and-earn',
    title: 'Invite and Unlock',
    shortDescription: 'Ask CS Academy whether a referral offer is currently available.',
    fullDescription: 'Referral offers, if available, depend on current terms. Confirm eligibility and any reward with CS Academy before sharing or relying on an offer.',
    icon: 'Gift',
    badge: 'Referral Unlocks',
    points: [
      'Check with CS Academy for current referral terms',
      'Eligibility and any reward must be confirmed before participation'
    ],
    note: 'Referral requirements and rewards are subject to the current terms in your learner account.'
  },
  {
    id: 'mentor-support',
    title: 'Mentor Support',
    shortDescription: 'Instructor guidance may be available depending on your course and plan.',
    fullDescription: 'Ask us whether your selected course includes instructor questions, group support, or feedback on exercises.',
    icon: 'Users',
    badge: 'Human Guidance',
    points: ['Support options vary by course and plan', 'Confirm included feedback and response channels before enrolling'],
    note: 'Ask what support is included with your selected course.'
  },
  {
    id: 'low-bandwidth-learning',
    title: 'Low-Bandwidth Learning',
    shortDescription: 'Ask about delivery formats that fit your device and connection.',
    fullDescription: 'Connection requirements vary by course. Ask about available text, audio, download, WhatsApp, or live options before enrolling.',
    icon: 'Video',
    badge: 'Mobile Ready',
    points: ['Some courses offer mobile-friendly materials', 'Download availability varies', 'Live video requires a reliable connection'],
    note: 'Confirm data and device requirements for your selected course.'
  },
  {
    id: 'project-briefs',
    title: 'Real-World Project Briefs',
    shortDescription: 'Turn every major concept into a useful deliverable for work, study, or business.',
    fullDescription: 'Project briefs connect lessons to real outcomes. Build a portfolio of useful work while learning how to define a problem, choose an approach, and explain your result.',
    icon: 'CheckSquare',
    badge: 'Portfolio Building',
    points: ['Projects grounded in African use cases', 'Clear briefs and completion criteria', 'Practical review checkpoints', 'Evidence you can discuss with employers or clients'],
    note: 'Build real projects that are visible in your portfolio.'
  },
  {
    id: 'cohort-community',
    title: 'Cohort Community',
    shortDescription: 'Learn with peers through focused group discussion and shared progress.',
    fullDescription: 'Cohort learning creates momentum and accountability. Meet people working on similar goals, exchange practical ideas, and learn in a community that understands the regional context.',
    icon: 'Users',
    badge: 'Peer Learning',
    points: ['Focused cohort discussion groups', 'Peer examples and accountability', 'Shared Q&A and learning prompts', 'East African professional context'],
    note: 'Learn together with a community of students from across East Africa.'
  },
  {
    id: 'corporate-customization',
    title: 'Custom Team Programmes',
    shortDescription: 'Adapt workshops and briefings to your organization’s people, tools, and priorities.',
    fullDescription: 'Organizations can request a focused programme shaped around their workflow, risk profile, team level, and desired outcomes. We help turn a broad need into a practical training plan.',
    icon: 'Building2',
    badge: 'For Organizations',
    points: ['Needs discovery and programme scoping', 'Role-specific examples and exercises', 'Flexible online or on-site delivery', 'Outcome-focused recommendations'],
    note: 'Get customized training that matches your team and organization needs.'
  },
  {
    id: 'bilingual-teaching',
    title: 'Clear, Practical Teaching',
    shortDescription: 'Understand complex technology through clear English explanations and practical examples.',
    fullDescription: 'Our language approach makes advanced ideas easier to grasp without isolating learners from global technology practice. Key terms are explained in context and connected to practical use.',
    icon: 'Sparkles',
    badge: 'English-language instruction',
    points: ['Clear English explanations', 'Industry vocabulary in context', 'Examples adapted for East African audiences', 'Guided practice and learner questions'],
    note: 'Build practical technology skills through clear explanations and guided practice.'
  },
  {
    id: 'career-pathways',
    title: 'Career Pathways',
    shortDescription: 'Move from curiosity to a focused next step with practical skills and evidence of work.',
    fullDescription: 'Each learning path helps you identify what to learn next, what to build, and how to communicate your new capability to an employer, client, school, or organization.',
    icon: 'Award',
    badge: 'Outcome Focused',
    points: ['Beginner-to-professional pathways', 'Portfolio and CV guidance', 'Skills mapped to real roles', 'Practical next-step recommendations'],
    note: 'Build career pathways with demonstrated skills and completed work.'
  },
  {
    id: 'safe-ai-practice',
    title: 'Safe AI Practice',
    shortDescription: 'Use AI productively while protecting privacy, accuracy, people, and organizational trust.',
    fullDescription: 'Every AI learning path includes verification, privacy, and responsible-use habits so learners can apply tools with judgment instead of blindly trusting generated output.',
    icon: 'ShieldCheck',
    badge: 'Responsible AI',
    points: ['Privacy-aware prompting habits', 'Verification before sharing or acting', 'Human review in important workflows', 'Practical AI safety guidance'],
    note: 'Use AI productively while protecting privacy, accuracy, people, and trust.'
  },
  {
    id: 'learning-roadmaps',
    title: 'Learning Roadmaps',
    shortDescription: 'See the sequence of skills, practice, and projects needed for your chosen goal.',
    fullDescription: 'A clear roadmap reduces overwhelm. We help learners connect foundational ideas to the next practical skill and a project that proves progress.',
    icon: 'Layers',
    badge: 'Clear Direction',
    points: ['Structured skill progression', 'Recommended practice milestones', 'Project checkpoints', 'Guidance for choosing the next module'],
    note: 'Follow a clear progression of skills, practice, and projects.'
  },
  {
    id: 'workshop-outcomes',
    title: 'Workshop Outcomes',
    shortDescription: 'Leave every engagement with a clearer plan, stronger capability, and something useful to apply.',
    fullDescription: 'Our workshops are designed around decisions and deliverables. Before delivery, we clarify what participants should be able to do and how teams will apply the learning afterward.',
    icon: 'CheckSquare',
    badge: 'Actionable Results',
    points: ['Defined outcomes before delivery', 'Exercises tied to participant roles', 'Practical take-home resources', 'Post-session action planning'],
    note: 'Complete workshops with a clear plan and immediately applicable outcomes.'
  }
];

export const inviteTiers = [
  {
    invites: 'Referral programme',
    title: 'Check Current Terms',
    reward: 'See current referral requirements and eligible rewards in your learner account.',
    statusBadge: 'Terms apply'
  }
];
