const stats = [
  { value: "700K+", label: "PFA-uri active in Romania care ar putea beneficia" },
  { value: "30-100\u20AC", label: "Cheltuiala lunara medie pe contabilitate PFA" },
  { value: "2-3h", label: "Timp anual necesar cu Prevo in loc de contabil" },
] as const;

export function SocialProof() {
  return (
    <section className="relative bg-secondary-50/80 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-secondary-400">
          De ce conteaza
        </p>
        <h2 className="mt-4 max-w-lg text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
          Construim Prevo impreuna cu voi
        </h2>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="border-l-2 border-accent-300 pl-6"
            >
              <p className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-secondary-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-secondary-200 bg-white p-8 shadow-sm sm:p-10">
          <blockquote className="max-w-2xl text-xl leading-relaxed tracking-tight text-secondary-600 italic sm:text-2xl">
            &ldquo;Platesc 80 EUR pe luna pentru contabil si singura chestie pe care
            o face e sa depuna Declaratia Unica o data pe an. Restul anului nu
            stiu nici cat datorez, nici cand trebuie sa platesc.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-accent-400 to-primary-500" />
            <p className="text-sm text-secondary-400">
              Freelancer IT, PFA norma de venit
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
