import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/site/Section";
import { IndicatorCard } from "@/components/site/IndicatorCard";
import { PricingCard } from "@/components/site/PricingCard";
import { indicators } from "@/data/indicators";
import { plans } from "@/data/plans";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  LayoutDashboard,
  Cloud,
  Bell,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import heroChart from "@/assets/hero-chart.jpg";
import razeLogo from "@/assets/raze-algo-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raze Algo — Premium TradingView Indicators" },
      {
        name: "description",
        content:
          "Discover clean market structure zones, trend bias, smart candle overlays, multi-timeframe dashboards and precision setup tools built for modern traders.",
      },
    ],
  }),
  component: HomePage,
});

const benefits = [
  { icon: Layers, title: "Cleaner Market Structure", desc: "Auto-detected bullish and bearish zones with adaptive coloring." },
  { icon: Activity, title: "Smart Zones", desc: "Reaction-scored zones to focus on what actually matters." },
  { icon: LayoutDashboard, title: "Multi-Timeframe Bias", desc: "A glanceable dashboard across your custom timeframes." },
  { icon: Cloud, title: "Trend Cloud", desc: "Clean directional context with a low-noise trend overlay." },
  { icon: Bell, title: "Setup Alerts", desc: "Built-in alert conditions for entries and structure breaks." },
  { icon: Sparkles, title: "Professional Visuals", desc: "Refined themes designed for serious chart analysis." },
];

const trustBadges = [
  "TradingView Compatible",
  "Instant Access After Approval",
  "Free & Premium Tools",
  "Built for Price Action Traders",
];

const steps = [
  { n: "01", t: "Choose an indicator", d: "Browse free and premium tools." },
  { n: "02", t: "Select your access plan", d: "Monthly, 6-month, yearly or lifetime." },
  { n: "03", t: "Submit your TradingView username", d: "Required for invite-only access." },
  { n: "04", t: "Get access and trade", d: "Add the script and start using it on your charts." },
];

function HomePage() {
  const free = indicators.filter((i) => i.tier === "Free");
  const premium = indicators.filter((i) => i.tier === "Premium");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-glow" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24 relative">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Now featuring MSZ Pro
            </span>
            <div className="mt-6 flex items-start gap-4">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gradient flex-1">
                Professional TradingView Indicators
              </h1>
              <img
                src={razeLogo}
                alt="Raze Algo logo"
                width={420}
                height={420}
                className="md:hidden w-[80px] h-auto shrink-0 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] opacity-70"
              />
            </div>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Discover clean market structure zones, trend bias, smart candle overlays, multi-timeframe
              dashboards and precision setup tools built for modern traders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow-lg hover:opacity-90">
                <Link to="/indicators">View Indicators <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {trustBadges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                </span>
              ))}
            </div>
            </div>
            <div className="hidden md:flex relative items-center justify-center">
              <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl rounded-full animate-pulse-glow" aria-hidden />
              <img
                src={razeLogo}
                alt="Raze Algo logo"
                width={420}
                height={420}
                className="relative w-[300px] lg:w-[360px] xl:w-[420px] h-auto animate-float drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] pb-[100px] opacity-100"
              />
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-[2rem]" aria-hidden />
            <div className="relative rounded-2xl glass-strong overflow-hidden shadow-elevated">
              <img
                src={heroChart}
                alt="Trading chart with neon purple market structure zones, trend cloud and bias dashboard"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <Section>
        <div className="rounded-3xl glass-strong neon-border p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" aria-hidden />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                FEATURED PRODUCT
              </span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-gradient">MSZ Pro</h2>
              <p className="mt-2 text-xl text-foreground/90">Market Structure Zones</p>
              <p className="mt-4 text-muted-foreground max-w-lg">
                A professional TradingView indicator for structure-based zones, bias analysis, trend
                context and clean setup alerts. Built for traders who want signal, not noise.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                  <Link to="/indicators/$slug" params={{ slug: "msz-pro" }}>
                    Explore MSZ Pro <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Bullish & bearish zones",
                "Adaptive coloring",
                "Trend cloud",
                "MTF bias dashboard",
                "Smart candle overlay",
                "Built-in alerts",
              ].map((f) => (
                <div key={f} className="rounded-xl glass p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-medium">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* BENEFITS */}
      <Section>
        <SectionHeader
          eyebrow="Why traders choose us"
          title="Built for clarity. Designed for edge."
          description="Every tool is engineered to reduce noise and surface high-quality information directly on your chart."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="group rounded-2xl glass neon-border p-6 hover:-translate-y-1 transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                <b.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <SectionHeader eyebrow="How it works" title="Get up and running in minutes" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl glass p-6">
              <span className="font-display text-4xl font-bold text-gradient-primary">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FREE INDICATORS */}
      <Section>
        <SectionHeader
          eyebrow="Free tools"
          title="Start with our free indicators"
          description="Quality tools to test our work before unlocking the premium suite."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {free.map((i) => (
            <IndicatorCard key={i.slug} indicator={i} />
          ))}
        </div>
      </Section>

      {/* PREMIUM INDICATORS */}
      <Section>
        <SectionHeader
          eyebrow="Premium suite"
          title="Premium indicators"
          description="Our most advanced tools for serious price-action traders."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {premium.map((i) => (
            <IndicatorCard key={i.slug} indicator={i} />
          ))}
        </div>
      </Section>

      {/* PRICING PREVIEW */}
      <Section>
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, flexible access"
          description="Pick the plan that fits your style. Cancel anytime."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/pricing">See full comparison <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* FAQ PREVIEW */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <div className="grid gap-4 max-w-3xl mx-auto">
          {[
            { q: "How do I get access to the indicator?", a: "After payment, submit your TradingView username and we grant invite-only access to the script." },
            { q: "Do I need TradingView?", a: "Yes. All indicators run on TradingView. A free TradingView account works." },
            { q: "Can I cancel my monthly subscription?", a: "Yes, you can cancel anytime from your dashboard." },
          ].map((f) => (
            <details key={f.q} className="group rounded-xl glass neon-border p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium">
                {f.q}
                <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/faq">Read all FAQs <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl glass-strong neon-border p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-glow" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-gradient">
              Start trading with clearer structure.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join traders using premium tools to read structure, bias and trend with clarity.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow-lg hover:opacity-90">
                <Link to="/pricing">Choose Your Plan</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/indicators">Browse Indicators</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
