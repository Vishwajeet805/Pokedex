import { motion } from 'framer-motion';
import { useState } from 'react';

const PokemonCard = ({ pokemon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const typeColors = {
    fire: 'from-red-500 to-orange-500',
    water: 'from-blue-500 to-cyan-500',
    electric: 'from-yellow-400 to-yellow-600',
    grass: 'from-green-400 to-green-600',
    ghost: 'from-purple-500 to-purple-700',
    psychic: 'from-pink-500 to-purple-500',
    // add more
  };

  const bgClass = typeColors[pokemon.types[0].type.name] || 'from-gray-500 to-gray-700';

  return (
    <motion.div
      className={`relative w-48 h-64 bg-gradient-to-br ${bgClass} rounded-lg overflow-hidden cursor-pointer border border-white/20`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(pokemon)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Holographic shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Glow border */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-orange-400"
        animate={isHovered ? { boxShadow: '0 0 20px rgba(255, 165, 0, 0.8)' } : { boxShadow: '0 0 0 rgba(255, 165, 0, 0)' }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            initial={{
              x: Math.random() * 192,
              y: Math.random() * 256,
              opacity: 0
            }}
            animate={{
              y: [null, -10, null],
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

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-lg">#{String(pokemon.id).padStart(3, '0')}</h3>
          <h2 className="text-white font-bold text-xl capitalize">{pokemon.name}</h2>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-wrap gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-2 py-1 bg-black/50 text-white text-xs rounded capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <motion.img
            src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-20 h-20 object-contain"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;