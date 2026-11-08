import type { BlockProps } from '@bifrost-orbit-cms/sdk/react'

export function FeatureItem({ block }: BlockProps<'featureItem'>) {
  return (
    <article data-cms-id={block.id}>
      <h3>{block.title}</h3>
      <p>{block.body}</p>
    </article>
  )
}
