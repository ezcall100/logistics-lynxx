import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Plus, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface RateFormData {
  id?: string;
  lane: string;
  originCity: string;
  originState: string;
  destinationCity: string;
  destinationState: string;
  transportMode: string;
  equipmentType: string;
  rate: string;
  rateUnit: string;
  distance: string;
  carrier?: string;
  customer?: string;
  effectiveDate: Date | undefined;
  expiryDate: Date | undefined;
  fuelSurcharge: string;
  accessorials: string[];
  notes: string;
}

interface RateFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit';
  type: 'buy' | 'sell';
  initialData?: Partial<RateFormData>;
  onSave: (data: RateFormData) => void;
}

const RateFormDialog = ({ open, onOpenChange, mode, type, initialData, onSave }: RateFormDialogProps) => {
  const [formData, setFormData] = useState<RateFormData>({
    lane: '',
    originCity: '',
    originState: '',
    destinationCity: '',
    destinationState: '',
    transportMode: '',
    equipmentType: '',
    rate: '',
    rateUnit: '',
    distance: '',
    carrier: '',
    customer: '',
    effectiveDate: undefined,
    expiryDate: undefined,
    fuelSurcharge: '',
    accessorials: [],
    notes: '',
    ...initialData
  });

  const [newAccessorial, setNewAccessorial] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const transportModes = [
    'Truckload', 'LTL', 'Intermodal', 'Drayage', 'Auto Transport', 'Heavy Haul', 'Expedited', 'Refrigerated'
  ];

  const equipmentTypes = {
    'Truckload': ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Lowboy'],
    'LTL': ['Standard', 'Temperature Controlled', 'Hazmat'],
    'Intermodal': ['53\' Container', '40\' Container', '20\' Container'],
    'Drayage': ['Chassis', 'Bobtail'],
    'Auto Transport': ['Car Carrier', 'Enclosed Trailer'],
    'Heavy Haul': ['Multi-Axle', 'RGN', 'Schnabel'],
    'Expedited': ['Sprinter Van', 'Straight Truck', 'Tractor Trailer'],
    'Refrigerated': ['Reefer Van', 'Reefer Trailer']
  };

  const rateUnits = {
    'Truckload': ['$/mile', '$/load', '$/ton'],
    'LTL': ['$/cwt', '$/pallet', '$/cubic foot'],
    'Intermodal': ['$/container', '$/TEU'],
    'Drayage': ['$/container', '$/move'],
    'Auto Transport': ['$/vehicle', '$/unit'],
    'Heavy Haul': ['$/mile', '$/load'],
    'Expedited': ['$/mile', '$/hour'],
    'Refrigerated': ['$/mile', '$/load']
  };

  const handleInputChange = (field: keyof RateFormData, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate lane when origin/destination changes
    if (field === 'originCity' || field === 'originState' || field === 'destinationCity' || field === 'destinationState') {
      const origin = field === 'originCity' ? value : formData.originCity;
      const originSt = field === 'originState' ? value : formData.originState;
      const dest = field === 'destinationCity' ? value : formData.destinationCity;
      const destSt = field === 'destinationState' ? value : formData.destinationState;
      
      if (origin && originSt && dest && destSt) {
        setFormData(prev => ({
          ...prev,
          lane: `${origin}, ${originSt} → ${dest}, ${destSt}`
        }));
      }
    }
  };

  const addAccessorial = () => {
    if (newAccessorial.trim() && !formData.accessorials.includes(newAccessorial.trim())) {
      setFormData(prev => ({
        ...prev,
        accessorials: [...prev.accessorials, newAccessorial.trim()]
      }));
      setNewAccessorial('');
    }
  };

  const removeAccessorial = (accessorial: string) => {
    setFormData(prev => ({
      ...prev,
      accessorials: prev.accessorials.filter(a => a !== accessorial)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (!formData.lane || !formData.transportMode || !formData.equipmentType || !formData.rate) {
        throw new Error('Please fill in all required fields');
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      onSave(formData);
      toast.success(`${type === 'buy' ? 'Buy' : 'Sell'} rate ${mode === 'add' ? 'added' : 'updated'} successfully`);
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Add' : 'Edit'} {type === 'buy' ? 'Buy' : 'Sell'} Rate
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Create a new' : 'Update the'} {type === 'buy' ? 'carrier buy' : 'customer sell'} rate
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lane Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="lane">Lane</Label>
              <Input
                id="lane"
                value={formData.lane}
                onChange={(e) => handleInputChange('lane', e.target.value)}
                placeholder="e.g., Chicago, IL → Houston, TX"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="originCity">Origin City *</Label>
              <Input
                id="originCity"
                value={formData.originCity}
                onChange={(e) => handleInputChange('originCity', e.target.value)}
                placeholder="Chicago"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="originState">Origin State *</Label>
              <Input
                id="originState"
                value={formData.originState}
                onChange={(e) => handleInputChange('originState', e.target.value)}
                placeholder="IL"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="destinationCity">Destination City *</Label>
              <Input
                id="destinationCity"
                value={formData.destinationCity}
                onChange={(e) => handleInputChange('destinationCity', e.target.value)}
                placeholder="Houston"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="destinationState">Destination State *</Label>
              <Input
                id="destinationState"
                value={formData.destinationState}
                onChange={(e) => handleInputChange('destinationState', e.target.value)}
                placeholder="TX"
                required
              />
            </div>
          </div>

          {/* Transportation Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="transportMode">Transportation Mode *</Label>
              <Select value={formData.transportMode} onValueChange={(value) => handleInputChange('transportMode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {transportModes.map(mode => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="equipmentType">Equipment Type *</Label>
              <Select 
                value={formData.equipmentType} 
                onValueChange={(value) => handleInputChange('equipmentType', value)}
                disabled={!formData.transportMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {formData.transportMode && equipmentTypes[formData.transportMode as keyof typeof equipmentTypes]?.map(equipment => (
                    <SelectItem key={equipment} value={equipment}>{equipment}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                value={formData.distance}
                onChange={(e) => handleInputChange('distance', e.target.value)}
                placeholder="1,092 mi"
              />
            </div>
          </div>

          {/* Rate Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rate">Rate *</Label>
              <Input
                id="rate"
                value={formData.rate}
                onChange={(e) => handleInputChange('rate', e.target.value)}
                placeholder="2.85"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="rateUnit">Rate Unit *</Label>
              <Select 
                value={formData.rateUnit} 
                onValueChange={(value) => handleInputChange('rateUnit', value)}
                disabled={!formData.transportMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {formData.transportMode && rateUnits[formData.transportMode as keyof typeof rateUnits]?.map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fuelSurcharge">Fuel Surcharge</Label>
              <Input
                id="fuelSurcharge"
                value={formData.fuelSurcharge}
                onChange={(e) => handleInputChange('fuelSurcharge', e.target.value)}
                placeholder="0.15"
              />
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {type === 'buy' ? (
              <div>
                <Label htmlFor="carrier">Carrier</Label>
                <Input
                  id="carrier"
                  value={formData.carrier}
                  onChange={(e) => handleInputChange('carrier', e.target.value)}
                  placeholder="ABC Logistics"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Input
                  id="customer"
                  value={formData.customer}
                  onChange={(e) => handleInputChange('customer', e.target.value)}
                  placeholder="Walmart Inc."
                />
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label>Effective Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.effectiveDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.effectiveDate ? format(formData.effectiveDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.effectiveDate}
                    onSelect={(date) => handleInputChange('effectiveDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expiryDate ? format(formData.expiryDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.expiryDate}
                    onSelect={(date) => handleInputChange('expiryDate', date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Accessorials */}
          <div>
            <Label>Accessorials</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newAccessorial}
                  onChange={(e) => setNewAccessorial(e.target.value)}
                  placeholder="Add accessorial (e.g., Detention, Fuel Surcharge)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAccessorial())}
                />
                <Button type="button" onClick={addAccessorial} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.accessorials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.accessorials.map((accessorial, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {accessorial}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeAccessorial(accessorial)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes or requirements..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (mode === 'add' ? 'Adding...' : 'Updating...') : (mode === 'add' ? 'Add Rate' : 'Update Rate')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RateFormDialog;