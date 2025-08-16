/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Upload, MapPin, Phone, Mail, Globe, CreditCard, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanySettingsTab = () => {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState({
    name: 'LogiPortal Inc.',
    legalName: 'LogiPortal Incorporated',
    taxId: '12-3456789',
    website: 'https://logiportal.com',
    email: 'contact@logiportal.com',
    phone: '+1 (555) 123-4567',
    fax: '+1 (555) 123-4568',
    address: {
      street: '123 Logistics Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    },
    description: 'Leading provider of autonomous transportation management solutions for the logistics industry.',
    industry: 'Transportation & Logistics',
    companySize: '51-200',
    founded: '2020',
    dotNumber: 'DOT-1234567',
    mcNumber: 'MC-890123',
    scacCode: 'LOGI',
    logo: null
  });

  const handleSave = () => {
    toast({
      title: "Company Settings Saved",
      description: "Company information has been updated successfully.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Logo Uploaded",
        description: "Company logo has been updated.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Company Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={companyData.logo || ''} />
                <AvatarFallback className="text-2xl">
                  {companyData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="logo" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </label>
                </Button>
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended: 200x200px, PNG or JPG
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyData.name}
                onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Name</Label>
              <Input
                id="legalName"
                value={companyData.legalName}
                onChange={(e) => setCompanyData({...companyData, legalName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / EIN</Label>
              <Input
                id="taxId"
                value={companyData.taxId}
                onChange={(e) => setCompanyData({...companyData, taxId: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={companyData.industry}
                onValueChange={(value) => setCompanyData({...companyData, industry: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transportation & Logistics">Transportation & Logistics</SelectItem>
                  <SelectItem value="Freight Brokerage">Freight Brokerage</SelectItem>
                  <SelectItem value="Trucking">Trucking</SelectItem>
                  <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                  <SelectItem value="Warehousing">Warehousing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                value={companyData.companySize}
                onValueChange={(value) => setCompanyData({...companyData, companySize: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="founded">Founded Year</Label>
              <Input
                id="founded"
                value={companyData.founded}
                onChange={(e) => setCompanyData({...companyData, founded: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={companyData.description}
              onChange={(e) => setCompanyData({...companyData, description: e.target.value})}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={companyData.email}
                onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website
              </Label>
              <Input
                id="website"
                value={companyData.website}
                onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={companyData.phone}
                onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fax">Fax Number</Label>
              <Input
                id="fax"
                value={companyData.fax}
                onChange={(e) => setCompanyData({...companyData, fax: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Business Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={companyData.address.street}
              onChange={(e) => setCompanyData({
                ...companyData,
                address: {...companyData.address, street: e.target.value}
              })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={companyData.address.city}
                onChange={(e) => setCompanyData({
                  ...companyData,
                  address: {...companyData.address, city: e.target.value}
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Select
                value={companyData.address.state}
                onValueChange={(value) => setCompanyData({
                  ...companyData,
                  address: {...companyData.address, state: value}
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={companyData.address.zipCode}
                onChange={(e) => setCompanyData({
                  ...companyData,
                  address: {...companyData.address, zipCode: e.target.value}
                })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={companyData.address.country}
              onValueChange={(value) => setCompanyData({
                ...companyData,
                address: {...companyData.address, country: value}
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Mexico">Mexico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Licensing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Compliance & Licensing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dotNumber">DOT Number</Label>
              <Input
                id="dotNumber"
                value={companyData.dotNumber}
                onChange={(e) => setCompanyData({...companyData, dotNumber: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mcNumber">MC Number</Label>
              <Input
                id="mcNumber"
                value={companyData.mcNumber}
                onChange={(e) => setCompanyData({...companyData, mcNumber: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scacCode">SCAC Code</Label>
              <Input
                id="scacCode"
                value={companyData.scacCode}
                onChange={(e) => setCompanyData({...companyData, scacCode: e.target.value})}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Required Documents</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Certificate of Insurance (Current)</li>
              <li>• Operating Authority (Active)</li>
              <li>• W-9 Form (Updated)</li>
              <li>• Safety Rating (Satisfactory)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Cancel Changes
        </Button>
        <Button onClick={handleSave}>
          Save Company Settings
        </Button>
      </div>
    </div>
  );
};

export default CompanySettingsTab;
