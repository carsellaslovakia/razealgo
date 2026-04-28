import { createFileRoute, Link } from "@tanstack/react-router";
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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvadaon";

const GUMROAD_LINKS: Record<string, string> = {
  monthly: "https://razalgo.gumroad.com/l/yoqcnx",
  "six-month": "https://razalgo.gumroad.com/l/yoqcnx",
  yearly: "https://razalgo.gumroad.com/l/yoqcnx",
};

const searchSchema = z.object({
  plan: z.enum(["monthly", "six-month", "yearly"]).optional().default("yearly"),
  indicator: z.string().optional().default("msz-pro"),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Checkout — Raze Algo" },
      {
        name: "description",
        content:
          "Complete your subscription to access premium TradingView indicators.",
      },
    ],
  }),
  component: CheckoutPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  tvUsername: z
    .string()
    .trim()
    .min(2, "TradingView username required")
    .max(50),
  indicator: z.string().min(1),
  plan: z.enum(["monthly", "six-month", "yearly"]),
  message: z.string().max(500).optional(),
});

function CheckoutPage() {
  const search = Route.useSearch();
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

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = formSchema.safeParse(form);

    if (!parsed.success) {
      const errs: Record<string, string> = {};

      parsed.error.issues.forEach((i) => {
        errs[i.path.join(".")] = i.message;
      });

      setErrors(errs);
      return;
    }

    const gumroadLink = GUMROAD_LINKS[parsed.data.plan];

    if (!gumroadLink) {
      toast.error("Payment link is not configured yet.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          source: "Raze Algo Checkout",
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          tradingViewUsername: parsed.data.tvUsername,
          indicator: selectedIndicator.name,
          indicatorSlug: selectedIndicator.slug,
          plan: selectedPlan.name,
          planId: selectedPlan.id,
          price: `${selectedPlan.price}${selectedPlan.period}`,
          message: parsed.data.message || "",
          paymentLink: gumroadLink,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      toast.success("Details submitted. Redirecting to payment...");

      window.location.href = gumroadLink;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again or contact support.");
      setSubmitting(false);
    }
  };

  return (
    <Section className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-2xl glass neon-border p-6 sm:p-8"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-gradient">
              Checkout
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit your details and your TradingView username. After payment,
              we will activate your invite-only access manually.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" id="fullName" error={errors.fullName}>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Jane Trader"
                maxLength={80}
              />
            </Field>

            <Field label="Email address" id="email" error={errors.email}>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                maxLength={255}
              />
            </Field>
          </div>

          <Field
            label="TradingView username"
            id="tvUsername"
            error={errors.tvUsername}
          >
            <Input
              id="tvUsername"
              value={form.tvUsername}
              onChange={(e) => update("tvUsername", e.target.value)}
              placeholder="@yourTVusername"
              maxLength={50}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Selected indicator" id="indicator">
              <select
                id="indicator"
                value={form.indicator}
                onChange={(e) => update("indicator", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-input/50 px-3 text-sm"
              >
                {indicators
                  .filter((i) => i.tier === "Premium")
                  .map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </Field>

            <Field label="Plan" id="plan" error={errors.plan}>
              <select
                id="plan"
                value={form.plan}
                onChange={(e) => update("plan", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-input/50 px-3 text-sm"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.price}
                    {p.period}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Optional message" id="message">
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="Anything we should know?"
            />
          </Field>

          <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-muted-foreground">
            <div className="mb-1 flex items-center gap-2 font-medium text-foreground">
              <CreditCard className="h-4 w-4 text-primary" />
              Secure payment via Gumroad
            </div>
            Your details will be sent to Raze Algo first. Then you will be
            redirected to Gumroad to complete your payment.
          </div>

          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
          >
            <Lock className="mr-2 h-4 w-4" />
            {submitting
              ? "Redirecting to payment..."
              : `Continue to payment — ${selectedPlan.price}${selectedPlan.period}`}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl glass neon-border p-6 sm:p-8 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order summary</h2>

          <div className="mt-5 space-y-3 text-sm">
            <Row label="Indicator" value={selectedIndicator.name} />
            <Row label="Plan" value={selectedPlan.name} />
            <Row label="Access" value={selectedPlan.tagline} />

            <div className="mt-3 flex justify-between border-t border-border/40 pt-3">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-gradient-primary">
                {selectedPlan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  {selectedPlan.period}
                </span>
              </span>
            </div>
          </div>

          <Link
            to="/pricing"
            className="mt-5 inline-block text-xs text-muted-foreground hover:text-foreground"
          >
            ← Change plan
          </Link>
        </aside>
      </div>
    </Section>
  );
}

function Field({
  label,
  id,
  children,
  error,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}