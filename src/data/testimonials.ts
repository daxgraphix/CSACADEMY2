/**
 * Local proof — testimonials and graduate outcomes.
 *
 * These are placeholder, locally-credible stories. They use fictional names
 * and plausible outcomes so the site always reads as a trusted local
 * institution. Replace the quotes with real student submissions before
 * publishing; the structure stays the same.
 */

export interface Testimonial {
  name: string;
  role: string;
  city: string;
  country: string;
  quote: string;
  result: string;
  program: string;
  avatarInitials: string;
  avatarGradient: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Amina Juma',
    role: 'Marketing Officer',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    quote: 'I used to copy-paste the same prompt every week. After the AI for Everyone intensive I built a prompt library that cut my report prep from three hours to thirty minutes.',
    result: '3h → 30 min on weekly reports',
    program: 'AI for Everyone',
    avatarInitials: 'AJ',
    avatarGradient: 'linear-gradient(135deg,#B91C1C,#7F1D1D)'
  },
  {
    name: 'Patrick Otieno',
    role: 'Network Engineer',
    city: 'Nairobi',
    country: 'Kenya',
    quote: 'The cybersecurity workshop was the first training that actually stuck. I ran the phishing drill with my team and caught the test email on the first try.',
    result: 'Phishing catch rate 0% → 94% on team drill',
    program: 'Cybersecurity Awareness',
    avatarInitials: 'PO',
    avatarGradient: 'linear-gradient(135deg,#047857,#064E3B)'
  },
  {
    name: 'Grace Mwangi',
    role: 'University Lecturer',
    city: 'Arusha',
    country: 'Tanzania',
    quote: 'I replaced two hours of slide prep with AI-assisted lesson design and still teach critical thinking first. My students ask better questions than before.',
    result: '2h slide prep → 25 min',
    program: 'AI for Educators',
    avatarInitials: 'GM',
    avatarGradient: 'linear-gradient(135deg,#D97706,#78350F)'
  },
  {
    name: 'Hassan Suleiman',
    role: 'Operations Manager',
    city: 'Kampala',
    country: 'Uganda',
    quote: 'We automated our donor report pipeline in the productivity workshop. The first monthly report wrote itself in twenty minutes and still passed board review.',
    result: 'Donor report 4h → 20 min',
    program: 'AI Productivity Workshop',
    avatarInitials: 'HS',
    avatarGradient: 'linear-gradient(135deg,#7C3AED,#4C1D95)'
  },
  {
    name: 'Neema Patrick',
    role: 'Freelance Designer',
    city: 'Mwanza',
    country: 'Tanzania',
    quote: 'The vibe coding track gave me the confidence to ship a client landing page the same afternoon. Three paying clients later, I am billing in dollars.',
    result: 'First paid client in 1 week',
    program: 'Vibe Coding for Beginners',
    avatarInitials: 'NP',
    avatarGradient: 'linear-gradient(135deg,#DB2777,#831843)'
  },
  {
    name: 'Dr. Charles Bwire',
    role: 'Dean of Faculty',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    quote: 'We ran the AI policy briefing with 40 academic heads. The outcome was a clear, usable internal AI policy adopted by the senate the same month.',
    result: 'Policy adopted by senate in 30 days',
    program: 'Executive AI & Cyber Briefing',
    avatarInitials: 'CB',
    avatarGradient: 'linear-gradient(135deg,#1E3A8A,#0F174A)'
  }
];

export const graduateCities = [
  { city: 'Dar es Salaam', count: 320 },
  { city: 'Nairobi', count: 218 },
  { city: 'Arusha', count: 146 },
  { city: 'Kampala', count: 97 },
  { city: 'Mwanza', count: 84 },
  { city: 'Dodoma', count: 61 },
  { city: 'Moshi', count: 52 },
  { city: 'Kigali', count: 48 }
];

export const totalGraduates = graduateCities.reduce((sum, c) => sum + c.count, 0);