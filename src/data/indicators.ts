export type Indicator = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "Market Structure" | "Trend" | "Signals" | "Dashboard";
  tier: "Free" | "Premium";
  features: string[];
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
  },
  {
    slug: "bias-cloud-pro",
    name: "Bias Cloud Pro",
    tagline: "Multi-timeframe directional bias",
    description: "Visualize directional bias across multiple timeframes with an adaptive cloud overlay.",
    category: "Trend",
    tier: "Premium",
    features: ["Adaptive trend cloud", "MTF bias confirmation", "Custom palette", "Alert hooks"],
  },
  {
    slug: "wawora-oscillator",
    name: "Wawora Oscillator",
    tagline: "Free trend overlay",
    description: "A clean trend overlay to quickly read directional context.",
    category: "Trend",
    tier: "Free",
    features: ["Divergence signals", "Overbought / oversold zone", "Alerts"],
  },
  {
    slug: "basic-trend-cloud",
    name: "Basic Trend Cloud",
    tagline: "Session liquidity levels",
    description: "Plot session highs and lows automatically across major sessions.",
    category: "Market Structure",
    tier: "Free",
    features: ["Asia/London/NY", "Custom sessions", "Labels"],
  },
  {
    slug: "simple-bias-dashboard",
    name: "Simple Bias Dashboard",
    tagline: "Basic MTF bias",
    description: "A lightweight multi-timeframe bias dashboard for quick reads.",
    category: "Dashboard",
    tier: "Free",
    features: ["3 timeframes", "Compact view", "Minimal styling"],
  },
  {
    slug: "candle-clarity-tool",
    name: "Candle Clarity Tool",
    tagline: "Clean candle overlay",
    description: "Simplifies candle visuals so you can read price action with less noise.",
    category: "Trend",
    tier: "Free",
    features: ["Clean overlay", "Color presets", "Hide noise"],
  },
];

export function getIndicator(slug: string) {
  return indicators.find((i) => i.slug === slug);
}
