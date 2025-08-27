import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AvatarMedia = () => {
  const [avatarState, setAvatarState] = useState({
    currentAvatar: '/placeholder-avatar.jpg',
    isUploading: false,
    uploadProgress: 0
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarState(prev => ({ ...prev, isUploading: true, uploadProgress: 0 }));
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setAvatarState(prev => {
        if (prev.uploadProgress >= 100) {
          clearInterval(interval);
          return { ...prev, isUploading: false, uploadProgress: 100 };
        }
        return { ...prev, uploadProgress: prev.uploadProgress + 10 };
      });
    }, 200);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Avatar & Media</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile picture and media uploads
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Current Avatar */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                👤
              </div>
              Current Avatar
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your current profile picture
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src={avatarState.currentAvatar} 
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <p className="text-sm text-gray-600">
                  This image will be displayed across the platform
                </p>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Upload New Avatar */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📤
              </div>
              Upload New Avatar
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Upload a new profile picture
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Choose Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={avatarState.isUploading}
              />
              <p className="text-sm text-gray-600">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
            
            {avatarState.isUploading && (
              <div className="space-y-2">
                <Label>Upload Progress</Label>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${avatarState.uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {avatarState.uploadProgress}% complete
                </p>
              </div>
            )}
          </div>
        </ResponsiveCard>

        {/* Avatar Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              Avatar Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure avatar display preferences
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Avatar in Comments</Label>
                <p className="text-sm text-gray-600">
                  Display your avatar in comment sections
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Avatar in Activity Feed</Label>
                <p className="text-sm text-gray-600">
                  Display your avatar in activity notifications
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </ResponsiveCard>

        {/* Media Gallery */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                🖼️
              </div>
              Media Gallery
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your uploaded media files
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Media {item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <EnhancedButton variant="outline" className="w-full">
                View All Media
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default AvatarMedia;
