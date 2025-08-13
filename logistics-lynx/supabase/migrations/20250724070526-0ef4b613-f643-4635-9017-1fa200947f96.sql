-- Enable RLS on all new tables
ALTER TABLE public.dashboard_widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipment_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.load_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.asset_maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

-- =================================
-- DASHBOARD WIDGETS POLICIES
-- =================================
CREATE POLICY "Admins can manage dashboard widgets"
ON public.dashboard_widgets
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- DASHBOARD CONFIGURATIONS POLICIES
-- =================================
CREATE POLICY "Users can manage their own dashboard configurations"
ON public.dashboard_configurations
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Super admins can view all dashboard configurations"
ON public.dashboard_configurations
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- =================================
-- SHIPMENTS POLICIES
-- =================================
CREATE POLICY "Super admins can manage all shipments"
ON public.shipments
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Broker admins can manage all shipments"
ON public.shipments
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'freight_broker_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'freight_broker_admin'::app_role));

CREATE POLICY "Carrier admins can view and update their shipments"
ON public.shipments
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  (carrier_id IN (SELECT id FROM public.companies WHERE type = 'carrier'))
)
WITH CHECK (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  (carrier_id IN (SELECT id FROM public.companies WHERE type = 'carrier'))
);

CREATE POLICY "Shipper admins can manage their shipments"
ON public.shipments
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  (shipper_id IN (SELECT id FROM public.companies WHERE type = 'shipper'))
)
WITH CHECK (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  (shipper_id IN (SELECT id FROM public.companies WHERE type = 'shipper'))
);

-- =================================
-- SHIPMENT TRACKING POLICIES
-- =================================
CREATE POLICY "Admins and drivers can manage shipment tracking"
ON public.shipment_tracking
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role) OR
  has_role(auth.uid(), 'driver'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role) OR
  has_role(auth.uid(), 'driver'::app_role)
);

-- =================================
-- LOADS POLICIES
-- =================================
CREATE POLICY "Super admins can manage all loads"
ON public.loads
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Broker admins can manage all loads"
ON public.loads
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'freight_broker_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'freight_broker_admin'::app_role));

CREATE POLICY "Carrier admins can view loads"
ON public.loads
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'carrier_admin'::app_role));

CREATE POLICY "Shipper admins can manage their loads"
ON public.loads
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  (shipper_id IN (SELECT id FROM public.companies WHERE type = 'shipper'))
)
WITH CHECK (
  has_role(auth.uid(), 'shipper_admin'::app_role) AND
  (shipper_id IN (SELECT id FROM public.companies WHERE type = 'shipper'))
);

-- =================================
-- LOAD BIDS POLICIES
-- =================================
CREATE POLICY "Admins can manage load bids"
ON public.load_bids
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- NETWORK PARTNERS POLICIES
-- =================================
CREATE POLICY "Admins can manage network partners"
ON public.network_partners
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- ASSETS POLICIES
-- =================================
CREATE POLICY "Super admins can manage all assets"
ON public.assets
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Carrier admins can manage their assets"
ON public.assets
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
)
WITH CHECK (
  has_role(auth.uid(), 'carrier_admin'::app_role) AND
  company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
);

CREATE POLICY "Broker admins can view assets"
ON public.assets
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'freight_broker_admin'::app_role));

-- =================================
-- ASSET MAINTENANCE POLICIES
-- =================================
CREATE POLICY "Asset owners can manage maintenance"
ON public.asset_maintenance
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    EXISTS (
      SELECT 1 FROM public.assets a 
      WHERE a.id = asset_maintenance.asset_id 
      AND a.company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
    )
  )
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    EXISTS (
      SELECT 1 FROM public.assets a 
      WHERE a.id = asset_maintenance.asset_id 
      AND a.company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
    )
  )
);

-- =================================
-- QUOTES POLICIES
-- =================================
CREATE POLICY "Admins can manage quotes"
ON public.quotes
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- WORKERS POLICIES
-- =================================
CREATE POLICY "Super admins can manage all workers"
ON public.workers
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Company admins can manage their workers"
ON public.workers
FOR ALL
TO authenticated
USING (
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
  ) OR
  (
    has_role(auth.uid(), 'freight_broker_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'broker')
  ) OR
  (
    has_role(auth.uid(), 'shipper_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'shipper')
  )
)
WITH CHECK (
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
  ) OR
  (
    has_role(auth.uid(), 'freight_broker_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'broker')
  ) OR
  (
    has_role(auth.uid(), 'shipper_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'shipper')
  )
);

-- =================================
-- DOCUMENTS POLICIES
-- =================================
CREATE POLICY "Admins can manage documents"
ON public.documents
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- MARKETPLACE POLICIES
-- =================================
CREATE POLICY "Admins can manage marketplace listings"
ON public.marketplace_listings
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- REPORTS POLICIES
-- =================================
CREATE POLICY "Admins can manage reports"
ON public.reports
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- INVOICES POLICIES
-- =================================
CREATE POLICY "Admins can manage invoices"
ON public.invoices
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- PAYMENTS POLICIES
-- =================================
CREATE POLICY "Admins can manage payments"
ON public.payments
FOR ALL
TO authenticated
USING (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'super_admin'::app_role) OR
  has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
  has_role(auth.uid(), 'carrier_admin'::app_role) OR
  has_role(auth.uid(), 'shipper_admin'::app_role)
);

-- =================================
-- API KEYS POLICIES
-- =================================
CREATE POLICY "Super admins can manage all API keys"
ON public.api_keys
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Company admins can manage their API keys"
ON public.api_keys
FOR ALL
TO authenticated
USING (
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
  ) OR
  (
    has_role(auth.uid(), 'freight_broker_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'broker')
  ) OR
  (
    has_role(auth.uid(), 'shipper_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'shipper')
  )
)
WITH CHECK (
  (
    has_role(auth.uid(), 'carrier_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
  ) OR
  (
    has_role(auth.uid(), 'freight_broker_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'broker')
  ) OR
  (
    has_role(auth.uid(), 'shipper_admin'::app_role) AND
    company_id IN (SELECT id FROM public.companies WHERE type = 'shipper')
  )
);

-- =================================
-- API USAGE LOGS POLICIES
-- =================================
CREATE POLICY "Super admins can view all API usage logs"
ON public.api_usage_logs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Company admins can view their API usage logs"
ON public.api_usage_logs
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.api_keys ak 
    WHERE ak.id = api_usage_logs.api_key_id 
    AND (
      (
        has_role(auth.uid(), 'carrier_admin'::app_role) AND
        ak.company_id IN (SELECT id FROM public.companies WHERE type = 'carrier')
      ) OR
      (
        has_role(auth.uid(), 'freight_broker_admin'::app_role) AND
        ak.company_id IN (SELECT id FROM public.companies WHERE type = 'broker')
      ) OR
      (
        has_role(auth.uid(), 'shipper_admin'::app_role) AND
        ak.company_id IN (SELECT id FROM public.companies WHERE type = 'shipper')
      )
    )
  )
);

CREATE POLICY "System can insert API usage logs"
ON public.api_usage_logs
FOR INSERT
TO authenticated
WITH CHECK (true);