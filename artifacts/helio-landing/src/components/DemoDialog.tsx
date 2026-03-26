import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDemoRequest } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface DemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 10,
  padding: "11px 14px",
  fontSize: 13.5,
  color: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "'Inter', sans-serif",
};

export default function DemoDialog({ isOpen, onClose }: DemoDialogProps) {
  const { mutate, isPending, isSuccess, reset: resetMutation } = useDemoRequest();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const onSubmit = (data: FormValues) => {
    mutate({ data }, {
      onSuccess: () => {
        setTimeout(() => { onClose(); reset(); resetMutation(); }, 2800);
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.38, ease }}
            style={{
              position: "relative", zIndex: 1,
              width: "100%", maxWidth: 460,
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 22, padding: "36px 32px",
              fontFamily: "'Inter', -apple-system, sans-serif",
              overflow: "hidden",
            }}
          >
            {/* Ambient top glow */}
            <div style={{
              position: "absolute", top: -60, right: -60, width: 200, height: 200,
              background: "radial-gradient(circle, rgba(140,80,255,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 18, right: 18,
                background: "none", border: "none",
                color: "rgba(255,255,255,0.35)", cursor: "pointer",
                display: "flex", padding: 4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)")}
            >
              <X size={18} />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", padding: "24px 0" }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 18px",
                }}>
                  <CheckCircle2 size={26} color="#fff" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#f5f5f5", marginBottom: 10, letterSpacing: "-0.02em" }}>
                  You're in the queue
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                  We'll send your beta invite as soon as a slot opens up. Stay close.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 style={{ fontSize: 23, fontWeight: 700, color: "#f5f5f5", marginBottom: 6, letterSpacing: "-0.025em" }}>
                  Join the Beta
                </h2>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", marginBottom: 28, lineHeight: 1.6 }}>
                  Request early access to NothingHide's upcoming releases.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {/* Name */}
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                        Name
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Your name"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                      {errors.name && <span style={{ fontSize: 11, color: "#f87171", marginTop: 4, display: "block" }}>{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@email.com"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                      {errors.email && <span style={{ fontSize: 11, color: "#f87171", marginTop: 4, display: "block" }}>{errors.email.message}</span>}
                    </div>
                  </div>

                  {/* Platform */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                      Preferred Platform
                    </label>
                    <input
                      {...register("company")}
                      placeholder="PC, PS5, Xbox Series X…"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 7 }}>
                      Message (optional)
                    </label>
                    <textarea
                      {...register("message")}
                      rows={3}
                      placeholder="Which game are you most excited about?"
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ opacity: 0.88 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      marginTop: 6, background: "#fff", color: "#000",
                      border: "none", borderRadius: 10, padding: "13px 0",
                      fontSize: 14, fontWeight: 700, cursor: isPending ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      opacity: isPending ? 0.65 : 1,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {isPending && <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />}
                    {isPending ? "Submitting…" : "Request Beta Access"}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
