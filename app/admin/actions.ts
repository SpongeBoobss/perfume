"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { createSessionClient } from "@/lib/supabase/server";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";

// Vercel rejects request bodies over 4.5MB, so uploads stay safely under it.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

function text(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function intOrNull(form: FormData, key: string) {
  const v = text(form, key);
  if (v === "") return null;
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? n : null;
}

/** Uploads an image from the form (if one was chosen) and returns its public URL, else the fallback. */
async function uploadImage(form: FormData, key: string, folder: string, fallback: string) {
  const file = form.get(key);
  if (!(file instanceof File) || file.size === 0) return fallback;
  if (!file.type.startsWith("image/")) throw new Error("Зөвхөн зураг оруулна уу.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Зураг 4MB-аас бага байх ёстой.");

  const { supabase } = await requireAdmin();
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(path, file, { contentType: file.type });
  if (error) throw new Error(`Зураг хадгалж чадсангүй: ${error.message}`);
  return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
}

function refreshSite() {
  revalidatePath("/");
}

// ───────────── Session ─────────────

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ───────────── Branches ─────────────

export async function saveBranch(form: FormData) {
  const { supabase } = await requireAdmin();
  const id = text(form, "id");
  const name = text(form, "name");
  const province = text(form, "province");
  if (!name || !province) throw new Error("Нэр болон аймгийг бөглөнө үү.");

  const row = {
    name,
    province,
    address: text(form, "address"),
    phone: text(form, "phone"),
    hours: text(form, "hours"),
    map_x: intOrNull(form, "map_x"),
    map_y: intOrNull(form, "map_y"),
    sort: intOrNull(form, "sort") ?? 0,
    published: form.get("published") === "on",
    image_url: await uploadImage(form, "image", "branches", text(form, "image_url")),
  };

  const { error } = id
    ? await supabase.from("branches").update(row).eq("id", id)
    : await supabase.from("branches").insert(row);
  if (error) throw new Error(error.message);

  refreshSite();
  revalidatePath("/admin/branches");
  redirect("/admin/branches?saved=1");
}

export async function deleteBranch(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("branches").delete().eq("id", text(form, "id"));
  if (error) throw new Error(error.message);
  refreshSite();
  revalidatePath("/admin/branches");
}

// ───────────── Brands ─────────────

export async function addBrand(form: FormData) {
  const { supabase } = await requireAdmin();
  const name = text(form, "name");
  if (!name) return;
  const { error } = await supabase.from("brands").insert({ name, sort: intOrNull(form, "sort") ?? 999 });
  if (error) throw new Error(error.code === "23505" ? "Энэ брэнд аль хэдийн бүртгэлтэй байна." : error.message);
  refreshSite();
  revalidatePath("/admin/brands");
}

export async function updateBrand(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("brands")
    .update({ name: text(form, "name"), sort: intOrNull(form, "sort") ?? 0 })
    .eq("id", text(form, "id"));
  if (error) throw new Error(error.message);
  refreshSite();
  revalidatePath("/admin/brands");
}

export async function deleteBrand(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("brands").delete().eq("id", text(form, "id"));
  if (error) throw new Error(error.message);
  refreshSite();
  revalidatePath("/admin/brands");
}

// ───────────── Settings ─────────────

export async function saveSettings(form: FormData) {
  const { supabase } = await requireAdmin();
  const row = {
    hero_title: text(form, "hero_title"),
    hero_accent: text(form, "hero_accent"),
    hero_title_end: text(form, "hero_title_end"),
    hero_subtitle: text(form, "hero_subtitle"),
    hero_image: await uploadImage(form, "hero_image_file", "hero", text(form, "hero_image")),
    phone: text(form, "phone"),
    email: text(form, "email"),
    facebook: text(form, "facebook"),
    instagram: text(form, "instagram"),
    address: text(form, "address"),
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("settings").update(row).eq("id", 1);
  if (error) throw new Error(error.message);
  refreshSite();
  redirect("/admin/settings?saved=1");
}

// ───────────── Orders ─────────────

export async function setOrderStatus(form: FormData) {
  const { supabase } = await requireAdmin();
  const status = text(form, "status") as OrderStatus;
  if (!ORDER_STATUSES.includes(status)) return;
  const { error } = await supabase.from("orders").update({ status }).eq("id", text(form, "id"));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function deleteOrder(form: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("orders").delete().eq("id", text(form, "id"));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
