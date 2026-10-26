import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const progressBar = progressRef.current;
        if (!progressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
        progressBar.style.transform = `scaleX(${progress})`;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none"
    >
      <div
        ref={progressRef}
        className="h-full w-full bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-red-bright)] to-[var(--accent-red)] shadow-[0_0_8px_var(--accent-red-glow)] transition-transform duration-150 ease-out"
        style={{ transform: 'scaleX(0)', transformOrigin: 'left', willChange: 'transform' }}
      />
    </div>
  );
}
