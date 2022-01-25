import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "./pages/home/HomePage";
import GamePage from "./pages/game/GamePage";
import BattlePage from "./pages/battle/BattlePage";
import MergePage from "./pages/merge/MergePage";
import RequireAccount from "./router/RequireAccount";
import TrashPage from "./pages/trash/TrashPage";
import TransferPage from "./pages/transfer/TransferPage";
import MarketplacePage from "./pages/marketplace/MarketplacePage";

function App() {
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/game"
            element={
              <RequireAccount>
                <GamePage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/battle"
            element={
              <RequireAccount>
                <BattlePage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/merge"
            element={
              <RequireAccount>
                <MergePage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/trash"
            element={
              <RequireAccount>
                <TrashPage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/transfer"
            element={
              <RequireAccount>
                <TransferPage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/marketplace/history"
            element={
              <RequireAccount>
                <MarketplacePage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/marketplace/listed"
            element={
              <RequireAccount>
                <MarketplacePage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/marketplace/new"
            element={
              <RequireAccount>
                <MarketplacePage />
              </RequireAccount>
            }
          />
          <Route
            path="/game/marketplace"
            element={
              <RequireAccount>
                <MarketplacePage />
              </RequireAccount>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
