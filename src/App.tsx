/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Mail, 
  Linkedin, 
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Chatbot from './components/Chatbot';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-white font-serif italic text-xl">L</div>
          <span className="font-serif text-2xl tracking-tight font-medium">Legacy Digital</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium uppercase tracking-widest text-brand-ink/70">
          <a href="#approach" className="hover:text-brand-accent transition-colors">Approach</a>
          <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
          <a href="#expertise" className="hover:text-brand-accent transition-colors">Expertise</a>
          <button 
            data-tally-open="mOp123"
            className="px-5 py-2 border border-brand-ink/20 rounded-full hover:bg-brand-ink hover:text-white transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-brand-ink/10 p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            <a href="#approach" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Our Approach</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Services</a>
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif">Expertise</a>
            <button 
              data-tally-open="mOp123"
              onClick={() => setMobileMenuOpen(false)} 
              className="bg-brand-accent text-white py-3 rounded-lg text-center font-medium"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 opacity-[0.03]"
        >
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="Background Pattern" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          style={{ y: yBg }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-accent/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: yBg }}
          className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-3xl" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 bg-brand-accent/10 text-brand-accent text-xs font-semibold uppercase tracking-[0.2em] rounded-full mb-6">
            Digital Presence for Industry Leaders
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8 text-balance">
            Expertise is silent. <br />
            <span className="italic">Authority</span> is heard.
          </h1>
          <p className="text-xl text-brand-ink/60 mb-10 leading-relaxed max-w-lg">
            Being the best at what you do is no longer enough. We help you get the attention you deserve by crafting a digital presence that matches your professional caliber.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              data-tally-open="mOp123"
              data-tally-emoji-text="👋" 
              data-tally-emoji-animation="wave"
              className="bg-brand-ink text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-brand-accent transition-all group"
            >
              Command the Attention You Deserve <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-brand-ink/10 rounded-full hover:bg-brand-ink/5 transition-all">
              View Case Studies
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000" 
              alt="Professional Expert" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-[240px] border border-brand-ink/5">
            <p className="font-serif italic text-lg leading-tight mb-2">"They understood that my 20 years of consulting couldn't be captured by a generic template."</p>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-50">— Dr. Elena Rossi, Senior Strategist</p>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <ChevronDown />
      </div>
    </section>
  );
};

