import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { getIndicator } from "@/data/indicators";
import { plans } from "@/data/plans";
import { PricingCard } from "@/components/site/PricingCard";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import heroChart from "@/assets/hero-chart.jpg";

export const Route = createFileRoute("/indicators/$slug")({
  loader: ({ params }) => {
    const indicator = getIndicator(params.slug);
    if (!indicator) throw notFound();
    return { indicator };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.indicator.name} — ${loaderData.indicator.tagline}` },
          { name: "description", content: loaderData.indicator.description },
          { property: "og:title", content: `${loaderData.indicator.name} — Raze Algo` },
          { property: "og:description", content: loaderData.indicator.description },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <Section>
      <h1 className="font-display text-3xl font-bold">Indicator not found</h1>
      <Button asChild className="mt-6"><Link to="/indicators">Back to indicators</Link></Button>
    </Section>
  ),
});

const productFaqs = [
  { q: "How do I get access?", a: "After payment, submit your TradingView username. We grant invite-only access to the script." },
  { q: "Does the indicator repaint?", a: "No. All confirmed signals and zones are non-repainting on closed candles." },
  { q: "Which markets does it work on?", a: "Crypto, forex, indices, stocks — anything chartable on TradingView." },
];

function ProductPage() {
  const { indicator } = Route.useLoaderData();
  const isPremium = indicator.tier === "Premium";

  return (
    <>
      <Section className="pb-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Link to="/indicators" className="text-sm text-muted-foreground hover:text-foreground">
              ← All indicators
            </Link>
            <span
              className={
                isPremium
                  ? "mt-4 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow"
                  : "mt-4 inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-semibold text-success"
              }
            >
              {isPremium && <Sparkles className="h-3 w-3" />}
              {indicator.tier} • {indicator.category}
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-gradient">
              {indicator.name}
            </h1>
            <p className="mt-3 text-xl text-foreground/90">{indicator.tagline}</p>
            <p className="mt-5 text-muted-foreground">{indicator.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {isPremium ? (
                <>
                  <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                    <Link to="/checkout" search={{ plan: "yearly", indicator: indicator.slug }}>
                      Choose Subscription <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                  <Link to="/free">Get Free Access</Link>
                </Button>
              )}
              <Button asChild size="lg" variant="ghost">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-[2rem]" aria-hidden />
            <div className="relative rounded-2xl glass-strong overflow-hidden shadow-elevated">
              <img src={heroChart} alt={`${indicator.name} chart preview`} width={1920} height={1080} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl glass neon-border p-8">
            <h2 className="font-display text-2xl font-bold">Key features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {indicator.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl glass neon-border p-8 space-y-4">
            <h3 className="font-display text-lg font-bold">Details</h3>
            <Detail label="Compatibility" value="TradingView" />
            <Detail label="Access method" value="Invite-only script access" />
            <Detail label="Required info" value="TradingView username" />
            <Detail label="Markets" value="Crypto, FX, indices, stocks" />
          </div>
        </div>
      </Section>

      <Section className="py-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">What it helps with</h2>
        <p className="text-muted-foreground max-w-2xl">
          Designed to remove noise and reveal structure: cleaner zones, clearer bias, sharper setups.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { t: "Read structure faster", d: "Auto-zones replace manual marking and free your focus." },
            { t: "Avoid low-quality setups", d: "Bias and reaction context filter out weak entries." },
            { t: "Plan with confidence", d: "Know your trend, key zones and triggers at a glance." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl glass p-6">
              <h4 className="font-semibold">{b.t}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {isPremium && (
        <Section className="py-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
            Subscription access options
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => (
              <PricingCard key={p.id} plan={p} indicator={indicator.slug} />
            ))}
          </div>
        </Section>
      )}

      <Section className="py-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">FAQ</h2>
        <div className="grid gap-3 max-w-3xl">
          {productFaqs.map((f) => (
            <details key={f.q} className="group rounded-xl glass p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium">
                {f.q}
                <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This indicator is provided for educational
          and analytical purposes only and is not financial advice. Trading involves risk. Past performance
          does not guarantee future results.
        </div>
      </Section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
