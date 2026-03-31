'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   COMMUNITY RIBBON — 3D ribbon divider
   Iridescent holographic surface that twists
   and unfurls as user scrolls through it
═══════════════════════════════════════ */

function Ribbon({ scrollProgress }: { scrollProgress: { value: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

  // Generate ribbon curve
  const { geometry } = useMemo(() => {
    const points: THREE.Vector3[] = []
    const segments = 100

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const x = (t - 0.5) * 8
      const y = Math.sin(t * Math.PI * 2) * 0.4
      const z = Math.cos(t * Math.PI * 3) * 0.3
      points.push(new THREE.Vector3(x, y, z))
    }

    const curve = new THREE.CatmullRomCurve3(points)

    // Wider flat ribbon
    const ribbonWidth = 0.6
    const ribbonSegments = 200
    const widthSegments = 8

    const positions: number[] = []
    const normals: number[] = []
    const uvs: number[] = []
    const indices: number[] = []

    for (let i = 0; i <= ribbonSegments; i++) {
      const t = i / ribbonSegments
      const point = curve.getPointAt(t)
      const tangent = curve.getTangentAt(t)
      const up = new THREE.Vector3(0, 1, 0)
      const side = new THREE.Vector3().crossVectors(tangent, up).normalize()
      const normal = new THREE.Vector3().crossVectors(side, tangent).normalize()

      // Twist the ribbon
      const twistAngle = t * Math.PI * 1.5

      for (let j = 0; j <= widthSegments; j++) {
        const w = (j / widthSegments - 0.5) * ribbonWidth
        const cos = Math.cos(twistAngle)
        const sin = Math.sin(twistAngle)

        const px = point.x + side.x * w * cos + normal.x * w * sin
        const py = point.y + side.y * w * cos + normal.y * w * sin
        const pz = point.z + side.z * w * cos + normal.z * w * sin

        positions.push(px, py, pz)
        normals.push(normal.x, normal.y, normal.z)
        uvs.push(t, j / widthSegments)
      }
    }

    for (let i = 0; i < ribbonSegments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * (widthSegments + 1) + j
        const b = a + widthSegments + 1
        const c = a + 1
        const d = b + 1

        indices.push(a, b, c)
        indices.push(c, b, d)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geo.setIndex(indices)
    geo.computeVertexNormals()

    return { geometry: geo }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    // Unfurl based on scroll progress
    const progress = scrollProgress.value
    const scale = 0.3 + progress * 0.7

    meshRef.current.scale.set(scale, scale, scale)
    meshRef.current.rotation.z = (1 - progress) * Math.PI * 0.3

    // Gentle wave motion
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
  })

  return (
    <group ref={meshRef}>
      {/* Main ribbon — iridescent surface */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#111111"
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 800]}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Text on ribbon */}
      <Text
        position={[0, 0, 0.18]}
        fontSize={0.15}
        font="/fonts/Poppins-Black.ttf"
        color="#FFC700"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
        maxWidth={6}
      >
        COMMUNITY IS THE INFRASTRUCTURE
      </Text>
    </group>
  )
}

function RibbonScene({ scrollProgress }: { scrollProgress: { value: number } }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-3, -2, 4]} intensity={0.5} color="#B8A9FF" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#FF6B9D" />
      <Ribbon scrollProgress={scrollProgress} />
    </>
  )
}

export default function CommunityRibbon() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef({ value: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate(self) {
        scrollProgressRef.current.value = self.progress
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: 'clamp(200px, 25vw, 350px)',
        background: 'var(--ibtu-black)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true }}
      >
        <RibbonScene scrollProgress={scrollProgressRef.current} />
      </Canvas>
    </div>
  )
}
