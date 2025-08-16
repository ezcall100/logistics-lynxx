/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { Search, Filter, Upload, Download, FileText, CheckCircle, Clock, AlertCircle, XCircle, Eye, Edit, Trash2, Plus, FileCheck, FileX, Shield, UserCheck, Building, Truck, Package, Users, Calendar, DollarSign, Lock, Globe, Award, Star, CheckSquare, Square, ArrowRight, ArrowLeft, RefreshCw, Settings, Bell, Mail, Phone, MapPin, CreditCard, FileSignature, Clipboard, BookOpen, Scale, Gavel, Handshake, Certificate, Stamp } from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data for Onboarding
interface OnboardingPacket {
  id: string;
  name: string;
  type: 'carrier' | 'broker' | 'shipper' | 'driver' | 'owner_operator' | 'software';
  description: string;
  status: 'draft' | 'pending' | 'in_review' | 'approved' | 'rejected';
  completion: number;
  requiredDocuments: OnboardingDocument[];
  agreements: OnboardingAgreement[];
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface OnboardingDocument {
  id: string;
  name: string;
  type: 'identification' | 'insurance' | 'license' | 'permit' | 'certificate' | 'financial' | 'operational' | 'compliance';
  status: 'required' | 'uploaded' | 'verified' | 'rejected' | 'expired';
  uploadedAt?: string;
  expiresAt?: string;
  fileSize?: string;
  fileName?: string;
  notes?: string;
  isRequired: boolean;
}

interface OnboardingAgreement {
  id: string;
  name: string;
  type: 'service' | 'carrier' | 'broker' | 'shipper' | 'confidentiality' | 'liability' | 'payment' | 'operational';
  status: 'pending' | 'signed' | 'expired' | 'terminated';
  signedAt?: string;
  expiresAt?: string;
  signerName?: string;
  signerEmail?: string;
  isRequired: boolean;
  content: string;
}

interface ComplianceCheck {
  id: string;
  name: string;
  category: 'safety' | 'financial' | 'operational' | 'regulatory' | 'insurance';
  status: 'pending' | 'passed' | 'failed' | 'expired';
  dueDate: string;
  completedAt?: string;
  score?: number;
  notes?: string;
}

const mockPackets: OnboardingPacket[] = [
  {
    id: 'PKT-001',
    name: 'Carrier Onboarding Packet',
    type: 'carrier',
    description: 'Complete onboarding packet for motor carriers including authority, insurance, and operational requirements.',
    status: 'in_review',
    completion: 75,
    requiredDocuments: [
      {
        id: 'DOC-001',
        name: 'Motor Carrier Authority',
        type: 'permit',
        status: 'verified',
        uploadedAt: '2024-01-10',
        expiresAt: '2025-01-10',
        fileSize: '2.4 MB',
        fileName: 'MC_Authority_2024.pdf',
        isRequired: true
      },
      {
        id: 'DOC-002',
        name: 'Cargo Insurance Certificate',
        type: 'insurance',
        status: 'uploaded',
        uploadedAt: '2024-01-12',
        expiresAt: '2024-12-31',
        fileSize: '1.8 MB',
        fileName: 'Cargo_Insurance_2024.pdf',
        isRequired: true
      }
    ],
    agreements: [
      {
        id: 'AGR-001',
        name: 'Carrier Service Agreement',
        type: 'carrier',
        status: 'signed',
        signedAt: '2024-01-15',
        expiresAt: '2025-01-15',
        signerName: 'John Smith',
        signerEmail: 'john@fasttrack.com',
        isRequired: true,
        content: 'This agreement establishes the terms and conditions...'
      }
    ],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
    assignedTo: 'FastTrack Logistics',
    priority: 'high'
  },
  {
    id: 'PKT-002',
    name: 'Broker Onboarding Packet',
    type: 'broker',
    description: 'Freight broker onboarding including surety bond, authority, and compliance requirements.',
    status: 'approved',
    completion: 100,
    requiredDocuments: [
      {
        id: 'DOC-003',
        name: 'Broker Authority',
        type: 'permit',
        status: 'verified',
        uploadedAt: '2024-01-08',
        expiresAt: '2025-01-08',
        fileSize: '1.2 MB',
        fileName: 'Broker_Authority_2024.pdf',
        isRequired: true
      }
    ],
    agreements: [
      {
        id: 'AGR-002',
        name: 'Broker Service Agreement',
        type: 'broker',
        status: 'signed',
        signedAt: '2024-01-10',
        expiresAt: '2025-01-10',
        signerName: 'Sarah Johnson',
        signerEmail: 'sarah@globalbrokers.com',
        isRequired: true,
        content: 'This agreement establishes the broker relationship...'
      }
    ],
    createdAt: '2024-01-03',
    updatedAt: '2024-01-10',
    assignedTo: 'Global Brokers Inc',
    priority: 'medium'
  }
];

const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: 'COMP-001',
    name: 'Safety Rating Check',
    category: 'safety',
    status: 'passed',
    dueDate: '2024-01-20',
    completedAt: '2024-01-15',
    score: 95,
    notes: 'Excellent safety record with no violations'
  },
  {
    id: 'COMP-002',
    name: 'Financial Stability Check',
    category: 'financial',
    status: 'pending',
    dueDate: '2024-01-25',
    score: 0,
    notes: 'Pending financial documentation review'
  }
];

