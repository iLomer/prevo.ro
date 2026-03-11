"use client";

import { useState, type FormEvent } from "react";
import { trackWaitlistSignup } from "@/components/landing/analytics-events";

type FormStatus = "idle" | "loading" | "success" | "error";

interface ApiResponse {
  message?: string;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = email.trim();

    if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
      setStatus("error");
      setMessage("Te rugam sa introduci o adresa de email valida.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data: ApiResponse = (await response.json()) as ApiResponse;

      if (response.ok) {
        setStatus("success");
        setMessage(data.message ?? "Te-am adaugat pe lista!");
        setEmail("");
        trackWaitlistSignup();
      } else {
        setStatus("error");
        setMessage(data.error ?? "A aparut o eroare. Incearca din nou.");
      }
    } catch {
      setStatus("error");
      setMessage("A aparut o eroare de retea. Incearca din nou.");
    }
  }

  return (
    <div>
      {status === "success" ? (
        <div className="rounded-lg bg-accent-50 p-4 text-center">
          <p className="text-base font-medium text-accent-700">{message}</p>
          <p className="mt-1 text-sm text-accent-600">
            Vei primi un email cand lansam Fiskio.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="waitlist-email" className="sr-only">
            Adresa de email
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            placeholder="adresa@email.ro"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            disabled={status === "loading"}
            className="flex-1 rounded-lg border-0 px-4 py-3 text-base text-secondary-900 shadow-sm ring-1 ring-white/20 placeholder:text-secondary-400 focus:ring-2 focus:ring-accent-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-accent-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:opacity-50"
          >
            {status === "loading" ? "Se trimite..." : "Inscrie-te"}
          </button>
        </form>
      )}

      {status === "error" && message && (
        <p className="mt-3 text-sm text-error-300">{message}</p>
      )}
    </div>
  );
}
