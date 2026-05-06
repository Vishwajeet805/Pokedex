import { motion } from 'framer-motion';
import { pokemonEntries } from '../../data/pokemon';

const compareSet = [pokemonEntries[0], pokemonEntries[1], pokemonEntries[2]];
const statRows = [
  { key: 'hp', label: 'HP', values: [45, 39, 44] },
  { key: 'attack', label: 'ATK', values: [49, 52, 48] },
  { key: 'defense', label: 'DEF', values: [49, 43, 65] },
  { key: 'speed', label: 'SPD', values: [45, 65, 43] },
];

export default function ComparePage() {
  return (
    <section className="relative overflow-hidden rounded-panel border border-ember-700/45 bg-ember-950/45 p-6 shadow-holo sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,50,64,0.18),transparent_45%)]" />

      <header className="relative z-10 mb-6">
        <h1 className="text-2xl font-semibold tracking-[0.12em] text-zinc-100">Battle Compare Matrix</h1>
        <p className="mt-1 text-sm text-zinc-300">Versus prep interface · compare up to 3 Pokémon</p>
      </header>

      <div className="relative z-10 grid gap-4 lg:grid-cols-3">
        {compareSet.map((pokemon, index) => (
          <motion.article
            key={pokemon.id}
            className="rounded-[1.25rem] border border-glow-red/40 bg-zinc-950/65 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12 }}
          >
            <img src={pokemon.image} alt={pokemon.name} className="mx-auto h-28 w-28 object-contain" />
            <h2 className="text-center text-lg tracking-wide text-zinc-100">{pokemon.name}</h2>
            <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-300">#{pokemon.id.toString().padStart(3, '0')}</p>
          </motion.article>
        ))}
      </div>

      <div className="relative z-10 mt-6 space-y-4 rounded-[1.25rem] border border-glow-red/40 bg-zinc-950/65 p-5">
        {statRows.map((row) => {
          const max = Math.max(...row.values);
          return (
            <div key={row.key} className="space-y-2">
              <div className="text-xs uppercase tracking-[0.24em] text-zinc-300">{row.label}</div>
              <div className="grid gap-2">
                {row.values.map((value, idx) => (
                  <div key={`${row.key}-${idx}`} className="flex items-center gap-3">
                    <span className="w-16 text-xs text-zinc-400">{compareSet[idx].name}</span>
                    <div className="h-2 flex-1 rounded-full bg-zinc-800">
                      <motion.div
                        className={`h-full rounded-full ${value === max ? 'bg-gradient-to-r from-glow-orange to-amber-300' : 'bg-gradient-to-r from-glow-red to-glow-orange'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (value / 120) * 100)}%` }}
                        transition={{ duration: 0.55, delay: idx * 0.08 }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-zinc-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
