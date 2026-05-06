import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import BootSequence from './components/animations/BootSequence';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/Landing/LandingPage';
import ExplorerPage from './pages/Explorer/ExplorerPage';
import DetailPage from './pages/Detail/DetailPage';
import ComparePage from './pages/Compare/ComparePage';
import TeamBuilderPage from './pages/TeamBuilder/TeamBuilderPage';

const BOOT_KEY = 'pokedex_boot_seen';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const hasBooted = sessionStorage.getItem(BOOT_KEY) === 'true';
    if (hasBooted) {
      setIsBooting(false);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem(BOOT_KEY, 'true');
    setIsBooting(false);
  };

  return (
    <>
      <AnimatePresence>{isBooting && <BootSequence onComplete={handleBootComplete} />}</AnimatePresence>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
        </Routes>
      </AppLayout>
    </>
  );
}
