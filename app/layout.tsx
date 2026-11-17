import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cubbyz.com"),
  title: "Cubbyz \u2014 trustless transaction on Solana",
  description:
    "Cubbyz is a trustless commerce platform for secure transactions, from human deals to AI agent commerce.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cubbyz — Because hope is not a payment method.",
    description:
      "Trustless commerce for today’s transactions and the coming world of AI agent commerce.",
    url: "https://cubbyz.com/",
    siteName: "Cubbyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cubbyz — Because hope is not a payment method.",
    description:
      "Trustless commerce. Secure transactions. Because hope is not a payment method.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
