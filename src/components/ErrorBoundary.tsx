import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[999] bg-red-900 text-white p-6 overflow-y-auto font-mono text-xs md:text-sm">
          <h1 className="text-xl font-bold mb-4">FATAL APP CRASH</h1>
          <p className="mb-4">Please screenshot this and send it to the developer:</p>
          <div className="bg-black/50 p-4 rounded-md mb-4 whitespace-pre-wrap">
            <span className="font-bold text-red-300">Error:</span> {this.state.error?.toString()}
          </div>
          <div className="bg-black/50 p-4 rounded-md whitespace-pre-wrap">
            <span className="font-bold text-red-300">Component Stack:</span>
            {this.state.errorInfo?.componentStack}
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-8 px-6 py-2 bg-white text-red-900 font-bold rounded"
          >
            RETURN HOME
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
