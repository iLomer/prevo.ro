"use client";

import { useState } from "react";
import type { PlanInterval } from "@/lib/stripe/server";

export function UpgradeButton({
  interval,
  children,
  className,
}: {
  interval: PlanInterval;
  children: React.ReactNode;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "A aparut o eroare");
      }
    } catch {
      alert("A aparut o eroare. Incearca din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Se incarca..." : children}
    </button>
  );
}
