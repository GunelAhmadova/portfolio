import type { Project } from '../data/projects'

type Props = {
  project: Project
  className?: string
}

/**
 * Project cover: real image when `project.cover` is set, otherwise generated
 * cover art from the project's hue pair so the site never shows a broken box.
 */
export default function Cover({ project, className = '' }: Props) {
  if (project.cover) {
    return (
      <img
        src={project.cover}
        alt={`${project.title}, cover`}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    )
  }

  const [a, b] = project.hue
  const initial = project.title.charAt(0)

  return (
    <div
      role="img"
      aria-label={`${project.title}, cover placeholder`}
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${a} 0%, ${b} 100%)`,
      }}
    >
      {/* blueprint texture over the gradient */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <span
        className="display absolute -right-6 -bottom-10 select-none text-[12rem] font-bold text-black/15 md:text-[16rem]"
        aria-hidden="true"
      >
        {initial}
      </span>
      <span
        className="absolute top-5 left-5 rounded-full bg-black/60 px-3 py-1 font-mono text-xs tracking-wider text-white uppercase"
        aria-hidden="true"
      >
        {project.category}
      </span>
    </div>
  )
}
