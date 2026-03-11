import Link from "next/link";

interface SRLFeatureCard {
  title: string;
  description: string;
  href: string;
  iconColor: string;
  icon: React.ReactNode;
}

const SRL_FEATURE_CARDS: SRLFeatureCard[] = [
  {
    title: "Simulator Dividende",
    description:
      "Introdu suma bruta a dividendelor si vezi cat primesti net dupa impozit (5%) si CASS (daca se aplica).",
    href: "/srl/simulator-dividende",
    iconColor: "bg-accent-50 text-accent-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "CASS Dividende",
    description:
      "Verifica daca dividendele tale anuale depasesc pragul de 6 salarii minime si cat CASS datorezi.",
    href: "/srl/cass-dividende",
    iconColor: "bg-warning-50 text-warning-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Decizie Asociat Unic",
    description:
      "Genereaza automat decizia asociatului unic pentru distribuirea dividendelor, gata de semnat.",
    href: "/srl/decizie-asociat",
    iconColor: "bg-primary-50 text-primary-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Cash Flow Fiscal",
    description:
      "Vizualizeaza obligatiile fiscale trimestriale si planifica rezervele de numerar pentru impozitul micro.",
    href: "/srl/cash-flow",
    iconColor: "bg-error-50 text-error-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Calendar D100",
    description:
      "Vezi termenele trimestriale de depunere D100 si sumele estimate de plata pentru impozitul micro.",
    href: "/srl/cash-flow",
    iconColor: "bg-secondary-100 text-secondary-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

export function SRLDashboardCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SRL_FEATURE_CARDS.map((card) => (
        <Link
          key={card.href + card.title}
          href={card.href}
          className="group rounded-xl border border-secondary-200 bg-background p-5 transition-all hover:border-primary-300 hover:shadow-md"
        >
          <div className={`mb-3 inline-flex rounded-lg p-2.5 ${card.iconColor}`}>
            {card.icon}
          </div>
          <h2 className="text-base font-semibold text-foreground group-hover:text-primary-700">
            {card.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-secondary-500">
            {card.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
