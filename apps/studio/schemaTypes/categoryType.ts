import {defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'myField', // field name is required and must be unique
      type: 'string', // field type is required
    },
  ],
})
