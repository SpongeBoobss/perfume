import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { signOut } from "../actions";
import { AdminNav } from "./AdminNav";

// Every admin page depends on the signed-in user, never on a build-time snapshot.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Админ",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { email } = await requireAdmin();

  return (
    <div className="min-h-[100svh] bg-cream lg:flex">
      <aside className="border-b border-line bg-paper lg:sticky lg:top-0 lg:h-[100svh] lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-6 lg:py-8">
          <a href="/admin" className="block leading-none">
            <span className="font-serif text-xl tracking-[0.28em] text-ink">ORIGINAL</span>
            <span className="mt-1 block text-[0.55rem] tracking-[0.5em] text-gold-deep">ADMIN</span>
          </a>
          <a href="/" target="_blank" className="text-[0.8rem] text-stone hover:text-ink lg:mt-6 lg:inline-block">
            Сайт харах ↗
          </a>
        </div>
        <AdminNav />
        <div className="hidden px-6 lg:absolute lg:bottom-6 lg:block">
          <p className="truncate text-[0.75rem] text-stone" title={email}>
            {email}
          </p>
          <form action={signOut}>
            <button className="mt-2 text-[0.8rem] text-ink underline-offset-4 hover:underline">Гарах</button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-5xl">{children}</div>
        <form action={signOut} className="mt-12 text-center lg:hidden">
          <p className="text-[0.75rem] text-stone">{email}</p>
          <button className="mt-1 text-[0.8rem] text-ink underline">Гарах</button>
        </form>
      </main>
    </div>
  );
}
