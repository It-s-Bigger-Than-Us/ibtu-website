'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Box3,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  Vector3,
} from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

/* ═══════════════════════════════════════
   IBTU LOGO 3D — extruded SVG with glass material
   Same reflective/metallic look as the helmet
   from matdn/helmet (MeshPhysicalMaterial).
═══════════════════════════════════════ */

const SVG_RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 995.67 995.67">
  <path d="M956.59,304.1c-37.83-89.38-100.82-165.25-180.43-219.09C696.76,31.39,600.93,0,497.83,0c-68.59,0-134.28,13.93-193.73,39.08-89.38,37.83-165.25,100.81-219.09,180.43C31.39,298.91,0,394.94,0,497.83c0,68.59,13.93,134.28,39.08,193.73,37.83,89.39,100.81,165.26,180.43,219.09,79.4,53.63,175.44,85.02,278.33,85.02,68.59,0,134.28-13.93,193.73-39.08,89.39-37.83,165.26-100.82,219.09-180.43,53.63-79.41,85.02-175.44,85.02-278.33,0-68.59-13.93-134.28-39.08-193.73ZM912.53,673.06c-34.09,80.65-91.26,149.46-163.18,198.1-71.92,48.43-158.39,76.91-251.52,76.91-62.15,0-121.39-12.68-175.23-35.33-80.65-34.09-149.45-91.26-198.09-163.18-48.43-71.92-76.91-158.39-76.91-251.52,0-62.15,12.68-121.39,35.34-175.23,34.09-80.65,91.25-149.45,163.17-198.09,71.92-48.43,158.4-76.91,251.52-76.91,62.15,0,121.4,12.68,175.23,35.34,80.65,34.09,149.46,91.25,198.1,163.17,48.43,71.92,76.91,158.39,76.91,251.52,0,62.15-12.68,121.4-35.33,175.23Z"/>
  <path d="M799.24,228.65l-33.89-33.68-267.52,267.32L230.31,194.97l-33.67,33.68,267.52,267.52-267.52,267.52,33.67,33.67,267.52-267.31,267.52,267.31,33.89-33.67-267.53-267.52,267.53-267.52Z"/>
  <path d="M182.92,369.79h57.79v254.22h-57.79v-254.22Z"/>
  <path d="M409.28,84.6h108.71c46.15,0,79.2,30.56,79.2,72.34,0,19.33-9.35,36.79-24.32,49.47,20.79,11.85,34.51,31.18,34.51,55.5,0,42.2-33.05,76.91-82.11,76.91h-116.61l.83-254.22h-.21ZM513.84,186.66c15.59,0,27.23-11.22,27.23-26.82s-11.64-26.81-27.23-26.81h-51.14v53.84h51.14v-.21ZM518.2,290.59c19.33,0,32.43-13.1,32.43-29.1,0-17.46-13.09-29.1-32.43-29.1h-55.5v58.2h55.5Z"/>
  <path d="M753.09,443.99h-68.39v-53.63h193.94v53.63h-68.18v200.59h-57.37v-200.59Z"/>
  <path d="M386.42,800.28v-145.3h57.38v141.97c0,49.47,26.6,65.06,53.42,65.06s53.42-15.59,53.42-65.06v-141.97h57.37v145.3c0,82.52-45.94,115.16-110.79,115.16s-110.79-32.64-110.79-115.16Z"/>
</svg>`

interface IBTULogo3DProps {
  angleY: React.MutableRefObject<number>
}

export default function IBTULogo3D({ angleY }: IBTULogo3DProps) {
  const groupRef = useRef<Group>(null)

  const glassMaterial = useMemo(
    () =>
      new MeshPhysicalMaterial({
        thickness: 0.9,
        roughness: 0.0,
        metalness: 1,
        ior: 1.9,
        clearcoat: 0.1,
        clearcoatRoughness: 1.1,
        color: 0x222222,
        transparent: true,
        opacity: 0.95,
        depthWrite: true,
        side: DoubleSide,
      }),
    []
  )

  const meshes = useMemo(() => {
    const loader = new SVGLoader()
    const svgData = loader.parse(SVG_RAW)
    const result: { geometry: ExtrudeGeometry }[] = []

    for (const path of svgData.paths) {
      const shapes = SVGLoader.createShapes(path)
      for (const shape of shapes) {
        const geo = new ExtrudeGeometry(shape, {
          depth: 40,
          bevelEnabled: true,
          bevelThickness: 8,
          bevelSize: 4,
          bevelOffset: 0,
          bevelSegments: 3,
        })
        result.push({ geometry: geo })
      }
    }

    return result
  }, [])

  // Center and scale after mount
  useEffect(() => {
    if (!groupRef.current || meshes.length === 0) return

    // Compute bounding box of all meshes together
    const box = new Box3()
    groupRef.current.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.geometry.computeBoundingBox()
        const childBox = child.geometry.boundingBox
        if (childBox) box.union(childBox)
      }
    })

    const center = new Vector3()
    box.getCenter(center)
    const size = new Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 1.4
    const s = targetSize / maxDim

    groupRef.current.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.geometry.translate(-center.x, -center.y, -center.z)
        child.geometry.scale(s, -s, s) // flip Y (SVG is Y-down)
      }
    })

    return () => {
      glassMaterial.dispose()
      meshes.forEach((m) => m.geometry.dispose())
    }
  }, [meshes, glassMaterial])

  useFrame((_state, dt) => {
    if (!groupRef.current) return
    // Counter-rotate so logo faces camera while sphere spins
    groupRef.current.rotation.y = -angleY.current
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
  })

  return (
    <group ref={groupRef}>
      {meshes.map((m, i) => (
        <mesh key={i} geometry={m.geometry} material={glassMaterial} />
      ))}
    </group>
  )
}
