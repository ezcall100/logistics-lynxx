/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, Eye, EyeOff, Building2, ShieldCheck, AlertTriangle } from "lucide-react";

type State = {
  email: string;
  password: string;
  company?: string;
  showPw: boolean;
  loading: boolean;
  error?: string;
  capsLock?: boolean;
  magicSent?: boolean;
  rememberMe: boolean;
  showMfa: boolean;
};

export default function LoginPage() {
  const nav = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [s, setS] = React.useState<State>({
    email: "",
    password: "",
    company: "",
    showPw: false,
    loading: false,
    rememberMe: false,
    showMfa: false,
  });

  // i18n helper for future internationalization
  const t = (k: string, d?: string) => d ?? k;

  // Auto-fill company code from subdomain
  React.useEffect(() => {
    const sub = window.location.hostname.split(".")[0];
    if (sub && sub !== "localhost" && sub !== "127" && sub !== "www") {
      setS(x => ({ ...x, company: sub }));
    }
  }, []);

  // Preload portal selection for instant navigation
  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "/portal-selection";
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  React.useEffect(() => {
    if (user) nav("/portal-selection", { replace: true });
  }, [user, nav]);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/portal-selection";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setS((x) => ({ ...x, loading: true, error: undefined }));
    
    // OTEL breadcrumb - submit
    window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.submit" }}));
    
    try {
      const result = await signIn(s.email, s.password);
      if (result.error) throw new Error(result.error);
      
      // OTEL breadcrumb - success
      window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.success" }}));
      
      // Handle session persistence
      if (s.rememberMe) {
        // Note: Implement session persistence based on your auth system
        // supabase.auth.setSession({ ...current }, { persistSession: true });
      }
      
      nav(from, { replace: true });
    } catch (err: unknown) {
      // Check for MFA requirement
      if (/mfa/i.test((err as Error)?.message ?? "")) {
        setS(x => ({ ...x, error: undefined, showMfa: true }));
        return;
      }
      
      const msg = normalizeAuthError((err as Error)?.message);
      setS((x) => ({ ...x, loading: false, error: msg }));
      
      // OTEL breadcrumb - error
      window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.error", code: msg }}));
    }
  }

  async function handleSSO(provider: "google" | "azure") {
    setS((x) => ({ ...x, loading: true, error: undefined }));
    
    // OTEL breadcrumb - SSO attempt
    window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: `auth.login.sso.${provider}` }}));
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider === "azure" ? "azure" : "google",
        options: { redirectTo: `${window.location.origin}/portal-selection` },
      });
      if (error) throw error;
      // supabase will redirect
      return data;
    } catch (err: unknown) {
      setS((x) => ({ ...x, loading: false, error: normalizeAuthError((err as Error)?.message) }));
      
      // OTEL breadcrumb - SSO error
      window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: `auth.login.sso.${provider}.error` }}));
    }
  }

  async function handlePasskey() {
    setS(x => ({ ...x, error: "Passkey not yet set up. Ask admin to enable WebAuthn.", loading: false }));
    // If/when enabled with Supabase:
    // const { data, error } = await supabase.auth.signInWithWebAuthn(); // placeholder; implement per your auth
  }

  async function handleMagicLink() {
    if (!s.email) {
      setS((x) => ({ ...x, error: "Enter your email to receive a magic link." }));
      return;
    }
    setS((x) => ({ ...x, loading: true, error: undefined }));
    
    // OTEL breadcrumb - magic link
    window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.magic_link" }}));
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: s.email,
        options: { emailRedirectTo: `${window.location.origin}/portal-selection` },
      });
      if (error) throw error;
      setS((x) => ({ ...x, loading: false, magicSent: true }));
      
      // OTEL breadcrumb - magic link sent
      window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.magic_link.sent" }}));
    } catch (err: unknown) {
      setS((x) => ({ ...x, loading: false, error: normalizeAuthError((err as Error)?.message) }));
      
      // OTEL breadcrumb - magic link error
      window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.magic_link.error" }}));
    }
  }

  async function handleMfaVerify(code: string) {
    setS(x => ({ ...x, loading: true }));
    
    // OTEL breadcrumb - MFA attempt
    window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.mfa.verify" }}));
    
    try {
      // Implement your MFA verification logic here
      // const result = await verifyMfa(code);
      // if (result.success) {
      //   nav(from, { replace: true });
      // } else {
      //   throw new Error("Invalid MFA code");
      // }
      
      // For now, just close the modal
      setS(x => ({ ...x, loading: false, showMfa: false }));
    } catch (err: unknown) {
      setS(x => ({ ...x, loading: false, error: normalizeAuthError((err as Error)?.message) }));
      
      // OTEL breadcrumb - MFA error
      window.dispatchEvent(new CustomEvent("otel:b", { detail: { name: "auth.login.mfa.error" }}));
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      {/* Left brand / value panel */}
      <aside className="hidden lg:flex flex-col justify-between p-10 pr-16">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-black/90 dark:bg-white/90" />
            <span className="text-xl font-semibold tracking-wide">Trans Bot AI</span>
          </div>
          <h1 className="mt-10 text-4xl font-semibold leading-tight">
            {t("Login to your", "Login to your")} <span className="text-slate-500 dark:text-slate-400">{t("Autonomous TMS", "Autonomous TMS")}</span>
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            {t("One account for all 20 portals. Role-aware access. SSO ready. Secure by default.", "One account for all 20 portals. Role-aware access. SSO ready. Secure by default.")}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> RLS + JWT + HMAC v2</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> MFA-ready & passkey-friendly</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> OTEL traces on auth events</li>
          </ul>
        </div>
        <EnvBanner />
      </aside>

      {/* Right auth card */}
      <main className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{t("Login to TMS", "Login to TMS")}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{t("Access your portals with a single secure sign-in.", "Access your portals with a single secure sign-in.")}</p>

          {s.error && (
            <div className="mt-4 flex items-start gap-2 rounded-md border border-rose-200/60 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 p-3 text-sm text-rose-700 dark:text-rose-300" role="alert" aria-live="assertive">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <span>{s.error}</span>
            </div>
          )}

          {s.magicSent && (
            <div className="mt-4 rounded-md border border-emerald-200/60 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/30 p-3 text-sm text-emerald-700 dark:text-emerald-300">
              {t("Magic link sent! Check your email to continue.", "Magic link sent! Check your email to continue.")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Optional company code (helps multi-tenant routing if not using subdomain) */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium">{t("Company code (optional)", "Company code (optional)")}</label>
              <div className="mt-1 relative">
                <input
                  id="company"
                  type="text"
                  inputMode="text"
                  placeholder="acme-logistics"
                  value={s.company ?? ""}
                  onChange={(e) => setS((x) => ({ ...x, company: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Building2 className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">{t("Email", "Email")}</label>
              <div className="mt-1 relative">
                <input
                  id="email"
              type="email"
                  autoComplete="email"
              required
                  placeholder="you@company.com"
                  value={s.email}
                  onChange={(e) => setS((x) => ({ ...x, email: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 px-3 py-2 pl-9 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">{t("Password", "Password")}</label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={s.showPw ? "text" : "password"}
                  autoComplete="current-password"
              required
                  placeholder="••••••••"
                  onKeyUp={(e: React.KeyboardEvent) =>
                    setS((x) => ({ ...x, capsLock: e.getModifierState?.("CapsLock") }))
                  }
                  value={s.password}
                  onChange={(e) => setS((x) => ({ ...x, password: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  aria-label={s.showPw ? t("Hide password", "Hide password") : t("Show password", "Show password")}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  onClick={() => setS((x) => ({ ...x, showPw: !x.showPw }))}
                >
                  {s.showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {s.capsLock && <p className="mt-1 text-xs text-amber-600">{t("Caps Lock is on", "Caps Lock is on")}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 dark:border-slate-700"
                  checked={s.rememberMe}
                  onChange={(e) => setS(x => ({ ...x, rememberMe: e.target.checked }))}
                />
                {t("Remember me", "Remember me")}
              </label>
              <a className="text-indigo-600 hover:underline" href="/forgot-password">{t("Forgot password?", "Forgot password?")}</a>
            </div>

            <button
              type="submit"
              disabled={s.loading}
              className="w-full rounded-lg bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-60"
            >
              {s.loading ? t("Signing in…", "Signing in…") : t("Sign in", "Sign in")}
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-500">{t("or", "or")}</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSSO("google")}
              disabled={s.loading}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 py-2 text-sm hover:bg-slate-50"
            >
              {t("Google", "Google")}
            </button>
            <button
              onClick={() => handleSSO("azure")}
              disabled={s.loading}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 py-2 text-sm hover:bg-slate-50"
            >
              {t("Microsoft", "Microsoft")}
            </button>
            <button
              onClick={handlePasskey}
              disabled={s.loading}
              className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 py-2 text-sm hover:bg-slate-50"
            >
              {t("Passkey", "Passkey")}
            </button>
          </div>

          <button
            onClick={handleMagicLink}
            disabled={s.loading}
            className="mt-3 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-950/40 py-2 text-sm hover:bg-slate-50"
          >
            {t("Email me a magic link", "Email me a magic link")}
          </button>

          <p className="mt-6 text-xs text-slate-500">
            {t("By continuing, you agree to our", "By continuing, you agree to our")} <a className="underline" href="/legal/terms">{t("Terms", "Terms")}</a> {t("and", "and")} <a className="underline" href="/legal/privacy">{t("Privacy Policy", "Privacy Policy")}</a>.
          </p>
        </div>
      </main>

      {/* MFA Modal */}
      {s.showMfa && (
        <MfaPrompt onVerify={handleMfaVerify} />
      )}
    </div>
  );
}

function MfaPrompt({ onVerify }: { onVerify: (code: string) => void }) {
  const [code, setCode] = React.useState("");
  const t = (k: string, d?: string) => d ?? k;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 grid place-items-center bg-black/30">
      <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 p-5 shadow-xl">
        <h3 className="font-semibold mb-2">{t("Two-factor code", "Two-factor code")}</h3>
        <input 
          inputMode="numeric" 
          pattern="\d*" 
          maxLength={6}
          className="w-full rounded-lg border px-3 py-2" 
          value={code}
          onChange={e => setCode(e.target.value)} 
          placeholder="123456" 
        />
        <button 
          className="mt-3 w-full rounded-lg bg-indigo-600 text-white py-2"
          onClick={() => onVerify(code)}
        >
          {t("Verify", "Verify")}
        </button>
      </div>
    </div>
  );
}

function EnvBanner() {
  const env = import.meta.env.MODE || "production";
  const isProd = env === "production";
  const t = (k: string, d?: string) => d ?? k;
  
  return (
    <div className="text-xs text-slate-500">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-3 py-1 backdrop-blur">
        <span className={`h-2 w-2 rounded-full ${isProd ? "bg-emerald-500" : "bg-amber-500"}`} />
        {isProd ? t("Production", "Production") : `${t("Environment", "Environment")}: ${env}`}
      </div>
      <a href="/status" className="ml-3 underline">{t("Status", "Status")}</a>
      <a href="/changelog" className="ml-3 underline">{t("Changelog", "Changelog")}</a>
    </div>
  );
}

function normalizeAuthError(msg?: string) {
  if (!msg) return "Unable to sign in. Please try again.";
  const m = msg.toLowerCase();
  if (m.includes("invalid") && m.includes("credentials")) return "Invalid email or password.";
  if (m.includes("rate")) return "Too many attempts. Please wait and try again.";
  if (m.includes("mfa")) return "Additional security verification required.";
  if (m.includes("network")) return "Network issue. Check your connection and retry.";
  return "Sign-in failed. Please retry.";
}
