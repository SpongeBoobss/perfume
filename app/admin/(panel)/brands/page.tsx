import { requireAdmin } from "@/lib/admin";
import type { Brand } from "@/lib/types";
import { addBrand, deleteBrand, updateBrand } from "../../actions";
import { ConfirmButton, SubmitButton } from "../ConfirmButton";

export default async function BrandsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("brands").select("id,name,sort").order("sort").order("name");
  const brands = (data ?? []) as Brand[];

  return (
    <>
      <h1 className="font-serif text-4xl text-ink">Брэндүүд</h1>
      <p className="mt-1 text-[0.9rem] text-stone">Сайтын брэндийн жагсаалт. Дараалал бага тоотой нь эхэнд гарна.</p>

      <form action={addBrand} className="admin-card mt-8 flex flex-wrap items-end gap-3">
        <label className="min-w-[12rem] flex-1">
          <span className="admin-label">Шинэ брэнд</span>
          <input name="name" required className="admin-input" placeholder="Brand name" />
        </label>
        <label className="w-28">
          <span className="admin-label">Дараалал</span>
          <input name="sort" type="number" defaultValue={brands.length + 1} className="admin-input" />
        </label>
        <SubmitButton>Нэмэх</SubmitButton>
      </form>

      <ul className="mt-6 grid gap-2">
        {brands.map((b) => (
          <li key={b.id} className="admin-card flex flex-wrap items-center gap-3 !p-3 sm:!px-4">
            <form action={updateBrand} className="flex flex-1 flex-wrap items-center gap-3">
              <input type="hidden" name="id" value={b.id} />
              <input name="sort" type="number" defaultValue={b.sort} aria-label="Дараалал" className="admin-input !w-20" />
              <input name="name" defaultValue={b.name} aria-label="Брэндийн нэр" className="admin-input min-w-[10rem] flex-1" />
              <button className="admin-btn-ghost">Хадгалах</button>
            </form>
            <form action={deleteBrand}>
              <input type="hidden" name="id" value={b.id} />
              <ConfirmButton message={`"${b.name}" брэндийг устгах уу?`}>Устгах</ConfirmButton>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
