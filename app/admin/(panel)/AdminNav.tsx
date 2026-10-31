"use client";

import { Inbox, LayoutGrid, MapPin, Settings, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Хянах самбар", icon: LayoutGrid },
  { href: "/admin/orders", label: "Захиалгууд", icon: Inbox },
  { href: "/admin/branches", label: "Салбарууд", icon: MapPin },
  { href: "/admin/brands", label: "Брэндүүд", icon: Tag },
  { href: "/admin/settings", label: "Тохиргоо", icon: Settings },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Админ цэс" className="overflow-x-auto px-3 pb-3 lg:px-3 lg:pb-0">
      <ul className="flex gap-1 lg:flex-col">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? path === href : path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-[0.88rem] transition-colors ${
                  active ? "bg-ink text-paper" : "text-stone hover:bg-cream hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
