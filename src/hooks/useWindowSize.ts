import { useState, useEffect, useCallback } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

/**
 * Tracks the viewport size and keeps it in sync on resize.
 * Mobile-first friendly: pair with `useMediaQuery` or the
 * `isMobile` / `isTablet` / `isDesktop` helpers below.
 */
export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  useEffect(() => {
    let frame = 0;
    const handleResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Subscribe to a CSS media query. Returns `true` when the query matches.
 * Useful for conditionally rendering heavier desktop-only UI or swapping
 * complex components for lightweight mobile variants.
 */
export const useMediaQuery = (query: string): boolean => {
  const getMatch = () =>
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState<boolean>(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

/**
 * Convenience hook that classifies the current viewport into
 * mobile / tablet / desktop buckets using Tailwind's default breakpoints.
 */
export const useDeviceType = (): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
} => {
  const { width } = useWindowSize();
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
  return { isMobile, isTablet, isDesktop, width };
};

/** Stable matchMedia checker for non-reactive checks. */
export const useMediaQueryCallback = () => {
  return useCallback((query: string) => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return false;
    return window.matchMedia(query).matches;
  }, []);
};
