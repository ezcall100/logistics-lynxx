/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form Schemas
export const preTripInspectionSchema = z.Record<string, unknown>({
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  odometer: z.string().min(1, 'Odometer reading is required'),
  fuelLevel: z.string().min(1, 'Fuel level is required'),
  inspectorName: z.string().min(1, 'Inspector name is required'),
  date: z.date(),
  defectsFound: z.boolean(),
  defectDetails: z.string().optional(),
  inspectionItems: z.Record<string, unknown>({
    brakes: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    tires: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    lights: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    engine: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    windshield: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    mirrors: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    horn: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    }),
    seatbelts: z.Record<string, unknown>({
      status: z.enum(['pass', 'attention', 'fail']),
      notes: z.string().optional()
    })
  })
});

export const deliveryConfirmationSchema = z.Record<string, unknown>({
  loadId: z.string().min(1, 'Load ID is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  actualArrivalTime: z.string().min(1, 'Arrival time is required'),
  actualDeliveryTime: z.string().min(1, 'Delivery time is required'),
  recipientName: z.string().min(1, 'Recipient name is required'),
  recipientTitle: z.string().optional(),
  recipientPhone: z.string().optional(),
  cargoCondition: z.string().min(1, 'Cargo condition is required'),
  packagesDelivered: z.string().min(1, 'Packages delivered count is required'),
  temperatureRecorded: z.string().optional(),
  damageReported: z.boolean(),
  damageDescription: z.string().optional(),
  customerComments: z.string().optional(),
  driverNotes: z.string().optional(),
  rating: z.number().min(1).max(5)
});

export const incidentReportSchema = z.Record<string, unknown>({
  incidentType: z.string().min(1, 'Incident type is required'),
  severity: z.string().min(1, 'Severity level is required'),
  dateTime: z.string().min(1, 'Date and time is required'),
  location: z.string().min(1, 'Location is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().optional(),
  weatherConditions: z.string().optional(),
  roadConditions: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  immediateActions: z.string().optional(),
  injuriesReported: z.boolean(),
  injuryDetails: z.string().optional(),
  propertyDamage: z.boolean(),
  damageDetails: z.string().optional(),
  estimatedDamage: z.string().optional(),
  otherVehiclesInvolved: z.boolean(),
  otherVehicleDetails: z.string().optional(),
  witnessPresent: z.boolean(),
  witnessInfo: z.string().optional(),
  policeReportFiled: z.boolean(),
  policeReportNumber: z.string().optional(),
  driverName: z.string().min(1, 'Driver name is required'),
  driverLicense: z.string().min(1, 'Driver license is required'),
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  loadId: z.string().optional()
});

export type PreTripInspectionFormData = z.infer<typeof preTripInspectionSchema>;
export type DeliveryConfirmationFormData = z.infer<typeof deliveryConfirmationSchema>;
export type IncidentReportFormData = z.infer<typeof incidentReportSchema>;

export const useDriverForms = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Pre-trip Inspection Form
  const preTripForm = useForm<PreTripInspectionFormData>({
    resolver: zodResolver(preTripInspectionSchema),
    defaultValues: {
      vehicleId: '',
      odometer: '',
      fuelLevel: '',
      inspectorName: '',
      date: new Date(),
      defectsFound: false,
      defectDetails: '',
      inspectionItems: {
        brakes: { status: 'pass', notes: '' },
        tires: { status: 'pass', notes: '' },
        lights: { status: 'pass', notes: '' },
        engine: { status: 'pass', notes: '' },
        windshield: { status: 'pass', notes: '' },
        mirrors: { status: 'pass', notes: '' },
        horn: { status: 'pass', notes: '' },
        seatbelts: { status: 'pass', notes: '' }
      }
    }
  });

  // Delivery Confirmation Form
  const deliveryForm = useForm<DeliveryConfirmationFormData>({
    resolver: zodResolver(deliveryConfirmationSchema),
    defaultValues: {
      loadId: '',
      customerName: '',
      deliveryAddress: '',
      actualArrivalTime: '',
      actualDeliveryTime: '',
      recipientName: '',
      recipientTitle: '',
      recipientPhone: '',
      cargoCondition: '',
      packagesDelivered: '',
      temperatureRecorded: '',
      damageReported: false,
      damageDescription: '',
      customerComments: '',
      driverNotes: '',
      rating: 5
    }
  });

  // Incident Report Form
  const incidentForm = useForm<IncidentReportFormData>({
    resolver: zodResolver(incidentReportSchema),
    defaultValues: {
      incidentType: '',
      severity: '',
      dateTime: '',
      location: '',
      city: '',
      state: '',
      zipCode: '',
      weatherConditions: '',
      roadConditions: '',
      description: '',
      immediateActions: '',
      injuriesReported: false,
      injuryDetails: '',
      propertyDamage: false,
      damageDetails: '',
      estimatedDamage: '',
      otherVehiclesInvolved: false,
      otherVehicleDetails: '',
      witnessPresent: false,
      witnessInfo: '',
      policeReportFiled: false,
      policeReportNumber: '',
      driverName: '',
      driverLicense: '',
      vehicleId: '',
      loadId: ''
    }
  });

  // Form Submission Handlers
  const submitPreTripInspection = useCallback(async (data: PreTripInspectionFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting pre-trip inspection:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if unknown inspection items failed
      const failedItems = Object.entries(data.inspectionItems)
        .filter(([_, item]) => item.status === 'fail')
        .map(([key, _]) => key);
      
      if (failedItems.length > 0 || data.defectsFound) {
        toast({
          title: "Inspection completed with issues",
          description: `Vehicle cannot be operated until defects are resolved. Failed items: ${failedItems.join(', ')}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: "Pre-trip inspection completed",
          description: "Vehicle inspection passed successfully. Ready for operation.",
        });
      }
      
      preTripForm.reset();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting pre-trip inspection:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit inspection. Please try again.',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  }, [preTripForm, toast]);

  const submitDeliveryConfirmation = useCallback(async (data: DeliveryConfirmationFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting delivery confirmation:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Delivery confirmed",
        description: `Delivery for load ${data.loadId} has been confirmed. Customer has been notified.`,
      });
      
      deliveryForm.reset();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting delivery confirmation:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit delivery confirmation. Please try again.',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  }, [deliveryForm, toast]);

  const submitIncidentReport = useCallback(async (data: IncidentReportFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting incident report:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle critical incidents
      if (data.severity === 'critical' || data.injuriesReported) {
        toast({
          title: "Critical incident reported",
          description: "Emergency protocols activated. Safety management and dispatch have been notified immediately.",
          variant: 'destructive',
        });
      } else {
        toast({
          title: "Incident report submitted",
          description: "Report has been submitted and relevant parties have been notified.",
        });
      }
      
      incidentForm.reset();
      return { success: true, data };
    } catch (error) {
      console.error('Error submitting incident report:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit incident report. Please try again.',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  }, [incidentForm, toast]);

  // Utility functions
  const populateFormWithLoadData = useCallback((loadId: string) => {
    // Sample load data population
    deliveryForm.setValue('loadId', loadId);
    deliveryForm.setValue('customerName', 'Walmart Distribution Center');
    deliveryForm.setValue('deliveryAddress', '1234 Commerce Dr, Detroit, MI 48201');
  }, [deliveryForm]);

  const populateFormWithVehicleData = useCallback((vehicleId: string) => {
    preTripForm.setValue('vehicleId', vehicleId);
    incidentForm.setValue('vehicleId', vehicleId);
  }, [preTripForm, incidentForm]);

  const getCurrentDateTime = useCallback(() => {
    return new Date().toISOString().slice(0, 16);
  }, []);

  return {
    // Forms
    preTripForm,
    deliveryForm,
    incidentForm,
    
    // Submission handlers
    submitPreTripInspection,
    submitDeliveryConfirmation,
    submitIncidentReport,
    
    // Utilities
    populateFormWithLoadData,
    populateFormWithVehicleData,
    getCurrentDateTime,
    
    // State
    isSubmitting,
  };
};