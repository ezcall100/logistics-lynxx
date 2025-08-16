/* eslint-disable @typescript-eslint/no-explicit-any */
export type FlagScope = 'global' | 'env' | 'tenant';

export type FeatureFlag = {
  id: string;
  key: string;
  scope: FlagScope;
  env?: string | null;
  company_id?: string | null;
  value: boolean;
  payload: Record<string, unknown>;
  reason?: string | null;
  owner_user?: string | null;
  owner_name?: string | null;
  expires_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type ResolvedFlag = {
  key: string;
  value: boolean;
  payload: Record<string, unknown>;
  resolved_scope: FlagScope;
  source_id: string;
  expires_at: string | null;
};
