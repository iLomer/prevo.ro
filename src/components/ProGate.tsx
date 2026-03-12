"use client";

import { UpgradeButton } from "@/components/UpgradeButton";

export function ProGate({ feature }: { feature: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-background px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-primary-50 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-primary-600"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-foreground">
        {feature} este disponibil in planul Pro
      </h2>
      <p className="mt-2 max-w-sm text-sm text-secondary-500">
        Treci la Pro pentru acces complet la toate instrumentele fiscale.
      </p>
      <div className="mt-6 flex gap-3">
        <UpgradeButton
          interval="monthly"
          className="rounded-lg bg-secondary-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary-800"
        >
          39 lei/luna
        </UpgradeButton>
        <UpgradeButton
          interval="annual"
          className="rounded-lg border border-secondary-200 bg-white px-5 py-2.5 text-sm font-medium text-secondary-700 transition-colors hover:border-secondary-300"
        >
          299 lei/an
        </UpgradeButton>
      </div>
    </div>
  );
}
