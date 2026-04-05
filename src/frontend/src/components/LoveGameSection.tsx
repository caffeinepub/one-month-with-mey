import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  emoji: string;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  alpha: number;
}

interface Milestone {
  score: number;
  message: string;
}

const MILESTONES: Milestone[] = [
  { score: 5, message: "You caught 5 hearts, just like you caught mine 💕" },
  { score: 10, message: "10 hearts! Your laugh is my favorite sound 🌸" },
  { score: 20, message: "20 hearts! I love every soft curve of you 🌹" },
  { score: 30, message: "30 hearts! No distance can stop this love ✨" },
  { score: 50, message: "50 hearts! You are my whole world, Mey 💍" },
];

const HEART_EMOJIS = ["🩷", "💕", "💗", "💖", "🌹", "💝", "💓"];

export function LoveGameSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    hearts: [] as Heart[],
    floatingTexts: [] as FloatingText[],
    catcherX: 0,
    score: 0,
    gameRunning: false,
    frameId: 0,
    nextHeartId: 0,
    nextTextId: 0,
    shownMilestones: new Set<number>(),
    spawnTimer: 0,
  });

  const [gameState, setGameState] = useState<"intro" | "playing" | "paused">(
    "intro",
  );
  const [score, setScore] = useState(0);
  const [milestoneMsg, setMilestoneMsg] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 500 });

  // Resize canvas
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.offsetWidth, 800);
        const h = window.innerWidth < 640 ? 400 : 500;
        setCanvasSize({ width: w, height: h });
        stateRef.current.catcherX = w / 2;
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Mouse movement
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.catcherX = e.clientX - rect.left;
    },
    [],
  );

  // Touch movement
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.catcherX = e.touches[0].clientX - rect.left;
    },
    [],
  );

  const spawnHeart = useCallback((canvasWidth: number): Heart => {
    const state = stateRef.current;
    return {
      id: state.nextHeartId++,
      x: 30 + Math.random() * (canvasWidth - 60),
      y: -30,
      speed: 2 + Math.random() * 3,
      size: 24 + Math.floor(Math.random() * 20),
      emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
    };
  }, []);

  const checkMilestone = useCallback((newScore: number) => {
    const state = stateRef.current;
    for (const m of MILESTONES) {
      if (newScore >= m.score && !state.shownMilestones.has(m.score)) {
        state.shownMilestones.add(m.score);
        setMilestoneMsg(m.message);
        setTimeout(() => setMilestoneMsg(null), 3500);
        break;
      }
    }
  }, []);

  const startGame = useCallback(() => {
    const state = stateRef.current;
    state.hearts = [];
    state.floatingTexts = [];
    state.score = 0;
    state.nextHeartId = 0;
    state.nextTextId = 0;
    state.shownMilestones.clear();
    state.spawnTimer = 0;
    state.gameRunning = true;
    setScore(0);
    setMilestoneMsg(null);
    setGameState("playing");
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    const { width, height } = canvasSize;
    const CATCHER_W = 90;
    const CATCHER_H = 28;
    const CATCHER_Y = height - 60;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Background
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "oklch(0.22 0.04 46)");
      bg.addColorStop(1, "oklch(0.28 0.055 30)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Stars in background
      ctx.fillStyle = "rgba(255,240,220,0.3)";
      for (let i = 0; i < 30; i++) {
        const sx = (i * 73 + 17) % width;
        const sy = (i * 47 + 23) % (height - 80);
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn hearts
      state.spawnTimer++;
      if (state.spawnTimer > 45) {
        state.hearts.push(spawnHeart(width));
        state.spawnTimer = 0;
      }

      // Move & draw hearts
      const alive: Heart[] = [];
      for (const h of state.hearts) {
        h.y += h.speed;
        if (h.y > height + 40) {
          // Missed: show 💔
          state.floatingTexts.push({
            id: state.nextTextId++,
            x: h.x,
            y: height - 80,
            text: "💔",
            alpha: 1,
          });
        } else {
          // Check collision with catcher
          const cx = state.catcherX;
          if (
            h.y + h.size / 2 >= CATCHER_Y &&
            h.y - h.size / 2 <= CATCHER_Y + CATCHER_H &&
            h.x >= cx - CATCHER_W / 2 - h.size / 2 &&
            h.x <= cx + CATCHER_W / 2 + h.size / 2
          ) {
            // Caught!
            state.score++;
            setScore(state.score);
            checkMilestone(state.score);
            state.floatingTexts.push({
              id: state.nextTextId++,
              x: h.x,
              y: CATCHER_Y - 10,
              text: "+1 💕",
              alpha: 1,
            });
          } else {
            alive.push(h);
            ctx.font = `${h.size}px serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(h.emoji, h.x, h.y);
          }
        }
      }
      state.hearts = alive;

      // Catcher basket
      const cx = Math.max(
        CATCHER_W / 2 + 5,
        Math.min(width - CATCHER_W / 2 - 5, state.catcherX),
      );
      const catchGrad = ctx.createLinearGradient(
        cx - CATCHER_W / 2,
        CATCHER_Y,
        cx + CATCHER_W / 2,
        CATCHER_Y + CATCHER_H,
      );
      catchGrad.addColorStop(0, "oklch(0.68 0.07 22 / 0.9)");
      catchGrad.addColorStop(1, "oklch(0.52 0.09 18 / 0.95)");
      ctx.fillStyle = catchGrad;
      ctx.beginPath();
      ctx.roundRect(cx - CATCHER_W / 2, CATCHER_Y, CATCHER_W, CATCHER_H, 14);
      ctx.fill();

      // Basket heart
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🧺", cx, CATCHER_Y + CATCHER_H / 2);

      // Score display
      ctx.font = "bold 22px 'Playfair Display', Georgia, serif";
      ctx.fillStyle = "oklch(0.92 0.025 60)";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`❤️ ${state.score}`, 16, 16);

      // Floating texts
      const aliveTexts: FloatingText[] = [];
      for (const t of state.floatingTexts) {
        t.y -= 1.2;
        t.alpha -= 0.018;
        if (t.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = t.alpha;
          ctx.font = "16px serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(t.text, t.x, t.y);
          ctx.restore();
          aliveTexts.push(t);
        }
      }
      state.floatingTexts = aliveTexts;

      state.frameId = requestAnimationFrame(loop);
    };

    state.frameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(state.frameId);
    };
  }, [gameState, canvasSize, spawnHeart, checkMilestone]);

  return (
    <section
      style={{ background: "oklch(0.22 0.04 46)", minHeight: "100vh" }}
      className="py-12 px-4"
      aria-label="Love Game"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              color: "oklch(0.76 0.075 18)",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            ✦ A Game of the Heart ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "oklch(0.96 0.016 66)",
              lineHeight: 1.2,
              marginBottom: "0.75rem",
            }}
          >
            Catch My Heart, Mey 💕
          </h2>
          <p
            style={{
              color: "oklch(0.72 0.03 55)",
              fontSize: "1rem",
              fontStyle: "italic",
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            Move the basket to catch every falling heart — just like you caught
            mine.
          </p>
        </motion.div>

        {/* Canvas area */}
        <div ref={containerRef} className="relative w-full">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            data-ocid="game.canvas_target"
            style={{
              display: "block",
              width: "100%",
              height: `${canvasSize.height}px`,
              borderRadius: "1.5rem",
              border: "1px solid oklch(0.68 0.07 22 / 0.3)",
              boxShadow: "0 8px 40px oklch(0.22 0.04 46 / 0.6)",
              touchAction: "none",
              cursor: gameState === "playing" ? "none" : "default",
            }}
          />

          {/* Intro overlay */}
          <AnimatePresence>
            {gameState === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "1.5rem",
                  background: "oklch(0.22 0.04 46 / 0.92)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  textAlign: "center",
                  gap: "1.25rem",
                }}
              >
                <div style={{ fontSize: "3.5rem" }}>🩷</div>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    color: "oklch(0.96 0.016 66)",
                  }}
                >
                  A Heart-Catching Game
                </h3>
                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: "italic",
                    color: "oklch(0.82 0.03 60)",
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    maxWidth: "340px",
                  }}
                >
                  Hearts will fall from above. Move your basket to catch them.
                  Each heart you catch is a little piece of love. Discover
                  special messages as your score grows 💌
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  data-ocid="game.primary_button"
                  className="cta-btn"
                  style={{
                    color: "oklch(0.978 0.012 68)",
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    padding: "0.9rem 2.5rem",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  🩷 Start Catching Hearts
                </button>
                <p
                  style={{
                    color: "oklch(0.55 0.025 50)",
                    fontSize: "0.85rem",
                  }}
                >
                  Move mouse or touch to control the basket
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Milestone overlay */}
          <AnimatePresence>
            {milestoneMsg && (
              <motion.div
                key="milestone"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "oklch(0.32 0.075 22 / 0.95)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(0.68 0.07 22 / 0.5)",
                  borderRadius: "1.5rem",
                  padding: "1.5rem 2.5rem",
                  textAlign: "center",
                  maxWidth: "320px",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
                data-ocid="game.success_state"
              >
                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "oklch(0.96 0.016 66)",
                    lineHeight: 1.6,
                  }}
                >
                  {milestoneMsg}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Play again */}
        {gameState === "playing" && (
          <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div
              style={{
                color: "oklch(0.82 0.03 60)",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: "italic",
                fontSize: "1rem",
              }}
            >
              Score:{" "}
              <strong style={{ color: "oklch(0.76 0.075 18)" }}>{score}</strong>{" "}
              hearts caught
            </div>
            <button
              type="button"
              onClick={startGame}
              data-ocid="game.secondary_button"
              style={{
                background: "oklch(0.32 0.075 22 / 0.5)",
                color: "oklch(0.88 0.03 60)",
                border: "1px solid oklch(0.68 0.07 22 / 0.4)",
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "0.9rem",
                padding: "0.5rem 1.5rem",
                borderRadius: "100px",
                cursor: "pointer",
              }}
            >
              🔄 Restart
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
