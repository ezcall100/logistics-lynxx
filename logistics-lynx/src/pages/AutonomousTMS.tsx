/* eslint-disable @typescript-eslint/no-explicit-any */

import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import AutonomousHeader from '@/components/autonomous/AutonomousHeader';
import AutonomousStatusCard from '@/components/autonomous/AutonomousStatusCard';
import AutonomousTabs from '@/components/autonomous/AutonomousTabs';
import { AutonomousTaskProcessor } from '@/components/autonomous/AutonomousTaskProcessor';
import { N8NWebhookTester } from '@/components/autonomous/N8NWebhookTester';

const AutonomousTMS = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="relative">
            <div className="flex flex-col gap-6">
              <AutonomousHeader />
              <AutonomousStatusCard />
            </div>
            
            <Separator className="mt-6 sm:mt-8" />
          </div>

          {/* N8N Webhook Testing */}
          <N8NWebhookTester />
          
          {/* Live 24/7 Processing Activity */}
          <AutonomousTaskProcessor />
          
          {/* Enhanced Tabs Section */}
          <AutonomousTabs />
        </div>
      </div>
    </Layout>
  );
};

export default AutonomousTMS;
