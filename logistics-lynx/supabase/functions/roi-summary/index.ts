import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function html({ company, calc }: { company: string; calc: unknown }) {
  return `<!doctype html><meta charset="utf-8" />
    <style>body{font-family:ui-sans-serif,system-ui;max-width:720px;margin:24px auto;padding:16px;line-height:1.5}
    h1{font-size:20px} .kpi{display:inline-block;margin-right:24px}</style>
    <h1>Trans Bot AI — ROI Summary for ${company}</h1>
    <p><b>Monthly Impact:</b> $${Math.round(calc.monthlyImpact).toLocaleString()}</p>
    <div class="kpi"><b>Added GP:</b> $${Math.round(calc.incrGP).toLocaleString()}</div>
    <div class="kpi"><b>Time Saved:</b> ${calc.hrsSaved.toFixed(1)} hrs</div>
    <div class="kpi"><b>Payback:</b> ${calc.paybackDays ? `${calc.paybackDays} days` : "—"}</div>
    <p>*Estimates are illustrative; actuals vary by lane/seasonality.</p>`;
}

serve(async (req) => {
  try {
    const payload = await req.json(); // { id, company_name, calc }
    const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    
    const bytes = new TextEncoder().encode(html({ company: payload.company_name, calc: payload.calc }));
    const path = `roi/${payload.id}.html`;
    
    const { error } = await supa.storage.from("public").upload(path, bytes, { 
      contentType: "text/html", 
      upsert: true 
    });
    
    if (error) throw error;
    
    const { data } = supa.storage.from("public").getPublicUrl(path);
    return new Response(JSON.stringify({ url: data.publicUrl }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400 });
  }
});
