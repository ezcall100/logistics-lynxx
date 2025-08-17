// Legal Documents Management
// Phase 7.2: Legal Acknowledgment & Consent System

export interface LegalDocument {
  documentType: 'master_agreement' | 'terms_of_use' | 'privacy_policy' | 'communications_consent' | 'wireless_policy';
  version: string;
  title: string;
  content: string;
  effectiveDate: Date;
  isActive: boolean;
}

export interface LegalDocumentConfig {
  documents: LegalDocument[];
  versionControl: {
    autoIncrement: boolean;
    requireApproval: boolean;
    notificationEmails: string[];
  };
}

// Legal Document Content
export const legalDocuments: LegalDocument[] = [
  {
    documentType: 'master_agreement',
    version: '1.0.0',
    title: 'Master Transportation Services Agreement',
    content: `MASTER TRANSPORTATION SERVICES AGREEMENT

This Master Transportation Services Agreement ("Agreement") is entered into as of the date of acceptance by and between the entity identified in the onboarding process ("Customer") and Logistics Lynx, Inc. ("Provider"), a Delaware corporation with its principal place of business at [Address].

1. SERVICES
Provider shall provide transportation management services, including but not limited to load matching, rate management, carrier management, and logistics optimization through its proprietary platform and related services.

2. TERM AND TERMINATION
This Agreement shall commence upon Customer's acceptance and continue for an initial term of one (1) year, automatically renewing for successive one-year terms unless terminated by either party with thirty (30) days written notice.

3. FEES AND PAYMENT
Customer shall pay Provider the fees set forth in the applicable service plan. All fees are due within thirty (30) days of invoice date. Late payments shall incur interest at 1.5% per month.

4. CONFIDENTIALITY
Each party shall maintain the confidentiality of the other party's proprietary information and shall not disclose such information to third parties without prior written consent.

5. LIMITATION OF LIABILITY
Provider's liability shall be limited to the amount paid by Customer in the twelve (12) months preceding the claim. Neither party shall be liable for indirect, incidental, or consequential damages.

6. INDEMNIFICATION
Each party shall indemnify and hold harmless the other party from and against any claims arising from the indemnifying party's breach of this Agreement or negligent acts.

7. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.

8. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements and understandings.

By accepting this Agreement, Customer acknowledges that it has read, understood, and agrees to be bound by all terms and conditions contained herein.`,
    effectiveDate: new Date('2024-01-01'),
    isActive: true
  },
  {
    documentType: 'terms_of_use',
    version: '1.0.0',
    title: 'Terms of Use',
    content: `TERMS OF USE

These Terms of Use ("Terms") govern your use of the Logistics Lynx platform and services. By accessing or using our services, you agree to be bound by these Terms.

1. ACCEPTANCE OF TERMS
By accessing or using the Logistics Lynx platform, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.

2. USE LICENSE
Permission is granted to temporarily access the Logistics Lynx platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modify or copy the materials
- Use the materials for any commercial purpose or for any public display
- Attempt to reverse engineer any software contained on the platform
- Remove any copyright or other proprietary notations from the materials
- Transfer the materials to another person or "mirror" the materials on any other server

3. USER ACCOUNTS
You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.

4. ACCEPTABLE USE
You agree not to use the platform to:
- Violate any applicable laws or regulations
- Infringe upon the rights of others
- Transmit harmful, offensive, or inappropriate content
- Attempt to gain unauthorized access to the platform or other users' accounts
- Interfere with or disrupt the platform's operation

5. INTELLECTUAL PROPERTY
The platform and its original content, features, and functionality are owned by Logistics Lynx and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

6. PRIVACY
Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, to understand our practices.

7. DISCLAIMER
The materials on the Logistics Lynx platform are provided on an 'as is' basis. Logistics Lynx makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.

8. LIMITATIONS
In no event shall Logistics Lynx or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the platform.

9. REVISIONS AND ERRATA
The materials appearing on the Logistics Lynx platform could include technical, typographical, or photographic errors. Logistics Lynx does not warrant that any of the materials on its platform are accurate, complete, or current.

10. LINKS
Logistics Lynx has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Logistics Lynx of the site.

11. MODIFICATIONS
Logistics Lynx may revise these Terms at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these Terms.

12. GOVERNING LAW
These Terms shall be governed by and construed in accordance with the laws of Delaware, without regard to its conflict of law provisions.`,
    effectiveDate: new Date('2024-01-01'),
    isActive: true
  },
  {
    documentType: 'privacy_policy',
    version: '1.0.0',
    title: 'Privacy Policy',
    content: `PRIVACY POLICY

This Privacy Policy describes how Logistics Lynx collects, uses, and protects your personal information when you use our platform and services.

1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as when you create an account, complete your profile, or contact us for support. This may include:
- Name, email address, and contact information
- Business information and credentials
- Payment and billing information
- Communications with our support team

2. AUTOMATICALLY COLLECTED INFORMATION
We automatically collect certain information when you use our platform, including:
- Log data (IP address, browser type, pages visited)
- Device information (device type, operating system)
- Usage data (features used, time spent on platform)
- Location data (if you enable location services)

3. HOW WE USE YOUR INFORMATION
We use the information we collect to:
- Provide, maintain, and improve our services
- Process transactions and send related information
- Send technical notices, updates, and support messages
- Respond to your comments and questions
- Monitor and analyze trends and usage
- Detect, investigate, and prevent fraudulent transactions and other illegal activities

4. SHARING OF INFORMATION
We may share your information in the following circumstances:
- With your consent or at your direction
- With service providers who perform services on our behalf
- To comply with legal obligations
- To protect our rights and property
- In connection with a business transfer or merger

5. DATA SECURITY
We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

6. DATA RETENTION
We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

7. YOUR RIGHTS
Depending on your location, you may have certain rights regarding your personal information, including:
- Access to your personal information
- Correction of inaccurate information
- Deletion of your personal information
- Restriction of processing
- Data portability
- Objection to processing

8. COOKIES AND SIMILAR TECHNOLOGIES
We use cookies and similar technologies to collect information about your browsing activities and to remember your preferences. You can control cookie settings through your browser.

9. THIRD-PARTY SERVICES
Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.

10. CHILDREN'S PRIVACY
Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

11. INTERNATIONAL TRANSFERS
Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.

12. CHANGES TO THIS POLICY
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

13. CONTACT US
If you have any questions about this Privacy Policy, please contact us at privacy@logisticslynx.com.`,
    effectiveDate: new Date('2024-01-01'),
    isActive: true
  },
  {
    documentType: 'communications_consent',
    version: '1.0.0',
    title: 'Communications Consent',
    content: `COMMUNICATIONS CONSENT

By accepting this Communications Consent, you authorize Logistics Lynx to send you communications related to your account, services, and important updates.

1. TYPES OF COMMUNICATIONS
You consent to receive the following types of communications from Logistics Lynx:
- Account-related notifications (login alerts, password changes)
- Service updates and maintenance notifications
- Billing and payment reminders
- Platform updates and new features
- Security alerts and important notices
- Customer support communications
- Marketing and promotional materials (with opt-out option)

2. COMMUNICATION METHODS
We may contact you through:
- Email messages
- SMS text messages
- Push notifications (if enabled)
- In-app notifications
- Phone calls (for urgent matters only)

3. FREQUENCY
The frequency of communications will vary based on:
- Your account activity and usage
- Service requirements and updates
- Security and compliance needs
- Your communication preferences

4. OPT-OUT RIGHTS
You may opt out of certain types of communications:
- Marketing emails: Use the unsubscribe link in any marketing email
- SMS messages: Reply "STOP" to any SMS message
- Push notifications: Disable in your device settings
- Phone calls: Contact customer support

5. REQUIRED COMMUNICATIONS
Some communications are required for service delivery and cannot be opted out of:
- Account security alerts
- Service maintenance notifications
- Legal and compliance notices
- Billing and payment communications

6. COMMUNICATION PREFERENCES
You can manage your communication preferences through:
- Your account settings
- Email preferences page
- Customer support requests

7. DATA USAGE
We may use your communication data to:
- Improve our services and user experience
- Analyze communication effectiveness
- Ensure compliance with legal requirements
- Provide better customer support

8. THIRD-PARTY COMMUNICATIONS
We may use third-party services to send communications, but we maintain control over the content and frequency.

9. CONSENT WITHDRAWAL
You may withdraw your consent at any time by:
- Updating your communication preferences
- Contacting customer support
- Unsubscribing from specific communication types

10. EFFECT OF WITHDRAWAL
Withdrawing consent may limit our ability to:
- Provide important service updates
- Send security alerts
- Deliver critical notifications
- Offer customer support

11. UPDATES TO CONSENT
We may update this Communications Consent from time to time. Continued use of our services after updates constitutes acceptance of the new terms.

12. CONTACT INFORMATION
For questions about communications or to update preferences, contact us at:
- Email: support@logisticslynx.com
- Phone: 1-800-LOGISTICS
- In-app: Use the support chat feature

By accepting this Communications Consent, you acknowledge that you have read, understood, and agree to receive communications from Logistics Lynx as described above.`,
    effectiveDate: new Date('2024-01-01'),
    isActive: true
  },
  {
    documentType: 'wireless_policy',
    version: '1.0.0',
    title: 'Wireless Communications Policy',
    content: `WIRELESS COMMUNICATIONS POLICY

This Wireless Communications Policy outlines the terms and conditions for wireless communications, including SMS, push notifications, and mobile alerts.

1. WIRELESS COMMUNICATIONS COVERED
This policy covers all wireless communications sent by Logistics Lynx, including:
- SMS text messages
- Push notifications
- Mobile app alerts
- Location-based notifications
- Emergency alerts

2. CONSENT REQUIREMENTS
By accepting this policy, you consent to receive wireless communications from Logistics Lynx. You acknowledge that:
- You are the authorized user of the wireless device
- You are responsible for any charges from your wireless carrier
- You can opt out of these communications at any time

3. TYPES OF WIRELESS MESSAGES
We may send the following types of wireless messages:
- Account verification codes
- Security alerts and login notifications
- Service updates and maintenance alerts
- Load status updates and delivery notifications
- Payment confirmations and billing reminders
- Emergency notifications and safety alerts

4. MESSAGE FREQUENCY
Message frequency varies based on:
- Your account activity level
- Service requirements
- Security events
- Your notification preferences

5. CARRIER CHARGES
You are responsible for any charges from your wireless carrier for:
- Message delivery fees
- Data usage charges
- Roaming fees
- Any other carrier-imposed charges

6. OPT-OUT PROCEDURES
You may opt out of wireless communications by:
- SMS: Reply "STOP" to any SMS message
- Push notifications: Disable in app settings
- All communications: Contact customer support

7. REQUIRED MESSAGES
Some wireless messages are required and cannot be opted out of:
- Security alerts and fraud notifications
- Emergency safety communications
- Legal and compliance notices
- Critical service updates

8. MESSAGE CONTENT
Wireless messages may include:
- Short codes and verification numbers
- Status updates and confirmations
- Alert notifications
- Service announcements

9. DATA USAGE
We may collect and use data related to wireless communications for:
- Service improvement and optimization
- Security and fraud prevention
- Compliance and audit purposes
- Customer support and troubleshooting

10. THIRD-PARTY SERVICES
We may use third-party services to deliver wireless messages, but we maintain control over:
- Message content and frequency
- Recipient lists and targeting
- Opt-out management
- Data security and privacy

11. EMERGENCY COMMUNICATIONS
In emergency situations, we may send wireless communications without prior consent to:
- Ensure user safety
- Provide critical service updates
- Comply with legal requirements
- Address security incidents

12. LOCATION-BASED SERVICES
If you enable location services, we may send location-based notifications for:
- Load pickup and delivery updates
- Route optimization
- Safety alerts
- Service availability

13. MESSAGE STORAGE
Wireless messages may be stored for:
- Security and audit purposes
- Customer support
- Compliance requirements
- Service improvement

14. INTERNATIONAL COMMUNICATIONS
If you use our services internationally, wireless communications may be subject to:
- Local laws and regulations
- International roaming charges
- Different opt-out procedures
- Varying delivery times

15. POLICY UPDATES
We may update this Wireless Communications Policy from time to time. Continued use of wireless communications after updates constitutes acceptance of the new terms.

16. CONTACT INFORMATION
For questions about wireless communications, contact us at:
- Email: wireless@logisticslynx.com
- SMS: Text "HELP" to our short code
- Phone: 1-800-LOGISTICS
- In-app: Use the support chat feature

By accepting this Wireless Communications Policy, you acknowledge that you have read, understood, and agree to receive wireless communications from Logistics Lynx as described above.`,
    effectiveDate: new Date('2024-01-01'),
    isActive: true
  }
];

