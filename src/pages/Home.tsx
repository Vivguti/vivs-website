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
  const end = start + 0.055;
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const y = useTransform(scrollProgress, [start, end], [14, 0]);

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

  // Critically-damped spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 35,
    mass: 1,
    restDelta: 0.001,
  });

  /* ═══════════════════════════════════════════════════════════════════════════
     SINGLE IMAGE — Render visible from the start, gentle cinematic zoom
  ═══════════════════════════════════════════════════════════════════════════ */
  const img_scale = useTransform(smoothProgress, [0, 0.5, 1.0], [1.08, 1.03, 1.0]);
  const img_y     = useTransform(smoothProgress, [0, 1.0], ['0%', '-5%']);

  // Warm ambient glow
  const glowOp = useTransform(smoothProgress, [0.15, 0.35, 0.55, 0.70], [0, 0.7, 0.7, 0]);

  /* ═══════════════════════════════════════════════════════════════════════════
     TEXT — Manifesto 1 appears first, fades out, Manifesto 2 appears, fades out
  ═══════════════════════════════════════════════════════════════════════════ */
  // Manifesto 1 container
  const m1_op = useTransform(smoothProgress, [0.02, 0.06, 0.22, 0.30], [0, 1, 1, 0]);
  const m1_y  = useTransform(smoothProgress, [0.02, 0.06, 0.22, 0.30], [40, 0, 0, -30]);

  // Manifesto 2 container
  const m2_op = useTransform(smoothProgress, [0.28, 0.34, 0.48, 0.56], [0, 1, 1, 0]);
  const m2_y  = useTransform(smoothProgress, [0.28, 0.34, 0.48, 0.56], [40, 0, 0, -30]);

  /* ═══════════════════════════════════════════════════════════════════════════
     FINAL FRAME — Blue overlay + Selected Works slides up immediately after
  ═══════════════════════════════════════════════════════════════════════════ */
  const blueOverlayOp = useTransform(smoothProgress, [0.50, 0.70], [0, 1.0]);
  const ctaOp    = useTransform(smoothProgress, [0.55, 0.80], [0, 1]);
  const ctaY     = useTransform(smoothProgress, [0.52, 0.88], ['40vh', '0vh']);
  const ctaScale = useTransform(smoothProgress, [0.52, 0.88], [0.92, 1]);

  // Scroll cue — use raw progress so it hides immediately when user starts scrolling
  const cueOp = useTransform(scrollYProgress, [0, 0.035], [1, 0]);

  // Progress bar visibility
  const progressVis = useTransform(scrollYProgress, [0, 0.05, 0.70, 1.0], [0, 1, 1, 1]);

  // Background tone shift
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.50, 0.70, 1.0],
    ['#93A3B9', '#8A9BB3', '#7B8FA6', '#6E8298', '#93A3B9']
  );

  // Vignette intensity
  const vignetteOp = useTransform(smoothProgress, [0, 0.10, 0.50, 0.80], [0.6, 0.3, 0.2, 0.4]);

  return (
    <>
      {/* ████  HERO — Single image, two text transitions, quick scroll  ████ */}
      <section
        ref={heroRef}
        aria-label="Portfolio hero"
        className="relative w-full hero-scroll-container"
        style={{ height: isMobile ? '250vh' : '350vh' }}
      >
        <motion.div
          className="sticky top-0 w-full h-screen overflow-hidden transform-gpu"
          style={{ backgroundColor: bgColor, willChange: 'background-color' }}
        >
          {/* ── Cinematic Vignette ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-[5]"
            style={{
              opacity: vignetteOp,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          {/* ═══════ SINGLE IMAGE LAYER ═══════ */}
          <motion.div
            className="absolute inset-0 z-[2] transform-gpu"
            style={{
              scale: isMobile ? 1 : img_scale,
              y: isMobile ? 0 : img_y,
              willChange: 'transform',
            }}
          >
            <img
              src="/hero-render-4.png"
              alt="Architectural Section — Full Render"
              className="hero-section-img w-full h-full object-cover object-center transform-gpu"
              fetchPriority="high"
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

          {/* Manifesto 1 */}
          <ManifestoBlock
            words={MANIFESTO_1}
            containerClass="absolute left-[4%] md:left-[7%] top-1/2 -translate-y-1/2 z-[10] pointer-events-none max-w-[260px] sm:max-w-[300px] md:max-w-[360px]"
            containerStyle={{ opacity: m1_op, y: m1_y }}
            scrollProgress={smoothProgress}
            baseOffset={0.02}
            stagger={0.018}
          />

          {/* Manifesto 2 */}
          <ManifestoBlock
            words={MANIFESTO_2}
            containerClass="absolute left-[4%] md:left-[7%] top-1/2 -translate-y-1/2 z-[10] pointer-events-none max-w-[260px] sm:max-w-[300px] md:max-w-[380px]"
            containerStyle={{ opacity: m2_op, y: m2_y }}
            scrollProgress={smoothProgress}
            baseOffset={0.28}
            stagger={0.018}
          />

          {/* ═══════ SELECTED WORKS SPREAD ═══════ */}
          <motion.div
            className="absolute inset-0 z-[12] flex flex-col justify-center items-center my-auto pt-20 pb-10 px-5 md:px-12 text-center pointer-events-auto"
            style={{ opacity: ctaOp, y: ctaY, scale: ctaScale }}
          >
            <div className="max-w-4xl mx-auto flex flex-col items-center mb-8 shrink-0">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-4">
                <span className="font-light">Selected</span> <span className="font-light italic">Works</span>
              </h2>
              <div className="w-full flex justify-center mt-2">
                <Link to="/selected-works" className="cta-explore shadow-2xl py-3 px-6">
                  <span className="text-sm">Explore My Work</span>
                  <span className="cta-arrow !w-8 !h-8 md:!w-10 md:!h-10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:!w-5 md:!h-5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 16 16 12 12 8" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Featured Project Previews Grid */}
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-left shrink-0">
              <Link to="/project/living-infrastructure" className="group glass-panel rounded-3xl overflow-hidden p-5 md:p-8 transition-all duration-500 hover:bg-white/20">
                <div className="w-full h-56 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-5">
                  <img src="/living-infrastructure-board.png" alt="Living Infrastructure" loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="font-body text-[11px] md:text-sm tracking-[0.2em] uppercase text-white/60 block mb-2">01 / Urban Community</span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-white group-hover:text-white/90">Living Infrastructure</h3>
              </Link>

              <Link to="/selected-works" className="group glass-panel rounded-3xl overflow-hidden p-5 md:p-8 transition-all duration-500 hover:bg-white/20">
                <div className="w-full h-56 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-5">
                  <img src="/prismatic-infill-board-full.png" alt="Prismatic Infill" loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: 'center 0%' }} />
                </div>
                <span className="font-body text-[11px] md:text-sm tracking-[0.2em] uppercase text-white/60 block mb-2">02 / Residential</span>
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-white group-hover:text-white/90">Prismatic Infill</h3>
              </Link>
            </div>
          </motion.div>

          {/* ═══════ BLUE OVERLAY ═══════ */}
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
