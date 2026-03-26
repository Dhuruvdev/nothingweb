import { motion } from "framer-motion";
import Footer from "../components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

export default function StudioPage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: "0.1em" }}>
          ← HOME
        </a>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.2em" }}>NothingHide</span>
      </div>

      <main style={{ maxWidth: 800, margin: "100px auto", padding: "0 28px" }}>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
        >
          <h1 style={{ fontSize: "clamp(40px, 8vw, 72px)", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: 32 }}>
            Studio
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 48 }}>
            NothingHide is a collective of creators, dreamers, and rule-breakers.
          </p>

          <div style={{ display: "grid", gap: 32, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
            <p>
              Operating from our independent headquarters, we focus on a single mantra: Nothing to Hide. 
              Our design process is transparent, our passion is uncompromising, and our goal is to redefine what it 
              means to be an independent studio in a rapidly evolving digital landscape.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