// Configuration for legal document management
export const legalDocumentConfig: LegalDocumentConfig = {
  documents: legalDocuments,
  versionControl: {
    autoIncrement: true,
    requireApproval: true,
    notificationEmails: ['legal@logisticslynx.com', 'compliance@logisticslynx.com']
  }
};

// Utility functions for legal document management
export class LegalDocumentManager {
  private documents: LegalDocument[];

  constructor(documents: LegalDocument[] = legalDocuments) {
    this.documents = documents;
  }

  // Get all active documents
  getActiveDocuments(): LegalDocument[] {
    return this.documents.filter(doc => doc.isActive);
  }

  // Get document by type
  getDocumentByType(documentType: LegalDocument['documentType']): LegalDocument | undefined {
    return this.documents.find(doc => doc.documentType === documentType && doc.isActive);
  }

  // Get document by type and version
  getDocumentByTypeAndVersion(documentType: LegalDocument['documentType'], version: string): LegalDocument | undefined {
    return this.documents.find(doc => doc.documentType === documentType && doc.version === version);
  }

  // Get latest version of a document type
  getLatestVersion(documentType: LegalDocument['documentType']): LegalDocument | undefined {
    const documentsOfType = this.documents.filter(doc => doc.documentType === documentType && doc.isActive);
    if (documentsOfType.length === 0) return undefined;
    
    return documentsOfType.reduce((latest, current) => {
      return this.compareVersions(current.version, latest.version) > 0 ? current : latest;
    });
  }

