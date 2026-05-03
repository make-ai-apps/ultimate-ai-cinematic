# Ultimate AI — Cinematic Marketing Site (Build Report)

## v2 — Readability + Real Imagery (2026-05-03)

**Label:** cinematic-site-v2
**Status:** Shipped, live.

### Live URL
https://ultimate-ai-cinematic.netlify.app (production), unique deploy: https://69f78abc63e420a6b26231c4--ultimate-ai-cinematic.netlify.app

### What changed from v1

1. **Text readability — fixed.** v1's bloom was at 0.9 intensity / 0.18 luminance threshold and bleeding into typography. v2:
   - Bloom: intensity 0.35, luminance threshold 0.55, radius 0.7. Only the hottest highlights bloom now.
   - Every block of text now sits inside a frosted-glass container (`backdrop-blur(18px)` + `rgba(8,8,14,0.55)` panel). Hero, thesis, metrics, creators, press, FAQ, CTA — all wrapped.
   - Global radial scrim layer above the 3D canvas (z-index 2) softens hot spots without killing color.
   - Hero serif bumped to weight 500. Body copy bumped to weight 500. Eyebrows weight 600.
   - `.legible` class adds a 1px text shadow + 14px soft drop shadow on hero/H2 copy for AA against bright bg pixels.
   - Nav bar is now a solid frosted gradient bar (no more `mix-blend-difference` which was making it strobe).
   - Chromatic aberration + vignette retained for cinematic feel — but the postprocessing pass no longer hits text since text lives in HTML, not in the WebGL canvas.

2. **Real Gemini 3 Pro generated imagery** layered into the page (no stock, no Unsplash, no placeholder gradients):
   - Fixed `ImagePlates` component cross-fades 6 generated plates as the user scrolls (z-index between WebGL and scrim).
   - Each creator card renders its own generated luminous-orb portrait as a card background with a vertical shade gradient.
   - Section-bound `section-bg-plate` plates ride behind the metrics, press, and CTA sections (masked top/bottom for clean type).
   - Hero plate behind the hero glass card with radial mask.

3. **Cinematic energy preserved.** Galaxy + orbs + connection lines + glyphs + CA + vignette all still there. Just no longer fighting the type.

### Generated images (all `openrouter/google/gemini-3-pro-image-preview`)

Saved under `public/generated/`. All used in the live build.

| File | Aspect | Prompt (abbrev.) |
|---|---|---|
| `hero-galaxy.png` | 21:9 | Cinematic deep-space galaxy with glowing AI personality orbs, pink/orange/gold/blue, anamorphic flares |
| `creator-orb-pink.png` | 1:1 | Luminous translucent sphere of pink/orange volumetric light, cosmic dust |
| `creator-orb-gold.jpg` | 1:1 | Luminous sphere of gold/amber volumetric light |
| `creator-orb-blue.jpg` | 1:1 | Luminous sphere of deep blue/violet light |
| `creator-orb-magenta.jpg` | 1:1 | Luminous sphere of magenta/crimson light |
| `creator-orb-cyan.jpg` | 1:1 | Luminous sphere of cyan/teal light |
| `creator-orb-white.jpg` | 1:1 | Luminous sphere of warm white/pale yellow light |
| `book-glyphs.jpg` | 16:9 | Floating glowing book in deep space, glyphs lifting off pages into stardust |
| `podcast-waveform.jpg` | 16:9 | Podcast waveform as a flowing river of light arcing through space |
| `closing-galaxy.jpg` | 21:9 | Pulled-back panoramic galaxy with constellation node patterns |

Total generated payload: ~7.5 MB. Total dist size: 9.5 MB (under the 12 MB budget).

### Screenshots (1920x1080, captured via puppeteer-core w/ ANGLE WebGL)

- `BUILD-REPORT-screenshots/v2/01-hero.png`
- `BUILD-REPORT-screenshots/v2/02-mid-scroll.png`
- `BUILD-REPORT-screenshots/v2/03-creators.png`
- `BUILD-REPORT-screenshots/v2/04-cta.png`

### Build verification (v2)

```
$ npm run build
✓ 415 modules transformed.
dist/index.html                     1.12 kB │ gzip:   0.54 kB
dist/assets/index-DI4VtudX.css     13.94 kB │ gzip:   4.12 kB
dist/assets/index-BEXCgq6o.js   1,048.03 kB │ gzip: 286.38 kB
✓ built in 1.73s
```

Type-clean. Build-clean. Deploy-clean.

### Known issues / next pass

- JS bundle still ~1 MB (three.js). Same as v1. Lazy-load Canvas if Lighthouse perf needs to clear 80.
- Generated PNG hero plate is 1.3 MB. Could re-encode to webp for ~40% savings.
- Did not re-tune mobile camera stops; the 3D rig still works on small screens but the section paddings tightened. Manual mobile QA pass still owed.
- Visual readability QA was done by design audit, not by automated vision (the local image-vision tool was unavailable mid-task because of a missing optional dep in the running runtime). Recommend Ben gut-check on phone.

---

## v1 — Initial cinematic build (2026-05-03)

**Label:** cinematic-site-v1
**Built:** 2026-05-03
**Time spent:** ~70 min
**Status:** Shipped, live, indexable.

## Live & Source

