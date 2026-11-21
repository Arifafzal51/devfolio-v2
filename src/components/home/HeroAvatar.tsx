"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  Brain,
  Check,
  ChevronDown,
  Compass,
  Disc3,
  Laptop,
  Palette,
  Shapes,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { caveat } from "@/config/font";
import { HERO_GIFS, type HeroGifItem } from "@/config/heroGifs";
import { useSound } from "@/context/SoundContext";
import { CircleZap } from "@/svgs/essentials/CircleZap";

import { Reveal } from "../common/Reveal";
import { AvailableBadge } from "./AvailableBadge";

const LOGO = "/assets/logo.webp";
const AVATAR = "/assets/avatar-v4.jpg";

export const HeroAvatar = () => {
  const [image, setImage] = useState(AVATAR);
  const [glitch, setGlitch] = useState(false);
  const [activeGifIndex, setActiveGifIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const { soundEnabled, setSoundEnabled } = useSound();

  const audioRef = useRef<HTMLAudioElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Restore saved hero GIF on client mount
  useEffect(() => {
    try {
      const savedId = localStorage.getItem("devfolio_hero_gif");
      if (savedId) {
        const idx = HERO_GIFS.findIndex((g) => g.id === savedId);
        if (idx !== -1) setActiveGifIndex(idx);
      }
    } catch {
      // Ignore localStorage access failures
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    if (glitch) return;

    setGlitch(true);

    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    }

    timersRef.current = [
      setTimeout(() => {
        setImage((prev) => (prev === LOGO ? AVATAR : LOGO));
      }, 120),
      setTimeout(() => {
        setGlitch(false);
      }, 350),
    ];
  };

  const handleSoundControl = () => {
    const next = !soundEnabled;

    setSoundEnabled(next);

    if (!next) {
      document.querySelectorAll("audio").forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  };

  const handleSelectGif = (index: number) => {
    setActiveGifIndex(index);
    setShowOptions(false);
    try {
      localStorage.setItem("devfolio_hero_gif", HERO_GIFS[index].id);
    } catch {}

    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    }
  };

  const handleNextGif = () => {
    const nextIdx = (activeGifIndex + 1) % HERO_GIFS.length;
    handleSelectGif(nextIdx);
  };

  const activeGif = HERO_GIFS[activeGifIndex] || HERO_GIFS[0];

  const renderIcon = (iconName: HeroGifItem["iconName"], className = "size-3.5") => {
    switch (iconName) {
      case "Laptop":
        return <Laptop className={className} />;
      case "Shapes":
        return <Shapes className={className} />;
      case "Palette":
        return <Palette className={className} />;
      case "Disc3":
        return <Disc3 className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      case "Compass":
        return <Compass className={className} />;
      default:
        return <Laptop className={className} />;
    }
  };

  // Shared avatar image and glitch effect
  const AvatarImage = (
    <div className="relative size-full overflow-hidden rounded-full shadow-xl ring-4 ring-white sm:ring-5 dark:ring-black">
      <Image
        src={image}
        alt="Avatar"
        fill
        sizes="140px"
        className={`rounded-full object-cover`}
      />

      <AnimatePresence>
        {glitch && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, x: [-6, 6, -3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="140px"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-full mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8, x: [6, -6, 3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="140px"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                rotate: [0, 1, -1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );

  // Avatar switch button
  const AvatarButton = (
    <button
      type="button"
      onClick={handleClick}
      disabled={glitch}
      aria-label="Switch avatar"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-md ring ring-neutral-700 transition hover:scale-110 disabled:opacity-60 sm:size-8 dark:bg-black dark:text-white"
    >
      {image === LOGO ? (
        <Zap className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      ) : (
        <CircleZap className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      )}
    </button>
  );

  // Sound toggle button
  const SoundButton = (
    <button
      type="button"
      aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
      aria-pressed={soundEnabled}
      onClick={handleSoundControl}
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-md ring ring-neutral-700 transition hover:scale-110 sm:size-8 dark:bg-black dark:text-white"
    >
      {soundEnabled ? (
        <Volume2 className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      ) : (
        <VolumeX className="hover:text-accent-foreground size-4 text-neutral-500 transition-colors" />
      )}
    </button>
  );

  return (
    <div className="relative">
      {/* Hero GIF Container */}
      <Reveal>
        <div className="group relative z-10 mx-auto my-5 w-full max-w-3xl">
          {/* Inner GIF and background container with overflow-hidden */}
          <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-neutral-200/50 bg-neutral-900 shadow-xl sm:h-72 md:h-80 dark:border-neutral-800/80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGif.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 size-full"
              >
                <Image
                  src={activeGif.src}
                  alt={`${activeGif.name} - Arif Afzal`}
                  fill
                  priority
                  unoptimized
                  className="size-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Vignette Overlays */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
            <div className="pointer-events-none absolute inset-0 bg-radial from-transparent to-black/30" />

            {/* Bottom-Left (Desktop): Active Theme Badge & Tagline */}
            <div className="pointer-events-none absolute bottom-3 left-4 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-md md:flex">
              <span className="text-cyan-300">
                {renderIcon(activeGif.iconName, "size-3.5")}
              </span>
              <span className="font-medium">{activeGif.name}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70 text-[11px]">{activeGif.tagline}</span>
            </div>

            {/* Top-Left: Mini Theme Counter Badge */}
            <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-mono tracking-wider text-white/70 backdrop-blur-md">
              <span>{String(activeGifIndex + 1).padStart(2, "0")}</span>
              <span className="text-white/30">/</span>
              <span>{String(HERO_GIFS.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Top-Right: Interactive GIF Controls & Options Button (unclipped floating controls) */}
          <div
            ref={optionsRef}
            className="absolute right-3 top-3 z-40 flex items-center gap-1.5"
          >
            {/* Quick Next/Cycle Button */}
            <button
              type="button"
              onClick={handleNextGif}
              title="Next Hero GIF (Cycle themes)"
              aria-label="Next Hero GIF"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 hover:scale-105 active:scale-95"
            >
              <Shuffle className="size-3 text-cyan-300" />
              <span className="hidden sm:inline">Next</span>
            </button>

            {/* Options Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowOptions((prev) => !prev)}
                aria-expanded={showOptions}
                aria-label="Change hero GIF theme options"
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 hover:scale-105"
              >
                <span className="text-cyan-300">
                  {renderIcon(activeGif.iconName, "size-3.5")}
                </span>
                <span className="max-w-[90px] truncate sm:max-w-none">
                  {activeGif.name}
                </span>
                <SlidersHorizontal className="size-3 text-white/70" />
                <ChevronDown
                  className={`size-3 text-white/70 transition-transform duration-200 ${
                    showOptions ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Options Dropdown Menu */}
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-white/20 bg-neutral-950/95 p-1.5 shadow-2xl backdrop-blur-xl sm:w-72 z-50"
                  >
                    <div className="px-2 py-1.5">
                      <p className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                        Select Hero Theme ({HERO_GIFS.length})
                      </p>
                    </div>

                    <div className="max-h-80 overflow-y-auto space-y-1">
                      {HERO_GIFS.map((item, idx) => {
                        const isSelected = idx === activeGifIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectGif(idx)}
                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                              isSelected
                                ? "bg-white/15 text-white font-medium"
                                : "text-neutral-300 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className={`shrink-0 ${
                                  isSelected ? "text-cyan-300" : "text-neutral-400"
                                }`}
                              >
                                {renderIcon(item.iconName, "size-3.5")}
                              </span>
                              <div className="truncate">
                                <p className="truncate font-medium">{item.name}</p>
                                <p className="truncate text-[10px] text-neutral-400">
                                  {item.tagline}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="size-3.5 shrink-0 text-cyan-300" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Mobile: avatar overlaps GIF, buttons on either side */}
      <div className="relative z-20 -mt-18 flex flex-col items-center md:hidden">
        <div className="flex items-center justify-center gap-3">
          {AvatarButton}

          <div className="size-32 shrink-0 sm:size-35">
            <Reveal delay={0.2} className="size-full">
              {AvatarImage}
            </Reveal>
          </div>

          {SoundButton}
        </div>

        {/* Availability below avatar */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-5 w-fit">
            <AvailableBadge />
          </div>
        </Reveal>
      </div>

      {/* Desktop: Hire Me annotation */}
      <Reveal delay={0.5}>
        <div className="absolute -bottom-5 -left-30 z-30 hidden -rotate-12 flex-col items-center lg:flex">
          <a
            href="mailto:arifafzal51@gmail.com"
            className={`${caveat.className} hire-me-shake text-muted-foreground hover:text-accent-foreground text-2xl`}
          >
            HIRE ME
          </a>

          <svg
            viewBox="0 0 512 512"
            fill="none"
            aria-hidden="true"
            className="ml-8 size-20 rotate-12 text-neutral-400 dark:text-neutral-700"
          >
            <path
              d="M437 441 Q363 418 264 351 Q198 295 160 225 Q138 178 122 119"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M161 149 L125 73 L83 148"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Reveal>

      {/* Tablet and desktop: avatar positioning remains fixed */}
      <div className="absolute -bottom-15 left-10 z-10 hidden size-35 md:block">
        <Reveal delay={0.2} className="size-full">
          {AvatarImage}
        </Reveal>

        <Reveal delay={0.23}>
          <div className="absolute -right-13 bottom-0 z-20 -translate-y-1/2">
            {AvatarButton}
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="absolute -right-25 bottom-0 z-20 -translate-y-1/2">
            {SoundButton}
          </div>
        </Reveal>
      </div>

      {/* Desktop availability badge */}
      <Reveal delay={0.1}>
        <div className="itms-center absolute right-0 hidden gap-5 md:flex">
          <AvailableBadge />
        </div>
      </Reveal>

      {/* Glitch sound */}
      <audio ref={audioRef} src="/assets/glitch.wav" preload="auto" />
    </div>
  );
};
