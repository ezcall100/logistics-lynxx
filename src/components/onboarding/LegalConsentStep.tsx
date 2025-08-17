// Legal Consent Step Component
// Phase 7.2: Legal Acknowledgment & Consent System
// Step 7 of 9 in the onboarding wizard

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { legalAcknowledgmentAPI, LegalAcknowledgmentRequest } from '../../legalAcknowledgmentAPI';
import { legalDocumentManager } from '../../legalDocuments';

interface LegalConsentStepProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  formData: any;
  isLoading?: boolean;
}

interface DocumentConsent {
  documentId: string;
  documentType: string;
  title: string;
  version: string;
  hasScrolled: boolean;
  isAccepted: boolean;
  signature: string;
  fullLegalName: string;
}

export const LegalConsentStep: React.FC<LegalConsentStepProps> = ({
  onComplete,
  onBack,
  formData,
  isLoading = false
}) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [consents, setConsents] = useState<DocumentConsent[]>([]);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const documentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const signatureCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  // Load required legal documents
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const requiredDocs = await legalAcknowledgmentAPI.getRequiredLegalDocuments();
        setDocuments(requiredDocs);
        
        // Initialize consent state for each document
        const initialConsents: DocumentConsent[] = requiredDocs.map(doc => ({
          documentId: doc.id,
          documentType: doc.document_type,
          title: doc.title,
          version: doc.version,
          hasScrolled: false,
          isAccepted: false,
          signature: '',
          fullLegalName: formData?.legalName || ''
        }));
        
        setConsents(initialConsents);
      } catch (error) {
        console.error('Error loading legal documents:', error);
        setError('Failed to load legal documents. Please try again.');
      }
    };

    loadDocuments();
  }, [formData?.legalName]);

  // Handle document scroll detection
  const handleDocumentScroll = (index: number) => {
    const documentElement = documentRefs.current[index];
    if (documentElement) {
      const { scrollTop, scrollHeight, clientHeight } = documentElement;
      const hasScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      if (hasScrolledToBottom && !consents[index].hasScrolled) {
        setConsents(prev => prev.map((consent, i) => 
          i === index ? { ...consent, hasScrolled: true } : consent
        ));
      }
    }
  };

  // Handle signature capture
  const handleSignatureCapture = (index: number, signatureData: string) => {
    setConsents(prev => prev.map((consent, i) => 
      i === index ? { ...consent, signature: signatureData } : consent
    ));
  };

  // Handle legal name change
  const handleLegalNameChange = (value: string) => {
    setConsents(prev => prev.map(consent => ({
      ...consent,
      fullLegalName: value
    })));
  };

  // Handle document acceptance toggle
  const handleAcceptanceToggle = (index: number, accepted: boolean) => {
    setConsents(prev => prev.map((consent, i) => 
      i === index ? { ...consent, isAccepted: accepted } : consent
    ));
  };

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const currentConsent = consents[currentDocumentIndex];
    if (!currentConsent) return false;

    return (
      currentConsent.hasScrolled &&
      currentConsent.isAccepted &&
      currentConsent.fullLegalName.trim().length > 0 &&
      currentConsent.signature.trim().length > 0
    );
  };

  // Handle next document or complete
  const handleNext = async () => {
    if (!validateCurrentStep()) {
      setError('Please complete all requirements for the current document.');
      return;
    }

    if (currentDocumentIndex < documents.length - 1) {
      setCurrentDocumentIndex(prev => prev + 1);
      setError(null);
    } else {
      await handleSubmit();
    }
  };

  // Handle previous document
  const handlePrevious = () => {
    if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex(prev => prev - 1);
      setError(null);
    } else {
      onBack();
    }
  };

  // Submit all acknowledgments
  const handleSubmit = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const results = await Promise.allSettled(
        consents.map(consent => 
          legalAcknowledgmentAPI.captureLegalAcknowledgment({
            userId: user.id,
            documentId: consent.documentId,
            fullLegalName: consent.fullLegalName,
            signatureData: consent.signature,
            acknowledgmentStatus: 'accepted',
            ipAddress: '', // Will be captured by server
            userAgent: navigator.userAgent
          })
        )
      );

      const failedResults = results.filter(
        result => result.status === 'rejected' || 
        (result.status === 'fulfilled' && !result.value.success)
      );

      if (failedResults.length > 0) {
        setError('Some acknowledgments failed to save. Please try again.');
        return;
      }

      setSuccess('Legal acknowledgments completed successfully!');
      
      // Pass completion data to parent
      onComplete({
        legalConsents: consents,
        acknowledgmentIds: results
          .filter(r => r.status === 'fulfilled')
          .map(r => (r as PromiseFulfilledResult<any>).value.acknowledgmentId)
      });

    } catch (error) {
      console.error('Error submitting legal acknowledgments:', error);
      setError('Failed to submit legal acknowledgments. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDocument = documents[currentDocumentIndex];
  const currentConsent = consents[currentDocumentIndex];

  if (!currentDocument || !currentConsent) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading legal documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Legal Agreements & Consent
          </h2>
          <div className="text-sm text-gray-500">
            Step 7 of 9 • Document {currentDocumentIndex + 1} of {documents.length}
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Important Legal Information
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Please carefully read each legal document below. You must scroll through the entire document 
                  and provide your electronic signature to proceed with your account setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Document Content */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentDocument.title}
          </h3>
          <p className="text-sm text-gray-500">
            Version {currentDocument.version} • Effective {new Date(currentDocument.effective_date).toLocaleDateString()}
          </p>
        </div>

        <div className="p-6">
          {/* Document Text */}
          <div 
            ref={el => documentRefs.current[currentDocumentIndex] = el}
            className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50"
            onScroll={() => handleDocumentScroll(currentDocumentIndex)}
          >
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                {currentDocument.content}
              </pre>
            </div>
          </div>

          {/* Scroll Progress Indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Document Progress</span>
              <span>{currentConsent.hasScrolled ? '✓ Read Complete' : 'Please scroll to read entire document'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentConsent.hasScrolled ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ 
                  width: currentConsent.hasScrolled ? '100%' : '0%' 
                }}
              ></div>
            </div>
          </div>

          {/* Legal Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Legal Name *
            </label>
            <input
              type="text"
              value={currentConsent.fullLegalName}
              onChange={(e) => handleLegalNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full legal name as it appears on official documents"
              required
            />
          </div>

          {/* Signature Capture */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electronic Signature *
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-white">
              <canvas
                ref={el => signatureCanvasRefs.current[currentDocumentIndex] = el}
                className="w-full h-32 border border-gray-200 rounded cursor-crosshair"
                style={{ touchAction: 'none' }}
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const canvas = signatureCanvasRefs.current[currentDocumentIndex];
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        handleSignatureCapture(currentDocumentIndex, '');
                      }
                    }
                  }}
                  className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Clear
                </button>
                <span className="text-xs text-gray-500 self-center">
                  Sign above using your mouse or touch screen
                </span>
              </div>
            </div>
          </div>

          {/* Acceptance Checkbox */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={currentConsent.isAccepted}
                onChange={(e) => handleAcceptanceToggle(currentDocumentIndex, e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <span className="ml-3 text-sm text-gray-700">
                I have read, understood, and agree to the terms and conditions outlined in the{' '}
                <strong>{currentDocument.title}</strong>. I acknowledge that this electronic signature 
                has the same legal effect as a handwritten signature.
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{consents.filter(c => c.isAccepted).length} of {consents.length} documents</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(consents.filter(c => c.isAccepted).length / consents.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isSubmitting || isLoading}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentDocumentIndex === 0 ? 'Back' : 'Previous Document'}
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!validateCurrentStep() || isSubmitting || isLoading}
          className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : currentDocumentIndex < documents.length - 1 ? (
            'Next Document'
          ) : (
            'Complete Legal Consent'
          )}
        </button>
      </div>
    </div>
  );
};

export default LegalConsentStep;
