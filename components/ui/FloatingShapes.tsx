'use client'

import { useEffect, useRef } from 'react'

/* ═══════════════════════════════════════
   FLOATING 3D SHAPES — CSS/SVG
   Hearts, orbs, cubes floating between sections.
   Pure CSS transforms + keyframe animations.
   Gold/black/white only. No R3F/Canvas.
═══════════════════════════════════════ */

interface Shape {
  type: 'heart' | 'orb' | 'cube'
  size: number
  x: number
  y: number
  delay: number
  duration: number
  color: string
}

function generateShapes(count: number, seed: number): Shape[] {
  const shapes: Shape[] = []
  const types: Shape['type'][] = ['heart', 'orb', 'cube']
  const colors = ['#FFC700', '#000', '#FFF']

  for (let i = 0; i < count; i++) {
    const hash = ((seed + i) * 2654435761) % 2147483647
    shapes.push({
      type: types[i % 3],
      size: 20 + (hash % 40),
      x: (hash % 100),
      y: 10 + ((hash * 3) % 80),
      delay: (i * 0.8) % 6,
      duration: 12 + (hash % 10),
      color: colors[(i + seed) % 3],
    })
  }
  return shapes
}

function HeartSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function OrbShape({ size, color }: { size: number; color: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color === '#FFC700'
          ? 'radial-gradient(circle at 30% 30%, #FFF, #FFC700, #FFC700)'
          : color === '#000'
            ? 'radial-gradient(circle at 30% 30%, #000, #000, #000)'
            : 'radial-gradient(circle at 30% 30%, #FFF, #FFF, #FFF)',
        boxShadow: color === '#FFC700'
          ? '0 0 20px #FFC700'
          : 'none',
      }}
    />
  )
}

function CubeShape({ size, color }: { size: number; color: string }) {
  const half = size / 2
  return (
    <div
      style={{
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
        animation: `cubeRotate 20s linear infinite`,
      }}
    >
      {/* Front face */}
      <div style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        border: `1px solid ${color === '#000' ? '#FFC700' : '#000'}`,
        borderRadius: '4px',
        transform: `translateZ(${half}px)`,
      }} />
      {/* Back face */}
      <div style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        border: `1px solid ${color === '#000' ? '#FFC700' : '#000'}`,
        borderRadius: '4px',
        transform: `rotateY(180deg) translateZ(${half}px)`,
      }} />
      {/* Right face */}
      <div style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        border: `1px solid ${color === '#000' ? '#FFC700' : '#000'}`,
        borderRadius: '4px',
        transform: `rotateY(90deg) translateZ(${half}px)`,
      }} />
      {/* Left face */}
      <div style={{
        position: 'absolute',
        width: size,
        height: size,
        background: color,
        border: `1px solid ${color === '#000' ? '#FFC700' : '#000'}`,
        borderRadius: '4px',
        transform: `rotateY(-90deg) translateZ(${half}px)`,
      }} />
    </div>
  )
}

interface FloatingShapesProps {
  count?: number
  seed?: number
  height?: string
  bgColor?: string
}

export default function FloatingShapes({
  count = 8,
  seed = 0,
  height = '120px',
  bgColor = 'transparent',
}: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const shapes = generateShapes(count, seed)

  useEffect(() => {
    // Shapes are CSS-animated, no JS needed
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        background: bgColor,
        pointerEvents: 'none',
      }}
    >
      {shapes.map((shape, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            animation: `floatShape ${shape.duration}s ease-in-out ${shape.delay}s infinite alternate`,
            transformStyle: 'preserve-3d',
            perspective: '200px',
          }}
        >
          {shape.type === 'heart' && <HeartSVG size={shape.size} color={shape.color} />}
          {shape.type === 'orb' && <OrbShape size={shape.size} color={shape.color} />}
          {shape.type === 'cube' && <CubeShape size={shape.size} color={shape.color} />}
        </div>
      ))}

      <style>{`
        @keyframes floatShape {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(-30px) translateX(15px) rotate(15deg);
          }
        }
        @keyframes cubeRotate {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}
