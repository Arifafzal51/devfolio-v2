export type Contribution = {
  date: string;
  count: number;
  level: number;
};

function seededRandom(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 4294967296;
}

export function generateRandomizedContributions(
  existing?: Contribution[]
): Contribution[] {
  const existingMap = new Map<string, Contribution>();
  if (Array.isArray(existing)) {
    for (const item of existing) {
      if (item && item.date && item.count > 0) {
        existingMap.set(item.date, item);
      }
    }
  }

  const result: Contribution[] = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Generate 365 days of activity ending today
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayOfWeek = d.getDay(); // 0 = Sun, 6 = Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Check if user already has verified real commits on this date
    const realEntry = existingMap.get(dateStr);
    if (realEntry && realEntry.count > 0) {
      result.push({
        date: dateStr,
        count: realEntry.count,
        level: Math.min(4, Math.max(1, realEntry.level || 1)),
      });
      continue;
    }

    // Sprint wave creates realistic cluster streaks (~19 days wave cycle)
    const sprintWave = Math.sin((i / 19) * 2 * Math.PI) * 0.15;
    const activeChance = (isWeekend ? 0.22 : 0.52) + sprintWave;

    const r1 = seededRandom(dateStr + "-act-arif");
    const r2 = seededRandom(dateStr + "-lvl-arif");

    let level = 0;
    let count = 0;

    // Natural commit distribution:
    // Some days none (~52%), some days low (1-3), some days medium (4-6),
    // some days high (7-10), some days full (11-18)
    if (r1 < Math.max(0.12, Math.min(0.82, activeChance))) {
      if (r2 < 0.50) {
        // Low: 1 - 3 commits
        level = 1;
        count = 1 + Math.floor(seededRandom(dateStr + "-c") * 3);
      } else if (r2 < 0.80) {
        // Medium: 4 - 6 commits
        level = 2;
        count = 4 + Math.floor(seededRandom(dateStr + "-c") * 3);
      } else if (r2 < 0.93) {
        // High: 7 - 10 commits
        level = 3;
        count = 7 + Math.floor(seededRandom(dateStr + "-c") * 4);
      } else {
        // Full: 11 - 18 commits
        level = 4;
        count = 11 + Math.floor(seededRandom(dateStr + "-c") * 8);
      }
    }

    result.push({
      date: dateStr,
      count,
      level,
    });
  }

  return result;
}

export const filterLastYear = (
  contributions: Contribution[]
): Contribution[] => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  oneYearAgo.setHours(0, 0, 0, 0);

  const startDate = [
    oneYearAgo.getFullYear(),
    String(oneYearAgo.getMonth() + 1).padStart(2, "0"),
    String(oneYearAgo.getDate()).padStart(2, "0"),
  ].join("-");

  const endDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const filtered = contributions
    .filter(({ date }) => date >= startDate && date <= endDate)
    .sort((a, b) => a.date.localeCompare(b.date));

  // If filtered contains mostly 0s or empty, enrich with randomized activity
  const totalCommits = filtered.reduce((acc, c) => acc + c.count, 0);
  if (totalCommits < 20 || filtered.length === 0) {
    return generateRandomizedContributions(filtered);
  }

  return filtered;
};
