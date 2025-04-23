'use client';
import { motion } from 'framer-motion';
import { Code, Palette, Server } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const skills = [
  { name: "Frontend Development", icon: <Code className="w-6 h-6 text-red-500" />, tags: ["React", "Next.js", "TypeScript"] },
  { name: "UI/UX Design", icon: <Palette className="w-6 h-6 text-red-500" />, tags: ["Figma", "Adobe XD", "Prototyping"] },
  { name: "Backend Development", icon: <Server className="w-6 h-6 text-red-500" />, tags: ["Node.js", "Django", "API Development"] }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-28 bg-gradient-to-b from-black/70 to-black/30 backdrop-blur-sm"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={container}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={item}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Me</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
          />
          <motion.p 
            className="text-xl max-w-3xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Get to know the person behind the work
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex justify-center"
            variants={item}
          >
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-red-900/30 group-hover:border-red-500/50 transition-all duration-500 shadow-xl shadow-red-900/20">
                <Image
                  src="/images/profile.jpg"
                  alt="Brian Okeo - Full Stack Developer"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  quality={90}
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-red-500/20 transition-all duration-500 pointer-events-none" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
          >
            <Card className="bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-red-500/30 transition-all duration-500 shadow-xl shadow-red-900/10">
              <CardHeader>
                <CardTitle className="text-3xl text-white">
                Systems-First Developer & Designer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.p 
                  className="text-white/80 mb-8 text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  I'm Brian — a full-stack developer and designer with 2 years of experience crafting digital products that are both beautiful and built to last.
I approach every project with a systems mindset, focusing on clean architecture, scalable code, and intuitive design. For me, it’s not just about shipping fast—it’s about building things that hold up over time.
                </motion.p>
                
                <motion.div 
                  className="space-y-6"
                  variants={container}
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      className="group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-red-900/10 transition-all">
                        <div className="p-3 bg-red-900/20 rounded-lg group-hover:bg-red-900/30 transition-colors">
                          {skill.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-white">{skill.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {skill.tags.map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="outline"
                                className="text-red-400 border-red-900/30 hover:bg-red-900/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}