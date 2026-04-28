export type Plan = {
  id: "monthly" | "six-month" | "yearly" | "lifetime";
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
};

export const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$19",
    period: "/month",
    tagline: "Best for testing the indicator",
    features: ["Access for 1 month", "Cancel anytime", "All indicator features", "Email support"],
    cta: "Subscribe Monthly",
  },
  {
    id: "six-month",
    name: "6-Month",
    price: "$95",
    period: "/6 months",
    tagline: "Better value for active traders",
    features: ["Access for 6 months", "All indicator features", "Save 1 month", "Priority email support"],
    cta: "Subscribe for 6 Months",
    badge: "Popular",
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$171",
    period: "/year",
    tagline: "Best value for committed traders",
    features: ["Access for 12 months", "Priority updates", "All indicator features", "Save 3 months"],
    cta: "Subscribe Yearly",
    highlight: true,
    badge: "Best Value",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "$228",
    period: "one-time",
    tagline: "Pay once, keep forever",
    features: ["Lifetime access", "All future updates", "All indicator features", "Priority support"],
    cta: "Get Lifetime Access",
  },
];
