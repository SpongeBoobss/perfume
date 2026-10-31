import type { Settings } from "./types";

type Contact = Pick<Settings, "phone" | "email" | "facebook" | "instagram">;

/** Working links for each contact channel, or null while the value is empty. */
export function contactLinks(c: Contact) {
  return {
    facebook: c.facebook || null,
    instagram: c.instagram || null,
    phone: c.phone ? `tel:${c.phone.replace(/[^\d+]/g, "")}` : null,
    email: c.email ? `mailto:${c.email}` : null,
  };
}

/** Where the partnership CTA points: email if configured, otherwise the contact section. */
export function partnershipHref(c: Contact) {
  return c.email ? `mailto:${c.email}?subject=${encodeURIComponent("Хамтран ажиллах санал")}` : "#contact";
}
