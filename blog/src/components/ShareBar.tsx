import { CopyLinkButton } from "./CopyLinkButton";

/**
 * Share links are plain URLs. No tracking script, no third-party embed, so the page stays fast
 * and nothing is sent anywhere until a reader clicks.
 */
export function ShareBar({ url, title, hashtags }: { url: string; title: string; hashtags: string[] }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const tags = hashtags.map((tag) => tag.replace(/^#/, "")).join(",");

  const links = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "Share on X", href: `https://twitter.com/intent/post?text=${encodedTitle}&url=${encodedUrl}&hashtags=${tags}` },
    { label: "Email this post", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-sm text-muted-foreground">Share this post</p>
      <ul className="flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="inline-flex h-10 items-center rounded-full border border-foreground/20 px-5 text-sm text-foreground transition-colors hover:bg-foreground/5"
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <CopyLinkButton url={url} />
        </li>
      </ul>
    </div>
  );
}
