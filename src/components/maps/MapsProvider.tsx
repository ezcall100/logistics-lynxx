import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

interface MapsContextType {
  isLoaded: boolean;
  isEnabled: boolean;
  hasError: boolean;
  errorMessage: string | null;
  apiKey: string | null;
}

const MapsContext = createContext<MapsContextType>({
  isLoaded: false,
  isEnabled: true,
  hasError: false,
  errorMessage: null,
  apiKey: null,
});

export const useMaps = () => useContext(MapsContext);

interface MapsProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function MapsProvider({ children, fallback }: MapsProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  // Get API key from environment or window
  const apiKey = 
    import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    (window as any)?.ENV?.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    localStorage.getItem('google_maps_api_key');

  // Check feature flag
  useEffect(() => {
    const checkFeatureFlag = async () => {
      try {
        // Check if maps are enabled via feature flag
        const response = await fetch('/api/feature-flags/maps.enabled');
        if (response.ok) {
          const { enabled } = await response.json();
          setIsEnabled(enabled !== false); // Default to true unless explicitly disabled
        }
      } catch (error) {
        console.warn('Could not check maps feature flag, defaulting to enabled');
        setIsEnabled(true);
      }
    };

    checkFeatureFlag();
  }, []);

  // Handle load success
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    setErrorMessage(null);
  };

  // Handle load error
  const handleError = (error: Error) => {
    console.error('Google Maps failed to load:', error);
    setHasError(true);
    setErrorMessage(error.message);
    setIsLoaded(false);
  };

  // If maps are disabled via feature flag, show fallback
  if (!isEnabled) {
    return (
      <MapsContext.Provider value={{
        isLoaded: false,
        isEnabled: false,
        hasError: false,
        errorMessage: 'Maps feature is currently disabled',
        apiKey: null,
      }}>
        {fallback || (
          <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
            <div className="text-lg font-medium mb-2">🗺️ Maps Temporarily Unavailable</div>
            <div className="text-sm">Mapping features are currently disabled for maintenance.</div>
          </div>
        )}
      </MapsContext.Provider>
    );
  }

  // If no API key, show fallback
  if (!apiKey) {
    return (
      <MapsContext.Provider value={{
        isLoaded: false,
        isEnabled: true,
        hasError: true,
        errorMessage: 'Google Maps API key is missing',
        apiKey: null,
      }}>
        {fallback || (
          <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
            <div className="text-lg font-medium mb-2">🔑 API Key Required</div>
            <div className="text-sm">Google Maps API key is not configured.</div>
            <button 
              onClick={() => {
                const key = prompt('Enter your Google Maps API key:');
                if (key) {
                  localStorage.setItem('google_maps_api_key', key);
                  window.location.reload();
                }
              }}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add API Key
            </button>
          </div>
        )}
      </MapsContext.Provider>
    );
  }

  // If there was an error loading, show fallback
  if (hasError) {
    return (
      <MapsContext.Provider value={{
        isLoaded: false,
        isEnabled: true,
        hasError: true,
        errorMessage,
        apiKey,
      }}>
        {fallback || (
          <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
            <div className="text-lg font-medium mb-2">❌ Maps Loading Error</div>
            <div className="text-sm mb-2">{errorMessage}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}
      </MapsContext.Provider>
    );
  }

  return (
    <MapsContext.Provider value={{
      isLoaded,
      isEnabled: true,
      hasError: false,
      errorMessage: null,
      apiKey,
    }}>
      <LoadScript
        googleMapsApiKey={apiKey}
        libraries={['places']}
        onLoad={handleLoad}
        onError={handleError}
      >
        {children}
      </LoadScript>
    </MapsContext.Provider>
  );
}

// Hook for checking if maps are ready
export const useMapsReady = () => {
  const { isLoaded, isEnabled, hasError } = useMaps();
  return isLoaded && isEnabled && !hasError;
};

// Hook for getting maps error state
export const useMapsError = () => {
  const { hasError, errorMessage } = useMaps();
  return { hasError, errorMessage };
};
