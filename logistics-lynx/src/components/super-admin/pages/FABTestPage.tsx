import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

const FABTestPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          FAB Test Page
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          This page tests the Floating Action Button functionality
        </p>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">FAB Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-slate-900 dark:text-slate-100">
              <strong>To test the FAB:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Look for the blue/purple circular button in the bottom-right corner</li>
              <li>Click on it to open the Quick Actions menu</li>
              <li>Test the search functionality</li>
              <li>Test the category filters</li>
              <li>Click on different actions to test them</li>
            </ul>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-900 dark:text-blue-100 font-medium">
              💡 The FAB should be visible in the bottom-right corner of the screen
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Expected FAB Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                ✅ Main Button
              </Badge>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Blue/purple gradient circular button with plus/close icon
              </p>
            </div>
            <div className="space-y-2">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                ✅ Quick Actions Menu
              </Badge>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Expandable menu with search and category filters
              </p>
            </div>
            <div className="space-y-2">
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                ✅ Action Items
              </Badge>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Various action buttons with icons and descriptions
              </p>
            </div>
            <div className="space-y-2">
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                ✅ Dark Mode Support
              </Badge>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Proper colors in both light and dark themes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-slate-900 dark:text-slate-100 font-medium">If the FAB is not visible:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Check if you're on a mobile device (FAB might be hidden)</li>
              <li>Ensure the page is fully loaded</li>
              <li>Check browser console for any JavaScript errors</li>
              <li>Try refreshing the page</li>
              <li>Verify you're in the Super Admin portal</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FABTestPage;