- **Live URL:** https://ultimate-ai-cinematic.netlify.app
- **Repo:** https://github.com/make-ai-apps/ultimate-ai-cinematic
- **Hosting:** Netlify (production deploy, instant CDN). Vercel auth was expired; Netlify was already authed under `ultimateaiapp@gmail.com`. Same end result, ~30s deploys.

## Screenshots

- `BUILD-REPORT-screenshots/01-hero.png` — galaxy + headline ("Books and podcasts you can talk to.")
- `BUILD-REPORT-screenshots/02-mid-scroll.png` — three-up thesis cards over drifting orb cluster
- `BUILD-REPORT-screenshots/03-creators.png` — creators roster + connection lines
- `BUILD-REPORT-screenshots/04-cta.png` — pulled-back galaxy with closing CTA

## Concept Shipped

A galaxy of living AI personas. The 3D world is fixed-position behind the page; the camera scroll-choreographs through six stops as the user reads:

1. Wide hero galaxy (5,500-particle GLSL spiral)
2. Drift in toward a primary orb cluster
3. Focus on creator orb (zoom + pulse intensifies)
4. Pull back to reveal animated dashed connection lines (creator -> fans)
5. Top-down "books" beat — floating glyph rings fade in
6. Pull out wide for the closing CTA

All orbs use a custom GLSL fresnel + banding shader. Galaxy is a single instanced points cloud with a custom additive shader (palette: pink/orange/gold/blue, pulled from the Ultimate AI vibe). Postprocessing: bloom + chromatic aberration + vignette for the cinematic feel.

## Tech Decisions

| Decision | Tradeoff |
|---|---|
| Vite + React 18 + TypeScript | Fast dev, good DX, cheap CI |
| three + @react-three/fiber + drei | Industry-standard R3F stack |
| @react-three/postprocessing (bloom, CA, vignette) | Cinematic feel, ~70KB cost |
| Custom GLSL for galaxy + orbs | No fake CSS glow; real shaders |
| Tailwind for chrome | Tiny utility layer; world breathes through transparent UI |
| Scroll progress via lerped scrollY | No GSAP ScrollTrigger needed; simpler, smaller bundle |
| Netlify (not Vercel) | Vercel CLI token expired; pivoted in 2 min |
| Hosted Google Fonts (Instrument Serif + Inter) | Brand serif/grotesque pairing; can self-host later |

## What's Polished

- Cinematic typography (Instrument Serif italic accents, gradient ink, generous scale)
- Real WebGL galaxy with 5,500 shader particles + spiral drift
- 7 procedural orbs with custom shader, fresnel rim, breathing pulse
- Animated dashed connection lines with scroll-aware opacity
- Smooth multi-stop camera choreography (6 stops, smoothstep blends)
- Postprocessing pipeline (bloom + chromatic aberration + vignette)
- Film grain overlay (SVG fractal noise, GPU-cheap)
- IntersectionObserver fade-up on every section
- Mobile DPR clamp + responsive font scaling via clamp()
- Sticky mix-blend-difference nav so it reads on every scene
- No emdashes anywhere (per Ben's rule)
- Uses real creator names where confirmed (Donna D'Errico, Hawk Tuah AI, Tracy Brighman). Three creator slots are placeholders ("Untitled Creator") rather than fabrications, per the no-stock-photos / no-fabrication rule.

## What's MVP-Stub (next iteration)

1. **Live data is faked** — the "1,247 conversations live" and creator activity dots are static. Wire to the real Ultimate Pods API for genuine real-time bake-in.
2. **No actual creator portraits/avatars** — orbs are abstract by design, but a v2 could swap in shader-distorted video portraits inside each orb (the "real-life Her" moment).
3. **Mobile fallback is graceful but unspectacular** — runs the same R3F scene with clamped DPR. A v2 should detect low-end devices and swap to a 2D parallax layer (concept already scaffolded in the styles).
4. **Bundle is 1.04 MB / 286 KB gzipped** — three.js dominates. Consider lazy-loading the Canvas or replacing drei imports with raw three to trim ~200KB.
5. **No press logos** — using serif text for press names. Real SVG logos would land harder.
6. **Audio off** — could add a single ambient pad that ducks during scroll, but Ben hasn't asked for sound.
7. **No analytics** — no GA4/Plausible/Posthog wired in. Add when Ben picks the stack.
8. **OG/Twitter cards** — basic OG meta only. No share image rendered yet.
9. **FAQ is hand-curated** — could pull from a CMS or markdown later.

## Estimated Next-Iteration Work to Production-Finish

- Wire live conversation count + waveform from Ultimate Pods backend: ~2 hr
- Replace placeholder creators with real signed creators + portraits: ~1 hr (Ben supplies list)
- Press logos as SVG constellation: ~1 hr
- Mobile 2D fallback path: ~3 hr
- Performance pass + lighthouse 90+: ~2 hr
- OG share image renderer: ~1 hr
- Total: roughly a day of polish to production-finished.

## Build Verification

```
$ npm run build
> tsc -b && vite build
✓ 414 modules transformed.
dist/index.html                     1.12 kB │ gzip:   0.54 kB
dist/assets/index-Cb5IMLMF.css     11.36 kB │ gzip:   3.48 kB
dist/assets/index-x-nsOObt.js   1,045.07 kB │ gzip: 285.73 kB
✓ built in 1.42s
```

Type-checks clean. Builds clean. Deploys clean. Renders WebGL on first paint.
