// components/AdminAuthGuard.tsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole'); // Pega a role salva no login ADM

    // Verifica se há token E se a role é 'ADMIN'
    if (token && role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      // Se não for ADM ou não tiver token, redireciona para a página de login ADM
      router.push('/admin/login'); 
    }
  }, [router]);

  if (!isAdmin) {
    // Tela de carregamento enquanto verifica
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50">
        <p className="text-red-700">Verificando permissões administrativas...</p>
      </div>
    );
  }

  return <>{children}</>;
}