import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

// Tile text pieces that form "You are the reason I believe in love"
const TILE_TEXTS = [
  "You are",
  "the reason",
  "I believe",
  "in love",
  "Every day",
  "with you",
  "is a gift",
  "to me 🌹",
];

// Pre-generate stable confetti items
const CONFETTI_ITEMS = Array.from({ length: 32 }, (_, i) => ({
  key: `confetti-${i}`,
  left: `${i * 3.125}%`,
  fontSize: `${14 + (i % 4) * 4}px`,
  emoji: ["🌸", "💕", "🌹", "✨", "💖", "🌺", "🎉"][i % 7],
  delay: `${(i * 0.06).toFixed(2)}s`,
  duration: `${1.5 + (i % 4) * 0.5}s`,
}));

function isSolvable(tiles: number[]): boolean {
  // Count inversions
  let inversions = 0;
  const flat = tiles.filter((t) => t !== 0);
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
}

function createShuffled(): number[] {
  // 0 = empty tile, 1-8 = tiles
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  do {
    // Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (!isSolvable(arr) || isSolved(arr));
  return arr;
}

function isSolved(tiles: number[]): boolean {
  return tiles.every((t, i) => (i === 8 ? t === 0 : t === i + 1));
}

function getAdjacent(emptyIdx: number): number[] {
  const row = Math.floor(emptyIdx / 3);
  const col = emptyIdx % 3;
  const adj: number[] = [];
  if (row > 0) adj.push(emptyIdx - 3);
  if (row < 2) adj.push(emptyIdx + 3);
  if (col > 0) adj.push(emptyIdx - 1);
  if (col < 2) adj.push(emptyIdx + 1);
  return adj;
}

export function LovePuzzleSection() {
  const [tiles, setTiles] = useState<number[]>(() => createShuffled());
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hintTile, setHintTile] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(false);

  const emptyIdx = tiles.indexOf(0);

  const moveTile = useCallback(
    (tileIdx: number) => {
      if (solved) return;
      const empty = tiles.indexOf(0);
      const adjacent = getAdjacent(empty);
      if (!adjacent.includes(tileIdx)) return;

      setTiles((prev) => {
        const next = [...prev];
        [next[empty], next[tileIdx]] = [next[tileIdx], next[empty]];
        return next;
      });
      setMoves((m) => m + 1);
    },
    [tiles, solved],
  );

  useEffect(() => {
    if (!solved && isSolved(tiles) && moves > 0) {
      setSolved(true);
      setConfetti(true);
    }
  }, [tiles, moves, solved]);

  const reset = () => {
    setTiles(createShuffled());
    setMoves(0);
    setSolved(false);
    setConfetti(false);
    setHintTile(null);
  };

  const showHint = () => {
    // Find first tile adjacent to empty that when moved reduces inversions
    const adj = getAdjacent(emptyIdx);
    if (adj.length > 0) {
      const target = adj[0];
      setHintTile(target);
      setTimeout(() => setHintTile(null), 1200);
    }
  };

  return (
    <section
      style={{ background: "oklch(0.956 0.018 68)", minHeight: "100vh" }}
      className="py-12 px-4"
      aria-label="Love Puzzle"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              color: "oklch(0.68 0.07 22)",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            ✦ A Puzzle of Love ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "oklch(0.272 0.04 46)",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            Piece My Heart Together 🧩
          </h2>
          <p
            style={{
              color: "oklch(0.48 0.03 46)",
              fontSize: "1rem",
              fontStyle: "italic",
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            Slide the tiles into order to reveal our love message.
          </p>
        </motion.div>

        {/* Puzzle grid */}
        <div className="flex flex-col items-center gap-6">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              width: "100%",
              maxWidth: "420px",
              padding: "16px",
              background: "oklch(0.978 0.012 68)",
              borderRadius: "1.5rem",
              boxShadow: "0 8px 32px oklch(0.68 0.07 22 / 0.12)",
              border: "2px solid oklch(0.88 0.025 55)",
            }}
            data-ocid="puzzle.panel"
          >
            {tiles.map((tile, idx) => {
              const isEmpty = tile === 0;
              const isAdjacent = getAdjacent(emptyIdx).includes(idx);
              const isHint = hintTile === idx;
              // Use tile value as key when non-empty, or "empty" for the empty slot
              const tileKey = isEmpty ? "empty" : `tile-${tile}`;

              return (
                <motion.button
                  key={tileKey}
                  type="button"
                  onClick={() => moveTile(idx)}
                  disabled={isEmpty || !isAdjacent}
                  animate={{
                    scale: isHint ? [1, 1.06, 1] : 1,
                    boxShadow: isHint
                      ? "0 0 0 3px oklch(0.68 0.07 22), 0 0 20px oklch(0.76 0.075 18 / 0.6)"
                      : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  data-ocid={`puzzle.item.${idx + 1}`}
                  style={{
                    background: isEmpty
                      ? "oklch(0.93 0.022 62)"
                      : "oklch(0.978 0.012 68)",
                    border: isEmpty
                      ? "2px dashed oklch(0.88 0.025 55)"
                      : "2px solid oklch(0.76 0.075 18 / 0.4)",
                    borderRadius: "0.75rem",
                    padding:
                      "clamp(0.6rem, 2vw, 1.1rem) clamp(0.4rem, 1.5vw, 0.8rem)",
                    cursor: isEmpty || !isAdjacent ? "default" : "pointer",
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: "clamp(0.65rem, 2vw, 0.85rem)",
                    fontWeight: 600,
                    color: isEmpty ? "transparent" : "oklch(0.272 0.04 46)",
                    textAlign: "center",
                    lineHeight: 1.3,
                    minHeight: "clamp(60px, 12vw, 90px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition:
                      "border-color 0.2s, background 0.2s, transform 0.15s",
                    transform:
                      isAdjacent && !isEmpty ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      isAdjacent && !isEmpty
                        ? "0 4px 12px oklch(0.68 0.07 22 / 0.15)"
                        : "none",
                    animation: isEmpty ? "none" : "tileSlide 0.15s ease-out",
                  }}
                >
                  {isEmpty ? "" : TILE_TEXTS[tile - 1]}
                </motion.button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <p
              style={{
                color: "oklch(0.48 0.03 46)",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: "italic",
                fontSize: "0.95rem",
              }}
            >
              Moves:{" "}
              <strong style={{ color: "oklch(0.68 0.07 22)" }}>{moves}</strong>
            </p>
            <button
              type="button"
              onClick={showHint}
              data-ocid="puzzle.secondary_button"
              style={{
                background: "oklch(0.978 0.012 68)",
                color: "oklch(0.68 0.07 22)",
                border: "1.5px solid oklch(0.76 0.075 18 / 0.5)",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "0.9rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "100px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              💡 Hint
            </button>
            <button
              type="button"
              onClick={reset}
              data-ocid="puzzle.secondary_button"
              style={{
                background: "oklch(0.978 0.012 68)",
                color: "oklch(0.48 0.03 46)",
                border: "1.5px solid oklch(0.88 0.025 55)",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "0.9rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "100px",
                cursor: "pointer",
              }}
            >
              🔀 Shuffle
            </button>
          </div>

          {/* Target arrangement */}
          <div
            style={{
              background: "oklch(0.93 0.022 62)",
              borderRadius: "1rem",
              padding: "1rem 1.5rem",
              textAlign: "center",
              maxWidth: "360px",
              border: "1px solid oklch(0.88 0.025 55)",
            }}
          >
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: "italic",
                fontSize: "0.9rem",
                color: "oklch(0.68 0.07 22)",
                marginBottom: "0.5rem",
              }}
            >
              Arrange tiles left-to-right to reveal:
            </p>
            <p
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 600,
                fontSize: "0.95rem",
                color: "oklch(0.38 0.04 46)",
              }}
            >
              {TILE_TEXTS.join(" ")}
            </p>
          </div>
        </div>

        {/* Confetti */}
        <AnimatePresence>
          {confetti && (
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 100,
                overflow: "hidden",
              }}
            >
              {CONFETTI_ITEMS.map((item) => (
                <div
                  key={item.key}
                  style={{
                    position: "absolute",
                    left: item.left,
                    top: "-20px",
                    fontSize: item.fontSize,
                    animation: `confettiFall ${item.duration} linear ${item.delay} forwards`,
                  }}
                >
                  {item.emoji}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Win overlay */}
        <AnimatePresence>
          {solved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                background: "oklch(0.22 0.04 46 / 0.7)",
                backdropFilter: "blur(6px)",
              }}
              data-ocid="puzzle.modal"
            >
              <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                style={{
                  background: "oklch(0.978 0.012 68)",
                  borderRadius: "2rem",
                  padding: "3rem 2.5rem",
                  maxWidth: "480px",
                  textAlign: "center",
                  boxShadow: "0 20px 60px oklch(0.22 0.04 46 / 0.4)",
                  border: "2px solid oklch(0.76 0.075 18 / 0.4)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌹</div>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 800,
                    fontSize: "1.6rem",
                    color: "oklch(0.272 0.04 46)",
                    marginBottom: "1.25rem",
                    lineHeight: 1.2,
                  }}
                >
                  You solved the puzzle of my heart, Mey!
                </h3>
                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                    color: "oklch(0.48 0.03 46)",
                    lineHeight: 1.8,
                    marginBottom: "2rem",
                  }}
                >
                  Just as these pieces fit together, so do we. Happy one month,
                  my love. 💕
                </p>
                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "oklch(0.62 0.07 22)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Completed in {moves} moves 🌸
                </p>
                <button
                  type="button"
                  onClick={reset}
                  data-ocid="puzzle.confirm_button"
                  className="cta-btn"
                  style={{
                    color: "oklch(0.978 0.012 68)",
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 600,
                    fontSize: "1rem",
                    padding: "0.9rem 2rem",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🔀 Play Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
