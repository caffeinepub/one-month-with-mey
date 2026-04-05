import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface SecretMessage {
  id: number;
  emoji: string;
  message: string;
  top: string;
  left: string;
  delay: string;
  duration: string;
  read: boolean;
}

// Pre-generate stable starfield items
const STARS = Array.from({ length: 50 }, (_, i) => ({
  key: `star-${i}`,
  left: `${(i * 73 + 17) % 100}%`,
  top: `${(i * 47 + 11) % 100}%`,
  size: `${1 + (i % 2)}px`,
}));

const MESSAGES_DATA = [
  {
    id: 1,
    emoji: "💝",
    message:
      "Your laugh is the most beautiful sound I have ever heard. I could listen to it forever and never get tired. 🌸",
    top: "15%",
    left: "10%",
    delay: "0s",
    duration: "4.2s",
  },
  {
    id: 2,
    emoji: "💖",
    message:
      "Every time I see your face on my screen, the whole world shrinks down to just you. 💕",
    top: "12%",
    left: "72%",
    delay: "0.7s",
    duration: "3.8s",
  },
  {
    id: 3,
    emoji: "💗",
    message:
      "I love the way you hold yourself. Every soft part of you is perfect to me. I mean that with my whole heart. 🌹",
    top: "38%",
    left: "5%",
    delay: "1.3s",
    duration: "4.5s",
  },
  {
    id: 4,
    emoji: "💓",
    message:
      "Seven years apart in age, a world apart in distance — and yet you feel closer to me than anyone ever has. ✨",
    top: "35%",
    left: "80%",
    delay: "0.4s",
    duration: "3.6s",
  },
  {
    id: 5,
    emoji: "💞",
    message:
      "Our video calls are my favorite part of every day. The moment you appear, everything feels right again. 💝",
    top: "62%",
    left: "18%",
    delay: "1.8s",
    duration: "4.8s",
  },
  {
    id: 6,
    emoji: "💕",
    message:
      "You have changed me quietly and gently. I am a softer, better person because of you, Mey. 💞",
    top: "65%",
    left: "65%",
    delay: "0.9s",
    duration: "4.1s",
  },
  {
    id: 7,
    emoji: "🌹",
    message:
      "No matter how far apart we are tonight, know that I am thinking of you, choosing you, loving you. Always. 🌙",
    top: "82%",
    left: "40%",
    delay: "2.1s",
    duration: "3.9s",
  },
];

export function SecretMessagesSection() {
  const [messages, setMessages] = useState<SecretMessage[]>(
    MESSAGES_DATA.map((m) => ({ ...m, read: false })),
  );
  const [openId, setOpenId] = useState<number | null>(null);

  const openMessage = (id: number) => {
    setOpenId(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  };

  const closeMessage = () => setOpenId(null);

  const activeMessage = messages.find((m) => m.id === openId);

  return (
    <section
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.04 46) 0%, oklch(0.28 0.055 30) 50%, oklch(0.22 0.04 46) 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      className="py-16 px-4"
      aria-label="Secret Messages"
    >
      {/* Starfield */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {STARS.map((star) => (
          <div
            key={star.key}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background: "oklch(0.88 0.025 55 / 0.4)",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10">
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
            ✦ For You, Mey ✦
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
            Secret Messages 💌
          </h2>
          <p
            style={{
              color: "oklch(0.72 0.03 55)",
              fontSize: "1.05rem",
              fontStyle: "italic",
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            Tap each heart to reveal a secret message 💌
          </p>
        </motion.div>

        {/* Progress */}
        <div className="text-center mb-6">
          <p
            style={{
              color: "oklch(0.62 0.07 22)",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
              fontSize: "0.9rem",
            }}
          >
            {messages.filter((m) => m.read).length} / {messages.length} messages
            discovered
          </p>
        </div>
      </div>

      {/* Heart bubbles — positioned absolutely */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "70vh",
        }}
        className="relative z-10"
      >
        {messages.map((msg) => (
          <motion.button
            key={msg.id}
            type="button"
            onClick={() => openMessage(msg.id)}
            data-ocid={`secrets.button.${msg.id}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: msg.id * 0.12,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute",
              top: msg.top,
              left: msg.left,
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: msg.read
                ? "oklch(0.32 0.055 30 / 0.6)"
                : "oklch(0.38 0.085 22 / 0.7)",
              border: msg.read
                ? "2px solid oklch(0.55 0.04 46 / 0.4)"
                : "2px solid oklch(0.68 0.07 22 / 0.6)",
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              boxShadow: msg.read
                ? "none"
                : "0 0 20px oklch(0.68 0.07 22 / 0.3), 0 4px 12px oklch(0.22 0.04 46 / 0.4)",
              animation: `floatBob ${msg.duration} ease-in-out ${msg.delay} infinite`,
              filter: msg.read ? "brightness(0.65) saturate(0.5)" : "none",
              transition: "filter 0.4s, background 0.4s",
            }}
            aria-label={`Secret message ${msg.id}`}
          >
            {msg.read ? (
              <span style={{ fontSize: "1.1rem" }}>✓</span>
            ) : (
              msg.emoji
            )}
          </motion.button>
        ))}
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {openId !== null && activeMessage && (
          <motion.div
            key="msg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMessage}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              background: "oklch(0.22 0.04 46 / 0.75)",
              backdropFilter: "blur(8px)",
            }}
            data-ocid="secrets.modal"
          >
            <motion.div
              key="msg-card"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.978 0.012 68), oklch(0.96 0.022 55))",
                borderRadius: "2rem",
                padding: "2.5rem 2rem",
                maxWidth: "400px",
                width: "100%",
                textAlign: "center",
                boxShadow:
                  "0 20px 60px oklch(0.22 0.04 46 / 0.5), 0 4px 16px oklch(0.68 0.07 22 / 0.15)",
                border: "2px solid oklch(0.76 0.075 18 / 0.4)",
                position: "relative",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ fontSize: "3rem", marginBottom: "1.25rem" }}
              >
                {activeMessage.emoji}
              </motion.div>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "oklch(0.35 0.04 46)",
                  marginBottom: "2rem",
                }}
              >
                {activeMessage.message}
              </p>
              <div
                style={{
                  width: "60px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, oklch(0.68 0.07 22), oklch(0.76 0.075 18))",
                  margin: "0 auto 1.5rem",
                  borderRadius: "100px",
                }}
              />
              <button
                type="button"
                onClick={closeMessage}
                data-ocid="secrets.close_button"
                style={{
                  background: "oklch(0.68 0.07 22 / 0.1)",
                  color: "oklch(0.68 0.07 22)",
                  border: "1.5px solid oklch(0.76 0.075 18 / 0.5)",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "100px",
                  cursor: "pointer",
                }}
              >
                Close 🌸
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All discovered message */}
      <AnimatePresence>
        {messages.every((m) => m.read) && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center mt-8"
          >
            <div
              style={{
                background: "oklch(0.32 0.075 22 / 0.4)",
                border: "1px solid oklch(0.68 0.07 22 / 0.4)",
                borderRadius: "1.5rem",
                padding: "1.5rem 2rem",
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  color: "oklch(0.88 0.03 60)",
                  lineHeight: 1.7,
                }}
              >
                You found all 7 secret messages. Every single one was written
                just for you, Mey. 🌹💕
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
