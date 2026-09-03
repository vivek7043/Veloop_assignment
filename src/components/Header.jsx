import React from 'react';
import { useGameCoin } from '../context/GameCoinContext';
import { Sparkles, PlusCircle } from 'lucide-react';

export const Header = ({ onNavigate }) => {
  const { tokens, gameCoins, addTokens } = useGameCoin();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.brand} onClick={() => onNavigate && onNavigate('hub')}>
          <div style={styles.logoBadge}>
            <Sparkles size={20} color="#38bdf8" />
          </div>
          <div>
            <h1 style={styles.brandTitle}>VELOOP <span style={{ color: '#38bdf8' }}>REWARDS</span></h1>
            <p style={styles.brandSubtitle}>Games Ecosystem</p>
          </div>
        </div>

        {/* Currency Stats */}
        <div style={styles.statsRow}>
          {/* Tokens Balance */}
          <div style={styles.statChip}>
            <img
              src="/assets/token.png"
              alt="Tokens"
              style={{ width: 20, height: 20, objectFit: 'contain' }}
            />
            <div style={styles.statInfo}>
              <span style={styles.statLabel}>Tokens</span>
              <span style={styles.statValue}>{tokens}</span>
            </div>
            <button
              onClick={() => addTokens(50)}
              title="Add 50 Demo Tokens"
              style={styles.addBtn}
            >
              <PlusCircle size={16} color="#38bdf8" />
            </button>
          </div>

          {/* Centralized Game Coins Balance */}
          <div style={{ ...styles.statChip, borderColor: 'rgba(245, 158, 11, 0.4)', background: 'rgba(245, 158, 11, 0.1)' }}>
            <img
              src="/assets/game_coin.png"
              alt="Game Coins"
              style={{ width: 22, height: 22, objectFit: 'contain' }}
            />
            <div style={styles.statInfo}>
              <span style={{ ...styles.statLabel, color: '#f59e0b' }}>Game Coins</span>
              <span style={{ ...styles.statValue, color: '#fbbf24' }}>{gameCoins}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    padding: '12px 16px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  logoBadge: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
    border: '1px solid rgba(56, 189, 248, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: '1.2rem',
    fontWeight: '800',
    letterSpacing: '0.5px',
    color: '#fff',
    lineHeight: 1.1,
  },
  brandSubtitle: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  statsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  statChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(30, 41, 59, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '4px 12px 4px 8px',
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.65rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  statValue: {
    fontSize: '0.95rem',
    fontWeight: '800',
    color: '#38bdf8',
  },
  addBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    marginLeft: 2,
    transition: 'transform 0.2s ease',
  }
};
