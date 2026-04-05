import { motion } from "motion/react";

interface HeroSectionProps {
  onScrollToLetter: () => void;
}

export function HeroSection({ onScrollToLetter }: HeroSectionProps) {
  return (
    <section
      className="hero-gradient relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background decorative blurs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "oklch(0.76 0.075 18 / 0.12)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "oklch(0.68 0.07 22 / 0.15)",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "oklch(0.38 0.06 22 / 0.08)",
            filter: "blur(120px)",
          }}
        />
      </div>

      {/* Decorative corner roses */}
      <div
        className="absolute top-8 left-8 text-4xl opacity-30 select-none"
        aria-hidden="true"
      >
        🌹
      </div>
      <div
        className="absolute top-8 right-8 text-4xl opacity-30 select-none"
        aria-hidden="true"
      >
        🌹
      </div>
      <div
        className="absolute bottom-12 left-12 text-3xl opacity-20 select-none"
        aria-hidden="true"
      >
        ✨
      </div>
      <div
        className="absolute bottom-12 right-12 text-3xl opacity-20 select-none"
        aria-hidden="true"
      >
        ✨
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              color: "oklch(0.76 0.075 18)",
              fontSize: "1.15rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            One Month Anniversary · April 5, 2026
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.96 0.016 68) 0%, oklch(0.88 0.04 55) 40%, oklch(0.76 0.075 18) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            A Love That
          </span>
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.76 0.075 18) 0%, oklch(0.82 0.065 22) 50%, oklch(0.92 0.025 60) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            Defies Distance
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: "italic",
            color: "oklch(0.85 0.03 60)",
            fontSize: "1.35rem",
            letterSpacing: "0.04em",
            marginBottom: "3rem",
          }}
        >
          One Month. One Heart. Infinite Miles Apart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            onClick={onScrollToLetter}
            className="cta-btn"
            data-ocid="hero.primary_button"
            style={{
              color: "oklch(0.978 0.012 68)",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600,
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
              padding: "1rem 2.5rem",
              borderRadius: "100px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px oklch(0.62 0.09 18 / 0.4)",
            }}
          >
            💌 Read Your Gift, Mey
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-16"
        >
          <div
            style={{
              color: "oklch(0.72 0.04 55)",
              fontSize: "0.85rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Scroll to discover</span>
            <svg
              width="20"
              height="28"
              viewBox="0 0 20 28"
              fill="none"
              aria-hidden="true"
              role="presentation"
            >
              <rect
                x="7"
                y="1"
                width="6"
                height="16"
                rx="3"
                stroke="oklch(0.72 0.04 55)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="10" cy="7" r="2" fill="oklch(0.76 0.075 18)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 0 6; 0 0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <path
                d="M6 21 L10 26 L14 21"
                stroke="oklch(0.72 0.04 55)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
