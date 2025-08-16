-- Create website_improvements table for storing improvement suggestions
CREATE TABLE public.website_improvements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('ui', 'performance', 'seo', 'accessibility', 'security', 'content', 'functionality')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  impact TEXT NOT NULL CHECK (impact IN ('low', 'medium', 'high')),
  estimated_effort INTEGER NOT NULL, -- hours
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  agent_id TEXT NOT NULL,
  portal TEXT,
  metrics JSONB,
  created_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX idx_website_improvements_type ON public.website_improvements(type);
CREATE INDEX idx_website_improvements_priority ON public.website_improvements(priority);
CREATE INDEX idx_website_improvements_status ON public.website_improvements(status);
CREATE INDEX idx_website_improvements_agent_id ON public.website_improvements(agent_id);
CREATE INDEX idx_website_improvements_created_at ON public.website_improvements(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.website_improvements ENABLE ROW LEVEL SECURITY;

-- Create policies for website improvements
CREATE POLICY "Allow read access to website improvements" 
  ON public.website_improvements 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow insert access to website improvements" 
  ON public.website_improvements 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow update access to website improvements" 
  ON public.website_improvements 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow delete access to website improvements" 
  ON public.website_improvements 
  FOR DELETE 
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_website_improvements_updated_at 
  BEFORE UPDATE ON public.website_improvements 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample improvements
INSERT INTO public.website_improvements (
  type, title, description, priority, impact, estimated_effort, agent_id
) VALUES 
  ('performance', 'Optimize Image Loading', 'Implement lazy loading and WebP format for faster image loading', 'high', 'high', 3, 'website-improvement-agent'),
  ('seo', 'Add Meta Descriptions', 'Add missing meta descriptions to improve search engine visibility', 'medium', 'medium', 2, 'website-improvement-agent'),
  ('accessibility', 'Improve Color Contrast', 'Enhance color contrast ratios for better accessibility compliance', 'high', 'high', 2, 'website-improvement-agent'),
  ('ui', 'Modernize Button Design', 'Update button styles with modern design patterns and micro-interactions', 'medium', 'medium', 4, 'website-improvement-agent'),
  ('security', 'Implement CSP Headers', 'Add Content Security Policy headers to enhance security', 'critical', 'high', 3, 'website-improvement-agent'),
  ('content', 'Optimize Content Structure', 'Improve content hierarchy and readability with better typography', 'medium', 'medium', 5, 'website-improvement-agent'),
  ('functionality', 'Add Search Feature', 'Implement site-wide search functionality for better user experience', 'high', 'high', 6, 'website-improvement-agent'),
  ('performance', 'Enable Code Splitting', 'Implement dynamic imports and code splitting for faster initial load', 'high', 'high', 4, 'website-improvement-agent'),
  ('seo', 'Optimize URL Structure', 'Improve URL structure for better SEO and user experience', 'medium', 'medium', 3, 'website-improvement-agent'),
  ('accessibility', 'Add ARIA Labels', 'Implement proper ARIA labels for screen reader compatibility', 'high', 'high', 2, 'website-improvement-agent');
