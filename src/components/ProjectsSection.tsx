'use client';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Play } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  tags: string[];
  video: string;
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    video: "/videos/DROP.KE.mp4",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "AI Dashboard",
    description: "Interactive visualization for machine learning models with real-time analytics",
    tags: ["Nextjs", "Typescript", "Gemini"],
    video: "/videos/ai-dashboard.mp4",
    githubUrl: "https://github.com/BR2001AN/ai-dashboard",
    liveUrl: "#"
  },
  {
    title: "travel-website",
    description: "travel-website with smooth animations and responsive design",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    video: "/videos/xplore-kenya.mp4",
    githubUrl: "#",
    liveUrl: "#"
  }
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function ProjectsSection() {
  return (
    <motion.section 
      id="projects"
      className="py-28 relative overflow-hidden bg-black"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/30 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-16" variants={item}>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
            variants={item}
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Projects</span>
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto mb-6"
            variants={item}
          />
          <motion.p 
            className="text-xl max-w-3xl mx-auto text-gray-300"
            variants={item}
          >
            My best work showcasing technical skills and creative solutions
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full bg-gray-900/80 border border-gray-800 hover:border-red-500/50 transition-all duration-300 group overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl text-white group-hover:text-red-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden relative">
                    <motion.video 
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5 }}
                    >
                      <source src={project.video} type="video/mp4" />
                    </motion.video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <Button 
                        size="icon" 
                        className="rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/30"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        className="text-red-400 bg-red-900/10 border-red-900/30 hover:bg-red-900/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-red-900/30 bg-black/30 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transition-colors"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          variants={item}
        >
          <Link href="/projects" passHref>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-400 hover:bg-red-600/10 hover:text-white h-12 px-8 transition-colors"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}