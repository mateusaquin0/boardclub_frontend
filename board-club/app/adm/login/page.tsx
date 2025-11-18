// app/admin/login/page.tsx

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 🚨 Chama o Route Handler ESPECÍFICO de Login ADM
            const response = await fetch('/api/adm/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Login ADM bem-sucedido: Salva o token e, crucialmente, a role
                localStorage.setItem('authToken', result.user.token);
                localStorage.setItem('userRole', result.user.role); // ⬅️ Salva 'ADMIN'
                
                // Redireciona para o painel de administração
                router.push('/adm/dashboard'); 
            } else {
                setError(result.message || 'Login falhou. Verifique as credenciais ADM.');
            }
        } catch (err) {
            setError('Erro de conexão ou servidor.');
        } finally {
            setLoading(false);
        }
    };
    
    // Credenciais de teste:
    // Email: controle@boardclub.com.br
    // Senha: admboard123

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F7FEE7]">
            <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl">
                <h1 className="text-3xl font-bold text-center mb-2 text-red-700">Acesso Restrito</h1>
                <p className="text-center text-zinc-500 mb-8">Login de Administrador Institucional</p>

                {error && <p className="text-red-600 text-center mb-4 p-2 bg-red-50 rounded">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="E-mail Institucional"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={loading}
                        className="w-full p-3 border border-zinc-300 rounded focus:ring-red-500 focus:border-red-500"
                    />
                    <input
                        type="password"
                        placeholder="Senha Institucional"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        required
                        disabled={loading}
                        className="w-full p-3 border border-zinc-300 rounded focus:ring-red-500 focus:border-red-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition"
                    >
                        {loading ? 'VERIFICANDO ACESSO...' : 'LOGAR'}
                    </button>
                </form>
                
                <p className="text-center text-sm mt-4">
                    <Link href="/login" className="text-emerald-600 hover:text-emerald-800">
                        Voltar para Login de Cliente
                    </Link>
                </p>
            </div>
        </div>
    );
}