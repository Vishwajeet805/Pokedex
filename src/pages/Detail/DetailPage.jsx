import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { pokemonEntries } from '../../data/pokemon';

const tabs = ['About', 'Stats', 'Moves', 'Evolution'];
const statData = [
  { label: 'HP', value: 45 },
  { label: 'Attack', value: 49 },
  { label: 'Defense', value: 49 },
  { label: 'Speed', value: 45 },
];

export default function DetailPage() {
  const [activeTab, setActiveTab] = useState('Stats');
  const pokemon = useMemo(() => pokemonEntries[0], []);

  return (
    <section className="relative overflow-hidden rounded-panel border border-ember-700/45 bg-ember-950/45 p-6 shadow-holo sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(74,222,128,0.2),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,122,24,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0,transparent_6px,rgba(255,255,255,0.035)_7px)]" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative rounded-[1.5rem] border border-glow-red/40 bg-zinc-950/60 p-6">
          <motion.div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow-red/35" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow-orange/35" animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />

          <motion.img
            src={pokemon.image}
            alt={pokemon.name}
            className="relative z-10 mx-auto h-64 w-64 object-contain drop-shadow-[0_0_24px_rgba(255,122,24,0.45)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />

          <h1 className="mt-4 text-center text-3xl font-semibold tracking-[0.1em] text-zinc-100">{pokemon.name}</h1>
          <p className="text-center text-sm uppercase tracking-[0.25em] text-zinc-300">#{pokemon.id.toString().padStart(3, '0')}</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-1.5 text-sm tracking-wider transition ${
                  activeTab === tab
                    ? 'border-glow-orange bg-glow-orange/20 text-zinc-100'
                    : 'border-glow-red/40 bg-zinc-950/60 text-zinc-300 hover:border-glow-orange/70'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="rounded-[1.25rem] border border-glow-red/40 bg-zinc-950/60 p-5">
            {activeTab === 'Stats' && (
              <div className="space-y-3">
                {statData.map((stat, index) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-300">
                      <span>{stat.label}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-glow-red to-glow-orange"
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ delay: index * 0.08, duration: 0.6 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'About' && <p className="text-sm text-zinc-300">Seed Pokémon. A calm but tactical creature with adaptive vine control.</p>}
            {activeTab === 'Moves' && <p className="text-sm text-zinc-300">Vine Whip · Razor Leaf · Sleep Powder · Solar Beam</p>}
            {activeTab === 'Evolution' && (
              <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-zinc-200">
                <span className="rounded-full border border-glow-red/45 px-3 py-1">Bulbasaur</span>
                <span className="text-glow-orange">⚡</span>
                <span className="rounded-full border border-glow-red/45 px-3 py-1">Ivysaur</span>
                <span className="text-glow-orange">⚡</span>
                <span className="rounded-full border border-glow-red/45 px-3 py-1">Venusaur</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
