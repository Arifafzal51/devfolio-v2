"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const conn = (
      navigator as Navigator & {
        connection?: {
          saveData: boolean;
        };
      }
    ).connection;

    if (!isDesktop || conn?.saveData) return;

    let t: ReturnType<typeof setTimeout>;
    const start = () => {
      t = setTimeout(() => setShowVideo(true), 3000); // after load + 3s
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", start);
    };
  }, []);

  return (
    <div className="relative z-0 mx-auto my-5 h-42 w-full max-w-3xl overflow-hidden rounded-2xl shadow-xl sm:h-72 md:h-80">
      <Image
        src="/assets/sukuna-poster.webp" // use a ~1536px wide file
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover"
      />
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/assets/sukuna.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
}
