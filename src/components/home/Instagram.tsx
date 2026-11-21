"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Quote as QuoteIcon } from "lucide-react";

import { instrumentSerif } from "@/config/font";
import { instagramConfig, type InstagramPost } from "@/config/instagram";
import { Instagram as InstagramSvg } from "@/svgs/socials/Instagram";
import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";
import { buttonVariants } from "../ui/button";
import { cn } from "cn";

const InstagramCard = ({ post, index }: { post: InstagramPost; index: number }) => {
  return (
    <Reveal delay={0.08 * (index % 4)}>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read thought on Instagram: ${post.title}`}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-gradient-to-br from-neutral-50/90 via-white to-neutral-100/60 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-md dark:border-neutral-800/80 dark:from-neutral-900/80 dark:via-neutral-900/40 dark:to-neutral-950/90 dark:hover:border-neutral-700"
      >
        {/* Subtle decorative gradient glow on hover */}
        <div className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-linear-to-br from-[#f09433]/10 via-[#e6683c]/10 to-[#bc1888]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:from-[#f09433]/15 dark:via-[#dc2743]/15 dark:to-[#bc1888]/15" />

        <div>
          {/* Top meta row */}
          <div className="mb-4 flex items-center justify-between gap-2 text-xs">
            <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
              {post.tag}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
              {post.date}
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
            </span>
          </div>

          {/* Quote icon & text */}
          <div className="relative mb-4">
            <QuoteIcon className="mb-2 size-5 text-neutral-300 dark:text-neutral-700" />
            <p
              className={`${instrumentSerif.className} text-xl leading-snug text-neutral-900 italic sm:text-2xl dark:text-neutral-100`}
            >
              &ldquo;{post.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between border-t border-dashed border-neutral-200/70 pt-3 dark:border-neutral-800/70">
          <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
            {post.subtext || "Thoughts by Arif Afzal"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-200/60 px-2 py-0.5 text-[10px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            <InstagramSvg className="size-2.5" />
            {post.type}
          </span>
        </div>
      </a>
    </Reveal>
  );
};

export const InstagramSection = () => {
  const { profileUrl, handle, badge, bio, posts, section } = instagramConfig;

  return (
    <Reveal delay={0.1}>
      <Container className="space-y-6">
        {/* Section Header */}
        <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <Heading as="h2" className="flex items-center gap-2">
              <InstagramSvg className="size-6 text-[#E1306C]" />
              {section.heading}
            </Heading>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {section.subheading}
            </p>
          </div>

          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          >
            <span className="relative">
              {handle}
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 bg-current transition-all duration-200 ease-out group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="size-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Brand statement bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200/70 bg-neutral-100/60 px-4 py-2.5 text-xs text-neutral-600 dark:border-neutral-800/70 dark:bg-neutral-900/40 dark:text-neutral-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="size-2 rounded-full bg-[#E1306C] animate-pulse" />
            <span className="font-semibold text-neutral-900 dark:text-neutral-200">{badge}</span>
            <span className="hidden sm:inline">• {bio}</span>
          </div>

          <span className="font-mono text-[11px] text-neutral-500">
            {instagramConfig.stats.posts} posts shared
          </span>
        </div>

        {/* Posts & Quotes Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <InstagramCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Bottom Follow Callout Card */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 p-6 text-center sm:text-left dark:border-neutral-800 dark:from-neutral-900/60 dark:via-neutral-900/30 dark:to-neutral-950">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="space-y-1">
              <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-neutral-900 sm:justify-start dark:text-neutral-100">
                <Sparkles className="size-4 text-[#E1306C]" />
                Into scents, systems &amp; building things
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Join {instagramConfig.stats.followers} readers following personal reflections, perfume craft, and philosophies.
              </p>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group shrink-0 gap-2 rounded-full border-neutral-300 hover:border-neutral-400 dark:border-neutral-700"
              )}
            >
              <InstagramSvg className="size-4 text-[#E1306C]" />
              <span>{section.cta}</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Container>
    </Reveal>
  );
};