  // Compare version strings (semantic versioning)
  private compareVersions(version1: string, version2: string): number {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;
      
      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }
    
    return 0;
  }

  // Check if user needs to accept new document versions
  checkForNewVersions(userAcceptedVersions: Record<string, string>): LegalDocument[] {
    const requiredDocuments = this.getActiveDocuments();
    const newVersions: LegalDocument[] = [];

    for (const doc of requiredDocuments) {
      const userVersion = userAcceptedVersions[doc.documentType];
      if (!userVersion || this.compareVersions(doc.version, userVersion) > 0) {
        newVersions.push(doc);
      }
    }

    return newVersions;
  }

  // Validate document content
  validateDocument(document: LegalDocument): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!document.title || document.title.trim().length === 0) {
      errors.push('Document title is required');
    }

    if (!document.content || document.content.trim().length === 0) {
      errors.push('Document content is required');
    }

    if (!document.version || !/^\d+\.\d+\.\d+$/.test(document.version)) {
      errors.push('Document version must be in semantic versioning format (e.g., 1.0.0)');
    }

    if (!document.effectiveDate) {
      errors.push('Effective date is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Generate document summary for display
  generateDocumentSummary(document: LegalDocument): string {
    const content = document.content.replace(/\s+/g, ' ').trim();
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  }

  // Get document type display name
  getDocumentTypeDisplayName(documentType: LegalDocument['documentType']): string {
    const displayNames: Record<LegalDocument['documentType'], string> = {
      master_agreement: 'Master Agreement',
      terms_of_use: 'Terms of Use',
      privacy_policy: 'Privacy Policy',
      communications_consent: 'Communications Consent',
      wireless_policy: 'Wireless Communications Policy'
    };
    return displayNames[documentType];
  }
}

// Export singleton instance
export const legalDocumentManager = new LegalDocumentManager();
