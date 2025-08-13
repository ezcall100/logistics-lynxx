# 🚀 Phase 6 GTM Production Deployment Package

## 📋 Deployment Checklist

### 1. Environment & Secrets Setup

```bash
# Production Environment Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...

# n8n Integration
N8N_ROI_WEBHOOK=https://n8n.transbotai.com/webhook/roi-intake
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# App Configuration
APP_DASHBOARD_URL=https://app.transbotai.com
NEXT_PUBLIC_APP_URL=https://app.transbotai.com
```

### 2. Database Deployment

```bash
# Deploy database schema (already merged)
cd logistics-lynx
supabase db push

# Verify ROI table exists
supabase db query "SELECT COUNT(*) FROM roi_estimates;"
```

### 3. Edge Functions Deployment

```bash
# Deploy existing functions
supabase functions deploy roi-intake
supabase functions deploy stripe-webhook

# Deploy new add-on functions
supabase functions deploy create-checkout-session
supabase functions deploy roi-summary
```

### 4. n8n Workflow Setup

Import the ROI Lead → Trial → Slack workflow from `n8n-workflows/roi-intake-automation.json`

Map production credentials:
- Supabase Service Role Key
- Stripe API Keys
- SMTP Configuration
- Slack Webhook URL
- CRM Integration

### 5. Website Configuration

```bash
# Enable ROI feature flag
supabase db query "UPDATE feature_flags SET enabled = true WHERE key = 'public_roi';"

# Publish /roi page and link from Home + Rates pages
```

### 6. Smoke Tests

```bash
# Test ROI intake
curl -X POST https://api.transbotai.com/functions/v1/roi-intake \
  -H "Content-Type: application/json" \
  -d '{
    "company_name":"Acme Freight",
    "contact_email":"ops@acme.com",
    "monthly_quotes":200,
    "win_rate_before":20,
    "avg_revenue_per_load":1800,
    "avg_margin_before":12,
    "minutes_per_quote":12,
    "plan":"starter",
    "uplift_win_rate":5,
    "uplift_margin_pts":1.2,
    "time_reduction_pct":60,
    "labor_cost_per_hour":45,
    "utm_source":"demo",
    "utm_medium":"email",
    "utm_campaign":"launch"
  }'

# Test Stripe webhook (using CLI)
stripe listen --forward-to https://api.transbotai.com/functions/v1/stripe-webhook
stripe trigger checkout.session.completed
```

---

## 🧩 Add-On #1: Create Checkout Session

### Edge Function: `supabase/functions/create-checkout-session/index.ts`

```typescript
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
```

### ROI Page Integration

Update the ROI calculator to include checkout deep-linking:

```typescript
// Add to ROI calculator after successful calculation
const handleStartTrial = async () => {
  try {
    const res = await fetch("/functions/v1/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.contactEmail,
        plan: data.plan,
        return_url: process.env.NEXT_PUBLIC_APP_URL
      })
    });
    
    const { url } = await res.json();
    window.location.href = url; // Jump straight to checkout
  } catch (error) {
    console.error("Checkout error:", error);
  }
};
```

---

## 🧩 Add-On #2: ROI HTML Summary

### Edge Function: `supabase/functions/roi-summary/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function html({ company, calc }: any) {
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
```

---

## 🧩 Add-On #3: Lead-Scored Slack Notifications

### Enhanced n8n Slack Message Template

```javascript
// Lead scoring logic
const score = Math.min(100, Math.max(0, 
  (monthlyImpact / 1000) * 10 + // Impact weight
  (paybackDays < 30 ? 30 : paybackDays < 90 ? 20 : 10) + // Payback weight
  (plan === 'pro' ? 20 : plan === 'enterprise' ? 30 : 10) + // Plan weight
  (utm_source === 'demo' ? 15 : utm_source === 'email' ? 10 : 5) // Source weight
));

// Slack message template
const slackMessage = {
  text: `:new: *ROI Lead* — ${company_name} (${contact_email})
*Score:* ${score}  •  *Plan:* ${plan}  •  *Impact:* $${monthlyImpact}/mo  •  *Payback:* ${paybackDays}d
*UTM:* ${utm_source}/${utm_medium}/${utm_campaign}
*Actions:* <${checkout_url}|Start Checkout>  •  <${roi_summary_url}|View ROI Summary>`
};

// Routing rules
if (score >= 70) {
  // Hot lead - route to #ae-hot + on-call AE mention
  slackMessage.channel = '#ae-hot';
  slackMessage.text += '\n<!here> *HOT LEAD* - Immediate follow-up required!';
} else if (score >= 40) {
  // Warm lead - route to #sdr queue
  slackMessage.channel = '#sdr-queue';
} else {
  // Cold lead - auto-nurture sequence
  slackMessage.channel = '#auto-nurture';
}
```

---

## 📊 Dashboard Analytics Views

### ROI → Trial Conversion (30d)

```sql
create or replace view v_roi_to_trial_30d as
select
  date_trunc('day', r.created_at) d,
  count(*) as roi_submits,
  count(*) filter (where c.id is not null) as trials
from roi_estimates r
left join companies c on lower(c.contact_email)=lower(r.contact_email)
where r.created_at > now() - interval '30 days'
group by 1 order by 1;
```

### Trial → Paid by Plan

```sql
create or replace view v_trial_to_paid as
select e.plan_id, count(distinct e.company_id) as paid
from org_entitlements e
where e.plan_id in ('starter','pro','enterprise')
group by 1;
```

---

## 🔄 Rollback Plan

### Quick Rollback Commands

```bash
# Apps: Revert to last green build
git revert HEAD --no-edit
git push origin main

# Database: Restore last snapshot
supabase db reset --linked

# n8n: Disable new workflow, re-enable previous
# (Manual: Disable new workflow version, re-enable previous export)

# Edge Functions: Revert to previous version
supabase functions deploy roi-intake --no-verify-jwt
supabase functions deploy stripe-webhook --no-verify-jwt
```

---

## ✅ Verification Checklist

- [ ] ROI intake edge function responds with `{"ok":true,"id":"..."}`
- [ ] Database row created in `roi_estimates` table
- [ ] Slack notification sent with lead score
- [ ] CRM lead created
- [ ] Stripe webhook processes checkout.session.completed
- [ ] Entitlement row upserted for company
- [ ] Plan set from price mapping
- [ ] End-to-end flow: ROI form → trial → entitlement → Slack alert
- [ ] Dashboard views show conversion data
- [ ] Feature flag `public_roi=true` enabled

---

## 🎯 Success Metrics

- **ROI Form Conversion**: >15% of visitors
- **Trial Activation**: >60% of ROI submissions
- **Paid Conversion**: >25% of trials within 30 days
- **Lead Response Time**: <2 hours for hot leads (score ≥70)
- **System Uptime**: >99.9% during launch week

---

## 📞 Support Contacts

- **Technical Issues**: DevOps team
- **Stripe Integration**: Finance team  
- **n8n Workflows**: Operations team
- **CRM Integration**: Sales team
- **Dashboard Analytics**: Product team

---

*Deployment Package Version: 1.0*  
*Last Updated: January 2025*  
*Status: Production Ready* 🚀
