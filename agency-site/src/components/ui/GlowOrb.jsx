import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function Sphere() {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(1, 1) },
  }), [])

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      // Organic surface displacement
      float displacement = snoise(position * 1.5 + uTime * 0.3) * 0.08;
      vec3 newPosition = position + normal * displacement;

      vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
      // Light direction influenced by mouse
      vec3 lightDir = normalize(vec3(uMouse.x * 2.0, uMouse.y * 2.0 + 1.0, 2.0));
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-lightDir, vNormal);

      // Diffuse lighting
      float diff = max(dot(vNormal, lightDir), 0.0);

      // Specular highlight
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.0);
      float spec2 = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);

      // Fresnel rim light
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

      // Base colors - pink/magenta/red gradient
      vec3 colorTop = vec3(0.85, 0.55, 1.0);     // purple-pink
      vec3 colorMid = vec3(1.0, 0.24, 0.87);      // magenta
      vec3 colorBot = vec3(1.0, 0.0, 0.3);         // red-pink

      // Mix based on normal Y + time variation
      float gradientPos = vNormal.y * 0.5 + 0.5 + sin(uTime * 0.5) * 0.05;
      vec3 baseColor = mix(colorBot, colorMid, smoothstep(0.0, 0.5, gradientPos));
      baseColor = mix(baseColor, colorTop, smoothstep(0.5, 1.0, gradientPos));

      // Subsurface scattering fake
      float sss = max(dot(viewDir, -lightDir), 0.0) * 0.3;
      vec3 sssColor = vec3(1.0, 0.3, 0.5) * sss;

      // Combine
      vec3 ambient = baseColor * 0.25;
      vec3 diffuse = baseColor * diff * 0.7;
      vec3 specular = vec3(1.0, 0.95, 0.98) * spec * 1.2;
      vec3 specular2 = vec3(1.0, 0.7, 0.9) * spec2 * 0.3;
      vec3 rim = mix(vec3(0.0, 0.13, 0.91), vec3(1.0, 0.5, 0.8), fresnel) * fresnel * 0.8;

      vec3 color = ambient + diffuse + specular + specular2 + rim + sssColor;

      // Inner glow
      float innerGlow = smoothstep(0.0, 0.5, diff) * 0.15;
      color += vec3(1.0, 0.9, 0.95) * innerGlow;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  useFrame((state) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t

    // Smooth mouse follow
    const pointer = state.pointer
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05
    uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)

    if (meshRef.current) {
      // Slow auto-rotation + mouse influence
      meshRef.current.rotation.y = t * 0.15 + mouseRef.current.x * 0.5
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1 + mouseRef.current.y * -0.3
      meshRef.current.rotation.z = Math.sin(t * 0.08) * 0.05

      // Gentle floating
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.08
      meshRef.current.position.x = Math.sin(t * 0.3) * 0.04
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function GlowEffects() {
  const glowRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const t = state.clock.elapsedTime
    mouseRef.current.x += (state.pointer.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (state.pointer.y - mouseRef.current.y) * 0.05

    if (glowRef.current) {
      glowRef.current.position.x = mouseRef.current.x * 0.3
      glowRef.current.position.y = mouseRef.current.y * 0.3 + Math.sin(t * 0.5) * 0.08
      glowRef.current.scale.setScalar(1.6 + Math.sin(t * 0.8) * 0.05)
    }
  })

  return (
    <mesh ref={glowRef} position={[0, 0, -0.5]}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial
        color="#ff0040"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function GlowOrb({ size = 320, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer CSS glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,60,0.35) 0%, rgba(255,0,60,0.1) 40%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'scale(2)',
        }}
      />

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <GlowEffects />
        <Sphere />
      </Canvas>

      {/* Bottom reflection */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: '-35%',
          width: '65%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(255,0,80,0.4) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  )
}
