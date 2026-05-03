import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ORB_POSITIONS } from './Orbs';
import { scroll } from './useScrollProgress';

// Animated dashed connection lines from primary orb to satellites.
export function ConnectionLines() {
  const grpRef = useRef<THREE.Group>(null!);

  const lines = useMemo(() => {
    const root = ORB_POSITIONS[0];
    return ORB_POSITIONS.slice(1).map((tip) => {
      const geo = new THREE.BufferGeometry().setFromPoints([root, tip]);
      const mat = new THREE.LineDashedMaterial({
        color: new THREE.Color('#ff9c5d'),
        dashSize: 0.18,
        gapSize: 0.14,
        transparent: true,
        opacity: 0.55,
        linewidth: 1
      });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      return line;
    });
  }, []);

  useFrame((_, dt) => {
    const t = performance.now() * 0.001;
    lines.forEach((l, i) => {
      const m = l.material as THREE.LineDashedMaterial;
      m.dashSize = 0.12 + (Math.sin(t * 1.5 + i) * 0.5 + 0.5) * 0.18;
      m.opacity = 0.25 + 0.55 * Math.max(0.05, scroll.p < 0.6 ? 1 - Math.abs(scroll.p - 0.5) * 1.6 : 0.1);
      m.needsUpdate = true;
    });
    if (grpRef.current) grpRef.current.rotation.y = scroll.p * Math.PI * 0.6;
  });

  return (
    <group ref={grpRef}>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </group>
  );
}
