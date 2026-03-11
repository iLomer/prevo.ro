import { WaitlistForm } from "@/components/waitlist";

export function WaitlistSection() {
  return (
    <section
      id="lista-asteptare"
      className="bg-primary-600 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Fii printre primii care testeaza Fiskio
        </h2>
        <p className="mt-4 text-lg text-primary-100">
          Inscrie-te pe lista de asteptare si vei fi notificat cand lansam.
          Primii inscrisi primesc acces gratuit la planul Anual pentru 3 luni.
        </p>
        <div className="mt-8">
          <WaitlistForm />
        </div>
        <p className="mt-4 text-xs text-primary-300">
          Nu trimitem spam. Doar un email cand lansam.
        </p>
      </div>
    </section>
  );
}
