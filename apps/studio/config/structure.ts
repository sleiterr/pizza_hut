import {structureTool} from 'sanity/structure'
import {HomeIcon, TagIcon, DocumentsIcon, BasketIcon, ThListIcon} from '@sanity/icons'

const singletonTypes = new Set(['homePage'])
const catalogTypes = new Set(['product', 'category'])

export const structure = structureTool({
  structure: (S) =>
    S.list()
      .title('Content')
      .items([
        // Pages — сінглтони
        S.listItem()
          .title('Pages')
          .icon(DocumentsIcon)
          .child(
            S.list()
              .title('Pages')
              .items([
                S.listItem()
                  .title('Home Page')
                  .icon(HomeIcon)
                  .child(S.document().schemaType('homePage').documentId('homePage')),
              ]),
          ),

        S.divider(),

        // Catalog — products and other repeatable types
        S.listItem()
          .title('Catalog')
          .icon(TagIcon)
          .child(
            S.list()
              .title('Catalog')
              .items([
                S.documentTypeListItem('product').title('Products').icon(BasketIcon),
                S.documentTypeListItem('category').title('Categories').icon(ThListIcon),
              ]),
          ),
      ]),
})

export {singletonTypes, catalogTypes}
