'use client'

interface SectionLabelProps {
  label: string
  color?: 'gold' | 'black' | 'white'
}

export default function SectionLabel({ label, color = 'gold' }: SectionLabelProps) {
  const colorMap = {
    gold: 'var(--gold)',
    black: '#000',
    white: '#fff',
  }

  return (
    <div className="section-label" style={{ color: colorMap[color] }}>
      ({label})
    </div>
  )
}
