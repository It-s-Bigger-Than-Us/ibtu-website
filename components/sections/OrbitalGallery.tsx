'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

interface GalleryItem {
  src: string
  title: string
  program?: string
  date?: string
}

interface OrbitalGalleryProps {
  items: GalleryItem[]
  title?: string
}

/* ── Single image plane floating in 3D space ── */
function ImagePlane({ item, position, rotation, index }: {
  item: GalleryItem
  position: [number, number, number]
  rotation: [number, number, number]
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(item.src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      setTexture(tex)
    })
  }, [item.src])

  useFrame((state) => {
    if (!meshRef.current) return
    // Gentle floating motion
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.15
    // Scale on hover
    const targetScale = hovered ? 1.15 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <planeGeometry args={[2.4, 1.6]} />
      {texture ? (
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      ) : (
        <meshBasicMaterial color="#FFC700" side={THREE.DoubleSide} />
      )}

      {/* Title overlay on hover — gold bar at bottom */}
      {hovered && (
        <Html
          position={[0, -0.95, 0.01]}
          center
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        >
          <div style={{
            background: '#FFC700',
            color: '#000',
            padding: '6px 16px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderRadius: '4px',
          }}>
            {item.title}
            {item.program && <span style={{ marginLeft: '8px', opacity: 0.6 }}>/ {item.program}</span>}
          </div>
        </Html>
      )}
    </mesh>
  )
}

/* ── Rotating ring of images ── */
function ImageRing({ items, radius, yOffset, speed }: {
  items: GalleryItem[]
  radius: number
  yOffset: number
  speed: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed
    }
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const rotY = -angle + Math.PI / 2

        return (
          <ImagePlane
            key={i}
            item={item}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
            index={i}
          />
        )
      })}
    </group>
  )
}

/* ── Camera auto-rotation ── */
function AutoRotate() {
  const { camera } = useThree()
  useFrame((state) => {
    // Gentle auto-orbit when not interacting
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 8
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 8
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Main gallery component ── */
export default function OrbitalGallery({ items, title }: OrbitalGalleryProps) {
  // Split items into two rings
  const ring1Items = items.slice(0, Math.ceil(items.length / 2))
  const ring2Items = items.slice(Math.ceil(items.length / 2))

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      background: '#000',
      overflow: 'hidden',
    }}>
      {/* Section label */}
      {title && (
        <div style={{
          position: 'absolute',
          top: '48px',
          left: 'clamp(32px, 5vw, 80px)',
          zIndex: 10,
          fontFamily: "'Poppins', sans-serif",
          fontSize: '10px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: '#FFC700',
        }}>
          {title}
        </div>
      )}

      {/* Drag hint */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        fontFamily: "'Poppins', sans-serif",
        fontSize: '10px',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: '#FFC700',
        fontWeight: 600,
      }}>
        Drag to explore
      </div>

      <Canvas
        camera={{ position: [0, 2, 8], fov: 55 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.2} />

        {/* Outer ring — slow rotation */}
        <ImageRing
          items={ring1Items}
          radius={5}
          yOffset={0.3}
          speed={0.002}
        />

        {/* Inner ring — opposite rotation */}
        {ring2Items.length > 0 && (
          <ImageRing
            items={ring2Items}
            radius={3.2}
            yOffset={-0.3}
            speed={-0.003}
          />
        )}

        {/* Center gold sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#FFC700" />
        </mesh>

        {/* User controls — drag to orbit */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={14}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
    </section>
  )
}
