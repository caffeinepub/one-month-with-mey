import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { IntroSection } from "./components/IntroSection";
import { LoveGameSection } from "./components/LoveGameSection";
import { LoveLetterSection } from "./components/LoveLetterSection";
import { LovePuzzleSection } from "./components/LovePuzzleSection";
import { MilestoneSection } from "./components/MilestoneSection";
import { RosePetals } from "./components/RosePetals";
import { SecretMessagesSection } from "./components/SecretMessagesSection";

const currentYear = new Date().getFullYear();

const LAYERS = [
  { label: "Love Letter", emoji: "💌", id: "love-letter" },
  { label: "Love Game", emoji: "🩷", id: "love-game" },
  { label: "Love Puzzle", emoji: "🧩", id: "love-puzzle" },
  { label: "Secret Messages", emoji: "✨", id: "secret-messages" },
];

function NavBar({
  active,
  onChange,
}: { active: number; onChange: (i: number) => void }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "oklch(0.22 0.04 46 / 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid oklch(0.68 0.07 22 / 0.22)",
        padding: "0 1rem",
      }}
      aria-label="Page navigation"
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          alignItems: "stretch",
          gap: "2px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {LAYERS.map((layer, i) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => onChange(i)}
            data-ocid={`nav.tab.${i + 1}`}
            style={{
              flex: "1 0 auto",
              minWidth: "80px",
              padding: "0.85rem 0.75rem",
              background: "transparent",
              border: "none",
              borderBottom:
                active === i
                  ? "2.5px solid oklch(0.76 0.075 18)"
                  : "2.5px solid transparent",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              transition: "all 0.22s ease",
              color:
                active === i ? "oklch(0.92 0.025 60)" : "oklch(0.62 0.025 50)",
            }}
            aria-current={active === i ? "page" : undefined}
          >
            <span
              style={{
                fontSize: "1.3rem",
                lineHeight: 1,
                filter: active === i ? "none" : "saturate(0.5) opacity(0.65)",
                transition: "filter 0.22s",
              }}
            >
              {layer.emoji}
            </span>
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "clamp(0.65rem, 2vw, 0.78rem)",
                fontWeight: active === i ? 700 : 500,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                transition: "font-weight 0.22s",
              }}
            >
              {layer.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "oklch(0.22 0.04 46)",
        padding: "5rem 2rem 3rem",
        textAlign: "center",
      }}
      aria-label="Footer"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div
            style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}
            aria-hidden="true"
          >
            🌹
          </div>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              color: "oklch(0.96 0.016 66)",
              marginBottom: "1rem",
            }}
          >
            Happy One Month, My Darling Mey 🌹
          </h2>
          <div
            style={{
              width: "60px",
              height: "2px",
              background:
                "linear-gradient(90deg, oklch(0.68 0.07 22), oklch(0.76 0.075 18))",
              margin: "0 auto 2.5rem",
              borderRadius: "100px",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <blockquote
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "oklch(0.82 0.03 60)",
              lineHeight: 2.1,
              margin: "0 0 2.5rem",
              borderLeft: "3px solid oklch(0.68 0.07 22 / 0.5)",
              paddingLeft: "1.5rem",
              textAlign: "left",
            }}
          >
            <p style={{ margin: "0 0 0.25rem" }}>
              Across the miles I send my heart to you each night,
            </p>
            <p style={{ margin: "0 0 0.25rem" }}>
              Through every screen, your laugh becomes my morning light.
            </p>
            <p style={{ margin: "0 0 0.25rem" }}>
              No gap of years, no map of distance breaks this tie —
            </p>
            <p style={{ margin: 0 }}>
              In every mile between us, Mey, I still choose you. Always. I.
            </p>
          </blockquote>
        </motion.div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.07 22 / 0.4), transparent)",
            marginBottom: "2rem",
          }}
        />

        <p
          style={{
            color: "oklch(0.55 0.025 50)",
            fontSize: "0.875rem",
          }}
        >
          © {currentYear} · Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "oklch(0.68 0.07 22)",
              textDecoration: "underline",
            }}
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeLayer, setActiveLayer] = useState(0);

  const scrollToLetter = () => {
    const el = document.getElementById("letter");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLayerChange = (i: number) => {
    setActiveLayer(i);
    // Scroll to top smoothly when switching layers
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Floating rose petals — fixed overlay across entire page */}
      <RosePetals />

      {/* Sticky navigation */}
      <NavBar active={activeLayer} onChange={handleLayerChange} />

      <main>
        <AnimatePresence mode="wait">
          {activeLayer === 0 && (
            <motion.div
              key="layer-love-letter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              <HeroSection onScrollToLetter={scrollToLetter} />
              <IntroSection />
              <LoveLetterSection />
              <MilestoneSection />
            </motion.div>
          )}

          {activeLayer === 1 && (
            <motion.div
              key="layer-love-game"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              <LoveGameSection />
            </motion.div>
          )}

          {activeLayer === 2 && (
            <motion.div
              key="layer-love-puzzle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              <LovePuzzleSection />
            </motion.div>
          )}

          {activeLayer === 3 && (
            <motion.div
              key="layer-secret-messages"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35 }}
            >
              <SecretMessagesSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
