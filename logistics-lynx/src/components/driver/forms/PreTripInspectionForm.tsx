/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CalendarIcon, CheckCircle, AlertTriangle, Clock, Camera, Upload, MapPin, Truck, Fuel, Package, Timer, Phone, MessageCircle, Star, FileText, Save, Send, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useDriverForms } from '@/hooks/driver/useDriverForms';
import { useDriverActions } from '@/hooks/driver/useDriverActions';

export const PreTripInspectionForm: React.FC = () => {
  const { preTripForm, submitPreTripInspection, isSubmitting, populateFormWithVehicleData, getCurrentDateTime } = useDriverForms();
  const { takePhoto, isProcessing } = useDriverActions();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const inspectionItems = [
    { key: 'brakes', label: 'Brake System', icon: AlertTriangle },
    { key: 'tires', label: 'Tires & Wheels', icon: Truck },
    { key: 'lights', label: 'Lighting System', icon: CheckCircle },
    { key: 'engine', label: 'Engine & Fluids', icon: Fuel },
    { key: 'windshield', label: 'Windshield & Glass', icon: Eye },
    { key: 'mirrors', label: 'Mirrors', icon: Eye },
    { key: 'horn', label: 'Horn & Signals', icon: MessageCircle },
    { key: 'seatbelts', label: 'Safety Equipment', icon: CheckCircle }
  ];

  const handleSubmit = async (data: unknown) => {
    const result = await submitPreTripInspection(data);
    if (result.success) {
      setCurrentStep(1);
    }
  };

  const handlePhotoCapture = async () => {
    await takePhoto({
      type: 'photo',
      documentType: 'pre-trip-inspection',
      entityId: preTripForm.getValues('vehicleId')
    });
  };

  const getStepProgress = () => (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Form Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Pre-Trip Inspection
              </CardTitle>
              <CardDescription className="text-lg">
                Complete vehicle safety inspection before departure
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-2">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <Progress value={getStepProgress()} className="h-2 mt-4" />
        </CardHeader>
      </Card>

      <Form {...preTripForm}>
        <form onSubmit={preTripForm.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Step 1: Vehicle Information */}
          {currentStep === 1 && (
            <Card className="glass-subtle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <span>Vehicle Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={preTripForm.control}
                    name="vehicleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle ID / Unit Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter vehicle ID"
                            className="h-12 text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={preTripForm.control}
                    name="odometer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Odometer Reading</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Miles"
                            className="h-12 text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preTripForm.control}
                    name="fuelLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Level (%)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 text-lg">
                              <SelectValue placeholder="Select fuel level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="100">100% - Full</SelectItem>
                            <SelectItem value="75">75% - 3/4 Tank</SelectItem>
                            <SelectItem value="50">50% - Half Tank</SelectItem>
                            <SelectItem value="25">25% - 1/4 Tank</SelectItem>
                            <SelectItem value="low">Below 25% - Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preTripForm.control}
                    name="inspectorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inspector Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className="h-12 text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={preTripForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Inspection Date & Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn("w-full h-12 text-lg justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP p") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Safety Inspection Items */}
          {currentStep === 2 && (
            <Card className="glass-subtle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Safety Inspection Items</span>
                </CardTitle>
                <CardDescription>
                  Inspect each component and mark as Pass, Needs Attention, or Fail
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {inspectionItems.map((item) => (
                    <Card key={item.key} className="border-2 hover:border-primary/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <item.icon className="h-6 w-6 text-primary" />
                          <h3 className="font-semibold text-lg">{item.label}</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <FormField
                            control={preTripForm.control}
                            name={`inspectionItems.${item.key}.status` as unknown}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="pass" id={`${item.key}-pass`} />
                                      <Label htmlFor={`${item.key}-pass`} className="text-green-600 font-medium">Pass</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="attention" id={`${item.key}-attention`} />
                                      <Label htmlFor={`${item.key}-attention`} className="text-yellow-600 font-medium">Needs Attention</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="fail" id={`${item.key}-fail`} />
                                      <Label htmlFor={`${item.key}-fail`} className="text-red-600 font-medium">Fail</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={preTripForm.control}
                            name={`inspectionItems.${item.key}.notes` as unknown}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="Notes (if unknown issues found)"
                                    className="min-h-20"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Defects & Documentation */}
          {currentStep === 3 && (
            <Card className="glass-subtle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-orange-500" />
                  <span>Defects & Documentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={preTripForm.control}
                  name="defectsFound"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-lg font-medium">
                          Defects or safety concerns identified
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {preTripForm.watch('defectsFound') && (
                  <div className="space-y-4 p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50">
                    <FormField
                      control={preTripForm.control}
                      name="defectDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium text-yellow-800">
                            Describe defects in detail
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Provide detailed description of unknown defects, safety concerns, or maintenance issues..."
                              className="min-h-32 border-yellow-300"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <span className="font-semibold text-red-700">Safety Notice</span>
                      </div>
                      <p className="text-red-600">
                        Vehicle must not be operated until defects are resolved and re-inspected.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <Label className="text-lg font-medium">Photo Documentation</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={handlePhotoCapture}
                  >
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-600">Take inspection photos</p>
                    <p className="text-gray-500">Click to capture or upload photos</p>
                    <p className="text-sm text-gray-400 mt-2">Vehicle, defects, and documentation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <Card className="glass-subtle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  <span>Review & Submit</span>
                </CardTitle>
                <CardDescription>
                  Review your inspection details before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Vehicle Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Vehicle ID:</span> {preTripForm.getValues('vehicleId')}</p>
                      <p><span className="font-medium">Odometer:</span> {preTripForm.getValues('odometer')} miles</p>
                      <p><span className="font-medium">Fuel Level:</span> {preTripForm.getValues('fuelLevel')}%</p>
                      <p><span className="font-medium">Inspector:</span> {preTripForm.getValues('inspectorName')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Inspection Summary</h3>
                    <div className="space-y-2">
                      {inspectionItems.map((item) => {
                        const inspectionData = preTripForm.getValues('inspectionItems') as unknown;
                        const status = inspectionData?.[item.key]?.status || '';
                        const getStatusColor = (status: string) => {
                          switch(status) {
                            case 'pass': return 'text-green-600';
                            case 'attention': return 'text-yellow-600';
                            case 'fail': return 'text-red-600';
                            default: return 'text-gray-400';
                          }
                        };
                        
                        return (
                          <div key={item.key} className="flex justify-between items-center">
                            <span className="text-sm">{item.label}</span>
                            <Badge className={cn("text-xs", getStatusColor(status))}>
                              {status || 'Not Checked'}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {preTripForm.getValues('defectsFound') && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Defects Reported</h4>
                    <p className="text-yellow-700">{preTripForm.getValues('defectDetails')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1 || isSubmitting}
              className="h-12 px-8"
            >
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                  disabled={isSubmitting}
                  className="h-12 px-8"
                >
                  Next Step
                </Button>
              ) : (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-12 px-8"
                    disabled={isSubmitting}
                    onClick={() => {
                      // Save draft functionality
                      console.log('Saving draft:', preTripForm.getValues());
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-12 px-8 bg-green-600 hover:bg-green-700"
                    disabled={isSubmitting || isProcessing}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Inspection'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};