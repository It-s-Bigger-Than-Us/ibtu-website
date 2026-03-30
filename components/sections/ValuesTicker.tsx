interface ValuesTickerProps {
  values: string[]
  speed?: number // seconds for one full cycle, default 30
}

export default function ValuesTicker({ values, speed = 30 }: ValuesTickerProps) {
  return (
    <div className="ticker-wrap">
      <div
        className="ticker-track"
        style={{ '--ticker-duration': `${speed}s` } as React.CSSProperties}
      >
        {values.map((value, i) => (
          <span key={i} className="ticker-item">
            {value}
          </span>
        ))}
        {values.map((value, i) => (
          <span key={`dup-${i}`} className="ticker-item">
            {value}
          </span>
        ))}
      </div>
    </div>
  )
}
