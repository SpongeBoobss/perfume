import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { About } from "@/components/sections/About";
import { Brands } from "@/components/sections/Brands";
import { PreOrder } from "@/components/sections/PreOrder";
import { Locations } from "@/components/sections/Locations";
import { Partnership } from "@/components/sections/Partnership";
import { Contact } from "@/components/sections/Contact";
import { getSiteData } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import type { Settings } from "@/lib/types";

// Admin edits revalidate the page immediately; this is only a safety net.
export const revalidate = 300;

function OrganizationJsonLd({ settings }: { settings: Settings }) {
  const sameAs = [settings.facebook, settings.instagram].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    slogan: siteConfig.slogan,
    description: siteConfig.description,
    ...(sameAs.length ? { sameAs } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default async function HomePage() {
  const { settings, brands, branches } = await getSiteData();

  return (
    <>
      <OrganizationJsonLd settings={settings} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
      >
        Үндсэн агуулга руу шилжих
      </a>
      <Header />
      <main id="main">
        <Hero settings={settings} />
        <Features brandCount={brands.length} />
        <About brandCount={brands.length} branchCount={branches.length} />
        <Brands brands={brands} />
        <PreOrder brandNames={brands.map((b) => b.name)} />
        <Locations branches={branches} />
        <Partnership settings={settings} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
