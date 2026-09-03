import React, { useState } from 'react';
import { useGameCoin } from '../context/GameCoinContext';
import { GameGuideModal } from '../components/GameGuideModal';
import { InsufficientTokensModal } from '../components/InsufficientTokensModal';
import { ArcheryGame } from '../components/games/GameOne/Game';
import { GemBurstGame } from '../components/games/GameTwo/Game';
import { ArrowLeft, Play, HelpCircle, Trophy, Sparkles, Coins, Zap } from 'lucide-react';

export const GameHome = ({ game, onBack, onNavigateRedeem }) => {
  const { gameCoins, tokens, deductTokens, earnGameCoins } = useGameCoin();
  const [showGuide, setShowGuide] = useState(false);
  const [showInsufficient, setShowInsufficient] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!game) return null;

  const handlePlayNow = () => {
    if (tokens >= 20) {
      // Deduct 20 Tokens as required
      deductTokens(20);
      // Show first time guide or launch directly
      setShowGuide(true);
    } else {
      setShowInsufficient(true);
    }
  };

  const handleStartGameplay = () => {
    setShowGuide(false);
    setIsPlaying(true);
  };

  const handleGameFinish = (earnedCoins) => {
    // Add to centralized balance as specified
    earnGameCoins(earnedCoins);
    setIsPlaying(false);
  };

  // If active gameplay is in progress, render the Light Theme game screen
  if (isPlaying) {
    return (
      <div style={styles.lightWrapper}>
        <div style={styles.lightHeader}>
          <button style={styles.lightBackBtn} onClick={() => setIsPlaying(false)}>
            <ArrowLeft size={18} /> Exit Game
          </button>

          <div style={styles.lightCoinChip}>
            <img src="/assets/game_coin.png" alt="Coin" style={{ width: 22, height: 22 }} />
            <span>{gameCoins} Game Coins</span>
          </div>
        </div>

        <div style={{ padding: '16px 12px 80px 12px' }}>
          {game.id === 'game-1' ? (
            <ArcheryGame onFinish={handleGameFinish} />
          ) : game.id === 'game-2' ? (
            <GemBurstGame onFinish={handleGameFinish} />
          ) : (
            <ArcheryGame onFinish={handleGameFinish} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Top Header Row */}
      <div style={styles.topRow}>
        <button style={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={18} /> Back to Games
        </button>

        {/* Centralized Game Coin Balance */}
        <div style={styles.coinBadge}>
          <img src="/assets/game_coin.png" alt="Game Coin" style={{ width: 22, height: 22 }} />
          <div style={styles.coinTextGroup}>
            <span style={styles.coinVal}>{gameCoins}</span>
            <span style={styles.coinLbl}>Game Coins</span>
          </div>
        </div>
      </div>

      {/* Main Game Card Landing Area */}
      <div style={{ ...styles.gameHeroCard, borderColor: game.themeColor }}>
        {/* Game Illustration */}
        <div style={styles.artworkBox}>
          <picture>
            <source srcSet={game.artwork} type="image/avif" />
            <img src={game.artwork} alt={game.title} style={styles.artworkImg} />
          </picture>

          <div style={styles.artworkOverlay}>
            <span style={{ ...styles.categoryBadge, background: game.gradient }}>
              {game.category}
            </span>
            <h1 style={styles.title}>{game.title}</h1>
          </div>
        </div>

        {/* Details & Play CTA */}
        <div style={styles.detailsBody}>
          <p style={styles.description}>{game.description}</p>

          <div style={styles.rewardInfoBox}>
            <Trophy size={20} color="#f59e0b" />
            <div>
              <span style={styles.rewardLabel}>Reward Potential:</span>
              <span style={styles.rewardVal}> up to +{game.rewardCoins} Game Coins</span>
            </div>
          </div>

          {/* Prominent Play Now Button */}
          <div style={styles.ctaBox}>
            <button
              className="shimmer-btn"
              style={{
                ...styles.playNowBtn,
                background: game.gradient,
              }}
              onClick={handlePlayNow}
            >
              <Play size={22} fill="#fff" />
              <span>PLAY NOW</span>
            </button>

            <div style={styles.entryCostRow}>
              <span>Entry Fee:</span>
              <img src="/assets/token.png" alt="Token" style={{ width: 18, height: 18 }} />
              <strong>20 Tokens</strong>
            </div>
          </div>

          {/* Secondary Actions */}
          <div style={styles.secondaryActions}>
            <button style={styles.guideBtn} onClick={() => setShowGuide(true)}>
              <HelpCircle size={18} color="#38bdf8" />
              <span>How to Play</span>
            </button>

            <button style={styles.redeemNavBtn} onClick={onNavigateRedeem}>
              <Coins size={18} color="#f59e0b" />
              <span>Redemption Center</span>
            </button>
          </div>
        </div>
      </div>

      {/* Game Guide Modal */}
      {showGuide && (
        <GameGuideModal
          game={game}
          onStartPlay={handleStartGameplay}
          onClose={() => setShowGuide(false)}
        />
      )}

      {/* Insufficient Tokens Modal */}
      {showInsufficient && (
        <InsufficientTokensModal onClose={() => setShowInsufficient(false)} />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '650px',
    margin: '0 auto',
    padding: '20px 16px 90px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  lightWrapper: {
    minHeight: '100vh',
    background: '#f8fafc',
    color: '#0f172a',
  },
  lightHeader: {
    padding: '14px 20px',
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  lightBackBtn: {
    background: '#f1f5f9',
    border: 'none',
    color: '#0369a1',
    fontWeight: '800',
    padding: '8px 14px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  lightCoinChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fef3c7',
    color: '#d97706',
    fontWeight: '800',
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid #fde047',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#94a3b8',
    padding: '8px 14px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  coinBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(245, 158, 11, 0.15)',
    border: '1px solid rgba(245, 158, 11, 0.4)',
    padding: '6px 14px',
    borderRadius: '20px',
  },
  coinTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1,
  },
  coinVal: {
    color: '#fbbf24',
    fontSize: '1rem',
    fontWeight: '900',
  },
  coinLbl: {
    color: '#f59e0b',
    fontSize: '0.65rem',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  gameHeroCard: {
    background: '#1e293b',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '2px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
  },
  artworkBox: {
    width: '100%',
    height: '320px',
    position: 'relative',
    overflow: 'hidden',
  },
  artworkImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  artworkOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px 20px 16px 20px',
    background: 'linear-gradient(to top, #1e293b 0%, rgba(30, 41, 59, 0.4) 70%, transparent 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
  },
  categoryBadge: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: '#ffffff',
    padding: '3px 10px',
    borderRadius: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.6rem',
    fontWeight: '900',
    lineHeight: 1.1,
  },
  detailsBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  description: {
    color: '#cbd5e1',
    fontSize: '0.95rem',
    lineHeight: 1.5,
  },
  rewardInfoBox: {
    background: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '14px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  rewardLabel: {
    color: '#94a3b8',
    fontSize: '0.85rem',
  },
  rewardVal: {
    color: '#fbbf24',
    fontWeight: '800',
    fontSize: '0.95rem',
  },
  ctaBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  playNowBtn: {
    width: '100%',
    border: 'none',
    color: '#ffffff',
    fontWeight: '900',
    fontSize: '1.15rem',
    padding: '16px',
    borderRadius: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 8px 25px rgba(56, 189, 248, 0.4)',
    letterSpacing: '0.5px',
  },
  entryCostRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#94a3b8',
    fontSize: '0.85rem',
  },
  secondaryActions: {
    display: 'flex',
    gap: '12px',
  },
  guideBtn: {
    flex: 1,
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(56, 189, 248, 0.3)',
    color: '#f8fafc',
    padding: '12px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  redeemNavBtn: {
    flex: 1,
    background: 'rgba(30, 41, 59, 0.8)',
    border: '1px solid rgba(245, 158, 11, 0.3)',
    color: '#f8fafc',
    padding: '12px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '0.85rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  }
};
