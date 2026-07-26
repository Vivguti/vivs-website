import GlassPanel from '../components/GlassPanel';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div 
      className="relative min-h-screen bg-fixed bg-cover bg-center" 
      style={{ backgroundImage: "url('/about-bg-2.jpg')" }}
    >
      {/* Background overlay to let background image shine while ensuring contrast */}
      <div className="absolute inset-0 bg-[#0f172a]/30" />

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
        <p className="font-body text-xl text-white/95 font-semibold tracking-wide text-shadow-subtle">
          3rd Year Architecture Student
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Left Column: Contact & Skills ── */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <GlassPanel delay={0.2} className="!bg-white/65 !backdrop-blur-[50px] border border-white/80 shadow-lg">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-slate-900">
                <div className="w-10 h-10 rounded-full bg-[#0f172a]/10 border border-[#0f172a]/15 flex items-center justify-center shrink-0 shadow-sm text-slate-900">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,4 12,13 2,4" />
                  </svg>
                </div>
                <a href="mailto:Vivguti09@gmail.com" className="font-body text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors">
                  Vivguti09@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-slate-900">
                <div className="w-10 h-10 rounded-full bg-[#0f172a]/10 border border-[#0f172a]/15 flex items-center justify-center shrink-0 shadow-sm text-slate-900">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <a href="tel:3464051003" className="font-body text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors">
                  (346) 405-1003
                </a>
              </div>
              <div className="flex items-center gap-4 text-slate-900">
                <div className="w-10 h-10 rounded-full bg-[#0f172a]/10 border border-[#0f172a]/15 flex items-center justify-center shrink-0 shadow-sm text-slate-900">
                  <span className="font-bold text-sm">in</span>
                </div>
                <a href="https://www.linkedin.com/in/vivguti/" target="_blank" rel="noreferrer" className="font-body text-lg font-semibold text-slate-900 hover:text-slate-700 transition-colors break-all">
                  linkedin.com/in/vivguti
                </a>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel delay={0.3} className="!bg-white/65 !backdrop-blur-[50px] border border-white/80 shadow-lg">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wider border-b border-slate-900/15 pb-4">
              Skills & Proficiencies
            </h2>
            
            <div className="flex flex-col gap-10">
              {/* Design Software */}
              <div>
                <h3 className="font-body text-xs font-bold text-slate-600 uppercase tracking-[0.3em] mb-4">Design Software</h3>
                <div className="flex flex-col gap-3">
                  {['Rhino', 'Sketchup', 'AutoCAD', 'Revit'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/50 hover:bg-white/80 border border-white/70 backdrop-blur-[50px] w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <span className="font-display text-2xl text-slate-900 font-bold group-hover:text-slate-950 transition-colors">{skill}</span>
                      <div className="h-px w-12 bg-slate-400 group-hover:bg-slate-900 group-hover:w-20 transition-all duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Comm. */}
              <div>
                <h3 className="font-body text-xs font-bold text-slate-600 uppercase tracking-[0.3em] mb-4">Visual Communication</h3>
                <div className="flex flex-col gap-3">
                  {['Photoshop', 'Illustrator', 'Adobe InDesign'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/50 hover:bg-white/80 border border-white/70 backdrop-blur-[50px] w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <span className="font-display text-2xl text-slate-900 font-bold group-hover:text-slate-950 transition-colors">{skill}</span>
                      <div className="h-px w-12 bg-slate-400 group-hover:bg-slate-900 group-hover:w-20 transition-all duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Web & Branding */}
              <div>
                <h3 className="font-body text-xs font-bold text-slate-600 uppercase tracking-[0.3em] mb-4">Web & Branding</h3>
                <div className="flex flex-col gap-3">
                  {['Google Antigravity', 'Claude AI', 'Figma'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white/50 hover:bg-white/80 border border-white/70 backdrop-blur-[50px] w-full py-4 px-6 rounded-xl flex items-center justify-between transition-all duration-300 cursor-default group shadow-sm"
                    >
                      <span className="font-display text-2xl text-slate-900 font-bold group-hover:text-slate-950 transition-colors">{skill}</span>
                      <div className="h-px w-12 bg-slate-400 group-hover:bg-slate-900 group-hover:w-20 transition-all duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* ── Right Column: Experience, Education, Achievements ── */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          <GlassPanel delay={0.25} className="!bg-white/65 !backdrop-blur-[50px] border border-white/80 shadow-lg">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wider border-b border-slate-900/15 pb-4">
              Professional Summary
            </h2>
            <p className="font-body text-slate-800 leading-relaxed text-lg font-medium">
              Architecture student at Texas A&M University, blending technical design with branding expertise through my digital design studio focused on enhancing communication and experience.
            </p>
          </GlassPanel>

          <GlassPanel delay={0.35} className="!bg-white/65 !backdrop-blur-[50px] border border-white/80 shadow-lg">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wider border-b border-slate-900/15 pb-4">
              Work Experience
            </h2>
            
            <div className="flex flex-col gap-8 relative border-l-2 border-slate-400/50 pl-6 ml-2">
              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-slate-900 rounded-full -left-[32px] top-1.5 shadow-sm" />
                <h3 className="font-display text-xl font-bold text-slate-900">Customer Service & Technician — Sour Apple Repair</h3>
                <p className="font-body text-sm font-semibold text-slate-600 mb-3 tracking-wider">2026 – PRESENT</p>
                <ul className="list-disc list-inside text-slate-800 space-y-1.5 font-body font-medium">
                  <li>Delivered outstanding customer service, building strong relationships and trust with clients.</li>
                  <li>Served as a technology technician performing diagnostics and hardware/software repairs for mobile and electronic devices.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-slate-900 rounded-full -left-[32px] top-1.5 shadow-sm" />
                <h3 className="font-display text-xl font-bold text-slate-900">Founder — Aggie Web Creators</h3>
                <p className="font-body text-sm font-semibold text-slate-600 mb-3 tracking-wider">2025 – PRESENT</p>
                <ul className="list-disc list-inside text-slate-800 space-y-1.5 font-body font-medium">
                  <li>Launched a digital design business with diverse clients.</li>
                  <li>Manage project timelines and client relationships effectively.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-slate-900 rounded-full -left-[32px] top-1.5 shadow-sm" />
                <h3 className="font-display text-xl font-bold text-slate-900">Tutor Coordinator — TAMU Reads & Counts</h3>
                <p className="font-body text-sm font-semibold text-slate-600 mb-3 tracking-wider">2024 – PRESENT</p>
                <ul className="list-disc list-inside text-slate-800 space-y-1.5 font-body font-medium">
                  <li>Oversee scheduling and logistics for tutoring programs.</li>
                  <li>Mentor tutors and manage time-entry systems.</li>
                </ul>
              </div>

              <div className="relative">
                <div className="absolute w-3.5 h-3.5 bg-slate-500 rounded-full -left-[32px] top-1.5" />
                <h3 className="font-display text-xl font-bold text-slate-800">Marketing Assistant — Miller Hats</h3>
                <p className="font-body text-sm font-semibold text-slate-600 mb-3 tracking-wider">2021 – 2023</p>
                <ul className="list-disc list-inside text-slate-700 space-y-1.5 font-body font-medium">
                  <li>Curated brand identity and digital content creation.</li>
                  <li>High Proficiency with Adobe Creative Suite for visual assets.</li>
                </ul>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel delay={0.45} className="!bg-white/65 !backdrop-blur-[50px] border border-white/80 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-900/15 pb-4">
                  Education
                </h2>
                <div className="mb-6">
                  <h3 className="font-body text-lg font-bold text-slate-900">Texas A&M University</h3>
                  <p className="font-body text-slate-600 text-sm font-semibold">College Station, TX</p>
                  <p className="font-body text-slate-800 mt-2 font-medium">Bachelor of Science in Architecture</p>
                  <p className="font-body text-slate-600 text-sm mt-1 font-medium">May 2028</p>
                </div>
                <div>
                  <h3 className="font-body text-lg font-bold text-slate-900">Klein Cain High School</h3>
                  <p className="font-body text-slate-600 text-sm font-semibold">Houston, TX</p>
                  <p className="font-body text-slate-800 mt-2 font-medium">High School Graduate</p>
                  <p className="font-body text-slate-600 text-sm mt-1 font-medium">Honor Graduate Recognition • May 2024</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-900/15 pb-4">
                  Achievements
                </h2>
                <div className="mb-6">
                  <h3 className="font-body text-lg font-bold text-slate-900">HSF Scholar Award</h3>
                  <p className="font-body text-slate-600 text-sm font-semibold">Hispanic Scholarship Fund</p>
                  <p className="font-body text-slate-600 text-sm mt-1 mb-2 font-medium">June 2025</p>
                  <p className="font-body text-slate-800 text-sm leading-relaxed font-medium">Recognized for academic excellence and leadership potential.</p>
                </div>
                <div>
                  <h3 className="font-body text-lg font-bold text-slate-900">2025 NSCS Recipient</h3>
                  <p className="font-body text-slate-600 text-sm font-semibold">National Society of Collegiate Scholars</p>
                  <p className="font-body text-slate-600 text-sm mt-1 mb-2 font-medium">April 2025</p>
                  <p className="font-body text-slate-800 text-sm leading-relaxed font-medium">Received for academic excellence at the collegiate level for undergraduates.</p>
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
