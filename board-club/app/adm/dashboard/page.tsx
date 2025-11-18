// app/admin/dashboard/page.tsx

"use client";
import { useState, useEffect } from 'react';
import { Loader2, Package, CheckCircle, Truck, RotateCw } from 'lucide-react';
import AdminAuthGuard from '@/components/AuthGuardADM';

const ADMIN_ORDERS_API = '/api/adm/order';

interface Order {
    reservaId: string;
    userName: string;
    userEmail: string;
    dataRetirada: string;
    dataDevolucao: string;
    total: number;
    status: 'Pendente' | 'Confirmada' | 'Finalizada';
    itemCount: number;
    gameNames: string;
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        setError('');
        const token = localStorage.getItem('authToken');

        if (!token) {
            setError("Token de autenticação ausente.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(ADMIN_ORDERS_API, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Falha ao carregar pedidos.');
            }

            const data = await response.json();
            setOrders(data.orders.sort((a: Order, b: Order) => a.status.localeCompare(b.status)));
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeStatus = async (orderId: string, newStatus: Order['status']) => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        if (!confirm(`Alterar status da reserva ${orderId.substring(0, 8)}... para ${newStatus}?`)) {
            return;
        }

        try {
            const response = await fetch(ADMIN_ORDERS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, newStatus, adminToken: token }),
            });

            const result = await response.json();

            if (response.ok) {
                setOrders(prev => prev.map(o =>
                    o.reservaId === orderId ? { ...o, status: newStatus } : o
                ));
                alert(result.message);
            } else {
                alert(result.message || 'Erro ao atualizar status.');
            }
        } catch {
            alert('Erro de conexão ao tentar atualizar o status.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusBadge = (status: Order['status']) => {
        switch (status) {
            case 'Confirmada':
                return (
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={14} /> Confirmada
                    </span>
                );
            case 'Finalizada':
                return (
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1">
                        <Package size={14} /> Finalizada
                    </span>
                );
            default:
                return <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Pendente</span>;
        }
    };

    // 🔍 FILTRO DE BUSCA
    const filteredOrders = orders.filter((order) => {
        const search = searchTerm.toLowerCase();
        return (
            order.reservaId.toLowerCase().includes(search) ||
            order.userName.toLowerCase().includes(search) ||
            order.userEmail.toLowerCase().includes(search)
        );
    });

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Cabeçalho */}
                    <header className="mb-8 border-b pb-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-red-700">Painel de Controle ADM</h1>
                            <p className="text-gray-600">Gerenciamento de todos os pedidos dos clientes.</p>
                        </div>

                        <button
                            onClick={fetchOrders}
                            className="flex items-center gap-2 py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                        >
                            <RotateCw size={18} /> Recarregar
                        </button>
                    </header>

                    {/* Campo de busca */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou ID da reserva..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-red-300"
                        />
                    </div>

                    {error && <div className="p-4 bg-red-100 text-red-700 rounded mb-4">Erro: {error}</div>}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 size={32} className="animate-spin text-red-700" />
                            <p className="ml-3 text-lg">Carregando pedidos...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
                            <Package size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="text-xl text-gray-600">Nenhum pedido encontrado.</p>
                        </div>
                    ) : (
                        <div className="shadow-lg rounded-xl overflow-hidden bg-white">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reserva ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Itens</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datas</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.reservaId}>
                                            <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs">
                                                {order.reservaId.substring(0, 8)}...
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {order.userName}
                                                <div className="text-xs text-gray-500 truncate">{order.userEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {order.itemCount} ({order.gameNames.substring(0, 20)}...)
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                Retirada: {order.dataRetirada}<br />
                                                Devolução: {order.dataDevolucao}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-emerald-800">
                                                R$ {order.total.toFixed(2).replace('.', ',')}
                                            </td>
                                            <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium">
                                                {order.status === 'Pendente' && (
                                                    <button
                                                        onClick={() => handleChangeStatus(order.reservaId, 'Confirmada')}
                                                        className="text-blue-600 hover:text-blue-900 mr-3 flex items-center gap-1"
                                                    >
                                                        <Truck size={14} /> Confirmar Envio
                                                    </button>
                                                )}
                                                {order.status === 'Confirmada' && (
                                                    <button
                                                        onClick={() => handleChangeStatus(order.reservaId, 'Finalizada')}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Finalizar
                                                    </button>
                                                )}
                                                {order.status === 'Finalizada' && (
                                                    <span className="text-gray-400">Completo</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminAuthGuard>
    );
}
