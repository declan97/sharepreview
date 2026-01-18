import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing. Start free with 10 checks per day, upgrade to Pro for unlimited checks. Monthly or annual billing available.",
  alternates: {
    canonical: "https://sharelint.com/pricing",
  },
  openGraph: {
    title: "Pricing | ShareLint",
    description:
      "Simple, transparent pricing. Start free, upgrade when you need unlimited checks.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
