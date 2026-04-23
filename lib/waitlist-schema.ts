import { z } from "zod";

// Hungarian validation messages — surfaced under inputs
export const waitlistSchema = z.object({
  email: z
    .string({ required_error: "Kérjük, add meg az email címed." })
    .trim()
    .min(1, "Kérjük, add meg az email címed.")
    .email("Ellenőrizd az email címed — valami nem stimmel."),
  consent: z.literal(true, {
    errorMap: () => ({
      message:
        "A feliratkozáshoz el kell fogadnod az Adatvédelmi tájékoztatót.",
    }),
  }),
  // Honeypot — bots will fill this, humans won't
  website: z.string().max(0).optional().default(""),
  // Which form submitted the signup (for analytics)
  source: z.enum(["hero", "final_cta"]).default("hero"),
  // Consent text version + timestamp captured client-side; the server also records
  consentVersion: z.string().default("2026-04-v1"),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

// Narrow disposable-email check — keep the list short; the real filter lives on server
export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "trashmail.com",
  "throwaway.email",
  "yopmail.com",
]);
