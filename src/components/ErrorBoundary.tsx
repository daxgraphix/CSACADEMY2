import { Component, type ErrorInfo as ReactErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(_error: Error, _info: ReactErrorInfo) {}

  render() {
    if (this.state.error) return (
      <section className="min-h-[40vh] flex flex-col items-center justify-center gap-5 p-8 text-center" role="alert">
        <h2 className="text-xl font-bold">This page could not be displayed.</h2>
        <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
          Something went wrong loading this content. You can try reloading the page or return to the home page.
        </p>
        <div className="flex items-center gap-3">
          <button
            className="rounded-full bg-[var(--accent-red)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--accent-red-hover)]"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
          <button
            className="rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-bold transition hover:border-[var(--accent-red)]"
            onClick={() => { this.setState({ error: null }); window.location.href = '/'; }}
          >
            Go home
          </button>
        </div>
      </section>
    );
    return this.props.children;
  }
}
