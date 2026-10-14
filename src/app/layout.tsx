import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AgentationWrapper } from "@/components/common/AgentationWrapper";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Clicky — AI-Powered Child Online Safety Learning Platform",
  description:
    "Turn digital safety into a fun, interactive adventure! Learn to spot scams, handle cyberbullying, protect your privacy, and explore the web with confidence.",
  keywords: [
    "child online safety",
    "cyber safety for kids",
    "gamified digital education",
    "phishing awareness",
    "cyberbullying prevention",
    "ai safety companion",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
  authors: [{ name: "Clicky Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-clicky-bg text-clicky-text antialiased">
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}

