import {defineField, defineType} from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Colección Editorial',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la colección',
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
      name: 'kind',
      title: 'Tipo de colección',
      type: 'string',
      initialValue: 'permanent',
      options: {
        layout: 'radio',
        list: [
          {title: 'Permanente', value: 'permanent'},
          {title: 'De temporada', value: 'seasonal'},
        ],
      },
    }),

    defineField({
      name: 'eyebrow',
      title: 'Etiqueta editorial',
      type: 'string',
      description: 'Ejemplo: El arte de la naturaleza',
    }),

    defineField({
      name: 'description',
      title: 'Descripción editorial',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'story',
      title: 'Historia de la colección',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Narrativa extendida del concepto, la inspiración y el proceso creativo.',
    }),

    defineField({
      name: 'coverImage',
      title: 'Fotografía protagonista',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción accesible',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'displayOrder',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: 'showOnSite',
      title: 'Mostrar en el sitio',
      type: 'boolean',
      initialValue: false,
      description:
        'Activa esta opción solamente cuando la colección esté lista para mostrarse públicamente.',
    }),

    // Campo legado: se conserva para no perder
    // información durante la migración.
    defineField({
      name: 'category',
      title: 'Categoría anterior',
      type: 'reference',
      to: [{type: 'category'}],
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'kind',
      media: 'coverImage',
    },
  },
})
