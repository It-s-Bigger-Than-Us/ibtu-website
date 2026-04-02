'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Html } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import {
  DoubleSide, Vector3, NormalBlending, SRGBColorSpace,
  Mesh, Group,
} from 'three'
import type { ShaderMaterial as TShaderMaterial, Texture } from 'three'
import IBTULogo3D from './IBTULogo3D'

/* ═══════════════════════════════════════
   ORBITAL GALLERY
   Intro: logo fills frame → one rotation shrinks to top →
   photos come alive at 50% rotation with holographic glint.
   Wider, shorter, denser cylinder layout.
═══════════════════════════════════════ */

// 48 unique images — no repeats
const ALL_IMAGES = [
  '/images/b2s/_D5A7392.jpg', '/images/b2s/_D5A5912.jpg', '/images/b2s/_D5A7155.jpg',
  '/images/b2s/_D5A8212.jpg', '/images/b2s/_D5A6099.jpg', '/images/b2s/_D5A7604.jpg',
  '/images/b2s/_D5A7530.jpg', '/images/b2s/_D5A7957.jpg',
  '/images/coastal/IMG_4838.jpg', '/images/coastal/IMG_0267.jpg', '/images/coastal/IMG_1778.jpg',
  '/images/coastal/IMG_4805.jpg', '/images/coastal/IMG_4953.jpg', '/images/coastal/IMG_0024.jpg',
  '/images/coastal/IMG_1796.jpg', '/images/coastal/IMG_4775.jpg',
  '/images/gallery/IMG_1311.jpg', '/images/gallery/IMG_4353.jpg', '/images/gallery/IMG_4649.jpg',
  '/images/gallery/IMG_1673.jpg', '/images/gallery/IMG_4907.jpg', '/images/gallery/IMG_1790.jpg',
  '/images/gallery/IMG_1848.jpg', '/images/gallery/IMG_4672.jpg',
  '/images/school/IMG_5608.jpg', '/images/school/IMG_4674.jpg', '/images/school/IMG_6134.jpg',
  '/images/school/IMG_7067.jpg', '/images/school/IMG_5884.jpg', '/images/school/IMG_5843.jpg',
  '/images/school/IMG_6273.jpg', '/images/school/IMG_7169.jpg',
  '/images/wellness/IMG_9922.jpg', '/images/wellness/IMG_0279.jpg', '/images/wellness/IMG_1610.jpg',
  '/images/wellness/IMG_1554.jpg',
  '/images/landscape/IMG_5943.jpg', '/images/landscape/_D5A8515.jpg', '/images/landscape/IMG_5727.jpg',
  '/images/pillars/crisis-1.jpg',
  '/images/additional/_D5A5569.jpg', '/images/additional/_D5A7272.jpg', '/images/additional/_D5A8614.jpg',
  '/images/additional/_D5A8877.jpg', '/images/additional/_D5A9056.jpg', '/images/additional/_D5A8685.jpg',
  '/images/additional/_D5A8720.jpg', '/images/additional/_D5A8844.jpg',
]

const TOTAL = ALL_IMAGES.length // 48
const COLS = 8
const ROWS = 6
const RADIUS = 4.2
const ROW_HEIGHT = 1.8
const TUBE_HEIGHT = ROWS * ROW_HEIGHT
const GRID_RADIUS = RADIUS + 1.2
const INTRO_DURATION = 3 // seconds for intro animation

// 4:3 aspect ratio — no distortion
function imageSize(i: number): [number, number] {
  const s = ((i * 7 + 13) * 31) % 100
  if (s < 15) return [2.4, 1.8]    // large
  if (s < 40) return [1.8, 1.35]   // medium
  return [1.3, 0.975]              // standard
}

// ─── Grid Shaders ─────────────────────────────────

const gridVert = `
varying vec2 vUv;
varying vec3 vWorldPos;
void main() {
  vUv = uv;
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const gridFrag = `
precision highp float;
varying vec2 vUv;
varying vec3 vWorldPos;
uniform vec3 uPointer;
uniform float uTime;

