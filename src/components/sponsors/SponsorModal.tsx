"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { ImagePlus, Loader2, X } from "lucide-react";

const MAX_BYTES = 2 * 1024 * 1024;
const TYPES = ["image/png", "image/jpeg", "image/webp"];

export function SponsorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Free the preview URL when it changes or the modal unmounts.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    if (!TYPES.includes(selected.type)) {
      setError("Use a PNG, JPG or WebP image");
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError("Image must be under 2 MB");
      return;
    }

    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!file) {
      setError("Please add an image");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const body = new FormData();
      body.append("name", name.trim());
      body.append("image", file);

      const response = await fetch("/api/sponsor/checkout", {
        method: "POST",
        body,
      });
      const json: { url?: string; error?: string } = await response.json();

      if (!response.ok || !json.url) {
        throw new Error(json.error ?? "Unable to start checkout");
      }

      window.location.assign(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose(); // backdrop click
      }}
      className="border-border bg-background text-foreground m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Become a sponsor
            </h3>
            <p className="text-muted-foreground text-xs">
              $11.11 / month 
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground cursor-pointer transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Image */}
        <div className="flex items-center gap-4">
          <label className="border-border bg-muted/40 hover:bg-muted relative flex size-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed transition">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={80}
                height={80}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              <ImagePlus className="text-muted-foreground size-6" />
            )}
            <input
              type="file"
              accept={TYPES.join(",")}
              onChange={handleFile}
              className="sr-only"
            />
          </label>

          <p className="text-muted-foreground text-xs leading-relaxed">
            Add your logo or photo. Square works best. PNG, JPG or WebP, max 2
            MB.
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="sponsor-name" className="text-xs font-medium">
            Name
          </label>
          <input
            id="sponsor-name"
            type="text"
            required
            minLength={2}
            maxLength={40}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name or company"
            className="border-border bg-background/60 focus-visible:ring-foreground/10 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2"
          />
        </div>

        {error && <p className="text-xs text-rose-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Redirecting..." : "Continue to payment"}
        </button>

        <p className="text-muted-foreground text-center text-[11px]">
          Your name and image are shown publicly while your subscription is
          active.
        </p>
      </form>
    </dialog>
  );
}
