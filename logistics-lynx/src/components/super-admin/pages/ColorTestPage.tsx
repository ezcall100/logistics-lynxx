import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Checkbox } from '../../ui/checkbox';

const ColorTestPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Super Admin Color Test
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Testing all color components to ensure proper visibility
        </p>
      </div>

      {/* Background Test */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Background Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <p className="text-slate-900 dark:text-slate-100 font-medium">White/Dark</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
              <p className="text-slate-900 dark:text-slate-100 font-medium">Gray/Slate</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-900 dark:text-blue-100 font-medium">Blue Theme</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-900 dark:text-green-100 font-medium">Green Theme</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Colors Test */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-slate-900 dark:text-slate-100 text-lg font-semibold">Primary Text</p>
            <p className="text-slate-600 dark:text-slate-400">Secondary Text</p>
            <p className="text-slate-500 dark:text-slate-500">Muted Text</p>
            <p className="text-blue-600 dark:text-blue-400">Link Text</p>
            <p className="text-green-600 dark:text-green-400">Success Text</p>
            <p className="text-red-600 dark:text-red-400">Error Text</p>
          </div>
        </CardContent>
      </Card>

      {/* Form Elements Test */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Form Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Input Field
              </label>
              <Input 
                placeholder="Type something..."
                className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                Select Dropdown
              </label>
              <Select>
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Choose option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Checkbox id="test-checkbox" />
            <label htmlFor="test-checkbox" className="text-slate-900 dark:text-slate-100">
              Checkbox Label
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Buttons Test */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Primary Button
            </Button>
            <Button variant="outline" className="border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
              Outline Button
            </Button>
            <Button variant="ghost" className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700">
              Ghost Button
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
              Destructive Button
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges Test */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              Success
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              Info
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
              Warning
            </Badge>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
              Error
            </Badge>
            <Badge variant="outline" className="border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
              Outline
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Table Test */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-slate-800">
                <TableHead className="text-slate-900 dark:text-slate-100">Name</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Status</TableHead>
                <TableHead className="text-slate-900 dark:text-slate-100">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-gray-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700">
                <TableCell className="text-slate-900 dark:text-slate-100">John Doe</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-900 dark:text-slate-100">Admin</TableCell>
              </TableRow>
              <TableRow className="hover:bg-gray-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700">
                <TableCell className="text-slate-900 dark:text-slate-100">Jane Smith</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    Pending
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-900 dark:text-slate-100">User</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Status Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-900 dark:text-slate-100">Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-900 dark:text-slate-100">Away</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-900 dark:text-slate-100">Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-slate-900 dark:text-slate-100">Loading</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorTestPage;
