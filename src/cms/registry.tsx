import './types'
import type { CmsRegistry } from '@bifrost-orbit-cms/sdk/react'

import { Action } from '../components/blocks/action'
import { FeatureGrid } from '../components/blocks/feature-grid'
import { FeatureItem } from '../components/blocks/feature-item'
import { Hero } from '../components/blocks/hero'

export const registry: CmsRegistry = {
  hero: Hero,
  action: Action,
  featureGrid: FeatureGrid,
  featureItem: FeatureItem,
}
