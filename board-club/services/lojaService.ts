import { api } from "./api";

export async function getLojas() {
  try {
    const response = await api.get("/lojas");
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar lojas", err);
    // Simulação enquanto a API não existe
    return [
      { id: 1, nome: "Loja Central", cidade: "São Paulo" },
      { id: 2, nome: "Loja Leste", cidade: "Rio de Janeiro" },
    ];
  }
}

export async function getLojaById(id: string) {
  try {
    const response = await api.get(`/lojas/${id}`);
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar loja", err);
    return { id, nome: "Loja de Exemplo", cidade: "Teste City" };
  }
}
