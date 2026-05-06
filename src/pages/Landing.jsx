import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Compass, BarChart3, Users, Heart } from 'lucide-react';
import CursorBackground from '../components/CursorBackground';

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [pointer, setPointer] = useState({ x: -999, y: -999 });
  const navigate = useNavigate();

  const handleNavClick = (target) => {
    if (target === 'Explore') {
      navigate('/explorer');
    } else if (target === 'Compare') {
      navigate('/compare');
    } else if (target === 'Team Builder') {
      navigate('/team-builder');
    } else if (target === 'Favorites') {
      navigate('/favorites');
    }
  };

  const handleSearch = async () => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    setIsScanning(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!response.ok) {
        throw new Error('not found');
      }
      const pokemon = await response.json();
      navigate('/detail', { state: { pokemon } });
    } catch (error) {
      window.alert('Scan failed. Pokémon not found.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const navItems = [
    { label: 'Explore', icon: Compass, desc: 'Browse Database' },
    { label: 'Compare', icon: BarChart3, desc: 'Battle Analysis' },
    { label: 'Team Builder', icon: Users, desc: 'Squad Assembly' },
    { label: 'Favorites', icon: Heart, desc: 'Saved Pokémon' },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#050507] text-white"
      onMouseMove={(e) => setPointer({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setPointer({ x: -999, y: -999 })}
    >
      <CursorBackground />
      <motion.div
        className="pointer-events-none absolute h-72 w-72 rounded-full bg-orange-400/10 blur-3xl"
        style={{
          left: pointer.x,
          top: pointer.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: pointer.x === -999 ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-white/5 blur-2xl"
        style={{
          left: pointer.x,
          top: pointer.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: pointer.x === -999 ? 0 : 1, scale: [1, 1.2, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#120007] via-[#0b0b0f] to-[#140a0a] opacity-90" />
      <div className="absolute inset-0 scanline-bg opacity-10" />

      {/* Ambient orbs */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff7200]/10 bg-[#ff7200]/5 blur-3xl" />
      <div className="absolute left-1/4 top-10 h-28 w-28 rounded-full border border-orange-500/30 shadow-[0_0_80px_rgba(255,118,46,0.15)]" />
      <div className="absolute right-16 top-24 h-36 w-36 rounded-full border border-red-500/20 shadow-[0_0_90px_rgba(255,67,51,0.1)]" />
      <div className="absolute -bottom-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full border border-cyan-400/10 bg-cyan-400/5 blur-2xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-10">
        <motion.div
          className="relative mb-14 inline-flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-[#ff7a3a]/50 bg-[#ffffff]/5 px-4 py-2 text-xs uppercase tracking-[0.36em] text-orange-300/80">
            Pokédex system online
          </span>
          <h1 className="text-5xl font-black tracking-[-0.04em] text-orange-300 sm:text-6xl md:text-7xl">
            Pokédex
          </h1>
          <p className="mt-4 max-w-2xl text-base text-red-200/80 md:text-lg">
            Advanced creature analysis and tactical database interface.
          </p>
        </motion.div>

        <motion.div
          className="relative w-full max-w-4xl rounded-[2rem] border border-orange-500/15 bg-[#060608]/90 p-8 shadow-[0_0_120px_rgba(255,116,51,0.12)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-[2rem] border border-orange-500/10" />
          <div className="absolute inset-x-12 top-12 h-24 rounded-full bg-gradient-to-r from-orange-400/10 via-transparent to-orange-400/10 blur-2xl" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-orange-400/10 to-transparent" />

          <div className="relative z-10 space-y-8">
            {/* Search Section */}
            <div className="rounded-[1.75rem] border border-white/10 bg-[#0f1014]/80 p-6 shadow-[0_0_30px_rgba(255,121,52,0.08)]">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-orange-200/80 mb-4">
                <span className="inline-flex h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(255,146,84,0.3)]" />
                System scan active
              </div>
              <div className="flex items-center gap-4 rounded-3xl border border-orange-300/20 bg-black/20 p-4 shadow-[inset_0_0_40px_rgba(255,168,77,0.08)]">
                <Search className="h-5 w-5 text-orange-300" />
                <input
                  type="text"
                  placeholder="Search Pokémon by name or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-transparent text-white placeholder-orange-300/60 outline-none ring-0"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isScanning}
                  className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(255,121,52,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isScanning ? 'Scanning...' : 'Scan'}
                </button>
              </div>
            </div>

            {/* Navigation Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.label)}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111216]/80 px-5 py-6 text-left shadow-[0_0_30px_rgba(255,74,0,0.08)] transition hover:border-orange-400/40 hover:bg-[#171b21] hover:shadow-[0_0_40px_rgba(255,165,0,0.2)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-300 group-hover:bg-orange-500/30 transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-white">{item.label}</span>
                      <span className="block text-sm text-orange-200/70">{item.desc}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
