'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Github, ExternalLink, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Modal from './Modal';

interface Project {
  title: string;
  description: string;
  tags: string[];
  videoUrl: string;
  thumbnailUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className="h-full"
      >
        <Card className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
          {/* Thumbnail with play button */}
          <div className="relative aspect-video overflow-hidden">
            <motion.img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.button
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
            </motion.button>
          </div>
          
          {/* Card Content */}
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {project.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-3">
            {project.githubUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button 
                size="sm" 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Video Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title={project.title}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              controls
              autoPlay
              className="w-full h-full"
              src={project.videoUrl}
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge 
                key={tag}
                variant="outline"
                className="text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            {project.githubUrl && (
              <Button 
                variant="outline" 
                className="gap-2"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Open Live Demo
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </Modal>
    </>
  )
}