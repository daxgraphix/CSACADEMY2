import { Component, type ErrorInfo as ReactErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(_error: Error, _info: ReactErrorInfo) {}

  render() {
    if (this.state.error) return (
      <section className="min-h-[40vh] flex flex-col items-center justify-center gap-4 p-8 text-center" role="alert">
        <h2 className="text-xl font-bold">This page could not be displayed.</h2>
        <p>Please refresh the page or return to the home page.</p>
        <button className="rounded-lg bg-[var(--accent-red)] px-4 py-2 text-white" onClick={() => this.setState({ error: null })}>Try again</button>
      </section>
    );
    return this.props.children;
  }
}
