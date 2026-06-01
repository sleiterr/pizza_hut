import {defineType, defineField} from 'sanity'

export const reservationsType = defineType({
  name: 'reservations',
  title: 'Reservations',
  type: 'document',
  fields: [
    defineField({
      name: 'guestCount',
      title: 'Guest Count',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Reservation Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Reservation Date and Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Confirmed', value: 'confirmed'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Completed', value: 'completed'},
        ],
      },
    }),
  ],
})
