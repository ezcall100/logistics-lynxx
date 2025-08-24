/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form Schemas
export const preTripInspectionSchema = z.object({
  driver_id: z.string(),
  vehicle_id: z.string(),
  inspection_date: z.string(),
  inspectionItems: z.object({
    brakes: z.object({
      condition: z.string(),
      fluid_level: z.string(),
      pedal_response: z.string()
    }),
    tires: z.object({
      tread_depth: z.string(),
      pressure: z.string(),
      condition: z.string()
    }),
    lights: z.object({
      headlights: z.string(),
      taillights: z.string(),
      turn_signals: z.string(),
      brake_lights: z.string()
    }),
    engine: z.object({
      oil_level: z.string(),
      coolant_level: z.string(),
      belts: z.string(),
      hoses: z.string()
    }),
    windshield: z.object({
      condition: z.string(),
      wipers: z.string(),
      washer_fluid: z.string()
    }),
    mirrors: z.object({
      left_mirror: z.string(),
      right_mirror: z.string(),
      rear_mirror: z.string()
    }),
    horn: z.object({
      condition: z.string()
    }),
    seatbelts: z.object({
      driver_belt: z.string(),
      passenger_belt: z.string()
    })
  }),
  overall_condition: z.string(),
  notes: z.string().optional()
});

export const deliveryConfirmationSchema = z.object({
  delivery_id: z.string(),
  driver_id: z.string(),
  customer_signature: z.string(),
  delivery_time: z.string(),
  package_condition: z.string(),
  customer_feedback: z.string().optional(),
  photos: z.array(z.string()).optional()
});

export const incidentReportSchema = z.object({
  incident_id: z.string(),
  driver_id: z.string(),
  vehicle_id: z.string(),
  incident_date: z.string(),
  incident_type: z.string(),
  location: z.string(),
  description: z.string(),
  severity: z.string(),
  injuries: z.string().optional(),
  damage: z.string().optional(),
  witnesses: z.array(z.string()).optional(),
  police_report: z.string().optional()
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
      driver_id: '',
      vehicle_id: '',
      inspection_date: new Date().toISOString().slice(0, 10),
      inspectionItems: {
        brakes: { condition: 'pass', fluid_level: '', pedal_response: '' },
        tires: { tread_depth: '', pressure: '', condition: '' },
        lights: { headlights: 'pass', taillights: 'pass', turn_signals: 'pass', brake_lights: 'pass' },
        engine: { oil_level: '', coolant_level: '', belts: '', hoses: '' },
        windshield: { condition: 'pass', wipers: '', washer_fluid: '' },
        mirrors: { left_mirror: 'pass', right_mirror: 'pass', rear_mirror: 'pass' },
        horn: { condition: 'pass' },
        seatbelts: { driver_belt: 'pass', passenger_belt: 'pass' }
      },
      overall_condition: 'pass',
      notes: ''
    }
  });

  // Delivery Confirmation Form
  const deliveryForm = useForm<DeliveryConfirmationFormData>({
    resolver: zodResolver(deliveryConfirmationSchema),
    defaultValues: {
      delivery_id: '',
      driver_id: '',
      customer_signature: '',
      delivery_time: '',
      package_condition: '',
      customer_feedback: '',
      photos: []
    }
  });

  // Incident Report Form
  const incidentForm = useForm<IncidentReportFormData>({
    resolver: zodResolver(incidentReportSchema),
    defaultValues: {
      incident_id: '',
      driver_id: '',
      vehicle_id: '',
      incident_date: '',
      incident_type: '',
      location: '',
      description: '',
      severity: '',
      injuries: '',
      damage: '',
      witnesses: [],
      police_report: ''
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
        .filter(([_, item]) => (item as any).status === 'fail')
        .map(([key, _]) => key);
      
      if (failedItems.length > 0) {
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
        description: `Delivery for load ${data.delivery_id} has been confirmed. Customer has been notified.`,
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
      if (data.severity === 'critical') {
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
    deliveryForm.setValue('delivery_id', loadId);
    deliveryForm.setValue('customer_signature', 'John Doe');
    deliveryForm.setValue('delivery_time', new Date().toISOString().slice(0, 16));
  }, [deliveryForm]);

  const populateFormWithVehicleData = useCallback((vehicleId: string) => {
    preTripForm.setValue('vehicle_id', vehicleId);
    incidentForm.setValue('vehicle_id', vehicleId);
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