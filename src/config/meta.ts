import { heroConfig as item } from "./hero";

const siteUrl = (process.env.SITE_URL || "https://arifafzal.dev").replace(
  /\/+$/,
  ""
);

export const siteConfig = {
  name: item.name,
  title: "Arif Afzal",
  desc: "Software Developer, Technical Educator, and Founder.",
  url: siteUrl,
  ogImage: "/meta/og-img.webp",

  author: {
    name: item.name,
    twitter: "",
    github: "Arifafzal51",
    linkedin: "hyarif",
    email: "arifafzal51@gmail.com",
  },

  keywords: [
    "portfolio",
    "developer",
    "software developer",
    "technical educator",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Java",
    "DSA",
    "AWS Serverless",
    "web development",
    item.name.toLowerCase(),
  ],
};

type PageMeta = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonical?: string;
};

export const pageMetaData: Record<string, PageMeta> = {
  "/": {
    title: `${item.name} - Software Developer & Educator`,
    description:
      "Software developer and computer science educator passionate about building useful digital products, solving complex problems, and helping others understand technology.",
    ogImage: "/meta/og-img.webp",
  },

  "/blog": {
    title: "Blog - Development & Tutorials",
    description:
      "Articles and tutorials on programming, engineering, and web development.",
    ogImage: "/meta/blog.webp",
  },

  "/books": {
    title: "Books - Reading & Recommendations",
    description: "Books I've read and recommendations worth exploring.",
    ogImage: "/meta/books.webp",
  },

  "/designs": {
    title: "Designs - Creative Work",
    description: "Explore my visual experiments, UI concepts, and design work.",
    ogImage: "/meta/designs.webp",
  },

  "/gears": {
    title: "Gears - My Setup & Tools",
    description:
      "Explore the tools, devices, and software I use to build products.",
    ogImage: "/meta/gears.webp",
  },

  "/movies": {
    title: "Movies - Watchlist & Reviews",
    description: "Movies I've watched, saved, and recommend.",
    ogImage: "/meta/movies.webp",
  },

  "/projects": {
    title: "Projects - My Work & Case Studies",
    description: "Explore my projects, applications, and software products.",
    ogImage: "/meta/project.webp",
  },

  "/resume": {
    title: "Resume - Experience & Skills",
    description:
      "Explore my development experience, technical skills, and projects.",
    ogImage: "/meta/resume.webp",
  },

  "/setup": {
    title: "Setup - My Workspace",
    description: "A look at my workspace, development environment, and setup.",
    ogImage: "/meta/setup.webp",
  },

  "/work": {
    title: "Work - Experience & Collaborations",
    description:
      "Explore my professional experience, collaborations, and work.",
    ogImage: "/meta/work.webp",
  },

  "/contact": {
    title: "Contact - Get in Touch",
    description:
      "Get in touch for freelance projects, collaborations, and opportunities.",
    ogImage: "/meta/contact.webp",
  },
};

export function getPageMetaData(pathName: string): PageMeta {
  return pageMetaData[pathName] ?? pageMetaData["/"];
}

export function generateMetaData(pathName: string) {
  const pageMeta = getPageMetaData(pathName);

  const canonicalPath = pathName.startsWith("/") ? pathName : `/${pathName}`;

  const canonicalUrl = pageMeta.canonical ?? `${siteUrl}${canonicalPath}`;

  const ogImage = pageMeta.ogImage || siteConfig.ogImage;

  return {
    metadataBase: new URL(siteUrl),

    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords ?? siteConfig.keywords,

    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,

    openGraph: {
      type: "website" as const,
      url: canonicalUrl,
      title: pageMeta.title,
      description: pageMeta.description,
      siteName: siteConfig.title,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageMeta.title,
        },
      ],
    },

    twitter: {
      card: pageMeta.twitterCard ?? "summary_large_image",
      title: pageMeta.title,
      description: pageMeta.description,
      creator: siteConfig.author.twitter,
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },
  };
}
