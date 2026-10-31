import "server-only";
import { provinces } from "./locations";
import { siteConfig } from "./site-config";
import { supabaseConfigured } from "./supabase/env";
import { createPublicClient } from "./supabase/server";
import type { Branch, Brand, Settings } from "./types";

export type SiteData = { settings: Settings; brands: Brand[]; branches: Branch[] };

/** Built-in content, used until Supabase is configured or if it cannot be reached. */
const fallback: SiteData = {
  settings: {
    hero_title: "Оригинал үнэртэн",
    hero_accent: "Таны",
    hero_title_end: "хүссэнээр",
    hero_subtitle:
      "Дэлхийн алдартай брэндүүдийн үнэртнийг АНУ-аас импортлон, бэлэн болон захиалгаар Монголын хэрэглэгчдэд хүргэнэ.",
    hero_image: "",
    ...siteConfig.contact,
    address: "",
  },
  brands: siteConfig.brands.map((name, i) => ({ id: name, name, sort: i })),
  branches: provinces.flatMap((p) =>
    p.locations.map((l, i) => ({
      id: l.id,
      name: l.name,
      province: p.name.replace(" аймаг", ""),
      address: "",
      phone: "",
      hours: "",
      image_url: "",
      map_x: l.map.x,
      map_y: l.map.y,
      sort: i,
      published: true,
    })),
  ),
};

export async function getSiteData(): Promise<SiteData> {
  if (!supabaseConfigured) return fallback;

  const db = createPublicClient();
  const [settings, brands, branches] = await Promise.all([
    db.from("settings").select("*").eq("id", 1).maybeSingle(),
    db.from("brands").select("id,name,sort").order("sort").order("name"),
    db.from("branches").select("*").eq("published", true).order("sort").order("name"),
  ]);

  if (settings.error || brands.error || branches.error) {
    console.error("Supabase read failed", settings.error ?? brands.error ?? branches.error);
    return fallback;
  }

  return {
    settings: (settings.data as Settings | null) ?? fallback.settings,
    brands: brands.data as Brand[],
    branches: branches.data as Branch[],
  };
}
