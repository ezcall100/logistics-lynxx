import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Building, Check, Brain } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [step, setStep] = useState<'info' | 'portals' | 'review'>('info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phone: '',
    businessType: 'shipper'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedPortals, setSelectedPortals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const businessTypes = [
    { id: 'shipper', label: 'Shipper', icon: '📦', description: 'Ship cargo and manage logistics' },
    { id: 'carrier', label: 'Carrier', icon: '🏢', description: 'Transport goods and manage fleet' },
    { id: 'broker', label: 'Broker', icon: '🛣️', description: 'Connect shippers with carriers' },
    { id: 'owner-operator', label: 'Owner-Operator', icon: '🚛', description: 'Independent truck owner' },
    { id: 'driver', label: 'Driver', icon: '🚗', description: 'Professional truck driver' }
  ];

  const availablePortals = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Master Control Program oversight',
      icon: '🧠',
      price: 299,
      features: ['System Administration', 'User Management', 'Tenant Management']
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      description: 'Logistics orchestration platform',
      icon: '🛣️',
      price: 149,
      features: ['Operations Center', 'Rates & Quotes', 'Load Board']
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      description: 'Transportation network management',
      icon: '🏢',
      price: 99,
      features: ['Marketplace', 'Contracts & Rates', 'Financials']
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      description: 'Cargo management and tracking',
      icon: '📦',
      price: 79,
      features: ['Book Shipment', 'Track & Trace', 'Analytics']
    },
    {
      id: 'owner-operator',
      name: 'Owner-Operator Portal',
      description: 'Fleet management and operations',
      icon: '🚛',
      price: 59,
      features: ['My Loads', 'Equipment Management', 'Cash Flow']
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      description: 'Mobile-first operational interface',
      icon: '🚗',
      price: 29,
      features: ['Today View', 'Check-ins', 'HOS/DVIR']
    }
  ];

  const availableModules = [
    {
      id: 'crm',
      name: 'CRM Module',
      description: 'Unified relationships system',
      icon: '📊',
      price: 49,
      features: ['Accounts & Contacts', 'Leads & Deals']
    },
    {
      id: 'loadboard',
      name: 'Load Board',
      description: 'Data-informed matchmaker',
      icon: '📋',
      price: 39,
      features: ['Post & Search', 'Bids & Awards']
    },
    {
      id: 'rates',
      name: 'Rates Module',
      description: 'Freight rate intelligence',
      icon: '💰',
      price: 39,
      features: ['Lane Matrix', 'Pricers']
    },
    {
      id: 'financials',
      name: 'Financials',
      description: 'Complete accounting system',
      icon: '💳',
      price: 69,
      features: ['AR/AP', 'Settlements']
    },
    {
      id: 'onboarding',
      name: 'Onboarding',
      description: 'Unified onboarding system',
      icon: '🚀',
      price: 29,
      features: ['Pre-Screening', 'Verification']
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      description: 'Apps & integrations',
      icon: '🛒',
      price: 19,
      features: ['App Discovery', 'Installation']
    },
    {
      id: 'directory',
      name: 'Directory',
      description: 'Global business directory',
      icon: '📚',
      price: 19,
      features: ['Entity Profiles', 'Search']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePortalToggle = (portalId: string) => {
    setSelectedPortals(prev => 
      prev.includes(portalId) 
        ? prev.filter(id => id !== portalId)
        : [...prev, portalId]
    );
  };

  const calculateTotalPrice = () => {
    const allItems = [...availablePortals, ...availableModules];
    return allItems
      .filter(item => selectedPortals.includes(item.id))
      .reduce((total, item) => total + item.price, 0);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/super-admin/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
              Trans Bot AI
            </h1>
            <p className="text-xl text-gray-300">MCP-V2 Portal Ecosystem</p>
          </div>

          <div className="glass-card border border-purple-500/20 p-8">
            {step === 'info' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Your Account</h2>
                
                <form onSubmit={(e) => { e.preventDefault(); setStep('portals'); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                          type="text" 
                          value={formData.firstName} 
                          onChange={(e) => handleInputChange('firstName', e.target.value)} 
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                          placeholder="Enter your first name" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                          type="text" 
                          value={formData.lastName} 
                          onChange={(e) => handleInputChange('lastName', e.target.value)} 
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                          placeholder="Enter your last name" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)} 
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                        placeholder="Enter your email" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          value={formData.password} 
                          onChange={(e) => handleInputChange('password', e.target.value)} 
                          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                          placeholder="Create a password" 
                          required 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                          type={showConfirmPassword ? 'text' : 'password'} 
                          value={formData.confirmPassword} 
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                          placeholder="Confirm your password" 
                          required 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                          type="text" 
                          value={formData.companyName} 
                          onChange={(e) => handleInputChange('companyName', e.target.value)} 
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                          placeholder="Enter company name" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)} 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm" 
                        placeholder="Enter phone number" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">Business Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {businessTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleInputChange('businessType', type.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                            formData.businessType === type.id
                              ? 'border-purple-500 bg-purple-500/20'
                              : 'border-white/20 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{type.icon}</span>
                            <div>
                              <div className="font-semibold text-white">{type.label}</div>
                              <div className="text-sm text-gray-400">{type.description}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Continue to Portal Selection
                  </button>
                </form>
              </div>
            )}

            {step === 'portals' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Select Your Portals & Modules</h2>
                <p className="text-gray-300 text-center mb-8">Choose the portals and modules that fit your business needs. You can add or remove access anytime.</p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Portal Access</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availablePortals.map((portal) => (
                      <div
                        key={portal.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          selectedPortals.includes(portal.id)
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                        onClick={() => handlePortalToggle(portal.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{portal.icon}</span>
                            <div>
                              <div className="font-semibold text-white">{portal.name}</div>
                              <div className="text-sm text-gray-400">${portal.price}/month</div>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedPortals.includes(portal.id)
                              ? 'bg-purple-500 border-purple-500'
                              : 'border-white/40'
                          }`}>
                            {selectedPortals.includes(portal.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{portal.description}</p>
                        <div className="space-y-1">
                          {portal.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="text-purple-400 text-xs">✓</span>
                              <span className="text-xs text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Additional Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableModules.map((module) => (
                      <div
                        key={module.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          selectedPortals.includes(module.id)
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                        onClick={() => handlePortalToggle(module.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{module.icon}</span>
                            <div>
                              <div className="font-semibold text-white">{module.name}</div>
                              <div className="text-sm text-gray-400">${module.price}/month</div>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedPortals.includes(module.id)
                              ? 'bg-purple-500 border-purple-500'
                              : 'border-white/40'
                          }`}>
                            {selectedPortals.includes(module.id) && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{module.description}</p>
                        <div className="space-y-1">
                          {module.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <span className="text-purple-400 text-xs">✓</span>
                              <span className="text-xs text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    onClick={() => setStep('info')} 
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep('review')} 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Review & Continue
                  </button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Review Your Selection</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="glass-card border border-purple-500/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Name:</span>
                        <span className="text-white">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Email:</span>
                        <span className="text-white">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Company:</span>
                        <span className="text-white">{formData.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Business Type:</span>
                        <span className="text-white capitalize">{formData.businessType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card border border-purple-500/20 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Selected Access</h3>
                    <div className="space-y-3">
                      {selectedPortals.map(portalId => {
                        const item = [...availablePortals, ...availableModules].find(p => p.id === portalId);
                        return item ? (
                          <div key={portalId} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{item.icon}</span>
                              <span className="text-white">{item.name}</span>
                            </div>
                            <span className="text-green-400 font-semibold">${item.price}/month</span>
                          </div>
                        ) : null;
                      })}
                      <div className="border-t border-white/20 pt-3 mt-4">
                        <div className="flex items-center justify-between text-lg font-semibold">
                          <span className="text-white">Total Monthly:</span>
                          <span className="text-green-400">${calculateTotalPrice()}/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400">🎉</span>
                    <div>
                      <div className="text-green-400 font-semibold">Flexible Pricing</div>
                      <div className="text-sm text-gray-300">You can modify your portal access anytime. Only pay for what you use!</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button 
                    onClick={() => setStep('portals')} 
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Back to Selection
                  </button>
                  <button 
                    onClick={handleSignup}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account & Start Using'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400">Already have an account? <a href="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
