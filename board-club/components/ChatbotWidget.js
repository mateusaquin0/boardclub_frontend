"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Bot,
  ChevronRight,
  CornerDownRight,
} from "lucide-react";
import Link from "next/link";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const primaryBgColor = "bg-emerald-700";

  // --- MENSAGENS DE FLUXO (NOVAS) ---
  // 1. Mensagem de Boas-Vindas Completa (Aparece SÓ NA PRIMEIRA VEZ)
  const initialMessage = {
    sender: "bot",
    text: "Olá! Eu sou o Bot do Board Club. Escolha uma das opções abaixo para começar:",
    showOptions: true,
  };

  // 2. Mensagem de Prompt Curta (Aparece após cada resposta do Bot)
  const optionsOnlyMessage = {
    sender: "bot",
    text: "Escolha a próxima pergunta ou tema:",
    showOptions: true,
  };
  // ---------------------------------

  const options = [
    { text: "O que é o Board Club?", key: "ABOUT", type: "text" },
    { text: "Quanto custa a assinatura?", key: "COST", type: "text" },
    { text: "Como retiro/devolvo os jogos?", link: "/lojas", type: "link" },
    { text: "Ver o Catálogo Completo", link: "/jogos", type: "link" },
  ];

  const responses = {
    ABOUT:
      "O Board Club é um serviço de assinatura de jogos de tabuleiro, oferecendo acesso a um acervo variado por um valor mensal, sem necessidade de compra!",
    COST: "Nossos planos começam a partir de R$ 59,90/mês, oferecendo grande economia comparada à compra dos jogos. Você pode ver mais detalhes na nossa página 'Sobre Nós'!",
  };

  // Efeito para rolar o chat para o fim quando novas mensagens chegam
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Efeito para iniciar o chat com a mensagem de boas-vindas (SÓ SE O CHAT ESTIVER VAZIO)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOptionClick = (option) => {
    // 1. Adiciona a escolha do usuário ao histórico
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: option.text, showOptions: false },
    ]);

    // 2. Lógica de Redirecionamento (se for um link)
    if (option.type === "link") {
      // Se for link, apenas navegamos. Adicionamos uma mensagem de confirmação
      setTimeout(() => {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: `Redirecionando para a página de ${option.text.toLowerCase()}...`,
            showOptions: false,
          },
        ]);
      }, 300);
      return;
    }

    // 3. Lógica de Resposta de Texto (se for uma chave)
    if (option.type === "text") {
      const botResponse = responses[option.key];

      setTimeout(() => {
        // Adiciona a resposta do bot e reexibe o PROMPT CURTO com as opções
        setMessages((msgs) => [
          ...msgs,
          { sender: "bot", text: botResponse, showOptions: false },
          optionsOnlyMessage, // USANDO O NOVO PROMPT CURTO AQUI
        ]);
      }, 500);
    }
  };

  return (
    // Widget flutuante no canto inferior direito
    <div className="fixed bottom-4 right-4 z-50">
      {/* Janela do Chat */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200 mb-2">
          {/* Cabeçalho do Chat */}
          <div
            className={`p-3 ${primaryBgColor} text-white flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-yellow-400" />
              <h3 className="font-bold text-lg">Board Club Bot</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-200 hover:text-white transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index}>
                {/* Mensagem do Usuário ou do Bot */}
                <div
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-lg text-sm shadow-md ${
                      msg.sender === "user"
                        ? "bg-emerald-100 text-emerald-900 font-medium"
                        : "bg-white border text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Opções (aparecem apenas quando showOptions é true) */}
                {msg.showOptions && (
                  <div className="mt-3 space-y-2">
                    {options.map((option, optIndex) =>
                      // Se for um link, usa o componente Link do Next.js
                      option.type === "link" ? (
                        <Link
                          key={optIndex}
                          href={option.link}
                          onClick={() => handleOptionClick(option)}
                          className="block p-3 bg-white border border-emerald-300 text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors duration-150 text-sm font-semibold flex items-center justify-between"
                        >
                          {option.text}
                          <ChevronRight size={16} />
                        </Link>
                      ) : (
                        // Se for uma resposta de texto, usa um botão normal
                        <button
                          key={optIndex}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left p-3 bg-white border border-emerald-300 text-emerald-800 rounded-lg hover:bg-emerald-50 transition-colors duration-150 text-sm font-semibold flex items-center justify-between"
                        >
                          {option.text}
                          <CornerDownRight size={16} />
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Aviso no rodapé */}
          <div className="p-2 border-t text-xs text-center text-gray-500 bg-gray-100">
            Clique em uma opção acima para interagir.
          </div>
        </div>
      )}

      {/* Botão de Abrir/Fechar Chat (Posição fixa mantida) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg ${primaryBgColor} text-white flex items-center justify-center hover:shadow-xl transition-all duration-300`}
        aria-label="Abrir Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
