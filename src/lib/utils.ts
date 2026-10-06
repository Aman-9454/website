import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Subject pre-filled when someone clicks the email address on the site, so those emails are recognisable in the inbox. */
export const WEBSITE_EMAIL_SUBJECT = "Enquiry from asauvia.com";

export function websiteMailto(email: string) {
  return `mailto:${email}?subject=${encodeURIComponent(WEBSITE_EMAIL_SUBJECT)}`;
}
