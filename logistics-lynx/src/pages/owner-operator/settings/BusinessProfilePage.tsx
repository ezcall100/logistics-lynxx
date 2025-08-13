import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Phone, Mail, MapPin } from 'lucide-react';

const BusinessProfilePage = () => {
  const businessInfo = {
    companyName: 'Wilson Trucking LLC',
    dbaName: 'Wilson Express',
    ein: '12-3456789',
    mcNumber: 'MC-123456',
    dotNumber: 'DOT-987654',
    businessType: 'Limited Liability Company',
    operatingAuthority: 'Interstate',
    founded: '2020-03-15'
  };

  const contactInfo = {
    address: '1234 Industrial Blvd',
    city: 'Dallas',
    state: 'TX',
    zipCode: '75201',
    phone: '(555) 123-4567',
    email: 'contact@wilsontrucking.com',
    website: 'www.wilsontrucking.com'
  };

  const operatingInfo = {
    equipmentTypes: ['Dry Van', 'Flatbed'],
    operatingRadius: '500 miles',
    serviceAreas: ['Texas', 'Oklahoma', 'Arkansas', 'Louisiana'],
    specialties: ['General Freight', 'Construction Materials'],
    certifications: ['SmartWay', 'C-TPAT']
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Business Profile</h1>
          <p className="text-muted-foreground">Manage your business information and credentials</p>
        </div>
        <Button>Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Business Information
            </CardTitle>
            <CardDescription>Core business details and legal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                <p className="font-semibold">{businessInfo.companyName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">DBA Name</p>
                <p className="font-semibold">{businessInfo.dbaName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">EIN</p>
                <p className="font-semibold">{businessInfo.ein}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Business Type</p>
                <p className="font-semibold">{businessInfo.businessType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">MC Number</p>
                <p className="font-semibold">{businessInfo.mcNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">DOT Number</p>
                <p className="font-semibold">{businessInfo.dotNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Operating Authority</p>
                <Badge variant="default">{businessInfo.operatingAuthority}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Founded</p>
                <p className="font-semibold">{businessInfo.founded}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Business address and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Business Address</p>
              <div className="mt-1">
                <p className="font-semibold">{contactInfo.address}</p>
                <p className="font-semibold">{contactInfo.city}, {contactInfo.state} {contactInfo.zipCode}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-semibold">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold">{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <p className="font-semibold">{contactInfo.website}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Operating Information</CardTitle>
          <CardDescription>Services, capabilities, and operational details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Equipment Types</p>
                <div className="flex gap-2">
                  {operatingInfo.equipmentTypes.map((type, index) => (
                    <Badge key={index} variant="secondary">{type}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Specialties</p>
                <div className="flex gap-2 flex-wrap">
                  {operatingInfo.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">{specialty}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Operating Radius</p>
                <p className="font-semibold">{operatingInfo.operatingRadius}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Service Areas</p>
                <div className="flex gap-2 flex-wrap">
                  {operatingInfo.serviceAreas.map((area, index) => (
                    <Badge key={index} variant="default">{area}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Certifications</p>
                <div className="flex gap-2">
                  {operatingInfo.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Completeness</CardTitle>
            <CardDescription>Complete your profile for better visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Business Information</span>
                <span className="text-green-600 font-medium">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Operating Details</span>
                <span className="text-yellow-600 font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Insurance Documents</span>
                <span className="text-red-600 font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common profile management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              Update Business Address
            </Button>
            <Button className="w-full" variant="outline">
              Upload Insurance Documents
            </Button>
            <Button className="w-full" variant="outline">
              Add Operating Authority
            </Button>
            <Button className="w-full" variant="outline">
              Update Service Areas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessProfilePage;