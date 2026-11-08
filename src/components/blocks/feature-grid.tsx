import type { BlockProps } from '@bifrost-orbit-cms/sdk/react'

export function FeatureGrid({ block, slots }: BlockProps<'featureGrid'>) {
  return (
    <section data-cms-id={block.id} className="feature-grid">
      <h2>{block.heading}</h2>
      {block.intro ? <p>{block.intro}</p> : null}
      <div className="grid">{slots.items}</div>
    </section>
  )
}
