// src/app/utils/animations.ts

export const fadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };
  
  export const slideUp = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  
  export const scaleUp = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  export const modalVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };
  
  export const modalOverlayVariants = {
      open: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
      closed: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
  };
  
  export const whileHoverScale = {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.3 },
  };
  
  export const whileTapScale = {
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2 },
  };
  
  export const staggerContainer = {
      hidden: {},
      show: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    };
  
  export const staggerChildren = {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    };