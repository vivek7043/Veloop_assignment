import React, { useState } from 'react';
import { useGameCoin } from '../context/GameCoinContext';
import { Coins, CheckCircle, AlertTriangle, ArrowRight, History, Sparkles } from 'lucide-react';

const REDEEM_OPTIONS = [
  {
    id: 've',
    title: 'Convert to VEs',
    description: 'Exchange Game Coins for VELOOP VEs',
    cost: 100,
    rewardText: '10 VEs',
    icon: '/assets/ve.png',
    bg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(3, 105, 161, 0.15) 100%)',
    borderColor: 'rgba(56, 189, 248, 0.4)',
    accentColor: '#38bdf8',
  },
  {
    id: 'sve',
    title: 'Convert to Silver VEs',
    description: 'Exchange Game Coins for Silver VEs',
    cost: 100,
    rewardText: '10 SVEs',
    icon: '/assets/sve.png',
    bg: 'linear-gradient(135deg, rgba(148, 163, 184, 0.15) 0%, rgba(71, 85, 105, 0.15) 100%)',
    borderColor: 'rgba(148, 163, 184, 0.4)',
    accentColor: '#cbd5e1',
  },
  {
    id: 'gems',
    title: 'Convert to Gems',
    description: 'Exchange Game Coins for Premium Gems',
    cost: 50,
    rewardText: '5 Gems',
    icon: '/assets/gems.png',
    bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(126, 34, 206, 0.15) 100%)',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    accentColor: '#c084fc',
  },
  {
    id: 'tokens',
    title: 'Convert to Tokens',
    description: 'Get extra Tokens to play more games',
    cost: 50,
    rewardText: '20 Tokens',
    icon: '/assets/token.png',
    bg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
    borderColor: 'rgba(6, 182, 212, 0.4)',
    accentColor: '#22d3ee',
  },
  {
    id: 'spins',
    title: 'Convert to Spins',
    description: 'Get extra Spins for Fortune Wheel',
    cost: 50,
    rewardText: '2 Spins',
    icon: '/assets/spin.png',
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.15) 100%)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    accentColor: '#fbbf24',
  },
];

