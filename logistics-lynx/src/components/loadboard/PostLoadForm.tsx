
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface PostLoadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: unknown) => void;
}

interface LoadFormData {
  origin: string;
  destination: string;
  pickupDate: Date | undefined;
  deliveryDate: Date | undefined;
  weight: string;
  rate: string;
  equipmentType: string;
  commodity: string;
  specialInstructions: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

export const PostLoadForm: React.FC<PostLoadFormProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<LoadFormData>({
    origin: '',
    destination: '',
    pickupDate: undefined,
    deliveryDate: undefined,
    weight: '',
    rate: '',
    equipmentType: '',
    commodity: '',
    specialInstructions: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const equipmentTypes = [
    'Dry Van',
    'Refrigerated',
    'Flatbed',
    'Step Deck',
    'Lowboy',
    'Tanker',
    'Container'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
    if (!formData.rate.trim()) newErrors.rate = 'Rate is required';
    if (!formData.equipmentType) newErrors.equipmentType = 'Equipment type is required';
    if (!formData.commodity.trim()) newErrors.commodity = 'Commodity is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        origin: '',
        destination: '',
        pickupDate: undefined,
        deliveryDate: undefined,
        weight: '',
        rate: '',
        equipmentType: '',
        commodity: '',
        specialInstructions: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
      });
      setErrors({});
    }
  };

  const handleInputChange = (field: keyof LoadFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post New Load</DialogTitle>
          <DialogDescription>
            Fill out the details below to post your load to the board
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Route Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Origin *
                </Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Chicago, IL"
                  className={errors.origin ? 'border-red-500' : ''}
                />
                {errors.origin && <p className="text-sm text-red-500 mt-1">{errors.origin}</p>}
              </div>

              <div>
                <Label htmlFor="destination">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Destination *
                </Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="Atlanta, GA"
                  className={errors.destination ? 'border-red-500' : ''}
                />
                {errors.destination && <p className="text-sm text-red-500 mt-1">{errors.destination}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.pickupDate && "text-muted-foreground",
                        errors.pickupDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.pickupDate ? format(formData.pickupDate, "PPP") : "Pick pickup date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.pickupDate}
                      onSelect={(date) => handleInputChange('pickupDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.pickupDate && <p className="text-sm text-red-500 mt-1">{errors.pickupDate}</p>}
              </div>

              <div>
                <Label>Delivery Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.deliveryDate && "text-muted-foreground",
                        errors.deliveryDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deliveryDate ? format(formData.deliveryDate, "PPP") : "Pick delivery date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deliveryDate}
                      onSelect={(date) => handleInputChange('deliveryDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.deliveryDate && <p className="text-sm text-red-500 mt-1">{errors.deliveryDate}</p>}
              </div>
            </div>
          </div>

          {/* Load Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Load Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weight">Weight (lbs) *</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="25000"
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
              </div>

              <div>
                <Label htmlFor="rate">Rate ($) *</Label>
                <Input
                  id="rate"
                  type="number"
                  value={formData.rate}
                  onChange={(e) => handleInputChange('rate', e.target.value)}
                  placeholder="2800"
                  className={errors.rate ? 'border-red-500' : ''}
                />
                {errors.rate && <p className="text-sm text-red-500 mt-1">{errors.rate}</p>}
              </div>

              <div>
                <Label htmlFor="equipment-type">Equipment Type *</Label>
                <Select
                  value={formData.equipmentType}
                  onValueChange={(value) => handleInputChange('equipmentType', value)}
                >
                  <SelectTrigger className={errors.equipmentType ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.equipmentType && <p className="text-sm text-red-500 mt-1">{errors.equipmentType}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="commodity">Commodity *</Label>
              <Input
                id="commodity"
                value={formData.commodity}
                onChange={(e) => handleInputChange('commodity', e.target.value)}
                placeholder="Electronics, Food Products, etc."
                className={errors.commodity ? 'border-red-500' : ''}
              />
              {errors.commodity && <p className="text-sm text-red-500 mt-1">{errors.commodity}</p>}
            </div>

            <div>
              <Label htmlFor="special-instructions">Special Instructions</Label>
              <Textarea
                id="special-instructions"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any special requirements or instructions..."
                rows={3}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contact-name">Contact Name *</Label>
                <Input
                  id="contact-name"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="John Smith"
                  className={errors.contactName ? 'border-red-500' : ''}
                />
                {errors.contactName && <p className="text-sm text-red-500 mt-1">{errors.contactName}</p>}
              </div>

              <div>
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="john@company.com"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Post Load
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
