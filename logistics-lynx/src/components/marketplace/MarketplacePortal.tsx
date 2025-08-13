import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { Search, Filter, Star, Heart, ShoppingCart, Plus, Edit, Trash2, Eye, MessageSquare, Truck, Package, Warehouse, Tools, Users, MapPin, Calendar, DollarSign, Clock, Award, Shield, TrendingUp, BarChart3, Star as StarIcon, ThumbsUp, ThumbsDown, Share2, Bookmark, Tag, CheckCircle, AlertCircle, Zap, Globe, Building, User, CreditCard, FileText } from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data for Marketplace
interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  category: 'freight' | 'warehousing' | 'equipment' | 'consulting' | 'insurance' | 'maintenance';
  provider: string;
  providerRating: number;
  providerReviews: number;
  price: string;
  priceType: 'fixed' | 'per_mile' | 'per_hour' | 'negotiable';
  location: string;
  availability: 'available' | 'limited' | 'unavailable';
  rating: number;
  reviews: number;
  features: string[];
  images: string[];
  tags: string[];
  createdAt: string;
  expiresAt: string;
  isFeatured: boolean;
  isVerified: boolean;
}

interface MarketplaceOrder {
  id: string;
  serviceId: string;
  serviceTitle: string;
  provider: string;
  buyer: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price: string;
  quantity: number;
  totalAmount: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  rating?: number;
  review?: string;
}

interface MarketplaceReview {
  id: string;
  serviceId: string;
  reviewer: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface MarketplaceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  serviceCount: number;
  averagePrice: string;
}

const mockServices: MarketplaceService[] = [
  {
    id: 'SVC-001',
    title: 'Cross-Country Freight Transportation',
    description: 'Reliable cross-country freight transportation with real-time tracking and insurance coverage. Specializing in temperature-controlled and hazardous materials.',
    category: 'freight',
    provider: 'FastTrack Logistics',
    providerRating: 4.8,
    providerReviews: 156,
    price: '$2.50',
    priceType: 'per_mile',
    location: 'Nationwide',
    availability: 'available',
    rating: 4.7,
    reviews: 89,
    features: ['Real-time tracking', 'Insurance included', '24/7 support', 'Temperature controlled'],
    images: ['freight1.jpg', 'freight2.jpg'],
    tags: ['cross-country', 'temperature-controlled', 'hazardous-materials'],
    createdAt: '2024-01-10',
    expiresAt: '2024-02-10',
    isFeatured: true,
    isVerified: true
  },
  {
    id: 'SVC-002',
    title: 'Warehouse Storage Solutions',
    description: 'Secure warehouse storage with climate control, 24/7 security, and flexible storage options. Perfect for short-term and long-term storage needs.',
    category: 'warehousing',
    provider: 'SecureStorage Co',
    providerRating: 4.6,
    providerReviews: 203,
    price: '$0.85',
    priceType: 'per_hour',
    location: 'Los Angeles, CA',
    availability: 'available',
    rating: 4.5,
    reviews: 67,
    features: ['Climate controlled', '24/7 security', 'Flexible terms', 'Loading docks'],
    images: ['warehouse1.jpg', 'warehouse2.jpg'],
    tags: ['warehouse', 'storage', 'climate-controlled'],
    createdAt: '2024-01-12',
    expiresAt: '2024-02-12',
    isFeatured: false,
    isVerified: true
  },
  {
    id: 'SVC-003',
    title: 'Truck Maintenance & Repair',
    description: 'Professional truck maintenance and repair services. Certified mechanics, quality parts, and quick turnaround times.',
    category: 'maintenance',
    provider: 'ProTruck Services',
    providerRating: 4.9,
    providerReviews: 89,
    price: '$125.00',
    priceType: 'per_hour',
    location: 'Chicago, IL',
    availability: 'limited',
    rating: 4.8,
    reviews: 45,
    features: ['Certified mechanics', 'Quality parts', 'Quick turnaround', 'Warranty'],
    images: ['maintenance1.jpg', 'maintenance2.jpg'],
    tags: ['maintenance', 'repair', 'certified'],
    createdAt: '2024-01-08',
    expiresAt: '2024-02-08',
    isFeatured: true,
    isVerified: true
  }
];

