import { ResourceItem } from '../types';

export const resourcesData: ResourceItem[] = [
  {
    id: 'ai-prompt-starter-pack',
    title: 'AI Prompt Engineering Starter Pack',
    category: 'AI Productivity',
    format: 'Cheat Sheet',
    description: 'A comprehensive field-tested collection of 50+ battle-hardened prompt templates engineered for East African professionals. Covers executive writing, research synthesis, bilingual English-local language content creation, meeting minutes, and iterative refinement workflows. Each template has been validated across ChatGPT, Claude, Gemini, and Grok with annotated output comparisons.',
    readingTime: '15 min read',
    level: 'Beginner',
    targetAudience: 'Professionals, writers, team leads, students, administrators, content creators, HR officers, small business owners',
    keyHighlights: [
      'Role-Context-Task-Constraint (RCTC) blueprint - the 4-part framework that works across all AI models',
      '50+ production-ready templates organized by use case: emails, reports, proposals, translations, brainstorming',
      'Bilingual prompt patterns for local African languages and English content with cultural nuance calibration',
      'Iterative refinement cheat sheet: the 5-question audit to diagnose and fix any failing prompt',
      'Model comparison table showing which prompts perform best on which platform',
      'Troubleshooting flowchart for when AI output misses the mark'
    ],
    useCases: [
      'Drafting a polished board-level executive summary from raw meeting notes in under 3 minutes',
      'Generating a month\'s worth of social media captions in local African languages for a East African audience',
      'Creating differentiated lesson plan outlines for a class of 60 students in mixed language ability groups',
      'Translating technical English documentation into natural, conversational local African languages a shopkeeper would understand',
      'Synthesizing a 40-page consultant report into a 1-page decision brief for a busy CEO',
      'Brainstorming 30 viable business names with domain availability checks included'
    ],
    previewContent: [
      'Template 1 - Executive Synthesizer: "Act as an executive chief of staff. Review the following raw meeting notes and extract: (a) 3 board-level decisions made, (b) 5 action items with named owners and deadlines, (c) 2 open risks that need escalation, (d) 1 recommendation you would give the CEO. Format as a structured brief, not bullet soup." [Works best on: ChatGPT-4, Claude 3.7 Sonnet]',
      'Template 7 - Local Language Cultural Bridge: "Translate the following technical English concept into natural, conversational local African language suitable for a general East African small-business audience. Avoid direct translation artifacts. Add one culturally relevant analogy. Here is the concept: [paste]" [Works best on: Claude 3 Haiku, Grok]',
      'Template 12 - Socratic Problem Solver: "I am working on [describe project]. Before you give me any advice, ask me exactly 5 probing questions that would expose the assumptions I have not yet examined. Wait for my answers before responding with recommendations." [Works best on: all models, highest quality on Claude 3.7]',
      'Refinement Audit - The 5-Question Check: (1) Did the AI understand my role specification? (2) Is the output scoped to my constraint parameters? (3) Would a domain expert spot any hallucinations? (4) Is the tone calibrated to my audience? (5) Does the format match how this document will actually be used?'
    ],
    downloadName: 'CS_Academy_AI_Prompt_Starter_Pack.pdf'
  },
  {
    id: 'deepfake-awareness-guide',
    title: 'Deepfake & Synthetic Media Awareness Field Guide',
    category: 'Cyber Safety',
    format: 'PDF Guide',
    description: 'An in-depth operational field guide to recognizing, preventing, and responding to synthetic voice clones, AI-manipulated facial videos, and social engineering attacks that exploit mobile money systems across East Africa. Includes real case composites from Tanzania, Kenya, Uganda, and Nigeria to ground every concept in regional reality.',
    readingTime: '20 min read',
    level: 'Intermediate',
    targetAudience: 'General public, families, journalists, corporate staff, bank employees, law enforcement community liaison officers, teachers, NGO field teams',
    keyHighlights: [
      '10 optical and audio artifacts that betray AI-generated video - with side-by-side comparison screenshots',
      'Voice clone detection protocol: what to listen for in the first 8 seconds of any urgent call',
      'Family Financial Verbal Verification Protocol: how to establish a spoken challenge-response code with relatives who use M-Pesa and Airtel Money',
      'The "Liveness Test" - a 3-step verification challenge that is impossible for recorded-media deepfakes to pass',
      'Immediate incident response steps if your likeness or voice has been cloned and weaponized',
      'Psychology of urgency: why deepfake fraud works even when the victim "knew better"'
    ],
    useCases: [
      'Training front-line bank and microfinance staff to detect voice-clone fraud on phone-based customer verification',
      'Running a community awareness session in a village where mobile money agents serve as the only financial access point',
      'Protecting elderly parents who receive urgent "family emergency" calls demanding instant M-Pesa transfers',
      'Teaching teenagers to recognize when a influencer video has been synthetic and manipulated',
      'Equipping HR departments to spot AI-cloned CEO video messages used in executive impersonation fraud',
      'Preparing journalists who interview sources in dangerous contexts where voice verification matters'
    ],
    previewContent: [
      'Chapter 1: The Audio Vulnerability - Modern voice cloning needs only 3 seconds of sample audio. Scammers harvest voice clips from TikTok videos, radio interviews, podcast appearances, and even unanswered video calls. An urgent call from "your boss" demanding immediate mobile money transfer should ALWAYS trigger a secondary verification channel, regardless of how convincing the voice sounds.',
      'Chapter 3: The Two-Way Out-of-Band Verification Rule - Never execute an unusual financial request from any caller - regardless of their title or relationship to you - without a separate, independent verification step. Call them back on a number you have independently verified, not the number they called from.',
      'Chapter 5: The Liveness Test - Ask the caller a question that requires real-time spontaneous response: "What did we talk about at the last family gathering?" or "Tell me something that is not in any public profile." AI-cloned voices cannot improvise contextually novel responses under pressure in real time.'
    ],
    downloadName: 'CS_Academy_Deepfake_Awareness_Guide.pdf'
  },
  {
    id: 'cyber-hygiene-checklist',
    title: 'Digital Security Hygiene Checklist - 20-Point Audit',
    category: 'Cybersecurity',
    format: 'Checklist',
    description: 'A practical, no-jargon 20-point monthly security audit covering smartphones, laptops, email accounts, social media, and mobile money apps. Each item has clear pass/fail criteria, estimated time to complete, and links to step-by-step setup guides. Designed for the non-technical user who needs actionable security without wading through theory.',
    readingTime: '12 min read',
    level: 'Beginner',
    targetAudience: 'Everyone using smartphones, laptops, and internet banking - from university students to shop owners to corporate executives',
    keyHighlights: [
      'Passkey and password manager setup in 10 minutes flat - Bitwarden, 1Password, and Google Password Manager options',
      'Multi-factor authentication (MFA) enablement walkthrough for Gmail, Microsoft, WhatsApp, and 5 major banking apps',
      'Complete app permissions audit: which apps are tracking your location, contacts, and microphone right now',
      'Public Wi-Fi defensive playbook: what to do when you must use an open network at a café, hotel, or airport',
      'SIM port and SIM swap attack prevention - the single most under-protected attack vector in East Africa',
      'Monthly maintenance routine: a 15-minute recurring ritual that keeps your digital hygiene habit-forming'
    ],
    useCases: [
      'Running a personal monthly security audit before bill payment day',
      'Onboarding new employees to safe digital habits in a 30-minute induction session',
      'Hardening a device before using public Wi-Fi at a conference or co-working space',
      'Teaching a parent or grandparent who uses mobile money on a smartphone the essentials of account protection',
      'Preparing devices for international travel where public Wi-Fi and roaming introduce elevated risk',
      'Auditing your own digital footprint as a job seeker about to share your profile with a new employer'
    ],
    previewContent: [
      'Item 1 [PASS/FAIL]: Enable MFA on your primary Google/Microsoft accounts. Use an authenticator app (Google Authenticator or Authy) rather than SMS where available. Estimated time: 8 minutes. Why it matters: 99.9% of compromised accounts in 2024 had MFA disabled.',
      'Item 4 [PASS/FAIL]: Disable automatic Bluetooth and Wi-Fi connection in public spaces. Turn Bluetooth off entirely when not in active use. Estimated time: 2 minutes. Why it matters: BlueBorne and KNOB attacks can exploit automatic Bluetooth pairing on unpatched devices.',
      'Item 9 [PASS/FAIL]: Enable SIM port protection with your mobile operator. Request a SIM port PIN or SIM swap lock that requires in-person verification at an agent outlet. Estimated time: 15 minutes + a visit to your operator\'s shop. Why it matters: SIM swap fraud is the primary attack vector for hijacking mobile money and banking accounts in East Africa.'
    ],
    downloadName: 'CS_Academy_Cyber_Hygiene_Checklist.pdf'
  },
  {
    id: 'ai-tools-for-students',
    title: 'AI Tools for Academic Success - Student Guide',
    category: 'Education',
    format: 'PDF Guide',
    description: 'A principled, ethics-first guide for secondary school and university students on using AI as a learning accelerator - not a cheat code. Covers research, revision, language learning, exam prep, essay structuring, and citation hygiene. Includes an academic integrity self-assessment rubric and a model policy for responsible AI use in coursework.',
    readingTime: '16 min read',
    level: 'Beginner',
    targetAudience: 'High school students (Form 1–6), undergraduate and postgraduate university students, academic tutors, home-school parents, curriculum designers',
    keyHighlights: [
      'The 5-tier AI use spectrum: from "AI as a calculator" to "AI writes my essay" - with clear guidance on where each level sits academically',
      'Generating personalized practice quizzes and flashcard decks from lecture notes in under 5 minutes',
      'Using AI as a 24/7 tutor: how to ask diagnostic questions that reveal exactly where your understanding gaps are',
      'Citation hygiene: how to properly acknowledge AI assistance in footnotes, reference lists, and academic integrity statements',
      'Hallucination detection: red flags that signal an AI has invented a citation, statistic, or historical fact',
      'Designing a personal AI study system that builds genuine understanding rather than dependency'
    ],
    useCases: [
      'Creating a 50-question practice quiz from a 30-page set of lecture notes before an exam',
      'Using AI to explain a difficult calculus or organic chemistry concept at exactly your reading level',
      'Generating a 12-week study plan that distributes subject coverage across available hours',
      'Drafting an essay outline with AI, then writing the full essay independently to demonstrate understanding',
      'Practicing local language comprehension through AI-generated reading passages with comprehension questions',
      'Verifying that an AI-generated citation actually exists before including it in a reference list'
    ],
    previewContent: [
      'Framework: The Active Ingestion Model - The difference between learning and plagiarism lives in the cognitive engagement. Ask AI to TEST your understanding with quizzes and concept checks, rather than asking it to GENERATE content you submit as your own. Every time you interact with AI, you should be producing something - annotations, critiques, self-graded answers - not just copying output.',
      'Tool: Citation Verification Pipeline - Before adding any AI-generated citation to your reference list, run it through a 3-step check: (1) Search the title exactly as quoted in Google Scholar. (2) If found, verify the author, year, and publication name match. (3) If not found, flag the citation as unverified and remove or replace it. AI hallucinates citations approximately 15–30% of the time in open-domain tasks.'
    ],
    downloadName: 'CS_Academy_AI_Tools_For_Students.pdf'
  },
  {
    id: 'ai-safety-checklist',
    title: 'AI Safety & Data Governance Checklist for Workplaces',
    category: 'AI Governance',
    format: 'Checklist',
    description: 'A practical operational framework for organizations of all sizes to safely adopt generative AI tools - covering data classification, prompt hygiene, model training opt-outs, vendor review, and the drafting of a one-page internal acceptable use policy. Designed for teams that want the productivity gains of AI without the compliance and data-leakage risks.',
    readingTime: '14 min read',
    level: 'Intermediate',
    targetAudience: 'Business owners, HR managers, compliance officers, IT teams, operations managers, legal counsel, startup founders',
    keyHighlights: [
      'The 4-tier data classification system: Public, Internal, Confidential, Restricted - with clear examples for each tier',
      'Model training opt-out procedures for ChatGPT, Claude, Gemini, Copilot, and 8 other common tools',
      'Acceptable Use Policy draft template: 1-page, plain English, suitable for employee acknowledgment',
      'Red flag prompt audit: 10 example prompts that inadvertently expose customer PII or trade secrets',
      'Human-in-the-loop review requirements for all external customer-facing communications generated with AI',
      'Incident response steps for accidental data exposure through AI tools'
    ],
    useCases: [
      'Creating an internal AI acceptable-use policy that employees will actually read and follow',
      'Briefing the leadership team before adopting ChatGPT or Microsoft Copilot organization-wide',
      'Classifying all data types in your organization before determining which can safely enter AI tools',
      'Auditing existing AI integrations in your SaaS stack for data governance compliance',
      'Training new hires on AI safety as part of their onboarding compliance module',
      'Responding to an incident where an employee accidentally pasted customer data into a public AI tool'
    ],
    previewContent: [
      'Data Tier 1 - Public: Information already published on your website, social media, or press releases. Safe to paste into any AI tool without redaction.',
      'Data Tier 3 - Confidential: Customer names, phone numbers, M-Pesa transaction IDs, employee salary bands, vendor contract values. MUST be pseudonymized or fully redacted before any AI tool input. Example redaction: "Customer ID: [REDACTED], Transaction amount: [REDACTED TZS], Date: [REDACTED]."',
      'Policy Clause Example: "All AI-generated content that will reach customers, partners, or the public must be reviewed and approved by a human employee before sending. AI output is a draft, not a final communication. The reviewing employee is accountable for the accuracy of the final version."'
    ],
    downloadName: 'CS_Academy_AI_Safety_Checklist.pdf'
  },
  {
    id: 'digital-privacy-checklist',
    title: 'Digital Privacy & Data Minimization Checklist',
    category: 'Privacy',
    format: 'Checklist',
    description: 'A step-by-step privacy hardening guide covering WhatsApp, Telegram, email accounts, social media profiles, browsers, and Android/iOS device settings. Each section provides before/after comparison screenshots guidance, recommended settings, and privacy extension recommendations. Built for East African digital citizens who need practical, locally relevant privacy steps.',
    readingTime: '13 min read',
    level: 'Beginner',
    targetAudience: 'Digital citizens, journalists and their sources, activists, professionals, university students, youth, anyone with a smartphone',
    keyHighlights: [
      'WhatsApp privacy settings walkthrough: Last Seen, Profile Photo, About, Groups, Read Receipts - with optimal privacy configuration',
      'Two-step verification (2FA) setup for WhatsApp, Gmail, and Telegram with recovery PIN management',
      'Browser privacy extensions: uBlock Origin, Privacy Badger, HTTPS Everywhere - with recommended configuration',
      'Social media profile lockdown guide for Facebook, Instagram, LinkedIn, and X with audience insight audits',
      'Google search auto-delete and "Results about you" removal request process for personal data exposure',
      'Encrypted messaging standards explained: Signal vs Telegram vs WhatsApp - what each does and does not protect'
    ],
    useCases: [
      'Locking down a WhatsApp account after receiving suspicious messages from an unknown number',
      'Enabling 2FA on all messaging and email accounts to protect against SIM-swap account takeover',
      'Reducing ad tracking in Chrome and Firefox without breaking the browsing experience',
      'Auditing what a potential employer or stranger can see when searching your name on Google',
      'Protecting journalistic sources who need to communicate securely with a reporter',
      'Cleaning up a digital footprint before a significant personal or professional event'
    ],
    previewContent: [
      'WhatsApp Privacy Configuration: (1) Set "Last Seen" to "My Contacts Only" - not "Everyone". (2) Set "Profile Photo" to "My Contacts Only". (3) Set "Groups" to "My Contacts Only" - this prevents strangers from adding you to WhatsApp groups where your number is exposed. (4) Enable "Two-Step Verification" with a 6-digit PIN you will NOT forget - write it down and store it separately from your phone.',
      'Google Search Audit: Search your full name in quotes, your phone number, your home address, and your email address. For each result: categorize as "Remove via site", "Submit to Google removal", or "No action needed". Submit removal requests for any result exposing personal contact information within 48 hours of discovery.'
    ],
    downloadName: 'CS_Academy_Digital_Privacy_Checklist.pdf'
  },
  {
    id: 'ai-for-educators-guide',
    title: 'AI for Educators - Classroom Implementation Guide',
    category: 'Education',
    format: 'PDF Guide',
    description: 'A comprehensive, pedagogy-first guide for African teachers and lecturers to leverage AI for lesson planning, differentiated instruction, formative assessment design, multilingual classroom support, and administrative efficiency - without replacing the teacher. Includes 20 ready-to-use prompt templates calibrated for East African curriculum contexts and mixed-ability classrooms.',
    readingTime: '18 min read',
    level: 'Intermediate',
    targetAudience: 'Primary and secondary school teachers, university lecturers, curriculum designers, school administrators, private tutors, teacher training institutions',
    keyHighlights: [
      '20 classroom-ready AI prompt templates for lesson planning, assessment design, and student feedback',
      'Differentiated instruction framework: using AI to generate 3-tier learning materials (below-level, on-level, extension) from a single topic input',
      'Managing academic integrity constructively: how to design AI-aware assignments that preserve learning outcomes',
      'Bilingual classroom support: AI-generated local language explanations of English-medium concepts and vice versa',
      'Formative assessment design: generating concept-check questions, exit tickets, and diagnostic quizzes aligned to curriculum objectives',
      'Time savings calculator: documenting how AI reclaim hours per week for 1-on-1 student mentorship'
    ],
    useCases: [
      'Generating a complete 3-lesson sequence on "Photosynthesis" for a mixed-ability Secondary 3 class',
      'Creating a rubric for a research project assignment that accounts for and encourages ethical AI use',
      'Translating 2 weeks of English-medium lesson objectives into conversational local African language for a bilingual classroom',
      'Designing a differentiated reading comprehension worksheet for a Primary 6 class with 4 reading levels',
      'Generating a set of Socratic discussion questions that develop critical thinking rather than fact recall',
      'Drafting constructive, specific student feedback comments from AI-assisted analysis of an essay'
    ],
    previewContent: [
      'Module 1: Reclaiming Planning Time - A Secondary school teacher spending 3 hours on weekly lesson planning can reduce that to 45 minutes using AI-assisted outline generation, then invest the reclaimed 2+ hours in 1-on-1 student mentorship, which has the highest measurable impact on student outcomes. The AI generates drafts; the teacher applies professional judgment and student knowledge.',
      'Module 3: Academic Integrity Without Prohibition - Rather than banning AI, design assignments where the process matters: submit the AI conversation transcript alongside the final essay, or require an oral defense where the student explains every argument in the paper. This makes AI a accountability tool, not a shortcut.'
    ],
    downloadName: 'CS_Academy_AI_For_Educators_Guide.pdf'
  },
  {
    id: 'ai-productivity-starter-guide',
    title: 'AI Productivity Starter Guide - Daily 15-Minute System',
    category: 'AI Productivity',
    format: 'Toolkit',
    description: 'A foundational productivity handbook for busy East African professionals who need to integrate AI into their daily workflows without disrupting existing habits. The guide introduces a structured 15-minute morning AI routine for email triage, document drafting, and scheduling, alongside afternoon and evening workflows for summarization and follow-up management.',
    readingTime: '14 min read',
    level: 'Beginner',
    targetAudience: 'Entrepreneurs, corporate employees, consultants, managers, administrative staff, small business owners, freelancers',
    keyHighlights: [
      'The 15-minute morning AI productivity routine: email triage, response drafting, and priority setting in 15 minutes',
      'Email drafting and tone calibration shortcuts for formal, semi-formal, and customer-facing communications',
      'Spreadsheet formula generation cheat codes: describe the calculation you need in plain English',
      'Meeting transcript summarization framework: turning 60-minute meetings into 1-page action briefs',
      'Document inconsistency detection: using AI to proofread contracts, MOUs, and proposals for logical gaps',
      'Cross-platform tool guide: which AI tool is best for which task - ChatGPT, Claude, Gemini, Grok, Copilot'
    ],
    useCases: [
      'Clearing a 3-day email backlog in under 30 minutes with AI-assisted response templates',
      'Drafting a client proposal with consistent brand tone across 8 pages in 45 minutes',
      'Generating complex Excel formulas (VLOOKUP, INDEX-MATCH, conditional SUMIF) without touching a formula tutorial',
      'Converting 2 hours of meeting recording into a structured 1-page minutes document with owners and deadlines',
      'Reviewing a 10-page supplier contract for missing clauses and inconsistent liability provisions',
      'Creating a weekly schedule optimization plan that respects both deep work blocks and meeting availability'
    ],
    previewContent: [
      'Morning Routine - Step 1 (5 min): Paste your unread email subject lines into AI and ask: "Categorize these emails by urgency and action type: (a) needs same-day response, (b) needs this week response, (c) FYI only, (d) archive. For category A, draft a 2-sentence response for each." Review drafts, edit, send.',
      'Formula Generation Cheat Code: "Write an Excel formula that [describe exactly what you need in plain English]. Explain the formula in plain English after writing it so I can verify it does what I want." This approach produces correct formulas 90%+ of the time and builds your formula literacy incidentally.',
      'Meeting Summary Framework: "From the following meeting transcript, extract: (1) Key decision made, (2) Action items with owner and due date, (3) Any open risks or blockers, (4) Next steps. Format as a table with columns: Item | Owner | Due Date | Status."'
    ],
    downloadName: 'CS_Academy_AI_Productivity_Starter_Guide.pdf'
  },
  {
    id: 'mpesa-business-safety',
    title: 'M-Pesa & Mobile Money Business Safety Guide',
    category: 'Business',
    format: 'PDF Guide',
    description: 'A practical, operations-focused guide for SMEs, shopkeepers, mobile money agents, and business owners to secure their mobile money operations, reconcile daily transactions accurately, protect against sim-swap fraud, and train staff on safe cash handling. Includes printable posters for agent outlets and staff training templates.',
    readingTime: '14 min read',
    level: 'Beginner',
    targetAudience: 'Small business owners, shopkeepers, mobile money agents, supermarket cashiers, finance clerks, NGO disbursement officers, school fee collectors',
    keyHighlights: [
      'Securing the business paybill and till number: SIM custody rules, PIN management, and daily reconciliation procedures',
      'Sim-swap and callback fraud case studies: how the attacks work, real damage examples, and exact prevention steps',
      'Staff training curriculum for mobile money handling - 5-module structure with quiz',
      'Daily reconciliation workflow: comparing M-Pesa statements against sales records without spreadsheets',
      'Incident response playbook: what to do within the first hour of discovering a fraudulent transaction',
      'Regulatory contacts: TRA, BOT, and mobile operator fraud desk contact procedures for Tanzania, Kenya, and Uganda'
    ],
    useCases: [
      'Training a new cashier on safe M-Pesa handling in a single 45-minute session using the included module',
      'Setting up a daily reconciliation habit that catches discrepancies before they compound',
      'Responding to a "suspicious balance alert" that may indicate unauthorized access to the business account',
      'Protecting a business till number from unauthorized porting or hijacking by a rogue employee',
      'Managing cash float and mobile money float separately to prevent commingling losses',
      'Preparing for a mobile money audit by a microfinance regulator or partner organization'
    ],
    previewContent: [
      'Golden Rule: The M-Pesa PIN is the business\'s most sensitive secret - treat it like the key to a safe. No staff member, no matter how trusted, should ever know or hold the business M-Pesa PIN. If someone needs to process transactions, set up a separate sub-account with its own PIN and configurable transaction limits.',
      'Reconciliation Protocol: At close of business each day, download the M-Pesa transaction report and compare it against the day\'s sales log. Any discrepancy above TZS 10,000 must be investigated and documented before the next business day. Persistent small discrepancies are a warning sign of internal theft - they rarely resolve on their own.',
      'Sim-Swap Red Flag: An unexpected 2–4 hour loss of cellular service on the business line is a sim-swap attack in progress. Immediately call the mobile operator\'s fraud desk (saved number, not from Google search results) to freeze the line and verify the port status.'
    ],
    downloadName: 'CS_Academy_Mpesa_Business_Safety.pdf'
  },
  {
    id: 'remote-work-security',
    title: 'Remote & Hybrid Work Security Checklist',
    category: 'Cybersecurity',
    format: 'Checklist',
    description: 'A comprehensive security hardening guide for remote and hybrid workers who access company systems from home offices, co-working spaces, cafes, and while traveling. Covers laptop hardening, home network security, VPN configuration, work-personal device separation, and secure file sharing - without requiring enterprise IT budgets.',
    readingTime: '13 min read',
    level: 'Intermediate',
    targetAudience: 'Remote employees, hybrid workers, team leads managing remote teams, IT support staff, freelancers with client data access, contractors',
    keyHighlights: [
      'Home Wi-Fi and router security: changing defaults, enabling WPA3, configuring a guest network for work devices',
      'VPN setup and zero-trust access model: what a proper VPN does and does not protect against',
      'Work-personal device separation strategies without buying a second laptop',
      'Secure file sharing hierarchy: which tools to use for what sensitivity level',
      'Automatic encrypted backup routines that run in the background without user intervention',
      'Incident containment checklist: what to do if a personal device with work access is lost or stolen'
    ],
    useCases: [
      'Setting up a secure home office from scratch in under 2 hours with under $50 in equipment',
      'Onboarding a remote contractor who will need access to client data and project management tools',
      'Auditing shared cloud folders (Google Drive, Dropbox) for over-permissioned files before a team offsite',
      'Responding to a lost laptop that had corporate email and cloud storage access',
      'Configuring automatic encrypted backups for a remote worker who cannot afford data loss',
      'Running a security refresher session for a team that recently transitioned to fully remote work'
    ],
    previewContent: [
      'Router Hardening Checklist: (1) Change the default admin password from "admin/password" to a 16-character unique phrase stored in your password manager. (2) Update the router firmware - unpatched routers are the primary home network attack vector. (3) Enable WPA3 or WPA2-AES encryption; disable WPS entirely. (4) Create a separate guest network for visitors and IoT devices, isolated from your work devices.',
      'VPN Clarification: A consumer VPN (NordVPN, ExpressVPN, etc.) encrypts your traffic between your laptop and the VPN server, which is useful on public Wi-Fi. It does NOT make your work systems more secure - only your organization\'s corporate VPN does that. Using a consumer VPN to access company systems while on public Wi-Fi is good; using it INSTEAD of your corporate VPN when working remotely is a policy violation.'
    ],
    downloadName: 'CS_Academy_Remote_Work_Security.pdf'
  },
  {
    id: 'ai-presentation-toolkit',
    title: 'AI Presentation & Content Creation Toolkit',
    category: 'AI Productivity',
    format: 'Toolkit',
    description: 'A complete prompt-powered content production system for generating slides, social media posts, email campaigns, newsletters, and marketing copy in a fraction of the usual time. Includes brand-voice calibration templates, storytelling frameworks, and specialized local language content generation patterns. Built for marketers, founders, trainers, and students who need consistent, high-quality output.',
    readingTime: '14 min read',
    level: 'Beginner',
    targetAudience: 'Marketers, startup founders, social media managers, trainers, university students presenting projects, small business owners, NGO communications staff',
    keyHighlights: [
      'Slide outline generators for any audience and topic: investor pitch, class presentation, board report, training workshop',
      'Brand-voice calibration guide: teach AI your organization\'s tone in 3 examples, use it consistently across all outputs',
      'Storytelling frameworks: Problem-Solution-Result, Before-After-Bridge, Hero\'s Journey adapted for business presentations',
      '30 social media caption templates covering Instagram, LinkedIn, X, and TikTok in English and local African languages',
      'Email sequence generator for product launches, event promotions, and follow-up nurture sequences',
      'Content repurposing workflow: turn one long-form document into 10 pieces of content across platforms'
    ],
    useCases: [
      'Building a 12-slide investor pitch deck in under 2 hours from a rough business concept',
      'Producing a month of social media content (30 posts) in a single focused 3-hour content sprint',
      'Turning a 25-page annual report into a 10-slide board presentation with data visualization suggestions',
      'Writing consistent bilingual (English-local language) marketing copy for a new product launch',
      'Creating a 6-email nurture sequence for a lead magnet that guides subscribers from signup to purchase',
      'Generating a workshop facilitation guide with participant exercises, discussion prompts, and timing notes'
    ],
    previewContent: [
      'Prompt: "Create a 10-slide pitch deck outline for a [fintech/agritech/healthtech/edtech] startup targeting [East African market]. The pitch should follow the Problem-Solution-Traction-Ask format, be appropriate for [angel investors/VC/bank loan officer], and include a slide on the regulatory environment in Tanzania/Kenya/Uganda. Here is the problem statement: [paste]."',
      'Brand Voice Calibration: Feed AI exactly 3 examples of your best past content and say: "This is our brand voice. Analyze the patterns in tone, sentence length, vocabulary, and formatting. Then rewrite the following draft in our brand voice: [paste draft]."',
      'Content Repurposing Map: One 1,500-word blog post → 1 LinkedIn article + 5 Twitter/X threads + 1 Instagram carousel caption + 1 email newsletter section + 1 YouTube video outline + 3 TikTok talking points. Use the "Content Atomizer" prompt pattern to automate this decomposition.'
    ],
    downloadName: 'CS_Academy_AI_Presentation_Toolkit.pdf'
  },
  {
    id: 'data-privacy-ngos',
    title: 'Data Privacy for NGOs & Field Operations',
    category: 'Privacy',
    format: 'PDF Guide',
    description: 'A field-practical guide for non-governmental organizations handling beneficiary data, donor records, grant reports, and sensitive community information. Covers Tanzania Data Protection Act 2022 compliance, consent design, anonymization techniques, field data collection security, and donor reporting without exposing beneficiaries. Includes templates for consent forms, data sharing agreements, and data retention schedules.',
    readingTime: '18 min read',
    level: 'Intermediate',
    targetAudience: 'NGO program managers, field officers, monitoring and evaluation staff, grant managers, IT officers, country directors at small-to-mid-size NGOs',
    keyHighlights: [
      'Tanzania Data Protection Act 2022 compliance checklist: what applies to your organization and by when',
      'Beneficiary consent form templates that are plain-language, culturally appropriate, and legally sufficient',
      'Data minimization playbook: collecting only what you need, storing separately from identifiers, auto-deleting after retention period',
      'Offline-first field data collection security: using KoBoToolbox and ODK with proper encryption',
      'Donor reporting templates that share impact data without exposing beneficiary identities',
      'Data breach notification procedure: internal escalation, regulator notification, and affected individual communication within 72 hours'
    ],
    useCases: [
      'Designing a consent form for a household survey in a rural community where some participants are semi-literate',
      'Setting up a beneficiary database that is GDPR and TDPA-compliant without hiring a DPO',
      'Anonymizing case studies and impact narratives before sharing with donors or publishing online',
      'Briefing field officers on data care responsibilities during a 15-minute team morning briefing',
      'Responding to a donor\'s data protection questionnaire as part of a grant application',
      'Conducting a data audit of all personal information currently stored across the organization\'s systems'
    ],
    previewContent: [
      'Consent Principle: Consent must be freely given, specific, informed, and unambiguous. A beneficiary should never be told "we cannot help you if you do not consent" - that is coercion, not consent. Consent must also be as easy to withdraw as it is to give. Include a "withdraw consent" contact in every consent form.',
      'Data Minimization Rule: If you do not need a beneficiary\'s name to deliver the program outcome, do not collect it. Use a program ID code. Link the code to the name in a separate, encrypted file accessible only to the program manager. This means that even if the program database is breached, the exposed data cannot be linked to individuals without the separate key.',
      'Donor Reporting Anonymization Check: Before sharing any beneficiary-level data with a donor, run the "Re-identification Test": Could someone with only this data set and publicly available information (social media, local newspaper, government records) identify any individual? If yes, anonymize further before sharing.'
    ],
    downloadName: 'CS_Academy_Data_Privacy_NGOs.pdf'
  },
  {
    id: 'ai-research-synthesis-guide',
    title: 'AI Research & Synthesis Playbook',
    category: 'AI Productivity',
    format: 'PDF Guide',
    description: 'A rigorous, research-grade playbook for turning AI into a reliable research analyst. Covers multi-source triangulation, document comparison, contradiction detection, citation hygiene, hallucination control, and structured synthesis workflows. Includes 8 annotated prompt patterns, a source evaluation checklist, and a fact-verification framework. Built for graduate students, consultants, policy analysts, and journalists working with real-world data.',
    readingTime: '22 min read',
    level: 'Intermediate',
    targetAudience: 'Researchers, graduate students, policy analysts, journalists, consultants, business intelligence analysts, legal researchers',
    keyHighlights: [
      'Source-Then-Synthesize pattern: forcing AI to ground every synthesis claim in a specific source before summarizing',
      'Multi-document comparison framework: comparing 10+ sources side by side to find consensus, contradictions, and gaps',
      'Hallucination control: 5 verification steps for any statistic, date, proper noun, or quoted text from AI output',
      'Literature review acceleration: generating structured outlines from 20+ academic papers in one session',
      'Citation formatting templates for APA, Harvard, and Chicago styles with auto-cleanup of malformed references',
      'The "Devil\'s Advocate" audit pattern: systematically stress-testing your own draft before publication'
    ],
    useCases: [
      'Synthesizing 30+ articles, reports, and news pieces into a 2-page policy brief for a ministry meeting',
      'Comparing the education policy positions of Tanzania, Kenya, Uganda, and Rwanda across 5 dimensions',
      'Building a literature review chapter outline for a master\'s thesis in under 3 hours',
      'Generating a competitive landscape analysis for a business plan from publicly available market reports',
      'Cross-referencing an AI-generated statistic against primary sources before citing it in a published report',
      'Conducting a regulatory gap analysis by comparing existing laws across 4 East African countries'
    ],
    previewContent: [
      'Pattern 1 - Source-Then-Synthesize: "Read the following 5 sources. For each source, identify: (a) the single most important finding, (b) one limitation or caveat, and (c) one question it raises that is not answered. Then synthesize across all 5 to identify: 3 points of consensus, 2 genuine areas of disagreement, and 1 open research question. Cite each claim to its source by paragraph number."',
      'Hallucination Verification Framework: (1) Extract every specific claim - statistics, dates, names, law citations, institution names. (2) For each claim, search the primary source directly - not just accept AI\'s citation. (3) Flag any claim that cannot be verified within 3 searches. (4) Remove or replace unverified claims. (5) Add a disclosure note for any AI-assisted synthesis in the methodology section.',
      'Devil\'s Advocate Prompt: "Review my draft [report/brief/essay]. Play a skeptical subject-matter expert who thinks the central argument is flawed. Identify: (a) 3 factual claims that lack sources, (b) 2 logical weaknesses in the argument structure, (c) 1 strong counter-argument I have not addressed, and (d) 1 question a hostile reviewer would ask."'
    ],
    downloadName: 'CS_Academy_AI_Research_Synthesis_Guide.pdf'
  },
  {
    id: 'social-media-scam-protection',
    title: 'Social Media Scam & Fraud Protection Guide',
    category: 'Cyber Safety',
    format: 'PDF Guide',
    description: 'An exhaustive field guide to identifying, avoiding, and recovering from the most prevalent social media scams across Facebook, Instagram, WhatsApp, TikTok, X, and LinkedIn in East Africa. Covers romance fraud, investment pyramids, fake e-commerce stores, job recruitment scams, SIM-swap social engineering, and business impersonation. Includes real case composites, reporting procedures for Tanzanian and Kenyan authorities, and recovery playbooks.',
    readingTime: '20 min read',
    level: 'Beginner',
    targetAudience: 'Social media users of all ages, small business owners with online stores, job seekers, online sellers, community managers, parents of teenage social media users',
    keyHighlights: [
      'Complete taxonomy of 12 most common social media scams in East Africa with step-by-step attack progression diagrams',
      'Red flag analysis framework: the S.U.S.P.E.C.T. checklist - Urgency, Secrecy, Payment Method, External Platform, Context Switch, Too Good to Be True',
      'Fake e-commerce store detection guide: 8-point checklist before any online purchase',
      'Romance fraud psychology: why even intelligent, skeptical people fall for long-con scams',
      'Official reporting procedures for Tanzania (TAFIDA, Tanzania Police), Kenya (ODPP, CAK), and social platform appeals',
      'Recovery playbook: immediate steps within 2 hours of sending money to a scammer'
    ],
    useCases: [
      'Verifying whether a new Instagram friend request is from a real person or a catfish account',
      'Checking a suspected investment platform before committing any money - and recognizing Ponzi patterns early',
      'Reporting a fake business page impersonating your company on Facebook and Instagram',
      'Briefing a teenager on TikTok and Snapchat scams without inducing paranoia',
      'Responding to a LinkedIn recruiter who asks for bank details before any interview process',
      'Recovering money sent via M-Pesa to a fake e-commerce store before the transaction is reversed'
    ],
    previewContent: [
      'The S.U.S.P.E.C.T. Checklist - Score each message: Urgency (creates time pressure?), Secrecy (asks you not to tell anyone?), Payment (asks for unusual payment method?), External Platform (insists you move to WhatsApp/Telegram?), Context Switch (message tone is inconsistent with your relationship?), Too Good to Be True (promise sounds implausible?). Score of 3 or more: treat as confirmed fraud.',
      'Investment Pyramid Red Flags: (1) Guaranteed returns - no legitimate investment promises guaranteed returns. (2) Referral-only entry - income depends on recruiting others, not on product or service value. (3) Complex compensation structure that is hard to explain simply. (4) Regulator silence - the operator cannot show a CMA or BOT license. (5) Testimonial-only evidence - no verifiable audited financials.',
      'Recovery Protocol - Within 2 Hours: (1) Call your mobile money provider\'s fraud line to attempt transaction freeze. (2) File a police report and obtain a case number. (3) Screenshot every message, profile, and transaction receipt. (4) Contact your bank if funds were transferred from a bank account. (5) Report to the platform (Facebook, Instagram) via the impersonation/fraud reporting form.'
    ],
    downloadName: 'CS_Academy_Social_Media_Scam_Protection.pdf'
  },
  {
    id: 'child-online-safety-guide',
    title: 'Child Online Safety - Parent & Guardian Handbook',
    category: 'Cyber Safety',
    format: 'PDF Guide',
    description: 'A practical, non-alarmist handbook for parents, guardians, and teachers to protect children from online risks - predators, cyberbullying, sextortion, inappropriate content, excessive screen exposure, and gaming addiction. Includes age-appropriate device setup guides for Android and iOS, conversation scripts, parental control tools, and escalation procedures. Designed for families across diverse economic backgrounds.',
    readingTime: '22 min read',
    level: 'Beginner',
    targetAudience: 'Parents, guardians, grandparents raising children with smartphones, primary and secondary school teachers, school counselors, child welfare officers',
    keyHighlights: [
      'Age-appropriate device setup: First smartphone checklist for ages 10–14 and 15–17, covering Android Family Link and iOS Screen Time',
      'Sextortion and online grooming recognition: 12 behavioral warning signs in a child\'s online behavior',
      'Cyberbullying response protocol: evidence collection, school engagement, platform reporting, and emotional support sequence',
      'Non-confrontational conversation scripts for discussing online safety without triggering secrecy',
      'YouTube, TikTok, Snapchat, and Roblox safety configurations with step-by-step instructions',
      'Family screen-time agreement template with built-in trust-building review mechanisms'
    ],
    useCases: [
      'Setting up a first smartphone for a 12-year-old with appropriate content and contact restrictions',
      'Responding to a child who has received an explicit or threatening message from an unknown adult online',
      'Configuring YouTube Kids vs regular YouTube, TikTok private account mode, and Roblox privacy settings',
      'Creating a family agreement about device use that both parents and children sign and review quarterly',
      'Recognizing signs that a child\'s online activity has crossed from normal to harmful',
      'Having the first conversation about online predators with a 10-year-old in age-appropriate language'
    ],
    previewContent: [
      'The Safety Conversation Script: "I want you to have fun online and to be safe - both matter to me equally. If anyone ever asks you to keep a message secret from me, that is exactly the kind of message I need to know about. You will never get in trouble for telling me something that worried you. Our job together is to figure out what to do about it." Practice saying this, and mean it.',
      'Device Setup - First Smartphone (Ages 10–14): (1) Enable Screen Time (iOS) or Family Link (Android) with parents as admin. (2) Require approval for all app downloads. (3) Set content restrictions to block 18+ apps and mature games. (4) Disable in-app purchases entirely. (5) Configure Wi-Fi to cut off internet access at a set bedtime. (6) Install only from official app stores. (7) Have the child\'s account email go to a parent\'s inbox for recovery.',
      'Escalation Rule: Any request for photos, in-person meeting, or secrecy from an online contact must be reported to a trusted adult immediately. No child gets in trouble for reporting - ever. Document the messages with screenshots before the child deletes them in embarrassment.'
    ],
    downloadName: 'CS_Academy_Child_Online_Safety_Guide.pdf'
  },
  {
    id: 'digital-footprint-cleanup',
    title: 'Digital Footprint Audit & Cleanup Playbook',
    category: 'Cyber Safety',
    format: 'Checklist',
    description: 'A systematic cleanup operation to inventory, reduce, and monitor your digital footprint - covering old social media accounts, data broker opt-outs, leaked credential remediation, search engine result management, and ongoing monitoring. Includes a curated list of 30+ data broker opt-out links, Google Results About You removal process, and a quarterly monitoring routine. Essential for job seekers, professionals, public figures, and anyone who has experienced doxxing or harassment.',
    readingTime: '16 min read',
    level: 'Intermediate',
    targetAudience: 'Job seekers, professionals preparing for new roles, public figures, journalists, survivors of online harassment, anyone planning a significant personal event (wedding, business launch, political campaign)',
    keyHighlights: [
      'Complete audit methodology: searching your name, phone number, home address, and email across search engines and people-finder sites',
      'Curated opt-out guide for 30+ data brokers: Whitepages, Spokeo, Truecaller, PeopleFinder, and 25 more - with direct links and step-by-step instructions',
      'Google "Results about you" removal request process for personal contact information, ID numbers, and financial data',
      'Account inventory template: documenting all online accounts to identify forgotten dormant profiles',
      'Credential monitoring: setting up HaveIBeenPwned alerts and dark web monitoring for your email addresses',
      'Long-term monitoring routine: quarterly check cadence and alert setup to catch new exposure early'
    ],
    useCases: [
      'Cleaning up Google search results before a high-stakes job interview or promotion board',
      'Removing a home address from people-finder sites after experiencing a threatening interaction online',
      'Closing 10+ forgotten social media accounts from university days that still contain personal information',
      'Setting up automated monitoring so any new exposure of your personal data triggers an immediate alert',
      'Responding to a data breach notification by auditing which accounts used the compromised password',
      'Preparing for a public-facing role by proactively reducing the discoverable personal information surface'
    ],
    previewContent: [
      'Audit Phase 1 - Search: Search the following in Google (use incognito mode): (1) Your full name in quotes, (2) Your phone number in quotes, (3) Your home address in quotes, (4) Your email address in quotes, (5) Your national ID number (for Tanzania: NIDA number; Kenya: ID number) in quotes. Screenshot every result. Categorize each as: Remove via site direct → Submit Google removal → Accept/Monitor → False positive.',
      'Data Broker Opt-Out Sequence (Priority Order): Start with Truecaller (highest East African usage), then Whitepages, then Spokeo. Each has a standard opt-out form that requires no account creation - just a search request and email verification. Processing time: 7–30 days per site. Do not pay any service to do this - it is free and straightforward.',
      'Credential Monitoring Setup: Register your primary and secondary email addresses at haveibeenpwned.com for free alerts. Enable the "Notify me of future breaches" toggle. When a breach alert arrives, immediately change the password for that service and any service using the same password.'
    ],
    downloadName: 'CS_Academy_Digital_Footprint_Cleanup.pdf'
  },
  {
    id: 'small-business-security-audit',
    title: 'Small Business Security Audit - 40-Point Framework',
    category: 'Cybersecurity',
    format: 'Checklist',
    description: 'A thorough 40-point security audit checklist for small businesses that covers IT infrastructure, financial accounts, employee access controls, supplier relationships, and incident response readiness. Organized into 5 domains: Identity & Access, Device Security, Data Protection, Financial Controls, and Incident Response. Includes scoring rubric, remediation priority matrix, and a one-page executive summary template.',
    readingTime: '18 min read',
    level: 'Intermediate',
    targetAudience: 'SME owners, operations managers, finance officers, retail shop owners, restaurant operators, e-commerce founders, IT staff responsible for small business clients',
    keyHighlights: [
      '40-point audit across 5 security domains with pass/fail criteria, remediation effort ratings, and risk severity scoring',
      'Email and admin account hardening: SPF, DKIM, DMARC configuration for business domain to prevent CEO fraud',
      'Supplier and vendor access audit: least-privilege principle applied to every third-party integration',
      'POS terminal and payment processing security: what a PCI-DSS self-assessment actually requires for small merchants',
      'Incident response plan template: who to call, what to disconnect, and how to communicate within the first 60 minutes of a breach',
      'Quarterly security health check calendar: recurring maintenance that keeps security from degrading over time'
    ],
    useCases: [
      'Running a quarterly security health check before a board meeting or investor update',
      'Preparing for a partnership or bank compliance review that requires documented security controls',
      'Auditing access permissions after an employee resignation or role change',
      'Validating security posture before launching an e-commerce store or accepting online payments',
      'Completing a supplier security questionnaire from a major corporate client or government department',
      'Creating a security improvement roadmap prioritized by risk severity and remediation cost'
    ],
    previewContent: [
      'Domain 1 - Identity & Access: [ ] Every business-critical account uses a unique 16+ character password stored in a shared team password manager (Bitwarden, 1Password Business). [ ] MFA is enabled on all accounts with access to customer data, finances, or admin controls. [ ] Business email domain has SPF + DKIM + DMARC records configured. [ ] Default admin passwords on all routers, NAS devices, and cloud consoles have been changed.',
      'Domain 3 - Financial Controls: [ ] Mobile money and bank account access is limited to named individuals who need it for their role. [ ] A dual-authorization rule exists: no single person can approve and execute a payment above a set threshold. [ ] Monthly reconciliation compares actual transactions against authorized approvals. [ ] A written policy exists for handling unusual or urgent payment requests that bypass normal process.',
      'Domain 5 - Incident Response Readiness: [ ] A written incident response plan exists with named contacts, escalation numbers (law enforcement cyber unit, legal counsel, insurance provider, telecoms fraud desk), and step-by-step first-hour actions. [ ] The plan has been tested - at minimum, a tabletop walkthrough - in the last 6 months. [ ] Cyber insurance policy is in place and the policy covers social engineering and mobile money fraud.'
    ],
    downloadName: 'CS_Academy_Small_Business_Security_Audit.pdf'
  },
  {
    id: 'phishing-defense-drill',
    title: 'Phishing Defense Drill - Train-the-Trainer Toolkit',
    category: 'Cybersecurity',
    format: 'Toolkit',
    description: 'A complete train-the-trainer toolkit for IT managers and security champions to build phishing resilience across their organization. Includes 12 annotated realistic phishing email templates across 6 attack types (CEO fraud, vendor invoice, job recruitment scam, package delivery, password expiry, investment opportunity), a red-flag analysis framework, a 30-day simulation playbook with escalation cadence, and a post-incident containment checklist.',
    readingTime: '20 min read',
    level: 'Intermediate',
    targetAudience: 'IT managers, security trainers, HR and compliance officers, team leads, CISOs of small organizations, managed service providers delivering security training to clients',
    keyHighlights: [
      '12 annotated phishing email samples with attack motivation, red flags annotated per line, and correct处置 response',
      'Red-flag analysis framework: a 10-question checklist applied to any inbound message to determine phishing probability',
      '30-day simulation calendar: 4-week rolling cadence with increasing sophistication from baseline to targeted executive simulation',
      'Post-click containment checklist: what to do when an employee reports a click or enters credentials',
      'Click vs report rate tracking template: measuring security culture improvement over time',
      'Executive briefing template for communicating phishing simulation results to leadership'
    ],
    useCases: [
      'Running a monthly phishing simulation for all employees as part of a continuous security awareness program',
      'Onboarding new employees with a 1-hour phishing awareness session before granting email access',
      'Preparing senior executives for targeted spear-phishing campaigns that use public LinkedIn information',
      'Designing a phishing detection competition with leaderboard and small incentives to drive engagement',
      'Measuring the effectiveness of security training by tracking click rates and report rates quarter over quarter',
      'Responding to a real phishing incident where an employee has entered credentials on a convincing fake login page'
    ],
    previewContent: [
      'Sample Phish 1 - CEO Wire Transfer: Subject: "Urgent - are you at your desk?" Body: "Are you at your desk? I need you to process a confidential wire of $48,500 to a new vendor today. Do not loop in finance yet, I will explain later. Sent from my personal email while in meetings." Motivation: urgency + authority + secrecy + financial request. Red Flags: (1) Personal email used for business request. (2) Instruction to bypass normal process. (3) Unusual urgency. (4) Large unexpected transfer.',
      'Drill Cadence: Week 1 - Baseline simulation (generic "password expiry" phish) to establish click/report rates. Week 2 - Targeted simulation based on department (HR gets "job application" phish, Finance gets "invoice" phish). Week 3 - Executive spear-phish using publicly available LinkedIn information about the CEO. Week 4 - Recognition competition with leaderboard, prizes for most reports submitted, and team debrief.',
      'Containment Checklist (if credentials entered): (1) Immediately reset the compromised account password from a clean device. (2) If the fake login page is still live, report it to the relevant brand (Google, Microsoft, etc.) via their phishing report form. (3) Check account activity log for any unauthorized access. (4) Enable MFA on the account if not already active. (5) Notify IT security team for monitoring. (6) Document the incident in the security log.'
    ],
    downloadName: 'CS_Academy_Phishing_Defense_Drill.pdf'
  },
  {
    id: 'ai-literacy-curriculum',
    title: 'AI Literacy Curriculum - 6-Module Classroom Kit',
    category: 'Education',
    format: 'Toolkit',
    description: 'A complete 6-module classroom-ready curriculum for introducing secondary and early-university students to how AI actually works, what it can and cannot do, its societal implications, and how to use it responsibly. Each module includes a 60-minute lesson plan, hands-on no-code activities, discussion prompts, student worksheets, and assessment rubrics. Designed for East African classrooms with limited computing infrastructure but smartphone access.',
    readingTime: '25 min read',
    level: 'Beginner',
    targetAudience: 'Secondary school teachers (Forms 1–6), university lecturers teaching introductory technology or digital literacy courses, coding bootcamp facilitators, NGO youth program coordinators, STEM club mentors',
    keyHighlights: [
      '6 complete 60-minute lesson plans with timing breakdowns, facilitation scripts, and common student misconception alerts',
      'No-code AI experiments: using Teachable Machine, Quick Draw, and Talk to Transformer for hands-on understanding without programming',
      'Bias and ethics discussion modules: examining whose perspectives AI systems encode and what that means for East African societies',
      'Misinformation and deepfake detection lab: students create and then identify synthetic media',
      'Student assessment rubrics: knowledge check, reflection journal, and a capstone AI-for-good project brief',
      'Teacher preparation checklist: what to install, set up, or preview before each 60-minute session'
    ],
    useCases: [
      'Teaching a one-term AI literacy elective (6 weeks, 2 sessions per week) in a secondary school computer lab',
      'Running a 3-day intensive AI awareness bootcamp for university freshmen during orientation week',
      'Supplementing an existing Computer Studies syllabus with contemporary AI content that is examinable',
      'Delivering a Saturday STEM club session on AI fundamentals to mixed-age secondary students',
      'Preparing students for a world where AI-augmented workflows are standard in any career they enter',
      'Assessing whether students can distinguish between AI capability claims and AI hype after 6 sessions'
    ],
    previewContent: [
      'Module 1 - What Is AI Really? (60 min): Students train a simple image classifier in 10 minutes using Google\'s Teachable Machine (no account required). Then the class examines where it fails - on unfamiliar faces, unusual lighting, non-Western contexts - and discusses WHY it fails. Key insight: AI learns from data, and if the data is biased, the AI is biased. No technical background needed for teacher or students.',
      'Module 3 - Language Models and Stochastic Parrots: The class builds a "stochastic parrot" together - each student writes the next word in a story based only on the previous word. Compare this to what a language model does. Discuss: Is this intelligence? Is this understanding? What can it do well? What will it always get wrong?',
      'Capstone Project Brief: Identify a real problem in your school or community. Design an AI-assisted solution that addresses the problem AND includes a one-page risk and ethics assessment: What could go wrong? Who could be harmed? How would you mitigate that? Present the solution and the ethics assessment together.'
    ],
    downloadName: 'CS_Academy_AI_Literacy_Curriculum.pdf'
  },
  {
    id: 'stem-education-ai-tools',
    title: 'STEM Education AI Tools - Subject-by-Subject Guide',
    category: 'Education',
    format: 'PDF Guide',
    description: 'A curated catalog of the most effective AI tools for teaching and learning STEM subjects - Mathematics, Physics, Chemistry, Biology, and Computer Science - with a comprehensive comparison matrix, subject-specific prompt packs, no-code experiment tools, and academic integrity guardrails. Includes recommended tool combinations by subject, cost (free vs paid), device requirements, and learning outcome alignment notes.',
    readingTime: '20 min read',
    level: 'Intermediate',
    targetAudience: 'STEM teachers, school IT coordinators, curriculum designers, university teaching assistants, home-school parents, tutoring center directors',
    keyHighlights: [
      'Subject-by-subject AI tool comparison matrix: 24 tools rated on accuracy, ease of use, free tier availability, and learning value',
      'Mathematics prompt pack: step-by-step problem solving, error identification, similar problem generation, and formula derivation explanations',
      'Physics and Chemistry prompt pack: conceptual explanations with real-world East African examples, lab simulation prompts, and unit conversion assistants',
      'Biology prompt pack: multi-level explanations (child, high school, undergrad), ecological examples from East African ecosystems, and vocabulary building',
      'Computer Science prompt pack: code debugging, algorithm explanation, code review, and pair programming patterns',
      'Academic integrity guardrails: how to design AI-aware STEM homework that preserves learning outcomes'
    ],
    useCases: [
      'Replacing traditional static homework with AI tutor sessions that adapt to the student\'s exact level of misunderstanding',
      'Generating a differentiated practice problem set where every student in a class of 40 gets a unique but equivalent problem',
      'Using AI to visualize abstract physics concepts - projectile motion, electromagnetic fields, wave interference - through descriptive analogies',
      'Introducing programming with AI pair programming where the AI explains errors in real time in plain English',
      'Creating a biology revision session focused on the student\'s specific weak areas identified through an AI-generated diagnostic quiz',
      'Preparing lab reports with AI assistance that teaches scientific method and data interpretation rather than replacing them'
    ],
    previewContent: [
      'Mathematics Prompt Pack: (1) "Solve this quadratic equation step-by-step. Then create 2 similar problems at the same difficulty level for me to practice. Check my work when I show you my answer." (2) "I got the answer [X] but the correct answer is [Y]. Walk me through where my thinking went wrong without giving me the full solution." (3) "Explain why this formula works using a real-world example a market trader would understand."',
      'Physics Prompt Pack: "Explain [concept] at three levels: a Primary 6 student, a Form 4 physics student, and a first-year engineering student. For each level, use an analogy from the following East African contexts: [farming, trading at a market, public transport]." This ensures the explanation connects to lived experience rather than abstract Western-centric examples.',
      'Academic Integrity Guardrail for Math: AI should be used to generate similar practice problems and check work, NOT to solve the assigned problem set. Design assignments where the process is documented: submit the AI conversation transcript (showing the prompts used and the AI\'s responses) alongside the student\'s handwritten or typed solutions, demonstrating that the student can explain each step.'
    ],
    downloadName: 'CS_Academy_STEM_Education_AI_Tools.pdf'
  },
  {
    id: 'corporate-ai-ethics-policy',
    title: 'Corporate AI Ethics Policy - Board-Ready Template',
    category: 'AI Governance',
    format: 'PDF Guide',
    description: 'A comprehensive, fill-in-the-blank AI ethics policy template for organizations adopting AI systems. Covers all critical governance dimensions: fairness, transparency, accountability, human oversight, data governance, bias monitoring, incident response, and stakeholder grievance mechanisms. Aligned with the EU AI Act (2024), NIST AI Risk Management Framework, and African Union Continental AI Strategy (2024). Includes board presentation talking points and a gap analysis worksheet.',
    readingTime: '25 min read',
    level: 'Advanced',
    targetAudience: 'Boards of directors, executive leadership teams, compliance officers, legal counsel, risk managers, DPOs, chief AI officers, management consultants advising on AI governance',
    keyHighlights: [
      '14-clause policy covering the full AI lifecycle: procurement, deployment, monitoring, and decommissioning',
      'Role-specific accountability matrix: who owns what AI governance responsibility from board to front-line employee',
      'EU AI Act risk classification guidance: mapping your AI systems to the appropriate risk tier (unacceptable, high, limited, minimal)',
      'Bias testing and fairness monitoring requirements: metrics, frequency, and escalation thresholds',
      'Whistleblower and grievance procedure template for AI-related harms',
      'Board presentation deck: 12 slides explaining the policy to non-technical board members with risk scenarios'
    ],
    useCases: [
      'Drafting a first AI ethics policy for a mid-sized company adopting AI in HR, credit, or customer service',
      'Updating an existing ICT or data protection policy to specifically address generative AI risks',
      'Responding to a procurement questionnaire from a government or donor partner asking about AI governance',
      'Aligning cross-departmental AI usage standards across HR, marketing, operations, and finance teams',
      'Preparing for a regulatory review or AI certification process from a national ICT authority',
      'Training the board on fiduciary duty with respect to AI risk oversight'
    ],
    previewContent: [
      'Clause 4 - Human Oversight: "No AI system shall make final decisions affecting employment, creditworthiness, educational access, or public service delivery without documented human review by an accountable officer. The accountable officer must have the authority to override, suspend, or escalate any AI decision. Human oversight mechanisms shall be tested at least annually and documented in the AI register."',
      'Clause 7 - Transparency: "Any customer-facing or beneficiary-facing AI interaction must disclose its AI nature within the first two conversational turns or before collecting personal data, in plain language appropriate to that audience. Disclosure must not be buried in terms of service. Alternative non-AI channels must be available and accessible."',
      'Clause 11 - Bias Monitoring: "High-risk AI systems (as classified under the EU AI Act Annex III) must be re-evaluated for disparate impact across protected characteristics at least every 12 months. Results must be reported to the Audit Committee and made available to the relevant regulator upon request. Where disparate impact above [defined threshold]% is identified, deployment must be suspended until remediation is complete and verified."'
    ],
    downloadName: 'CS_Academy_Corporate_AI_Ethics_Policy.pdf'
  },
  {
    id: 'ai-procurement-checklist',
    title: 'AI Procurement & Vendor Evaluation Checklist',
    category: 'AI Governance',
    format: 'Checklist',
    description: 'A comprehensive vendor evaluation checklist for buying, licensing, or contracting AI tools - whether a point solution SaaS, an enterprise platform with AI features, or a custom AI development engagement. Covers data rights, model transparency, security posture, operational reliability, and exit strategy. Includes 40+ due-diligence questions, a vendor scoring matrix, and contract clause templates for the most critical negotiation points.',
    readingTime: '18 min read',
    level: 'Intermediate',
    targetAudience: 'Procurement officers, CTOs, IT security managers, legal and compliance teams, finance teams approving software budgets, startups evaluating AI API costs',
    keyHighlights: [
      '40+ due-diligence questions organized by category: data rights, model transparency, security, reliability, cost, and exit',
      'Data ownership and training rights clause analysis: what to look for and what to negotiate',
      'Model Card and System Card requirement template: minimum information a responsible AI vendor should provide',
      'Security posture requirements: SOC 2 Type II, penetration testing frequency, data residency, and breach notification SLAs',
      'Exit strategy and data portability: contract clauses that protect you when the vendor fails, is acquired, or raises prices',
      'Vendor scoring matrix: weighted evaluation across 8 dimensions for side-by-side vendor comparison'
    ],
    useCases: [
      'Evaluating a generative AI SaaS subscription for a marketing team before signing an annual contract',
      'Reviewing an AI-powered HR recruitment tool from a data protection and bias perspective before onboarding',
      'Conducting a procurement gate review when AI features are being added to an existing enterprise software contract',
      'Comparing two vendors with similar capabilities on equal terms using the structured scoring matrix',
      'Negotiating data rights with an AI vendor who initially refuses to remove training data clauses',
      'Auditing an existing AI vendor relationship for compliance with updated internal governance standards'
    ],
    previewContent: [
      'Question 1 - Data Rights (Critical): "Confirm in writing: customer data is NOT used to train the vendor\'s foundation models, fine-tuned models, or any model offered to other customers, whether by default or by opt-out. Provide the exact opt-out mechanism and confirm it is activated for our account." If the vendor cannot confirm this in writing, do not proceed.',
      'Question 12 - Model Card: "Provide a completed Model Card and System Card for the AI system we would be using, describing: (a) training data sources and geographic origin, (b) known limitations and failure modes, (c) benchmarked performance on relevant tasks, (d) bias evaluation results on East African or African populations if available." A vendor that cannot provide this should be treated as a higher-risk choice.',
      'Exit Clause Checklist: "[ ] Vendor commits to full data export in standard format (JSON/CSV/API) within 30 days of contract termination. [ ] Vendor commits to permanent deletion of all customer data within 30 days of contract termination. [ ] Vendor provides 12 months\' notice before discontinuing the service. [ ] Source code and model weights are released to customer if vendor discontinues support for a custom model."'
    ],
    downloadName: 'CS_Academy_AI_Procurement_Checklist.pdf'
  },
  {
    id: 'responsible-ai-principles',
    title: 'Responsible AI Principles Toolkit - 7 Dimensions',
    category: 'AI Governance',
    format: 'Toolkit',
    description: 'A practitioner-oriented toolkit that unpacks 7 core responsible AI principles - Fairness, Privacy, Transparency, Accountability, Safety, Sustainability, and Human Agency - each with a diagnostic question set, red-line deployment thresholds, and a lightweight review checklist for agile teams. Includes a workshop facilitation guide for running a 2-hour principled AI review session and a decision tree for escalate-or-proceed determinations.',
    readingTime: '20 min read',
    level: 'Intermediate',
    targetAudience: 'AI product managers, data scientists and ML engineers, policy teams, ethics reviewers, innovation leads, startup CTOs, government AI strategy officers',
    keyHighlights: [
      '7 principles with diagnostic questions tailored to each: practical tests rather than abstract philosophical discussions',
      'Red-line scenarios: conditions under which deployment should be halted regardless of business pressure',
      'Lightweight review checklist: 15 questions that can be completed in 30 minutes by a cross-functional team',
      'Escalate-or-proceed decision tree: structured guidance for determining when a project needs senior review',
      'Case studies of AI failures in Africa and their root causes mapped to each principle',
      'Workshop facilitator guide: running a 2-hour responsible AI review session with product and engineering teams'
    ],
    useCases: [
      'Reviewing a new AI feature in a product before it ships to users',
      'Running a quarterly responsible AI audit of existing AI systems in production',
      'Training a cross-functional product squad on ethical AI review as part of their process',
      'Documenting AI decisions and trade-offs for a regulatory submission or public accountability report',
      'Assessing a government AI system before deployment to ensure it does not discriminate against marginalized groups',
      'Building a responsible AI culture by integrating these principles into sprint reviews and design critiques'
    ],
    previewContent: [
      'Principle 1 - Fairness: Diagnostic Questions: (1) "Across our user segments, what is the variance in false-positive and false-negative rates? If any segment is more than 20% worse, we have a fairness problem." (2) "Whose voices and perspectives were in the training data? Whose were excluded?" (3) "If this AI were publicly known to make this decision, would our users and stakeholders consider it fair?"',
      'Red-Line Scenario (Fairness): An AI system that scores loan eligibility and disproportionately rejects applicants from a specific region, ethnic group, or gender at a rate more than 20% above the baseline must NOT be deployed until the disparity is documented, root-cause-analyzed, justified with evidence, and remediated. Business pressure is not an acceptable reason to bypass this threshold.',
      'Human Agency Principle: "Affected individuals must always retain the meaningful ability to challenge, opt out of, or seek human review of any AI decision that materially affects them." Diagnostic: "Can a rejected applicant speak to a human who can override this decision? Is that human empowered with actual override authority, or are they just documenting the AI\'s decision?"'
    ],
    downloadName: 'CS_Academy_Responsible_AI_Principles.pdf'
  },
  {
    id: 'browser-privacy-hardening',
    title: 'Browser Privacy Hardening - Complete Configuration Guide',
    category: 'Privacy',
    format: 'PDF Guide',
    description: 'A step-by-step configuration guide for hardening your web browser against trackers, fingerprinting scripts, and third-party data collection while maintaining usability. Covers Chrome, Firefox, Safari, and mobile browsers. Includes recommended privacy extensions with optimal configurations, DNS-level protection setup, search engine alternatives, and per-profile browser separation for work versus personal versus financial browsing.',
    readingTime: '16 min read',
    level: 'Intermediate',
    targetAudience: 'Privacy-conscious professionals, journalists, researchers, activists, security teams, legal professionals, anyone handling sensitive information in a browser',
    keyHighlights: [
      'Extension stack recommendation: uBlock Origin + Privacy Badger + HTTPS Everywhere + Bitwarden - with optimal configuration for each',
      'Fingerprint resistance setup: disabling unnecessary APIs, using a common screen resolution, and enabling containers',
      'DNS-over-HTTPS configuration and privacy-focused DNS providers (Cloudflare, Quad9, NextDNS)',
      'Search engine alternatives: DuckDuckGo, Startpage, Brave Search - with quality comparison against Google',
      'Firefox Multi-Account Containers and Chrome Profile separation for isolating work, personal, and financial logins',
      'Mobile browser hardening: Chrome Android and Safari iOS privacy settings with screenshots guidance'
    ],
    useCases: [
      'Hardening a browser used for sensitive research where search history must not be exposed to third parties',
      'Separating work (Google Workspace), personal (Facebook, WhatsApp Web), and financial (banking) logins into isolated browser containers',
      'Reducing ad tracking across the entire household\'s devices by changing the DNS resolver at the router level',
      'Defending against browser fingerprinting as a journalist accessing sensitive source documents',
      'Setting up a干净 browsing environment for accessing government and banking portals without cross-site tracking',
      'Configuring a secondary browser profile with maximum privacy for whistleblower and source communications'
    ],
    previewContent: [
      'Extension Stack - Installed and Configured: (1) uBlock Origin - enable "I am an advanced user" in settings, add your most-visited sites to "trusted sites", block all third-party fonts and scripts by default. (2) Privacy Badger - learn mode on for 1 week, then review and confirm blocked trackers. (3) HTTPS Everywhere - enable "Encrypt All Sites Eligible" (EASE). (4) Bitwarden or 1Password - auto-fill off by default, only auto-fill on the password manager\'s own domain.',
      'Fingerprint Resistance Setup: Your browser fingerprint is a unique combination of screen resolution, installed fonts, installed extensions, timezone, language, and GPU rendering. The single most effective step: use Firefox at a standard 1920�--1080 or 1366�--768 resolution with the same extension set as millions of other users. Avoid custom fonts. Use a common timezone. Brave Browser also offers built-in fingerprint randomization.',
      'DNS Configuration (Router Level - Protects All Devices): Change your router\'s DNS servers from your ISP\'s default to: Primary: 1.1.1.1 (Cloudflare) or 9.9.9.9 (Quad9), Secondary: 8.8.8.8. This encrypts DNS lookups for every device in your home or office, preventing your ISP from logging every website you visit.'
    ],
    downloadName: 'CS_Academy_Browser_Privacy_Hardening.pdf'
  },
  {
    id: 'identity-theft-recovery',
    title: 'Identity Theft & Digital Identity Recovery Playbook',
    category: 'Privacy',
    format: 'PDF Guide',
    description: 'A structured 72-hour emergency response playbook for containing financial and reputational damage when an identity is stolen - covering SIM swap fraud, mobile money account hijacking, social media account takeover, and fraudulent loan applications opened in your name. Includes regional contact directories for Tanzania, Kenya, and Uganda, and a 30-day recovery timeline with documented evidence requirements for legal proceedings.',
    readingTime: '22 min read',
    level: 'Intermediate',
    targetAudience: 'Anyone who has experienced or suspects they have experienced identity theft, fraud survivors, legal aid providers, community paralegals, victim support organizations',
    keyHighlights: [
      '72-hour containment playbook: precise steps with time stamps for the first 2, 24, and 48 hours after discovering identity theft',
      'Mobile money and banking incident response: freezing accounts, disputing transactions, and recovering funds',
      'Social media account recovery procedures for Facebook, Instagram, WhatsApp, LinkedIn, and X',
      'Credit bureau fraud alert and credit freeze procedures for Tanzania (CRB), Kenya (CRB Kenya), and Uganda (UCRB)',
      'Documentary evidence requirements for police reports and legal proceedings in each country',
      '30-day identity restoration timeline: monitoring, disputes, and emotional recovery'
    ],
    useCases: [
      'Responding to a stolen SIM that has been used to access mobile money and banking apps',
      'Recovering a hijacked business Instagram account that is being used to scam customers',
      'Disputing fraudulent mobile loans that were taken out using stolen ID documents',
      'Cleaning up digital identity after a phishing attack exposed banking credentials',
      'Filing a police report that meets the evidentiary standards required for a financial fraud case',
      'Supporting a family member or client through the identity recovery process with a structured checklist'
    ],
    previewContent: [
      'Hour 0–2 - Immediate Containment: (1) Call your mobile operator\'s fraud desk (save the official number in your contacts NOW) to request immediate SIM freeze or port block. Do NOT use a number from a Google search result - use the number on the back of your SIM card or your operator\'s official app. (2) Call your primary bank to freeze internet banking access and request a new login credential. (3) If mobile money is involved, call the provider\'s fraud line to attempt transaction reversal.',
      'Hour 2–24 - Official Reporting: (1) File a police report at your nearest police station and obtain a case number. Tell them specifically: "This is a case of identity theft and electronic fraud." Request a certified copy. (2) Contact the mobile operator\'s fraud team in writing with the police report attached. (3) Notify your bank in writing with the case number. (4) Begin monitoring your credit bureau file.',
      'Day 2–30 - Long-Term Restoration: (1) Submit a fraud alert to the credit reference bureau in your country with the police case number attached. (2) Dispute any fraudulent accounts in writing, providing certified police report and ID copies. (3) Request a 90-day credit monitoring service from your bank. (4) Change passwords on all accounts from a known-secure device. (5) Consider a credit freeze if the fraud was extensive.'
    ],
    downloadName: 'CS_Academy_Identity_Theft_Recovery.pdf'
  },
  {
    id: 'digital-entrepreneur-security',
    title: 'Digital Entrepreneur Security - Founder\'s Essential Handbook',
    category: 'Business',
    format: 'PDF Guide',
    description: 'A founder-focused security handbook covering the complete digital footprint of an early-stage business: laptop hygiene, business email and domain protection, social media handle security, customer data handling, legal basics, and ransomware recovery. Includes a 30-60-90 day security roadmap for startups and a supplier security questionnaire template for vetting third-party tools.',
    readingTime: '20 min read',
    level: 'Intermediate',
    targetAudience: 'Solo founders, co-founders, freelancers, e-commerce operators, agency owners, consultants, tech startup teams, anyone running a business from personal devices',
    keyHighlights: [
      'Business digital identity separation: why using personal WhatsApp and personal Gmail for business is a security and brand risk',
      'Business email domain security: SPF, DKIM, DMARC setup and why it prevents CEO fraud impersonation',
      'Hardware security keys (YubiKey, Titan) setup guide: the one intervention that stops 99% of account takeovers',
      'Customer data handling minimums: what you must do if you store any customer PII, and the 7-year retention rule for financial records',
      'Ransomware defense: the 3-2-1 backup rule with testing schedule, and the exact response when ransomware hits',
      '30-60-90 day security roadmap: startup-specific priorities without overwhelming a founder already stretched thin'
    ],
    useCases: [
      'Setting up a new online business\'s digital infrastructure from scratch with security baked in from day one',
      'Recovering from a hacked business email that sent phishing to the entire customer list',
      'Completing a first customer security questionnaire from a corporate client without a dedicated IT team',
      'Creating a 30-day security sprint that makes meaningful progress without requiring a security expert',
      'Protecting a startup\'s social media handles from being hijacked when the founder\'s personal email is compromised',
      'Understanding what data protection law applies to a small e-commerce business and what the minimum compliance steps are'
    ],
    previewContent: [
      'Rule 1 - Business Identity Separation: Use a dedicated business email (name@yourcompany.co.tz) and a dedicated business phone number from day one. Never run a business from a personal Gmail + personal WhatsApp. When the personal account gets compromised - and it will - the business goes with it. Business email on a custom domain gives you ownership, legitimacy, and recoverability that personal accounts cannot.',
      'Rule 2 - Hardware Security Keys: Enable a hardware security key (YubiKey NFC for mobile, or Google Titan Key for laptops) on your most critical accounts: business email, banking, domain registrar, and social media business accounts. Phishing-resistant FIDO2 WebAuthn MFA stops 99% of account takeover attacks. Authenticator apps stop 90%. SMS 2FA stops less than 50% against SIM-swap attacks.',
      'Rule 3 - Backup and Recovery: Follow the 3-2-1 rule: 3 copies of all critical business data, on 2 different media or platforms, with 1 copy stored offsite (cloud). Test restoration quarterly - not just that the backup ran, but that you can actually restore from it. Most businesses discover their backups are corrupt only when they need them.'
    ],
    downloadName: 'CS_Academy_Digital_Entrepreneur_Security.pdf'
  },
  {
    id: 'fintech-privacy-standards',
    title: 'Fintech Privacy & Data Standards Toolkit',
    category: 'Business',
    format: 'Toolkit',
    description: 'A technical and practical toolkit for fintech builders, product managers, compliance officers, and mobile money operators covering consent UX patterns, data minimization in KYC processes, third-party processor due diligence, and user-facing transparency obligations. Aligned with FATF Guidance on Digital Identity, Tanzania Digital Financial Services Licensing Framework, and Kenya Data Protection Act requirements.',
    readingTime: '22 min read',
    level: 'Advanced',
    targetAudience: 'Fintech founders, product managers, compliance officers, mobile money operators, payment service providers, financial inclusion program managers, RegTech product designers',
    keyHighlights: [
      'Consent UX patterns that pass regulatory review: layered notice design, granular consent toggles, and withdrawal mechanisms',
      'Data minimization playbook for KYC: what fields to collect, how to redact before storage, and automatic deletion timers',
      'Third-party processor due diligence template: a 20-question checklist for vetting any payment processor, data analytics tool, or AI API vendor',
      'Customer-facing privacy notice library: plain-language templates for mobile money apps, lending platforms, and savings products',
      'Data subject access request (DSAR) handling workflow with 30-day response templates',
      'Regulatory inspection preparation checklist for BOT Tanzania, CMA Kenya, and financial intelligence unit submissions'
    ],
    useCases: [
      'Designing a KYC onboarding flow that meets regulatory requirements without over-collecting personal data',
      'Reviewing a third-party AI credit-scoring API integration for data protection compliance before signing the contract',
      'Handling a DSAR from a customer who wants to know exactly what data the company holds on them and what it is used for',
      'Preparing for a regulatory inspection from the Bank of Tanzania or Capital Markets Authority Kenya',
      'Drafting a privacy notice for a mobile savings and lending product in plain local language and English',
      'Auditing existing data integrations with third-party processors to identify data over-sharing'
    ],
    previewContent: [
      'Pattern 1 - Layered Consent Design: Top layer (required for service): "We verify your identity to comply with anti-money-laundering regulations. Your data is encrypted and never sold." Deep link to full legal basis, data retention schedule, and third-party sharing disclosure. Do NOT use a consent wall that prevents service access if the user declines optional data processing. Optional processing (marketing, analytics) must be genuinely optional.',
      'Pattern 2 - KYC Data Minimization: Collect only what the regulator explicitly requires for your license type. For a mobile lending app, that might be: national ID number, selfie, mobile money number, and employment status. Do NOT collect: home address, family member details, or health information unless specifically required. Redact the ID number digits beyond the last 4 before storing. Set automatic deletion timers - 7 years for financial records, 30 days for declined applicants.',
      'Template Clause - Customer-Facing: "We process your personal data to provide [service name] and to comply with anti-money-laundering and financial services regulations. We may share your data with [third parties] only as required by law. You have the right to: access your data, correct inaccurate data, request deletion, and object to specific processing. Contact our Data Protection Officer at [dpo@company.co.tz] to exercise these rights."'
    ],
    downloadName: 'CS_Academy_Fintech_Privacy_Standards.pdf'
  },
  {
    id: 'customer-trust-blueprint',
    title: 'Customer Trust & Transparency Blueprint',
    category: 'Business',
    format: 'PDF Guide',
    description: 'A practical small-business playbook for building customer trust through visible privacy practices, honest breach communication, and security signals that do not require an enterprise budget. Includes plain-language privacy notice templates, trust signal placement guide for websites and checkout pages, breach communication scripts, and customer support conversation guides for security questions.',
    readingTime: '16 min read',
    level: 'Beginner',
    targetAudience: 'Small business owners, e-commerce operators, customer service leads, marketing teams, startup founders, NGO program managers accepting donor data',
    keyHighlights: [
      'Plain-language privacy notice templates: 30-second version, 2-minute version, and full legal version for a website footer',
      'Trust signal stacking: the optimal combination of visible security indicators for checkout pages, lead capture forms, and client onboarding',
      'Breach communication scripts: how to tell customers about a security incident without inducing panic or destroying trust',
      'Customer support security FAQ: prepared answers for the 10 most common customer security questions',
      'Building a "Why trust us" page: what to include for a small business that lacks the brand recognition of a large bank',
      'Reputation recovery playbook: how to rebuild customer trust after a security incident that made headlines'
    ],
    useCases: [
      'Writing a privacy notice for a new e-commerce store that is legally adequate and customer-friendly',
      'Responding to a customer email asking exactly how their personal data is used, stored, and protected',
      'Communicating a security incident to 5,000+ customers without causing a bank run equivalent on the business',
      'Building a "Why trust us with your data" section for a small business website that converts skeptical visitors',
      'Training customer support staff on how to answer "Is my payment information safe with you?" with confidence and honesty',
      'Creating a trust-first onboarding sequence for a new digital financial service that reduces drop-off at the KYC stage'
    ],
    previewContent: [
      'Minimal Privacy Notice (Website Footer): "We collect your name, email, and delivery address to send your order. Payment is processed by [Payment Provider] - we never see or store your card details. We never sell your data. You can request deletion of your account and data at any time by emailing [privacy@company.co.tz]. We\'ll respond within 7 days."',
      'Trust Signal Stack for Checkout Pages (in order of impact): (1) HTTPS padlock with your company name in the certificate - not just "Secure". (2) "We never see your card details" badge from your payment processor. (3) A named human customer support contact with photo. (4) Physical business address (even if a virtual office) - not a P.O. Box. (5) Links to your data protection policy and terms of service.',
      'Breach Communication Script: "We recently identified and quickly resolved a security issue that may have affected [specific data type, not all data]. As soon as we discovered it, we [specific action taken]. Your [specific data type] has been secured. Here is exactly what happened, here is what we did, and here is what you should do as a precaution [specific action]. We are available at [contact] to answer any questions. We will notify you if this changes."'
    ],
    downloadName: 'CS_Academy_Customer_Trust_Blueprint.pdf'
  }
];


