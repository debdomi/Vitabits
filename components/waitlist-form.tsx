"use client";

import * as React from "react";
import { useState, useId, useRef } from "react";
import { Check, Loader2, Share2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { waitlistSchema } from "@/lib/waitlist-schema";

type Source = "hero" | "final_cta";
type Status = "idle" | "submitting" | "success" | "error";

interface WaitlistFormProps {
  source: Source;
  className?: string;
  tone?: "light" | "onGradient"; // onGradient = form sits on the green gradient
}

export function WaitlistForm({
  source,
  className,
  tone = "light",
}: WaitlistFormProps) {
  const emailId = useId();
  const consentId = useId();
  const helperId = useId();
  const errorId = useId();

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    consent?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const honeypotRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    setSubmitError(null);

    const parsed = waitlistSchema.safeParse({
      email,
      consent,
      website: honeypotRef.current?.value ?? "",
      source,
    });

    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next = {
        email: flat.email?.[0],
        consent: flat.consent?.[0],
      };
      setFieldErrors(next);
      // Focus the first invalid field
      if (next.email) emailRef.current?.focus();
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 429) {
          throw new Error(
            "Túl sok próbálkozás — próbáld újra pár perc múlva."
          );
        }
        if (data?.error === "disposable_email") {
          throw new Error(
            "Add meg egy állandó email címed — eldobható címet nem tudunk fogadni."
          );
        }
        throw new Error("Most nem tudtuk feldolgozni. Próbáld újra.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmitError(
        err instanceof Error ? err.message : "Ismeretlen hiba."
      );
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text =
      "Csatlakoztam a Vitabits várólistához — új generációs gumivitamin. Nézd meg:";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Vitabits", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* user cancelled; no-op */
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-card border border-brand-green/20 bg-white p-6 shadow-card",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-green-deep">
            <Check className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-semibold text-brand-green-deep">
              Üdv a várólistán! <span aria-hidden="true">🌱</span>
            </p>
            <p className="mt-1 text-body-md text-brand-ink-muted">
              Hamarosan hallasz felőlünk. Addig is — oszd meg egy barátoddal.
            </p>
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={share}
                aria-live="polite"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {copied ? "Link vágólapra másolva" : "Oszd meg egy barátoddal"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const emailInvalid = Boolean(fieldErrors.email);
  const consentInvalid = Boolean(fieldErrors.consent);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("w-full", className)}
      aria-label="Csatlakozz a Vitabits várólistához"
      data-source={source}
    >
      {/* Honeypot — hidden from humans, invisible to assistive tech */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label>
          Website (ne töltsd ki)
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label htmlFor={emailId} className="sr-only">
        Email cím
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id={emailId}
          ref={emailRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Add meg az email címed"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((f) => ({ ...f, email: undefined }));
            }
          }}
          invalid={emailInvalid}
          aria-describedby={cn(helperId, emailInvalid ? errorId : undefined)}
          className="sm:flex-1"
        />
        <Button
          type="submit"
          size="default"
          disabled={status === "submitting"}
          className="sm:h-12"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Küldés…
            </>
          ) : (
            "Csatlakozz a várólistához"
          )}
        </Button>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <input
          id={consentId}
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (fieldErrors.consent) {
              setFieldErrors((f) => ({ ...f, consent: undefined }));
            }
          }}
          aria-invalid={consentInvalid || undefined}
          aria-describedby={consentInvalid ? errorId : undefined}
          className={cn(
            "mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-brand-green/40 text-brand-green",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-green focus-visible:ring-offset-2",
            tone === "onGradient" ? "bg-white" : "bg-white"
          )}
        />
        <label
          htmlFor={consentId}
          className={cn(
            "text-sm leading-snug",
            tone === "onGradient"
              ? "text-brand-green-deep"
              : "text-brand-ink-muted"
          )}
        >
          Elfogadom az{" "}
          <a
            href="/adatvedelem"
            className="font-medium text-brand-green underline-offset-2 hover:underline"
          >
            Adatvédelmi tájékoztatót
          </a>{" "}
          és hozzájárulok, hogy a Vitabits emailben értesítsen az indulásról.
        </label>
      </div>

      <p
        id={helperId}
        className={cn(
          "mt-3 text-sm",
          tone === "onGradient"
            ? "text-brand-green-deep/80"
            : "text-brand-ink-muted"
        )}
      >
        Korai hozzáférés. Exkluzív frissítések. Spam nélkül.
      </p>

      {/* Error / field-level messaging, announced politely */}
      <div
        id={errorId}
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          "mt-3 space-y-1 text-sm text-destructive",
          !fieldErrors.email && !fieldErrors.consent && !submitError && "sr-only"
        )}
      >
        {fieldErrors.email && (
          <p className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {fieldErrors.email}
          </p>
        )}
        {fieldErrors.consent && (
          <p className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {fieldErrors.consent}
          </p>
        )}
        {submitError && (
          <p className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
