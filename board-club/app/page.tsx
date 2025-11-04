import Image from "next/image";

// Componente principal: Usado como default export para ser renderizado pelo Next.js
export default function Home() {
  return (
    // Fundo BRANCO garantido em todos os modos.
    <div className="bg-[#F7FEE7] font-sans min-h-screen">
      <main className="flex w-full flex-col items-center justify-start py-16 px-8 bg-[#F7FEE7]">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nossos Jogos</h1>

        <section className="mt-8 w-full max-w-7xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Monopoly */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative w-full h-48">
                <Image
                  src="/monopoly.jpg"
                  alt="Capa do jogo Monopoly"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black">Monopoly</h3>
                <p className="text-zinc-600 mb-4">
                  O império é seu! Compre, negocie e leve seus adversários à
                  falência. Acha que consegue ser o maior magnata?
                </p>

                {/* NOVO BLOCO: Valor à esquerda e Botão à direita */}
                <div className="flex items-center justify-between mt-4">
                  {/* Valor do Jogo (Esquerda) */}
                  <span className="text-2xl font-bold text-gray-900">
                    R$ 160,00
                  </span>

                  {/* Botão (Direita) - COR PERSONALIZADA */}
                  <button className="bg-[#004F3B] hover:bg-[#003B2B] text-white font-semibold py-2 px-4 rounded-lg transition duration-150">
                    Alugar
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Jogo da Vida */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative w-full h-48">
                <Image
                  src="/jogo-da-vida.jpg"
                  alt="Capa do Jogo da Vida"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black">
                  Jogo da Vida
                </h3>
                <p className="text-zinc-600 mb-4">
                  Sua vida em um tabuleiro! Escolhas, carreira e família: viva
                  uma jornada cheia de sorte e imprevistos até a aposentadoria.
                </p>

                {/* NOVO BLOCO: Valor à esquerda e Botão à direita */}
                <div className="flex items-center justify-between mt-4">
                  {/* Valor do Jogo (Esquerda) */}
                  <span className="text-2xl font-bold text-gray-900">
                    R$ 145,00
                  </span>

                  {/* Botão (Direita) - COR PERSONALIZADA */}
                  <button className="bg-[#004F3B] hover:bg-[#003B2B] text-white font-semibold py-2 px-4 rounded-lg transition duration-150">
                    Alugar
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Detetive */}
            <div className="bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative w-full h-48">
                <Image
                  src="/detetive.jpg"
                  alt="Capa do jogo Detetive"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-black">Detetive</h3>
                <p className="text-zinc-600 mb-4">
                  Desvende o mistério! Quem, com qual arma e onde? Use a dedução
                  para solucionar o crime antes de todos!
                </p>

                {/* NOVO BLOCO: Valor à esquerda e Botão à direita */}
                <div className="flex items-center justify-between mt-4">
                  {/* Valor do Jogo (Esquerda) */}
                  <span className="text-2xl font-bold text-gray-900">
                    R$ 110,00
                  </span>

                  {/* Botão (Direita) - COR PERSONALIZADA */}
                  <button className="bg-[#004F3B] hover:bg-[#003B2B] text-white font-semibold py-2 px-4 rounded-lg transition duration-150">
                    Alugar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
