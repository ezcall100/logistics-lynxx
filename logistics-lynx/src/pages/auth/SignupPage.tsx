import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Brain, 
  Truck, 
  Package, 
  Users, 
  Crown, 
  User,
  CreditCard,
  TrendingUp,
  BarChart3,
  DollarSign,
  FileText,
  ShoppingCart,
  Globe,
  UserCheck
} from 'lucide-react';

interface PortalOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<any>;
  features: string[];
  color: string;
}

interface ModuleOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<any>;
  features: string[];
  color: string;
}

interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  recommendedPortals: string[];
  recommendedModules: string[];
}

const SignupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Account Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    businessType: '',
    
    // Step 2: Portal & Module Selection
    selectedPortals: [] as string[],
    selectedModules: [] as string[],
    
    // Step 3: Review & Payment
    agreeToTerms: false,
    marketingConsent: false
  });

  const navigate = useNavigate();

  // Business Types
  const businessTypes: BusinessType[] = [
    {
      id: 'shipper',
      name: 'Shipper',
      description: 'Ship cargo and manage logistics',
      icon: Package,
      color: 'blue',
      recommendedPortals: ['shipper'],
      recommendedModules: ['crm', 'loadboard', 'rates', 'financials']
    },
    {
      id: 'carrier',
      name: 'Carrier',
      description: 'Transport goods and manage fleet',
      icon: Truck,
      color: 'green',
      recommendedPortals: ['carrier'],
      recommendedModules: ['crm', 'loadboard', 'rates', 'financials']
    },
    {
      id: 'broker',
      name: 'Broker',
      description: 'Connect shippers with carriers',
      icon: Users,
      color: 'purple',
      recommendedPortals: ['broker'],
      recommendedModules: ['crm', 'loadboard', 'rates', 'financials', 'marketplace']
    },
    {
      id: 'owner-operator',
      name: 'Owner-Operator',
      description: 'Independent truck owner',
      icon: Crown,
      color: 'orange',
      recommendedPortals: ['owner-operator'],
      recommendedModules: ['loadboard', 'rates', 'financials']
    },
    {
      id: 'driver',
      name: 'Driver',
      description: 'Professional truck driver',
      icon: User,
      color: 'red',
      recommendedPortals: ['driver'],
      recommendedModules: ['loadboard', 'rates']
    }
  ];

  // Portal Options
  const portalOptions: PortalOption[] = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Master Control Program oversight',
      price: 0,
      icon: Brain,
      features: ['Full system access', 'User management', 'System monitoring', 'Advanced analytics'],
      color: 'indigo'
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      description: 'Logistics orchestration',
      price: 149,
      icon: Users,
      features: ['Smart carrier matching', 'Rate optimization', 'Automated negotiation', 'Compliance monitoring'],
      color: 'purple'
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      description: 'Transportation network management',
      price: 99,
      icon: Truck,
      features: ['Fleet management', 'Route optimization', 'Revenue tracking', 'Driver management'],
      color: 'green'
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      description: 'Cargo management & tracking',
      price: 79,
      icon: Package,
      features: ['Shipment tracking', 'Cost optimization', 'Service monitoring', 'Compliance tracking'],
      color: 'blue'
    },
    {
      id: 'owner-operator',
      name: 'Owner-Operator Portal',
      description: 'Fleet management',
      price: 59,
      icon: Crown,
      features: ['Profit maximization', 'Home time optimization', 'Smart route planning', 'Financial tracking'],
      color: 'orange'
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      description: 'Mobile-first operational interface',
      price: 29,
      icon: User,
      features: ['Mobile app access', 'Route navigation', 'Time tracking', 'Communication tools'],
      color: 'red'
    }
  ];

  // Module Options
  const moduleOptions: ModuleOption[] = [
    {
      id: 'crm',
      name: 'CRM Module',
      description: 'Unified relationships system',
      price: 49,
      icon: UserCheck,
      features: ['Contact management', 'Lead tracking', 'Communication history', 'Relationship analytics'],
      color: 'blue'
    },
    {
      id: 'loadboard',
      name: 'Load Board',
      description: 'Data-informed matchmaker',
      price: 39,
      icon: BarChart3,
      features: ['Smart matching', 'Real-time data', 'Automated bidding', 'Performance analytics'],
      color: 'green'
    },
    {
      id: 'rates',
      name: 'Rates Module',
      description: 'Freight rate intelligence',
      price: 39,
      icon: TrendingUp,
      features: ['Rate optimization', 'Market analysis', 'Profit calculation', 'Historical data'],
      color: 'purple'
    },
    {
      id: 'financials',
      name: 'Financials',
      description: 'Complete accounting system',
      price: 69,
      icon: DollarSign,
      features: ['Invoicing', 'Expense tracking', 'Financial reporting', 'Tax preparation'],
      color: 'emerald'
    },
    {
      id: 'onboarding',
      name: 'Onboarding',
      description: 'Unified onboarding system',
      price: 29,
      icon: FileText,
      features: ['Document management', 'Compliance tracking', 'Training modules', 'Progress monitoring'],
      color: 'amber'
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      description: 'Apps & integrations',
      price: 19,
      icon: ShoppingCart,
      features: ['Third-party apps', 'API integrations', 'Custom solutions', 'App store'],
      color: 'pink'
    },
    {
      id: 'directory',
      name: 'Directory',
      description: 'Global business directory',
      price: 19,
      icon: Globe,
      features: ['Business listings', 'Contact database', 'Industry networking', 'Market research'],
      color: 'cyan'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePortalToggle = (portalId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPortals: prev.selectedPortals.includes(portalId)
        ? prev.selectedPortals.filter(id => id !== portalId)
        : [...prev.selectedPortals, portalId]
    }));
  };

  const handleModuleToggle = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(moduleId)
        ? prev.selectedModules.filter(id => id !== moduleId)
        : [...prev.selectedModules, moduleId]
    }));
  };

  const handleBusinessTypeSelect = (businessType: BusinessType) => {
    setFormData(prev => ({
      ...prev,
      businessType: businessType.id,
      selectedPortals: businessType.recommendedPortals,
      selectedModules: businessType.recommendedModules
    }));
  };

  const calculateTotalCost = () => {
    const portalCost = portalOptions
      .filter(portal => formData.selectedPortals.includes(portal.id))
      .reduce((sum, portal) => sum + portal.price, 0);
    
    const moduleCost = moduleOptions
      .filter(module => formData.selectedModules.includes(module.id))
      .reduce((sum, module) => sum + module.price, 0);
    
    return portalCost + moduleCost;
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup process
    console.log('Signup data:', formData);
    navigate('/login');
  };

  const selectedBusinessType = businessTypes.find(bt => bt.id === formData.businessType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
              Trans Bot AI
            </h1>
            <p className="text-xl text-gray-300">Trans Bot AI</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-purple-500' : 'bg-gray-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-gray-400">
              {currentStep === 1 && 'Account Information'}
              {currentStep === 2 && 'Portal & Module Selection'}
              {currentStep === 3 && 'Review & Payment'}
            </div>
          </div>

          {/* Form Container */}
          <div className="glass-card border border-purple-500/20 p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Account Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Create Your Account</h2>
                  
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      Business Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {businessTypes.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => handleBusinessTypeSelect(type)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.businessType === type.id
                              ? `border-${type.color}-500 bg-${type.color}-500/10`
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <type.icon className={`w-6 h-6 text-${type.color}-400`} />
                            <div>
                              <h3 className="font-semibold text-white">{type.name}</h3>
                              <p className="text-sm text-gray-400">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Portal & Module Selection */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Select Your Portals & Modules</h2>
                  
                  {/* Portal Selection */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Portals</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {portalOptions.map((portal) => (
                        <div
                          key={portal.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.selectedPortals.includes(portal.id)
                              ? `border-${portal.color}-500 bg-${portal.color}-500/10`
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => handlePortalToggle(portal.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <portal.icon className={`w-6 h-6 text-${portal.color}-400`} />
                              <h4 className="font-semibold text-white">{portal.name}</h4>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-white">
                                ${portal.price}/mo
                              </div>
                              {portal.price === 0 && (
                                <div className="text-xs text-green-400">Free</div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{portal.description}</p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            {portal.features.slice(0, 2).map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="w-3 h-3 mr-2 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Module Selection */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Modules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {moduleOptions.map((module) => (
                        <div
                          key={module.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.selectedModules.includes(module.id)
                              ? `border-${module.color}-500 bg-${module.color}-500/10`
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                          onClick={() => handleModuleToggle(module.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <module.icon className={`w-6 h-6 text-${module.color}-400`} />
                              <h4 className="font-semibold text-white">{module.name}</h4>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-white">
                                ${module.price}/mo
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            {module.features.slice(0, 2).map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="w-3 h-3 mr-2 text-green-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-3">Cost Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Portals:</span>
                        <span>${portalOptions
                          .filter(portal => formData.selectedPortals.includes(portal.id))
                          .reduce((sum, portal) => sum + portal.price, 0)}/mo
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Modules:</span>
                        <span>${moduleOptions
                          .filter(module => formData.selectedModules.includes(module.id))
                          .reduce((sum, module) => sum + module.price, 0)}/mo
                        </span>
                      </div>
                      <div className="border-t border-white/20 pt-2">
                        <div className="flex justify-between text-lg font-bold text-white">
                          <span>Total:</span>
                          <span>${calculateTotalCost()}/mo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Review & Complete</h2>
                  
                  {/* Account Summary */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-3">Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                      <div>
                        <span className="text-gray-400">Name:</span> {formData.firstName} {formData.lastName}
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span> {formData.email}
                      </div>
                      <div>
                        <span className="text-gray-400">Company:</span> {formData.companyName}
                      </div>
                      <div>
                        <span className="text-gray-400">Business Type:</span> {selectedBusinessType?.name}
                      </div>
                    </div>
                  </div>

                  {/* Selection Summary */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-3">Your Selection</h4>
                    
                    <div className="mb-4">
                      <h5 className="font-medium text-white mb-2">Selected Portals:</h5>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedPortals.map(portalId => {
                          const portal = portalOptions.find(p => p.id === portalId);
                          return portal ? (
                            <span key={portalId} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                              {portal.name} (${portal.price}/mo)
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-white mb-2">Selected Modules:</h5>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedModules.map(moduleId => {
                          const module = moduleOptions.find(m => m.id === moduleId);
                          return module ? (
                            <span key={moduleId} className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
                              {module.name} (${module.price}/mo)
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total Monthly Cost:</span>
                        <span>${calculateTotalCost()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                        required
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                        I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and{' '}
                        <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="marketingConsent"
                        checked={formData.marketingConsent}
                        onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                        className="mt-1 w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="marketingConsent" className="text-sm text-gray-300">
                        I would like to receive updates about new features and services
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors ml-auto"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-colors ml-auto"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Complete Signup</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-purple-400 hover:text-purple-300">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
