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
      title: 'Categoría del producto',
      type: 'reference',

      to: [
        {
          type: 'category',
        },
      ],

      description:
        'Selecciona la clasificación más específica disponible. Por ejemplo: Cera Decorativa.',

      validation: (Rule) => Rule.required(),
    }),
    // Referencia antigua: conservar durante la migración.
    defineField({
      name: 'collection',
      title: 'Colección anterior',
      type: 'reference',
      to: [{type: 'collection'}],
      readOnly: true,
      hidden: true,
    }),

    // Nuevo sistema: múltiples colecciones.
    defineField({
      name: 'collections',
      title: 'Colecciones editoriales',
      type: 'array',
      description:
        'Una pieza puede pertenecer a varias colecciones, por ejemplo Jardín Eterno y Edición Navideña.',
      of: [
        {
          type: 'reference',
          to: [{type: 'collection'}],
        },
      ],
    }),

    // --- Visual ---
    // ========================================
    // PRODUCT PHOTOGRAPHY
    // ========================================

    defineField({
      name: 'mainImage',
      title: 'Fotografía principal',
      type: 'image',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la fotografía',
          type: 'string',

          description:
            'Describe lo que aparece en la fotografía. Ejemplo: Arreglo Jardín Eterno Clásico con flores artesanales rosadas y recipiente blanco.',
        }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Galería de fotografías',
      type: 'array',

      description: 'Agrega fotografías de diferentes ángulos, acabados y detalles de la pieza.',

      of: [
        {
          type: 'image',

          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: 'alt',
              title: 'Descripción de la fotografía',
              type: 'string',

              description: 'Describe el ángulo o detalle específico que aparece.',
            }),
          ],
        },
      ],
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