float grid(float c, float w) {
  float d = abs(fract(c - 0.5) - 0.5);
  float fw = fwidth(c);
  return 1.0 - smoothstep(w * fw, (w + 1.5) * fw, d);
}

void main() {
  vec2 g = vUv * 36.0;
  float gx = grid(g.x, 1.0);
  float gy = grid(g.y, 1.0);
  float line = max(gx, gy);

  float dist = distance(vWorldPos, uPointer);
  float glow = smoothstep(4.0, 0.0, dist);

  // On hover: bright white light bloom with prismatic fringe
  float cr = sin(vWorldPos.x * 4.0 + uTime * 1.2) * 0.12 + 0.88;
  float cg = sin(vWorldPos.y * 4.0 + uTime * 1.2 + 2.09) * 0.12 + 0.88;
  float cb = sin(vWorldPos.z * 4.0 + uTime * 1.2 + 4.19) * 0.12 + 0.88;
  vec3 brightLight = vec3(cr, cg, cb) * 2.0;

  // Gold lines by default, blazing bright on hover
  vec3 gold = vec3(1.0, 0.78, 0.0);
  vec3 col = mix(gold * 0.15, brightLight, glow) * line;

  float edgeFade = smoothstep(0.0, 0.04, vUv.x) * smoothstep(1.0, 0.96, vUv.x)
                 * smoothstep(0.0, 0.04, vUv.y) * smoothstep(1.0, 0.96, vUv.y);

  float alpha = line * edgeFade;
  gl_FragColor = vec4(col, alpha);
}
`

// ─── Photo Shader (holographic glint border) ──────

const photoVert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const photoFrag = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMap;
uniform float uTime;
uniform float uOpacity;

void main() {
  vec4 tex = texture2D(uMap, vUv);

  // Frosted glass border — thicker for depth
  float bw = 0.035;
  float dx = min(vUv.x, 1.0 - vUv.x);
  float dy = min(vUv.y, 1.0 - vUv.y);
  float edge = min(dx, dy);
  float border = 1.0 - smoothstep(0.0, bw, edge);
  float innerEdge = 1.0 - smoothstep(0.0, bw * 0.4, edge); // sharper inner

  // Frosted glass base — white/silver with slight prismatic tint
  vec3 frost = vec3(0.88, 0.90, 0.94);

  // Prismatic refraction on border (like real glass edge)
  float phase = vUv.x * 4.0 + vUv.y * 2.0 + uTime * 1.2;
  float pr = sin(phase) * 0.5 + 0.5;
  float pg = sin(phase + 2.09) * 0.5 + 0.5;
  float pb = sin(phase + 4.19) * 0.5 + 0.5;
  vec3 prism = vec3(pr, pg, pb);

  // Sweeping glint highlight
  float sweep = fract(uTime * 0.2 + vUv.x * 0.5);
  float glint = smoothstep(0.0, 0.06, sweep) * smoothstep(0.12, 0.06, sweep);

  // Combine: frosted glass + prismatic edge + glint
  vec3 borderColor = mix(frost, prism * 0.6 + frost * 0.6, 0.4);
  borderColor += glint * prism * 0.5 * border;
  borderColor += innerEdge * vec3(1.0) * 0.15; // inner highlight for depth

  vec3 color = mix(tex.rgb, borderColor, border);

  gl_FragColor = vec4(color, uOpacity);
}
`

// ─── Cyber Grid ───────────────────────────────────

function CyberGrid({ pointerRef }: { pointerRef: React.MutableRefObject<Vector3> }) {
  const cylRef = useRef<TShaderMaterial>(null)
  const floorRef = useRef<TShaderMaterial>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const p = pointerRef.current
    if (cylRef.current) { cylRef.current.uniforms.uPointer.value.copy(p); cylRef.current.uniforms.uTime.value = t }
    if (floorRef.current) { floorRef.current.uniforms.uPointer.value.copy(p); floorRef.current.uniforms.uTime.value = t }
  })

  const mkU = () => ({ uPointer: { value: new Vector3(100, 100, 100) }, uTime: { value: 0 } })

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[GRID_RADIUS, GRID_RADIUS, TUBE_HEIGHT * 2, 64, 32, true]} />
        <shaderMaterial ref={cylRef} vertexShader={gridVert} fragmentShader={gridFrag}
          uniforms={mkU()} transparent side={DoubleSide} depthWrite={false} blending={NormalBlending} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -TUBE_HEIGHT * 0.7, 0]}>
        <planeGeometry args={[24, 24, 1, 1]} />
        <shaderMaterial ref={floorRef} vertexShader={gridVert} fragmentShader={gridFrag}
          uniforms={mkU()} transparent side={DoubleSide} depthWrite={false} blending={NormalBlending} />
      </mesh>
    </group>
  )
}

