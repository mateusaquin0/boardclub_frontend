// app/api/admin/login/route.ts

import { NextResponse } from 'next/server';
import { findAdminByEmail } from '@/services/AdminControlsDB'; 

interface LoginRequestData {
    email: string;
    senha: string;
}

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Data recebida do frontend
        
        // 1. OBRIGATÓRIO: Limpar strings
        const email = (data.email || '').trim();
        const senha = (data.senha || '').trim();
        
        // 2. Buscar o usuário no DB de controle (findAdminByEmail DEVE usar .trim() internamente)
        const userFound = findAdminByEmail(email); 

        // LOGS (VERIFIQUE O TERMINAL!)
        console.log("Senha Salva (DB):", userFound?.senha);
        console.log("Senha Recebida:", senha);
        console.log("Comparação é:", userFound?.senha === senha);
        
        // 4. Verificação final
        if (userFound && userFound.senha === senha && userFound.role === 'ADMIN') {
            
            // Sucesso
            const responseUser = {
                id: userFound.id,
                nome: userFound.nome,
                email: userFound.email,
                token: userFound.token,
                role: userFound.role, 
            };

            return NextResponse.json({
                success: true,
                user: responseUser
            }, { status: 200 });
            
        } else {
            // Falha
            return NextResponse.json({ success: false, message: 'Acesso negado. Credenciais institucionais inválidas.' }, { status: 401 });
        }

    } catch (error) {
        console.error("Erro no Route Handler ADM Login:", error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}