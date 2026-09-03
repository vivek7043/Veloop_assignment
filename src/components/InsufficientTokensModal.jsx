import React from 'react';
import { AlertCircle, PlusCircle, X } from 'lucide-react';
import { useGameCoin } from '../context/GameCoinContext';

export const InsufficientTokensModal = ({ onClose }) => {
  const { tokens, addTokens } = useGameCoin();

  const handleEarnMore = () => {
    addTokens(50); // Gives 50 tokens for demo
    onClose();
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalCard}>
        <button style={styles.closeBtn} onClick={onClose}>
          <X size={18} color="#94a3b8" />
        </button>

        <div style={styles.iconBox}>
          <AlertCircle size={32} color="#f43f5e" />
        </div>

        <h2 style={styles.title}>Not Enough Tokens</h2>

        <p style={styles.message}>
          You need <strong style={{ color: '#38bdf8' }}>20 Tokens</strong> to start this game.
        </p>

        <div style={styles.balanceBox}>
          <span style={styles.balanceLabel}>Your Balance:</span>
          <div style={styles.balanceValue}>
            <img src="/assets/token.png" alt="Tokens" style={{ width: 18, height: 18 }} />
            <span>{tokens} Tokens</span>
          </div>
        </div>

        <button style={styles.earnBtn} onClick={handleEarnMore}>
          <PlusCircle size={18} />
          <span>Earn 50 Free Tokens</span>
        </button>
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
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(10px)',
    zIndex: 1200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modalCard: {
    width: '100%',
    maxWidth: '360px',
    background: '#1e293b',
    border: '1px solid rgba(244, 63, 94, 0.3)',
    borderRadius: '24px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
    position: 'relative',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
  },
  closeBtn: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  iconBox: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(244, 63, 94, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6px',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '800',
  },
  message: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
    lineHeight: 1.4,
  },
  balanceBox: {
    width: '100%',
    background: 'rgba(15, 23, 42, 0.6)',
    padding: '10px 14px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    fontWeight: '600',
  },
  balanceValue: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#f8fafc',
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  earnBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '14px',
    padding: '12px',
    fontSize: '0.95rem',
    fontWeight: '800',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
  }
};