// ─── Image Plane (holographic glint border) ───────

function ImagePlane({ position, size, texMap, pointerRef, introOpacity }: {
  position: [number, number, number]
  size: [number, number]
  texMap: Texture
  pointerRef: React.MutableRefObject<Vector3>
  introOpacity: React.MutableRefObject<number>
}) {
  const meshRef = useRef<Mesh>(null)
  const matRef = useRef<TShaderMaterial>(null)
  const hovered = useRef(false)
  const scaleVal = useRef(1)

  useFrame(({ clock }, dt) => {
    if (!meshRef.current) return
    const t = hovered.current ? 1.3 : 1
    scaleVal.current += (t - scaleVal.current) * Math.min(dt * 8, 1)
    meshRef.current.scale.setScalar(scaleVal.current)
    if (hovered.current) meshRef.current.getWorldPosition(pointerRef.current)
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime
      matRef.current.uniforms.uOpacity.value = introOpacity.current
    }
  })

  return (
    <mesh
      ref={(m) => {
        meshRef.current = m
        // Face inward toward camera at center
        if (m) m.lookAt(0, position[1], 0)
      }}
      position={position}
      onPointerOver={(e) => { (e as { stopPropagation: () => void }).stopPropagation(); hovered.current = true; document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { hovered.current = false; pointerRef.current.set(100, 100, 100); document.body.style.cursor = '' }}
    >
      <planeGeometry args={size} />
      <shaderMaterial
        ref={matRef}
        vertexShader={photoVert}
        fragmentShader={photoFrag}
        uniforms={{
          uMap: { value: texMap },
          uTime: { value: 0 },
          uOpacity: { value: 0 },
        }}
        transparent
        side={DoubleSide}
      />
    </mesh>
  )
}

// ─── Image Tube ───────────────────────────────────

function ImageTube({ pointerRef, introOpacity }: {
  pointerRef: React.MutableRefObject<Vector3>
  introOpacity: React.MutableRefObject<number>
}) {
  const textures = useTexture(ALL_IMAGES)
  useMemo(() => { textures.forEach(t => { t.colorSpace = SRGBColorSpace }) }, [textures])

  const planes = useMemo(() => {
    const out: Array<{ pos: [number, number, number]; size: [number, number]; idx: number }> = []
    for (let i = 0; i < TOTAL; i++) {
      const row = Math.floor(i / COLS)
      const col = i % COLS
      const offset = (row % 2) * 0.5
      const theta = ((col + offset) / COLS) * Math.PI * 2
      out.push({
        pos: [Math.cos(theta) * RADIUS, (row - (ROWS - 1) / 2) * ROW_HEIGHT, Math.sin(theta) * RADIUS],
        size: imageSize(i),
        idx: i,
      })
    }
    return out
  }, [])

  return (
    <group>
      {planes.map((p) => (
        <ImagePlane key={p.idx} position={p.pos} size={p.size}
          texMap={textures[p.idx]} pointerRef={pointerRef} introOpacity={introOpacity} />
      ))}
    </group>
  )
}

// ─── Loading ──────────────────────────────────────

function Loading() {
  return (
    <Html center>
      <div style={{ color: '#FFC700', fontFamily: 'Poppins,sans-serif', fontSize: '13px',
        letterSpacing: '3px', textTransform: 'uppercase' as const, fontWeight: 700 }}>
        Loading&hellip;
      </div>
    </Html>
  )
}

// ─── Scene ────────────────────────────────────────

