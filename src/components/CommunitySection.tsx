'use client';

import { motion, useInView } from '../utils/motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Environmental Scientist',
    quote: 'This platform has transformed how we verify and track blue carbon projects. The transparency is unmatched.',
    avatar: '👩‍🔬',
  },
  {
    name: 'Michael Chen',
    role: 'Carbon Credit Trader',
    quote: 'The blockchain verification gives me confidence in the credits I purchase. Game-changer for the industry.',
    avatar: '👨‍💼',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Marine Conservation Director',
    quote: 'Real-time monitoring has helped us optimize our mangrove restoration projects and maximize carbon sequestration.',
    avatar: '👩‍🌾',
  },
];

const CommunitySection = () => {
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
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a global network of environmental scientists, project developers, and carbon credit traders
            committed to fighting climate change through blue carbon initiatives.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 } 
              }}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
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
            Join Our Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;