export const OnboardingPortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [packets, setPackets] = useState<OnboardingPacket[]>(mockPackets);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>(mockComplianceChecks);
  const [selectedPacket, setSelectedPacket] = useState<OnboardingPacket | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleUploadDocument = () => {
    toast({
      title: 'Document Uploaded',
      description: 'Document has been successfully uploaded and is pending verification.',
      variant: 'default'
    });
    setShowUploadDialog(false);
  };

  const handleSignAgreement = () => {
    toast({
      title: 'Agreement Signed',
      description: 'Agreement has been successfully signed and recorded.',
      variant: 'default'
    });
    setShowSignDialog(false);
  };

  const getRoleSpecificPacket = () => {
    switch (currentRole) {
      case 'carrier_admin':
        return packets.find(p => p.type === 'carrier');
      case 'freight_broker_admin':
        return packets.find(p => p.type === 'broker');
      case 'shipper_admin':
        return packets.find(p => p.type === 'shipper');
      case 'driver':
        return packets.find(p => p.type === 'driver');
      case 'owner_operator':
        return packets.find(p => p.type === 'owner_operator');
      default:
        return packets[0];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'uploaded': return 'bg-blue-100 text-blue-800';
      case 'required': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentPacket = getRoleSpecificPacket();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📋 Onboarding Portal</h1>
              <p className="text-gray-600">Legal documents, agreements, and compliance management</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {roleInfo.name}
              </Badge>
              <Button onClick={() => setShowUploadDialog(true)} className="bg-indigo-600 hover:bg-indigo-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="agreements">Agreements</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Onboarding Progress */}
            {currentPacket && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentPacket.name}</CardTitle>
                      <p className="text-gray-600">{currentPacket.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(currentPacket.status)}>
                        {currentPacket.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(currentPacket.priority)}>
                        {currentPacket.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Completion Progress</span>
                        <span>{currentPacket.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${currentPacket.completion}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">
                          {currentPacket.requiredDocuments.length}
                        </div>
                        <div className="text-sm text-gray-600">Documents</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {currentPacket.requiredDocuments.filter(d => d.status === 'verified').length}
                        </div>
                        <div className="text-sm text-gray-600">Verified</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {currentPacket.agreements.length}
                        </div>
                        <div className="text-sm text-gray-600">Agreements</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {currentPacket.agreements.filter(a => a.status === 'signed').length}
                        </div>
                        <div className="text-sm text-gray-600">Signed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Upload className="h-6 w-6 text-indigo-600" />
                    <CardTitle>Upload Documents</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload required documents for verification and approval.
                  </p>
                  <Button 
                    onClick={() => setShowUploadDialog(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Upload Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <FileSignature className="h-6 w-6 text-green-600" />
                    <CardTitle>Sign Agreements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Review and sign required legal agreements and contracts.
                  </p>
                  <Button 
                    onClick={() => setShowSignDialog(true)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Sign Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <CardTitle>Track Progress</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Monitor your onboarding progress and compliance status.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('compliance')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {currentPacket && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Required Documents</h3>
                  <Button onClick={() => setShowUploadDialog(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentPacket.requiredDocuments.map((doc) => (
                    <Card key={doc.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{doc.name}</CardTitle>
                            <p className="text-sm text-gray-600">{doc.type}</p>
                          </div>
                          <Badge className={getDocumentStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {doc.fileName && (
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{doc.fileName}</span>
                            </div>
                          )}
                          {doc.uploadedAt && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Uploaded: {doc.uploadedAt}</span>
                            </div>
                          )}
                          {doc.expiresAt && (
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Expires: {doc.expiresAt}</span>
                            </div>
                          )}
                          <div className="flex space-x-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="agreements" className="space-y-6">
            {currentPacket && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Legal Agreements</h3>
                  <Button onClick={() => setShowSignDialog(true)}>
                    <FileSignature className="h-4 w-4 mr-2" />
                    Sign Agreement
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {currentPacket.agreements.map((agreement) => (
                    <Card key={agreement.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{agreement.name}</CardTitle>
                            <p className="text-sm text-gray-600">{agreement.type}</p>
                          </div>
                          <Badge className={getStatusColor(agreement.status)}>
                            {agreement.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {agreement.signedAt && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Signed: {agreement.signedAt}</span>
                            </div>
                          )}
                          {agreement.expiresAt && (
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Expires: {agreement.expiresAt}</span>
                            </div>
                          )}
                          {agreement.signerName && (
                            <div className="flex items-center space-x-2">
                              <UserCheck className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Signed by: {agreement.signerName}</span>
                            </div>
                          )}
                          <div className="flex space-x-2 pt-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {agreement.status === 'pending' && (
                              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                                <FileSignature className="h-4 w-4 mr-1" />
                                Sign Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Compliance Checks</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {complianceChecks.map((check) => (
                  <Card key={check.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{check.name}</CardTitle>
                          <p className="text-sm text-gray-600">{check.category}</p>
                        </div>
                        <Badge className={getStatusColor(check.status)}>
                          {check.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Due: {check.dueDate}</span>
                        </div>
                        {check.score !== undefined && (
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Score: {check.score}/100</span>
                          </div>
                        )}
                        {check.notes && (
                          <div className="flex items-start space-x-2">
                            <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span className="text-sm text-gray-600">{check.notes}</span>
                          </div>
                        )}
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Refresh
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Document Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identification">Identification</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="license">License</SelectItem>
                  <SelectItem value="permit">Permit</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Document Name</label>
              <Input placeholder="Enter document name" />
            </div>
            <div>
              <label className="text-sm font-medium">File</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Expiration Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <textarea 
                className="w-full p-3 border rounded-md" 
                rows={3}
                placeholder="Any additional notes..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUploadDocument}>
                Upload Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Agreement Dialog */}
      <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sign Agreement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Agreement Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select agreement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="carrier">Carrier Agreement</SelectItem>
                  <SelectItem value="broker">Broker Agreement</SelectItem>
                  <SelectItem value="shipper">Shipper Agreement</SelectItem>
                  <SelectItem value="confidentiality">Confidentiality Agreement</SelectItem>
                  <SelectItem value="liability">Liability Agreement</SelectItem>
                  <SelectItem value="payment">Payment Agreement</SelectItem>
                  <SelectItem value="operational">Operational Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="Enter your full name" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="text-sm font-medium">Company</label>
              <Input placeholder="Enter company name" />
            </div>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Enter your title" />
            </div>
            <div className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4" />
              <span className="text-sm">I agree to the terms and conditions</span>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSignDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSignAgreement}>
                <FileSignature className="h-4 w-4 mr-2" />
                Sign Agreement
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OnboardingPortal;
