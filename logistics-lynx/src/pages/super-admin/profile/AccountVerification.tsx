import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const AccountVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    email: {
      verified: true,
      email: 'john.doe@tms-enterprise.com',
      verifiedAt: '2024-01-10 14:30:00'
    },
    phone: {
      verified: false,
      phone: '+1 (555) 123-4567',
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📧
              </div>
              Email Verification
            </CardTitle>
            <CardDescription>
              Verify your email address for account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Badge className={verificationStatus.email.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }>
                  {verificationStatus.email.verified ? 'Verified' : 'Unverified'}
                </Badge>
                {!verificationStatus.email.verified && (
                  <Button
                    size="sm"
                    onClick={handleResendEmail}
                    disabled={isResendingEmail}
                  >
                    {isResendingEmail ? 'Sending...' : 'Resend Email'}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phone Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Phone Verification
            </CardTitle>
            <CardDescription>
              Verify your phone number for additional security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Badge className={verificationStatus.phone.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }>
                  {verificationStatus.phone.verified ? 'Verified' : 'Unverified'}
                </Badge>
                {!verificationStatus.phone.verified && (
                  <Button
                    size="sm"
                    onClick={handleSendSMS}
                    disabled={isSendingSMS}
                  >
                    {isSendingSMS ? 'Sending...' : 'Send SMS Code'}
                  </Button>
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
                  <Button size="sm">
                    Verify
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Identity Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🆔
              </div>
              Identity Verification
            </CardTitle>
            <CardDescription>
              Verify your identity with official documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Badge className={verificationStatus.identity.verified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }>
                  {verificationStatus.identity.verified ? 'Verified' : 'Unverified'}
                </Badge>
                {!verificationStatus.identity.verified && (
                  <Button size="sm">
                    Upload Document
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                🔐
              </div>
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                <Badge className={verificationStatus.twoFactor.enabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }>
                  {verificationStatus.twoFactor.enabled ? 'Enabled' : 'Disabled'}
                </Badge>
                <Button size="sm" variant="outline">
                  {verificationStatus.twoFactor.enabled ? 'Manage' : 'Enable'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                ✨
              </div>
              Verification Benefits
            </CardTitle>
            <CardDescription>
              Benefits of completing account verification
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountVerification;
