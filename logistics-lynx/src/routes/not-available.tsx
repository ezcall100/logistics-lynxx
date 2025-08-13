import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotAvailable() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Portal No Longer Available
          </CardTitle>
          <CardDescription className="text-gray-600">
            This portal has been deprecated and is no longer accessible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-500">
            <p>Please contact your administrator if you believe this is an error.</p>
            <p className="mt-2 text-xs">(HTTP 410 Gone)</p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={() => navigate('/')}
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
