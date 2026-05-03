import { Suspense, useEffect, useRef } from 'react';
import Scene from './scene/Scene';
import { useScrollProgress } from './scene/useScrollProgress';
import { CREATORS, PRESS, METRICS, FAQ } from './data';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-up');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useScrollProgress();
  useReveal();

  return (
    <div className="grain">
      {/* Fixed 3D backdrop. Scenes mutate via scroll progress. */}
      <Suspense fallback={<div className="canvas-fixed bg-ink" />}>
        <Scene />
      </Suspense>

      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-40 px-[6vw] py-6 flex items-center justify-between mix-blend-difference">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-bone" />
          <span className="text-bone text-sm tracking-[0.32em] uppercase">Ultimate AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-bone/80 text-sm">
          <a className="hover-line" href="#pods">Pods</a>
          <a className="hover-line" href="#books">Books</a>
          <a className="hover-line" href="#creators">Creators</a>
          <a className="hover-line" href="#press">Press</a>
        </nav>
        <a href="https://apps.apple.com/us/app/ultimate-pods/id6757514469" target="_blank" rel="noopener" className="cta-pill cta-primary text-xs">
          Talk to a creator
        </a>
      </header>

      <div ref={scrollRef} className="scroll-stack">
        {/* HERO */}
        <section className="section">
          <div className="max-w-6xl">
            <div className="eyebrow fade-up mb-8">Hollywood&apos;s first real-time AI experience</div>
            <h1 className="serif fade-up text-bone leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(60px, 11vw, 180px)' }}>
              Books and<br />
              <span className="italic-serif text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(120deg, #ff5d8f, #ffb45d, #ffd56b)' }}>podcasts</span><br />
              you can <span className="italic-serif">talk to.</span>
            </h1>
            <p className="fade-up max-w-xl mt-10 text-bone/70 text-lg leading-relaxed">
              Join the conversation, mid-episode. Pause a chapter and ask the author anything. A galaxy of living AI creators, available the instant curiosity strikes.
            </p>
            <div className="fade-up mt-10 flex flex-wrap items-center gap-4">
              <a href="https://apps.apple.com/us/app/ultimate-pods/id6757514469" target="_blank" rel="noopener" className="cta-pill cta-primary">
                Talk to a creator now
              </a>
              <a href="#how" className="cta-pill">
                <span className="dot" /> See it move
              </a>
            </div>
            <div className="fade-up mt-16 flex items-center gap-3 text-xs text-bone/40 tracking-[0.2em] uppercase">
              <span className="dot" /> 1,247 conversations live
            </div>
          </div>
        </section>

        {/* THE THESIS */}
        <section id="how" className="section">
          <div className="max-w-5xl">
            <div className="eyebrow fade-up mb-6">The thesis</div>
            <h2 className="serif fade-up text-bone leading-[1.02]" style={{ fontSize: 'clamp(40px, 6vw, 88px)' }}>
              Media stopped being a monologue.<br />
              <span className="italic-serif text-bone/60">It&apos;s a room you can walk into.</span>
            </h2>
            <div className="fade-up mt-12 grid md:grid-cols-3 gap-6">
              <div className="creator-card">
                <div className="eyebrow mb-3">Pods</div>
                <h3 className="serif text-3xl mb-3">Podcasts you can join.</h3>
                <p className="text-bone/60 text-sm leading-relaxed">Tap into a live episode. Speak. The hosts hear you, respond, riff back. The episode keeps going. You&apos;re in it.</p>
              </div>
              <div className="creator-card">
                <div className="eyebrow mb-3">Books</div>
                <h3 className="serif text-3xl mb-3">Books you can pause.</h3>
                <p className="text-bone/60 text-sm leading-relaxed">Mid-chapter, ask the author what they meant. Get a real-time answer in their voice. Then keep reading.</p>
              </div>
              <div className="creator-card">
                <div className="eyebrow mb-3">Creators</div>
                <h3 className="serif text-3xl mb-3">A persona that scales.</h3>
                <p className="text-bone/60 text-sm leading-relaxed">For talent: Full Name, Image, and Likeness. Owned, deployed, monetized. The you that never sleeps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="section">
          <div className="max-w-6xl w-full">
            <div className="eyebrow fade-up mb-10">By the numbers</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {METRICS.map((m) => (
                <div key={m.label} className="fade-up">
                  <div className="metric text-bone">{m.value}</div>
                  <div className="text-bone/50 text-xs uppercase tracking-[0.2em] mt-2">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="divider mt-20 fade-up" />
          </div>
        </section>

        {/* CREATORS */}
        <section id="creators" className="section">
          <div className="max-w-6xl w-full">
            <div className="eyebrow fade-up mb-6">The roster</div>
            <h2 className="serif fade-up text-bone leading-[1.04]" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Twenty signed.<br />
              <span className="italic-serif text-bone/60">A hundred million followers between them.</span>
            </h2>
            <div className="fade-up mt-12 grid md:grid-cols-3 gap-5">
              {CREATORS.map((c) => (
                <div key={c.name} className="creator-card">
                  <div className="flex items-center justify-between">
                    <div className="serif text-2xl">{c.name}</div>
                    <div className="text-xs text-bone/40 uppercase tracking-[0.2em]">{c.tag}</div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-bone/60 text-sm">{c.note}</div>
                    <div className="dot" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESS */}
        <section id="press" className="section">
          <div className="max-w-5xl w-full">
            <div className="eyebrow fade-up mb-6">Coverage</div>
            <h2 className="serif fade-up text-bone leading-[1.02]" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              <span className="italic-serif text-bone/70">&ldquo;The real-life Her.&rdquo;</span>
            </h2>
            <p className="fade-up text-bone/40 text-sm mt-4">The Hollywood Reporter</p>

            <div className="fade-up mt-16 grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10 items-center">
              {PRESS.map((p) => (
                <div key={p} className="serif text-bone/70 text-xl text-center">{p}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="max-w-4xl w-full">
            <div className="eyebrow fade-up mb-6">Questions</div>
            <div className="fade-up space-y-1">
              {FAQ.map((f, i) => (
                <details key={i} className="group border-b border-bone/10 py-6 cursor-pointer">
                  <summary className="serif text-2xl md:text-3xl flex items-center justify-between list-none">
                    <span>{f.q}</span>
                    <span className="text-bone/40 group-open:rotate-45 transition-transform text-3xl leading-none">+</span>
                  </summary>
                  <p className="text-bone/60 mt-4 leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section">
          <div className="max-w-5xl w-full text-center mx-auto">
            <div className="eyebrow fade-up mb-8">Now</div>
            <h2 className="serif fade-up text-bone leading-[0.96]" style={{ fontSize: 'clamp(56px, 9vw, 140px)' }}>
              Talk to a<br />
              <span className="italic-serif text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(120deg, #ff5d8f, #ffb45d, #ffd56b)' }}>creator</span> now.
            </h2>
            <div className="fade-up mt-12 flex items-center justify-center gap-4 flex-wrap">
              <a href="https://apps.apple.com/us/app/ultimate-pods/id6757514469" target="_blank" rel="noopener" className="cta-pill cta-primary">
                Open Ultimate Pods
              </a>
              <a href="mailto:ben@ultimate-ai-app.com" className="cta-pill">For creators &amp; partners</a>
            </div>
            <p className="fade-up mt-16 text-bone/30 text-xs tracking-[0.3em] uppercase">© Ultimate AI. Built in Hollywood.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
