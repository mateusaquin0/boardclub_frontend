"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import { cadastrarUsuario } from "@/services/usuarioService"; // Ajuste o caminho

// 1. ATUALIZAÇÃO DA INTERFACE DO FORMULÁRIO (Adicionando os novos campos)
interface FormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string; // Novo
  endereco: string; // Novo
  cpf: string; // Novo
}

export default function CadastroPage() {
  const router = useRouter(); 
    
  // 2. INICIALIZAÇÃO DO ESTADO (Incluindo os novos campos vazios)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "", 
    telefone: "",
    endereco: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Handler para atualizar os estados dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler para submissão do formulário (Lógica de envio permanece a mesma)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // ... (restante da lógica de handleSubmit)
    try {
      const result = await cadastrarUsuario(formData);

      if (result.success) {
        setMessage({ type: 'success', text: `Cadastro de ${result.user?.nome} realizado com sucesso! Redirecionando...` });
        
        setTimeout(() => {
            router.push('/login'); 
        }, 1500); 

      } else {
        setMessage({ type: 'error', text: result.message || 'Erro desconhecido ao cadastrar.' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao tentar se conectar com o servidor.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7FEE7] font-sans">
      <main className="flex w-full max-w-xl flex-col items-center justify-start py-12 px-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Criar Nova Conta
        </h1>

        {/* Exibição de Mensagens de Status */}
        {message && (
          <div className={`w-full p-4 rounded-lg mb-6 text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="w-full">
          <section className="w-full">
            <div className="grid gap-6 sm:grid-cols-1">
              
              {/* Campo Nome de Usuário (Permanece) */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">
                  Nome de Usuário
                </h3>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Campo Email (Permanece) */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">Email</h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Campo Senha (Permanece) */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">Senha</h3>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Sua senha secreta"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 3. NOVO CAMPO: Telefone */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">Telefone</h3>
                <input
                  type="tel" // Tipo 'tel' para telefones
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(99) 99999-9999"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 4. NOVO CAMPO: CPF */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">CPF</h3>
                <input
                  type="text" // Tipo 'text' com formatação (se necessário)
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* 5. NOVO CAMPO: Endereço */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">Endereço Completo</h3>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  placeholder="Rua, Número, Bairro, Cidade"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Botão de Ação (Permanece) */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-3 rounded-lg transition duration-150 mt-4 
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#004F3B] hover:bg-[#003D2E] text-white'}`
                }
              >
                {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
              </button>
            </div>
          </section>
        </form>

        <div className="mt-6 text-sm text-center">
          <a
            href="/login" 
            className="text-blue-600 hover:text-blue-800 transition duration-150"
          >
            Já tem uma conta? Faça Login
          </a>
        </div>
      </main>
    </div>
  );
}