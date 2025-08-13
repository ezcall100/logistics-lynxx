import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Plus, 
  Save, 
  Upload, 
  Download, 
  Code, 
  ArrowRight,
  FileText,
  CheckCircle,
  AlertTriangle,
  Edit,
  Copy,
  Trash2,
  TestTube
} from 'lucide-react';

const MappingConfiguration: React.FC = () => {
  const [selectedMapping, setSelectedMapping] = useState('');

  const mappingProfiles = [
    {
      id: "MAP-204-001",
      name: "Standard EDI 204 Load Tender",
      type: "EDI 204",
      status: "active",
      lastModified: "2024-01-15",
      version: "v2.1",
      partners: ["ABC Logistics", "MegaHaul Corp"],
      segments: 42,
      fields: 156
    },
    {
      id: "MAP-210-001",
      name: "Freight Invoice Mapping",
      type: "EDI 210", 
      status: "active",
      lastModified: "2024-01-12",
      version: "v1.8",
      partners: ["FastTruck Express", "QuickShip LLC"],
      segments: 38,
      fields: 124
    },
    {
      id: "MAP-214-001",
      name: "Shipment Status Updates",
      type: "EDI 214",
      status: "draft",
      lastModified: "2024-01-10",
      version: "v1.2",
      partners: ["TruckMaster Inc"],
      segments: 25,
      fields: 89
    },
    {
      id: "MAP-990-001",
      name: "Load Response Mapping",
      type: "EDI 990",
      status: "active",
      lastModified: "2024-01-08",
      version: "v3.0",
      partners: ["ABC Logistics", "FastTruck Express"],
      segments: 18,
      fields: 67
    }
  ];

  const fieldMappings = [
    {
      segment: "ST",
      field: "ST01",
      description: "Transaction Set Identifier Code",
      source: "TMS.TransactionType",
      target: "EDI.ST.ST01",
      dataType: "AN",
      required: true,
      defaultValue: "204",
      validation: "Must be '204' for Load Tender"
    },
    {
      segment: "B2",
      field: "B201",
      description: "Shipment Identification Number",
      source: "TMS.ShipmentID",
      target: "EDI.B2.B201",
      dataType: "AN",
      required: true,
      defaultValue: "",
      validation: "Max 30 characters"
    },
    {
      segment: "B2A",
      field: "B2A01",
      description: "Transaction Set Purpose Code",
      source: "TMS.PurposeCode",
      target: "EDI.B2A.B2A01",
      dataType: "ID",
      required: true,
      defaultValue: "00",
      validation: "00=Original, 05=Replace"
    },
    {
      segment: "N1",
      field: "N101",
      description: "Entity Identifier Code",
      source: "TMS.EntityType",
      target: "EDI.N1.N101",
      dataType: "ID",
      required: true,
      defaultValue: "SH",
      validation: "SH=Shipper, CN=Consignee"
    },
    {
      segment: "N3",
      field: "N301",
      description: "Address Line 1",
      source: "TMS.Address.Line1",
      target: "EDI.N3.N301",
      dataType: "AN",
      required: false,
      defaultValue: "",
      validation: "Max 55 characters"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default">Active</Badge>;
      case 'draft': return <Badge variant="secondary">Draft</Badge>;
      case 'deprecated': return <Badge variant="destructive">Deprecated</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Mapping & Configuration</h1>
          <p className="text-muted-foreground">
            Configure data mapping between TMS and EDI formats
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Mapping
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mapping Profiles */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Mapping Profiles
            </CardTitle>
            <CardDescription>Available EDI mapping configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mappingProfiles.map((profile) => (
                <div 
                  key={profile.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedMapping === profile.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedMapping(profile.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{profile.type}</Badge>
                    {getStatusBadge(profile.status)}
                  </div>
                  <div className="font-medium">{profile.name}</div>
                  <div className="text-sm text-muted-foreground">{profile.version}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {profile.segments} segments, {profile.fields} fields
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Partners: {profile.partners.length}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mapping Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Field Mapping Configuration
            </CardTitle>
            <CardDescription>
              {selectedMapping ? 'Configure field mappings for selected profile' : 'Select a mapping profile to configure'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMapping ? (
              <Tabs defaultValue="fields" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="fields">Field Mapping</TabsTrigger>
                  <TabsTrigger value="validation">Validation</TabsTrigger>
                  <TabsTrigger value="testing">Testing</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="fields" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Field Mappings</h3>
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Field
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {fieldMappings.map((mapping, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">EDI Field</div>
                            <div className="font-medium">{mapping.segment}-{mapping.field}</div>
                            <div className="text-sm text-muted-foreground">{mapping.description}</div>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">TMS Source</div>
                            <div className="font-medium">{mapping.source}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={mapping.required ? "destructive" : "secondary"} className="text-xs">
                                {mapping.required ? "Required" : "Optional"}
                              </Badge>
                              <Badge variant="outline" className="text-xs">{mapping.dataType}</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Default Value</label>
                              <Input 
                                value={mapping.defaultValue} 
                                placeholder="Enter default value..."
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Validation Rule</label>
                              <Input 
                                value={mapping.validation}
                                placeholder="Enter validation rule..."
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2 mt-3">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="validation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Validation Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Business Rules</label>
                          <Textarea 
                            placeholder="Enter custom business validation rules..."
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Data Quality Checks</label>
                          <Textarea 
                            placeholder="Define data quality validation..."
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <TestTube className="h-4 w-4" />
                        Mapping Test Suite
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Test Data</label>
                          <Textarea 
                            placeholder="Paste sample EDI data for testing..."
                            className="mt-1 h-32"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button className="gap-2">
                            <TestTube className="h-4 w-4" />
                            Run Test
                          </Button>
                          <Button variant="outline">
                            Load Sample
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Profile Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Profile Name</label>
                            <Input placeholder="Enter profile name..." className="mt-1" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Version</label>
                            <Input placeholder="v1.0" className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Textarea placeholder="Profile description..." className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Trading Partners</label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select partners..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="abc">ABC Logistics</SelectItem>
                              <SelectItem value="mega">MegaHaul Corp</SelectItem>
                              <SelectItem value="fast">FastTruck Express</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Select a mapping profile from the left panel to configure field mappings</p>
              </div>
            )}
          </CardContent>
          
          {selectedMapping && (
            <div className="flex justify-end gap-2 p-6 border-t">
              <Button variant="outline">Cancel</Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MappingConfiguration;