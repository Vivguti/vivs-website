import GlassPanel from '../components/GlassPanel';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div 
      className="relative min-h-screen bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: "url('/about-bg-2.jpg')" }}
    >
      {/* Background overlay to ensure maximum text and glass panel legibility */}
      <div className="absolute inset-0 bg-[#0f172a]/45" />

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
        <p className="font-body text-xl text-white/90 font-medium tracking-wide text-shadow-subtle">
          3rd Year Architecture Student
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Left Column: Contact & Skills ── */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <GlassPanel delay={0.2} className="!bg-white/30 !backdrop-blur-[50px] border border-white/45 shadow-lg">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-white/30 border border-white/50 flex items-center justify-center shrink-0 shadow-sm text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,4 12,13 2,4" />
                  </svg>
                </div>
                <a href="mailto:Vivguti09@gmail.com" className="font-body text-lg font-semibold text-white hover:text-white/80 transition-colors text-shadow-subtle">
                  Vivguti09@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-white/30 border border-white/50 flex items-center justify-center shrink-0 shadow-sm text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a href="tel:3464051003" className="font-body text-lg font-semibold text-white hover:text-white/80 transition-colors text-shadow-subtle">
                  (346) 405-1003
                </a>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-white/30 border border-white/50 flex items-center justify-center shrink-0 shadow-sm text-white">
                  <span className="font-bold text-sm">in</span>
                </div>
                <a href="https://www.linkedin.com/in/vivguti/" target="_blank" rel="noreferrer" className="font-body text-lg font-semibold text-white hover:text-white/80 transition-colors break-all text-shadow-subtle">
                  linkedin.com/in/vivguti
                </a>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel delay={0.3} className="!bg-white/30 !backdrop-blur-[50px] border border-white/45 shadow-lg">
            <h2 className="font-display text-2xl font-bold text-white mb-8 uppercase tracking-wider border-b border-white/25 pb-4 text-shadow-subtle">
              Skills & Proficiencies
            </h2>
            
            <div className="flex flex-col gap-10">
              {/* Design Software */}
              <div>
                <h3 className="font-body text-xs font-bold text-white/90 uppercase tracking-[0.3em] mb-4 text-shadow-subtle">Design Software</h3>
                <div className="flex flex-col gap-3">
                  {['Rhino', 'Sketchup', 'AutoCAD', 'Revit'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -40, scale: 0.95 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/20 hover:bg-white/35 border border-white/35 backdrop-blur-[50px] w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <span className="font-display text-2xl text-white font-bold group-hover:text-white transition-colors text-shadow-subtle">{skill}</span>
                      <motion.div 
                        initial={{ width: "16px", opacity: 0.4 }}
                        whileInView={{ width: "48px", opacity: 0.9 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
                        className="h-px bg-white/70 group-hover:bg-white group-hover:w-20 transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Comm. */}
              <div>
                <h3 className="font-body text-xs font-bold text-white/90 uppercase tracking-[0.3em] mb-4 text-shadow-subtle">Visual Communication</h3>
                <div className="flex flex-col gap-3">
                  {['Photoshop', 'Illustrator', 'Adobe InDesign'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -40, scale: 0.95 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/20 hover:bg-white/35 border border-white/35 backdrop-blur-[50px] w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <span className="font-display text-2xl text-white font-bold group-hover:text-white transition-colors text-shadow-subtle">{skill}</span>
                      <motion.div 
                        initial={{ width: "16px", opacity: 0.4 }}
                        whileInView={{ width: "48px", opacity: 0.9 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
                        className="h-px bg-white/70 group-hover:bg-white group-hover:w-20 transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Web & Branding */}
              <div>
                <h3 className="font-body text-xs font-bold text-white/90 uppercase tracking-[0.3em] mb-4 text-shadow-subtle">Web & Branding</h3>
                <div className="flex flex-col gap-3">
                  {['Google Antigravity', 'Claude AI', 'Figma'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -40, scale: 0.95 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/20 hover:bg-white/35 border border-white/35 backdrop-blur-[50px] w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <span className="font-display text-2xl text-white font-bold group-hover:text-white transition-colors text-shadow-subtle">{skill}</span>
                      <motion.div 
                        initial={{ width: "16px", opacity: 0.4 }}
                        whileInView={{ width: "48px", opacity: 0.9 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.1 + 0.15, duration: 0.5 }}
                        className="h-px bg-white/70 group-hover:bg-white group-hover:w-20 transition-all duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* ── Right Column: Experience, Education, Achievements ── */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          <GlassPanel delay={0.25} className="!bg-white/30 !backdrop-blur-[50px] border border-white/45 shadow-lg">
            <h2 className="font-display text-2xl font-bold text-white mb-4 uppercase tracking-wider border-b border-white/25 pb-4 text-shadow-subtle">
              Professional Summary
            </h2>
            <p className="font-body text-white leading-relaxed text-lg font-medium text-shadow-subtle">
              Architecture student at Texas A&M University, blending technical design with branding expertise through my digital design studio focused on enhancing communication and experience.
            </p>
          </GlassPanel>

          <GlassPanel delay={0.35} className="!bg-white/30 !backdrop-blur-[50px] border border-white/45 shadow-lg">
            <h2 className="font-display text-2xl font-bold text-white mb-8 uppercase tracking-wider border-b border-white/25 pb-4 text-shadow-subtle">
              Work Experience
            </h2>
            
            <div className="flex flex-col gap-8 relative border-l-2 border-white/40 pl-6 ml-2">
              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-white rounded-full -left-[32px] top-1.5 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                <h3 className="font-display text-xl font-bold text-white text-shadow-subtle">Customer Service & Technician — Sour Apple Repair</h3>
                <p className="font-body text-sm font-semibold text-white/90 mb-3 tracking-wider text-shadow-subtle">2026 – PRESENT</p>
                <ul className="list-disc list-inside text-white space-y-1.5 font-body font-medium text-shadow-subtle">
                  <li>Delivered outstanding customer service, building strong relationships and trust with clients.</li>
                  <li>Served as a technology technician performing diagnostics and hardware/software repairs for mobile and electronic devices.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-white rounded-full -left-[32px] top-1.5 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                <h3 className="font-display text-xl font-bold text-white text-shadow-subtle">Founder — Aggie Web Creators</h3>
                <p className="font-body text-sm font-semibold text-white/90 mb-3 tracking-wider text-shadow-subtle">2025 – PRESENT</p>
                <ul className="list-disc list-inside text-white space-y-1.5 font-body font-medium text-shadow-subtle">
                  <li>Launched a digital design business with diverse clients.</li>
                  <li>Manage project timelines and client relationships effectively.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-white rounded-full -left-[32px] top-1.5 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                <h3 className="font-display text-xl font-bold text-white text-shadow-subtle">Tutor Coordinator — TAMU Reads & Counts</h3>
                <p className="font-body text-sm font-semibold text-white/90 mb-3 tracking-wider text-shadow-subtle">2024 – PRESENT</p>
                <ul className="list-disc list-inside text-white space-y-1.5 font-body font-medium text-shadow-subtle">
                  <li>Oversee scheduling and logistics for tutoring programs.</li>
                  <li>Mentor tutors and manage time-entry systems.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-white/70 rounded-full -left-[32px] top-1.5" />
                <h3 className="font-display text-xl font-bold text-white/95 text-shadow-subtle">Marketing Assistant — Miller Hats</h3>
                <p className="font-body text-sm font-semibold text-white/90 mb-3 tracking-wider text-shadow-subtle">2021 – 2023</p>
                <ul className="list-disc list-inside text-white space-y-1.5 font-body font-medium text-shadow-subtle">
                  <li>Curated brand identity and digital content creation.</li>
                  <li>High Proficiency with Adobe Creative Suite for visual assets.</li>
                </ul>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel delay={0.45} className="!bg-white/30 !backdrop-blur-[50px] border border-white/45 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/25 pb-4 text-shadow-subtle">
                  Education
                </h2>
                <div className="mb-6">
                  <h3 className="font-body text-lg font-bold text-white text-shadow-subtle">Texas A&M University</h3>
                  <p className="font-body text-white/90 text-sm font-semibold text-shadow-subtle">College Station, TX</p>
                  <p className="font-body text-white mt-2 font-medium text-shadow-subtle">Bachelor of Science in Architecture</p>
                  <p className="font-body text-white/90 text-sm mt-1 text-shadow-subtle">May 2028</p>
                </div>
                <div>
                  <h3 className="font-body text-lg font-bold text-white text-shadow-subtle">Klein Cain High School</h3>
                  <p className="font-body text-white/90 text-sm font-semibold text-shadow-subtle">Houston, TX</p>
                  <p className="font-body text-white mt-2 font-medium text-shadow-subtle">High School Graduate</p>
                  <p className="font-body text-white/90 text-sm mt-1 text-shadow-subtle">Honor Graduate Recognition • May 2024</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider border-b border-white/25 pb-4 text-shadow-subtle">
                  Achievements
                </h2>
                <div className="mb-6">
                  <h3 className="font-body text-lg font-bold text-white text-shadow-subtle">HSF Scholar Award</h3>
                  <p className="font-body text-white/90 text-sm font-semibold text-shadow-subtle">Hispanic Scholarship Fund</p>
                  <p className="font-body text-white/90 text-sm mt-1 mb-2 text-shadow-subtle">June 2025</p>
                  <p className="font-body text-white text-sm leading-relaxed font-medium text-shadow-subtle">Recognized for academic excellence and leadership potential.</p>
                </div>
                <div>
                  <h3 className="font-body text-lg font-bold text-white text-shadow-subtle">2025 NSCS Recipient</h3>
                  <p className="font-body text-white/90 text-sm font-semibold text-shadow-subtle">National Society of Collegiate Scholars</p>
                  <p className="font-body text-white/90 text-sm mt-1 mb-2 text-shadow-subtle">April 2025</p>
                  <p className="font-body text-white text-sm leading-relaxed font-medium text-shadow-subtle">Received for academic excellence at the collegiate level for undergraduates.</p>
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
