/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Phone, Users } from 'lucide-react';

const CommunicationPage = () => {
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Communication</h1>
        <p className="text-muted-foreground">Dispatch, chat & emergency contacts</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Chat Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure chat preferences, auto-responses, and message notifications.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set up emergency contacts, dispatch numbers, and call preferences.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunicationPage;