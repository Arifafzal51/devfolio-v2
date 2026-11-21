import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { Separator } from "@/components/ui/separator";
import {
  getAllRegionalHirePages,
  getRegionalHirePage,
} from "@/config/programmatic-hire";
import { generateContentMetadata } from "@/lib/stats/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const pages = getAllRegionalHirePages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getRegionalHirePage(slug);

  if (!page) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return generateContentMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/hire/${page.slug}`,
    type: "article",
    tags: [page.role, page.region, "Next.js", "TypeScript", "Remote Developer"],
  });
}

export default async function RegionalHireDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getRegionalHirePage(slug);

  if (!page) {
    notFound();
  }

  const allPages = getAllRegionalHirePages();
  const relatedPages = allPages
    .filter((p) => p.region === page.region && p.slug !== page.slug)
    .slice(0, 3);

  // Structured Data (JSON-LD): ProfilePage + Person + FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `https://arifafzal.dev/hire/${page.slug}`,
        name: page.metaTitle,
        description: page.metaDescription,
        mainEntity: {
          "@type": "Person",
          name: "Arif Afzal",
          jobTitle: page.role,
          url: "https://arifafzal.dev",
          sameAs: [
            "https://github.com/Arifafzal51",
            "https://linkedin.com/in/hyarif/",
            "https://www.instagram.com/arifafzal.in/",
          ],
          knowsAbout: [
            "Next.js",
            "React",
            "TypeScript",
            "Cloudflare Workers",
            "PostgreSQL",
            "Prisma ORM",
            "Tailwind CSS",
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <Container className="mt-5 space-y-10 px-4 md:px-6 lg:px-0">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <Reveal>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <Link
            href="/hire"
            className="inline-flex items-center gap-1 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <ArrowLeft className="size-3.5" />
            <span>All Regional Roles</span>
          </Link>
          <span>/</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {page.region}
          </span>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-none text-neutral-500">
            {page.role}
          </span>
        </div>
      </Reveal>

      {/* Hero Header */}
      <Reveal delay={0.1}>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
            <Sparkles className="size-3.5" />
            <span>{page.badge}</span>
          </div>

          <Heading as="h1" className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {page.headline}
          </Heading>

          <p className="max-w-3xl text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            {page.metaDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/contact?subject=${encodeURIComponent(`Inquiry: ${page.role} (${page.region})`)}`}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              <span>Schedule Technical Chat</span>
              <ArrowUpRight className="size-4" />
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <span>Review CV</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>

        <Separator className="my-8" />
      </Reveal>

      {/* Timezone & Regional Alignment Card */}
      <Reveal delay={0.15}>
        <div className="overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider dark:text-blue-400">
            <Clock className="size-4" />
            <span>Regional Timezone &amp; Collaboration Protocol</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-mono text-neutral-500">Your Region / Timezone</p>
              <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {page.timezone.clientTz}
              </p>
            </div>

            <div>
              <p className="text-xs font-mono text-neutral-500">Daily Synchronous Overlap</p>
              <p className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                {page.timezone.overlapHours}
              </p>
            </div>

            <div>
              <p className="text-xs font-mono text-neutral-500">Target Tech Hubs</p>
              <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {page.targetHubs.join(", ")}
              </p>
            </div>

            <div>
              <p className="text-xs font-mono text-neutral-500">Communication Cadence</p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                {page.timezone.cadence}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Market Challenges & Engineering Solutions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Reveal delay={0.2}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <Zap className="size-4 text-amber-500" />
              <span>Challenges Solved for {page.region} Teams</span>
            </div>

            <div className="space-y-4">
              {page.marketPainPoints.map((item, id) => (
                <div
                  key={id}
                  className="rounded-xl border border-neutral-200/80 bg-white/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/50"
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <Layers className="size-4 text-blue-500" />
              <span>Production Technical Deliverables</span>
            </div>

            <div className="space-y-4">
              {page.technicalDeliverables.map((item, id) => (
                <div
                  key={id}
                  className="rounded-xl border border-neutral-200/80 bg-white/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/50"
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {item.points.map((pt, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Relevant Architectural Projects */}
      <Reveal delay={0.3}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <Briefcase className="size-4 text-purple-500" />
            <span>Demonstrated Proof &amp; Verified Work</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {page.relevantProjects.map((proj, id) => (
              <a
                key={id}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white/70 p-5 transition-all hover:-translate-y-0.5 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                      {proj.title}
                    </h4>
                    <ArrowUpRight className="size-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Legal, Contracting & Compliance Box */}
      <Reveal delay={0.35}>
        <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/80 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <ShieldCheck className="size-4 text-emerald-500" />
            <span>Friction-Free Engagement &amp; Compliance</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
            <div>
              <p className="font-mono text-neutral-500">Engagement Models</p>
              <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {page.engagement.models.join(" • ")}
              </p>
            </div>
            <div>
              <p className="font-mono text-neutral-500">Invoicing Currencies</p>
              <p className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {page.engagement.currencies.join(", ")}
              </p>
            </div>
            <div>
              <p className="font-mono text-neutral-500">Contractor Platforms</p>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                {page.engagement.compliance}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Frequently Asked Questions */}
      <Reveal delay={0.4}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <HelpCircle className="size-4 text-blue-500" />
            <span>Frequently Asked Questions ({page.region})</span>
          </div>

          <div className="space-y-3">
            {page.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-neutral-200/80 bg-white/70 p-4 transition-colors open:bg-neutral-50/80 dark:border-neutral-800 dark:bg-neutral-900/60 dark:open:bg-neutral-900/80"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  <span>{faq.question}</span>
                  <span className="text-neutral-400 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Internal Linking: Related Spokes */}
      {relatedPages.length > 0 && (
        <Reveal delay={0.45}>
          <div className="space-y-4 border-t border-neutral-200/80 pt-6 dark:border-neutral-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Other Roles for {page.region}
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedPages.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/hire/${rel.slug}`}
                  className="group rounded-xl border border-neutral-200/70 bg-white/50 p-3 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700"
                >
                  <p className="text-xs font-medium text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                    {rel.role}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-neutral-400">
                    {rel.timezone.overlapHours}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* Sticky Bottom Call-to-Action */}
      <Reveal delay={0.5}>
        <div className="rounded-2xl border border-neutral-200/90 bg-linear-to-r from-neutral-100/90 via-white to-neutral-100/90 p-8 text-center sm:text-left dark:border-neutral-800 dark:from-neutral-900/80 dark:via-neutral-900/40 dark:to-neutral-950">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Ready to accelerate your engineering roadmap?
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Let&apos;s talk through your current technical bottlenecks and see if there&apos;s a strong mutual fit.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={`/contact?subject=${encodeURIComponent(`Inquiry for ${page.role} (${page.region})`)}`}
                className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
              >
                <span>Book 15-Min Intro</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
