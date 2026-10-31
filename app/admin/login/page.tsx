import type { Metadata } from "next";
import { supabaseConfigured } from "@/lib/supabase/env";
import { GoogleSignIn } from "./GoogleSignIn";

export const metadata: Metadata = { title: "Админ нэвтрэх", robots: { index: false, follow: false } };

const errors: Record<string, string> = {
  not_allowed: "Энэ Gmail хаягт админ эрх олгогдоогүй байна. Эзэмшигчээс эрх авна уу.",
  auth: "Нэвтрэлт амжилтгүй боллоо. Дахин оролдоно уу.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-3xl bg-paper p-8 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] sm:p-10">
        <p className="font-serif text-2xl tracking-[0.28em] text-ink">ORIGINAL</p>
        <p className="mt-1 text-[0.6rem] tracking-[0.5em] text-gold-deep">PERFUME · ADMIN</p>
        <h1 className="mt-8 text-xl font-medium text-ink">Удирдлагын хэсэг</h1>
        <p className="mt-2 text-sm text-stone">Эрх бүхий Gmail хаягаар нэвтэрнэ үү.</p>

        {error && errors[error] && (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-left text-sm text-red-800">
            {errors[error]}
          </p>
        )}

        <div className="mt-8">
          {supabaseConfigured ? (
            <GoogleSignIn />
          ) : (
            <p className="rounded-xl bg-cream px-4 py-3 text-left text-sm text-stone">
              Supabase тохируулаагүй байна. <code>.env.local</code> файлд{" "}
              <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>-г оруулна уу (README-г
              үзнэ үү).
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