const ProblemSection = () => {
  return (
    <section id="approach" className="py-24 bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              The Digital First Impression: <br />
              <span className="text-brand-accent italic">Your New Handshake</span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              In a research-driven market, your online presence is your first—and often only—chance to command respect. If your digital footprint doesn't mirror your real-world authority, you're losing the attention you've earned.
            </p>
            <ul className="space-y-6">
              {[
                "A website that looks like it belongs in 2008.",
                "A LinkedIn profile that doesn't reflect your current seniority.",
                "Incompatibility with mobile-first and voice-activated research patterns.",
                "A total lack of digital footprint despite your industry authority."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-3 h-3 text-brand-accent" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-white/5 rounded-2xl p-8 flex flex-col justify-end border border-white/10">
                <span className="text-4xl font-serif mb-2">20+</span>
                <span className="text-xs uppercase tracking-widest opacity-50">Years of Authority</span>
              </div>
              <div className="aspect-square bg-brand-accent/20 rounded-2xl p-8 flex flex-col justify-end border border-brand-accent/20">
                <TrendingUp className="w-8 h-8 mb-4 text-brand-accent" />
                <span className="text-sm font-medium">Optimized Growth</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square bg-white/10 rounded-2xl p-8 flex flex-col justify-end border border-white/10">
                <Users className="w-8 h-8 mb-4 opacity-50" />
                <span className="text-sm font-medium">Network Leverage</span>
              </div>
              <div className="aspect-square bg-white/5 rounded-2xl p-8 flex flex-col justify-end border border-white/10">
                <span className="text-4xl font-serif mb-2">92%</span>
                <span className="text-xs uppercase tracking-widest opacity-50">First Impressions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MarketReality = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#F5F2ED] rounded-2xl border border-brand-ink/5">
                <h4 className="text-4xl font-serif mb-2">81%</h4>
                <p className="text-sm text-brand-ink/60 font-medium">of consumers conduct online research before making a major purchase or commitment.</p>
              </div>
              <div className="p-8 bg-brand-accent/5 rounded-2xl border border-brand-accent/10">
                <h4 className="text-4xl font-serif mb-2">60%+</h4>
                <p className="text-sm text-brand-ink/60 font-medium">of high-intent research is now conducted via mobile and voice-activated search.</p>
              </div>
              <div className="p-8 border border-brand-ink/10 rounded-2xl">
                <h4 className="text-4xl font-serif mb-2">90%</h4>
                <p className="text-sm text-brand-ink/60 font-medium">of decision-makers are influenced by online reviews and Google Business Profile reputation.</p>
              </div>
              <div className="p-8 bg-brand-ink text-white rounded-2xl">
                <h4 className="text-4xl font-serif mb-2 text-brand-accent">84%</h4>
                <p className="text-sm text-white/60 font-medium">of local searches are "discovery" based—searching for expertise, not just a name.</p>
              </div>
              <div className="md:col-span-2 p-6 border-t border-brand-ink/5 mt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-ink/30 font-semibold">
                  Source: Google Consumer Insights & Think with Google Research (2023-2024)
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4 block">The Research-First Economy</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              The Verified <br />
              <span className="italic">Authority Gap</span>
            </h2>
            <p className="text-lg text-brand-ink/60 mb-6 leading-relaxed">
              In the modern economy, your reputation isn't what you say it is—it's what Google says it is. Decision-makers no longer take your word for it; they verify your expertise through deep digital audits.
            </p>
            <p className="text-lg text-brand-ink/60 mb-8 leading-relaxed">
              If your Google Business Profile is neglected or your local SEO is non-existent, you are invisible to 84% of the market actively searching for your specific expertise.
            </p>
            <div className="flex gap-4 items-center text-brand-accent font-medium cursor-pointer group">
              <span>Bridge the gap today</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Research-Ready Web Design",
      description: "Custom-built digital hubs designed for the deep-researcher, prioritizing clarity, authority, and evidence of expertise."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Personal Brand Audit",
      description: "A comprehensive review of your digital footprint, ensuring your decades of expertise are correctly represented."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Platform Adaptation",
      description: "Strategic positioning on modern networks where your audience conducts research, ensuring your authority is visible and verified."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Thought Leadership",
      description: "Content strategy and distribution systems that turn your deep knowledge into consistent digital influence."
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Crafted for Industry Leaders</h2>
          <p className="text-brand-ink/60">We don't do "growth hacks." We build digital foundations that respect your legacy and secure your future.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 rounded-2xl border border-brand-ink/5 bg-white shadow-sm cursor-default"
            >
              <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center text-brand-accent mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif mb-4">{service.title}</h3>
              <p className="text-brand-ink/60 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-24 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1491333078588-55b6733c7de6?auto=format&fit=crop&q=80&w=1000" 
                alt="Expert at work" 
                className="rounded-2xl shadow-2xl grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-accent rounded-full flex items-center justify-center p-8 text-white text-center">
                <p className="font-serif italic text-sm">Specialized in Executive Digital Evolution</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Why Legacy Digital?</h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  We Speak Your Language
                </h4>
                <p className="text-brand-ink/60 leading-relaxed">We understand the nuances of a multi-decade career. We don't use jargon; we focus on results and reputation.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  Privacy & Discretion
                </h4>
                <p className="text-brand-ink/60 leading-relaxed">For many of our clients, a loud social media presence isn't the goal. We build "quiet authority" that works in the background.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  Future-Proofing
                </h4>
                <p className="text-brand-ink/60 leading-relaxed">Whether you're looking for your next board seat or launching a consultancy, your digital presence is your most valuable asset.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif mb-8 italic">Ready to amplify your authority?</h2>
          <p className="text-xl text-brand-ink/60">Book a confidential consultation to discuss your digital evolution.</p>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-brand-ink/5">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-3xl font-serif mb-4">Inquiry Received</h3>
              <p className="text-brand-ink/60 mb-8">Thank you for reaching out. Our team will review your request and contact you shortly.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-brand-accent font-medium hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest opacity-50">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-ink/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest opacity-50">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-ink/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-widest opacity-50">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-ink/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all"
                  placeholder="Consultation Request"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest opacity-50">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-ink/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-all resize-none"
                  placeholder="Tell us about your goals..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                  status === 'submitting' 
                    ? 'bg-brand-ink/20 text-brand-ink/40 cursor-not-allowed' 
                    : 'bg-brand-ink text-white hover:bg-brand-accent shadow-lg hover:shadow-brand-accent/20'
                }`}
              >
                {status === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Inquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-white py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center text-brand-ink font-serif italic text-xl">L</div>
              <span className="font-serif text-2xl tracking-tight font-medium">Legacy Digital</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed">
              The premier digital agency for industry leaders. We bridge the gap between offline authority and online presence.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-6 text-sm uppercase tracking-widest text-white/60">Navigation</h5>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#approach" className="hover:text-brand-accent transition-colors">Approach</a></li>
              <li><a href="#services" className="hover:text-brand-accent transition-colors">Services</a></li>
              <li><a href="#expertise" className="hover:text-brand-accent transition-colors">Expertise</a></li>
              <li><a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-6 text-sm uppercase tracking-widest text-white/60">Company</h5>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Our Methodology</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Legacy Insights</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-6 text-sm uppercase tracking-widest text-white/60">Connect</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent transition-all">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 uppercase tracking-[0.2em]">
          <p>© 2024 Legacy Digital Agency. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-bg p-6 text-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-serif mb-4">Something went wrong.</h2>
            <p className="text-brand-ink/60 mb-8">We apologize for the inconvenience. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-brand-ink text-white rounded-full font-medium hover:bg-brand-accent transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="selection:bg-brand-accent/30 selection:text-brand-ink">
        <Navbar />
        <Hero />
        <ProblemSection />
        <MarketReality />
        <Services />
        <ExpertiseSection />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </ErrorBoundary>
  );
}
