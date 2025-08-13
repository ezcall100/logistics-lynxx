
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';

interface FormData {
  [key: string]: string | number | boolean;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'number';
  options?: string[];
  required?: boolean;
}

interface CRMFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  fields?: FormField[];
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  type?: 'lead' | 'contact' | 'opportunity' | 'company';
  trigger?: React.ReactNode;
}

const getDefaultFields = (type: string): FormField[] => {
  switch (type) {
    case 'lead':
      return [
        { name: 'title', label: 'Lead Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'estimated_value', label: 'Estimated Value', type: 'number' },
        { name: 'lead_status', label: 'Status', type: 'select', options: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'] },
        { name: 'priority', label: 'Priority', type: 'select', options: ['low', 'medium', 'high', 'urgent'] },
      ];
    case 'contact':
      return [
        { name: 'first_name', label: 'First Name', type: 'text', required: true },
        { name: 'last_name', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel' },
        { name: 'job_title', label: 'Job Title', type: 'text' },
      ];
    case 'opportunity':
      return [
        { name: 'title', label: 'Opportunity Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'value', label: 'Value', type: 'number' },
        { name: 'stage', label: 'Stage', type: 'select', options: ['prospect', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'] },
        { name: 'probability', label: 'Probability (%)', type: 'number' },
      ];
    default:
      return [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
      ];
  }
};

const CRMFormDialog: React.FC<CRMFormDialogProps> = ({
  open,
  onOpenChange,
  title,
  fields,
  onSubmit,
  initialData = {},
  type = 'contact',
  trigger
}) => {
  const [isOpen, setIsOpen] = React.useState(open || false);
  const formFields = fields || getDefaultFields(type);
  const formTitle = title || `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: initialData
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (onOpenChange) onOpenChange(newOpen);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...register(field.name, { required: field.required })}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      case 'select':
        return (
          <Select onValueChange={(value) => setValue(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={field.type}
            {...register(field.name, { required: field.required })}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  const defaultTrigger = (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      {formTitle}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CRMFormDialog;
