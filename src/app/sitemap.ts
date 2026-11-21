import { getAllRegionalHirePages } from "@/config/programmatic-hire";

export default function sitemap() {
  const baseUrl = process.env.SITE_URL || "https://arifafzal.dev";

  const staticRoutes = [
    "",
    "/hire",
    "/projects",
    "/blog",
    "/work",
    "/resume",
    "/contact",
    "/gears",
    "/setup",
    "/designs",
    "/books",
    "/movies",
    "/side-quests",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/hire" ? 0.9 : 0.8,
  }));

  const hirePages = getAllRegionalHirePages().map((page) => ({
    url: `${baseUrl}/hire/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticEntries, ...hirePages];
}
