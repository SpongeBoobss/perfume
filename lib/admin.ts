import "server-only";
import { redirect } from "next/navigation";
import { supabaseConfigured } from "./supabase/env";
import { createSessionClient } from "./supabase/server";

/**
 * Returns the signed-in admin's client and email, or redirects.
 * Row level security enforces the same rule in the database; this check only decides what to render.
 */
export async function requireAdmin() {
  // The login page explains how to configure Supabase.
  if (!supabaseConfigured) redirect("/admin/login");

  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=not_allowed");

  return { supabase, email: user.email ?? "" };
}
