"use client";

import { Package, Gamepad, Store, Trash2, X, Calendar, ArrowRight } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";
import { useCart } from '@/context/cartContext'; 
import { useState, useMemo } from "react"; 
import { useRouter } from 'next/navigation'; // Para redirecionar

export default function CarrinhoPage() {
    const { cart: itensCarrinho, removeItem, clearCart } = useCart();
    const router = useRouter();
    
    // Obter data de hoje (para data mínima)
    const today = new Date().toISOString().split('T')[0];

    // 🚨 ESTADOS DE DATA
    const [dataRetirada, setDataRetirada] = useState(today); // Default para hoje
    const [dataDevolucao, setDataDevolucao] = useState('');
    const [loading, setLoading] = useState(false);

    const primaryColor = "text-emerald-800";
    const primaryBgColor = "bg-emerald-800";
    const accentColor = "bg-yellow-400";
    const headerBgColor = "bg-[#F7FEE7]";
    const lightBgColor = "bg-[#F7FEE7]";
    const totalItens = itensCarrinho.length;

    // Cálculo do Total (usando useMemo para otimizar)
    const { subtotal, totalGeral } = useMemo(() => {
        const sub = itensCarrinho.reduce((acc, item) => {
            const value = parseFloat(item.custoAssinatura.replace('R$', '').replace(',', '.').trim());
            return acc + value;
        }, 0);
        const taxaReserva = 5.00;
        const total = sub + taxaReserva;
        return { subtotal: sub, totalGeral: total };
    }, [itensCarrinho]);

    const taxaReserva = 5.00; 
    
    // Função utilitária para obter o token (ADAPTE ISSO À SUA REALIDADE)
    const getUserToken = (): string | null => {
    // 🚨 CORREÇÃO AQUI: A chave correta é 'authToken'
    return localStorage.getItem('authToken'); 
};
    // 🎯 FUNÇÃO PARA FINALIZAR A RESERVA
    const handleFinalizarReserva = async () => {
        setLoading(true);
        const token = getUserToken();
        
        if (!token) {
            alert("Erro de autenticação. Por favor, faça login novamente.");
            setLoading(false);
            return;
        }

        if (!dataRetirada || !dataDevolucao) {
            alert("Por favor, selecione as datas de retirada e devolução.");
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch('/api/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    itens: itensCarrinho.map(item => ({ 
                        id: item.id, 
                        nome: item.nome, 
                        custoAssinatura: item.custoAssinatura 
                    })),
                    dataRetirada,
                    dataDevolucao,
                    total: totalGeral,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Reserva ${result.reserva.id} confirmada! Total: R$ ${totalGeral.toFixed(2).replace('.', ',')}`);
                clearCart(); // Limpar o carrinho após a reserva
                router.push('/reservas'); // Redirecionar para a página de reservas
            } else {
                alert(`Erro ao finalizar reserva: ${result.message}`);
            }

        } catch (error) {
            console.error("Erro na comunicação com a API:", error);
            alert("Não foi possível conectar ao servidor para finalizar a reserva.");
        } finally {
            setLoading(false);
        }
    };

    // --- RENDERIZAÇÃO DO CARRINHO VAZIO (permanece o mesmo) ---
    if (totalItens === 0) {
        // ... (JSX do carrinho vazio)
        return (
            <div className="min-h-screen">
                <header className={`py-16 text-center ${headerBgColor}`}>
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className={`text-4xl font-bold mb-2 ${primaryColor}`}>
                            Meu Carrinho
                        </h1>
                        <p className={`text-lg font-medium ${primaryColor}`}>
                            Selecione os jogos que deseja reservar e aproveite a diversão!
                        </p>
                    </div>
                </header>

                <section className={`py-20 ${lightBgColor}`}>
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <Package size={64} className={`mx-auto mb-6 text-gray-400`} />

                        <h2 className={`text-3xl font-bold mb-3 ${primaryColor}`}>
                            Seu Carrinho está Vazio!
                        </h2>

                        <p className="text-lg text-gray-700 mb-8">
                            Parece que você ainda não selecionou nenhum jogo para a sua próxima reserva.
                        </p>

                        <Link
                            href="/jogos"
                            className={`py-3 px-8 ${accentColor} ${primaryColor} font-bold rounded-full hover:bg-yellow-300 transition duration-300 shadow-lg flex items-center justify-center mx-auto max-w-sm gap-2 text-lg`}
                        >
                            <Gamepad size={20} />
                            Explorar Catálogo de Jogos
                        </Link>
                        
                        <div className="mt-12">
                            <p className="text-gray-600 mb-4 font-medium">
                                Ou veja as nossas lojas parceiras para retirada e devolução:
                            </p>
                            <Link
                                href="/lojas" 
                                className={`py-2 px-6 bg-emerald-700 text-white font-semibold rounded-full hover:bg-emerald-600 transition duration-300 shadow-md flex items-center justify-center mx-auto max-w-xs gap-2`}
                            >
                                <Store size={20} />
                                Ver Lojas Parceiras
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
    // --- FIM DO CARRINHO VAZIO ---

    // --- RENDERIZAÇÃO DO CARRINHO COM ITENS ---
    return (
        <div className="min-h-screen">
            <header className={`py-16 text-center ${headerBgColor}`}>
                <h1 className={`text-4xl font-bold mb-2 ${primaryColor}`}>
                    Seu Carrinho ({totalItens} Jogo{totalItens > 1 && 's'})
                </h1>
            </header>

            <section className={`py-12 ${lightBgColor}`}>
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* COLUNA ESQUERDA: LISTA DE ITENS */}
                    <div className="lg:col-span-2 space-y-4">
                        {itensCarrinho.map((item) => (
                             <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex items-center border border-zinc-200">
                                
                                <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                                    <Image 
                                        src={item.src} 
                                        alt={item.nome} 
                                        fill 
                                        sizes="64px" 
                                        className="rounded-lg object-cover" 
                                    />
                                </div>
                                
                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold text-zinc-800">{item.nome}</h2>
                                    <p className="text-sm text-zinc-500">Custo de Reserva (Assinatura)</p>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-xl font-bold text-emerald-800 mb-1">{item.custoAssinatura}</span>
                                    
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-150 flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Remover
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button 
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm mt-4 flex items-center gap-1"
                        >
                            <X size={16} /> Limpar Carrinho
                        </button>
                    </div>

                    {/* COLUNA DIREITA: SUMÁRIO E CHECKOUT */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-zinc-200 sticky top-4">
                            <h2 className="text-2xl font-bold mb-4 text-zinc-700">Resumo da Reserva</h2>
                            
                            {/* 🚨 CAMPOS DE DATA */}
                            <div className="mb-6 space-y-4">
                                <div>
                                    <label htmlFor="dataRetirada" className="text-sm font-semibold text-zinc-700 block mb-1 flex items-center gap-2">
                                        <Calendar size={18} /> Data de Retirada:
                                    </label>
                                    <input
                                        type="date"
                                        id="dataRetirada"
                                        value={dataRetirada}
                                        onChange={(e) => setDataRetirada(e.target.value)}
                                        min={today}
                                        required
                                        className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dataDevolucao" className="text-sm font-semibold text-zinc-700 block mb-1 flex items-center gap-2">
                                        <ArrowRight size={18} /> Data de Devolução:
                                    </label>
                                    <input
                                        type="date"
                                        id="dataDevolucao"
                                        value={dataDevolucao}
                                        onChange={(e) => setDataDevolucao(e.target.value)}
                                        // A devolução deve ser pelo menos no dia seguinte à retirada
                                        min={dataRetirada ? new Date(new Date(dataRetirada).getTime() + 86400000).toISOString().split('T')[0] : today}
                                        required
                                        className="w-full p-2 border border-zinc-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            {/* Detalhes do Custo */}
                            <div className="space-y-3 border-b pb-4 mb-4 text-zinc-600">
                                <div className="flex justify-between">
                                    <span>Subtotal ({totalItens} {totalItens > 1 ? 'itens' : 'item'}):</span>
                                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxa de Reserva:</span>
                                    <span>R$ {taxaReserva.toFixed(2).replace('.', ',')}</span>
                                </div>
                            </div>

                            {/* Total Geral */}
                            <div className="flex justify-between text-xl font-extrabold text-emerald-800 mb-6">
                                <span>Total:</span>
                                <span>R$ {totalGeral.toFixed(2).replace('.', ',')}</span>
                            </div>

                            {/* Botão Finalizar Reserva */}
                            <button
                                onClick={handleFinalizarReserva}
                                disabled={totalItens === 0 || !dataRetirada || !dataDevolucao || loading} 
                                className={`w-full py-3 text-white font-bold rounded-lg transition duration-300 shadow-xl flex items-center justify-center gap-2
                                    ${(totalItens === 0 || !dataRetirada || !dataDevolucao || loading) 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : `${primaryBgColor} hover:bg-emerald-700`
                                    }`
                                }
                            >
                                {loading ? 'PROCESSANDO...' : 'FINALIZAR RESERVA'}
                            </button>
                            
                            <p className="text-xs text-center text-zinc-500 mt-3">
                                Ao finalizar, sua reserva será salva no seu perfil.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}