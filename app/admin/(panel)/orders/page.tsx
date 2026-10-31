import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { ORDER_STATUSES, ORDER_STATUS_LABEL, type Order, type OrderStatus } from "@/lib/types";
import { deleteOrder, setOrderStatus } from "../../actions";
import { ConfirmButton } from "../ConfirmButton";

const dateFmt = new Intl.DateTimeFormat("mn-MN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Ulaanbaatar" });

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { supabase } = await requireAdmin();
  const { status } = await searchParams;
  const filter = ORDER_STATUSES.includes(status as OrderStatus) ? (status as OrderStatus) : null;

  let q = supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(200);
  if (filter) q = q.eq("status", filter);
  const { data } = await q;
  const orders = (data ?? []) as Order[];

  return (
    <>
      <h1 className="font-serif text-4xl text-ink">Захиалгууд</h1>
      <p className="mt-1 text-[0.9rem] text-stone">Сайтын захиалгын формоор ирсэн хүсэлтүүд.</p>

      <nav aria-label="Төлөвөөр шүүх" className="mt-6 flex flex-wrap gap-2">
        <Chip href="/admin/orders" active={!filter}>
          Бүгд
        </Chip>
        {ORDER_STATUSES.map((s) => (
          <Chip key={s} href={`/admin/orders?status=${s}`} active={filter === s}>
            {ORDER_STATUS_LABEL[s]}
          </Chip>
        ))}
      </nav>

      <ul className="mt-6 grid gap-3">
        {orders.map((o) => (
          <li key={o.id} className="admin-card grid gap-4 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-medium text-ink">
                {o.name} ·{" "}
                <a href={`tel:${o.phone.replace(/[^\d+]/g, "")}`} className="text-gold-deep underline-offset-4 hover:underline">
                  {o.phone}
                </a>
              </p>
              <dl className="mt-2 grid gap-x-6 gap-y-1 text-[0.88rem] sm:grid-cols-3">
                <Item label="Брэнд" value={o.brand} />
                <Item label="Үнэртэн" value={o.product} />
                <Item label="Хэмжээ" value={o.size} />
              </dl>
              {o.note && <p className="mt-2 whitespace-pre-wrap text-[0.88rem] text-stone">{o.note}</p>}
              <p className="mt-2 text-[0.75rem] text-stone">{dateFmt.format(new Date(o.created_at))}</p>
            </div>
            <div className="flex items-start gap-2">
              <form action={setOrderStatus} className="flex gap-2">
                <input type="hidden" name="id" value={o.id} />
                <select name="status" defaultValue={o.status} aria-label="Төлөв" className="admin-input !w-auto !py-2">
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {ORDER_STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <button className="admin-btn-ghost">Шинэчлэх</button>
              </form>
              <form action={deleteOrder}>
                <input type="hidden" name="id" value={o.id} />
                <ConfirmButton message="Энэ захиалгыг устгах уу?">Устгах</ConfirmButton>
              </form>
            </div>
          </li>
        ))}
        {!orders.length && <li className="admin-card text-stone">Захиалга алга.</li>}
      </ul>
    </>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-1.5 text-[0.82rem] transition-colors ${
        active ? "bg-ink text-paper" : "border border-line bg-paper text-stone hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="inline text-stone">{label}: </dt>
      <dd className="inline text-ink">{value || "—"}</dd>
    </div>
  );
}
