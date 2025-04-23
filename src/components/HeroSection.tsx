'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-900/20 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-red-900/10 blur-3xl animate-float-medium"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full pt-16 pb-20 relative z-20">
        <div className="text-center w-full">
          {/* Availability Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-red-900/20 border border-red-900/30 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">Available for work</span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white"
          >
            Hi, I'm <span className="text-red-500">Brian Okeo</span>
          </motion.h1>
          
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-300"
          >
            Crafting pixel-perfect experiences with modern web technologies.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-block mb-16"
          >
            <Button asChild>
              <Link 
                href="#projects"
                className="bg-red-600 hover:bg-red-700 h-14 px-10 text-lg gap-2 shadow-lg shadow-red-900/30 flex items-center justify-center"
              >
                View Projects 
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Skills Cards */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { icon: Code, title: "Full-Stack Development" },
              { icon: Palette, title: "UI/UX Design" },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/80 border border-gray-800 px-6 py-4 flex items-center gap-3 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300">
                  <div className="p-2 bg-red-900/20 rounded-lg">
                    <skill.icon className="text-red-400 h-5 w-5" />
                  </div>
                  <span className="font-medium text-white">{skill.title}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-gray-400">Scroll Down</span>
          <div className="w-px h-16 bg-gradient-to-t from-gray-400 via-red-500 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
}