import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scroll } from './useScrollProgress';

const ORB_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vec4 mv = viewMatrix * wp;
    vView = -normalize(mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const ORB_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying vec3 vView;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uPulse;
  void main() {
    float fres = pow(1.0 - max(0.0, dot(normalize(vNormal), normalize(vView))), 2.4);
    float bands = sin(vWorld.y * 6.0 + uTime * 1.4) * 0.5 + 0.5;
    vec3 col = mix(uColorA, uColorB, bands);
    col += fres * mix(uColorA, vec3(1.0), 0.6) * 1.7;
    col += uPulse * 0.3;
    gl_FragColor = vec4(col, 1.0);
  }
`;

type OrbDef = {
  pos: [number, number, number];
  scale: number;
  colorA: string;
  colorB: string;
  speed: number;
};

const ORBS: OrbDef[] = [
  { pos: [0, 0, 0], scale: 0.9, colorA: '#ff5d8f', colorB: '#ffb45d', speed: 1.0 },
  { pos: [3.2, 0.6, -1.4], scale: 0.45, colorA: '#7aa8ff', colorB: '#a87aff', speed: 1.4 },
  { pos: [-2.8, -0.3, -0.5], scale: 0.55, colorA: '#ffd56b', colorB: '#ff5d8f', speed: 0.9 },
  { pos: [1.6, -1.1, 1.8], scale: 0.35, colorA: '#a87aff', colorB: '#7aa8ff', speed: 1.6 },
  { pos: [-1.8, 1.4, 1.2], scale: 0.4, colorA: '#ff9c5d', colorB: '#ffd56b', speed: 1.2 },
  { pos: [4.2, -0.8, 1.0], scale: 0.3, colorA: '#f4f1ea', colorB: '#7aa8ff', speed: 1.8 },
  { pos: [-3.6, 0.9, 1.6], scale: 0.32, colorA: '#ff5d8f', colorB: '#a87aff', speed: 1.3 }
];

function Orb({ def, index }: { def: OrbDef; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const baseY = def.pos[1];

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(def.colorA) },
      uColorB: { value: new THREE.Color(def.colorB) },
      uPulse: { value: 0 }
    }),
    [def.colorA, def.colorB]
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += dt * def.speed;
    const pulse = 0.5 + 0.5 * Math.sin(uniforms.uTime.value * 1.3 + index);
    uniforms.uPulse.value = pulse;
    if (meshRef.current) {
      meshRef.current.position.y = baseY + Math.sin(uniforms.uTime.value * 0.6 + index) * 0.12;
      const focus = 1 + (index === 0 ? Math.max(0, 0.55 - Math.abs(scroll.p - 0.35)) : 0) * 0.6;
      meshRef.current.scale.setScalar(def.scale * focus);
    }
  });

  return (
    <mesh ref={meshRef} position={def.pos}>
      <icosahedronGeometry args={[1, 24]} />
      <shaderMaterial ref={matRef} vertexShader={ORB_VERT} fragmentShader={ORB_FRAG} uniforms={uniforms} />
    </mesh>
  );
}

export function Orbs() {
  const grpRef = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (grpRef.current) {
      grpRef.current.rotation.y = scroll.p * Math.PI * 0.6;
    }
  });
  return (
    <group ref={grpRef}>
      {ORBS.map((d, i) => (
        <Orb key={i} def={d} index={i} />
      ))}
    </group>
  );
}

export const ORB_POSITIONS = ORBS.map((o) => new THREE.Vector3(...o.pos));
