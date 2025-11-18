// app/api/login/route.ts

import { NextResponse } from 'next/server';
// 1. Importar o banco de dados simulado
import { findUserByEmail } from '@/services/mockDatabase'; // Ajuste o caminho se necessário

// Remova as variáveis MOCK_EMAIL e MOCK_SENHA

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const email = data.email ? data.email.trim() : '';
    const senha = data.senha ? data.senha.trim() : ''; 
    
    // 2. BUSCAR O USUÁRIO NO "BANCO DE DADOS"
    const userFound = findUserByEmail(email);
    console.log("-----------------------------------------");
    console.log("1. Usuário encontrado:", !!userFound); // Deve ser true
    console.log("2. Senha Salva (DB):", userFound?.senha);
    console.log("3. Senha Recebida:", senha);
    console.log("4. Comparação é:", userFound?.senha === senha);
    console.log("-----------------------------------------");
    if (!userFound) {
      // Usuário não encontrado
       return NextResponse.json(
        { success: false, message: "Email ou senha inválidos." },
        { status: 401 } // Unauthorized
      );
    }
    
    // 2. LOG PARA DEBUG: O que o servidor está comparando?
    console.log("Senha Salva (DB):", userFound.senha);
    console.log("Senha Recebida:", senha);
    console.log("Comparação de Senhas:", userFound.senha === senha);
    // 3. VERIFICAR A SENHA ENCONTRADA
    // Em um sistema real, aqui você compararia a senha com hash (bcrypt, etc.)
    if (String(userFound.senha) === String(senha)) {
      // Login bem-sucedido
      
      // Criar um objeto de usuário para retorno sem a senha
      const loggedUserResponse = {
        id: userFound.id,
        nome: userFound.nome,
        email: userFound.email,
        token: userFound.token,
        // Incluir outros dados (telefone, cpf, etc.) que você adicionou
        telefone: userFound.telefone, 
        endereco: userFound.endereco,
        cpf: userFound.cpf,
      };
      
      return NextResponse.json(
        { success: true, user: loggedUserResponse, message: "Login realizado com sucesso." },
        { status: 200 } // OK
      );
    } else {
      // Senha incorreta
      return NextResponse.json(
        { success: false, message: "Email ou senha inválidos." },
        { status: 401 } // Unauthorized
      );
    }
    
  } catch (error) {
    console.error("Erro ao processar requisição de Login:", error);
    return NextResponse.json(
      { success: false, message: "Erro na requisição ou no servidor." },
      { status: 500 }
    );
  }
}