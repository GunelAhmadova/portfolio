import type { CSImage } from '../data/projects'

type Props = {
  image: CSImage
  className?: string
  style?: React.CSSProperties
  eager?: boolean
}

/**
 * A screen inside a simple device bezel. Images that already include a
 * device frame (`framed`) are shown as-is so the bezel isn't doubled.
 */
export default function Phone({ image, className = '', style, eager }: Props) {
  return (
    <div className={className} style={style}>
      {image.framed ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={eager ? 'eager' : 'lazy'}
          className="block h-auto w-full rounded-[13%/6%] shadow-2xl"
        />
      ) : (
        <div className="overflow-hidden rounded-[13%/6%] border-[5px] border-[#0d0d10] bg-[#0d0d10] shadow-2xl ring-1 ring-white/10">
          <img
            src={image.src}
            alt={image.alt}
            loading={eager ? 'eager' : 'lazy'}
            className="block h-auto w-full rounded-[11%/5%]"
          />
        </div>
      )}
    </div>
  )
}
