import { motion } from 'framer-motion';

const BOOT_DURATION_MS = 2500;

export default function BootSequence({ onComplete }) {
  return (
    <motion.section
      className="fixed inset-0 z-50 overflow-hidden bg-void"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onAnimationComplete={() => {
        setTimeout(() => onComplete?.(), BOOT_DURATION_MS);
      }}
    >
      <div className="absolute inset-0 bg-radar-grid opacity-70" />
      <div className="absolute inset-0 animate-scanline bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,50,64,0.12)_50%,transparent_100%)] bg-[length:100%_6px]" />

      {Array.from({ length: 24 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-glow-orange/70"
          style={{ left: `${(index * 17) % 100}%`, top: `${(index * 31) % 100}%` }}
          animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -12, 0] }}
          transition={{ duration: 1.8 + (index % 5) * 0.25, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8">
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-glow-red/80 shadow-holo"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="h-10 w-full border-y-2 border-glow-red/90 bg-zinc-950" />
          <div className="absolute h-8 w-8 rounded-full border-2 border-glow-orange bg-zinc-900 shadow-[0_0_22px_rgba(255,122,24,0.55)]" />
          <motion.div
            className="absolute inset-0 rounded-full border border-glow-orange/40"
            animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>

        <motion.p
          className="text-lg tracking-[0.2em] text-zinc-200"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Initializing Pokédex…
        </motion.p>

        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">Audio system standby · startup SFX placeholder</p>
      </div>
    </motion.section>
  );
}
