export const gamesData = [
  {
    id: 'game-1',
    number: 1,
    title: 'Archery Master',
    category: 'Precision Archery',
    artwork: '/assets/games/game-01.avif',
    fallbackArtwork: '/assets/games/game-01.webp',
    themeColor: '#0284c7',
    gradient: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
    entryCost: 20,
    isPlayable: true,
    description: 'Pull back your bow, account for wind speed, and hit the golden bullseye target for epic scores and rewards!',
    rewardCoins: 20,
    guide: {
      objective: 'Aim your bow, release arrows at the wooden target board, and hit the golden center bullseye!',
      controls: [
        { key: 'Drag Bow / Touch & Release', action: 'Draw bowstring and release to launch arrow' },
        { key: 'Wind Gauge', action: 'Compensate for left/right wind speed' }
      ],
      timeLimit: 30,
      tips: 'Land 3 Bullseyes in a row to activate a 2x Combo Multiplier!'
    }
  },
  {
    id: 'game-2',
    number: 2,
    title: 'Word Connect Rush',
    category: 'Word Puzzle',
    artwork: '/assets/games/game-02.avif',
    fallbackArtwork: '/assets/games/game-02.webp',
    themeColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    entryCost: 20,
    isPlayable: true,
    description: 'Connect letter tiles inside the box grid to match the target spellings at the bottom and earn Game Coins!',
    rewardCoins: 25,
    guide: {
      objective: 'Find all target words listed at the bottom by connecting adjacent letters in the letter box grid.',
      controls: [
        { key: 'Drag / Connect Letter Tiles', action: 'Select adjacent letters to form target spellings' },
        { key: 'Hint Button', action: 'Reveal starting position of a hidden target word' }
      ],
      timeLimit: 45,
      tips: 'Connect longer target words to trigger 2x bonus reward points!'
    }
  },
  {
    id: 'game-3',
    number: 3,
    title: 'Bowlexa',
    category: 'Physics Sports',
    artwork: '/assets/games/game-03.avif',
    fallbackArtwork: '/assets/games/game-03.webp',
    themeColor: '#10b981',
    gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Swing the rope, time your release, and knock down all bowling pins in a single strike!',
    rewardCoins: 15,
    guide: {
      objective: 'Aim and swing the wrecking bowling ball to knock down all pins on the wooden pier.',
      controls: [{ key: 'Drag & Release Rope', action: 'Set swing power and launch angle' }],
      timeLimit: 45,
      tips: 'Aim for the center pin to trigger explosive chain strikes!'
    }
  },
  {
    id: 'game-4',
    number: 4,
    title: 'Block Crush',
    category: 'Brick Breaker',
    artwork: '/assets/games/game-04.avif',
    fallbackArtwork: '/assets/games/game-04.webp',
    themeColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a78bfa 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Aim your bouncing launcher, break high-numbered blocks, and collect powerful boosters!',
    rewardCoins: 20,
    guide: {
      objective: 'Bounce energy balls to smash numbered color blocks down to zero.',
      controls: [{ key: 'Drag Aim Line', action: 'Direct ball trajectory' }],
      timeLimit: 35,
      tips: 'Collect multi-ball powerups to multiply your bouncing shots!'
    }
  },
  {
    id: 'game-5',
    number: 5,
    title: 'Slice Storm',
    category: 'Slash Action',
    artwork: '/assets/games/game-05.avif',
    fallbackArtwork: '/assets/games/game-05.webp',
    themeColor: '#f43f5e',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #fb7185 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Slice flying exotic fruits with lightning blade swipes and unleash massive combo bonuses!',
    rewardCoins: 18,
    guide: {
      objective: 'Slice flying watermelons, pineapples, and apples before they hit the ground.',
      controls: [{ key: 'Swipe / Drag Blade', action: 'Slice fruits in mid-air' }],
      timeLimit: 30,
      tips: 'Slice 3 or more fruits in one continuous stroke for massive combo multipliers!'
    }
  },
  {
    id: 'game-6',
    number: 6,
    title: 'Cosmo Warrior',
    category: 'Space Arcade',
    artwork: '/assets/games/game-06.avif',
    fallbackArtwork: '/assets/games/game-06.webp',
    themeColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #be185d 0%, #f472b6 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Fight wave invasions, upgrade laser cannons, and defend space sectors from alien armadas!',
    rewardCoins: 22,
    guide: {
      objective: 'Pilot your plasma ship to destroy invading alien space fleets.',
      controls: [{ key: 'Touch / Drag Ship', action: 'Move and fire laser cannons' }],
      timeLimit: 60,
      tips: 'Pick up multi-shot laser icons to wipe out alien swarms!'
    }
  },
  {
    id: 'game-7',
    number: 7,
    title: 'Toilet Tactics',
    category: 'City Defense',
    artwork: '/assets/games/game-07.avif',
    fallbackArtwork: '/assets/games/game-07.webp',
    themeColor: '#6366f1',
    gradient: 'linear-gradient(135deg, #4338ca 0%, #818cf8 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Defend the metropolis from crazy invading toilet waves using upgraded camera weapons!',
    rewardCoins: 15,
    guide: {
      objective: 'Shoot down incoming toilet monsters and defend the city skyline.',
      controls: [{ key: 'Tap Enemy / Hold Fire', action: 'Shoot laser blaster' }],
      timeLimit: 40,
      tips: 'Target giant toilet bosses first to stop heavy attacks!'
    }
  },
  {
    id: 'game-8',
    number: 8,
    title: 'Word Hunt',
    category: 'Word Search',
    artwork: '/assets/games/game-08.avif',
    fallbackArtwork: '/assets/games/game-08.webp',
    themeColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, #0e7490 0%, #22d3ee 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Find hidden words in all directions across letter grids to sharpen your mind and win rewards!',
    rewardCoins: 20,
    guide: {
      objective: 'Highlight hidden words horizontally, vertically, and diagonally.',
      controls: [{ key: 'Drag Across Letters', action: 'Select and form words' }],
      timeLimit: 45,
      tips: 'Look for rare letters like X and Z to spot hidden words faster!'
    }
  },
  {
    id: 'game-9',
    number: 9,
    title: 'Bubble Blast Legend',
    category: 'Bubble Shooter',
    artwork: '/assets/games/game-09.avif',
    fallbackArtwork: '/assets/games/game-09.webp',
    themeColor: '#a855f7',
    gradient: 'linear-gradient(135deg, #7e22ce 0%, #c084fc 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Aim the cannon, shoot colorful bubbles, pop matching clusters, and clear puzzle stages!',
    rewardCoins: 18,
    guide: {
      objective: 'Match 3 or more bubbles of the same color to pop the ceiling grid.',
      controls: [{ key: 'Aim Cannon & Tap', action: 'Fire bubble projectile' }],
      timeLimit: 30,
      tips: 'Bounce bubbles off side walls to reach tricky hidden clusters!'
    }
  },
  {
    id: 'game-10',
    number: 10,
    title: 'Merge Master',
    category: 'Number Puzzle',
    artwork: '/assets/games/game-10.avif',
    fallbackArtwork: '/assets/games/game-10.webp',
    themeColor: '#eab308',
    gradient: 'linear-gradient(135deg, #ca8a04 0%, #fde047 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Shoot and merge matching numbered blocks to reach 2048 and dominate the leaderboard!',
    rewardCoins: 16,
    guide: {
      objective: 'Combine matching number cubes (2+2=4, 64+64=128) to reach 2048.',
      controls: [{ key: 'Tap Grid Column', action: 'Shoot number block upward' }],
      timeLimit: 35,
      tips: 'Keep high value blocks at the bottom to trigger multi-merges!'
    }
  },
  {
    id: 'game-11',
    number: 11,
    title: 'Wormzy',
    category: 'Apple Puzzle',
    artwork: '/assets/games/game-11.avif',
    fallbackArtwork: '/assets/games/game-11.webp',
    themeColor: '#14b8a6',
    gradient: 'linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Guide Wormzy through block mazes, eat delicious red apples, and solve clever levels!',
    rewardCoins: 24,
    guide: {
      objective: 'Navigate Wormzy over direction blocks to reach the juicy red apple.',
      controls: [{ key: 'Tap Arrow Blocks', action: 'Guide Wormzy movement path' }],
      timeLimit: 50,
      tips: 'Use gravity blocks carefully so Wormzy doesn\'t slip off the platform!'
    }
  },
  {
    id: 'game-12',
    number: 12,
    title: 'Aqua Fill',
    category: 'Physics Drawing',
    artwork: '/assets/games/game-12.avif',
    fallbackArtwork: '/assets/games/game-12.webp',
    themeColor: '#84cc16',
    gradient: 'linear-gradient(135deg, #65a30d 0%, #a3e635 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Draw smart pencil lines to guide flowing water streams into the glass and make it happy!',
    rewardCoins: 20,
    guide: {
      objective: 'Draw custom line paths to direct water into the glass up to the dotted target line.',
      controls: [{ key: 'Draw Line with Mouse/Finger', action: 'Create physical line guide' }],
      timeLimit: 30,
      tips: 'Use shorter lines to earn 3 full star ratings!'
    }
  },
  {
    id: 'game-13',
    number: 13,
    title: 'Realm Clash',
    category: 'Tower Conquest',
    artwork: '/assets/games/game-13.avif',
    fallbackArtwork: '/assets/games/game-13.webp',
    themeColor: '#f97316',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #fb923c 100%)',
    entryCost: 20,
    isPlayable: false,
    description: 'Plan troop routes, upgrade fortress towers, capture enemy keeps, and dominate the battlefield!',
    rewardCoins: 30,
    guide: {
      objective: 'Send troop waves along pathways to capture rival red towers.',
      controls: [{ key: 'Drag from Tower to Tower', action: 'Dispatch troop squad' }],
      timeLimit: 20,
      tips: 'Upgrade your base tower number count before attacking heavily defended keeps!'
    }
  }
];
