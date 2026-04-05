import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

export function LoveLetterSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="letter"
      ref={ref}
      style={{ background: "oklch(0.956 0.018 68)" }}
      className="py-24 px-6"
      aria-label="Love Letter"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
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
              marginBottom: "0.75rem",
            }}
          >
            ✦ Written With All My Heart ✦
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: "oklch(0.272 0.04 46)",
              lineHeight: 1.15,
            }}
          >
            My Darling Mey
          </h2>
          <div
            style={{
              width: "80px",
              height: "3px",
              background:
                "linear-gradient(90deg, oklch(0.68 0.07 22), oklch(0.76 0.075 18))",
              margin: "1.25rem auto 0",
              borderRadius: "100px",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Letter card — 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div
              className="letter-paper"
              style={{
                borderRadius: "1.5rem",
                padding: "3.5rem 3rem",
                boxShadow:
                  "0 4px 24px rgba(58, 42, 34, 0.12), 0 1px 6px rgba(58, 42, 34, 0.06), inset 0 0 60px rgba(255,240,230,0.3)",
                position: "relative",
              }}
            >
              {/* Date */}
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  color: "oklch(0.68 0.07 22)",
                  fontSize: "0.95rem",
                  marginBottom: "2rem",
                  textAlign: "right",
                }}
              >
                April 5, 2026
              </p>

              {/* Opening */}
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: "oklch(0.272 0.04 46)",
                  marginBottom: "1.5rem",
                }}
              >
                My Dearest Mey,
              </p>

              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: "1.1rem",
                  lineHeight: 2,
                  color: "oklch(0.35 0.035 46)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.4rem",
                }}
              >
                <p>
                  Today — exactly one month ago — you said yes to whatever this
                  beautiful, impossible, extraordinary thing between us is. One
                  month. Thirty days. And yet in every quiet way that truly
                  matters, it feels like you have always been part of my life —
                  like the universe was just waiting for the right moment to
                  introduce us and then gently step back to let the magic happen
                  on its own.
                </p>

                <p>
                  I have loved before. I have cared for others, shared laughter,
                  whispered words I thought were the deepest I had in me. But
                  what I feel with you, Mey, is something I have never
                  encountered in any chapter of my life before you. It is not
                  simply that I love you — it is
                  <em style={{ color: "oklch(0.62 0.09 18)" }}> how</em> I love
                  you. Our emotional connection runs to a depth that astonishes
                  me every single day. You understand me in ways that some
                  people spend entire lifetimes searching for. You hear the
                  things I cannot quite say, and you hold them with such
                  tenderness that I wonder how I was ever whole without you.
                </p>

                <p>
                  The miles between us — every inch of that distance — have not
                  weakened what we have. If anything, they have taught me the
                  extraordinary weight of a single message from you, the
                  specific joy of seeing your name light up my screen. Distance
                  has a way of stripping away everything trivial and leaving
                  only what is real, what is true, what genuinely matters. And
                  what remains — what has survived every timezone and every long
                  night — is you. You remain. And you are worth every single
                  mile.
                </p>

                <p>
                  I want to talk about your laugh, because I could spend pages
                  on it alone and still not do it justice. There is something in
                  the way you laugh — full, genuine, unguarded — that reaches
                  right through the screen and wraps itself around my heart. On
                  the nights when I am tired, or lonely, or feeling the weight
                  of distance a little too heavily, I think about the sound of
                  your laugh and I am okay again. You have no idea what a gift
                  that is. You are the sound of warmth.
                </p>

                <p>
                  And your body, my darling. I want you to know — truly know —
                  that I find you breathtaking. Every soft curve, every warmth
                  of you, every part that you might sometimes feel uncertain
                  about: I love it all with a devotion that has never wavered.
                  There is something about the way you hold yourself, the soft
                  roundness of you, the warmth that radiates from you, that
                  makes the whole world feel gentler and more beautiful. You are
                  not just beautiful to me — you are the most beautiful. And I
                  mean that in every way a person can mean something.
                </p>

                <p>
                  Our video calls are their own kind of miracle. The moment your
                  face appears on my screen, the distance — all those miles, all
                  that separation — simply dissolves. There you are. Right
                  there. And in that small glowing rectangle I see everything:
                  your smile, the way your eyes catch the light, the way you
                  tuck your hair behind your ear when you are thinking. Those
                  calls are not a substitute for being with you. They are their
                  own form of intimacy, their own beautiful ritual. I am
                  grateful for every one of them.
                </p>

                <p>
                  People speak about age as though the years between two people
                  somehow diminish what they share. But tell me, Mey — has any
                  clock, any calendar, any number ever touched what we have? Our
                  seven-year difference has never once felt like a gap to me. It
                  has felt like two people arriving at exactly the right place
                  at exactly the right time. Wisdom and wonder. Experience and
                  freshness. You teach me things every day — about joy, about
                  presence, about seeing the world with open eyes. And I hope
                  that in whatever small ways I can, I offer you something too.
                  Between us, age is just a beautiful irrelevance.
                </p>

                <p>
                  You have changed me, Mey. Quietly, gently, irreversibly. I am
                  softer now. More patient. More capable of sitting with
                  difficult feelings without running from them. I look forward
                  to things I used to take for granted — morning light, a quiet
                  evening, the possibility of tomorrow. Before you, I did not
                  know I was missing any of this. Now I cannot imagine a version
                  of my life that does not include you in it.
                </p>

                <p>
                  So here is my promise to you, on this one-month mark of
                  something I believe will last far longer than either of us can
                  imagine: I will choose you. Every day, in every way I know
                  how. I will be patient across the distance. I will show up on
                  your hardest days. I will celebrate your smallest victories
                  like they are the most important things in the world — because
                  to me, they are. I will make every video call feel like coming
                  home. And when the day comes that the distance is no longer
                  between us, I will cherish that closeness with every bit as
                  much intention as I cherish your face on a screen right now.
                </p>

                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: "italic",
                    color: "oklch(0.52 0.055 30)",
                    fontSize: "1.05rem",
                    lineHeight: 1.9,
                  }}
                >
                  You are the softness in my every morning and the warmth in my
                  every night.
                  <br />
                  You are the reason distance is only a word, not a verdict.
                  <br />
                  You are the laugh that lives in my chest when everything else
                  is quiet.
                  <br />
                  You are mine, and I am yours, across every mile the world can
                  place between us.
                </p>

                <p>
                  Happy one month, my darling Mey. Thank you for existing. Thank
                  you for choosing me. Thank you for being exactly, perfectly,
                  irreplaceably you.
                </p>
              </div>

              {/* Sign-off */}
              <div
                style={{
                  marginTop: "2.5rem",
                  borderTop: "1px solid oklch(0.88 0.025 55)",
                  paddingTop: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "oklch(0.48 0.03 46)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Forever yours across every mile,
                </p>
                <p
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "oklch(0.52 0.075 22)",
                  }}
                >
                  Your Love 🌹
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right column — memory card + quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* One Month of Us card */}
            <div
              className="memory-card"
              style={{
                borderRadius: "1.5rem",
                padding: "2.5rem 2rem",
                boxShadow: "0 8px 32px oklch(0.68 0.07 22 / 0.12)",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
                aria-hidden="true"
              >
                🌹
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "oklch(0.272 0.04 46)",
                  marginBottom: "0.75rem",
                }}
              >
                One Month of Us
              </h3>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  color: "oklch(0.68 0.07 22)",
                  fontSize: "0.9rem",
                  marginBottom: "1.5rem",
                }}
              >
                April 5, 2025 — April 5, 2026
              </p>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.76 0.075 18 / 0.5), transparent)",
                  marginBottom: "1.5rem",
                }}
              />
              <blockquote
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "oklch(0.38 0.04 46)",
                  margin: 0,
                }}
              >
                &ldquo;Distance is not for the fearful — it is for the bold, for
                those who are willing to spend a lot of time alone in exchange
                for a little time with the one who matters most.&rdquo;
              </blockquote>
              <p
                style={{
                  marginTop: "1rem",
                  color: "oklch(0.62 0.07 22)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                }}
              >
                — Meghan Daum
              </p>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "1.3rem",
                }}
                aria-hidden="true"
              >
                🌸 🌹 💕 🌹 🌸
              </div>
            </div>

            {/* A small promise card */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.32 0.075 22), oklch(0.28 0.055 30))",
                borderRadius: "1.5rem",
                padding: "2rem",
                textAlign: "center",
                boxShadow: "0 8px 32px oklch(0.22 0.04 46 / 0.3)",
              }}
            >
              <div
                style={{ fontSize: "2rem", marginBottom: "1rem" }}
                aria-hidden="true"
              >
                ✨
              </div>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "oklch(0.92 0.025 60)",
                  marginBottom: "1rem",
                }}
              >
                A Little Promise
              </h3>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "oklch(0.82 0.03 60)",
                }}
              >
                No matter how many time zones lie between us, no matter how long
                the nights feel — I will always find my way back to you. Always.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
