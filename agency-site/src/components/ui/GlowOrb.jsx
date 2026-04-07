import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Sphere() {
  const meshRef = useRef()
  const mouseRef = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [])

  const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
      vec3 lightDir = normalize(vec3(uMouse.x * 1.5, uMouse.y * 1.5 + 0.8, 1.5));
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-lightDir, vNormal);

      float diff = max(dot(vNormal, lightDir), 0.0);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);

      // Bright vivid colors
      vec3 colorTop = vec3(0.95, 0.7, 1.0);
      vec3 colorMid = vec3(1.0, 0.3, 0.85);
      vec3 colorBot = vec3(1.0, 0.1, 0.35);

      float g = vNormal.y * 0.5 + 0.5 + sin(uTime * 0.4) * 0.08;
      vec3 baseColor = mix(colorBot, colorMid, smoothstep(0.0, 0.5, g));
      baseColor = mix(baseColor, colorTop, smoothstep(0.5, 1.0, g));

      // Much brighter: high ambient + strong diffuse
      vec3 ambient = baseColor * 0.55;
      vec3 diffuse = baseColor * diff * 0.6;
      vec3 specular = vec3(1.0) * spec * 1.5;
      vec3 rim = vec3(0.5, 0.3, 1.0) * fresnel * 0.7;

      vec3 color = ambient + diffuse + specular + rim;

      // White hot spot at top
      float topLight = smoothstep(0.5, 1.0, vNormal.y) * 0.4;
      color += vec3(1.0, 0.95, 1.0) * topLight;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  useFrame((state) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t

    const pointer = state.pointer
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05
    uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2 + mouseRef.current.x * 0.4
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15 + mouseRef.current.y * -0.3
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.06
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function GlowOrb({ size = 280, className = '' }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Bright outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,50,100,0.5) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'scale(2.2)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 45 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#ff66aa" />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color="#6366f1" />
        <Sphere />
      </Canvas>

      {/* Bottom glow reflection */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: '-30%',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(255,50,120,0.35) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }}
      />
    </div>
  )
}
