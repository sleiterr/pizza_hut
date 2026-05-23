import {defineType, defineField} from 'sanity'

export const menuType = defineType({
  name: 'menuCategories',
  title: 'Menu Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Menu Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Menu items as an array of objects
    defineField({
      name: 'items',
      title: 'Menu',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'description', title: 'Description', type: 'string'},
            {name: 'price', title: 'Price', type: 'string'},
            {name: 'isNew', title: 'New', type: 'boolean'},
          ],
        }),
      ],
    }),
    // Add more fields as needed
  ],
})
