"use client";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 40, text: "text-2xl" },
};

export function Logo({ size = "md", showWordmark = true, className = "" }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="prevo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="#1c1917" />
        <path
          d="M 11 12 L 20 20 L 11 28"
          stroke="url(#prevo-grad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 19 12 L 28 20 L 19 28"
          stroke="url(#prevo-grad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
      </svg>
      {showWordmark && (
        <span className={`${text} font-medium tracking-tight`}>prevo</span>
      )}
    </span>
  );
}
