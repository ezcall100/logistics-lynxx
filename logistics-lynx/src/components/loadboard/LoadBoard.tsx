
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocation, useNavigate } from 'react-router-dom';
import { PostLoadsTab } from './tabs/PostLoadsTab';
import { BookLoadsTab } from './tabs/BookLoadsTab';
import { FindLoadsTab } from './tabs/FindLoadsTab';
import { SearchLoadsTab } from './tabs/SearchLoadsTab';
import { PostTruckTab } from './tabs/PostTruckTab';
import { MyLoadsTab } from './tabs/MyLoadsTab';
import { TrendingUp, Truck, Search, BookOpen, Plus, Package } from 'lucide-react';

export const LoadBoard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveTab = () => {
    const path = location.pathname;
    console.log('Current path:', path); // Debug log
    
    // Handle exact matches and paths ending with the tab name
    if (path === '/loadboard/post-loads' || path.endsWith('/post-loads')) return 'post-loads';
    if (path === '/loadboard/book-loads' || path.endsWith('/book-loads')) return 'book-loads';
    if (path === '/loadboard/find-loads' || path.endsWith('/find-loads')) return 'find-loads';
    if (path === '/loadboard/search-loads' || path.endsWith('/search-loads')) return 'search-loads';
    if (path === '/loadboard/post-truck' || path.endsWith('/post-truck')) return 'post-truck';
    if (path === '/loadboard/my-loads' || path.endsWith('/my-loads')) return 'my-loads';
    
    // Default to find-loads for base loadboard route
    return 'find-loads';
  };

  const handleTabChange = (value: string) => {
    const newPath = `/loadboard/${value}`;
    console.log('Navigating to:', newPath); // Debug log
    navigate(newPath);
  };

  const activeTab = getActiveTab();
  console.log('Active tab:', activeTab); // Debug log

  // Handle initial navigation for base /loadboard route
  useEffect(() => {
    if (location.pathname === '/loadboard' || location.pathname === '/loadboard/') {
      navigate('/loadboard/find-loads', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="container-responsive space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-responsive-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Autonomous AI Load Board
          </h1>
          <p className="text-responsive-base text-muted-foreground max-w-2xl">
            Intelligent load matching and truck posting powered by advanced AI algorithms
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                2,547 Active Loads
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <Truck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                1,234 Available Trucks
              </span>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 h-14 p-1 bg-muted/50 rounded-xl border border-border/60 overflow-x-auto">
          <TabsTrigger 
            value="post-loads" 
            className="h-12 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-3 w-3" />
              <span className="hidden sm:inline">Post Loads</span>
              <span className="sm:hidden">Post</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="book-loads"
            className="h-12 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-3 w-3" />
              <span className="hidden sm:inline">Book Loads</span>
              <span className="sm:hidden">Book</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="find-loads"
            className="h-12 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3 w-3" />
              <span className="hidden sm:inline">Find Loads</span>
              <span className="sm:hidden">Find</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="search-loads"
            className="h-12 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3 w-3" />
              <span className="hidden sm:inline">Search Loads</span>
              <span className="sm:hidden">Search</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="post-truck"
            className="h-12 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Truck className="h-3 w-3" />
              <span className="hidden sm:inline">Post Truck</span>
              <span className="sm:hidden">Truck</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="my-loads"
            className="h-12 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-md"
          >
            <div className="flex items-center gap-2">
              <Package className="h-3 w-3" />
              <span className="hidden sm:inline">My Loads</span>
              <span className="sm:hidden">Mine</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post-loads" className="space-y-6 animate-scale-in">
          <PostLoadsTab />
        </TabsContent>

        <TabsContent value="book-loads" className="space-y-6 animate-scale-in">
          <BookLoadsTab />
        </TabsContent>

        <TabsContent value="find-loads" className="space-y-6 animate-scale-in">
          <FindLoadsTab />
        </TabsContent>

        <TabsContent value="search-loads" className="space-y-6 animate-scale-in">
          <SearchLoadsTab />
        </TabsContent>

        <TabsContent value="post-truck" className="space-y-6 animate-scale-in">
          <PostTruckTab />
        </TabsContent>

        <TabsContent value="my-loads" className="space-y-6 animate-scale-in">
          <MyLoadsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
