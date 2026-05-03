import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uTime;
  uniform float uPxRatio;
  void main() {
    vColor = aColor;
    vec3 pos = position;
    float r = length(pos.xz);
    float ang = uTime * 0.05 / (0.6 + r * 0.18);
    float c = cos(ang), s = sin(ang);
    pos.xz = mat2(c, -s, s, c) * pos.xz;
    pos.y += sin(uTime * 0.4 + r * 1.3) * 0.04;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPxRatio * (260.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.18, 0.0, d);
    vec3 col = mix(vColor, vec3(1.0), core * 0.6);
    gl_FragColor = vec4(col, a);
    if (gl_FragColor.a < 0.01) discard;
  }
`;

export function Galaxy() {
  const ref = useRef<THREE.Points>(null!);

  const { geometry, material } = useMemo(() => {
    const COUNT = 5500;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const palette = [
      new THREE.Color('#ff5d8f'),
      new THREE.Color('#ffb45d'),
      new THREE.Color('#ffd56b'),
      new THREE.Color('#7aa8ff'),
      new THREE.Color('#a87aff'),
      new THREE.Color('#f4f1ea')
    ];

    for (let i = 0; i < COUNT; i++) {
      // disc-galaxy distribution
      const arms = 5;
      const arm = i % arms;
      const t = Math.pow(Math.random(), 0.7);
      const radius = 0.6 + t * 18;
      const armOffset = (arm / arms) * Math.PI * 2;
      const swirl = radius * 0.45;
      const ang = armOffset + swirl + (Math.random() - 0.5) * 0.5;
      const yJitter = (Math.random() - 0.5) * (0.6 + radius * 0.05);
      const xJitter = (Math.random() - 0.5) * 0.6;

      positions[i * 3 + 0] = Math.cos(ang) * radius + xJitter;
      positions[i * 3 + 1] = yJitter * 0.8;
      positions[i * 3 + 2] = Math.sin(ang) * radius + xJitter;

      const c = palette[Math.floor(Math.random() * palette.length)].clone();
      // dim edges
      const dim = 0.6 + 0.6 * (1 - radius / 18);
      colors[i * 3 + 0] = c.r * dim;
      colors[i * 3 + 1] = c.g * dim;
      colors[i * 3 + 2] = c.b * dim;

      sizes[i] = 0.6 + Math.random() * 1.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPxRatio: { value: Math.min(window.devicePixelRatio || 1, 2) }
      }
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame((_, dt) => {
    (material.uniforms.uTime.value as number) += dt;
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });

  return <points ref={ref} geometry={geometry} material={material} position={[0, -0.4, 0]} />;
}
