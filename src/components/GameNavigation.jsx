import React from 'react';
import { Home, Gift } from 'lucide-react';

export const GameNavigation = ({ activeTab, onNavigate }) => {
  return (
    <nav style={styles.navBar}>
      <button
        style={{
          ...styles.navBtn,
          color: activeTab === 'home' || activeTab === 'hub' ? '#38bdf8' : '#94a3b8',
        }}
        onClick={() => onNavigate('hub')}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <div style={styles.divider} />

      <button
        style={{
          ...styles.navBtn,
          color: activeTab === 'redeem' ? '#f59e0b' : '#94a3b8',
        }}
        onClick={() => onNavigate('redeem')}
      >
        <Gift size={20} />
        <span>Redeem</span>
      </button>
    </nav>
  );
};

const styles = {
  navBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'rgba(15, 23, 42, 0.92)',
    backdropFilter: 'blur(16px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1000,
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 -5px 25px rgba(0, 0, 0, 0.5)',
  },
  navBtn: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.75rem',
    fontWeight: '700',
    cursor: 'pointer',
    flex: 1,
    padding: '8px 0',
    transition: 'color 0.2s ease, transform 0.2s ease',
  },
  divider: {
    width: '1px',
    height: '24px',
    background: 'rgba(255, 255, 255, 0.1)',
  }
};
