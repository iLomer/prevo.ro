import { WaitlistForm } from "@/components/waitlist";

export function WaitlistSection() {
  return (
    <section id="lista-asteptare" className="relative bg-secondary-900 px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-secondary-400">
          Lista de asteptare
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Fii printre primii care testeaza Prevo
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-secondary-400">
          Inscrie-te si vei fi notificat cand lansam.
          Primii inscrisi vor beneficia de conditii speciale la lansare.
        </p>
        <div className="mt-8">
          <WaitlistForm variant="dark" />
        </div>
        <p className="mt-5 text-xs text-secondary-500">
          Nu trimitem spam. Doar un email cand lansam.
        </p>
      </div>
    </section>
  );
}
