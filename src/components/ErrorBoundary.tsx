import { useState, useEffect, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorInfo {
  hasError: boolean;
  error: Error | null;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({ hasError: false, error: null });

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      setErrorInfo({ hasError: true, error: new Error(event.message) });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      setErrorInfo({ hasError: true, error: reason });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const handleReset = (): void => {
    setErrorInfo({ hasError: false, error: null });
  };

  const handleReload = (): void => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  if (errorInfo.hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-red-subtle)] flex items-center justify-center mx-auto">
            <span className="text-3xl font-black text-[var(--accent-red-strong)]">!</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[var(--text-primary)]">
              Something Went Wrong
            </h2>
            <p className="text-sm text-[var(--text-tertiary)]">
              An unexpected error occurred. Please try again or reload the page.
            </p>
          </div>
          {errorInfo.error && (
            <pre className="text-[10px] text-left bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-3 overflow-auto max-h-32 text-[var(--text-faint)]">
              {errorInfo.error.message}
            </pre>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-[var(--accent-red)] text-white hover:bg-[var(--accent-red-hover)] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleReload}
              className="px-6 py-2.5 rounded-xl font-bold text-sm border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
