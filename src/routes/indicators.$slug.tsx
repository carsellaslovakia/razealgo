import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { getIndicator } from "@/data/indicators";
import { plans } from "@/data/plans";
import { PricingCard } from "@/components/site/PricingCard";
import { Check, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/indicators/$slug")({
  loader: ({ params }) => {
    const indicator = getIndicator(params.slug);
    if (!indicator) throw notFound();
    return { indicator };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.indicator.name} — ${loaderData.indicator.tagline}`,
          },
          { name: "description", content: loaderData.indicator.description },
          {
            property: "og:title",
            content: `${loaderData.indicator.name} — Raze Algo`,
          },
          {
            property: "og:description",
            content: loaderData.indicator.description,
          },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <Section>
      <h1 className="font-display text-3xl font-bold">Indicator not found</h1>
      <Button asChild className="mt-6">
        <Link to="/indicators">Back to indicators</Link>
      </Button>
    </Section>
  ),
});

const productFaqs = [
  {
    q: "How do I get access?",
    a: "After payment, submit your TradingView username. We grant invite-only access to the script.",
  },
  {
    q: "Does the indicator repaint?",
    a: "No. All confirmed signals and zones are non-repainting on closed candles.",
  },
  {
    q: "Which markets does it work on?",
    a: "Crypto, forex, indices, stocks — anything chartable on TradingView.",
  },
];

function ProductPage() {
  const { indicator } = Route.useLoaderData();
  const isPremium = indicator.tier === "Premium";

  return (
    <>
      <Section className="pb-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Link
              to="/indicators"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
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

            <h1 className="mt-4 font-display text-4xl font-bold text-gradient sm:text-5xl">
              {indicator.name}
            </h1>

            <p className="mt-3 text-xl text-foreground/90">
              {indicator.tagline}
            </p>

            <p className="mt-5 text-muted-foreground">
              {indicator.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {isPremium ? (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                  >
                    <Link
                      to="/checkout"
                      search={{ plan: "yearly", indicator: indicator.slug }}
                    >
                      Choose Subscription{" "}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild size="lg" variant="outline">
                    <Link to="/pricing">View Pricing</Link>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                >
                  <Link to="/free">Get Free Access</Link>
                </Button>
              )}

              <Button asChild size="lg" variant="ghost">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-20 blur-3xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl glass-strong shadow-elevated">
              <img
                src={indicator.image}
                alt={`${indicator.name} chart preview`}
                width={1920}
                height={1080}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="rounded-2xl glass neon-border p-8 lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">Key features</h2>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {indicator.features.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl glass neon-border p-8">
            <h3 className="font-display text-lg font-bold">Details</h3>
            <Detail label="Compatibility" value="TradingView" />
            <Detail label="Access method" value="Invite-only script access" />
            <Detail label="Required info" value="TradingView username" />
            <Detail label="Markets" value="Crypto, FX, indices, stocks" />
          </div>
        </div>
      </Section>

      <Section className="py-10">
        <h2 className="mb-2 font-display text-2xl font-bold sm:text-3xl">
          What it helps with
        </h2>

        <p className="max-w-2xl text-muted-foreground">
          Designed to remove noise and reveal structure: cleaner zones, clearer
          bias, sharper setups.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              t: "Read structure faster",
              d: "Auto-zones replace manual marking and free your focus.",
            },
            {
              t: "Avoid low-quality setups",
              d: "Bias and reaction context filter out weak entries.",
            },
            {
              t: "Plan with confidence",
              d: "Know your trend, key zones and triggers at a glance.",
            },
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
          <h2 className="mb-10 text-center font-display text-2xl font-bold sm:text-3xl">
            Subscription access options
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <PricingCard key={p.id} plan={p} indicator={indicator.slug} />
            ))}
          </div>
        </Section>
      )}

      <Section className="py-10">
        <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">
          FAQ
        </h2>

        <div className="grid max-w-3xl gap-3">
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
          <strong className="text-foreground">Disclaimer:</strong> This
          indicator is provided for educational and analytical purposes only and
          is not financial advice. Trading involves risk. Past performance does
          not guarantee future results.
        </div>
      </Section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}