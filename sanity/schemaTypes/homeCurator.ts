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
      name: 'seasonalCampaign',
      title: 'Campaña de Temporada',
      description: 'Configura el contenido promocional de la portada principal.',
      type: 'object',

      fields: [
        defineField({
          name: 'enabled',
          title: 'Activar campaña',
          description:
            'Activa la portada de temporada. Al desactivarla, vuelve la portada permanente.',
          type: 'boolean',
          initialValue: false,
        }),

        defineField({
          name: 'eyebrow',
          title: 'Etiqueta editorial',
          description: 'Ejemplo: Edición de Temporada, Navidad o Colección Especial.',
          type: 'string',
        }),

        defineField({
          name: 'headline',
          title: 'Título principal',
          description: 'El mensaje protagonista de la campaña.',
          type: 'string',
        }),

        defineField({
          name: 'description',
          title: 'Descripción',
          description: 'Texto breve que acompañará al título principal.',
          type: 'text',
          rows: 3,
        }),

        defineField({
          name: 'ctaLabel',
          title: 'Texto del botón',
          description: 'Ejemplo: Explorar piezas.',
          type: 'string',
        }),

        defineField({
          name: 'ctaHref',
          title: 'Destino del botón',
          description: 'Utiliza una ruta interna. Ejemplo: /coleccion/cera',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value) => {
              if (!value) return true

              return /^(\/(?!\/)|#)/.test(value)
                ? true
                : 'Utiliza una ruta interna que comience con / o #'
            }),
        }),

        defineField({
          name: 'image',
          title: 'Fotografía de campaña',
          description: 'Fotografía editorial que aparecerá en la portada.',
          type: 'image',

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: 'alt',
              title: 'Descripción accesible',
              description: 'Describe brevemente lo que aparece en la fotografía.',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    // ========================================
    // COLECCIÓN EDITORIAL DESTACADA
    // ========================================

    defineField({
      name: 'featuredCollection',
      title: 'Colección Destacada',
      description:
        'Selecciona la colección editorial que protagonizará una sección especial del Home.',

      type: 'object',

      fields: [
        defineField({
          name: 'enabled',
          title: 'Mostrar colección destacada',
          type: 'boolean',

          initialValue: false,

          description: 'Activa o desactiva esta sección sin modificar la colección original.',
        }),

        defineField({
          name: 'collection',
          title: 'Colección protagonista',
          type: 'reference',

          to: [{type: 'collection'}],

          options: {
            filter: 'showOnSite == true && defined(slug.current)',
          },

          description:
            'Selecciona una colección publicada y habilitada para mostrarse en el sitio.',
        }),
      ],
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
