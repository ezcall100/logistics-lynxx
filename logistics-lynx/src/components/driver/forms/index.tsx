import React from 'react';
import { PreTripInspectionForm } from './PreTripInspectionForm';
import { DeliveryConfirmationForm } from './DeliveryConfirmationForm';
import { IncidentReportForm } from './IncidentReportForm';

// Export all forms for easy access
export {
  PreTripInspectionForm,
  DeliveryConfirmationForm,
  IncidentReportForm
};

// Combined component for form routing/selection
export interface DriverFormProps {
  formType: 'inspection' | 'delivery' | 'incident';
}

export const DriverFormContainer: React.FC<DriverFormProps> = ({ formType }) => {
  switch (formType) {
    case 'inspection':
      return <PreTripInspectionForm />;
    case 'delivery':
      return <DeliveryConfirmationForm />;
    case 'incident':
      return <IncidentReportForm />;
    default:
      return <PreTripInspectionForm />;
  }
};