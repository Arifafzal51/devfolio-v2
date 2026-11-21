import { connection, NextResponse } from "next/server";

import { curatedPlaylist } from "@/config/playlist";
import { getSpotifyTrack } from "@/lib/spotify";

export async function GET() {
  await connection();

  try {
    const track = await getSpotifyTrack();
    if (track && track.title) {
      return NextResponse.json(track, {
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }
  } catch {
    // Spotify live query failed or env vars not configured; gracefully fall back to curated playlist
  }

  // Deterministic rotation based on time of day (rotates every few minutes)
  const now = new Date();
  const trackIndex =
    Math.floor((now.getUTCHours() * 60 + now.getUTCMinutes()) / 5) %
    curatedPlaylist.length;
  const picked = curatedPlaylist[trackIndex] ?? curatedPlaylist[0];

  return NextResponse.json(
    {
      isPlaying: true,
      title: picked.title,
      artist: picked.artist,
      album: picked.album ?? null,
      albumImageUrl: null,
      spotifyUrl: picked.spotifyUrl,
      isCurated: true,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
      status: 200,
    }
  );
}
