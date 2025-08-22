/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Trash2, MoreHorizontal, Eye, Copy } from 'lucide-react';
import { Template } from './types';
import { getStatusColor } from './utils';

interface TemplatesTableProps {
  templates: Template[];
  onPreview?: (template: Template) => void;
  onEdit?: (template: Template) => void;
  onDuplicate?: (template: Template) => void;
  onDelete?: (templateId: string) => void;
}

const TemplatesTable: React.FC<TemplatesTableProps> = ({ 
  templates, 
  onPreview, 
  onEdit, 
  onDuplicate, 
  onDelete 
}) => {
  const handlePreview = (template: Template) => {
    if (onPreview) {
      onPreview(template);
    } else {
      console.log('Preview template:', template);
    }
  };

  const handleEdit = (template: Template) => {
    if (onEdit) {
      onEdit(template);
    } else {
      console.log('Edit template:', template);
    }
  };

  const handleDuplicate = (template: Template) => {
    if (onDuplicate) {
      onDuplicate(template);
    } else {
      console.log('Duplicate template:', template);
    }
  };

  const handleDelete = (templateId: string) => {
    if (onDelete) {
      onDelete(templateId);
    } else {
      console.log('Delete template:', templateId);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">{template.name}</TableCell>
              <TableCell>{template.type}</TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>{template.lastModified}</TableCell>
              <TableCell>{template.usage}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(template.status)}>
                  {template.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePreview(template)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(template)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(template)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(template.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TemplatesTable;
