'use client'

import { Canvas, type ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { Environment, useTexture } from '@react-three/drei'
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide, Object3D, Vector2 } from 'three'

/* ═══════════════════════════════════════
   ORBITAL GALLERY — 3D image sphere
   Drag/scroll to rotate. Images arranged
   on a sphere using golden-angle distribution.
   Adapted from matdn/helmet (MIT).
═══════════════════════════════════════ */

const GALLERY_IMAGES = [
  // b2s
  '/images/b2s/_D5A7392.jpg',
  '/images/b2s/_D5A5912.jpg',
  // coastal
  '/images/coastal/IMG_4838.jpg',
  '/images/coastal/IMG_0267.jpg',
  // school
  '/images/school/IMG_5608.jpg',
  '/images/school/IMG_4674.jpg',
  // wellness
  '/images/wellness/IMG_9922.jpg',
  '/images/wellness/IMG_0279.jpg',
  // landscape
  '/images/landscape/IMG_5943.jpg',
  '/images/landscape/_D5A8515.jpg',
  '/images/landscape/IMG_5727.jpg',
  // gallery
  '/images/gallery/IMG_1311.jpg',
  // pillars
  '/images/pillars/crisis-1.jpg',
  '/images/pillars/school-2.jpg',
  '/images/pillars/community-1.jpg',
]

function AlwaysInvalidate() {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    let raf = 0
    const tick = () => { invalidate(); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [invalidate])
  return null
}

function ImageSphere({
  spinVelX, spinVelY, angleX, angleY,
  isDragging, snapActive, snapTargetX, snapTargetY,
}: {
  spinVelX: React.MutableRefObject<number>
  spinVelY: React.MutableRefObject<number>
  angleX: React.MutableRefObject<number>
  angleY: React.MutableRefObject<number>
  isDragging: React.MutableRefObject<boolean>
  snapActive: React.MutableRefObject<boolean>
  snapTargetX: React.MutableRefObject<number>
  snapTargetY: React.MutableRefObject<number>
}) {
  const groupRef = useRef<Object3D>(null)
  const textures = useTexture(GALLERY_IMAGES)

  const radius = 4.25
  const tileW = 0.72
  const tileH = 1.0
  const tileCount = GALLERY_IMAGES.length * 8

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

  const wrapPi = (a: number) => {
    const twoPi = Math.PI * 2
    let v = (a + Math.PI) % twoPi
    if (v < 0) v += twoPi
    return v - Math.PI
  }

  useFrame((_state, dt) => {
    const damping = 0.92
    spinVelX.current *= Math.pow(damping, dt * 60)
    spinVelY.current *= Math.pow(damping, dt * 60)
    spinVelX.current = Math.max(-3, Math.min(3, spinVelX.current))
    spinVelY.current = Math.max(-3, Math.min(3, spinVelY.current))

    angleX.current += spinVelX.current * dt
    angleY.current += spinVelY.current * dt

    const maxPitch = 0.9
    angleX.current = Math.max(-maxPitch, Math.min(maxPitch, angleX.current))

    if (snapActive.current && !isDragging.current) {
      spinVelX.current *= 0.92
      spinVelY.current *= 0.92
      const alpha = 1 - Math.pow(0.92, dt * 60)
      const yawDiff = wrapPi(snapTargetY.current - angleY.current)
      angleX.current += (snapTargetX.current - angleX.current) * alpha
      angleY.current += yawDiff * alpha
      if (Math.abs(yawDiff) < 0.0025 && Math.abs(snapTargetX.current - angleX.current) < 0.0025) {
        angleX.current = snapTargetX.current
        angleY.current += wrapPi(snapTargetY.current - angleY.current)
        spinVelX.current = 0
        spinVelY.current = 0
        snapActive.current = false
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = angleX.current
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
          <planeGeometry args={[tileW, tileH]} />
          <meshBasicMaterial map={textures[texIndex]} toneMapped={false} side={DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export default function OrbitalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spinVelX = useRef(0)
  const spinVelY = useRef(0.15) // gentle initial spin
  const angleX = useRef(0)
  const angleY = useRef(0)
  const isDragging = useRef(false)
  const dragPid = useRef<number | null>(null)
  const dragLastX = useRef(0)
  const dragLastY = useRef(0)
  const dragLastT = useRef(0)
  const snapActive = useRef(false)
  const snapTargetX = useRef(0)
  const snapTargetY = useRef(0)

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    snapActive.current = false
    isDragging.current = true
    dragPid.current = e.pointerId
    dragLastX.current = e.clientX
    dragLastY.current = e.clientY
    dragLastT.current = e.timeStamp
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || dragPid.current !== e.pointerId) return
    const dx = e.clientX - dragLastX.current
    const dy = e.clientY - dragLastY.current
    const dtMs = e.timeStamp - dragLastT.current
    dragLastX.current = e.clientX
    dragLastY.current = e.clientY
    dragLastT.current = e.timeStamp

    const scale = 0.003
    angleY.current += dx * scale
    angleX.current += -dy * scale
    angleX.current = Math.max(-0.9, Math.min(0.9, angleX.current))

    if (dtMs > 0) {
      const dt = dtMs / 1000
      spinVelX.current = Math.max(-4, Math.min(4, -dy * scale / dt))
      spinVelY.current = Math.max(-4, Math.min(4, dx * scale / dt))
    }
  }, [])

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    isDragging.current = false
    const pid = dragPid.current
    dragPid.current = null
    if (pid != null) {
      try { e.currentTarget.releasePointerCapture(pid) } catch {}
    }
  }, [])

  const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    spinVelY.current += e.deltaY * 0.004
  }, [])

  return (
    <section
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onWheel={onWheel}
      style={{
        width: '100%',
        height: '100vh',
        background: 'var(--ibtu-black)',
        cursor: 'grab',
        position: 'relative',
        touchAction: 'none',
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        onCreated={({ camera }) => { camera.lookAt(0, 0, 0) }}
      >
        <Suspense fallback={null}>
          <AlwaysInvalidate />
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <Environment preset="studio" blur={10} />
          <ImageSphere
            spinVelX={spinVelX}
            spinVelY={spinVelY}
            angleX={angleX}
            angleY={angleY}
            isDragging={isDragging}
            snapActive={snapActive}
            snapTargetX={snapTargetX}
            snapTargetY={snapTargetY}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}
