interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["Tip entitate", "Regim fiscal", "TVA", "Cod CAEN"];

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isComplete = step < currentStep;

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary-900 text-white"
                      : isComplete
                        ? "bg-accent-100 text-accent-700"
                        : "bg-secondary-100 text-secondary-400"
                  }`}
                >
                  {isComplete ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`mt-1.5 text-[11px] ${
                    isActive
                      ? "font-medium text-secondary-900"
                      : isComplete
                        ? "text-accent-600"
                        : "text-secondary-400"
                  }`}
                >
                  {STEP_LABELS[i]}
                </span>
              </div>
              {step < totalSteps && (
                <div
                  className={`mx-2 h-px flex-1 ${
                    isComplete ? "bg-accent-300" : "bg-secondary-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
