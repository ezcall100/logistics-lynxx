/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InstructionsCard: React.FC = () => {
  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-blue-800">How Zero-Touch 24/7 Auto-Activation Works</CardTitle>
      </CardHeader>
      <CardContent className="text-blue-700 space-y-2">
        <div className="text-sm">
          <strong>1. Auto-Startup:</strong> System automatically activates when page loads - no button clicks needed
        </div>
        <div className="text-sm">
          <strong>2. Session Independence:</strong> Runs 24/7 even when all TMS admin users log out
        </div>
        <div className="text-sm">
          <strong>3. Persistent Storage:</strong> Operation status saved locally - survives browser refreshes
        </div>
        <div className="text-sm">
          <strong>4. Auto-Recovery:</strong> System automatically resumes if browser/page is reopened
        </div>
        <div className="text-sm">
          <strong>5. Continuous Learning:</strong> Agents adapt and improve without human intervention
        </div>
        <div className="text-sm font-semibold text-blue-800">
          ⚡ True zero-touch operation: Just load the page and your TMS runs autonomously 24/7!
        </div>
      </CardContent>
    </Card>
  );
};
