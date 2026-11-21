"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import { quotes, type QuoteType } from "@/config/quote";
import { Container } from "./Container";

const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState<QuoteType | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  const pickRandomQuote = () => {
    setIsRotating(true);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setTimeout(() => setIsRotating(false), 300);
  };

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  if (!currentQuote) return null;

  const { quote, author, category } = currentQuote;

  return (
    <Container className="px-4 py-16">
      <div className="gradient-tile relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-6 sm:px-14 sm:py-10 backdrop-blur-md transition-all duration-300 dark:border-neutral-800/90 dark:bg-neutral-900/50">
        <svg
          aria-hidden="true"
          width="105"
          height="78"
          className="pointer-events-none absolute top-3 left-6 -z-10 fill-neutral-200/70 dark:fill-neutral-800/60"
        >
          <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
        </svg>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {category === "quran"
                ? "Holy Qur'an"
                : category === "hadith"
                  ? "Authentic Hadith"
                  : "Daily Reflection"}
            </span>

            <button
              type="button"
              onClick={pickRandomQuote}
              title="Next reflection"
              className="flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-neutral-600 transition-all hover:scale-105 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-800/70 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
            >
              <RefreshCw
                className={`size-3 transition-transform duration-300 ${isRotating ? "rotate-180" : ""}`}
              />
              <span>Next Quote</span>
            </button>
          </div>

          <p className="font-serif text-lg sm:text-xl md:text-2xl leading-relaxed text-neutral-800 italic dark:text-neutral-200">
            &ldquo;{quote}&rdquo;
          </p>

          <p className="text-right font-mono text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            — {author}
          </p>
        </div>
      </div>
    </Container>
  );
};

export { Quote };
