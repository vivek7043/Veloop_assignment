import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Target, Clock, Trophy } from 'lucide-react';
import styles from './Game.module.css';
import { ReviveModal } from '../../ReviveModal';
import { GameCoinRewardAnimation } from '../../GameCoinRewardAnimation';
import confetti from 'canvas-confetti';

const BASE = 360;           // Internal square coordinate space.
const LOG_R = 74;           // Log radius.
const BLADE_L = 92;         // Blade length.
const HIT_ARC = 0.30;       // Radians: how close two blades may sit.
const TOTAL_BLADES = 5;     // Exactly 5 blades to land!
const TIMER_LIMIT = 15.0;   // 15-second countdown timer!

export function BladeMasterCanvas({ paused, onGameOver, onReady, onScore }) {
  const canvasRef = useRef(null);
  const worldRef = useRef(null);
  const pausedRef = useRef(paused);
  const overCb = useRef(onGameOver);
  const scoreCb = useRef(onScore);

  const [hud, setHud] = useState({ score: 0, left: TOTAL_BLADES, timeLeft: TIMER_LIMIT, won: false });

  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { overCb.current = onGameOver; }, [onGameOver]);
  useEffect(() => { scoreCb.current = onScore; }, [onScore]);

  const makeWorld = useCallback(() => ({
    angle: 0,
    speed: 1.6,            // Smooth rotation speed
    blades: [],            // Angles already occupied
    flying: null,          // Thrown blade in flight
    balloonAngle: Math.PI * 0.75, // Red balloon position on the OUTSIDE RIM
    balloonPopped: false,  // Balloon burst state
    score: 0,
    left: TOTAL_BLADES,     // 5 blades total
    timeLeft: TIMER_LIMIT, // 15 seconds real-time timer
    shake: 0,
    sparks: [],
    over: false,
    won: false,
    lastTs: 0,
  }), []);

  if (worldRef.current === null) worldRef.current = makeWorld();

  const sync = useCallback((w) => {
    setHud((prev) =>
      prev.score === w.score && prev.left === w.left && prev.won === w.won && Math.abs(prev.timeLeft - w.timeLeft) < 0.08
        ? prev
        : { score: w.score, left: w.left, timeLeft: Math.max(0, w.timeLeft), won: w.won },
    );
  }, []);

  // --- Imperative handle used by the parent for revive / restart ---------
  useEffect(() => {
    onReady?.({
      revive: () => {
        const w = worldRef.current;
        w.blades = [];
        w.flying = null;
        w.sparks = [];
        w.over = false;
        w.won = false;
        w.balloonPopped = false;
        w.timeLeft = 10.0; // 10 extra seconds on revive
        w.lastTs = 0;
        sync(w);
      },
      restart: () => {
        worldRef.current = makeWorld();
        setHud({ score: 0, left: TOTAL_BLADES, timeLeft: TIMER_LIMIT, won: false });
      },
    });
  }, [onReady, makeWorld, sync]);

  // --- Throwing ----------------------------------------------------------
  const throwBlade = useCallback(() => {
    const w = worldRef.current;
    if (!w || w.over || w.won || pausedRef.current || w.flying || w.left <= 0) return;
    w.flying = { y: BASE - 40 };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        throwBlade();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [throwBlade]);

  // --- Simulation + render ----------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();
    window.addEventListener('resize', resize);

    const spark = (w, x, y, color, n = 14) => {
      for (let i = 0; i < n; i += 1) {
        w.sparks.push({
          x, y, color,
          vx: (Math.random() - 0.5) * 260,
          vy: (Math.random() - 0.5) * 260,
          life: 0.5,
        });
      }
    };

    const cx = BASE / 2;
    const cy = BASE * 0.42;

    let frame = 0;
    let cancelled = false;

    const step = (ts) => {
      if (cancelled) return;
      frame = window.requestAnimationFrame(step);
      const w = worldRef.current;

      if (!w.lastTs) w.lastTs = ts;
      const dt = Math.min((ts - w.lastTs) / 1000, 0.04);
      w.lastTs = ts;

      if (!pausedRef.current && !w.over && !w.won) {
        // Real-Time 15 Second Countdown Timer
        w.timeLeft = Math.max(0, w.timeLeft - dt);
        if (w.timeLeft <= 0) {
          // Time Out! Game Over
          w.shake = 0.4;
          w.over = true;
          spark(w, cx, cy, '#ef4444', 20);
          scoreCb.current?.(w.score);
          overCb.current?.(w.score, false);
        }

        w.angle = (w.angle + w.speed * dt) % (Math.PI * 2);

        // Advance thrown blade toward log
        if (w.flying) {
          w.flying.y -= 780 * dt;
          const contact = cy + LOG_R;
          if (w.flying.y <= contact) {
            const rel = (-w.angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

            const clash = w.blades.some((b) => {
              const d = Math.abs(((b - rel + Math.PI) % (Math.PI * 2)) - Math.PI);
              return d < HIT_ARC;
            });

            w.flying = null;

            if (clash) {
              // Collision Fail!
              spark(w, cx, contact, '#ef4444', 18);
              w.shake = 0.4;
              w.over = true;
              scoreCb.current?.(w.score);
              overCb.current?.(w.score, false);
            } else {
              // Hit Success!
              w.blades.push(rel);
              w.score += 20;
              w.left -= 1;
              spark(w, cx, contact, '#f59e0b', 10);

              // Check if blade hit the balloon on the rim
              if (!w.balloonPopped) {
                const bd = Math.abs(((w.balloonAngle - rel + Math.PI) % (Math.PI * 2)) - Math.PI);
                if (bd < HIT_ARC * 1.3) {
                  w.balloonPopped = true;
                  w.score += 30;
                  spark(w, cx, contact, '#ef4444', 25);
                }
              }

              if (w.left <= 0) {
                // ALL 5 BLADES LANDED IN UNDER 15 SECONDS -> AUTOMATIC EXIT & REWARD WIN!
                w.won = true;
                w.balloonPopped = true;
                w.score += 100;
                spark(w, cx, cy, '#ef4444', 40);
                spark(w, cx, cy, '#f59e0b', 40);
                spark(w, cx, cy, '#10b981', 40);

                confetti({
                  particleCount: 90,
                  spread: 90,
                  origin: { y: 0.4 }
                });

                // Trigger automatic exit & coin reward after 1.2s victory animation
                setTimeout(() => {
                  w.over = true;
                  scoreCb.current?.(w.score);
                  overCb.current?.(w.score, true);
                }, 1200);
              }
            }
          }
        }

        for (let i = w.sparks.length - 1; i >= 0; i -= 1) {
          const p = w.sparks[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt;
          if (p.life <= 0) w.sparks.splice(i, 1);
        }

        if (w.shake > 0) w.shake = Math.max(0, w.shake - dt);

        sync(w);
      }

      // --- Draw ---
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform((rect.width * dpr) / BASE, 0, 0, (rect.height * dpr) / BASE, 0, 0);
      ctx.clearRect(0, 0, BASE, BASE);

      const bg = ctx.createLinearGradient(0, 0, 0, BASE);
      bg.addColorStop(0, '#fff3dc');
      bg.addColorStop(1, '#ffe2b4');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, BASE, BASE);

      ctx.save();
      if (w.shake > 0) {
        ctx.translate((Math.random() - 0.5) * w.shake * 20, (Math.random() - 0.5) * w.shake * 20);
      }

      // Embedded blades and Outside Balloon rotate with log
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(w.angle);

      for (const b of w.blades) {
        ctx.save();
        ctx.rotate(b);
        drawBlade(ctx, LOG_R - 14);
        ctx.restore();
      }

      // The Wooden Log
      const grad = ctx.createRadialGradient(0, 0, 8, 0, 0, LOG_R);
      grad.addColorStop(0, '#d9a15a');
      grad.addColorStop(0.6, '#b97f38');
      grad.addColorStop(1, '#8a5a1c');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, LOG_R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(90, 55, 12, .45)';
      ctx.lineWidth = 2;
      for (const r of [LOG_R * 0.34, LOG_R * 0.58, LOG_R * 0.82]) {
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // RED BALLOON ON THE OUTSIDE RIM OF THE LOG DISC 🎈
      if (!w.balloonPopped) {
        ctx.save();
        ctx.rotate(w.balloonAngle);
        ctx.translate(0, LOG_R + 16); // Positioned ON THE OUTSIDE RIM!

        // Balloon string
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.stroke();

        // Balloon knot
        ctx.fillStyle = '#b91c1c';
        ctx.beginPath();
        ctx.arc(0, 2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Main Red Balloon Body
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, -12, 14, 0, Math.PI * 2);
        ctx.fill();

        // White shine reflection highlight
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-4, -16, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();

      // Flying Blade
      if (w.flying) {
        ctx.save();
        ctx.translate(cx, w.flying.y);
        ctx.rotate(Math.PI);
        drawBlade(ctx, 0);
        ctx.restore();
      }

      // Sparks & Burst Particles
      for (const p of w.sparks) {
        ctx.globalAlpha = Math.max(0, p.life * 2.2);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 2.5, p.y - 2.5, 5, 5);
      }
      ctx.globalAlpha = 1;

      // Remaining 5 Blades Inventory at Bottom Left
      for (let i = 0; i < w.left; i += 1) {
        ctx.save();
        ctx.translate(24 + i * 22, BASE - 16);
        ctx.scale(0.44, 0.44);
        ctx.rotate(Math.PI);
        drawBlade(ctx, 0);
        ctx.restore();
      }

      ctx.restore();
      return undefined;
    };

    frame = window.requestAnimationFrame(step);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [sync]);

  return (
    <div className={styles.wrap}>
      <div className={styles.hud}>
        <span className={styles.stat}><b>{hud.score}</b> pts</span>

        {/* Real-Time 15 Second Countdown Timer */}
        <span className={`${styles.stat} ${hud.timeLeft <= 4.0 ? styles.timerWarning : ''}`}>
          <Clock size={16} color={hud.timeLeft <= 4.0 ? '#ef4444' : '#d97706'} />
          <b>{hud.timeLeft.toFixed(1)}s</b>
        </span>

        <span className={styles.stat}>
          <Target size={15} aria-hidden="true" /> {hud.left} left
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={(e) => { e.preventDefault(); throwBlade(); }}
        role="img"
        aria-label="Blade Master play area. Press Space or tap to throw a blade at the spinning log."
        tabIndex={0}
      />

      <p className={styles.hint}>
        {hud.won ? '🎈 BALLOON BURST! YOU WON!' : 'Tap board or press Space within 15s'}
      </p>
    </div>
  );
}

/** Draws one blade pointing outward from `offset`, tip toward the centre. */
function drawBlade(ctx, offset) {
  ctx.save();
  ctx.translate(0, offset);

  // Steel.
  const steel = ctx.createLinearGradient(-4, 0, 4, 0);
  steel.addColorStop(0, '#e8edf7');
  steel.addColorStop(0.5, '#ffffff');
  steel.addColorStop(1, '#9aa6bd');
  ctx.fillStyle = steel;
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.lineTo(5, 14);
  ctx.lineTo(0, 20);
  ctx.lineTo(-5, 14);
  ctx.closePath();
  ctx.fill();

  // Guard.
  ctx.fillStyle = '#c9a227';
  ctx.fillRect(-9, 20, 18, 5);

  // Handle.
  const grip = ctx.createLinearGradient(-4, 0, 4, 0);
  grip.addColorStop(0, '#8a5a1c');
  grip.addColorStop(0.5, '#b8802e');
  grip.addColorStop(1, '#6d4413');
  ctx.fillStyle = grip;
  ctx.fillRect(-4.5, 25, 9, BLADE_L - 45);

  ctx.fillStyle = '#c9a227';
  ctx.beginPath();
  ctx.arc(0, 25 + BLADE_L - 45, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Wrapper Component integrating ReviveModal and GameCoinRewardAnimation
export function ArcheryGame({ onFinish }) {
  const [gameOver, setGameOver] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const bladeMasterRef = useRef(null);

  const handleGameOver = (finalScore, isWin) => {
    setScore(finalScore);
    if (isWin) {
      // AUTOMATIC EXIT: When all 5 blades finish, directly claim reward coins & exit!
      const coins = Math.max(20, Math.floor(finalScore / 15) + 15);
      setEarnedCoins(coins);
      setShowReward(true);
    } else {
      setGameOver(true);
    }
  };

  const handleRevive = () => {
    setGameOver(false);
    bladeMasterRef.current?.revive();
  };

  const handleNoThanks = () => {
    const coins = Math.max(15, Math.floor(score / 15) + 10);
    setEarnedCoins(coins);
    setGameOver(false);
    setShowReward(true);
  };

  const handleRewardComplete = () => {
    if (onFinish) onFinish(earnedCoins);
  };

  return (
    <div className={styles.gameContainer}>
      <BladeMasterCanvas
        paused={gameOver || showReward}
        onGameOver={handleGameOver}
        onReady={(handle) => { bladeMasterRef.current = handle; }}
        onScore={(s) => setScore(s)}
      />

      {/* Revive Modal (Only shown on collision fail or time out) */}
      {gameOver && (
        <ReviveModal
          score={score}
          potentialCoins={Math.max(15, Math.floor(score / 15) + 10)}
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
}

export const KnifeHitGame = ArcheryGame;
export default ArcheryGame;
