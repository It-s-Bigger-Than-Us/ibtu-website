'use client'

interface SectionLabelProps {
  label: string
  count?: number | string
  color?: 'gold' | 'black' | 'white'
}

export default function SectionLabel({ label, count, color = 'gold' }: SectionLabelProps) {
  const colorMap = {
    gold: 'var(--gold)',
    black: '#000',
    white: '#fff',
  }

  return (
    <div className="section-label" style={{ color: colorMap[color] }}>
      ({label}){count !== undefined && <span className="section-label-count">({String(count).padStart(2, '0')})</span>}
    </div>
  )
}
