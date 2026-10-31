-- Original Perfume — Supabase schema.
-- Run once in Supabase Dashboard → SQL Editor. Safe to re-run.

-- ───────────────────────── Tables ─────────────────────────

create table if not exists public.admins (
  email text primary key
);

create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  province text not null,
  address text not null default '',
  phone text not null default '',
  hours text not null default '',
  image_url text not null default '',
  -- Position on the schematic map (SVG viewBox 0 0 1010 510). Null = not shown on the map.
  map_x int,
  map_y int,
  sort int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- Single-row site settings.
create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  hero_title text not null default 'Оригинал үнэртэн',
  hero_accent text not null default 'Таны',
  hero_title_end text not null default 'хүссэнээр',
  hero_subtitle text not null default 'Дэлхийн алдартай брэндүүдийн үнэртнийг АНУ-аас импортлон, бэлэн болон захиалгаар хүргэнэ.',
  hero_image text not null default '',
  phone text not null default '',
  email text not null default '',
  facebook text not null default '',
  instagram text not null default '',
  address text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  phone text not null check (char_length(phone) between 6 and 30),
  brand text not null default '' check (char_length(brand) <= 120),
  product text not null default '' check (char_length(product) <= 200),
  size text not null default '' check (char_length(size) <= 60),
  note text not null default '' check (char_length(note) <= 1000),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'ordered', 'done', 'cancelled')),
  created_at timestamptz not null default now()
);

-- ───────────────────────── Admin check ─────────────────────────

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ───────────────────────── Row level security ─────────────────────────

alter table public.admins enable row level security;
alter table public.branches enable row level security;
alter table public.brands enable row level security;
alter table public.settings enable row level security;
alter table public.orders enable row level security;

drop policy if exists "admins read own" on public.admins;
create policy "admins read own" on public.admins
  for select to authenticated using (public.is_admin());

-- Public content: everyone reads, only admins write.
drop policy if exists "branches public read" on public.branches;
create policy "branches public read" on public.branches
  for select using (published or public.is_admin());
drop policy if exists "branches admin write" on public.branches;
create policy "branches admin write" on public.branches
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "brands public read" on public.brands;
create policy "brands public read" on public.brands for select using (true);
drop policy if exists "brands admin write" on public.brands;
create policy "brands admin write" on public.brands
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings for select using (true);
drop policy if exists "settings admin write" on public.settings;
create policy "settings admin write" on public.settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Orders: anyone may submit a new one; only admins read or change them.
drop policy if exists "orders public insert" on public.orders;
create policy "orders public insert" on public.orders
  for insert to anon, authenticated with check (status = 'new');
drop policy if exists "orders admin read" on public.orders;
create policy "orders admin read" on public.orders
  for select to authenticated using (public.is_admin());
drop policy if exists "orders admin update" on public.orders;
create policy "orders admin update" on public.orders
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "orders admin delete" on public.orders;
create policy "orders admin delete" on public.orders
  for delete to authenticated using (public.is_admin());

-- ───────────────────────── Image storage ─────────────────────────

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "images admin insert" on storage.objects;
create policy "images admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'images' and public.is_admin());
drop policy if exists "images admin update" on storage.objects;
create policy "images admin update" on storage.objects
  for update to authenticated using (bucket_id = 'images' and public.is_admin());
drop policy if exists "images admin delete" on storage.objects;
create policy "images admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'images' and public.is_admin());

-- ───────────────────────── Starting content ─────────────────────────

insert into public.brands (name, sort) values
  ('Chanel', 1), ('Dior', 2), ('Yves Saint Laurent', 3), ('Giorgio Armani', 4), ('Versace', 5),
  ('Paco Rabanne', 6), ('Montblanc', 7), ('Hugo Boss', 8), ('Carolina Herrera', 9), ('Calvin Klein', 10),
  ('Burberry', 11), ('Dolce & Gabbana', 12), ('Gucci', 13), ('Prada', 14), ('Jean Paul Gaultier', 15),
  ('Viktor & Rolf', 16), ('Lancôme', 17), ('Maison Margiela', 18), ('Tom Ford', 19), ('Creed', 20)
on conflict (name) do nothing;

insert into public.branches (name, province, map_x, map_y, sort)
select * from (values
  ('Сайншанд', 'Дорноговь', 694, 342, 1),
  ('Хатанбулаг', 'Дорноговь', 664, 420, 2),
  ('Замын-Үүд', 'Дорноговь', 738, 392, 3),
  ('Цогтцэций', 'Өмнөговь', 557, 394, 4),
  ('Ханбогд', 'Өмнөговь', 606, 420, 5)
) as v(name, province, map_x, map_y, sort)
where not exists (select 1 from public.branches);

-- ───────────────────────── Admins ─────────────────────────
-- Replace with the Gmail address(es) allowed into /admin, then run this line.
-- insert into public.admins (email) values ('your.name@gmail.com') on conflict do nothing;
