import type { Metadata } from "next";

import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { generateContentMetadata } from "@/lib/stats/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Resume - Professional Experience",
    description:
      "View my professional resume, technical skills, projects, and experience.",
    image: "/meta/resume.webp",
    path: "/resume",
    type: "website",
  });
}

export default function ResumePage() {
  return (
    <Container className="mt-5 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Resume</Heading>
        <SubHeading>View and download my professional resume.</SubHeading>

        <Separator className="my-5 mt-10" />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="my-4 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Arif Afzal — Software Developer &amp; Technical Educator
          </p>
          <a
            href="/assets/resume.pdf"
            download="Arif-Afzal-Resume.pdf"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-neutral-800 dark:border-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Download Resume (PDF)
          </a>
        </div>

        <div
          className="border-border bg-muted/30 my-6 overflow-hidden rounded-lg border"
          style={{ animationDelay: "0.1s" }}
        >
          <iframe
            src="/assets/resume.pdf"
            title="Arif Afzal Resume"
            className="h-100 w-full md:min-h-200"
            allow="autoplay"
          />
        </div>
      </Reveal>
    </Container>
  );
}
