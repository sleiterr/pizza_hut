import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {HomeIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'
import {resolve} from './presentation/resolve'

const singletonTypes = new Set(['homePage'])

export default defineConfig({
  name: 'default',
  title: 'Pizza Hut Landing',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .icon(HomeIcon)
              .child(S.document().schemaType('homePage').documentId('homePage')),
            ...S.documentTypeListItems().filter((item) => {
              const id = item.getId()
              return id ? !singletonTypes.has(id) : true
            }),
          ]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],

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
