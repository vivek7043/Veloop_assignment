import React, { useState, useEffect } from 'react';
import styles from './Game.module.css';
import { Trophy, Clock, Lightbulb, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { ReviveModal } from '../../ReviveModal';
import { GameCoinRewardAnimation } from '../../GameCoinRewardAnimation';
import confetti from 'canvas-confetti';

const FILLER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Rich pool of 32 gaming, reward, tech & fun words
const WORD_POOL = [
  'VELOOP', 'REWARD', 'COIN', 'TOKEN', 'GAME', 'SPIN',
  'SUPER', 'WINNER', 'GOLD', 'BONUS', 'PRIZE', 'CHAMP',
  'CRYSTAL', 'DIAMOND', 'BURST', 'RUSH', 'LEVEL', 'SPEED',
  'FLASH', 'QUEST', 'POWER', 'SCORE', 'STRIKE', 'SHINE',
  'GLOW', 'MAGIC', 'BOOST', 'CROWN', 'MATCH', 'HERO'
];

// 8 Multi-directional placement vectors
const DIRECTIONS = [
  [0, 1],   // Horizontal right
  [0, -1],  // Horizontal left
  [1, 0],   // Vertical down
  [-1, 0],  // Vertical up
  [1, 1],   // Diagonal down-right
  [1, -1],  // Diagonal down-left
  [-1, 1],  // Diagonal up-right
  [-1, -1]  // Diagonal up-left
];

// Helper to generate a completely randomized 8x8 Word Search Puzzle every time
const generateRandomPuzzle = () => {
  const grid = Array(8).fill(null).map(() => Array(8).fill(''));
  const selectedWords = [];
  const placements = [];

  // Shuffle word pool
  const shuffledPool = [...WORD_POOL].sort(() => 0.5 - Math.random());

  for (const word of shuffledPool) {
    if (selectedWords.length >= 6) break;

    const shuffledDirs = [...DIRECTIONS].sort(() => 0.5 - Math.random());

    for (let attempt = 0; attempt < 60; attempt++) {
      const startR = Math.floor(Math.random() * 8);
      const startC = Math.floor(Math.random() * 8);
      const [deltaR, deltaC] = shuffledDirs[attempt % shuffledDirs.length];

      const endR = startR + (word.length - 1) * deltaR;
      const endC = startC + (word.length - 1) * deltaC;

      // Bounds check
      if (endR < 0 || endR >= 8 || endC < 0 || endC >= 8) continue;

      // Letter collision check
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const r = startR + i * deltaR;
        const c = startC + i * deltaC;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        // Place letters
        for (let i = 0; i < word.length; i++) {
          const r = startR + i * deltaR;
          const c = startC + i * deltaC;
          grid[r][c] = word[i];
        }
        selectedWords.push(word);
        placements.push({ word, startR, startC, deltaR, deltaC });
        break;
      }
    }
  }

  // Fill empty spots with distractor letters
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (!grid[r][c]) {
        grid[r][c] = FILLER_LETTERS[Math.floor(Math.random() * FILLER_LETTERS.length)];
      }
    }
  }

  return { words: selectedWords, placements, grid };
};

