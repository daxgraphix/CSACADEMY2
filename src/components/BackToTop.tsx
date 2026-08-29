import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BackToTop: React.FC = () => {
  const { theme } = useApp();
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setVisible(y > 200);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleClick = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  const [docHeight, setDocHeight] = useState(0);
  const [winHeight, setWinHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      setDocHeight(Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ));
      setWinHeight(window.innerHeight || document.documentElement.clientHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxScroll = Math.max(1, docHeight - winHeight);
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
  const circumference = 2 * Math.PI * 20;
  const dashOffset = circumference * (1 - progress);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-visible={visible}
      className={`group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-opacity duration-300 ${
        visible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } ${
        theme === 'dark'
          ? 'bg-[var(--bg-secondary)] hover:bg-[#1f1f1f] text-white border-[var(--border-color)] hover:border-[var(--accent-red-border)]'
          : 'bg-white hover:bg-neutral-50 text-neutral-900 border-[var(--border-color)] hover:border-[var(--accent-red-border)] shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_40px_rgba(255,59,48,0.25)]'
      }`}
    >
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke={theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
          strokeWidth="2"
        />
        <circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="#ff3b30"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={visible ? dashOffset : circumference}
          style={{ transition: 'stroke-dashoffset 120ms linear' }}
        />
      </svg>

      <ArrowUp
        className="relative w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-red-strong)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <span className="sr-only">Back to top</span>
    </button>
  );
};
