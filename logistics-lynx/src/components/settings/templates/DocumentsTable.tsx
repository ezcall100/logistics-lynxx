/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Trash2, MoreHorizontal, Eye, Download } from 'lucide-react';
import { Document } from './types';
import { getStatusColor } from './utils';

interface DocumentsTableProps {
  documents: Document[];
  onView?: (document: Document) => void;
  onEdit?: (document: Document) => void;
  onDelete?: (documentId: string) => void;
  onDownload?: (document: Document) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ 
  documents, 
  onView, 
  onEdit, 
  onDelete, 
  onDownload 
}) => {
  const handleView = (document: Document) => {
    if (onView) {
      onView(document);
    } else {
      console.log('View document:', document);
    }
  };

  const handleEdit = (document: Document) => {
    if (onEdit) {
      onEdit(document);
    } else {
      console.log('Edit document:', document);
    }
  };

  const handleDelete = (documentId: string) => {
    if (onDelete) {
      onDelete(documentId);
    } else {
      console.log('Delete document:', documentId);
    }
  };

  const handleDownload = (document: Document) => {
    if (onDownload) {
      onDownload(document);
    } else {
      console.log('Download document:', document);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="font-medium">{document.name}</TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell>{document.category}</TableCell>
              <TableCell>{document.uploadedBy}</TableCell>
              <TableCell>{document.uploadedDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(document.status)}>
                  {document.status}
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
                    <DropdownMenuItem onClick={() => handleView(document)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(document)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(document)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(document.id)}
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

export default DocumentsTable;
