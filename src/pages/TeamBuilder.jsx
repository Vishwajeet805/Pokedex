import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import CursorBackground from '../components/CursorBackground';

const TeamBuilder = () => {
  const [team, setTeam] = useState(Array(6).fill(null));
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [addingStates, setAddingStates] = useState(Array(6).fill(false));

  const addPokemon = async (slotIndex) => {
    const name = inputValues[slotIndex].trim();
    if (!name || team[slotIndex]) return;

    setAddingStates(prev => {
      const newStates = [...prev];
      newStates[slotIndex] = true;
      return newStates;
    });

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error();
      const pokemon = await response.json();
      const newTeam = [...team];
      newTeam[slotIndex] = pokemon;
      setTeam(newTeam);
      setInputValues(prev => {
        const newValues = [...prev];
        newValues[slotIndex] = '';
        return newValues;
      });
    } catch (error) {
      alert('Pokémon not found');
    } finally {
      setAddingStates(prev => {
        const newStates = [...prev];
        newStates[slotIndex] = false;
        return newStates;
      });
    }
  };

  const removePokemon = (slotIndex) => {
    const newTeam = [...team];
    newTeam[slotIndex] = null;
    setTeam(newTeam);
  };

  const handleKeyPress = (event, slotIndex) => {
    if (event.key === 'Enter') {
      addPokemon(slotIndex);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
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
          className="text-center py-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-orange-400 mb-2 font-mono">
            Squad Assembler
          </h1>
          <p className="text-red-300 text-lg">
            Tactical Team Builder
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

        {/* Team slots */}
        <div className="relative z-10 px-8 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((pokemon, index) => (
              <motion.div
                key={index}
                className="relative bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-orange-400/30 min-h-[200px] flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255, 165, 0, 0.6)' }}
              >
                {pokemon ? (
                  <>
                    {/* Remove button */}
                    <button
                      onClick={() => removePokemon(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>

                    {/* Pokemon display */}
                    <motion.img
                      src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-20 h-20 mb-2"
                      whileHover={{ scale: 1.1 }}
                    />
                    <h3 className="text-lg font-bold capitalize text-center">{pokemon.name}</h3>
                    <p className="text-orange-300 text-sm">#{String(pokemon.id).padStart(3, '0')}</p>
                    <div className="flex gap-1 mt-2">
                      {pokemon.types.map((type) => (
                        <span
                          key={type.type.name}
                          className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded capitalize"
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Empty slot with input */}
                    <div className="w-full space-y-3">
                      <div className="w-20 h-20 border-2 border-dashed border-orange-400/50 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-orange-400/50 text-2xl">+</span>
                      </div>
                      <p className="text-orange-300/70 text-center text-sm">Slot {index + 1}</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={inputValues[index]}
                          onChange={(e) => {
                            const newValues = [...inputValues];
                            newValues[index] = e.target.value;
                            setInputValues(newValues);
                          }}
                          onKeyDown={(e) => handleKeyPress(e, index)}
                          placeholder="Pokémon name/ID"
                          className="flex-1 px-2 py-1 bg-black/30 border border-orange-400/30 rounded text-white text-xs placeholder-orange-300/60 outline-none focus:border-orange-400"
                          disabled={addingStates[index]}
                        />
                        <button
                          onClick={() => addPokemon(index)}
                          disabled={addingStates[index] || !inputValues[index].trim()}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 hover:bg-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed rounded text-orange-300 text-xs transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          {addingStates[index] ? 'Adding' : 'Add'}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-orange-400/20"
                  animate={{ boxShadow: pokemon ? '0 0 20px rgba(255, 165, 0, 0.3)' : '0 0 0 rgba(255, 165, 0, 0)' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;