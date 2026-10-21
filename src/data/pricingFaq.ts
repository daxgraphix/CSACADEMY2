/**
 * Pricing-page FAQ.
 *
 * Answers the questions buyers actually ask before paying: which plan suits
 * which goal, what a month costs, how payment works locally, and what an
 * organization gets. Prices quoted here match `pricingPlansData`.
 */

export interface PricingFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const pricingFaqData: PricingFaqItem[] = [
  {
    id: 'which-plan-should-i-choose',
    question: 'Which plan is right for me?',
    answer:
      'Choose based on how you prefer to learn. WhatsApp Micro-Learning is TSh 20,000/month for short materials shared by WhatsApp. Self-Paced Video Platform is TSh 30,000/month for the materials included with that enrollment. Live Cohorts are TSh 50,000/month for scheduled instructor-led sessions. Annual Learning Plan is TSh 135,000/year; ask us which formats and courses are included before enrolling. We can confirm access duration, support, and payment details before you pay.'
  },
  {
    id: 'how-much-is-a-live-cohort',
    question: 'How much does the live cohort cost?',
    answer:
      'The live cohort plan is TSh 50,000 per month, KES 2,700 per month, or USD 20 per month. Ask us to confirm the next schedule and availability before enrollment.'
  },
  {
    id: 'which-payment-methods-do-you-accept',
    question: 'Which payment methods can I use?',
    answer:
      'Payment options depend on your country and the training plan. Send an enrollment inquiry first; our team will confirm available methods, the exact amount, and payment instructions before you pay. This website does not collect payment details or take payment.'
  },
  {
    id: 'can-i-pay-in-installments',
    question: 'Can I pay in installments?',
    answer:
      'Payment arrangements depend on the course and plan. Ask us before paying; we will confirm whether an installment option is available and provide the agreed terms in writing.'
  },
  {
    id: 'do-organizations-get-custom-pricing',
    question: 'We are a company or institution. Do we get custom pricing?',
    answer:
      'Yes. Published starting prices are TSh 1,215,000 for on-site training and TSh 465,000 for workshops and seminars. Final scope and price depend on your team size, location, and curriculum. Request a proposal and we will follow up by email with next steps.'
  },
  {
    id: 'is-there-a-refund-policy',
    question: 'What happens if I cannot make it to a live session?',
    answer:
      'Please ask about rescheduling and cancellation terms before paying. The terms for your selected course or plan will be confirmed with your enrollment details.'
  },
  {
    id: 'what-do-i-need-to-start',
    question: 'What do I need to start?',
    answer:
      'A phone or laptop with a modern browser and a WhatsApp account is enough. There is no technical background required, no heavy software to install, and no high-spec hardware. Course materials and instruction are in English.'
  }
];
