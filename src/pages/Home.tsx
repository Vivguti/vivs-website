import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue, type MotionStyle } from 'framer-motion';
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

// ─── Staggered word sub-component (scroll-linked across mobile & desktop) ──────
function ManifestoWord({
  word, index, scrollProgress, baseOffset, stagger,
}: {
  word: string; index: number; scrollProgress: MotionValue<number>;
  baseOffset: number; stagger: number;
}) {
  const start = baseOffset + index * stagger;
  const end = start + 0.022;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [18, 0]);

  return (
    <motion.span className="inline-block mr-[0.3em] transform-gpu" style={{ opacity, y }}>
      {word}
    </motion.span>
  );
}

// ─── Manifesto Block ───────────────────────────────────────────────────────────
function ManifestoBlock({
  words,
  containerStyle,
  containerClass,
  scrollProgress,
  baseOffset,
  stagger,
}: {
  words: string[];
  containerStyle: MotionStyle;
  containerClass: string;
  scrollProgress: MotionValue<number>;
  baseOffset: number;
  stagger: number;
}) {
  return (
    <motion.div className={`${containerClass} transform-gpu`} style={containerStyle}>
      <div className="hero-manifesto text-[22px] sm:text-[28px] md:text-[38px] lg:text-[46px] leading-[1.0]">
        {words.map((word, i) => (
          <ManifestoWord
            key={`${word}-${i}`}
            word={word}
            index={i}
            scrollProgress={scrollProgress}
            baseOffset={baseOffset}
            stagger={stagger}
          />
        ))}
      </div>
    </motion.div>
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

  // Detect mobile screen to tune scroll height and spring physics
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Fast, ultra-responsive spring interpolation — high stiffness and lighter mass
  // so mobile touch scrolling drives the original hero animation instantly and smoothly.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 180 : 120,
    damping: isMobile ? 24 : 22,
    mass: isMobile ? 0.5 : 1,
    restDelta: 0.0001,
  });

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 1 — THE BLUEPRINT  (0 → 0.22)
     Blueprint visible immediately. Scales from subtle zoom to settled.
     Manifesto 1 types in word-by-word with scroll.
  ═══════════════════════════════════════════════════════════════════════════ */
  const bp_scale     = useTransform(smoothProgress, [0, 0.12],   [1.10, 1.03]);
  const bp_y         = useTransform(smoothProgress, [0, 0.45],   ['0%', '-6%']);
  const bp_filter    = useTransform(
    smoothProgress, [0, 0.20, 0.40],
    ['brightness(1.05) contrast(1.1)', 'brightness(1.0) contrast(1.05)', 'brightness(0.9) contrast(1.0)']
  );

  // Grid overlay pulsing behind blueprint
  const gridOp = useTransform(smoothProgress, [0, 0.04, 0.18, 0.26], [0, 0.07, 0.07, 0]);

  // Manifesto 1 container
  const m1_op = useTransform(smoothProgress, [0.015, 0.05, 0.20, 0.26], [0, 1, 1, 0]);
  const m1_y  = useTransform(smoothProgress, [0.015, 0.05, 0.20, 0.26], [40, 0, 0, -30]);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 2 — THE METAMORPHOSIS  (0.20 → 0.48)
     Render image crossfades over blueprint via clip-path wipe.
     Blueprint fades to 0. Render saturates to full warmth.
     Manifesto 2 appears.
  ═══════════════════════════════════════════════════════════════════════════ */
  // Clip-path reveal — circle grows from center
  const clipProgress = useTransform(smoothProgress, [0.18, 0.44], [0, 150]);
  const renderClip   = useTransform(clipProgress, (v) => `circle(${v}% at 55% 50%)`);

  // Render layer
  const rn_opacity = useTransform(smoothProgress, [0.18, 0.25], [0, 1]);
  const rn_scale   = useTransform(smoothProgress, [0.18, 0.48, 0.70], [1.06, 1.02, 1.0]);
  const rn_y       = useTransform(smoothProgress, [0.18, 0.70], ['0%', '-5%']);

  // Blueprint layer fades out during crossfade
  const bp_fadeout  = useTransform(smoothProgress, [0.28, 0.44], [1, 0]);

  // Warm ambient glow intensifies
  const glowOp = useTransform(smoothProgress, [0.25, 0.42, 0.65, 0.76], [0, 0.7, 0.7, 0]);

  // Manifesto 2 container
  const m2_op = useTransform(smoothProgress, [0.25, 0.30, 0.44, 0.50], [0, 1, 1, 0]);
  const m2_y  = useTransform(smoothProgress, [0.25, 0.30, 0.44, 0.50], [40, 0, 0, -30]);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 3 — THE REVEAL  (0.48 → 0.72)
     Full render visible. Slow cinematic zoom. CTA + annotations appear.
  ═══════════════════════════════════════════════════════════════════════════ */
  // Annotations fade in
  const annOp = useTransform(smoothProgress, [0.40, 0.48, 0.64, 0.72], [0, 1, 1, 0]);

  /* ═══════════════════════════════════════════════════════════════════════════
     ACT 4 — THE FINAL FRAME (0.60 → 0.90)
     Blue overlay settles over the render. Selected Works spread appears & stays fixed.
  ═══════════════════════════════════════════════════════════════════════════ */
  // Blue overlay - transitions to full opacity faster by 0.75
  const blueOverlayOp = useTransform(smoothProgress, [0.58, 0.75, 1.0], [0, 1.0, 1.0]);

  // Selected Works spread - fades in by 0.75 and stays locked at opacity 1, y 0, scale 1 through 1.0
  const ctaOp    = useTransform(smoothProgress, [0.60, 0.75, 1.0], [0, 1, 1]);
  const ctaY     = useTransform(smoothProgress, [0.60, 0.75, 1.0], [24, 0, 0]);
  const ctaScale = useTransform(smoothProgress, [0.60, 0.75, 1.0], [0.96, 1, 1]);

  // Scroll cue — use raw progress so it hides immediately when user starts scrolling
  const cueOp = useTransform(scrollYProgress, [0, 0.035], [1, 0]);

  // Progress bar visibility — raw progress so it's always in sync with real scroll
  const progressVis = useTransform(scrollYProgress, [0, 0.05, 0.85, 1.0], [0, 1, 1, 1]);

  // Background tone shift
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.50, 0.80, 1.0],
    ['#93A3B9', '#8A9BB3', '#7B8FA6', '#6E8298', '#93A3B9']
  );

  // ─── Vignette intensity ──────────────────────────────────────────────────
  const vignetteOp = useTransform(smoothProgress, [0, 0.10, 0.50, 0.80], [0.6, 0.3, 0.2, 0.4]);

  return (
    <>
      {/* ████  HERO — Interactive multi-act scroll canvas (400vh on mobile, 700vh on desktop)  ████ */}
      <section
        ref={heroRef}
        aria-label="Portfolio hero"
        className="relative w-full hero-scroll-container"
        style={{ height: isMobile ? '400vh' : '700vh' }}
      >
        <motion.div
          className="sticky top-0 w-full h-screen overflow-hidden transform-gpu"
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
            className="absolute inset-0 z-[2] transform-gpu"
            style={{
              scale: bp_scale,
              y: bp_y,
              opacity: bp_fadeout,
              willChange: 'transform, opacity',
            }}
          >
            <motion.img
              src="/hero-blueprint.jpg"
              alt="Architectural Section — Blueprint"
              className="hero-section-img w-full h-full object-cover object-center transform-gpu"
              style={{
                filter: bp_filter,
                willChange: 'filter, transform',
              }}
            />
          </motion.div>

          {/* Render Layer — reveals via clip-path wipe */}
          <motion.div
            className="absolute inset-0 z-[3] transform-gpu"
            style={{
              opacity: rn_opacity,
              scale: rn_scale,
              y: rn_y,
              clipPath: renderClip,
              willChange: 'transform, opacity, clip-path',
            }}
          >
            <img
              src="/hero-render.jpg"
              alt="Architectural Section — Full Render"
              className="hero-section-img w-full h-full object-cover object-center transform-gpu"
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
          <ManifestoBlock
            words={MANIFESTO_1}
            containerClass="absolute left-[4%] md:left-[7%] top-1/2 -translate-y-1/2 z-[10] pointer-events-none max-w-[260px] sm:max-w-[300px] md:max-w-[360px]"
            containerStyle={{ opacity: m1_op, y: m1_y }}
            scrollProgress={smoothProgress}
            baseOffset={0.02}
            stagger={0.010}
          />

          {/* Manifesto 2 — Act 2 */}
          <ManifestoBlock
            words={MANIFESTO_2}
            containerClass="absolute left-[4%] md:left-[7%] top-1/2 -translate-y-1/2 z-[10] pointer-events-none max-w-[260px] sm:max-w-[300px] md:max-w-[380px]"
            containerStyle={{ opacity: m2_op, y: m2_y }}
            scrollProgress={smoothProgress}
            baseOffset={0.22}
            stagger={0.010}
          />

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
