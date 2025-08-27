import React, { useState } from 'react';
import { 
  ResponsiveCard,
  EnhancedButton,
  EnhancedInput,
  EnhancedBadge,
  EnhancedProgress,
  EnhancedModal,
  stableStyles
} from '@/components/ui/ResponsiveCard';
import { 
  Search, 
  Filter, 
  Settings, 
  User, 
  Bell, 
  Star,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const CustomUIComponentsDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(65);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
        🎨 Custom UI Components Demo
      </h1>

      {/* Enhanced Cards with Different Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Standard Card */}
        <ResponsiveCard>
          <h3 className="text-lg font-semibold mb-3">Standard Card</h3>
          <p className="text-slate-600 dark:text-slate-400">
            A standard responsive card with hover effects.
          </p>
        </ResponsiveCard>

        {/* Glass Card */}
        <ResponsiveCard glass={true}>
          <h3 className="text-lg font-semibold mb-3">Glass Card</h3>
          <p className="text-slate-600 dark:text-slate-400">
            A glassmorphism card with backdrop blur effects.
          </p>
        </ResponsiveCard>

        {/* Elevated Card */}
        <ResponsiveCard elevated={true}>
          <h3 className="text-lg font-semibold mb-3">Elevated Card</h3>
          <p className="text-slate-600 dark:text-slate-400">
            An elevated card with premium styling.
          </p>
        </ResponsiveCard>

        {/* Premium Card */}
        <ResponsiveCard premium={true}>
          <h3 className="text-lg font-semibold mb-3">Premium Card</h3>
          <p className="text-slate-600 dark:text-slate-400">
            A premium card with enhanced visual effects.
          </p>
        </ResponsiveCard>

        {/* Animated Card */}
        <ResponsiveCard animated={true}>
          <h3 className="text-lg font-semibold mb-3">Animated Card</h3>
          <p className="text-slate-600 dark:text-slate-400">
            A card with subtle animation effects.
          </p>
        </ResponsiveCard>

        {/* Clickable Card */}
        <ResponsiveCard 
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer"
        >
          <h3 className="text-lg font-semibold mb-3">Clickable Card</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Click me to open a modal!
          </p>
        </ResponsiveCard>
      </div>

      {/* Enhanced Buttons */}
      <ResponsiveCard>
        <h3 className="text-lg font-semibold mb-4">Enhanced Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <EnhancedButton variant="primary" icon={<Search />}>
            Primary Button
          </EnhancedButton>
          <EnhancedButton variant="secondary" icon={<Filter />}>
            Secondary Button
          </EnhancedButton>
          <EnhancedButton variant="success" icon={<CheckCircle />}>
            Success Button
          </EnhancedButton>
          <EnhancedButton variant="danger" icon={<AlertCircle />}>
            Danger Button
          </EnhancedButton>
          <EnhancedButton variant="outline" icon={<Settings />}>
            Outline Button
          </EnhancedButton>
          <EnhancedButton variant="ghost" icon={<User />}>
            Ghost Button
          </EnhancedButton>
        </div>
      </ResponsiveCard>

      {/* Enhanced Inputs */}
      <ResponsiveCard>
        <h3 className="text-lg font-semibold mb-4">Enhanced Inputs</h3>
        <div className="space-y-4">
          <EnhancedInput
            placeholder="Enter your name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            icon={<User />}
            premium={true}
          />
          <EnhancedInput
            placeholder="Search something..."
            icon={<Search />}
            success={inputValue.length > 3}
            error={inputValue.length > 0 && inputValue.length <= 3 ? "Too short" : ""}
          />
          <EnhancedInput
            placeholder="Disabled input..."
            disabled={true}
            icon={<Bell />}
          />
        </div>
      </ResponsiveCard>

      {/* Enhanced Badges */}
      <ResponsiveCard>
        <h3 className="text-lg font-semibold mb-4">Enhanced Badges</h3>
        <div className="flex flex-wrap gap-3">
          <EnhancedBadge variant="primary" icon={<Star />}>
            Primary
          </EnhancedBadge>
          <EnhancedBadge variant="success" icon={<CheckCircle />}>
            Success
          </EnhancedBadge>
          <EnhancedBadge variant="warning" icon={<AlertCircle />}>
            Warning
          </EnhancedBadge>
          <EnhancedBadge variant="danger" icon={<AlertCircle />}>
            Danger
          </EnhancedBadge>
          <EnhancedBadge variant="info" icon={<Info />}>
            Info
          </EnhancedBadge>
          <EnhancedBadge variant="neutral" icon={<Settings />}>
            Neutral
          </EnhancedBadge>
        </div>
      </ResponsiveCard>

      {/* Enhanced Progress */}
      <ResponsiveCard>
        <h3 className="text-lg font-semibold mb-4">Enhanced Progress</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Progress: {progress}%
            </label>
            <EnhancedProgress 
              value={progress} 
              variant="primary"
              animated={true}
            />
          </div>
          <div className="flex gap-2">
            <EnhancedButton 
              variant="outline" 
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              -10%
            </EnhancedButton>
            <EnhancedButton 
              variant="outline" 
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              +10%
            </EnhancedButton>
          </div>
        </div>
      </ResponsiveCard>

      {/* Enhanced Modal */}
      <EnhancedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Custom Modal Example"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            This is an example of the Enhanced Modal component with custom styling.
          </p>
          <div className="flex gap-3">
            <EnhancedButton 
              variant="primary" 
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </EnhancedButton>
            <EnhancedButton 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </EnhancedButton>
          </div>
        </div>
      </EnhancedModal>

      {/* Stable Styles Showcase */}
      <ResponsiveCard>
        <h3 className="text-lg font-semibold mb-4">Stable Styles Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${stableStyles.primary.light}`}>
            <h4 className="font-medium mb-2">Primary Light</h4>
            <p className="text-sm text-slate-600">Stable primary color scheme</p>
          </div>
          <div className={`p-4 rounded-lg ${stableStyles.glass.light}`}>
            <h4 className="font-medium mb-2">Glass Effect</h4>
            <p className="text-sm text-slate-600">Glassmorphism styling</p>
          </div>
          <div className={`p-4 rounded-lg ${stableStyles.surface.light}`}>
            <h4 className="font-medium mb-2">Surface</h4>
            <p className="text-sm text-slate-600">Clean surface styling</p>
          </div>
          <div className={`p-4 rounded-lg ${stableStyles.accent.light}`}>
            <h4 className="font-medium mb-2 text-white">Accent</h4>
            <p className="text-sm text-white/80">Accent color scheme</p>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default CustomUIComponentsDemo;
