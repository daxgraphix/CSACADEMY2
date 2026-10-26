import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BackToTop: React.FC = () => {
  const { theme } = useApp();
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const progressCircleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        const circumference = 2 * Math.PI * 20;
        if (progressCircleRef.current) {
          progressCircleRef.current.style.strokeDashoffset = String(circumference * (1 - progress));
        }
        const nextVisible = scrollTop > 200;
        if (nextVisible !== visibleRef.current) {
          visibleRef.current = nextVisible;
          setVisible(nextVisible);
        }
      });
    };
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const handleClick = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-visible={visible}
      className={`group fixed right-5 sm:right-6 z-[60] flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md transition-[bottom,opacity,transform,box-shadow] duration-300 hover:-translate-y-0.5 ${
        visible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      } ${
        // On mobile the PriceStrip is anchored at the bottom; lift the back-to-top
        // button above it. On sm+ the price bar is hidden, so the button sits
        // flush to the bottom-right corner.
        'bottom-20 sm:bottom-6'
      } ${
        theme === 'dark'
          ? 'bg-[var(--bg-secondary)] hover:bg-[#1f1f1f] text-white border-[var(--border-color)] hover:border-[var(--accent-red-border)]'
          : 'bg-white hover:bg-neutral-50 text-neutral-900 border-[var(--border-color)] hover:border-[var(--accent-red-border)] shadow-[0_18px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_40px_rgba(255,59,48,0.25)]'
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none"
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
          ref={progressCircleRef}
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke={theme === 'dark' ? '#ff3b30' : '#dc2626'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 20}
          strokeDashoffset={2 * Math.PI * 20}
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
