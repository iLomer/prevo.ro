const tiers = [
  {
    name: "Gratuit",
    price: "0 lei",
    period: "pentru totdeauna",
    description: "Suficient ca sa nu mai ratezi un termen fiscal.",
    features: [
      "Calendar fiscal personalizat",
      "Alerte termen limita",
      "Biblioteca fiscala",
      "1 profil fiscal",
    ],
    cta: "Inscrie-te gratuit",
    highlighted: false,
  },
  {
    name: "Anual",
    price: "299 lei",
    period: "pe an (~25 lei/luna)",
    description: "Tot ce ai nevoie ca sa nu mai depinzi de contabil.",
    features: [
      "Tot din planul Gratuit",
      "Ghiduri interactive declaratii",
      "Calculator taxe automat",
      "Sincronizare e-Factura",
      "Alerte legislative",
      "Export fisiere gata de depus",
      "Simulator dividende (SRL)",
    ],
    cta: "Alege planul Anual",
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "799 lei",
    period: "plata unica",
    description: "Investitie o singura data, acces pentru totdeauna.",
    features: [
      "Tot din planul Anual",
      "Toate actualizarile viitoare",
      "Acces beta la functii noi",
      "Prioritate la suport",
    ],
    cta: "Alege Lifetime",
    highlighted: false,
  },
] as const;

export function Pricing() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            Preturi corecte pentru independenta fiscala
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
            Platesti 30-100 EUR/luna pentru contabil. Cu Fiskio, platesti sub 25
            lei/luna &mdash; si inveti sa nu mai ai nevoie de nimeni.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                tier.highlighted
                  ? "bg-primary-600 text-white shadow-xl ring-2 ring-primary-600"
                  : "bg-white shadow-sm ring-1 ring-secondary-200"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-4 py-1 text-xs font-semibold text-white">
                  Cel mai popular
                </div>
              )}

              <h3
                className={`text-lg font-semibold ${
                  tier.highlighted ? "text-white" : "text-secondary-900"
                }`}
              >
                {tier.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.highlighted ? "text-white" : "text-secondary-900"
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm ${
                    tier.highlighted ? "text-primary-200" : "text-secondary-500"
                  }`}
                >
                  {tier.period}
                </span>
              </div>

              <p
                className={`mt-4 text-sm ${
                  tier.highlighted ? "text-primary-100" : "text-secondary-600"
                }`}
              >
                {tier.description}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.highlighted ? "text-accent-300" : "text-accent-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className={
                        tier.highlighted ? "text-primary-100" : "text-secondary-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#lista-asteptare"
                className={`mt-8 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-white text-primary-700 hover:bg-primary-50"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
