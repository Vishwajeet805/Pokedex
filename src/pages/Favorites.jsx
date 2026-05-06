import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CursorBackground from '../components/CursorBackground';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('pokedex-favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (pokemonId) => {
    const updated = favorites.filter(p => p.id !== pokemonId);
    setFavorites(updated);
    localStorage.setItem('pokedex-favorites', JSON.stringify(updated));
  };

  const handleCardClick = (pokemon) => {
    navigate('/detail', { state: { pokemon } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050507] text-white">
      <CursorBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-[#120007] via-[#0b0b0f] to-[#140a0a] opacity-90" />
      <div className="absolute inset-0 scanline-bg opacity-10" />

      {/* Ambient orbs */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff7200]/10 bg-[#ff7200]/5 blur-3xl" />
      <div className="absolute left-1/4 top-10 h-28 w-28 rounded-full border border-orange-500/30 shadow-[0_0_80px_rgba(255,118,46,0.15)]" />
      <div className="absolute right-16 top-24 h-36 w-36 rounded-full border border-red-500/20 shadow-[0_0_90px_rgba(255,67,51,0.1)]" />
      <div className="absolute -bottom-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full border border-cyan-400/10 bg-cyan-400/5 blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center py-8 px-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-400" />
            <span className="inline-flex rounded-full border border-[#ff7a3a]/50 bg-[#ffffff]/5 px-4 py-2 text-xs uppercase tracking-[0.36em] text-orange-300/80">
              Favorites database
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-2 font-mono">
            Saved Pokémon
          </h1>
          <p className="text-red-300 text-lg">
            Your personal collection
          </p>
        </motion.div>

        {/* Back button */}
        <motion.button
          className="absolute top-8 left-8 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>

        {/* Content */}
        <div className="px-8 pb-8">
          {favorites.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Heart className="w-16 h-16 text-orange-400/50 mx-auto mb-4" />
              <p className="text-orange-300 text-xl mb-2">No favorites yet</p>
              <p className="text-orange-200/70">Add Pokémon to your favorites from the detail page</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {favorites.map((pokemon) => (
                <FavoriteCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={handleCardClick}
                  onRemove={removeFavorite}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const FavoriteCard = ({ pokemon, onClick, onRemove }) => {
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
      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(pokemon.id);
        }}
        className="absolute top-2 right-2 z-30 p-1 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>

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
          <motion.img
            src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain"
            whileHover={{ scale: 1.1 }}
          />
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
        </div>
      </div>
    </motion.div>
  );
};

export default Favorites;