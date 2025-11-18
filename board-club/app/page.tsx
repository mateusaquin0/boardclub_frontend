import Image from "next/image";
import Link from "next/link";
import { DollarSign, Zap, Package, ArrowRight } from "lucide-react";

export default function Home() {
  const primaryColor = "text-emerald-800";
  const accentColor = "bg-yellow-400";
  const officialBgColor = "bg-[#F7FEE7]";
  const darkBgColor = "bg-emerald-900";

  // --- SEÇÃO DE DADOS (Omitida para concisão) ---
  const jogosPopulares = [
    {
      nome: "Monopoly",
      precoVarejo: "R$ 160,00",
      custoAssinatura: "R$ 20,00",
      desc: "O império é seu! Compre, negocie e leve seus adversários à falência.",
      src: "/monopoly.jpeg",
    },
    {
      nome: "Jogo da Vida",
      precoVarejo: "R$ 145,00",
      custoAssinatura: "R$ 18,00",
      desc: "Sua vida em um tabuleiro! Escolhas, carreira e família: viva uma jornada cheia de sorte e imprevistos.",
      src: "/jogo-da-vida.jpeg",
    },
    {
      nome: "Detetive",
      precoVarejo: "R$ 110,00",
      custoAssinatura: "R$ 15,00",
      desc: "Desvende o mistério! Quem, com qual arma e onde? Use a dedução para solucionar o crime antes de todos!",
      src: "/detetive.jpeg",
    },
  ];

  const beneficios = [
    {
      icon: DollarSign,
      title: "Economia Inteligente",
      desc: "Jogue todos os títulos que quiser sem gastar uma fortuna em compras.",
    },
    {
      icon: Zap,
      title: "Praticidade Total",
      desc: "Receba os jogos na porta de casa e use nossa logística reversa para devolver.",
    },
    {
      icon: Package,
      title: "Variedade Constante",
      desc: "Nosso catálogo é atualizado semanalmente, garantindo que você nunca fique sem novidades.",
    },
  ];
  // ------------------------------------

  return (
    <div className={`${officialBgColor} font-sans min-h-screen`}>
      <main className="w-full">
        {/* 1. SEÇÃO HERO (MAIOR IMPACTO) - SEM BORDAS ARREDONDADAS */}
        <section
          className={`py-24 md:py-32 ${darkBgColor} text-white`} // Removido rounded-b-xl e overflow-hidden
        >
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
            {/* Bloco de Texto Principal */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                Jogue Mais, Gaste Menos.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-emerald-100">
                O serviço de assinatura que entrega os melhores jogos de
                tabuleiro direto na sua casa.
              </p>

              {/* CTA Principal */}
              <Link
                href="/jogos"
                className={`py-3 px-8 ${accentColor} ${primaryColor} font-extrabold rounded-lg text-lg hover:bg-yellow-300 transition duration-300 shadow-xl inline-flex items-center gap-2`}
              >
                <Zap size={20} />
                Explorar Catálogo Agora!
              </Link>
            </div>

            {/* BLOCO DA IMAGEM: jovenjogando */}
            <div className="md:w-5/12 relative h-64 w-full md:h-80 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/jovenjogando.jpeg"
                alt="Quatro jovens adultos rindo e se divertindo com um jogo de tabuleiro moderno."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2. SEÇÃO DE DESTAQUES E BENEFÍCIOS */}
        <section className={`py-16 ${officialBgColor}`}>
          <div className="max-w-7xl mx-auto px-8">
            <h2
              className={`text-3xl font-bold text-center mb-12 ${primaryColor}`}
            >
              Por Que Escolher o Board Club?
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {beneficios.map((b, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-lg shadow-md border-t-4 border-emerald-500"
                >
                  <b.icon size={40} className="mx-auto mb-4 text-emerald-600" />
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {b.title}
                  </h3>
                  <p className="text-gray-600">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SEÇÃO DE CATÁLOGO (Cards com Preço Modificado) */}
        <section className="py-16 w-full max-w-7xl mx-auto px-8">
          <h2
            className={`text-3xl font-bold text-center mb-12 ${primaryColor}`}
          >
            Jogos Populares no Acervo
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jogosPopulares.map((jogo, index) => (
              <div
                key={index}
                className="bg-white border border-zinc-200 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:scale-[1.02]"
              >
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={jogo.src}
                    alt={`Capa do jogo ${jogo.nome}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${primaryColor}`}>
                    {jogo.nome}
                  </h3>
                  <p className="text-zinc-600 mb-4 h-12 overflow-hidden">
                    {jogo.desc}
                  </p>

                  <div className="flex items-center justify-between mt-4 border-t pt-4">
                    {/* BLOCO DO PREÇO */}
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-red-500 line-through">
                        {jogo.precoVarejo}
                      </span>
                      <span className="text-xl font-extrabold text-emerald-800">
                        {jogo.custoAssinatura}
                      </span>
                      <span className="text-xs text-gray-500">
                        (custo percebido na reserva)
                      </span>
                    </div>

                    {/* Botão Adicionar à Reserva */}
                    <button
                      className={`bg-emerald-800 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-md`}
                    >
                      Adicionar à Reserva
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/jogos"
              className={`text-lg font-semibold text-emerald-700 hover:text-emerald-900 transition duration-200 inline-flex items-center gap-1`}
            >
              Ver todo o Catálogo →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
