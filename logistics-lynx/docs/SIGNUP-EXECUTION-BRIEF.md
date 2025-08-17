# Trans Bot AI Signup Execution Brief

## 🎯 **OPERATOR PROMPT**
**"Add Trans Bot AI Sign Up (multi-tenant, self-serve)"**

## 🚀 **MISSION**
Implement a world-class, secure, multi-tenant Sign Up experience at `/signup` that:

1. **Creates a user, a new organization (tenant), and an initial subscription (trial or plan)**
2. **Grants role & entitlements, sets org_id context, and**
3. **Drops the user into `/portal-selection` with the correct portal cards (Included / Trial / Add-on / Locked)**

## 🛡️ **GUARDRAILS**
- **Respect autonomy.emergencyStop immediately**
- **SLO: success ≥ 98%, p95 route paint ≤ 2.5s**
- **Security: RLS on, invite tokens signed & short-lived, email verification required, rate-limit and CAPTCHA on public endpoints**
- **Privacy: GDPR/CCPA consent checkboxes; audit every critical step**

## 📋 **IMPLEMENTATION SPECIFICATIONS**

### 1. **FEATURE FLAGS (seed)**
Enable/disable signup globally and configure defaults.

```sql
insert into feature_flags_v2(key,scope,value) values
('auth.signup.enabled','global',true),
('auth.signup.requireEmailVerify','global',true),
('auth.signup.defaultPlan','global','pro'),
('auth.signup.trialDays','global',14),
('auth.signup.captcha','global',true)
on conflict (key,scope) do update set value=excluded.value;
```

### 2. **DB HOOKS (Postgres) — tenant creation & entitlements**

#### a) Create org + membership + subscription (helper RPC)
```sql
create or replace function saas_create_org_with_owner(
  p_user uuid, p_org_name text, p_plan text, p_trial_days int default 14
) returns table(org_id uuid) language plpgsql security definer as $$
declare v_org uuid;
begin
  insert into organizations(name) values (p_org_name) returning id into v_org;

  insert into org_memberships(org_id,user_id,role)
  values (v_org, p_user, 'owner');

  insert into subscriptions(org_id,plan,status,current_period_end)
  values (v_org, p_plan, 'trialing', now() + make_interval(days => p_trial_days))
  on conflict (org_id) do update set plan=excluded.plan;

  -- rebuild entitlements snapshot from plan (keep overrides)
  perform rebuildEntitlements(v_org, p_plan);

  return query select v_org;
end $$;
```

**Ensure your existing rebuildEntitlements(org, plan) function is available (from the SaaS kit).**

### 3. **BACKEND ENDPOINTS (ESM/TypeScript)**

#### a) POST /api/auth/signup
**Body:** `{ email, password, fullName, company, plan?: 'free'|'pro'|'enterprise', inviteToken?: string }`

**Flow:**
1. Validate CAPTCHA if enabled
2. Create auth user (password or magic-link)
3. If inviteToken present → join existing org; else create new org via saas_create_org_with_owner
4. If requireEmailVerify → send verification email; else continue
5. Issue session + set org_id claim/context (for RLS)
6. Return `{ next: "/portal-selection" }`

