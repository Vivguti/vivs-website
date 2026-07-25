import { useRef, useCallback, type MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ─── Project Data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'Living Infrastructure',
    blurb: 'A modular multi-unit housing system promoting neighborly interaction and urban density.',
    image: '/living-infrastructure-board-full.png',
    imagePosition: 'center top',
    type: 'Urban Residential Community',
    route: '/project/living-infrastructure',
  },
  {
    id: '02',
    title: 'Prismatic Infill',
    blurb: 'A study in light, shadow, and minimalist residential spacing.',
    image: '/prismatic-infill-board-full.png',
    imagePosition: '50% 25%',
    type: 'Residential',
  },
  {
    id: '03',
    title: 'The Last Kitchen',
    blurb: 'A systemic exploration of vertical high-density living modules.',
    image: '/the-last-kitchen-board-full.png',
    imagePosition: '50% 80%',
    type: 'Residential',
  },
  {
    id: '04',
    title: 'Trinity Modern Bathhouse',
    blurb: 'Blurring the boundaries between interior and exterior water rituals.',
    image: '/trinity-bathhouse-board-full.png',
    imagePosition: '50% 50%',
    type: 'Commercial',
  },
];

// ─── Parallax helper for glass overlays ────────────────────────────────────────
function useParallaxGlass() {
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const glass = card.querySelector<HTMLElement>('[data-glass]');
    if (glass) {
      glass.style.transform = `translate(${x * 14}px, ${y * 14}px)`;
    }
    const img = card.querySelector<HTMLElement>('img');
    if (img) {
      img.style.transform = `scale(1.04) translate(${-x * 6}px, ${-y * 6}px)`;
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const glass = card.querySelector<HTMLElement>('[data-glass]');
    if (glass) glass.style.transform = 'translate(0,0)';
    const img = card.querySelector<HTMLElement>('img');
    if (img) img.style.transform = 'scale(1) translate(0,0)';
  }, []);

  return { handleMouseMove, handleMouseLeave };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function ProjectGallery() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { handleMouseMove, handleMouseLeave } = useParallaxGlass();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'start 30%'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-24 pb-48 overflow-hidden bg-[#93A3B9]"
    >
      {/* ── Vertical watermark ── */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none select-none z-0">
        <p
          className="font-display text-[80px] font-light italic leading-none text-white/[0.06]"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
        >
          The Portfolio
        </p>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-10">
        {/* ── Section Header ── */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-28 border-b border-white/20 pb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-body text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">Curation</span>
              <div className="w-10 h-px bg-white/20" />
              <span className="font-display text-lg text-white/70 italic">Vol. 01 / 2024</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-light tracking-tight text-white leading-none">
              Selected Works
            </h2>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-4 group/cta cursor-pointer"
          >
            <span className="font-body text-[11px] tracking-[0.18em] uppercase font-semibold text-white/80 group-hover/cta:text-white transition-colors">
              View Full Archive
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover/cta:scale-110 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover/cta:bg-white/20">
              <img src="/icon-back.png" alt="arrow right" className="w-full h-full object-cover scale-x-[-1] opacity-90 invert" />
            </div>
          </button>
        </motion.div>

        {/* ── Asymmetric Project Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* ─ Card 1: Primary Feature (large left) ─ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 relative group overflow-hidden cursor-pointer rounded-3xl"
            style={{ height: '800px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => projects[0].route && navigate(projects[0].route)}
          >
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-full object-cover brightness-95 opacity-90 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
              style={{ objectPosition: projects[0].imagePosition, transition: 'transform 0.4s ease-out, filter 0.7s ease, opacity 0.7s ease' }}
            />
            {/* Light glass overlay */}
            <div
              data-glass
              className="absolute top-10 left-10 max-w-xs p-8 rounded-2xl transition-transform duration-[400ms] ease-out"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-slate-500 block mb-2">
                Project {projects[0].id}
              </span>
              <h3 className="font-display text-4xl text-slate-800 mb-3 leading-tight">
                {projects[0].title}
              </h3>
              <p className="font-body text-sm text-slate-600 leading-relaxed mb-5">
                {projects[0].blurb}
              </p>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-slate-700 border-b border-slate-400 pb-1 inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                View Inquiry
                <span 
                  className="w-6 h-6 scale-x-[-1] bg-[#1A2340] inline-block opacity-90" 
                  style={{
                    maskImage: "url('/icon-back.png')",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: "url('/icon-back.png')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat"
                  }}
                />
              </span>
            </div>
          </motion.div>

          {/* ─ Cards 2 & 3: Stacked right column ─ */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group overflow-hidden cursor-pointer rounded-3xl"
              style={{ height: '460px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={projects[1].image}
                alt={projects[1].title}
                className="w-full h-full object-cover brightness-95 opacity-90 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
                style={{ objectPosition: projects[1].imagePosition, transition: 'transform 0.4s ease-out, filter 0.7s ease, opacity 0.7s ease' }}
              />
              <div
                data-glass
                className="absolute bottom-6 right-6 min-w-[220px] p-6 rounded-2xl transition-transform duration-[400ms] ease-out"
                style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.6)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-slate-500 block mb-1">
                  Project {projects[1].id}
                </span>
                <h3 className="font-display text-2xl text-slate-800">{projects[1].title}</h3>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative group overflow-hidden cursor-pointer rounded-3xl"
              style={{ height: '324px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={projects[2].image}
                alt={projects[2].title}
                className="w-full h-full object-cover brightness-95 opacity-90 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
                style={{ objectPosition: projects[2].imagePosition, transition: 'transform 0.4s ease-out, filter 0.7s ease, opacity 0.7s ease' }}
              />
              {/* Center-reveal glass on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/30 backdrop-blur-sm">
                <div
                  className="px-8 py-4 rounded-2xl font-display text-lg tracking-widest text-slate-800 italic cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.80)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  }}
                >
                  {projects[2].title}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─ Card 4: Full-width cinematic span ─ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-12 relative group overflow-hidden cursor-pointer rounded-3xl"
            style={{ height: '600px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={projects[3].image}
              alt={projects[3].title}
              className="w-full h-full object-cover brightness-95 opacity-90 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
              style={{ objectPosition: projects[3].imagePosition, transition: 'transform 0.4s ease-out, filter 0.7s ease, opacity 0.7s ease' }}
            />
            {/* Left vertical label bar */}
            <div className="absolute top-0 bottom-0 left-0 w-20 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-l-3xl">
              <span
                className="font-body text-[11px] tracking-[0.45em] uppercase text-slate-700 font-semibold"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                {projects[3].title}
              </span>
            </div>
            {/* Right glass info panel */}
            <div
              data-glass
              className="absolute top-1/2 right-10 -translate-y-1/2 max-w-sm p-10 rounded-2xl transition-transform duration-[400ms] ease-out"
              style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.6)',
                borderLeft: '4px solid rgba(147,163,185,0.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              }}
            >
              <h3 className="font-display text-3xl italic text-slate-800 mb-2">{projects[3].title}</h3>
              <p className="font-body text-sm text-slate-600 leading-relaxed mb-6">
                {projects[3].blurb}
              </p>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase font-semibold text-slate-700 border-b border-slate-400 pb-1">
                Case Study Available
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Archive Trigger ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 flex flex-col md:flex-row justify-between items-start md:items-end border-t-2 border-white/20 pt-10"
        >
          <div>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-white/50 block mb-1">Navigation</span>
            <h4 className="font-display text-2xl text-white">Explore Archive</h4>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-4 group/btn cursor-pointer mt-4 md:mt-0"
          >
            <span className="font-body text-[11px] tracking-[0.18em] uppercase font-semibold text-white/80">
              See All Work
            </span>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover/btn:scale-110 overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover/btn:bg-white/20">
              <img src="/icon-back.png" alt="arrow right" className="w-full h-full object-cover scale-x-[-1] opacity-90 invert" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
