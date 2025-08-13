
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CreateTemplateDialog = () => {
  const { toast } = useToast();

  const handleCreateTemplate = () => {
    toast({
      title: "Template Created",
      description: "New template has been created successfully.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input defaultValue="Custom Delivery Notification" />
            </div>
            <div className="space-y-2">
              <Label>Template Type</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Template</SelectItem>
                  <SelectItem value="document">Document Template</SelectItem>
                  <SelectItem value="invoice">Invoice Template</SelectItem>
                  <SelectItem value="report">Report Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select defaultValue="communications">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="communications">Communications</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject Line (for emails)</Label>
              <Input defaultValue="Delivery Update - Order #{order_number}" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Template Content</Label>
            <Textarea
              rows={8}
              defaultValue={`Dear {customer_name},

We are pleased to inform you that your shipment {tracking_number} has been successfully delivered to {delivery_address}.

Delivery Details:
- Delivery Date: {delivery_date}
- Delivery Time: {delivery_time}
- Received By: {recipient_name}
- Driver: {driver_name}

Thank you for choosing LogiPortal for your shipping needs.

Best regards,
LogiPortal Customer Service Team`}
            />
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Available Variables:</p>
            <div className="text-xs text-muted-foreground space-x-4">
              <span>{'{customer_name}'}</span>
              <span>{'{tracking_number}'}</span>
              <span>{'{delivery_address}'}</span>
              <span>{'{delivery_date}'}</span>
              <span>{'{driver_name}'}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleCreateTemplate}>Create Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
