import { MetadataRoute } from "next";
import { getTotalChunks, BASE_URL } from "@/lib/sitemap-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const totalChunks = await getTotalChunks();

  return Array.from({ length: totalChunks }, (_, i) => ({
    url: `${BASE_URL}/sitemaps/${i}`,
    lastModified: new Date(),
  }));
}
