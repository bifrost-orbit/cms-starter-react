// Types for the components this starter draws. Run `npm run cms:types` to replace them with your space's own.
import type { CmsLink, CmsNode, CmsRichText } from "@bifrost-orbit-cms/sdk";

export interface ActionBlock {
  type: "action"
  label: string
  link?: CmsLink | null
  style?: "primary" | "secondary"
}

export interface FeatureGridBlock {
  type: "featureGrid"
  heading: string
  intro?: string
  items?: CmsNode<FeatureItemBlock>[]
}

export interface FeatureItemBlock {
  type: "featureItem"
  title: string
  body?: string
}

export interface HeroBlock {
  type: "hero"
  eyebrow?: string
  heading: string
  headingAccent?: string
  description?: CmsRichText
  primaryAction?: CmsNode<ActionBlock> | null
  secondaryAction?: CmsNode<ActionBlock> | null
}

declare module "@bifrost-orbit-cms/sdk" {
  interface CmsBlockTypes {
    action: ActionBlock
    featureGrid: FeatureGridBlock
    featureItem: FeatureItemBlock
    hero: HeroBlock
  }
}
