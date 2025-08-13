import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")!;

serve(async (req) => {
  try {
    const { load_id } = await req.json();
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Get load details
    const { data: load } = await supabase.from('loads').select('*').eq('id', load_id).single();
    if (!load) throw new Error('Load not found');

    // Get candidate carriers for the company
    const { data: carriers } = await supabase
      .from('carriers')
      .select('id, name, equipment, lanes, company_id')
      .eq('company_id', load.company_id);

    if (!carriers?.length) {
      console.log('No carriers found for company:', load.company_id);
      return new Response(JSON.stringify({ ok: true, count: 0, message: 'No carriers available' }), { status: 200 });
    }

    // Prepare data for AI analysis
    const analysisData = {
      load: {
        id: load.id,
        equipment: load.equipment,
        pickup: load.pickup,
        dropoff: load.dropoff,
        rate: load.rate
      },
      carriers: carriers.map(c => ({
        id: c.id,
        name: c.name,
        equipment: c.equipment,
        lanes: c.lanes
      }))
    };

    // Call OpenAI for carrier scoring
    const prompt = {
      role: "system",
      content: `You are an expert logistics AI that ranks carriers 0-1 suitability for loads. Consider:
1. Equipment match (van/reefer/flatbed compatibility)
2. Lane fit (origin/destination alignment with carrier's preferred lanes)
3. General availability and reliability
4. Rate competitiveness

Return a JSON array of {carrier_id, score, rationale} where score is 0-1.`
    };

    const user = {
      role: "user",
      content: JSON.stringify(analysisData)
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${OPENAI_API_KEY}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [prompt, user],
        temperature: 0.1,
        response_format: { type: "json_object" },
        tools: [{
          type: "function",
          function: {
            name: "rank_carriers",
            description: "Return array of {carrier_id, score, rationale}",
            parameters: {
              type: "object",
              properties: {
                rankings: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      carrier_id: { type: "string" },
                      score: { type: "number" },
                      rationale: { type: "string" }
                    }, 
                    required: ["carrier_id","score"]
                  }
                }
              }, 
              required: ["rankings"]
            }
          }
        }]
      })
    }).then(r => r.json());

    const tool = resp?.choices?.[0]?.message?.tool_calls?.[0];
    const payload = tool ? JSON.parse(tool.function.arguments) : { rankings: [] };

    if (payload.rankings?.length) {
      // Insert recommendations into database
      const rows = payload.rankings.slice(0, 10).map((r: any) => ({
        load_id, 
        carrier_id: r.carrier_id, 
        score: r.score, 
        rationale: r.rationale ?? null
      }));
      
      const { error: insertError } = await supabase.from('carrier_recommendations').upsert(rows);
      if (insertError) throw insertError;

      // Create assignment proposal for top carrier
      const topCarrier = payload.rankings[0];
      if (topCarrier && topCarrier.score > 0.5) {
        const { error: assignError } = await supabase.from('assignments').insert({
          company_id: load.company_id,
          load_id: load.id,
          carrier_id: topCarrier.carrier_id,
          status: 'proposed',
          agreed_rate: load.rate * 0.9 // 10% margin for carrier
        });
        if (assignError) console.error('Assignment creation failed:', assignError);
      }

      console.log(`Created ${rows.length} recommendations for load ${load_id}`);
    }

    return new Response(JSON.stringify({ 
      ok: true, 
      count: payload.rankings?.length || 0,
      top_score: payload.rankings?.[0]?.score || 0
    }), { status: 200 });
  } catch (e) {
    console.error('AI Load Matcher Error:', e);
    return new Response(JSON.stringify({ ok: false, error: `${e}` }), { status: 400 });
  }
});
