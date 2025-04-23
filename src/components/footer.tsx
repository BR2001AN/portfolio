'use client';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Mail className="h-5 w-5" />, href: "mailto:hello@example.com", label: "Email" }
];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
      className="bg-gradient-to-b from-black/90 to-black backdrop-blur-sm border-t border-red-900/30 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Logo and copyright */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center lg:items-start"
          >
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Portfolio
            </Link>
            <motion.p 
              className="text-gray-400 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              © {currentYear} All rights reserved
            </motion.p>
          </motion.div>

          {/* Navigation links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6"
            variants={container}
          >
            {navLinks.map((link, index) => (
              <motion.div key={index} variants={item}>
                <Link 
                  href={link.href}
                  className="relative text-gray-300 hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-red-500 to-red-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex gap-4"
            variants={container}
          >
            {socialLinks.map((social, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-300 hover:text-white hover:bg-red-900/20 rounded-full"
                  asChild
                >
                  <Link 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Attribution - Removed the built with text */}
        <motion.div
          variants={item}
          className="flex justify-center items-center gap-2 text-gray-500 text-sm mt-12"
        >
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </motion.div>
      </div>
    </motion.footer>
  );
}