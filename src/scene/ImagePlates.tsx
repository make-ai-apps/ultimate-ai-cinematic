import { useEffect, useRef, useState } from 'react';
import { scroll } from './useScrollProgress';

// 6 stops, mapped 1:1 with Scene.tsx camera stops, but for image plates.
// hero -> drift -> creators -> network -> books -> closing
const PLATES = [
  '/generated/hero-galaxy.png',
  '/generated/podcast-waveform.jpg',
  '/generated/creator-orb-pink.png',
  '/generated/creator-orb-blue.jpg',
  '/generated/book-glyphs.jpg',
  '/generated/closing-galaxy.jpg'
];

export function ImagePlates() {
  const [active, setActive] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const tick = () => {
      const segs = PLATES.length - 1;
      const sp = Math.min(0.999, Math.max(0, scroll.p)) * segs;
      const i = Math.round(sp);
      setActive((prev) => (prev === i ? prev : i));
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf.current);
  }, []);
  return (
    <>
      {PLATES.map((src, i) => (
        <div
          key={src}
          className={`plate-fixed ${i === active ? 'show' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
      ))}
    </>
  );
}
