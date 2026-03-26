import { z } from "zod";

export const healthStatusSchema = z.object({
  status: z.string(),
});

export const newsletterSignupRequestSchema = z.object({
  email: z.string().email(),
});

export const newsletterSignupResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const demoRequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().optional(),
});

export const demoRequestResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
});

export type HealthStatus = z.infer<typeof healthStatusSchema>;
export type NewsletterSignupRequest = z.infer<typeof newsletterSignupRequestSchema>;
export type NewsletterSignupResponse = z.infer<typeof newsletterSignupResponseSchema>;
export type DemoRequestBody = z.infer<typeof demoRequestBodySchema>;
export type DemoRequestResponse = z.infer<typeof demoRequestResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
