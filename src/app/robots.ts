export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${process.env.SITE_URL || "https://arifafzal.dev"}/sitemap.xml`,
  };
}
