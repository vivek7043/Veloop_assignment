# VELOOP Rewards — Games Ecosystem

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.10-0055FF?logo=framer&logoColor=white)](https://framer.com/motion)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An interactive, high-performance, and responsive **VELOOP Rewards Games Ecosystem** built to deliver a gamified user engagement experience. Users spend **Tokens** to play interactive games, earn **Game Coins**, and convert their earnings into platform rewards (VEs, Silver VEs/SVEs, Gems, Tokens, and Spins) via a centralized economy.

---

## 🔗 Project Links

- **GitHub Repository**: `https://github.com/username/velloop-games` <!-- Replace with actual GitHub repository URL when deployed -->
- **Live Demo**: `https://velloop-games.vercel.app` <!-- Replace with actual live deployment URL when deployed -->

---

## 📖 1. Project Overview

The **VELOOP Games Ecosystem** is a frontend web application designed according to VELOOP internship specification requirements. It serves as a central hub where users explore games, participate in casual gameplay sessions, and redeem earned rewards.

Key principles of the architecture:
- **Gamified Economy**: Spend **20 Tokens** per play session → Earn **Game Coins** based on gameplay score → Convert Game Coins into platform rewards.
- **Dynamic Visual Experience**: Features 13 customized game banners with smooth continuous carousel movement, light-themed active games, and infinite shimmer UI animations.
- **Zero-Backend Client Persistence**: Central state managed via React Context API (`GameCoinContext`) and persisted across sessions using browser `localStorage`.

---

## ✨ 2. Features

### 🎮 13 Game Banners
- **Custom Banner Artwork**: Features 13 cropped and enhanced game banner assets mapped cleanly to each game's category and title.
- **Detailed Metadata**: Each card highlights title, category badge, entry cost, and status (`PLAYABLE` vs `COMING SOON`).

### 🕹️ 2 Fully Interactive Playable Games
1. **Cyber Speed Racing** (Arcade Racing):
   - 3-lane neon-sky track with interactive player car.
   - Dynamic object spawner generating coins (+50 pts), nitro boosters (+100 pts + turbo speed), and hazards (-1 life).
   - Real-time score HUD, 30s countdown timer, lives display, keyboard (`ArrowLeft`, `ArrowRight`, `Spacebar`) and touch controls.
2. **Gem Burst Rush** (Action Match Puzzle):
   - Warm golden 5x5 grid with colorful gems (Ruby, Emerald, Sapphire, Topaz, Amethyst).
   - Flood-fill match engine popping clusters of 2+ adjacent matching gems with combo multipliers (up to 5x).
   - Real-time score HUD, 30s countdown timer, and interactive touch/click grid.

### 🪙 20 Token Entry System
- Every playable game session costs exactly **20 Tokens** to start.
- Displays a transparent **Token icon (~20px)** and cost requirement on every game card.
- Automatically checks token balance before starting; triggers an **Insufficient Tokens Modal** with a quick "+50 Demo Tokens" reload action if tokens fall below 20.

### 💰 Centralized Game Coin Economy
- Single central **Game Coin balance** shared across all 13 games, landing pages, and the redemption center.
- Earned coins automatically register in global state upon completion of any game round.
- Persisted in `localStorage` so balances remain intact across page reloads.

### 🔄 Gameplay Flow & Guide Modal
1. User clicks **Play Now →** on any playable card.
2. Deducts 20 Tokens and opens the **How to Play Guide Modal** detailing objectives, control keys, time limit, and game tips.
3. Clicking **GOT IT** starts the real-time gameplay loop.

### 💥 Game Over Revive / No-Thanks Flow
- When time expires or lives reach 0, the **Revive Modal** appears showing the final score and calculated potential Game Coins.
- **REVIVE**: Instantly restores lives / adds +15 seconds so players can push for higher scores.
- **No Thanks**: Finalizes score, triggers a **Game Coin Reward Animation** (with floating coins & celebration feedback), and credits Game Coins to the user's central balance.

### 🎁 Game Coin Redemption Center (`GameRedeem.jsx`)
- Exchange earned Game Coins for VELOOP Rewards:
  - **VEs** (100 Coins → 10 VEs)
  - **Silver VEs / SVEs** (100 Coins → 10 SVEs)
  - **Gems** (50 Coins → 5 Gems)
  - **Tokens** (50 Coins → 20 Tokens)
  - **Spins** (50 Coins → 2 Spins)
- Features a **Confirmation Modal** showing deduction breakdowns and remaining balance.
- Handles **Insufficient Game Coins** state with a warning modal guiding users back to play games.
- Maintains a real-time **Recent Redemption History** audit log.

### 📱 Responsive Design
- Built mobile-first for viewports ranging from 320px smartphones to ultra-wide desktop monitors without horizontal breaking or layout distortion.

---

## 🛠️ 3. Tech Stack

| Domain | Technology / Library | Version | Description |
| :--- | :--- | :--- | :--- |
| **Core Framework** | React | `^19.0.0` | Component-based UI engine |
| **Build Tool** | Vite | `^6.1.0` | Ultra-fast HMR and production bundle bundler |
| **Animation Engine** | Framer Motion | `^12.4.10` | Micro-interactions, modal transitions, and reward feedback |
| **Reward FX** | Canvas Confetti | `^1.9.4` | Particle confetti effect on coin redemption and game victory |
| **Icon Library** | Lucide React | `^0.475.0` | Modern, clean vector iconography |
| **Styling** | Vanilla CSS / CSS Modules | Standard | CSS modules (`.module.css`) and modular inline objects |
| **State Management** | React Context API | Native | Centralized `GameCoinContext` with `localStorage` sync |

---

## 📁 4. Component / Folder Structure

```
utsav_games/
├── public/
│   └── assets/
│       ├── game_coin.png         # Central Game Coin icon
│       ├── token.png             # Transparent Token entry icon (~20px)
│       ├── ve.png                # VEs reward icon
│       ├── sve.png               # Silver VEs reward icon
│       ├── gems.png              # Gems reward icon
│       ├── spin.png              # Spins reward icon
│       └── games/                # Fallback public game artwork
├── src/
│   ├── assets/                   # High-res image assets & dual-format graphics
│   │   ├── game_coin.png
│   │   ├── token.png
│   │   ├── ve.png / sve.png / gems.png / spin.png
│   │   └── games/                # Optimized AVIF and WebP game artwork (game-01 to game-13)
│   ├── components/
│   │   ├── games/
│   │   │   ├── GameOne/
│   │   │   │   ├── Game.jsx      # Game 1: Cyber Speed Racing component
│   │   │   │   └── Game.module.css
│   │   │   └── GameTwo/
│   │   │       ├── Game.jsx      # Game 2: Gem Burst Rush component
│   │   │       └── Game.module.css
│   │   ├── GameCard.jsx          # Individual banner card (artwork overlay, 20 Tokens, Shimmer button)
│   │   ├── GameCarousel.jsx      # 13-banner horizontal continuous auto-scroll track
│   │   ├── Header.jsx            # Sticky navbar with live Token & Central Game Coin counters
│   │   ├── GameGuideModal.jsx    # First-time "How to Play" guide overlay
│   │   ├── ReviveModal.jsx       # Game Over choices ("REVIVE" vs "No Thanks")
│   │   ├── InsufficientTokensModal.jsx # Token top-up warning overlay
│   │   ├── GameCoinRewardAnimation.jsx # Post-game animated reward sequence
│   │   └── GameNavigation.jsx    # Bottom persistent navigation bar (Home | Redeem)
│   ├── context/
│   │   └── GameCoinContext.jsx   # Central state manager (Tokens, Game Coins, Redemption Log)
│   ├── data/
│   │   └── gamesData.js          # Metadata, image paths, and guides for all 13 games
│   ├── pages/
│   │   ├── Games.jsx             # Games Hub main landing view (`GamesHub`)
│   │   ├── GameHome.jsx          # Game detail view (`GameHome`)
│   │   └── GameRedeem.jsx        # Game Coin Redemption Center (`GameRedeem`)
│   ├── App.jsx                   # Root application router and view controller
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global CSS rules, keyframe animations, & shimmer effects
├── processed_assets/             # Raw & processed graphics workspace
├── images/                       # Project screenshots & raw banner source files
├── index.html                    # Single-page app HTML template
├── package.json                  # NPM dependencies & build scripts
├── vite.config.js                # Vite build and plugin configurations
└── README.md                     # Comprehensive project documentation
```

---

## 🎨 5. Asset Preparation

- **Cropping & Composition**: Original 13 game artwork banners were cropped and centered to highlight core gameplay subjects while maintaining a consistent 280x305 aspect ratio for UI cards.
- **Transparent PNG Icons**: Currency icons (`token.png`, `game_coin.png`, `ve.png`, `sve.png`, `gems.png`, `spin.png`) prepared with clean alpha transparency to blend seamlessly over light and dark backgrounds.
- **Retina Crispness**: Rendered with CSS `object-fit: cover` and `object-position: center top` to prevent distortion on high-DPI (Retina) displays.

---

## ⚡ 6. Image Optimization

To maximize loading speed and satisfy strict performance standards:
- **AVIF Next-Gen Format**: All 13 game banner assets converted to AVIF (`.avif`), reducing image file sizes down to ~200KB while preserving sharp color fidelity.
- **WebP Fallback**: WebP (`.webp`) format provided as a secondary fallback for older browser engines.
- **HTML5 `<picture>` Tag Implementation**:
  ```html
  <picture>
    <source srcSet="/assets/games/game-01.avif" type="image/avif" />
    <source srcSet="/assets/games/game-01.webp" type="image/webp" />
    <img src="/assets/games/game-01.avif" alt="Blade Master" loading="lazy" />
  </picture>
  ```
- **Lazy Loading**: `loading="lazy"` attribute applied to offscreen banner artwork to reduce initial DOM payload and speed up Time-to-Interactive (TTI).

---

## 🎠 7. Carousel Behavior

The banner carousel component (`GameCarousel.jsx`) is engineered to strict VELOOP PDF specification guidelines:

- **13 Game Banners**: Displays all 13 game cards in a continuous horizontal row.
- **Continuous 60fps Auto-Scroll**: Uses `requestAnimationFrame` for stutter-free, buttery-smooth horizontal scrolling across doubled track items (`[...games, ...games]`).
- **Touch & Swipe Controls**: Native touch support (`WebkitOverflowScrolling: touch`) enables smooth dragging on mobile devices.
- **Auto-Pause Interaction**: Automatically pauses auto-scroll when a user hovers with a mouse (`onMouseEnter`) or touches the carousel track (`onTouchStart`), resuming smoothly when user releases (`onMouseLeave` / `onTouchEnd`).
- **Dot Page Indicators (`● ○ ○ ○`)**: Synchronized horizontal dots dynamically update their width and active background color based on current scroll position. Clicking a dot smoothly scrolls directly to that game card.
- **🚫 Zero Arrows Policy**: Implements **NO left/right arrow buttons**, strictly matching PDF requirements for clean touch-first UI design.
- **Shimmer Animation**: Playable game cards feature an infinite, high-tech CSS shimmer sweep animation on their **Play Now →** call-to-action buttons (`shimmer-btn`).

---

## 📦 8. Installation

Ensure you have **Node.js (v18+)** and **npm** installed on your system.

```bash
# 1. Clone the repository
git clone https://github.com/username/velloop-games.git

# 2. Navigate into the project directory
cd utsav_games

# 3. Install project dependencies
npm install
```

---

## 🏃 9. Running Locally

Start the local Vite development server:

```bash
npm run dev
```

The application will run locally at:
`http://localhost:5173/`

---

## 🏗️ 10. Production Build

To test or build the application for production deployment:

```bash
# 1. Create an optimized production build
npm run build

# 2. Preview the production build locally
npm run preview
```

The build output will be compiled into the `dist/` directory.

---

## 🚀 11. Deployment

### Deploying to Vercel
1. Install Vercel CLI (`npm i -g vercel`) or link your GitHub repository on [vercel.com](https://vercel.com).
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Deploy!

### Deploying to Netlify
1. Connect your repository on [netlify.com](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`

---
