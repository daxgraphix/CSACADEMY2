/** Add only learner stories that have been approved for publication. */
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

export const testimonials: Testimonial[] = [];
export const graduateCities: { city: string; count: number }[] = [];
export const totalGraduates = 0;
