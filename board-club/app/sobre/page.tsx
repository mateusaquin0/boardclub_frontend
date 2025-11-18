// /app/sobre/page.js

import { Handshake, Zap, Target, Leaf, Package, Users } from "lucide-react";

export default function SobrePage() {
  const primaryColor = "text-emerald-800";
  const headerBgColor = "bg-[#F7FEE7]";
  const lightBgColor = "bg-[#F7FEE7]"; // Cor oficial de fundo (aplicada em quase todas as seções)

  // MVV Adaptado ao Modelo de Assinatura
  const mvvData = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Democratizar o acesso aos melhores jogos de tabuleiro, proporcionando variedade e conveniência sem a barreira do alto custo de compra.",
      iconClass: "text-yellow-600",
    },
    {
      icon: Users,
      title: "Comunidade",
      description:
        "Construir uma comunidade engajada e sustentável, onde a paixão pelo jogo se conecta com a praticidade da tecnologia e da logística.",
      iconClass: "text-blue-500",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description:
        "Promover um consumo mais consciente, reduzindo o desperdício e a ociosidade dos jogos que ficam parados na estante.",
      iconClass: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. SEÇÃO PRINCIPAL / CABEÇALHO */}
      <header className={`py-20 text-center ${headerBgColor}`}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className={`text-5xl font-extrabold mb-4 ${primaryColor}`}>
            O Board Club: Jogue Mais, Gaste Menos
          </h1>
          <p className={`text-xl font-medium ${primaryColor}`}>
            Somos o serviço de assinatura que revoluciona o entretenimento,
            oferecendo acesso a um acervo variado de jogos de tabuleiro, direto
            na sua casa, de forma **acessível, sustentável e social**.
          </p>
        </div>
      </header>

      {/* 2. SEÇÃO O PROBLEMA E A SOLUÇÃO (MODIFICAÇÃO AQUI: Aplicando a cor de fundo oficial) */}
      <section className={`py-16 max-w-7xl mx-auto px-6 ${lightBgColor}`}>
        <h2 className={`text-3xl font-bold text-center mb-12 ${primaryColor}`}>
          A Revolução da Assinatura
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* O Problema (Mudando o fundo interno para bg-white para contraste) */}
          <div className="p-8 bg-white border-l-4 border-red-500 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-red-700 mb-3">
              O Problema Atual
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Alto custo de compra (R$ 300-600) impede a variedade.</li>
              <li>Jogos ficam parados após poucas partidas.</li>
              <li>
                Falta de uma solução de acesso recorrente e escalável no Brasil.
              </li>
            </ul>
          </div>

          {/* A Solução Board Club (Mudando o fundo interno para bg-white ou emerald-50 para contraste) */}
          <div className="p-8 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-emerald-700 mb-3">
              A Solução Board Club
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-800 font-semibold">
              <li>
                <Package size={18} className="inline mr-2" />
                Assinatura mensal com catálogo variado.
              </li>
              <li>
                <Zap size={18} className="inline mr-2" />
                Logística reversa simplificada (caixa reutilizável e pré-paga).
              </li>
              <li>
                <Handshake size={18} className="inline mr-2" />
                Garantia de devolução e gestão digital completa.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO PRINCÍPIOS (MVV) */}
      <section className={`py-16 ${lightBgColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${primaryColor}`}
          >
            Nossos Pilares
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {mvvData.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-white text-center"
              >
                <item.icon
                  size={40}
                  className={`${item.iconClass} mb-4 mx-auto`}
                />
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO DE CHAMADA PARA AÇÃO */}
      <section className="py-10 text-center bg-emerald-900 text-white">
        <h3 className="text-2xl font-bold mb-2">
          Encontre seu Ponto de Retirada!
        </h3>
        <p className="mb-6">
          Fácil retirada e devolução em nossos hubs parceiros.
        </p>
        <a
          href="/lojas"
          className="bg-yellow-400 text-emerald-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300 shadow-xl"
        >
          Explorar Lojas Parceiras
        </a>
      </section>
    </div>
  );
}
