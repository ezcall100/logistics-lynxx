import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  MapPin, 
  Truck, 
  DollarSign, 
  Calendar, 
  Filter, 
  Search, 
  Plus, 
  Eye, 
  Star,
  Clock,
  Package,
  Target,
  TrendingUp,
  Bookmark,
  Phone,
  Mail,
  MessageSquare,
  Container,
  Train,
  Car
} from 'lucide-react';

// Mock data for available loads
const mockLoads = [
  {
    id: 'LD001',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    distance: '372 miles',
    pickup: '2024-01-15',
    delivery: '2024-01-16',
    rate: '$1,850',
    weight: '45,000 lbs',
    equipment: 'Dry Van',
    commodity: 'Electronics',
    broker: 'Freight Solutions LLC',
    contact: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john@freightsolutions.com',
    priority: 'high',
    isBookmarked: false,
    postedTime: '2 hours ago',
    loadType: 'Full Truckload',
    requirements: ['HAZMAT Certified', 'Temperature Controlled'],
    notes: 'Delivery appointment required. Contact receiver 2 hours prior.'
  },
  {
    id: 'LD002',
    origin: 'Dallas, TX',
    destination: 'Miami, FL',
    distance: '1,247 miles',
    pickup: '2024-01-16',
    delivery: '2024-01-18',
    rate: '$3,200',
    weight: '48,500 lbs',
    equipment: 'Refrigerated',
    commodity: 'Fresh Produce',
    broker: 'Cold Chain Express',
    contact: 'Sarah Johnson',
    phone: '(555) 987-6543',
    email: 'sarah@coldchain.com',
    priority: 'urgent',
    isBookmarked: true,
    postedTime: '1 hour ago',
    loadType: 'Full Truckload',
    requirements: ['Refrigeration Unit', 'DOT Medical Card'],
    notes: 'Temperature must be maintained at 34°F throughout transit.'
  },
  {
    id: 'LD003',
    origin: 'Chicago, IL',
    destination: 'Denver, CO',
    distance: '923 miles',
    pickup: '2024-01-17',
    delivery: '2024-01-19',
    rate: '$2,450',
    weight: '42,000 lbs',
    equipment: 'Flatbed',
    commodity: 'Construction Materials',
    broker: 'Heavy Haul Logistics',
    contact: 'Mike Wilson',
    phone: '(555) 456-7890',
    email: 'mike@heavyhaul.com',
    priority: 'medium',
    isBookmarked: false,
    postedTime: '3 hours ago',
    loadType: 'Full Truckload',
    requirements: ['Flatbed Experience', 'Tarps & Straps'],
    notes: 'Load requires special securing. Tarps and straps provided.'
  }
];

const LoadBoardPage = () => {
  const location = useLocation();
  
  // Determine which page to show based on the URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path.includes('/truckload')) return 'truckload';
    if (path.includes('/ltl')) return 'ltl';
    if (path.includes('/intermodal')) return 'intermodal';
    if (path.includes('/drayage')) return 'drayage';
    if (path.includes('/auto')) return 'auto';
    if (path.includes('/spot')) return 'spot';
    if (path.includes('/posted')) return 'posted';
    return 'all';
  };

  const currentPage = getCurrentPage();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'truckload':
        return <TruckloadPage />;
      case 'ltl':
        return <LTLPage />;
      case 'intermodal':
        return <IntermodalPage />;
      case 'drayage':
        return <DrayagePage />;
      case 'auto':
        return <AutoPage />;
      case 'spot':
        return <SpotMarketPage />;
      case 'posted':
        return <PostedLoadsPage />;
      default:
        return <AllLoadsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8">
      {renderCurrentPage()}
    </div>
  );
};

