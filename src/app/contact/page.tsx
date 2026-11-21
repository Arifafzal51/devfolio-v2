import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/common/ContactForm";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Reveal } from "@/components/common/Reveal";
import { SubHeading } from "@/components/common/SubHeading";
import { Separator } from "@/components/ui/separator";
import { generateContentMetadata } from "@/lib/stats/seo";

export function generateMetadata(): Metadata {
  return generateContentMetadata({
    title: "Contact - Let's Work Together",
    description:
      "Have a project in mind, an idea to share, or an opportunity to discuss? Get in touch with me.",
    image: "/meta/contact.webp",
    path: "/contact",
    type: "website",
  });
}

export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "arifafzal51@gmail.com",
      href: "mailto:arifafzal51@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone (Demo)",
      value: "0000000000",
      href: "tel:0000000000",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "West Champaran, Bihar, India",
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
    },
  ];

  return (
    <Container className="mt-5 space-y-8 px-4 md:px-6 lg:px-0">
      <Reveal>
        <Heading as="h1">Contact</Heading>
        <SubHeading>Have something in mind? Let&apos;s talk.</SubHeading>
        <Separator className="my-5 mt-10" />
      </Reveal>

      {/* Quick Contact Cards */}
      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item, idx) => {
            const Icon = item.icon;
            const content = (
              <div className="flex h-full items-center gap-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800/80 dark:bg-neutral-900/40 dark:hover:border-neutral-700">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-200/60 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-neutral-500 uppercase dark:text-neutral-400">
                    {item.label}
                  </p>
                  <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.value}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={idx}
                href={item.href}
                className="group block"
                title={`Contact via ${item.label}`}
              >
                {content}
              </a>
            ) : (
              <div key={idx}>{content}</div>
            );
          })}
        </div>
      </Reveal>

      {/* Contact Form */}
      <Reveal delay={0.15}>
        <ContactForm />
      </Reveal>
    </Container>
  );
}
