import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/solutions",
    ...en.systems.map((s) => `/solutions/${s.slug}`),
    "/projects",
    ...en.projects.map((p) => `/projects/${p.slug}`),
    "/care-plans",
    "/professionals",
    "/planner",
    "/contact",
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${SITE_URL}/en${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
    },
  }));
}
