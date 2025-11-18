"use client";

import { useState, useEffect } from 'react';
import { Package, Gamepad, Calendar, Loader2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Importa o guardião de rota
import AuthGuard from '@/components/AuthGuard'; 
// Importa o serviço de busca de dados do usuário
import { fetchUserData } from '@/services/usuarioService';

// Tipo para a estrutura de reserva que definimos
interface Reserva {
    id: string;
    dataRetirada: string;
    dataDevolucao: string;
    itens: Array<{ nome: string, custoAssinatura: string }>;
    status: 'Pendente' | 'Confirmada' | 'Finalizada';
    total: number;
}

export default function ReservasPage() {
    const router = useRouter();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const primaryColor = "text-emerald-800";
    const headerBgColor = "bg-[#F7FEE7]";
    const lightBgColor = "bg-[#F7FEE7]";

    useEffect(() => {
        const loadReservas = async () => {
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                // O AuthGuard deve cuidar disso, mas é um bom fallback
                router.push('/login');
                return;
            }

            // Usamos o mesmo serviço de perfil para obter os dados, incluindo as reservas
            const user = await fetchUserData(token);

            if (user && user.reservas) {
                setReservas(user.reservas);
                setError(null);
            } else if (user === null) {
                // Se fetchUserData retornar null (ex: token inválido)
                setError("Sessão expirada. Faça login novamente.");
            } else {
                setReservas([]); // Usuário encontrado, mas sem reservas
            }
            setLoading(false);
        };

        loadReservas();
    }, [router]);

    // Função auxiliar para formatar datas (opcional)
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        // Formato brasileiro DD/MM/AAAA
        return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 size={32} className="animate-spin text-emerald-600" />
                <p className="ml-3 text-lg text-emerald-700">Carregando suas reservas...</p>
            </div>
        );
    }
    
    // Conteúdo principal da página (dentro do AuthGuard)
    return (
        <AuthGuard>
            <div className={`${lightBgColor} font-sans min-h-screen`}>
                <header className={`py-16 text-center ${headerBgColor}`}>
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className={`text-4xl font-bold mb-2 ${primaryColor}`}>
                            Minhas Reservas
                        </h1>
                        <p className={`text-lg font-medium ${primaryColor}`}>
                            Acompanhe o status dos seus jogos reservados.
                        </p>
                    </div>
                </header>

                <section className="py-12 w-full max-w-6xl mx-auto px-8">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-6 flex items-center">
                            <XCircle size={20} className="mr-2" /> {error}
                        </div>
                    )}

                    {reservas.length === 0 ? (
                        <div className="text-center py-10 bg-white p-8 rounded-xl shadow-lg border border-zinc-200">
                            <Package size={48} className="mx-auto mb-4 text-gray-400" />
                            <h2 className="text-2xl font-bold mb-3 text-zinc-700">
                                Você não possui reservas ativas!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Visite o catálogo para selecionar seus próximos jogos.
                            </p>
                            <a 
                                href="/jogos" 
                                className={`py-2 px-6 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-600 transition duration-300 shadow-md`}
                            >
                                Ver Catálogo
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reservas.map((reserva) => (
                                <div key={reserva.id} className="bg-white p-6 rounded-xl shadow-xl border border-zinc-200">
                                    <div className="flex justify-between items-start border-b pb-3 mb-3">
                                        <div>
                                            <h3 className={`text-xl font-bold ${primaryColor}`}>
                                                Reserva #{reserva.id.split('-')[1].toUpperCase()}
                                            </h3>
                                            <p className="text-sm text-zinc-500">Total: R$ {reserva.total.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                            reserva.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                            {reserva.status}
                                        </span>
                                    </div>
                                    
                                    {/* Detalhes da Reserva */}
                                    <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700 mt-3">
                                        <p className="flex items-center gap-2">
                                            <Calendar size={16} /> Retirada: 
                                            <span className="font-semibold">{formatDate(reserva.dataRetirada)}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar size={16} /> Devolução: 
                                            <span className="font-semibold">{formatDate(reserva.dataDevolucao)}</span>
                                        </p>
                                    </div>

                                    {/* Lista de Itens */}
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="font-semibold mb-2">Itens Reservados ({reserva.itens.length}):</p>
                                        <ul className="list-disc list-inside text-sm text-zinc-600 ml-4">
                                            {reserva.itens.map((item, index) => (
                                                <li key={index}>{item.nome} ({item.custoAssinatura})</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AuthGuard>
    );
}