// All Loads Page Component
const AllLoadsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [loads, setLoads] = useState(mockLoads);

  const filteredLoads = loads.filter(load => {
    const matchesSearch = 
      load.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      load.commodity.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEquipment = selectedEquipment === 'all' || load.equipment === selectedEquipment;
    
    return matchesSearch && matchesEquipment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Loads</h1>
          <p className="text-gray-600 dark:text-gray-300">Browse all available freight opportunities</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Available Loads</p>
                <p className="text-2xl font-bold text-blue-600">2,847</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-red-600">127</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rate/Mile</p>
                <p className="text-2xl font-bold text-green-600">$2.85</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bookmarked</p>
                <p className="text-2xl font-bold text-purple-600">23</p>
              </div>
              <Bookmark className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <Input
                placeholder="Search by origin, destination, commodity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Equipment</SelectItem>
                <SelectItem value="Dry Van">Dry Van</SelectItem>
                <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                <SelectItem value="Flatbed">Flatbed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Load Cards */}
      <div className="grid gap-4">
        {filteredLoads.map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// Truckload Page Component
const TruckloadPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Truckload (TL)</h1>
          <p className="text-gray-600 dark:text-gray-300">Full truckload shipments and freight</p>
        </div>
      </div>

      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Truckload Operations</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Full truckload shipments typically 10,000+ lbs using dedicated trucks for single shipper loads.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockLoads.filter(load => ['Dry Van', 'Refrigerated', 'Flatbed'].includes(load.equipment)).map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// LTL Page Component
const LTLPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Less Than Truckload (LTL)</h1>
          <p className="text-gray-600 dark:text-gray-300">Smaller shipments under 10,000 lbs</p>
        </div>
      </div>

      <Card className="bg-green-50 dark:bg-green-900/20">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">LTL Freight</h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Smaller shipments that share truck space with other loads, ideal for cost-effective shipping.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockLoads.slice(0, 2).map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// Intermodal Page Component
const IntermodalPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Intermodal Transport</h1>
          <p className="text-gray-600 dark:text-gray-300">Multi-modal freight using truck, rail, and ship</p>
        </div>
      </div>

      <Card className="bg-purple-50 dark:bg-purple-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Train className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Intermodal Solutions</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Long-distance freight utilizing multiple transportation modes for cost efficiency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockLoads.slice(0, 2).map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// Drayage Page Component
const DrayagePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Drayage Operations</h1>
          <p className="text-gray-600 dark:text-gray-300">Short-distance port and rail yard transport</p>
        </div>
      </div>

      <Card className="bg-orange-50 dark:bg-orange-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Container className="h-8 w-8 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Drayage Services</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Short-distance container transport between ports, rail yards, and warehouses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockLoads.slice(0, 2).map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// Auto Transport Page Component
const AutoPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Auto Transport</h1>
          <p className="text-gray-600 dark:text-gray-300">Vehicle transportation and car hauling</p>
        </div>
      </div>

      <Card className="bg-red-50 dark:bg-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Vehicle Transport</h3>
              <p className="text-sm text-red-700 dark:text-red-300">
                Specialized vehicle transportation using car haulers and specialized equipment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockLoads.slice(0, 2).map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// Spot Market Page Component
const SpotMarketPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Spot Market</h1>
          <p className="text-gray-600 dark:text-gray-300">Real-time freight with immediate pickup requirements</p>
        </div>
      </div>

      <Card className="bg-yellow-50 dark:bg-yellow-900/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Spot Market Opportunities</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Immediate freight opportunities with competitive rates and urgent pickup requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {mockLoads.filter(load => load.priority === 'high' || load.priority === 'urgent').map((load) => (
          <LoadCard key={load.id} load={load} />
        ))}
      </div>
    </div>
  );
};

// Posted Loads Page Component
const PostedLoadsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Posted Loads</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your posted freight listings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Post New Load
        </Button>
      </div>

      <Card className="bg-indigo-50 dark:bg-indigo-900/20">
        <CardContent className="p-4">
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Your Load Posts</h3>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            Create and manage your freight listings for carriers to bid on.
          </p>
        </CardContent>
      </Card>

      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Posted Loads</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't posted unknown loads yet.</p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Post Your First Load
        </Button>
      </div>
    </div>
  );
};

// Load Card Component
const LoadCard = ({ load }: { load: unknown }) => {
  const [isBookmarked, setIsBookmarked] = useState(load.isBookmarked);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{load.id}</Badge>
              <Badge variant={getPriorityColor(load.priority)}>{load.priority} priority</Badge>
              <Badge variant="secondary">{load.equipment}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Route</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="font-semibold">{load.origin}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="font-semibold">{load.destination}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{load.distance}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Schedule</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold">{load.pickup}</span>
                </div>
                <p className="text-sm text-gray-500">Deliver: {load.delivery}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rate</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-bold text-green-600 text-xl">{load.rate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <span>📦 {load.commodity}</span>
              <span>⚖️ {load.weight}</span>
              <span>🏢 {load.broker}</span>
            </div>
          </div>
          
          <div className="flex gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? 'text-yellow-600' : ''}
            >
              <Star className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
            
            <Button 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Book Load
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadBoardPage;