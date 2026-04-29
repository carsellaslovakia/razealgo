import mszProHero from "../assets/raze-algo-hero.png";
import wavoraHero from "../assets/wavora-hero.png";
import levelsHero from "../assets/levels-hero.png";

export type Indicator = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category:
    | "Market Structure"
    | "Trend"
    | "Signals"
    | "Dashboard"
    | "Oscillator"
    | "Support and Resistance";
  tier: "Free" | "Premium";
  features: string[];
  image: string;
};

export const indicators: Indicator[] = [
  {
    slug: "msz-pro",
    name: "MSZ Pro",
    tagline: "Market Structure Zones Algo",
    description:
      "A professional TradingView indicator for structure-based zones, bias analysis, trend context and clean setup alerts.",
    category: "Market Structure",
    tier: "Premium",
    features: [
      "Automatic bullish & bearish market structure zones",
      "Adaptive zone coloring",
      "Show previous zones option",
      "Trend cloud",
      "Smart candle overlay",
      "Multi-timeframe bias dashboard",
      "Custom dashboard timeframes",
      "Optional BUY / SELL setup markers",
      "Built-in alert conditions",
      "Multiple color themes",
    ],
    image: mszProHero,
  },
  {
    slug: "bias-cloud-pro",
    name: "Bias Cloud Pro",
    tagline: "Multi-timeframe directional bias",
    description:
      "Visualize directional bias across multiple timeframes with an adaptive cloud overlay.",
    category: "Trend",
    tier: "Premium",
    features: [
      "Adaptive trend cloud",
      "MTF bias confirmation",
      "Custom palette",
      "Alert hooks",
    ],
    image: mszProHero,
  },
  {
    slug: "wavora",
    name: "Wavora",
    tagline: "Wave momentum and divergence oscillator",
    description:
      "Momentum wave-based oscillator signals and highlights potential bullish and bearish divergences.",
    category: "Oscillator",
    tier: "Free",
    features: ["Momentum", "Divergence", "Alerts"],
    image: wavoraHero,
  },
  {
    slug: "levels",
    name: "Levels",
    tagline: "MTF support and resistance",
    description:
      "Automatically plots pivot-based support and resistance levels across multiple timeframes.",
    category: "Support and Resistance",
    tier: "Free",
    features: ["Pivot", "Multi-time frame", "Labels"],
    image: levelsHero,
  },
  {
    slug: "simple-bias-dashboard",
    name: "Simple Bias Dashboard",
    tagline: "Basic MTF bias",
    description: "A lightweight multi-timeframe bias dashboard for quick reads.",
    category: "Dashboard",
    tier: "Free",
    features: ["3 timeframes", "Compact view", "Minimal styling"],
    image: mszProHero,
  },
  {
    slug: "candle-clarity-tool",
    name: "Candle Clarity Tool",
    tagline: "Clean candle overlay",
    description:
      "Simplifies candle visuals so you can read price action with less noise.",
    category: "Trend",
    tier: "Free",
    features: ["Clean overlay", "Color presets", "Hide noise"],
    image: mszProHero,
  },
];

export function getIndicator(slug: string) {
  return indicators.find((i) => i.slug === slug);
}