/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';
import { getPortalByKey } from '@/portals/registry';
import { PortalKey } from '@/portals/registry';

interface LazyPortalProps {
  title: string;
  portalKey: PortalKey;
}

// Dynamic import pattern for portal pages
const LazyPortalComponent: React.FC<LazyPortalProps> = ({ title, portalKey }) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const loadPortal = async () => {
      try {
        setIsLoading(true);
        setError(false);
        
        // Try to import the portal page
        // Handle folder name mapping for special cases
        const folderMap: Record<string, string> = {
          'ownerOperator': 'owner-operator',
          'superAdmin': 'super-admin',
          'loadBoard': 'loadBoard',
          'tmsAdmin': 'tmsAdmin'
        };
        
        const folderName = folderMap[portalKey] || portalKey;
        const module = await import(`@/pages/${folderName}/index.tsx`);
        setComponent(() => module.default);
      } catch (err) {
        console.log(`Portal ${portalKey} not found, using scaffold`);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortal();
  }, [portalKey]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading {title}...</p>
        </div>
      </div>
    );
  }

  if (error || !Component) {
    // Fallback to scaffold
    const portal = getPortalByKey(portalKey);
    return (
      <PortalScaffold 
        title={title}
        portalKey={portalKey}
        description={portal?.description}
        features={portal?.features}
      />
    );
  }

  return <Component />;
};

export const LazyPortal: React.FC<LazyPortalProps> = ({ title, portalKey }) => {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading {title}...</p>
        </div>
      </div>
    }>
      <LazyPortalComponent title={title} portalKey={portalKey} />
    </Suspense>
  );
};

export default LazyPortal;
