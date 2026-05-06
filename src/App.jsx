import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Startup from './components/Startup';
import Landing from './pages/Landing';
import Explorer from './pages/Explorer';
import Detail from './pages/Detail';
import Compare from './pages/Compare';
import TeamBuilder from './pages/TeamBuilder';
import Favorites from './pages/Favorites';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleStartupComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Startup key="startup" onComplete={handleStartupComplete} />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/team-builder" element={<TeamBuilder />} />
            {/* Add more routes later */}
          </Routes>
        </Router>
      )}
    </AnimatePresence>
  );
}

export default App;
