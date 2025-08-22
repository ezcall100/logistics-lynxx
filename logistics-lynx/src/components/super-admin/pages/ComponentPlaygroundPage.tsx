import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Textarea,
  Switch,
  Alert,
  AlertDescription,
  AlertTitle,
  Separator,
  buttonVariants,
  EnhancedDataTable,
  EnhancedStatCard,
  EnhancedSearch,
  EnhancedForm
} from '@/components/ui';
import { 
  Brain, 
  Shield, 
  Truck, 
  Users, 
  BarChart3, 
  Settings, 
  Zap, 
  Globe,
  Database,
  Network,
  Activity,
  Car,
  Building2,
  Calculator,
  Briefcase,
  Phone,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Home,
  Grid,
  List,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  User,
  LogOut,
  Bell,
  Cog,
  HelpCircle,
  Info,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Copy,
  Scissors,
  FileText,
  File,
  Folder,
  FolderOpen,
  Save,
  Edit,
  Trash2,
  Archive,
  Inbox,
  Send,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  MessageCircle,
  Video,
  Camera,
  Image,
  Music,
  Headphones,
  Mic,
  MicOff,
  Volume,
  Volume1,
  Lock,
  Unlock,
  Key,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  XCircle,
  MinusCircle,
  PlusCircle,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Package,
  ShoppingCart,
  Wrench,
  Fuel,
  Sun,
  Moon,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const ComponentPlaygroundPage: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [loading, setLoading] = useState(false);

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Active' },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true, render: (value: string) => (
      <Badge variant={value === 'Active' ? 'default' : 'secondary'}>{value}</Badge>
    )},
  ];

  const handleFormSubmit = async (data: any) => {
    console.log('Form submitted:', data);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">🎨 Component Playground</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Test and explore all UI components and variants
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedTheme} onValueChange={setSelectedTheme}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Theme</SelectItem>
              <SelectItem value="dark">Dark Theme</SelectItem>
              <SelectItem value="enterprise">Enterprise Theme</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setLoading(!loading)}>
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Toggle Loading
          </Button>
        </div>
      </div>

      <Tabs defaultValue="buttons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
        </TabsList>

        {/* Buttons Tab */}
        <TabsContent value="buttons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All available button styles and variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Enterprise Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Enterprise Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="gradient">Gradient</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="icon-sm"><Plus className="w-4 h-4" /></Button>
                  <Button size="icon"><Settings className="w-4 h-4" /></Button>
                  <Button size="icon-lg"><User className="w-6 h-6" /></Button>
                </div>
              </div>

              {/* Loading States */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Loading States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button loading={loading} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="destructive" loading={loading} disabled={loading}>
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
                    {loading ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>

              {/* Preset Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Preset Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button className={buttonVariantsPresets.primary}>Primary</Button>
                  <Button className={buttonVariantsPresets.primaryLarge}>Primary Large</Button>
                  <Button className={buttonVariantsPresets.destructive}>Destructive</Button>
                  <Button className={buttonVariantsPresets.gradient}>Gradient</Button>
                  <Button className={buttonVariantsPresets.icon}><Plus className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cards Tab */}
        <TabsContent value="cards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>Simple card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is a basic card component with standard styling.</p>
              </CardContent>
            </Card>

            {/* Card with Icon */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <CardTitle>Card with Icon</CardTitle>
                </div>
                <CardDescription>Card featuring an icon in the header</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card includes an icon to enhance visual appeal.</p>
              </CardContent>
            </Card>

            {/* Interactive Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see the shadow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card responds to user interaction with hover effects.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forms Tab */}
        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>All form elements and their variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
              </div>

              {/* Select */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter a description" />
              </div>

              {/* Checkbox and Radio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Checkboxes</h4>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Radio Group</h4>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Switch */}
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Components</CardTitle>
              <CardDescription>Tables, badges, and data display elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Badges */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* Enhanced Data Table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Enhanced Data Table</h3>
                <EnhancedDataTable
                  data={tableData}
                  columns={tableColumns}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="space-y-4">
            {/* Alerts */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert with important details.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                This is an error alert for critical issues.
              </AlertDescription>
            </Alert>

            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                This is a success alert for completed actions.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        {/* Enhanced Components Tab */}
        <TabsContent value="enhanced" className="space-y-6">
          {/* Enhanced Stat Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Stat Cards</CardTitle>
              <CardDescription>Animated stat cards with gradients and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EnhancedStatCard
                  title="Total Users"
                  value={1234}
                  trend={12.5}
                  trendDirection="up"
                  icon={Users}
                  color="blue"
                  animated={true}
                />
                <EnhancedStatCard
                  title="Revenue"
                  value={45678}
                  trend={-5.2}
                  trendDirection="down"
                  icon={DollarSign}
                  color="green"
                  animated={true}
                  prefix="$"
                />
                <EnhancedStatCard
                  title="Active Sessions"
                  value={89}
                  trend={0}
                  trendDirection="neutral"
                  icon={Activity}
                  color="purple"
                  animated={true}
                  suffix="%"
                />
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Search */}
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Search</CardTitle>
              <CardDescription>Advanced search with command palette</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EnhancedSearch
                placeholder="Search anything..."
                variant="default"
                className="w-full"
              />
              <EnhancedSearch
                placeholder="Command palette (Ctrl+K)"
                variant="command"
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Enhanced Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Form</CardTitle>
              <CardDescription>Form with validation and floating labels</CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedForm
                title="User Registration"
                description="Create a new user account"
                fields={[
                  {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    required: true,
                    placeholder: 'Enter first name'
                  },
                  {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                    required: true,
                    placeholder: 'Enter last name'
                  },
                  {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    required: true,
                    placeholder: 'Enter email address'
                  },
                  {
                    name: 'role',
                    label: 'Role',
                    type: 'select',
                    required: true,
                    options: [
                      { value: 'admin', label: 'Administrator' },
                      { value: 'user', label: 'User' },
                      { value: 'manager', label: 'Manager' }
                    ]
                  }
                ]}
                onSubmit={handleFormSubmit}
                layout="grid"
                showValidation={true}
                className="w-full"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComponentPlaygroundPage;
