import { NextResponse } from "next/server";

// Sponsorship feature is currently disabled.
// @vercel/blob is not available on Cloudflare Workers.
export async function POST() {
  return NextResponse.json(
    { error: "Sponsorship is not available at this time." },
    { status: 503 }
  );
}
