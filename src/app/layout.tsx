import { Suspense } from "react";

import type { Metadata } from "next";

import { Toaster } from "sonner";

import { UmamiAnalytics } from "@/components/analytics/UmamiAnalytics";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import { OnekoCat } from "@/components/common/OnekoCat";
import { Quote } from "@/components/common/Quote";
import { Reveal } from "@/components/common/Reveal";
import SwarmTrigger from "@/components/common/SwarmTrigger";
import { poppins } from "@/config/font";
import { AppProviders } from "@/providers/AppProviders";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://arifafzal.dev"),
  alternates: {
    canonical: "https://arifafzal.dev",
  },
  title: {
    default: "Arif Afzal - Software Developer & Educator",
    template: "%s",
  },

  description:
    "Software developer and computer science educator passionate about building useful digital products, solving complex problems, and helping others understand technology.",

  openGraph: {
    type: "website",
    url: "https://arifafzal.dev/",
    title: "Arif Afzal - Software Developer & Educator",
    description:
      "Software developer and computer science educator passionate about building useful digital products, solving complex problems, and helping others understand technology.",
    siteName: "Arif Afzal",
    images: [
      {
        url: "https://arifafzal.dev/meta/og-img.webp",
        width: 1200,
        height: 630,
        alt: "Arif Afzal Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Arif Afzal - Software Developer & Educator",
    description:
      "Software developer and computer science educator passionate about building useful digital products, solving complex problems, and helping others understand technology.",
    images: ["https://arifafzal.dev/meta/og-img.webp"],
    creator: "@hyarif",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
      suppressContentEditableWarning
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/developer-hero.gif"
          fetchPriority="high"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Suspense fallback={null}>
          <AppProviders>
            <NavigationProgress />
            <Toaster richColors position="top-right" />
            <CustomCursor />
            <Navbar />
            <OnekoCat />
            {children}
            <SwarmTrigger />
            <Reveal delay={0.2}>
              <Quote />
            </Reveal>
            <Footer />
            <UmamiAnalytics />
          </AppProviders>
        </Suspense>
      </body>
    </html>
  );
}
