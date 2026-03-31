'use client'

import { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image as DreiImage, Text, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ═══════════════════════════════════════
   CONSTELLATION GALLERY — 3D scattered photo cloud
   Cursor-driven rotation, passive drift,
   click-to-expand, gold logo center with holo ring
═══════════════════════════════════════ */

interface GalleryItem {
  src: string
  title?: string
  program?: string
}

// ── Individual floating photo ──
function FloatingPhoto({
  src,
  position,
  rotation,
  size,
  onClick,
  isSelected,
  isOtherSelected,
}: {
  src: string
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
  onClick: () => void
  isSelected: boolean
  isOtherSelected: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    time.current += delta

    // Gentle floating motion
    meshRef.current.position.y =
      position[1] + Math.sin(time.current * 0.5 + position[0]) * 0.08

    // Target opacity based on selection state
    const targetOpacity = isOtherSelected && !isSelected ? 0.15 : 1
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    if (mat.opacity !== undefined) {
      mat.opacity += (targetOpacity - mat.opacity) * 0.08
    }

    // If selected, animate to center
    if (isSelected) {
      meshRef.current.position.x += (0 - meshRef.current.position.x) * 0.06
      meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.06
      meshRef.current.position.z += (2 - meshRef.current.position.z) * 0.06
      meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.06
      meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.06
      meshRef.current.scale.x += (2.5 - meshRef.current.scale.x) * 0.06
      meshRef.current.scale.y += (2.5 - meshRef.current.scale.y) * 0.06
    } else {
      meshRef.current.position.x += (position[0] - meshRef.current.position.x) * 0.04
      meshRef.current.position.z += (position[2] - meshRef.current.position.z) * 0.04
      meshRef.current.scale.x += (1 - meshRef.current.scale.x) * 0.06
      meshRef.current.scale.y += (1 - meshRef.current.scale.y) * 0.06
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <planeGeometry args={size} />
      <meshBasicMaterial transparent opacity={1}>
        <DreiImage
          url={src}
          transparent
          opacity={1}
          scale={size}
          position={[0, 0, 0.001]}
        />
      </meshBasicMaterial>
    </mesh>
  )
}

// ── Center logo with holographic ring ──
function CenterLogo() {
  const ringRef = useRef<THREE.Mesh>(null)
  const logoRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (logoRef.current) {
      logoRef.current.rotation.y += delta * 0.3
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15
    }
  })

  return (
    <group>
      {/* Holographic ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.5, 0.04, 32, 128]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.2}
          chromaticAberration={0.8}
          anisotropy={0.5}
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#ffffff"
          transmissionSampler={false}
        />
      </mesh>

      {/* Gold center disc */}
      <group ref={logoRef}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 32]} />
          <meshPhysicalMaterial
            color="#FFC700"
            metalness={0.85}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <Text
          position={[0, 0, 0.025]}
          fontSize={0.12}
          font="/fonts/Poppins-Black.ttf"
          color="#000000"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          IBTU
        </Text>
      </group>
    </group>
  )
}

// ── Scene with cursor tracking ──
function ConstellationScene({
  items,
  selectedIndex,
  onSelect,
}: {
  items: GalleryItem[]
  selectedIndex: number | null
  onSelect: (i: number | null) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const driftAngle = useRef(0)

  // Generate scattered positions
  const positions = useMemo(() => {
    return items.map((_, i) => {
      const angle = (i / items.length) * Math.PI * 2
      const radius = 1.8 + Math.random() * 2.5
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2
      const y = (Math.random() - 0.5) * 3
      const z = (Math.random() - 0.5) * 2.5

      // Size variation: 60% small, 30% medium, 10% large
      const sizeRoll = Math.random()
      const w = sizeRoll < 0.6 ? 0.8 : sizeRoll < 0.9 ? 1.1 : 1.4
      const h = w * 0.75

      const rx = (Math.random() - 0.5) * 0.3
      const ry = (Math.random() - 0.5) * 0.3

      return {
        position: [x, y, z] as [number, number, number],
        rotation: [rx, ry, 0] as [number, number, number],
        size: [w, h] as [number, number],
      }
    })
  }, [items.length])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Cursor-driven rotation
    const pointer = state.pointer
    const targetX = pointer.y * 0.2
    const targetY = pointer.x * 0.3

    // When idle, auto-drift
    driftAngle.current += delta * 0.05

    const finalX = targetX || Math.sin(driftAngle.current) * 0.05
    const finalY = targetY || driftAngle.current * 0.3

    groupRef.current.rotation.x += (finalX - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y += (finalY - groupRef.current.rotation.y) * 0.03
  })

  return (
    <group ref={groupRef}>
      <CenterLogo />
      {items.map((item, i) => (
        <FloatingPhoto
          key={i}
          src={item.src}
          position={positions[i].position}
          rotation={positions[i].rotation}
          size={positions[i].size}
          onClick={() => onSelect(selectedIndex === i ? null : i)}
          isSelected={selectedIndex === i}
          isOtherSelected={selectedIndex !== null && selectedIndex !== i}
        />
      ))}
    </group>
  )
}

// ── Main component ──
interface ConstellationGalleryProps {
  items: GalleryItem[]
  title?: string
}

export default function ConstellationGallery({
  items,
  title = '(EXPLORE OUR IMPACT)',
}: ConstellationGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = useCallback((i: number | null) => {
    setSelectedIndex(i)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        background: 'var(--ibtu-black)',
        overflow: 'hidden',
      }}
      onClick={() => selectedIndex !== null && setSelectedIndex(null)}
    >
      {/* Section label */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(24px, 4vw, 48px)',
          left: 'clamp(32px, 5vw, 80px)',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(10px, 0.8vw, 12px)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--ibtu-gold)',
          }}
        >
          {title}
        </span>
      </div>

      {/* Screen reader alternative for 3D gallery */}
      <div className="sr-only" role="list" aria-label="Photo gallery">
        {items.map((item, i) => (
          <div key={i} role="listitem">
            {item.title || item.program || `Photo ${i + 1}`}
          </div>
        ))}
      </div>

      {/* Selected photo info overlay */}
      {selectedIndex !== null && items[selectedIndex] && (
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 4vw, 60px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            background: 'var(--ibtu-gold)',
            padding: '16px 32px',
            borderRadius: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2vw, 28px)',
              textTransform: 'uppercase',
              color: 'var(--ibtu-black)',
            }}
          >
            {items[selectedIndex].title || items[selectedIndex].program || ''}
          </span>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, 3, -3]} intensity={0.4} color="#FFC700" />

        <ConstellationScene
          items={items}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />
      </Canvas>
    </section>
  )
}
