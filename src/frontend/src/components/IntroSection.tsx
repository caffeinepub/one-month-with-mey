import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    emoji: "💌",
    title: "Our Love Letter",
    caption: "Words that cross every mile",
    description:
      "Every letter, every message, every whispered wish carries more weight because of the distance between us.",
  },
  {
    emoji: "😄",
    title: "Your Beautiful Laugh",
    caption: "The sound that heals every lonely night",
    description:
      "When I hear you laugh — truly laugh — the world becomes a warmer, more generous place. I would travel every mile just to hear it.",
  },
  {
    emoji: "📱",
    title: "Our Video Calls",
    caption: "Where distance disappears, even for a moment",
    description:
      "The moment your face fills my screen, every mile evaporates. You are not far away — you are right here, real and radiant.",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function IntroSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      style={{ background: "oklch(0.966 0.016 66)" }}
      className="py-24 px-6"
      aria-label="Introduction"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              color: "oklch(0.68 0.07 22)",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            ✦ A Special Gift ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 5vw, 3rem)",
              color: "oklch(0.272 0.04 46)",
              lineHeight: 1.2,
              marginBottom: "1.25rem",
            }}
          >
            A Message of Love,{" "}
            <span style={{ color: "oklch(0.68 0.07 22)" }}>
              Just for You, Mey
            </span>
          </h2>
          <p
            style={{
              color: "oklch(0.48 0.03 46)",
              fontSize: "1.1rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Today marks one month since two hearts found each other across the
            miles. This page is a love letter, a celebration, and a promise —
            all wrapped into one gift, made only for you.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 * i, ease: "easeOut" }}
              className="feature-card"
              style={{
                background: "oklch(0.978 0.012 68)",
                borderRadius: "1.5rem",
                padding: "2.5rem 2rem",
                textAlign: "center",
                boxShadow:
                  "0 8px 32px oklch(0.68 0.07 22 / 0.1), 0 2px 8px oklch(0.68 0.07 22 / 0.06)",
                border: "1px solid oklch(0.88 0.025 55)",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                {f.emoji}
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "oklch(0.272 0.04 46)",
                  marginBottom: "0.5rem",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "oklch(0.68 0.07 22)",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  marginBottom: "1rem",
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}
              >
                {f.caption}
              </p>
              <p
                style={{
                  color: "oklch(0.48 0.03 46)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
