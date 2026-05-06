import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Swords, Users, Heart } from 'lucide-react';

const items = [
  { label: 'Explore', to: '/explorer', icon: Compass, angle: -65 },
  { label: 'Compare', to: '/compare', icon: Swords, angle: -20 },
  { label: 'Team Builder', to: '/team-builder', icon: Users, angle: 25 },
  { label: 'Favorites', to: '/explorer?filter=favorites', icon: Heart, angle: 70 },
];

export default function RadialNav() {
  return (
    <div className="relative mx-auto mt-10 h-52 w-80 sm:w-[30rem]">
      {items.map(({ label, to, icon: Icon, angle }, index) => {
        const x = Math.cos((angle * Math.PI) / 180) * 130;
        const y = Math.sin((angle * Math.PI) / 180) * 65;

        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ delay: 0.35 + index * 0.12, duration: 0.45 }}
          >
            <Link
              to={to}
              className="group flex items-center gap-2 rounded-full border border-glow-red/45 bg-zinc-950/80 px-4 py-2 text-sm tracking-wide text-zinc-100 shadow-holo backdrop-blur-sm transition hover:scale-105 hover:border-glow-orange"
            >
              <Icon className="h-4 w-4 text-glow-orange transition group-hover:rotate-6" />
              <span>{label}</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
