import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNewsletterSignup } from "@workspace/api-client-react";

const ease = [0.16, 1, 0.3, 1] as const;

const cols = [
  {
    heading: "Studio",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "Press Kit", href: "/press" }
    ]
  },
  {
    heading: "Games",
    links: [
      { label: "THE DREAMROOMS", href: "https://youtu.be/ack1x4Hu-OQ" }
    ]
  },
  {
    heading: "Connect",
    links: [
      { label: "Discord", href: "https://discord.gg/UfFzaEtu" },
      { label: "Twitter / X", href: "#" },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCXbjWC6Ls-z9RGAObpyU-TA" },
      { label: "Twitch", href: "https://www.twitch.tv/nothinghide_" }
    ]
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess } = useNewsletterSignup();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutate({ data: { email } });
  };

  return (
    <footer
      ref={ref}
      id="press"
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "80px 28px 44px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Big Background Text */}
      <h2 style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%) translateY(-25%)",
        fontSize: "clamp(80px, 15vw, 250px)",
        fontWeight: 900,
        color: "rgba(255, 255, 255, 0.03)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        letterSpacing: "-0.04em",
        zIndex: 0,
        margin: 0
      }}>
        NothingHide
      </h2>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.7fr repeat(3, 1fr)",
          gap: 48, marginBottom: 64,
        }}>

          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "0.04em", marginBottom: 14 }}>
              NothingHide
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 230, marginBottom: 16 }}>
              An independent game studio crafting worlds that demand to be explored.
            </p>

            {/* Business email */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 6, fontWeight: 600 }}>
                Business &amp; Official Queries
              </div>
              <a
                href="mailto:ownnothinghide@gmail.com"
                style={{
                  fontSize: 12.5, color: "rgba(255,255,255,0.55)",
                  textDecoration: "none", transition: "color 0.2s",
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
              >
                ownnothinghide@gmail.com
              </a>
            </div>

            {/* Newsletter form */}
            {isSuccess ? (
              <div style={{
                fontSize: 13, color: "rgba(255,255,255,0.55)",
                padding: "10px 14px", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, maxWidth: 260,
              }}>
                You're on the list ✓
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ position: "relative", maxWidth: 260 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get studio updates"
                  required
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
                    padding: "10px 44px 10px 14px", fontSize: 13, color: "#fff",
                    outline: "none", transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  type="submit"
                  disabled={isPending}
                  style={{
                    position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                    width: 28, height: 28, background: "#fff", color: "#000",
                    border: "none", borderRadius: 7,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: isPending ? "not-allowed" : "pointer",
                    opacity: isPending ? 0.5 : 1,
                  }}
                >
                  {isPending ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <ArrowRight size={13} />}
                </button>
              </form>
            )}
          </motion.div>

          {/* Link columns */}
          {cols.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 * (ci + 1), ease }}
            >
              <div style={{
                fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20,
              }}>
                {col.heading}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} NothingHide Studio. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)")}
              >
                {l}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
