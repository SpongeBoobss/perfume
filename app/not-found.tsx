import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="caption-serif">Page not found</p>
      <h1 className="mt-4 font-serif text-4xl font-light text-ink sm:text-5xl">
        Энэ хуудас олдсонгүй.
      </h1>
      <Link
        href="/"
        className="mt-10 border-b border-gold pb-1 text-sm tracking-wide text-ink transition-colors hover:text-gold-deep"
      >
        Нүүр хуудас руу буцах
      </Link>
    </main>
  );
}
