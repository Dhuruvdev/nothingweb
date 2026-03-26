import { lazy, Suspense, useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Games from "../components/Features";
import Membership from "../components/Pricing";
import Footer from "../components/Footer";
import BetaDialog from "../components/DemoDialog";
import GamesShowcase from "../components/GamesShowcase";

const ParticleCloud = lazy(() => import("../components/ParticleCloud"));

const ease = [0.16, 1, 0.3, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const NAV_LINKS = ["Games", "Studio", "Press", "Careers"];
const MARQUEE_TAGS = [
  "Open World",
  "Multiplayer",
  "Narrative-Driven",
  "Cross-Platform",
  "PC & Console",
  "AAA Quality",
  "Unreal Engine 5",
  "Community-First",
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isBetaOpen, setIsBetaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 600], [0, -130]);
  const rawO = useTransform(scrollY, [0, 400], [1, 0]);
  const particleY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const particleO = useSpring(rawO, { stiffness: 60, damping: 20 });
  const rawTY = useTransform(scrollY, [0, 500], [0, 80]);
  const textY = useSpring(rawTY, { stiffness: 60, damping: 20 });

  return (
    <div style={{ background: "#0d0d0d", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── STICKY NAV ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            key="sticky-nav"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 28px",
              background: "rgba(13,13,13,0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "0.08em" }}>
              NothingHide
            </span>
            <nav style={{ display: "flex", gap: 28 }}>
              {NAV_LINKS.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`}
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)")}
                >
                  {l}
                </a>
              ))}
            </nav>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsBetaOpen(true)}
              style={{
                fontSize: 12.5, color: "#fff", background: "transparent",
                border: "1px solid rgba(255,255,255,0.5)", borderRadius: 999,
                padding: "7px 20px", cursor: "pointer",
              }}
            >
              Join Beta
            </motion.button>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── HERO — Section 0 ── */}
      <section
        ref={heroRef}
        className="snap-section"
        style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
      >
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 28px",
          }}
        >
          <a href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>
            Home
          </a>
          <span style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            fontSize: 14, fontWeight: 500, color: "#fff", letterSpacing: "0.18em",
          }}>
            NothingHide
          </span>
          <motion.button
            whileHover={{ backgroundColor: "#fff", color: "#000", scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18 }}
            onClick={() => setIsBetaOpen(true)}
            style={{
              fontSize: 12.5, color: "#fff", background: "transparent",
              border: "1px solid rgba(255,255,255,0.55)", borderRadius: 999,
              padding: "7px 20px", cursor: "pointer",
            }}
          >
            Join Beta
          </motion.button>
        </motion.div>

        {/* Left sidebar nav */}
        <motion.nav
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease }}
          style={{
            position: "absolute", top: 52, left: 28, zIndex: 30,
            display: "flex", flexDirection: "column", gap: 14,
          }}
        >
          {NAV_LINKS.slice(1).map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`}
              style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")}
            >
              {label}
            </a>
          ))}
        </motion.nav>

        {/* Particle cloud */}
        <motion.div style={{ position: "absolute", inset: 0, zIndex: 10, y: particleY, opacity: particleO }}>
          <Suspense fallback={null}>
            <ParticleCloud />
          </Suspense>
        </motion.div>

        {/* Hero text — left-anchored, no right constraint so it's mobile-safe */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 68,
            left: 28,
            zIndex: 20,
            y: textY,
            maxWidth: "min(420px, calc(100vw - 56px))",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease }}
            style={{
              fontSize: "clamp(46px, 5.8vw, 72px)",
              fontWeight: 600, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "#f5f5f5",
              marginBottom: 14,
            }}
          >
            Nothing
            <br />
            to Hide
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease }}
            style={{
              fontSize: 13.5, color: "rgba(255,255,255,0.52)",
              lineHeight: 1.65, marginBottom: 24,
            }}
          >
            We craft a world where every pixel tells a story. An uncompromising
            experience built for players who demand the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56, ease }}
            style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "nowrap" }}
          >
            {/* Primary CTA — links to games section */}
            <motion.a
              href="#games-showcase"
              whileHover={{ opacity: 0.88, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: 13.5, fontWeight: 600, color: "#000",
                background: "#fff", border: "1px solid #fff",
                borderRadius: 999, padding: "11px 24px", cursor: "pointer",
                textDecoration: "none", whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              Explore Games
            </motion.a>

            {/* Secondary CTA — opens beta dialog */}
            <motion.button
              onClick={() => setIsBetaOpen(true)}
              whileHover={{ color: "#fff", borderColor: "rgba(255,255,255,0.55)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              style={{
                fontSize: 13.5, fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 999, padding: "11px 22px",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              Join Beta
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll cue — pinned to very bottom center, never overlaps content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{
              width: 20, height: 30, border: "1.5px solid rgba(255,255,255,0.18)",
              borderRadius: 999, display: "flex", justifyContent: "center", paddingTop: 5,
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1], y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ width: 3, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.4)" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

      {/* ── GAMES SHOWCASE — Section 1 (full viewport, scroll-snapped) ── */}
      <div className="snap-section">
        <GamesShowcase />
      </div>

      {/* ── MARQUEE ── */}
      <FadeUp>
        <div style={{ overflow: "hidden", padding: "48px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
            style={{ display: "flex", gap: 64, whiteSpace: "nowrap" }}
          >
            {[...Array(2)].map((_, round) =>
              MARQUEE_TAGS.map((t) => (
                <span key={`${round}-${t}`}
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", textTransform: "uppercase" }}
                >
                  {t}
                </span>
              ))
            )}
          </motion.div>
        </div>
      </FadeUp>



      {/* ── NEWSLETTER ── */}
      <FadeUp delay={0.05}><Membership /></FadeUp>

      {/* ── FOOTER ── */}
      <FadeUp delay={0.05}><Footer /></FadeUp>

      <BetaDialog isOpen={isBetaOpen} onClose={() => setIsBetaOpen(false)} />
    </div>
  );
}


