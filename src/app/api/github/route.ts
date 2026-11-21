import { NextResponse } from "next/server";

import { githubConfig } from "@/config/github";
import { type Contribution, generateRandomizedContributions } from "@/lib/github";

export async function GET() {
  try {
    let existingContributions: Contribution[] = [];

    try {
      const response = await fetch(
        `https://github-contributions.vercel.app/api/v1/${githubConfig.username}`,
        {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(4000),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.contributions)) {
          existingContributions = data.contributions
            .filter((item: any) => typeof item?.date === "string" && Number(item?.count) > 0)
            .map((item: any) => ({
              date: item.date,
              count: Number(item.count),
              level: Number(item.level ?? item.intensity ?? 1),
            }));
        }
      }
    } catch {
      // External proxy failure is ignored, local generation handles it gracefully
    }

    const contributions = generateRandomizedContributions(existingContributions);
    const total = contributions.reduce((sum, item) => sum + item.count, 0);

    return NextResponse.json({
      total,
      contributions,
    });
  } catch (error) {
    console.error("GitHub contributions API error:", error);

    const fallback = generateRandomizedContributions();
    return NextResponse.json({
      total: fallback.reduce((sum, item) => sum + item.count, 0),
      contributions: fallback,
    });
  }
}
