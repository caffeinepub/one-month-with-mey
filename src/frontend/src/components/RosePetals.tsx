import { useMemo } from "react";

interface PetalConfig {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: string;
  driftDuration: string;
  driftDelay: string;
  opacity: string;
}

export function RosePetals() {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 5.3 + (i % 3) * 8.7) % 100}%`,
      duration: `${9 + (i % 7) * 1.2}s`,
      delay: `${(i * 1.4 + (i % 4) * 2.1) % 18}s`,
      size: `${10 + (i % 5) * 4}px`,
      driftDuration: `${3 + (i % 3) * 1.5}s`,
      driftDelay: `${(i * 0.7) % 3}s`,
      opacity: `${0.55 + (i % 4) * 0.1}`,
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            top: "-60px",
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        >
          <div
            className="petal-inner"
            style={{
              animationDuration: petal.driftDuration,
              animationDelay: petal.driftDelay,
            }}
          >
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
              style={{ opacity: petal.opacity, display: "block" }}
            >
              <ellipse
                cx="12"
                cy="14"
                rx="7"
                ry="10"
                fill="#E6A0A6"
                transform="rotate(-20 12 12)"
              />
              <ellipse
                cx="12"
                cy="14"
                rx="5"
                ry="7"
                fill="#D9A3A3"
                opacity="0.6"
                transform="rotate(-20 12 12)"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