```typescript
// src/server/routes/auth/signup.ts
import { z } from "zod";
export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  company: z.string().min(2),
  plan: z.enum(['free','pro','enterprise']).optional(),
  inviteToken: z.string().optional(),
  captcha: z.string().optional(),
});

app.post("/api/auth/signup", async (req, res) => {
  const cfg = await flags.getMany([
    'auth.signup.enabled','auth.signup.requireEmailVerify',
    'auth.signup.defaultPlan','auth.signup.trialDays','auth.signup.captcha'
  ]);
  if (!cfg['auth.signup.enabled']) return res.status(403).json({ error: "signup_disabled" });

  const body = schema.parse(req.body);
  if (cfg['auth.signup.captcha'] && !(await verifyCaptcha(body.captcha))) {
    return res.status(400).json({ error: "captcha_failed" });
  }

  // 1) Create auth user
  const { userId, emailVerified } = await auth.createUser({
    email: body.email, password: body.password, name: body.fullName
  });

  let orgId: string;
  if (body.inviteToken) {
    orgId = await invites.consume(body.inviteToken, userId); // joins & sets role
  } else {
    const plan = body.plan ?? cfg['auth.signup.defaultPlan'];
    const trialDays = cfg['auth.signup.trialDays'] ?? 14;
    const { data, error } = await db.rpc("saas_create_org_with_owner",
      { p_user: userId, p_org_name: body.company, p_plan: plan, p_trial_days: trialDays });
    if (error) return res.status(500).json({ error: "tenant_create_failed" });
    orgId = data?.[0]?.org_id;
  }

  // 2) Session with org_id claim for RLS
  const session = await auth.issueSession({ userId, claims: { org_id: orgId } });

  // 3) Email verify
  if (cfg['auth.signup.requireEmailVerify'] && !emailVerified) {
    await auth.sendEmailVerification(userId);
    return res.status(200).json({ next: "/verify-email", pendingVerification: true });
  }

  return res.status(200).json({ next: "/portal-selection", orgId });
});
```

#### b) POST /api/auth/magic-link (optional passwordless)
Input `{ email, company?, plan? }` → create user if absent, send magic link, create org on first login.

#### c) POST /api/invites/create & POST /api/invites/consume
Signed, short-lived invite tokens, role-scoped. Use existing org_memberships.

### 4. **FRONTEND — /signup (multi-step, WCAG, design-system)**

**Route:** `/signup`

**Steps (cards with progress indicators):**
1. **Account** — Email, Password, Full name (show strength, caps-lock, show/hide)
2. **Company** — Company name, industry (optional), user role (default: owner)
3. **Plan** — Free / Pro / Enterprise comparison (include billing URL if selecting paid)
4. **Consent** — ToS & Privacy checkboxes; marketing opt-in (optional)
5. **Submit** — POST /api/auth/signup, handle verify state

**UX notes:**
- Use your tokens.css, shadcn/ui components, accent color from design system
- Provide SSO buttons (Google/Microsoft) if configured (/api/auth/oauth/:provider)
- Accessibility: labeled inputs, error summaries, keyboard flow, proper focus management
- Anti-abuse: show reCAPTCHA only on suspicious patterns or after N attempts

**Fallbacks:**
- If invite link present in URL, show "Joining {Org} as {role}"

### 5. **BILLING HANDSHAKE (optional on signup)**
If user selects Pro/Enterprise at step 3:
- Create a checkout session via billing provider and redirect
- On webhook checkout.session.completed → update subscriptions & call rebuildEntitlements(org, plan)
- If they skip payment → keep trialing per trialDays

### 6. **OBSERVABILITY**
Emit SLI events (auth.signup.started, auth.signup.succeeded, auth.signup.failed, invite.consumed) with:
- org_id, user_id, plan, trial_days, method (password/magic/SSO)
- Attach trace_id and include p95 timings for each step (form submit → session issued → /portal-selection render)
- Add /readyz item: "auth & invites healthy" (checks email provider, captcha, webhook secrets present)

### 7. **SECURITY & RATE LIMITS**
- POST /api/auth/signup → 10/min/IP, 5/min/email (429 on breach)
- Enforce email verification before enabling write actions
- All writes scoped by org_id via RLS; set org_id claim on session
- Invite tokens: HMAC-signed, expire in ≤ 48h, single-use
- PII redaction in logs

## ✅ **ACCEPTANCE (must pass)**

- ✅ `/signup` is reachable and a11y-clean (axe pass)
- ✅ Creating new org: user becomes owner; plan = default; trial applied; entitlements created; redirected to /portal-selection
- ✅ Joining via invite skips org creation; role matches token; portals reflect plan
- ✅ Email verification enforced when flag enabled
- ✅ SLO: p95 ≤ 2.5s signup API; success ≥ 98%
- ✅ Evidence artifacts saved: artifacts/signup/<DATE>/{flags.json,events.json,p95.csv,trace-sample.txt}

