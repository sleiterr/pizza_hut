import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'featured', title: 'Featured About'},
    {name: 'promo', title: 'Promo'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    //! Hero section
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
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

    //! Featured About Section
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      group: 'featured',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'aboutSubtitle',
      title: 'About Subtitle',
      type: 'string',
      group: 'featured',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      group: 'featured',
      rows: 4,
    }),

    defineField({
      name: 'testimonialAvatar',
      title: 'Testimonial Avatar',
      type: 'image',
      group: 'featured',
      options: {hotspot: true},
    }),

    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      group: 'featured',
    }),

    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      group: 'featured',
    }),

    defineField({
      name: 'testimonialText',
      title: 'Testimonial Text',
      type: 'text',
      group: 'featured',
      rows: 4,
    }),

    defineField({
      name: 'aboutImages',
      title: 'About Images',
      type: 'array',
      group: 'featured',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
          ],
        },
      ],
    }),

    //! Promo section
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

    //! SEO
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
