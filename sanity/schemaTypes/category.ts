import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',

  fields: [
    // ========================================
    // IDENTIDAD
    // ========================================

    defineField({
      name: 'name',
      title: 'Nombre de la categoría',
      type: 'string',

      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',

      options: {
        source: 'name',
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descripción editorial',
      type: 'text',

      rows: 3,

      description: 'Texto que presenta la identidad y el concepto de esta categoría.',
    }),

    // ========================================
    // JERARQUÍA
    // ========================================

    defineField({
      name: 'parent',
      title: 'Categoría superior',
      type: 'reference',

      to: [{type: 'category'}],

      description:
        'Déjalo vacío para categorías principales. Selecciona una categoría principal para crear una subcategoría.',

      options: {
        filter: ({document}) => {
          const id = document._id?.replace(/^drafts\./, '') ?? ''

          return {
            filter: '!defined(parent._ref) && _id != $id && _id != $draftId',

            params: {
              id,
              draftId: `drafts.${id}`,
            },
          }
        },
      },
    }),

    // ========================================
    // IDENTIDAD VISUAL
    // ========================================

    defineField({
      name: 'coverImage',
      title: 'Fotografía editorial',
      type: 'image',

      description: 'Imagen protagonista de la categoría. Utiliza fotografías originales de SMHC.',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la imagen',
          type: 'string',

          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ========================================
    // NAVEGACIÓN
    // ========================================

    defineField({
      name: 'navigationLabel',
      title: 'Nombre en navegación',
      type: 'string',

      description: 'Nombre opcional para mostrar en menús y tarjetas.',
    }),

    defineField({
      name: 'navigationOrder',
      title: 'Orden de navegación',
      type: 'number',

      initialValue: 100,

      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: 'showInNavigation',
      title: 'Mostrar en navegación',
      type: 'boolean',

      initialValue: true,

      description: 'Controla su aparición en el menú principal.',
    }),
  ],
})
