"use server";

import { supabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/server";

export type OrderFormState = { ok: boolean; message: string } | null;

function field(form: FormData, key: string, max: number) {
  return String(form.get(key) ?? "").trim().slice(0, max);
}

/** Saves a pre-order request from the public form. */
export async function submitOrder(_prev: OrderFormState, form: FormData): Promise<OrderFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(form, "website", 100)) return { ok: true, message: "Баярлалаа! Бид удахгүй холбогдоно." };

  const order = {
    name: field(form, "name", 120),
    phone: field(form, "phone", 30),
    brand: field(form, "brand", 120),
    product: field(form, "product", 200),
    size: field(form, "size", 60),
    note: field(form, "note", 1000),
  };

  if (!order.name || order.phone.replace(/\D/g, "").length < 6) {
    return { ok: false, message: "Нэр болон утасны дугаараа зөв оруулна уу." };
  }
  if (!supabaseConfigured) {
    return { ok: false, message: "Захиалгын систем одоогоор тохируулагдаагүй байна. Утсаар холбогдоно уу." };
  }

  const { error } = await createPublicClient().from("orders").insert(order);
  if (error) {
    console.error("Order insert failed", error);
    return { ok: false, message: "Илгээж чадсангүй. Түр хүлээгээд дахин оролдоно уу." };
  }
  return { ok: true, message: "Баярлалаа! Таны захиалгыг хүлээн авлаа. Бид удахгүй холбогдоно." };
}
