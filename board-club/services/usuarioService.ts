// services/usuarioService.ts

// Define a URL base para chamar as APIs internas do Next.js
const API_BASE_URL = '/api'; 

// 1. ATUALIZAÇÃO: Adicionado telefone, endereco, cpf
interface AuthData {
  email: string;
  senha: string;
  nome?: string;
  telefone?: string; 
  endereco?: string;
  cpf?: string;
}
interface Reserva {
    id: string;
    dataRetirada: string;
    dataDevolucao: string;
    itens: Array<{ nome: string, custoAssinatura: string }>;
    status: 'Pendente' | 'Confirmada' | 'Finalizada';
    total: number;
}
interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    nome: string;
    email: string;
    token: string;
    // 2. ATUALIZAÇÃO: Adicionado telefone, endereco, cpf
    telefone?: string; 
    endereco?: string;
    cpf?: string;
  };
  message?: string;
}
/**
 * Simula o Cadastro de Usuário (chama POST /api/cadastro)
 */
export async function cadastrarUsuario(data: AuthData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result: AuthResponse = await response.json();
    
    if (!response.ok) {
      // Lança erro se o Route Handler retornar status de erro (4xx, 5xx)
      throw new Error(result.message || 'Falha ao cadastrar.');
    }

    return result;

  } catch (error) {
    console.error('Erro no serviço de cadastro:', error);
    // Retorna uma resposta de falha genérica
    return { success: false, message: (error as Error).message || 'Erro de rede.' };
  }
}

/**
 * Simula o Login de Usuário (chama POST /api/login)
 */
export async function fazerLogin(data: AuthData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Credenciais inválidas.');
    }

    return result; // Deve conter { success: true, user: ... }
  } catch (error) {
    console.error('Erro no serviço de login:', error);
    return { success: false, message: (error as Error).message || 'Erro de rede.' };
  }
}
interface UserData {
  id: string;
  nome: string;
  email: string;
  token: string;
  telefone?: string; 
  endereco?: string;
  cpf?: string;
  reservas: Reserva[];
  // Adicione outros dados mockados do seu perfil aqui (ex: plano, valorMensal)
  plano?: string;
  valorMensal?: string;
  proximaCobranca?: string;
  jogosAtuais?: any[];
  historicoRecente?: any[];
}

export async function fetchUserData(token: string): Promise<UserData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 🎯 Enviar o token no cabeçalho de Autorização
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Se 401, o token é inválido
      return null; 
    }

    const data = await response.json();
    return data.user;

  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
}