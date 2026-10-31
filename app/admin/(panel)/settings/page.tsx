import { requireAdmin } from "@/lib/admin";
import type { Settings } from "@/lib/types";
import { saveSettings } from "../../actions";
import { SubmitButton } from "../ConfirmButton";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { supabase } = await requireAdmin();
  const { saved } = await searchParams;
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  const s = data as Settings;

  return (
    <>
      <h1 className="font-serif text-4xl text-ink">Тохиргоо</h1>
      <p className="mt-1 text-[0.9rem] text-stone">Нүүр хэсгийн текст, зураг болон холбоо барих мэдээлэл.</p>
      {saved && <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Хадгаллаа.</p>}

      <form action={saveSettings} className="mt-8 grid gap-6">
        <input type="hidden" name="hero_image" value={s.hero_image} />

        <section className="admin-card grid gap-5">
          <h2 className="text-lg font-medium text-ink">Нүүр хэсэг (Hero)</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Гарчгийн 1-р мөр">
              <input name="hero_title" defaultValue={s.hero_title} className="admin-input" />
            </Field>
            <Field label="Налуу онцлох үг">
              <input name="hero_accent" defaultValue={s.hero_accent} className="admin-input" />
            </Field>
            <Field label="Гарчгийн төгсгөл">
              <input name="hero_title_end" defaultValue={s.hero_title_end} className="admin-input" />
            </Field>
          </div>
          <p className="-mt-2 text-[0.8rem] text-stone">
            Харагдах байдал: {s.hero_title} / <em className="font-serif">{s.hero_accent}</em> {s.hero_title_end}
          </p>
          <Field label="Тайлбар">
            <textarea name="hero_subtitle" rows={3} defaultValue={s.hero_subtitle} className="admin-input" />
          </Field>
          <Field label="Арын зураг (4MB хүртэл, хэвтээ зураг)">
            {s.hero_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.hero_image} alt="" className="mb-3 h-40 w-full rounded-xl object-cover" />
            )}
            <input
              name="hero_image_file"
              type="file"
              accept="image/*"
              className="admin-input file:mr-3 file:rounded-full file:border-0 file:bg-cream file:px-3 file:py-1"
            />
          </Field>
        </section>

        <section className="admin-card grid gap-5 sm:grid-cols-2">
          <h2 className="text-lg font-medium text-ink sm:col-span-2">Холбоо барих</h2>
          <Field label="Утас">
            <input name="phone" defaultValue={s.phone} className="admin-input" placeholder="+976 9999 9999" />
          </Field>
          <Field label="И-мэйл">
            <input name="email" type="email" defaultValue={s.email} className="admin-input" />
          </Field>
          <Field label="Facebook холбоос">
            <input name="facebook" type="url" defaultValue={s.facebook} className="admin-input" placeholder="https://facebook.com/…" />
          </Field>
          <Field label="Instagram холбоос">
            <input name="instagram" type="url" defaultValue={s.instagram} className="admin-input" placeholder="https://instagram.com/…" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Төв хаяг">
              <input name="address" defaultValue={s.address} className="admin-input" />
            </Field>
          </div>
        </section>

        <div>
          <SubmitButton>Хадгалах</SubmitButton>
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
