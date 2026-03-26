import { motion } from "framer-motion";
import Footer from "../components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const BLOG_POSTS = [
  {
    title: "Revealing THE DREAMROOMS Gameplay First Look",
    date: "March 20, 2026",
    tag: "News",
    excerpt: "A hauntingly beautiful first look into the shifting corridors of THE DREAMROOMS."
  },
  {
    title: "How NothingHide is Redefining Horror Boundaries",
    date: "March 12, 2026",
    tag: "Press",
    excerpt: "A deep dive into the psychological thriller elements that set our studio apart."
  },
];

export default function Blog() {
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
            Blog
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 64 }}>
            The latest dispatches from NothingHide.
          </p>

          <div style={{ display: "grid", gap: 64 }}>
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (i + 1), ease }}
                style={{
                  paddingBottom: 48,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                }}
              >
                <div style={{
                  fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)", fontWeight: 600, marginBottom: 12,
                }}>
                  {post.tag} · {post.date}
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>{post.title}</h2>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                  {post.excerpt}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
