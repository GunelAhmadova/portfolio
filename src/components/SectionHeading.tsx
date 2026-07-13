import Reveal from './Reveal'

type Props = {
  index: string
  label: string
  title: string
}

export default function SectionHeading({ index, label, title }: Props) {
  return (
    <Reveal className="mb-6 md:mb-8">
      <p className="kicker mb-3" aria-hidden="true">
        {'//'} {index} · {label}
      </p>
      <h2 className="display text-4xl font-semibold sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </Reveal>
  )
}
