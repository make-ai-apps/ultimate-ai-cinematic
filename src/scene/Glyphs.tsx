import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scroll } from './useScrollProgress';

// Floating quote/glyph rings — visible during the "books" beat (top-down).
export function Glyphs() {
  const grpRef = useRef<THREE.Group>(null!);

  const items = useMemo(() => {
    const arr: { p: THREE.Vector3; r: number; c: THREE.Color }[] = [];
    const N = 60;
    const palette = [new THREE.Color('#ffd56b'), new THREE.Color('#ff5d8f'), new THREE.Color('#7aa8ff'), new THREE.Color('#f4f1ea')];
    for (let i = 0; i < N; i++) {
      const ring = i < N * 0.5 ? 1 : 2;
      const radius = ring === 1 ? 4 : 7;
      const ang = (i / (N * 0.5)) * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.4;
      arr.push({
        p: new THREE.Vector3(Math.cos(ang) * radius + (Math.random() - 0.5) * 0.6, y, Math.sin(ang) * radius + (Math.random() - 0.5) * 0.6),
        r: 0.04 + Math.random() * 0.07,
        c: palette[Math.floor(Math.random() * palette.length)]
      });
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (!grpRef.current) return;
    grpRef.current.rotation.y += dt * 0.12;
    const visible = scroll.p > 0.55 && scroll.p < 0.9;
    const target = visible ? 1 : 0;
    grpRef.current.children.forEach((c) => {
      const m = c as THREE.Mesh;
      const mat = m.material as THREE.MeshBasicMaterial;
      if (mat.opacity === undefined) return;
      mat.opacity += (target - mat.opacity) * 0.05;
      mat.transparent = true;
    });
  });

  return (
    <group ref={grpRef} position={[0, 0, 0]}>
      {items.map((it, i) => (
        <mesh key={i} position={it.p} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[it.r, it.r * 1.6, 24]} />
          <meshBasicMaterial color={it.c} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}
