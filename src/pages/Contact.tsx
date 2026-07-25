import { motion } from 'framer-motion';
import GlassPanel from '../components/GlassPanel';
import { useState } from 'react';

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleFocus = (name: string) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight text-white mb-4">
          Get in Touch
        </h1>
        <p className="font-body text-white/90 tracking-wide text-lg max-w-xl mx-auto">
          Available for freelance opportunities and full-time positions. Let's build something remarkable together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <GlassPanel delay={0.4}>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-white/85 mb-2">Email</h3>
                <a href="mailto:Vivguti09@gmail.com" className="font-display text-2xl text-white hover:text-white/80 transition-colors">
                  Vivguti09@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-white/85 mb-2">Phone</h3>
                <a href="tel:3464051003" className="font-display text-2xl text-white hover:text-white/80 transition-colors">
                  (346) 405-1003
                </a>
              </div>
              <div>
                <h3 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-white/85 mb-2">Location</h3>
                <p className="font-display text-2xl text-white">
                  College Station, TX
                </p>
              </div>
              <div className="pt-4 border-t border-white/20">
                <h3 className="font-body text-xs font-bold tracking-[0.2em] uppercase text-white/85 mb-4">Social</h3>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/vivguti/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105">
                    in
                  </a>
                  <a href="https://pen-shield-64711370.figma.site/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105">
                    <span className="material-icons text-sm">link</span>
                  </a>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Contact Form */}
        <div>
          <GlassPanel delay={0.6} heavy>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              
              <div className="relative">
                <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                    placeholder="Jane Doe"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ opacity: focusedInput === 'name' ? 1 : 0 }}
                    className="absolute inset-0 rounded-lg border-2 border-white pointer-events-none"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                    placeholder="jane@example.com"
                  />
                  <motion.div 
                    initial={false}
                    animate={{ opacity: focusedInput === 'email' ? 1 : 0 }}
                    className="absolute inset-0 rounded-lg border-2 border-white pointer-events-none"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Message</label>
                <div className="relative">
                  <textarea 
                    rows={4}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                  <motion.div 
                    initial={false}
                    animate={{ opacity: focusedInput === 'message' ? 1 : 0 }}
                    className="absolute inset-0 rounded-lg border-2 border-white pointer-events-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-4 rounded-lg bg-white text-gray-900 font-body font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
              >
                Send Message
              </motion.button>
            </form>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
