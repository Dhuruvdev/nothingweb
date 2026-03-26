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
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    heading: "Games",
    links: [
      { label: "THE DREAMROOMS", href: "https://youtu.be/ack1x4Hu-OQ" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Discord", href: "https://discord.gg/UfFzaEtu" },
      { label: "Twitter / X", href: "#" },
      { label: "YouTube", href: "https://www.youtube.com/channel/UCXbjWC6Ls-z9RGAObpyU-TA" },
      { label: "Twitch", href: "https://www.twitch.tv/nothinghide_" },
    ],
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
      className="relative overflow-hidden"
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Big Background Text */}
      <span
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-black pointer-events-none select-none whitespace-nowrap"
        style={{
          fontSize: "clamp(60px, 15vw, 250px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.03)",
          letterSpacing: "-0.04em",
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        NothingHide
      </span>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-10">

        {/* Main grid: stacks on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">

          {/* Brand col — full width on mobile */}
          <motion.div
            className="col-span-2 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease }}
          >
            <div className="text-base font-semibold text-white tracking-widest mb-3">
              NothingHide
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-[230px] mb-5">
              An independent game studio crafting worlds that demand to be explored.
            </p>

            {/* Business email */}
            <div className="mb-5">
              <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/28 mb-1.5">
                Business &amp; Official Queries
              </div>
              <a
                href="mailto:ownnothinghide@gmail.com"
                className="text-xs text-white/50 hover:text-white/90 transition-colors inline-flex items-center gap-1.5"
              >
                ownnothinghide@gmail.com
              </a>
            </div>

            {/* Newsletter form */}
            {isSuccess ? (
              <div className="text-sm text-white/50 px-3.5 py-2.5 border border-white/10 rounded-xl max-w-[260px]">
                You're on the list ✓
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative max-w-[260px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get studio updates"
                  required
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-white/25 rounded-xl px-3.5 py-2.5 pr-11 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-white/90 transition-colors cursor-pointer"
                >
                  {isPending
                    ? <Loader2 size={13} className="animate-spin" />
                    : <ArrowRight size={13} />}
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
              <div className="text-[11px] font-semibold text-white/50 tracking-[0.14em] uppercase mb-4">
                {col.heading}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-white/40 hover:text-white/85 transition-colors"
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
          className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <span className="text-xs text-white/25">
            © {new Date().getFullYear()} NothingHide Studio. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-white/25 hover:text-white/55 transition-colors"
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
