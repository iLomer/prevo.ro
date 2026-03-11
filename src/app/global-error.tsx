"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ro">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f7] px-4 text-center">
          <h1 className="text-7xl font-bold text-[#1c1917]">500</h1>
          <p className="mt-4 text-lg text-[#78716c]">
            A aparut o eroare neasteptata.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 rounded-lg bg-[#1c1917] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#292524]"
          >
            Incearca din nou
          </button>
          <p className="mt-16 text-sm font-medium tracking-tight text-[#a8a29e]">prevo</p>
        </div>
      </body>
    </html>
  );
}
