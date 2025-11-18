// app/api/user/route.ts

import { NextResponse } from 'next/server';
import { usersDB, User } from '@/services/mockDatabase'; // Importa o banco de dados compartilhado

// Token de mock que usamos para o login fixo
const VALID_TOKEN = 'fake-jwt-token-login-fixed';

// Função auxiliar para encontrar o usuário pelo token (simulando a decodificação do JWT)
const findUserByToken = (token: string): User | undefined => {
    // Para simplificar, assumimos que o token fixo corresponde ao primeiro usuário
    if (token === VALID_TOKEN && usersDB.length > 0) {
        return usersDB[0];
    }
    // Em um app real, você buscaria o usuário que possui este token no DB
    return usersDB.find(user => user.token === token);
};

export async function GET(request: Request) {
    try {
        // 1. Extrair o token do cabeçalho de Autorização (padrão Bearer)
        const authorization = request.headers.get('Authorization');
        
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Token não fornecido.' }, { status: 401 });
        }

        const token = authorization.substring(7); // Remove "Bearer "

        // 2. Buscar o usuário usando o token
        const user = findUserByToken(token);

        if (!user) {
            return NextResponse.json({ message: 'Token inválido ou expirado.' }, { status: 401 });
        }

        // 3. Retornar os dados do usuário (sem a senha)
        const { senha, ...userData } = user;

        return NextResponse.json({ user: userData }, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}