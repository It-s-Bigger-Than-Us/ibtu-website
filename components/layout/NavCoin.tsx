'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/* ═══════════════════════════════════════
   NAV COIN — 3D spinning gold coin
   No font dependencies — uses geometry only
═══════════════════════════════════════ */

function SpinningCoin({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const speedRef = useRef(0.3)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const targetSpeed = hovered ? 2.5 : 0.3
    speedRef.current += (targetSpeed - speedRef.current) * 0.05
    groupRef.current.rotation.y += delta * speedRef.current
  })

  return (
    <group ref={groupRef}>
      {/* Main coin body */}
      <RoundedBox args={[1.6, 1.6, 0.15]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial
          color="#FFC700"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Center emblem — geometric IBTU mark */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[0.6, 0.6, 0.02]} />
        <meshPhysicalMaterial color="#000000" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Inner gold square */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.4, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#FFC700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Iridescent rim ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.04, 16, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.3}
          roughness={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Edge detail dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.85,
              Math.sin(angle) * 0.85,
              0,
            ]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshPhysicalMaterial color="#000000" />
          </mesh>
        )
      })}
    </group>
  )
}

interface NavCoinProps {
  size?: number
  hovered?: boolean
}

export default function NavCoin({ size = 64, hovered = false }: NavCoinProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: 'var(--ibtu-gold)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -2, 4]} intensity={0.4} color="#FFE066" />
        <SpinningCoin hovered={hovered} />
      </Canvas>
    </div>
  )
}
