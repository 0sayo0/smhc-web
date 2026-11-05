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

      description:
        'Descripción breve de la categoría. Podrá utilizarse en la navegación y en su página principal.',
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
        'Deja este campo vacío para las categorías principales. Las subcategorías se habilitarán cuando adaptemos las rutas del catálogo.',
    }),

    // ========================================
    // NAVEGACIÓN
    // ========================================

    defineField({
      name: 'navigationLabel',
      title: 'Nombre en navegación',
      type: 'string',

      description:
        'Opcional. Permite mostrar un nombre diferente en el menú sin modificar el nombre oficial de la categoría.',
    }),

    defineField({
      name: 'navigationOrder',
      title: 'Orden de navegación',
      type: 'number',

      initialValue: 100,

      description: 'Utiliza números menores para mostrar una categoría antes que las demás.',

      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: 'showInNavigation',
      title: 'Mostrar en navegación',
      type: 'boolean',

      initialValue: true,

      description:
        'Controla si esta categoría aparece en el menú principal. No elimina la categoría ni sus productos.',
    }),
  ],
})
