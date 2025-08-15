import React from 'react';
import PortalScaffold from '@/pages/_scaffold/PortalScaffold';

const OnboardingPortal = () => {
  return (
    <PortalScaffold 
      title="Onboarding Portal"
      portalKey="onboarding"
      description="User onboarding and training portal"
      features={[
        "User Onboarding",
        "Training Modules",
        "Documentation",
        "Progress Tracking",
        "Compliance Training",
        "System Tutorials"
      ]}
    />
  );
};

export default OnboardingPortal;
