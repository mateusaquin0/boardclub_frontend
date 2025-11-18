import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";

import Navbar from "@/components/NavBar";
import ChatbotWidget from "@/components/ChatbotWidget";

// 🎯 IMPORTAÇÃO ESSENCIAL: O Provedor de Contexto do Carrinho
import { CartProvider } from "../context/cartContext"; // Ajuste o caminho se seu arquivo não estiver em '../contexts/CartContext'
import Footer from "@/components/Footer"; // Ajuste o caminho

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
        {/* 🚨 ENVOLVER COM O CARTPROVIDER: Agora, todas as páginas (children) 
            terão acesso ao estado global do carrinho. */}
        <CartProvider> 
          <Navbar />
          {/* Padding superior para a Navbar fixa */}
          <main className="p-6 pt-20">{children}</main>
          <ChatbotWidget />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}