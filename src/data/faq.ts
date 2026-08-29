import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  // 1. Course Access
  {
    id: 'how-to-access-courses',
    question: 'How do I access my course materials after enrolling?',
    answer: 'Immediately upon enrolling and confirming payment, you receive instant access credentials via email and WhatsApp. You can stream HD video lessons via our web platform, join dedicated WhatsApp micro-learning study groups, or download PDF handbooks, starter prompt cheat sheets, and source code repositories directly to your device.',
    category: 'Course Access'
  },
  {
    id: 'lifetime-access',
    question: 'Do I get lifetime access to the courses and updates?',
    answer: 'Yes! All self-paced and cohort courses come with lifetime access to recorded video lectures, lesson notes, and future curriculum updates. You can revisit the material anytime at your own pace from your computer, tablet, or smartphone.',
    category: 'Course Access'
  },
  {
    id: 'mobile-learning-access',
    question: 'Can I study using just a smartphone without a computer?',
    answer: 'Absolutely! Our mobile-first delivery tier and WhatsApp micro-learning channels are specially optimized for smartphones. You can listen to high-yield audio lessons, view code slides, copy prompt templates, and participate in community discussions directly on your phone with zero heavy software installation.',
    category: 'Course Access'
  },
  {
    id: 'offline-download-materials',
    question: 'Can I download lessons for offline study when I have no internet?',
    answer: 'Yes. All course PDF workbooks, prompt toolkits, audio summaries, and cheatsheets are downloadable for offline reading. Video lessons can also be cached or accessed via our bandwidth-friendly audio-first WhatsApp track to save mobile data.',
    category: 'Course Access'
  },

  // 2. Payment Methods
  {
    id: 'mobile-money-payments',
    question: 'What payment methods do you accept? Can I pay via M-Pesa or Tigo Pesa?',
    answer: 'We support all major East African Mobile Money services including Vodacom M-Pesa, Tigo Pesa, Airtel Money, and Halopesa. We also accept Visa, Mastercard, and direct bank wire transfers. Mobile money payments are activated instantly with automated SMS/email confirmation.',
    category: 'Payment & Mobile Money'
  },
  {
    id: 'installment-payments',
    question: 'Are installment or split-payment plans available for bootcamps?',
    answer: 'Yes, for multi-week bootcamps and comprehensive masterclasses, we offer flexible two-part installment plans (50% deposit upon registration, and the remaining 50% midway through the cohort) to ensure financial accessibility for all dedicated learners.',
    category: 'Payment & Mobile Money'
  },
  {
    id: 'currencies-accepted',
    question: 'Which currencies are accepted?',
    answer: 'Our pricing is transparently listed in Tanzanian Shillings (TZS), Kenyan Shillings (KES), and US Dollars (USD). You can switch between currencies using our currency selector toggle at any time.',
    category: 'Payment & Mobile Money'
  },
  {
    id: 'corporate-invoicing',
    question: 'Can my company receive an official invoice and tax receipt (EFD/TRA)?',
    answer: 'Yes. For corporate sponsorships, institutional bulk enrollments, and NGO trainings, we generate formal proforma invoices, stamped tax receipts (TRA/EFD compliant in Tanzania, KRA compliant in Kenya), and structured vendor onboarding documentation.',
    category: 'Payment & Mobile Money'
  },

  // 3. Technical Support
  {
    id: 'learner-support-helpdesk',
    question: 'What technical support is provided if I get stuck on a coding or AI exercise?',
    answer: 'You are never on your own at CS Academy. Every student gets access to our active WhatsApp learner community and weekly live Q&A office hours where Alex and senior teaching assistants provide hands-on debugging, prompt review, and personalized guidance.',
    category: 'Technical Support'
  },
  {
    id: 'system-hardware-requirements',
    question: 'What computer hardware and internet speed do I need?',
    answer: 'You only need a basic laptop or smartphone capable of running a modern web browser (Google Chrome, Edge, Safari, or Firefox) and WhatsApp. Because we utilize cloud-based IDEs and browser-accessible AI interfaces, you do not need an expensive gaming laptop or high-end graphics card.',
    category: 'Technical Support'
  },
  {
    id: 'low-bandwidth-support',
    question: 'What if I have slow or intermittent internet connection?',
    answer: 'CS Academy is engineered specifically for African network realities. Our platform features an ultra-low data mode with compressed video streams, downloadable text-based workbooks, and audio-first WhatsApp modules that consume less than 10MB per lesson.',
    category: 'Technical Support'
  },

  // 4. General, Languages & Certificates
  {
    id: 'who-can-join',
    question: 'Who can join CS Academy?',
    answer: 'CS Academy welcomes students, university graduates, teachers, lecturers, entrepreneurs, corporate professionals, NGO workers, and leadership teams. Whether you have zero technical background or are an experienced professional looking to modernize your workflow with AI and cybersecurity, our courses are structured into clear, beginner-friendly and advanced professional tiers.',
    category: 'General'
  },
  {
    id: 'certificates-qr',
    question: 'Do you provide verified certificates with QR code verification?',
    answer: 'Yes! Upon completing any bootcamp or masterclass track, you receive a tamper-proof digital certificate embedded with a verifiable QR code and unique credential ID that employers, universities, and LinkedIn connections can instantly authenticate online.',
    category: 'General'
  },
  {
    id: 'teach-in-kiswahili',
    question: 'Do you teach in Kiswahili or English?',
    answer: 'We teach in both Kiswahili and English! Our instructors explain foundational concepts in clear, natural Kiswahili while simultaneously teaching the standard English industry terminologies, ensuring you gain both conceptual mastery and global workplace fluency.',
    category: 'General'
  },
  {
    id: 'customized-training',
    question: 'Can organizations request customized private on-site training?',
    answer: 'Yes, customized institutional training is one of our primary specialties. We collaborate closely with banks, universities, NGOs, financial institutions, and government agencies to design tailored curricula matching your internal software stack, security policies, and team skill levels.',
    category: 'Organizations'
  }
];
