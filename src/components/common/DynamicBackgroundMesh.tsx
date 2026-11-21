"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { COLOR_COMBOS, type ColorCombo } from "@/config/colorCombos";

export function DynamicBackgroundMesh() {
  const [combo, setCombo] = useState<ColorCombo>(COLOR_COMBOS[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPill, setShowPill] = useState(false);

  const applyCombo = (selected: ColorCombo, index: number) => {
    setCombo(selected);
    setCurrentIndex(index);
    const root = document.documentElement;
    root.style.setProperty("--c1", selected.c1);
    root.style.setProperty("--c2", selected.c2);
    root.style.setProperty("--c3", selected.c3);
    root.style.setProperty("--c1-rgb", selected.c1Rgb);
    root.style.setProperty("--c2-rgb", selected.c2Rgb);
    root.style.setProperty("--c3-rgb", selected.c3Rgb);
  };

  useEffect(() => {
    try {
      const last = sessionStorage.getItem("active_combo_idx");
      const lastIndex = last !== null ? Number(last) : -1;

      // Pick a new random combo on every refresh
      let nextIndex = Math.floor(Math.random() * COLOR_COMBOS.length);
      if (nextIndex === lastIndex && COLOR_COMBOS.length > 1) {
        nextIndex = (nextIndex + 1) % COLOR_COMBOS.length;
      }

      sessionStorage.setItem("active_combo_idx", String(nextIndex));
      applyCombo(COLOR_COMBOS[nextIndex], nextIndex);
    } catch {
      applyCombo(COLOR_COMBOS[0], 0);
    }
  }, []);

  const handleNextCombo = () => {
    const next = (currentIndex + 1) % COLOR_COMBOS.length;
    sessionStorage.setItem("active_combo_idx", String(next));
    applyCombo(COLOR_COMBOS[next], next);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
      >
        {/* Floating Orb 1 */}
        <div
          className="animate-orb-1 absolute -top-24 -left-24 size-[520px] rounded-full blur-[100px] sm:size-[700px] sm:blur-[140px] opacity-20 dark:opacity-25 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(var(--c1-rgb), 0.65) 0%, rgba(var(--c1-rgb), 0.18) 45%, transparent 70%)`,
          }}
        />

        {/* Floating Orb 2 */}
        <div
          className="animate-orb-2 absolute top-[28%] -right-28 size-[560px] rounded-full blur-[110px] sm:size-[740px] sm:blur-[150px] opacity-18 dark:opacity-22 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(var(--c2-rgb), 0.6) 0%, rgba(var(--c2-rgb), 0.18) 45%, transparent 70%)`,
          }}
        />

        {/* Floating Orb 3 */}
        <div
          className="animate-orb-3 absolute -bottom-28 left-[15%] size-[540px] rounded-full blur-[105px] sm:size-[720px] sm:blur-[145px] opacity-20 dark:opacity-24 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(var(--c3-rgb), 0.65) 0%, rgba(var(--c3-rgb), 0.18) 45%, transparent 70%)`,
          }}
        />

        {/* Subtle vignette for contrast & readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.03)_100%)] dark:bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* Floating Theme Palette Pill (Discreet, interactive indicator) */}
      <aside aria-label="Theme palette" className="fixed bottom-4 right-4 z-30">
        <button
          type="button"
          onClick={handleNextCombo}
          title={`Active theme: ${combo.name}. Click to cycle palette.`}
          className="group flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-medium text-neutral-600 shadow-xs backdrop-blur-md transition-all hover:scale-105 hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-800/80 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
        >
          <span className="flex items-center -space-x-1">
            <span
              className="size-2.5 rounded-full ring-1 ring-white dark:ring-neutral-900 transition-colors duration-500"
              style={{ backgroundColor: combo.c1 }}
            />
            <span
              className="size-2.5 rounded-full ring-1 ring-white dark:ring-neutral-900 transition-colors duration-500"
              style={{ backgroundColor: combo.c2 }}
            />
            <span
              className="size-2.5 rounded-full ring-1 ring-white dark:ring-neutral-900 transition-colors duration-500"
              style={{ backgroundColor: combo.c3 }}
            />
          </span>
          <span className="hidden sm:inline transition-opacity duration-300 group-hover:opacity-100">
            {combo.name}
          </span>
          <Sparkles className="size-3 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors" />
        </button>
      </aside>
    </>
  );
}
