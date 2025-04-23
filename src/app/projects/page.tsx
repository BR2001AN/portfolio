'use client';
import { motion } from 'framer-motion';
import { Project } from '@/types/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, X } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'eCommerce Platform',
    description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
    videoUrl: '/videos/DROP.KE.mp4',
    thumbnailUrl: '/images/.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce-demo.com'
  },
  {
    id: 'project-2',
    title: 'AI Dashboard',
    description: 'Machine learning visualization dashboard with real-time data processing',
    videoUrl: '/videos/ai-dashboard.mp4',
    thumbnailUrl: '/images/ai-thumb.jpg',
    tags: ['nextjs', 'typescript', 'gemini ai'],
    githubUrl: 'https://github.com/BR2001AN/ai-dashboard',
    liveUrl: 'https://ai-dashboard-demo.com'
  },
  {
    id: 'project-3',
    title: 'XPLORE-KENYA',
    description: 'Drag-and-drop portfolio creator with customizable templates',
    videoUrl: '/videos/xplore-kenya.mp4',
    thumbnailUrl: '/images/xplore-kenya.jpg',
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
    githubUrl: 'https://github.com/yourusername/xplore-kenya',
    liveUrl: 'https://xplore-kenya.com'
  },
  {
    id: 'project-4',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates and team features',
    videoUrl: '/videos/taskapp-demo.mp4',
    thumbnailUrl: '/images/taskapp-thumb.jpg',
    tags: ['React', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://task-manager-demo.com'
  },
  {
    id: 'project-5',
    title: 'Weather Forecast',
    description: 'Weather application with 5-day forecasts and location detection',
    videoUrl: '/videos/weather-demo.mp4',
    thumbnailUrl: '/images/weather-thumb.jpg',
    tags: ['React', 'OpenWeather API', 'Geolocation'],
    githubUrl: 'https://github.com/yourusername/weather-app',
    liveUrl: 'https://weather-app-demo.com'
  },
  {
    id: 'project-6',
    title: 'Recipe Finder',
    description: 'Search and save recipes with nutritional information',
    videoUrl: '/videos/recipe-demo.mp4',
    thumbnailUrl: '/images/recipe-thumb.jpg',
    tags: ['Vue.js', 'Spoonacular API', 'IndexedDB'],
    githubUrl: 'https://github.com/yourusername/recipe-finder',
    liveUrl: 'https://recipe-finder-demo.com'
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4">
        {/* Video Modal */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          <DialogContent className="bg-gray-900 border border-gray-800 max-w-4xl p-0 overflow-hidden">
            {selectedProject && (
              <>
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle className="text-white">
                    {selectedProject.title}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </DialogHeader>
                <div className="aspect-video w-full">
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  >
                    <source src={selectedProject.videoUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="p-6 bg-gray-900/80">
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="border-red-900/30 bg-black/30 hover:bg-red-900/20 hover:text-red-400"
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      View Code
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    >
                      Visit Live Site
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Projects</span>
          </h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Showcasing my best work and creative solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full bg-gray-900/80 border border-gray-800 hover:border-red-500/50 rounded-lg overflow-hidden transition-all duration-300 shadow-lg shadow-black/50">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden relative">
                    <video 
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <Button 
                        size="icon" 
                        className="rounded-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/30"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-sm text-red-400 bg-red-900/10 border border-red-900/30 rounded-full hover:bg-red-900/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-red-900/30 bg-black/30 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      View Code
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-colors"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      Live Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600/10 hover:text-white h-12 px-8 transition-colors"
            >
              Back to Home
              <ArrowRight className="h-4 w-4 ml-2 transform rotate-180" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}