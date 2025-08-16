/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Wrench, Calendar, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RepairShop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  distance: number;
  rating: number;
  phone: string;
  hours: string;
  services: string[];
  hourlyRate: number;
  availability: 'immediate' | 'same-day' | 'next-day' | 'appointment';
  certifications: string[];
  specialties: string[];
}

const repairShops: RepairShop[] = [
  {
    id: 'RS001',
    name: 'Mile High Truck Repair',
    address: '3456 Industrial Blvd',
    city: 'Denver',
    state: 'CO',
    distance: 1.8,
    rating: 4.7,
    phone: '(303) 555-0321',
    hours: '6:00 AM - 10:00 PM',
    services: ['Engine Repair', 'Brake Service', 'Transmission', 'Electrical', 'Tires', 'DOT Inspections'],
    hourlyRate: 125,
    availability: 'immediate',
    certifications: ['ASE Certified', 'FMCSA Approved'],
    specialties: ['Diesel Engines', 'Heavy Duty Transmissions']
  },
  {
    id: 'RS002',
    name: 'Rocky Mountain Fleet Services',
    address: '789 Commerce Way',
    city: 'Denver',
    state: 'CO',
    distance: 3.2,
    rating: 4.5,
    phone: '(303) 555-0654',
    hours: '24/7 Emergency Service',
    services: ['Engine Repair', 'AC/Heating', 'Suspension', 'Electrical', 'Tires', 'PM Services'],
    hourlyRate: 135,
    availability: 'same-day',
    certifications: ['ASE Certified', 'Cummins Authorized'],
    specialties: ['Emergency Roadside', 'Fleet Maintenance']
  },
  {
    id: 'RS003',
    name: 'Denver Truck & Trailer',
    address: '1234 Freight Dr',
    city: 'Denver',
    state: 'CO',
    distance: 5.5,
    rating: 4.3,
    phone: '(303) 555-0987',
    hours: '7:00 AM - 6:00 PM',
    services: ['Trailer Repair', 'Body Work', 'Paint', 'Electrical', 'Brakes', 'Suspension'],
    hourlyRate: 110,
    availability: 'appointment',
    certifications: ['ASE Certified', 'OSHA Compliant'],
    specialties: ['Trailer Repair', 'Body Work']
  }
];

const RepairShopsPage = () => {
  const [searchLocation, setSearchLocation] = useState('Denver, CO');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const [selectedShop, setSelectedShop] = useState<RepairShop | null>(null);

  const form = useForm({
    defaultValues: {
      shopId: '',
      service: 'Engine Repair',
      description: 'Check engine light came on, need diagnostic',
      preferredDate: '2024-01-22',
      preferredTime: '09:00',
      urgency: 'normal',
      contactPhone: '(555) 123-4567'
    }
  });

  const handleBookAppointment = (data: unknown) => {
    console.log('Booking appointment:', data);
    toast.success('Appointment request submitted successfully');
    setIsBookingAppointment(false);
    form.reset();
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return <Badge className="bg-green-500">Available Now</Badge>;
      case 'same-day':
        return <Badge className="bg-blue-500">Same Day</Badge>;
      case 'next-day':
        return <Badge className="bg-yellow-500">Next Day</Badge>;
      case 'appointment':
        return <Badge variant="outline">By Appointment</Badge>;
      default:
        return <Badge variant="secondary">{availability}</Badge>;
    }
  };

  const filteredShops = repairShops.filter(shop => {
    const matchesService = serviceFilter === 'all' || shop.services.some(s => s.toLowerCase().includes(serviceFilter.toLowerCase()));
    const matchesAvailability = availabilityFilter === 'all' || shop.availability === availabilityFilter;
    return matchesService && matchesAvailability;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Repair Shops</h1>
          <p className="text-muted-foreground">Find certified truck repair services near you</p>
        </div>
        <Dialog open={isBookingAppointment} onOpenChange={setIsBookingAppointment}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Repair Appointment</DialogTitle>
              <DialogDescription>Schedule a service appointment at a repair shop</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleBookAppointment)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="shopId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repair Shop</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select repair shop" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {repairShops.map(shop => (
                            <SelectItem key={shop.id} value={shop.id}>{shop.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Needed</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Engine Repair">Engine Repair</SelectItem>
                          <SelectItem value="Brake Service">Brake Service</SelectItem>
                          <SelectItem value="Transmission">Transmission</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Tires">Tires</SelectItem>
                          <SelectItem value="DOT Inspection">DOT Inspection</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the issue..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low - Routine Maintenance</SelectItem>
                          <SelectItem value="normal">Normal - Soon as Possible</SelectItem>
                          <SelectItem value="high">High - ASAP</SelectItem>
                          <SelectItem value="emergency">Emergency - Immediate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsBookingAppointment(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Book Appointment</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Repair Shops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State or ZIP"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="service">Service Type</Label>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="engine">Engine Repair</SelectItem>
                  <SelectItem value="brake">Brake Service</SelectItem>
                  <SelectItem value="transmission">Transmission</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="tires">Tires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="immediate">Available Now</SelectItem>
                  <SelectItem value="same-day">Same Day</SelectItem>
                  <SelectItem value="next-day">Next Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repair Shops List */}
      <div className="grid gap-4">
        {filteredShops.map((shop) => (
          <Card key={shop.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{shop.name}</h3>
                      <p className="text-muted-foreground">{shop.address}, {shop.city}, {shop.state}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">{shop.distance} mi</Badge>
                      {getAvailabilityBadge(shop.availability)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(shop.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm ml-1">{shop.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{shop.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{shop.hours}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">${shop.hourlyRate}/hr</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.services.map((service) => (
                        <Badge key={service} variant="outline" className="flex items-center gap-1">
                          <Wrench className="w-3 h-3" />
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Certifications & Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {shop.certifications.map((cert) => (
                        <Badge key={cert} className="bg-blue-500">{cert}</Badge>
                      ))}
                      {shop.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedShop(shop);
                      form.setValue('shopId', shop.id);
                      setIsBookingAppointment(true);
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Service
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact Card */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Emergency Breakdown Service</CardTitle>
          <CardDescription>24/7 roadside assistance and emergency repairs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-red-600 mb-2">For immediate roadside assistance:</p>
              <p className="text-2xl font-bold text-red-700">(800) 555-HELP</p>
            </div>
            <Button variant="destructive">
              <Phone className="w-4 h-4 mr-2" />
              Call Emergency
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepairShopsPage;