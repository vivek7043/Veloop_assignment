import React, { useState } from 'react';
import { gamesData } from '../data/gamesData';
import { GameCarousel } from '../components/GameCarousel';
import { InsufficientTokensModal } from '../components/InsufficientTokensModal';
import { useGameCoin } from '../context/GameCoinContext';
import { Sparkles, Flame } from 'lucide-react';

export const GamesHub = ({ onSelectGame, onPlayGameDirect }) => {
  const { tokens, deductTokens } = useGameCoin();
  const [showInsufficient, setShowInsufficient] = useState(false);

  const handlePlayNow = (game) => {
    if (!game || !game.isPlayable) return;
    if (tokens >= 20) {
      deductTokens(20);
      onPlayGameDirect(game);
    } else {
      setShowInsufficient(true);
    }
  };

  const handleSelectGame = (game) => {
    if (!game || !game.isPlayable) return;
    onSelectGame(game);
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroBadge}>
          <Sparkles size={16} color="#38bdf8" />
          <span>VELOOP REWARDS GAME HUB</span>
        </div>
        <h1 style={styles.heroTitle}>
          Play Games, Earn <span style={styles.gradientText}>Game Coins</span>
        </h1>
        <p style={styles.heroSub}>
          Select from 13 exciting games. Entry fee is only 20 Tokens per play!
        </p>
      </section>

      {/* Featured 13 Games Carousel */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTitleRow}>
            <Flame size={20} color="#f59e0b" />
            <h2 style={styles.sectionTitle}>Featured Games</h2>
          </div>
          <span style={styles.badgeCount}>13 BANNERS</span>
        </div>

        {/* Carousel Component - Touch drag, Auto scroll, Dots, NO Left/Right Arrows */}
        <GameCarousel
          games={gamesData}
          onPlayGame={handlePlayNow}
          onSelectGame={handleSelectGame}
        />
      </section>

      {/* Insufficient Tokens Modal */}
      {showInsufficient && (
        <InsufficientTokensModal onClose={() => setShowInsufficient(false)} />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 16px 90px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  heroSection: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 0 10px 0',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(56, 189, 248, 0.12)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    color: '#38bdf8',
    fontSize: '0.75rem',
    fontWeight: '800',
    padding: '4px 12px',
    borderRadius: '20px',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontSize: '2.2rem',
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 1.1,
  },
  gradientText: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    maxWidth: '550px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '800',
  },
  badgeCount: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: '#38bdf8',
    background: 'rgba(56, 189, 248, 0.15)',
    padding: '3px 10px',
    borderRadius: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
  }
};
