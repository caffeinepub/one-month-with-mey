import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

const stats = [
  { value: "30", unit: "Days", label: "of choosing each other", emoji: "🌹" },
  {
    value: "720",
    unit: "Hours",
    label: "of love across every mile",
    emoji: "💫",
  },
  {
    value: "43,200",
    unit: "Minutes",
    label: "of thinking of you",
    emoji: "💕",
  },
];

export function MilestoneSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.32 0.075 22) 0%, oklch(0.22 0.04 46) 60%, oklch(0.28 0.055 30) 100%)",
      }}
      className="py-24 px-6"
      aria-label="Milestones"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              color: "oklch(0.76 0.075 18)",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            ✦ One Month Later ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              color: "oklch(0.96 0.016 66)",
              lineHeight: 1.2,
            }}
          >
            Every Moment Counted
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.unit}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 * i,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="stat-card"
              style={{
                borderRadius: "1.5rem",
                padding: "2.5rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}
                aria-hidden="true"
              >
                {stat.emoji}
              </div>
              <div
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  color: "oklch(0.96 0.016 66)",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  color: "oklch(0.76 0.075 18)",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {stat.unit}
              </div>
              <p
                style={{
                  color: "oklch(0.72 0.03 55)",
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Central quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-14"
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              color: "oklch(0.88 0.03 60)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            &ldquo;In thirty days, you have given me something I searched for
            across a lifetime — the feeling of being truly, completely
            seen.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
