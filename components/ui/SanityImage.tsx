import Image from 'next/image'

interface SanityImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  warmFilter?: boolean
}

export default function SanityImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  className = '',
  style,
  warmFilter = true,
}: SanityImageProps) {
  const filterStyle = warmFilter
    ? { filter: 'saturate(1.15) brightness(1.05) sepia(0.08)' }
    : {}

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={90}
        className={className}
        style={{
          objectFit: 'cover',
          ...filterStyle,
          ...style,
        }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      priority={priority}
      quality={90}
      className={className}
      style={{
        ...filterStyle,
        ...style,
      }}
    />
  )
}
