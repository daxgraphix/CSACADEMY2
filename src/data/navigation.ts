import { PageRoute } from '../types';

/**
 * Shared navigation model.
 *
 * The header, the mobile drawer and the footer all read from this file, so a
 * route can never be linked from one surface and forgotten on another. Every
 * entry resolves to a real PageRoute, which the link-integrity test enforces.
 *
 * `hash` targets an element on the destination page. The router navigates to
 * the path first and then scrolls to the anchor, so these work from anywhere
 * in the site without a full page reload.
 */

export interface NavLink {
  /** Unique key, also used as the React key. */
  id: string;
  label: string;
  route: PageRoute;
  /** Optional short description used in dropdowns. */
  description?: string;
  /** Optional badge rendered next to the label. */
  badge?: string;
  badgeTone?: 'red' | 'amber' | 'emerald' | 'blue' | 'purple' | 'pink';
  /** Element id on the destination page to scroll to. */
  hash?: string;
}

export interface NavGroup {
  id: string;
  title: string;
  items: NavLink[];
}

export interface FooterColumn {
  id: string;
  title: string;
  items: NavLink[];
}

/** Primary header links, in order. */
export const primaryNav: NavLink[] = [
  { id: 'nav-home', label: 'Home', route: 'home' },
  { id: 'nav-academy', label: 'Academy', route: 'academy' },
  { id: 'nav-teams', label: 'Teams', route: 'for-organizations' },
  { id: 'nav-pricing', label: 'Pricing', route: 'pricing' }
];

/** The Programs dropdown, shown on desktop and inside the mobile drawer. */
export const programsNav: NavLink[] = [
  { id: 'nav-programs-all', label: 'All Programs & Courses', route: 'programs' },
  { id: 'nav-programs-vibe', label: 'Vibe Coding', route: 'vibe-coding', badge: 'New', badgeTone: 'red', description: 'AI-powered web development with Cursor & Bolt' },
  { id: 'nav-programs-ai', label: 'AI & Prompting', route: 'programs/ai', badgeTone: 'blue', description: 'Prompting, LLMs, AI safety & local-language prompts' },
  { id: 'nav-programs-cyber', label: 'Cybersecurity Academy', route: 'programs/cybersecurity', badgeTone: 'emerald', description: 'Digital defense, phishing prevention & data safety' },
  { id: 'nav-programs-digital', label: 'Full-Stack & Digital Skills', route: 'programs/digital-skills', badgeTone: 'purple', description: 'Web dev, Figma UI/UX & digital marketing' },
  { id: 'nav-programs-devpad', label: 'DevPad', route: 'devpad', badge: 'Community', badgeTone: 'pink', description: 'Build, test & launch with developer peers' }
];

/** The "More" dropdown. */
export const moreNav: NavLink[] = [
  { id: 'nav-more-features', label: 'Platform Features', route: 'features' },
  { id: 'nav-more-formats', label: '6 Delivery Formats', route: 'learning-formats' },
  { id: 'nav-more-resources', label: 'Free Resources', route: 'resources' },
  { id: 'nav-more-blog', label: 'Blog & Articles', route: 'blog' },
  { id: 'nav-more-about', label: 'About CS Academy', route: 'about' },
  { id: 'nav-more-contact', label: 'Contact & Support', route: 'contact' }
];

/** Mobile drawer order — the full site, top to bottom. */
export const mobileNav: NavLink[] = [
  { id: 'mobile-home', label: 'Home', route: 'home' },
  { id: 'mobile-academy', label: 'Full Academy', route: 'academy' },
  { id: 'mobile-features', label: 'Platform Features', route: 'features', badge: 'New' },
  { id: 'mobile-pricing', label: 'Pricing & Plans', route: 'pricing', badge: 'M-Pesa' },
  { id: 'mobile-formats', label: 'Delivery Formats', route: 'learning-formats' },
  { id: 'mobile-teams', label: 'For Organizations', route: 'for-organizations', badge: 'Corporate' },
  { id: 'mobile-resources', label: 'Free Resources', route: 'resources' },
  { id: 'mobile-blog', label: 'Blog & Articles', route: 'blog' },
  { id: 'mobile-about', label: 'About CS Academy', route: 'about' },
  { id: 'mobile-contact', label: 'Contact & Support', route: 'contact' }
];

/** Footer link columns. */
export const footerColumns: FooterColumn[] = [
  {
    id: 'footer-programs',
    title: 'Programs',
    items: [
      { id: 'footer-programs-vibe', label: 'Vibe Coding', route: 'vibe-coding', badge: 'New', badgeTone: 'red' },
      { id: 'footer-programs-ai', label: 'AI & Prompting', route: 'programs/ai' },
      { id: 'footer-programs-cyber', label: 'Cybersecurity', route: 'programs/cybersecurity' },
      { id: 'footer-programs-digital', label: 'Digital Skills', route: 'programs/digital-skills' },
      { id: 'footer-programs-devpad', label: 'DevPad Community', route: 'devpad' },
      { id: 'footer-programs-all', label: 'All Curricula', route: 'programs', badge: 'Browse', badgeTone: 'red' }
    ]
  },
  {
    id: 'footer-delivery',
    title: 'Delivery',
    items: [
      { id: 'footer-delivery-formats', label: '6 Delivery Formats', route: 'learning-formats' },
      { id: 'footer-delivery-features', label: 'Platform Features', route: 'features' },
      { id: 'footer-delivery-pricing', label: 'Pricing & Plans', route: 'pricing', badge: 'M-Pesa', badgeTone: 'emerald' },
      { id: 'footer-delivery-faq', label: 'Pricing Questions', route: 'pricing', hash: 'pricing-faq' }
    ]
  },
  {
    id: 'footer-organizations',
    title: 'Organizations',
    items: [
      { id: 'footer-org-proposal', label: 'Request a Proposal', route: 'for-organizations', hash: 'proposal', badge: 'Lead form', badgeTone: 'red' },
      { id: 'footer-org-solutions', label: 'Solutions by Sector', route: 'for-organizations', hash: 'sector-solutions' },
      { id: 'footer-org-packages', label: 'Package Tiers', route: 'for-organizations', hash: 'packages' },
      { id: 'footer-org-lifecycle', label: 'Delivery Lifecycle', route: 'for-organizations', hash: 'lifecycle' }
    ]
  },
  {
    id: 'footer-company',
    title: 'Company',
    items: [
      { id: 'footer-company-academy', label: 'Full Academy Overview', route: 'academy' },
      { id: 'footer-company-about', label: 'About CS Academy', route: 'about' },
      { id: 'footer-company-resources', label: 'Free Resources', route: 'resources' },
      { id: 'footer-company-blog', label: 'Blog & Articles', route: 'blog' },
      { id: 'footer-company-contact', label: 'Contact & Book', route: 'contact' }
    ]
  }
];

/** Legal links shown in the footer bottom bar. */
export const legalNav: NavLink[] = [
  { id: 'legal-privacy', label: 'Privacy Policy', route: 'privacy' },
  { id: 'legal-terms', label: 'Terms & Conditions', route: 'terms' }
];

/** Every navigation link on the site, used by the link-integrity test. */
export const allNavLinks: NavLink[] = [
  ...primaryNav,
  ...programsNav,
  ...moreNav,
  ...mobileNav,
  ...footerColumns.flatMap((column) => column.items),
  ...legalNav
];
