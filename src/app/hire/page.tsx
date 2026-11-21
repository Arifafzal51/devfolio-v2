import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, Globe, MapPin, Sparkles } from "lucide-react";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { getAllRegionalHirePages } from "@/config/programmatic-hire";
import { generateContentMetadata } from "@/lib/stats/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Hire Arif Afzal - Senior Full-Stack Engineer for Europe, GCC & India",
    description:
      "Explore regional engineering partnerships with Arif Afzal. High-performance Next.js 16, TypeScript, edge computing, and full-stack solutions tailored for tech teams in Europe (GMT/CET), GCC (GST), and India (IST).",
    path: "/hire",
    type: "website",
  });
}

export default function HireHubPage() {
  const pages = getAllRegionalHirePages();
  const europePages = pages.filter((p) => p.region === "Europe");
  const gccPages = pages.filter((p) => p.region === "GCC");
  const indiaPages = pages.filter((p) => p.region === "India");

  const renderSection = (title: string, subtitle: string, regionPages: typeof pages, regionBadge: string) => (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            {title}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>
        <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 font-mono text-xs font-medium text-blue-600 dark:text-blue-400">
          {regionBadge}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regionPages.map((page, idx) => (
          <Reveal key={page.slug} delay={idx * 0.05}>
            <Link
              href={`/hire/${page.slug}`}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white/70 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-md dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
            >
              <div>
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-medium text-blue-600 uppercase dark:text-blue-400">
                    {page.badge.split("•")[0]}
                  </span>
                  <ArrowUpRight className="size-4 text-neutral-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
                </div>

                <h3 className="font-semibold text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                  {page.role}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-neutral-600 line-clamp-2 dark:text-neutral-400">
                  {page.metaDescription}
                </p>
              </div>

              <div className="mt-4 border-t border-dashed border-neutral-200/80 pt-3 text-[11px] text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <Clock className="size-3 text-neutral-400" />
                  <span>{page.timezone.overlapHours}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 font-mono">
                  <MapPin className="size-3 text-neutral-400" />
                  <span>{page.targetHubs.slice(0, 3).join(", ")}</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );

  return (
    <Container className="mt-5 space-y-10 px-4 md:px-6 lg:px-0">
      {/* Page Header */}
      <Reveal>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            <Sparkles className="size-3.5" />
            <span>Available for Remote &amp; Contract Engagements</span>
          </div>

          <Heading as="h1" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Engineering Roles by Region
          </Heading>

          <SubHeading>
            Tailored engineering capabilities, timezone alignment, and compliance models for high-growth tech teams across Europe, the GCC, and India.
          </SubHeading>
        </div>
        <Separator className="my-6" />
      </Reveal>

      {/* Global Highlights Banner */}
      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-6 sm:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase">
              <Globe className="size-4 text-blue-500" />
              <span>Regions Covered</span>
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Europe • GCC • India
            </p>
            <p className="text-xs text-neutral-500">
              GMT / BST, CET / CEST, GST, and IST
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase">
              <Clock className="size-4 text-emerald-500" />
              <span>Timezone Overlap</span>
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              4 to 8 Hours Daily
            </p>
            <p className="text-xs text-neutral-500">
              Synchronous standups, pairing, and instant messaging
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase">
              <Briefcase className="size-4 text-purple-500" />
              <span>Contracting</span>
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Friction-Free B2B
            </p>
            <p className="text-xs text-neutral-500">
              Deel, Wise Business, Direct Invoicing (EUR, GBP, USD, AED, INR)
            </p>
          </div>
        </div>
      </Reveal>

      {/* Regional Sections */}
      <div className="space-y-12">
        {renderSection(
          "Europe & United Kingdom",
          "Seamless 4-6 hours GMT/CET overlap with London, Berlin, Amsterdam & Nordic tech hubs.",
          europePages,
          "GMT / CET Aligned"
        )}

        {renderSection(
          "UAE, Saudi Arabia & GCC",
          "Near-zero timezone difference (1.5 hrs from Dubai/Riyadh) for high-velocity Middle East startups.",
          gccPages,
          "GST / AST Aligned"
        )}

        {renderSection(
          "India Tech Ecosystem",
          "100% synchronous IST working hours for fast-growing Indian unicorns, scale-ups, and D2C brands.",
          indiaPages,
          "100% IST Synchronous"
        )}
      </div>

      {/* Direct Contact Banner */}
      <Reveal delay={0.2}>
        <div className="rounded-2xl border border-neutral-200/90 bg-linear-to-r from-neutral-100/80 via-white to-neutral-100/80 p-8 text-center sm:text-left dark:border-neutral-800 dark:from-neutral-900/60 dark:via-neutral-900/30 dark:to-neutral-950">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Have a specific role or custom project scope?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Let&apos;s schedule a 15-minute technical conversation to discuss requirements, timeline, and architectural fit.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                <span>Book a Technical Intro</span>
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                View Full Resume
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
