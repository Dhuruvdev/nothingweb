import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { demoRequestsTable } from "@workspace/db/schema";
import { DemoRequestBody } from "@workspace/api-zod";

const router: IRouter = Router();

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

router.post("/request", async (req: Request, res: Response) => {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  const parsed = DemoRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please provide a valid name and email." });
    return;
  }

  try {
    await db.insert(demoRequestsTable).values({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company ?? null,
      message: parsed.data.message ?? null,
    });
    res.json({ success: true, message: "Your demo request has been received. We'll be in touch shortly!" });
  } catch (err) {
    console.error("Demo request error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
