import React from 'react';
import { HelpCircle, Clock, CheckCircle2, Gamepad2, Info } from 'lucide-react';

export const GameGuideModal = ({ game, onStartPlay, onClose }) => {
  if (!game) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <HelpCircle size={20} color="#38bdf8" />
          </div>
          <h2 style={styles.title}>HOW TO PLAY</h2>
        </div>

        {/* Game Illustration Card */}
        <div style={styles.imageBox}>
          <img
            src={game.artwork}
            alt={game.title}
            style={styles.image}
            onError={(e) => {
              if (game.fallbackArtwork) e.target.src = game.fallbackArtwork;
            }}
          />
          <div style={styles.gameBadge}>
            <span style={styles.badgeDot} />
            {game.title}
          </div>
        </div>

        {/* Objective */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <Info size={14} color="#38bdf8" />
            <h3 style={styles.sectionTitle}>Objective</h3>
          </div>
          <div style={styles.objectiveCard}>
            <p style={styles.objectiveText}>{game.guide.objective}</p>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <Gamepad2 size={14} color="#38bdf8" />
            <h3 style={styles.sectionTitle}>Controls</h3>
          </div>
          <div style={styles.controlsList}>
            {game.guide.controls.map((ctrl, idx) => (
              <div key={idx} style={styles.controlCard}>
                <div style={styles.ctrlKeyPill}>
                  <span>{ctrl.key}</span>
                </div>
                <div style={styles.ctrlDescText}>{ctrl.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Limit & Theme Info */}
        <div style={styles.infoRow}>
          <div style={styles.infoChip}>
            <Clock size={15} color="#f59e0b" />
            <span><b>{game.guide.timeLimit || 15}s</b> Limit</span>
          </div>
          <div style={styles.infoChip}>
            <Gamepad2 size={15} color="#10b981" />
            <span>Interactive Game</span>
          </div>
        </div>

        {/* Got It Button */}
        <button style={styles.gotItBtn} onClick={onStartPlay}>
          <CheckCircle2 size={18} />
          <span>GOT IT</span>
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
    background: 'rgba(15, 23, 42, 0.82)',
    backdropFilter: 'blur(8px)',
    zIndex: 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
  },
  modalCard: {
    width: '100%',
    maxWidth: '410px',
    background: 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    borderRadius: '24px',
    padding: '22px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  iconCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(56, 189, 248, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(56, 189, 248, 0.3)',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '800',
    letterSpacing: '1px',
    margin: 0,
  },
  imageBox: {
    width: '100%',
    height: '145px',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gameBadge: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(6px)',
    color: '#38bdf8',
    fontSize: '0.78rem',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: '8px',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#38bdf8',
    boxShadow: '0 0 6px #38bdf8',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  sectionTitle: {
    fontSize: '0.78rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: '0.6px',
    margin: 0,
  },
  objectiveCard: {
    background: 'rgba(15, 23, 42, 0.6)',
    borderLeft: '3px solid #38bdf8',
    borderRadius: '8px',
    padding: '10px 12px',
  },
  objectiveText: {
    fontSize: '0.85rem',
    color: '#e2e8f0',
    lineHeight: 1.45,
    margin: 0,
  },
  controlsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  controlCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
    background: 'rgba(15, 23, 42, 0.65)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '10px 12px',
    borderRadius: '12px',
  },
  ctrlKeyPill: {
    fontWeight: '800',
    fontSize: '0.78rem',
    color: '#38bdf8',
    background: 'rgba(56, 189, 248, 0.14)',
    border: '1px solid rgba(56, 189, 248, 0.25)',
    padding: '3px 10px',
    borderRadius: '6px',
    letterSpacing: '0.2px',
  },
  ctrlDescText: {
    fontSize: '0.83rem',
    color: '#cbd5e1',
    fontWeight: '500',
    lineHeight: 1.35,
  },
  infoRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.8rem',
    color: '#f8fafc',
    background: 'rgba(30, 41, 59, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '8px 12px',
    borderRadius: '12px',
    flex: 1,
    justifyContent: 'center',
  },
  gotItBtn: {
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
    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
    marginTop: '4px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  }
};
