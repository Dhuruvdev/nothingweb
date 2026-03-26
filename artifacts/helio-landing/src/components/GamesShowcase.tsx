import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Game data with real YouTube trailer IDs ── */
/* ── Game data ── */
const GAMES = [
  {
    id: "dreamrooms",
    ytId: "ack1x4Hu-OQ",
    ytStart: 0,
    tag: "NothingHide · Psychological Horror",
    title: "THE DREAMROOMS",
    subtitle: "Fear is only a state of mind.",
    description:
      "A haunting descent through ever-shifting architectural nightmares. In THE DREAMROOMS, your memories are the only weapon you have left—and your worst enemies.",
    cta: "Launch the Nightmare",
    platforms: ["Android", "PC"],
    status: "Early Access · Spring 2026",
    fallbackBg: "#060606",
    overlay:
      "linear-gradient(to bottom, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.4) 60%, rgba(13,13,13,0.95) 90%, #0d0d0d 100%)",
    leftOverlay: "linear-gradient(to right, rgba(13,13,13,0.7) 0%, transparent 60%)",
    barColor: "#bfdbfe",
  },
];



function YouTubeBackground({ ytId, ytStart = 0 }: { ytId: string; ytStart?: number }) {
  return (
    <div style={{ 
      position: "absolute", 
      inset: 0, 
      pointerEvents: "none", 
      zIndex: 5, 
      overflow: "hidden", 
      background: "#000" 
    }}>
      <iframe
        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&start=${ytStart}&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "56.25vw", // 16:9 aspect ratio
          minHeight: "100vh",
          minWidth: "177.77vh", // 16:9 aspect ratio
          transform: "translate(-50%, -50%) scale(1.1)",
          border: "none",
          backgroundColor: "#000"
        }}
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}


export default function GamesShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const SLIDE_DURATION = 18000;   // 18s — long enough to enjoy video
  const TICK = 80;

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
  }, []);

  const next = useCallback(() => goTo((active + 1) % GAMES.length), [active, goTo]);
  const prev_ = useCallback(() => goTo((active - 1 + GAMES.length) % GAMES.length), [active, goTo]);

  /* Auto-advance */
  useEffect(() => {
    if (paused || GAMES.length <= 1) return;
    intervalRef.current = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(intervalRef.current!);
  }, [paused, next]);

  /* Progress ticker */
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (TICK / SLIDE_DURATION) * 100, 100));
    }, TICK);
    return () => clearInterval(progressRef.current!);
  }, [active, paused]);

  const game = GAMES[active];

  return (
    <div id="games-showcase" style={{ background: "#0d0d0d" }}>

      {/* ── FULL-SCREEN SLIDE ── */}
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

        {/* Background layers — crossfade between slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={game.id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          >
            {/* YouTube video background */}
            <YouTubeBackground ytId={game.ytId} ytStart={game.ytStart} />

            {/* Bottom fade to black */}
            <div style={{ position: "absolute", inset: 0, background: game.overlay, zIndex: 6 }} />
            {/* Left fade for text legibility */}
            <div style={{ position: "absolute", inset: 0, background: game.leftOverlay, zIndex: 6 }} />

          </motion.div>
        </AnimatePresence>

        {/* ── Slide content ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 36px",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={game.id + "-content"}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease }}
              style={{ paddingBottom: 72 }}
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease }}
                style={{
                  fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)", marginBottom: 12, fontWeight: 500,
                }}
              >
                {game.tag}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1, ease }}
                style={{
                  fontSize: "clamp(36px, 6vw, 68px)",
                  fontWeight: 700, lineHeight: 1,
                  letterSpacing: "-0.03em", color: "#fff",
                  marginBottom: 8,
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                {game.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14, ease }}
                style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", marginBottom: 18, fontWeight: 400 }}
              >
                {game.subtitle}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
                style={{
                  fontSize: 13.5, color: "rgba(255,255,255,0.52)",
                  lineHeight: 1.65, maxWidth: 400, marginBottom: 26,
                  textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                }}
              >
                {game.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22, ease }}
                style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}
              >
                {/* Primary — filled white pill */}
                <motion.button
                  whileHover={{ scale: 1.04, opacity: 0.9 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${game.ytId}`, "_blank")}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "#fff", color: "#000",
                    border: "none", borderRadius: 999,
                    padding: "13px 26px",
                    fontSize: 13.5, fontWeight: 700, cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor">
                    <path d="M0 0L11 6.5L0 13V0Z" />
                  </svg>
                  Watch Trailer
                </motion.button>
              </motion.div>

              {/* Platforms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease }}
                style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}
              >
                {game.platforms.map((p) => (
                  <span key={p} style={{
                    fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)", fontWeight: 600,
                  }}>
                    {p}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* ── Progress bar & nav controls ── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "0 36px 26px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            {/* Segmented scrubber */}
            <div style={{ flex: 1, display: "flex", gap: 6, alignItems: "center" }}>
              {GAMES.map((g, i) => (
                <button
                  key={g.id}
                  onClick={() => goTo(i)}
                  style={{
                    flex: i === active ? 3 : 1,
                    height: 2.5, border: "none", cursor: "pointer",
                    borderRadius: 999, padding: 0,
                    background: "transparent",
                    position: "relative", overflow: "hidden",
                    transition: "flex 0.5s ease",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.2)", borderRadius: 999 }} />
                  {i === active && (
                    <motion.div
                      style={{
                        position: "absolute", top: 0, left: 0, bottom: 0,
                        background: game.barColor, borderRadius: 999,
                        width: `${progress}%`,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Controls */}
            {GAMES.length > 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {[
                  { icon: <ChevronLeft size={14} />, onClick: prev_ },
                  { icon: <ChevronRight size={14} />, onClick: next },
                  { icon: paused ? <Play size={11} /> : <Pause size={11} />, onClick: () => setPaused((p) => !p) },
                ].map((btn, i) => (
                  <motion.button
                    key={i}
                    onClick={btn.onClick}
                    whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: 30, height: 30,
                      border: "1px solid rgba(255,255,255,0.14)",
                      borderRadius: "50%", background: "rgba(0,0,0,0.45)",
                      color: "rgba(255,255,255,0.75)", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {btn.icon}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
