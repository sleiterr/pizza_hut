import {presentationTool} from 'sanity/presentation'
import {resolve} from '../presentation/resolve'

export const presentation = presentationTool({
  resolve,
  previewUrl: {
    origin: 'http://localhost:3000',
    previewMode: {
      enable: '/api/draft-mode/enable',
    },
  },
})
