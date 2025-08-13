'use client';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  monthlyQuotes: z.coerce.number().min(1),
  winRateBefore: z.coerce.number().min(0).max(100),
  avgRevenuePerLoad: z.coerce.number().min(1),
  avgMarginBefore: z.coerce.number().min(0).max(100),
  minutesPerQuote: z.coerce.number().min(1),
  plan: z.enum(['starter','pro','enterprise']).default('starter'),
  upliftWinRate: z.coerce.number().min(0).max(50).default(5),
  upliftMarginPts: z.coerce.number().min(0).max(10).default(1.2),
  timeReductionPct: z.coerce.number().min(0).max(95).default(60),
  laborCostPerHour: z.coerce.number().min(1).default(45)
});
type FormVals = z.infer<typeof schema>;

function compute(vals: FormVals) {
  const quotes = vals.monthlyQuotes;
  const winBefore = vals.winRateBefore/100;
  const winAfter  = (vals.winRateBefore + vals.upliftWinRate)/100;
  const loadsBefore = quotes * winBefore;
  const loadsAfter  = quotes * winAfter;

  const rev = vals.avgRevenuePerLoad;
  const mBefore = vals.avgMarginBefore/100;
  const mAfter  = (vals.avgMarginBefore + vals.upliftMarginPts)/100;

  const gpBefore = loadsBefore * rev * mBefore;
  const gpAfter  = loadsAfter  * rev * mAfter;
  const incrGP   = gpAfter - gpBefore;

  const minsPerQuote = vals.minutesPerQuote;
  const hrsSaved = (quotes * minsPerQuote / 60) * (vals.timeReductionPct/100);
  const laborSavings = hrsSaved * vals.laborCostPerHour;

  const planCost = vals.plan === 'starter' ? 99 : vals.plan === 'pro' ? 299 : 0;
  const monthlyImpact = incrGP + laborSavings;
  const roi = planCost > 0 ? ((monthlyImpact - planCost)/planCost) : null;
  const paybackDays = planCost > 0 && monthlyImpact > 0 ? Math.max(1, Math.round(30 * (planCost / monthlyImpact))) : null;

  return { loadsBefore, loadsAfter, gpBefore, gpAfter, incrGP, hrsSaved, laborSavings, planCost, monthlyImpact, roi, paybackDays };
}

export default function ROICalculator() {
  const [submitted, setSubmitted] = useState<{id?: string}|null>(null);
  const { register, handleSubmit, watch, formState:{errors,isSubmitting} } = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: {
      plan:'starter', monthlyQuotes: 200, winRateBefore: 20, avgRevenuePerLoad: 1800,
      avgMarginBefore: 12, minutesPerQuote: 12, upliftWinRate: 5, upliftMarginPts: 1.2, timeReductionPct: 60, laborCostPerHour: 45
    }
  });

  const vals = watch();
  const result = useMemo(()=> schema.safeParse(vals).success ? compute(vals as FormVals) : null, [vals]);

  async function onSubmit(data: FormVals) {
    const payload = {
      company_name: data.companyName,
      contact_email: data.contactEmail,
      monthly_quotes: data.monthlyQuotes,
      win_rate_before: data.winRateBefore,
      avg_revenue_per_load: data.avgRevenuePerLoad,
      avg_margin_before: data.avgMarginBefore,
      minutes_per_quote: data.minutesPerQuote,
      plan: data.plan,
      uplift_win_rate: data.upliftWinRate,
      uplift_margin_pts: data.upliftMarginPts,
      time_reduction_pct: data.timeReductionPct,
      labor_cost_per_hour: data.laborCostPerHour,
      calc: result
    };

    // Prefer calling your edge function to store + notify
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('.co','')}/functions/v1/roi-intake`, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    const json = await res.json();
    setSubmitted(json);
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl border p-6 bg-white/60">
      <h2 className="text-2xl font-semibold mb-2">ROI Calculator — Trans Bot AI</h2>
      <p className="text-sm text-muted-foreground mb-6">Estimate your monthly impact from faster quoting, higher win-rates, and better margin discipline.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="text-xs">Company</label>
          <input className="w-full rounded border p-2" {...register('companyName')} />
          {errors.companyName && <p className="text-xs text-red-600">{errors.companyName.message}</p>}
        </div>
        <div className="col-span-1">
          <label className="text-xs">Work Email</label>
          <input className="w-full rounded border p-2" {...register('contactEmail')} />
          {errors.contactEmail && <p className="text-xs text-red-600">{errors.contactEmail.message}</p>}
        </div>

        <div>
          <label className="text-xs">Monthly Quotes</label>
          <input type="number" className="w-full rounded border p-2" {...register('monthlyQuotes')} />
        </div>
        <div>
          <label className="text-xs">Win Rate (current %)</label>
          <input type="number" className="w-full rounded border p-2" {...register('winRateBefore')} />
        </div>
        <div>
          <label className="text-xs">Avg Revenue per Load ($)</label>
          <input type="number" className="w-full rounded border p-2" {...register('avgRevenuePerLoad')} />
        </div>
        <div>
          <label className="text-xs">Avg Margin (current %)</label>
          <input type="number" className="w-full rounded border p-2" {...register('avgMarginBefore')} />
        </div>
        <div>
          <label className="text-xs">Minutes per Quote</label>
          <input type="number" className="w-full rounded border p-2" {...register('minutesPerQuote')} />
        </div>
        <div>
          <label className="text-xs">Plan</label>
          <select className="w-full rounded border p-2" {...register('plan')}>
            <option value="starter">Starter ($99)</option>
            <option value="pro">Pro ($299)</option>
            <option value="enterprise">Enterprise (Custom)</option>
          </select>
        </div>

        <div className="md:col-span-2 pt-2">
          <h3 className="text-sm font-medium mb-2">Assumptions (adjust as needed)</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div><label className="text-xs">Win-rate uplift (pp)</label><input type="number" className="w-full rounded border p-2" {...register('upliftWinRate')} /></div>
            <div><label className="text-xs">Margin uplift (pp)</label><input type="number" className="w-full rounded border p-2" {...register('upliftMarginPts')} /></div>
            <div><label className="text-xs">Time reduction (%)</label><input type="number" className="w-full rounded border p-2" {...register('timeReductionPct')} /></div>
            <div><label className="text-xs">Labor $/hr</label><input type="number" className="w-full rounded border p-2" {...register('laborCostPerHour')} /></div>
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 mt-4 rounded-xl border p-4 bg-slate-50">
          {!result ? <p className="text-sm">Enter values to see results…</p> : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Added Gross Profit / mo</div>
                <div className="text-xl font-semibold">${Math.round(result.incrGP).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Time Savings / mo</div>
                <div className="text-xl font-semibold">{result.hrsSaved.toFixed(1)} hrs (${Math.round(result.laborSavings).toLocaleString()})</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Total Monthly Impact</div>
                <div className="text-xl font-semibold">${Math.round(result.monthlyImpact).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Payback</div>
                <div className="text-xl font-semibold">{result.paybackDays ? `${result.paybackDays} days` : '—'}</div>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex items-center gap-3 mt-4">
          <button disabled={isSubmitting} className="rounded bg-black text-white px-4 py-2">{isSubmitting ? 'Submitting…' : 'Email me my ROI & start trial'}</button>
          {submitted?.id && <span className="text-sm text-green-700">Saved! We'll email your estimate and next steps.</span>}
        </div>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">* Estimates are illustrative; actuals depend on lanes, seasonality, compliance, and operations.</p>
    </div>
  );
}
