-- Create broker_rates table to handle broker buy/sell rates with carrier integration
CREATE TABLE IF NOT EXISTS public.broker_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broker_rate_id TEXT UNIQUE NOT NULL,
  carrier_rate_id UUID REFERENCES public.carrier_rates(id) ON DELETE SET NULL,
  customer_id UUID,
  carrier_id UUID,
  rate_type TEXT NOT NULL CHECK (rate_type IN ('buy', 'sell')),
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  carrier_rate NUMERIC(10,2), -- The rate from carrier
  broker_rate NUMERIC(10,2) NOT NULL, -- Broker's buy/sell rate
  margin_amount NUMERIC(10,2) DEFAULT 0,
  margin_percentage NUMERIC(5,2) DEFAULT 0,
  fuel_surcharge_rate NUMERIC(5,2) DEFAULT 0,
  accessorial_rates JSONB DEFAULT '{}',
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  auto_margin_enabled BOOLEAN DEFAULT true,
  min_margin_percentage NUMERIC(5,2) DEFAULT 10,
  max_margin_percentage NUMERIC(5,2) DEFAULT 30,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create rate_integration_settings table for carrier-broker integration settings
CREATE TABLE IF NOT EXISTS public.rate_integration_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id UUID NOT NULL,
  broker_id UUID NOT NULL,
  auto_sync_enabled BOOLEAN DEFAULT true,
  default_margin_percentage NUMERIC(5,2) DEFAULT 15,
  min_margin_percentage NUMERIC(5,2) DEFAULT 10,
  max_margin_percentage NUMERIC(5,2) DEFAULT 30,
  auto_approval_threshold NUMERIC(10,2) DEFAULT 5000,
  integration_status TEXT DEFAULT 'active' CHECK (integration_status IN ('active', 'inactive', 'pending')),
  sync_frequency TEXT DEFAULT 'real_time' CHECK (sync_frequency IN ('real_time', 'hourly', 'daily')),
  last_sync TIMESTAMP WITH TIME ZONE,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create rate_transactions table to track rate exchanges between carriers and brokers
CREATE TABLE IF NOT EXISTS public.rate_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT UNIQUE NOT NULL,
  carrier_rate_id UUID REFERENCES public.carrier_rates(id),
  broker_rate_id UUID REFERENCES public.broker_rates(id),
  carrier_id UUID NOT NULL,
  broker_id UUID NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('rate_quote', 'rate_acceptance', 'rate_negotiation', 'margin_adjustment')),
  original_rate NUMERIC(10,2) NOT NULL,
  negotiated_rate NUMERIC(10,2),
  margin_applied NUMERIC(5,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'negotiating')),
  notes TEXT,
  initiated_by UUID,
  responded_by UUID,
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.broker_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_integration_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for broker_rates
CREATE POLICY "Broker admins can manage broker rates" ON public.broker_rates
  FOR ALL USING (
    is_authenticated_user() AND (
      has_role(auth.uid(), 'super_admin'::app_role) OR 
      has_role(auth.uid(), 'freight_broker_admin'::app_role)
    )
  );

CREATE POLICY "Carrier admins can view relevant broker rates" ON public.broker_rates
  FOR SELECT USING (
    is_authenticated_user() AND 
    has_role(auth.uid(), 'carrier_admin'::app_role)
  );

-- Create RLS policies for rate_integration_settings
CREATE POLICY "Admins can manage integration settings" ON public.rate_integration_settings
  FOR ALL USING (
    is_authenticated_user() AND (
      has_role(auth.uid(), 'super_admin'::app_role) OR 
      has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
      has_role(auth.uid(), 'carrier_admin'::app_role)
    )
  );

