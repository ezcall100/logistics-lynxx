import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2023-10-16" });
const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const PRICE_TO_PLAN: Record<string, "starter"|"pro"|"enterprise"> = {
  [Deno.env.get("STRIPE_PRICE_STARTER")!]: "starter",
  [Deno.env.get("STRIPE_PRICE_PRO")!]: "pro",
};

serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Signature error: ${err}`, { status: 400 });
  }

  const supa = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  async function setEntitlement(customerId: string, plan: string, trialEnd?: number) {
    // Look up your company_id from Stripe customer metadata
    const { data: org } = await supa
      .from("companies")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (!org) return;

    await supa.from("org_entitlements").upsert({
      company_id: org.id,
      plan_id: plan,
      started_at: new Date().toISOString(),
      trial_ends_at: trialEnd ? new Date(trialEnd * 1000).toISOString() : null,
    }, { onConflict: "company_id" });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const price = (s.line_items?.data?.[0]?.price?.id) || (s.metadata?.price_id);
        const plan = PRICE_TO_PLAN[price ?? ""] ?? "enterprise";
        await setEntitlement(String(s.customer), plan, s.expires_at ?? undefined);
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object as Stripe.Subscription;
        const price = sub.items.data[0].price.id;
        const plan = PRICE_TO_PLAN[price] ?? "enterprise";
        await setEntitlement(String(sub.customer), plan, sub.trial_end ?? undefined);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await setEntitlement(String(sub.customer), "starter"); // or downgrade/free
        break;
      }
    }
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response(`error: ${e}`, { status: 500 });
  }
});
