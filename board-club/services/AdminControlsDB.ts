// lib/AdminProfileDB.ts (NOVO ARQUIVO)

import { User as MasterUser, Reserva, usersDB as MasterUsersDB } from './mockDatabase';// Importa a tipagem de Reserva do DB principal

// Interface Mínima para o ADM (foco na autenticação)
export interface AdminUser {
    id: string;
    nome: string;
    email: string; // E-mail institucional
    senha: string; // Senha fixa
    token: string;
    role: 'ADMIN';
    // Opcionalmente, pode-se incluir dados de perfil se o painel ADM precisar
    reservas?: Reserva[]; 
}

// 🎯 Singleton: Garante que esta lista exista apenas uma vez no ambiente Next.js
const globalAdminDB = globalThis as unknown as { adminUserDB: AdminUser[] | undefined };

if (!globalAdminDB.adminUserDB) {
    // Inicializa a lista de ADMs APENAS com o perfil institucional
    globalAdminDB.adminUserDB = [
        {
            id: 'adm-control-001',
            nome: 'Controle de Pedidos',
            email: 'controle@boardclub.com.br', // ⬅️ E-mail Institucional Fixo
            senha: 'admboard123',             // ⬅️ Senha Fixa e Segura
            token: 'INSTITUTIONAL-ADM-TOKEN',
            role: 'ADMIN',
            reservas: []
        }
    ];
}

export const adminUserDB = globalAdminDB.adminUserDB;

// Função de busca dedicada
export const findAdminByEmail = (email: string): AdminUser | undefined => {
    return adminUserDB.find(user => user.email === email.trim());
};
export const updateOrderStatus = ({ orderId, newStatus }: { orderId: string, newStatus: Reserva['status'] }): boolean => {
    
    // 🚨 CORRIGIDO: Acessar a lista principal de usuários importada (MasterUsersDB)
    for (const user of MasterUsersDB || []) { 
        // NOTE: user deve ser do tipo MasterUser, não AdminUser
        const orderIndex = user.reservas.findIndex(r => r.id === orderId);
        
        if (orderIndex !== -1) {
            user.reservas[orderIndex].status = newStatus;
            return true;
        }
    }
    return false;
};