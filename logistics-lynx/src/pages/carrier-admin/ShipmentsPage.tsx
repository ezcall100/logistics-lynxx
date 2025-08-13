import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus, 
  Filter, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Download, 
  Upload,
  BarChart3,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
  FileText,
  Route,
  Activity,
  TrendingUp,
  Ship,
  Plane,
  Building2,
  Settings,
  Navigation,
  Zap,
  Wifi,
  Users,
  Globe,
  Target,
  Layers,
  Monitor,
  Bell,
  RefreshCw,
  ArrowRight,
  ThermometerSun,
  ShieldCheck,
  Star,
  MessageCircle,
  Camera,
  Signal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Shipment {
  id: string;
  shipmentNumber: string;
  status: 'new' | 'assigned' | 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  transportMode: string;
  equipmentType: string;
  customer: {
    name: string;
    contact: string;
    email: string;
    phone: string;
    rating: number;
  };
  driver: {
    name: string;
    id: string;
    phone: string;
    vehicle: string;
    rating: number;
    status: 'available' | 'driving' | 'rest' | 'off_duty';
  } | null;
  origin: {
    city: string;
    state: string;
    address: string;
    zipCode: string;
    contact: string;
    phone: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    city: string;
    state: string;
    address: string;
    zipCode: string;
    contact: string;
    phone: string;
    coordinates: { lat: number; lng: number };
  };
  pickup: {
    scheduled: string;
    actual?: string;
    window: string;
    appointment?: string;
    instructions?: string;
  };
  delivery: {
    scheduled: string;
    actual?: string;
    window: string;
    appointment?: string;
    instructions?: string;
  };
  cargo: {
    description: string;
    weight: number;
    pieces: number;
    value: number;
    hazmat: boolean;
    specialHandling?: string[];
    temperature?: {
      min: number;
      max: number;
      unit: 'F' | 'C';
    };
  };
  rates: {
    customer: number;
    carrier: number;
    margin: number;
    fuelSurcharge: number;
    accessorials: number;
    totalRevenue: number;
  };
  distance: number;
  estimatedTransitTime: number;
  actualTransitTime?: number;
  documents: {
    type: string;
    url?: string;
    status: 'pending' | 'uploaded' | 'signed';
  }[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  tracking: {
    latitude?: number;
    longitude?: number;
    lastUpdate?: string;
    currentLocation?: string;
    speed?: number;
    eta?: string;
    progress?: number;
    alerts?: string[];
  };
  performance: {
    onTimePickup: boolean;
    onTimeDelivery: boolean;
    customerSatisfaction: number;
    driverPerformance: number;
  };
}

interface Appointment {
  id: string;
  shipmentId: string;
  type: 'pickup' | 'delivery';
  datetime: string;
  location: string;
  contact: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

// Enhanced sample data with comprehensive real-world scenarios
const mockShipments: Shipment[] = [
  {
    id: 'SH001',
    shipmentNumber: 'TMS-2024-001',
    status: 'in_transit',
    priority: 'high',
    transportMode: 'FTL',
    equipmentType: 'Dry Van',
    customer: {
      name: 'Walmart Inc.',
      contact: 'Sarah Johnson',
      email: 'sarah.johnson@walmart.com',
      phone: '+1 (555) 123-4567',
      rating: 4.8
    },
    driver: {
      name: 'Mike Rodriguez',
      id: 'D001',
      phone: '+1 (555) 987-6543',
      vehicle: 'Truck #145',
      rating: 4.9,
      status: 'driving'
    },
    origin: {
      city: 'Chicago',
      state: 'IL',
      address: '1200 W Randolph St',
      zipCode: '60607',
      contact: 'John Smith',
      phone: '+1 (555) 111-2222',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    destination: {
      city: 'Atlanta',
      state: 'GA',
      address: '500 Peachtree St NE',
      zipCode: '30308',
      contact: 'Lisa Brown',
      phone: '+1 (555) 333-4444',
      coordinates: { lat: 33.7490, lng: -84.3880 }
    },
    pickup: {
      scheduled: '2024-01-15T08:00:00Z',
      actual: '2024-01-15T08:30:00Z',
      window: '08:00-10:00',
      appointment: 'APP-001',
      instructions: 'Use dock 5, contact security first'
    },
    delivery: {
      scheduled: '2024-01-17T14:00:00Z',
      window: '14:00-16:00',
      appointment: 'APP-002',
      instructions: 'Deliver to receiving dock B'
    },
    cargo: {
      description: 'Consumer Electronics',
      weight: 42000,
      pieces: 28,
      value: 125000,
      hazmat: false,
      specialHandling: ['Fragile', 'Temperature Sensitive']
    },
    rates: {
      customer: 3500,
      carrier: 2850,
      margin: 650,
      fuelSurcharge: 285,
      accessorials: 150,
      totalRevenue: 3985
    },
    distance: 587,
    estimatedTransitTime: 48,
    documents: [
      { type: 'BOL', status: 'signed' },
      { type: 'POD', status: 'pending' },
      { type: 'Invoice', status: 'uploaded' }
    ],
    notes: 'Temperature sensitive - maintain 65-75°F',
    createdAt: '2024-01-14T16:30:00Z',
    updatedAt: '2024-01-16T10:15:00Z',
    tracking: {
      latitude: 33.7490,
      longitude: -84.3880,
      lastUpdate: '2024-01-16T10:15:00Z',
      currentLocation: 'Macon, GA - I-75 Mile 171',
      speed: 65,
      eta: '2024-01-17T13:45:00Z',
      progress: 75,
      alerts: ['Traffic delay ahead', 'Weather watch']
    },
    performance: {
      onTimePickup: false,
      onTimeDelivery: true,
      customerSatisfaction: 4.7,
      driverPerformance: 4.5
    }
  },
  {
    id: 'SH002',
    shipmentNumber: 'TMS-2024-002',
    status: 'assigned',
    priority: 'medium',
    transportMode: 'LTL',
    equipmentType: 'Standard',
    customer: {
      name: 'Target Corporation',
      contact: 'Emily Davis',
      email: 'emily.davis@target.com',
      phone: '+1 (555) 234-5678',
      rating: 4.5
    },
    driver: {
      name: 'Carlos Martinez',
      id: 'D002',
      phone: '+1 (555) 876-5432',
      vehicle: 'Truck #203',
      rating: 4.7,
      status: 'available'
    },
    origin: {
      city: 'Los Angeles',
      state: 'CA',
      address: '1000 Corporate Center Dr',
      zipCode: '90094',
      contact: 'Robert Wilson',
      phone: '+1 (555) 222-3333',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    destination: {
      city: 'Phoenix',
      state: 'AZ',
      address: '2400 E Camelback Rd',
      zipCode: '85016',
      contact: 'Maria Garcia',
      phone: '+1 (555) 444-5555',
      coordinates: { lat: 33.4484, lng: -112.0740 }
    },
    pickup: {
      scheduled: '2024-01-16T10:00:00Z',
      window: '10:00-12:00',
      appointment: 'APP-003'
    },
    delivery: {
      scheduled: '2024-01-18T09:00:00Z',
      window: '09:00-11:00',
      appointment: 'APP-004'
    },
    cargo: {
      description: 'Retail Merchandise',
      weight: 15600,
      pieces: 12,
      value: 45000,
      hazmat: false,
      specialHandling: ['Stackable']
    },
    rates: {
      customer: 1850,
      carrier: 1420,
      margin: 430,
      fuelSurcharge: 142,
      accessorials: 75,
      totalRevenue: 2067
    },
    distance: 372,
    estimatedTransitTime: 24,
    documents: [
      { type: 'BOL', status: 'uploaded' },
      { type: 'Invoice', status: 'pending' }
    ],
    notes: 'Multiple stops required - see route plan',
    createdAt: '2024-01-15T09:15:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    tracking: {
      progress: 0,
      alerts: []
    },
    performance: {
      onTimePickup: true,
      onTimeDelivery: true,
      customerSatisfaction: 4.3,
      driverPerformance: 4.6
    }
  },
  {
    id: 'SH003',
    shipmentNumber: 'TMS-2024-003',
    status: 'delivered',
    priority: 'low',
    transportMode: 'Intermodal',
    equipmentType: '53\' Container',
    customer: {
      name: 'Amazon Logistics',
      contact: 'David Kim',
      email: 'david.kim@amazon.com',
      phone: '+1 (555) 345-6789',
      rating: 4.9
    },
    driver: {
      name: 'Jennifer Lee',
      id: 'D003',
      phone: '+1 (555) 765-4321',
      vehicle: 'Truck #089',
      rating: 4.8,
      status: 'off_duty'
    },
    origin: {
      city: 'Seattle',
      state: 'WA',
      address: '2001 8th Ave',
      zipCode: '98121',
      contact: 'Tom Anderson',
      phone: '+1 (555) 333-4444',
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    destination: {
      city: 'Chicago',
      state: 'IL',
      address: '233 S Wacker Dr',
      zipCode: '60606',
      contact: 'Amanda White',
      phone: '+1 (555) 555-6666',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    pickup: {
      scheduled: '2024-01-10T08:00:00Z',
      actual: '2024-01-10T07:45:00Z',
      window: '08:00-10:00',
      appointment: 'APP-005'
    },
    delivery: {
      scheduled: '2024-01-14T15:00:00Z',
      actual: '2024-01-14T14:30:00Z',
      window: '15:00-17:00',
      appointment: 'APP-006'
    },
    cargo: {
      description: 'Mixed Consumer Goods',
      weight: 38000,
      pieces: 45,
      value: 89000,
      hazmat: false,
      specialHandling: ['Mixed Load', 'Cross Dock']
    },
    rates: {
      customer: 4200,
      carrier: 3350,
      margin: 850,
      fuelSurcharge: 335,
      accessorials: 200,
      totalRevenue: 4735
    },
    distance: 2064,
    estimatedTransitTime: 120,
    actualTransitTime: 110,
    documents: [
      { type: 'BOL', status: 'signed' },
      { type: 'POD', status: 'signed' },
      { type: 'Invoice', status: 'signed' },
      { type: 'Rail Receipt', status: 'signed' }
    ],
    notes: 'Successful delivery - customer satisfaction high',
    createdAt: '2024-01-09T11:00:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    tracking: {
      progress: 100,
      alerts: []
    },
    performance: {
      onTimePickup: true,
      onTimeDelivery: true,
      customerSatisfaction: 4.9,
      driverPerformance: 4.8
    }
  },
  {
    id: 'SH004',
    shipmentNumber: 'TMS-2024-004',
    status: 'new',
    priority: 'urgent',
    transportMode: 'Expedited',
    equipmentType: 'Reefer',
    customer: {
      name: 'Whole Foods Market',
      contact: 'Rachel Green',
      email: 'rachel.green@wholefoods.com',
      phone: '+1 (555) 456-7890',
      rating: 4.6
    },
    driver: null,
    origin: {
      city: 'Miami',
      state: 'FL',
      address: '1500 Biscayne Blvd',
      zipCode: '33132',
      contact: 'Carlos Ruiz',
      phone: '+1 (555) 444-5555',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    destination: {
      city: 'New York',
      state: 'NY',
      address: '4 Columbus Cir',
      zipCode: '10019',
      contact: 'Michael Chen',
      phone: '+1 (555) 666-7777',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    pickup: {
      scheduled: '2024-01-17T06:00:00Z',
      window: '06:00-08:00',
      appointment: 'APP-007',
      instructions: 'Pre-cool trailer to 34°F'
    },
    delivery: {
      scheduled: '2024-01-19T18:00:00Z',
      window: '18:00-20:00',
      appointment: 'APP-008',
      instructions: 'Temperature verification required'
    },
    cargo: {
      description: 'Organic Produce',
      weight: 25000,
      pieces: 35,
      value: 35000,
      hazmat: false,
      specialHandling: ['Temperature Critical', 'Perishable'],
      temperature: {
        min: 34,
        max: 38,
        unit: 'F'
      }
    },
    rates: {
      customer: 4500,
      carrier: 3600,
      margin: 900,
      fuelSurcharge: 360,
      accessorials: 250,
      totalRevenue: 5110
    },
    distance: 1280,
    estimatedTransitTime: 60,
    documents: [
      { type: 'BOL', status: 'pending' },
      { type: 'Temperature Log', status: 'pending' }
    ],
    notes: 'URGENT: Temperature critical shipment - requires immediate assignment',
    createdAt: '2024-01-16T15:30:00Z',
    updatedAt: '2024-01-16T15:30:00Z',
    tracking: {
      progress: 0,
      alerts: ['Urgent assignment required']
    },
    performance: {
      onTimePickup: true,
      onTimeDelivery: true,
      customerSatisfaction: 0,
      driverPerformance: 0
    }
  },
  {
    id: 'SH005',
    shipmentNumber: 'TMS-2024-005',
    status: 'pending',
    priority: 'medium',
    transportMode: 'FTL',
    equipmentType: 'Flatbed',
    customer: {
      name: 'Home Depot',
      contact: 'Steve Johnson',
      email: 'steve.johnson@homedepot.com',
      phone: '+1 (555) 567-8901',
      rating: 4.4
    },
    driver: {
      name: 'Robert Taylor',
      id: 'D004',
      phone: '+1 (555) 654-3210',
      vehicle: 'Truck #156',
      rating: 4.6,
      status: 'rest'
    },
    origin: {
      city: 'Portland',
      state: 'OR',
      address: '1940 NW Vaughn St',
      zipCode: '97209',
      contact: 'Nancy Thompson',
      phone: '+1 (555) 777-8888',
      coordinates: { lat: 45.5152, lng: -122.6784 }
    },
    destination: {
      city: 'Denver',
      state: 'CO',
      address: '1670 Broadway',
      zipCode: '80202',
      contact: 'Kevin Brown',
      phone: '+1 (555) 888-9999',
      coordinates: { lat: 39.7392, lng: -104.9903 }
    },
    pickup: {
      scheduled: '2024-01-18T07:00:00Z',
      window: '07:00-09:00',
      appointment: 'APP-009',
      instructions: 'Require tarping and securement equipment'
    },
    delivery: {
      scheduled: '2024-01-20T16:00:00Z',
      window: '16:00-18:00',
      appointment: 'APP-010'
    },
    cargo: {
      description: 'Construction Materials',
      weight: 48000,
      pieces: 20,
      value: 75000,
      hazmat: false,
      specialHandling: ['Oversized', 'Tarping Required']
    },
    rates: {
      customer: 3200,
      carrier: 2560,
      margin: 640,
      fuelSurcharge: 256,
      accessorials: 180,
      totalRevenue: 3636
    },
    distance: 991,
    estimatedTransitTime: 48,
    documents: [
      { type: 'BOL', status: 'uploaded' },
      { type: 'Invoice', status: 'pending' }
    ],
    notes: 'Require tarping and securement - weather protection essential',
    createdAt: '2024-01-16T12:45:00Z',
    updatedAt: '2024-01-16T16:20:00Z',
    tracking: {
      progress: 10,
      alerts: ['Driver on mandatory rest']
    },
    performance: {
      onTimePickup: true,
      onTimeDelivery: true,
      customerSatisfaction: 4.2,
      driverPerformance: 4.4
    }
  }
];

const transportModes = [
  { id: 'all', name: 'All Modes', icon: Package, color: 'bg-gradient-to-r from-gray-400 to-gray-600' },
  { id: 'FTL', name: 'Full Truckload', icon: Truck, color: 'bg-gradient-to-r from-blue-500 to-blue-700' },
  { id: 'LTL', name: 'Less Than Truckload', icon: Package, color: 'bg-gradient-to-r from-green-500 to-green-700' },
  { id: 'Intermodal', name: 'Intermodal', icon: Ship, color: 'bg-gradient-to-r from-purple-500 to-purple-700' },
  { id: 'Expedited', name: 'Expedited', icon: Plane, color: 'bg-gradient-to-r from-red-500 to-red-700' },
  { id: 'Specialized', name: 'Specialized', icon: Building2, color: 'bg-gradient-to-r from-orange-500 to-orange-700' },
  { id: 'Drayage', name: 'Drayage', icon: Navigation, color: 'bg-gradient-to-r from-teal-500 to-teal-700' },
  { id: 'Auto Transport', name: 'Auto Transport', icon: Target, color: 'bg-gradient-to-r from-indigo-500 to-indigo-700' }
];

const equipmentTypes = [
  'Dry Van', 'Reefer', 'Flatbed', 'Lowboy', 'Tank', 'Container', 'Car Carrier', 'Dump Truck', 'Box Truck', 'Step Deck'
];

const mockAppointments: Appointment[] = [
  {
    id: 'APP-001',
    shipmentId: 'SH001',
    type: 'pickup',
    datetime: '2024-01-15T08:00:00Z',
    location: 'Chicago, IL - 1200 W Randolph St',
    contact: 'John Smith',
    status: 'completed'
  },
  {
    id: 'APP-002',
    shipmentId: 'SH001',
    type: 'delivery',
    datetime: '2024-01-17T14:00:00Z',
    location: 'Atlanta, GA - 500 Peachtree St NE',
    contact: 'Lisa Brown',
    status: 'scheduled'
  }
];

const ShipmentsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMode, setSelectedMode] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(new Date());

  // Enhanced form state for comprehensive shipment management
  const [formData, setFormData] = useState({
    shipmentNumber: `TMS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    transportMode: 'FTL',
    equipmentType: 'Dry Van',
    priority: 'medium',
    customerName: 'ABC Logistics Inc.',
    customerContact: 'John Smith',
    customerEmail: 'john.smith@abclogistics.com',
    customerPhone: '+1 (555) 123-4567',
    originAddress: '123 Industrial Blvd, Chicago, IL 60607',
    originContact: 'Mike Johnson',
    originPhone: '+1 (555) 111-2222',
    destinationAddress: '456 Commerce Dr, Atlanta, GA 30308',
    destinationContact: 'Sarah Wilson',
    destinationPhone: '+1 (555) 333-4444',
    pickupDate: '2024-01-20',
    pickupTime: '08:00',
    pickupWindow: '08:00-10:00',
    deliveryDate: '2024-01-22',
    deliveryTime: '14:00',
    deliveryWindow: '14:00-16:00',
    cargoDescription: 'General Freight',
    cargoWeight: '35000',
    cargoPieces: '24',
    cargoValue: '75000',
    hazmat: false,
    temperatureMin: '34',
    temperatureMax: '38',
    customerRate: '3200',
    carrierRate: '2650',
    fuelSurcharge: '265',
    accessorials: '180',
    specialInstructions: 'Handle with care - fragile items',
    notes: 'Standard delivery - no special requirements'
  });

  // Calculate summary statistics
  const shipmentStats = {
    total: mockShipments.length,
    active: mockShipments.filter(s => ['assigned', 'picked_up', 'in_transit'].includes(s.status)).length,
    pending: mockShipments.filter(s => s.status === 'pending').length,
    delivered: mockShipments.filter(s => s.status === 'delivered').length,
    revenue: mockShipments.reduce((acc, s) => acc + s.rates.totalRevenue, 0),
    margin: mockShipments.reduce((acc, s) => acc + s.rates.margin, 0),
    avgMargin: (mockShipments.reduce((acc, s) => acc + s.rates.margin, 0) / mockShipments.filter(s => s.rates.margin > 0).length * 100 / mockShipments.reduce((acc, s) => acc + s.rates.customer, 0) * mockShipments.filter(s => s.rates.customer > 0).length) || 0
  };

  // Filter shipments based on current criteria
  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.origin.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMode = selectedMode === 'all' || shipment.transportMode === selectedMode;
    const matchesPriority = selectedPriority === 'all' || shipment.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || shipment.status === selectedStatus;
    
    return matchesSearch && matchesMode && matchesPriority && matchesStatus;
  });

  // Get shipments by status for tab display
  const getShipmentsByStatus = (status: string) => {
    if (status === 'all') return filteredShipments;
    return filteredShipments.filter(s => s.status === status);
  };

  const handleFormChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateShipment = () => {
    console.log('Creating shipment:', formData);
    // Simulate creating shipment
    setIsCreateDialogOpen(false);
    // Reset form
    setFormData({
      ...formData,
      shipmentNumber: `TMS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    });
  };

  const handleAssignDriver = (shipmentId: string, driverId: string) => {
    console.log('Assigning driver:', driverId, 'to shipment:', shipmentId);
    setIsAssignDriverOpen(false);
  };

  const handleUpdateStatus = (shipmentId: string, newStatus: string) => {
    console.log('Updating status for shipment:', shipmentId, 'to:', newStatus);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 border-blue-200',
      assigned: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pending: 'bg-orange-100 text-orange-800 border-orange-200',
      picked_up: 'bg-purple-100 text-purple-800 border-purple-200',
      in_transit: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      urgent: 'text-red-600'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      {/* Modern Header with Glassmorphism */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl mb-8 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              TMS Dispatch Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Autonomous Transportation Management System - Real-time shipment control
            </p>
          </div>
          
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{shipmentStats.active}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{shipmentStats.delivered}</p>
                    <p className="text-xs text-muted-foreground">Delivered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">${(shipmentStats.revenue/1000).toFixed(0)}k</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold">{shipmentStats.avgMargin.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Margin</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 backdrop-blur-lg bg-white/10 border border-white/20 p-2 rounded-xl">
          <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-white/20">
            <Monitor className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2 data-[state=active]:bg-white/20">
            <Activity className="h-4 w-4" />
            Active ({shipmentStats.active})
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2 data-[state=active]:bg-white/20">
            <Calendar className="h-4 w-4" />
            Planning
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2 data-[state=active]:bg-white/20">
            <Navigation className="h-4 w-4" />
            Live Tracking
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-white/20">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2 data-[state=active]:bg-white/20">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Overview Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Controls and Filters */}
          <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search shipments, customers, locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-80 backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger className="w-48 backdrop-blur-md bg-white/20 border-white/20">
                      <SelectValue placeholder="Transport Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {transportModes.map(mode => (
                        <SelectItem key={mode.id} value={mode.id}>
                          <div className="flex items-center gap-2">
                            <mode.icon className="h-4 w-4" />
                            {mode.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 backdrop-blur-md bg-white/20 border-white/20">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-40 backdrop-blur-md bg-white/20 border-white/20">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Shipment
                  </Button>
                  
                  <Button variant="outline" className="backdrop-blur-md bg-white/20 border-white/20">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Mode Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {transportModes.map(mode => {
              const modeShipments = mockShipments.filter(s => mode.id === 'all' || s.transportMode === mode.id);
              return (
                <Card 
                  key={mode.id}
                  className={cn(
                    "backdrop-blur-lg bg-white/10 border border-white/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl",
                    selectedMode === mode.id && "ring-2 ring-primary shadow-2xl"
                  )}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={cn("w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center", mode.color)}>
                      <mode.icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-semibold text-sm">{mode.name}</p>
                    <p className="text-2xl font-bold mt-1">{modeShipments.length}</p>
                    <p className="text-xs text-muted-foreground">shipments</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Shipments Table */}
          <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Active Shipments ({filteredShipments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead>Shipment</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Mode</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map(shipment => (
                      <TableRow key={shipment.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold">{shipment.shipmentNumber}</p>
                            <Badge className={cn("text-xs", getPriorityColor(shipment.priority))}>
                              {shipment.priority.toUpperCase()}
                            </Badge>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{shipment.customer.name}</p>
                            <p className="text-sm text-muted-foreground">{shipment.customer.contact}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-3 w-3",
                                    i < shipment.customer.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  )} 
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">{shipment.customer.rating}</span>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{shipment.origin.city}, {shipment.origin.state}</p>
                            <ArrowRight className="h-3 w-3 text-muted-foreground mx-2" />
                            <p className="text-sm font-medium">{shipment.destination.city}, {shipment.destination.state}</p>
                            <p className="text-xs text-muted-foreground">{shipment.distance} miles</p>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {transportModes.find(m => m.id === shipment.transportMode)?.icon && (
                              React.createElement(transportModes.find(m => m.id === shipment.transportMode)!.icon, {
                                className: "h-4 w-4"
                              })
                            )}
                            <div>
                              <p className="text-sm font-medium">{shipment.transportMode}</p>
                              <p className="text-xs text-muted-foreground">{shipment.equipmentType}</p>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          {shipment.driver ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">
                                  {shipment.driver.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{shipment.driver.name}</p>
                                <div className="flex items-center gap-1">
                                  <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    shipment.driver.status === 'driving' ? 'bg-green-500' :
                                    shipment.driver.status === 'rest' ? 'bg-yellow-500' :
                                    shipment.driver.status === 'available' ? 'bg-blue-500' : 'bg-gray-500'
                                  )} />
                                  <span className="text-xs text-muted-foreground capitalize">
                                    {shipment.driver.status.replace('_', ' ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setIsAssignDriverOpen(true);
                              }}
                              className="backdrop-blur-md bg-white/20 border-white/20"
                            >
                              <Users className="h-3 w-3 mr-1" />
                              Assign
                            </Button>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <Badge className={cn("border", getStatusColor(shipment.status))}>
                            {shipment.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {shipment.tracking.alerts && shipment.tracking.alerts.length > 0 && (
                            <div className="mt-1">
                              <Badge variant="destructive" className="text-xs">
                                <Bell className="h-3 w-3 mr-1" />
                                {shipment.tracking.alerts.length} Alert{shipment.tracking.alerts.length > 1 ? 's' : ''}
                              </Badge>
                            </div>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-2">
                            <Progress value={shipment.tracking.progress || 0} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {shipment.tracking.progress || 0}% Complete
                            </p>
                            {shipment.tracking.eta && (
                              <p className="text-xs text-muted-foreground">
                                ETA: {new Date(shipment.tracking.eta).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold text-green-600">
                              ${shipment.rates.totalRevenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Margin: ${shipment.rates.margin.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {((shipment.rates.margin / shipment.rates.customer) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedShipment(shipment);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            {shipment.status === 'in_transit' && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedShipment(shipment);
                                  setIsTrackingOpen(true);
                                }}
                              >
                                <Navigation className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Shipments Tab */}
        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {getShipmentsByStatus('in_transit').concat(getShipmentsByStatus('assigned')).map(shipment => (
              <Card key={shipment.id} className="backdrop-blur-lg bg-white/10 border border-white/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{shipment.shipmentNumber}</CardTitle>
                    <Badge className={cn("border", getStatusColor(shipment.status))}>
                      {shipment.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{shipment.customer.name}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Route Information */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{shipment.origin.city}, {shipment.origin.state}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{shipment.destination.city}, {shipment.destination.state}</span>
                    </div>
                  </div>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{shipment.tracking.progress || 0}%</span>
                    </div>
                    <Progress value={shipment.tracking.progress || 0} className="h-2" />
                  </div>
                  
                  {/* Current Location */}
                  {shipment.tracking.currentLocation && (
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{shipment.tracking.currentLocation}</span>
                    </div>
                  )}
                  
                  {/* Driver Information */}
                  {shipment.driver && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm">
                          {shipment.driver.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{shipment.driver.name}</p>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            shipment.driver.status === 'driving' ? 'bg-green-500' :
                            shipment.driver.status === 'rest' ? 'bg-yellow-500' : 'bg-gray-500'
                          )} />
                          <span className="text-xs text-muted-foreground capitalize">
                            {shipment.driver.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedShipment(shipment);
                        setIsTrackingOpen(true);
                      }}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedShipment(shipment);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Planning & Appointments Tab */}
        <TabsContent value="planning" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendar View */}
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Appointment Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  className="rounded-md border border-white/20"
                />
              </CardContent>
            </Card>
            
            {/* Upcoming Appointments */}
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {mockAppointments.map(appointment => {
                      const shipment = mockShipments.find(s => s.id === appointment.shipmentId);
                      return (
                        <div key={appointment.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={cn(
                              appointment.type === 'pickup' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                            )}>
                              {appointment.type.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(appointment.datetime).toLocaleTimeString()}
                            </span>
                          </div>
                          <h4 className="font-semibold">{shipment?.shipmentNumber}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.location}</p>
                          <p className="text-sm">Contact: {appointment.contact}</p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Navigation className="h-3 w-3 mr-1" />
                              Navigate
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          {/* Schedule Optimization */}
          <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Route Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Optimization Suggestions</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm font-medium text-green-400">Route Consolidation</p>
                      <p className="text-xs text-muted-foreground">Combine SH002 and SH005 to save 124 miles</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm font-medium text-blue-400">Load Optimization</p>
                      <p className="text-xs text-muted-foreground">Partial backhaul available for truck #145</p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <p className="text-sm font-medium text-yellow-400">Time Window Alert</p>
                      <p className="text-xs text-muted-foreground">SH004 delivery window may conflict</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Driver Availability</h4>
                  <div className="space-y-3">
                    {mockShipments.filter(s => s.driver).map(shipment => (
                      <div key={shipment.id} className="flex items-center justify-between p-2 rounded bg-white/5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            shipment.driver?.status === 'available' ? 'bg-green-500' :
                            shipment.driver?.status === 'driving' ? 'bg-blue-500' :
                            shipment.driver?.status === 'rest' ? 'bg-yellow-500' : 'bg-gray-500'
                          )} />
                          <span className="text-sm">{shipment.driver?.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground capitalize">
                          {shipment.driver?.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Fleet Utilization</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active Vehicles</span>
                        <span>4/8</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Revenue Efficiency</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>On-Time Performance</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Tracking Tab */}
        <TabsContent value="tracking" className="space-y-6">
          <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Real-Time Fleet Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock Map Interface */}
              <div className="h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-lg border border-white/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Globe className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-semibold">Interactive Fleet Map</h3>
                  <p className="text-muted-foreground">Real-time GPS tracking integration</p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-green-400">● 3 In Transit</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-blue-400">● 2 Loading</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-yellow-400">● 1 On Rest</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/10">
                      <p className="text-sm text-gray-400">● 2 Off Duty</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vehicle Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {mockShipments.filter(s => s.driver && s.status === 'in_transit').map(shipment => (
                  <Card key={shipment.id} className="backdrop-blur-md bg-white/5 border border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-semibold">{shipment.driver?.vehicle}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {shipment.tracking.speed || 0} mph
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">{shipment.driver?.name}</p>
                        <p className="text-xs text-muted-foreground">{shipment.shipmentNumber}</p>
                        
                        {shipment.tracking.currentLocation && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-blue-400" />
                            <span className="text-xs">{shipment.tracking.currentLocation}</span>
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{shipment.tracking.progress}%</span>
                          </div>
                          <Progress value={shipment.tracking.progress} className="h-1" />
                        </div>
                        
                        {shipment.tracking.eta && (
                          <p className="text-xs text-green-400">
                            ETA: {new Date(shipment.tracking.eta).toLocaleString()}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-1 mt-3">
                        <Button size="sm" variant="ghost" className="flex-1">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1">
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="flex-1">
                          <Navigation className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* KPI Cards */}
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${(shipmentStats.revenue/1000).toFixed(0)}k</p>
                    <p className="text-xs text-green-500">+12.5% vs last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Margin</p>
                    <p className="text-2xl font-bold">{shipmentStats.avgMargin.toFixed(1)}%</p>
                    <p className="text-xs text-blue-500">+2.1% vs last month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                    <p className="text-2xl font-bold">94.2%</p>
                    <p className="text-xs text-green-500">+1.8% vs last month</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                    <p className="text-2xl font-bold">4.7</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle>Revenue by Transport Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transportModes.slice(1).map(mode => {
                    const modeShipments = mockShipments.filter(s => s.transportMode === mode.id);
                    const revenue = modeShipments.reduce((acc, s) => acc + s.rates.totalRevenue, 0);
                    const percentage = (revenue / shipmentStats.revenue) * 100;
                    
                    return (
                      <div key={mode.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{mode.name}</span>
                          <span>${(revenue/1000).toFixed(0)}k ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle>Top Performing Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockShipments
                    .filter(s => s.driver)
                    .sort((a, b) => (b.driver?.rating || 0) - (a.driver?.rating || 0))
                    .slice(0, 5)
                    .map((shipment, index) => (
                      <div key={shipment.driver?.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{shipment.driver?.name}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-3 w-3",
                                    i < (shipment.driver?.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  )} 
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-1">
                                {shipment.driver?.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{shipment.driver?.vehicle}</p>
                          <p className="text-xs text-muted-foreground">
                            {shipment.performance.onTimeDelivery ? 'On-time' : 'Delayed'}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card className="backdrop-blur-lg bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Document Categories */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Document Categories</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Bills of Lading', count: 12, icon: FileText },
                      { name: 'Proof of Delivery', count: 8, icon: CheckCircle },
                      { name: 'Invoices', count: 15, icon: DollarSign },
                      { name: 'Temperature Logs', count: 3, icon: ThermometerSun },
                      { name: 'Insurance Docs', count: 5, icon: ShieldCheck },
                      { name: 'Driver Licenses', count: 4, icon: User }
                    ].map(category => (
                      <div key={category.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="outline">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Documents */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Recent Documents</h4>
                  <div className="space-y-3">
                    {mockShipments.slice(0, 5).map(shipment => (
                      <div key={shipment.id} className="p-3 rounded-lg bg-white/5">
                        <p className="font-medium text-sm">{shipment.shipmentNumber}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {shipment.documents.map((doc, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                doc.status === 'signed' ? 'border-green-500 text-green-400' :
                                doc.status === 'uploaded' ? 'border-blue-500 text-blue-400' :
                                'border-yellow-500 text-yellow-400'
                              )}
                            >
                              {doc.type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Document Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Quick Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Bulk Download
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Scan Document
                    </Button>
                  </div>
                  
                  {/* E-signature Integration */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                    <h5 className="font-semibold text-sm mb-2">E-Signature Ready</h5>
                    <p className="text-xs text-muted-foreground mb-3">
                      3 documents pending signature
                    </p>
                    <Button size="sm" className="w-full">
                      <FileText className="h-3 w-3 mr-1" />
                      Send for Signature
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-2xl"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border-white/20"
              title="Emergency Contact"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border-white/20"
              title="Live Chat"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-12 h-12 rounded-full backdrop-blur-lg bg-white/10 border-white/20"
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Create Shipment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-background/95 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Shipment</DialogTitle>
            <DialogDescription>
              Complete shipment booking with AI-powered dispatch optimization
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shipmentNumber">Shipment Number</Label>
                  <Input
                    id="shipmentNumber"
                    value={formData.shipmentNumber}
                    onChange={(e) => handleFormChange('shipmentNumber', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleFormChange('priority', value)}>
                    <SelectTrigger className="backdrop-blur-md bg-white/20 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transportMode">Transport Mode</Label>
                  <Select value={formData.transportMode} onValueChange={(value) => handleFormChange('transportMode', value)}>
                    <SelectTrigger className="backdrop-blur-md bg-white/20 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transportModes.slice(1).map(mode => (
                        <SelectItem key={mode.id} value={mode.id}>{mode.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="equipmentType">Equipment Type</Label>
                  <Select value={formData.equipmentType} onValueChange={(value) => handleFormChange('equipmentType', value)}>
                    <SelectTrigger className="backdrop-blur-md bg-white/20 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Customer Information */}
              <h4 className="text-md font-semibold mt-6">Customer Information</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleFormChange('customerName', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerContact">Contact Person</Label>
                    <Input
                      id="customerContact"
                      value={formData.customerContact}
                      onChange={(e) => handleFormChange('customerContact', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      value={formData.customerPhone}
                      onChange={(e) => handleFormChange('customerPhone', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleFormChange('customerEmail', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
              </div>
            </div>
            
            {/* Location & Schedule */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location & Schedule</h3>
              
              {/* Pickup Information */}
              <h4 className="text-md font-semibold">Pickup Information</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="originAddress">Origin Address</Label>
                  <Input
                    id="originAddress"
                    value={formData.originAddress}
                    onChange={(e) => handleFormChange('originAddress', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="originContact">Contact</Label>
                    <Input
                      id="originContact"
                      value={formData.originContact}
                      onChange={(e) => handleFormChange('originContact', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="originPhone">Phone</Label>
                    <Input
                      id="originPhone"
                      value={formData.originPhone}
                      onChange={(e) => handleFormChange('originPhone', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => handleFormChange('pickupDate', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickupTime">Time</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => handleFormChange('pickupTime', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickupWindow">Window</Label>
                    <Input
                      id="pickupWindow"
                      placeholder="08:00-10:00"
                      value={formData.pickupWindow}
                      onChange={(e) => handleFormChange('pickupWindow', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                </div>
              </div>
              
              {/* Delivery Information */}
              <h4 className="text-md font-semibold mt-6">Delivery Information</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="destinationAddress">Destination Address</Label>
                  <Input
                    id="destinationAddress"
                    value={formData.destinationAddress}
                    onChange={(e) => handleFormChange('destinationAddress', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="destinationContact">Contact</Label>
                    <Input
                      id="destinationContact"
                      value={formData.destinationContact}
                      onChange={(e) => handleFormChange('destinationContact', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="destinationPhone">Phone</Label>
                    <Input
                      id="destinationPhone"
                      value={formData.destinationPhone}
                      onChange={(e) => handleFormChange('destinationPhone', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="deliveryDate">Delivery Date</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => handleFormChange('deliveryDate', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryTime">Time</Label>
                    <Input
                      id="deliveryTime"
                      type="time"
                      value={formData.deliveryTime}
                      onChange={(e) => handleFormChange('deliveryTime', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deliveryWindow">Window</Label>
                    <Input
                      id="deliveryWindow"
                      placeholder="14:00-16:00"
                      value={formData.deliveryWindow}
                      onChange={(e) => handleFormChange('deliveryWindow', e.target.value)}
                      className="backdrop-blur-md bg-white/20 border-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cargo Information */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Cargo Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="cargoDescription">Description</Label>
                  <Input
                    id="cargoDescription"
                    value={formData.cargoDescription}
                    onChange={(e) => handleFormChange('cargoDescription', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="cargoWeight">Weight (lbs)</Label>
                  <Input
                    id="cargoWeight"
                    type="number"
                    value={formData.cargoWeight}
                    onChange={(e) => handleFormChange('cargoWeight', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="cargoPieces">Pieces</Label>
                  <Input
                    id="cargoPieces"
                    type="number"
                    value={formData.cargoPieces}
                    onChange={(e) => handleFormChange('cargoPieces', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="cargoValue">Value ($)</Label>
                  <Input
                    id="cargoValue"
                    type="number"
                    value={formData.cargoValue}
                    onChange={(e) => handleFormChange('cargoValue', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
              </div>
            </div>
            
            {/* Rate Information */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Rate Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="customerRate">Customer Rate ($)</Label>
                  <Input
                    id="customerRate"
                    type="number"
                    value={formData.customerRate}
                    onChange={(e) => handleFormChange('customerRate', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="carrierRate">Carrier Rate ($)</Label>
                  <Input
                    id="carrierRate"
                    type="number"
                    value={formData.carrierRate}
                    onChange={(e) => handleFormChange('carrierRate', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="fuelSurcharge">Fuel Surcharge ($)</Label>
                  <Input
                    id="fuelSurcharge"
                    type="number"
                    value={formData.fuelSurcharge}
                    onChange={(e) => handleFormChange('fuelSurcharge', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
                <div>
                  <Label htmlFor="accessorials">Accessorials ($)</Label>
                  <Input
                    id="accessorials"
                    type="number"
                    value={formData.accessorials}
                    onChange={(e) => handleFormChange('accessorials', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                  />
                </div>
              </div>
              
              {/* Margin Calculation */}
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-2">Profit Calculation</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Revenue</p>
                    <p className="font-bold text-green-400">
                      ${(parseInt(formData.customerRate) + parseInt(formData.fuelSurcharge) + parseInt(formData.accessorials)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Cost</p>
                    <p className="font-bold">
                      ${(parseInt(formData.carrierRate) + parseInt(formData.fuelSurcharge)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gross Margin</p>
                    <p className="font-bold text-green-400">
                      ${(parseInt(formData.customerRate) - parseInt(formData.carrierRate) + parseInt(formData.accessorials)).toLocaleString()}
                      ({(((parseInt(formData.customerRate) - parseInt(formData.carrierRate) + parseInt(formData.accessorials)) / parseInt(formData.customerRate)) * 100).toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Special Instructions */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold">Special Instructions & Notes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => handleFormChange('specialInstructions', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Internal Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleFormChange('notes', e.target.value)}
                    className="backdrop-blur-md bg-white/20 border-white/20"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateShipment} className="bg-gradient-to-r from-primary to-primary/80">
              Create Shipment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Shipment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-background/95 border-white/20">
          {selectedShipment && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{selectedShipment.shipmentNumber}</DialogTitle>
                    <DialogDescription>
                      Shipment details and tracking information
                    </DialogDescription>
                  </div>
                  <Badge className={cn("border", getStatusColor(selectedShipment.status))}>
                    {selectedShipment.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card className="backdrop-blur-md bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Shipment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Transport Mode</p>
                        <p className="font-semibold">{selectedShipment.transportMode}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Equipment</p>
                        <p className="font-semibold">{selectedShipment.equipmentType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Priority</p>
                        <Badge className={cn("text-xs", getPriorityColor(selectedShipment.priority))}>
                          {selectedShipment.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-semibold">{selectedShipment.distance} miles</p>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Customer</p>
                      <div className="space-y-1">
                        <p className="font-semibold">{selectedShipment.customer.name}</p>
                        <p className="text-sm">{selectedShipment.customer.contact}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{selectedShipment.customer.email}</span>
                          <span className="text-sm text-muted-foreground">{selectedShipment.customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-3 w-3",
                                i < selectedShipment.customer.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              )} 
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{selectedShipment.customer.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Route Information */}
                <Card className="backdrop-blur-md bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Route & Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span className="font-semibold">Pickup</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <p className="text-sm">{selectedShipment.origin.address}</p>
                        <p className="text-sm">{selectedShipment.origin.city}, {selectedShipment.origin.state} {selectedShipment.origin.zipCode}</p>
                        <p className="text-sm text-muted-foreground">Contact: {selectedShipment.origin.contact} • {selectedShipment.origin.phone}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Scheduled: {new Date(selectedShipment.pickup.scheduled).toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {selectedShipment.pickup.window}
                          </Badge>
                        </div>
                        {selectedShipment.pickup.actual && (
                          <p className="text-sm text-green-600">
                            Actual: {new Date(selectedShipment.pickup.actual).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span className="font-semibold">Delivery</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <p className="text-sm">{selectedShipment.destination.address}</p>
                        <p className="text-sm">{selectedShipment.destination.city}, {selectedShipment.destination.state} {selectedShipment.destination.zipCode}</p>
                        <p className="text-sm text-muted-foreground">Contact: {selectedShipment.destination.contact} • {selectedShipment.destination.phone}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>Scheduled: {new Date(selectedShipment.delivery.scheduled).toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {selectedShipment.delivery.window}
                          </Badge>
                        </div>
                        {selectedShipment.delivery.actual && (
                          <p className="text-sm text-green-600">
                            Actual: {new Date(selectedShipment.delivery.actual).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Cargo Information */}
                <Card className="backdrop-blur-md bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Cargo Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="font-semibold">{selectedShipment.cargo.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Weight</p>
                        <p className="font-semibold">{selectedShipment.cargo.weight.toLocaleString()} lbs</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pieces</p>
                        <p className="font-semibold">{selectedShipment.cargo.pieces}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Value</p>
                        <p className="font-semibold">${selectedShipment.cargo.value.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {selectedShipment.cargo.hazmat && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        HAZMAT
                      </Badge>
                    )}
                    
                    {selectedShipment.cargo.temperature && (
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <ThermometerSun className="h-4 w-4 text-blue-400" />
                          <span className="font-semibold text-blue-400">Temperature Controlled</span>
                        </div>
                        <p className="text-sm">
                          {selectedShipment.cargo.temperature.min}°{selectedShipment.cargo.temperature.unit} - {selectedShipment.cargo.temperature.max}°{selectedShipment.cargo.temperature.unit}
                        </p>
                      </div>
                    )}
                    
                    {selectedShipment.cargo.specialHandling && selectedShipment.cargo.specialHandling.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Special Handling</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedShipment.cargo.specialHandling.map((handling, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {handling}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Financial Information */}
                <Card className="backdrop-blur-md bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Customer Rate</p>
                        <p className="font-semibold text-green-600">${selectedShipment.rates.customer.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Carrier Rate</p>
                        <p className="font-semibold">${selectedShipment.rates.carrier.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fuel Surcharge</p>
                        <p className="font-semibold">${selectedShipment.rates.fuelSurcharge.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Accessorials</p>
                        <p className="font-semibold">${selectedShipment.rates.accessorials.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                          <p className="text-lg font-bold text-green-400">
                            ${selectedShipment.rates.totalRevenue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Gross Margin</p>
                          <p className="text-lg font-bold text-green-400">
                            ${selectedShipment.rates.margin.toLocaleString()}
                            <span className="text-sm ml-1">
                              ({((selectedShipment.rates.margin / selectedShipment.rates.customer) * 100).toFixed(1)}%)
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Driver Information */}
                {selectedShipment.driver && (
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Driver Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-lg">
                            {selectedShipment.driver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold">{selectedShipment.driver.name}</h4>
                          <p className="text-sm text-muted-foreground">ID: {selectedShipment.driver.id}</p>
                          <p className="text-sm text-muted-foreground">Vehicle: {selectedShipment.driver.vehicle}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "w-3 h-3 rounded-full",
                                selectedShipment.driver.status === 'driving' ? 'bg-green-500' :
                                selectedShipment.driver.status === 'rest' ? 'bg-yellow-500' :
                                selectedShipment.driver.status === 'available' ? 'bg-blue-500' : 'bg-gray-500'
                              )} />
                              <span className="text-sm capitalize">
                                {selectedShipment.driver.status.replace('_', ' ')}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-3 w-3",
                                    i < selectedShipment.driver.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  )} 
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">{selectedShipment.driver.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Tracking Information */}
                {selectedShipment.tracking && Object.keys(selectedShipment.tracking).length > 0 && (
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Tracking & Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedShipment.tracking.progress !== undefined && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Delivery Progress</span>
                            <span>{selectedShipment.tracking.progress}%</span>
                          </div>
                          <Progress value={selectedShipment.tracking.progress} className="h-3" />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedShipment.tracking.currentLocation && (
                          <div>
                            <p className="text-sm text-muted-foreground">Current Location</p>
                            <p className="font-semibold">{selectedShipment.tracking.currentLocation}</p>
                          </div>
                        )}
                        
                        {selectedShipment.tracking.speed && (
                          <div>
                            <p className="text-sm text-muted-foreground">Current Speed</p>
                            <p className="font-semibold">{selectedShipment.tracking.speed} mph</p>
                          </div>
                        )}
                        
                        {selectedShipment.tracking.eta && (
                          <div>
                            <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                            <p className="font-semibold">{new Date(selectedShipment.tracking.eta).toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                      
                      {selectedShipment.tracking.alerts && selectedShipment.tracking.alerts.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Active Alerts</p>
                          <div className="space-y-2">
                            {selectedShipment.tracking.alerts.map((alert, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{alert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                
                {/* Documents */}
                <Card className="backdrop-blur-md bg-white/10 border-white/20 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedShipment.documents.map((doc, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <FileText className="h-5 w-5 text-blue-400" />
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                doc.status === 'signed' ? 'border-green-500 text-green-400' :
                                doc.status === 'uploaded' ? 'border-blue-500 text-blue-400' :
                                'border-yellow-500 text-yellow-400'
                              )}
                            >
                              {doc.status}
                            </Badge>
                          </div>
                          <p className="font-semibold text-sm">{doc.type}</p>
                          <div className="flex gap-1 mt-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Notes */}
                {selectedShipment.notes && (
                  <Card className="backdrop-blur-md bg-white/10 border-white/20 lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Notes & Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{selectedShipment.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIsEditDialogOpen(true);
                    setIsViewDialogOpen(false);
                  }}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Shipment
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShipmentsPage;