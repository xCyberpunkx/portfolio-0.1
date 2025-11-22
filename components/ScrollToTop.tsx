import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 400);
  }, []);

  const handleScrollDirection = useCallback(() => {
    let lastScrollY = window.scrollY;
    const checkDirection = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 100);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', checkDirection, { passive: true });
    return () => window.removeEventListener('scroll', checkDirection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    const cleanupDirection = handleScrollDirection();
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      cleanupDirection();
    };
  }, [toggleVisibility, handleScrollDirection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
          exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="
            fixed bottom-6 right-6 z-50
            w-12 h-12
            flex items-center justify-center
            rounded-full
            backdrop-blur-sm bg-white/80 dark:bg-gray-800/80
            border border-white/30 dark:border-gray-700/50
            shadow-lg hover:shadow-xl
            text-gray-800 dark:text-gray-100
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            hover:scale-105 active:scale-95
            cursor-pointer
          "
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
            animate={{ 
              y: isScrollingDown ? [-1, 0, -1] : 0,
              rotate: isScrollingDown ? [0, -3, 0] : 0,
            }}
            transition={{ 
              y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; // 👈 Default export!