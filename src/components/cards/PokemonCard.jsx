import { motion } from 'framer-motion';

const typeColors = {
  grass: 'from-emerald-400/40 to-emerald-700/30',
  poison: 'from-fuchsia-400/40 to-fuchsia-700/30',
  fire: 'from-orange-300/40 to-red-600/30',
  water: 'from-sky-300/40 to-blue-700/30',
  electric: 'from-yellow-300/40 to-amber-600/30',
  psychic: 'from-pink-300/40 to-rose-600/30',
  normal: 'from-zinc-300/40 to-zinc-600/30',
};

export default function PokemonCard({ pokemon }) {
  const primaryType = pokemon.types[0]?.toLowerCase() || 'normal';

  return (
    <motion.article
      whileHover={{ scale: 1.04, rotateX: 7, rotateY: -7 }}
      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-glow-red/45 bg-zinc-950/75 p-4 shadow-holo backdrop-blur-sm"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_45%)] opacity-50" />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.24)_45%,transparent_70%)]"
        animate={{ x: ['-120%', '130%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm tracking-widest text-zinc-300">#{pokemon.id.toString().padStart(3, '0')}</p>
          <div className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-100 ${typeColors[primaryType] || typeColors.normal}`}>
            {primaryType}
          </div>
        </div>

        <motion.div className="relative mx-auto mb-3 w-fit" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <img src={pokemon.image} alt={pokemon.name} className="h-32 w-32 object-contain drop-shadow-[0_0_16px_rgba(255,122,24,0.4)]" />
        </motion.div>

        <h3 className="text-lg font-semibold tracking-wide text-zinc-100">{pokemon.name}</h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span key={type} className="rounded-full border border-glow-red/45 px-2.5 py-1 text-xs uppercase tracking-[0.14em] text-zinc-200">
              {type}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
