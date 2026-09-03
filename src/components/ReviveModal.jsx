import React from 'react';
import { RotateCcw, ArrowLeft, Trophy, Coins } from 'lucide-react';

export const ReviveModal = ({ score, potentialCoins, onRevive, onNoThanks }) => {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modalCard}>
        <div style={styles.trophyBox}>
          <Trophy size={36} color="#f59e0b" />
        </div>

        <h2 style={styles.title}>GAME OVER</h2>

        <div style={styles.scoreBoard}>
          <div style={styles.scoreRow}>
            <span style={styles.label}>Final Score:</span>
            <span style={styles.scoreVal}>{score}</span>
          </div>

          <div style={styles.scoreRow}>
            <span style={styles.label}>Earned Game Coins:</span>
            <div style={styles.coinVal}>
              <img src="/assets/game_coin.png" alt="Game Coin" style={{ width: 20, height: 20 }} />
              <span>+{potentialCoins}</span>
            </div>
          </div>
        </div>

        <p style={styles.subtext}>Continue this round to reach a higher score?</p>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button style={styles.reviveBtn} onClick={onRevive}>
            <RotateCcw size={18} />
            <span>REVIVE</span>
          </button>

          <button style={styles.noThanksBtn} onClick={onNoThanks}>
            <span>No Thanks</span>
            <ArrowLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(15, 23, 42, 0.88)',
    backdropFilter: 'blur(12px)',
    zIndex: 1200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modalCard: {
    width: '100%',
    maxWidth: '380px',
    background: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    padding: '28px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  trophyBox: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
    border: '1px solid rgba(245, 158, 11, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: '900',
    letterSpacing: '1px',
  },
  scoreBoard: {
    width: '100%',
    background: 'rgba(15, 23, 42, 0.7)',
    borderRadius: '16px',
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  scoreRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  scoreVal: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '800',
  },
  coinVal: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#fbbf24',
    fontSize: '1.1rem',
    fontWeight: '800',
  },
  subtext: {
    color: '#cbd5e1',
    fontSize: '0.85rem',
  },
  buttonRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '6px',
  },
  reviveBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '1rem',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
    letterSpacing: '0.5px',
  },
  noThanksBtn: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#94a3b8',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '14px',
    padding: '12px',
    fontSize: '0.9rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'background 0.2s ease',
  }
};
