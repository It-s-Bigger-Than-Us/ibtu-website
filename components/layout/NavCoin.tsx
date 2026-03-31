'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

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

      {/* Front face text */}
      <Text
        position={[0, 0.15, 0.09]}
        fontSize={0.35}
        font="/fonts/Poppins-Black.ttf"
        color="#000000"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        IBTU
      </Text>
      <Text
        position={[0, -0.25, 0.09]}
        fontSize={0.1}
        font="/fonts/Poppins-Bold.ttf"
        color="#000000"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        EST. 2020
      </Text>

      {/* Back face text */}
      <Text
        position={[0, 0, -0.09]}
        fontSize={0.12}
        font="/fonts/Poppins-Bold.ttf"
        color="#000000"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        letterSpacing={0.08}
      >
        COMMUNITY IS{'\n'}THE INFRASTRUCTURE
      </Text>

      {/* Iridescent rim ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.04, 16, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.3}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#ffffff"
          transmissionSampler={false}
        />
      </mesh>

      {/* Edge detail — small dots around rim */}
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
