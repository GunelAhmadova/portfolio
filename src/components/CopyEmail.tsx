import { useState } from 'react'
import { profile } from '../data/profile'

type Props = { className?: string; label?: string }

/** Copies the email to the clipboard; falls back to mailto if that fails. */
export default function CopyEmail({ className = '', label = 'Copy email' }: Props) {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button type="button" onClick={onClick} className={className} aria-live="polite">
      {copied ? 'Copied to clipboard ✓' : label}
    </button>
  )
}
