import React, { useState } from 'react';
import { GameCoinProvider } from './context/GameCoinContext';
import { Header } from './components/Header';
import { GameNavigation } from './components/GameNavigation';
import { GamesHub } from './pages/Games';
import { GameHome } from './pages/GameHome';
import { GameRedeem } from './pages/GameRedeem';

export function App() {
  const [currentView, setCurrentView] = useState('hub'); // 'hub', 'game-home', 'redeem'
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setCurrentView('game-home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GameCoinProvider>
      <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', position: 'relative' }}>
        {/* Sticky Header */}
        <Header onNavigate={handleNavigate} />

        {/* Page Content */}
        <main>
          {currentView === 'hub' && (
            <GamesHub
              onSelectGame={handleSelectGame}
              onPlayGameDirect={handleSelectGame}
            />
          )}

          {currentView === 'game-home' && selectedGame && (
            <GameHome
              game={selectedGame}
              onBack={() => setCurrentView('hub')}
              onNavigateRedeem={() => setCurrentView('redeem')}
            />
          )}

          {currentView === 'redeem' && (
            <GameRedeem onNavigateHome={() => setCurrentView('hub')} />
          )}
        </main>

        {/* Bottom Navigation */}
        <GameNavigation
          activeTab={currentView === 'game-home' ? 'home' : currentView}
          onNavigate={handleNavigate}
        />
      </div>
    </GameCoinProvider>
  );
}

export default App;
