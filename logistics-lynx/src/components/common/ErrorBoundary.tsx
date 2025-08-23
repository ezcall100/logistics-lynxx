import React from "react";

type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(err: unknown): State {
    return { hasError: true, message: err instanceof Error ? err.message : String(err) };
  }
  componentDidCatch(err: unknown, info: unknown) {
    // optional: send to MCP alert stream / Sentry
    // console.error(err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
            <h2 className="text-lg font-semibold">Something went wrong.</h2>
            {this.state.message && (
              <p className="mt-1 text-sm opacity-80">{this.state.message}</p>
            )}
            <button
              className="mt-3 rounded-md border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
