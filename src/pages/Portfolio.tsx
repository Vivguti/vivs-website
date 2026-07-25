import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Project Data ──────────────────────────────────────────────────────────────
const projects = [
  {
    id: '01',
    title: 'Living Infrastructure',
    subtitle: 'Urban Residential Community · 2026',
    description:
      'This project explores a modular multi-unit housing system designed to increase residential density while maintaining adaptability, spatial quality, and long-term sustainability on a typical Austin urban lot. Through a repeatable framework of interconnected volumes, the design balances private living with shared community spaces, promoting neighborly interaction without sacrificing individual identity. Compact planning, efficient spatial organization, and flexible modular units create a scalable infill strategy that supports middle-income housing, encourages walkability, and provides a sustainable approach to future urban growth.',
    image: '/living-infrastructure-board.png',
    imagePosition: 'object-top',
    route: '/project/living-infrastructure',
    materialsLabel: 'Software Used:',
    materials: ['Rhino 3D', 'Adobe Photoshop', 'Adobe Illustrator', '3D Printing'],
    boardImage: '/living-infrastructure-board-full.png',
    diagrams: [
      { 
        label: 'Group Project', 
        value: 'Team', 
        detail: 'Vivian Gutierrez, Ryann Daugherty, Allison Bone, Janna Margaret Miraflores' 
      },
      { 
        label: 'Primary Focus', 
        value: 'Timber', 
        detail: 'Understanding load-bearing loads using timber wood framing.' 
      },
      { 
        label: 'Submission', 
        value: '2026', 
        detail: 'Submitted to 2026 Timber Competition' 
      },
    ],
  },
  {
    id: '02',
    title: 'Prismatic Infill',
    subtitle: 'Residential · 2026',
    description:
      'This project explores attainable modular housing as a strategy for increasing residential density in Austin while maintaining spatial quality, adaptability, and long-term sustainability. Rather than expanding through low-density sprawl or high-rise development, the proposal rethinks housing as a compact, repeatable system of interconnected volumes that can be inserted within a typical residential lot. The goal is to increase middle-income housing access without disrupting neighborhood scale.',
    image: '/prismatic-infill-board-full.png',
    imagePosition: 'object-top',
    boardImage: '/prismatic-infill-board-full.png',
    materialsLabel: 'Software Used:',
    materials: ['Rhino 3D', 'Adobe Photoshop', 'AutoCAD'],
    diagrams: [
      { 
        label: 'Group Project', 
        value: 'Team', 
        detail: 'Vivian Gutierrez, Ryann Daugherty, Allison Bone, Janna Margaret Miraflores' 
      },
      { 
        label: 'Primary Focus', 
        value: 'Timber', 
        detail: 'Understanding load-bearing loads using timber wood framing.' 
      },
      { 
        label: 'Submission', 
        value: '2026', 
        detail: 'Submitted to 2026 THE NEXT HOUSE: USA Competition' 
      },
    ],
  },
  {
    id: '03',
    title: 'The Last Kitchen',
    subtitle: 'Residential · 2025',
    description:
      'This project explores a dystopian vision of changing a common space of a kitchen into adapting to a fictional world that rethinks the kitchen as a controlled system that balances limited resources with social interaction. A top lever is the main design feature, opening and closing the space to activate the kitchen\'s functions. When the lever is engaged it shifts from a storage mode into a shared gathering area underneath a protective dome. The vision of this project was to have the kitchen encourage collaboration and routine. Even in a dystopian future, the space shows that architecture should not only help people survive but also give them a place to connect.',
    image: '/the-last-kitchen-board-full.png',
    imagePosition: 'object-center',
    boardImage: '/the-last-kitchen-board-full.png',
    materialsLabel: 'Software Used:',
    materials: ['Rhino 3D', 'Adobe Fresco', 'Google Gemini'],
    diagrams: [
      { 
        label: 'Concept Statement', 
        value: 'Concept', 
        detail: 'The kitchen becomes a breathing machine, opening for gathering and closing for survival.' 
      },
      { 
        label: 'Individual Project', 
        value: 'Dystopian', 
        detail: 'Individual project with dystopian theme.' 
      },
      { 
        label: 'Studio Project', 
        value: '2025', 
        detail: 'Architecture studio project fall 2025.' 
      },
    ],
  },
  {
    id: '04',
    title: 'Trinity Modern Bathhouse',
    subtitle: 'Commercial · 2025',
    description:
      'This project explored a communal bathhouse over a hill and throughout the development of the project our team wanted to develop a linear and central axis of grouped massings that would divide up the activities amoung the bathhouse. What was later developed through the project that made this project successful was having the actual baths be the central focus while also being the joining factor for all the individual massing clusters. The central baths follow a stacked terraced system with central staircases and the back baths break the central axis into having an asymmetrical appearance to promote a more open space that also overlooks the surrounding levee. The main goal of this design was to keep a central alignment of geometric clusters while breaking the symmetry to add more community to the back pools.',
    image: '/trinity-bathhouse-board-full.png',
    imagePosition: 'object-center',
    boardImage: '/trinity-bathhouse-board-full.png',
    materialsLabel: 'Software Used:',
    materials: ['Rhino 3D', '3D Printed Model Making', 'Adobe Photoshop'],
    diagrams: [
      { 
        label: 'Group Project', 
        value: 'Team', 
        detail: 'Vivian Gutierrez, Angel Caldera, Makenzie Mcgilvray' 
      },
      { 
        label: 'Primary Focus', 
        value: 'Urban', 
        detail: 'Learning to understand urban site relationships.' 
      },
      { 
        label: 'Studio Project', 
        value: '2025', 
        detail: 'Architecture Studio Fall 2025 project' 
      },
    ],
  },
];

