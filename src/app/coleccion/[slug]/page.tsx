import { notFound, permanentRedirect } from "next/navigation";

import { client } from "@/lib/sanity";

interface LegacyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LegacyPage({ params }: LegacyPageProps) {
  const { slug } = await params;

  const query = `
    select(
      count(*[
        _type == "category" &&
        slug.current == $slug &&
        !defined(parent._ref)
      ]) > 0 => "category",

      count(*[
        _type == "collection" &&
        slug.current == $slug &&
        showOnSite == true
      ]) > 0 => "collection",

      null
    )
  `;

  const type = await client.fetch<"category" | "collection" | null>(
    query,
    { slug },
    {
      next: {
        revalidate: 60,
      },
    },
  );

  const encodedSlug = encodeURIComponent(slug);

  if (type === "category") {
    permanentRedirect(`/catalogo/${encodedSlug}`);
  }

  if (type === "collection") {
    permanentRedirect(`/colecciones/${encodedSlug}`);
  }

  notFound();
}
