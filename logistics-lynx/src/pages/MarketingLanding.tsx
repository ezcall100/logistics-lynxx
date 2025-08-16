/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TransBotMarketingHeader from '@/components/marketing/TransBotMarketingHeader';
import TransBotHeroSection from '@/components/marketing/TransBotHeroSection';
import TransBotFeaturesSection from '@/components/marketing/TransBotFeaturesSection';
import TransBotBenefitsSection from '@/components/marketing/TransBotBenefitsSection';
import TransBotTestimonialsSection from '@/components/marketing/TransBotTestimonialsSection';
import TransBotPricingSection from '@/components/marketing/TransBotPricingSection';
import TransBotCTASection from '@/components/marketing/TransBotCTASection';
import TransBotFooter from '@/components/marketing/TransBotFooter';

const MarketingLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-x-hidden">
      <TransBotMarketingHeader />
      <main className="relative">
        <TransBotHeroSection />
        <TransBotFeaturesSection />
        <TransBotBenefitsSection />
        <TransBotTestimonialsSection />
        <TransBotPricingSection />
        <TransBotCTASection />
      </main>
      <TransBotFooter />
    </div>
  );
};

export default MarketingLanding;