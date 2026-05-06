import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Startup = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-red-800 opacity-80" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -20, null],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Scanner rings */}
      <div className="relative">
        <motion.div
          className="w-32 h-32 border-2 border-orange-400 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-4 left-4 w-24 h-24 border border-red-500 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 border border-yellow-400 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
        />
      </div>

      {/* Pokéball animation */}
      <motion.div
        className="relative w-20 h-20"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-full h-full bg-red-600 rounded-full relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-black transform -translate-y-1/2" />
          <div className="absolute top-0 left-1/2 w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-2" />
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Boot text */}
      <motion.p
        className="absolute bottom-20 text-orange-400 text-xl font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
      >
        Initializing Pokédex…
      </motion.p>
    </motion.div>
  );
};

export default Startup;