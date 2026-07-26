import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollProgress from '../components/ScrollProgress';

// ─── Manifesto Text ────────────────────────────────────────────────────────────
const MANIFESTO_1 = [
  'Building', 'with', 'creativity', 'creates', 'vision;',
  'growing', 'through', 'the', 'process', 'gives it', 'purpose.',
];

const MANIFESTO_2 = [
  'Every', 'iteration', 'is a', 'commitment', 'to become',
  'a better', 'architect', 'than I was', 'yesterday.',
];

// ─── Staggered word sub-component (hooks-safe) ─────────────────────────────────
function ManifestoWord({
  word, index, scrollProgress, baseOffset, stagger,
}: {
  word: string; index: number; scrollProgress: MotionValue<number>;
  baseOffset: number; stagger: number;
}) {
  const start = baseOffset + index * stagger;
  const end = start + 0.018;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [24, 0]);

  return (
    <motion.span className="inline-block mr-[0.3em]" style={{ opacity, y }}>
      {word}
    </motion.span>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  // Always reset scroll to the very top when Home mounts
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 1 — THE BLUEPRINT  (0 → 0.30)
     Blueprint visible immediately. Scales from subtle zoom to settled.
     Manifesto 1 types in word-by-word on the left.
  ═══════════════════════════════════════════════════════════════════════════ */
  const bp_scale     = useTransform(scrollYProgress, [0, 0.12],   [1.12, 1.05]);
  const bp_y         = useTransform(scrollYProgress, [0, 0.55],   ['0%', '-8%']);
  const bp_filter    = useTransform(
    scrollYProgress, [0, 0.25, 0.50],
    ['brightness(1.05) contrast(1.1)', 'brightness(1.0) contrast(1.05)', 'brightness(0.9) contrast(1.0)']
  );

  // Grid overlay pulsing behind blueprint
  const gridOp = useTransform(scrollYProgress, [0, 0.06, 0.22, 0.32], [0, 0.07, 0.07, 0]);

  // Manifesto 1 container
  const m1_op = useTransform(scrollYProgress, [0.03, 0.07, 0.24, 0.30], [0, 1, 1, 0]);
  const m1_y  = useTransform(scrollYProgress, [0.03, 0.07, 0.24, 0.30], [50, 0, 0, -40]);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 2 — THE METAMORPHOSIS  (0.25 → 0.55)
     Render image crossfades over blueprint via clip-path wipe.
     Blueprint fades to 0. Render saturates to full warmth.
     Manifesto 2 appears.
  ═══════════════════════════════════════════════════════════════════════════ */
  // Clip-path reveal — circle grows from center
  const clipProgress = useTransform(scrollYProgress, [0.25, 0.52], [0, 150]);
  const renderClip   = useTransform(clipProgress, (v) => `circle(${v}% at 55% 50%)`);

  // Render layer
  const rn_opacity = useTransform(scrollYProgress, [0.24, 0.30], [0, 1]);
  const rn_scale   = useTransform(scrollYProgress, [0.25, 0.55, 0.78], [1.08, 1.02, 1.0]);
  const rn_y       = useTransform(scrollYProgress, [0.25, 0.80], ['0%', '-6%']);

  // Blueprint layer fades out during crossfade
  const bp_fadeout  = useTransform(scrollYProgress, [0.35, 0.52], [1, 0]);

  // Warm ambient glow intensifies
  const glowOp = useTransform(scrollYProgress, [0.32, 0.50, 0.72, 0.84], [0, 0.7, 0.7, 0]);

  // Manifesto 2 container
  const m2_op = useTransform(scrollYProgress, [0.32, 0.37, 0.52, 0.58], [0, 1, 1, 0]);
  const m2_y  = useTransform(scrollYProgress, [0.32, 0.37, 0.52, 0.58], [50, 0, 0, -40]);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 3 — THE REVEAL  (0.55 → 0.82)
     Full render visible. Slow cinematic zoom. CTA + annotations appear.
  ═══════════════════════════════════════════════════════════════════════════ */
  // Annotations fade in
  const annOp = useTransform(scrollYProgress, [0.48, 0.56, 0.72, 0.80], [0, 1, 1, 0]);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 4 — THE FINAL FRAME (0.70 → 1.0)
     Blue overlay settles over the render. Selected Works spread appears & stays fixed.
  ═══════════════════════════════════════════════════════════════════════════ */
  // Blue overlay - transitions to full opacity at 0.85 and stays solid through 1.0
  const blueOverlayOp = useTransform(scrollYProgress, [0.70, 0.85, 1.0], [0, 1.0, 1.0]);

  // Selected Works spread - fades in by 0.85 and stays locked at opacity 1, y 0, scale 1 through 1.0
  const ctaOp    = useTransform(scrollYProgress, [0.72, 0.85, 1.0], [0, 1, 1]);
  const ctaY     = useTransform(scrollYProgress, [0.72, 0.85, 1.0], [30, 0, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.72, 0.85, 1.0], [0.95, 1, 1]);

  // Scroll cue
  const cueOp = useTransform(scrollYProgress, [0, 0.035], [1, 0]);

  // Progress bar visibility - stays visible once final frame is active
  const progressVis = useTransform(scrollYProgress, [0, 0.05, 0.85, 1.0], [0, 1, 1, 1]);

  // Background tone shift
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.50, 0.80, 1.0],
    ['#93A3B9', '#8A9BB3', '#7B8FA6', '#6E8298', '#93A3B9']
  );

  // ─── Vignette intensity ──────────────────────────────────────────────────
  const vignetteOp = useTransform(scrollYProgress, [0, 0.10, 0.50, 0.80], [0.6, 0.3, 0.2, 0.4]);

  return (
    <>
      {/* ████  HERO — 700vh scroll canvas  ████ */}
      <section
        ref={heroRef}
        aria-label="Portfolio hero"
        className="relative w-full hero-scroll-container"
        style={{ height: '700vh' }}
      >
        <motion.div
          className="sticky top-0 w-full h-screen overflow-hidden"
          style={{ backgroundColor: bgColor, willChange: 'background-color' }}
        >
          {/* ── Architectural Grid ── */}
          <motion.div
            className="absolute inset-0 hero-grid pointer-events-none z-[1]"
            style={{ opacity: gridOp }}
          />

          {/* ── Cinematic Vignette ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              opacity: vignetteOp,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          {/* ═══════ IMAGE LAYERS ═══════ */}

          {/* Blueprint Layer — full page cover */}
          <motion.div
            className="absolute inset-0 z-[2]"
            style={{
              scale: bp_scale,
              y: bp_y,
              opacity: bp_fadeout,
            }}
          >
            <motion.img
              src="/hero-blueprint.jpg"
              alt="Architectural Section — Blueprint"
              className="hero-section-img w-full h-full object-cover object-center"
              style={{
                filter: bp_filter,
              }}
            />
          </motion.div>

          {/* Render Layer — reveals via clip-path wipe */}
          <motion.div
            className="absolute inset-0 z-[3]"
            style={{
              opacity: rn_opacity,
              scale: rn_scale,
              y: rn_y,
              clipPath: renderClip,
            }}
          >
            <img
              src="/hero-render.jpg"
              alt="Architectural Section — Full Render"
              className="hero-section-img w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Warm Glow overlay */}
          <motion.div
            className="absolute inset-0 z-[4] pointer-events-none"
            style={{
              opacity: glowOp,
              background: 'radial-gradient(ellipse at 55% 50%, rgba(255,190,90,0.12) 0%, rgba(255,140,50,0.06) 40%, transparent 70%)',
            }}
          />

          {/* ═══════ TYPOGRAPHY ═══════ */}

          {/* Manifesto 1 — Act 1 */}
          <motion.div
            className="absolute left-[4%] md:left-[7%] top-1/2 -translate-y-1/2 z-[10] pointer-events-none max-w-[260px] sm:max-w-[300px] md:max-w-[360px]"
            style={{ opacity: m1_op, y: m1_y }}
          >
            <div className="hero-manifesto text-[22px] sm:text-[28px] md:text-[38px] lg:text-[46px] leading-[1.0]">
              {MANIFESTO_1.map((word, i) => (
                <ManifestoWord
                  key={`m1-${i}`}
                  word={word}
                  index={i}
                  scrollProgress={scrollYProgress}
                  baseOffset={0.04}
                  stagger={0.014}
                />
              ))}
            </div>
          </motion.div>

          {/* Manifesto 2 — Act 2 */}
          <motion.div
            className="absolute left-[4%] md:left-[7%] top-1/2 -translate-y-1/2 z-[10] pointer-events-none max-w-[260px] sm:max-w-[300px] md:max-w-[380px]"
            style={{ opacity: m2_op, y: m2_y }}
          >
            <div className="hero-manifesto text-[22px] sm:text-[28px] md:text-[38px] lg:text-[46px] leading-[1.0]">
              {MANIFESTO_2.map((word, i) => (
                <ManifestoWord
                  key={`m2-${i}`}
                  word={word}
                  index={i}
                  scrollProgress={scrollYProgress}
                  baseOffset={0.33}
                  stagger={0.014}
                />
              ))}
            </div>
          </motion.div>

          {/* ═══════ ACT 4 — SELECTED WORKS FINAL SPREAD (CENTERED & FIXED BELOW NAVBAR) ═══════ */}
          <motion.div
            className="absolute inset-0 z-[12] flex flex-col justify-center items-center pt-20 md:pt-32 pb-8 px-4 md:px-12 text-center overflow-y-auto"
            style={{ opacity: ctaOp, y: ctaY, scale: ctaScale }}
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center mb-6 md:mb-8 shrink-0">
              <span className="font-body text-xs tracking-[0.3em] uppercase text-white/60 mb-2 md:mb-3">Portfolio Collection</span>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-3 md:mb-4">
                Selected Works
              </h2>
              <p className="font-body text-white/80 tracking-wide text-xs md:text-sm max-w-lg mb-6 md:mb-8 leading-relaxed">
                A curated selection of architectural interventions, spatial explorations, and structural designs.
              </p>
              <div className="w-full flex justify-center">
                <Link to="/portfolio" className="cta-explore shadow-2xl">
                  <span>Explore My Work</span>
                  <span className="cta-arrow !w-9 !h-9 md:!w-14 md:!h-14">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:!w-8 md:!h-8">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 16 16 12 12 8" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Featured Project Previews Grid */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 text-left shrink-0">
              <Link to="/project/living-infrastructure" className="group glass-panel rounded-2xl overflow-hidden p-4 transition-all duration-500 hover:bg-white/20">
                <div className="w-full h-36 md:h-44 rounded-xl overflow-hidden mb-3">
                  <img src="/living-infrastructure-board.png" alt="Living Infrastructure" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/60 block mb-1">01 / Urban Community</span>
                <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-white/90">Living Infrastructure</h3>
              </Link>

              <Link to="/portfolio" className="group glass-panel rounded-2xl overflow-hidden p-4 transition-all duration-500 hover:bg-white/20">
                <div className="w-full h-36 md:h-44 rounded-xl overflow-hidden mb-3">
                  <img src="/prismatic-infill-board-full.png" alt="Prismatic Infill" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: 'center 0%' }} />
                </div>
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/60 block mb-1">02 / Residential</span>
                <h3 className="font-display text-xl md:text-2xl text-white group-hover:text-white/90">Prismatic Infill</h3>
              </Link>
            </div>
          </motion.div>

          {/* ═══════ ANNOTATIONS — Act 3 ═══════ */}
          <motion.div
            className="absolute inset-0 z-[6] pointer-events-none hidden lg:block"
            style={{ opacity: annOp }}
          >
            {[
              { label: 'Rooftop Garden', t: '14%', l: '58%' },
              { label: 'Bedroom Suite',  t: '30%', l: '68%' },
              { label: 'Home Office',    t: '50%', l: '64%' },
              { label: 'Kitchen',        t: '75%', l: '60%' },
            ].map((a) => (
              <div key={a.label} className="arch-annotation" style={{ top: a.t, left: a.l }}>
                <div className="marker" />
                <div className="leader" />
                <span className="label">{a.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ═══════ BLUE OVERLAY — Act 4 ═══════ */}
          <motion.div
            className="absolute inset-0 z-[8] pointer-events-none"
            style={{
              opacity: blueOverlayOp,
              backgroundColor: '#93A3B9',
            }}
          />

          {/* ═══════ TOP GRADIENT (nav legibility) ═══════ */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 z-[9] pointer-events-none"
            style={{
              height: '140px',
              background: 'linear-gradient(to bottom, rgba(147,163,185,0.8) 0%, transparent 100%)',
            }}
          />

          {/* ═══════ SCROLL CUE ═══════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            style={{ opacity: cueOp }}
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-2.5 pointer-events-none"
          >
            <span
              className="font-body text-[9px] tracking-[0.3em] uppercase leading-none"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Scroll
            </span>
            <div className="relative w-px h-10 overflow-hidden">
              <div className="scroll-line" />
            </div>
          </motion.div>

          {/* ═══════ SCROLL PROGRESS ═══════ */}
          <ScrollProgress progress={scrollYProgress} visible={progressVis} />
        </motion.div>
      </section>
    </>
  );
}
