import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2, Mail } from "lucide-react";
import { useNewsletterSignup } from "@workspace/api-client-react";

const ease = [0.16, 1, 0.3, 1] as const;

const PERKS = [
  "Exclusive early access to all beta releases",
  "Weekly dev diaries — straight from the studio",
  "Behind-the-scenes art drops and game footage",
  "First to know about launch dates and new titles",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const { mutate, isPending, isSuccess } = useNewsletterSignup();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutate({ data: { email } });
  };

  return (
    <section
      id="studio"
      ref={sectionRef}
      style={{ padding: "110px 28px", background: "#0d0d0d", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%", height: "60%",
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", marginBottom: 22,
            padding: "5px 16px 5px 12px",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999,
          }}>
            <Mail size={11} style={{ opacity: 0.6 }} />
            Newsletter
          </div>

          <h2 style={{
            fontSize: "clamp(32px, 4.5vw, 54px)",
            fontWeight: 700, color: "#f5f5f5",
            letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 18,
          }}>
            Stay in<br />the loop
          </h2>

          <p style={{
            fontSize: 15, color: "rgba(255,255,255,0.48)",
            lineHeight: 1.7, maxWidth: 420, margin: "0 auto",
          }}>
            Join the NothingHide inner circle. Dev updates, early access
            drops, and exclusive game footage — delivered to your inbox.
          </p>
        </motion.div>

        {/* Perks list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "10px 32px",
            marginBottom: 48,
            maxWidth: 560, margin: "0 auto 48px",
          }}
        >
          {PERKS.map((perk, i) => (
            <motion.div
              key={perk}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease }}
              style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
            >
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "rgba(255,255,255,0.4)",
                flexShrink: 0, marginTop: 7,
              }} />
              <span style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                {perk}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Subscribe form / success state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 14, padding: "40px 28px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
                }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <CheckCircle2 size={24} color="#fff" />
                </motion.div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#f5f5f5", marginBottom: 8 }}>
                    You're in.
                  </div>
                  <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                    Welcome to the NothingHide inner circle. First dispatch drops soon.
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                {/* Email row */}
                <div style={{
                  width: "100%", maxWidth: 480,
                  display: "flex", gap: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${focused ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 14, padding: "6px 6px 6px 18px",
                  transition: "border-color 0.2s",
                }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      flex: 1, background: "transparent", border: "none",
                      fontSize: 14, color: "#fff", outline: "none",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  />
                  <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ scale: 1.03, opacity: 0.9 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: "#fff", color: "#000",
                      border: "none", borderRadius: 9,
                      padding: "11px 22px",
                      fontSize: 13.5, fontWeight: 700,
                      cursor: isPending ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: 8,
                      whiteSpace: "nowrap",
                      opacity: isPending ? 0.65 : 1,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {isPending
                      ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                      : <ArrowRight size={14} />
                    }
                    {isPending ? "Subscribing…" : "Subscribe"}
                  </motion.button>
                </div>

                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.28)", textAlign: "center" }}>
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            textAlign: "center", marginTop: 40,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}
        >
          {/* Avatars */}
          <div style={{ display: "flex" }}>
            {["#6366f1","#8b5cf6","#ec4899","#f59e0b"].map((c, i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: "50%",
                background: `linear-gradient(135deg, ${c} 0%, rgba(0,0,0,0.3) 100%)`,
                border: "1.5px solid #0d0d0d",
                marginLeft: i > 0 ? -8 : 0,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.38)" }}>
            Join <strong style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>12,400+</strong> players already subscribed
          </span>
        </motion.div>
      </div>
    </section>
  );
}
