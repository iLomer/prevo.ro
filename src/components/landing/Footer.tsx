import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-secondary-200 bg-secondary-100/50 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo size="sm" className="text-secondary-900" />
        <div className="flex items-center gap-6 text-xs text-secondary-400">
          <a href="#cum-functioneaza" className="transition-colors hover:text-secondary-600">Cum functioneaza</a>
          <a href="#preturi" className="transition-colors hover:text-secondary-600">Preturi</a>
          <a href="/termeni" className="transition-colors hover:text-secondary-600">Termeni si conditii</a>
          <a href="/confidentialitate" className="transition-colors hover:text-secondary-600">Politica de confidentialitate</a>
        </div>
        <p className="text-xs text-secondary-400">
          &copy; 2026 Prevo
        </p>
      </div>
    </footer>
  );
}
