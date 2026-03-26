import { motion } from "framer-motion";
import Footer from "../components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutUs() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#f5f5f5", fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation placeholder or return home */}
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
            About Us
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 48 }}>
            An independent game studio crafting worlds that demand to be explored.
          </p>

          <div style={{ display: "grid", gap: 32, fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
            <p>
              NothingHide was founded with a single mission: to create uncompromising experiences for players who demand the extraordinary. 
              We believe that every pixel should tell a story, and every mechanic should serve a deeper narrative.
            </p>
            <p>
              Based in the shadows of the digital realm, our team is composed of industry veterans and bold newcomers, all united by a passion 
              for psychological thriller and immersive gameplay.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
