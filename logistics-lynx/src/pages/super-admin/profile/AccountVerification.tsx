import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
const AccountVerification = () => {
  const [verificationStatus] = useState({
    email: {
      verified: true,
      email: 'john.doe@tms-enterprise.com',
      verifiedAt: '2024-01-10 14:30:00'
    },
    phone: {
      verified: false,
      phone: '+1 (555); 123-4567',
      verifiedAt: null
    },
    identity: {
      verified: true,
      documentType: 'Driver License',
      verifiedAt: '2024-01-08 11:15:00'
    },
    twoFactor: {
      enabled: true,
      method: 'Authenticator App',
      enabledAt: '2024-01-05 09:45:00'
    }
  });

  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [isSendingSMS, setIsSendingSMS] = useState(false);

  const handleResendEmail = async () => {
    setIsResendingEmail(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsResendingEmail(false);
  };

  const handleSendSMS = async () => {
    setIsSendingSMS(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSendingSMS(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Verification</h1>
          <p className="text-gray-600 mt-2">
            Verify your account details and enable security features
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Email Verification */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📧
              </div>
              Email Verification
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Verify your email address for account security
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{verificationStatus.email.email}</p>
                <p className="text-sm text-gray-600">
                  {verificationStatus.email.verified 
                    ? `Verified on ${verificationStatus.email.verifiedAt}`
                    : 'Not verified yet'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {verificationStatus.email.verified ? 'Verified' : 'Unverified'}
                </span>
                {!verificationStatus.email.verified && (
                  <Button>
                size="sm"
              </Button>onClick={handleResendEmail}
                    disabled={isResendingEmail}
                  >{isResendingEmail ? 'Sending...' : 'Resend Email'}
                )}<Button>
                 
              </Button></div>
          </div>
        </ResponsiveCard>

        {/* Phone Verification */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Phone Verification
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Verify your phone number for additional security
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{verificationStatus.phone.phone}</p>
                <p className="text-sm text-gray-600">
                  {verificationStatus.phone.verified 
                    ? `Verified on ${verificationStatus.phone.verifiedAt}`
                    : 'Not verified yet'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {verificationStatus.phone.verified ? 'Verified' : 'Unverified'}
                </span>
                {!verificationStatus.phone.verified && (
                    size="sm"
                    onClick={handleSendSMS}
                    disabled={isSendingSMS}
                  >
                    {isSendingSMS ? 'Sending...' : 'Send SMS Code'}
                )}
              </div>
            </div>
            
            {!verificationStatus.phone.verified && (
              <div className="space-y-2">
                <Label>Enter SMS Code</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="000000"
                    maxLength={6}
                    className="w-32"
                  />
                    Verify
                </div></Button>
              </div>
            )}
          </div>
        </ResponsiveCard>

        {/* Identity Verification */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🆔
              </div>
              Identity Verification
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Verify your identity with official documents
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{verificationStatus.identity.documentType}</p>
                <p className="text-sm text-gray-600">
                  {verificationStatus.identity.verified 
                    ? `Verified on ${verificationStatus.identity.verifiedAt}`
                    : 'Not verified yet'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {verificationStatus.identity.verified ? 'Verified' : 'Unverified'}
                </span>
                {!verificationStatus.identity.verified && (
                    Upload Document
                )}
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Two-Factor Authentication */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                🔐
              </div>
              Two-Factor Authentication
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{verificationStatus.twoFactor.method}</p>
                <p className="text-sm text-gray-600">
                  {verificationStatus.twoFactor.enabled 
                    ? `Enabled on ${verificationStatus.twoFactor.enabledAt}`
                    : 'Not enabled yet'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {verificationStatus.twoFactor.enabled ? 'Enabled' : 'Disabled'}
                </span>
                  {verificationStatus.twoFactor.enabled ? 'Manage' : 'Enable'}
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Verification Benefits */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                ✨
              </div>
              Verification Benefits
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Benefits of completing account verification
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Enhanced Security</h4>
                  <p className="text-sm text-gray-600">
                    Protect your account with multiple verification methods
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Recovery</h4>
                  <p className="text-sm text-gray-600">
                    Easier account recovery if you lose access
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Trusted Status</h4>
                  <p className="text-sm text-gray-600">
                    Gain trusted user status with full verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default AccountVerification;
