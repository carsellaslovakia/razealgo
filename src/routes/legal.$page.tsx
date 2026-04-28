import { createFileRoute, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";

const pages = {
  terms: {
    title: "Terms of Service",
    body: [
      "These Terms of Service govern your use of our website and indicators. By using our products you agree to these terms.",
      "All indicators are licensed for personal use. You may not redistribute, resell, decompile or share access to the scripts.",
      "Subscriptions renew automatically until cancelled. Lifetime plans are one-time payments granting indefinite access to the chosen indicator and its updates.",
      "We reserve the right to update, modify or discontinue indicators with reasonable notice.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect only the information needed to provide access to our indicators: name, email and TradingView username.",
      "Payment information is processed by our payment provider and never stored on our servers.",
      "We do not sell your personal data to third parties.",
      "You may request deletion of your data by contacting support.",
    ],
  },
  risk: {
    title: "Risk Disclaimer",
    body: [
      "All tools are provided for educational and analytical purposes only. They are not financial advice.",
      "Trading involves risk. Past performance does not guarantee future results.",
      "You are solely responsible for your trading decisions and any losses incurred.",
      "Consult a qualified financial advisor before making investment decisions.",
    ],
  },
  refund: {
    title: "Refund Policy",
    body: [
      "Digital products and invite-only script access may have limited refund eligibility. Edit this policy according to your final business rules.",
      "Refund requests should be submitted within 7 days of purchase via the Contact page.",
      "Lifetime access purchases are generally non-refundable once access has been granted.",
      "We reserve the right to assess refund requests on a case-by-case basis.",
    ],
  },
} as const;

type PageKey = keyof typeof pages;

export const Route = createFileRoute("/legal/$page")({
  loader: ({ params }) => {
    if (!(params.page in pages)) throw notFound();
    return { page: params.page as PageKey };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${pages[loaderData.page].title} — Raze Algo` },
          { name: "description", content: `${pages[loaderData.page].title} for Raze Algo.` },
        ]
      : [],
  }),
  component: LegalPage,
  notFoundComponent: () => (
    <Section><h1 className="font-display text-3xl font-bold">Page not found</h1></Section>
  ),
});

function LegalPage() {
  const { page } = Route.useLoaderData();
  const content = pages[page];

  return (
    <Section>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gradient">{content.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-10 space-y-5 text-muted-foreground leading-relaxed">
          {content.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-border/60 bg-muted/30 p-5 text-xs text-muted-foreground">
          This is placeholder legal content. Replace with your actual policies before going live.
        </div>
      </div>
    </Section>
  );
}
