import { motion } from 'framer-motion';
import GlassPanel from '../components/GlassPanel';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

// Replace this with the URL you get from deploying your Google Apps Script Web App
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTb7pMIiQ-6scf19dRjaM674I4IujuLJaV4Y-bAa36H8Vaw3O5HBaz3ddt8vOfBb7_/exec";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleFocus = (name: string) => setFocusedInput(name);
  const handleBlur = () => setFocusedInput(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Honeypot check (bot caught)
    if (formData.honeypot) {
      return;
    }

    // Validation
    if (!formData.name.trim()) return setError("Name is required.");
    if (formData.name.length > 100) return setError("Name is too long (max 100 characters).");
    if (!formData.email.trim()) return setError("Email is required.");
    if (!validateEmail(formData.email)) return setError("Please enter a valid email address.");
    if (formData.email.length > 100) return setError("Email is too long (max 100 characters).");
    if (formData.subject.length > 200) return setError("Subject is too long (max 200 characters).");
    if (!formData.message.trim()) return setError("Message is required.");
    if (formData.message.length > 3000) return setError("Message is too long (max 3000 characters).");

    // Cooldown check (60 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      return setError("Please wait a minute before sending another message.");
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name.trim());
      formBody.append('email', formData.email.trim());
      formBody.append('subject', formData.subject.trim());
      formBody.append('message', formData.message.trim());

      // Fire and forget using no-cors mode to bypass Google Apps Script strict CORS policy
      // We don't await this so the user instantly sees the success screen without waiting for Google to send the email
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).catch(err => console.error("Background fetch error:", err));

      // Instantly show success state
      setIsSuccess(true);
      setLastSubmitTime(now);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setIsSubmitting(false);
      
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again or email directly.");
      setIsSubmitting(false);
    }
  };

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
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="mb-6 flex justify-center w-full">
                  <div className="monogram-coin !w-16 !h-16 shadow-[0_0_20px_rgba(255,255,255,0.5)] rounded-full">
                    <div className="coin-inner">
                      {/* Front face */}
                      <div className="coin-face coin-front">
                        <img
                          src="/vg-monogram.png"
                          alt="VG Monogram"
                          className="monogram-img"
                        />
                      </div>
                      {/* Back face (mirrored) */}
                      <div className="coin-face coin-back">
                        <img
                          src="/vg-monogram.png"
                          alt="VG Monogram"
                          className="monogram-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Message Sent</h3>
                <p className="font-body text-white/80">Message sent successfully. Thank you for reaching out!</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-6 py-2 border border-white/30 rounded-lg text-white hover:bg-white/10 transition-colors font-body text-sm tracking-wider uppercase"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                
                {/* Honeypot field - visually hidden, bots will fill it out */}
                <input 
                  type="text" 
                  name="honeypot" 
                  style={{ display: 'none' }} 
                  tabIndex={-1} 
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />

                <div className="relative">
                  <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Name *</label>
                  <div className="relative">
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
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
                  <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Email *</label>
                  <div className="relative">
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
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
                  <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Subject</label>
                  <div className="relative">
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                      placeholder="Project Inquiry"
                    />
                    <motion.div 
                      initial={false}
                      animate={{ opacity: focusedInput === 'subject' ? 1 : 0 }}
                      className="absolute inset-0 rounded-lg border-2 border-white pointer-events-none"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="font-body text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-2 block">Message *</label>
                  <div className="relative">
                    <textarea 
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
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

                {error && (
                  <div className="text-red-400 font-body text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-500/30">
                    {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full mt-2 py-4 rounded-lg bg-white text-gray-900 font-body font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            )}
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
