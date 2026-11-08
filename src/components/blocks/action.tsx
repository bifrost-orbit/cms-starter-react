import type { BlockProps } from '@bifrost-orbit-cms/sdk/react'

export function Action({ block }: BlockProps<'action'>) {
  if (!block.link?.href) return null
  return (
    <a data-cms-id={block.id} href={block.link.href} target={block.link.target ?? undefined} className={block.style}>
      {block.label}
    </a>
  )
}