function Scene() {
  const tubeRef = useRef<Group>(null)
  const logoGroupRef = useRef<Group>(null)
  const pointerRef = useRef(new Vector3(100, 100, 100))
  const introOpacity = useRef(0)
  const logoGlowRef = useRef(0.15)
  const logoHovered = useRef(false)
  const elapsed = useRef(0)

  useFrame((_, dt) => {
    elapsed.current += dt

    // ── Intro (first 3s): logo shrinks + one rotation, photos fade in ──
    const introP = Math.min(elapsed.current / INTRO_DURATION, 1)
    const eased = 1 - Math.pow(1 - introP, 3)

    if (logoGroupRef.current) {
      // Logo stays centered. Starts large, shrinks to final size. One rotation.
      const logoScale = 3.0 - eased * 1.5 // 3.0 → 1.5
      const introRotY = eased * Math.PI * 2
      logoGroupRef.current.scale.setScalar(logoScale)
      logoGroupRef.current.position.y = 0 // stays centered
      logoGroupRef.current.rotation.y = introRotY
    }

    // Photos fade in at 50% of intro
    introOpacity.current = Math.min(1, Math.max(0, (introP - 0.5) / 0.5))

    // Logo glow on hover
    const glowTarget = logoHovered.current ? 0.8 : 0.15
    logoGlowRef.current += (glowTarget - logoGlowRef.current) * Math.min(dt * 5, 1)

    // ── After intro: very slow auto-rotation ──
    if (tubeRef.current) {
      tubeRef.current.rotation.y += dt * 0.04
    }
  })

  return (
    <>
      <color attach="background" args={['#FFC700']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1} />

      <group ref={tubeRef}>
        <CyberGrid pointerRef={pointerRef} />
        <Suspense fallback={<Loading />}>
          <ImageTube pointerRef={pointerRef} introOpacity={introOpacity} />
        </Suspense>
      </group>

      {/* 3D Logo — holographic, intro animation, glow on hover */}
      <group
        ref={logoGroupRef}
        onPointerOver={() => { logoHovered.current = true; document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { logoHovered.current = false; document.body.style.cursor = '' }}
      >
        <IBTULogo3D glowRef={logoGlowRef} />
      </group>
    </>
  )
}

// ─── Export ───────────────────────────────────────

// ─── Hero Text Overlay ────────────────────────────

function HeroTextOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const words = containerRef.current.querySelectorAll('.hero-word')
    if (!words.length) return

    const tl = gsap.timeline({ delay: 0.3 })

    // Words enter from alternating sides
    words.forEach((word, i) => {
      const fromLeft = i % 2 === 0
      tl.fromTo(
        word,
        { opacity: 0, x: fromLeft ? -200 : 200, rotateY: fromLeft ? -25 : 25 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: 'expo.out' },
        i * 0.15,
      )
    })

    // Fade out after 2.5s
    tl.to(containerRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in' }, '+=1.5')

    return () => { tl.kill() }
  }, [])

  const titleWords = ["It's", 'Bigger', 'Than', 'Us']

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        perspective: '800px',
        padding: '0 clamp(24px, 5vw, 80px)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 14vw, 220px)',
          lineHeight: 0.92,
          textTransform: 'uppercase',
          color: 'var(--ibtu-black)',
          letterSpacing: '-0.02em',
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 0.25em',
          maxWidth: '100%',
        }}
      >
        {titleWords.map((word, i) => (
          <span
            key={i}
            className="hero-word"
            style={{
              display: 'inline-block',
              opacity: 0,
              transformOrigin: 'center bottom',
            }}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  )
}

// ─── Export ───────────────────────────────────────

// ─── Export ───────────────────────────────────────

export default function OrbitalGallery() {
  return (
    <section style={{ height: '100vh', position: 'relative', background: '#FFC700', overflow: 'hidden' }}>
      <HeroTextOverlay />

      <Canvas
        camera={{ position: [0, 0, 0.01], fov: 90 }}
        gl={{ antialias: true, alpha: false }}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      >
        <Scene />
      </Canvas>
    </section>
  )
}
