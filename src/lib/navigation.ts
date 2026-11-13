import { client } from "@/lib/sanity";

// ========================================
// TYPES
// ========================================

export interface NavigationSubcategory {
  _id: string;
  label: string;
  slug: string;
}

export interface NavigationCategory {
  _id: string;

  label: string;
  slug: string;

  description: string | null;

  children: NavigationSubcategory[];
}

// ========================================
// NAVIGATION QUERY
// ========================================

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

      "label": coalesce(
        navigationLabel,
        name
      ),

      "slug": slug.current,

      description,

      "children": *[
        _type == "category" &&
        parent._ref == ^._id &&
        coalesce(showInNavigation, true) == true &&
        defined(slug.current)
      ]

      | order(
        coalesce(navigationOrder, 100) asc,
        name asc
      ) {
        _id,

        "label": coalesce(
          navigationLabel,
          name
        ),

        "slug": slug.current
      }
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
