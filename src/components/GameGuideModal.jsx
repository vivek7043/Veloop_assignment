import React from 'react';
import { HelpCircle, Clock, CheckCircle2, Gamepad2 } from 'lucide-react';

export const GameGuideModal = ({ game, onStartPlay, onClose }) => {
  if (!game) return null;

  return (
    <div style={styles.backdrop}>
      <div style={styles.modalCard}>
        {/* Header */}
        <div style={styles.header}>
          <HelpCircle size={22} color="#38bdf8" />
          <h2 style={styles.title}>HOW TO PLAY</h2>
        </div>

        {/* Game Illustration */}
        <div style={styles.imageBox}>
          <img
            src={game.artwork}
            alt={game.title}
            style={styles.image}
          />
          <div style={styles.gameBadge}>{game.title}</div>
        </div>

        {/* Objective */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Objective</h3>
          <p style={styles.objectiveText}>{game.guide.objective}</p>
        </div>

        {/* Controls */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Controls</h3>
          <div style={styles.controlsList}>
            {game.guide.controls.map((ctrl, idx) => (
              <div key={idx} style={styles.controlRow}>
                <span style={styles.ctrlKey}>{ctrl.key}</span>
                <span style={styles.ctrlDesc}>{ctrl.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time Limit & Tips */}
        <div style={styles.infoRow}>
          <div style={styles.infoChip}>
            <Clock size={16} color="#f59e0b" />
            <span>{game.guide.timeLimit} Seconds</span>
          </div>
          <div style={styles.infoChip}>
            <Gamepad2 size={16} color="#10b981" />
            <span>Light Theme Game</span>
          </div>
        </div>

        {/* Got It Button */}
        <button style={styles.gotItBtn} onClick={onStartPlay}>
          <CheckCircle2 size={20} />
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
    background: 'rgba(15, 23, 42, 0.85)',
    backdropFilter: 'blur(10px)',
    zIndex: 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modalCard: {
    width: '100%',
    maxWidth: '420px',
    background: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '1px',
  },
  imageBox: {
    width: '100%',
    height: '160px',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
    backdropFilter: 'blur(4px)',
    color: '#38bdf8',
    fontSize: '0.75rem',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: '8px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionTitle: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  objectiveText: {
    fontSize: '0.9rem',
    color: '#f8fafc',
    lineHeight: 1.4,
  },
  controlsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  controlRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(15, 23, 42, 0.6)',
    padding: '8px 12px',
    borderRadius: '10px',
    fontSize: '0.82rem',
  },
  ctrlKey: {
    fontWeight: '700',
    color: '#38bdf8',
    background: 'rgba(56, 189, 248, 0.15)',
    padding: '3px 8px',
    borderRadius: '6px',
  },
  ctrlDesc: {
    color: '#cbd5e1',
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
    background: 'rgba(30, 41, 59, 0.7)',
    padding: '6px 12px',
    borderRadius: '10px',
    flex: 1,
    justifyContent: 'center',
  },
  gotItBtn: {
    background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
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
    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)',
    marginTop: '6px',
  }
};
