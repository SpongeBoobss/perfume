"use client";

import { useActionState } from "react";
import { submitOrder, type OrderFormState } from "@/app/actions";

const input =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-stone/60 focus:border-ink";

export function OrderForm({ brandNames }: { brandNames: string[] }) {
  const [state, action, pending] = useActionState<OrderFormState, FormData>(submitOrder, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-paper p-10 text-center shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)]">
        <p className="font-serif text-4xl italic text-gold-deep">Баярлалаа!</p>
        <p className="mt-3 max-w-[30ch] text-stone" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="grid content-start gap-4 rounded-[1.5rem] bg-paper p-6 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)] sm:p-8"
    >
      <h3 className="text-[1.25rem] font-semibold tracking-tight text-ink">Захиалгын хүсэлт</h3>

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Нэр *">
          <input name="name" required autoComplete="name" className={input} />
        </Field>
        <Field label="Утас *">
          <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" className={input} placeholder="9999 9999" />
        </Field>
      </div>
      <Field label="Брэнд">
        <input name="brand" list="brand-options" className={input} placeholder="Жишээ нь: Dior" />
        <datalist id="brand-options">
          {brandNames.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </Field>
      <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
        <Field label="Үнэртний нэр, загвар">
          <input name="product" className={input} placeholder="Sauvage EDP" />
        </Field>
        <Field label="Хэмжээ">
          <input name="size" className={input} placeholder="100 ml" />
        </Field>
      </div>
      <Field label="Нэмэлт мэдээлэл">
        <textarea name="note" rows={3} className={input} placeholder="Зургийн холбоос, хүссэн хувилбар, хүргэлтийн газар…" />
      </Field>

      {state && !state.ok && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[0.88rem] text-red-800">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-ink py-4 text-[0.95rem] font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Илгээж байна…" : "Захиалга илгээх"}
      </button>
      <p className="text-center text-[0.78rem] text-stone">Бид таны утсаар холбогдож үнэ, хугацааг мэдэгдэнэ.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8rem] font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
