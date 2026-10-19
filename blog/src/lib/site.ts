// Blog-level constants. The main marketing site lives on the apex domain; this blog is its subdomain.
export const MAIN_URL = "https://asauvia.com";

export const site = {
  brandName: "Asauvia",
  blogName: "Asauvia Blog",
  domain: "blog.asauvia.com",
  mainUrl: MAIN_URL,
  contactUrl: `${MAIN_URL}/contact`,
  email: "info@asauvia.com",
  linkedIn: "https://www.linkedin.com/company/asauvia/",
  description:
    "Notes from the Asauvia team on AI automation, custom software and working with growing companies.",
} as const;

export const SITE_URL = `https://${site.domain}`;

// Browser tab title for the blog home. Post pages use "<post title> | Asauvia Blog".
export const homeTitle = "Asauvia Blog | AI Automation & Custom Software";

// Mirrors the main site's primary navigation (src/data/navigation.ts in the root app), so both sites read as one.
export const mainNav = [
  { label: "Services", href: `${MAIN_URL}/services` },
  { label: "How we work", href: `${MAIN_URL}/how-we-work` },
  { label: "Security", href: `${MAIN_URL}/security` },
  { label: "About", href: `${MAIN_URL}/about` },
  { label: "FAQ", href: `${MAIN_URL}/faq` },
] as const;

// Mirrors the main site's footer columns.
export const companyLinks = [
  { label: "About", href: `${MAIN_URL}/about` },
  { label: "How we work", href: `${MAIN_URL}/how-we-work` },
  { label: "Security", href: `${MAIN_URL}/security` },
  { label: "Contact", href: `${MAIN_URL}/contact` },
] as const;

export const legalLinks = [
  { label: "Privacy", href: `${MAIN_URL}/privacy` },
  { label: "Terms", href: `${MAIN_URL}/terms` },
  { label: "Cookies", href: `${MAIN_URL}/cookies` },
] as const;
