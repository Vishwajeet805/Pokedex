import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Zap, Flame, Droplet, Leaf, Snowflake, Shield, Feather, Target, Sparkles, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import CursorBackground from '../components/CursorBackground';

const Detail = () => {
  const location = useLocation();
  const { pokemon } = location.state || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    if (pokemon) {
      const stored = localStorage.getItem('pokedex-favorites');
      if (stored) {
        const favorites = JSON.parse(stored);
        setIsFavorite(favorites.some(p => p.id === pokemon.id));
      }

      // Fetch species data for evolution
      fetch(pokemon.species.url)
        .then(res => res.json())
        .then(data => {
          setSpeciesData(data);
          return fetch(data.evolution_chain.url);
        })
        .then(res => res.json())
        .then(chain => setEvolutionChain(chain))
        .catch(console.error);
    }
  }, [pokemon]);

  const toggleFavorite = () => {
    if (!pokemon) return;

    const stored = localStorage.getItem('pokedex-favorites');
    let favorites = stored ? JSON.parse(stored) : [];

    if (isFavorite) {
      favorites = favorites.filter(p => p.id !== pokemon.id);
    } else {
      favorites.push(pokemon);
    }

    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const getEvolutionChain = (chain) => {
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        id: current.species.url.split('/').slice(-2, -1)[0]
      });
      current = current.evolves_to[0];
    }

    return evolutions;
  };

  if (!pokemon) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">No Pokémon data</div>;
  }

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

  const getMoveIcon = (moveName) => {
    const normalized = moveName.toLowerCase();
    if (normalized.includes('fire') || normalized.includes('flame')) return Flame;
    if (normalized.includes('water') || normalized.includes('surf') || normalized.includes('hydro') || normalized.includes('bubble')) return Droplet;
    if (normalized.includes('electric') || normalized.includes('thunder') || normalized.includes('zap')) return Zap;
    if (normalized.includes('grass') || normalized.includes('leaf') || normalized.includes('vine')) return Leaf;
    if (normalized.includes('ice') || normalized.includes('blizzard') || normalized.includes('frost')) return Snowflake;
    if (normalized.includes('psychic') || normalized.includes('mind') || normalized.includes('dream')) return Moon;
    if (normalized.includes('ghost') || normalized.includes('dark')) return Sparkles;
    if (normalized.includes('rock') || normalized.includes('stone') || normalized.includes('earth') || normalized.includes('quake')) return Shield;
    if (normalized.includes('fly') || normalized.includes('wind') || normalized.includes('aero')) return Feather;
    return Target;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} relative overflow-hidden`}>
      <CursorBackground />

      {/* Ambient layers */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Rotating rings */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-64 h-64 border-2 border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-8 left-8 w-48 h-48 border border-white/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -50, null],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <motion.button
        className="absolute top-8 left-8 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </motion.button>

      {/* Favorite button */}
      <motion.button
        className="absolute top-8 right-8 z-20 p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleFavorite}
      >
        <Heart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 font-mono">
            #{String(pokemon.id).padStart(3, '0')}
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white capitalize">
            {pokemon.name}
          </h2>
          <div className="flex justify-center gap-2 mt-4">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-4 py-2 bg-black/50 text-white rounded-full capitalize font-semibold"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Pokémon images */}
        <motion.div
          className="relative mb-8 flex flex-col items-center justify-center gap-8 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="relative flex flex-col items-center justify-center"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <img
              src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-52 h-52 object-contain"
            />
            <p className="text-white/70 text-sm mt-2">Normal</p>
          </motion.div>
          {pokemon.sprites.other.home.front_shiny && (
            <motion.div
              className="relative flex flex-col items-center justify-center"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
            >
              <img
                src={pokemon.sprites.other.home.front_shiny}
                alt={`${pokemon.name} shiny`}
                className="w-52 h-52 object-contain"
              />
              <p className="text-white/70 text-sm mt-2">Shiny</p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="w-full max-w-md bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-white text-xl font-bold mb-4 text-center">Stats</h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center justify-between">
                <span className="text-white capitalize text-sm">{stat.stat.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                  <span className="text-white text-sm w-8 text-right">{stat.base_stat}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Moves */}
        <motion.div
          className="w-full max-w-4xl bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <h3 className="text-white text-xl font-bold mb-4 text-center">Moves</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
            {pokemon.moves.slice(0, 20).map((move) => {
              const Icon = getMoveIcon(move.move.name);
              return (
                <motion.div
                  key={move.move.name}
                  className="flex items-center gap-2 rounded-2xl border border-orange-300/20 bg-orange-500/10 px-3 py-2 text-xs text-orange-200 shadow-[0_0_16px_rgba(255,121,52,0.06)]"
                  whileHover={{ scale: 1.03, y: -2 }}
                >
                  <Icon className="w-4 h-4 text-orange-300" />
                  <span className="capitalize">{move.move.name.replace('-', ' ')}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Evolution Chain */}
        {evolutionChain && (
          <motion.div
            className="w-full max-w-4xl bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <h3 className="text-white text-xl font-bold mb-4 text-center">Evolution Chain</h3>
            <div className="flex justify-center items-center gap-8">
              {getEvolutionChain(evolutionChain.chain).map((evo, index) => (
                <div key={evo.id} className="text-center">
                  <motion.img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evo.id}.png`}
                    alt={evo.name}
                    className="w-24 h-24 object-contain mx-auto mb-2"
                    whileHover={{ scale: 1.1 }}
                  />
                  <p className="text-white capitalize">{evo.name}</p>
                  <p className="text-orange-300 text-sm">#{String(evo.id).padStart(3, '0')}</p>
                  {index < getEvolutionChain(evolutionChain.chain).length - 1 && (
                    <span className="text-orange-400 text-2xl mx-4">→</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Detail;