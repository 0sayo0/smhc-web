import {defineField, defineType} from 'sanity'

export const homeCurator = defineType({
  name: 'homeCurator',
  title: 'Curador del Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
      initialValue: 'Configuración del Home (No borrar)',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'carousels',
      title: 'Vitrinas (Carruseles del Home)',
      description:
        'Agrega las categorías y elige qué productos exactos quieres mostrar en cada fila del Home.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Vitrina',
          fields: [
            {
              name: 'category',
              title: 'Categoría a Mostrar (Título de la Vitrina)',
              type: 'reference',
              to: [{type: 'category'}],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'selectedProducts',
              title: 'Piezas Seleccionadas',
              description:
                'Agrega piezas de cualquier colección y arrástralas para cambiar el orden en el que aparecerán.',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'product'}]}],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'category.name',
            },
            prepare(selection) {
              return {title: `Vitrina: ${selection.title || 'Sin Categoría'}`}
            },
          },
        },
      ],
    }),
  ],
})
