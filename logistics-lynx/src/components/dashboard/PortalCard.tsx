import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PortalData, QuickAction } from '../../data/dashboard/portals';

export interface PortalCardProps {
  portal: PortalData;
  onNavigate?: (path: string) => void;
  onQuickAction?: (action: string, portalId: string) => void;
  className?: string;
}

const getStatusColor = (status: 'online' | 'offline' | 'maintenance') => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'offline':
      return 'bg-red-500';
    case 'maintenance':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusText = (status: 'online' | 'offline' | 'maintenance') => {
  switch (status) {
    case 'online':
      return 'Online';
    case 'offline':
      return 'Offline';
    case 'maintenance':
      return 'Maintenance';
    default:
      return 'Unknown';
  }
};

const getColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
    green: 'bg-green-50 border-green-200 hover:bg-green-100',
    purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
    red: 'bg-red-50 border-red-200 hover:bg-red-100',
    emerald: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
    teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
    indigo: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
    pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
    amber: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
  };

  return colorMap[color] || 'bg-gray-50 border-gray-200 hover:bg-gray-100';
};

export const PortalCard: React.FC<PortalCardProps> = ({
  portal,
  onNavigate,
  onQuickAction,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate(portal.path);
    }
  };

  const handleQuickAction = async (action: QuickAction) => {
    if (onQuickAction) {
      setIsLoading(true);
      try {
        await onQuickAction(action.action, portal.id);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <TooltipProvider>
      <Card 
        className={cn(
          'transition-all duration-200 hover:shadow-md border-2',
          getColorClasses(portal.color),
          className
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl" role="img" aria-label={`${portal.name} icon`}>
                {portal.icon}
              </span>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {portal.name}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {portal.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className={cn('w-2 h-2 rounded-full', getStatusColor(portal.status))} />
                <span className="text-xs text-gray-500">
                  {getStatusText(portal.status)}
                </span>
              </div>
              {portal.quickActions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={isLoading}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Quick actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {portal.quickActions.map((action) => (
                      <DropdownMenuItem
                        key={action.id}
                        onClick={() => handleQuickAction(action)}
                        disabled={isLoading}
                        className="cursor-pointer"
                      >
                        <span className="mr-2" role="img" aria-label={action.label}>
                          {action.icon}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-medium">{action.label}</span>
                          <span className="text-xs text-gray-500">
                            {action.description}
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Portal Metrics */}
            {portal.metrics && (
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {portal.metrics.activeUsers || 0}
                  </div>
                  <div className="text-gray-500">Active</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {portal.metrics.performance || 'N/A'}
                  </div>
                  <div className="text-gray-500">Performance</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {portal.metrics.lastActivity || 'N/A'}
                  </div>
                  <div className="text-gray-500">Last Activity</div>
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleNavigate}
                  disabled={portal.status !== 'online' || isLoading}
                  className="w-full"
                  variant="default"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Portal
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {portal.status === 'online' 
                    ? `Open ${portal.name}` 
                    : `${portal.name} is currently ${portal.status}`
                  }
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className={cn(
                  'text-xs',
                  portal.status === 'online' && 'bg-green-100 text-green-800',
                  portal.status === 'offline' && 'bg-red-100 text-red-800',
                  portal.status === 'maintenance' && 'bg-yellow-100 text-yellow-800'
                )}
              >
                {getStatusText(portal.status)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
