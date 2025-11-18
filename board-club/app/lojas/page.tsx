// /app/lojas/page.js

import { MapPin, ArrowRight } from "lucide-react";

export default function ListaLojasPage() {
  const primaryColor = "text-emerald-800";
  const accentColor = "bg-yellow-400";
  const headerBgColor = "bg-[#F7FEE7]";
  const lightBgColor = "bg-[#F7FEE7]"; // Cor oficial de fundo

  // Dados fictícios das lojas
  const lojas = [
    // Link da Torre de Marfim APONTANDO para a rota estática /lojas/torre
    {
      id: 2,
      nome: "Bravo Jogos",
      endereco: "Rua Coronel Alfredo Flaquer, 411, Centro - Santo André/SP",
      link: "/lojas/torre",
    },

    // Links para as outras lojas (você criará as pastas covil e mundo depois)
    {
      id: 1,
      nome: "Omniverse",
      endereco: "Rua Comendador Eduardo Saccab, 180, Brooklin - São Paulo/SP",
      link: "/lojas/covil",
    },
    {
      id: 3,
      nome: "Place Games",
      endereco: "R. Martim Francisco, 554 - Santa Paula - São Caetano do Sul/SP",
      link: "/lojas/mundo",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. SEÇÃO PRINCIPAL / CABEÇALHO */}
      <header className={`py-16 text-center ${headerBgColor}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className={`text-4xl font-bold mb-2 ${primaryColor}`}>
            Lojas Parceiras Board Club
          </h1>
          <p className={`text-lg font-medium ${primaryColor}`}>
            Pontos de retirada e devolução para sua comodidade.
          </p>
        </div>
      </header>

      {/* 2. LISTA DE LOJAS */}
      <section className={`py-12 ${lightBgColor}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-8 ${primaryColor}`}>
            Hubs Destaque
          </h2>

          <div className="space-y-4">
            {lojas.map((loja) => (
              <div
                key={loja.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border-l-4 border-emerald-500"
              >
                {/* Informações da Loja */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {loja.nome}
                  </h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <MapPin size={16} className="text-emerald-600" />
                    {loja.endereco}
                  </p>
                </div>

                {/* Botão de Ação (Aponta para o link estático da loja) */}
                <a
                  href={loja.link}
                  className={`py-2 px-4 text-sm ${accentColor} text-emerald-900 font-semibold rounded-full hover:bg-yellow-300 transition duration-300 flex items-center gap-1`}
                >
                  Ver Loja
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé ou CTA */}
      <section className={`py-8 text-center ${lightBgColor}`}>
        <p className="text-gray-700">Mais lojas serão adicionadas em breve!</p>
      </section>
    </div>
  );
}
