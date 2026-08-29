import { ResourceItem } from '../types';

export const resourcesData: ResourceItem[] = [
  {
    id: 'ai-prompt-starter-pack',
    title: 'AI Prompt Starter Pack',
    category: 'AI Productivity',
    format: 'Cheat Sheet',
    description: 'A curated collection of 50+ tested, high-yield prompt templates for daily writing, research synthesis, email responses, and brainstorming.',
    readingTime: '5 min read',
    level: 'Beginner',
    targetAudience: 'Students, professionals, writers & team leads',
    keyHighlights: [
      'Role-Context-Task-Constraint prompt blueprint',
      'Templates for executive summaries & reports',
      'Bilingual prompts for English & Kiswahili translations',
      'Iterative refinement cheat sheet'
    ],
    useCases: [
      'Drafting polished client emails in under a minute',
      'Summarizing long reports into clear action points',
      'Brainstorming campaign or lesson ideas',
      'Translating technical English into plain Kiswahili'
    ],
    previewContent: [
      'Prompt Pattern 1: The Executive Synthesizer - "Act as an executive chief of staff. Review the following notes and extract 3 key decisions, 5 action items with owners, and 2 open risks..."',
      'Prompt Pattern 2: Socratic Problem Solver - "Act as a senior business consultant. Ask me 3 probing questions about my project before suggesting a strategy..."',
      'Prompt Pattern 3: Kiswahili-English Cultural Bridge - "Translate the following technical English concept into natural, conversational Kiswahili suitable for a general audience..."'
    ],
    downloadName: 'CS_Academy_AI_Prompt_Starter_Pack.pdf'
  },
  {
    id: 'deepfake-awareness-guide',
    title: 'Deepfake Awareness Guide',
    category: 'Cyber Safety',
    format: 'PDF Guide',
    description: 'An essential field guide on identifying synthetic voice clones, manipulated facial videos, and social engineering scams targeting mobile money and personal security.',
    readingTime: '8 min read',
    level: 'Intermediate',
    targetAudience: 'General public, families, media professionals, corporate staff',
    keyHighlights: [
      '10 optical flaws common in generated video deepfakes',
      'How to spot audio/voice clone artifacts during phone calls',
      'Establishing a family & team financial verbal verification protocol',
      'Immediate steps to take if your likeness is used without consent'
    ],
    useCases: [
      'Training staff to recognize voice-clone fraud',
      'Protecting family remittance and mobile-money transfers',
      'Building a media-literacy workshop for communities',
      'Responding to a suspected impersonation incident'
    ],
    previewContent: [
      'Section 1: The New Wave of Voice Cloning - Modern AI needs only 3 seconds of sample audio to mimic a voice. Learn why urgent calls demanding immediate mobile money transfers should always be verified.',
      'Section 2: The Two-Way Verification Rule - Never execute an unusual fund transfer or password reset without a secondary out-of-band communication check.'
    ],
    downloadName: 'CS_Academy_Deepfake_Awareness_Guide.pdf'
  },
  {
    id: 'cyber-hygiene-checklist',
    title: 'Cyber Hygiene Checklist',
    category: 'Cybersecurity',
    format: 'Checklist',
    description: 'A comprehensive 20-point digital security checklist to audit your smartphones, laptops, email accounts, and online financial transactions.',
    readingTime: '4 min read',
    level: 'Beginner',
    targetAudience: 'Everyone using smartphones, laptops, and internet banking',
    keyHighlights: [
      'Passkey and password manager setup in 10 minutes',
      'Multi-factor authentication (MFA) verification',
      'App permissions & location tracking audit',
      'Public Wi-Fi and VPN defensive practices'
    ],
    useCases: [
      'Running a personal monthly security audit',
      'Onboarding new employees to safe device habits',
      'Preparing devices before travel or public Wi-Fi use',
      'Teaching family members basic online safety'
    ],
    previewContent: [
      '[ ] Enable MFA on primary Google/Microsoft, WhatsApp, and banking portals.',
      '[ ] Disable automatic Bluetooth and Wi-Fi connection in public spaces.',
      '[ ] Audit third-party app permissions connected to your Google/Apple accounts.',
      '[ ] Activate remote device wiping for lost smartphones and laptops.'
    ],
    downloadName: 'CS_Academy_Cyber_Hygiene_Checklist.pdf'
  },
  {
    id: 'ai-tools-for-students',
    title: 'AI Tools for Students Guide',
    category: 'Education',
    format: 'PDF Guide',
    description: 'How to ethically and effectively use artificial intelligence for academic research, concept revision, foreign language practice, and exam preparation.',
    readingTime: '6 min read',
    level: 'Beginner',
    targetAudience: 'High school & university students, academic tutors',
    keyHighlights: [
      'Using AI as an interactive 24/7 tutor rather than an answer cheat',
      'Generating custom practice quizzes and flashcard decks',
      'Proper citation and transparency in academic writing',
      'Avoiding hallucinations in academic research papers'
    ],
    useCases: [
      'Creating personalized revision quizzes',
      'Explaining difficult concepts at your level',
      'Drafting study plans for exams',
      'Practicing a foreign language through dialogue'
    ],
    previewContent: [
      'Principle 1: Active Ingestion vs Passive Copying - Ask the AI to test your understanding through quizzes rather than asking it to write your homework.',
      'Principle 2: Source Verification - Always verify textbook citations and primary source documents.'
    ],
    downloadName: 'CS_Academy_AI_Tools_For_Students.pdf'
  },
  {
    id: 'ai-safety-checklist',
    title: 'AI Safety Checklist for Workplaces',
    category: 'AI Governance',
    format: 'Checklist',
    description: 'A practical framework for employees and managers to safely use public and enterprise AI tools without leaking confidential customer or company data.',
    readingTime: '5 min read',
    level: 'Intermediate',
    targetAudience: 'Business owners, HR managers, operational staff, IT teams',
    keyHighlights: [
      'Identifying restricted vs public data tiers for AI prompts',
      'Turning off model training data collection in settings',
      'Reviewing terms of service for generative web apps',
      'Drafting a one-page internal acceptable use policy'
    ],
    useCases: [
      'Creating an internal AI acceptable-use policy',
      'Briefing teams before adopting ChatGPT/Claude/Copilot',
      'Classifying data before pasting into public tools',
      'Auditing existing AI tool integrations'
    ],
    previewContent: [
      '[ ] Redact all customer names, phone numbers, and financial figures before pasting text into public AI tools.',
      '[ ] Review "Data Controls" settings to opt out of model training on user queries.',
      '[ ] Mandate human-in-the-loop review for all external customer communications.'
    ],
    downloadName: 'CS_Academy_AI_Safety_Checklist.pdf'
  },
  {
    id: 'digital-privacy-checklist',
    title: 'Digital Privacy Checklist',
    category: 'Privacy',
    format: 'Checklist',
    description: 'Step-by-step instructions to minimize digital tracking, audit your social media privacy settings, and protect personal communication channels.',
    readingTime: '4 min read',
    level: 'Beginner',
    targetAudience: 'Digital citizens, journalists, professionals, youth',
    keyHighlights: [
      'WhatsApp privacy & two-step verification settings',
      'Browser privacy extensions and cookie management',
      'Social media profile lockdown & search visibility',
      'Encrypted messaging standards'
    ],
    useCases: [
      'Locking down personal social media profiles',
      'Enabling two-step verification on messaging apps',
      'Reducing ad tracking in browsers',
      'Protecting sources as a journalist or researcher'
    ],
    previewContent: [
      '[ ] Set WhatsApp "Last Seen", "Profile Photo", and "About" to My Contacts only.',
      '[ ] Enable WhatsApp 6-digit two-step verification PIN.',
      '[ ] Check search engine results for your full name and remove exposed telephone records.'
    ],
    downloadName: 'CS_Academy_Digital_Privacy_Checklist.pdf'
  },
  {
    id: 'ai-for-educators-guide',
    title: 'AI for Educators Guide',
    category: 'Education',
    format: 'PDF Guide',
    description: 'Practical strategies for African teachers and lecturers to save preparation time, design engaging lesson plans, and foster critical thinking.',
    readingTime: '7 min read',
    level: 'Intermediate',
    targetAudience: 'Teachers, lecturers, school administrators, tutors',
    keyHighlights: [
      'Prompt templates for differentiated learning plans',
      'Creating interactive classroom discussion prompts',
      'Managing academic integrity constructively',
      'Local language learning aids for bilingual classrooms'
    ],
    useCases: [
      'Generating differentiated lesson materials',
      'Designing classroom debate and discussion prompts',
      'Explaining concepts at multiple reading levels',
      'Building a fair AI-use policy for assignments'
    ],
    previewContent: [
      'Module 1: Reclaiming Teaching Time - Automate routine rubric drafting and formatting so you can dedicate more energy to 1-on-1 student mentorship.',
      'Module 2: Differentiated Pedagogy - Prompting AI to explain complex concepts at 3 different reading levels for diverse student cohorts.'
    ],
    downloadName: 'CS_Academy_AI_For_Educators_Guide.pdf'
  },
  {
    id: 'ai-productivity-starter-guide',
    title: 'AI Productivity Starter Guide',
    category: 'AI Productivity',
    format: 'Toolkit',
    description: 'A foundational handbook for busy professionals to integrate AI into daily email management, document drafting, scheduling, and market research.',
    readingTime: '6 min read',
    level: 'Beginner',
    targetAudience: 'Entrepreneurs, corporate staff, consultants, managers',
    keyHighlights: [
      'Daily 15-minute AI productivity routine',
      'Email drafting & tone calibration shortcuts',
      'Spreadsheet formula generation cheat codes',
      'Meeting transcript summarization framework'
    ],
    useCases: [
      'Clearing a backlog of emails quickly',
      'Drafting proposals with consistent tone',
      'Generating spreadsheet formulas without errors',
      'Summarizing meeting recordings into minutes'
    ],
    previewContent: [
      'Strategy 1: The Context Pyramid - How to feed AI the right background context in 3 short bullet points.',
      'Strategy 2: The Fast Edit Workflow - Use AI for raw drafting, apply human polish for tone and truth.'
    ],
    downloadName: 'CS_Academy_AI_Productivity_Starter_Guide.pdf'
  },
  {
    id: 'mpesa-business-safety',
    title: 'M-Pesa & Mobile Money Business Safety',
    category: 'Business',
    format: 'PDF Guide',
    description: 'A practical guide for SMEs and business owners to protect mobile-money collections, reconcile payments, and avoid sim-swap and fraud losses.',
    readingTime: '6 min read',
    level: 'Beginner',
    targetAudience: 'Small business owners, shopkeepers, finance clerks',
    keyHighlights: [
      'Securing the business paybill & till number',
      'Daily reconciliation of M-Pesa vs sales records',
      'Recognizing sim-swap and callback fraud',
      'Staff handling money transfer safely'
    ],
    useCases: [
      'Training cashiers on safe M-Pesa handling',
      'Building a daily payment reconciliation habit',
      'Responding to suspicious balance alerts',
      'Protecting the business till number from hijack'
    ],
    previewContent: [
      'Checklist: Register a dedicated business line, enable transaction SMS alerts, and limit who holds the SIM and PIN.',
      'Rule: Never share the M-Pesa PIN, even with staff or "bank" callers requesting verification.'
    ],
    downloadName: 'CS_Academy_Mpesa_Business_Safety.pdf'
  },
  {
    id: 'remote-work-security',
    title: 'Remote & Hybrid Work Security Checklist',
    category: 'Cybersecurity',
    format: 'Checklist',
    description: 'Harden laptops, home networks, and cloud accounts for employees working outside the office, without expensive enterprise tools.',
    readingTime: '5 min read',
    level: 'Intermediate',
    targetAudience: 'Remote staff, team leads, IT support',
    keyHighlights: [
      'Home Wi-Fi and router hardening steps',
      'VPN and zero-trust access basics',
      'Separating work and personal devices',
      'Secure file sharing and backup routines'
    ],
    useCases: [
      'Setting up a safe home office',
      'Onboarding remote contractors securely',
      'Auditing shared cloud folders',
      'Backing up work data automatically'
    ],
    previewContent: [
      '[ ] Change the default router admin password and update firmware.',
      '[ ] Use a company VPN or secured channel for internal systems.',
      '[ ] Enable automatic encrypted backups for work devices.'
    ],
    downloadName: 'CS_Academy_Remote_Work_Security.pdf'
  },
  {
    id: 'ai-presentation-toolkit',
    title: 'AI Presentation & Content Toolkit',
    category: 'AI Productivity',
    format: 'Toolkit',
    description: 'Prompt packs and templates to design clear slides, social media posts, and marketing copy with a consistent brand voice.',
    readingTime: '6 min read',
    level: 'Beginner',
    targetAudience: 'Marketers, founders, students, trainers',
    keyHighlights: [
      'Slide outline generators for any topic',
      'Brand-voice social post templates',
      'Storytelling frameworks for pitches',
      'Localized Kiswahili copy prompts'
    ],
    useCases: [
      'Building a pitch deck in an afternoon',
      'Producing a month of social posts',
      'Turning a report into a visual story',
      'Writing consistent multilingual copy'
    ],
    previewContent: [
      'Prompt: "Create a 10-slide outline for a fintech pitch to East African investors, with a clear problem, solution, and traction slide."',
      'Prompt: "Write 5 Instagram captions in Kiswahili for a tailoring business, friendly tone, with a call to action to DM for orders."'
    ],
    downloadName: 'CS_Academy_AI_Presentation_Toolkit.pdf'
  },
  {
    id: 'data-privacy-ngos',
    title: 'Data Privacy for NGOs & Field Teams',
    category: 'Privacy',
    format: 'PDF Guide',
    description: 'A field-friendly guide for non-profits handling beneficiary data, donor records, and sensitive community information responsibly.',
    readingTime: '7 min read',
    level: 'Intermediate',
    targetAudience: 'NGO staff, field officers, grant managers',
    keyHighlights: [
      'Collecting only necessary beneficiary data',
      'Consent and anonymization practices',
      'Secure sharing with donors and partners',
      'Offline-first data collection safety'
    ],
    useCases: [
      'Designing a consent form for surveys',
      'Anonymizing case studies for reports',
      'Briefing field officers on data care',
      'Sharing monitoring data with donors safely'
    ],
    previewContent: [
      'Principle: Collect the minimum data needed for the program outcome, and store it separately from identifiers.',
      'Practice: Use coded IDs instead of names when sharing progress data externally.'
    ],
    downloadName: 'CS_Academy_Data_Privacy_NGOs.pdf'
  },
  {
    id: 'ai-research-synthesis-guide',
    title: 'AI Research & Synthesis Guide',
    category: 'AI Productivity',
    format: 'PDF Guide',
    description: 'A research-driven playbook that turns AI into a reliable research analyst — covering source triangulation, multi-document synthesis, citation hygiene, and verification of AI-generated claims.',
    readingTime: '9 min read',
    level: 'Intermediate',
    targetAudience: 'Researchers, consultants, journalists, policy analysts, graduate students',
    keyHighlights: [
      'The Source-Then-Synthesize prompt pattern',
      'Multi-document comparison and contradiction detection',
      'Citation formatting and hallucination control',
      'Fact-verification checklist for AI output'
    ],
    useCases: [
      'Synthesizing 20+ articles into a one-page brief',
      'Comparing regional policy positions across countries',
      'Building a literature review for a thesis chapter',
      'Drafting a competitive landscape memo'
    ],
    previewContent: [
      'Pattern 1: Source-Then-Synthesize — "Read the following 5 articles. Identify 3 points of consensus, 2 areas of disagreement, and 1 open research question. Cite the source article for each claim."',
      'Pattern 2: The Devil\'s Advocate — "Review my draft report. Identify 3 factual claims that lack sources, 2 logical weaknesses, and 1 missing counter-argument."',
      'Verification Rule: Any statistic, date, or quoted phrase produced by AI must be traced back to a primary source before publication.'
    ],
    downloadName: 'CS_Academy_AI_Research_Synthesis_Guide.pdf'
  },
  {
    id: 'social-media-scam-protection',
    title: 'Social Media Scam Protection Guide',
    category: 'Cyber Safety',
    format: 'PDF Guide',
    description: 'Identify, avoid, and recover from the most common social media scams on Facebook, Instagram, WhatsApp, TikTok, and X — including romance fraud, investment pyramids, fake giveaways, and impersonation.',
    readingTime: '8 min read',
    level: 'Beginner',
    targetAudience: 'Social media users, parents, online sellers, community managers',
    keyHighlights: [
      'Red flags of romance and friendship fraud',
      'Spotting crypto and "doubler" investment scams',
      'How to report impersonation and fake pages',
      'Recovery steps after sending money to a scammer'
    ],
    useCases: [
      'Verifying a suspicious DM or friend request',
      'Reporting a fake page impersonating your business',
      'Briefing teens on TikTok and Snapchat scams',
      'Responding to a crypto investment pitch from a contact'
    ],
    previewContent: [
      'Red Flag 1: Urgency + Secrecy — "This opportunity is only for you, don\'t tell anyone, act in the next hour." Treat as immediate fraud signal.',
      'Red Flag 2: Off-Platform Move — A new contact insisting you move to WhatsApp/Telegram within 24 hours is a classic social-engineering pattern.',
      'Recovery Step: Within 2 hours, contact your mobile money provider to attempt a reversal, file a police report, and screenshot every message thread as evidence.'
    ],
    downloadName: 'CS_Academy_Social_Media_Scam_Protection.pdf'
  },
  {
    id: 'child-online-safety-guide',
    title: 'Child Online Safety Guide',
    category: 'Cyber Safety',
    format: 'PDF Guide',
    description: 'A practical handbook for parents, guardians, and teachers to protect children from online predators, cyberbullying, inappropriate content, and excessive screen exposure.',
    readingTime: '9 min read',
    level: 'Beginner',
    targetAudience: 'Parents, guardians, primary & secondary school teachers',
    keyHighlights: [
      'Age-appropriate device and app boundaries',
      'Spotting grooming, sextortion, and cyberbullying',
      'Parental controls on Android, iOS, and major platforms',
      'How to have a non-confrontational safety conversation'
    ],
    useCases: [
      'Setting up a first smartphone for a 10–14 year old',
      'Responding to a child who received an explicit message',
      'Configuring YouTube, TikTok, and Roblox safely',
      'Creating a family screen-time agreement'
    ],
    previewContent: [
      'Conversation Script: "I want you to have fun online AND be safe. If anyone ever asks you to keep a message secret from me, that is exactly the kind of message I need to know about."',
      'Setup Step: Enable Screen Time (iOS) or Family Link (Android), restrict app downloads to age 12+, and require approval for in-app purchases.',
      'Escalation Rule: Any request for photos, personal meeting, or secrecy from an online contact must be reported to a trusted adult immediately — no child gets in trouble for telling.'
    ],
    downloadName: 'CS_Academy_Child_Online_Safety_Guide.pdf'
  },
  {
    id: 'digital-footprint-cleanup',
    title: 'Digital Footprint Cleanup Guide',
    category: 'Cyber Safety',
    format: 'Checklist',
    description: 'A step-by-step cleanup operation to remove old accounts, personal data from data brokers, leaked credentials, and unwanted search engine results tied to your name.',
    readingTime: '6 min read',
    level: 'Intermediate',
    targetAudience: 'Job seekers, professionals, survivors of harassment, public figures',
    keyHighlights: [
      'Inventory of 30+ data broker opt-out links',
      'Removing personal info from Google search results',
      'Closing dormant accounts and old email addresses',
      'Monitoring future exposure with free tools'
    ],
    useCases: [
      'Cleaning up search results before a job search',
      'Reducing exposure after a data breach notification',
      'Removing home address from people-finder sites',
      'Closing a decade of forgotten social accounts'
    ],
    previewContent: [
      'Step 1: Run a full audit — Search your name, phone number, and home address in quotes on Google. Screenshot every result and categorize as "remove", "contact site", or "monitor".',
      'Step 2: Submit opt-out requests to major data brokers (Spokeo, Whitepages, TrueCaller, PeopleFinder) using the standard request form; allow 7–30 days for processing.',
      'Step 3: File a Google "Results about you" removal request for any result exposing personal contact details, ID numbers, or financial information.'
    ],
    downloadName: 'CS_Academy_Digital_Footprint_Cleanup.pdf'
  },
  {
    id: 'small-business-security-audit',
    title: 'Small Business Security Audit',
    category: 'Cybersecurity',
    format: 'Checklist',
    description: 'A 40-point audit checklist designed for small business owners to assess the security of their point-of-sale, cloud accounts, employee devices, and supplier relationships.',
    readingTime: '7 min read',
    level: 'Intermediate',
    targetAudience: 'SME owners, operations managers, finance teams, retail shopkeepers',
    keyHighlights: [
      'Email and admin account hardening review',
      'Supplier and vendor access audit',
      'POS, inventory, and payment terminal checks',
      'Incident response readiness assessment'
    ],
    useCases: [
      'Running a quarterly security health check',
      'Preparing for a partner or bank compliance review',
      'Auditing access after an employee resignation',
      'Validating security before launching an e-commerce store'
    ],
    previewContent: [
      '[ ] Every business-critical account uses a unique 16+ character password stored in a shared team password manager.',
      '[ ] The business domain has SPF, DKIM, and DMARC records configured to prevent email impersonation of the CEO.',
      '[ ] A written incident response plan exists: who to call, what to disconnect, and how to communicate within the first 60 minutes of a breach.',
      '[ ] All supplier integrations use the principle of least privilege and are reviewed every 90 days.'
    ],
    downloadName: 'CS_Academy_Small_Business_Security_Audit.pdf'
  },
  {
    id: 'phishing-defense-drill',
    title: 'Phishing Defense Drill',
    category: 'Cybersecurity',
    format: 'Toolkit',
    description: 'A train-the-trainer toolkit with 12 realistic phishing email templates, red-flag analysis worksheets, and a 30-day team simulation playbook to build phishing resilience.',
    readingTime: '8 min read',
    level: 'Intermediate',
    targetAudience: 'IT managers, security trainers, team leads, HR & compliance officers',
    keyHighlights: [
      '12 annotated phishing email samples (CEO fraud, vendor invoice, job scam, package delivery)',
      'Red-flag analysis framework for any inbound message',
      '30-day rolling simulation calendar for teams',
      'Post-click containment checklist'
    ],
    useCases: [
      'Running a monthly phishing simulation for staff',
      'Training new employees during onboarding',
      'Preparing executives for targeted spear-phishing',
      'Measuring improvement in click and report rates'
    ],
    previewContent: [
      'Sample Phish 1: CEO Wire Transfer — "Are you at your desk? I need you to process a confidential wire of $48,500 to a new vendor today. Do not loop in finance yet, I will explain later. Sent from my personal email."',
      'Red Flag Analysis: Urgency + secrecy + out-of-band channel + request to bypass process = 4 out of 4 classic CEO-fraud signals.',
      'Drill Cadence: Week 1 — baseline simulation. Week 2 — team debrief. Week 3 — targeted executive phish. Week 4 — recognition competition with leaderboard.'
    ],
    downloadName: 'CS_Academy_Phishing_Defense_Drill.pdf'
  },
  {
    id: 'ai-literacy-curriculum',
    title: 'AI Literacy Curriculum',
    category: 'Education',
    format: 'Toolkit',
    description: 'A 6-module classroom-ready curriculum introducing secondary and early-university students to how AI works, its capabilities, limitations, and societal impact.',
    readingTime: '10 min read',
    level: 'Beginner',
    targetAudience: 'Secondary school teachers, university lecturers, club facilitators',
    keyHighlights: [
      '6 ready-to-teach 60-minute lesson plans',
      'Hands-on experiments with no-code AI tools',
      'Discussion prompts on bias, ethics, and misinformation',
      'Student assessment rubrics and project briefs'
    ],
    useCases: [
      'Teaching a one-term AI literacy elective',
      'Running a 3-day intensive AI awareness bootcamp',
      'Supplementing an existing computer studies syllabus',
      'Preparing students for AI-augmented workplaces'
    ],
    previewContent: [
      'Module 1: What Is AI? — Students train a simple image classifier in 10 minutes using Teachable Machine, then examine where it fails on unfamiliar faces.',
      'Module 2: How Language Models Work — Token-by-token walkthrough of how a chatbot predicts the next word, with a class-built "stochastic parrot" analogy.',
      'Capstone Project Brief: Identify a real problem in your school, prototype an AI-assisted solution, and present a one-page risk and ethics assessment alongside the demo.'
    ],
    downloadName: 'CS_Academy_AI_Literacy_Curriculum.pdf'
  },
  {
    id: 'stem-education-ai-tools',
    title: 'STEM Education AI Tools Guide',
    category: 'Education',
    format: 'PDF Guide',
    description: 'A curated catalog of the most effective AI tools for teaching and learning STEM subjects — math, physics, biology, chemistry, and coding — with subject-specific prompt packs.',
    readingTime: '8 min read',
    level: 'Intermediate',
    targetAudience: 'STEM teachers, school IT coordinators, curriculum designers',
    keyHighlights: [
      'Subject-by-subject AI tool comparison matrix',
      'Prompt packs for math problem solving and lab simulation',
      'Tools for visual learners: equation grapher, molecule viewer, circuit simulator',
      'Academic integrity guardrails for STEM homework'
    ],
    useCases: [
      'Replacing traditional homework with AI tutor sessions',
      'Generating differentiated practice questions by topic',
      'Visualizing abstract physics or chemistry concepts',
      'Introducing coding with AI pair programming partners'
    ],
    previewContent: [
      'Math Prompt: "Solve this quadratic step-by-step, then create 2 similar problems for me to try and check my work against the same method."',
      'Biology Prompt: "Explain photosynthesis at three levels — a 10-year-old, a high-schooler, and a first-year biology student — and use an analogy from cooking for each."',
      'Tool Tip: Use Wolfram Alpha for symbolic verification of any AI-generated math solution before trusting the answer.'
    ],
    downloadName: 'CS_Academy_STEM_Education_AI_Tools.pdf'
  },
  {
    id: 'corporate-ai-ethics-policy',
    title: 'Corporate AI Ethics Policy Template',
    category: 'AI Governance',
    format: 'PDF Guide',
    description: 'A board-ready, fill-in-the-blank AI ethics policy template covering fairness, transparency, accountability, human oversight, and grievance mechanisms for organizations adopting AI.',
    readingTime: '10 min read',
    level: 'Advanced',
    targetAudience: 'Boards, executive leadership, compliance officers, legal teams',
    keyHighlights: [
      '14-clause policy aligned with EU AI Act & NIST AI RMF',
      'Role-specific accountability matrix',
      'Bias testing and model monitoring requirements',
      'Whistleblower and grievance procedure template'
    ],
    useCases: [
      'Drafting a first AI policy for a mid-sized company',
      'Updating an existing policy to address generative AI',
      'Responding to partner or regulator AI questionnaires',
      'Aligning cross-departmental AI usage standards'
    ],
    previewContent: [
      'Clause 4: Human Oversight — "No AI system shall make final decisions affecting employment, credit, education access, or law enforcement without documented human review by an accountable officer."',
      'Clause 7: Transparency — "Any customer-facing AI interaction must disclose its AI nature within the first two conversational turns, in plain language."',
      'Clause 11: Bias Monitoring — "High-risk AI systems must be re-evaluated for disparate impact across protected groups at least every 12 months, with results reported to the audit committee."'
    ],
    downloadName: 'CS_Academy_Corporate_AI_Ethics_Policy.pdf'
  },
  {
    id: 'ai-procurement-checklist',
    title: 'AI Procurement Checklist',
    category: 'AI Governance',
    format: 'Checklist',
    description: 'A vendor-evaluation checklist to use when buying, licensing, or contracting AI tools — covering data rights, model transparency, security posture, and exit strategy.',
    readingTime: '7 min read',
    level: 'Intermediate',
    targetAudience: 'Procurement officers, CTOs, IT security, legal & compliance teams',
    keyHighlights: [
      '40+ due-diligence questions for AI vendors',
      'Data ownership, training rights, and IP clauses',
      'Security, hosting, and data-residency requirements',
      'Termination, data return, and model portability clauses'
    ],
    useCases: [
      'Evaluating a generative AI SaaS subscription',
      'Reviewing an AI-powered HR or recruitment tool',
      'Procurement gate for AI features in enterprise platforms',
      'Comparing two vendors with similar capabilities'
    ],
    previewContent: [
      '[ ] Confirm in writing: "Customer data is NOT used to train the vendor\'s foundation or fine-tuned models, by default or by opt-out."',
      '[ ] Require a completed Model Card and System Card describing training data sources, known limitations, and benchmarked performance.',
      '[ ] Verify the vendor offers a SOC 2 Type II report or equivalent, and supports data-residency in our operating region.',
      '[ ] Negotiate an exit clause allowing full data export in a standard format (JSON/CSV) and deletion within 30 days of contract termination.'
    ],
    downloadName: 'CS_Academy_AI_Procurement_Checklist.pdf'
  },
  {
    id: 'responsible-ai-principles',
    title: 'Responsible AI Principles Toolkit',
    category: 'AI Governance',
    format: 'Toolkit',
    description: 'A practitioner-oriented toolkit of 7 responsible AI principles, each with a diagnostic question set, red-line examples, and an internal review checklist for project teams.',
    readingTime: '9 min read',
    level: 'Intermediate',
    targetAudience: 'AI product managers, data scientists, policy teams, ethics reviewers',
    keyHighlights: [
      '7 principles: Fairness, Privacy, Transparency, Accountability, Safety, Sustainability, Human Agency',
      'Diagnostic questions for each principle',
      'Red-line scenarios that should halt deployment',
      'Lightweight review checklist for agile teams'
    ],
    useCases: [
      'Reviewing a new AI feature before launch',
      'Running a quarterly responsible AI audit',
      'Training cross-functional product squads',
      'Documenting AI decisions for regulatory review'
    ],
    previewContent: [
      'Principle: Fairness — Diagnostic: "Across our 4 user segments, what is the variance in false-positive and false-negative rates? If any segment is more than 20% worse, we have a fairness problem."',
      'Red-Line Scenario: An AI system that scores loan eligibility and disproportionately rejects applicants from a specific region should NOT be deployed until the disparity is documented, justified, and remediated.',
      'Checklist Item: "We have a named accountable owner, a documented appeals process for affected users, and a date for the next fairness review on the project roadmap."'
    ],
    downloadName: 'CS_Academy_Responsible_AI_Principles.pdf'
  },
  {
    id: 'browser-privacy-hardening',
    title: 'Browser Privacy Hardening Guide',
    category: 'Privacy',
    format: 'PDF Guide',
    description: 'Configure your browser to block trackers, fingerprinting, and third-party cookies while keeping daily browsing fast and functional — across Chrome, Firefox, Safari, and mobile browsers.',
    readingTime: '6 min read',
    level: 'Intermediate',
    targetAudience: 'Privacy-conscious professionals, journalists, activists, security teams',
    keyHighlights: [
      'Recommended privacy extensions and ad blockers',
      'Fingerprint resistance and container tab setup',
      'Search engine alternatives and DNS-level protection',
      'Per-profile browser separation for work vs personal'
    ],
    useCases: [
      'Hardening a browser used for sensitive research',
      'Separating work, personal, and financial browsing profiles',
      'Reducing ad tracking for the whole family',
      'Defending against browser fingerprinting'
    ],
    previewContent: [
      'Step 1: Install uBlock Origin for content blocking, Privacy Badger for tracker detection, and a password manager extension. Disable all other extensions by default.',
      'Step 2: Switch your default search engine to DuckDuckGo or Startpage, and enable "Send Do Not Track" + "Global Privacy Control" in browser settings.',
      'Step 3: Use Firefox Multi-Account Containers or Chrome profiles to isolate work, banking, and social logins in separate cookie jars.'
    ],
    downloadName: 'CS_Academy_Browser_Privacy_Hardening.pdf'
  },
  {
    id: 'identity-theft-recovery',
    title: 'Identity Theft Recovery Playbook',
    category: 'Privacy',
    format: 'PDF Guide',
    description: 'A 72-hour emergency playbook to contain financial and reputational damage if your ID, mobile money account, or social media profile is stolen — with regional reporting contacts.',
    readingTime: '9 min read',
    level: 'Intermediate',
    targetAudience: 'Anyone who has experienced or suspects identity theft',
    keyHighlights: [
      'First 24 hours containment checklist',
      'How to file reports with banks, mobile money, and credit bureaus',
      'Social media account recovery procedures',
      'Restoring your digital identity over 30 days'
    ],
    useCases: [
      'Responding to a stolen SIM or mobile money breach',
      'Recovering a hijacked Instagram or Facebook account',
      'Disputing fraudulent loans opened in your name',
      'Cleaning up after a phishing-induced data leak'
    ],
    previewContent: [
      'Hour 0–2: Freeze your primary bank account and mobile money wallet. Call the official fraud line (printed on your card, not from a search result).',
      'Hour 2–24: File a police report and obtain a case number. Request a SIM swap block from your mobile operator. Change passwords from a clean device.',
      'Day 2–30: Submit a credit bureau fraud alert, dispute fraudulent accounts in writing, and request a 90-day credit monitoring service from your bank.'
    ],
    downloadName: 'CS_Academy_Identity_Theft_Recovery.pdf'
  },
  {
    id: 'digital-entrepreneur-security',
    title: 'Digital Entrepreneur Security Guide',
    category: 'Business',
    format: 'PDF Guide',
    description: 'A founder-focused security handbook covering laptop hygiene, cloud account protection, customer data handling, and the legal basics of running an online business.',
    readingTime: '8 min read',
    level: 'Intermediate',
    targetAudience: 'Solo founders, freelancers, e-commerce operators, agency owners',
    keyHighlights: [
      'Separating personal and business digital identities',
      'Securing business email, domain, and social handles',
      'Customer data storage and retention minimums',
      'Backup and ransomware recovery basics'
    ],
    useCases: [
      'Setting up a new online business from scratch',
      'Recovering from a hacked business Instagram or email',
      'Preparing for a first customer security questionnaire',
      'Creating a 30-60-90 day security plan for a startup'
    ],
    previewContent: [
      'Rule 1: Use a dedicated business email and phone number from day one. Never run a business from a personal Gmail + personal WhatsApp.',
      'Rule 2: Enable hardware security keys (YubiKey, Titan) for the CEO\'s email, banking, and social accounts. Phishing-resistant MFA stops 99% of account takeovers.',
      'Rule 3: Back up business data using the 3-2-1 rule — 3 copies, 2 different media, 1 offsite. Test restoration at least once per quarter.'
    ],
    downloadName: 'CS_Academy_Digital_Entrepreneur_Security.pdf'
  },
  {
    id: 'fintech-privacy-standards',
    title: 'Fintech Privacy & Data Standards',
    category: 'Business',
    format: 'Toolkit',
    description: 'A practical toolkit for fintech builders covering consent flows, data minimization, third-party risk, and user-facing transparency aligned with regional data protection regulations.',
    readingTime: '9 min read',
    level: 'Advanced',
    targetAudience: 'Fintech founders, product managers, compliance officers, mobile money operators',
    keyHighlights: [
      'Consent UX patterns that pass regulatory review',
      'Data minimization playbooks for KYC data',
      'Third-party processor due-diligence template',
      'Customer-facing privacy notice and clause library'
    ],
    useCases: [
      'Designing a KYC flow that respects user privacy',
      'Reviewing third-party APIs for data protection compliance',
      'Responding to a data subject access request (DSAR)',
      'Preparing for a regulatory inspection or partner audit'
    ],
    previewContent: [
      'Pattern 1: Layered Consent — Present a short top-layer notice ("We need your ID to verify your identity") with a deep link to the full legal basis. Avoid consent walls.',
      'Pattern 2: Data Minimization in KYC — Collect only the fields your regulator requires, redact non-essential ID fields before storage, and set automatic deletion timers (e.g., 7 years for financial records, 30 days for declined applicants).',
      'Template Clause: "We process your personal data to comply with anti-money-laundering regulations. You may request a copy of the data we hold and the lawful basis for processing by contacting our Data Protection Officer."'
    ],
    downloadName: 'CS_Academy_Fintech_Privacy_Standards.pdf'
  },
  {
    id: 'customer-trust-blueprint',
    title: 'Customer Trust & Transparency Blueprint',
    category: 'Business',
    format: 'PDF Guide',
    description: 'A small-business playbook for building customer trust through clear privacy practices, breach communication, and visible security signals — without an enterprise budget.',
    readingTime: '7 min read',
    level: 'Beginner',
    targetAudience: 'Small business owners, customer service leads, marketing teams',
    keyHighlights: [
      'Plain-language privacy notice templates',
      'Visible trust signals for websites and checkout pages',
      'Breach communication scripts in customer-friendly language',
      'Customer support scripts for security questions'
    ],
    useCases: [
      'Writing a privacy notice for a new e-commerce store',
      'Responding to a customer asking how their data is used',
      'Communicating a security incident to customers without panic',
      'Building a "Why trust us" section for a small business website'
    ],
    previewContent: [
      'Template Notice: "We collect your name, email, and delivery address to send your order. We never sell your data. You can request deletion at any time by replying to any email."',
      'Trust Signal Stack: HTTPS lock + visible "We never see your card details" badge at checkout + named customer support contact + posted business address.',
      'Breach Script: "We recently identified and resolved a security issue that may have affected your account. Your password has been reset as a precaution. Here is what happened, what we did, and what you should do."'
    ],
    downloadName: 'CS_Academy_Customer_Trust_Blueprint.pdf'
  }
];
