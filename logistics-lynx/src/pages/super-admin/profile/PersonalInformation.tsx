import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const PersonalInformation = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@tms-enterprise.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Logistics Manager',
    department: 'Operations',
    address: {
      street: '123 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  const handleSave = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
          <p className="text-gray-600 mt-2">
            Update your personal details and contact information
          </p>
        </div>
        <Button>Save Change
              s</Button>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                👤
              </div>
              Basic Information
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your name and contact details
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={personalInfo.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      firstName: e.target.value
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={personalInfo.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      lastName: e.target.value
                    }))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={personalInfo.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setPersonalInfo(prev => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
              />
            </div>
            
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={personalInfo.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setPersonalInfo(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))
                }
              />
            </div>
          </div>
        </ResponsiveCard>

        {/* Professional Information */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                💼
              </div>
              Professional Information
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your job title and department
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={personalInfo.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      title: e.target.value
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Input
                  value={personalInfo.department}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      department: e.target.value
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Address Information */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🏠
              </div>
              Address Information
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your residential address
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input
                value={personalInfo.address.street}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setPersonalInfo(prev => ({
                    ...prev,
                    address: { ...prev.address, street: e.target.value }
                  }))
                }
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={personalInfo.address.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value }
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={personalInfo.address.state}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value }
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>ZIP Code</Label>
                <Input
                  value={personalInfo.address.zipCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      address: { ...prev.address, zipCode: e.target.value }
                    }))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                value={personalInfo.address.country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setPersonalInfo(prev => ({
                    ...prev,
                    address: { ...prev.address, country: e.target.value }
                  }))
                }
              />
            </div>
          </div>
        </ResponsiveCard>

        {/* Emergency Contact */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🚨
              </div>
              Emergency Contact
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Contact information for emergencies
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Contact Name</Label>
                <Input
                  value={personalInfo.emergencyContact.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Relationship</Label>
                <Input
                  value={personalInfo.emergencyContact.relationship}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setPersonalInfo(prev => ({
                      ...prev,
                      emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                    }))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Contact Phone</Label>
              <Input
                value={personalInfo.emergencyContact.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setPersonalInfo(prev => ({
                    ...prev,
                    emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                  }))
                }
              />
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default PersonalInformation;
