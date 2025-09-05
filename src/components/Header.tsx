'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from '../utils/motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header 
      className="fixed w-full bg-gradient-to-r from-blue-900 to-indigo-800 text-white z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/" className="text-2xl font-bold">
            Blue Carbon Registry
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Community', 'Blogs'].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/${item.toLowerCase()}`} className="font-medium hover:text-blue-200 transition-colors">
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full font-medium transition-colors"
          >
            Connect Wallet
          </motion.button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-blue-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-4 py-2 space-y-3">
            {['Home', 'Community', 'Blogs'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase()}`} 
                className="block py-2 hover:bg-blue-700 px-3 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <button className="w-full text-left bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded font-medium transition-colors">
              Connect Wallet
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;