// ─── Shared easing ─────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Glass Divider between projects ────────────────────────────────────────────
function ProjectDivider({ nextTitle, nextId }: { nextTitle: string; nextId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, ease: EASE }}
      className="flex items-center justify-center py-10 md:py-16 relative"
    >
      {/* Horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute w-full h-px bg-white/15 origin-left"
      />

      {/* Glass pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="relative z-10 px-12 py-6 rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
        }}
      >
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-slate-500 mb-1 text-center">
          Next — {nextId}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-slate-800 text-center italic">
          {nextTitle}
        </h3>
      </motion.div>
    </motion.div>
  );
}

// ─── Single Project Section ────────────────────────────────────────────────────
function ProjectSection({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // (Parallax removed as hero images are removed)

  // Fade-in for the content block
  const { scrollYProgress: contentScroll } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'start 30%'],
  });
  const contentOpacity = useTransform(contentScroll, [0, 1], [0, 1]);
  const contentY = useTransform(contentScroll, [0, 1], [60, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={sectionRef} className="flex flex-col gap-0">
      
      {/* ── Project Title Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1, ease: EASE }}
        className="mb-6 mt-4 md:mt-8"
      >
        <p className="font-body text-[11px] font-semibold tracking-[0.3em] uppercase text-white/80 mb-4">
          project {project.id} · {project.subtitle}
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-white leading-none">
          {project.title}
        </h2>
      </motion.div>

      {/* ── Content: Description + Diagrams + Materials ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 py-6 md:py-10`}
      >
        {/* Left/Right: Description */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, ease: EASE }}
            className="rounded-3xl p-8 md:p-12"
            style={{
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
            }}
          >
            <p className="font-body text-[11px] tracking-[0.25em] uppercase font-bold text-slate-700 mb-4">
              About the Project
            </p>
            <p className="font-body text-base md:text-lg text-slate-800 leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Materials / Software */}
            <p className="font-body text-[11px] tracking-[0.25em] uppercase font-bold text-slate-700 mb-4">
              {project.materialsLabel || 'Key Materials'}
            </p>
            <div className="flex flex-wrap gap-3">
              {project.materials.map((mat, i) => (
                <motion.span
                  key={mat}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
                  className="px-4 py-2 rounded-full text-xs font-medium text-slate-700"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.6)',
                  }}
                >
                  {mat}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right/Left: Diagrams / Stats */}
        <div className="flex-1 flex flex-col gap-6">
          {project.diagrams.map((diagram, i) => (
            <motion.div
              key={diagram.label}
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
              className="rounded-3xl p-8 flex items-center gap-8"
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
            >
              {/* Large stat value */}
              {diagram.value && (
                <div className="shrink-0">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: EASE }}
                    className="font-display text-3xl md:text-4xl font-light text-slate-800 leading-none"
                  >
                    {diagram.value}
                  </motion.span>
                </div>
              )}
              {/* Label + detail */}
              <div className="flex flex-col">
                <span className="font-body text-sm font-bold text-slate-800 mb-1">
                  {diagram.label}
                </span>
                <span className="font-body text-xs font-medium text-slate-600">
                  {diagram.detail}
                </span>
              </div>
              {/* Animated progress line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.12, ease: EASE }}
                className="flex-1 h-px bg-slate-300/60 origin-left hidden md:block"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Optional Full-Width Architecture Board ── */}
      {/* @ts-ignore - allow dynamic board image without strictly typing the array above */}
      {project.boardImage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: EASE }}
          className="w-full mt-8 md:mt-16 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            // @ts-ignore
            src={project.boardImage}
            alt={`${project.title} Architectural Board`}
            className="w-full object-contain bg-white"
          />
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Portfolio Page ───────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-[1500px] mx-auto min-h-screen">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="mb-10 md:mb-16"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-body text-[11px] tracking-[0.3em] uppercase text-white/50 mb-6"
        >
          Curated Collection · 2024 — 2026
        </motion.p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-none mb-8">
          Studio<br />
          <span className="italic">Portfolio Works</span>
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: EASE }}
          className="w-full h-px bg-white/20 origin-left"
        />
      </motion.div>

      {/* ── Project Sections with Dividers ── */}
      {projects.map((project, index) => (
        <div key={project.id}>
          <ProjectSection project={project} index={index} />
          {index < projects.length - 1 && (
            <ProjectDivider
              nextTitle={projects[index + 1].title}
              nextId={projects[index + 1].id}
            />
          )}
        </div>
      ))}

      {/* ── End of Archive ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        className="flex flex-col items-center text-center py-32 md:py-48"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
          className="w-24 h-px bg-white/20 mb-10"
        />
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
          End of Archive
        </p>
        <h3 className="font-display text-3xl md:text-4xl italic text-white/80 mb-8">
          More projects in progress
        </h3>
        <p className="font-body text-sm text-white/50 max-w-md leading-relaxed">
          New work is continuously being developed. Check back for upcoming residential, urban, and experimental design studies.
        </p>
      </motion.div>
    </div>
  );
}
