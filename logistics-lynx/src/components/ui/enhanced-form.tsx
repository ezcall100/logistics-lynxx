import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Radix UI Components
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Icons
import { 
  Eye, EyeOff, AlertCircle, CheckCircle, Info, 
  HelpCircle, Loader2, Save, X, Plus, Trash2
} from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'switch' | 'radio' | 'number' | 'url' | 'tel';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: any; // Zod schema
  helperText?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  showPasswordToggle?: boolean;
}

interface EnhancedFormProps {
  fields: FormField[];
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  title?: string;
  description?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  layout?: 'single' | 'two-column' | 'three-column';
  showValidation?: boolean;
  className?: string;
  defaultValues?: Record<string, any>;
  schema?: z.ZodSchema<any>;
}

const FloatingLabel: React.FC<{
  label: string;
  children: React.ReactNode;
  error?: FieldError;
  required?: boolean;
  tooltip?: string;
}> = ({ label, children, error, required, tooltip }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <TooltipProvider>
      <div className="relative">
        <div className="relative">
          {children}
          <Label
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none ${
              isFocused || hasValue
                ? 'text-xs -translate-y-6 text-blue-600 dark:text-blue-400'
                : 'text-sm text-slate-500 dark:text-slate-400'
            }`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
            {tooltip && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3 h-3 ml-1 inline" />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            )}
          </Label>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 mt-1 text-xs text-red-500"
          >
            <AlertCircle className="w-3 h-3" />
            {error.message}
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
};

const FormField: React.FC<{
  field: FormField;
  control: any;
  errors: any;
  register: any;
  watch: any;
}> = ({ field, control, errors, register, watch }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = errors[field.name];

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...register(field.name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            rows={field.rows || 3}
            className={`pt-6 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger className={`pt-6 ${error ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={field.name}
                  checked={value}
                  onCheckedChange={onChange}
                  disabled={field.disabled}
                />
                <Label htmlFor={field.name} className="text-sm">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              </div>
            )}
          />
        );

      case 'switch':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center space-x-2">
                <Switch
                  id={field.name}
                  checked={value}
                  onCheckedChange={onChange}
                  disabled={field.disabled}
                />
                <Label htmlFor={field.name} className="text-sm">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              </div>
            )}
          />
        );

      case 'radio':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup onValueChange={onChange} value={value}>
                {field.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        );

      case 'password':
        return (
          <div className="relative">
            <Input
              {...register(field.name)}
              type={showPassword ? 'text' : 'password'}
              placeholder={field.placeholder}
              disabled={field.disabled}
              className={`pt-6 pr-10 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {field.showPasswordToggle && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </Button>
            )}
          </div>
        );

      default:
        return (
          <Input
            {...register(field.name)}
            type={field.type}
            placeholder={field.placeholder}
            disabled={field.disabled}
            min={field.min}
            max={field.max}
            step={field.step}
            className={`pt-6 ${error ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        );
    }
  };

  if (field.type === 'checkbox' || field.type === 'switch' || field.type === 'radio') {
    return (
      <div className="space-y-2">
        {renderField()}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1 text-xs text-red-500"
          >
            <AlertCircle className="w-3 h-3" />
            {error.message}
          </motion.div>
        )}
        {field.helperText && !error && (
          <p className="text-xs text-slate-500">{field.helperText}</p>
        )}
      </div>
    );
  }

  return (
    <FloatingLabel
      label={field.label}
      error={error}
      required={field.required}
      tooltip={field.tooltip}
    >
      {renderField()}
      {field.helperText && !error && (
        <p className="text-xs text-slate-500 mt-1">{field.helperText}</p>
      )}
    </FloatingLabel>
  );
};

export const EnhancedForm: React.FC<EnhancedFormProps> = ({
  fields,
  onSubmit,
  onCancel,
  title = "Form",
  description,
  submitText = "Submit",
  cancelText = "Cancel",
  loading = false,
  layout = 'single',
  showValidation = true,
  className = '',
  defaultValues = {},
  schema
}) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode: showValidation ? 'onChange' : 'onSubmit'
  });

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const layoutClasses = {
    single: 'grid-cols-1',
    'two-column': 'grid-cols-1 md:grid-cols-2',
    'three-column': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <TooltipProvider>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {title}
            {showValidation && (
              <Badge variant={isValid ? "default" : "secondary"} className="text-xs">
                {isValid ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Valid
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Invalid
                  </>
                )}
              </Badge>
            )}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className={`grid gap-6 ${layoutClasses[layout]}`}>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  field={field}
                  control={control}
                  errors={errors}
                  register={register}
                  watch={watch}
                />
              ))}
            </div>

            {/* Form Actions */}
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {showValidation && (
                  <div className="text-xs text-slate-500">
                    {Object.keys(errors).length > 0 && (
                      <span className="text-red-500">
                        {Object.keys(errors).length} error(s) found
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    {cancelText}
                  </Button>
                )}
                
                <Button
                  type="submit"
                  disabled={loading || (showValidation && !isValid)}
                  className="min-w-[100px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {submitText}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

// Convenience components for common form types
export const UserForm: React.FC<{
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  defaultValues?: Record<string, any>;
  loading?: boolean;
}> = ({ onSubmit, onCancel, defaultValues, loading }) => {
  const fields: FormField[] = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      required: true,
      validation: z.string().min(2, 'First name must be at least 2 characters')
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      required: true,
      validation: z.string().min(2, 'Last name must be at least 2 characters')
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter email address',
      required: true,
      validation: z.string().email('Invalid email address')
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter phone number',
      validation: z.string().optional()
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      placeholder: 'Select role',
      required: true,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' },
        { value: 'guest', label: 'Guest' }
      ]
    },
    {
      name: 'active',
      label: 'Active Account',
      type: 'switch',
      helperText: 'Enable or disable this user account'
    }
  ];

  const schema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    role: z.string().min(1, 'Please select a role'),
    active: z.boolean().default(true)
  });

  return (
    <EnhancedForm
      fields={fields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title="User Information"
      description="Enter user details below"
      submitText="Save User"
      layout="two-column"
      showValidation={true}
      defaultValues={defaultValues}
      schema={schema}
      loading={loading}
    />
  );
};

export const SettingsForm: React.FC<{
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  defaultValues?: Record<string, any>;
  loading?: boolean;
}> = ({ onSubmit, onCancel, defaultValues, loading }) => {
  const fields: FormField[] = [
    {
      name: 'siteName',
      label: 'Site Name',
      type: 'text',
      placeholder: 'Enter site name',
      required: true
    },
    {
      name: 'siteUrl',
      label: 'Site URL',
      type: 'url',
      placeholder: 'https://example.com',
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter site description',
      rows: 3
    },
    {
      name: 'maintenanceMode',
      label: 'Maintenance Mode',
      type: 'switch',
      helperText: 'Enable maintenance mode to restrict access'
    },
    {
      name: 'notifications',
      label: 'Email Notifications',
      type: 'checkbox',
      helperText: 'Receive email notifications for important events'
    }
  ];

  return (
    <EnhancedForm
      fields={fields}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title="Site Settings"
      description="Configure your site settings"
      submitText="Save Settings"
      layout="single"
      showValidation={true}
      defaultValues={defaultValues}
      loading={loading}
    />
  );
};
