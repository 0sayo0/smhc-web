import {defineField, defineType} from 'sanity'

export const siteIdentity = defineType({
  name: 'siteIdentity',
  title: 'Identidad e Información',
  type: 'document',

  fields: [
    // ========================================
    // NUESTRA HISTORIA
    // ========================================

    defineField({
      name: 'aboutTitle',
      title: 'Título de Nuestra Historia',
      type: 'string',

      description: 'Título principal de la página institucional.',
    }),

    defineField({
      name: 'aboutLead',
      title: 'Introducción de la marca',
      type: 'text',
      rows: 4,

      description: 'Presentación breve del concepto y la identidad de SMHC.',
    }),

    defineField({
      name: 'aboutStory',
      title: 'Historia de Stephany y SMHC',
      type: 'array',

      of: [{type: 'block'}],

      description:
        'Aquí documentaremos la historia real del proyecto, su origen, inspiración y evolución.',
    }),

    // ========================================
    // FOTOGRAFÍAS INSTITUCIONALES
    // ========================================

    defineField({
      name: 'aboutPortrait',
      title: 'Fotografía institucional',
      type: 'image',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la fotografía',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'processImage',
      title: 'Fotografía del proceso artesanal',
      type: 'image',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la fotografía',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ========================================
    // MENSAJE INSTITUCIONAL
    // ========================================

    defineField({
      name: 'closingStatement',
      title: 'Mensaje de cierre',
      type: 'text',
      rows: 3,

      description: 'Una reflexión que represente la filosofía de la marca.',
    }),

    // ========================================
    // CONTACTO
    // ========================================

    defineField({
      name: 'contactIntro',
      title: 'Introducción de Contacto',
      type: 'text',
      rows: 3,

      description: 'Mensaje de bienvenida para las personas que desean comunicarse con SMHC.',
    }),

    defineField({
      name: 'instagramUrl',
      title: 'Instagram oficial',
      type: 'url',

      description: 'Introduce únicamente la dirección del perfil oficial confirmado.',

      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Identidad e Información de SMHC',
      }
    },
  },
})