export const GemBurstGame = ({ onFinish }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [puzzleData, setPuzzleData] = useState(() => generateRandomPuzzle());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedPath, setSelectedPath] = useState([]); // [{r, c, letter}]
  const [solvedTiles, setSolvedTiles] = useState([]); // [{r, c, color}]
  const [isSelecting, setIsSelecting] = useState(false);
  const [hintInfo, setHintInfo] = useState(null);

  const [gameOver, setGameOver] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const { words: targetWords, placements, grid } = puzzleData;

  // Initialize or update grid on level change
  useEffect(() => {
    const newPuzzle = generateRandomPuzzle();
    setPuzzleData(newPuzzle);
    setFoundWords([]);
    setSolvedTiles([]);
    setHintInfo(null);
  }, [levelIndex]);

  // Countdown Timer
  useEffect(() => {
    if (gameOver || showReward) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, showReward]);

  // Currently assembled word
  const currentWord = selectedPath.map((item) => item.letter).join('');
  const reverseWord = currentWord.split('').reverse().join('');

  // Handle pointer down on a tile
  const handleTileDown = (r, c, letter) => {
    if (gameOver || showReward) return;
    setIsSelecting(true);
    setSelectedPath([{ r, c, letter }]);
  };

  // Handle pointer move / enter on adjacent tile
  const handleTileEnter = (r, c, letter) => {
    if (!isSelecting || gameOver || showReward) return;

    const lastIndex = selectedPath.findIndex((p) => p.r === r && p.c === c);
    if (lastIndex !== -1) {
      if (lastIndex === selectedPath.length - 2) {
        // Backtrack
        setSelectedPath((prev) => prev.slice(0, prev.length - 1));
      }
      return;
    }

    // Ensure straight line movement (Horizontal, Vertical, or Diagonal)
    if (selectedPath.length > 0) {
      const first = selectedPath[0];
      const dr = r - first.r;
      const dc = c - first.c;

      // Calculate direction slope
      const absDR = Math.abs(dr);
      const absDC = Math.abs(dc);

      // Must align horizontally (DR==0), vertically (DC==0), or diagonally (absDR == absDC)
      if (absDR === 0 || absDC === 0 || absDR === absDC) {
        // Check contiguous sequence
        const stepR = dr === 0 ? 0 : dr / absDR;
        const stepC = dc === 0 ? 0 : dc / absDC;

        const newPath = [];
        let currR = first.r;
        let currC = first.c;

        while (true) {
          newPath.push({
            r: currR,
            c: currC,
            letter: grid[currR][currC]
          });

          if (currR === r && currC === c) break;
          currR += stepR;
          currC += stepC;
        }
        setSelectedPath(newPath);
      }
    }
  };

  // Handle pointer release
  const handlePointerUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);

    if (currentWord) {
      checkSpellingMatch(currentWord, reverseWord, selectedPath);
    }
    setSelectedPath([]);
  };

  // Check matched spelling
  const checkSpellingMatch = (word, revWord, path) => {
    const matchedWord = targetWords.find(
      (w) => (w === word || w === revWord) && !foundWords.includes(w)
    );

    if (matchedWord) {
      const colors = ['#10b981', '#f59e0b', '#0284c7', '#8b5cf6', '#ec4899', '#14b8a6'];
      const assignColor = colors[foundWords.length % colors.length];

      const newFound = [...foundWords, matchedWord];
      setFoundWords(newFound);
      setScore((s) => s + 200 + matchedWord.length * 15);

      // Mark solved tiles with permanent color
      const coloredTiles = path.map((p) => ({ ...p, color: assignColor }));
      setSolvedTiles((prev) => [...prev, ...coloredTiles]);

      // Confetti burst
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });

      setHintInfo(null);

      // Level Complete check
      if (newFound.length === targetWords.length) {
        setScore((s) => s + 400); // Level bonus
        setTimeout(() => {
          setLevelIndex((l) => l + 1);
        }, 1200);
      }
    }
  };

  // Hint button: Highlights first letter of missing target word
  const handleUseHint = () => {
    const unfound = targetWords.filter((w) => !foundWords.includes(w));
    if (unfound.length === 0) return;
    const targetWord = unfound[0];

    const placement = placements.find((p) => p.word === targetWord);
    if (placement) {
      setHintInfo({ r: placement.startR, c: placement.startC, word: targetWord });
      setTimeout(() => setHintInfo(null), 3000);
    }
  };

  const handleRevive = () => {
    setTimeLeft(20);
    setGameOver(false);
  };

  const handleNoThanks = () => {
    const coins = Math.max(15, Math.floor(score / 30) + 10);
    setEarnedCoins(coins);
    setGameOver(false);
    setShowReward(true);
  };

  const handleRewardComplete = () => {
    if (onFinish) onFinish(earnedCoins);
  };

  // Handle touch / pointer drag across the letter grid on mobile devices
  const handleContainerPointerMove = (e) => {
    if (!isSelecting || gameOver || showReward) return;

    const clientX = e.clientX !== undefined && e.clientX !== 0
      ? e.clientX
      : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY !== undefined && e.clientY !== 0
      ? e.clientY
      : (e.touches && e.touches[0] ? e.touches[0].clientY : null);

    if (clientX === null || clientY === null) return;

    const element = document.elementFromPoint(clientX, clientY);
    if (!element) return;

    const tileEl = element.closest('[data-r]');
    if (tileEl) {
      const r = parseInt(tileEl.getAttribute('data-r'), 10);
      const c = parseInt(tileEl.getAttribute('data-c'), 10);
      if (!isNaN(r) && !isNaN(c) && grid[r] && grid[r][c]) {
        handleTileEnter(r, c, grid[r][c]);
      }
    }
  };

  return (
    <div
      className={styles.gameContainer}
      onPointerUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Light Theme HUD */}
      <div className={styles.hud}>
        <div className={styles.hudItem}>
          <Trophy size={18} color="#d97706" />
          <span className={styles.scoreText}>SCORE: {score}</span>
        </div>

        <div className={styles.hudItem}>
          <Clock size={18} color="#f59e0b" />
          <span>{timeLeft}s</span>
        </div>

        <button className={styles.hintBtn} onClick={handleUseHint}>
          <Lightbulb size={16} color="#f59e0b" />
          <span>Hint</span>
        </button>
      </div>

      {/* Live Spelled Word Banner */}
      <div className={styles.currentWordBanner}>
        <Search size={18} style={{ marginRight: 6 }} />
        <span>{currentWord ? currentWord : 'Search & drag across hidden spellings'}</span>
      </div>

      {/* 8x8 Letter Grid Box */}
      <div
        className={styles.letterGridBox}
        onPointerMove={handleContainerPointerMove}
        onTouchMove={handleContainerPointerMove}
      >
        {grid.map((row, r) => (
          <div key={r} className={styles.gridRow}>
            {row.map((letter, c) => {
              const isSelected = selectedPath.some((p) => p.r === r && p.c === c);
              const solvedTile = solvedTiles.find((p) => p.r === r && p.c === c);
              const isHinted = hintInfo && hintInfo.r === r && hintInfo.c === c;

              return (
                <div
                  key={`${r}-${c}`}
                  data-r={r}
                  data-c={c}
                  className={`${styles.letterTile} ${
                    isSelected
                      ? styles.selectedTile
                      : solvedTile
                      ? styles.solvedTile
                      : isHinted
                      ? styles.hintedTile
                      : ''
                  }`}
                  style={solvedTile ? { background: solvedTile.color, color: '#ffffff' } : {}}
                  onPointerDown={() => handleTileDown(r, c, letter)}
                  onTouchStart={() => handleTileDown(r, c, letter)}
                  onPointerEnter={() => handleTileEnter(r, c, letter)}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Target Spellings List */}
      <div className={styles.targetSection}>
        <div className={styles.targetTitleRow}>
          <Sparkles size={16} color="#f59e0b" />
          <span>Hidden Spellings to Search ({foundWords.length}/{targetWords.length}):</span>
        </div>

        <div className={styles.wordChipsList}>
          {targetWords.map((word) => {
            const isFound = foundWords.includes(word);
            return (
              <div
                key={word}
                className={`${styles.wordChip} ${isFound ? styles.foundChip : ''}`}
              >
                {isFound ? (
                  <>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span className={styles.foundText}>{word}</span>
                  </>
                ) : (
                  <span className={styles.unfoundText}>{word}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Revive Modal */}
      {gameOver && (
        <ReviveModal
          score={score}
          potentialCoins={Math.max(15, Math.floor(score / 30) + 10)}
          onRevive={handleRevive}
          onNoThanks={handleNoThanks}
        />
      )}

      {/* Game Coin Reward Animation */}
      {showReward && (
        <GameCoinRewardAnimation
          earnedCoins={earnedCoins}
          onComplete={handleRewardComplete}
        />
      )}
    </div>
  );
};
