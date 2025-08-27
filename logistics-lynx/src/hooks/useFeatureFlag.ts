import { useState, useEffect } from 'react';

interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

export const useFeatureFlag = (flagName: string): boolean => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock feature flag implementation
    // In a real app, this would fetch from your feature flag service
    const mockFeatureFlags: Record<string, boolean> = {
      'super-admin': true,
      'analytics': true,
      'advanced-security': true,
      'mcp-controls': true,
      'portal-management': true,
      'ai-features': true,
      'beta-features': false,
      'experimental-ui': false,
    };

    // Simulate API call delay
    setTimeout(() => {
      setIsEnabled(mockFeatureFlags[flagName] || false);
      setLoading(false);
    }, 100);
  }, [flagName]);

  return isEnabled;
};

export const useFeatureFlags = (): { flags: FeatureFlag[]; loading: boolean } => {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);

  useEffect(() => {
    // Mock feature flags data
    const mockFlags: FeatureFlag[] = [
      { id: '1', name: 'super-admin', enabled: true, description: 'Super admin functionality' },
      { id: '2', name: 'analytics', enabled: true, description: 'Analytics and reporting' },
      { id: '3', name: 'advanced-security', enabled: true, description: 'Advanced security features' },
      { id: '4', name: 'mcp-controls', enabled: true, description: 'MCP control center' },
      { id: '5', name: 'portal-management', enabled: true, description: 'Portal management features' },
      { id: '6', name: 'ai-features', enabled: true, description: 'AI-powered features' },
      { id: '7', name: 'beta-features', enabled: false, description: 'Beta features' },
      { id: '8', name: 'experimental-ui', enabled: false, description: 'Experimental UI components' },
    ];

    setTimeout(() => {
      setFlags(mockFlags);
      setLoading(false);
    }, 200);
  }, []);

  return { flags, loading };
};
