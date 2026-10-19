import type { Block, Post } from "./posts";
import { lastModified } from "./posts";
import { site, SITE_URL } from "./site";
import { isServiceSlug, serviceHref, serviceName } from "./services";

function blockToMarkdown(block: Block): string {
  switch (block.type) {
    case "h2":
      return `## ${block.text}`;
    case "quote":
      return `> ${block.text}`;
    case "ul":
      return block.items.map((item) => `- ${item}`).join("\n");
    case "figure": {
      const { figure } = block;
      const rows =
        figure.kind === "bars"
          ? figure.items.map((item) => `- ${item.label}: ${item.display}`)
          : figure.kind === "steps"
            ? figure.steps.map((step, index) => `${index + 1}. ${step}`)
            : figure.points.map((point) => `- ${point.label}: ${Number(point.at.toFixed(2))} h (window ${figure.hours} h)`);
      return [`**${figure.title}**`, "", ...rows, "", figure.caption, "", `_${figure.note}_`].join("\n");
    }
    case "p":
      return block.text;
  }
}

/** One post as clean markdown: answer first, then takeaways, body and FAQs. Used by /<slug>/md and llms-full.txt. */
export function postToMarkdown(post: Post): string {
  const lines = [
    `# ${post.title}`,
    "",
    `> ${post.summary}`,
    "",
    `- URL: ${SITE_URL}/${post.slug}`,
    `- Author: ${site.brandName} (${site.mainUrl})`,
    `- Published: ${post.date}`,
    `- Last updated: ${lastModified(post)}`,
    `- Topic: ${post.tag}`,
    `- Hashtags: ${post.hashtags.join(" ")}`,
    ...(post.relatedService && isServiceSlug(post.relatedService)
      ? [`- Related service: ${serviceName(post.relatedService)} (${serviceHref(post.relatedService)})`]
      : []),
    "",
  ];

  if (post.keyTakeaways?.length) {
    lines.push("## Key takeaways", "", ...post.keyTakeaways.map((item) => `- ${item}`), "");
  }

  for (const block of post.body) {
    lines.push(blockToMarkdown(block), "");
  }

  if (post.faqs?.length) {
    lines.push("## Frequently asked questions", "");
    for (const faq of post.faqs) {
      lines.push(`### ${faq.question}`, "", faq.answer, "");
    }
  }

  if (post.sources?.length) {
    lines.push("## Sources", "", ...post.sources.map((source) => `- [${source.label}](${source.url})`), "");
  }

  return lines.join("\n").trimEnd() + "\n";
}
