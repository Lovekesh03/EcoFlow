'use client';

import { motion, useInView } from '../utils/motion';
import Image from 'next/image';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white pt-24 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="md:w-1/2">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Blockchain-Based <span className="text-blue-400">Blue Carbon</span> Registry and MRV System
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-blue-100 mb-8"
            >
              Revolutionizing carbon credit verification and trading with transparent, secure blockchain technology
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-medium transition-colors"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth', { detail: { mode: 'register' } }))}
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border border-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-colors"
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth', { detail: { mode: 'signin' } }))}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2 relative"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative w-full h-[400px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  {/* Grid pattern */}
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYyYzcuNzMyIDAgMTQgNi4yNjggMTQgMTRoMnptLTIgMGMwIDcuNzMyLTYuMjY4IDE0LTE0IDE0djJjOC45NCAwIDE2LTcuMDYgMTYtMTZoLTJ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')]"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-2xl font-bold mb-4">Blue Carbon Ecosystem</div>
                    <div className="flex justify-center space-x-4 mb-6">
                      {/* Animated blockchain nodes */}
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                          animate={{
                            y: [0, i % 2 === 0 ? -8 : -12, 0],
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <div className="w-6 h-6 bg-blue-300/80 rounded-md" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="h-32 bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-center">
                      <div className="text-sm">
                        <div className="font-mono mb-2">Carbon Credit #0x8F3E...</div>
                        <div className="flex justify-between text-xs">
                          <span>Verified</span>
                          <span>12.5 Tons CO₂</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.17,96.92,165.17,91.31,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;