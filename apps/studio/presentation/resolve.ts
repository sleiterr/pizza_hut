import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homePage: defineLocations({
      select: {
        title: 'heroTitle',
      },
      resolve: (doc) => {
        return {
          locations: [{title: doc?.title || 'Home Page', href: '/'}],
        }
      },
    }),
  },
}
