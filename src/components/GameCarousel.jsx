import React, { useRef, useState, useEffect } from 'react';
import { GameCard } from './GameCard';

export const GameCarousel = ({ games, onPlayGame, onSelectGame }) => {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalGames = games.length;
  // Duplicate games for continuous seamless looping
  const displayGames = [...games, ...games];

  // Handle scroll position updates to highlight correct dot indicator
  const handleScroll = () => {
    if (!containerRef.current || totalGames === 0) return;
    const { scrollLeft, scrollWidth } = containerRef.current;
    const halfWidth = scrollWidth / 2;
    if (halfWidth === 0) return;
    const normalizedScroll = scrollLeft % halfWidth;
    const cardWidth = 296; // 280px card + 16px gap
    const index = Math.floor(normalizedScroll / cardWidth) % totalGames;
    setActiveIndex(index);
  };

  // Continuous smooth auto-scroll loop (60fps)
  useEffect(() => {
    if (isPaused) return;

    let lastTime = performance.now();
    const speed = 45; // pixels per second

    const animate = (now) => {
      if (!containerRef.current) return;
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const container = containerRef.current;
      const halfWidth = container.scrollWidth / 2;

      if (halfWidth > 0) {
        container.scrollLeft += speed * delta;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [isPaused]);

  const scrollToDot = (index) => {
    if (!containerRef.current) return;
    const cardWidth = 296;
    containerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div style={styles.carouselWrapper}>
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        style={styles.scrollContainer}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div style={styles.cardsTrack}>
          {displayGames.map((game, idx) => (
            <GameCard
              key={`${game.id}-${idx}`}
              game={game}
              onPlayClick={onPlayGame}
              onCardClick={onSelectGame}
            />
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div style={styles.dotsRow}>
        {games.map((game, idx) => (
          <button
            key={game.id}
            onClick={() => scrollToDot(idx)}
            style={{
              ...styles.dot,
              background: idx === activeIndex ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)',
              width: idx === activeIndex ? '22px' : '8px',
            }}
            aria-label={`Go to game ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  carouselWrapper: {
    width: '100%',
    position: 'relative',
    padding: '10px 0 20px 0',
  },
  scrollContainer: {
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* IE/Edge */
    WebkitOverflowScrolling: 'touch',
    padding: '12px 16px',
    willChange: 'scroll-position',
  },
  cardsTrack: {
    display: 'flex',
    gap: '16px',
    width: 'max-content',
  },
  dotsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '16px',
  },
  dot: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: 0,
  },
};
