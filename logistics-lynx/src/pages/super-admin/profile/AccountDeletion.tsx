import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const AccountDeletion = () => {
  const [deletionStep, setDeletionStep] = useState<'warning' | 'confirmation' | 'processing'>('warning');
  const [confirmationText, setConfirmationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const accountData = {
    email: 'john.doe@tms-enterprise.com',
    name: 'John Doe',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15 14:30:00',
    dataSize: '2.3 GB',
    activeProjects: 5,
    teamMembers: 12
  };

  const handleStartDeletion = () => {
    setDeletionStep('confirmation');
  };

  const handleConfirmDeletion = async () => {
    if (confirmationText !== 'DELETE') {
      return;
    }
    
    setIsLoading(true);
    setDeletionStep('processing');
    
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // In a real app, this would redirect to a confirmation page
    console.log('Account deletion completed');
  };

  const handleCancel = () => {
    setDeletionStep('warning');
    setConfirmationText('');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Deletion</h1>
          <p className="text-gray-600 mt-2">
            Permanently delete your account and all associated data
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Warning Card */}
        <ResponsiveCard className="border-red-200 bg-red-50">
          <div className="mb-4">
            <h3 className="text-red-800 flex items-center gap-2">
              ⚠️ Warning
            </h3>
          </div>
          <div>
            <p className="text-red-700">
              Account deletion is permanent and cannot be undone. All your data, 
              projects, and settings will be permanently removed from our systems.
            </p>
          </div>
        </ResponsiveCard>

        {/* Account Information */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                👤
              </div>
              Account Information
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Details of the account that will be deleted
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <p className="text-gray-900">{accountData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900">{accountData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Member Since</label>
                  <p className="text-gray-900">{accountData.joinDate}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Last Login</label>
                  <p className="text-gray-900">{accountData.lastLogin}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Data Size</label>
                  <p className="text-gray-900">{accountData.dataSize}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Active Projects</label>
                  <p className="text-gray-900">{accountData.activeProjects}</p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Data That Will Be Deleted */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🗑️
              </div>
              Data That Will Be Deleted
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              All of the following data will be permanently removed
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span>📁</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">All Projects & Files</h4>
                    <p className="text-sm text-gray-600">{accountData.activeProjects} active projects</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Will be deleted</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span>👥</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Team Memberships</h4>
                    <p className="text-sm text-gray-600">{accountData.teamMembers} team members</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Will be deleted</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span>⚙️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Account Settings</h4>
                    <p className="text-sm text-gray-600">Preferences, notifications, security settings</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Will be deleted</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span>📊</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics & Reports</h4>
                    <p className="text-sm text-gray-600">Usage data, performance metrics, reports</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Will be deleted</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span>💳</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Billing Information</h4>
                    <p className="text-sm text-gray-600">Payment methods, invoices, subscription data</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Will be deleted</span>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Action Buttons */}
        {deletionStep === 'warning' && (
          <ResponsiveCard>
            <div className="pt-6">
              <div className="flex gap-3">
                <EnhancedButton 
                  onClick={handleStartDeletion}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Start Account Deletion
                </EnhancedButton>
                <EnhancedButton variant="outline">
                  Cancel
                </EnhancedButton>
              </div>
            </div>
          </ResponsiveCard>
        )}

        {/* Confirmation Step */}
        {deletionStep === 'confirmation' && (
          <ResponsiveCard className="border-red-200 bg-red-50">
            <div className="mb-4">
              <h3 className="text-red-800 flex items-center gap-2">
                🔒 Final Confirmation
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-red-700">
                To confirm account deletion, please type <strong>DELETE</strong> in the field below:
              </p>
              <div>
                <Label htmlFor="confirmation-text">Type DELETE to confirm</Label>
                <Input
                  value={confirmationText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmationText(e.target.value)}
                  placeholder="DELETE"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3">
                <EnhancedButton 
                  onClick={handleConfirmDeletion}
                  disabled={confirmationText !== 'DELETE'}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Permanently Delete Account
                </EnhancedButton>
                <EnhancedButton variant="outline" onClick={handleCancel}>
                  Cancel
                </EnhancedButton>
              </div>
            </div>
          </ResponsiveCard>
        )}

        {/* Processing Step */}
        {deletionStep === 'processing' && (
          <ResponsiveCard>
            <div className="pt-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Deleting Account</h3>
                <p className="text-gray-600">
                  Please wait while we permanently delete your account and all associated data...
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        )}

        {/* Alternative Options */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                💡
              </div>
              Alternative Options
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Consider these alternatives before deleting your account
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Deactivate Account</h4>
                  <p className="text-sm text-gray-600">
                    Temporarily deactivate your account instead of permanent deletion
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Export Your Data</h4>
                  <p className="text-sm text-gray-600">
                    Download a copy of all your data before deletion
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-gray-900">Contact Support</h4>
                  <p className="text-sm text-gray-600">
                    Get help with account issues or concerns
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <EnhancedButton variant="outline">
                Export Data
              </EnhancedButton>
              <EnhancedButton variant="outline">
                Contact Support
              </EnhancedButton>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default AccountDeletion;
