import GlassPanel from '../components/GlassPanel';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div 
      className="relative min-h-screen bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: "url('/about-bg-2.jpg')" }}
    >
      {/* Subtle overlay to ensure the white text and glass panels remain readable against the bright image */}
      <div className="absolute inset-0 bg-[#1a2340]/40" />

      <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto flex flex-col gap-12">
      {/* ── Header — Animates in first ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 text-shadow-subtle">
          Vivian Gutierrez
        </h1>
        <p className="font-body text-xl text-white/80 font-medium tracking-wide">
          3rd Year Architecture Student
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Left Column: Contact & Skills ── */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <GlassPanel delay={0.2} heavy>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,4 12,13 2,4" />
                  </svg>
                </div>
                <a href="mailto:Vivguti09@gmail.com" className="font-body text-lg hover:text-white transition-colors">
                  Vivguti09@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a href="tel:3464051003" className="font-body text-lg hover:text-white transition-colors">
                  (346) 405-1003
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <span className="font-bold text-sm">in</span>
                </div>
                <a href="https://www.linkedin.com/in/vivguti/" target="_blank" rel="noreferrer" className="font-body text-lg hover:text-white transition-colors break-all">
                  linkedin.com/in/vivguti
                </a>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel delay={0.3}>
            <h2 className="font-display text-2xl font-bold text-white mb-10 uppercase tracking-wider">
              Skills & Proficiencies
            </h2>
            
            <div className="flex flex-col gap-12">
              {/* Design Software */}
              <div>
                <h3 className="font-body text-xs font-bold text-white/80 uppercase tracking-[0.3em] mb-4 border-b border-white/15 pb-3">Design Software</h3>
                <div className="flex flex-col gap-3">
                  {['Rhino', 'Sketchup', 'AutoCAD', 'Revit'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-panel w-full py-5 px-6 rounded-sm flex items-center justify-between hover:bg-white/10 transition-colors duration-500 cursor-default group"
                    >
                      <span className="font-display text-2xl text-white/90 group-hover:text-white transition-colors">{skill}</span>
                      <div className="h-px w-12 bg-white/20 group-hover:bg-white/60 group-hover:w-24 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Comm. */}
              <div>
                <h3 className="font-body text-xs font-bold text-white/80 uppercase tracking-[0.3em] mb-4 border-b border-white/15 pb-3">Visual Communication</h3>
                <div className="flex flex-col gap-3">
                  {['Photoshop', 'Illustrator', 'Adobe InDesign'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-panel w-full py-5 px-6 rounded-sm flex items-center justify-between hover:bg-white/10 transition-colors duration-500 cursor-default group"
                    >
                      <span className="font-display text-2xl text-white/90 group-hover:text-white transition-colors">{skill}</span>
                      <div className="h-px w-12 bg-white/20 group-hover:bg-white/60 group-hover:w-24 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Web & Branding */}
              <div>
                <h3 className="font-body text-xs font-bold text-white/80 uppercase tracking-[0.3em] mb-4 border-b border-white/15 pb-3">Web & Branding</h3>
                <div className="flex flex-col gap-3">
                  {['Google Antigravity', 'Claude AI', 'Figma'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-panel w-full py-5 px-6 rounded-sm flex items-center justify-between hover:bg-white/10 transition-colors duration-500 cursor-default group"
                    >
                      <span className="font-display text-2xl text-white/90 group-hover:text-white transition-colors">{skill}</span>
                      <div className="h-px w-12 bg-white/20 group-hover:bg-white/60 group-hover:w-24 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* ── Right Column: Experience, Education, Achievements ── */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          <GlassPanel delay={0.25}>
            <h2 className="font-display text-2xl font-bold text-white mb-4 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="font-body text-white/80 leading-relaxed text-lg">
              Architecture student at Texas A&M University, blending technical design with branding expertise through my digital design studio focused on enhancing communication and experience.
            </p>
          </GlassPanel>

          <GlassPanel delay={0.35}>
            <h2 className="font-display text-2xl font-bold text-white mb-8 uppercase tracking-wider">
              Work Experience
            </h2>
            
            <div className="flex flex-col gap-8 relative border-l border-white/20 pl-6 ml-2">
              <div className="relative">
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[31px] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <h3 className="font-display text-xl font-bold text-white">Customer Service & Technician — Sour Apple Repair</h3>
                <p className="font-body text-sm text-white/60 mb-3 tracking-wider">2026 – PRESENT</p>
                <ul className="list-disc list-inside text-white/80 space-y-1 font-body">
                  <li>Delivered outstanding customer service, building strong relationships and trust with clients.</li>
                  <li>Served as a technology technician performing diagnostics and hardware/software repairs for mobile and electronic devices.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[31px] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <h3 className="font-display text-xl font-bold text-white">Founder — Aggie Web Creators</h3>
                <p className="font-body text-sm text-white/60 mb-3 tracking-wider">2025 – PRESENT</p>
                <ul className="list-disc list-inside text-white/80 space-y-1 font-body">
                  <li>Launched a digital design business with diverse clients.</li>
                  <li>Manage project timelines and client relationships effectively.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[31px] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                <h3 className="font-display text-xl font-bold text-white">Tutor Coordinator — TAMU Reads & Counts</h3>
                <p className="font-body text-sm text-white/60 mb-3 tracking-wider">2024 – PRESENT</p>
                <ul className="list-disc list-inside text-white/80 space-y-1 font-body">
                  <li>Oversee scheduling and logistics for tutoring programs.</li>
                  <li>Mentor tutors and manage time-entry systems.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3 h-3 bg-white/50 rounded-full -left-[31px] top-1.5" />
                <h3 className="font-display text-xl font-bold text-white/80">Marketing Assistant — Miller Hats</h3>
                <p className="font-body text-sm text-white/50 mb-3 tracking-wider">2021 – 2023</p>
                <ul className="list-disc list-inside text-white/70 space-y-1 font-body">
                  <li>Curated brand identity and digital content creation.</li>
                  <li>High Proficiency with Adobe Creative Suite for visual assets.</li>
                </ul>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel delay={0.45}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider">
                  Education
                </h2>
                <div className="mb-6">
                  <h3 className="font-body text-lg font-bold text-white">Texas A&M University</h3>
                  <p className="font-body text-white/80 text-sm">College Station, TX</p>
                  <p className="font-body text-white/80 mt-2">Bachelor of Science in Architecture</p>
                  <p className="font-body text-white/60 text-sm mt-1">May 2028</p>
                </div>
                <div>
                  <h3 className="font-body text-lg font-bold text-white">Klein Cain High School</h3>
                  <p className="font-body text-white/80 text-sm">Houston, TX</p>
                  <p className="font-body text-white/80 mt-2">High School Graduate</p>
                  <p className="font-body text-white/60 text-sm mt-1">Honor Graduate Recognition • May 2024</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider">
                  Achievements
                </h2>
                <div className="mb-6">
                  <h3 className="font-body text-lg font-bold text-white">HSF Scholar Award</h3>
                  <p className="font-body text-white/80 text-sm">Hispanic Scholarship Fund</p>
                  <p className="font-body text-white/60 text-sm mt-1 mb-2">June 2025</p>
                  <p className="font-body text-white/70 text-sm">Recognized for academic excellence and leadership potential.</p>
                </div>
                <div>
                  <h3 className="font-body text-lg font-bold text-white">2025 NSCS Recipient</h3>
                  <p className="font-body text-white/80 text-sm">National Society of Collegiate Scholars</p>
                  <p className="font-body text-white/60 text-sm mt-1 mb-2">April 2025</p>
                  <p className="font-body text-white/70 text-sm">Received for academic excellence at the collegiate level for undergraduates.</p>
                </div>
              </div>
            </div>
          </GlassPanel>

        </div>
      </div>
    </div>
    </div>
  );
}
