/**
 * Error State Component
 * Displays error messages with retry functionality
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  AlertCircle, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Server, 
  FileX,
  Shield,
  XCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  details?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'network' | 'server' | 'permission' | 'not-found' | 'validation';
  onRetry?: () => void;
  onReset?: () => void;
  onBack?: () => void;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const defaultIcons = {
  default: AlertCircle,
  network: WifiOff,
  server: Server,
  permission: Shield,
  'not-found': FileX,
  validation: AlertTriangle,
};

const defaultTitles = {
  default: 'Something went wrong',
  network: 'Connection error',
  server: 'Server error',
  permission: 'Access denied',
  'not-found': 'Not found',
  validation: 'Validation error',
};

const defaultMessages = {
  default: 'An unexpected error occurred. Please try again.',
  network: 'Unable to connect to the server. Please check your internet connection.',
  server: 'The server encountered an error. Please try again later.',
  permission: 'You don\'t have permission to access this resource.',
  'not-found': 'The requested resource could not be found.',
  validation: 'Please check your input and try again.',
};

export function ErrorState({
  title,
  message,
  details,
  icon,
  variant = 'default',
  onRetry,
  onReset,
  onBack,
  showDetails = false,
  size = 'md',
  className,
}: ErrorStateProps) {
  const [isExpanded, setIsExpanded] = React.useState(showDetails);
  const DefaultIcon = defaultIcons[variant];
  const defaultTitle = title || defaultTitles[variant];
  const defaultMessage = message || defaultMessages[variant];

  const sizeClasses = {
    sm: 'py-6',
    md: 'py-8',
    lg: 'py-12',
  };

  const iconSizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size],
        className
      )}
    >
      {/* Icon */}
      <div className={cn('text-destructive mb-4', iconSizes[size])}>
        {icon || <DefaultIcon className="h-full w-full" />}
      </div>

      {/* Content */}
      <div className="max-w-md space-y-2">
        <h3 className="text-lg font-semibold text-text">
          {defaultTitle}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">
          {defaultMessage}
        </p>
        
        {/* Error Details */}
        {details && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-text-muted hover:text-text transition-colors"
            >
              {isExpanded ? 'Hide details' : 'Show details'}
            </button>
            {isExpanded && (
              <div className="mt-2 p-3 bg-surface-2 rounded-md text-xs text-text-muted font-mono text-left">
                {details}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
        {onReset && (
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
        )}
        {onBack && (
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
          >
            Go back
          </Button>
        )}
      </div>
    </div>
  );
}

// Specialized error state components
export function NetworkError({
  onRetry,
  className,
}: {
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      variant="network"
      onRetry={onRetry}
      className={className}
    />
  );
}

export function ServerError({
  onRetry,
  className,
}: {
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      variant="server"
      onRetry={onRetry}
      className={className}
    />
  );
}

export function PermissionError({
  onBack,
  className,
}: {
  onBack?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      variant="permission"
      onBack={onBack}
      className={className}
    />
  );
}

export function NotFoundError({
  title,
  message,
  onBack,
  className,
}: {
  title?: string;
  message?: string;
  onBack?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      variant="not-found"
      title={title}
      message={message}
      onBack={onBack}
      className={className}
    />
  );
}

export function ValidationError({
  message,
  details,
  onReset,
  className,
}: {
  message?: string;
  details?: string;
  onReset?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      variant="validation"
      message={message}
      details={details}
      onReset={onReset}
      className={className}
    />
  );
}

// Portal-specific error states
export function LoadError({
  onRetry,
  className,
}: {
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      title="Failed to load data"
      message="Unable to load the requested data. Please check your connection and try again."
      onRetry={onRetry}
      className={className}
    />
  );
}

export function SaveError({
  onRetry,
  onReset,
  className,
}: {
  onRetry?: () => void;
  onReset?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      title="Failed to save"
      message="Unable to save your changes. Please try again or contact support if the problem persists."
      onRetry={onRetry}
      onReset={onReset}
      className={className}
    />
  );
}

export function UploadError({
  onRetry,
  className,
}: {
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      title="Upload failed"
      message="Unable to upload the file. Please check the file size and format, then try again."
      onRetry={onRetry}
      className={className}
    />
  );
}

// Error boundary component
export function ErrorBoundary({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}) {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    if (fallback) {
      const FallbackComponent = fallback;
      return (
        <FallbackComponent
          error={error}
          resetError={() => setError(null)}
        />
      );
    }

    return (
      <ErrorState
        title="Something went wrong"
        message="An unexpected error occurred. Please refresh the page to try again."
        details={error.message}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <>{children}</>;
}
