import { useEffect } from 'react';

// Global scroll progress proxy (0..1)
export const scroll = { p: 0 };

export function useScrollProgress() {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      scroll.p += (p - scroll.p) * 0.08; // smooth
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
}
