import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { pokemonEntries } from '../../data/pokemon';

const TEAM_SIZE = 6;

export default function TeamBuilderPage() {
  const [team, setTeam] = useState(Array(TEAM_SIZE).fill(null));
  const [draggedId, setDraggedId] = useState(null);

  const available = useMemo(() => pokemonEntries, []);

  const assignToSlot = (slotIndex, pokemonId) => {
    const pokemon = available.find((item) => item.id === pokemonId) || null;
    setTeam((prev) => {
      const next = [...prev];
      next[slotIndex] = pokemon;
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden rounded-panel border border-ember-700/45 bg-ember-950/45 p-6 shadow-holo sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_10%,rgba(255,122,24,0.15),transparent_45%)]" />

      <header className="relative z-10 mb-6">
        <h1 className="text-2xl font-semibold tracking-[0.12em] text-zinc-100">Squad Assembly Bay</h1>
        <p className="mt-1 text-sm text-zinc-300">Drag a Pokémon capsule into any of the 6 battle slots</p>
      </header>

      <div className="relative z-10 mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {available.map((pokemon) => (
          <motion.button
            key={pokemon.id}
            type="button"
            draggable
            onDragStart={() => setDraggedId(pokemon.id)}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group rounded-full border border-glow-red/45 bg-zinc-950/70 px-4 py-3 text-left shadow-holo"
          >
            <div className="flex items-center gap-3">
              <img src={pokemon.image} alt={pokemon.name} className="h-10 w-10 object-contain" />
              <div>
                <p className="text-sm font-semibold text-zinc-100">{pokemon.name}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">Capsule #{pokemon.id}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {team.map((slotPokemon, slotIndex) => (
          <motion.div
            key={slotIndex}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedId) assignToSlot(slotIndex, draggedId);
            }}
            whileHover={{ scale: 1.02 }}
            className="flex min-h-36 flex-col items-center justify-center rounded-[1.2rem] border border-glow-red/45 bg-zinc-950/70 p-3 text-center shadow-holo"
          >
            {slotPokemon ? (
              <>
                <img src={slotPokemon.image} alt={slotPokemon.name} className="h-16 w-16 object-contain" />
                <p className="mt-2 text-sm font-medium text-zinc-100">{slotPokemon.name}</p>
                <button
                  type="button"
                  onClick={() => assignToSlot(slotIndex, null)}
                  className="mt-1 text-xs text-zinc-400 hover:text-glow-orange"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Slot {slotIndex + 1}</p>
                <p className="mt-2 text-sm text-zinc-400">Awaiting unit</p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
