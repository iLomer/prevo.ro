import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiskio",
  description: "Prima platforma de educatie fiscala pentru PFA si SRL din Romania",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
