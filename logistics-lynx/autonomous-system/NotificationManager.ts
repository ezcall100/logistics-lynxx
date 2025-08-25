import { LogManager } from './LogManager';

/**
 * 🔔 Notification Manager for Autonomous TMS System
 * Handles notifications, alerts, and communication with external services
 */

export interface Notification {
  type: 'info' | 'success' | 'warning' | 'error' | 'system_startup' | 'system_shutdown' | 'agent_status';
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  recipient?: string;
  metadata?: unknown;
  timestamp?: Date;
}

export class NotificationManager {
  private logManager: LogManager;
  private notifications: Notification[] = [];
  private isEnabled: boolean = true;

  constructor() {
    this.logManager = new LogManager();
  }

  async initialize(): Promise<void> {
    this.logManager.log('🔔 Initializing Notification Manager...', 'info');
    
    try {
      // Load notification configuration
      this.isEnabled = process.env['NOTIFICATIONS_ENABLED'] !== 'false';
      
      this.logManager.log('✅ Notification Manager initialized', 'success');
      
    } catch (error) {
      this.logManager.error(`❌ Failed to initialize notification manager: ${error}`);
      throw error;
    }
  }

  async sendNotification(notification: Notification): Promise<boolean> {
    if (!this.isEnabled) {
      this.logManager.debug('Notifications disabled, skipping', { notification });
      return false;
    }

    try {
      // Add timestamp if not provided
      if (!notification.timestamp) {
        notification.timestamp = new Date();
      }

      // Store notification
      this.notifications.push(notification);

      // Log the notification
      this.logManager.log(`🔔 ${notification.message}`, notification.type === 'error' ? 'error' : 'info');

      // Send to external services based on priority
      if (notification.priority === 'critical' || notification.priority === 'high') {
        await this.sendToExternalServices(notification);
      }

      return true;
      
    } catch (error) {
      this.logManager.error(`❌ Failed to send notification: ${error}`);
      return false;
    }
  }

  async sendToExternalServices(notification: Notification): Promise<void> {
    try {
      // Send to Slack if configured
      if (process.env['SLACK_WEBHOOK_URL']) {
        await this.sendToSlack(notification);
      }

      // Send to email if configured
      if (process.env['EMAIL_SERVICE_ENABLED'] === 'true') {
        await this.sendToEmail(notification);
      }

      // Send to webhook if configured
      if (process.env['WEBHOOK_URL']) {
        await this.sendToWebhook(notification);
      }

    } catch (error) {
      this.logManager.error(`❌ Failed to send to external services: ${error}`);
    }
  }

  private async sendToSlack(notification: Notification): Promise<void> {
    try {
      const webhookUrl = process.env['SLACK_WEBHOOK_URL'];
      if (!webhookUrl) return;

      const payload = {
        text: `🤖 Trans Bot AI: ${notification.message}`,
        attachments: [{
          color: this.getPriorityColor(notification.priority),
          fields: [
            {
              title: 'Type',
              value: notification.type,
              short: true
            },
            {
              title: 'Priority',
              value: notification.priority,
              short: true
            },
            {
              title: 'Timestamp',
              value: notification.timestamp?.toISOString(),
              short: true
            }
          ]
        }]
      };

      // Simulate Slack webhook call
      this.logManager.debug('Sending to Slack', { payload });
      
    } catch (error) {
      this.logManager.error(`❌ Failed to send to Slack: ${error}`);
    }
  }

  private async sendToEmail(notification: Notification): Promise<void> {
    try {
      // Simulate email sending
      this.logManager.debug('Sending email notification', { notification });
      
    } catch (error) {
      this.logManager.error(`❌ Failed to send email: ${error}`);
    }
  }

  private async sendToWebhook(notification: Notification): Promise<void> {
    try {
      const webhookUrl = process.env['WEBHOOK_URL'];
      if (!webhookUrl) return;

      // Simulate webhook call
      this.logManager.debug('Sending webhook notification', { notification });
      
    } catch (error) {
      this.logManager.error(`❌ Failed to send webhook: ${error}`);
    }
  }

  private getPriorityColor(priority: Notification['priority']): string {
    switch (priority) {
      case 'critical': return '#ff0000'; // Red
      case 'high': return '#ff6600';     // Orange
      case 'medium': return '#ffcc00';   // Yellow
      case 'low': return '#00cc00';      // Green
      default: return '#666666';         // Gray
    }
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  getNotificationsByType(type: Notification['type']): Notification[] {
    return this.notifications.filter(n => n.type === type);
  }

  getNotificationsByPriority(priority: Notification['priority']): Notification[] {
    return this.notifications.filter(n => n.priority === priority);
  }

  clearNotifications(): void {
    this.notifications = [];
    this.logManager.log('🔔 Notifications cleared', 'info');
  }

  isReady(): boolean {
    return this.isEnabled;
  }
}
