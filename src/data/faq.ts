import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  // 1. Course Access
  {
    id: 'how-to-access-courses',
    question: 'How do I access my course materials after enrolling?',
    answer: 'After your enrollment and payment or another agreed arrangement are confirmed, our team sends the access instructions for your selected plan. Available materials and delivery channels depend on the plan.',
    category: 'Course Access'
  },
  {
    id: 'lifetime-access',
    question: 'How long can I access course materials?',
    answer: 'Access duration depends on the plan and course. Ask us to confirm the materials, access period, and any recording availability before you enroll.',
    category: 'Course Access'
  },
  {
    id: 'mobile-learning-access',
    question: 'Can I study using just a smartphone without a computer?',
    answer: 'Many learning materials and enquiry options are designed to work on a smartphone. Requirements vary by course; live classes and some practical exercises may work best on a computer.',
    category: 'Course Access'
  },
  {
    id: 'offline-download-materials',
    question: 'Can I download lessons for offline study?',
    answer: 'Download availability depends on the course materials and plan. Contact us before enrolling if offline access is important to you.',
    category: 'Course Access'
  },

  // 2. Payment Methods
  {
    id: 'mobile-money-payments',
    question: 'How do I get payment instructions?',
    answer: 'Payment options depend on your country and training plan. Contact us before paying and we will confirm the available method, exact amount, and instructions. This website does not collect payment details or take payment.',
    category: 'Payment & Mobile Money'
  },
  {
    id: 'installment-payments',
    question: 'Are installment or split-payment plans available for bootcamps?',
    answer: 'Installment options depend on the course and enrollment arrangement. Confirm whether installments are available and agree on the schedule with our team before paying.',
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
    answer: 'Contact us with your organization’s invoicing requirements. We will confirm which documents we can provide for your location and training arrangement before you proceed.',
    category: 'Payment & Mobile Money'
  },

  // 3. Technical Support
  {
    id: 'learner-support-helpdesk',
    question: 'What technical support is provided if I get stuck on a coding or AI exercise?',
    answer: 'Support depends on the course and plan. Check the plan details or ask us whether instructor Q&A, peer discussion, or technical help is included.',
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
    answer: 'Connection needs depend on your course and delivery format. Live video needs a reliable connection; ask us about lower-bandwidth materials or WhatsApp options before enrolling.',
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
    question: 'Are certificates available?',
    answer: 'Certificate availability and requirements depend on the course. Please confirm the certificate type and completion criteria with us before enrolling.',
    category: 'General'
  },
  {
    id: 'teach-in-english',
    question: 'Do you teach in English or local languages?',
    answer: 'Instruction and course materials are in English. Some examples may reference local contexts, but we do not currently promise instruction or support in a local language.',
    category: 'General'
  },
  {
    id: 'customized-training',
    question: 'Can organizations request customized private on-site training?',
    answer: 'Organizations can contact us to discuss a tailored session. We will confirm the scope, delivery format, schedule, participant count, and price in writing before an engagement is agreed.',
    category: 'Organizations'
  }
];
