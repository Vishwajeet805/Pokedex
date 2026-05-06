import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import RadialNav from '../../components/navigation/RadialNav';

export default function LandingPage() {
  return (
    <section className="relative isolate min-h-[86vh] overflow-hidden rounded-panel border border-ember-700/45 bg-ember-950/45 p-6 shadow-holo sm:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,50,64,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 animate-pulseGlow bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.12),transparent_62%)]" />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow-red/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center pt-14 text-center sm:pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-balance text-3xl font-semibold tracking-[0.12em] text-zinc-100 sm:text-4xl"
        >
          Pokédex Neural Scanner
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mt-10 w-full"
        >
          <div className="group relative mx-auto max-w-2xl rounded-[2rem] border border-glow-red/55 bg-zinc-950/70 px-5 py-4 shadow-holo backdrop-blur-md transition hover:border-glow-orange">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(120deg,transparent_0%,rgba(255,122,24,0.12)_45%,transparent_100%)] opacity-70" />
            <label htmlFor="pokemon-search" className="sr-only">Search Pokémon by name or ID</label>
            <div className="relative flex items-center gap-3">
              <Search className="h-5 w-5 text-glow-orange" />
              <input
                id="pokemon-search"
                type="text"
                placeholder="Search Pokémon by name or ID"
                className="w-full bg-transparent text-base tracking-wide text-zinc-100 outline-none placeholder:text-zinc-400"
              />
            </div>
          </div>
        </motion.div>

        <RadialNav />
      </div>
    </section>
  );
}
