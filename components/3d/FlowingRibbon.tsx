"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function Ribbon() {
  const ribbonRef = useRef<THREE.Mesh>(null);
  const backRef = useRef<THREE.Mesh>(null);

  // Create a curved ribbon geometry using a custom path
  const { frontGeom, backGeom } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 80;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = (t - 0.5) * 12;
      const y = Math.sin(t * Math.PI * 2.5) * 0.8;
      const z = Math.cos(t * Math.PI * 1.5) * 1.2;
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeom = new THREE.TubeGeometry(curve, 120, 0.01, 2, false);

    // Create a ribbon (flat strip) along the curve
    const ribbonWidth = 1.4;
    const curvePoints = curve.getPoints(120);
    const frames = curve.computeFrenetFrames(120);

    const positions: number[] = [];
    const indices: number[] = [];
    const uvs: number[] = [];

    for (let i = 0; i <= 120; i++) {
      const t = i / 120;
      const point = curvePoints[i];
      const normal = frames.normals[i];
      const binormal = frames.binormals[i];

      // Two vertices per curve point (left and right edge of ribbon)
      const halfW = ribbonWidth / 2;

      // Top edge
      positions.push(
        point.x + binormal.x * halfW,
        point.y + binormal.y * halfW,
        point.z + binormal.z * halfW
      );
      // Bottom edge
      positions.push(
        point.x - binormal.x * halfW,
        point.y - binormal.y * halfW,
        point.z - binormal.z * halfW
      );

      uvs.push(t, 0);
      uvs.push(t, 1);

      if (i < 120) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = (i + 1) * 2;
        const d = (i + 1) * 2 + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    // Back face is a clone with flipped normals
    const backGeom = geom.clone();

    return { frontGeom: geom, backGeom };
  }, []);

  useFrame((state) => {
    if (ribbonRef.current) {
      // Slow undulation
      ribbonRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      ribbonRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
    if (backRef.current) {
      backRef.current.rotation.y = ribbonRef.current?.rotation.y || 0;
      backRef.current.rotation.z = ribbonRef.current?.rotation.z || 0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Front face — black with iridescent text */}
      <mesh ref={ribbonRef} geometry={frontGeom}>
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.3}
          roughness={0.4}
          side={THREE.FrontSide}
          iridescence={0.8}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[200, 500]}
        />
      </mesh>

      {/* Back face — gold with program labels */}
      <mesh ref={backRef} geometry={backGeom}>
        <meshPhysicalMaterial
          color="#FFC700"
          metalness={0.6}
          roughness={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Text floating above the ribbon */}
      <Text
        position={[0, 0, 0.8]}
        fontSize={0.7}
        maxWidth={10}
        textAlign="center"
        font="/fonts/Poppins-Black.ttf"
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        COMMUNITY IS THE INFRASTRUCTURE
      </Text>
    </group>
  );
}

export default function FlowingRibbon() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#c4a0ff" />
        <pointLight position={[0, 2, 3]} intensity={0.8} color="#FFC700" />
        <Ribbon />
      </Canvas>
    </div>
  );
}
