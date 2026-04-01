'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useTexture } from '@react-three/drei'
import { Suspense, useMemo, useRef } from 'react'
import { DoubleSide, Object3D } from 'three'
import IBTULogo3D from './IBTULogo3D'

/* ═══════════════════════════════════════
   ORBITAL GALLERY — 3D image sphere
   Auto-spins. No pointer interaction.
   Page scroll passes through.
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
  const angleY = useRef(0)

  return (
    <section
      style={{
        width: '100%',
        height: '100vh',
        background: 'var(--ibtu-black)',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          onCreated={({ camera }) => { camera.lookAt(0, 0, 0) }}
          style={{ pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.65} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Environment preset="studio" blur={10.5} />
            <ImageSphere angleY={angleY} />
            <IBTULogo3D angleY={angleY} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
