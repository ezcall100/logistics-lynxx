import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

interface AdminReview {
  id: string;
  companyProfileId: string;
  reviewType: 'manual_approval' | 'insurance_review' | 'legal_audit' | 'compliance_check';
  reviewReason: string;
  reviewPriority: 'low' | 'normal' | 'high' | 'urgent';
  reviewStatus: 'pending' | 'in_progress' | 'completed' | 'escalated';
  assignedTo?: string;
  assignedAt?: Date;
  reviewNotes?: string;
  reviewDecision?: 'approved' | 'rejected' | 'requires_changes';
  createdAt: Date;
  completedAt?: Date;
  companyName: string;
  totalScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface FormData {
  legal_business_name: string;
  total_score: number;
  risk_level: string;
  [key: string]: string | number | boolean;
}

export const useAdminFlagging = () => {
  const [adminReviews, setAdminReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!
  );

  const flagForReview = async (formData: FormData, reason: string): Promise<string> => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get company profile ID
      const { data: companyProfile, error: profileError } = await supabase
        .from('company_profile')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching company profile:', profileError);
        throw new Error('Company profile not found');
      }

      // Determine review type and priority based on score and risk level
      const reviewType = determineReviewType(formData);
      const reviewPriority = determineReviewPriority(formData.total_score, formData.risk_level);

      // Create admin review entry
      const { data: reviewData, error: reviewError } = await supabase
        .from('admin_review_queue')
        .insert({
          company_profile_id: companyProfile.id,
          review_type: reviewType,
          review_reason: reason,
          review_priority: reviewPriority,
          review_status: 'pending'
        })
        .select()
        .single();

      if (reviewError) {
        console.error('Error creating admin review:', reviewError);
        throw new Error('Failed to create admin review');
      }

      // Update company profile status
      await supabase
        .from('company_profile')
        .update({ onboarding_status: 'in_progress' })
        .eq('id', companyProfile.id);

      // Add to local state
      const newReview: AdminReview = {
        id: reviewData.id,
        companyProfileId: companyProfile.id,
        reviewType: reviewData.review_type,
        reviewReason: reviewData.review_reason,
        reviewPriority: reviewData.review_priority,
        reviewStatus: reviewData.review_status,
        createdAt: new Date(reviewData.created_at),
        companyName: formData.legal_business_name,
        totalScore: formData.total_score,
        riskLevel: formData.risk_level
      };

      setAdminReviews(prev => [newReview, ...prev]);

