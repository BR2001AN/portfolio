'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Decorative elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-600 blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-red-800 blur-3xl opacity-10"></div>
      </div>

      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-28 bg-black/60 backdrop-blur-lg border-t border-b border-red-900/30"
        >
          <ProjectsSection />
        </motion.section>

        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-28 bg-gradient-to-b from-black/60 to-black/40"
        >
          <AboutSection />
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-28 bg-black/70 backdrop-blur-lg border-t border-b border-red-900/30"
        >
          <ContactSection />
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}