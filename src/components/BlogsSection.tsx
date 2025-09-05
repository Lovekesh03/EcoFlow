'use client';

import { motion, useInView } from '../utils/motion';
import Link from 'next/link';

const blogs = [
  {
    title: 'The Future of Blue Carbon Markets',
    excerpt: 'How blockchain technology is revolutionizing the way we verify and trade blue carbon credits.',
    date: 'June 15, 2023',
    category: 'Market Trends',
    image: 'bg-gradient-to-br from-blue-400 to-blue-600',
  },
  {
    title: 'Mangrove Restoration: A Carbon Sequestration Powerhouse',
    excerpt: 'Why mangrove ecosystems are among the most effective carbon sinks on the planet.',
    date: 'May 28, 2023',
    category: 'Science',
    image: 'bg-gradient-to-br from-green-400 to-green-600',
  },
  {
    title: 'MRV Systems: Ensuring Integrity in Carbon Markets',
    excerpt: 'The importance of robust measurement, reporting, and verification in carbon credit projects.',
    date: 'April 10, 2023',
    category: 'Technology',
    image: 'bg-gradient-to-br from-purple-400 to-purple-600',
  },
];

const BlogsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Blogs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights, research, and developments in the blue carbon ecosystem.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 } 
              }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300"
            >
              <div className={`h-48 ${blog.image} flex items-center justify-center text-white`}>
                <div className="text-center p-4">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <Link href="#" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsSection;