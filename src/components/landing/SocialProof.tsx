export function SocialProof() {
  return (
    <section className="bg-secondary-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
          Construim Fiskio impreuna cu voi
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
          Fiskio este in dezvoltare activa. Inscrie-te pe lista de asteptare si
          fii printre primii care vor testa platforma.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-secondary-200">
            <p className="text-4xl font-bold text-primary-600">700K+</p>
            <p className="mt-2 text-sm text-secondary-600">
              PFA-uri active in Romania care ar putea beneficia
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-secondary-200">
            <p className="text-4xl font-bold text-primary-600">30-100&euro;</p>
            <p className="mt-2 text-sm text-secondary-600">
              Cheltuiala lunara medie pe contabilitate PFA
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-secondary-200">
            <p className="text-4xl font-bold text-primary-600">2-3h</p>
            <p className="mt-2 text-sm text-secondary-600">
              Timp anual necesar cu Fiskio in loc de contabil
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-secondary-200 bg-white p-8">
          <blockquote className="text-lg leading-relaxed text-secondary-700 italic">
            &ldquo;Platesc 80 EUR pe luna pentru contabil si singura chestie pe care
            o face e sa depuna Declaratia Unica o data pe an. Restul anului nu
            stiu nici cat datorez, nici cand trebuie sa platesc.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-medium text-secondary-500">
            &mdash; Freelancer IT, PFA norma de venit
          </p>
        </div>
      </div>
    </section>
  );
}
