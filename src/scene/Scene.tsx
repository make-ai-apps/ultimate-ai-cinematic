import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { scroll } from './useScrollProgress';
import { Galaxy } from './Galaxy';
import { Orbs } from './Orbs';
import { Glyphs } from './Glyphs';
import { ConnectionLines } from './ConnectionLines';

function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame(() => {
    const p = scroll.p;
    // Choreograph 6 stops along scroll
    // 0: wide hero galaxy
    // 0.18: drift in toward orb cluster
    // 0.35: focus single orb (creators)
    // 0.55: pull back show network
    // 0.75: top-down glyphs (books)
    // 1.0: pull out wide for CTA
    const stops = [
      { pos: new THREE.Vector3(0, 0.5, 14), look: new THREE.Vector3(0, 0, 0) },
      { pos: new THREE.Vector3(2, 0.8, 9), look: new THREE.Vector3(0, 0, 0) },
      { pos: new THREE.Vector3(0.5, 0.2, 5.5), look: new THREE.Vector3(0, 0, 0) },
      { pos: new THREE.Vector3(-3, 1.5, 10), look: new THREE.Vector3(0, 0, 0) },
      { pos: new THREE.Vector3(0, 6, 6), look: new THREE.Vector3(0, 0, 0) },
      { pos: new THREE.Vector3(0, 0, 16), look: new THREE.Vector3(0, 0, 0) }
    ];
    const segs = stops.length - 1;
    const sp = Math.min(0.999, Math.max(0, p)) * segs;
    const i = Math.floor(sp);
    const t = sp - i;
    const a = stops[i];
    const b = stops[Math.min(i + 1, segs)];
    // smoothstep
    const k = t * t * (3 - 2 * t);
    camera.position.lerpVectors(a.pos, b.pos, k);
    target.current.lerpVectors(a.look, b.look, k);
    camera.lookAt(target.current);
  });
  return null;
}

export default function Scene() {
  const dpr = useMemo<[number, number]>(() => {
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 700;
    return isSmall ? [1, 1.25] : [1, 1.6];
  }, []);

  return (
    <div className="canvas-fixed">
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ position: [0, 0.5, 14], fov: 55, near: 0.1, far: 200 }}
        dpr={dpr}
      >
        <color attach="background" args={[0x05050a]} />
        <fog attach="fog" args={[0x05050a, 8, 38]} />

        <ambientLight intensity={0.25} />
        <pointLight position={[6, 4, 6]} intensity={1.2} color={0xff7aa8} />
        <pointLight position={[-6, -2, 4]} intensity={1.0} color={0x7aa8ff} />

        <CameraRig />
        <Galaxy />
        <Orbs />
        <ConnectionLines />
        <Glyphs />

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.9} luminanceThreshold={0.18} luminanceSmoothing={0.18} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0006, 0.0009] as any} radialModulation modulationOffset={0.5} />
          <Vignette eskil={false} offset={0.18} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
