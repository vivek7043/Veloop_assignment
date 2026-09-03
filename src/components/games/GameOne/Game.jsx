import React, { useState, useEffect, useRef } from 'react';
import styles from './Game.module.css';
import { Trophy, Clock, Heart, Wind, Target, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { ReviveModal } from '../../ReviveModal';
import { GameCoinRewardAnimation } from '../../GameCoinRewardAnimation';
import confetti from 'canvas-confetti';

export const ArcheryGame = ({ onFinish }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(0);
  const [wind, setWind] = useState(0); // Wind speed (-5 to +5)
  const [gameOver, setGameOver] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // Bow & Arrow interactive state
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0); // 0 to 100
  const [aimAngle, setAimAngle] = useState(0); // -45 deg to +45 deg
  const [isArrowFlying, setIsArrowFlying] = useState(false);
  const [arrowPos, setArrowPos] = useState({ x: 120, y: 220, angle: 0 });
  const [stuckArrows, setStuckArrows] = useState([]); // [{x, y, scoreText, color}]
  const [hitFeedback, setHitFeedback] = useState(null); // { text, color, x, y, key }

  // Moving target state
  const [targetY, setTargetY] = useState(220); // Center Y pos
  const [targetDirection, setTargetDirection] = useState(1); // 1 down, -1 up

  const playgroundRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Generate random wind between -4.5 and +4.5
  const generateWind = () => {
    const w = (Math.random() * 8 - 4).toFixed(1);
    setWind(parseFloat(w));
  };

  // Initial wind setup
  useEffect(() => {
    generateWind();
  }, []);

  // Game Countdown Timer
  useEffect(() => {
    if (gameOver || showReward) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, showReward]);

  // Target movement loop
  useEffect(() => {
    if (gameOver || showReward) return;

    const moveInterval = setInterval(() => {
      setTargetY((prevY) => {
        let nextY = prevY + targetDirection * 1.8;
        if (nextY > 340) {
          setTargetDirection(-1);
          nextY = 340;
        } else if (nextY < 100) {
          setTargetDirection(1);
          nextY = 100;
        }
        return nextY;
      });
    }, 30);

    return () => clearInterval(moveInterval);
  }, [targetDirection, gameOver, showReward]);

  // Handle Drag / Aiming interaction
  const handlePointerDown = (e) => {
    if (isArrowFlying || gameOver || showReward) return;
    setIsPulling(true);
    updateAimFromPointer(e);
  };

  const handlePointerMove = (e) => {
    if (!isPulling || isArrowFlying || gameOver || showReward) return;
    updateAimFromPointer(e);
  };

  const handlePointerUp = () => {
    if (!isPulling || isArrowFlying || gameOver || showReward) return;
    setIsPulling(false);
    shootArrow();
  };

  const updateAimFromPointer = (e) => {
    if (!playgroundRef.current) return;
    const rect = playgroundRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + 120);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + 220);

    // Bow pivot point
    const bowX = rect.left + 100;
    const bowY = rect.top + 220;

    const dx = clientX - bowX;
    const dy = clientY - bowY;

    // Angle calculation
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = Math.max(-45, Math.min(45, angle)); // Clamp between -45 and 45 degrees
    setAimAngle(angle);

    // Pull distance calculation (drag backwards from bow)
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(20, Math.min(100, dist * 0.6));
    setPullDistance(pull);
  };

  // Launch Arrow simulation
  const shootArrow = () => {
    setIsArrowFlying(true);
    let startX = 100;
    let startY = 220;
    let currentX = startX;
    let currentY = startY;

    // Speed derived from pull distance
    const speed = (pullDistance / 100) * 22 + 8;
    const rad = (aimAngle * Math.PI) / 180;

    let vx = Math.cos(rad) * speed;
    let vy = Math.sin(rad) * speed;
    const gravity = 0.35;
    const windForce = wind * 0.12;

    const animateFlight = () => {
      currentX += vx;
      vy += gravity;
      currentY += vy + windForce;

      const currentAngle = Math.atan2(vy + windForce, vx) * (180 / Math.PI);
      setArrowPos({ x: currentX, y: currentY, angle: currentAngle });

      // Target board position (Target center is at TargetX ~ 620, TargetY dynamic)
      const targetX = 580;

      // Check hit when arrow reaches target plane
      if (currentX >= targetX) {
        checkHit(currentX, currentY, targetY);
        setIsArrowFlying(false);
        setPullDistance(0);
        generateWind(); // Change wind for next shot
        return;
      }

      // Check bounds (miss off screen)
      if (currentX > 750 || currentY > 480 || currentY < -50) {
        handleMiss(currentX, currentY);
        setIsArrowFlying(false);
        setPullDistance(0);
        generateWind();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animateFlight);
    };

    animationFrameRef.current = requestAnimationFrame(animateFlight);
  };

  // Check Arrow Hit on Target Rings
  const checkHit = (arrowX, arrowY, currentTargetY) => {
    // Target center is at (TargetX: 580, TargetY: currentTargetY)
    const targetCenterX = 580;
    const targetCenterY = currentTargetY;

    const dy = Math.abs(arrowY - targetCenterY);

    let points = 0;
    let label = '';
    let color = '#94a3b8';

    if (dy <= 12) {
      // Golden Bullseye
      points = 100;
      label = '🎯 BULLSEYE! +100';
      color = '#f59e0b';
      setCombo((c) => c + 1);

      // Trigger Confetti for Bullseye
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5, x: 0.8 }
      });
    } else if (dy <= 28) {
      // Red Ring
      points = 50;
      label = '🔴 GREAT SHOT! +50';
      color = '#ef4444';
      setCombo(0);
    } else if (dy <= 46) {
      // Blue Ring
      points = 30;
      label = '🔵 GOOD HIT! +30';
      color = '#0284c7';
      setCombo(0);
    } else if (dy <= 65) {
      // Black Ring
      points = 10;
      label = '⬛ HIT! +10';
      color = '#334155';
      setCombo(0);
    } else if (dy <= 80) {
      // Outer White Ring
      points = 5;
      label = '⚪ TOUCH! +5';
      color = '#64748b';
      setCombo(0);
    } else {
      // Missed board
      handleMiss(arrowX, arrowY);
      return;
    }

    // Apply combo bonus if combo >= 2
    const finalPoints = combo >= 2 ? points * 2 : points;
    if (combo >= 2) {
      label += ` (2x COMBO!)`;
    }

    setScore((s) => s + finalPoints);

    // Arrow disappears directly on hit without lingering on target
    setStuckArrows([]);

    // Show floating score feedback animation
    showFeedback(label, color, targetCenterX, arrowY);
  };

  const handleMiss = (x, y) => {
    setCombo(0);
    showFeedback('❌ MISSED!', '#ef4444', Math.min(x, 620), y);
    setLives((l) => {
      const nextLives = l - 1;
      if (nextLives <= 0) {
        triggerGameOver();
      }
      return Math.max(0, nextLives);
    });
  };

  const showFeedback = (text, color, x, y) => {
    setHitFeedback({ text, color, x, y, key: Date.now() });
    setTimeout(() => {
      setHitFeedback(null);
    }, 1200);
  };

  const triggerGameOver = () => {
    setGameOver(true);
  };

  const handleRevive = () => {
    setLives(2);
    setTimeLeft((t) => t + 15);
    setGameOver(false);
  };

  const handleNoThanks = () => {
    const coins = Math.max(10, Math.floor(score / 20) + 10);
    setEarnedCoins(coins);
    setGameOver(false);
    setShowReward(true);
  };

  const handleRewardComplete = () => {
    if (onFinish) onFinish(earnedCoins);
  };

  return (
    <div className={styles.gameContainer}>
      {/* Light Theme Header HUD */}
      <div className={styles.hud}>
        <div className={styles.hudItem}>
          <Trophy size={18} color="#0284c7" />
          <span className={styles.scoreText}>SCORE: {score}</span>
          {combo >= 2 && <span className={styles.comboBadge}>⚡ {combo}x COMBO</span>}
        </div>

        {/* Wind Speed & Direction Indicator */}
        <div className={styles.windGauge}>
          <Wind size={16} color="#0284c7" />
          <span>WIND: {wind > 0 ? `+${wind} ➔` : `${wind} ⬅`}</span>
        </div>

        <div className={styles.hudItem}>
          <Clock size={18} color="#d97706" />
          <span>{timeLeft}s</span>
        </div>

        <div className={styles.lives}>
          {[1, 2, 3].map((i) => (
            <Heart
              key={i}
              size={18}
              fill={i <= lives ? '#ef4444' : 'none'}
              color={i <= lives ? '#ef4444' : '#cbd5e1'}
            />
          ))}
        </div>
      </div>

      {/* Main Archery Canvas / Playground */}
      <div
        ref={playgroundRef}
        className={styles.playground}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Sky & Field Decorative Elements */}
        <div className={styles.fieldBG}>
          <div className={styles.sun} />
          <div className={styles.grassLine} />
        </div>

        {/* Instruction Banner overlay when idle */}
        {!isPulling && !isArrowFlying && (
          <div className={styles.aimInstruction}>
            <Target size={18} color="#0284c7" />
            <span>DRAG SCREEN & RELEASE TO SHOOT ARROW</span>
          </div>
        )}

        {/* Bow Shooter (Left side) */}
        <div
          className={styles.bowContainer}
          style={{
            transform: `translateY(-50%) rotate(${aimAngle}deg)`,
            transformOrigin: 'left center'
          }}
        >
          {/* Bow Arc */}
          <div className={styles.bowWood} />

          {/* Bow string flexed based on pull distance */}
          <svg className={styles.bowSVG} width="80" height="120" viewBox="0 0 80 120">
            <path
              d={`M 10 10 Q ${10 - pullDistance * 0.4} 60 10 110`}
              fill="none"
              stroke="#f8fafc"
              strokeWidth="2.5"
            />
          </svg>

          {/* Ready Arrow lying on bow */}
          {!isArrowFlying && (
            <div
              className={styles.readyArrow}
              style={{
                transform: `translateX(${-pullDistance * 0.3}px)`
              }}
            >
              🏹
            </div>
          )}
        </div>

        {/* Aim Trajectory Preview Dots when pulling string */}
        {isPulling && (
          <div className={styles.trajectoryBox}>
            {[1, 2, 3, 4, 5, 6, 7].map((step) => {
              const speed = (pullDistance / 100) * 22 + 8;
              const rad = (aimAngle * Math.PI) / 180;
              const vx = Math.cos(rad) * speed;
              const vy = Math.sin(rad) * speed;
              const t = step * 2.2;
              const dotX = 100 + vx * t;
              const dotY = 220 + vy * t + 0.35 * t * t + wind * 0.12 * t;

              return (
                <div
                  key={step}
                  className={styles.trajDot}
                  style={{
                    left: `${dotX}px`,
                    top: `${dotY}px`,
                    opacity: 1 - step * 0.12
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Flying Arrow in Motion */}
        {isArrowFlying && (
          <div
            className={styles.flyingArrow}
            style={{
              left: `${arrowPos.x}px`,
              top: `${arrowPos.y}px`,
              transform: `translate(-50%, -50%) rotate(${arrowPos.angle}deg)`
            }}
          >
            🏹
          </div>
        )}

        {/* Moving Target Board (Right side) */}
        <div
          className={styles.targetBoard}
          style={{
            top: `${targetY}px`
          }}
        >
          {/* Target Stand */}
          <div className={styles.targetStand} />

          {/* Wooden Target Board with concentric rings */}
          <div className={styles.targetDisc}>
            <div className={styles.ringWhite}>
              <div className={styles.ringBlack}>
                <div className={styles.ringBlue}>
                  <div className={styles.ringRed}>
                    <div className={styles.ringGold} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stuck arrows from previous hits */}
          {stuckArrows.map((sa) => (
            <div
              key={sa.id}
              className={styles.stuckArrow}
              style={{
                top: `${sa.y - targetY + 80}px`,
                left: `${sa.x - 580 + 40}px`
              }}
            >
              🏹
            </div>
          ))}
        </div>

        {/* Floating Hit Feedback Popup */}
        {hitFeedback && (
          <div
            key={hitFeedback.key}
            className={styles.hitPopup}
            style={{
              left: `${hitFeedback.x}px`,
              top: `${hitFeedback.y}px`,
              color: hitFeedback.color
            }}
          >
            {hitFeedback.text}
          </div>
        )}
      </div>

      {/* Touch & Quick Shoot Button Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.aimControls}>
          <button
            className={styles.aimBtn}
            onClick={() => setAimAngle((a) => Math.max(-45, a - 5))}
          >
            ⬆️ Aim Up
          </button>
          <button
            className={styles.aimBtn}
            onClick={() => setAimAngle((a) => Math.min(45, a + 5))}
          >
            ⬇️ Aim Down
          </button>
        </div>

        <button
          className={styles.shootBtn}
          onClick={() => {
            if (!isArrowFlying && !gameOver && !showReward) {
              setPullDistance(75);
              shootArrow();
            }
          }}
        >
          <Zap size={20} /> SHOOT ARROW
        </button>
      </div>

      {/* Revive Modal */}
      {gameOver && (
        <ReviveModal
          score={score}
          potentialCoins={Math.max(10, Math.floor(score / 20) + 10)}
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
