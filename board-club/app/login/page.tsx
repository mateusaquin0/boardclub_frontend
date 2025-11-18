"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; 
// Importa a função que se comunica com o Route Handler /api/login
import { fazerLogin } from "@/services/usuarioService"; // Ajuste o caminho

// Tipagem básica para os dados do formulário de login
interface LoginData {
  email: string;
  senha: string;
}


export default function LoginPage() {
  const router = useRouter(); 
    
  // Estados para gerenciar o formulário
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    senha: "", 
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

  // Handler para submissão do formulário
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const result = await fazerLogin(formData);

      if (result.success && result.user?.token) { // Verifica se o login foi bem-sucedido e o token existe
        
        // 🎯 AÇÃO CHAVE: Salvar o token no armazenamento local
        // Usamos uma chave padronizada como 'authToken'
        localStorage.setItem('authToken', result.user.token); 
        
        setMessage({ type: 'success', text: `Login bem-sucedido! Redirecionando...` });
        
        // Redirecionamento após o login
        setTimeout(() => {
            router.push('/jogos'); 
        }, 1500); 

      } else {
        setMessage({ type: 'error', text: result.message || 'Erro desconhecido.' });
      }
    } catch (error) {
        // ... (tratamento de erro)
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7FEE7] font-sans">
      <main className="flex w-full max-w-sm flex-col items-center justify-start py-12 px-8 bg-white shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Acessar Sua Conta
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
              
              {/* Campo Email */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">Email</h3>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="teste@exemplo.com"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Campo Senha */}
              <div className="bg-white border border-zinc-300 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-1 text-black">Senha</h3>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Sua senha"
                  required
                  className="w-full p-2 border border-zinc-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Botão de Ação */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-3 rounded-lg transition duration-150 mt-4 
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#004F3B] hover:bg-[#003D2E] text-white'}`
                }
              >
                {loading ? 'ENTRANDO...' : 'FAZER LOGIN'}
              </button>
            </div>
          </section>
        </form>

        <div className="mt-6 text-sm text-center">
          <a
            href="/cadastro" 
            className="text-blue-600 hover:text-blue-800 transition duration-150"
          >
            Não tem uma conta? Cadastre-se
          </a>
        </div>
        <div className="mt-6 text-sm text-center">
          <a
            href="/adm/login" 
            className="text-blue-600 hover:text-blue-800 transition duration-150"
          >
            Acesso Administrativo
          </a>
        </div>
      </main>
    </div>
  );
}