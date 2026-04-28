import { Link } from "@tanstack/react-router";
import { Plan } from "@/data/plans";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingCard({ plan, indicator = "msz-pro" }: { plan: Plan; indicator?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-6 sm:p-8 transition-all",
        plan.highlight
          ? "bg-gradient-surface neon-border shadow-elevated animate-pulse-glow"
          : "glass neon-border hover:-translate-y-1"
      )}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
          {plan.badge}
        </span>
      )}
      <h3 className="font-display text-xl font-bold">{plan.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-gradient-primary">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.period}</span>
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        className={cn(
          "mt-8 w-full",
          plan.highlight
            ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
            : "bg-secondary text-foreground hover:bg-accent"
        )}
      >
        <Link to="/checkout" search={{ plan: plan.id, indicator }}>
          {plan.cta}
        </Link>
      </Button>
    </div>
  );
}
