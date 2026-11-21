export default function sitemap() {
  const baseUrl = process.env.SITE_URL || "https://arifafzal.dev";

  const routes = [
    "",
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
