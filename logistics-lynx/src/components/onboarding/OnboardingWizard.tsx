import React, { useState, useEffect } from 'react';
import { ResponsiveCard, EnhancedButton } from '../../../components/ui';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  required: boolean;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to TMS',
    description: 'Let\'s get you set up with your account',
    icon: User,
    required: true
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Tell us about yourself',
    icon: User,
    required: true
  },
  {
    id: 'company',
    title: 'Company Information',
    description: 'Verify your company details',
    icon: Building,
    required: true
  },
  {
    id: 'security',
    title: 'Security Setup',
    description: 'Set up two-factor authentication',
    icon: Shield,
    required: false
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    icon: CheckCircle,
    required: false
  }
];

interface OnboardingWizardProps {
  onComplete?: () => void;
  invitationId?: string;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  onComplete,
  invitationId
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    job_title: '',
    department: '',
    company_name: '',
    company_size: '',
    enable_2fa: false,
    email_notifications: true,
    marketing_emails: false
  });
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();
  const { user, session, refreshUser } = useAuth();

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  // Check if user has pending invitation
  useEffect(() => {
    if (invitationId) {
      // Handle invitation acceptance
      handleInvitationAcceptance();
    }
  }, [invitationId]);

  const handleInvitationAcceptance = async () => {
    if (!invitationId) return;

    try {
      const { data, error } = await supabase.rpc('accept_invitation', {
        _invitation_id: invitationId
      });

      if (error) {
        console.error('Accept invitation error:', error);
        toast({
          title: "Invitation Error",
          description: "Failed to accept invitation. Please contact support.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Invitation acceptance error:', error);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const handleNext = async () => {
    if (currentStep === onboardingSteps.length - 1) {
      await handleComplete();
    } else {
      markStepComplete(currentStepData.id);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          job_title: formData.job_title,
          department: formData.department,
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString()
        })
        .eq('user_id', user?.id);

      if (profileError) {
        throw profileError;
      }

      // Update company information if provided
      if (formData.company_name && user?.company_id) {
        const { error: companyError } = await supabase
          .from('companies')
          .update({
            name: formData.company_name,
            size: formData.company_size
          })
          .eq('id', user.company_id);

        if (companyError) {
          console.error('Company update error:', companyError);
        }
      }

      // Update user preferences
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          email_notifications: formData.email_notifications,
          marketing_emails: formData.marketing_emails,
          two_factor_enabled: formData.enable_2fa
        });

      if (preferencesError) {
        console.error('Preferences update error:', preferencesError);
      }

      // Refresh user data
      await refreshUser();

      toast({
        title: "Onboarding Complete!",
        description: "Welcome to TMS. Your account is now fully set up.",
      });

      onComplete?.();

    } catch (error: any) {
      console.error('Onboarding completion error:', error);
      toast({
        title: "Setup Error",
        description: error.message || "Failed to complete onboarding. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'welcome':
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Welcome to TMS!</h2>
            <p className="text-muted-foreground">
              We're excited to have you on board. Let's get your account set up in just a few steps.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">What we'll cover:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Complete your profile information</li>
                <li>• Verify your company details</li>
                <li>• Set up security preferences</li>
                <li>• Customize your experience</li>
              </ul>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => updateFormData('full_name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job_title">Job Title</Label>
                <Input
                  id="job_title"
                  value={formData.job_title}
                  onChange={(e) => updateFormData('job_title', e.target.value)}
                  placeholder="Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => updateFormData('department', e.target.value)}
                  placeholder="Operations"
                />
              </div>
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => updateFormData('company_name', e.target.value)}
                placeholder="Your Company Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_size">Company Size</Label>
              <select
                id="company_size"
                value={formData.company_size}
                onChange={(e) => updateFormData('company_size', e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enable_2fa"
                checked={formData.enable_2fa}
                onCheckedChange={(checked) => updateFormData('enable_2fa', checked)}
              />
              <Label htmlFor="enable_2fa">Enable Two-Factor Authentication</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Two-factor authentication adds an extra layer of security to your account. 
              You can set this up later in your account settings.
            </p>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="email_notifications"
                checked={formData.email_notifications}
                onCheckedChange={(checked) => updateFormData('email_notifications', checked)}
              />
              <Label htmlFor="email_notifications">Receive email notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing_emails"
                checked={formData.marketing_emails}
                onCheckedChange={(checked) => updateFormData('marketing_emails', checked)}
              />
              <Label htmlFor="marketing_emails">Receive marketing emails</Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStepData.id) {
      case 'profile':
        return formData.full_name.trim().length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ResponsiveCard className="w-full max-w-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <currentStepData.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl">{currentStepData.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{currentStepData.description}</p>
        </div>
        
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {onboardingSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Content */}
          <div className="min-h-[300px] flex items-center justify-center">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <EnhancedButton
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isLoading}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </EnhancedButton>
            
            <EnhancedButton
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Completing...
                </>
              ) : currentStep === onboardingSteps.length - 1 ? (
                <>
                  Complete Setup
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </EnhancedButton>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};
