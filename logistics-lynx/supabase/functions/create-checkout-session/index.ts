import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });

const PRICE = {
  starter: Deno.env.get("STRIPE_PRICE_STARTER")!,
  pro: Deno.env.get("STRIPE_PRICE_PRO")!,
};

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  
  const { email, plan = "starter", return_url = "https://app.transbotai.com" } = await req.json();

  const customers = await stripe.customers.list({ email, limit: 1 });
  const customer = customers.data[0] ?? await stripe.customers.create({ email });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customer.id,
    line_items: [{ price: PRICE[plan], quantity: 1 }],
    success_url: `${return_url}?checkout=success`,
    cancel_url: `${return_url}?checkout=cancel`,
    allow_promotion_codes: true,
  });

  return new Response(JSON.stringify({ url: session.url }), { 
    status: 200, 
    headers: { "Content-Type": "application/json" } 
  });
});