const mockOrders: MarketplaceOrder[] = [
  {
    id: 'ORD-001',
    serviceId: 'SVC-001',
    serviceTitle: 'Cross-Country Freight Transportation',
    provider: 'FastTrack Logistics',
    buyer: 'TechCorp Industries',
    status: 'completed',
    price: '$2.50',
    quantity: 1,
    totalAmount: '$3,750.00',
    orderDate: '2024-01-05',
    expectedDelivery: '2024-01-12',
    actualDelivery: '2024-01-11',
    rating: 5,
    review: 'Excellent service! Delivered ahead of schedule with perfect condition.'
  },
  {
    id: 'ORD-002',
    serviceId: 'SVC-002',
    serviceTitle: 'Warehouse Storage Solutions',
    provider: 'SecureStorage Co',
    buyer: 'Global Imports',
    status: 'in_progress',
    price: '$0.85',
    quantity: 1,
    totalAmount: '$612.00',
    orderDate: '2024-01-08',
    expectedDelivery: '2024-01-15'
  }
];

const mockReviews: MarketplaceReview[] = [
  {
    id: 'REV-001',
    serviceId: 'SVC-001',
    reviewer: 'John Smith',
    rating: 5,
    title: 'Excellent Service',
    comment: 'FastTrack Logistics provided exceptional service. The driver was professional and kept us updated throughout the journey.',
    date: '2024-01-15',
    helpful: 12,
    verified: true
  },
  {
    id: 'REV-002',
    serviceId: 'SVC-001',
    reviewer: 'Sarah Johnson',
    rating: 4,
    title: 'Good Experience',
    comment: 'Overall good service. Delivery was on time and goods arrived in perfect condition.',
    date: '2024-01-14',
    helpful: 8,
    verified: true
  }
];

const mockCategories: MarketplaceCategory[] = [
  {
    id: 'CAT-001',
    name: 'Freight Transportation',
    icon: '🚛',
    description: 'Reliable freight transportation services',
    serviceCount: 45,
    averagePrice: '$2.75/mile'
  },
  {
    id: 'CAT-002',
    name: 'Warehousing',
    icon: '🏭',
    description: 'Secure storage solutions',
    serviceCount: 23,
    averagePrice: '$0.90/hour'
  },
  {
    id: 'CAT-003',
    name: 'Equipment & Tools',
    icon: '🔧',
    description: 'Professional equipment and tools',
    serviceCount: 67,
    averagePrice: '$85.00/day'
  },
  {
    id: 'CAT-004',
    name: 'Consulting Services',
    icon: '💼',
    description: 'Expert logistics consulting',
    serviceCount: 12,
    averagePrice: '$150.00/hour'
  }
];

