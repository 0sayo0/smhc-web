import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    // --- Identity ---
    defineField({
      name: 'name',
      title: 'Nombre de la Pieza',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),

    // --- Classification ---
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'collection',
      title: 'Colección',
      type: 'reference',
      to: [{type: 'collection'}],
    }),

    // --- Visual ---
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal (Portada)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Fotos',
      type: 'array',
      of: [{type: 'image'}],
    }),

    // --- Storytelling ---
    // THIS IS NEW: To differentiate decorative from aromatic herbs without dirtying the card
    defineField({
      name: 'purpose',
      title: 'Propósito (Uso)',
      type: 'string',
      description: 'Ej: Pieza escultural. Diseñada para perfumar en frío y decorar.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta (Para cards)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'story',
      title: 'Historia de la Pieza (Storytelling)',
      type: 'array',
      of: [{type: 'block'}],
    }),

    // --- Technical Details ---
    defineField({
      name: 'material',
      title: 'Materiales',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensiones',
      type: 'string',
      placeholder: 'Ej: 15 cm alto x 10 cm ancho',
    }),

    // --- Conversion ---
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje para WhatsApp',
      type: 'string',
      initialValue: '¡Hola! Quiero saber más sobre',
    }),
    defineField({
      name: 'inStock',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
