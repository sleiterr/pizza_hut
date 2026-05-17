import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number',
    }),
    defineField({
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Featured', value: 'featured'},
          {title: 'Popular', value: 'popular'},
          {title: 'Trending', value: 'trending'},
          {title: 'Flash Sale', value: 'flash-sale'},
          {title: 'Best Seller', value: 'best-seller'},
          {title: 'Weekend Deal', value: 'weekend-deal'},
          {title: 'Top Offer', value: 'top-offer'},
          {title: 'New', value: 'new'},
        ],
      },
    }),
  ],
})
