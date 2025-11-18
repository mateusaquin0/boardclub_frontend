// app/api/cadastro/route.ts

import { NextResponse } from 'next/server';

// 1. Importar o banco de dados simulado e as funções utilitárias
// ATENÇÃO: Você DEVE ter criado este arquivo separado (ex: lib/mockDatabase.ts)
// para que o Cadastro e o Login compartilhem o mesmo estado.
import { findUserByEmail, addUser, User } from '@/services/mockDatabase'; // Ajuste o caminho conforme necessário


export async function POST(request: Request) {
  const { nome, email, senha, telefone, endereco, cpf } = await request.json();

  // 2. Simulação de validação de campos obrigatórios (a senha é crucial agora)
  if (!nome || !email || !senha || !telefone || !cpf) {
    return NextResponse.json(
      { success: false, message: "Todos os campos são obrigatórios." },
      { status: 400 } // Bad Request
    );
  }
  
  // 3. VERIFICAÇÃO DE UNICIDADE DO EMAIL
  // Usa a função do banco de dados central
  if (findUserByEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Este e-mail já está cadastrado. Tente fazer Login." },
      { status: 409 } // Conflict
    );
  }

  // 4. SE O EMAIL É ÚNICO: Cria o objeto do novo usuário
const novoUsuario: User = { 
    id: 'mock-cadastro-id-' + Math.random().toString(36).substring(7),
    nome: nome, 
    email: email, 
    senha: senha, 
    // 🚨 CORREÇÃO ESSENCIAL: Gerar um token único para cada novo usuário
    token: 'mock-token-' + Math.random().toString(36).substring(2) + Date.now(), 
    telefone: telefone, 
    endereco: endereco,
    cpf: cpf,
    reservas: []
  };
  // 5. SALVA NO BANCO DE DADOS COMPARTILHADO
  addUser(novoUsuario);

  // 6. Prepara o objeto de resposta (sem a senha, que não deve ir para o frontend)
  const { senha: _, ...userResponse } = novoUsuario;

  // Retorna 201 Created (simulando sucesso)
  return NextResponse.json(
    { success: true, user: userResponse },
    { status: 201 }
  );
}