import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'i3f05hhs'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'resume-biodata-studio',
  title: 'ResumeBiodata.in Content Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2026-06-22'}),
  ],
  schema: {
    types: schemaTypes,
  },
})
