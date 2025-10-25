import { api } from "./api";

export async function login(email: string, senha: string) {
  try {
    const response = await api.post("/auth/login", { email, senha });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch {
    console.warn("Login simulado");
    return { token: "fake-token", user: { nome: "Usuário Exemplo" } };
  }
}
