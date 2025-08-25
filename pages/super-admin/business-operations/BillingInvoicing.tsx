import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { FileText } from 'lucide-react';

interface BillingInvoicingProps {}

const BillingInvoicing: React.FC<BillingInvoicingProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Billing & Invoicing
          </h1>
        </div>
        <p className="text-gray-600">
          Subscription billing, invoice management, payment processing
        </p>
      </div>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Billing & Invoicing</CardTitle>
          <CardDescription>Subscription billing, invoice management, payment processing</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">
                Billing & Invoicing
              </h3>
              <p className="text-gray-600 mt-2">
                Subscription billing, invoice management, payment processing
              </p>
              <div className="mt-4 space-y-2 flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Subscription Billing</Badge>
                <Badge variant="outline">Invoice Management</Badge>
                <Badge variant="outline">Payment Processing</Badge>
              </div>
              <Button className="mt-6" variant="default">
                Configure Billing & Invoicing
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingInvoicing;
