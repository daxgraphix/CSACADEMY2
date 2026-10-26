import { useLocation } from 'react-router-dom';
import { getCanonicalUrl } from '../utils/seo';

/**
 * Returns the absolute canonical URL for the current route.
 * Use this inside <Helmet> blocks for both:
 *   <link rel="canonical" href={canonical} />
 *   <meta property="og:url" content={canonical} />
 */
export const useCanonicalUrl = (): string => {
  const { pathname } = useLocation();
  return getCanonicalUrl(pathname);
};
