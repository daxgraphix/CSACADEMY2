import { Instructor } from '../types';
import { siteConfig } from '../config/site';

// Keep this directory limited to people and details that CS Academy has verified.
export const instructorsData: Instructor[] = [
  {
    id: 'alex-rweyemamu',
    name: siteConfig.founder.name,
    role: 'Founder & Lead Instructor',
    specialtyBadge: 'Practical AI, cybersecurity & digital skills',
    bio: siteConfig.founder.bio,
    avatarInitials: 'AR',
    avatarGradient: 'from-[#DC2626] to-[#7F1D1D]',
    expertise: ['Practical AI', 'Cybersecurity and digital safety', 'Digital skills'],
    featuredCourses: ['AI literacy', 'Cybersecurity and digital safety', 'Digital skills'],
    socialLinks: { linkedin: siteConfig.socialLinks.linkedin }
  }
];
