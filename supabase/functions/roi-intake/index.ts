import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const N8N_ROI_WEBHOOK = Deno.env.get("N8N_ROI_WEBHOOK")!; // optional

serve(async (req) => {
  try {
    const body = await req.json();
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Validate required fields
    if (!body.company_name || !body.contact_email || !body.monthly_quotes) {
      return new Response(JSON.stringify({ 
        ok: false, 
        error: "Missing required fields: company_name, contact_email, monthly_quotes" 
      }), { status: 400 });
    }

    // persist to DB (server-side)
    const { data, error } = await supa.from('roi_estimates').insert(body).select('id').single();
    if (error) throw error;

    // fan-out to n8n (lead + trial + slack)
    if (N8N_ROI_WEBHOOK) {
      try {
        await fetch(N8N_ROI_WEBHOOK, { 
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ 
            roi_id: data.id, 
            ...body,
            timestamp: new Date().toISOString()
          }) 
        });
      } catch (n8nError) {
        console.error("N8N webhook failed:", n8nError);
        // Don't fail the request if n8n is down
      }
    }

    return new Response(JSON.stringify({ 
      ok: true, 
      id: data.id,
      message: "ROI estimate saved successfully"
    }), { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("ROI intake error:", e);
    return new Response(JSON.stringify({ 
      ok: false, 
      error: String(e) 
    }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
});
