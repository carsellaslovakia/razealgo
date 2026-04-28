import { Link } from "@tanstack/react-router";
import { Indicator } from "@/data/indicators";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check } from "lucide-react";

export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const isPremium = indicator.tier === "Premium";
  return (
    <div className="group relative flex flex-col rounded-2xl glass neon-border p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
            {indicator.category}
          </span>
          <h3 className="mt-3 font-display text-xl font-bold">{indicator.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{indicator.tagline}</p>
        </div>
        <span
          className={
            isPremium
              ? "inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-glow"
              : "inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success"
          }
        >
          {isPremium ? <Sparkles className="h-3 w-3" /> : null}
          {indicator.tier}
        </span>
      </div>

      <ul className="mt-5 space-y-2 flex-1">
        {indicator.features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="outline" className="flex-1">
          <Link to="/indicators/$slug" params={{ slug: indicator.slug }}>
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        {isPremium ? (
          <Button asChild className="flex-1 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Link to="/pricing">Choose Plan</Link>
          </Button>
        ) : (
          <Button asChild className="flex-1 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Link to="/free">Get Free Access</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
