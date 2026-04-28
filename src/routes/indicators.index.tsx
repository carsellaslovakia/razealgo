import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, SectionHeader } from "@/components/site/Section";
import { IndicatorCard } from "@/components/site/IndicatorCard";
import { indicators } from "@/data/indicators";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/indicators/")({
  head: () => ({
    meta: [
      { title: "Indicators — Raze Algo" },
      { name: "description", content: "Browse our full suite of premium and free TradingView indicators." },
      { property: "og:title", content: "Indicators — Raze Algo" },
      { property: "og:description", content: "Premium and free TradingView indicators for market structure, trend, signals and dashboards." },
    ],
  }),
  component: IndicatorsPage,
});

const filters = ["All", "Free", "Premium", "Market Structure", "Trend", "Signals", "Dashboard"] as const;
type Filter = (typeof filters)[number];

function IndicatorsPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = indicators.filter((i) => {
    if (filter === "All") return true;
    if (filter === "Free" || filter === "Premium") return i.tier === filter;
    return i.category === filter;
  });

  return (
    <Section>
      <SectionHeader
        eyebrow="Indicators"
        title="The full indicator library"
        description="Premium and free tools — filter by category to find what fits your workflow."
      />

      <div className="mb-10 flex flex-wrap gap-2 justify-center">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              filter === f
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "glass text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <IndicatorCard key={i.slug} indicator={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">No indicators in this category yet.</p>
      )}
    </Section>
  );
}
