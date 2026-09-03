import React, { createContext, useContext, useState, useEffect } from 'react';

const GameCoinContext = createContext();

export const GameCoinProvider = ({ children }) => {
  const [gameCoins, setGameCoins] = useState(() => {
    const saved = localStorage.getItem('velloop_game_coins');
    return saved !== null ? parseInt(saved, 10) : 20;
  });

  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('velloop_tokens');
    return saved !== null ? parseInt(saved, 10) : 100;
  });

  const [redemptionHistory, setRedemptionHistory] = useState(() => {
    const saved = localStorage.getItem('velloop_redemption_history');
    return saved ? JSON.parse(saved) : [
      { id: '1', coins: 100, reward: '10 VEs', date: 'Today', type: 've' },
      { id: '2', coins: 50, reward: '5 Gems', date: 'Yesterday', type: 'gems' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('velloop_game_coins', gameCoins.toString());
  }, [gameCoins]);

  useEffect(() => {
    localStorage.setItem('velloop_tokens', tokens.toString());
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem('velloop_redemption_history', JSON.stringify(redemptionHistory));
  }, [redemptionHistory]);

  const deductTokens = (amount = 20) => {
    if (tokens >= amount) {
      setTokens(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addTokens = (amount) => {
    setTokens(prev => prev + amount);
  };

  const earnGameCoins = (amount) => {
    setGameCoins(prev => prev + amount);
  };

  const redeemCoins = (cost, rewardText, type) => {
    if (gameCoins >= cost) {
      setGameCoins(prev => prev - cost);
      
      // If reward gives back tokens
      if (type === 'tokens') {
        const tokenAmount = parseInt(rewardText, 10) || 20;
        setTokens(prev => prev + tokenAmount);
      }

      const newEntry = {
        id: Date.now().toString(),
        coins: cost,
        reward: rewardText,
        date: 'Just now',
        type: type
      };

      setRedemptionHistory(prev => [newEntry, ...prev]);
      return true;
    }
    return false;
  };

  return (
    <GameCoinContext.Provider
      value={{
        gameCoins,
        tokens,
        redemptionHistory,
        deductTokens,
        addTokens,
        earnGameCoins,
        redeemCoins
      }}
    >
      {children}
    </GameCoinContext.Provider>
  );
};

export const useGameCoin = () => {
  const context = useContext(GameCoinContext);
  if (!context) {
    throw new Error('useGameCoin must be used within a GameCoinProvider');
  }
  return context;
};
