import { useQuery, useMutation } from "@tanstack/react-query";
import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { customFetch } from "../custom-fetch";

export type HealthStatus = {
  status: string;
};

export type NewsletterSignupRequest = {
  email: string;
};

export type NewsletterSignupResponse = {
  success: boolean;
  message: string;
};

export type DemoRequestBody = {
  name: string;
  email: string;
  company?: string;
  message?: string;
};

export type DemoRequestResponse = {
  success: boolean;
  message: string;
};

export type ErrorResponse = {
  error: string;
};

export const healthCheck = (): Promise<HealthStatus> => {
  return customFetch<HealthStatus>("/api/healthz");
};

export const useHealthCheck = <TData = HealthStatus>(
  options?: Omit<UseQueryOptions<HealthStatus, unknown, TData>, "queryKey" | "queryFn">,
) => {
  return useQuery<HealthStatus, unknown, TData>({
    queryKey: ["healthCheck"],
    queryFn: healthCheck,
    ...options,
  });
};

export const newsletterSignup = (
  body: NewsletterSignupRequest,
): Promise<NewsletterSignupResponse> => {
  return customFetch<NewsletterSignupResponse>("/api/newsletter/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const useNewsletterSignup = (
  options?: UseMutationOptions<NewsletterSignupResponse, ErrorResponse, NewsletterSignupRequest>,
) => {
  return useMutation<NewsletterSignupResponse, ErrorResponse, NewsletterSignupRequest>({
    mutationFn: newsletterSignup,
    ...options,
  });
};

export const demoRequest = (
  body: DemoRequestBody,
): Promise<DemoRequestResponse> => {
  return customFetch<DemoRequestResponse>("/api/demo/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const useDemoRequest = (
  options?: UseMutationOptions<DemoRequestResponse, ErrorResponse, DemoRequestBody>,
) => {
  return useMutation<DemoRequestResponse, ErrorResponse, DemoRequestBody>({
    mutationFn: demoRequest,
    ...options,
  });
};
