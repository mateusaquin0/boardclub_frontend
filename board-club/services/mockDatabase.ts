// lib/mockDatabase.ts

export interface ReservaItem {
  id: number;
  nome: string;
  custoAssinatura: string;
}

// 🚨 NOVO TIPO: Estrutura da Reserva
export interface Reserva {
  id: string; // ID único da reserva
  dataRetirada: string;
  dataDevolucao: string;
  itens: ReservaItem[];
  status: 'Pendente' | 'Confirmada' | 'Finalizada';
  total: number;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string; // Senha em texto simples para a simulação
  token: string;
  telefone?: string; 
  endereco?: string;
  cpf?: string;
  reservas: Reserva[];
}

// 2. FORÇAR UMA VARIÁVEL GLOBAL (SINGLETON)
// Isso garante que todos os Route Handlers acessem a mesma lista.
const globalUserDB = global as unknown as { usersDB: User[] | undefined };

if (!globalUserDB.usersDB) {
  // Inicializa o banco de dados se ele ainda não existe no objeto global
  globalUserDB.usersDB = [
    // Usuário de teste fixo inicial
    {
      id: 'mock-001',
      nome: 'Usuário Teste Fixo',
      email: 'teste@exemplo.com',
      senha: 'senha123', 
      token: 'fixed-token',
      reservas: []
    }
  ];
}

// 3. Exporta a lista global
export const usersDB = globalUserDB.usersDB;

// 4. Funções utilitárias agora usam a lista global
export const findUserByEmail = (email: string) => {
  return usersDB.find(user => user.email === email);
};

export const addUser = (newUser: User) => {
  usersDB.push(newUser);
};