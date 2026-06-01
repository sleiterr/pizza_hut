import {structureTool} from 'sanity/structure'
import {
  HomeIcon,
  TagIcon,
  MenuIcon,
  DocumentsIcon,
  BasketIcon,
  ThListIcon,
  ListIcon,
} from '@sanity/icons'

const singletonTypes = new Set(['homePage'])
const catalogTypes = new Set(['product', 'category'])
const menuTypes = new Set(['menuCategories', 'Menu Categories'])
const reservationTypes = new Set(['reservations', 'Reservations'])

export const structure = structureTool({
  structure: (S) =>
    S.list()
      .title('Content')
      .items([
        // Singleton pages
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

        S.divider(),

        // Menu group (example, adjust as needed)
        S.listItem()
          .title('Menu')
          .icon(MenuIcon)
          .child(
            S.list()
              .title('Menu Categories')
              .items([
                S.documentTypeListItem('menuCategories').title('Menu Categories').icon(ThListIcon),
                // Add more menu-related document types here if needed
              ]),
          ),

        S.divider(),

        S.listItem()
          .title('Reservations')
          .icon(ListIcon)
          .child(
            S.list()
              .title('Reservations')
              .items([
                S.documentTypeListItem('reservations').title('Reservations').icon(ThListIcon),
                // Add more reservations-related document types here if needed
              ]),
          ),
      ]),
})

export {singletonTypes, catalogTypes, menuTypes, reservationTypes}
