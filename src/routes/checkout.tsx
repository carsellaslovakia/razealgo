import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { plans } from "@/data/plans";
import { indicators, getIndicator } from "@/data/indicators";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

const searchSchema = z.object({
  plan: z.enum(["monthly", "six-month", "yearly", "lifetime"]).optional().default("yearly"),
  indicator: z.string().optional().default("msz-pro"),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Checkout — Raze Algo" },
      { name: "description", content: "Complete your subscription to access premium TradingView indicators." },
    ],
  }),
  component: CheckoutPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  tvUsername: z.string().trim().min(2, "TradingView username required").max(50),
  indicator: z.string().min(1),
  plan: z.string().min(1),
  message: z.string().max(500).optional(),
});

function CheckoutPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    tvUsername: "",
    indicator: search.indicator,
    plan: search.plan,
    message: "",
  });

  const selectedPlan = plans.find((p) => p.id === form.plan) ?? plans[0];
  const selectedIndicator = getIndicator(form.indicator) ?? indicators[0];

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path.join(".")] = i.message));
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Request received");
      navigate({ to: "/checkout/success" });
    }, 600);
  };

  return (
    <Section className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={onSubmit} className="rounded-2xl glass neon-border p-6 sm:p-8 space-y-5">
          <div>
            <h1 className="font-display text-3xl font-bold text-gradient">Checkout</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit your details and your TradingView username to get access after payment.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" id="fullName" error={errors.fullName}>
              <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Jane Trader" maxLength={80} />
            </Field>
            <Field label="Email address" id="email" error={errors.email}>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" maxLength={255} />
            </Field>
          </div>

          <Field label="TradingView username" id="tvUsername" error={errors.tvUsername}>
            <Input id="tvUsername" value={form.tvUsername} onChange={(e) => update("tvUsername", e.target.value)} placeholder="@yourTVusername" maxLength={50} />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Selected indicator" id="indicator">
              <select
                id="indicator"
                value={form.indicator}
                onChange={(e) => update("indicator", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-input/50 px-3 text-sm"
              >
                {indicators.filter((i) => i.tier === "Premium").map((i) => (
                  <option key={i.slug} value={i.slug}>{i.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Plan" id="plan">
              <select
                id="plan"
                value={form.plan}
                onChange={(e) => update("plan", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-input/50 px-3 text-sm"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} — {p.price}{p.period}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Optional message" id="message">
            <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={500} rows={3} placeholder="Anything we should know?" />
          </Field>

          <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-medium mb-1">
              <CreditCard className="h-4 w-4 text-primary" /> Payment integration placeholder
            </div>
            Connect Stripe, Lemon Squeezy, Gumroad or Paddle here. After payment is confirmed,
            access will be granted to your TradingView username manually or automatically.
          </div>

          <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Lock className="mr-2 h-4 w-4" />
            {submitting ? "Processing..." : `Pay ${selectedPlan.price}${selectedPlan.period}`}
          </Button>
        </form>

        <aside className="rounded-2xl glass neon-border p-6 sm:p-8 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <Row label="Indicator" value={selectedIndicator.name} />
            <Row label="Plan" value={selectedPlan.name} />
            <Row label="Access" value={selectedPlan.tagline} />
            <div className="border-t border-border/40 pt-3 mt-3 flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-gradient-primary">
                {selectedPlan.price}<span className="text-sm font-normal text-muted-foreground">{selectedPlan.period}</span>
              </span>
            </div>
          </div>
          <Link to="/pricing" className="mt-5 inline-block text-xs text-muted-foreground hover:text-foreground">
            ← Change plan
          </Link>
        </aside>
      </div>
    </Section>
  );
}

function Field({ label, id, children, error }: { label: string; id: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
