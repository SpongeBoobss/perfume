# Original Perfume — вэбсайт ба админ

АНУ-аас импортолсон 100% оригинал үнэртний брэнд сайт, захиалгын форм, Gmail-ээр нэвтрэх админ хэсэгтэй.
Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase.

| Хаяг | Юу вэ |
| --- | --- |
| `/` | Нийтийн сайт |
| `/admin` | Админ: захиалга, салбар, брэнд, тохиргоо |

Supabase тохируулаагүй үед сайт `lib/site-config.ts`, `lib/locations.ts` дахь анхдагч контентоор ажиллана, админ нэвтрэх
боломжгүй, захиалгын форм "тохируулагдаагүй" гэж хариулна.

## Ажиллуулах

```bash
npm install
cp .env.example .env.local   # Supabase түлхүүрээ оруулна
npm run dev
```

http://localhost:3000 нээнэ. Production: `npm run build && npm run start`.

## Supabase тохируулах (нэг удаа)

1. **Төсөл үүсгэх.** [supabase.com](https://supabase.com) → New project.
2. **Schema.** Dashboard → SQL Editor → [`supabase/schema.sql`](supabase/schema.sql)-ийн агуулгыг бүхэлд нь хуулж Run.
   Хүснэгтүүд, эрхийн дүрэм (RLS), зургийн bucket, анхны 20 брэнд, 5 салбар үүснэ.
3. **Админ Gmail.** Мөн SQL Editor дээр (өөрийн Gmail-ээр солиод):
   ```sql
   insert into public.admins (email) values ('your.name@gmail.com');
   ```
   Хэд хэдэн хүн бол мөр бүрд нэг хаяг. Энэ жагсаалтад байхгүй Google хэрэглэгч нэвтэрсэн ч юу ч харж, засаж чадахгүй.
4. **Google нэвтрэлт.**
   - [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → Create OAuth client ID (Web application).
   - *Authorized redirect URI*: `https://<таны-төсөл>.supabase.co/auth/v1/callback`
   - Client ID, Secret-ээ Supabase → Authentication → Providers → Google-д оруулж идэвхжүүлнэ.
5. **Redirect URL.** Supabase → Authentication → URL Configuration:
   - Site URL: таны домэйн (жишээ нь `https://originalperfume.mn`)
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://originalperfume.mn/auth/callback`
6. **Түлхүүр.** Supabase → Project Settings → API-аас `URL`, `publishable` түлхүүрийг `.env.local`-д (Vercel дээр бол
   Environment Variables-д) оруулна.

## Админ хэсэг

- **Захиалгууд** — сайтын формоор ирсэн хүсэлт. Төлөв: Шинэ → Холбогдсон → Захиалсан → Хүлээлгэн өгсөн / Цуцалсан.
- **Салбарууд** — нэр, аймаг, хаяг, утас, цаг, зураг. Газрын зураг дээр дарж байршлыг нь тавина. "Сайт дээр харуулах"-г
  унтраавал нийтэд харагдахгүй.
- **Брэндүүд** — нэмэх, нэр/дараалал засах, устгах.
- **Тохиргоо** — нүүр хэсгийн гарчиг, тайлбар, арын зураг; утас, и-мэйл, Facebook, Instagram, хаяг.

Өөрчлөлт нийтийн сайтад шууд гарна.

## Зураг

Анхдагч зургууд нь [Unsplash](https://unsplash.com/license)-ийн үнэгүй зургууд ([`lib/images.ts`](lib/images.ts)).
Нүүр хэсгийн зургийг админаас солино; бусдыг өөрийн зургаар солихдоо `lib/images.ts`-ийг засна.

## Байршуулах (Vercel)

1. Төслөө GitHub-д оруулаад Vercel-д import хийнэ.
2. Environment Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. `lib/site-config.ts` дахь `url`-ыг жинхэнэ домэйноор солино (SEO, sitemap).
4. Supabase-ийн Redirect URLs-д домэйнээ нэмнэ (дээрх 5-р алхам).
