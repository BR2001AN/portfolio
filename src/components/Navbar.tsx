'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Home, Folder, User, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  const navItems = [
    { href: "/", icon: Home, text: "Home" },
    { href: "#projects", icon: Folder, text: "Projects" },
    { href: "#about", icon: User, text: "About" },
    { href: "#contact", icon: Mail, text: "Contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-lg border-b border-red-900/20 py-2' 
            : 'bg-black/50 backdrop-blur-sm py-3'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo - moved to left */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 md:absolute md:left-8"
            >
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                Portfolio
              </Link>
            </motion.div>

            {/* Centered Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-2">
                {navItems.map((item) => (
                  <motion.div 
                    key={item.text}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      className="group px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-red-900/10 transition-colors"
                    >
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.text}</span>
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-400 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300" />
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile menu button - stays on right */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-red-900/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-40 md:hidden bg-black/95 backdrop-blur-3xl"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-red-900/20"
                onClick={closeMobileMenu}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-1 px-6 space-y-6">
              {navItems.map((item) => (
                <motion.div
                  key={item.text}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full max-w-xs"
                >
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start py-6 text-lg text-gray-300 hover:text-white hover:bg-red-900/20"
                    onClick={closeMobileMenu}
                  >
                    <Link href={item.href} className="flex items-center gap-4">
                      <item.icon className="h-5 w-5" />
                      <span>{item.text}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}