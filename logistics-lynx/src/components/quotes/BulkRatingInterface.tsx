import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Download, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  FileText,
  Trash2,
  Plus,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BulkJob {
  id: string;
  origin: string;
  destination: string;
  equipment_type: string;
  pickup_date: string;
  weight?: number;
  hazmat?: boolean;
  temperature_controlled?: boolean;
  special_requirements?: string[];
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  rate?: number;
  carrier?: string;
}

interface BulkRatingRequest {
  request_id: string;
  accepted: number;
  estimated_completion: string;
  status: 'accepted' | 'rate_limited' | 'unauthorized';
}

const BulkRatingInterface: React.FC = () => {
  const [jobs, setJobs] = useState<BulkJob[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<BulkRatingRequest | null>(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BulkJob[]>([]);
  const { toast } = useToast();

  // Equipment type options
  const equipmentTypes = [
    'Dry Van',
    'Reefer',
    'Flatbed',
    'Power Only',
    'Step Deck',
    'Lowboy',
    'Box Truck',
    'Sprinter Van'
  ];

  // Add a new job
  const addJob = () => {
    const newJob: BulkJob = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      origin: '',
      destination: '',
      equipment_type: 'Dry Van',
      pickup_date: new Date().toISOString().split('T')[0],
      weight: 0,
      hazmat: false,
      temperature_controlled: false,
      special_requirements: [],
      status: 'pending'
    };
    setJobs([...jobs, newJob]);
  };

  // Remove a job
  const removeJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  // Update job field
  const updateJob = (id: string, field: keyof BulkJob, value: any) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, [field]: value } : job
    ));
  };

  // Handle CSV upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const newJobs: BulkJob[] = lines.slice(1)
          .filter(line => line.trim())
          .map((line, index) => {
            const values = line.split(',').map(v => v.trim());
            return {
              id: `csv_${Date.now()}_${index}`,
              origin: values[headers.indexOf('origin')] || '',
              destination: values[headers.indexOf('destination')] || '',
              equipment_type: values[headers.indexOf('equipment_type')] || 'Dry Van',
              pickup_date: values[headers.indexOf('pickup_date')] || new Date().toISOString().split('T')[0],
              weight: parseFloat(values[headers.indexOf('weight')]) || 0,
              hazmat: values[headers.indexOf('hazmat')]?.toLowerCase() === 'true',
              temperature_controlled: values[headers.indexOf('temperature_controlled')]?.toLowerCase() === 'true',
              special_requirements: values[headers.indexOf('special_requirements')]?.split(';') || [],
              status: 'pending'
            };
          });

        setJobs([...jobs, ...newJobs]);
        toast({
          title: "Upload Successful",
          description: `Imported ${newJobs.length} jobs from CSV`,
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "Invalid CSV format. Please check your file.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsText(file);
  };

  // Export results to CSV
  const exportResults = () => {
    if (results.length === 0) return;

    const headers = ['origin', 'destination', 'equipment_type', 'pickup_date', 'rate', 'carrier', 'status'];
    const csvContent = [
      headers.join(','),
      ...results.map(job => [
        job.origin,
        job.destination,
        job.equipment_type,
        job.pickup_date,
        job.rate || '',
        job.carrier || '',
        job.status || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-rating-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Submit bulk rating request
  const submitBulkRating = async () => {
    if (jobs.length === 0) {
      toast({
        title: "No Jobs",
        description: "Please add at least one job to rate",
        variant: "destructive",
      });
      return;
    }

    // Validate jobs
    const invalidJobs = jobs.filter(job => !job.origin || !job.destination);
    if (invalidJobs.length > 0) {
      toast({
        title: "Validation Error",
        description: `${invalidJobs.length} jobs are missing required fields`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate API call to bulk rating endpoint
      const response = await fetch('/api/bulk-rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          company_id: localStorage.getItem('company_id'),
          jobs: jobs.map(job => ({
            origin: job.origin,
            destination: job.destination,
            equipment_type: job.equipment_type,
            pickup_date: job.pickup_date,
            weight: job.weight,
            hazmat: job.hazmat,
            temperature_controlled: job.temperature_controlled,
            special_requirements: job.special_requirements
          })),
          priority: 'normal'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: BulkRatingRequest = await response.json();
      setCurrentRequest(result);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsProcessing(false);
            // Simulate completed results
            setResults(jobs.map(job => ({
              ...job,
              status: 'completed',
              rate: Math.floor(Math.random() * 2000) + 500,
              carrier: ['ABC Trucking', 'XYZ Logistics', 'Fast Freight'][Math.floor(Math.random() * 3)]
            })));
            return 100;
          }
          return prev + 10;
        });
      }, 1000);

      toast({
        title: "Bulk Rating Submitted",
        description: `Processing ${jobs.length} jobs. Estimated completion: ${new Date(result.estimated_completion).toLocaleTimeString()}`,
      });

    } catch (error) {
      console.error('Bulk rating error:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit bulk rating request. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Rating Interface</h1>
          <p className="text-gray-600">Rate multiple shipments efficiently for enterprise workflows</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">{jobs.length} Jobs</Badge>
          <Badge variant="outline">Enterprise</Badge>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Import Jobs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="csv-upload">Upload CSV File</Label>
              <Input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <p className="text-sm text-gray-500 mt-1">
                CSV should include: origin, destination, equipment_type, pickup_date, weight, hazmat, temperature_controlled, special_requirements
              </p>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addJob}
                className="w-full"
                disabled={isUploading}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Job Manually
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      {jobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Jobs ({jobs.length})</span>
              </span>
              <Button 
                onClick={submitBulkRating}
                disabled={isProcessing || jobs.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Submit for Rating
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={job.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Job #{index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeJob(job.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label>Origin</Label>
                      <Input
                        value={job.origin}
                        onChange={(e) => updateJob(job.id, 'origin', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label>Destination</Label>
                      <Input
                        value={job.destination}
                        onChange={(e) => updateJob(job.id, 'destination', e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label>Equipment Type</Label>
                      <select
                        value={job.equipment_type}
                        onChange={(e) => updateJob(job.id, 'equipment_type', e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        {equipmentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Pickup Date</Label>
                      <Input
                        type="date"
                        value={job.pickup_date}
                        onChange={(e) => updateJob(job.id, 'pickup_date', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Weight (lbs)</Label>
                      <Input
                        type="number"
                        value={job.weight || ''}
                        onChange={(e) => updateJob(job.id, 'weight', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`hazmat-${job.id}`}
                          checked={job.hazmat || false}
                          onChange={(e) => updateJob(job.id, 'hazmat', e.target.checked)}
                        />
                        <Label htmlFor={`hazmat-${job.id}`}>Hazmat</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`temp-${job.id}`}
                          checked={job.temperature_controlled || false}
                          onChange={(e) => updateJob(job.id, 'temperature_controlled', e.target.checked)}
                        />
                        <Label htmlFor={`temp-${job.id}`}>Temperature Controlled</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Special Requirements</Label>
                    <Textarea
                      value={job.special_requirements?.join(', ') || ''}
                      onChange={(e) => updateJob(job.id, 'special_requirements', e.target.value.split(',').map(s => s.trim()))}
                      placeholder="Liftgate, Inside delivery, Appointment required..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Processing Bulk Rating</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress: {progress}%</span>
                <span>Estimated completion: {currentRequest?.estimated_completion ? new Date(currentRequest.estimated_completion).toLocaleTimeString() : 'Calculating...'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Rating Results ({results.length})</span>
              </span>
              <Button onClick={exportResults} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((job, index) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Job #{index + 1}: {job.origin} → {job.destination}</h3>
                      <p className="text-sm text-gray-600">{job.equipment_type} • {job.pickup_date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${job.rate?.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{job.carrier}</div>
                      <Badge className="mt-1" variant={job.status === 'completed' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Usage Limits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">1,000</div>
              <div className="text-sm text-gray-600">Jobs per request</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">10,000</div>
              <div className="text-sm text-gray-600">Requests per hour</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">2s</div>
              <div className="text-sm text-gray-600">Avg. processing time</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkRatingInterface;
