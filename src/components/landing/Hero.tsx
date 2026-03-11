export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 inline-block rounded-full bg-accent-100 px-4 py-1.5 text-sm font-medium text-accent-700">
          Prima platforma de educatie fiscala din Romania
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-secondary-900 sm:text-5xl lg:text-6xl">
          Ultima data cand ai nevoie de un contabil
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-secondary-600 sm:text-xl">
          Nu mai plati lunar pentru ceva ce poti invata in cateva ore.
          Fiskio iti arata exact ce declaratii ai, cand le depui si cat datorezi
          &mdash; fara frica de greseli, fara surprize de la ANAF.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#lista-asteptare"
            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto"
          >
            Inscrie-te pe lista de asteptare
          </a>
          <a
            href="#cum-functioneaza"
            className="inline-flex w-full items-center justify-center rounded-lg border border-secondary-300 bg-white px-8 py-3.5 text-base font-semibold text-secondary-700 shadow-sm transition-colors hover:bg-secondary-50 sm:w-auto"
          >
            Afla cum functioneaza
          </a>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-2 text-sm text-secondary-500">
            <svg className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Gratuit pentru calendar fiscal
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-500">
            <svg className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Fara abonament obligatoriu
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-500">
            <svg className="h-5 w-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Pentru PFA si SRL
          </div>
        </div>
      </div>
    </section>
  );
}
