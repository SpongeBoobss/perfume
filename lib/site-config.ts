/**
 * Brand settings — edit this file to update the site.
 *
 * Fallback content used until Supabase is configured. Once it is, contact details,
 * brands and branches are edited in /admin instead.
 */
type Contact = { facebook: string; instagram: string; phone: string; email: string };

export const siteConfig = {
  name: "Original Perfume",
  wordmark: { primary: "ORIGINAL", secondary: "PERFUME" },
  tagline: "USA Import · 100% Original",
  /** Closing brand line used in the footer and mobile menu. */
  slogan: "Таны үнэртэн. Таны сонголт. Бидний үйлчилгээ.",

  /** Replace with the real domain before deploying (used for SEO, sitemap, Open Graph). */
  url: "https://example.com",

  description:
    "Original Perfume — дэлхийн алдартай брэндүүдийн 100% оригинал үнэртнийг АНУ-аас импортлон, бэлэн болон захиалгаар Монголын хэрэглэгчдэд хүргэнэ. Орон нутгийн дэлгүүрүүдэд бөөний нийлүүлэлт хийдэг.",

  contact: {
    /** e.g. "https://www.facebook.com/originalperfume" */
    facebook: "",
    /** e.g. "https://www.instagram.com/originalperfume" */
    instagram: "",
    /** e.g. "+976 9999 9999" */
    phone: "",
    /** e.g. "info@originalperfume.mn" */
    email: "",
  } as Contact,


  /**
   * Fragrance houses imported from the USA. Availability of each is checked per order.
   */
  brands: [
    "Chanel",
    "Dior",
    "Yves Saint Laurent",
    "Giorgio Armani",
    "Versace",
    "Paco Rabanne",
    "Montblanc",
    "Hugo Boss",
    "Carolina Herrera",
    "Calvin Klein",
    "Burberry",
    "Dolce & Gabbana",
    "Gucci",
    "Prada",
    "Jean Paul Gaultier",
    "Viktor & Rolf",
    "Lancôme",
    "Maison Margiela",
    "Tom Ford",
    "Creed",
  ] as string[],

} as const;

export const navItems = [
  { id: "home", label: "Нүүр" },
  { id: "about", label: "Бидний тухай" },
  { id: "services", label: "Үйлчилгээ" },
  { id: "brands", label: "Брэндүүд" },
  { id: "preorder", label: "Захиалга" },
  { id: "locations", label: "Салбарууд" },
  { id: "partnership", label: "Хамтрал" },
  { id: "contact", label: "Холбоо барих" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];
