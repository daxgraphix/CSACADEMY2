export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatarGradient: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const authors: Record<string, AuthorProfile> = {
  'Alex Rweyemamu': {
    name: 'Alex Rweyemamu',
    role: 'Founder & Lead Instructor, CS Academy',
    bio: 'AI, cybersecurity, and digital-skills educator focused on practical, locally-relevant training for East African professionals, students, and organizations.',
    initials: 'AR',
    avatarGradient: 'linear-gradient(135deg, #dc2626 0%, #7c3aed 100%)',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/alexrweyemamu',
      twitter: 'https://x.com/Cyberswahili'
    }
  }
};

export const getAuthor = (name: string): AuthorProfile => {
  return (
    authors[name] ?? {
      name,
      role: 'CS Academy Contributor',
      bio: 'Contributor at CS Academy covering AI, cybersecurity, and digital skills.',
      initials: name
        .split(' ')
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase(),
      avatarGradient: 'linear-gradient(135deg, #dc2626 0%, #7c3aed 100%)'
    }
  );
};
