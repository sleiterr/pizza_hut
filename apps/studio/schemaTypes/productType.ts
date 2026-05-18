import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

// productType.ts - defines the schema for the "Product" document type in Sanity.
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    // define type created new fields for the product document.
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      // validation rule to ensure the name field is required.
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // slug field is used for creating URL-friendly identifiers based on the product name.
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // option to generate the slug from the name field.
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      // rows option to specify the height of the textarea in the Sanity Studio.
      rows: 3,
    }),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      // validation rule to ensure the rating field is required and within a valid range.
      validation: (Rule) => Rule.required().min(0).max(5),
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      // validation rule to ensure the price field is required and non-negative.
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
      // reference to the category document type, allowing products to be associated with a category.
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    // tags field is an array of strings that allows categorizing products with predefined tags.
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        // list of predefined tags that can be selected for each product, such as "Featured", "Popular", "New", etc.
        list: [
          {title: 'Featured', value: 'featured'},
          {title: 'Popular', value: 'popular'},
          {title: 'Trending', value: 'trending'},
          {title: 'Flash Sale', value: 'flash-sale'},
          {title: 'Best Seller', value: 'best-seller'},
          {title: 'Weekly Special', value: 'weekly-special'},
          {title: 'Top Offer', value: 'top-offer'},
          {title: 'New', value: 'new'},
        ],
      },
    }),
  ],
})
