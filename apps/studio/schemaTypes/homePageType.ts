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
    {name: 'menu', title: 'Menu'},
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

    // Array of about images
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

    //! Menu section

    // Menu Categories: array of references to category documents
    defineField({
      name: 'menuCategories',
      title: 'Menu Categories',
      type: 'array',
      group: 'menu',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
      description: 'Select categories to feature in the promo section',
    }),

    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'reference',
      to: [{type: 'menuCategories'}],
      group: 'menu',
      description: 'Select the menu document to display on the home page',
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
