import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-7xl font-bold text-secondary-900">404</h1>
      <p className="mt-4 text-lg text-secondary-500">
        Pagina pe care o cauti nu exista.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-secondary-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary-800"
      >
        Inapoi la pagina principala
      </Link>
      <div className="mt-16">
        <Logo size="sm" className="text-secondary-900" />
      </div>
    </div>
  );
}
