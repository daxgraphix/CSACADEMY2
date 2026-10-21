export const getProgramAccent = (slug: string): string => {
  if (slug === 'ai') return 'var(--accent-purple)';
  if (slug === 'cybersecurity') return 'var(--accent-green-strong)';
  if (slug === 'digital-skills') return 'var(--accent-amber-strong)';
  return 'var(--accent-blue)';
};
