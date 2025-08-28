import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
const FABCustomization = () => {
  const [customization, setCustomization] = useState({
    theme: 'blue',
    position: 'bottom-right',
    size: 'medium',
    animation: 'bounce'
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Customization</h1>
          <p className="text-gray-600 mt-2">
            Customize the appearance and behavior of your floating action buttons
          </p>
        </div>
        <Button>Save Change
              s</Button>
      </div>

      <div className="grid gap-6">
        {/* Theme Customization */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🎨
              </div>
              Theme & Colors
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Choose your preferred color scheme and theme
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['blue', 'green', 'purple', 'orange', 'red', 'gray', 'pink', 'yellow'].map((color) => (
                <div key={color} className={`p-4 border rounded-lg cursor-pointer ${
                  customization.theme === color ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className={`w-8 h-8 rounded-full bg-${color}-500 mx-auto mb-2`}></div>
                  <p className="text-sm font-medium text-center capitalize">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Position Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📍
              </div>
              Position Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure where the FAB appears on the screen
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { pos: 'top-left', icon: '↖️' },
                { pos: 'top-right', icon: '↗️' },
                { pos: 'bottom-left', icon: '↙️' },
                { pos: 'bottom-right', icon: '↘️' }
              ].map(({ pos, icon }) => (
                <div key={pos} className={`p-4 border rounded-lg cursor-pointer ${
                  customization.position === pos ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="text-2xl text-center mb-2">{icon}</div>
                  <p className="text-sm font-medium text-center capitalize">{pos.replace('-', ' ')}</p>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Size & Animation */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              Size & Animation
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Adjust the size and animation effects
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Size Options</h4>
                <div className="space-y-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <div key={size} className={`p-3 border rounded-lg cursor-pointer ${
                      customization.size === size ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`rounded-full bg-blue-500 ${
                          size === 'small' ? 'w-6 h-6' : 
                          size === 'medium' ? 'w-8 h-8' : 'w-10 h-10'
                        }`}></div>
                        <span className="capitalize">{size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Animation Effects</h4>
                <div className="space-y-2">
                  {['none', 'bounce', 'pulse', 'fade'].map((anim) => (
                    <div key={anim} className={`p-3 border rounded-lg cursor-pointer ${
                      customization.animation === anim ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}>
                      <span className="capitalize">{anim}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Preview */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                👁️
              </div>
              Live Preview
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              See how your FAB will look with current settings
            </p>
          </div>
          <div>
            <div className="relative h-64 border rounded-lg bg-gray-50">
              <div className={`absolute ${customization.position === 'top-left' ? 'top-4 left-4' :
                customization.position === 'top-right' ? 'top-4 right-4' :
                customization.position === 'bottom-left' ? 'bottom-4 left-4' : 'bottom-4 right-4'
              }`}>
                <div className={`rounded-full bg-${customization.theme}-500 flex items-center justify-center text-white ${
                  customization.size === 'small' ? 'w-12 h-12' :
                  customization.size === 'medium' ? 'w-16 h-16' : 'w-20 h-20'
                }`}>
                  <span className="text-xl">+</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Preview Area</p>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default FABCustomization;
