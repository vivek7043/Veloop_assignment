import React from 'react';
import { ArrowRight, Play, Lock, Clock } from 'lucide-react';

export const GameCard = ({ game, onPlayClick, onCardClick }) => {
  const handleClick = () => {
    if (game.isPlayable && onCardClick) {
      onCardClick(game);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        opacity: game.isPlayable ? 1 : 0.9,
      }}
      onClick={handleClick}
      className={game.isPlayable ? "game-card-hover" : ""}
    >
      {/* Top Right Status Badge */}
      {game.isPlayable ? (
        <div style={styles.playableBadge}>
          <Play size={10} fill="#fff" color="#fff" /> PLAYABLE
        </div>
      ) : (
        <div style={styles.comingSoonBadge}>
          <Clock size={10} color="#fff" /> COMING SOON
        </div>
      )}

      {/* Top Artwork Area */}
      <div style={styles.imageContainer}>
        <picture>
          <source srcSet={game.artwork} type="image/avif" />
          <source srcSet={game.fallbackArtwork} type="image/webp" />
          <img
            src={game.artwork}
            alt={game.title}
            style={styles.image}
            loading="lazy"
          />
        </picture>
        <div style={styles.imageOverlay}>
          <span style={{ ...styles.categoryTag, background: game.gradient }}>
            {game.category}
          </span>
          <h3 style={styles.gameTitle}>{game.title}</h3>
        </div>
      </div>

      {/* Bottom Coded Section */}
      <div style={styles.codedSection}>
        {/* Token Requirement */}
        <div style={styles.tokenBox}>
          <img
            src="/assets/token.png"
            alt="Token Icon"
            style={{ width: 20, height: 20, objectFit: 'contain' }}
          />
          <span style={styles.tokenText}>{game.entryCost} Tokens</span>
        </div>

        {/* Play Now or Coming Soon Button */}
        <button
          className={game.isPlayable ? "shimmer-btn" : ""}
          style={{
            ...styles.playBtn,
            background: game.isPlayable
              ? 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)'
              : 'rgba(30, 41, 59, 0.9)',
            color: game.isPlayable ? '#ffffff' : '#94a3b8',
            border: game.isPlayable ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
            cursor: game.isPlayable ? 'pointer' : 'not-allowed',
            boxShadow: game.isPlayable ? '0 4px 12px rgba(56, 189, 248, 0.25)' : 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (game.isPlayable && onPlayClick) {
              onPlayClick(game);
            }
          }}
          disabled={!game.isPlayable}
        >
          {game.isPlayable ? (
            <>
              <span>Play Now</span>
              <ArrowRight size={15} style={{ marginLeft: 4 }} />
            </>
          ) : (
            <>
              <Lock size={13} style={{ marginRight: 4 }} />
              <span>Coming Soon</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '280px',
    minWidth: '280px',
    height: '390px',
    background: '#1e293b',
    borderRadius: '18px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
    userSelect: 'none',
  },
  playableBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
    fontSize: '0.65rem',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '12px',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
    color: '#fff',
    fontSize: '0.65rem',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '12px',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  imageContainer: {
    width: '100%',
    height: '305px',
    position: 'relative',
    overflow: 'hidden',
    background: '#090d16',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    transition: 'transform 0.5s ease',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '16px 14px 10px 14px',
    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
  },
  categoryTag: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: '#ffffff',
    padding: '2px 8px',
    borderRadius: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  gameTitle: {
    color: '#ffffff',
    fontSize: '1.05rem',
    fontWeight: '800',
    lineHeight: 1.2,
    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
  },
  codedSection: {
    height: '85px',
    background: '#0f172a',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
  },
  tokenBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(30, 41, 59, 0.8)',
    padding: '6px 10px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  tokenText: {
    color: '#f8fafc',
    fontSize: '0.82rem',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  playBtn: {
    fontWeight: '700',
    fontSize: '0.85rem',
    padding: '9px 14px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
};