export const GameRedeem = ({ onNavigateHome }) => {
  const { gameCoins, redeemCoins, redemptionHistory } = useGameCoin();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSelectRedeem = (opt) => {
    setSelectedOption(opt);
    if (gameCoins < opt.cost) {
      setShowInsufficient(true);
    } else {
      setShowConfirm(true);
    }
  };

  const handleConfirmRedeem = () => {
    if (!selectedOption) return;

    const ok = redeemCoins(selectedOption.cost, selectedOption.rewardText, selectedOption.id);
    if (ok) {
      setSuccessMessage(`Successfully converted ${selectedOption.cost} Game Coins into ${selectedOption.rewardText}!`);
      setShowConfirm(false);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <section style={styles.headerSection}>
        <div style={styles.badge}>
          <Coins size={16} color="#f59e0b" />
          <span>GAME COIN REDEMPTION CENTER</span>
        </div>
        <h1 style={styles.title}>
          Convert Your <span style={styles.gradientText}>Game Coins</span>
        </h1>

        {/* Centralized Balance Box */}
        <div style={styles.balanceCard}>
          <img src="/assets/game_coin.png" alt="Game Coin" style={{ width: 36, height: 36 }} />
          <div>
            <span style={styles.balanceLabel}>Available Central Balance:</span>
            <h2 style={styles.balanceAmount}>{gameCoins} Game Coins</h2>
          </div>
        </div>
      </section>

      {/* Success Notification */}
      {successMessage && (
        <div style={styles.successBanner}>
          <CheckCircle size={20} color="#10b981" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Redemption Cards List */}
      <section style={styles.optionsSection}>
        <h3 style={styles.sectionHeading}>Choose Redemption Reward</h3>

        <div style={styles.optionsGrid}>
          {REDEEM_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              style={{
                ...styles.optionCard,
                background: opt.bg,
                borderColor: opt.borderColor,
              }}
            >
              <div style={styles.optionHeader}>
                <img
                  src={opt.icon}
                  alt={opt.title}
                  style={{ width: 44, height: 44, objectFit: 'contain' }}
                />
                <div>
                  <h4 style={{ ...styles.optTitle, color: opt.accentColor }}>{opt.title}</h4>
                  <p style={styles.optDesc}>{opt.description}</p>
                </div>
              </div>

              <div style={styles.optionFooter}>
                <div style={styles.costBox}>
                  <img src="/assets/game_coin.png" alt="Coins" style={{ width: 18, height: 18 }} />
                  <span>{opt.cost} Coins → <strong>{opt.rewardText}</strong></span>
                </div>

                <button
                  style={{
                    ...styles.redeemBtn,
                    background: gameCoins >= opt.cost ? opt.accentColor : '#475569',
                    color: gameCoins >= opt.cost && opt.id === 'sve' ? '#0f172a' : '#ffffff',
                  }}
                  onClick={() => handleSelectRedeem(opt)}
                >
                  REDEEM
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Redemption History Log */}
      <section style={styles.historySection}>
        <div style={styles.historyHeadingRow}>
          <History size={18} color="#94a3b8" />
          <h3 style={styles.sectionHeading}>Recent Redemption History</h3>
        </div>

        <div style={styles.historyList}>
          {redemptionHistory.length === 0 ? (
            <p style={styles.emptyHistory}>No redemptions yet. Play games to earn Game Coins!</p>
          ) : (
            redemptionHistory.map((item) => (
              <div key={item.id} style={styles.historyRow}>
                <div style={styles.historyLeft}>
                  <img src="/assets/game_coin.png" alt="Coin" style={{ width: 20, height: 20 }} />
                  <span>{item.coins} Coins → <strong style={{ color: '#38bdf8' }}>{item.reward}</strong></span>
                </div>
                <span style={styles.historyDate}>{item.date}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirm && selectedOption && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalCard}>
            <h3 style={styles.modalTitle}>Redeem Game Coins?</h3>

            <div style={styles.modalBreakdown}>
              <p>You are about to convert:</p>
              <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', margin: '4px 0' }}>
                🪙 {selectedOption.cost} Game Coins
              </h4>
              <p>into:</p>
              <h4 style={{ color: '#38bdf8', fontSize: '1.2rem', margin: '4px 0' }}>
                🎁 {selectedOption.rewardText}
              </h4>

              <div style={styles.modalDivider} />

              <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                Remaining Balance: <strong>{gameCoins - selectedOption.cost} Game Coins</strong>
              </p>
            </div>

            <div style={styles.modalBtnRow}>
              <button style={styles.cancelBtn} onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button style={styles.confirmBtn} onClick={handleConfirmRedeem}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insufficient Game Coins Modal */}
      {showInsufficient && selectedOption && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalCard}>
            <AlertTriangle size={36} color="#f59e0b" />
            <h3 style={styles.modalTitle}>Insufficient Game Coins</h3>

            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', textAlign: 'center' }}>
              You need <strong style={{ color: '#fbbf24' }}>{selectedOption.cost} Game Coins</strong> to redeem {selectedOption.rewardText}.
              Your current balance is <strong>{gameCoins} Game Coins</strong>.
            </p>

            <button
              style={styles.playGamesBtn}
              onClick={() => {
                setShowInsufficient(false);
                onNavigateHome();
              }}
            >
              <span>Play Games to Earn Coins</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px 16px 90px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '10px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(245, 158, 11, 0.15)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    color: '#f59e0b',
    fontSize: '0.75rem',
    fontWeight: '800',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '900',
    color: '#ffffff',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  balanceCard: {
    width: '100%',
    maxWidth: '450px',
    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
    border: '1px solid rgba(245, 158, 11, 0.4)',
    borderRadius: '20px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginTop: '8px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
  },
  balanceLabel: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: '1.4rem',
    fontWeight: '900',
    color: '#fbbf24',
  },
  successBanner: {
    background: 'rgba(16, 185, 129, 0.15)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    color: '#10b981',
    padding: '12px 18px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  optionsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '800',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '16px',
  },
  optionCard: {
    borderRadius: '18px',
    border: '1px solid',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
  },
  optionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  optTitle: {
    fontSize: '1rem',
    fontWeight: '800',
  },
  optDesc: {
    fontSize: '0.8rem',
    color: '#cbd5e1',
  },
  optionFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(15, 23, 42, 0.6)',
    padding: '10px 12px',
    borderRadius: '12px',
  },
  costBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    color: '#f8fafc',
  },
  redeemBtn: {
    border: 'none',
    borderRadius: '10px',
    padding: '8px 16px',
    fontWeight: '900',
    fontSize: '0.8rem',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  historySection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: 'rgba(30, 41, 59, 0.5)',
    borderRadius: '20px',
    padding: '18px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  historyHeadingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  emptyHistory: {
    color: '#94a3b8',
    fontSize: '0.85rem',
    fontStyle: 'italic',
  },
  historyRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(15, 23, 42, 0.6)',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '0.85rem',
  },
  historyLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#f8fafc',
  },
  historyDate: {
    color: '#94a3b8',
    fontSize: '0.75rem',
  },
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(15, 23, 42, 0.88)',
    backdropFilter: 'blur(10px)',
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
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '800',
  },
  modalBreakdown: {
    width: '100%',
    background: 'rgba(15, 23, 42, 0.6)',
    padding: '16px',
    borderRadius: '14px',
    textAlign: 'center',
  },
  modalDivider: {
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    margin: '10px 0',
  },
  modalBtnRow: {
    width: '100%',
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#cbd5e1',
    border: 'none',
    borderRadius: '12px',
    padding: '12px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  confirmBtn: {
    flex: 1,
    background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    padding: '12px',
    fontWeight: '800',
    cursor: 'pointer',
  },
  playGamesBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    color: '#0f172a',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '0.95rem',
    fontWeight: '900',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  }
};
