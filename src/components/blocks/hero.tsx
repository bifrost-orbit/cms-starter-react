import { RichText, type BlockProps } from '@bifrost-orbit-cms/sdk/react'

export function Hero({ block, slots }: BlockProps<'hero'>) {
  return (
    <section data-cms-id={block.id} className="hero">
      {block.eyebrow ? <p className="eyebrow">{block.eyebrow}</p> : null}
      <h1>
        {block.heading} {block.headingAccent ? <span>{block.headingAccent}</span> : null}
      </h1>
      <RichText value={block.description} />
      <div className="actions">
        {slots.primaryAction}
        {slots.secondaryAction}
      </div>
    </section>
  )
}
