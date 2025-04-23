'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassmorphicCard({ 
  children,
  className
}: GlassmorphicCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  )
}