"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function LogoCoin() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow infinite spin
      meshRef.current.rotation.y += 0.008;
      // Gentle wobble
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group>
      {/* Main coin disc */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 64]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#FFC700"
          metalness={0.9}
          roughness={0.1}
          iridescence={1}
          iridescenceIOR={1.8}
          iridescenceThicknessRange={[200, 600]}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
        />
      </mesh>

      {/* IBTU text on front */}
      <Text
        position={[0, 0, 0.07]}
        fontSize={0.55}
        font="/fonts/Poppins-Black.ttf"
        color="#000000"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        IBTU
      </Text>

      {/* Ring around the edge */}
      <mesh>
        <torusGeometry args={[1.2, 0.03, 16, 64]} />
        <meshPhysicalMaterial
          color="#FFC700"
          metalness={1}
          roughness={0}
          iridescence={1}
          iridescenceIOR={2}
          iridescenceThicknessRange={[100, 400]}
        />
      </mesh>
    </group>
  );
}

export default function IridescentLogo({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-3, -2, 4]} intensity={0.8} color="#c4a0ff" />
        <pointLight position={[0, 3, 2]} intensity={1} color="#FFC700" />
        <LogoCoin />
      </Canvas>
    </div>
  );
}
