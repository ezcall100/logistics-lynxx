/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from "@sentry/react";

export interface WebVitalsData {
  name: string;
  value: number;
  id: string;
  delta: number;
  entries: PerformanceEntry[];
}

export function initObservability() {
  // Initialize Sentry for error tracking
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.VITE_APP_ENV || 'development',
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      tracesSampleRate: import.meta.env.VITE_APP_ENV === 'production' ? 0.1 : 1.0,
      replaysSessionSampleRate: import.meta.env.VITE_APP_ENV === 'production' ? 0.05 : 1.0,
      replaysOnErrorSampleRate: 1.0,
      beforeSend(event) {
        // Filter out development errors
        if (import.meta.env.DEV && event.exception) {
          console.warn('Sentry event filtered in development:', event);
          return null;
        }
        return event;
      },
    });

    console.log('✅ Sentry initialized for error tracking');
  }

  // Initialize Web Vitals monitoring
  if (import.meta.env.VITE_ANALYTICS_ENDPOINT || import.meta.env.VITE_APP_ENV === 'production') {
    import('web-vitals').then(({ onCLS, onINP, onLCP, onFID, onTTFB }) => {
      const postMetric = (metric: WebVitalsData) => {
        const payload = {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        };

        // Send to analytics endpoint if configured
        if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
          navigator.sendBeacon?.(
            import.meta.env.VITE_ANALYTICS_ENDPOINT,
            new Blob([JSON.stringify(payload)], { type: 'application/json' })
          );
        }

        // Log to console in development
        if (import.meta.env.DEV) {
          console.log(`📊 Web Vital: ${metric.name} = ${metric.value}`);
        }

        // Send to Sentry for performance monitoring
        if (import.meta.env.VITE_SENTRY_DSN) {
          // Sentry.metrics.increment('web_vital', metric.value, {
          //   tags: { metric: metric.name },
          // });
        }
      };

      onCLS(postMetric);
      onINP(postMetric);
      onLCP(postMetric);
      onFID(postMetric);
      onTTFB(postMetric);

      console.log('✅ Web Vitals monitoring initialized');
    }).catch(error => {
      console.warn('Failed to initialize Web Vitals:', error);
    });
  }

  // Performance monitoring
  if (typeof window !== 'undefined') {
    // Monitor long tasks
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.warn('⚠️ Long task detected:', entry);
          if (import.meta.env.VITE_SENTRY_DSN) {
            Sentry.addBreadcrumb({
              category: 'performance',
              message: 'Long task detected',
              data: {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name,
              },
              level: 'warning',
            });
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as unknown).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
          console.warn('⚠️ High memory usage:', memory);
          if (import.meta.env.VITE_SENTRY_DSN) {
            Sentry.addBreadcrumb({
              category: 'performance',
              message: 'High memory usage detected',
              data: {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit,
              },
              level: 'warning',
            });
          }
        }
      }, 30000); // Check every 30 seconds
    }
  }
}

// Error boundary wrapper for React components
export function withErrorBoundary<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
) {
  return Sentry.withErrorBoundary(Component, {
    fallback: fallback || (({ error, resetError }) => (
      <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
        <h3 className="text-red-800 font-semibold">Something went wrong</h3>
        <p className="text-red-600 text-sm mt-1">{error.message}</p>
        <button
          onClick={resetError}
          className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    )),
  });
}

// Performance monitoring utilities
export const performance = {
  mark: (name: string) => {
    if (typeof window !== 'undefined') {
      window.performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined') {
      try {
        const measure = window.performance.measure(name, startMark, endMark);
        console.log(`⏱️ Performance measure: ${name} = ${measure.duration}ms`);
        
        if (import.meta.env.VITE_SENTRY_DSN) {
          // Sentry.metrics.increment('performance_measure', measure.duration, {
          //   tags: { measure: name },
          // });
        }
        
        return measure;
      } catch (error) {
        console.warn('Failed to measure performance:', error);
      }
    }
  },
  
  trackApiCall: (name: string, duration: number, success: boolean) => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      // Sentry.metrics.increment('api_call', duration, {
      //   tags: { 
      //     api: name,
      //     success: success.toString(),
      //   },
      // });
    }
  },
};

// User session tracking
export const session = {
  start: () => {
    const sessionId = Math.random().toString(36).substring(2);
    sessionStorage.setItem('session_id', sessionId);
    
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.setTag('session_id', sessionId);
    }
    
    return sessionId;
  },
  
  getId: () => {
    return sessionStorage.getItem('session_id');
  },
  
  setUser: (user: { id: string; email?: string; role?: string }) => {
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.setUser(user);
    }
  },
};
