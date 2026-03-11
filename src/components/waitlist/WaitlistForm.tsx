"use client";

import { useState, type FormEvent } from "react";
import { trackWaitlistSignup } from "@/components/landing/analytics-events";

type FormStatus = "idle" | "loading" | "success" | "error";

interface ApiResponse {
  message?: string;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const dark = variant === "dark";

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
        <div className={`rounded-lg border p-4 text-center ${dark ? "border-accent-700 bg-accent-900/30" : "border-accent-200 bg-accent-50"}`}>
          <p className={`text-base font-medium ${dark ? "text-accent-300" : "text-accent-700"}`}>{message}</p>
          <p className={`mt-1 text-sm ${dark ? "text-accent-400" : "text-accent-600"}`}>
            Vei primi un email cand lansam Prevo.
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
            className={`flex-1 rounded-lg border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 disabled:opacity-50 ${
              dark
                ? "border-secondary-700 bg-secondary-800 text-white placeholder:text-secondary-500 focus:border-accent-500 focus:ring-accent-500/20"
                : "border-secondary-300 bg-white text-secondary-900 placeholder:text-secondary-400 focus:border-primary-500 focus:ring-primary-500/20"
            }`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`rounded-lg px-6 py-3 text-base font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ${
              dark
                ? "bg-white text-secondary-900 hover:bg-secondary-100 focus-visible:outline-white"
                : "bg-secondary-900 text-white hover:bg-secondary-800 focus-visible:outline-secondary-500"
            }`}
          >
            {status === "loading" ? "Se trimite..." : "Inscrie-te"}
          </button>
        </form>
      )}

      {status === "error" && message && (
        <p className={`mt-3 text-sm ${dark ? "text-error-400" : "text-error-600"}`}>{message}</p>
      )}
    </div>
  );
}
