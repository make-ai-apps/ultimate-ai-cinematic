import { Suspense, useEffect, useRef } from 'react';
import Scene from './scene/Scene';
import { ImagePlates } from './scene/ImagePlates';
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
      {/* Fixed 3D backdrop. Postprocessing now stays well under text. */}
      <Suspense fallback={<div className="canvas-fixed bg-ink" />}>
        <Scene />
      </Suspense>

      {/* Fixed real generated image plates layered above 3D, below scrim. */}
      <ImagePlates />

      {/* Soft scrim to lock readability without killing the cinematic palette. */}
      <div className="scrim" aria-hidden />

      {/* Top nav — solid frosted bar, no mix-blend-difference */}
      <header className="fixed top-0 left-0 right-0 z-40 px-[6vw] py-5 flex items-center justify-between" style={{ background: 'linear-gradient(180deg, rgba(5,5,10,0.7), rgba(5,5,10,0))', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: '#ff5d8f', boxShadow: '0 0 12px #ff5d8f' }} />
          <span className="text-bone text-sm font-semibold tracking-[0.32em] uppercase">Ultimate AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'rgba(244,241,234,0.85)' }}>
          <a className="hover-line" href="#how">Pods</a>
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
          <div className="section-inner max-w-6xl">
            <div className="glass" style={{ display: 'inline-block' }}>
              <div className="eyebrow fade-up mb-6">Hollywood&apos;s first real-time AI experience</div>
              <h1 className="serif fade-up legible leading-[0.92] tracking-tight" style={{ fontSize: 'clamp(56px, 10vw, 168px)', color: '#f4f1ea', fontWeight: 500 }}>
                Books and<br />
                <span className="italic-serif gradient-ink">podcasts</span><br />
                you can <span className="italic-serif">talk to.</span>
              </h1>
            </div>
            <div className="glass-tight fade-up mt-8 max-w-2xl">
              <p className="body-copy text-lg leading-relaxed" style={{ color: 'rgba(244,241,234,0.92)' }}>
                Join the conversation, mid-episode. Pause a chapter and ask the author anything. A galaxy of living AI creators, available the instant curiosity strikes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="https://apps.apple.com/us/app/ultimate-pods/id6757514469" target="_blank" rel="noopener" className="cta-pill cta-primary">
                  Talk to a creator now
                </a>
                <a href="#how" className="cta-pill">
                  <span className="dot" /> See it move
                </a>
              </div>
              <div className="mt-8 flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: 'rgba(244,241,234,0.7)' }}>
                <span className="dot" /> 1,247 conversations live
              </div>
            </div>
          </div>
        </section>

        {/* THE THESIS */}
        <section id="how" className="section">
          <div className="section-inner max-w-6xl">
            <div className="glass mb-10 inline-block">
              <div className="eyebrow fade-up mb-4">The thesis</div>
              <h2 className="serif fade-up legible leading-[1.02]" style={{ fontSize: 'clamp(38px, 5.6vw, 84px)', fontWeight: 500, color: '#f4f1ea' }}>
                Media stopped being a monologue.<br />
                <span className="italic-serif" style={{ color: 'rgba(244,241,234,0.75)' }}>It&apos;s a room you can walk into.</span>
              </h2>
            </div>
            <div className="fade-up grid md:grid-cols-3 gap-5">
              <div className="glass-tight">
                <div className="eyebrow mb-3">Pods</div>
                <h3 className="serif text-3xl mb-3" style={{ color: '#f4f1ea', fontWeight: 500 }}>Podcasts you can join.</h3>
                <p className="body-copy text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.82)' }}>Tap into a live episode. Speak. The hosts hear you, respond, riff back. The episode keeps going. You&apos;re in it.</p>
              </div>
              <div className="glass-tight" id="books">
                <div className="eyebrow mb-3">Books</div>
                <h3 className="serif text-3xl mb-3" style={{ color: '#f4f1ea', fontWeight: 500 }}>Books you can pause.</h3>
                <p className="body-copy text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.82)' }}>Mid-chapter, ask the author what they meant. Get a real-time answer in their voice. Then keep reading.</p>
              </div>
              <div className="glass-tight">
                <div className="eyebrow mb-3">Creators</div>
                <h3 className="serif text-3xl mb-3" style={{ color: '#f4f1ea', fontWeight: 500 }}>A persona that scales.</h3>
                <p className="body-copy text-sm leading-relaxed" style={{ color: 'rgba(244,241,234,0.82)' }}>For talent: Full Name, Image, and Likeness. Owned, deployed, monetized. The you that never sleeps.</p>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="section">
          <div className="section-bg-plate" style={{ backgroundImage: 'url(/generated/podcast-waveform.jpg)' }} aria-hidden />
          <div className="section-inner max-w-6xl w-full">
            <div className="glass mb-10 inline-block">
              <div className="eyebrow fade-up">By the numbers</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
              {METRICS.map((m) => (
                <div key={m.label} className="fade-up glass-tight" style={{ padding: '24px' }}>
                  <div className="metric legible">{m.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] mt-3 font-semibold" style={{ color: 'rgba(244,241,234,0.75)' }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div className="divider mt-20 fade-up" />
          </div>
        </section>

        {/* CREATORS */}
        <section id="creators" className="section">
          <div className="section-inner max-w-6xl w-full">
            <div className="glass mb-10 inline-block">
              <div className="eyebrow fade-up mb-4">The roster</div>
              <h2 className="serif fade-up legible leading-[1.04]" style={{ fontSize: 'clamp(38px, 5.4vw, 76px)', fontWeight: 500, color: '#f4f1ea' }}>
                Twenty signed.<br />
                <span className="italic-serif" style={{ color: 'rgba(244,241,234,0.75)' }}>A hundred million followers between them.</span>
              </h2>
            </div>
            <div className="fade-up grid md:grid-cols-3 gap-5">
              {CREATORS.map((c) => (
                <div key={c.name + c.tag} className="creator-card">
                  <div className="orb-img" style={{ backgroundImage: `url(${c.image})` }} />
                  <div className="orb-shade" />
                  <div className="body">
                    <div className="flex items-center justify-between">
                      <div className="serif text-2xl legible" style={{ color: '#f4f1ea', fontWeight: 500 }}>{c.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.24em] font-semibold" style={{ color: 'rgba(255, 174, 120, 0.9)' }}>{c.tag}</div>
                    </div>
                    <div className="mt-10 flex items-center justify-between">
                      <div className="body-copy text-sm" style={{ color: 'rgba(244,241,234,0.82)' }}>{c.note}</div>
                      <div className="dot" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRESS */}
        <section id="press" className="section">
          <div className="section-bg-plate" style={{ backgroundImage: 'url(/generated/book-glyphs.jpg)' }} aria-hidden />
          <div className="section-inner max-w-5xl w-full">
            <div className="glass">
              <div className="eyebrow fade-up mb-4">Coverage</div>
              <h2 className="serif fade-up legible leading-[1.02]" style={{ fontSize: 'clamp(34px, 4.6vw, 68px)', color: '#f4f1ea', fontWeight: 500 }}>
                <span className="italic-serif" style={{ color: 'rgba(244,241,234,0.92)' }}>&ldquo;The real-life Her.&rdquo;</span>
              </h2>
              <p className="fade-up body-copy text-sm mt-3" style={{ color: 'rgba(244,241,234,0.65)' }}>The Hollywood Reporter</p>

              <div className="fade-up mt-12 grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-8 items-center">
                {PRESS.map((p) => (
                  <div key={p} className="press-logo">{p}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="section-inner max-w-4xl w-full">
            <div className="glass">
              <div className="eyebrow fade-up mb-6">Questions</div>
              <div className="fade-up space-y-1">
                {FAQ.map((f, i) => (
                  <details key={i} className="group border-b py-5 cursor-pointer" style={{ borderColor: 'rgba(244,241,234,0.12)' }}>
                    <summary className="serif text-2xl md:text-3xl flex items-center justify-between list-none" style={{ color: '#f4f1ea', fontWeight: 500 }}>
                      <span>{f.q}</span>
                      <span className="group-open:rotate-45 transition-transform text-3xl leading-none" style={{ color: 'rgba(244,241,234,0.55)' }}>+</span>
                    </summary>
                    <p className="body-copy mt-4 leading-relaxed max-w-2xl" style={{ color: 'rgba(244,241,234,0.85)' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section">
          <div className="section-bg-plate" style={{ backgroundImage: 'url(/generated/closing-galaxy.jpg)' }} aria-hidden />
          <div className="section-inner max-w-5xl w-full text-center mx-auto">
            <div className="glass inline-block">
              <div className="eyebrow fade-up mb-6">Now</div>
              <h2 className="serif fade-up legible leading-[0.96]" style={{ fontSize: 'clamp(52px, 8.5vw, 132px)', color: '#f4f1ea', fontWeight: 500 }}>
                Talk to a<br />
                <span className="italic-serif gradient-ink">creator</span> now.
              </h2>
            </div>
            <div className="fade-up mt-10 flex items-center justify-center gap-4 flex-wrap">
              <a href="https://apps.apple.com/us/app/ultimate-pods/id6757514469" target="_blank" rel="noopener" className="cta-pill cta-primary">
                Open Ultimate Pods
              </a>
              <a href="mailto:ben@ultimate-ai-app.com" className="cta-pill">For creators &amp; partners</a>
            </div>
            <p className="fade-up mt-16 text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: 'rgba(244,241,234,0.55)' }}>© Ultimate AI. Built in Hollywood.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
