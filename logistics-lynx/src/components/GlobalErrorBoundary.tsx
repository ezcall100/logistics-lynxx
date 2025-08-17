import React from "react";

export class GlobalErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  constructor(props: any) { 
    super(props); 
    this.state = { hasError: false }; 
  }
  
  static getDerivedStateFromError(err: Error) { 
    return { hasError: true, message: err.message }; 
  }
  
  componentDidCatch(err: Error, info: any) { 
    console.error("UI error:", err, info); 
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="m-4 rounded-md border p-6 bg-card">
          <h2 className="text-lg font-semibold">Something went wrong.</h2>
          <p className="text-sm text-muted-foreground">{this.state.message}</p>
          <button 
            className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
