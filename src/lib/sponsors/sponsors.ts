import { prisma } from "../prisma";

export type Sponsor = { id: string; name: string; imageUrl: string };

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    return await prisma.sponsor.findMany({
      where: { status: "ACTIVE", hidden: false },
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, imageUrl: true },
    });
  } catch (error) {
    console.error("Unable to load sponsors:", error);
    return [];
  }
}
