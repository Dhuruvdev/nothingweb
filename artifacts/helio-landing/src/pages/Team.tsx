import { motion } from "framer-motion";
import Footer from "../components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Team() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.1em" }}>
          ← HOME
        </a>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.2em" }}>NothingHide</span>
      </div>

      <main style={{ maxWidth: 800, margin: "100px auto", padding: "0 28px", textAlign: "center" }}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
        >
          <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: 24 }}>
            The Team
          </h1>
          <div style={{ fontSize: 11.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
             Coming Soon
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