## 🧪 **QUICK SMOKE (agents)**
1. Open `/signup`, create user owner@demo.tba, company Demo Co, plan pro
2. Expect trialing pro, membership owner, portals show Included/Trial/Addon/Locked correctly
3. Hit `/api/me/portals` → verify access states
4. Trigger invite to analyst@demo.tba, consume token, verify role

## 🔄 **ROLLBACK**
- Toggle `auth.signup.enabled=false` to disable public signup instantly
- Keep invites working for controlled access

## 🎨 **UI SKETCH (Figma prompt for agents)**
"Create a 5-step signup wizard using Trans Bot AI design tokens, glassmorphism cards, left progress rail, WCAG 2.2 AA, keyboard-first. Include Google/Microsoft SSO buttons, password strength meter, reCAPTCHA slot, and plan comparison with checkmarks. Final success screen routes to /portal-selection with portal cards reflecting Included/Trial/Add-on/Locked states."

## 📁 **FILES TO CREATE**

### Database Migrations
- `supabase/migrations/20241201000008_signup_feature_flags.sql`
- `supabase/migrations/20241201000009_signup_functions.sql`

### Backend Routes
- `src/server/routes/auth/signup.ts`
- `src/server/routes/auth/magic-link.ts`
- `src/server/routes/invites/create.ts`
- `src/server/routes/invites/consume.ts`

### Frontend Components
- `src/pages/signup/SignupPage.tsx`
- `src/components/signup/SignupWizard.tsx`
- `src/components/signup/AccountStep.tsx`
- `src/components/signup/CompanyStep.tsx`
- `src/components/signup/PlanStep.tsx`
- `src/components/signup/ConsentStep.tsx`
- `src/components/signup/SubmitStep.tsx`

### Utilities & Services
- `src/hooks/useSignup.ts`
- `src/services/signup.ts`
- `src/utils/captcha.ts`
- `src/utils/invites.ts`

### Files to Modify
- `src/App.tsx` (add signup route)
- `src/routes.tsx` (add signup routing)
- `src/middleware/auth.ts` (add signup middleware)
- `src/services/auth.ts` (add signup service)
- `src/components/PortalSelection.tsx` (integrate with signup flow)

## 🎯 **SUCCESS METRICS**

### Performance
- **SLO: p95 ≤ 2.5s signup API**
- **Success rate ≥ 98%**
- **Fast page load times**

### Security
- **RLS enabled on all tables**
- **Email verification enforced**
- **Rate limiting working**
- **CAPTCHA integration**

### User Experience
- **WCAG 2.2 AA compliance**
- **Accessible form inputs**
- **Clear error messages**
- **Smooth multi-step flow**

### Business
- **Successful org creation**
- **Proper entitlement assignment**
- **Portal access working**
- **Billing integration (if applicable)**

## 🚀 **AUTONOMOUS AGENT INSTRUCTIONS**

1. **Start with the database migrations** - Create the feature flags and RPC functions
2. **Implement the backend endpoints** - Focus on the core signup flow first
3. **Build the frontend components** - Create the multi-step wizard with accessibility
4. **Add security measures** - Implement rate limiting, CAPTCHA, and email verification
5. **Integrate with existing systems** - Connect to portal selection and billing
6. **Test thoroughly** - Run the smoke tests and validate all acceptance criteria
7. **Monitor and optimize** - Set up observability and performance monitoring

**Remember: This is the critical entry point for new customers. Make it world-class!**

---

**Status**: 🎯 Ready for autonomous agent implementation
**Priority**: 🔥 Critical - Entry point for new customers
**Timeline**: ⏱️ 1-2 weeks for complete implementation
**Authority**: 🎨 Full UI/UX design authority granted
