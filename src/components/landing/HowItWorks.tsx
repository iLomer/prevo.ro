const steps = [
  {
    number: "01",
    title: "Completeaza profilul fiscal",
    description:
      "In 5 minute ne spui ce tip de entitate ai (PFA/SRL), regimul fiscal, statutul TVA si codul CAEN. Atat.",
  },
  {
    number: "02",
    title: "Primesti calendarul tau personalizat",
    description:
      "Fiskio iti arata exact ce declaratii ai de depus, termenele limita si cat datorezi. Fara surprize.",
  },
  {
    number: "03",
    title: "Inveti pe masura ce faci",
    description:
      "Fiecare declaratie vine cu ghid interactiv: ce inseamna fiecare camp, cum completezi, ce sume treci. Tu depui, nu altcineva.",
  },
  {
    number: "04",
    title: "Devii independent fiscal",
    description:
      "Dupa primul ciclu fiscal, stii exact ce ai de facut. Fiskio ramane instrumentul tau, nu o dependenta.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="cum-functioneaza"
      className="bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            Cum functioneaza Fiskio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary-600">
            Nu facem noi in locul tau. Te invatam sa faci singur &mdash; si sa
            nu mai ai nevoie de nimeni.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-lg font-bold text-primary-700">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-secondary-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
