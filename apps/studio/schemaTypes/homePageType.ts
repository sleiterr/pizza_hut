import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'featured', title: 'Featured Menu'},
    {name: 'promo', title: 'Promo'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Hero section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero Button Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroButtonLink',
      title: 'Hero Button Link',
      type: 'string',
      group: 'hero',
    }),

    // Featured Menu section
    defineField({
      name: 'featuredTitle',
      title: 'Featured Section Title',
      type: 'string',
      group: 'featured',
    }),

    // Promo section
    defineField({
      name: 'promoTitle',
      title: 'Promo Title',
      type: 'string',
      group: 'promo',
    }),
    defineField({
      name: 'promoImage',
      title: 'Promo Image',
      type: 'image',
      group: 'promo',
      options: {hotspot: true},
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
})
