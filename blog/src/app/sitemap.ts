import type { MetadataRoute } from "next";
import { getAllPosts, getPostsByTopic, getTopics, lastModified } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const day = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** Every page on the blog. Dates come from the posts themselves, so each lastmod is a real change date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newest = posts[0];

  return [
    {
      url: SITE_URL,
      lastModified: newest ? day(lastModified(newest)) : undefined,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: newest ? day(lastModified(newest)) : undefined,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...getTopics().map((topic) => {
      const latest = getPostsByTopic(topic.slug)[0];
      return {
        url: `${SITE_URL}/topic/${topic.slug}`,
        lastModified: latest ? day(lastModified(latest)) : undefined,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    }),
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: day(lastModified(post)),
      changeFrequency: "yearly" as const,
      priority: 0.7,
      // The post's social image, listed for image search and for AI tools that read image metadata.
      images: [`${SITE_URL}/${post.slug}/opengraph-image`],
    })),
  ];
}
