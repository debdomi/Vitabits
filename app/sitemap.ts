import type { MetadataRoute } from "next";

const BASE = "https://vitabits.hu";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, priority: 1 },
    { url: `${BASE}/adatvedelem`, lastModified: now, priority: 0.3 },
    { url: `${BASE}/aszf`, lastModified: now, priority: 0.3 },
    { url: `${BASE}/impresszum`, lastModified: now, priority: 0.3 },
    { url: `${BASE}/kapcsolat`, lastModified: now, priority: 0.3 },
  ];
}
