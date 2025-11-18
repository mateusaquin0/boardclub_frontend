// app/api/reservas/route.ts

import { NextResponse } from 'next/server';
import { usersDB } from '@/services/mockDatabase'; // Ajuste o caminho

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, itens, dataRetirada, dataDevolucao, total } = body;

        if (!token || !itens || !dataRetirada || !dataDevolucao || !total) {
            return NextResponse.json({ message: 'Dados incompletos para a reserva.' }, { status: 400 });
        }

        // 1. Encontrar o usuário pelo token
        const user = usersDB.find(u => u.token === token);

        if (!user) {
            return NextResponse.json({ message: 'Usuário não autenticado ou token inválido.' }, { status: 401 });
        }
        
        // 2. Criar novo objeto de reserva
        const novaReserva = {
            id: 'reserva-' + Date.now().toString(36) + Math.random().toString(36).substring(2),
            dataRetirada,
            dataDevolucao,
            itens,
            status: 'Pendente' as const, // Forçando o tipo para 'Pendente'
            total,
        };

        // 3. Adicionar a nova reserva ao usuário e salvar (no mock DB)
        user.reservas.push(novaReserva);

        console.log(`Nova reserva criada para ${user.email}. Total de reservas: ${user.reservas.length}`);
        
        // 4. Retornar sucesso
        return NextResponse.json({
            success: true,
            message: 'Reserva finalizada com sucesso.',
            reserva: novaReserva
        }, { status: 201 });

    } catch (error) {
        console.error("Erro ao finalizar reserva:", error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}