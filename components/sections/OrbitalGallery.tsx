'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'

interface GalleryItem {
  src: string
  title: string
  program?: string
  programSlug?: string
}

interface OrbitalGalleryProps {
  items: GalleryItem[]
  title?: string
}

/* ── Single image plane in 3D space ── */
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
    if (!item.src) return
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = 'anonymous'
    loader.load(item.src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearFilter
      setTexture(tex)
    }, undefined, () => {
      // On error, create a gold fallback
      const canvas = document.createElement('canvas')
      canvas.width = 480
      canvas.height = 320
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#FFC700'
        ctx.fillRect(0, 0, 480, 320)
        ctx.fillStyle = '#000'
        ctx.font = 'bold 24px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(item.title || 'IBTU', 240, 170)
      }
      const fallback = new THREE.CanvasTexture(canvas)
      setTexture(fallback)
    })
  }, [item.src, item.title])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.12
    const targetScale = hovered ? 1.2 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
    >
      <planeGeometry args={[2.8, 1.9]} />
      {hovered ? (
        <meshBasicMaterial color="#FFC700" side={THREE.DoubleSide} />
      ) : texture ? (
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      ) : (
        <meshBasicMaterial color="#FFC700" side={THREE.DoubleSide} />
      )}

      {/* Hover: gold with program name */}
      {hovered && (
        <Html position={[0, 0, 0.02]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: '#FFC700',
            color: '#000',
            padding: '12px 24px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
            {item.title}
            {item.program && (
              <div style={{ fontSize: '10px', fontWeight: 600, marginTop: '4px', letterSpacing: '3px' }}>
                {item.program} →
              </div>
            )}
          </div>
        </Html>
      )}
    </mesh>
  )
}

/* ── Rotating ring ── */
function ImageRing({ items, radius, yOffset, speed }: {
  items: GalleryItem[]
  radius: number
  yOffset: number
  speed: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += speed
  })

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {items.map((item, i) => {
        const angle = (i / items.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <ImagePlane
            key={i}
            item={item}
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            index={i}
          />
        )
      })}
    </group>
  )
}

/* ── Main component ── */
export default function OrbitalGallery({ items, title }: OrbitalGalleryProps) {
  const ring1 = items.slice(0, Math.ceil(items.length / 2))
  const ring2 = items.slice(Math.ceil(items.length / 2))

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      overflow: 'hidden',
      /* Sky/gradient background — warm sunset feel */
      background: 'linear-gradient(180deg, #1a0a00 0%, #0d0500 30%, #000 60%, #000 100%)',
    }}>
      {title && (
        <div style={{
          position: 'absolute', top: '48px', left: 'clamp(32px, 5vw, 80px)', zIndex: 10,
          fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
          textTransform: 'uppercase', fontWeight: 700, color: '#FFC700',
        }}>
          {title}
        </div>
      )}

      {/* Ribbon — gold bar with black text */}
      <div style={{
        position: 'absolute', bottom: '80px', left: 0, right: 0, zIndex: 10,
        background: '#FFC700', padding: '14px 0', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', width: 'max-content',
          animation: 'tickerScroll 20s linear infinite',
          fontFamily: "'LOT', 'Bebas Neue', sans-serif",
          fontSize: 'clamp(18px, 2.5vw, 32px)', textTransform: 'uppercase',
          color: '#000', letterSpacing: '4px', fontWeight: 700,
        }}>
          {Array(4).fill(null).map((_, i) => (
            <span key={i} style={{ padding: '0 48px', whiteSpace: 'nowrap' }}>
              Community is the Infrastructure &nbsp;/&nbsp; Designed with Dignity &nbsp;/&nbsp; We Listen, We Build, We Stay &nbsp;/&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
        fontFamily: "'Poppins', sans-serif", fontSize: '10px', letterSpacing: '3px',
        textTransform: 'uppercase', color: '#FFC700', fontWeight: 600,
      }}>
        Drag to explore
      </div>

      <Canvas camera={{ position: [0, 1.5, 8], fov: 55 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 5, 5]} intensity={0.5} color="#FFC700" />

        <ImageRing items={ring1} radius={5.5} yOffset={0.2} speed={0.0015} />
        {ring2.length > 0 && (
          <ImageRing items={ring2} radius={3.5} yOffset={-0.2} speed={-0.002} />
        )}

        {/* Gold center sphere — IBTU logo placeholder */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#FFC700" metalness={0.8} roughness={0.2} />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={14}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>
    </section>
  )
}
