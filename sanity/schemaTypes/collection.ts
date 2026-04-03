import {defineField, defineType} from 'sanity'

export const collection = defineType({
  name: 'collection',
  title: 'Colección',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Colección',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción Emocional',
      type: 'text',
      rows: 3,
    }),
    // We link the collection to a category (Ex., Eternal Garden -> Wax)
    defineField({
      name: 'category',
      title: 'Categoría Padre',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
