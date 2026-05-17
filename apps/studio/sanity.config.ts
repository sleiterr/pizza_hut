import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {presentation} from './config/presentation'
import {structure, singletonTypes} from './config/structure'

export default defineConfig({
  name: 'default',
  title: 'Pizza Hut Landing',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [structure, presentation, visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev, context) => {
      if (context.creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
      }

      return prev
    },
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return prev.filter(({action}) => action !== 'duplicate' && action !== 'delete')
      }

      return prev
    },
  },
})
