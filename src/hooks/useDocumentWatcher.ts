// Document Watcher Hook
// Phase 7.3: Carrier & Broker Risk Management Onboarding
// Monitors document expiration and triggers alerts

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface ExpiredDocument {
  id: string;
  documentType: string;
  documentName: string;
  expirationDate: Date;
  daysUntilExpiry: number;
  userId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isNotified: boolean;
}

interface DocumentAlert {
  id: string;
  type: 'expiration_warning' | 'expiration_critical' | 'document_missing';
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  isRead: boolean;
  actionRequired: boolean;
}

export const useDocumentWatcher = () => {
  const { user } = useAuth();
  const [expiredDocuments, setExpiredDocuments] = useState<ExpiredDocument[]>([]);
  const [documentAlerts, setDocumentAlerts] = useState<DocumentAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for expired documents every hour
  useEffect(() => {
    if (user) {
      checkDocumentExpiry();
      
      // Set up interval for periodic checks
      const interval = setInterval(() => {
        checkDocumentExpiry();
      }, 60 * 60 * 1000); // 1 hour

      return () => clearInterval(interval);
    }
  }, [user]);

  const checkDocumentExpiry = async (documents?: any[]) => {
    try {
      setIsLoading(true);
      setError(null);

      const docsToCheck = documents || await loadUserDocuments();
      const expired: ExpiredDocument[] = [];
      const alerts: DocumentAlert[] = [];

      docsToCheck.forEach((doc: any) => {
        if (doc.expirationDate) {
          const expiryDate = new Date(doc.expirationDate);
          const now = new Date();
          const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

          if (daysUntilExpiry <= 0) {
            // Document is expired
            expired.push({
              id: doc.id,
              documentType: doc.documentType || 'unknown',
              documentName: doc.documentName || doc.policyNumber || 'Unknown Document',
              expirationDate: expiryDate,
              daysUntilExpiry,
              userId: user?.id || '',
              priority: 'urgent',
              isNotified: false
            });

            alerts.push({
              id: `alert_${doc.id}_expired`,
              type: 'expiration_critical',
              message: `${doc.documentName || 'Document'} has expired on ${expiryDate.toLocaleDateString()}`,
              priority: 'urgent',
              createdAt: new Date(),
              isRead: false,
              actionRequired: true
            });
          } else if (daysUntilExpiry <= 7) {
            // Document expires within 7 days
            expired.push({
              id: doc.id,
              documentType: doc.documentType || 'unknown',
              documentName: doc.documentName || doc.policyNumber || 'Unknown Document',
              expirationDate: expiryDate,
              daysUntilExpiry,
              userId: user?.id || '',
              priority: 'high',
              isNotified: false
            });

            alerts.push({
              id: `alert_${doc.id}_expiring`,
              type: 'expiration_warning',
              message: `${doc.documentName || 'Document'} expires in ${daysUntilExpiry} days`,
              priority: 'high',
              createdAt: new Date(),
              isRead: false,
              actionRequired: true
            });
          } else if (daysUntilExpiry <= 30) {
            // Document expires within 30 days
            alerts.push({
              id: `alert_${doc.id}_warning`,
              type: 'expiration_warning',
              message: `${doc.documentName || 'Document'} expires in ${daysUntilExpiry} days`,
              priority: 'medium',
              createdAt: new Date(),
              isRead: false,
              actionRequired: false
            });
          }
        }
      });

      setExpiredDocuments(expired);
      setDocumentAlerts(prev => [...prev, ...alerts]);

      // Send notifications for urgent alerts
      const urgentAlerts = alerts.filter(alert => alert.priority === 'urgent');
      if (urgentAlerts.length > 0) {
        await sendNotifications(urgentAlerts);
      }

      // Save to localStorage (in production, this would be saved to database)
      localStorage.setItem(`expired_documents_${user?.id}`, JSON.stringify(expired));
      localStorage.setItem(`document_alerts_${user?.id}`, JSON.stringify([...documentAlerts, ...alerts]));

    } catch (error) {
      console.error('Error checking document expiry:', error);
      setError('Failed to check document expiry');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserDocuments = async (): Promise<any[]> => {
    try {
      // This would load from your database
      // For now, we'll simulate loading from localStorage
      const savedDocuments = localStorage.getItem(`user_documents_${user?.id}`);
      if (savedDocuments) {
        return JSON.parse(savedDocuments);
      }

      // Return empty array if no documents found
      return [];

    } catch (error) {
      console.error('Error loading user documents:', error);
      return [];
    }
  };

  const sendNotifications = async (alerts: DocumentAlert[]) => {
    try {
      // This would send actual notifications (email, SMS, push, etc.)
      alerts.forEach(alert => {
        console.log('Sending notification:', alert.message);
        
        // Example notification methods:
        // sendEmailNotification(alert);
        // sendSMSNotification(alert);
        // sendPushNotification(alert);
        // createSlackAlert(alert);
      });

      // Mark alerts as notified
      setExpiredDocuments(prev => 
        prev.map(doc => ({
          ...doc,
          isNotified: true
        }))
      );

    } catch (error) {
      console.error('Error sending notifications:', error);
    }
  };

  const markAlertAsRead = async (alertId: string) => {
    try {
      setDocumentAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, isRead: true }
            : alert
        )
      );

      // Save to localStorage
      localStorage.setItem(`document_alerts_${user?.id}`, JSON.stringify(documentAlerts));

    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const dismissAlert = async (alertId: string) => {
    try {
      setDocumentAlerts(prev => 
        prev.filter(alert => alert.id !== alertId)
      );

      // Save to localStorage
      localStorage.setItem(`document_alerts_${user?.id}`, JSON.stringify(documentAlerts));

    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const getExpiringDocuments = (daysThreshold: number = 30) => {
    return expiredDocuments.filter(doc => 
      doc.daysUntilExpiry > 0 && doc.daysUntilExpiry <= daysThreshold
    );
  };

  const getExpiredDocuments = () => {
    return expiredDocuments.filter(doc => doc.daysUntilExpiry <= 0);
  };

  const getDocumentAlertsByPriority = (priority: 'low' | 'medium' | 'high' | 'urgent') => {
    return documentAlerts.filter(alert => alert.priority === priority);
  };

  const getUnreadAlerts = () => {
    return documentAlerts.filter(alert => !alert.isRead);
  };

  const getActionRequiredAlerts = () => {
    return documentAlerts.filter(alert => alert.actionRequired);
  };

  const addDocument = async (document: any) => {
    try {
      const currentDocuments = await loadUserDocuments();
      const updatedDocuments = [...currentDocuments, document];
      
      // Save to localStorage
      localStorage.setItem(`user_documents_${user?.id}`, JSON.stringify(updatedDocuments));
      
      // Check expiry for the new document
      await checkDocumentExpiry([document]);

    } catch (error) {
      console.error('Error adding document:', error);
      setError('Failed to add document');
    }
  };

  const updateDocument = async (documentId: string, updates: any) => {
    try {
      const currentDocuments = await loadUserDocuments();
      const updatedDocuments = currentDocuments.map(doc => 
        doc.id === documentId ? { ...doc, ...updates } : doc
      );
      
      // Save to localStorage
      localStorage.setItem(`user_documents_${user?.id}`, JSON.stringify(updatedDocuments));
      
      // Recheck expiry
      await checkDocumentExpiry();

    } catch (error) {
      console.error('Error updating document:', error);
      setError('Failed to update document');
    }
  };

  const removeDocument = async (documentId: string) => {
    try {
      const currentDocuments = await loadUserDocuments();
      const updatedDocuments = currentDocuments.filter(doc => doc.id !== documentId);
      
      // Save to localStorage
      localStorage.setItem(`user_documents_${user?.id}`, JSON.stringify(updatedDocuments));
      
      // Remove related alerts
      setDocumentAlerts(prev => 
        prev.filter(alert => !alert.id.includes(documentId))
      );

    } catch (error) {
      console.error('Error removing document:', error);
      setError('Failed to remove document');
    }
  };

  const clearAllAlerts = async () => {
    try {
      setDocumentAlerts([]);
      localStorage.removeItem(`document_alerts_${user?.id}`);

    } catch (error) {
      console.error('Error clearing alerts:', error);
    }
  };

  const exportDocumentReport = () => {
    return {
      expiredDocuments,
      documentAlerts,
      summary: {
        totalDocuments: expiredDocuments.length,
        expiredCount: getExpiredDocuments().length,
        expiringCount: getExpiringDocuments().length,
        unreadAlerts: getUnreadAlerts().length,
        actionRequiredAlerts: getActionRequiredAlerts().length
      },
      exportedAt: new Date().toISOString()
    };
  };

  return {
    expiredDocuments,
    documentAlerts,
    isLoading,
    error,
    checkDocumentExpiry,
    markAlertAsRead,
    dismissAlert,
    getExpiringDocuments,
    getExpiredDocuments,
    getDocumentAlertsByPriority,
    getUnreadAlerts,
    getActionRequiredAlerts,
    addDocument,
    updateDocument,
    removeDocument,
    clearAllAlerts,
    exportDocumentReport
  };
};
