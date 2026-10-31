import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import type { Branch } from "@/lib/types";
import { deleteBranch } from "../../actions";
import { ConfirmButton } from "../ConfirmButton";

export default async function BranchesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved } = await searchParams;
  const { data } = await supabase.from("branches").select("*").order("sort").order("name");
  const branches = (data ?? []) as Branch[];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink">Салбарууд</h1>
          <p className="mt-1 text-[0.9rem] text-stone">Орон нутгийн дэлгүүрүүд — сайтын газрын зураг дээр харагдана.</p>
        </div>
        <Link href="/admin/branches/new" className="admin-btn">
          + Салбар нэмэх
        </Link>
      </div>

      {saved && <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Хадгаллаа.</p>}

      <ul className="mt-8 grid gap-3">
        {branches.map((b) => (
          <li key={b.id} className="admin-card flex flex-wrap items-center gap-4 !p-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream">
              {b.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.image_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">
                {b.name}
                {!b.published && (
                  <span className="ml-2 rounded-full bg-cream px-2 py-0.5 text-[0.7rem] text-stone">Нуусан</span>
                )}
              </p>
              <p className="truncate text-[0.85rem] text-stone">
                {[b.province, b.address, b.phone].filter(Boolean).join(" · ")}
                {b.map_x === null && " · газрын зураг дээр байршилгүй"}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/branches/${b.id}`} className="admin-btn-ghost">
                Засах
              </Link>
              <form action={deleteBranch}>
                <input type="hidden" name="id" value={b.id} />
                <ConfirmButton message={`"${b.name}" салбарыг устгах уу?`}>Устгах</ConfirmButton>
              </form>
            </div>
          </li>
        ))}
        {!branches.length && <li className="admin-card text-stone">Салбар бүртгэгдээгүй байна.</li>}
      </ul>
    </>
  );
}
