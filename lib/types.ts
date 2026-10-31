export type Branch = {
  id: string;
  name: string;
  province: string;
  address: string;
  phone: string;
  hours: string;
  image_url: string;
  map_x: number | null;
  map_y: number | null;
  sort: number;
  published: boolean;
};

export type Brand = { id: string; name: string; sort: number };

export type Settings = {
  hero_title: string;
  hero_accent: string;
  hero_title_end: string;
  hero_subtitle: string;
  hero_image: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  address: string;
};

export const ORDER_STATUSES = ["new", "contacted", "ordered", "done", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Шинэ",
  contacted: "Холбогдсон",
  ordered: "Захиалсан",
  done: "Хүлээлгэн өгсөн",
  cancelled: "Цуцалсан",
};

export type Order = {
  id: string;
  name: string;
  phone: string;
  brand: string;
  product: string;
  size: string;
  note: string;
  status: OrderStatus;
  created_at: string;
};

/** Mongolia's 21 provinces plus the capital — the choices for a branch's location. */
export const PROVINCES = [
  "Улаанбаатар",
  "Архангай",
  "Баян-Өлгий",
  "Баянхонгор",
  "Булган",
  "Говь-Алтай",
  "Говьсүмбэр",
  "Дархан-Уул",
  "Дорноговь",
  "Дорнод",
  "Дундговь",
  "Завхан",
  "Орхон",
  "Өвөрхангай",
  "Өмнөговь",
  "Сүхбаатар",
  "Сэлэнгэ",
  "Төв",
  "Увс",
  "Ховд",
  "Хөвсгөл",
  "Хэнтий",
] as const;
