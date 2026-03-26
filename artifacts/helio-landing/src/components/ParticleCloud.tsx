import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacityBase: number;
  phase: number;
}

/**
 * Grid-sampled apple shape — fills the silhouette densely and evenly.
 * Returns points inside an apple-like closed curve.
 */
function sampleAppleGrid(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  spacing: number
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];

  const x0 = cx - rx * 1.1;
  const x1 = cx + rx * 1.1;
  const y0 = cy - ry * 1.15;
  const y1 = cy + ry * 1.05;

  for (let gy = y0; gy < y1; gy += spacing) {
    for (let gx = x0; gx < x1; gx += spacing) {
      // Jitter each grid point slightly so it doesn't look artificial
      const jx = gx + (Math.random() - 0.5) * spacing * 0.6;
      const jy = gy + (Math.random() - 0.5) * spacing * 0.6;

      const px = jx - cx;
      const py = jy - cy;

      // Main ellipse body
      const inBody = (px / rx) ** 2 + ((py + ry * 0.05) / (ry * 1.0)) ** 2 < 1;

      // Top indent (characteristic apple dent at top-center)
      const dxI = px;
      const dyI = py + ry * 0.98;
      const inIndent = dxI * dxI + dyI * dyI < (rx * 0.22) ** 2;

      // Trim bottom slightly
      const tooLow = py > ry * 0.96;

      if (inBody && !inIndent && !tooLow) {
        pts.push({ x: jx, y: jy });
      }
    }
  }

  return pts;
}

export default function ParticleCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let animId: number;
    let W = 0;
    let H = 0;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      buildDots();
    };

    const buildDots = () => {
      const isMobile = W < 768;

      // On mobile: cloud sits upper-right so it clears the wider text block
      const cx = isMobile ? W * 0.72 : W * 0.62;
      const cy = isMobile ? H * 0.32 : H * 0.42;

      // Radius — a bit smaller on mobile so it doesn't bleed off screen
      const base = Math.min(W, H) * (isMobile ? 0.24 : 0.3);
      const rx = base * 0.85;
      const ry = base * 0.98;

      // Grid spacing — tighter on desktop for denser look
      const spacing = W > 900 ? 11 : 13;

      const positions = sampleAppleGrid(cx, cy, rx, ry, spacing);

      dots = positions.map((pt) => ({
        baseX: pt.x,
        baseY: pt.y,
        x: pt.x + (Math.random() - 0.5) * 100,
        y: pt.y + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.2 + 0.5,
        opacityBase: Math.random() * 0.35 + 0.55,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() * 0.001;

      for (const d of dots) {
        d.vx += (d.baseX - d.x) * 0.006;
        d.vy += (d.baseY - d.y) * 0.006;
        d.vx *= 0.94;
        d.vy *= 0.94;
        d.x += d.vx;
        d.y += d.vy;

        // Gentle per-dot brightness breathing
        const pulse = 0.78 + 0.22 * Math.sin(t * 0.9 + d.phase);
        const alpha = d.opacityBase * pulse;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", setup);
    setup();
    draw();

    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}
