'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Suspense, useCallback, useMemo, useRef } from 'react'
import { DoubleSide, Object3D } from 'three'

/* ═══════════════════════════════════════
   ORBITAL GALLERY — 3D image sphere
   Auto-spins gently. Drag to rotate.
   Page scroll passes through normally.
   Adapted from matdn/helmet (MIT).
═══════════════════════════════════════ */

const GALLERY_IMAGES = [
  '/images/b2s/_D5A7392.jpg',
  '/images/b2s/_D5A5912.jpg',
  '/images/coastal/IMG_4838.jpg',
  '/images/coastal/IMG_0267.jpg',
  '/images/school/IMG_5608.jpg',
  '/images/school/IMG_4674.jpg',
  '/images/wellness/IMG_9922.jpg',
  '/images/wellness/IMG_0279.jpg',
  '/images/landscape/IMG_5943.jpg',
  '/images/landscape/_D5A8515.jpg',
  '/images/landscape/IMG_5727.jpg',
  '/images/gallery/IMG_1311.jpg',
  '/images/pillars/crisis-1.jpg',
  '/images/pillars/school-2.jpg',
  '/images/pillars/community-1.jpg',
]

function ImageSphere({ angleY }: { angleY: React.MutableRefObject<number> }) {
  const groupRef = useRef<Object3D>(null)
  const textures = useTexture(GALLERY_IMAGES)

  const radius = 4.25
  const tileCount = GALLERY_IMAGES.length * 5

  const tiles = useMemo(() => {
    const out: Array<{ x: number; y: number; z: number; texIndex: number }> = []
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < tileCount; i++) {
      const t = i / (tileCount - 1)
      const y = 1 - t * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = goldenAngle * i
      out.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius * 0.92,
        z: Math.sin(theta) * r * radius,
        texIndex: i % GALLERY_IMAGES.length,
      })
    }
    return out
  }, [])

  useFrame((_state, dt) => {
    angleY.current += 0.12 * dt
    if (groupRef.current) {
      groupRef.current.rotation.y = angleY.current
    }
  })

  return (
    <group ref={groupRef}>
      {tiles.map(({ x, y, z, texIndex }, i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          ref={(obj) => { if (obj) obj.lookAt(0, 0, 0) }}
        >
          <planeGeometry args={[0.72, 1.0]} />
          <meshBasicMaterial map={textures[texIndex]} toneMapped={false} side={DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export default function OrbitalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const angleY = useRef(0)
  const isDragging = useRef(false)
  const dragLastX = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    dragLastX.current = e.clientX
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragLastX.current
    dragLastX.current = e.clientX
    angleY.current += dx * 0.005
  }, [])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <section
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{
        width: '100%',
        height: '100vh',
        background: 'var(--ibtu-black)',
        cursor: 'grab',
        position: 'relative',
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        onCreated={({ camera }) => { camera.lookAt(0, 0, 0) }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <ImageSphere angleY={angleY} />
        </Suspense>
      </Canvas>
    </section>
  )
}
