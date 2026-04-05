# One Month With Mey — Multi-Layer Love Page

## Current State
The app has a single-page romantic experience:
- Hero section with animated entrance, floating rose petals
- IntroSection with feature cards
- LoveLetterSection with full-length letter
- MilestoneSection with countdown timers
- Footer with closing poem

## Requested Changes (Diff)

### Add
- **Navigation / Layer System**: A tab or scroll-based layer switcher so Mey can navigate between 4 layers: Love Letter (existing), Love Game, Love Puzzle, and Love Messages
- **Love Game Layer**: A simple heart-catching game using Canvas API. Hearts fall from the top, Mey moves a basket (or uses keyboard/touch) to catch them. Catching a heart shows a sweet message. When she reaches a score milestone, a special love message pops up.
- **Love Puzzle Layer**: A sliding-tile puzzle (3x3 grid) that reveals a hidden romantic message or heart image when all tiles are solved. Tiles show scrambled pieces of a love quote. On completion, a big celebration with confetti and a sweet note appears.
- **Love Messages Layer**: A hidden "secret messages" section where Mey clicks on floating heart bubbles to reveal personal love notes (7 short romantic messages).

### Modify
- **App.tsx**: Add a layer navigation bar at the top (sticky). Keep all existing sections as "Layer 1: Love Letter". Wrap into a tabbed/layered experience.
- **index.css**: Add game-specific animations (confetti, floating hearts for messages layer, bounce animations for game).

### Remove
Nothing removed.

## Implementation Plan
1. Add a sticky top navigation with 4 tabs: 💌 Love Letter | 💖 Love Game | 🧩 Love Puzzle | 💬 Secret Messages
2. State-manage the active layer in App.tsx, show/hide sections accordingly
3. Build `LoveGameSection.tsx` — Canvas-based heart-catching game with score counter, falling hearts, romantic milestone messages
4. Build `LovePuzzleSection.tsx` — 3x3 sliding tile puzzle with scrambled heart/romantic message tiles, completion celebration
5. Build `SecretMessagesSection.tsx` — 7 floating heart bubbles that reveal personal love notes on click
6. Wire all layers into App.tsx
7. Add CSS animations for confetti, floaty hearts, game effects
