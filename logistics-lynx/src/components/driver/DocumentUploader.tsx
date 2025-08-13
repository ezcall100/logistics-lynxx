import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Camera,
  Upload,
  FileText,
  Trash2,
  Eye,
  Download,
  ImageIcon,
  FileIcon,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  size?: string;
}

interface DocumentUploaderProps {
  legId: string;
  legType: 'hook' | 'pickup' | 'drop' | 'delivery' | 'empty_return';
  uploadedDocuments?: UploadedDocument[];
  onDocumentUpload: (legId: string, document: UploadedDocument) => void;
  onDocumentDelete: (legId: string, documentId: string) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  legId,
  legType,
  uploadedDocuments = [],
  onDocumentUpload,
  onDocumentDelete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null, source: 'camera' | 'file') => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newDocument: UploadedDocument = {
          id: `doc-${Date.now()}-${i}`,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString(),
          size: `${(file.size / 1024).toFixed(1)} KB`
        };

        onDocumentUpload(legId, newDocument);
      }

      toast({
        title: "Documents Uploaded",
        description: `${files.length} document(s) uploaded successfully`
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (documentId: string) => {
    onDocumentDelete(legId, documentId);
    toast({
      title: "Document Deleted",
      description: "Document has been removed successfully"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return ImageIcon;
    }
    return FileIcon;
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-emerald-800">
          <Camera className="h-5 w-5 text-emerald-600" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            onClick={handleCameraCapture}
            disabled={isUploading}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
          >
            <Camera className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Take Photo'}
          </Button>
          
          <Button
            onClick={handleFileSelect}
            disabled={isUploading}
            variant="outline"
            className="border-emerald-300 hover:bg-emerald-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Select Files'}
          </Button>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files, 'camera')}
        />
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files, 'file')}
        />

        {/* Uploaded Documents */}
        {uploadedDocuments.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <h4 className="font-semibold text-emerald-800 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Uploaded Documents ({uploadedDocuments.length})
              </h4>
              
              <div className="space-y-2">
                {uploadedDocuments.map((doc) => {
                  const FileIcon = getFileIcon(doc.type);
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <FileIcon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-slate-800 truncate">
                            {doc.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {doc.size}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock className="h-3 w-3" />
                              {formatDate(doc.uploadedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(doc.url, '_blank')}
                          className="h-8 w-8 p-0 hover:bg-emerald-100"
                        >
                          <Eye className="h-4 w-4 text-emerald-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(doc.id)}
                          className="h-8 w-8 p-0 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {uploadedDocuments.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm">No documents uploaded yet</p>
            <p className="text-xs text-slate-400">Use the buttons above to add documents</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};