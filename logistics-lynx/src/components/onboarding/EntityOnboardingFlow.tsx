/**
 * Entity Onboarding Flow Component
 * Comprehensive onboarding wizard for Shippers, Brokers, and Carriers
 * Integrates with FMCSA and TIN verification systems
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { entityValidator, EntityValidationRequest, EntityValidationResponse } from '../../onboarding/validateEntity';
import { fmcsaClient } from '../../verification/fmcsaClient';
import { tinVerifier } from '../../verification/tinVerifier';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
}

interface OnboardingFormData {
  // Basic Information
  entity_type: 'shipper' | 'broker' | 'carrier';
  legal_business_name: string;
  dba_name: string;
  ein_tin: string;
  dot_number: string;
  mc_number: string;
  
  // Contact Information
  contact_email: string;
  contact_phone: string;
  website: string;
  
  // Address Information
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  
  // Business Details
  business_type: string;
  industry: string;
  years_in_business: number;
  annual_revenue: string;
  number_of_employees: number;
  
  // Compliance Information
  has_operating_authority: boolean;
  has_insurance_coverage: boolean;
  has_safety_rating: boolean;
  insurance_provider: string;
  policy_number: string;
  coverage_amount: string;
  
  // Documents
  business_license_url: string;
  insurance_certificate_url: string;
  dot_authority_url: string;
  mc_authority_url: string;
  
  // Additional Information
  primary_contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  
  emergency_contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
}

interface OnboardingFlowProps {
  orgId: string;
  entityId?: string;
  onComplete?: (entityId: string) => void;
  onCancel?: () => void;
}

export const EntityOnboardingFlow: React.FC<OnboardingFlowProps> = ({
  orgId,
  entityId,
  onComplete,
  onCancel
}) => {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>({
    entity_type: 'shipper',
    legal_business_name: '',
    dba_name: '',
    ein_tin: '',
    dot_number: '',
    mc_number: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'US'
    },
    business_type: '',
    industry: '',
    years_in_business: 0,
    annual_revenue: '',
    number_of_employees: 0,
    has_operating_authority: false,
    has_insurance_coverage: false,
    has_safety_rating: false,
    insurance_provider: '',
    policy_number: '',
    coverage_amount: '',
    business_license_url: '',
    insurance_certificate_url: '',
    dot_authority_url: '',
    mc_authority_url: '',
    primary_contact: {
      name: '',
      title: '',
      email: '',
      phone: ''
    },
    emergency_contact: {
      name: '',
      title: '',
      email: '',
      phone: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<EntityValidationResponse | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'completed' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Define onboarding steps
  const steps: OnboardingStep[] = [
    {
      id: 'entity-type',
      title: 'Entity Type',
      description: 'Select your business type',
      isCompleted: false,
      isActive: currentStep === 0,
      isDisabled: false
    },
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Enter business details',
      isCompleted: false,
      isActive: currentStep === 1,
      isDisabled: currentStep < 1
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      description: 'Provide contact details',
      isCompleted: false,
      isActive: currentStep === 2,
      isDisabled: currentStep < 2
    },
    {
      id: 'address',
      title: 'Address',
      description: 'Business address',
      isCompleted: false,
      isActive: currentStep === 3,
      isDisabled: currentStep < 3
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description: 'Regulatory compliance',
      isCompleted: false,
      isActive: currentStep === 4,
      isDisabled: currentStep < 4
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Upload required documents',
      isCompleted: false,
      isActive: currentStep === 5,
      isDisabled: currentStep < 5
    },
    {
      id: 'verification',
      title: 'Verification',
      description: 'Identity verification',
      isCompleted: false,
      isActive: currentStep === 6,
      isDisabled: currentStep < 6
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Review and complete',
      isCompleted: false,
      isActive: currentStep === 7,
      isDisabled: currentStep < 7
    }
  ];

  // Update step completion status
  useEffect(() => {
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      isCompleted: index < currentStep,
      isActive: index === currentStep,
      isDisabled: index > currentStep
    }));
  }, [currentStep, formData]);

  // Handle form data changes
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested form changes
  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof OnboardingFormData],
        [field]: value
      }
    }));
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  // Validate current step
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Entity Type
        return formData.entity_type !== '';
      case 1: // Basic Information
        return formData.legal_business_name !== '' && formData.ein_tin !== '';
      case 2: // Contact Information
        return formData.contact_email !== '' && formData.contact_phone !== '';
      case 3: // Address
        return formData.address.street !== '' && formData.address.city !== '' && 
               formData.address.state !== '' && formData.address.zip !== '';
      case 4: // Compliance
        return true; // Optional step
      case 5: // Documents
        return true; // Optional step
      case 6: // Verification
        return validationResult !== null;
      case 7: // Review
        return true;
      default:
        return false;
    }
  };

  // Perform entity verification
  const performVerification = async () => {
    setIsLoading(true);
    setVerificationStatus('verifying');
    setError(null);

    try {
      const validationRequest: EntityValidationRequest = {
        org_id: orgId,
        entity_type: formData.entity_type,
        entity_id: entityId,
        legal_business_name: formData.legal_business_name,
        ein_tin: formData.ein_tin,
        dot_number: formData.dot_number,
        mc_number: formData.mc_number,
        business_license_url: formData.business_license_url,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        address: formData.address,
        ip_address: '127.0.0.1', // Will be replaced with actual IP
        user_agent: navigator.userAgent,
        session_id: 'session-id' // Will be replaced with actual session
      };

      const result = await entityValidator.validateEntity(validationRequest);
      setValidationResult(result);
      setVerificationStatus(result.success ? 'completed' : 'failed');

      if (!result.success) {
        setError(result.error_message || 'Verification failed');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setVerificationStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit onboarding
  const submitOnboarding = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create entity record
      const { data: entity, error: entityError } = await supabase
        .from('entities')
        .insert({
          org_id: orgId,
          entity_type: formData.entity_type,
          legal_business_name: formData.legal_business_name,
          dba_name: formData.dba_name,
          ein_tin: formData.ein_tin,
          dot_number: formData.dot_number,
          mc_number: formData.mc_number,
          contact_email: formData.contact_email,
          contact_phone: formData.contact_phone,
          website: formData.website,
          address: formData.address,
          business_type: formData.business_type,
          industry: formData.industry,
          years_in_business: formData.years_in_business,
          annual_revenue: formData.annual_revenue,
          number_of_employees: formData.number_of_employees,
          has_operating_authority: formData.has_operating_authority,
          has_insurance_coverage: formData.has_insurance_coverage,
          has_safety_rating: formData.has_safety_rating,
          insurance_provider: formData.insurance_provider,
          policy_number: formData.policy_number,
          coverage_amount: formData.coverage_amount,
          business_license_url: formData.business_license_url,
          insurance_certificate_url: formData.insurance_certificate_url,
          dot_authority_url: formData.dot_authority_url,
          mc_authority_url: formData.mc_authority_url,
          primary_contact: formData.primary_contact,
          emergency_contact: formData.emergency_contact,
          verification_status: validationResult?.overall_status || 'pending',
          verification_score: validationResult?.verification_score || 0,
          is_active: validationResult?.overall_status === 'verified'
        })
        .select()
        .single();

      if (entityError) throw entityError;

      // Create compliance documents
      if (formData.business_license_url) {
        await supabase.from('compliance_documents').insert({
          org_id: orgId,
          entity_id: entity.id,
          document_type: 'business_license',
          document_url: formData.business_license_url,
          verification_status: 'pending'
        });
      }

      if (formData.insurance_certificate_url) {
        await supabase.from('compliance_documents').insert({
          org_id: orgId,
          entity_id: entity.id,
          document_type: 'insurance_certificate',
          document_url: formData.insurance_certificate_url,
          verification_status: 'pending'
        });
      }

      if (formData.dot_authority_url) {
        await supabase.from('compliance_documents').insert({
          org_id: orgId,
          entity_id: entity.id,
          document_type: 'dot_authority',
          document_url: formData.dot_authority_url,
          verification_status: 'pending'
        });
      }

      if (formData.mc_authority_url) {
        await supabase.from('compliance_documents').insert({
          org_id: orgId,
          entity_id: entity.id,
          document_type: 'mc_authority',
          document_url: formData.mc_authority_url,
          verification_status: 'pending'
        });
      }

      // Call completion callback
      if (onComplete) {
        onComplete(entity.id);
      }

      // Navigate to success page
      router.push(`/onboarding/success?entityId=${entity.id}`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <EntityTypeStep formData={formData} onChange={handleFormChange} />;
      case 1:
        return <BasicInfoStep formData={formData} onChange={handleFormChange} />;
      case 2:
        return <ContactInfoStep formData={formData} onChange={handleFormChange} />;
      case 3:
        return <AddressStep formData={formData} onChange={handleNestedChange} />;
      case 4:
        return <ComplianceStep formData={formData} onChange={handleFormChange} />;
      case 5:
        return <DocumentsStep formData={formData} onChange={handleFormChange} />;
      case 6:
        return (
          <VerificationStep
            formData={formData}
            validationResult={validationResult}
            verificationStatus={verificationStatus}
            isLoading={isLoading}
            onVerify={performVerification}
          />
        );
      case 7:
        return (
          <ReviewStep
            formData={formData}
            validationResult={validationResult}
            onSubmit={submitOnboarding}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Entity Onboarding</h1>
          <p className="mt-2 text-gray-600">
            Complete the onboarding process for your {formData.entity_type} entity
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.isCompleted
                          ? 'bg-green-600 text-white'
                          : step.isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className={`text-sm font-medium ${
                        step.isActive ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="ml-4 w-8 h-0.5 bg-gray-200" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0 || isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateCurrentStep() || isLoading}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={submitOnboarding}
                disabled={!validateCurrentStep() || isLoading}
                className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Submitting...' : 'Complete Onboarding'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Components
const EntityTypeStep: React.FC<{
  formData: OnboardingFormData;
  onChange: (field: string, value: any) => void;
}> = ({ formData, onChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Select Entity Type</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['shipper', 'broker', 'carrier'].map((type) => (
        <div
          key={type}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            formData.entity_type === type
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onChange('entity_type', type)}
        >
          <h3 className="font-medium text-gray-900 capitalize">{type}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {type === 'shipper' && 'Ship freight and goods'}
            {type === 'broker' && 'Arrange freight transportation'}
            {type === 'carrier' && 'Provide transportation services'}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const BasicInfoStep: React.FC<{
  formData: OnboardingFormData;
  onChange: (field: string, value: any) => void;
}> = ({ formData, onChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Legal Business Name *
        </label>
        <input
          type="text"
          value={formData.legal_business_name}
          onChange={(e) => onChange('legal_business_name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DBA Name
        </label>
        <input
          type="text"
          value={formData.dba_name}
          onChange={(e) => onChange('dba_name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          EIN/TIN *
        </label>
        <input
          type="text"
          value={formData.ein_tin}
          onChange={(e) => onChange('ein_tin', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="XX-XXXXXXX"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DOT Number
        </label>
        <input
          type="text"
          value={formData.dot_number}
          onChange={(e) => onChange('dot_number', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          MC Number
        </label>
        <input
          type="text"
          value={formData.mc_number}
          onChange={(e) => onChange('mc_number', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

const ContactInfoStep: React.FC<{
  formData: OnboardingFormData;
  onChange: (field: string, value: any) => void;
}> = ({ formData, onChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Email *
        </label>
        <input
          type="email"
          value={formData.contact_email}
          onChange={(e) => onChange('contact_email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Phone *
        </label>
        <input
          type="tel"
          value={formData.contact_phone}
          onChange={(e) => onChange('contact_phone', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => onChange('website', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

const AddressStep: React.FC<{
  formData: OnboardingFormData;
  onChange: (parent: string, field: string, value: any) => void;
}> = ({ formData, onChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Business Address</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.address.street}
          onChange={(e) => onChange('address', 'street', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <input
          type="text"
          value={formData.address.city}
          onChange={(e) => onChange('address', 'city', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State *
        </label>
        <select
          value={formData.address.state}
          onChange={(e) => onChange('address', 'state', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select State</option>
          {/* Add all US states */}
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          {/* ... add all states */}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ZIP Code *
        </label>
        <input
          type="text"
          value={formData.address.zip}
          onChange={(e) => onChange('address', 'zip', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  </div>
);

const ComplianceStep: React.FC<{
  formData: OnboardingFormData;
  onChange: (field: string, value: any) => void;
}> = ({ formData, onChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Compliance Information</h2>
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.has_operating_authority}
          onChange={(e) => onChange('has_operating_authority', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Has Operating Authority
        </label>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.has_insurance_coverage}
          onChange={(e) => onChange('has_insurance_coverage', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Has Insurance Coverage
        </label>
      </div>
      
      {formData.has_insurance_coverage && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider
            </label>
            <input
              type="text"
              value={formData.insurance_provider}
              onChange={(e) => onChange('insurance_provider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </label>
            <input
              type="text"
              value={formData.policy_number}
              onChange={(e) => onChange('policy_number', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coverage Amount
            </label>
            <input
              type="text"
              value={formData.coverage_amount}
              onChange={(e) => onChange('coverage_amount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

const DocumentsStep: React.FC<{
  formData: OnboardingFormData;
  onChange: (field: string, value: any) => void;
}> = ({ formData, onChange }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Document Upload</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business License
        </label>
        <input
          type="file"
          onChange={(e) => onChange('business_license_url', e.target.files?.[0]?.name || '')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Insurance Certificate
        </label>
        <input
          type="file"
          onChange={(e) => onChange('insurance_certificate_url', e.target.files?.[0]?.name || '')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DOT Authority
        </label>
        <input
          type="file"
          onChange={(e) => onChange('dot_authority_url', e.target.files?.[0]?.name || '')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          MC Authority
        </label>
        <input
          type="file"
          onChange={(e) => onChange('mc_authority_url', e.target.files?.[0]?.name || '')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
    </div>
  </div>
);

const VerificationStep: React.FC<{
  formData: OnboardingFormData;
  validationResult: EntityValidationResponse | null;
  verificationStatus: 'idle' | 'verifying' | 'completed' | 'failed';
  isLoading: boolean;
  onVerify: () => void;
}> = ({ formData, validationResult, verificationStatus, isLoading, onVerify }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Identity Verification</h2>
    
    {verificationStatus === 'idle' && (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">
          We'll verify your business information using FMCSA and IRS databases.
        </p>
        <button
          onClick={onVerify}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Start Verification
        </button>
      </div>
    )}
    
    {verificationStatus === 'verifying' && (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Verifying your business information...</p>
      </div>
    )}
    
    {verificationStatus === 'completed' && validationResult && (
      <div className="space-y-6">
        <div className={`p-4 rounded-md ${
          validationResult.overall_status === 'verified' 
            ? 'bg-green-50 border border-green-200' 
            : validationResult.overall_status === 'requires_review'
            ? 'bg-yellow-50 border border-yellow-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <h3 className="font-medium text-gray-900 mb-2">Verification Results</h3>
          <p className="text-sm text-gray-600">
            Status: <span className="font-medium capitalize">{validationResult.overall_status}</span>
          </p>
          <p className="text-sm text-gray-600">
            Score: <span className="font-medium">{validationResult.verification_score}/100</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">FMCSA Verification</h4>
            <p className="text-sm text-gray-600 capitalize">
              {validationResult.fmcsa_verification.status}
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <h4 className="font-medium text-gray-900 mb-2">TIN Verification</h4>
            <p className="text-sm text-gray-600 capitalize">
              {validationResult.tin_verification.status}
            </p>
          </div>
        </div>
        
        {validationResult.recommendations.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {validationResult.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
    
    {verificationStatus === 'failed' && (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">Verification failed. Please try again.</p>
        <button
          onClick={onVerify}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Retry Verification
        </button>
      </div>
    )}
  </div>
);

const ReviewStep: React.FC<{
  formData: OnboardingFormData;
  validationResult: EntityValidationResponse | null;
  onSubmit: () => void;
  isLoading: boolean;
}> = ({ formData, validationResult, onSubmit, isLoading }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">Review & Submit</h2>
    
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Entity Type</dt>
              <dd className="text-gray-900 capitalize">{formData.entity_type}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Legal Business Name</dt>
              <dd className="text-gray-900">{formData.legal_business_name}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">EIN/TIN</dt>
              <dd className="text-gray-900">{formData.ein_tin}</dd>
            </div>
            {formData.dot_number && (
              <div>
                <dt className="font-medium text-gray-500">DOT Number</dt>
                <dd className="text-gray-900">{formData.dot_number}</dd>
              </div>
            )}
          </dl>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Contact Information</h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Email</dt>
              <dd className="text-gray-900">{formData.contact_email}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Phone</dt>
              <dd className="text-gray-900">{formData.contact_phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Address</dt>
              <dd className="text-gray-900">
                {formData.address.street}<br />
                {formData.address.city}, {formData.address.state} {formData.address.zip}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {validationResult && (
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Verification Status</h3>
          <div className={`p-4 rounded-md ${
            validationResult.overall_status === 'verified' 
              ? 'bg-green-50 border border-green-200' 
              : validationResult.overall_status === 'requires_review'
              ? 'bg-yellow-50 border border-yellow-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className="text-sm">
              <span className="font-medium">Status:</span> {validationResult.overall_status}
            </p>
            <p className="text-sm">
              <span className="font-medium">Score:</span> {validationResult.verification_score}/100
            </p>
          </div>
        </div>
      )}
      
      <div className="border-t pt-6">
        <p className="text-sm text-gray-600 mb-4">
          By submitting this form, you confirm that all information provided is accurate and complete.
        </p>
        <button
          onClick={onSubmit}
          disabled={isLoading || !validationResult}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Complete Onboarding'}
        </button>
      </div>
    </div>
  </div>
);

export default EntityOnboardingFlow;
