// src/app/projects/[id]/page.tsx

'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A complete e-commerce solution built with modern web technologies. Features include product catalog, shopping cart, user authentication, payment processing with Stripe, and an admin dashboard for inventory management.',
    videoUrl: '/videos/',
    thumbnailUrl: '/images/ecommerce-thumb.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce-demo.com'
  },
  // Other projects...
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> All Projects
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
              <video
                controls
                autoPlay
                className="w-full h-full"
                src={project.videoUrl}
              />
            </div>

            <p className="text-lg mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(tag => (
                <span key={tag} className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.githubUrl && (
                <Button asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="outline" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}