"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 1. Verificar o token no lado do cliente
    const token = localStorage.getItem('authToken');

    if (token) {
      // Token encontrado: O usuário está "logado" para o protótipo
      setIsAuthenticated(true);
    } else {
      // Token não encontrado: Redirecionar para a página de login
      router.push('/login');
    }
  }, [router]); // Executa apenas uma vez, ao montar o componente

  // 2. Se o usuário estiver autenticado, renderiza o conteúdo da página.
  // Se ainda estiver verificando ou redirecionando, mostra uma tela de carregamento.
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p>Verificando acesso...</p>
      </div>
    );
  }

  return <>{children}</>;
}