      return reviewData.id;
    } catch (error) {
      console.error('Error flagging for review:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const determineReviewType = (formData: FormData): 'manual_approval' | 'insurance_review' | 'legal_audit' | 'compliance_check' => {
    // Check for specific issues that require different review types
    if (formData.total_score < 70) {
      return 'compliance_check';
    }
    
    if (formData.risk_level === 'high') {
      return 'legal_audit';
    }
    
    // Check if insurance documents are missing or insufficient
    if (!formData.insurance_certificates || formData.insurance_certificates.length === 0) {
      return 'insurance_review';
    }
    
    return 'manual_approval';
  };

  const determineReviewPriority = (totalScore: number, riskLevel: string): 'low' | 'normal' | 'high' | 'urgent' => {
    if (totalScore < 50 || riskLevel === 'high') {
      return 'urgent';
    }
    
    if (totalScore < 70 || riskLevel === 'medium') {
      return 'high';
    }
    
    if (totalScore < 85) {
      return 'normal';
    }
    
    return 'low';
  };

  const assignReview = async (reviewId: string, assignedTo: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('admin_review_queue')
        .update({
          assigned_to: assignedTo,
          assigned_at: new Date().toISOString(),
          review_status: 'in_progress'
        })
        .eq('id', reviewId);

      if (error) {
        console.error('Error assigning review:', error);
        throw error;
      }

      // Update local state
      setAdminReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                assignedTo, 
                assignedAt: new Date(), 
                reviewStatus: 'in_progress' 
              }
            : review
        )
      );
    } catch (error) {
      console.error('Error assigning review:', error);
      throw error;
    }
  };

  const updateReviewStatus = async (
    reviewId: string, 
    status: 'pending' | 'in_progress' | 'completed' | 'escalated',
    notes?: string,
    decision?: 'approved' | 'rejected' | 'requires_changes'
  ): Promise<void> => {
    try {
      const updateData: {
        review_status: string;
        updated_at: string;
        review_notes?: string;
        review_decision?: string;
        completed_at?: string;
      } = {
        review_status: status,
        updated_at: new Date().toISOString()
      };

      if (notes) updateData.review_notes = notes;
      if (decision) updateData.review_decision = decision;
      if (status === 'completed') updateData.completed_at = new Date().toISOString();

      const { error } = await supabase
        .from('admin_review_queue')
        .update(updateData)
        .eq('id', reviewId);

      if (error) {
        console.error('Error updating review status:', error);
        throw error;
      }

      // Update local state
      setAdminReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                reviewStatus: status,
                reviewNotes: notes,
                reviewDecision: decision,
                completedAt: status === 'completed' ? new Date() : review.completedAt
              }
            : review
        )
      );

      // If review is completed, update company profile status
      if (status === 'completed' && decision) {
        await updateCompanyProfileStatus(reviewId, decision);
      }
    } catch (error) {
      console.error('Error updating review status:', error);
      throw error;
    }
  };

  const updateCompanyProfileStatus = async (reviewId: string, decision: string): Promise<void> => {
    try {
      const { data: review } = await supabase
        .from('admin_review_queue')
        .select('company_profile_id')
        .eq('id', reviewId)
        .single();

      if (!review) return;

      const newStatus = decision === 'approved' ? 'approved' : 'rejected';

      const { error } = await supabase
        .from('company_profile')
        .update({ onboarding_status: newStatus })
        .eq('id', review.company_profile_id);

      if (error) {
        console.error('Error updating company profile status:', error);
      }
    } catch (error) {
      console.error('Error updating company profile status:', error);
    }
  };

  const loadAdminReviews = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (!profile || !['super_admin', 'broker_admin'].includes(profile.role)) {
        console.log('User is not authorized to view admin reviews');
        return;
      }

      const { data, error } = await supabase
        .from('admin_review_queue')
        .select(`
          *,
          company_profile!inner(
            legal_business_name,
            onboarding_score,
            risk_level
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading admin reviews:', error);
        return;
      }

      const reviews: AdminReview[] = data?.map(review => ({
        id: review.id,
        companyProfileId: review.company_profile_id,
        reviewType: review.review_type,
        reviewReason: review.review_reason,
        reviewPriority: review.review_priority,
        reviewStatus: review.review_status,
        assignedTo: review.assigned_to,
        assignedAt: review.assigned_at ? new Date(review.assigned_at) : undefined,
        reviewNotes: review.review_notes,
        reviewDecision: review.review_decision,
        createdAt: new Date(review.created_at),
        completedAt: review.completed_at ? new Date(review.completed_at) : undefined,
        companyName: review.company_profile?.legal_business_name || 'Unknown Company',
        totalScore: review.company_profile?.onboarding_score || 0,
        riskLevel: review.company_profile?.risk_level || 'medium'
      })) || [];

      setAdminReviews(reviews);
    } catch (error) {
      console.error('Error loading admin reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const getPendingReviews = (): AdminReview[] => {
    return adminReviews.filter(review => review.reviewStatus === 'pending');
  };

  const getAssignedReviews = (userId: string): AdminReview[] => {
    return adminReviews.filter(review => 
      review.assignedTo === userId && review.reviewStatus === 'in_progress'
    );
  };

  const getUrgentReviews = (): AdminReview[] => {
    return adminReviews.filter(review => 
      review.reviewPriority === 'urgent' && review.reviewStatus !== 'completed'
    );
  };

  const getReviewsByType = (type: string): AdminReview[] => {
    return adminReviews.filter(review => review.reviewType === type);
  };

  const getReviewsByStatus = (status: string): AdminReview[] => {
    return adminReviews.filter(review => review.reviewStatus === status);
  };

  const getReviewStats = () => {
    const total = adminReviews.length;
    const pending = adminReviews.filter(r => r.reviewStatus === 'pending').length;
    const inProgress = adminReviews.filter(r => r.reviewStatus === 'in_progress').length;
    const completed = adminReviews.filter(r => r.reviewStatus === 'completed').length;
    const urgent = adminReviews.filter(r => r.reviewPriority === 'urgent').length;

    return {
      total,
      pending,
      inProgress,
      completed,
      urgent,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  useEffect(() => {
    loadAdminReviews();
  }, [loadAdminReviews]);

  return {
    adminReviews,
    isLoading,
    flagForReview,
    assignReview,
    updateReviewStatus,
    loadAdminReviews,
    getPendingReviews,
    getAssignedReviews,
    getUrgentReviews,
    getReviewsByType,
    getReviewsByStatus,
    getReviewStats
  };
};

export default useAdminFlagging;