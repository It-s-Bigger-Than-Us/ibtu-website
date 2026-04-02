'use client'

/* ═══════════════════════════════════════
   PROGRAM ICONS — Solid filled SVG icons
   One per program. Bold, solid, NOT outline.
   Gold/black/white only. Inspired by IBTU
   flyer/marketing style.
═══════════════════════════════════════ */

type IconType = 'fire' | 'school' | 'youth' | 'beach' | 'gift' | 'wellness' | 'food'

interface ProgramIconProps {
  icon: IconType
  size?: number
  color?: string
}

const ICONS: Record<IconType, (color: string) => React.ReactNode> = {
  fire: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.551 1.27-4.672 2.47-6.388A28.3 28.3 0 0 0 9.5 6.5L12 2l2.5 4.5c.47.8 1.24 2.1 2.03 3.112C17.73 11.328 19 13.45 19 16c0 3.866-3.134 7-7 7zm0-2c2.761 0 5-2.239 5-5 0-1.655-.83-3.196-1.87-4.662A25 25 0 0 1 13.5 8.5L12 5.8l-1.5 2.7a25 25 0 0 1-1.63 2.838C7.83 12.804 7 14.345 7 16c0 2.761 2.239 5 5 5zm0-2a3 3 0 0 1-3-3c0-.874.367-1.71.95-2.55.35-.5.75-1 1.05-1.45.3.45.7.95 1.05 1.45.583.84.95 1.676.95 2.55a3 3 0 0 1-3 3z" />
    </svg>
  ),
  school: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zm0 14.42L7 14.8v-3.98L12 13.4l5-2.58v3.98l-5 2.62zm6.82-7.62L12 13.4 5.18 9.8 12 6.2l6.82 3.6z" />
    </svg>
  ),
  youth: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
  beach: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M13.127 14.56l1.43-1.43 6.44 6.443L19.57 21l-6.44-6.44zm-1.564-1.564L3.95 4.81a.999.999 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 0l8.178 8.178-2.686 2.129zM14.5 2C17.538 2 20 4.462 20 7.5c0 .58-.082 1.14-.246 1.668l-2.052-.678C17.882 8.041 18 7.563 18 7.5A3.5 3.5 0 0 0 14.5 4 3.5 3.5 0 0 0 11 7.5c0 .063.041.582.218 1.049l-.678 2.052A5.53 5.53 0 0 1 9 7.5C9 4.462 11.462 2 14.5 2zM2 21.5l4-1.5-2.5-2.5L2 21.5z" />
    </svg>
  ),
  gift: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
  ),
  wellness: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  food: (color) => (
    <svg viewBox="0 0 24 24" fill={color}>
      <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L4.43 19.14l1.41 1.41 7.07-7.07 1.41 1.41-7.07 7.07 1.41 1.41L15.73 16.3l4.19 4.19 1.41-1.41-10.45-10.43z" />
    </svg>
  ),
}

export default function ProgramIcon({ icon, size = 24, color = '#000' }: ProgramIconProps) {
  const renderIcon = ICONS[icon]
  if (!renderIcon) return null

  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {renderIcon(color)}
    </div>
  )
}