-- Create RLS policies for rate_transactions
CREATE POLICY "Authorized users can manage rate transactions" ON public.rate_transactions
  FOR ALL USING (
    is_authenticated_user() AND (
      has_role(auth.uid(), 'super_admin'::app_role) OR 
      has_role(auth.uid(), 'freight_broker_admin'::app_role) OR
      has_role(auth.uid(), 'carrier_admin'::app_role)
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_broker_rates_carrier_rate_id ON public.broker_rates(carrier_rate_id);
CREATE INDEX IF NOT EXISTS idx_broker_rates_rate_type ON public.broker_rates(rate_type);
CREATE INDEX IF NOT EXISTS idx_broker_rates_status ON public.broker_rates(status);
CREATE INDEX IF NOT EXISTS idx_rate_integration_settings_carrier_broker ON public.rate_integration_settings(carrier_id, broker_id);
CREATE INDEX IF NOT EXISTS idx_rate_transactions_carrier_broker ON public.rate_transactions(carrier_id, broker_id);
CREATE INDEX IF NOT EXISTS idx_rate_transactions_status ON public.rate_transactions(status);

-- Create function to automatically calculate margins
CREATE OR REPLACE FUNCTION calculate_broker_margin(
  carrier_rate_amount NUMERIC,
  margin_percentage NUMERIC DEFAULT 15
) RETURNS NUMERIC AS $$
BEGIN
  RETURN ROUND(carrier_rate_amount * (1 + margin_percentage / 100), 2);
END;
$$ LANGUAGE plpgsql;

-- Create function to sync carrier rates to broker buy rates
CREATE OR REPLACE FUNCTION sync_carrier_to_broker_rates()
RETURNS TRIGGER AS $$
DECLARE
  integration_setting RECORD;
  new_broker_rate NUMERIC;
BEGIN
  -- Get integration settings for this carrier
  SELECT * INTO integration_setting 
  FROM rate_integration_settings 
  WHERE carrier_id = NEW.company_id 
    AND auto_sync_enabled = true 
    AND integration_status = 'active'
  LIMIT 1;
  
  IF integration_setting IS NOT NULL THEN
    -- Calculate broker buy rate with margin
    new_broker_rate := calculate_broker_margin(
      NEW.rate_per_mile, 
      integration_setting.default_margin_percentage
    );
    
    -- Insert or update broker buy rate
    INSERT INTO broker_rates (
      broker_rate_id,
      carrier_rate_id,
      carrier_id,
      rate_type,
      origin_city,
      origin_state,
      destination_city,
      destination_state,
      equipment_type,
      carrier_rate,
      broker_rate,
      margin_amount,
      margin_percentage,
      effective_date,
      expiry_date,
      created_by
    ) VALUES (
      'BR-' || NEW.id::text,
      NEW.id,
      NEW.company_id,
      'buy',
      SPLIT_PART(NEW.origin_zone, ',', 1),
      SPLIT_PART(NEW.origin_zone, ',', 2),
      SPLIT_PART(NEW.destination_zone, ',', 1),
      SPLIT_PART(NEW.destination_zone, ',', 2),
      NEW.equipment_type,
      NEW.rate_per_mile,
      new_broker_rate,
      new_broker_rate - NEW.rate_per_mile,
      integration_setting.default_margin_percentage,
      NEW.effective_date,
      NEW.expiry_date,
      NEW.created_by
    ) ON CONFLICT (broker_rate_id) DO UPDATE SET
      carrier_rate = NEW.rate_per_mile,
      broker_rate = new_broker_rate,
      margin_amount = new_broker_rate - NEW.rate_per_mile,
      updated_at = now();
      
    -- Update last sync time
    UPDATE rate_integration_settings 
    SET last_sync = now() 
    WHERE id = integration_setting.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-sync carrier rates to broker rates
CREATE TRIGGER trigger_sync_carrier_to_broker_rates
  AFTER INSERT OR UPDATE ON carrier_rates
  FOR EACH ROW
  EXECUTE FUNCTION sync_carrier_to_broker_rates();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_broker_rates_updated_at
  BEFORE UPDATE ON broker_rates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rate_integration_settings_updated_at
  BEFORE UPDATE ON rate_integration_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();