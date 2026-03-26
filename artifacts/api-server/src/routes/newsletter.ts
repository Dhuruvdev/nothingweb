import { Router, type IRouter, type Request, type Response } from "express";
import { db } from "@workspace/db";
import { newsletterSubscribersTable } from "@workspace/db/schema";
import { NewsletterSignupBody } from "@workspace/api-zod";

const router: IRouter = Router();

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
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

router.post("/signup", async (req: Request, res: Response) => {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  const parsed = NewsletterSignupBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid email address." });
    return;
  }

  try {
    await db.insert(newsletterSubscribersTable).values({ email: parsed.data.email }).onConflictDoNothing();
    res.json({ success: true, message: "You've been successfully subscribed to Helio updates!" });
  } catch (err) {
    console.error("Newsletter signup error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
