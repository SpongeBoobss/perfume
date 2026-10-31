/**
 * Stock photography from Unsplash (free to use under the Unsplash License).
 * The hero image can be replaced from Admin → Тохиргоо; the rest are swapped here.
 */
const u = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;

export const images = {
  hero: u("1617661338085-d1ec6a89a6d8", 1800),
  importCard: u("1733660227163-01bc46e0d7d7", 800),
  originalCard: u("1590736704728-f4730bb30770", 800),
  preorderCard: u("1613521076081-2820f9746a2d", 800),
  about: u("1775210727378-7b0e9a50b660", 2000),
  preorder: u("1588405748880-12d1d2a59f75", 1000),
  partnership: u("1767771357444-92072accdcd6", 2000),
};

/** Unsplash already resizes and compresses on its CDN, so next/image need not proxy it. */
export const isPresized = (src: string) => src.startsWith("https://images.unsplash.com/");
