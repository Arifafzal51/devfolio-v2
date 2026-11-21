import { Mailbox, Quote } from "lucide-react";

import { testimonials } from "@/lib/testimonials";

import { Container } from "../common/Container";
import { Heading } from "../common/Heading";
import { Reveal } from "../common/Reveal";

const Testimonial = () => {
  const isMarquee = testimonials.length >= 4;

  return (
    <Reveal delay={0.1}>
      <Container className="mb-5">
        <section className="space-y-6">
          <Heading as="h2" Icon={<Mailbox />}>
            Testimonials
          </Heading>

          {isMarquee ? (
            <div className="group relative w-full overflow-hidden">
              {/* Fade masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-background to-transparent" />

              <div className="flex w-max items-stretch gap-4 animate-marquee group-hover:[animation-play-state:paused]">
                {[...testimonials, ...testimonials].map((item, idx) => (
                  <article
                    key={`${item.id}-${idx}`}
                    className="flex w-[min(24rem,calc(100vw-3rem))] shrink-0 flex-col justify-between gap-5 rounded-2xl border border-neutral-200/90 bg-neutral-100/70 p-6 transition-colors duration-300 hover:border-neutral-300 dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
                  >
                    <div className="space-y-3">
                      <Quote
                        size={22}
                        className="text-neutral-400 dark:text-neutral-600"
                      />
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <div className="border-t border-dashed border-neutral-200/80 pt-3 dark:border-neutral-800/80">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                        — {item.name}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-neutral-200/90 bg-neutral-100/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xs dark:border-neutral-800/90 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
                >
                  <div className="space-y-3">
                    <Quote
                      size={22}
                      className="text-neutral-400 dark:text-neutral-600"
                    />
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-dashed border-neutral-200/80 pt-3 dark:border-neutral-800/80">
                    <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      — {item.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </Container>
    </Reveal>
  );
};

export { Testimonial };
