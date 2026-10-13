import type { Project } from '../data/projects'
import Phone from './Phone'

type Props = {
  project: Project
  className?: string
  eager?: boolean
}

/**
 * Project cover. Priority: phone showcase on a coloured stage → real cover
 * image → designed placeholder built from the project's hue pair.
 */
export default function Cover({ project, className = '', eager }: Props) {
  if (project.showcase) {
    const [left, center, right] = project.showcase.screens
    return (
      <div
        role="img"
        aria-label={`${project.title}, app screens`}
        className={`relative h-full w-full overflow-hidden ${className}`}
        style={{ background: project.showcase.bg }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex w-[78%] max-w-[560px] items-center justify-center">
            {left && (
              <Phone
                image={left}
                eager={eager}
                className="absolute left-0 w-[34%] translate-y-[10%] -rotate-6 opacity-95"
              />
            )}
            {center && (
              <Phone
                image={center}
                eager={eager}
                className="relative z-10 w-[38%] translate-y-[18%]"
              />
            )}
            {right && (
              <Phone
                image={right}
                eager={eager}
                className="absolute right-0 w-[34%] translate-y-[10%] rotate-6 opacity-95"
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  if (project.cover && project.coverFit === 'inset') {
    return (
      <div
        className={`flex h-full w-full items-center justify-center p-[5%] ${className}`}
        style={{ background: project.coverBg ?? project.hue[0] }}
      >
        <img
          src={project.cover}
          alt={`${project.title}, cover`}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
    )
  }

  if (project.cover) {
    return (
      <img
        src={project.cover}
        alt={`${project.title}, cover`}
        className={`h-full w-full object-cover ${className}`}
        loading={eager ? 'eager' : 'lazy'}
      />
    )
  }

  const [a, b] = project.hue
  const name = project.title.split(':')[0]

  return (
    <div
      role="img"
      aria-label={`${project.title}, cover`}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 120% at 15% 0%, ${a} 0%, ${b} 100%)` }}
    >
      {/* abstract UI cards hinting at the product */}
      <div className="absolute inset-0 flex items-center justify-center gap-[4%] pt-[14%]">
        {[0, 1].map((i) => (
          <div
            key={i}
            className={`w-[26%] rounded-[10%/5%] border border-white/20 bg-white/10 p-[2.5%] backdrop-blur-md ${
              i ? 'translate-y-[12%]' : ''
            }`}
            aria-hidden="true"
          >
            <div className="mb-[10%] h-2 w-1/2 rounded-full bg-white/50" />
            {[0, 1, 2].map((j) => (
              <div key={j} className="mb-[8%] rounded-xl bg-white/15 p-[8%]">
                <div className="mb-2 h-1.5 w-3/4 rounded-full bg-white/50" />
                <div className="h-1.5 w-1/2 rounded-full bg-white/30" />
              </div>
            ))}
            <div className="h-6 rounded-full bg-white/70" />
          </div>
        ))}
      </div>
      <span
        className="display absolute top-[8%] left-[6%] text-3xl text-white/90 md:text-4xl"
        aria-hidden="true"
      >
        {name}
      </span>
    </div>
  )
}
