import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import CursorBackground from '../components/CursorBackground';

const Compare = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addPokemon = async () => {
    if (selectedPokemon.length >= 3 || !inputValue.trim()) return;
    setIsAdding(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.trim().toLowerCase()}`);
      if (!response.ok) throw new Error();
      const pokemon = await response.json();
      setSelectedPokemon([...selectedPokemon, pokemon]);
      setInputValue('');
    } catch (error) {
      alert('Pokémon not found');
    } finally {
      setIsAdding(false);
    }
  };

  const removePokemon = (index) => {
    setSelectedPokemon(selectedPokemon.filter((_, i) => i !== index));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addPokemon();
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <CursorBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-[#120007] via-[#0b0b0f] to-[#140a0a] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.1)_0%,transparent_70%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -50, null],
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
          Battle Comparator
        </h1>
        <p className="text-red-300 text-lg">
          Tactical Analysis Interface
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

      {/* Add Pokemon section */}
      <motion.div
        className="relative z-10 mb-8 px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-md mx-auto bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-orange-400/30">
          <h3 className="text-white text-lg font-bold mb-4 text-center">Add Pokémon to Compare</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter Pokémon name or ID"
              className="flex-1 px-3 py-2 bg-white/10 border border-orange-400/30 rounded text-white placeholder-orange-300/60 outline-none focus:border-orange-400"
              disabled={isAdding || selectedPokemon.length >= 3}
            />
            <button
              onClick={addPokemon}
              disabled={isAdding || selectedPokemon.length >= 3 || !inputValue.trim()}
              className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed rounded text-orange-300 font-semibold transition-colors"
            >
              {isAdding ? 'Adding...' : 'Add'}
            </button>
          </div>
          <p className="text-orange-300/70 text-sm mt-2 text-center">
            {selectedPokemon.length}/3 Pokémon selected
          </p>
        </div>
      </motion.div>

      {/* Comparison area */}
      <div className="relative z-10 px-8 pb-8">
        {selectedPokemon.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-orange-300 text-xl">Select up to 3 Pokémon to compare</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {selectedPokemon.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                className="relative bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-orange-400/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Remove button */}
                <button
                  onClick={() => removePokemon(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* Pokemon info */}
                <div className="text-center mb-4">
                  <img
                    src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-24 h-24 mx-auto mb-2"
                  />
                  <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
                  <p className="text-orange-300">#{String(pokemon.id).padStart(3, '0')}</p>
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{stat.stat.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                        <span className="text-sm w-8 text-right">{stat.base_stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
