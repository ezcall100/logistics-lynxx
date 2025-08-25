import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

interface DocumentExpiration {
  documentId: string;
  documentType: string;
  expirationDate: Date;
  daysUntilExpiry: number;
  isExpired: boolean;
  isExpiringSoon: boolean;
  companyName: string;
  documentUrl: string;
}

interface DocumentAlert {
  id: string;
  type: 'expired' | 'expiring_soon' | 'missing';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  documentType: string;
  companyId: string;
  createdAt: Date;
  isRead: boolean;
}

export const useDocumentWatcher = () => {
  const [expiringDocuments, setExpiringDocuments] = useState<DocumentExpiration[]>([]);
  const [documentAlerts, setDocumentAlerts] = useState<DocumentAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!
  );

  const saveDocumentAlerts = useCallback(async (alerts: DocumentAlert[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const alertsToSave = alerts.map(alert => ({
        user_id: user.id,
        alert_type: alert.type,
        message: alert.message,
        severity: alert.severity,
        document_type: alert.documentType,
        company_id: alert.companyId,
        is_read: alert.isRead
      }));

      const { error } = await supabase
        .from('document_alerts')
        .insert(alertsToSave);

      if (error) {
        console.error('Error saving document alerts:', error);
      }
    } catch (error) {
      console.error('Error saving document alerts:', error);
    }
  }, [supabase]);

  const generateDocumentAlerts = useCallback(async (documents: DocumentExpiration[]) => {
    const alerts: DocumentAlert[] = [];

    documents.forEach(doc => {
      let alertType: 'expired' | 'expiring_soon' | 'missing';
      let severity: 'low' | 'medium' | 'high' | 'critical';
      let message: string;

      if (doc.isExpired) {
        alertType = 'expired';
        severity = 'critical';
        message = `${doc.documentType} for ${doc.companyName} has expired on ${doc.expirationDate.toLocaleDateString()}`;
      } else if (doc.isExpiringSoon) {
        alertType = 'expiring_soon';
        severity = doc.daysUntilExpiry <= 7 ? 'high' : 'medium';
        message = `${doc.documentType} for ${doc.companyName} expires in ${doc.daysUntilExpiry} days`;
      } else {
        return; // Skip if not expiring soon
      }

      alerts.push({
        id: `${doc.documentId}_${alertType}`,
        type: alertType,
        message,
        severity,
        documentType: doc.documentType,
        companyId: doc.documentId,
        createdAt: new Date(),
        isRead: false
      });
    });

    setDocumentAlerts(alerts);
    await saveDocumentAlerts(alerts);
  }, [saveDocumentAlerts]);

  const checkDocumentExpiration = useCallback(async (): Promise<DocumentExpiration[]> => {
    setIsLoading(true);
    try {
      // Check insurance certificates expiration
      const { data: insuranceData, error: insuranceError } = await supabase
        .from('insurance_certificates')
        .select(`
          id,
          insurance_type,
          expiration_date,
          certificate_url,
          company_profile_id,
          company_profile!inner(legal_business_name)
        `)
        .eq('status', 'active')
        .lte('expiration_date', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()); // 30 days from now

      if (insuranceError) {
        console.error('Error fetching insurance certificates:', insuranceError);
        return [];
      }

      const expiringDocs: DocumentExpiration[] = insuranceData?.map(doc => {
        const expirationDate = new Date(doc.expiration_date);
        const daysUntilExpiry = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        
        return {
          documentId: doc.id,
          documentType: `Insurance - ${doc.insurance_type.replace('_', ' ')}`,
          expirationDate,
          daysUntilExpiry,
          isExpired: daysUntilExpiry < 0,
          isExpiringSoon: daysUntilExpiry <= 30 && daysUntilExpiry > 0,
          companyName: doc.company_profile?.legal_business_name || 'Unknown Company',
          documentUrl: doc.certificate_url
        };
      }) || [];

      // Check driver license expiration
      const { data: driverData, error: driverError } = await supabase
        .from('driver_documents')
        .select(`
          id,
          driver_license_expiry,
          driver_name,
          company_profile_id,
          company_profile!inner(legal_business_name)
        `)
        .not('driver_license_expiry', 'is', null)
        .lte('driver_license_expiry', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());

      if (driverError) {
        console.error('Error fetching driver documents:', driverError);
      } else {
        const expiringDriverDocs: DocumentExpiration[] = driverData?.map(doc => {
          const expirationDate = new Date(doc.driver_license_expiry);
          const daysUntilExpiry = Math.ceil((expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          
          return {
            documentId: doc.id,
            documentType: `Driver License - ${doc.driver_name}`,
            expirationDate,
            daysUntilExpiry,
            isExpired: daysUntilExpiry < 0,
            isExpiringSoon: daysUntilExpiry <= 30 && daysUntilExpiry > 0,
            companyName: doc.company_profile?.legal_business_name || 'Unknown Company',
            documentUrl: ''
          };
        }) || [];

        expiringDocs.push(...expiringDriverDocs);
      }

      setExpiringDocuments(expiringDocs);
      await generateDocumentAlerts(expiringDocs);
      
      return expiringDocs;
    } catch (error) {
      console.error('Error checking document expiration:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [supabase, generateDocumentAlerts]);





  const markAlertAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('document_alerts')
        .update({ is_read: true })
        .eq('id', alertId);

      if (error) {
        console.error('Error marking alert as read:', error);
        return;
      }

      setDocumentAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, isRead: true } : alert
        )
      );
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const getExpiringDocumentsByCompany = (companyId: string): DocumentExpiration[] => {
    return expiringDocuments.filter(doc => doc.documentId.includes(companyId));
  };

  const getCriticalAlerts = (): DocumentAlert[] => {
    return documentAlerts.filter(alert => 
      alert.severity === 'critical' && !alert.isRead
    );
  };

  const getUnreadAlerts = (): DocumentAlert[] => {
    return documentAlerts.filter(alert => !alert.isRead);
  };

  const clearExpiredAlerts = async () => {
    try {
      const { error } = await supabase
        .from('document_alerts')
        .delete()
        .eq('alert_type', 'expired')
        .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()); // Delete alerts older than 7 days

      if (error) {
        console.error('Error clearing expired alerts:', error);
        return;
      }

      setDocumentAlerts(prev => 
        prev.filter(alert => 
          !(alert.type === 'expired' && 
            alert.createdAt < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        )
      );
    } catch (error) {
      console.error('Error clearing expired alerts:', error);
    }
  };

  const loadDocumentAlerts = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('document_alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading document alerts:', error);
        return;
      }

      const alerts: DocumentAlert[] = data?.map(alert => ({
        id: alert.id,
        type: alert.alert_type,
        message: alert.message,
        severity: alert.severity,
        documentType: alert.document_type,
        companyId: alert.company_id,
        createdAt: new Date(alert.created_at),
        isRead: alert.is_read
      })) || [];

      setDocumentAlerts(alerts);
    } catch (error) {
      console.error('Error loading document alerts:', error);
    }
  }, [supabase]);

  // Auto-check for expiring documents every hour
  useEffect(() => {
    const interval = setInterval(() => {
      checkDocumentExpiration();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [checkDocumentExpiration]);

  // Load existing alerts on mount
  useEffect(() => {
    loadDocumentAlerts();
  }, [loadDocumentAlerts]);

  return {
    expiringDocuments,
    documentAlerts,
    isLoading,
    checkDocumentExpiration,
    markAlertAsRead,
    getExpiringDocumentsByCompany,
    getCriticalAlerts,
    getUnreadAlerts,
    clearExpiredAlerts,
    loadDocumentAlerts
  };
};
