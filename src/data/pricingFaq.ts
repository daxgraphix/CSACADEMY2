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
      'Start with the format you want. WhatsApp Micro-Learning (TSh 20,000/month) suits people who want short lessons on a phone. Self-Paced Video Platform (TSh 30,000/month) gives you the full library on demand. Live Cohorts (TSh 50,000/month) adds scheduled live sessions with an instructor and feedback on your work. If you want every channel plus the annual pass, that is TSh 135,000/year. Tell us your goal and current skill level and we will recommend a plan before you pay anything.'
  },
  {
    id: 'how-much-is-a-live-cohort',
    question: 'How much does the live cohort cost?',
    answer:
      'The live cohort plan is TSh 50,000 per month, or KES 2,700 / USD 20 for learners outside Tanzania. Enrollment closes three days before each cohort starts, and cohort seats are limited so that every learner gets instructor feedback.'
  },
  {
    id: 'which-payment-methods-do-you-accept',
    question: 'Which payment methods can I use?',
    answer:
      'We accept M-Pesa, Tigo Pesa, Airtel Money, and HaloPesa for East African mobile money, plus Visa, Mastercard, and bank transfer. Mobile money payments are confirmed by SMS and email, and we issue a receipt for every payment.'
  },
  {
    id: 'can-i-pay-in-installments',
    question: 'Can I pay in installments?',
    answer:
      'Yes. For multi-week bootcamps and masterclass tracks we offer a two-part plan: 50% at registration and the remaining 50% midway through the cohort. Message us on WhatsApp and we will set it up with a proforma invoice.'
  },
  {
    id: 'do-organizations-get-custom-pricing',
    question: 'We are a company or institution — do we get custom pricing?',
    answer:
      'Yes. On-site physical training starts at TSh 1,215,000, and workshops and seminars start at TSh 465,000, but both are scoped to your team size, location, and curriculum. Request a proposal and an advisor will come back within one business day with a costed outline.'
  },
  {
    id: 'is-there-a-refund-policy',
    question: 'What happens if I cannot make it to a live session?',
    answer:
      'Live cohort sessions are recorded and posted to the course area, so you can catch up without losing the fee. If you cancel more than seven days before a cohort starts, we move you to the next cohort at no extra cost. Direct any cancellation or refund request to support and we will confirm in writing.'
  },
  {
    id: 'what-do-i-need-to-start',
    question: 'What do I need to start?',
    answer:
      'A phone or laptop with a modern browser and a WhatsApp account is enough. There is no technical background required, no heavy software to install, and no high-spec hardware. Lessons are available in English with local-language support where the program allows.'
  }
];
