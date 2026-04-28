import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { PricingCard } from "@/components/site/PricingCard";
import { plans } from "@/data/plans";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Raze Algo" },
      { name: "description", content: "Choose monthly, 6-month, yearly, or lifetime access to premium TradingView indicators." },
      { property: "og:title", content: "Pricing — Raze Algo" },
      { property: "og:description", content: "Flexible plans for premium TradingView indicators. Monthly, 6-month, yearly, lifetime." },
    ],
  }),
  component: PricingPage,
});

const compareRows = [
  { feature: "Access duration", monthly: "1 month", six: "6 months", yearly: "12 months", lifetime: "Lifetime" },
  { feature: "TradingView invite-only access", monthly: true, six: true, yearly: true, lifetime: true },
  { feature: "Indicator updates", monthly: true, six: true, yearly: true, lifetime: true },
  { feature: "Alerts", monthly: true, six: true, yearly: true, lifetime: true },
  { feature: "Dashboard features", monthly: true, six: true, yearly: true, lifetime: true },
  { feature: "Priority updates", monthly: false, six: false, yearly: true, lifetime: true },
  { feature: "Priority support", monthly: false, six: true, yearly: true, lifetime: true },
  { feature: "Free indicators included", monthly: true, six: true, yearly: true, lifetime: true },
];

function Cell({ v }: { v: string | boolean }) {
  if (typeof v === "boolean") {
    return v ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground mx-auto" />;
  }
  return <span className="text-sm">{v}</span>;
}

function PricingPage() {
  return (
    <>
      <Section className="pb-10">
        <SectionHeader
          eyebrow="Pricing"
          title="Pick the plan that fits your trading"
          description="All plans include full indicator features and TradingView invite-only access. Cancel anytime."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Prices shown are placeholders. Different indicators may have different pricing.
        </p>
      </Section>

      <Section className="pt-10">
        <SectionHeader title="Compare plans" align="left" />
        <div className="overflow-x-auto rounded-2xl glass neon-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="p-4 font-semibold">Monthly</th>
                <th className="p-4 font-semibold">6-Month</th>
                <th className="p-4 font-semibold text-primary">Yearly</th>
                <th className="p-4 font-semibold">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r) => (
                <tr key={r.feature} className="border-b border-border/20 last:border-0">
                  <td className="p-4 text-muted-foreground">{r.feature}</td>
                  <td className="p-4 text-center"><Cell v={r.monthly} /></td>
                  <td className="p-4 text-center"><Cell v={r.six} /></td>
                  <td className="p-4 text-center"><Cell v={r.yearly} /></td>
                  <td className="p-4 text-center"><Cell v={r.lifetime} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
