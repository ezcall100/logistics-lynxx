export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agent_decisions: {
        Row: {
          agent_id: string | null
          confidence: number | null
          context: Json | null
          created_at: string | null
          decision: Json | null
          decision_type: string
          id: string
          reasoning: string | null
        }
        Insert: {
          agent_id?: string | null
          confidence?: number | null
          context?: Json | null
          created_at?: string | null
          decision?: Json | null
          decision_type: string
          id?: string
          reasoning?: string | null
        }
        Update: {
          agent_id?: string | null
          confidence?: number | null
          context?: Json | null
          created_at?: string | null
          decision?: Json | null
          decision_type?: string
          id?: string
          reasoning?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_decisions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_registry"
            referencedColumns: ["agent_id"]
          },
        ]
      }
      agent_events: {
        Row: {
          agent_id: string | null
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          severity: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          severity?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_events_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_registry"
            referencedColumns: ["agent_id"]
          },
        ]
      }
      agent_health_checks: {
        Row: {
          agent_type: string
          created_at: string
          id: string
          message: string | null
          response_time: number | null
          status: string
          timestamp: string
        }
        Insert: {
          agent_type: string
          created_at?: string
          id?: string
          message?: string | null
          response_time?: number | null
          status: string
          timestamp?: string
        }
        Update: {
          agent_type?: string
          created_at?: string
          id?: string
          message?: string | null
          response_time?: number | null
          status?: string
          timestamp?: string
        }
        Relationships: []
      }
      agent_memory: {
        Row: {
          action_taken: string | null
          agent_id: string
          confidence: number | null
          context: Json | null
          created_at: string
          goal: string
          id: string
          outcome: string | null
          prompt: string
          response: string
        }
        Insert: {
          action_taken?: string | null
          agent_id: string
          confidence?: number | null
          context?: Json | null
          created_at?: string
          goal: string
          id?: string
          outcome?: string | null
          prompt: string
          response: string
        }
        Update: {
          action_taken?: string | null
          agent_id?: string
          confidence?: number | null
          context?: Json | null
          created_at?: string
          goal?: string
          id?: string
          outcome?: string | null
          prompt?: string
          response?: string
        }
        Relationships: []
      }
      agent_registry: {
        Row: {
          agent_id: string
          capabilities: Json | null
          configuration: Json | null
          created_at: string | null
          id: string
          last_heartbeat: string | null
          name: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          agent_id: string
          capabilities?: Json | null
          configuration?: Json | null
          created_at?: string | null
          id?: string
          last_heartbeat?: string | null
          name: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string
          capabilities?: Json | null
          configuration?: Json | null
          created_at?: string | null
          id?: string
          last_heartbeat?: string | null
          name?: string
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      agent_status_logs: {
        Row: {
          agent_id: string
          agent_type: string
          created_at: string
          id: string
          message: string | null
          response_time: number | null
          status: string
          timestamp: string
        }
        Insert: {
          agent_id: string
          agent_type: string
          created_at?: string
          id?: string
          message?: string | null
          response_time?: number | null
          status: string
          timestamp?: string
        }
        Update: {
          agent_id?: string
          agent_type?: string
          created_at?: string
          id?: string
          message?: string | null
          response_time?: number | null
          status?: string
          timestamp?: string
        }
        Relationships: []
      }
      agent_tasks: {
        Row: {
          agent_id: string | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          payload: Json | null
          priority: number | null
          result: Json | null
          started_at: string | null
          status: string | null
          task_type: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          payload?: Json | null
          priority?: number | null
          result?: Json | null
          started_at?: string | null
          status?: string | null
          task_type: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          payload?: Json | null
          priority?: number | null
          result?: Json | null
          started_at?: string | null
          status?: string | null
          task_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_tasks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agent_registry"
            referencedColumns: ["agent_id"]
          },
        ]
      }
      agents: {
        Row: {
          active_loads_limit: number | null
          agent_type: string | null
          certification_details: Json | null
          commission_rate: number | null
          created_at: string
          current_load_count: number | null
          employee_id: string | null
          id: string
          performance_metrics: Json | null
          specialization: string[] | null
          territory: Json | null
          updated_at: string
        }
        Insert: {
          active_loads_limit?: number | null
          agent_type?: string | null
          certification_details?: Json | null
          commission_rate?: number | null
          created_at?: string
          current_load_count?: number | null
          employee_id?: string | null
          id?: string
          performance_metrics?: Json | null
          specialization?: string[] | null
          territory?: Json | null
          updated_at?: string
        }
        Update: {
          active_loads_limit?: number | null
          agent_type?: string | null
          certification_details?: Json | null
          commission_rate?: number | null
          created_at?: string
          current_load_count?: number | null
          employee_id?: string | null
          id?: string
          performance_metrics?: Json | null
          specialization?: string[] | null
          territory?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_confidence_logs: {
        Row: {
          confidence_score: number
          context: Json | null
          created_at: string
          decision_data: Json
          decision_type: string
          flagged_for_review: boolean | null
          id: string
          reasoning: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          updated_at: string
        }
        Insert: {
          confidence_score: number
          context?: Json | null
          created_at?: string
          decision_data: Json
          decision_type: string
          flagged_for_review?: boolean | null
          id?: string
          reasoning?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          updated_at?: string
        }
        Update: {
          confidence_score?: number
          context?: Json | null
          created_at?: string
          decision_data?: Json
          decision_type?: string
          flagged_for_review?: boolean | null
          id?: string
          reasoning?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ai_decisions: {
        Row: {
          confidence_score: number | null
          context: Json
          created_at: string
          decision: Json
          decision_type: string
          id: string
          implemented: boolean | null
        }
        Insert: {
          confidence_score?: number | null
          context: Json
          created_at?: string
          decision: Json
          decision_type: string
          id?: string
          implemented?: boolean | null
        }
        Update: {
          confidence_score?: number | null
          context?: Json
          created_at?: string
          decision?: Json
          decision_type?: string
          id?: string
          implemented?: boolean | null
        }
        Relationships: []
      }
      ai_performance_metrics: {
        Row: {
          confidence_score: number | null
          created_at: string
          decision_context: Json
          feature_area: string | null
          id: string
          metric_type: string
          metric_value: number
          timestamp: string
          user_role: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          decision_context?: Json
          feature_area?: string | null
          id?: string
          metric_type: string
          metric_value: number
          timestamp?: string
          user_role?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          decision_context?: Json
          feature_area?: string | null
          id?: string
          metric_type?: string
          metric_value?: number
          timestamp?: string
          user_role?: string | null
        }
        Relationships: []
      }
      alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          category: string
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          resolved_at: string | null
          severity: string
          source: string | null
          status: string | null
          timestamp: string
          title: string
          updated_at: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          category: string
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          resolved_at?: string | null
          severity: string
          source?: string | null
          status?: string | null
          timestamp?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          category?: string
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          resolved_at?: string | null
          severity?: string
          source?: string | null
          status?: string | null
          timestamp?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      api_integrations: {
        Row: {
          api_endpoint: string | null
          api_version: string | null
          authentication_type: string | null
          configuration: Json | null
          created_at: string
          created_by: string | null
          credentials: Json | null
          error_count: number | null
          id: string
          integration_name: string
          integration_type: string
          last_sync: string | null
          provider: string
          rate_limit_info: Json | null
          status: string | null
          success_count: number | null
          sync_frequency: string | null
          updated_at: string
        }
        Insert: {
          api_endpoint?: string | null
          api_version?: string | null
          authentication_type?: string | null
          configuration?: Json | null
          created_at?: string
          created_by?: string | null
          credentials?: Json | null
          error_count?: number | null
          id?: string
          integration_name: string
          integration_type: string
          last_sync?: string | null
          provider: string
          rate_limit_info?: Json | null
          status?: string | null
          success_count?: number | null
          sync_frequency?: string | null
          updated_at?: string
        }
        Update: {
          api_endpoint?: string | null
          api_version?: string | null
          authentication_type?: string | null
          configuration?: Json | null
          created_at?: string
          created_by?: string | null
          credentials?: Json | null
          error_count?: number | null
          id?: string
          integration_name?: string
          integration_type?: string
          last_sync?: string | null
          provider?: string
          rate_limit_info?: Json | null
          status?: string | null
          success_count?: number | null
          sync_frequency?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          api_key: string
          company_id: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_name: string
          key_type: string | null
          last_used_at: string | null
          permissions: Json | null
          rate_limit_per_hour: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          company_id: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          key_type?: string | null
          last_used_at?: string | null
          permissions?: Json | null
          rate_limit_per_hour?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          key_type?: string | null
          last_used_at?: string | null
          permissions?: Json | null
          rate_limit_per_hour?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      api_logs: {
        Row: {
          created_at: string
          endpoint: string | null
          error_message: string | null
          id: string
          integration_id: string | null
          ip_address: string | null
          request_payload: Json | null
          request_type: string
          response_payload: Json | null
          response_status: number | null
          response_time_ms: number | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          endpoint?: string | null
          error_message?: string | null
          id?: string
          integration_id?: string | null
          ip_address?: string | null
          request_payload?: Json | null
          request_type: string
          response_payload?: Json | null
          response_status?: number | null
          response_time_ms?: number | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          endpoint?: string | null
          error_message?: string | null
          id?: string
          integration_id?: string | null
          ip_address?: string | null
          request_payload?: Json | null
          request_type?: string
          response_payload?: Json | null
          response_status?: number | null
          response_time_ms?: number | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_logs_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "api_integrations"
            referencedColumns: ["id"]
          },
        ]
      }
      api_usage_logs: {
        Row: {
          api_key_id: string | null
          endpoint: string
          id: string
          ip_address: string | null
          method: string
          request_data: Json | null
          response_status: number | null
          response_time_ms: number | null
          timestamp: string
          user_agent: string | null
        }
        Insert: {
          api_key_id?: string | null
          endpoint: string
          id?: string
          ip_address?: string | null
          method: string
          request_data?: Json | null
          response_status?: number | null
          response_time_ms?: number | null
          timestamp?: string
          user_agent?: string | null
        }
        Update: {
          api_key_id?: string | null
          endpoint?: string
          id?: string
          ip_address?: string | null
          method?: string
          request_data?: Json | null
          response_status?: number | null
          response_time_ms?: number | null
          timestamp?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_maintenance: {
        Row: {
          asset_id: string
          completed_date: string | null
          cost: number | null
          created_at: string
          created_by: string | null
          description: string
          documents: Json | null
          id: string
          maintenance_status: string | null
          maintenance_type: string
          notes: string | null
          scheduled_date: string | null
          service_provider: string | null
          updated_at: string
        }
        Insert: {
          asset_id: string
          completed_date?: string | null
          cost?: number | null
          created_at?: string
          created_by?: string | null
          description: string
          documents?: Json | null
          id?: string
          maintenance_status?: string | null
          maintenance_type: string
          notes?: string | null
          scheduled_date?: string | null
          service_provider?: string | null
          updated_at?: string
        }
        Update: {
          asset_id?: string
          completed_date?: string | null
          cost?: number | null
          created_at?: string
          created_by?: string | null
          description?: string
          documents?: Json | null
          id?: string
          maintenance_status?: string | null
          maintenance_type?: string
          notes?: string | null
          scheduled_date?: string | null
          service_provider?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "asset_maintenance_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_number: string
          asset_status: string | null
          asset_type: string
          assigned_driver_id: string | null
          company_id: string
          created_at: string
          created_by: string | null
          current_location: Json | null
          current_value: number | null
          id: string
          insurance_info: Json | null
          license_plate: string | null
          maintenance_schedule: Json | null
          make: string | null
          model: string | null
          purchase_date: string | null
          purchase_price: number | null
          specifications: Json | null
          updated_at: string
          vin_serial: string | null
          year: number | null
        }
        Insert: {
          asset_number: string
          asset_status?: string | null
          asset_type: string
          assigned_driver_id?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          current_location?: Json | null
          current_value?: number | null
          id?: string
          insurance_info?: Json | null
          license_plate?: string | null
          maintenance_schedule?: Json | null
          make?: string | null
          model?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          specifications?: Json | null
          updated_at?: string
          vin_serial?: string | null
          year?: number | null
        }
        Update: {
          asset_number?: string
          asset_status?: string | null
          asset_type?: string
          assigned_driver_id?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          current_location?: Json | null
          current_value?: number | null
          id?: string
          insurance_info?: Json | null
          license_plate?: string | null
          maintenance_schedule?: Json | null
          make?: string | null
          model?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          specifications?: Json | null
          updated_at?: string
          vin_serial?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      autonomous_agent_configs: {
        Row: {
          agent_id: string
          agent_name: string
          auto_execute_threshold: number
          confidence_threshold: number
          context_template: string | null
          created_at: string
          id: string
          is_active: boolean
          max_memory_items: number
          openai_enabled: boolean
          query_frequency_minutes: number
          updated_at: string
        }
        Insert: {
          agent_id: string
          agent_name: string
          auto_execute_threshold?: number
          confidence_threshold?: number
          context_template?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          max_memory_items?: number
          openai_enabled?: boolean
          query_frequency_minutes?: number
          updated_at?: string
        }
        Update: {
          agent_id?: string
          agent_name?: string
          auto_execute_threshold?: number
          confidence_threshold?: number
          context_template?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          max_memory_items?: number
          openai_enabled?: boolean
          query_frequency_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      autonomous_system_control: {
        Row: {
          auto_improvements_enabled: boolean | null
          autonomous_status: string
          control_level: string
          created_at: string | null
          id: string
          last_action: string | null
          performance_metrics: Json | null
          system_component: string
          updated_at: string | null
        }
        Insert: {
          auto_improvements_enabled?: boolean | null
          autonomous_status?: string
          control_level?: string
          created_at?: string | null
          id?: string
          last_action?: string | null
          performance_metrics?: Json | null
          system_component: string
          updated_at?: string | null
        }
        Update: {
          auto_improvements_enabled?: boolean | null
          autonomous_status?: string
          control_level?: string
          created_at?: string | null
          id?: string
          last_action?: string | null
          performance_metrics?: Json | null
          system_component?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      autonomous_tasks: {
        Row: {
          agent_type: string
          assigned_agent_id: string | null
          completed_at: string | null
          created_at: string
          dependencies: string[] | null
          description: string
          estimated_duration_minutes: number
          id: string
          portal: string
          priority: number
          result: Json | null
          started_at: string | null
          status: string
          task_id: string
          task_name: string
          updated_at: string
        }
        Insert: {
          agent_type: string
          assigned_agent_id?: string | null
          completed_at?: string | null
          created_at?: string
          dependencies?: string[] | null
          description: string
          estimated_duration_minutes?: number
          id?: string
          portal: string
          priority?: number
          result?: Json | null
          started_at?: string | null
          status?: string
          task_id: string
          task_name: string
          updated_at?: string
        }
        Update: {
          agent_type?: string
          assigned_agent_id?: string | null
          completed_at?: string | null
          created_at?: string
          dependencies?: string[] | null
          description?: string
          estimated_duration_minutes?: number
          id?: string
          portal?: string
          priority?: number
          result?: Json | null
          started_at?: string | null
          status?: string
          task_id?: string
          task_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      broker_rates: {
        Row: {
          accessorial_rates: Json | null
          auto_margin_enabled: boolean | null
          broker_rate: number
          broker_rate_id: string
          carrier_id: string | null
          carrier_rate: number | null
          carrier_rate_id: string | null
          created_at: string | null
          created_by: string | null
          customer_id: string | null
          destination_city: string
          destination_state: string
          effective_date: string
          equipment_type: string
          expiry_date: string | null
          fuel_surcharge_rate: number | null
          id: string
          margin_amount: number | null
          margin_percentage: number | null
          max_margin_percentage: number | null
          min_margin_percentage: number | null
          notes: string | null
          origin_city: string
          origin_state: string
          rate_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          accessorial_rates?: Json | null
          auto_margin_enabled?: boolean | null
          broker_rate: number
          broker_rate_id: string
          carrier_id?: string | null
          carrier_rate?: number | null
          carrier_rate_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          destination_city: string
          destination_state: string
          effective_date?: string
          equipment_type: string
          expiry_date?: string | null
          fuel_surcharge_rate?: number | null
          id?: string
          margin_amount?: number | null
          margin_percentage?: number | null
          max_margin_percentage?: number | null
          min_margin_percentage?: number | null
          notes?: string | null
          origin_city: string
          origin_state: string
          rate_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          accessorial_rates?: Json | null
          auto_margin_enabled?: boolean | null
          broker_rate?: number
          broker_rate_id?: string
          carrier_id?: string | null
          carrier_rate?: number | null
          carrier_rate_id?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_id?: string | null
          destination_city?: string
          destination_state?: string
          effective_date?: string
          equipment_type?: string
          expiry_date?: string | null
          fuel_surcharge_rate?: number | null
          id?: string
          margin_amount?: number | null
          margin_percentage?: number | null
          max_margin_percentage?: number | null
          min_margin_percentage?: number | null
          notes?: string | null
          origin_city?: string
          origin_state?: string
          rate_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broker_rates_carrier_rate_id_fkey"
            columns: ["carrier_rate_id"]
            isOneToOne: false
            referencedRelation: "carrier_rates"
            referencedColumns: ["id"]
          },
        ]
      }
      carrier_certifications: {
        Row: {
          alerts_enabled: boolean | null
          certification_number: string | null
          certification_type: string
          company_id: string
          created_at: string
          document_url: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_authority: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          alerts_enabled?: boolean | null
          certification_number?: string | null
          certification_type: string
          company_id: string
          created_at?: string
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          alerts_enabled?: boolean | null
          certification_number?: string | null
          certification_type?: string
          company_id?: string
          created_at?: string
          document_url?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "carrier_certifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      carrier_rates: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          destination_zone: string | null
          effective_date: string
          equipment_type: string | null
          expiry_date: string | null
          fuel_surcharge_rate: number | null
          id: string
          minimum_rate: number | null
          origin_zone: string | null
          rate_per_mile: number | null
          rate_type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          destination_zone?: string | null
          effective_date?: string
          equipment_type?: string | null
          expiry_date?: string | null
          fuel_surcharge_rate?: number | null
          id?: string
          minimum_rate?: number | null
          origin_zone?: string | null
          rate_per_mile?: number | null
          rate_type: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          destination_zone?: string | null
          effective_date?: string
          equipment_type?: string | null
          expiry_date?: string | null
          fuel_surcharge_rate?: number | null
          id?: string
          minimum_rate?: number | null
          origin_zone?: string | null
          rate_per_mile?: number | null
          rate_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "carrier_rates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      carrier_vehicles: {
        Row: {
          capacity_volume: number | null
          capacity_weight: number | null
          company_id: string
          created_at: string
          current_location: string | null
          driver_id: string | null
          eld_compliant: boolean | null
          fuel_type: string | null
          gps_enabled: boolean | null
          id: string
          inspection_expiry: string | null
          insurance_policy: string | null
          last_maintenance: string | null
          license_plate: string | null
          maintenance_schedule: Json | null
          make: string | null
          model: string | null
          mpg_rating: number | null
          next_maintenance: string | null
          purchase_date: string | null
          registration_expiry: string | null
          status: string | null
          updated_at: string
          vehicle_number: string
          vehicle_type: string
          vin: string | null
          year: number | null
        }
        Insert: {
          capacity_volume?: number | null
          capacity_weight?: number | null
          company_id: string
          created_at?: string
          current_location?: string | null
          driver_id?: string | null
          eld_compliant?: boolean | null
          fuel_type?: string | null
          gps_enabled?: boolean | null
          id?: string
          inspection_expiry?: string | null
          insurance_policy?: string | null
          last_maintenance?: string | null
          license_plate?: string | null
          maintenance_schedule?: Json | null
          make?: string | null
          model?: string | null
          mpg_rating?: number | null
          next_maintenance?: string | null
          purchase_date?: string | null
          registration_expiry?: string | null
          status?: string | null
          updated_at?: string
          vehicle_number: string
          vehicle_type: string
          vin?: string | null
          year?: number | null
        }
        Update: {
          capacity_volume?: number | null
          capacity_weight?: number | null
          company_id?: string
          created_at?: string
          current_location?: string | null
          driver_id?: string | null
          eld_compliant?: boolean | null
          fuel_type?: string | null
          gps_enabled?: boolean | null
          id?: string
          inspection_expiry?: string | null
          insurance_policy?: string | null
          last_maintenance?: string | null
          license_plate?: string | null
          maintenance_schedule?: Json | null
          make?: string | null
          model?: string | null
          mpg_rating?: number | null
          next_maintenance?: string | null
          purchase_date?: string | null
          registration_expiry?: string | null
          status?: string | null
          updated_at?: string
          vehicle_number?: string
          vehicle_type?: string
          vin?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "carrier_vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carrier_vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          country_id: number
          id: number
          name: string
        }
        Insert: {
          country_id: number
          id?: never
          name: string
        }
        Update: {
          country_id?: number
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          billing_information: Json | null
          compliance_documents: Json | null
          contact_information: Json | null
          contract_terms: Json | null
          created_at: string
          dot_number: string | null
          email: string | null
          fleet_size: number | null
          id: string
          insurance_expiry: string | null
          insurance_provider: string | null
          mc_number: string | null
          name: string
          onboard_date: string | null
          operating_radius: number | null
          performance_metrics: Json | null
          phone: string | null
          preferred_lanes: string[] | null
          safety_rating: string | null
          specialties: string[] | null
          status: string | null
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          billing_information?: Json | null
          compliance_documents?: Json | null
          contact_information?: Json | null
          contract_terms?: Json | null
          created_at?: string
          dot_number?: string | null
          email?: string | null
          fleet_size?: number | null
          id?: string
          insurance_expiry?: string | null
          insurance_provider?: string | null
          mc_number?: string | null
          name: string
          onboard_date?: string | null
          operating_radius?: number | null
          performance_metrics?: Json | null
          phone?: string | null
          preferred_lanes?: string[] | null
          safety_rating?: string | null
          specialties?: string[] | null
          status?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          billing_information?: Json | null
          compliance_documents?: Json | null
          contact_information?: Json | null
          contract_terms?: Json | null
          created_at?: string
          dot_number?: string | null
          email?: string | null
          fleet_size?: number | null
          id?: string
          insurance_expiry?: string | null
          insurance_provider?: string | null
          mc_number?: string | null
          name?: string
          onboard_date?: string | null
          operating_radius?: number | null
          performance_metrics?: Json | null
          phone?: string | null
          preferred_lanes?: string[] | null
          safety_rating?: string | null
          specialties?: string[] | null
          status?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      compliance_records: {
        Row: {
          compliance_status: string | null
          compliance_type: string
          created_at: string
          document_type: string | null
          document_url: string | null
          entity_id: string
          entity_type: string
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_authority: string | null
          notes: string | null
          renewal_alerts_enabled: boolean | null
          updated_at: string
          verification_status: string | null
          verified_by: string | null
          verified_date: string | null
        }
        Insert: {
          compliance_status?: string | null
          compliance_type: string
          created_at?: string
          document_type?: string | null
          document_url?: string | null
          entity_id: string
          entity_type: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          notes?: string | null
          renewal_alerts_enabled?: boolean | null
          updated_at?: string
          verification_status?: string | null
          verified_by?: string | null
          verified_date?: string | null
        }
        Update: {
          compliance_status?: string | null
          compliance_type?: string
          created_at?: string
          document_type?: string | null
          document_url?: string | null
          entity_id?: string
          entity_type?: string
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          notes?: string | null
          renewal_alerts_enabled?: boolean | null
          updated_at?: string
          verification_status?: string | null
          verified_by?: string | null
          verified_date?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: never
          name: string
        }
        Update: {
          code?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          activity_type: string
          ai_insights: Json | null
          company_id: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          lead_id: string | null
          next_action: string | null
          next_action_date: string | null
          opportunity_id: string | null
          outcome: string | null
          project_id: string | null
          status: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          activity_type: string
          ai_insights?: Json | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          lead_id?: string | null
          next_action?: string | null
          next_action_date?: string | null
          opportunity_id?: string | null
          outcome?: string | null
          project_id?: string | null
          status?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          activity_type?: string
          ai_insights?: Json | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          lead_id?: string | null
          next_action?: string | null
          next_action_date?: string | null
          opportunity_id?: string | null
          outcome?: string | null
          project_id?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "crm_opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "crm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_calendar: {
        Row: {
          all_day: boolean | null
          attendees: string[] | null
          company_id: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string
          event_type: string | null
          id: string
          lead_id: string | null
          location: string | null
          meeting_link: string | null
          opportunity_id: string | null
          project_id: string | null
          recurrence_rule: string | null
          reminder_minutes: number | null
          start_time: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          all_day?: boolean | null
          attendees?: string[] | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time: string
          event_type?: string | null
          id?: string
          lead_id?: string | null
          location?: string | null
          meeting_link?: string | null
          opportunity_id?: string | null
          project_id?: string | null
          recurrence_rule?: string | null
          reminder_minutes?: number | null
          start_time: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          all_day?: boolean | null
          attendees?: string[] | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string
          event_type?: string | null
          id?: string
          lead_id?: string | null
          location?: string | null
          meeting_link?: string | null
          opportunity_id?: string | null
          project_id?: string | null
          recurrence_rule?: string | null
          reminder_minutes?: number | null
          start_time?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_calendar_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_calendar_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_calendar_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_calendar_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "crm_opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_calendar_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "crm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_companies: {
        Row: {
          address: Json | null
          annual_revenue: number | null
          company_size: string | null
          created_at: string
          created_by: string | null
          description: string | null
          email: string | null
          employee_count: number | null
          id: string
          industry: string | null
          name: string
          phone: string | null
          social_media: Json | null
          tags: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: Json | null
          annual_revenue?: number | null
          company_size?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name: string
          phone?: string | null
          social_media?: Json | null
          tags?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: Json | null
          annual_revenue?: number | null
          company_size?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name?: string
          phone?: string | null
          social_media?: Json | null
          tags?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      crm_contacts: {
        Row: {
          company_id: string | null
          contact_source: string | null
          contact_status: string | null
          created_at: string
          created_by: string | null
          department: string | null
          email: string | null
          first_name: string
          id: string
          job_title: string | null
          last_name: string
          linkedin_url: string | null
          mobile: string | null
          notes: string | null
          phone: string | null
          photo_url: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          contact_source?: string | null
          contact_status?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          job_title?: string | null
          last_name: string
          linkedin_url?: string | null
          mobile?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          contact_source?: string | null
          contact_status?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          job_title?: string | null
          last_name?: string
          linkedin_url?: string | null
          mobile?: string | null
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_email_templates: {
        Row: {
          body: string
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string | null
          updated_at: string
          variables: Json | null
        }
        Insert: {
          body: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          body?: string
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      crm_emails: {
        Row: {
          ai_generated: boolean | null
          ai_sentiment: string | null
          attachments: Json | null
          body: string
          company_id: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          email_type: string | null
          id: string
          lead_id: string | null
          opened_at: string | null
          opportunity_id: string | null
          project_id: string | null
          replied_at: string | null
          sent_at: string | null
          status: string | null
          subject: string
          template_used: string | null
          thread_id: string | null
          updated_at: string
        }
        Insert: {
          ai_generated?: boolean | null
          ai_sentiment?: string | null
          attachments?: Json | null
          body: string
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          email_type?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          opportunity_id?: string | null
          project_id?: string | null
          replied_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          template_used?: string | null
          thread_id?: string | null
          updated_at?: string
        }
        Update: {
          ai_generated?: boolean | null
          ai_sentiment?: string | null
          attachments?: Json | null
          body?: string
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          email_type?: string | null
          id?: string
          lead_id?: string | null
          opened_at?: string | null
          opportunity_id?: string | null
          project_id?: string | null
          replied_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_used?: string | null
          thread_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_emails_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_emails_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_emails_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_emails_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "crm_opportunities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_emails_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "crm_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          ai_insights: Json | null
          assigned_to: string | null
          company_id: string | null
          contact_id: string | null
          converted_to_opportunity: boolean | null
          created_at: string
          created_by: string | null
          description: string | null
          estimated_close_date: string | null
          estimated_value: number | null
          id: string
          lead_score: number | null
          lead_source: string | null
          lead_status: string | null
          next_action: string | null
          next_action_date: string | null
          opportunity_id: string | null
          priority: string | null
          title: string
          updated_at: string
        }
        Insert: {
          ai_insights?: Json | null
          assigned_to?: string | null
          company_id?: string | null
          contact_id?: string | null
          converted_to_opportunity?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          estimated_close_date?: string | null
          estimated_value?: number | null
          id?: string
          lead_score?: number | null
          lead_source?: string | null
          lead_status?: string | null
          next_action?: string | null
          next_action_date?: string | null
          opportunity_id?: string | null
          priority?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          ai_insights?: Json | null
          assigned_to?: string | null
          company_id?: string | null
          contact_id?: string | null
          converted_to_opportunity?: boolean | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          estimated_close_date?: string | null
          estimated_value?: number | null
          id?: string
          lead_score?: number | null
          lead_source?: string | null
          lead_status?: string | null
          next_action?: string | null
          next_action_date?: string | null
          opportunity_id?: string | null
          priority?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_leads_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_leads_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_leads_opportunity"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "crm_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_opportunities: {
        Row: {
          actual_close_date: string | null
          ai_predictions: Json | null
          assigned_to: string | null
          close_reason: string | null
          company_id: string | null
          competitors: string[] | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          expected_close_date: string | null
          id: string
          lead_id: string | null
          name: string
          next_steps: string | null
          probability: number | null
          products_services: string[] | null
          sales_cycle_days: number | null
          stage: string | null
          updated_at: string
          value: number
        }
        Insert: {
          actual_close_date?: string | null
          ai_predictions?: Json | null
          assigned_to?: string | null
          close_reason?: string | null
          company_id?: string | null
          competitors?: string[] | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          lead_id?: string | null
          name: string
          next_steps?: string | null
          probability?: number | null
          products_services?: string[] | null
          sales_cycle_days?: number | null
          stage?: string | null
          updated_at?: string
          value: number
        }
        Update: {
          actual_close_date?: string | null
          ai_predictions?: Json | null
          assigned_to?: string | null
          close_reason?: string | null
          company_id?: string | null
          competitors?: string[] | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          expected_close_date?: string | null
          id?: string
          lead_id?: string | null
          name?: string
          next_steps?: string | null
          probability?: number | null
          products_services?: string[] | null
          sales_cycle_days?: number | null
          stage?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "crm_opportunities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_opportunities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_opportunities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_projects: {
        Row: {
          actual_cost: number | null
          budget: number | null
          company_id: string | null
          contact_id: string | null
          created_at: string
          created_by: string | null
          deliverables: string[] | null
          description: string | null
          end_date: string | null
          id: string
          milestones: Json | null
          name: string
          opportunity_id: string | null
          priority: string | null
          progress_percentage: number | null
          project_manager: string | null
          project_type: string | null
          risks: string[] | null
          start_date: string | null
          status: string | null
          team_members: string[] | null
          updated_at: string
        }
        Insert: {
          actual_cost?: number | null
          budget?: number | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deliverables?: string[] | null
          description?: string | null
          end_date?: string | null
          id?: string
          milestones?: Json | null
          name: string
          opportunity_id?: string | null
          priority?: string | null
          progress_percentage?: number | null
          project_manager?: string | null
          project_type?: string | null
          risks?: string[] | null
          start_date?: string | null
          status?: string | null
          team_members?: string[] | null
          updated_at?: string
        }
        Update: {
          actual_cost?: number | null
          budget?: number | null
          company_id?: string | null
          contact_id?: string | null
          created_at?: string
          created_by?: string | null
          deliverables?: string[] | null
          description?: string | null
          end_date?: string | null
          id?: string
          milestones?: Json | null
          name?: string
          opportunity_id?: string | null
          priority?: string | null
          progress_percentage?: number | null
          project_manager?: string | null
          project_type?: string | null
          risks?: string[] | null
          start_date?: string | null
          status?: string | null
          team_members?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "crm_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_projects_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "crm_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_projects_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "crm_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          annual_revenue: number | null
          billing_address: Json | null
          company_size: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          credit_limit: number | null
          customer_name: string
          customer_since: string | null
          customer_status: string | null
          customer_type: string | null
          id: string
          industry: string | null
          payment_terms: string | null
          preferred_payment_method: string | null
          sales_rep_id: string | null
          shipping_address: Json | null
          special_instructions: string | null
          tax_id: string | null
          updated_at: string
        }
        Insert: {
          annual_revenue?: number | null
          billing_address?: Json | null
          company_size?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          credit_limit?: number | null
          customer_name: string
          customer_since?: string | null
          customer_status?: string | null
          customer_type?: string | null
          id?: string
          industry?: string | null
          payment_terms?: string | null
          preferred_payment_method?: string | null
          sales_rep_id?: string | null
          shipping_address?: Json | null
          special_instructions?: string | null
          tax_id?: string | null
          updated_at?: string
        }
        Update: {
          annual_revenue?: number | null
          billing_address?: Json | null
          company_size?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          credit_limit?: number | null
          customer_name?: string
          customer_since?: string | null
          customer_status?: string | null
          customer_type?: string | null
          id?: string
          industry?: string | null
          payment_terms?: string | null
          preferred_payment_method?: string | null
          sales_rep_id?: string | null
          shipping_address?: Json | null
          special_instructions?: string | null
          tax_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_configurations: {
        Row: {
          created_at: string
          dashboard_name: string
          id: string
          is_default: boolean | null
          layout_config: Json
          updated_at: string
          user_id: string
          widget_positions: Json
        }
        Insert: {
          created_at?: string
          dashboard_name: string
          id?: string
          is_default?: boolean | null
          layout_config?: Json
          updated_at?: string
          user_id: string
          widget_positions?: Json
        }
        Update: {
          created_at?: string
          dashboard_name?: string
          id?: string
          is_default?: boolean | null
          layout_config?: Json
          updated_at?: string
          user_id?: string
          widget_positions?: Json
        }
        Relationships: []
      }
      dashboard_widgets: {
        Row: {
          created_at: string
          created_by: string | null
          data_source: string
          id: string
          is_active: boolean | null
          refresh_interval_minutes: number | null
          updated_at: string
          widget_config: Json
          widget_name: string
          widget_type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          data_source: string
          id?: string
          is_active?: boolean | null
          refresh_interval_minutes?: number | null
          updated_at?: string
          widget_config?: Json
          widget_name: string
          widget_type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          data_source?: string
          id?: string
          is_active?: boolean | null
          refresh_interval_minutes?: number | null
          updated_at?: string
          widget_config?: Json
          widget_name?: string
          widget_type?: string
        }
        Relationships: []
      }
      document_fields: {
        Row: {
          created_at: string | null
          default_value: string | null
          display_order: number | null
          field_label: string
          field_name: string
          field_type: string
          id: string
          is_required: boolean | null
          template_id: string
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string | null
          default_value?: string | null
          display_order?: number | null
          field_label: string
          field_name: string
          field_type: string
          id?: string
          is_required?: boolean | null
          template_id: string
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string | null
          default_value?: string | null
          display_order?: number | null
          field_label?: string
          field_name?: string
          field_type?: string
          id?: string
          is_required?: boolean | null
          template_id?: string
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "document_fields_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          css_styles: string | null
          description: string | null
          html_template: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          template_data: Json
          template_name: string
          template_type: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          css_styles?: string | null
          description?: string | null
          html_template?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          template_data?: Json
          template_name: string
          template_type: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          css_styles?: string | null
          description?: string | null
          html_template?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          template_data?: Json
          template_name?: string
          template_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          access_level: string | null
          created_at: string
          created_by: string | null
          document_name: string
          document_status: string | null
          document_type: string
          entity_id: string
          entity_type: string
          expiry_date: string | null
          file_path: string | null
          file_size: number | null
          id: string
          mime_type: string | null
          tags: Json | null
          updated_at: string
        }
        Insert: {
          access_level?: string | null
          created_at?: string
          created_by?: string | null
          document_name: string
          document_status?: string | null
          document_type: string
          entity_id: string
          entity_type: string
          expiry_date?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          mime_type?: string | null
          tags?: Json | null
          updated_at?: string
        }
        Update: {
          access_level?: string | null
          created_at?: string
          created_by?: string | null
          document_name?: string
          document_status?: string | null
          document_type?: string
          entity_id?: string
          entity_type?: string
          expiry_date?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          mime_type?: string | null
          tags?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      driver_communications: {
        Row: {
          attachments: Json | null
          created_at: string | null
          driver_id: string
          id: string
          is_read: boolean | null
          message: string
          message_type: string | null
          priority: string | null
          read_at: string | null
          reply_to: string | null
          sender_id: string
          sender_role: string
          subject: string | null
        }
        Insert: {
          attachments?: Json | null
          created_at?: string | null
          driver_id: string
          id?: string
          is_read?: boolean | null
          message: string
          message_type?: string | null
          priority?: string | null
          read_at?: string | null
          reply_to?: string | null
          sender_id: string
          sender_role: string
          subject?: string | null
        }
        Update: {
          attachments?: Json | null
          created_at?: string | null
          driver_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
          message_type?: string | null
          priority?: string | null
          read_at?: string | null
          reply_to?: string | null
          sender_id?: string
          sender_role?: string
          subject?: string | null
        }
        Relationships: []
      }
      driver_documents: {
        Row: {
          created_at: string | null
          document_data: Json | null
          document_name: string
          document_type: string
          document_url: string | null
          driver_id: string
          expiry_date: string | null
          id: string
          is_verified: boolean | null
          status: string | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_data?: Json | null
          document_name: string
          document_type: string
          document_url?: string | null
          driver_id: string
          expiry_date?: string | null
          id?: string
          is_verified?: boolean | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_data?: Json | null
          document_name?: string
          document_type?: string
          document_url?: string | null
          driver_id?: string
          expiry_date?: string | null
          id?: string
          is_verified?: boolean | null
          status?: string | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      driver_earnings: {
        Row: {
          base_pay: number | null
          bonus_pay: number | null
          created_at: string | null
          deductions: number | null
          driver_id: string
          gross_pay: number | null
          id: string
          mileage_pay: number | null
          net_pay: number | null
          overtime_pay: number | null
          pay_period_end: string
          pay_period_start: string
          payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          updated_at: string | null
        }
        Insert: {
          base_pay?: number | null
          bonus_pay?: number | null
          created_at?: string | null
          deductions?: number | null
          driver_id: string
          gross_pay?: number | null
          id?: string
          mileage_pay?: number | null
          net_pay?: number | null
          overtime_pay?: number | null
          pay_period_end: string
          pay_period_start: string
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Update: {
          base_pay?: number | null
          bonus_pay?: number | null
          created_at?: string | null
          deductions?: number | null
          driver_id?: string
          gross_pay?: number | null
          id?: string
          mileage_pay?: number | null
          net_pay?: number | null
          overtime_pay?: number | null
          pay_period_end?: string
          pay_period_start?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      driver_invitations: {
        Row: {
          accepted_at: string | null
          carrier_id: string
          created_at: string
          driver_name: string
          driver_user_id: string | null
          email: string
          expires_at: string
          id: string
          invitation_token: string
          invited_by: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          carrier_id: string
          created_at?: string
          driver_name: string
          driver_user_id?: string | null
          email: string
          expires_at?: string
          id?: string
          invitation_token: string
          invited_by: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          carrier_id?: string
          created_at?: string
          driver_name?: string
          driver_user_id?: string | null
          email?: string
          expires_at?: string
          id?: string
          invitation_token?: string
          invited_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "driver_invitations_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_loads: {
        Row: {
          actual_earnings: number | null
          assignment_date: string | null
          created_at: string | null
          delivery_date: string | null
          delivery_location: string
          driver_id: string
          estimated_earnings: number | null
          fuel_consumed: number | null
          id: string
          load_id: string
          load_status: string | null
          miles_driven: number | null
          pickup_date: string | null
          pickup_location: string
          route_data: Json | null
          updated_at: string | null
        }
        Insert: {
          actual_earnings?: number | null
          assignment_date?: string | null
          created_at?: string | null
          delivery_date?: string | null
          delivery_location: string
          driver_id: string
          estimated_earnings?: number | null
          fuel_consumed?: number | null
          id?: string
          load_id: string
          load_status?: string | null
          miles_driven?: number | null
          pickup_date?: string | null
          pickup_location: string
          route_data?: Json | null
          updated_at?: string | null
        }
        Update: {
          actual_earnings?: number | null
          assignment_date?: string | null
          created_at?: string | null
          delivery_date?: string | null
          delivery_location?: string
          driver_id?: string
          estimated_earnings?: number | null
          fuel_consumed?: number | null
          id?: string
          load_id?: string
          load_status?: string | null
          miles_driven?: number | null
          pickup_date?: string | null
          pickup_location?: string
          route_data?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      driver_locations: {
        Row: {
          accuracy: number | null
          altitude: number | null
          driver_id: string
          heading: number | null
          id: string
          is_driving: boolean | null
          latitude: number
          location_source: string | null
          longitude: number
          speed: number | null
          timestamp: string | null
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          driver_id: string
          heading?: number | null
          id?: string
          is_driving?: boolean | null
          latitude: number
          location_source?: string | null
          longitude: number
          speed?: number | null
          timestamp?: string | null
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          driver_id?: string
          heading?: number | null
          id?: string
          is_driving?: boolean | null
          latitude?: number
          location_source?: string | null
          longitude?: number
          speed?: number | null
          timestamp?: string | null
        }
        Relationships: []
      }
      driver_performance: {
        Row: {
          created_at: string | null
          date: string | null
          driver_id: string
          earnings_total: number | null
          fuel_efficiency: number | null
          hours_driven: number | null
          id: string
          late_deliveries: number | null
          on_time_deliveries: number | null
          performance_rating: number | null
          safety_score: number | null
          total_loads: number | null
          total_miles: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          driver_id: string
          earnings_total?: number | null
          fuel_efficiency?: number | null
          hours_driven?: number | null
          id?: string
          late_deliveries?: number | null
          on_time_deliveries?: number | null
          performance_rating?: number | null
          safety_score?: number | null
          total_loads?: number | null
          total_miles?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          driver_id?: string
          earnings_total?: number | null
          fuel_efficiency?: number | null
          hours_driven?: number | null
          id?: string
          late_deliveries?: number | null
          on_time_deliveries?: number | null
          performance_rating?: number | null
          safety_score?: number | null
          total_loads?: number | null
          total_miles?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      driver_routes: {
        Row: {
          actual_distance_miles: number | null
          actual_duration_minutes: number | null
          created_at: string | null
          destination_coordinates: unknown
          driver_id: string
          estimated_distance_miles: number | null
          estimated_duration_minutes: number | null
          fuel_efficiency: number | null
          id: string
          load_id: string
          optimized_route: Json | null
          origin_coordinates: unknown
          route_name: string
          route_status: string | null
          traffic_conditions: Json | null
          updated_at: string | null
          waypoints: Json | null
          weather_conditions: Json | null
        }
        Insert: {
          actual_distance_miles?: number | null
          actual_duration_minutes?: number | null
          created_at?: string | null
          destination_coordinates: unknown
          driver_id: string
          estimated_distance_miles?: number | null
          estimated_duration_minutes?: number | null
          fuel_efficiency?: number | null
          id?: string
          load_id: string
          optimized_route?: Json | null
          origin_coordinates: unknown
          route_name: string
          route_status?: string | null
          traffic_conditions?: Json | null
          updated_at?: string | null
          waypoints?: Json | null
          weather_conditions?: Json | null
        }
        Update: {
          actual_distance_miles?: number | null
          actual_duration_minutes?: number | null
          created_at?: string | null
          destination_coordinates?: unknown
          driver_id?: string
          estimated_distance_miles?: number | null
          estimated_duration_minutes?: number | null
          fuel_efficiency?: number | null
          id?: string
          load_id?: string
          optimized_route?: Json | null
          origin_coordinates?: unknown
          route_name?: string
          route_status?: string | null
          traffic_conditions?: Json | null
          updated_at?: string | null
          waypoints?: Json | null
          weather_conditions?: Json | null
        }
        Relationships: []
      }
      drivers: {
        Row: {
          company_id: string | null
          created_at: string
          current_location: string | null
          email: string | null
          hours_driven_today: number | null
          id: string
          license_number: string
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          current_location?: string | null
          email?: string | null
          hours_driven_today?: number | null
          id?: string
          license_number: string
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          current_location?: string | null
          email?: string | null
          hours_driven_today?: number | null
          id?: string
          license_number?: string
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "drivers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_audit_logs: {
        Row: {
          action_type: string
          changes: Json | null
          company_id: string
          id: string
          ip_address: unknown | null
          timestamp: string
          transaction_id: string | null
          user_agent: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          action_type: string
          changes?: Json | null
          company_id: string
          id?: string
          ip_address?: unknown | null
          timestamp?: string
          transaction_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          action_type?: string
          changes?: Json | null
          company_id?: string
          id?: string
          ip_address?: unknown | null
          timestamp?: string
          transaction_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "edi_audit_logs_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "edi_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_configurations: {
        Row: {
          auto_acknowledgment: boolean
          company_id: string
          company_type: string
          connection_settings: Json
          connection_type: string
          created_at: string
          created_by: string | null
          edi_enabled: boolean
          id: string
          test_mode: boolean
          transaction_sets_enabled: string[]
          updated_at: string
        }
        Insert: {
          auto_acknowledgment?: boolean
          company_id: string
          company_type: string
          connection_settings?: Json
          connection_type?: string
          created_at?: string
          created_by?: string | null
          edi_enabled?: boolean
          id?: string
          test_mode?: boolean
          transaction_sets_enabled?: string[]
          updated_at?: string
        }
        Update: {
          auto_acknowledgment?: boolean
          company_id?: string
          company_type?: string
          connection_settings?: Json
          connection_type?: string
          created_at?: string
          created_by?: string | null
          edi_enabled?: boolean
          id?: string
          test_mode?: boolean
          transaction_sets_enabled?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      edi_document_templates: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          document_name: string
          document_type: string
          field_mappings: Json
          id: string
          is_active: boolean
          template_content: Json
          template_version: string
          updated_at: string
          validation_rules: Json
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          document_name: string
          document_type: string
          field_mappings?: Json
          id?: string
          is_active?: boolean
          template_content: Json
          template_version?: string
          updated_at?: string
          validation_rules?: Json
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          document_name?: string
          document_type?: string
          field_mappings?: Json
          id?: string
          is_active?: boolean
          template_content?: Json
          template_version?: string
          updated_at?: string
          validation_rules?: Json
        }
        Relationships: []
      }
      edi_document_types: {
        Row: {
          created_at: string
          description: string | null
          direction: string
          document_name: string
          id: string
          is_active: boolean | null
          transaction_set_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          direction: string
          document_name: string
          id?: string
          is_active?: boolean | null
          transaction_set_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          direction?: string
          document_name?: string
          id?: string
          is_active?: boolean | null
          transaction_set_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      edi_documents: {
        Row: {
          acknowledged_at: string | null
          created_at: string
          created_by: string | null
          direction: string
          document_number: string
          edi_content: string | null
          error_details: Json | null
          id: string
          invoice_id: string | null
          json_content: Json | null
          load_id: string | null
          processing_notes: string | null
          received_at: string | null
          sent_at: string | null
          shipment_id: string | null
          status: string | null
          trading_partner_id: string | null
          transaction_set_code: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          created_at?: string
          created_by?: string | null
          direction: string
          document_number: string
          edi_content?: string | null
          error_details?: Json | null
          id?: string
          invoice_id?: string | null
          json_content?: Json | null
          load_id?: string | null
          processing_notes?: string | null
          received_at?: string | null
          sent_at?: string | null
          shipment_id?: string | null
          status?: string | null
          trading_partner_id?: string | null
          transaction_set_code: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          created_at?: string
          created_by?: string | null
          direction?: string
          document_number?: string
          edi_content?: string | null
          error_details?: Json | null
          id?: string
          invoice_id?: string | null
          json_content?: Json | null
          load_id?: string | null
          processing_notes?: string | null
          received_at?: string | null
          sent_at?: string | null
          shipment_id?: string | null
          status?: string | null
          trading_partner_id?: string | null
          transaction_set_code?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "edi_documents_trading_partner_id_fkey"
            columns: ["trading_partner_id"]
            isOneToOne: false
            referencedRelation: "edi_trading_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_failed_transactions: {
        Row: {
          assigned_to: string | null
          created_at: string
          error_code: string | null
          error_details: Json | null
          error_message: string
          failure_category: string
          failure_type: string
          id: string
          last_retry_at: string | null
          next_retry_at: string | null
          resolution_notes: string | null
          resolution_status: string
          resolved_at: string | null
          resolved_by: string | null
          retry_count: number
          severity: string
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          error_code?: string | null
          error_details?: Json | null
          error_message: string
          failure_category: string
          failure_type: string
          id?: string
          last_retry_at?: string | null
          next_retry_at?: string | null
          resolution_notes?: string | null
          resolution_status?: string
          resolved_at?: string | null
          resolved_by?: string | null
          retry_count?: number
          severity?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          error_code?: string | null
          error_details?: Json | null
          error_message?: string
          failure_category?: string
          failure_type?: string
          id?: string
          last_retry_at?: string | null
          next_retry_at?: string | null
          resolution_notes?: string | null
          resolution_status?: string
          resolved_at?: string | null
          resolved_by?: string | null
          retry_count?: number
          severity?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "edi_failed_transactions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "edi_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_mappings: {
        Row: {
          created_at: string
          created_by: string | null
          field_mappings: Json
          id: string
          is_active: boolean | null
          is_default: boolean | null
          mapping_name: string
          mapping_type: string | null
          trading_partner_id: string | null
          transaction_set_code: string
          transformation_rules: Json | null
          updated_at: string
          validation_rules: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          field_mappings?: Json
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          mapping_name: string
          mapping_type?: string | null
          trading_partner_id?: string | null
          transaction_set_code: string
          transformation_rules?: Json | null
          updated_at?: string
          validation_rules?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          field_mappings?: Json
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          mapping_name?: string
          mapping_type?: string | null
          trading_partner_id?: string | null
          transaction_set_code?: string
          transformation_rules?: Json | null
          updated_at?: string
          validation_rules?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "edi_mappings_trading_partner_id_fkey"
            columns: ["trading_partner_id"]
            isOneToOne: false
            referencedRelation: "edi_trading_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_matching_rules: {
        Row: {
          actions: Json
          auto_execute: boolean
          company_id: string
          conditions: Json
          created_at: string
          created_by: string | null
          document_type: string
          failure_count: number
          id: string
          is_active: boolean
          last_executed_at: string | null
          priority: number
          rule_name: string
          rule_type: string
          success_count: number
          updated_at: string
        }
        Insert: {
          actions: Json
          auto_execute?: boolean
          company_id: string
          conditions: Json
          created_at?: string
          created_by?: string | null
          document_type: string
          failure_count?: number
          id?: string
          is_active?: boolean
          last_executed_at?: string | null
          priority?: number
          rule_name: string
          rule_type: string
          success_count?: number
          updated_at?: string
        }
        Update: {
          actions?: Json
          auto_execute?: boolean
          company_id?: string
          conditions?: Json
          created_at?: string
          created_by?: string | null
          document_type?: string
          failure_count?: number
          id?: string
          is_active?: boolean
          last_executed_at?: string | null
          priority?: number
          rule_name?: string
          rule_type?: string
          success_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      edi_partnerships: {
        Row: {
          created_at: string
          created_by: string | null
          document_types_enabled: string[]
          edi_standard: string
          group_id: string | null
          id: string
          initiator_company_id: string
          interchange_id: string | null
          interchange_id_qualifier: string | null
          partner_company_id: string
          partnership_agreement: Json | null
          partnership_type: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          document_types_enabled?: string[]
          edi_standard?: string
          group_id?: string | null
          id?: string
          initiator_company_id: string
          interchange_id?: string | null
          interchange_id_qualifier?: string | null
          partner_company_id: string
          partnership_agreement?: Json | null
          partnership_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          document_types_enabled?: string[]
          edi_standard?: string
          group_id?: string | null
          id?: string
          initiator_company_id?: string
          interchange_id?: string | null
          interchange_id_qualifier?: string | null
          partner_company_id?: string
          partnership_agreement?: Json | null
          partnership_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      edi_trading_partners: {
        Row: {
          communication_method: string | null
          company_id: string | null
          connection_details: Json | null
          contact_info: Json | null
          created_at: string
          created_by: string | null
          edi_id: string
          id: string
          partner_name: string
          partner_type: string
          qualification: string
          status: string | null
          supported_transaction_sets: string[] | null
          updated_at: string
        }
        Insert: {
          communication_method?: string | null
          company_id?: string | null
          connection_details?: Json | null
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          edi_id: string
          id?: string
          partner_name: string
          partner_type: string
          qualification: string
          status?: string | null
          supported_transaction_sets?: string[] | null
          updated_at?: string
        }
        Update: {
          communication_method?: string | null
          company_id?: string | null
          connection_details?: Json | null
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          edi_id?: string
          id?: string
          partner_name?: string
          partner_type?: string
          qualification?: string
          status?: string | null
          supported_transaction_sets?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "edi_trading_partners_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      edi_transactions: {
        Row: {
          acknowledged_at: string | null
          acknowledgment_details: Json | null
          acknowledgment_status: string | null
          created_at: string
          direction: string
          document_type: string
          error_details: Json | null
          id: string
          invoice_id: string | null
          load_id: string | null
          parsed_content: Json | null
          partnership_id: string
          processed_at: string | null
          processing_status: string
          raw_content: string | null
          receiver_company_id: string
          sender_company_id: string
          shipment_id: string | null
          transaction_id: string
          transmission_timestamp: string
          updated_at: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledgment_details?: Json | null
          acknowledgment_status?: string | null
          created_at?: string
          direction: string
          document_type: string
          error_details?: Json | null
          id?: string
          invoice_id?: string | null
          load_id?: string | null
          parsed_content?: Json | null
          partnership_id: string
          processed_at?: string | null
          processing_status?: string
          raw_content?: string | null
          receiver_company_id: string
          sender_company_id: string
          shipment_id?: string | null
          transaction_id: string
          transmission_timestamp?: string
          updated_at?: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledgment_details?: Json | null
          acknowledgment_status?: string | null
          created_at?: string
          direction?: string
          document_type?: string
          error_details?: Json | null
          id?: string
          invoice_id?: string | null
          load_id?: string | null
          parsed_content?: Json | null
          partnership_id?: string
          processed_at?: string | null
          processing_status?: string
          raw_content?: string | null
          receiver_company_id?: string
          sender_company_id?: string
          shipment_id?: string | null
          transaction_id?: string
          transmission_timestamp?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "edi_transactions_partnership_id_fkey"
            columns: ["partnership_id"]
            isOneToOne: false
            referencedRelation: "edi_partnerships"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: Json | null
          benefits_eligible: boolean | null
          created_at: string
          department: string | null
          email: string | null
          emergency_contact: Json | null
          employee_id: string | null
          employment_status: string | null
          employment_type: string | null
          first_name: string
          hire_date: string | null
          hourly_rate: number | null
          id: string
          job_title: string | null
          last_name: string
          manager_id: string | null
          phone: string | null
          salary: number | null
          updated_at: string
        }
        Insert: {
          address?: Json | null
          benefits_eligible?: boolean | null
          created_at?: string
          department?: string | null
          email?: string | null
          emergency_contact?: Json | null
          employee_id?: string | null
          employment_status?: string | null
          employment_type?: string | null
          first_name: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          job_title?: string | null
          last_name: string
          manager_id?: string | null
          phone?: string | null
          salary?: number | null
          updated_at?: string
        }
        Update: {
          address?: Json | null
          benefits_eligible?: boolean | null
          created_at?: string
          department?: string | null
          email?: string | null
          emergency_contact?: Json | null
          employee_id?: string | null
          employment_status?: string | null
          employment_type?: string | null
          first_name?: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          job_title?: string | null
          last_name?: string
          manager_id?: string | null
          phone?: string | null
          salary?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      fleet_tracker: {
        Row: {
          alerts: Json | null
          created_at: string
          driver_id: string | null
          eld_status: string | null
          engine_status: string | null
          fuel_level: number | null
          geofence_events: Json | null
          heading: number | null
          hours_of_service: Json | null
          id: string
          location: Json
          odometer: number | null
          speed: number | null
          timestamp: string
          unit_id: string | null
        }
        Insert: {
          alerts?: Json | null
          created_at?: string
          driver_id?: string | null
          eld_status?: string | null
          engine_status?: string | null
          fuel_level?: number | null
          geofence_events?: Json | null
          heading?: number | null
          hours_of_service?: Json | null
          id?: string
          location: Json
          odometer?: number | null
          speed?: number | null
          timestamp?: string
          unit_id?: string | null
        }
        Update: {
          alerts?: Json | null
          created_at?: string
          driver_id?: string | null
          eld_status?: string | null
          engine_status?: string | null
          fuel_level?: number | null
          geofence_events?: Json | null
          heading?: number | null
          hours_of_service?: Json | null
          id?: string
          location?: Json
          odometer?: number | null
          speed?: number | null
          timestamp?: string
          unit_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fleet_tracker_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fleet_tracker_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      freight_agreements: {
        Row: {
          agreement_number: string
          agreement_type: string
          auto_renewal: boolean | null
          broker_id: string | null
          carrier_id: string | null
          completed_date: string | null
          contract_terms: Json
          created_at: string
          created_by: string | null
          delivery_details: Json | null
          document_url: string | null
          expiry_date: string | null
          hellosign_request_id: string | null
          hellosign_signature_request_id: string | null
          id: string
          liability_coverage: Json | null
          load_id: string | null
          payment_terms: Json | null
          pickup_details: Json | null
          rate_confirmation: Json | null
          sent_date: string | null
          shipper_id: string | null
          signature_events: Json | null
          signature_status: string | null
          signed_date: string | null
          signed_document_url: string | null
          signers: Json | null
          special_conditions: string | null
          status: string | null
          template_id: string | null
          updated_at: string
        }
        Insert: {
          agreement_number: string
          agreement_type?: string
          auto_renewal?: boolean | null
          broker_id?: string | null
          carrier_id?: string | null
          completed_date?: string | null
          contract_terms?: Json
          created_at?: string
          created_by?: string | null
          delivery_details?: Json | null
          document_url?: string | null
          expiry_date?: string | null
          hellosign_request_id?: string | null
          hellosign_signature_request_id?: string | null
          id?: string
          liability_coverage?: Json | null
          load_id?: string | null
          payment_terms?: Json | null
          pickup_details?: Json | null
          rate_confirmation?: Json | null
          sent_date?: string | null
          shipper_id?: string | null
          signature_events?: Json | null
          signature_status?: string | null
          signed_date?: string | null
          signed_document_url?: string | null
          signers?: Json | null
          special_conditions?: string | null
          status?: string | null
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          agreement_number?: string
          agreement_type?: string
          auto_renewal?: boolean | null
          broker_id?: string | null
          carrier_id?: string | null
          completed_date?: string | null
          contract_terms?: Json
          created_at?: string
          created_by?: string | null
          delivery_details?: Json | null
          document_url?: string | null
          expiry_date?: string | null
          hellosign_request_id?: string | null
          hellosign_signature_request_id?: string | null
          id?: string
          liability_coverage?: Json | null
          load_id?: string | null
          payment_terms?: Json | null
          pickup_details?: Json | null
          rate_confirmation?: Json | null
          sent_date?: string | null
          shipper_id?: string | null
          signature_events?: Json | null
          signature_status?: string | null
          signed_date?: string | null
          signed_document_url?: string | null
          signers?: Json | null
          special_conditions?: string | null
          status?: string | null
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "freight_agreements_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_agreements_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "freight_carriers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_agreements_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_agreements_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      freight_call_logs: {
        Row: {
          agent_notes: string | null
          ai_extracted_data: Json | null
          call_disposition: string | null
          call_duration: number | null
          call_end_time: string | null
          call_id: string | null
          call_quality_score: number | null
          call_start_time: string | null
          call_status: string | null
          call_type: string | null
          callback_number: string | null
          callback_requested: boolean | null
          callback_time: string | null
          caller_number: string
          confidence_score: number | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          error_messages: string | null
          extracted_load_details: Json | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          keywords_extracted: string[] | null
          lead_id: string | null
          load_created: boolean | null
          load_id: string | null
          openai_response: Json | null
          priority_level: string | null
          processed_by_ai: boolean | null
          processing_status: string | null
          receiver_number: string | null
          recording_duration: number | null
          recording_url: string | null
          sentiment_analysis: Json | null
          transcription_status: string | null
          transcription_text: string | null
          twilio_call_sid: string | null
          updated_at: string
          whisper_transcription: Json | null
        }
        Insert: {
          agent_notes?: string | null
          ai_extracted_data?: Json | null
          call_disposition?: string | null
          call_duration?: number | null
          call_end_time?: string | null
          call_id?: string | null
          call_quality_score?: number | null
          call_start_time?: string | null
          call_status?: string | null
          call_type?: string | null
          callback_number?: string | null
          callback_requested?: boolean | null
          callback_time?: string | null
          caller_number: string
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          error_messages?: string | null
          extracted_load_details?: Json | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          keywords_extracted?: string[] | null
          lead_id?: string | null
          load_created?: boolean | null
          load_id?: string | null
          openai_response?: Json | null
          priority_level?: string | null
          processed_by_ai?: boolean | null
          processing_status?: string | null
          receiver_number?: string | null
          recording_duration?: number | null
          recording_url?: string | null
          sentiment_analysis?: Json | null
          transcription_status?: string | null
          transcription_text?: string | null
          twilio_call_sid?: string | null
          updated_at?: string
          whisper_transcription?: Json | null
        }
        Update: {
          agent_notes?: string | null
          ai_extracted_data?: Json | null
          call_disposition?: string | null
          call_duration?: number | null
          call_end_time?: string | null
          call_id?: string | null
          call_quality_score?: number | null
          call_start_time?: string | null
          call_status?: string | null
          call_type?: string | null
          callback_number?: string | null
          callback_requested?: boolean | null
          callback_time?: string | null
          caller_number?: string
          confidence_score?: number | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          error_messages?: string | null
          extracted_load_details?: Json | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          keywords_extracted?: string[] | null
          lead_id?: string | null
          load_created?: boolean | null
          load_id?: string | null
          openai_response?: Json | null
          priority_level?: string | null
          processed_by_ai?: boolean | null
          processing_status?: string | null
          receiver_number?: string | null
          recording_duration?: number | null
          recording_url?: string | null
          sentiment_analysis?: Json | null
          transcription_status?: string | null
          transcription_text?: string | null
          twilio_call_sid?: string | null
          updated_at?: string
          whisper_transcription?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "freight_call_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_call_logs_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      freight_carriers: {
        Row: {
          availability_status: string | null
          average_rating: number | null
          banking_info: Json | null
          capacity_constraints: Json | null
          carrier_name: string
          certifications: Json | null
          communication_preferences: Json | null
          company_id: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contract_rates: Json | null
          created_at: string
          dot_number: string | null
          emergency_contact: string | null
          equipment_types: string[] | null
          fuel_card_info: Json | null
          id: string
          insurance_expiry: string | null
          insurance_provider: string | null
          last_load_date: string | null
          mc_number: string | null
          onboarding_date: string | null
          onboarding_status: string | null
          operating_regions: string[] | null
          performance_score: number | null
          preferred_lanes: string[] | null
          safety_rating: string | null
          service_areas: Json | null
          total_loads_completed: number | null
          tracking_capabilities: Json | null
          updated_at: string
        }
        Insert: {
          availability_status?: string | null
          average_rating?: number | null
          banking_info?: Json | null
          capacity_constraints?: Json | null
          carrier_name: string
          certifications?: Json | null
          communication_preferences?: Json | null
          company_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_rates?: Json | null
          created_at?: string
          dot_number?: string | null
          emergency_contact?: string | null
          equipment_types?: string[] | null
          fuel_card_info?: Json | null
          id?: string
          insurance_expiry?: string | null
          insurance_provider?: string | null
          last_load_date?: string | null
          mc_number?: string | null
          onboarding_date?: string | null
          onboarding_status?: string | null
          operating_regions?: string[] | null
          performance_score?: number | null
          preferred_lanes?: string[] | null
          safety_rating?: string | null
          service_areas?: Json | null
          total_loads_completed?: number | null
          tracking_capabilities?: Json | null
          updated_at?: string
        }
        Update: {
          availability_status?: string | null
          average_rating?: number | null
          banking_info?: Json | null
          capacity_constraints?: Json | null
          carrier_name?: string
          certifications?: Json | null
          communication_preferences?: Json | null
          company_id?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_rates?: Json | null
          created_at?: string
          dot_number?: string | null
          emergency_contact?: string | null
          equipment_types?: string[] | null
          fuel_card_info?: Json | null
          id?: string
          insurance_expiry?: string | null
          insurance_provider?: string | null
          last_load_date?: string | null
          mc_number?: string | null
          onboarding_date?: string | null
          onboarding_status?: string | null
          operating_regions?: string[] | null
          performance_score?: number | null
          preferred_lanes?: string[] | null
          safety_rating?: string | null
          service_areas?: Json | null
          total_loads_completed?: number | null
          tracking_capabilities?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "freight_carriers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      freight_invoices: {
        Row: {
          amount_paid: number | null
          approval_date: string | null
          approved_by: string | null
          balance_due: number | null
          billing_address: Json | null
          broker_id: string | null
          carrier_id: string | null
          collection_status: string | null
          created_at: string
          created_by: string | null
          currency: string | null
          dispute_notes: string | null
          dispute_status: string | null
          due_date: string | null
          external_invoice_id: string | null
          id: string
          invoice_date: string
          invoice_number: string
          invoice_status: string | null
          invoice_type: string
          last_reminder_date: string | null
          line_items: Json
          load_id: string | null
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          payment_terms: string | null
          pdf_url: string | null
          quickbooks_id: string | null
          reminder_count: number | null
          sage_id: string | null
          sent_date: string | null
          shipper_id: string | null
          shipping_address: Json | null
          subtotal: number
          tax_amount: number | null
          tax_details: Json | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          amount_paid?: number | null
          approval_date?: string | null
          approved_by?: string | null
          balance_due?: number | null
          billing_address?: Json | null
          broker_id?: string | null
          carrier_id?: string | null
          collection_status?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          dispute_notes?: string | null
          dispute_status?: string | null
          due_date?: string | null
          external_invoice_id?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          invoice_status?: string | null
          invoice_type?: string
          last_reminder_date?: string | null
          line_items?: Json
          load_id?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          payment_terms?: string | null
          pdf_url?: string | null
          quickbooks_id?: string | null
          reminder_count?: number | null
          sage_id?: string | null
          sent_date?: string | null
          shipper_id?: string | null
          shipping_address?: Json | null
          subtotal?: number
          tax_amount?: number | null
          tax_details?: Json | null
          total_amount?: number
          updated_at?: string
        }
        Update: {
          amount_paid?: number | null
          approval_date?: string | null
          approved_by?: string | null
          balance_due?: number | null
          billing_address?: Json | null
          broker_id?: string | null
          carrier_id?: string | null
          collection_status?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string | null
          dispute_notes?: string | null
          dispute_status?: string | null
          due_date?: string | null
          external_invoice_id?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          invoice_status?: string | null
          invoice_type?: string
          last_reminder_date?: string | null
          line_items?: Json
          load_id?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          payment_terms?: string | null
          pdf_url?: string | null
          quickbooks_id?: string | null
          reminder_count?: number | null
          sage_id?: string | null
          sent_date?: string | null
          shipper_id?: string | null
          shipping_address?: Json | null
          subtotal?: number
          tax_amount?: number | null
          tax_details?: Json | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "freight_invoices_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_invoices_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "freight_carriers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_invoices_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "freight_invoices_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      freight_rates: {
        Row: {
          accessorial_rates: Json | null
          approval_date: string | null
          approved_by: string | null
          base_rate: number
          carrier_id: string | null
          carrier_specific: boolean | null
          commodity_restrictions: string[] | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          customer_specific: boolean | null
          destination_zone: string
          distance_breaks: Json | null
          effective_date: string
          equipment_type: string
          expiry_date: string | null
          fuel_surcharge_rate: number | null
          id: string
          minimum_rate: number | null
          mode_of_transport: string
          origin_zone: string
          rate_name: string
          rate_per_mile: number | null
          rate_type: string | null
          seasonal_adjustments: Json | null
          service_level: string | null
          status: string | null
          transit_time_days: number | null
          updated_at: string
          weight_breaks: Json | null
        }
        Insert: {
          accessorial_rates?: Json | null
          approval_date?: string | null
          approved_by?: string | null
          base_rate: number
          carrier_id?: string | null
          carrier_specific?: boolean | null
          commodity_restrictions?: string[] | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          customer_specific?: boolean | null
          destination_zone: string
          distance_breaks?: Json | null
          effective_date?: string
          equipment_type: string
          expiry_date?: string | null
          fuel_surcharge_rate?: number | null
          id?: string
          minimum_rate?: number | null
          mode_of_transport?: string
          origin_zone: string
          rate_name: string
          rate_per_mile?: number | null
          rate_type?: string | null
          seasonal_adjustments?: Json | null
          service_level?: string | null
          status?: string | null
          transit_time_days?: number | null
          updated_at?: string
          weight_breaks?: Json | null
        }
        Update: {
          accessorial_rates?: Json | null
          approval_date?: string | null
          approved_by?: string | null
          base_rate?: number
          carrier_id?: string | null
          carrier_specific?: boolean | null
          commodity_restrictions?: string[] | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          customer_specific?: boolean | null
          destination_zone?: string
          distance_breaks?: Json | null
          effective_date?: string
          equipment_type?: string
          expiry_date?: string | null
          fuel_surcharge_rate?: number | null
          id?: string
          minimum_rate?: number | null
          mode_of_transport?: string
          origin_zone?: string
          rate_name?: string
          rate_per_mile?: number | null
          rate_type?: string | null
          seasonal_adjustments?: Json | null
          service_level?: string | null
          status?: string | null
          transit_time_days?: number | null
          updated_at?: string
          weight_breaks?: Json | null
        }
        Relationships: []
      }
      fuel_audit: {
        Row: {
          approval_status: string | null
          approved_by: string | null
          created_at: string
          driver_id: string | null
          fuel_card_number: string | null
          fuel_station: string | null
          gallons_purchased: number
          id: string
          location: Json | null
          mpg_calculated: number | null
          odometer_reading: number | null
          price_per_gallon: number
          receipt_url: string | null
          total_cost: number
          transaction_date: string
          transaction_type: string | null
          trip_id: string | null
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          approval_status?: string | null
          approved_by?: string | null
          created_at?: string
          driver_id?: string | null
          fuel_card_number?: string | null
          fuel_station?: string | null
          gallons_purchased: number
          id?: string
          location?: Json | null
          mpg_calculated?: number | null
          odometer_reading?: number | null
          price_per_gallon: number
          receipt_url?: string | null
          total_cost: number
          transaction_date: string
          transaction_type?: string | null
          trip_id?: string | null
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          approval_status?: string | null
          approved_by?: string | null
          created_at?: string
          driver_id?: string | null
          fuel_card_number?: string | null
          fuel_station?: string | null
          gallons_purchased?: number
          id?: string
          location?: Json | null
          mpg_calculated?: number | null
          odometer_reading?: number | null
          price_per_gallon?: number
          receipt_url?: string | null
          total_cost?: number
          transaction_date?: string
          transaction_type?: string | null
          trip_id?: string | null
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fuel_audit_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fuel_audit_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_documents: {
        Row: {
          company_id: string | null
          document_number: string
          document_type: string
          generated_at: string | null
          generated_by: string | null
          generated_data: Json
          id: string
          pdf_url: string | null
          rendered_html: string | null
          shipment_id: string | null
          status: string | null
          template_id: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          document_number: string
          document_type: string
          generated_at?: string | null
          generated_by?: string | null
          generated_data?: Json
          id?: string
          pdf_url?: string | null
          rendered_html?: string | null
          shipment_id?: string | null
          status?: string | null
          template_id: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          document_number?: string
          document_type?: string
          generated_at?: string | null
          generated_by?: string | null
          generated_data?: Json
          id?: string
          pdf_url?: string | null
          rendered_html?: string | null
          shipment_id?: string | null
          status?: string | null
          template_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_documents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          created_by: string | null
          due_date: string
          entity_id: string
          id: string
          invoice_date: string
          invoice_number: string
          invoice_type: string
          line_items: Json | null
          load_id: string | null
          notes: string | null
          paid_amount: number | null
          payment_status: string | null
          payment_terms: string | null
          shipment_id: string | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          due_date: string
          entity_id: string
          id?: string
          invoice_date?: string
          invoice_number: string
          invoice_type: string
          line_items?: Json | null
          load_id?: string | null
          notes?: string | null
          paid_amount?: number | null
          payment_status?: string | null
          payment_terms?: string | null
          shipment_id?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          due_date?: string
          entity_id?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          invoice_type?: string
          line_items?: Json | null
          load_id?: string | null
          notes?: string | null
          paid_amount?: number | null
          payment_status?: string | null
          payment_terms?: string | null
          shipment_id?: string | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      load_bids: {
        Row: {
          bid_amount: number
          bid_date: string
          bid_notes: string | null
          bid_status: string | null
          carrier_id: string
          created_at: string
          created_by: string | null
          id: string
          load_id: string
          response_date: string | null
          updated_at: string
        }
        Insert: {
          bid_amount: number
          bid_date?: string
          bid_notes?: string | null
          bid_status?: string | null
          carrier_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          load_id: string
          response_date?: string | null
          updated_at?: string
        }
        Update: {
          bid_amount?: number
          bid_date?: string
          bid_notes?: string | null
          bid_status?: string | null
          carrier_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          load_id?: string
          response_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "load_bids_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "load_bids_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      loads: {
        Row: {
          accessorial_charges: number | null
          ai_extracted_data: Json | null
          assigned_dispatcher: string | null
          broker_id: string | null
          carrier_id: string | null
          carrier_reference: string | null
          commodity_type: string | null
          created_at: string
          created_by: string | null
          delivery_date: string | null
          delivery_window: Json | null
          destination: string
          dispatch_notes: string | null
          distance_miles: number | null
          equipment_type: string | null
          fuel_surcharge: number | null
          hazmat_info: Json | null
          id: string
          load_number: string
          origin: string
          pickup_date: string | null
          pickup_window: Json | null
          priority: string | null
          rate: number | null
          shipper_id: string | null
          shipper_reference: string | null
          special_instructions: string | null
          status: string
          temperature_range: Json | null
          total_cost: number | null
          updated_at: string
          volume: number | null
          weight: number | null
        }
        Insert: {
          accessorial_charges?: number | null
          ai_extracted_data?: Json | null
          assigned_dispatcher?: string | null
          broker_id?: string | null
          carrier_id?: string | null
          carrier_reference?: string | null
          commodity_type?: string | null
          created_at?: string
          created_by?: string | null
          delivery_date?: string | null
          delivery_window?: Json | null
          destination: string
          dispatch_notes?: string | null
          distance_miles?: number | null
          equipment_type?: string | null
          fuel_surcharge?: number | null
          hazmat_info?: Json | null
          id?: string
          load_number: string
          origin: string
          pickup_date?: string | null
          pickup_window?: Json | null
          priority?: string | null
          rate?: number | null
          shipper_id?: string | null
          shipper_reference?: string | null
          special_instructions?: string | null
          status?: string
          temperature_range?: Json | null
          total_cost?: number | null
          updated_at?: string
          volume?: number | null
          weight?: number | null
        }
        Update: {
          accessorial_charges?: number | null
          ai_extracted_data?: Json | null
          assigned_dispatcher?: string | null
          broker_id?: string | null
          carrier_id?: string | null
          carrier_reference?: string | null
          commodity_type?: string | null
          created_at?: string
          created_by?: string | null
          delivery_date?: string | null
          delivery_window?: Json | null
          destination?: string
          dispatch_notes?: string | null
          distance_miles?: number | null
          equipment_type?: string | null
          fuel_surcharge?: number | null
          hazmat_info?: Json | null
          id?: string
          load_number?: string
          origin?: string
          pickup_date?: string | null
          pickup_window?: Json | null
          priority?: string | null
          rate?: number | null
          shipper_id?: string | null
          shipper_reference?: string | null
          special_instructions?: string | null
          status?: string
          temperature_range?: Json | null
          total_cost?: number | null
          updated_at?: string
          volume?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "loads_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loads_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loads_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          access_instructions: string | null
          address: Json
          appointment_required: boolean | null
          contact_info: Json | null
          coordinates: Json | null
          created_at: string
          dock_available: boolean | null
          forklift_available: boolean | null
          id: string
          location_name: string
          location_type: string | null
          operating_hours: Json | null
          status: string | null
          updated_at: string
        }
        Insert: {
          access_instructions?: string | null
          address: Json
          appointment_required?: boolean | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          dock_available?: boolean | null
          forklift_available?: boolean | null
          id?: string
          location_name: string
          location_type?: string | null
          operating_hours?: Json | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          access_instructions?: string | null
          address?: Json
          appointment_required?: boolean | null
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          dock_available?: boolean | null
          forklift_available?: boolean | null
          id?: string
          location_name?: string
          location_type?: string | null
          operating_hours?: Json | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_listings: {
        Row: {
          availability: Json | null
          category: string
          created_at: string
          created_by: string | null
          description: string
          expires_at: string | null
          id: string
          images: Json | null
          listing_status: string | null
          listing_title: string
          listing_type: string
          location: Json | null
          price: number | null
          price_type: string | null
          seller_id: string
          specifications: Json | null
          updated_at: string
        }
        Insert: {
          availability?: Json | null
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          expires_at?: string | null
          id?: string
          images?: Json | null
          listing_status?: string | null
          listing_title: string
          listing_type: string
          location?: Json | null
          price?: number | null
          price_type?: string | null
          seller_id: string
          specifications?: Json | null
          updated_at?: string
        }
        Update: {
          availability?: Json | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          expires_at?: string | null
          id?: string
          images?: Json | null
          listing_status?: string | null
          listing_title?: string
          listing_type?: string
          location?: Json | null
          price?: number | null
          price_type?: string | null
          seller_id?: string
          specifications?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_services: {
        Row: {
          api_documentation_url: string | null
          base_price: number | null
          coverage_area: Json | null
          created_at: string
          features: Json | null
          id: string
          integration_available: boolean | null
          onboarding_requirements: Json | null
          pricing_model: string | null
          pricing_tiers: Json | null
          provider_contact: Json | null
          provider_name: string
          rating: number | null
          review_count: number | null
          service_category: string
          service_description: string | null
          service_name: string
          service_status: string | null
          service_type: string | null
          updated_at: string
        }
        Insert: {
          api_documentation_url?: string | null
          base_price?: number | null
          coverage_area?: Json | null
          created_at?: string
          features?: Json | null
          id?: string
          integration_available?: boolean | null
          onboarding_requirements?: Json | null
          pricing_model?: string | null
          pricing_tiers?: Json | null
          provider_contact?: Json | null
          provider_name: string
          rating?: number | null
          review_count?: number | null
          service_category: string
          service_description?: string | null
          service_name: string
          service_status?: string | null
          service_type?: string | null
          updated_at?: string
        }
        Update: {
          api_documentation_url?: string | null
          base_price?: number | null
          coverage_area?: Json | null
          created_at?: string
          features?: Json | null
          id?: string
          integration_available?: boolean | null
          onboarding_requirements?: Json | null
          pricing_model?: string | null
          pricing_tiers?: Json | null
          provider_contact?: Json | null
          provider_name?: string
          rating?: number | null
          review_count?: number | null
          service_category?: string
          service_description?: string | null
          service_name?: string
          service_status?: string | null
          service_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      network_partners: {
        Row: {
          commission_rate: number | null
          company_id: string
          created_at: string
          created_by: string | null
          established_date: string | null
          id: string
          partner_company_id: string
          partnership_terms: Json | null
          partnership_type: string
          performance_metrics: Json | null
          preferred_lanes: Json | null
          relationship_status: string | null
          updated_at: string
        }
        Insert: {
          commission_rate?: number | null
          company_id: string
          created_at?: string
          created_by?: string | null
          established_date?: string | null
          id?: string
          partner_company_id: string
          partnership_terms?: Json | null
          partnership_type: string
          performance_metrics?: Json | null
          preferred_lanes?: Json | null
          relationship_status?: string | null
          updated_at?: string
        }
        Update: {
          commission_rate?: number | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          established_date?: string | null
          id?: string
          partner_company_id?: string
          partnership_terms?: Json | null
          partnership_type?: string
          performance_metrics?: Json | null
          preferred_lanes?: Json | null
          relationship_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "network_partners_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "network_partners_partner_company_id_fkey"
            columns: ["partner_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      openai_agent_permissions: {
        Row: {
          agent_type: string
          authorization_percentage: number
          capabilities: Json
          created_at: string
          human_oversight_required: boolean
          id: string
          permission_level: string
          updated_at: string
        }
        Insert: {
          agent_type: string
          authorization_percentage?: number
          capabilities?: Json
          created_at?: string
          human_oversight_required?: boolean
          id?: string
          permission_level?: string
          updated_at?: string
        }
        Update: {
          agent_type?: string
          authorization_percentage?: number
          capabilities?: Json
          created_at?: string
          human_oversight_required?: boolean
          id?: string
          permission_level?: string
          updated_at?: string
        }
        Relationships: []
      }
      owner_operator_invitations: {
        Row: {
          accepted_at: string | null
          carrier_id: string
          company_name: string | null
          created_at: string | null
          created_by: string | null
          dot_number: string | null
          email: string
          expires_at: string | null
          id: string
          invitation_code: string | null
          mc_number: string | null
          owner_operator_user_id: string | null
          phone: string | null
          sent_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          carrier_id: string
          company_name?: string | null
          created_at?: string | null
          created_by?: string | null
          dot_number?: string | null
          email: string
          expires_at?: string | null
          id?: string
          invitation_code?: string | null
          mc_number?: string | null
          owner_operator_user_id?: string | null
          phone?: string | null
          sent_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          carrier_id?: string
          company_name?: string | null
          created_at?: string | null
          created_by?: string | null
          dot_number?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          invitation_code?: string | null
          mc_number?: string | null
          owner_operator_user_id?: string | null
          phone?: string | null
          sent_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owner_operator_invitations_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          bank_info: Json | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string
          payment_method: string | null
          payment_number: string
          payment_status: string | null
          payment_type: string | null
          processing_fee: number | null
          reconciled_by: string | null
          reconciled_date: string | null
          reconciliation_status: string | null
          reference_number: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          bank_info?: Json | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          payment_number: string
          payment_status?: string | null
          payment_type?: string | null
          processing_fee?: number | null
          reconciled_by?: string | null
          reconciled_date?: string | null
          reconciliation_status?: string | null
          reference_number?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          bank_info?: Json | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          payment_number?: string
          payment_status?: string | null
          payment_type?: string | null
          processing_fee?: number | null
          reconciled_by?: string | null
          reconciled_date?: string | null
          reconciliation_status?: string | null
          reference_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "freight_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll: {
        Row: {
          created_at: string
          employee_id: string | null
          federal_tax: number | null
          gross_pay: number
          health_insurance: number | null
          id: string
          medicare: number | null
          net_pay: number
          other_deductions: number | null
          overtime_hours: number | null
          overtime_rate: number | null
          pay_date: string | null
          pay_method: string | null
          pay_period_end: string
          pay_period_start: string
          pay_status: string | null
          processed_by: string | null
          processed_date: string | null
          regular_hours: number | null
          regular_rate: number
          retirement_contribution: number | null
          social_security: number | null
          state_tax: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          employee_id?: string | null
          federal_tax?: number | null
          gross_pay: number
          health_insurance?: number | null
          id?: string
          medicare?: number | null
          net_pay: number
          other_deductions?: number | null
          overtime_hours?: number | null
          overtime_rate?: number | null
          pay_date?: string | null
          pay_method?: string | null
          pay_period_end: string
          pay_period_start: string
          pay_status?: string | null
          processed_by?: string | null
          processed_date?: string | null
          regular_hours?: number | null
          regular_rate: number
          retirement_contribution?: number | null
          social_security?: number | null
          state_tax?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          employee_id?: string | null
          federal_tax?: number | null
          gross_pay?: number
          health_insurance?: number | null
          id?: string
          medicare?: number | null
          net_pay?: number
          other_deductions?: number | null
          overtime_hours?: number | null
          overtime_rate?: number | null
          pay_date?: string | null
          pay_method?: string | null
          pay_period_end?: string
          pay_period_start?: string
          pay_status?: string | null
          processed_by?: string | null
          processed_date?: string | null
          regular_hours?: number | null
          regular_rate?: number
          retirement_contribution?: number | null
          social_security?: number | null
          state_tax?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      portal_access_logs: {
        Row: {
          accessed_at: string | null
          carrier_id: string | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          portal_type: string
          session_duration_minutes: number | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          accessed_at?: string | null
          carrier_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          portal_type: string
          session_duration_minutes?: number | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          accessed_at?: string | null
          carrier_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          portal_type?: string
          session_duration_minutes?: number | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portal_access_logs_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          carrier_id: string | null
          company: string | null
          created_at: string
          driver_license_expiry: string | null
          driver_license_number: string | null
          driver_performance_metrics: Json | null
          driver_status: string | null
          email: string
          emergency_contact: Json | null
          hire_date: string | null
          id: string
          last_login: string | null
          location: Json | null
          login_id: string | null
          name: string
          phone: string | null
          role: string
          status: string
          termination_date: string | null
          updated_at: string
          user_id: string
          vehicle_assigned: string | null
        }
        Insert: {
          avatar?: string | null
          carrier_id?: string | null
          company?: string | null
          created_at?: string
          driver_license_expiry?: string | null
          driver_license_number?: string | null
          driver_performance_metrics?: Json | null
          driver_status?: string | null
          email: string
          emergency_contact?: Json | null
          hire_date?: string | null
          id?: string
          last_login?: string | null
          location?: Json | null
          login_id?: string | null
          name: string
          phone?: string | null
          role?: string
          status?: string
          termination_date?: string | null
          updated_at?: string
          user_id: string
          vehicle_assigned?: string | null
        }
        Update: {
          avatar?: string | null
          carrier_id?: string | null
          company?: string | null
          created_at?: string
          driver_license_expiry?: string | null
          driver_license_number?: string | null
          driver_performance_metrics?: Json | null
          driver_status?: string | null
          email?: string
          emergency_contact?: Json | null
          hire_date?: string | null
          id?: string
          last_login?: string | null
          location?: Json | null
          login_id?: string | null
          name?: string
          phone?: string | null
          role?: string
          status?: string
          termination_date?: string | null
          updated_at?: string
          user_id?: string
          vehicle_assigned?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          accessorial_charges: Json | null
          approval_date: string | null
          approved_by: string | null
          commodity_details: Json | null
          converted_to_load: boolean | null
          created_at: string
          created_by: string | null
          customer_id: string | null
          delivery_date: string | null
          delivery_location: Json
          dimensions: Json | null
          equipment_type: string | null
          fuel_surcharge: number | null
          id: string
          load_id: string | null
          notes: string | null
          pickup_date: string | null
          pickup_location: Json
          quote_number: string
          quote_status: string | null
          quote_type: string | null
          quote_validity_days: number | null
          quoted_rate: number
          service_type: string | null
          total_quote: number
          updated_at: string
          weight: number | null
        }
        Insert: {
          accessorial_charges?: Json | null
          approval_date?: string | null
          approved_by?: string | null
          commodity_details?: Json | null
          converted_to_load?: boolean | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          delivery_location: Json
          dimensions?: Json | null
          equipment_type?: string | null
          fuel_surcharge?: number | null
          id?: string
          load_id?: string | null
          notes?: string | null
          pickup_date?: string | null
          pickup_location: Json
          quote_number: string
          quote_status?: string | null
          quote_type?: string | null
          quote_validity_days?: number | null
          quoted_rate: number
          service_type?: string | null
          total_quote: number
          updated_at?: string
          weight?: number | null
        }
        Update: {
          accessorial_charges?: Json | null
          approval_date?: string | null
          approved_by?: string | null
          commodity_details?: Json | null
          converted_to_load?: boolean | null
          created_at?: string
          created_by?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          delivery_location?: Json
          dimensions?: Json | null
          equipment_type?: string | null
          fuel_surcharge?: number | null
          id?: string
          load_id?: string | null
          notes?: string | null
          pickup_date?: string | null
          pickup_location?: Json
          quote_number?: string
          quote_status?: string | null
          quote_type?: string | null
          quote_validity_days?: number | null
          quoted_rate?: number
          service_type?: string | null
          total_quote?: number
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_integration_settings: {
        Row: {
          auto_approval_threshold: number | null
          auto_sync_enabled: boolean | null
          broker_id: string
          carrier_id: string
          created_at: string | null
          default_margin_percentage: number | null
          id: string
          integration_status: string | null
          last_sync: string | null
          max_margin_percentage: number | null
          min_margin_percentage: number | null
          settings: Json | null
          sync_frequency: string | null
          updated_at: string | null
        }
        Insert: {
          auto_approval_threshold?: number | null
          auto_sync_enabled?: boolean | null
          broker_id: string
          carrier_id: string
          created_at?: string | null
          default_margin_percentage?: number | null
          id?: string
          integration_status?: string | null
          last_sync?: string | null
          max_margin_percentage?: number | null
          min_margin_percentage?: number | null
          settings?: Json | null
          sync_frequency?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_approval_threshold?: number | null
          auto_sync_enabled?: boolean | null
          broker_id?: string
          carrier_id?: string
          created_at?: string | null
          default_margin_percentage?: number | null
          id?: string
          integration_status?: string | null
          last_sync?: string | null
          max_margin_percentage?: number | null
          min_margin_percentage?: number | null
          settings?: Json | null
          sync_frequency?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_transactions: {
        Row: {
          broker_id: string
          broker_rate_id: string | null
          carrier_id: string
          carrier_rate_id: string | null
          created_at: string | null
          id: string
          initiated_at: string | null
          initiated_by: string | null
          margin_applied: number | null
          negotiated_rate: number | null
          notes: string | null
          original_rate: number
          responded_at: string | null
          responded_by: string | null
          status: string | null
          transaction_id: string
          transaction_type: string
        }
        Insert: {
          broker_id: string
          broker_rate_id?: string | null
          carrier_id: string
          carrier_rate_id?: string | null
          created_at?: string | null
          id?: string
          initiated_at?: string | null
          initiated_by?: string | null
          margin_applied?: number | null
          negotiated_rate?: number | null
          notes?: string | null
          original_rate: number
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          transaction_id: string
          transaction_type: string
        }
        Update: {
          broker_id?: string
          broker_rate_id?: string | null
          carrier_id?: string
          carrier_rate_id?: string | null
          created_at?: string | null
          id?: string
          initiated_at?: string | null
          initiated_by?: string | null
          margin_applied?: number | null
          negotiated_rate?: number | null
          notes?: string | null
          original_rate?: number
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          transaction_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "rate_transactions_broker_rate_id_fkey"
            columns: ["broker_rate_id"]
            isOneToOne: false
            referencedRelation: "broker_rates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rate_transactions_carrier_rate_id_fkey"
            columns: ["carrier_rate_id"]
            isOneToOne: false
            referencedRelation: "carrier_rates"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          created_by: string | null
          data_source: string
          id: string
          is_scheduled: boolean | null
          last_run: string | null
          output_format: string | null
          parameters: Json | null
          query_config: Json
          recipients: Json | null
          report_category: string
          report_name: string
          report_type: string
          schedule_config: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          data_source: string
          id?: string
          is_scheduled?: boolean | null
          last_run?: string | null
          output_format?: string | null
          parameters?: Json | null
          query_config?: Json
          recipients?: Json | null
          report_category: string
          report_name: string
          report_type: string
          schedule_config?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          data_source?: string
          id?: string
          is_scheduled?: boolean | null
          last_run?: string | null
          output_format?: string | null
          parameters?: Json | null
          query_config?: Json
          recipients?: Json | null
          report_category?: string
          report_name?: string
          report_type?: string
          schedule_config?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          ai_optimized: boolean | null
          created_at: string
          driver_id: string | null
          estimated_duration_hours: number | null
          estimated_fuel_cost: number | null
          id: string
          route_data: Json | null
          shipment_id: string | null
          traffic_conditions: string | null
          updated_at: string
          vehicle_id: string | null
          weather_conditions: string | null
        }
        Insert: {
          ai_optimized?: boolean | null
          created_at?: string
          driver_id?: string | null
          estimated_duration_hours?: number | null
          estimated_fuel_cost?: number | null
          id?: string
          route_data?: Json | null
          shipment_id?: string | null
          traffic_conditions?: string | null
          updated_at?: string
          vehicle_id?: string | null
          weather_conditions?: string | null
        }
        Update: {
          ai_optimized?: boolean | null
          created_at?: string
          driver_id?: string | null
          estimated_duration_hours?: number | null
          estimated_fuel_cost?: number | null
          id?: string
          route_data?: Json | null
          shipment_id?: string | null
          traffic_conditions?: string | null
          updated_at?: string
          vehicle_id?: string | null
          weather_conditions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      shipment_documents: {
        Row: {
          created_at: string
          document_name: string
          document_type: string
          document_url: string
          id: string
          shipment_id: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          document_type: string
          document_url: string
          id?: string
          shipment_id: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          document_type?: string
          document_url?: string
          id?: string
          shipment_id?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_documents_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipment_status_history: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          location: string | null
          notes: string | null
          shipment_id: string
          status: string
          status_date: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          shipment_id: string
          status: string
          status_date?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          shipment_id?: string
          status?: string
          status_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipment_status_history_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipment_tracking: {
        Row: {
          created_at: string
          created_by: string | null
          driver_notes: string | null
          id: string
          location: Json
          photos: Json | null
          shipment_id: string
          signature_data: Json | null
          status_update: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          driver_notes?: string | null
          id?: string
          location: Json
          photos?: Json | null
          shipment_id: string
          signature_data?: Json | null
          status_update: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          driver_notes?: string | null
          id?: string
          location?: Json
          photos?: Json | null
          shipment_id?: string
          signature_data?: Json | null
          status_update?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipment_tracking_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          ai_recommendations: Json | null
          assigned_to: string | null
          carrier_id: string | null
          created_at: string
          created_by: string | null
          customer_reference: string | null
          delivery_date: string | null
          delivery_window: Json | null
          destination: string
          distance_miles: number | null
          driver_id: string | null
          equipment_type: string | null
          estimated_delivery: string | null
          fuel_cost: number | null
          hazmat_info: Json | null
          id: string
          origin: string
          pickup_date: string | null
          pickup_window: Json | null
          priority: string | null
          rate: number | null
          shipment_number: string
          shipper_id: string | null
          special_instructions: string | null
          status: string
          temperature_range: Json | null
          updated_at: string
          value: number | null
          vehicle_id: string | null
          volume: number | null
          weight: number | null
        }
        Insert: {
          ai_recommendations?: Json | null
          assigned_to?: string | null
          carrier_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_reference?: string | null
          delivery_date?: string | null
          delivery_window?: Json | null
          destination: string
          distance_miles?: number | null
          driver_id?: string | null
          equipment_type?: string | null
          estimated_delivery?: string | null
          fuel_cost?: number | null
          hazmat_info?: Json | null
          id?: string
          origin: string
          pickup_date?: string | null
          pickup_window?: Json | null
          priority?: string | null
          rate?: number | null
          shipment_number: string
          shipper_id?: string | null
          special_instructions?: string | null
          status?: string
          temperature_range?: Json | null
          updated_at?: string
          value?: number | null
          vehicle_id?: string | null
          volume?: number | null
          weight?: number | null
        }
        Update: {
          ai_recommendations?: Json | null
          assigned_to?: string | null
          carrier_id?: string | null
          created_at?: string
          created_by?: string | null
          customer_reference?: string | null
          delivery_date?: string | null
          delivery_window?: Json | null
          destination?: string
          distance_miles?: number | null
          driver_id?: string | null
          equipment_type?: string | null
          estimated_delivery?: string | null
          fuel_cost?: number | null
          hazmat_info?: Json | null
          id?: string
          origin?: string
          pickup_date?: string | null
          pickup_window?: Json | null
          priority?: string | null
          rate?: number | null
          shipment_number?: string
          shipper_id?: string | null
          special_instructions?: string | null
          status?: string
          temperature_range?: Json | null
          updated_at?: string
          value?: number | null
          vehicle_id?: string | null
          volume?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_carrier_id_fkey"
            columns: ["carrier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_shipper_id_fkey"
            columns: ["shipper_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_health_metrics: {
        Row: {
          created_at: string
          id: string
          metric_name: string
          metric_value: number
          server_instance: string | null
          timestamp: string
          unit: string
        }
        Insert: {
          created_at?: string
          id?: string
          metric_name: string
          metric_value: number
          server_instance?: string | null
          timestamp?: string
          unit: string
        }
        Update: {
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: number
          server_instance?: string | null
          timestamp?: string
          unit?: string
        }
        Relationships: []
      }
      task_completions: {
        Row: {
          agent_id: string
          completed_at: string
          created_at: string
          duration: number | null
          id: string
          result: string | null
          status: string
          task_id: string
        }
        Insert: {
          agent_id: string
          completed_at?: string
          created_at?: string
          duration?: number | null
          id?: string
          result?: string | null
          status: string
          task_id: string
        }
        Update: {
          agent_id?: string
          completed_at?: string
          created_at?: string
          duration?: number | null
          id?: string
          result?: string | null
          status?: string
          task_id?: string
        }
        Relationships: []
      }
      terminals: {
        Row: {
          address: Json
          capacity_info: Json | null
          contact_info: Json | null
          created_at: string
          dock_count: number | null
          equipment_available: string[] | null
          hazmat_capable: boolean | null
          id: string
          operating_hours: Json | null
          security_level: string | null
          status: string | null
          temperature_controlled: boolean | null
          terminal_code: string | null
          terminal_name: string
          terminal_type: string | null
          updated_at: string
        }
        Insert: {
          address: Json
          capacity_info?: Json | null
          contact_info?: Json | null
          created_at?: string
          dock_count?: number | null
          equipment_available?: string[] | null
          hazmat_capable?: boolean | null
          id?: string
          operating_hours?: Json | null
          security_level?: string | null
          status?: string | null
          temperature_controlled?: boolean | null
          terminal_code?: string | null
          terminal_name: string
          terminal_type?: string | null
          updated_at?: string
        }
        Update: {
          address?: Json
          capacity_info?: Json | null
          contact_info?: Json | null
          created_at?: string
          dock_count?: number | null
          equipment_available?: string[] | null
          hazmat_capable?: boolean | null
          id?: string
          operating_hours?: Json | null
          security_level?: string | null
          status?: string | null
          temperature_controlled?: boolean | null
          terminal_code?: string | null
          terminal_name?: string
          terminal_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          customer_id: string | null
          customer_satisfaction_rating: number | null
          description: string | null
          due_date: string | null
          escalation_level: number | null
          id: string
          internal_notes: string | null
          load_id: string | null
          priority: string | null
          reported_by: string | null
          resolution: string | null
          resolution_date: string | null
          shipment_id: string | null
          status: string | null
          subcategory: string | null
          subject: string
          ticket_number: string
          ticket_type: string | null
          time_spent_minutes: number | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          customer_id?: string | null
          customer_satisfaction_rating?: number | null
          description?: string | null
          due_date?: string | null
          escalation_level?: number | null
          id?: string
          internal_notes?: string | null
          load_id?: string | null
          priority?: string | null
          reported_by?: string | null
          resolution?: string | null
          resolution_date?: string | null
          shipment_id?: string | null
          status?: string | null
          subcategory?: string | null
          subject: string
          ticket_number: string
          ticket_type?: string | null
          time_spent_minutes?: number | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          customer_id?: string | null
          customer_satisfaction_rating?: number | null
          description?: string | null
          due_date?: string | null
          escalation_level?: number | null
          id?: string
          internal_notes?: string | null
          load_id?: string | null
          priority?: string | null
          reported_by?: string | null
          resolution?: string | null
          resolution_date?: string | null
          shipment_id?: string | null
          status?: string | null
          subcategory?: string | null
          subject?: string
          ticket_number?: string
          ticket_type?: string | null
          time_spent_minutes?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_load_id_fkey"
            columns: ["load_id"]
            isOneToOne: false
            referencedRelation: "loads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking_events: {
        Row: {
          ai_generated: boolean | null
          event_type: string
          id: string
          location: string | null
          notes: string | null
          shipment_id: string | null
          timestamp: string
        }
        Insert: {
          ai_generated?: boolean | null
          event_type: string
          id?: string
          location?: string | null
          notes?: string | null
          shipment_id?: string | null
          timestamp?: string
        }
        Update: {
          ai_generated?: boolean | null
          event_type?: string
          id?: string
          location?: string | null
          notes?: string | null
          shipment_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracking_events_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          capacity_volume: number | null
          capacity_weight: number | null
          created_at: string
          current_driver_id: string | null
          current_location: Json | null
          dot_inspection_date: string | null
          equipment_features: string[] | null
          fuel_type: string | null
          id: string
          inspection_expiry: string | null
          insurance_info: Json | null
          license_plate: string | null
          maintenance_schedule: Json | null
          make: string | null
          mileage: number | null
          model: string | null
          owner_id: string | null
          owner_type: string | null
          registration_expiry: string | null
          status: string | null
          unit_number: string
          unit_type: string
          updated_at: string
          vin: string | null
          year: number | null
        }
        Insert: {
          capacity_volume?: number | null
          capacity_weight?: number | null
          created_at?: string
          current_driver_id?: string | null
          current_location?: Json | null
          dot_inspection_date?: string | null
          equipment_features?: string[] | null
          fuel_type?: string | null
          id?: string
          inspection_expiry?: string | null
          insurance_info?: Json | null
          license_plate?: string | null
          maintenance_schedule?: Json | null
          make?: string | null
          mileage?: number | null
          model?: string | null
          owner_id?: string | null
          owner_type?: string | null
          registration_expiry?: string | null
          status?: string | null
          unit_number: string
          unit_type: string
          updated_at?: string
          vin?: string | null
          year?: number | null
        }
        Update: {
          capacity_volume?: number | null
          capacity_weight?: number | null
          created_at?: string
          current_driver_id?: string | null
          current_location?: Json | null
          dot_inspection_date?: string | null
          equipment_features?: string[] | null
          fuel_type?: string | null
          id?: string
          inspection_expiry?: string | null
          insurance_info?: Json | null
          license_plate?: string | null
          maintenance_schedule?: Json | null
          make?: string | null
          mileage?: number | null
          model?: string | null
          owner_id?: string | null
          owner_type?: string | null
          registration_expiry?: string | null
          status?: string | null
          unit_number?: string
          unit_type?: string
          updated_at?: string
          vin?: string | null
          year?: number | null
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          created_at: string
          duration_ms: number | null
          event_data: Json
          event_type: string
          feature_name: string | null
          id: string
          page_path: string | null
          session_id: string
          timestamp: string
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          event_data?: Json
          event_type: string
          feature_name?: string | null
          id?: string
          page_path?: string | null
          session_id: string
          timestamp?: string
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          event_data?: Json
          event_type?: string
          feature_name?: string | null
          id?: string
          page_path?: string | null
          session_id?: string
          timestamp?: string
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          duration_minutes: number | null
          end_time: string | null
          features_used: Json | null
          id: string
          interactions_count: number | null
          page_views: number | null
          session_id: string
          start_time: string
          updated_at: string
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          end_time?: string | null
          features_used?: Json | null
          id?: string
          interactions_count?: number | null
          page_views?: number | null
          session_id: string
          start_time?: string
          updated_at?: string
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          end_time?: string | null
          features_used?: Json | null
          id?: string
          interactions_count?: number | null
          page_views?: number | null
          session_id?: string
          start_time?: string
          updated_at?: string
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          capacity_volume: number | null
          capacity_weight: number | null
          company_id: string | null
          created_at: string
          current_location: string | null
          id: string
          last_maintenance: string | null
          status: string
          type: string
          updated_at: string
          vehicle_number: string
        }
        Insert: {
          capacity_volume?: number | null
          capacity_weight?: number | null
          company_id?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          last_maintenance?: string | null
          status?: string
          type: string
          updated_at?: string
          vehicle_number: string
        }
        Update: {
          capacity_volume?: number | null
          capacity_weight?: number | null
          company_id?: string | null
          created_at?: string
          current_location?: string | null
          id?: string
          last_maintenance?: string | null
          status?: string
          type?: string
          updated_at?: string
          vehicle_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          billing_address: Json | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contract_details: Json | null
          created_at: string
          id: string
          payment_terms: string | null
          performance_rating: number | null
          services_provided: string[] | null
          tax_id: string | null
          updated_at: string
          vendor_name: string
          vendor_status: string | null
          vendor_type: string
        }
        Insert: {
          billing_address?: Json | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_details?: Json | null
          created_at?: string
          id?: string
          payment_terms?: string | null
          performance_rating?: number | null
          services_provided?: string[] | null
          tax_id?: string | null
          updated_at?: string
          vendor_name: string
          vendor_status?: string | null
          vendor_type: string
        }
        Update: {
          billing_address?: Json | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contract_details?: Json | null
          created_at?: string
          id?: string
          payment_terms?: string | null
          performance_rating?: number | null
          services_provided?: string[] | null
          tax_id?: string | null
          updated_at?: string
          vendor_name?: string
          vendor_status?: string | null
          vendor_type?: string
        }
        Relationships: []
      }
      workers: {
        Row: {
          certifications: Json | null
          company_id: string
          contact_info: Json | null
          created_at: string
          created_by: string | null
          emergency_contact: Json | null
          employment_status: string | null
          first_name: string
          hire_date: string | null
          id: string
          last_name: string
          license_info: Json | null
          pay_rate: number | null
          pay_type: string | null
          performance_metrics: Json | null
          updated_at: string
          user_id: string | null
          worker_id: string
          worker_type: string
        }
        Insert: {
          certifications?: Json | null
          company_id: string
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          emergency_contact?: Json | null
          employment_status?: string | null
          first_name: string
          hire_date?: string | null
          id?: string
          last_name: string
          license_info?: Json | null
          pay_rate?: number | null
          pay_type?: string | null
          performance_metrics?: Json | null
          updated_at?: string
          user_id?: string | null
          worker_id: string
          worker_type: string
        }
        Update: {
          certifications?: Json | null
          company_id?: string
          contact_info?: Json | null
          created_at?: string
          created_by?: string | null
          emergency_contact?: Json | null
          employment_status?: string | null
          first_name?: string
          hire_date?: string | null
          id?: string
          last_name?: string
          license_info?: Json | null
          pay_rate?: number | null
          pay_type?: string | null
          performance_metrics?: Json | null
          updated_at?: string
          user_id?: string | null
          worker_id?: string
          worker_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "workers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      autonomous_agent_performance_summary: {
        Row: {
          active_tasks: number | null
          agent_type: string | null
          avg_duration_minutes: number | null
          completed_tasks: number | null
          failed_tasks: number | null
          last_task_created: string | null
          pending_tasks: number | null
          total_tasks: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      activate_full_autonomous_control: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      assign_driver_to_carrier: {
        Args:
          | { carrier_id: number; driver_id: number }
          | {
              p_carrier_id: string
              p_driver_user_id: string
              p_invitation_id: string
            }
        Returns: undefined
      }
      autonomous_24_7_operation: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      autonomous_realtime_monitoring: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      autonomous_system_operation: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      calculate_broker_margin: {
        Args: { carrier_rate_amount: number; margin_percentage?: number }
        Returns: number
      }
      get_active_autonomous_tasks: {
        Args: { p_agent_type?: string }
        Returns: {
          agent_type: string
          created_at: string
          priority: number
          status: string
          task_id: string
          task_name: string
        }[]
      }
      get_agent_performance_metrics: {
        Args: { p_agent_type: string }
        Returns: {
          avg_duration_minutes: number
          completed_tasks: number
          success_rate: number
          total_tasks: number
        }[]
      }
      get_carrier_drivers: {
        Args: { p_carrier_id: string }
        Returns: {
          created_at: string
          driver_license_number: string
          driver_status: string
          email: string
          last_login: string
          name: string
          user_id: string
          vehicle_assigned: string
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_context: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_authenticated_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      refresh_autonomous_agent_performance: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      validate_full_autonomous_access: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "carrier_admin"
        | "freight_broker_admin"
        | "shipper_admin"
        | "driver"
        | "owner_operator"
        | "factoring_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "carrier_admin",
        "freight_broker_admin",
        "shipper_admin",
        "driver",
        "owner_operator",
        "factoring_admin",
      ],
    },
  },
} as const