export const MarketplacePortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [services, setServices] = useState<MarketplaceService[]>(mockServices);
  const [orders, setOrders] = useState<MarketplaceOrder[]>(mockOrders);
  const [reviews, setReviews] = useState<MarketplaceReview[]>(mockReviews);
  const [categories, setCategories] = useState<MarketplaceCategory[]>(mockCategories);
  const [filteredServices, setFilteredServices] = useState<MarketplaceService[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [selectedService, setSelectedService] = useState<MarketplaceService | null>(null);
  const [showListServiceDialog, setShowListServiceDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  // Filter services based on search and filters
  useEffect(() => {
    const filtered = services.filter(service => {
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredServices(filtered);
  }, [services, searchQuery, categoryFilter]);

  const handleListService = () => {
    toast({
      title: 'Service Listed',
      description: 'Your service has been successfully listed on the marketplace.',
      variant: 'default'
    });
    setShowListServiceDialog(false);
  };

  const handlePlaceOrder = () => {
    toast({
      title: 'Order Placed',
      description: 'Your order has been successfully placed.',
      variant: 'default'
    });
    setShowOrderDialog(false);
  };

  const getRoleSpecificActions = () => {
    switch (currentRole) {
      case 'shipper_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowListServiceDialog(true)} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              List Service
            </Button>
            <Button variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              My Orders
            </Button>
          </div>
        );
      case 'carrier_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowListServiceDialog(true)} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              List Service
            </Button>
            <Button variant="outline">
              <Truck className="h-4 w-4 mr-2" />
              My Services
            </Button>
          </div>
        );
      case 'freight_broker_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowListServiceDialog(true)} className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              List Service
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Brokers
            </Button>
          </div>
        );
      default:
        return (
          <Button onClick={() => setShowListServiceDialog(true)} className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            List Service
          </Button>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'freight': '🚛',
      'warehousing': '🏭',
      'equipment': '🔧',
      'consulting': '💼',
      'insurance': '🛡️',
      'maintenance': '🔧'
    };
    return icons[category] || '📦';
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🏪 Marketplace Portal</h1>
              <p className="text-gray-600">Central marketplace for logistics services and equipment</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {roleInfo.name}
              </Badge>
              {getRoleSpecificActions()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Services</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="freight">Freight Transportation</SelectItem>
                      <SelectItem value="warehousing">Warehousing</SelectItem>
                      <SelectItem value="equipment">Equipment & Tools</SelectItem>
                      <SelectItem value="consulting">Consulting Services</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Under $50</SelectItem>
                      <SelectItem value="medium">$50 - $200</SelectItem>
                      <SelectItem value="high">Over $200</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          {service.isFeatured && (
                            <Badge className="bg-amber-100 text-amber-800">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{service.provider}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center">
                            {renderStars(service.rating)}
                            <span className="text-sm text-gray-600 ml-1">({service.reviews})</span>
                          </div>
                          <Badge className={getAvailabilityColor(service.availability)}>
                            {service.availability}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{service.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{service.price}</span>
                        <span className="text-sm text-gray-600">per {service.priceType.replace('_', ' ')}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedService(service)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-amber-600 hover:bg-amber-700"
                          onClick={() => setShowOrderDialog(true)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="text-center">
                      <div className="text-4xl mb-2">{category.icon}</div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-center">
                      <div className="flex justify-between text-sm">
                        <span>Services:</span>
                        <span className="font-medium">{category.serviceCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Price:</span>
                        <span className="font-medium">{category.averagePrice}</span>
                      </div>
                      <Button className="w-full mt-3 bg-amber-600 hover:bg-amber-700">
                        Browse Category
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.serviceTitle}</CardTitle>
                        <p className="text-sm text-gray-600">{order.provider}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Order Date:</span>
                        <span className="text-sm">{order.orderDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Expected Delivery:</span>
                        <span className="text-sm">{order.expectedDelivery}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Amount:</span>
                        <span className="text-lg font-bold text-green-600">{order.totalAmount}</span>
                      </div>
                      {order.rating && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Your Rating:</span>
                          <div className="flex">
                            {renderStars(order.rating)}
                          </div>
                        </div>
                      )}
                      {order.review && (
                        <div className="pt-2">
                          <p className="text-sm text-gray-600 italic">"{order.review}"</p>
                        </div>
                      )}
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact Provider
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{review.title}</h4>
                          {review.verified && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{review.reviewer}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedService?.title}</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Provider</h4>
                  <p className="text-sm text-gray-600">{selectedService.provider}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Category</h4>
                  <p className="text-sm text-gray-600">{selectedService.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-sm text-gray-600">{selectedService.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Price</h4>
                  <p className="text-sm text-gray-600">{selectedService.price} per {selectedService.priceType.replace('_', ' ')}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-gray-600">{selectedService.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">Features</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedService.features.map((feature) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Tags</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedService.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Close
                </Button>
                <Button onClick={() => setShowOrderDialog(true)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Order Now
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* List Service Dialog */}
      <Dialog open={showListServiceDialog} onOpenChange={setShowListServiceDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>List Your Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Service Title</label>
                <Input placeholder="Enter service title" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freight">Freight Transportation</SelectItem>
                    <SelectItem value="warehousing">Warehousing</SelectItem>
                    <SelectItem value="equipment">Equipment & Tools</SelectItem>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full p-3 border rounded-md" 
                rows={4}
                placeholder="Describe your service..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium">Price Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="per_mile">Per Mile</SelectItem>
                    <SelectItem value="per_hour">Per Hour</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="Service location" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowListServiceDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleListService}>
                List Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Place Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Service</label>
                <Input placeholder="Selected service" disabled />
              </div>
              <div>
                <label className="text-sm font-medium">Provider</label>
                <Input placeholder="Service provider" disabled />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input type="number" placeholder="1" />
              </div>
              <div>
                <label className="text-sm font-medium">Expected Delivery</label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Special Requirements</label>
              <textarea 
                className="w-full p-3 border rounded-md" 
                rows={3}
                placeholder="Any special requirements or notes..."
              />
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handlePlaceOrder}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Place Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketplacePortal;
