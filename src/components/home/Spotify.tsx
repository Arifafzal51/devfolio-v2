"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Shuffle } from "lucide-react";

import { curatedPlaylist } from "@/config/playlist";
import type { SpotifyTrack } from "@/lib/spotify";

type ExtendedSpotifyTrack = SpotifyTrack & {
  isCurated?: boolean;
};

type SpotifyProps = {
  track: SpotifyTrack | null;
};

const Spotify = ({ track }: SpotifyProps) => {
  const [song, setSong] = useState<ExtendedSpotifyTrack | null>(track);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Spotify data");
        }

        const data: ExtendedSpotifyTrack = await response.json();

        if (isMounted && data?.title) {
          setSong(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Spotify fetch error:", error);
          const fallback = curatedPlaylist[0];
          setSong({
            isPlaying: true,
            title: fallback.title,
            artist: fallback.artist,
            album: fallback.album ?? null,
            albumImageUrl: null,
            spotifyUrl: fallback.spotifyUrl,
            isCurated: true,
          });
        }
      }
    };

    void fetchNowPlaying();

    // Refresh every 45 seconds
    const interval = setInterval(() => {
      void fetchNowPlaying();
    }, 45_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleNextTrack = () => {
    const nextIndex = (playlistIndex + 1) % curatedPlaylist.length;
    setPlaylistIndex(nextIndex);
    const nextSong = curatedPlaylist[nextIndex];
    setSong({
      isPlaying: true,
      title: nextSong.title,
      artist: nextSong.artist,
      album: nextSong.album ?? null,
      albumImageUrl: null,
      spotifyUrl: nextSong.spotifyUrl,
      isCurated: true,
    });
  };

  return (
    <div className="flex min-h-11 min-w-0 items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {song?.isPlaying && song.albumImageUrl ? (
          <Image
            src={song.albumImageUrl}
            width={44}
            height={44}
            alt={song.album ?? "Album artwork"}
            className="size-11 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <Image
            src="/assets/spotify.svg"
            width={44}
            height={44}
            alt="Spotify"
            className="size-11 shrink-0"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {song?.isPlaying && (
              <span className="flex h-2.5 items-end gap-0.5">
                <span className="h-2 w-0.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="h-3 w-0.5 animate-pulse rounded-full bg-emerald-500 delay-100" />
                <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-emerald-500 delay-200" />
              </span>
            )}
            <p className="truncate text-xs text-neutral-500">
              {!song
                ? "Offline"
                : song.isCurated
                  ? "On Repeat"
                  : song.isPlaying
                    ? "Listening on Spotify"
                    : "Last played"}
            </p>
          </div>

          {song?.title ? (
            song.spotifyUrl ? (
              <a
                href={song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit max-w-full truncate text-sm font-medium hover:underline hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {song.title}
              </a>
            ) : (
              <p className="truncate text-sm font-medium">{song.title}</p>
            )
          ) : (
            <p className="truncate text-sm font-medium">Save Your Tears</p>
          )}

          <p className="truncate text-xs text-neutral-500">
            {song?.artist ?? "The Weeknd"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleNextTrack}
        title="Shuffle to another favorite song"
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      >
        <Shuffle className="size-4" />
      </button>
    </div>
  );
};

export { Spotify };
