import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ComplianceScore {
  totalScore: number;
  categoryScores: {
    fmcsaMatch: number;
    tinVerified: number;
    companyProfile: number;
    documentUploads: number;
    insuranceVerification: number;
    legalConsent: number;
    safetyRecord: number;
    equipmentDrivers: number;
    paymentInfo: number;
    technologyCompliance: number;
    optionalAddons: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  approvalStatus: 'pending' | 'auto_approved' | 'manual_review' | 'rejected';
  lastCalculated: Date;
}

interface FormData {
  legal_business_name: string;
  dba_name: string;
  ein_tin: string;
  dot_number: string;
  mc_number: string;
  tin_verified: boolean;
  fmcsa_verified: boolean;
  fmcsa_safety_rating: string;
  w9_url: string;
  business_license_url: string;
  insurance_certificates: Array<{
    insurance_type: string;
    coverage_amount: number;
  }>;
  legal_agreements: Array<{
    signed: boolean;
  }>;
  equipment_count: number;
  driver_qualification_file_url: string;
  voided_check_url: string;
  factoring_letter_url: string;
  has_eld: boolean;
  has_gps_tracking: boolean;
  safety_rating: string;
}

export const useComplianceScoring = () => {
  const [score, setScore] = useState<ComplianceScore>({
    totalScore: 0,
    categoryScores: {
      fmcsaMatch: 0,
      tinVerified: 0,
      companyProfile: 0,
      documentUploads: 0,
      insuranceVerification: 0,
      legalConsent: 0,
      safetyRecord: 0,
      equipmentDrivers: 0,
      paymentInfo: 0,
      technologyCompliance: 0,
      optionalAddons: 0
    },
    riskLevel: 'medium',
    approvalStatus: 'pending',
    lastCalculated: new Date()
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const calculateScore = async (formData: FormData): Promise<number> => {
    const categoryScores = {
      // FMCSA Match Score (20 points)
      fmcsaMatch: calculateFmcsaScore(formData),
      
      // TIN Verified Score (15 points)
      tinVerified: calculateTinScore(formData),
      
      // Company Profile Score (10 points)
      companyProfile: calculateProfileScore(formData),
      
      // Document Uploads Score (10 points)
      documentUploads: calculateDocumentScore(formData),
      
      // Insurance Verification Score (20 points)
      insuranceVerification: calculateInsuranceScore(formData),
      
      // Legal Consent Score (10 points)
      legalConsent: calculateLegalScore(formData),
      
      // Safety Record Score (10 points)
      safetyRecord: calculateSafetyScore(formData),
      
      // Equipment & Drivers Score (5 points)
      equipmentDrivers: calculateEquipmentScore(formData),
      
      // Payment Info Score (5 points)
      paymentInfo: calculatePaymentScore(formData),
      
      // Technology Compliance Score (10 points)
      technologyCompliance: calculateTechnologyScore(formData),
      
      // Optional Add-ons Score (5 points)
      optionalAddons: calculateOptionalScore(formData)
    };

    const totalScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0);
    
    const riskLevel = determineRiskLevel(totalScore);
    const approvalStatus = determineApprovalStatus(totalScore);

    const newScore: ComplianceScore = {
      totalScore,
      categoryScores,
      riskLevel,
      approvalStatus,
      lastCalculated: new Date()
    };

    setScore(newScore);
    
    // Save to database
    await saveScoreToDatabase(newScore);
    
    return totalScore;
  };

  const calculateFmcsaScore = (formData: FormData): number => {
    if (!formData.fmcsa_verified) return 0;
    
    switch (formData.fmcsa_safety_rating) {
      case 'satisfactory':
        return 20;
      case 'conditional':
        return 15;
      default:
        return 10;
    }
  };

  const calculateTinScore = (formData: FormData): number => {
    return formData.tin_verified ? 15 : 0;
  };

  const calculateProfileScore = (formData: FormData): number => {
    let score = 0;
    
    if (formData.legal_business_name) score += 3;
    if (formData.ein_tin) score += 3;
    if (formData.dot_number || formData.mc_number) score += 2;
    if (formData.dba_name) score += 2;
    
    return Math.min(score, 10);
  };

  const calculateDocumentScore = (formData: FormData): number => {
    let score = 0;
    
    if (formData.w9_url) score += 5;
    if (formData.business_license_url) score += 5;
    
    return Math.min(score, 10);
  };

  const calculateInsuranceScore = (formData: FormData): number => {
    let score = 0;
    
    formData.insurance_certificates.forEach(cert => {
      switch (cert.insurance_type) {
        case 'auto_liability':
          if (cert.coverage_amount >= 1000000) score += 10;
          else if (cert.coverage_amount >= 750000) score += 8;
          else if (cert.coverage_amount >= 500000) score += 5;
          break;
        case 'cargo':
          if (cert.coverage_amount >= 100000) score += 5;
          else if (cert.coverage_amount >= 50000) score += 3;
          break;
        case 'general_liability':
          if (cert.coverage_amount >= 1000000) score += 5;
          else if (cert.coverage_amount >= 500000) score += 3;
          break;
      }
    });
    
    return Math.min(score, 20);
  };

  const calculateLegalScore = (formData: FormData): number => {
    const signedAgreements = formData.legal_agreements.filter(agreement => agreement.signed).length;
    
    if (signedAgreements >= 3) return 10;
    if (signedAgreements >= 1) return 5;
    return 0;
  };

  const calculateSafetyScore = (formData: FormData): number => {
    switch (formData.safety_rating) {
      case 'satisfactory':
        return 10;
      case 'conditional':
        return 5;
      default:
        return 0;
    }
  };

  const calculateEquipmentScore = (formData: FormData): number => {
    return formData.equipment_count > 0 ? 5 : 0;
  };

  const calculatePaymentScore = (formData: FormData): number => {
    let score = 0;
    
    if (formData.voided_check_url) score += 3;
    if (formData.factoring_letter_url) score += 2;
    
    return Math.min(score, 5);
  };

  const calculateTechnologyScore = (formData: FormData): number => {
    let score = 0;
    
    if (formData.has_eld) score += 5;
    if (formData.has_gps_tracking) score += 5;
    
    return Math.min(score, 10);
  };

  const calculateOptionalScore = (formData: FormData): number => {
    return formData.driver_qualification_file_url ? 5 : 0;
  };

  const determineRiskLevel = (totalScore: number): 'low' | 'medium' | 'high' => {
    if (totalScore >= 100) return 'low';
    if (totalScore >= 70) return 'medium';
    return 'high';
  };

  const determineApprovalStatus = (totalScore: number): 'pending' | 'auto_approved' | 'manual_review' | 'rejected' => {
    if (totalScore >= 100) return 'auto_approved';
    if (totalScore >= 70) return 'manual_review';
    return 'rejected';
  };

  const saveScoreToDatabase = async (scoreData: ComplianceScore) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('compliance_scoring')
        .upsert({
          user_id: user.id,
          total_score: scoreData.totalScore,
          fmcsa_match_score: scoreData.categoryScores.fmcsaMatch,
          tin_verified_score: scoreData.categoryScores.tinVerified,
          company_profile_score: scoreData.categoryScores.companyProfile,
          document_uploads_score: scoreData.categoryScores.documentUploads,
          insurance_verification_score: scoreData.categoryScores.insuranceVerification,
          legal_consent_score: scoreData.categoryScores.legalConsent,
          safety_record_score: scoreData.categoryScores.safetyRecord,
          equipment_drivers_score: scoreData.categoryScores.equipmentDrivers,
          payment_info_score: scoreData.categoryScores.paymentInfo,
          technology_compliance_score: scoreData.categoryScores.technologyCompliance,
          optional_addons_score: scoreData.categoryScores.optionalAddons,
          risk_level: scoreData.riskLevel,
          approval_status: scoreData.approvalStatus,
          last_scored_at: scoreData.lastCalculated.toISOString()
        });

      if (error) {
        console.error('Error saving compliance score:', error);
      }
    } catch (error) {
      console.error('Error saving compliance score:', error);
    }
  };

  const loadScoreFromDatabase = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('compliance_scoring')
        .select('*')
        .eq('user_id', user.id)
        .order('last_scored_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading compliance score:', error);
        return;
      }

      if (data) {
        setScore({
          totalScore: data.total_score,
          categoryScores: {
            fmcsaMatch: data.fmcsa_match_score,
            tinVerified: data.tin_verified_score,
            companyProfile: data.company_profile_score,
            documentUploads: data.document_uploads_score,
            insuranceVerification: data.insurance_verification_score,
            legalConsent: data.legal_consent_score,
            safetyRecord: data.safety_record_score,
            equipmentDrivers: data.equipment_drivers_score,
            paymentInfo: data.payment_info_score,
            technologyCompliance: data.technology_compliance_score,
            optionalAddons: data.optional_addons_score
          },
          riskLevel: data.risk_level,
          approvalStatus: data.approval_status,
          lastCalculated: new Date(data.last_scored_at)
        });
      }
    } catch (error) {
      console.error('Error loading compliance score:', error);
    }
  }, [supabase]);

  useEffect(() => {
    loadScoreFromDatabase();
  }, [loadScoreFromDatabase]);

  return {
    score: score.totalScore,
    categoryScores: score.categoryScores,
    riskLevel: score.riskLevel,
    approvalStatus: score.approvalStatus,
    calculateScore,
    loadScoreFromDatabase
  };
};
