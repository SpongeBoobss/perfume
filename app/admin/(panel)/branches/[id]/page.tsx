import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { PROVINCES, type Branch } from "@/lib/types";
import { saveBranch } from "../../../actions";
import { SubmitButton } from "../../ConfirmButton";
import { MapPicker } from "./MapPicker";

export default async function BranchEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const isNew = id === "new";

  const { data: all } = await supabase.from("branches").select("*");
  const branches = (all ?? []) as Branch[];
  const b = isNew ? null : (branches.find((x) => x.id === id) ?? null);
  if (!isNew && !b) notFound();

  // Other branches are drawn faintly on the picker for reference.
  const others = branches.filter((x) => x.id !== id && x.map_x !== null);

  return (
    <>
      <Link href="/admin/branches" className="text-[0.85rem] text-stone hover:text-ink">
        ← Салбарууд
      </Link>
      <h1 className="mt-2 font-serif text-4xl text-ink">{isNew ? "Шинэ салбар" : b!.name}</h1>

      <form action={saveBranch} className="mt-8 grid gap-6 lg:grid-cols-2">
        {b && <input type="hidden" name="id" value={b.id} />}
        <input type="hidden" name="image_url" value={b?.image_url ?? ""} />

        <div className="admin-card grid content-start gap-5">
          <Field label="Нэр *">
            <input name="name" required defaultValue={b?.name} className="admin-input" placeholder="Сайншанд" />
          </Field>
          <Field label="Аймаг / хот *">
            <select name="province" required defaultValue={b?.province ?? ""} className="admin-input">
              <option value="" disabled>
                Сонгох…
              </option>
              {PROVINCES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Хаяг">
            <input name="address" defaultValue={b?.address} className="admin-input" placeholder="Сум, баг, байршил" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Утас">
              <input name="phone" defaultValue={b?.phone} className="admin-input" placeholder="9999 9999" />
            </Field>
            <Field label="Цагийн хуваарь">
              <input name="hours" defaultValue={b?.hours} className="admin-input" placeholder="10:00–20:00" />
            </Field>
          </div>
          <Field label="Зураг (5MB хүртэл)">
            {b?.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={b.image_url} alt="" className="mb-3 h-32 w-full rounded-xl object-cover" />
            )}
            <input name="image" type="file" accept="image/*" className="admin-input file:mr-3 file:rounded-full file:border-0 file:bg-cream file:px-3 file:py-1" />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Дараалал">
              <input name="sort" type="number" defaultValue={b?.sort ?? 0} className="admin-input" />
            </Field>
            <label className="flex items-center gap-3 pt-6 text-[0.9rem] text-ink">
              <input name="published" type="checkbox" defaultChecked={b?.published ?? true} className="h-4 w-4 accent-ink" />
              Сайт дээр харуулах
            </label>
          </div>
        </div>

        <div className="admin-card content-start">
          <p className="admin-label">Газрын зураг дээрх байршил</p>
          <p className="mb-4 text-[0.82rem] text-stone">Газрын зураг дээр дарж цэгээ тавина уу.</p>
          <MapPicker x={b?.map_x ?? null} y={b?.map_y ?? null} others={others} />
        </div>

        <div className="flex gap-3 lg:col-span-2">
          <SubmitButton>{isNew ? "Нэмэх" : "Хадгалах"}</SubmitButton>
          <Link href="/admin/branches" className="admin-btn-ghost">
            Болих
          </Link>
        </div>
      </form>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {children}
    </label>
  );
}
