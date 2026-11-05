import { client } from "@/lib/sanity";

export interface NavigationCategory {
  _id: string;
  label: string;
  slug: string;
  description: string | null;
}

export async function getNavigationCategories(): Promise<NavigationCategory[]> {
  const query = `
    *[
      _type == "category" &&
      !defined(parent._ref) &&
      coalesce(showInNavigation, true) == true &&
      defined(slug.current)
    ]
    | order(
      coalesce(navigationOrder, 100) asc,
      name asc
    ) {
      _id,

      "label": coalesce(navigationLabel, name),

      "slug": slug.current,

      description
    }
  `;

  return client.fetch<NavigationCategory[]>(
    query,
    {},
    {
      next: {
        revalidate: 60,
      },
    },
  );
}
