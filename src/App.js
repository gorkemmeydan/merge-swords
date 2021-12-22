import './App.css';
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from './pages/home/HomePage';
import GamePage from './pages/game/GamePage';
import BattlePage from './pages/battle/BattlePage';
import MergePage from './pages/merge/MergePage';

function App() {
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game' element={<GamePage /> } />
          <Route path='/game/battle' element={<BattlePage /> } />
          <Route path='/game/merge' element={<MergePage /> } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
