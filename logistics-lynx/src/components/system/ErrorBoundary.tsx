import React from "react";

export class ErrorBoundary extends React.Component<React.PropsWithChildren, {error?: Error}> {
  state = { error: undefined as Error|undefined };
  
  static getDerivedStateFromError(error: Error) { 
    return { error }; 
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.error) {
      return (
        <div style={{padding: 16, fontFamily: 'Arial, sans-serif'}}>
          <h2>🚨 Something went wrong.</h2>
          <p>The application encountered an error. Please check the console for more details.</p>
          <details style={{marginTop: 16}}>
            <summary>Error Details</summary>
            <pre style={{whiteSpace: "pre-wrap", backgroundColor: '#f5f5f5', padding: 8, borderRadius: 4}}>
              {this.state.error.message}
            </pre>
            <pre style={{whiteSpace: "pre-wrap", backgroundColor: '#f5f5f5', padding: 8, borderRadius: 4, marginTop: 8}}>
              {this.state.error.stack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
