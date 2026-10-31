import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { ORDER_STATUS_LABEL, type Order } from "@/lib/types";

export default async function Dashboard() {
  const { supabase } = await requireAdmin();
  const count = (table: string, filter?: [string, string]) => {
    const q = supabase.from(table).select("*", { count: "exact", head: true });
    return filter ? q.eq(filter[0], filter[1]) : q;
  };

  const [newOrders, branches, brands, recent] = await Promise.all([
    count("orders", ["status", "new"]),
    count("branches"),
    count("brands"),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Шинэ захиалга", value: newOrders.count ?? 0, href: "/admin/orders" },
    { label: "Салбар", value: branches.count ?? 0, href: "/admin/branches" },
    { label: "Брэнд", value: brands.count ?? 0, href: "/admin/brands" },
  ];

  return (
    <>
      <h1 className="font-serif text-4xl text-ink">Хянах самбар</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="admin-card transition-shadow hover:shadow-md">
            <p className="text-[0.8rem] text-stone">{s.label}</p>
            <p className="mt-2 font-serif text-5xl text-ink">{s.value}</p>
          </Link>
        ))}
      </div>

      <section className="admin-card mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-ink">Сүүлийн захиалгууд</h2>
          <Link href="/admin/orders" className="text-[0.85rem] text-stone hover:text-ink">
            Бүгдийг харах →
          </Link>
        </div>
        {(recent.data as Order[] | null)?.length ? (
          <ul className="mt-4 divide-y divide-line">
            {(recent.data as Order[]).map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-[0.9rem]">
                <span className="text-ink">
                  {o.name} · <span className="text-stone">{[o.brand, o.product].filter(Boolean).join(" — ") || "—"}</span>
                </span>
                <span className="rounded-full bg-cream px-3 py-1 text-[0.75rem] text-stone">
                  {ORDER_STATUS_LABEL[o.status]}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-[0.9rem] text-stone">Одоогоор захиалга ирээгүй байна.</p>
        )}
      </section>
    </>
  );
}
