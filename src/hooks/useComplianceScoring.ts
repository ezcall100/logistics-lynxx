// Compliance Scoring Hook
// Phase 7.3: Carrier & Broker Risk Management Onboarding
// 120-point comprehensive scoring system

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface ComplianceScore {
  fmcsaScore: number;
  tinScore: number;
  companyProfileScore: number;
  documentUploadScore: number;
  insuranceScore: number;
  legalConsentScore: number;
  safetyRecordScore: number;
  equipmentScore: number;
  paymentScore: number;
  technologyScore: number;
  optionalAddonsScore: number;
  totalScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'pending';
  approvalStatus: 'pending' | 'auto_approved' | 'manual_review' | 'rejected';
}

interface ScoringCriteria {
  category: string;
  maxPoints: number;
  currentPoints: number;
  criteria: string[];
  isComplete: boolean;
}

export const useComplianceScoring = () => {
  const { user } = useAuth();
  const [complianceScore, setComplianceScore] = useState<ComplianceScore>({
    fmcsaScore: 0,
    tinScore: 0,
    companyProfileScore: 0,
    documentUploadScore: 0,
    insuranceScore: 0,
    legalConsentScore: 0,
    safetyRecordScore: 0,
    equipmentScore: 0,
    paymentScore: 0,
    technologyScore: 0,
    optionalAddonsScore: 0,
    totalScore: 0,
    riskLevel: 'pending',
    approvalStatus: 'pending'
  });
  const [scoringCriteria, setScoringCriteria] = useState<ScoringCriteria[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing score on mount
  useEffect(() => {
    if (user) {
      loadComplianceScore();
    }
  }, [user]);

  const loadComplianceScore = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // This would load from your database
      // For now, we'll simulate loading from localStorage
      const savedScore = localStorage.getItem(`compliance_score_${user?.id}`);
      if (savedScore) {
        const parsedScore = JSON.parse(savedScore);
        setComplianceScore(parsedScore);
      }

      // Initialize scoring criteria
      initializeScoringCriteria();

    } catch (error) {
      console.error('Error loading compliance score:', error);
      setError('Failed to load compliance score');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeScoringCriteria = () => {
    const criteria: ScoringCriteria[] = [
      {
        category: 'FMCSA Match',
        maxPoints: 20,
        currentPoints: 0,
        criteria: [
          'Active operating status (15 points)',
          'Satisfactory safety rating (5 points)'
        ],
        isComplete: false
      },
      {
        category: 'TIN Verified',
        maxPoints: 15,
        currentPoints: 0,
        criteria: [
          'IRS TIN match verification (15 points)'
        ],
        isComplete: false
      },
      {
        category: 'Company Profile & History',
        maxPoints: 10,
        currentPoints: 0,
        criteria: [
          'Legal business name (2 points)',
          'DOT number (2 points)',
          'MC number (2 points)',
          'EIN/TIN (2 points)',
          'Business license (2 points)'
        ],
        isComplete: false
      },
      {
        category: 'Document Uploads',
        maxPoints: 10,
        currentPoints: 0,
        criteria: [
          'W-9 form uploaded (5 points)',
          'Operating authority document (5 points)'
        ],
        isComplete: false
      },
      {
        category: 'Insurance Verification',
        maxPoints: 20,
        currentPoints: 0,
        criteria: [
          'Minimum 3 certificates (15 points)',
          'All certificates valid >30 days (5 points)'
        ],
        isComplete: false
      },
      {
        category: 'Legal Consent',
        maxPoints: 10,
        currentPoints: 0,
        criteria: [
          'All legal agreements signed (10 points)'
        ],
        isComplete: false
      },
      {
        category: 'Safety Record',
        maxPoints: 10,
        currentPoints: 0,
        criteria: [
          'Satisfactory FMCSA rating (10 points)'
        ],
        isComplete: false
      },
      {
        category: 'Equipment & Drivers',
        maxPoints: 5,
        currentPoints: 0,
        criteria: [
          'Equipment inventory added (3 points)',
          'ELD compliance confirmed (2 points)'
        ],
        isComplete: false
      },
      {
        category: 'Payment Information',
        maxPoints: 5,
        currentPoints: 0,
        criteria: [
          'Payment method configured (5 points)'
        ],
        isComplete: false
      },
      {
        category: 'Technology Compliance',
        maxPoints: 10,
        currentPoints: 0,
        criteria: [
          'ELD compliance (5 points)',
          'GPS tracking capability (5 points)'
        ],
        isComplete: false
      },
      {
        category: 'Optional Add-ons',
        maxPoints: 5,
        currentPoints: 0,
        criteria: [
          'Hazmat endorsement (2 points)',
          'TWIC card (2 points)',
          'Additional insured endorsement (1 point)'
        ],
        isComplete: false
      }
    ];

    setScoringCriteria(criteria);
  };

  const calculateScore = async (formData: any): Promise<number> => {
    try {
      setIsLoading(true);
      setError(null);

      let totalScore = 0;
      const newScoringCriteria = [...scoringCriteria];

      // FMCSA Score (20 points)
      let fmcsaScore = 0;
      if (formData.fmcsaData?.operatingStatus === 'ACTIVE') {
        fmcsaScore += 15;
      } else if (formData.fmcsaData?.operatingStatus === 'INACTIVE') {
        fmcsaScore += 0;
      } else {
        fmcsaScore += 5;
      }

      if (formData.fmcsaData?.safetyRating === 'SATISFACTORY') {
        fmcsaScore += 5;
      } else if (formData.fmcsaData?.safetyRating === 'CONDITIONAL') {
        fmcsaScore += 2;
      }

      totalScore += fmcsaScore;
      newScoringCriteria[0].currentPoints = fmcsaScore;
      newScoringCriteria[0].isComplete = fmcsaScore >= 20;

      // TIN Score (15 points)
      let tinScore = 0;
      if (formData.tinVerification?.verified) {
        tinScore = 15;
      }
      totalScore += tinScore;
      newScoringCriteria[1].currentPoints = tinScore;
      newScoringCriteria[1].isComplete = tinScore >= 15;

      // Company Profile Score (10 points)
      let companyProfileScore = 0;
      if (formData.companyProfile?.legalBusinessName) companyProfileScore += 2;
      if (formData.companyProfile?.dotNumber) companyProfileScore += 2;
      if (formData.companyProfile?.mcNumber) companyProfileScore += 2;
      if (formData.companyProfile?.einTin) companyProfileScore += 2;
      if (formData.companyProfile?.businessLicenseNumber) companyProfileScore += 2;
      totalScore += companyProfileScore;
      newScoringCriteria[2].currentPoints = companyProfileScore;
      newScoringCriteria[2].isComplete = companyProfileScore >= 10;

      // Document Upload Score (10 points)
      let documentUploadScore = 0;
      if (formData.companyProfile?.w9DocumentUrl) documentUploadScore += 5;
      if (formData.companyProfile?.operatingAuthorityDocumentUrl) documentUploadScore += 5;
      totalScore += documentUploadScore;
      newScoringCriteria[3].currentPoints = documentUploadScore;
      newScoringCriteria[3].isComplete = documentUploadScore >= 10;

      // Insurance Score (20 points)
      let insuranceScore = 0;
      const insuranceCount = formData.insuranceCertificates?.length || 0;
      if (insuranceCount >= 3) {
        insuranceScore += 15;
      } else {
        insuranceScore += insuranceCount * 5;
      }

      // Check if all insurance certificates are valid for >30 days
      const allValid = formData.insuranceCertificates?.every((cert: any) => {
        const expiryDate = new Date(cert.expirationDate);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return expiryDate > thirtyDaysFromNow;
      });

      if (allValid) {
        insuranceScore += 5;
      }

      totalScore += insuranceScore;
      newScoringCriteria[4].currentPoints = insuranceScore;
      newScoringCriteria[4].isComplete = insuranceScore >= 20;

      // Legal Consent Score (10 points)
      let legalConsentScore = 0;
      const consentCount = Object.keys(formData.legalConsents || {}).length;
      if (consentCount >= 5) {
        legalConsentScore = 10;
      } else {
        legalConsentScore = consentCount * 2;
      }
      totalScore += legalConsentScore;
      newScoringCriteria[5].currentPoints = legalConsentScore;
      newScoringCriteria[5].isComplete = legalConsentScore >= 10;

      // Safety Record Score (10 points)
      let safetyRecordScore = 0;
      if (formData.fmcsaData?.safetyRating === 'SATISFACTORY') {
        safetyRecordScore = 10;
      } else if (formData.fmcsaData?.safetyRating === 'CONDITIONAL') {
        safetyRecordScore = 5;
      }
      totalScore += safetyRecordScore;
      newScoringCriteria[6].currentPoints = safetyRecordScore;
      newScoringCriteria[6].isComplete = safetyRecordScore >= 10;

      // Equipment Score (5 points)
      let equipmentScore = 0;
      if (formData.equipmentInventory?.length > 0) equipmentScore += 3;
      if (formData.equipmentInventory?.some((eq: any) => eq.eldCompliant)) equipmentScore += 2;
      totalScore += equipmentScore;
      newScoringCriteria[7].currentPoints = equipmentScore;
      newScoringCriteria[7].isComplete = equipmentScore >= 5;

      // Payment Score (5 points)
      let paymentScore = 0;
      if (formData.paymentSetup?.paymentMethod && 
          (formData.paymentSetup?.bankName || formData.paymentSetup?.factoringCompany)) {
        paymentScore = 5;
      }
      totalScore += paymentScore;
      newScoringCriteria[8].currentPoints = paymentScore;
      newScoringCriteria[8].isComplete = paymentScore >= 5;

      // Technology Score (10 points)
      let technologyScore = 0;
      if (formData.equipmentInventory?.some((eq: any) => eq.eldCompliant)) technologyScore += 5;
      if (formData.equipmentInventory?.some((eq: any) => eq.gpsTracking)) technologyScore += 5;
      totalScore += technologyScore;
      newScoringCriteria[9].currentPoints = technologyScore;
      newScoringCriteria[9].isComplete = technologyScore >= 10;

      // Optional Add-ons Score (5 points)
      let optionalAddonsScore = 0;
      if (formData.driverDocuments?.some((driver: any) => driver.hazmatEndorsement)) optionalAddonsScore += 2;
      if (formData.driverDocuments?.some((driver: any) => driver.twicCard)) optionalAddonsScore += 2;
      if (formData.insuranceCertificates?.some((cert: any) => cert.additionalInsuredEndorsement)) optionalAddonsScore += 1;
      totalScore += optionalAddonsScore;
      newScoringCriteria[10].currentPoints = optionalAddonsScore;
      newScoringCriteria[10].isComplete = optionalAddonsScore >= 5;

      // Determine risk level and approval status
      const riskLevel = determineRiskLevel(totalScore);
      const approvalStatus = determineApprovalStatus(totalScore);

      const newComplianceScore: ComplianceScore = {
        fmcsaScore,
        tinScore,
        companyProfileScore,
        documentUploadScore,
        insuranceScore,
        legalConsentScore,
        safetyRecordScore,
        equipmentScore,
        paymentScore,
        technologyScore,
        optionalAddonsScore,
        totalScore,
        riskLevel,
        approvalStatus
      };

      setComplianceScore(newComplianceScore);
      setScoringCriteria(newScoringCriteria);

      // Save to localStorage (in production, this would be saved to database)
      localStorage.setItem(`compliance_score_${user?.id}`, JSON.stringify(newComplianceScore));

      // Log score calculation to audit trail
      await logScoreCalculation(newComplianceScore, formData);

      return totalScore;

    } catch (error) {
      console.error('Error calculating compliance score:', error);
      setError('Failed to calculate compliance score');
      return 0;
    } finally {
      setIsLoading(false);
    }
  };

  const determineRiskLevel = (score: number): 'low' | 'medium' | 'high' | 'pending' => {
    if (score >= 100) return 'low';
    if (score >= 70) return 'medium';
    if (score >= 50) return 'high';
    return 'pending';
  };

  const determineApprovalStatus = (score: number): 'pending' | 'auto_approved' | 'manual_review' | 'rejected' => {
    if (score >= 100) return 'auto_approved';
    if (score >= 70) return 'manual_review';
    return 'rejected';
  };

  const getScoreBreakdown = () => {
    return scoringCriteria.map(criteria => ({
      category: criteria.category,
      currentPoints: criteria.currentPoints,
      maxPoints: criteria.maxPoints,
      percentage: Math.round((criteria.currentPoints / criteria.maxPoints) * 100),
      isComplete: criteria.isComplete,
      criteria: criteria.criteria
    }));
  };

  const getScoreRecommendations = () => {
    const recommendations: string[] = [];
    
    scoringCriteria.forEach(criteria => {
      if (!criteria.isComplete) {
        const missingPoints = criteria.maxPoints - criteria.currentPoints;
        recommendations.push(`${criteria.category}: Need ${missingPoints} more points`);
      }
    });

    return recommendations;
  };

  const resetScore = async () => {
    try {
      const resetScore: ComplianceScore = {
        fmcsaScore: 0,
        tinScore: 0,
        companyProfileScore: 0,
        documentUploadScore: 0,
        insuranceScore: 0,
        legalConsentScore: 0,
        safetyRecordScore: 0,
        equipmentScore: 0,
        paymentScore: 0,
        technologyScore: 0,
        optionalAddonsScore: 0,
        totalScore: 0,
        riskLevel: 'pending',
        approvalStatus: 'pending'
      };

      setComplianceScore(resetScore);
      initializeScoringCriteria();

      // Clear from localStorage
      localStorage.removeItem(`compliance_score_${user?.id}`);

      // Log reset to audit trail
      await logScoreCalculation(resetScore, { action: 'reset' });

    } catch (error) {
      console.error('Error resetting compliance score:', error);
      setError('Failed to reset compliance score');
    }
  };

  const logScoreCalculation = async (score: ComplianceScore, formData: any) => {
    try {
      // This would log to your audit trail
      const auditEntry = {
        userId: user?.id,
        action: 'compliance_score_calculation',
        score,
        formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: '' // Would be captured server-side
      };

      console.log('Score calculation audit log:', auditEntry);
      
      // In production, this would be saved to your audit log table
      // await supabase.from('audit_log').insert(auditEntry);

    } catch (error) {
      console.error('Error logging score calculation:', error);
    }
  };

  const exportScoreReport = () => {
    return {
      complianceScore,
      scoringCriteria,
      breakdown: getScoreBreakdown(),
      recommendations: getScoreRecommendations(),
      exportedAt: new Date().toISOString()
    };
  };

  return {
    complianceScore,
    scoringCriteria,
    isLoading,
    error,
    calculateScore,
    getScoreBreakdown,
    getScoreRecommendations,
    resetScore,
    exportScoreReport
  };
};
