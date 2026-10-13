import { profile } from '../data/profile'

type Props = {
  size?: number
  className?: string
  /** Show the green "available" dot */
  status?: boolean
}

/** Profile photo, or initials on a warm gradient until a photo is added. */
export default function Avatar({ size = 32, className = '', status = false }: Props) {
  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {profile.avatar ?? profile.photo ? (
        <img
          src={profile.avatar ?? profile.photo}
          alt={profile.name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center rounded-full font-semibold text-white"
          style={{
            fontSize: size * 0.36,
            background: 'linear-gradient(135deg, #ff7a45 0%, #b93f0b 55%, #2b1a12 100%)',
          }}
        >
          GA
        </span>
      )}
      {status && (
        <span
          className="absolute right-0 bottom-0 block rounded-full bg-[#22c55e] ring-2 ring-surface"
          style={{ width: size * 0.28, height: size * 0.28 }}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
