// app/api/adm/order/route.ts (CORRIGIDO E REVISADO)

import { NextResponse } from 'next/server';
// 🚨 Importa a lista principal de usuários e o tipo Reserva
import { usersDB, User, Reserva } from '@/services/mockDatabase'; 
// 🚨 Importa apenas o DB de Autenticação ADM
import { adminUserDB } from '@/services/AdminControlsDB';

// --- TIPOS DE DADOS ---
interface FullOrderView {
    reservaId: string;
    userName: string;
    userEmail: string;
    dataRetirada: string;
    dataDevolucao: string;
    total: number;
    status: Reserva['status'];
    itemCount: number;
    gameNames: string;
}
interface AdminUpdatePayload {
    orderId: string;
    newStatus: Reserva['status'];
    adminToken: string;
}

// 🎯 Route Handler GET: LISTAR TODOS OS PEDIDOS
export async function GET(request: Request) {
    try {
        const adminToken = request.headers.get('Authorization')?.substring(7);
        
        // 1. Verificação de Autorização ADM
        // Busca o ADM pelo token no DB de controle
        const adminUser = adminUserDB.find(u => u.token === adminToken && u.role === 'ADMIN');
        if (!adminUser) {
            return NextResponse.json({ message: 'Acesso negado. Token inválido.' }, { status: 403 });
        }

        // 2. Coleta e processa todos os pedidos de TODOS os usuários
        const allOrders: FullOrderView[] = [];

        usersDB.forEach(user => { 
            user.reservas.forEach(reserva => {
                allOrders.push({
                    reservaId: reserva.id,
                    userName: user.nome,
                    userEmail: user.email,
                    dataRetirada: reserva.dataRetirada,
                    dataDevolucao: reserva.dataDevolucao,
                    total: reserva.total,
                    status: reserva.status,
                    itemCount: reserva.itens.length,
                    gameNames: reserva.itens.map(item => item.nome).join(', '),
                });
            });
        });

        // Ordena para que os pendentes apareçam primeiro
        allOrders.sort((a, b) => a.status.localeCompare(b.status));

        return NextResponse.json({ orders: allOrders }, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar pedidos ADM:", error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}

// 🎯 Route Handler POST: ATUALIZAR STATUS
export async function POST(request: Request) {
    try {
        // 🚨 Desestrutura o payload de atualização
        const payload = await request.json() as AdminUpdatePayload;
        const { orderId, newStatus, adminToken } = payload;


        // 1. Autenticação (Verifica se o token pertence a um ADM)
        const adminUser = adminUserDB.find(u => u.token === adminToken && u.role === 'ADMIN');
        if (!adminUser) {
            return NextResponse.json({ message: 'Acesso negado. Token inválido.' }, { status: 403 });
        }

        // 2. Lógica de Atualização (Interage diretamente com o usersDB principal)
        let success = false;
        for (const user of usersDB) { // Itera sobre todos os usuários
            const orderIndex = user.reservas.findIndex(r => r.id === orderId);
            if (orderIndex !== -1) {
                // Atualiza o status
                user.reservas[orderIndex].status = newStatus; 
                success = true;
                break;
            }
        }

        if (!success) {
            return NextResponse.json({ message: `Reserva ${orderId} não encontrada.` }, { status: 404 });
        }

        // 3. Resposta de Sucesso
        return NextResponse.json({
            success: true,
            message: `Status da reserva ${orderId} alterado para ${newStatus}.`
        }, { status: 200 });

    } catch (error) {
        console.error("Erro ao processar atualização ADM:", error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}