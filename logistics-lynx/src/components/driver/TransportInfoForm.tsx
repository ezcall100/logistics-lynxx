import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Truck, 
  Package, 
  FileText, 
  Save,
  Container,
  Shield,
  Hash,
  Plus,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TransportField {
  id: string;
  fieldType: string;
  label: string;
  value: string;
  icon: React.ComponentType<unknown>;
}

interface TransportInfo {
  trailerNumber?: string;
  chassisNumber?: string;
  poNumber?: string;
  refNumber?: string;
  containerNumber?: string;
  sealNumber?: string;
  equipmentType?: string;
  hazmatClass?: string;
  customerRef?: string;
}

interface TransportInfoFormProps {
  legType: 'hook' | 'pickup' | 'drop' | 'delivery' | 'empty_return';
  transportInfo?: TransportInfo;
  onSave: (info: TransportInfo) => void;
}

const FIELD_OPTIONS = [
  { value: 'trailerNumber', label: 'Trailer Number', icon: Truck },
  { value: 'poNumber', label: 'PO Number', icon: FileText },
  { value: 'chassisNumber', label: 'Chassis Number', icon: Container },
  { value: 'refNumber', label: 'Reference Number', icon: Hash },
  { value: 'containerNumber', label: 'Container Number', icon: Container },
  { value: 'sealNumber', label: 'Seal Number', icon: Shield },
  { value: 'equipmentType', label: 'Equipment Type', icon: Package },
  { value: 'hazmatClass', label: 'Hazmat Class', icon: Shield },
  { value: 'customerRef', label: 'Customer Ref', icon: Hash },
];

export const TransportInfoForm: React.FC<TransportInfoFormProps> = ({
  legType,
  transportInfo = {},
  onSave
}) => {
  const [fields, setFields] = useState<TransportField[]>([]);
  const [selectedFieldType, setSelectedFieldType] = useState<string>('');

  // Initialize fields from existing transport info
  React.useEffect(() => {
    const initialFields: TransportField[] = [];
    Object.entries(transportInfo).forEach(([key, value]) => {
      if (value) {
        const fieldOption = FIELD_OPTIONS.find(opt => opt.value === key);
        if (fieldOption) {
          initialFields.push({
            id: Math.random().toString(36).substr(2, 9),
            fieldType: key,
            label: fieldOption.label,
            value: value as string,
            icon: fieldOption.icon
          });
        }
      }
    });
    setFields(initialFields);
  }, [transportInfo]);

  const addField = () => {
    if (!selectedFieldType) return;

    const fieldOption = FIELD_OPTIONS.find(opt => opt.value === selectedFieldType);
    if (!fieldOption) return;

    const newField: TransportField = {
      id: Math.random().toString(36).substr(2, 9),
      fieldType: selectedFieldType,
      label: fieldOption.label,
      value: '',
      icon: fieldOption.icon
    };

    setFields(prev => [...prev, newField]);
    setSelectedFieldType('');
  };

  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
  };

  const updateFieldValue = (fieldId: string, value: string) => {
    // Auto-format certain fields
    let formattedValue = value;
    const field = fields.find(f => f.id === fieldId);
    
    if (field) {
      switch (field.fieldType) {
        case 'trailerNumber':
        case 'chassisNumber':
        case 'containerNumber':
        case 'refNumber':
          formattedValue = value.toUpperCase();
          break;
        case 'poNumber':
          formattedValue = value.replace(/[^0-9]/g, '');
          break;
        default:
          formattedValue = value;
      }
    }

    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, value: formattedValue } : field
    ));
  };

  const handleSave = () => {
    const formData: TransportInfo = {};
    
    fields.forEach(field => {
      if (field.value.trim()) {
        formData[field.fieldType as keyof TransportInfo] = field.value;
      }
    });
    
    onSave(formData);
    toast({
      title: "Transport Info Saved",
      description: "Transport information has been updated successfully"
    });
  };

  const isFormValid = fields.length > 0 && fields.every(field => field.value.trim() !== '');

  return (
    <Card className="border-0 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Truck className="h-5 w-5 text-blue-600" />
          Enter Transport Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Add New Field Section */}
        <div className="flex gap-2 items-center">
          <Select value={selectedFieldType} onValueChange={setSelectedFieldType}>
            <SelectTrigger className="flex-1 bg-white border-slate-200 focus:border-blue-400 hover:border-blue-300 transition-colors">
              <SelectValue placeholder="Select Field Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-200 shadow-xl z-[9999] max-h-60 overflow-y-auto">
              {FIELD_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-slate-500" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button 
            onClick={addField}
            disabled={!selectedFieldType}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 gap-1"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Dynamic Fields */}
        <div className="space-y-4">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.id} className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-blue-600" />
                  {field.label}
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={field.value}
                    onChange={(e) => updateFieldValue(field.id, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    className="flex-1 bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                  />
                  <Button
                    onClick={() => removeField(field.id)}
                    variant="outline"
                    size="icon"
                    className="border-slate-200 hover:bg-red-50 hover:border-red-200"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {fields.length === 0 && (
          <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
            <Package className="h-12 w-12 mx-auto mb-2 text-slate-300" />
            <p className="font-medium">No transport information added yet</p>
            <p className="text-sm">Select a field type above and click "Add" to get started</p>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-200">
          <Button 
            onClick={handleSave}
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Transport Information
          </Button>
          {!isFormValid && fields.length > 0 && (
            <p className="text-sm text-slate-500 mt-2 text-center">
              Please fill in all fields before saving
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};