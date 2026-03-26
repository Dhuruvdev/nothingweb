import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const games = [
  {
    tag: "Horror · Psychological · Architectural",
    title: "THE DREAMROOMS",
    description:
      "A descent into the fragmented mind. Puzzle your way through architectural anomalies that shouldn't exist, and confront the shadows of your own past.",
    status: "Early Access",
    year: "2026",
    accent: "rgba(120,180,255,0.08)",
    tagColor: "rgba(120,180,255,0.4)",
  },
];

export default function Games() {
  const headRef = useRef<HTMLDivElement>(null);
  const headIn = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section id="games" style={{ padding: "100px 28px", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div style={{
            display: "inline-block", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
            marginBottom: 20, padding: "5px 14px",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999,
          }}>
            Our Games
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, color: "#f5f5f5", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Project Spotlight
          </h2>
          <p style={{ marginTop: 16, fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 460, margin: "16px auto 0" }}>
            Our most ambitious project to date. A psychological journey through architectural nightmares.
          </p>
        </motion.div>

        {/* Game cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {games.map((game, i) => (
            <GameCard key={game.title} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GameCard({ game, index }: { game: typeof games[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
      whileHover={{ y: -8, borderColor: "rgba(255,255,255,0.2)" }}
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20, padding: "36px 32px",
        cursor: "default", overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      {/* Ambient glow from accent */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20,
        background: `radial-gradient(ellipse at 30% 0%, ${game.accent} 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />

      {/* Status badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
        color: game.tagColor, marginBottom: 20,
        padding: "4px 10px", borderRadius: 999,
        border: `1px solid ${game.tagColor.replace("0.5", "0.2")}`,
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: game.tagColor, display: "inline-block",
          animation: game.status === "Available Now" ? "pulse 2s infinite" : "none",
        }} />
        {game.status}
      </div>

      <h3 style={{
        fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 600,
        color: "#f5f5f5", letterSpacing: "-0.02em", marginBottom: 14, lineHeight: 1.1,
      }}>
        {game.title}
      </h3>

      <p style={{
        fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)", marginBottom: 18,
      }}>
        {game.tag}
      </p>

      <p style={{
        fontSize: 14, color: "rgba(255,255,255,0.5)",
        lineHeight: 1.7, marginBottom: 28,
      }}>
        {game.description}
      </p>

      <motion.a
        href="#"
        whileHover={{ color: "#fff", x: 4 }}
        transition={{ duration: 0.15 }}
        style={{
          fontSize: 13, fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          textDecoration: "none", display: "inline-flex",
          alignItems: "center", gap: 6,
        }}
      >
        Learn more
        <span style={{ fontSize: 16 }}>→</span>
      </motion.a>
    </motion.div>
  );
}
