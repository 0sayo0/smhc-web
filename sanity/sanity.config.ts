import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'smhc-cms',

  projectId: 'b3yujr2g',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('SMHC — Contenido')
          .items([
            S.listItem()
              .title('Identidad e Información')
              .id('siteIdentityEntry')
              .child(S.document().schemaType('siteIdentity').documentId('site-identity')),

            S.divider(),

            ...S.documentTypeListItems().filter((item) => item.getId() !== 'siteIdentity'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
