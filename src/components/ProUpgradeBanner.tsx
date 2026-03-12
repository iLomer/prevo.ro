"use client";

import { UpgradeButton } from "@/components/UpgradeButton";

export function ProUpgradeBanner() {
  return (
    <div className="rounded-xl border border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Treci la Pro
          </h3>
          <p className="mt-1 text-sm text-secondary-500">
            Monitor legislativ, estimator taxe, ghid D212 si multe altele.
          </p>
        </div>
        <div className="flex gap-2">
          <UpgradeButton
            interval="monthly"
            className="rounded-lg bg-secondary-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary-800"
          >
            39 lei/luna
          </UpgradeButton>
          <UpgradeButton
            interval="annual"
            className="rounded-lg border border-secondary-200 bg-white px-4 py-2 text-sm font-medium text-secondary-700 transition-colors hover:border-secondary-300"
          >
            299 lei/an
          </UpgradeButton>
        </div>
      </div>
    </div>
  );
}
