import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "BoardClub - Aluguel de Jogos de Tabuleiro",
  description: "Alugue jogos de tabuleiro nas melhores lojas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased font-mono h-min-screen">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
