import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CursorBackground from '../components/CursorBackground';

const generations = [
  { name: 'Generation I', range: [1, 151], color: 'from-red-500 to-orange-500' },
  { name: 'Generation II', range: [152, 251], color: 'from-blue-500 to-cyan-500' },
  { name: 'Generation III', range: [252, 386], color: 'from-green-500 to-lime-500' },
  { name: 'Generation IV', range: [387, 493], color: 'from-purple-500 to-pink-500' },
  { name: 'Generation V', range: [494, 649], color: 'from-yellow-500 to-orange-500' },
  { name: 'Generation VI', range: [650, 721], color: 'from-indigo-500 to-purple-500' },
  { name: 'Generation VII', range: [722, 809], color: 'from-teal-500 to-cyan-500' },
  { name: 'Generation VIII', range: [810, 905], color: 'from-gray-500 to-slate-500' },
  { name: 'Generation IX', range: [906, 1010], color: 'from-rose-500 to-pink-500' },
];

const Explorer = () => {
  const [selectedGen, setSelectedGen] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadGeneration(selectedGen);
  }, [selectedGen]);

  const loadGeneration = async (genIndex) => {
    setLoading(true);
    const [start, end] = generations[genIndex].range;
    const ids = Array.from({ length: Math.min(end - start + 1, 50) }, (_, i) => start + i); // Load up to 50 per gen
    
    try {
      const promises = ids.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
      );
      const data = await Promise.all(promises);
      setPokemon(data);
    } catch (error) {
      console.error('Error loading Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (pokemon) => {
    navigate('/detail', { state: { pokemon } });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <CursorBackground />
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120007] via-[#0b0b0f] to-[#140a0a] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.1)_0%,transparent_70%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
            }}
            animate={{
              y: [null, -40, null],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center py-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-2 font-mono">
          Creature Archives
        </h1>
        <p className="text-red-300 text-lg">
          Explore the holographic database
        </p>
      </motion.div>

      {/* Generation tabs */}
      <div className="relative z-10 px-8 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {generations.map((gen, index) => (
            <motion.button
              key={gen.name}
              onClick={() => setSelectedGen(index)}
              className={`px-4 py-2 rounded-full border transition-all ${
                selectedGen === index
                  ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                  : 'bg-black/50 border-white/20 text-white/70 hover:border-orange-400/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {gen.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Pokemon Grid */}
      <div className="relative z-10 px-8 pb-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <motion.div
              className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {pokemon.map((p) => (
              <PokemonCard key={p.id} pokemon={p} onClick={handleCardClick} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const PokemonCard = ({ pokemon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const typeColors = {
    fire: 'from-red-500 to-orange-500',
    water: 'from-blue-500 to-cyan-500',
    electric: 'from-yellow-400 to-yellow-600',
    grass: 'from-green-400 to-green-600',
    ghost: 'from-purple-500 to-purple-700',
    psychic: 'from-pink-500 to-purple-500',
    normal: 'from-gray-400 to-gray-600',
    fighting: 'from-red-600 to-red-800',
    poison: 'from-purple-400 to-purple-600',
    ground: 'from-yellow-600 to-yellow-800',
    flying: 'from-blue-300 to-blue-500',
    bug: 'from-green-500 to-green-700',
    rock: 'from-yellow-700 to-yellow-900',
    ice: 'from-blue-200 to-cyan-400',
    dragon: 'from-indigo-500 to-purple-700',
    dark: 'from-gray-700 to-gray-900',
    steel: 'from-gray-400 to-gray-600',
    fairy: 'from-pink-300 to-pink-500',
  };

  const bgClass = typeColors[pokemon.types[0].type.name] || 'from-gray-500 to-gray-700';

  return (
    <motion.div
      className={`relative w-64 h-80 bg-gradient-to-br ${bgClass} rounded-lg overflow-hidden cursor-pointer border border-white/20`}
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
              x: Math.random() * 256,
              y: Math.random() * 320,
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
          <div className="flex flex-wrap gap-1 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-2 py-1 bg-black/50 text-white text-xs rounded capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="text-white text-sm text-center">
            <p>Height: {pokemon.height / 10}m</p>
            <p>Weight: {pokemon.weight / 10}kg</p>
            <p className="mt-1">Abilities:</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {pokemon.abilities.slice(0, 2).map((ability) => (
                <span
                  key={ability.ability.name}
                  className="px-1 py-0.5 bg-white/20 text-white text-xs rounded capitalize"
                >
                  {ability.ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          <motion.img
            src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Explorer;
