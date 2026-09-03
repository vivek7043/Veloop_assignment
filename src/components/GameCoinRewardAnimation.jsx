import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export const GameCoinRewardAnimation = ({ earnedCoins, onComplete }) => {
  useEffect(() => {
    // Trigger confetti burst
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#10b981']
    });

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.coinIconWrap} className="coin-pulse">
          <img
            src="/assets/game_coin.png"
            alt="Game Coin"
            style={{ width: 64, height: 64, objectFit: 'contain' }}
          />
        </div>

        <div style={styles.badgeText}>
          <Sparkles size={18} color="#fbbf24" /> REWARD UNLOCKED
        </div>

        <h2 style={styles.rewardTitle}>+{earnedCoins} Game Coins</h2>
        <p style={styles.subText}>Added to Centralized Balance</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(15, 23, 42, 0.9)',
    backdropFilter: 'blur(12px)',
    zIndex: 1300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    background: '#1e293b',
    border: '2px solid rgba(245, 158, 11, 0.5)',
    borderRadius: '28px',
    padding: '32px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(245, 158, 11, 0.3)',
    animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  coinIconWrap: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.25) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    fontWeight: '800',
    color: '#fbbf24',
    letterSpacing: '1px',
  },
  rewardTitle: {
    fontSize: '1.8rem',
    fontWeight: '900',
    color: '#ffffff',
  },
  subText: {
    fontSize: '0.85rem',
    color: '#94a3b8',
  }
};
