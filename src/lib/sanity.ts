import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false, // Ponemos false por ahora para ver los cambios al instante
})

// Esto nos ayudará a procesar las imágenes de Sanity
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}